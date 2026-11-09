"""PiyoLog integration for Home Assistant (unofficial)."""

from __future__ import annotations

import logging
from pathlib import Path

import homeassistant.helpers.config_validation as cv
from homeassistant.components.http import StaticPathConfig
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.typing import ConfigType

from .api import PiyologClient, parse_feed_url
from .const import CONF_URL, DOMAIN
from .coordinator import PiyologConfigEntry, PiyologCoordinator

_LOGGER = logging.getLogger(__name__)

PLATFORMS = [Platform.SENSOR]
CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)

CARD_URL = f"/{DOMAIN}/piyolog-card.js"
CARD_PATH = Path(__file__).parent / "frontend" / "piyolog-card.js"


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Serve the dashboard cards and load them in the frontend."""
    await _async_register_cards(hass)
    return True


async def _async_register_cards(hass: HomeAssistant) -> None:
    """Make the bundled cards available without adding a dashboard resource by hand."""
    http = getattr(hass, "http", None)
    if http is None or "frontend" not in hass.config.components:
        _LOGGER.debug("HTTP or frontend is not loaded; skipping card registration")
        return

    if not await hass.async_add_executor_job(CARD_PATH.is_file):
        _LOGGER.warning("Card bundle not found at %s", CARD_PATH)
        return

    # Imported here because the frontend component is optional (for example in tests).
    from homeassistant.components import frontend

    await http.async_register_static_paths([StaticPathConfig(CARD_URL, str(CARD_PATH), False)])
    # The modification time changes on every update, which busts the browser cache.
    version = int((await hass.async_add_executor_job(CARD_PATH.stat)).st_mtime)
    frontend.add_extra_js_url(hass, f"{CARD_URL}?v={version}")


async def async_setup_entry(hass: HomeAssistant, entry: PiyologConfigEntry) -> bool:
    """Set up PiyoLog from a config entry."""
    client = PiyologClient(async_get_clientsession(hass), parse_feed_url(entry.data[CONF_URL]))
    coordinator = PiyologCoordinator(hass, entry, client)
    await coordinator.async_config_entry_first_refresh()
    entry.runtime_data = coordinator

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    entry.async_on_unload(entry.add_update_listener(_async_reload_on_options_change))
    return True


async def async_unload_entry(hass: HomeAssistant, entry: PiyologConfigEntry) -> bool:
    """Unload a config entry."""
    return await hass.config_entries.async_unload_platforms(entry, PLATFORMS)


async def _async_reload_on_options_change(hass: HomeAssistant, entry: PiyologConfigEntry) -> None:
    await hass.config_entries.async_reload(entry.entry_id)
