# Changelog

## 0.4.0

- Add an icon for the integration (shown in Home Assistant 2026.3 and newer).
- README: one transparent image per card in a plain `<img>` tag, so the screenshots show up in HACS.

## 0.3.2

- Use absolute URLs for the README images and links, so that they show up in HACS.

## 0.3.1

- Expand the README (English and Japanese): one section per card with screenshots, options and examples, plus troubleshooting.
- Raise the minimum Home Assistant version to 2025.4, the oldest version the automated tests run on. The integration has been run on 2026.10.

## 0.3.0

- Add `piyolog-list-card`, a narrow card that lists the latest records. It shows the last breastfeeding, pee, poop and sleep by default, and fits 3 columns by 3 rows in the sections view. Items are selectable and reorderable (`items`).

## 0.2.0

- Choose and reorder the items each card shows (`tiles`, `totals`, `rows`, `legend`, `log`, `quick`), also in the visual editor.

## 0.1.0

First release.

- Sensors for the last formula, breastfeeding, pee, poop, sleep and wake-up records, and today's totals.
- Config flow with reauthentication and an update-interval option.
- Summary, timeline and compact dashboard cards, served by the integration.
- Backs off on rate limits and server errors; never logs the feed URL.
