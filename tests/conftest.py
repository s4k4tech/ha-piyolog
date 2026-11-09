from __future__ import annotations

import json
from collections.abc import Generator
from pathlib import Path
from unittest.mock import patch

import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.piyolog.const import CONF_NAME, CONF_URL, DOMAIN
from custom_components.piyolog.models import parse_feed

SECRET = "s3cr3t-token"
FEED_URL = f"https://feed.piyolog.com/v1/feed/24h/feed123/{SECRET}"
FIXTURE = Path(__file__).parent / "fixtures" / "feed.json"


@pytest.fixture(autouse=True)
def auto_enable_custom_integrations(enable_custom_integrations):
    return


@pytest.fixture
def feed():
    return parse_feed(json.loads(FIXTURE.read_text()))


@pytest.fixture
def mock_fetch(feed) -> Generator:
    with patch("custom_components.piyolog.api.PiyologClient.fetch", return_value=feed) as fetch:
        yield fetch


@pytest.fixture
def entry() -> MockConfigEntry:
    return MockConfigEntry(
        domain=DOMAIN,
        title="Haru",
        unique_id="feed123",
        data={CONF_NAME: "Haru", CONF_URL: FEED_URL},
    )
