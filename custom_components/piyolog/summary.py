"""Pure aggregation logic on top of parsed feeds (no Home Assistant imports).

Everything here is derived only from records PiyoLog returned. Sleep is the one
value PiyoLog does not provide, so it is reconstructed conservatively: only a
``Sleep`` record that is directly followed by a ``WakeUp`` record counts as a
confirmed interval. Anything ambiguous is left out instead of being guessed.
"""

from __future__ import annotations

from collections.abc import Mapping, Sequence
from dataclasses import dataclass
from datetime import datetime, time, timedelta, tzinfo

from .models import Feed, Record

FORMULA = "Formula"
BREAST_FEEDING = "BreastFeeding"
PEE = "Pee"
POOP = "Poop"
SLEEP = "Sleep"
WAKE_UP = "WakeUp"

LAST_TRACKED_TYPES = (FORMULA, BREAST_FEEDING, PEE, POOP, SLEEP, WAKE_UP)


@dataclass(frozen=True, slots=True)
class SleepInterval:
    """A sleep interval confirmed by a Sleep record followed by a WakeUp record."""

    start: datetime
    end: datetime

    def seconds_within(self, window_start: datetime, window_end: datetime) -> float:
        """Seconds of this interval that fall inside the given window."""
        start = max(self.start, window_start)
        end = min(self.end, window_end)
        return max((end - start).total_seconds(), 0.0)


@dataclass(frozen=True, slots=True)
class Summary:
    """Everything the entities and cards need, computed once per update."""

    generated_at: datetime
    today_start: datetime
    today_end: datetime
    last: Mapping[str, Record]
    today_records: tuple[Record, ...]
    sleep_intervals: tuple[SleepInterval, ...]
    open_sleep_since: datetime | None
    formula_today_ml: float
    counts_today: Mapping[str, int]
    sleep_today_seconds: float


def pair_sleep(records: Sequence[Record]) -> tuple[tuple[SleepInterval, ...], datetime | None]:
    """Pair Sleep and WakeUp records (given in ascending time order).

    Returns the confirmed intervals and, if the latest sleep-related record is a
    Sleep without a WakeUp yet, the time it started. A Sleep followed by another
    Sleep, or a WakeUp without a preceding Sleep, is not turned into an interval.
    """
    intervals: list[SleepInterval] = []
    pending: datetime | None = None
    for record in records:
        if record.type == SLEEP:
            pending = record.time
        elif record.type == WAKE_UP and pending is not None:
            intervals.append(SleepInterval(pending, record.time))
            pending = None
        elif record.type == WAKE_UP:
            continue
    return tuple(intervals), pending


def _day_bounds(now: datetime, tz: tzinfo) -> tuple[datetime, datetime]:
    local_date = now.astimezone(tz).date()
    start = datetime.combine(local_date, time.min, tzinfo=tz)
    end = datetime.combine(local_date + timedelta(days=1), time.min, tzinfo=tz)
    return start, end


def summarize(feed: Feed, now: datetime, tz: tzinfo) -> Summary:
    """Build a Summary. ``now`` decides what "today" means in the timezone ``tz``."""
    today_start, today_end = _day_bounds(now, tz)

    last: dict[str, Record] = {}
    for record in feed.records:  # ascending, so later records overwrite earlier ones
        if record.type in LAST_TRACKED_TYPES:
            last[record.type] = record

    today = tuple(r for r in feed.records if today_start <= r.time < today_end)

    counts: dict[str, int] = {}
    formula_ml = 0.0
    for record in today:
        counts[record.type] = counts.get(record.type, 0) + 1
        if record.type == FORMULA and record.amount_ml is not None:
            formula_ml += record.amount_ml

    sleep_records = [r for r in feed.records if r.type in (SLEEP, WAKE_UP)]
    intervals, open_since = pair_sleep(sleep_records)
    sleep_today = sum(i.seconds_within(today_start, today_end) for i in intervals)

    return Summary(
        generated_at=feed.generated_at,
        today_start=today_start,
        today_end=today_end,
        last=last,
        today_records=today,
        sleep_intervals=intervals,
        open_sleep_since=open_since,
        formula_today_ml=formula_ml,
        counts_today=counts,
        sleep_today_seconds=sleep_today,
    )
