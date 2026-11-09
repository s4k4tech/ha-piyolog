import { describe, expect, it } from "vitest";
import { buildData, findPiyologDevices } from "../src/data";
import { layoutTimeline } from "../src/timeline-layout";
import type { HomeAssistant } from "../src/types";

function makeHass(states: Record<string, { state: string; attributes?: Record<string, unknown> }>): HomeAssistant {
  const entities: HomeAssistant["entities"] = {};
  const full: HomeAssistant["states"] = {};
  for (const [key, value] of Object.entries(states)) {
    const id = `sensor.haru_${key}`;
    entities[id] = { entity_id: id, device_id: "dev1", platform: "piyolog", translation_key: key };
    full[id] = { state: value.state, attributes: value.attributes ?? {} };
  }
  entities["sensor.other"] = { entity_id: "sensor.other", device_id: "dev2", platform: "other" };
  return {
    states: full,
    entities,
    devices: { dev1: { id: "dev1", name: "Haru" } },
    language: "ja",
    config: { time_zone: "Asia/Tokyo" },
  };
}

describe("buildData", () => {
  it("reads last records and attributes", () => {
    const data = buildData(
      makeHass({
        last_formula: { state: "2026-11-09T03:15:00+00:00", attributes: { amount_ml: 140 } },
        last_poop: { state: "2026-11-09T01:00:00+00:00", attributes: { hardness: "normal", color: "yellow" } },
        formula_today: { state: "640.0" },
        diaper_count_today: { state: "7" },
      }),
      "dev1",
    );
    expect(data.name).toBe("Haru");
    expect(data.formula?.ml).toBe(140);
    expect(data.poop).toMatchObject({ hardness: "normal", color: "yellow" });
    expect(data.today.formulaMl).toBe(640);
    expect(data.today.diapers).toBe(7);
    expect(data.pee).toBeUndefined();
  });

  it("treats unknown and unavailable as missing, never as zero", () => {
    const data = buildData(
      makeHass({
        last_pee: { state: "unknown" },
        formula_today: { state: "unavailable" },
        sleep_today: { state: "unknown" },
      }),
      "dev1",
    );
    expect(data.pee).toBeUndefined();
    expect(data.today.formulaMl).toBeUndefined();
    expect(data.today.sleepSeconds).toBeUndefined();
  });

  it("uses the newest of the sleep and wake-up records, without guessing", () => {
    const sleepNewer = buildData(
      makeHass({
        last_sleep: { state: "2026-11-09T04:58:00+00:00" },
        last_wake_up: { state: "2026-11-09T04:30:00+00:00" },
      }),
      "dev1",
    );
    expect(sleepNewer.sleepEvent?.kind).toBe("sleep");

    const wakeNewer = buildData(
      makeHass({
        last_sleep: { state: "2026-11-09T01:00:00+00:00" },
        last_wake_up: { state: "2026-11-09T02:00:00+00:00" },
      }),
      "dev1",
    );
    expect(wakeNewer.sleepEvent?.kind).toBe("wake");

    expect(buildData(makeHass({}), "dev1").sleepEvent).toBeUndefined();
  });

  it("prefers the configured name", () => {
    expect(buildData(makeHass({}), "dev1", "はる").name).toBe("はる");
  });
});

describe("findPiyologDevices", () => {
  it("returns only devices of the integration", () => {
    expect(findPiyologDevices(makeHass({ last_pee: { state: "unknown" } }))).toEqual(["dev1"]);
  });
});

describe("layoutTimeline", () => {
  const timeline = {
    start: new Date("2026-11-08T15:00:00Z"), // 00:00 JST
    end: new Date("2026-11-09T15:00:00Z"),
    records: [
      { time: new Date("2026-11-08T18:00:00Z"), type: "Formula" }, // 03:00 JST -> 12.5%
      { time: new Date("2026-11-09T03:00:00Z"), type: "Pee" }, // 12:00 JST -> 50%
      { time: new Date("2026-11-09T04:00:00Z"), type: "Poop" },
      { time: new Date("2026-11-09T04:00:00Z"), type: "Bath" },
    ],
    sleepIntervals: [{ start: new Date("2026-11-08T15:00:00Z"), end: new Date("2026-11-08T21:00:00Z") }],
    openSleepSince: new Date("2026-11-09T04:58:00Z"),
  };

  it("places marks and bars as percentages of the day", () => {
    const layout = layoutTimeline(timeline, new Date("2026-11-09T05:30:00Z").getTime());
    expect(layout.sleepBars).toEqual([{ left: 0, width: 25 }]);
    expect(layout.milkMarks[0].left).toBeCloseTo(12.5);
    expect(layout.diaperMarks.map((m) => m.kind)).toEqual(["pee", "poop"]);
    expect(layout.openSleepMark?.left).toBeCloseTo(((13 * 60 + 58) / (24 * 60)) * 100, 1);
    expect(layout.now).toBeCloseTo(((14 * 60 + 30) / (24 * 60)) * 100, 1);
  });

  it("hides the now line outside the day", () => {
    expect(layoutTimeline(timeline, new Date("2026-11-10T20:00:00Z").getTime()).now).toBeUndefined();
  });
});
