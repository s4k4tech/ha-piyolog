"""Config flow for PiyoLog."""

from __future__ import annotations

from collections.abc import Mapping
from typing import Any

import voluptuous as vol
from homeassistant.config_entries import ConfigFlow, ConfigFlowResult, OptionsFlow
from homeassistant.core import callback
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.selector import (
    NumberSelector,
    NumberSelectorConfig,
    NumberSelectorMode,
    TextSelector,
    TextSelectorConfig,
    TextSelectorType,
)

from .api import (
    CannotConnectError,
    FeedUnavailableError,
    FeedUrl,
    InvalidFeedUrlError,
    InvalidResponseError,
    PiyologClient,
    PiyologError,
    RateLimitedError,
    ResponseTooLargeError,
    ServerError,
    parse_feed_url,
)
from .const import (
    CONF_NAME,
    CONF_SCAN_INTERVAL,
    CONF_URL,
    DEFAULT_SCAN_INTERVAL,
    DOMAIN,
    MAX_SCAN_INTERVAL,
    MIN_SCAN_INTERVAL,
)

# The URL contains a secret, so it is shown masked like a password.
_URL_SELECTOR = TextSelector(TextSelectorConfig(type=TextSelectorType.PASSWORD))


async def _validate(hass, feed_url: FeedUrl) -> str | None:
    """Fetch the feed once. Returns an error key, or None when it works."""
    client = PiyologClient(async_get_clientsession(hass), feed_url)
    try:
        await client.fetch()
    except FeedUnavailableError:
        return "feed_unavailable"
    except ResponseTooLargeError:
        return "response_too_large"
    except (CannotConnectError, RateLimitedError, ServerError):
        return "cannot_connect"
    except InvalidResponseError:
        return "invalid_response"
    except PiyologError:
        return "unknown"
    return None


class PiyologConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle a config flow for PiyoLog."""

    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        errors: dict[str, str] = {}
        if user_input is not None:
            try:
                feed_url = parse_feed_url(user_input[CONF_URL])
            except InvalidFeedUrlError:
                errors["base"] = "invalid_url"
            else:
                await self.async_set_unique_id(feed_url.feed_id)
                self._abort_if_unique_id_configured()
                if error := await _validate(self.hass, feed_url):
                    errors["base"] = error
                else:
                    return self.async_create_entry(
                        title=user_input[CONF_NAME],
                        data={CONF_NAME: user_input[CONF_NAME], CONF_URL: feed_url.url},
                    )

        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema(
                {
                    vol.Required(CONF_NAME): str,
                    vol.Required(CONF_URL): _URL_SELECTOR,
                }
            ),
            errors=errors,
        )

    async def async_step_reauth(self, entry_data: Mapping[str, Any]) -> ConfigFlowResult:
        return await self.async_step_reauth_confirm()

    async def async_step_reauth_confirm(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        errors: dict[str, str] = {}
        if user_input is not None:
            try:
                feed_url = parse_feed_url(user_input[CONF_URL])
            except InvalidFeedUrlError:
                errors["base"] = "invalid_url"
            else:
                if error := await _validate(self.hass, feed_url):
                    errors["base"] = error
                else:
                    entry = self._get_reauth_entry()
                    return self.async_update_reload_and_abort(
                        entry,
                        unique_id=feed_url.feed_id,
                        data_updates={CONF_URL: feed_url.url},
                    )

        return self.async_show_form(
            step_id="reauth_confirm",
            data_schema=vol.Schema({vol.Required(CONF_URL): _URL_SELECTOR}),
            errors=errors,
        )

    @staticmethod
    @callback
    def async_get_options_flow(config_entry) -> PiyologOptionsFlow:
        return PiyologOptionsFlow()


class PiyologOptionsFlow(OptionsFlow):
    """Options: how often to poll the feed."""

    async def async_step_init(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        if user_input is not None:
            return self.async_create_entry(
                data={CONF_SCAN_INTERVAL: int(user_input[CONF_SCAN_INTERVAL])}
            )

        current = self.config_entry.options.get(CONF_SCAN_INTERVAL, DEFAULT_SCAN_INTERVAL)
        return self.async_show_form(
            step_id="init",
            data_schema=vol.Schema(
                {
                    vol.Required(CONF_SCAN_INTERVAL, default=current): NumberSelector(
                        NumberSelectorConfig(
                            min=MIN_SCAN_INTERVAL,
                            max=MAX_SCAN_INTERVAL,
                            step=30,
                            unit_of_measurement="s",
                            mode=NumberSelectorMode.BOX,
                        )
                    )
                }
            ),
        )
