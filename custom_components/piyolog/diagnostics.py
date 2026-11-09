"""Diagnostics for PiyoLog. The feed URL (a secret) and memos are never included."""

from __future__ import annotations

from typing import Any

from homeassistant.core import HomeAssistant

from .coordinator import PiyologConfigEntry


async def async_get_config_entry_diagnostics(
    hass: HomeAssistant, entry: PiyologConfigEntry
) -> dict[str, Any]:
    coordinator = entry.runtime_data
    summary = coordinator.data
    return {
        "feed": {
            "period": coordinator.client.feed_url.period,
            "url": coordinator.client.feed_url.redacted,
        },
        "options": dict(entry.options),
        "last_update_success": coordinator.last_update_success,
        "summary": None
        if summary is None
        else {
            "generated_at": summary.generated_at.isoformat(),
            "today_records": len(summary.today_records),
            "counts_today": dict(summary.counts_today),
            "confirmed_sleep_intervals": len(summary.sleep_intervals),
            "open_sleep": summary.open_sleep_since is not None,
        },
    }
