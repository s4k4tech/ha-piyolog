from __future__ import annotations

from datetime import UTC, datetime, timedelta, timezone

from custom_components.piyolog.models import Feed, Record
from custom_components.piyolog.summary import pair_sleep, summarize

JST = timezone(timedelta(hours=9))


def rec(event_id: str, iso: str, type_: str, **extra) -> Record:
    return Record(
        event_id=event_id,
        time=datetime.fromisoformat(iso),
        type=type_,
        raw={"event_id": event_id, "type": type_, **extra},
    )


def feed(*records: Record) -> Feed:
    ordered = tuple(sorted(records, key=lambda r: r.time))
    base = datetime(2026, 11, 9, 5, 30, tzinfo=UTC)
    return Feed(1, base, base - timedelta(days=1), base, ordered)


NOW = datetime(2026, 11, 9, 5, 30, tzinfo=UTC)  # 14:30 JST


def test_pair_sleep_confirmed_and_open():
    records = [
        rec("1", "2026-11-09T00:00:00+00:00", "Sleep"),
        rec("2", "2026-11-09T01:00:00+00:00", "WakeUp"),
        rec("3", "2026-11-09T04:58:00+00:00", "Sleep"),
    ]
    intervals, open_since = pair_sleep(records)
    assert [(i.start.hour, i.end.hour) for i in intervals] == [(0, 1)]
    assert open_since == datetime(2026, 11, 9, 4, 58, tzinfo=UTC)


def test_pair_sleep_ignores_orphan_wakeup_and_double_sleep():
    records = [
        rec("1", "2026-11-09T00:00:00+00:00", "WakeUp"),  # no preceding Sleep
        rec("2", "2026-11-09T01:00:00+00:00", "Sleep"),
        rec("3", "2026-11-09T02:00:00+00:00", "Sleep"),  # WakeUp for #2 was never recorded
        rec("4", "2026-11-09T03:00:00+00:00", "WakeUp"),
    ]
    intervals, open_since = pair_sleep(records)
    # #2 is not confirmed; only the nearest Sleep before the WakeUp is used.
    assert [(i.start.hour, i.end.hour) for i in intervals] == [(2, 3)]
    assert open_since is None


def test_last_records_per_type():
    s = summarize(
        feed(
            rec("1", "2026-11-09T01:00:00+00:00", "Formula", value={"value": 100, "unit": "ml"}),
            rec("2", "2026-11-09T03:00:00+00:00", "Formula", value={"value": 140, "unit": "ml"}),
            rec("3", "2026-11-09T02:00:00+00:00", "Pee"),
        ),
        NOW,
        JST,
    )
    assert s.last["Formula"].event_id == "2"
    assert s.last["Pee"].event_id == "3"
    assert "Poop" not in s.last


def test_today_uses_local_midnight():
    # 2026-11-08T14:59Z is 23:59 JST on the 8th; 15:00Z is 00:00 JST on the 9th.
    s = summarize(
        feed(
            rec("old", "2026-11-08T14:59:00+00:00", "Pee"),
            rec("new", "2026-11-08T15:00:00+00:00", "Pee"),
            rec("later", "2026-11-09T03:00:00+00:00", "Pee"),
        ),
        NOW,
        JST,
    )
    assert s.counts_today == {"Pee": 2}
    assert [r.event_id for r in s.today_records] == ["new", "later"]
    assert s.today_start == datetime(2026, 11, 9, 0, 0, tzinfo=JST)


def test_formula_today_sums_only_recorded_amounts():
    s = summarize(
        feed(
            rec("1", "2026-11-09T01:00:00+00:00", "Formula", value={"value": 100, "unit": "ml"}),
            rec("2", "2026-11-09T02:00:00+00:00", "Formula"),  # amount not recorded
            rec(
                "3",
                "2026-11-09T03:00:00+00:00",
                "ExpressedBreastMilk",
                value={"value": 90, "unit": "ml"},
            ),
        ),
        NOW,
        JST,
    )
    assert s.formula_today_ml == 100
    assert s.counts_today["Formula"] == 2


def test_sleep_crossing_midnight_is_clipped_to_today():
    # 22:00 JST (13:00Z) on the 8th to 06:00 JST (21:00Z) on the 8th is wrong; use 9th 06:00 JST.
    s = summarize(
        feed(
            rec("1", "2026-11-08T13:00:00+00:00", "Sleep"),  # 22:00 JST, 8th
            rec("2", "2026-11-08T21:00:00+00:00", "WakeUp"),  # 06:00 JST, 9th
        ),
        NOW,
        JST,
    )
    assert len(s.sleep_intervals) == 1
    assert s.sleep_today_seconds == 6 * 3600  # only 00:00-06:00 counts today


def test_open_sleep_is_not_counted():
    s = summarize(
        feed(rec("1", "2026-11-09T04:58:00+00:00", "Sleep")),
        NOW,
        JST,
    )
    assert s.sleep_today_seconds == 0
    assert s.open_sleep_since == datetime(2026, 11, 9, 4, 58, tzinfo=UTC)


def test_empty_feed():
    s = summarize(feed(), NOW, JST)
    assert s.last == {}
    assert s.counts_today == {}
    assert s.formula_today_ml == 0
    assert s.open_sleep_since is None
