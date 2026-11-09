"""Data models and parsing for PiyoLog data feed responses (schema v1)."""

from __future__ import annotations

from collections.abc import Mapping
from dataclasses import dataclass, field
from datetime import datetime
from typing import Any

SUPPORTED_SCHEMA_VERSION = 1


class FeedParseError(ValueError):
    """Raised when a feed response cannot be used at all."""


class UnsupportedSchemaVersionError(FeedParseError):
    """Raised when the feed uses a schema version this library does not know."""


@dataclass(frozen=True, slots=True)
class Record:
    """A single record in the feed.

    ``type`` is kept as a plain string so that unknown types added by PiyoLog
    later do not break parsing. Type specific fields stay in ``raw``.
    """

    event_id: str
    time: datetime
    type: str
    memo: str | None = None
    raw: Mapping[str, Any] = field(default_factory=dict, repr=False)

    @property
    def amount_ml(self) -> float | None:
        """Amount in ml for feeding records, or None when not recorded."""
        value = self.raw.get("value")
        if isinstance(value, Mapping) and value.get("unit") == "ml":
            return _positive_number(value.get("value"))
        return None

    @property
    def left_seconds(self) -> float | None:
        """Breastfeeding duration on the left side in seconds."""
        return _positive_number(self.raw.get("leftTime"))

    @property
    def right_seconds(self) -> float | None:
        """Breastfeeding duration on the right side in seconds."""
        return _positive_number(self.raw.get("rightTime"))

    @property
    def last_side(self) -> str | None:
        """The side used last for breastfeeding (``left`` or ``right``)."""
        side = self.raw.get("last")
        return side if side in ("left", "right") else None

    @property
    def poop_details(self) -> Mapping[str, str]:
        """Optional ``amount``, ``hardness`` and ``color`` of a Poop record."""
        details = self.raw.get("details")
        if not isinstance(details, Mapping):
            return {}
        return {k: v for k, v in details.items() if isinstance(v, str)}


@dataclass(frozen=True, slots=True)
class Feed:
    """A parsed feed response."""

    schema_version: int
    generated_at: datetime
    range_from: datetime
    range_to: datetime
    records: tuple[Record, ...]


def _positive_number(value: Any) -> float | None:
    if isinstance(value, bool) or not isinstance(value, int | float):
        return None
    return float(value) if value > 0 else None


def _parse_datetime(value: Any) -> datetime:
    if not isinstance(value, str):
        raise ValueError("datetime must be a string")
    parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
    if parsed.tzinfo is None:
        raise ValueError("datetime must include a UTC offset")
    return parsed


def _parse_record(item: Any) -> Record | None:
    """Parse one record. Returns None for records that cannot be used."""
    if not isinstance(item, Mapping):
        return None
    event_id = item.get("event_id")
    record_type = item.get("type")
    if not isinstance(event_id, str) or not isinstance(record_type, str):
        return None
    try:
        time = _parse_datetime(item.get("datetime"))
    except ValueError:
        return None
    memo = item.get("memo")
    return Record(
        event_id=event_id,
        time=time,
        type=record_type,
        memo=memo if isinstance(memo, str) else None,
        raw=dict(item),
    )


def parse_feed(payload: Any) -> Feed:
    """Parse a decoded JSON feed response.

    Unusable individual records are skipped, but a malformed envelope raises
    ``FeedParseError`` so callers never mistake a broken response for an empty one.
    """
    if not isinstance(payload, Mapping):
        raise FeedParseError("feed response must be a JSON object")

    version = payload.get("schema_version")
    if version != SUPPORTED_SCHEMA_VERSION:
        raise UnsupportedSchemaVersionError(f"unsupported schema_version: {version!r}")

    range_ = payload.get("range")
    records = payload.get("records")
    if not isinstance(range_, Mapping) or not isinstance(records, list):
        raise FeedParseError("feed response is missing 'range' or 'records'")

    try:
        generated_at = _parse_datetime(payload.get("generated_at"))
        range_from = _parse_datetime(range_.get("from"))
        range_to = _parse_datetime(range_.get("to"))
    except ValueError as err:
        raise FeedParseError(f"invalid datetime in feed envelope: {err}") from err

    parsed = (_parse_record(item) for item in records)
    return Feed(
        schema_version=version,
        generated_at=generated_at,
        range_from=range_from,
        range_to=range_to,
        records=tuple(sorted((r for r in parsed if r is not None), key=lambda r: r.time)),
    )
