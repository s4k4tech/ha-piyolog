from __future__ import annotations

from datetime import UTC, datetime
from unittest.mock import patch

from freezegun.api import FrozenDateTimeFactory
from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er
from pytest_homeassistant_custom_component.common import async_fire_time_changed

from custom_components.piyolog.api import (
    FeedUnavailableError,
    RateLimitedError,
)
from custom_components.piyolog.const import DEFAULT_SCAN_INTERVAL, NOT_FOUND_BEFORE_REAUTH

from .conftest import SECRET

NOW = datetime(2026, 11, 9, 5, 30, tzinfo=UTC)


async def _setup(hass: HomeAssistant, entry, freezer: FrozenDateTimeFactory) -> None:
    await hass.config.async_set_time_zone("Asia/Tokyo")
    freezer.move_to(NOW)
    entry.add_to_hass(hass)
    await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()


def _state(hass: HomeAssistant, entry, key: str):
    registry = er.async_get(hass)
    entity_id = registry.async_get_entity_id("sensor", "piyolog", f"{entry.entry_id}_{key}")
    assert entity_id is not None, key
    return hass.states.get(entity_id)


async def test_sensors(hass: HomeAssistant, entry, mock_fetch, freezer) -> None:
    await _setup(hass, entry, freezer)

    formula = _state(hass, entry, "last_formula")
    assert formula.state == "2026-11-09T03:15:00+00:00"
    assert formula.attributes["amount_ml"] == 140

    feeding = _state(hass, entry, "last_breastfeeding")
    assert feeding.attributes["left_seconds"] == 480
    assert feeding.attributes["last_side"] == "right"

    assert _state(hass, entry, "last_poop").attributes["color"] == "yellow"
    assert _state(hass, entry, "last_pee").state == "unknown"  # none in the feed
    assert _state(hass, entry, "last_wake_up").state == "unknown"

    # Sleep with no WakeUp yet: recorded as-is, never reported as confirmed sleep time.
    assert _state(hass, entry, "last_sleep").state == "2026-11-09T04:58:00+00:00"
    sleep_today = _state(hass, entry, "sleep_today")
    assert float(sleep_today.state) == 0
    assert sleep_today.attributes["open_sleep_since"] is not None

    # 2026-11-08T20:00Z is already the 9th in Tokyo, so all five records are "today".
    assert _state(hass, entry, "formula_today").state == "140.0"
    assert _state(hass, entry, "breastfeeding_count_today").state == "1"

    timeline = _state(hass, entry, "timeline")
    assert timeline.state == "5"
    assert len(timeline.attributes["records"]) == 5
    assert "memo" not in str(timeline.attributes["records"])


async def test_keeps_last_data_when_refresh_fails(
    hass: HomeAssistant, entry, mock_fetch, freezer
) -> None:
    await _setup(hass, entry, freezer)
    mock_fetch.side_effect = RateLimitedError("slow down")

    freezer.tick(DEFAULT_SCAN_INTERVAL + 1)
    async_fire_time_changed(hass)
    await hass.async_block_till_done()

    assert entry.runtime_data.last_update_success is False
    assert _state(hass, entry, "last_formula").state == "2026-11-09T03:15:00+00:00"
    # Backed off: the next attempt is later than the normal interval.
    assert entry.runtime_data.update_interval.total_seconds() > DEFAULT_SCAN_INTERVAL


async def test_first_refresh_failure_retries_setup(hass: HomeAssistant, entry, freezer) -> None:
    entry.add_to_hass(hass)
    with patch(
        "custom_components.piyolog.api.PiyologClient.fetch",
        side_effect=RateLimitedError("slow down"),
    ):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
    assert entry.state is ConfigEntryState.SETUP_RETRY


async def test_repeated_404_starts_reauth(hass: HomeAssistant, entry, mock_fetch, freezer) -> None:
    await _setup(hass, entry, freezer)
    mock_fetch.side_effect = FeedUnavailableError("gone")

    for _ in range(NOT_FOUND_BEFORE_REAUTH):
        freezer.tick(DEFAULT_SCAN_INTERVAL + 1)
        async_fire_time_changed(hass)
        await hass.async_block_till_done()

    flows = hass.config_entries.flow.async_progress_by_handler("piyolog")
    assert [f["context"]["source"] for f in flows] == ["reauth"]


async def test_unload(hass: HomeAssistant, entry, mock_fetch, freezer) -> None:
    await _setup(hass, entry, freezer)
    assert await hass.config_entries.async_unload(entry.entry_id)
    assert entry.state is ConfigEntryState.NOT_LOADED


async def test_diagnostics_hide_secret(hass: HomeAssistant, entry, mock_fetch, freezer) -> None:
    from custom_components.piyolog.diagnostics import async_get_config_entry_diagnostics

    await _setup(hass, entry, freezer)
    data = await async_get_config_entry_diagnostics(hass, entry)
    assert SECRET not in str(data)
    assert data["summary"]["today_records"] == 5


async def test_cards_are_served_and_loaded(hass: HomeAssistant) -> None:
    from unittest.mock import AsyncMock, MagicMock

    from custom_components.piyolog import CARD_PATH, CARD_URL, async_setup

    assert CARD_PATH.is_file(), "run `npm run build` in frontend/ and commit the bundle"

    hass.http = MagicMock(async_register_static_paths=AsyncMock())
    hass.config.components.add("frontend")
    with patch("homeassistant.components.frontend.add_extra_js_url") as add_url:
        assert await async_setup(hass, {})

    (config,), _ = hass.http.async_register_static_paths.call_args
    assert [(c.url_path, c.path) for c in config] == [(CARD_URL, str(CARD_PATH))]
    (_, url), _ = add_url.call_args
    assert url.startswith(f"{CARD_URL}?v=")


async def test_card_registration_is_skipped_without_http(hass: HomeAssistant) -> None:
    from custom_components.piyolog import async_setup

    assert await async_setup(hass, {})
