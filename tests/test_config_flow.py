from __future__ import annotations

from unittest.mock import patch

import pytest
from homeassistant import config_entries
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResultType

from custom_components.piyolog.api import (
    CannotConnectError,
    FeedUnavailableError,
    InvalidResponseError,
    ResponseTooLargeError,
)
from custom_components.piyolog.const import CONF_NAME, CONF_SCAN_INTERVAL, CONF_URL, DOMAIN

from .conftest import FEED_URL


async def _start(hass: HomeAssistant):
    return await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )


async def test_user_flow_creates_entry(hass: HomeAssistant, mock_fetch) -> None:
    result = await _start(hass)
    assert result["type"] is FlowResultType.FORM

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"], {CONF_NAME: "Haru", CONF_URL: FEED_URL}
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert result["title"] == "Haru"
    assert result["data"] == {CONF_NAME: "Haru", CONF_URL: FEED_URL}
    assert result["result"].unique_id == "feed123"


@pytest.mark.parametrize(
    ("url", "exception", "error"),
    [
        ("https://example.com/x", None, "invalid_url"),
        (FEED_URL, FeedUnavailableError("x"), "feed_unavailable"),
        (FEED_URL, ResponseTooLargeError("x"), "response_too_large"),
        (FEED_URL, CannotConnectError("x"), "cannot_connect"),
        (FEED_URL, InvalidResponseError("x"), "invalid_response"),
    ],
)
async def test_user_flow_errors_then_recovers(
    hass: HomeAssistant, feed, url, exception, error
) -> None:
    result = await _start(hass)
    with patch("custom_components.piyolog.api.PiyologClient.fetch", side_effect=exception):
        result = await hass.config_entries.flow.async_configure(
            result["flow_id"], {CONF_NAME: "Haru", CONF_URL: url}
        )
    assert result["type"] is FlowResultType.FORM
    assert result["errors"] == {"base": error}

    with patch("custom_components.piyolog.api.PiyologClient.fetch", return_value=feed):
        result = await hass.config_entries.flow.async_configure(
            result["flow_id"], {CONF_NAME: "Haru", CONF_URL: FEED_URL}
        )
    assert result["type"] is FlowResultType.CREATE_ENTRY


async def test_duplicate_feed_is_aborted(hass: HomeAssistant, entry, mock_fetch) -> None:
    entry.add_to_hass(hass)
    result = await _start(hass)
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"], {CONF_NAME: "Again", CONF_URL: FEED_URL}
    )
    assert result["type"] is FlowResultType.ABORT
    assert result["reason"] == "already_configured"


async def test_options_flow(hass: HomeAssistant, entry, mock_fetch) -> None:
    entry.add_to_hass(hass)
    await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    result = await hass.config_entries.options.async_init(entry.entry_id)
    assert result["type"] is FlowResultType.FORM
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {CONF_SCAN_INTERVAL: 120}
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert entry.options[CONF_SCAN_INTERVAL] == 120
