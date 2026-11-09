"""Data update coordinator for PiyoLog."""

from __future__ import annotations

import logging
import random
from datetime import timedelta

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import ConfigEntryAuthFailed
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed
from homeassistant.util import dt as dt_util

from .api import (
    CannotConnectError,
    FeedUnavailableError,
    InvalidResponseError,
    PiyologClient,
    PiyologError,
    RateLimitedError,
    ResponseTooLargeError,
    ServerError,
)
from .const import (
    CONF_SCAN_INTERVAL,
    DEFAULT_SCAN_INTERVAL,
    DOMAIN,
    MAX_BACKOFF_INTERVAL,
    NOT_FOUND_BEFORE_REAUTH,
)
from .summary import Summary, summarize

_LOGGER = logging.getLogger(__name__)

type PiyologConfigEntry = ConfigEntry[PiyologCoordinator]

_BACKOFF_ERRORS = (RateLimitedError, ServerError, CannotConnectError)


class PiyologCoordinator(DataUpdateCoordinator[Summary]):
    """Fetches the feed and turns it into a Summary."""

    config_entry: PiyologConfigEntry

    def __init__(
        self, hass: HomeAssistant, entry: PiyologConfigEntry, client: PiyologClient
    ) -> None:
        self._base_interval = timedelta(
            seconds=entry.options.get(CONF_SCAN_INTERVAL, DEFAULT_SCAN_INTERVAL)
        )
        super().__init__(
            hass,
            _LOGGER,
            config_entry=entry,
            name=f"{DOMAIN} {client.feed_url.feed_id}",
            update_interval=self._base_interval,
        )
        self.client = client
        self._failures = 0
        self._not_found = 0

    async def _async_update_data(self) -> Summary:
        try:
            feed = await self.client.fetch()
        except FeedUnavailableError:
            # A 404 can also happen briefly right after a feed is issued.
            self._not_found += 1
            if self._not_found >= NOT_FOUND_BEFORE_REAUTH:
                raise ConfigEntryAuthFailed(
                    "The feed URL is no longer valid (expired, revoked or suspended)"
                ) from None
            raise UpdateFailed("The feed is unavailable") from None
        except _BACKOFF_ERRORS as err:
            self._back_off()
            raise UpdateFailed(str(err)) from None
        except (ResponseTooLargeError, InvalidResponseError, PiyologError) as err:
            raise UpdateFailed(str(err)) from None

        self._failures = 0
        self._not_found = 0
        self.update_interval = self._base_interval
        return summarize(feed, dt_util.utcnow(), dt_util.get_default_time_zone())

    def _back_off(self) -> None:
        """Wait longer after rate limits and server errors, with some jitter."""
        self._failures += 1
        seconds = min(self._base_interval.total_seconds() * 2**self._failures, MAX_BACKOFF_INTERVAL)
        self.update_interval = timedelta(seconds=seconds * random.uniform(0.9, 1.1))
