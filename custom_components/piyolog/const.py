"""Constants for the PiyoLog integration."""

from __future__ import annotations

DOMAIN = "piyolog"

CONF_URL = "url"
CONF_NAME = "name"
CONF_SCAN_INTERVAL = "scan_interval"

DEFAULT_SCAN_INTERVAL = 300  # seconds
MIN_SCAN_INTERVAL = 60  # PiyoLog recommends about one request per minute at most
MAX_SCAN_INTERVAL = 3600
MAX_BACKOFF_INTERVAL = 1800
NOT_FOUND_BEFORE_REAUTH = 3
