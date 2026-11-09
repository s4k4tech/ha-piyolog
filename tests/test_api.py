from __future__ import annotations

import json
from pathlib import Path

import aiohttp
import pytest

from custom_components.piyolog.api import (
    CannotConnectError,
    FeedUnavailableError,
    InvalidFeedUrlError,
    InvalidResponseError,
    PiyologClient,
    RateLimitedError,
    ResponseTooLargeError,
    ServerError,
    parse_feed_url,
)

SECRET = "s3cr3t-token"
URL = f"https://feed.piyolog.com/v1/feed/24h/feed123/{SECRET}"
FIXTURE = json.loads((Path(__file__).parent / "fixtures" / "feed.json").read_text())


def test_parse_feed_url():
    feed_url = parse_feed_url(f"  {URL}  ")
    assert (feed_url.period, feed_url.feed_id, feed_url.secret) == ("24h", "feed123", SECRET)
    assert feed_url.url == URL


def test_secret_is_never_in_repr_or_str():
    feed_url = parse_feed_url(URL)
    assert SECRET not in repr(feed_url)
    assert SECRET not in str(feed_url)
    assert SECRET not in feed_url.redacted


@pytest.mark.parametrize(
    "raw",
    [
        "",
        "not a url",
        f"http://feed.piyolog.com/v1/feed/24h/a/{SECRET}",
        f"https://example.com/v1/feed/24h/a/{SECRET}",
        f"https://feed.piyolog.com/v1/feed/1y/a/{SECRET}",
        "https://feed.piyolog.com/v1/feed/24h/a",
        f"https://feed.piyolog.com/v1/feed/24h/../{SECRET}",
        f"https://feed.piyolog.com@example.com/v1/feed/24h/a/{SECRET}",
    ],
)
def test_invalid_feed_url(raw):
    with pytest.raises(InvalidFeedUrlError):
        parse_feed_url(raw)


class FakeResponse:
    def __init__(self, status: int, payload=None, *, bad_json: bool = False) -> None:
        self.status = status
        self._payload = payload
        self._bad_json = bad_json

    async def json(self, **_kwargs):
        if self._bad_json:
            raise ValueError("not json")
        return self._payload


class FakeSession:
    """Minimal stand-in for aiohttp.ClientSession.get()."""

    def __init__(self) -> None:
        self.response: FakeResponse | None = None
        self.exception: BaseException | None = None
        self.requested: list[str] = []
        self.kwargs: dict = {}

    def get(self, url, **kwargs):
        self.requested.append(url)
        self.kwargs = kwargs
        return self

    async def __aenter__(self):
        if self.exception is not None:
            raise self.exception
        return self.response

    async def __aexit__(self, *_exc):
        return False


@pytest.fixture
def session():
    return FakeSession()


@pytest.fixture
def client(session):
    return PiyologClient(session, parse_feed_url(URL))


async def test_fetch_success(client, session):
    session.response = FakeResponse(200, FIXTURE)
    feed = await client.fetch()
    assert len(feed.records) == 5
    assert session.requested == [URL]


@pytest.mark.parametrize(
    ("status", "error"),
    [
        (404, FeedUnavailableError),
        (413, ResponseTooLargeError),
        (429, RateLimitedError),
        (500, ServerError),
        (503, ServerError),
        (400, InvalidResponseError),
    ],
)
async def test_error_statuses_are_not_empty_data(client, session, status, error):
    session.response = FakeResponse(status, {"error": {"code": "x", "message": "y"}})
    with pytest.raises(error):
        await client.fetch()


async def test_invalid_json(client, session):
    session.response = FakeResponse(200, bad_json=True)
    with pytest.raises(InvalidResponseError):
        await client.fetch()


async def test_malformed_envelope(client, session):
    session.response = FakeResponse(200, {"schema_version": 1})
    with pytest.raises(InvalidResponseError):
        await client.fetch()


async def test_connection_error_does_not_leak_secret(client, session):
    session.exception = aiohttp.ClientConnectionError(f"failed for {URL}")
    with pytest.raises(CannotConnectError) as info:
        await client.fetch()
    assert SECRET not in str(info.value)
    assert info.value.__cause__ is None


async def test_timeout(client, session):
    session.exception = TimeoutError()
    with pytest.raises(CannotConnectError):
        await client.fetch()


async def test_redirects_are_not_followed(client, session):
    session.response = FakeResponse(302, {})
    with pytest.raises(InvalidResponseError):
        await client.fetch()
    assert session.kwargs["allow_redirects"] is False


async def test_userinfo_and_port_are_dropped_from_rebuilt_url():
    feed_url = parse_feed_url(f"https://user:pw@feed.piyolog.com:8443/v1/feed/24h/a/{SECRET}?x=1#f")
    assert feed_url.url == f"https://feed.piyolog.com/v1/feed/24h/a/{SECRET}"
