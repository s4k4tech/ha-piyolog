# ha-piyolog

Home Assistant integration and dashboard cards for [PiyoLog](https://www.piyolog.com/) data feeds.

> **Unofficial project.** This project is not affiliated with, endorsed by, or sponsored by PiyoLog.

> **Status:** work in progress. The integration (sensors) works; the dashboard cards are not released yet.

## What it does

- Reads a PiyoLog [data feed](https://www.piyolog.com/app/piyolog/data_feed/en/index.html) and exposes the records as Home Assistant sensors.
- Shows only what PiyoLog records and simple summaries of it (counts, totals, elapsed time). It does not predict or estimate anything, such as the next feeding time.

## Requirements

- A PiyoLog account with permission to create data feeds (account administrator).
- Home Assistant 2025.1 or newer.
- The free plan only offers a 24-hour feed. That is enough for this integration. Longer periods require PiyoLog Premium.

## Installation

### HACS (custom repository)

1. In HACS, open the menu and choose **Custom repositories**.
2. Add `https://github.com/s4k4tech/ha-piyolog` as an **Integration**.
3. Download **PiyoLog** and restart Home Assistant.

### Manual

Copy `custom_components/piyolog` into the `custom_components` folder of your Home Assistant configuration and restart.

## Setup

1. In PiyoLog, create a data feed and copy its URL.
2. In Home Assistant, go to **Settings → Devices & services → Add integration → PiyoLog**.
3. Enter the child's name and paste the feed URL. PiyoLog does not provide the name, so it is entered here.

Add one entry per feed. The update interval (default 5 minutes, minimum 1 minute) can be changed in the integration's options.

## Entities

Each feed becomes one device with these sensors.

| Entity | Description |
|---|---|
| Last formula | Time of the last formula record. Attribute: `amount_ml` |
| Last breastfeeding | Time of the last breastfeeding record. Attributes: `left_seconds`, `right_seconds`, `last_side`, `amount_ml` |
| Last pee | Time of the last pee record |
| Last poop | Time of the last poop record. Attributes: `amount`, `hardness`, `color` |
| Last sleep record | Time of the last Sleep record |
| Last wake-up record | Time of the last WakeUp record |
| Formula today | Sum of recorded formula amounts (ml) since local midnight. Records without an amount are not counted |
| Breastfeedings today | Number of breastfeeding records since local midnight |
| Diaper changes today | Number of pee and poop records since local midnight |
| Sleep today | Total of confirmed sleep intervals since local midnight |
| Timeline | Today's records, for use by the cards (diagnostic) |
| Last updated | When PiyoLog generated the data (diagnostic) |

Attributes that PiyoLog did not record are left out, never filled with zero.

### How sleep is calculated

PiyoLog does not provide sleep durations. A sleep interval is counted only when a Sleep record is directly followed by a WakeUp record. If a WakeUp was never recorded, that period is not counted and the last record is shown as it is. The integration never claims that a child is asleep.

### What counts as "formula"

Only `Formula` records. Expressed breast milk, pumping and drinks are not included.

## Limitations

- PiyoLog caches feeds for about 1 to 15 minutes, so new records can appear with a delay.
- A feed is a snapshot. Deleted records may remain until the cache refreshes.
- "Today" is based on the time zone configured in Home Assistant.
- The 24-hour feed only contains the last 24 hours. Totals for "today" are always covered by it.

## Security

A feed URL contains a secret and works as a credential. Anyone who has it can read the feed.

- Do not share it or commit it to a repository.
- The integration stores it in the config entry, masks it in the setup form, and never logs it or includes it in diagnostics.
- Home Assistant stores the URL unencrypted in its `.storage` folder, so be careful when sharing backups.
- If the URL leaks, revoke the feed in PiyoLog and create a new one. Home Assistant will ask for the new URL.

## Development

```bash
python3.13 -m venv .venv
.venv/bin/pip install -r requirements-dev.txt
.venv/bin/ruff check . && .venv/bin/ruff format --check .
.venv/bin/pytest
```

## License

[MIT](LICENSE)
