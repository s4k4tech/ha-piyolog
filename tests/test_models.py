from __future__ import annotations

import json
from datetime import UTC, datetime
from pathlib import Path

import pytest

from custom_components.piyolog.models import (
    FeedParseError,
    UnsupportedSchemaVersionError,
    parse_feed,
)

FIXTURE = Path(__file__).parent / "fixtures" / "feed.json"


def load() -> dict:
    return json.loads(FIXTURE.read_text())


def test_parses_envelope_and_sorts_records_ascending():
    feed = parse_feed(load())
    assert feed.generated_at == datetime(2026, 11, 9, 5, 30, tzinfo=UTC)
    assert feed.range_from == datetime(2026, 11, 8, 5, 30, tzinfo=UTC)
    assert [r.event_id for r in feed.records] == ["e1", "e2", "e3", "e4", "e5"]


def test_feeding_fields():
    feed = parse_feed(load())
    breast, _, formula, *_ = feed.records
    assert breast.left_seconds == 480
    assert breast.right_seconds == 360
    assert breast.last_side == "right"
    assert breast.memo == "ok"
    assert breast.amount_ml is None
    assert formula.amount_ml == 140


def test_poop_details_and_missing_values_stay_missing():
    feed = parse_feed(load())
    poop = feed.records[1]
    assert poop.poop_details == {"hardness": "normal", "color": "yellow"}
    assert "amount" not in poop.poop_details


def test_unknown_type_is_kept():
    feed = parse_feed(load())
    assert feed.records[-1].type == "SomethingNew"


def test_empty_records_is_valid():
    payload = load()
    payload["records"] = []
    assert parse_feed(payload).records == ()


def test_unusable_records_are_skipped():
    payload = load()
    payload["records"] = [
        {"type": "Pee", "datetime": "2026-11-09T01:00:00Z"},  # no event_id
        {"event_id": "x", "type": "Pee", "datetime": "2026-11-09T01:00:00"},  # naive time
        "garbage",
        {"event_id": "ok", "type": "Pee", "datetime": "2026-11-09T01:00:00Z"},
    ]
    assert [r.event_id for r in parse_feed(payload).records] == ["ok"]


def test_unsupported_schema_version():
    payload = load()
    payload["schema_version"] = 2
    with pytest.raises(UnsupportedSchemaVersionError):
        parse_feed(payload)


@pytest.mark.parametrize("payload", [[], {}, {"schema_version": 1}])
def test_malformed_envelope_raises(payload):
    with pytest.raises(FeedParseError):
        parse_feed(payload)
