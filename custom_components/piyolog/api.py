"""Client for the PiyoLog data feed."""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Any
from urllib.parse import urlsplit

import aiohttp

from .models import Feed, FeedParseError, parse_feed

FEED_HOST = "feed.piyolog.com"
PERIODS = ("24h", "3d", "7d", "28d")
REQUEST_TIMEOUT = aiohttp.ClientTimeout(total=30)

_PATH_RE = re.compile(r"^/v1/feed/(?P<period>[^/]+)/(?P<feed_id>[^/]+)/(?P<secret>[^/]+)/?$")


class PiyologError(Exception):
    """Base class for all errors raised by this client."""


class InvalidFeedUrlError(PiyologError):
    """The given URL is not a PiyoLog feed URL."""


class FeedUnavailableError(PiyologError):
    """HTTP 404: wrong, expired or revoked URL, or the plan was suspended."""


class ResponseTooLargeError(PiyologError):
    """HTTP 413: the response is too large. Use a shorter period."""


class RateLimitedError(PiyologError):
    """HTTP 429: too many requests. Back off before retrying."""


class ServerError(PiyologError):
    """HTTP 5xx: temporary server side error."""


class CannotConnectError(PiyologError):
    """The request failed before a response was received."""


class InvalidResponseError(PiyologError):
    """The response was received but could not be understood."""


@dataclass(frozen=True, slots=True)
class FeedUrl:
    """A parsed feed URL. The secret is never included in ``repr`` or ``str``."""

    period: str
    feed_id: str
    secret: str = field(repr=False)

    @property
    def url(self) -> str:
        """The full URL including the secret. Do not log this."""
        return f"https://{FEED_HOST}/v1/feed/{self.period}/{self.feed_id}/{self.secret}"

    @property
    def redacted(self) -> str:
        """A URL that is safe to log."""
        return f"https://{FEED_HOST}/v1/feed/{self.period}/{self.feed_id}/***"

    def __str__(self) -> str:
        return self.redacted


def parse_feed_url(raw: str) -> FeedUrl:
    """Parse and validate a feed URL pasted by a user."""
    parts = urlsplit(raw.strip())
    if parts.scheme != "https" or parts.hostname != FEED_HOST:
        raise InvalidFeedUrlError(f"URL must start with https://{FEED_HOST}/")
    match = _PATH_RE.match(parts.path)
    if match is None or match["period"] not in PERIODS:
        raise InvalidFeedUrlError("URL path must be /v1/feed/{period}/{feed_id}/{secret}")
    if {match["feed_id"], match["secret"]} & {".", ".."}:
        raise InvalidFeedUrlError("URL path must not contain dot segments")
    return FeedUrl(match["period"], match["feed_id"], match["secret"])


class PiyologClient:
    """Fetches and parses a single feed."""

    def __init__(self, session: aiohttp.ClientSession, feed_url: FeedUrl) -> None:
        self._session = session
        self._feed_url = feed_url

    @property
    def feed_url(self) -> FeedUrl:
        return self._feed_url

    async def fetch(self) -> Feed:
        """Fetch the feed. Errors are raised, never returned as empty data."""
        try:
            async with self._session.get(
                self._feed_url.url,
                timeout=REQUEST_TIMEOUT,
                headers={"Accept": "application/json"},
                # The documented endpoint never redirects. Refuse to follow one so the
                # secret URL cannot be bounced somewhere else.
                allow_redirects=False,
            ) as response:
                _raise_for_status(response.status)
                try:
                    payload: Any = await response.json(content_type=None)
                except (aiohttp.ContentTypeError, ValueError):
                    # Do not chain: ContentTypeError carries the request URL (and its secret).
                    raise InvalidResponseError("response is not valid JSON") from None
        except (TimeoutError, aiohttp.ClientError) as err:
            # Do not chain: aiohttp errors can embed the request URL (and its secret).
            raise CannotConnectError(type(err).__name__) from None

        try:
            return parse_feed(payload)
        except FeedParseError as err:
            raise InvalidResponseError(str(err)) from err


def _raise_for_status(status: int) -> None:
    if status == 200:
        return
    if status == 404:
        raise FeedUnavailableError("feed is unavailable")
    if status == 413:
        raise ResponseTooLargeError("response too large; use a shorter period")
    if status == 429:
        raise RateLimitedError("rate limit exceeded")
    if status >= 500:
        raise ServerError(f"server error: {status}")
    raise InvalidResponseError(f"unexpected status: {status}")
