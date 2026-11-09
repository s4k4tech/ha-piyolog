"""Sensors for PiyoLog."""

from __future__ import annotations

from collections.abc import Callable, Mapping
from dataclasses import dataclass
from datetime import datetime
from typing import Any

from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntity,
    SensorEntityDescription,
)
from homeassistant.const import EntityCategory, UnitOfTime, UnitOfVolume
from homeassistant.core import HomeAssistant
from homeassistant.helpers.device_registry import DeviceInfo
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback
from homeassistant.helpers.typing import StateType
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import CONF_NAME, DOMAIN
from .coordinator import PiyologConfigEntry, PiyologCoordinator
from .models import Record
from .summary import BREAST_FEEDING, FORMULA, PEE, POOP, SLEEP, WAKE_UP, Summary

PARALLEL_UPDATES = 0


def _time_of(type_: str) -> Callable[[Summary], datetime | None]:
    def value(summary: Summary) -> datetime | None:
        record = summary.last.get(type_)
        return record.time if record else None

    return value


def _feeding_attrs(summary: Summary) -> Mapping[str, Any]:
    record = summary.last.get(BREAST_FEEDING)
    if record is None:
        return {}
    return _drop_none(
        {
            "left_seconds": record.left_seconds,
            "right_seconds": record.right_seconds,
            "last_side": record.last_side,
            "amount_ml": record.amount_ml,
        }
    )


def _formula_attrs(summary: Summary) -> Mapping[str, Any]:
    record = summary.last.get(FORMULA)
    return _drop_none({"amount_ml": record.amount_ml}) if record else {}


def _poop_attrs(summary: Summary) -> Mapping[str, Any]:
    record = summary.last.get(POOP)
    return dict(record.poop_details) if record else {}


def _sleep_today_attrs(summary: Summary) -> Mapping[str, Any]:
    return {"open_sleep_since": summary.open_sleep_since}


def _drop_none(values: Mapping[str, Any]) -> dict[str, Any]:
    return {k: v for k, v in values.items() if v is not None}


def _compact(record: Record) -> dict[str, Any]:
    """A record reduced to what the cards need. Memos are intentionally left out."""
    item: dict[str, Any] = {"time": record.time.isoformat(), "type": record.type}
    if record.amount_ml is not None:
        item["amount_ml"] = record.amount_ml
    if details := record.poop_details:
        item["details"] = dict(details)
    return item


def _timeline_attrs(summary: Summary) -> Mapping[str, Any]:
    return {
        "today_start": summary.today_start.isoformat(),
        "today_end": summary.today_end.isoformat(),
        "records": [_compact(r) for r in summary.today_records],
        "sleep_intervals": [
            {"start": i.start.isoformat(), "end": i.end.isoformat()}
            for i in summary.sleep_intervals
        ],
        "open_sleep_since": summary.open_sleep_since.isoformat()
        if summary.open_sleep_since
        else None,
    }


@dataclass(frozen=True, kw_only=True)
class PiyologSensorDescription(SensorEntityDescription):
    """Describes a PiyoLog sensor."""

    value_fn: Callable[[Summary], StateType | datetime]
    attrs_fn: Callable[[Summary], Mapping[str, Any]] | None = None


def _count(*types: str) -> Callable[[Summary], int]:
    return lambda summary: sum(summary.counts_today.get(t, 0) for t in types)


SENSORS: tuple[PiyologSensorDescription, ...] = (
    PiyologSensorDescription(
        key="last_formula",
        translation_key="last_formula",
        device_class=SensorDeviceClass.TIMESTAMP,
        value_fn=_time_of(FORMULA),
        attrs_fn=_formula_attrs,
    ),
    PiyologSensorDescription(
        key="last_breastfeeding",
        translation_key="last_breastfeeding",
        device_class=SensorDeviceClass.TIMESTAMP,
        value_fn=_time_of(BREAST_FEEDING),
        attrs_fn=_feeding_attrs,
    ),
    PiyologSensorDescription(
        key="last_pee",
        translation_key="last_pee",
        device_class=SensorDeviceClass.TIMESTAMP,
        value_fn=_time_of(PEE),
    ),
    PiyologSensorDescription(
        key="last_poop",
        translation_key="last_poop",
        device_class=SensorDeviceClass.TIMESTAMP,
        value_fn=_time_of(POOP),
        attrs_fn=_poop_attrs,
    ),
    PiyologSensorDescription(
        key="last_sleep",
        translation_key="last_sleep",
        device_class=SensorDeviceClass.TIMESTAMP,
        value_fn=_time_of(SLEEP),
    ),
    PiyologSensorDescription(
        key="last_wake_up",
        translation_key="last_wake_up",
        device_class=SensorDeviceClass.TIMESTAMP,
        value_fn=_time_of(WAKE_UP),
    ),
    PiyologSensorDescription(
        key="formula_today",
        translation_key="formula_today",
        native_unit_of_measurement=UnitOfVolume.MILLILITERS,
        suggested_display_precision=0,
        value_fn=lambda s: s.formula_today_ml,
    ),
    PiyologSensorDescription(
        key="breastfeeding_count_today",
        translation_key="breastfeeding_count_today",
        value_fn=_count(BREAST_FEEDING),
    ),
    PiyologSensorDescription(
        key="diaper_count_today",
        translation_key="diaper_count_today",
        value_fn=_count(PEE, POOP),
    ),
    PiyologSensorDescription(
        key="sleep_today",
        translation_key="sleep_today",
        device_class=SensorDeviceClass.DURATION,
        native_unit_of_measurement=UnitOfTime.SECONDS,
        suggested_unit_of_measurement=UnitOfTime.HOURS,
        suggested_display_precision=1,
        value_fn=lambda s: s.sleep_today_seconds,
        attrs_fn=_sleep_today_attrs,
    ),
    PiyologSensorDescription(
        key="timeline",
        translation_key="timeline",
        entity_category=EntityCategory.DIAGNOSTIC,
        value_fn=lambda s: len(s.today_records),
        attrs_fn=_timeline_attrs,
    ),
    PiyologSensorDescription(
        key="last_updated",
        translation_key="last_updated",
        device_class=SensorDeviceClass.TIMESTAMP,
        entity_category=EntityCategory.DIAGNOSTIC,
        value_fn=lambda s: s.generated_at,
    ),
)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: PiyologConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    """Set up sensors for a config entry."""
    coordinator = entry.runtime_data
    async_add_entities(PiyologSensor(coordinator, entry, d) for d in SENSORS)


class PiyologSensor(CoordinatorEntity[PiyologCoordinator], SensorEntity):
    """A sensor backed by the PiyoLog summary."""

    _attr_has_entity_name = True
    # Large and rebuilt on every update, so they are not worth storing in the database.
    _unrecorded_attributes = frozenset({"records", "sleep_intervals"})

    entity_description: PiyologSensorDescription

    def __init__(
        self,
        coordinator: PiyologCoordinator,
        entry: PiyologConfigEntry,
        description: PiyologSensorDescription,
    ) -> None:
        super().__init__(coordinator)
        self.entity_description = description
        self._attr_unique_id = f"{entry.entry_id}_{description.key}"
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, entry.entry_id)},
            name=entry.data[CONF_NAME],
            manufacturer="PiyoLog (unofficial)",
            model="Data feed",
        )

    @property
    def available(self) -> bool:
        # Keep showing the last known data when a refresh fails. "Last updated" shows its age.
        return self.coordinator.data is not None

    @property
    def native_value(self) -> StateType | datetime:
        return self.entity_description.value_fn(self.coordinator.data)

    @property
    def extra_state_attributes(self) -> Mapping[str, Any] | None:
        if self.entity_description.attrs_fn is None:
            return None
        return self.entity_description.attrs_fn(self.coordinator.data)
