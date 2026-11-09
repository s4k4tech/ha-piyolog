// A fixed "now" of 14:30 JST on 2026-11-09 so screenshots are repeatable.
const NOW = Date.parse("2026-11-09T05:30:00Z");
Date.now = () => NOW;

window.__mockHass = (language, empty) => {
  const sensors = empty
    ? { last_updated: ["2026-11-09T05:29:00+00:00"] }
    : {
        last_formula: ["2026-11-09T03:15:00+00:00", { amount_ml: 140 }],
        last_breastfeeding: ["2026-11-09T01:50:00+00:00", { left_seconds: 480, right_seconds: 360, last_side: "right" }],
        last_pee: ["2026-11-09T04:25:00+00:00"],
        last_poop: ["2026-11-08T23:40:00+00:00", { hardness: "normal", color: "yellow" }],
        last_sleep: ["2026-11-09T04:58:00+00:00"],
        last_wake_up: ["2026-11-09T04:30:00+00:00"],
        formula_today: ["640.0"],
        breastfeeding_count_today: ["3"],
        diaper_count_today: ["7"],
        sleep_today: ["33600.0"],
        last_updated: ["2026-11-09T05:29:00+00:00"],
        timeline: [
          "11",
          {
            today_start: "2026-11-08T15:00:00+00:00",
            today_end: "2026-11-09T15:00:00+00:00",
            open_sleep_since: "2026-11-09T04:58:00+00:00",
            sleep_intervals: [
              { start: "2026-11-08T15:00:00+00:00", end: "2026-11-08T21:30:00+00:00" },
              { start: "2026-11-09T00:00:00+00:00", end: "2026-11-09T01:30:00+00:00" },
              { start: "2026-11-09T02:55:00+00:00", end: "2026-11-09T04:30:00+00:00" },
            ],
            records: [
              { time: "2026-11-08T16:20:00+00:00", type: "Formula", amount_ml: 120 },
              { time: "2026-11-08T16:30:00+00:00", type: "Pee" },
              { time: "2026-11-08T19:10:00+00:00", type: "Formula", amount_ml: 140 },
              { time: "2026-11-08T23:40:00+00:00", type: "Poop", details: { hardness: "normal", color: "yellow" } },
              { time: "2026-11-09T01:50:00+00:00", type: "BreastFeeding" },
              { time: "2026-11-09T03:15:00+00:00", type: "Formula", amount_ml: 140 },
              { time: "2026-11-09T04:25:00+00:00", type: "Pee" },
              { time: "2026-11-09T04:58:00+00:00", type: "Sleep" },
            ],
          },
        ],
      };

  const entities = {};
  const states = {};
  for (const [key, [state, attributes]] of Object.entries(sensors)) {
    const id = `sensor.haru_${key}`;
    entities[id] = { entity_id: id, device_id: "dev1", platform: "piyolog", translation_key: key };
    states[id] = { state, attributes: attributes || {} };
  }
  return {
    states,
    entities,
    devices: { dev1: { id: "dev1", name: "はる" } },
    language,
    config: { time_zone: "Asia/Tokyo" },
  };
};
