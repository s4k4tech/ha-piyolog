import { describe, expect, it } from "vitest";
import { formatClock, formatDuration, formatElapsed, formatSides } from "../src/format";

const MIN = 60_000;
const HOUR = 60 * MIN;

describe("formatElapsed", () => {
  it("shows units in Japanese", () => {
    expect(formatElapsed(30_000, "ja")).toBe("たった今");
    expect(formatElapsed(45 * MIN, "ja")).toBe("45分前");
    expect(formatElapsed(2 * HOUR + 15 * MIN, "ja")).toBe("2時間15分前");
    expect(formatElapsed(3 * HOUR, "ja")).toBe("3時間前");
    expect(formatElapsed(27 * HOUR + 10 * MIN, "ja")).toBe("1日3時間前");
    expect(formatElapsed(48 * HOUR, "ja")).toBe("2日前");
  });

  it("shows units in English", () => {
    expect(formatElapsed(10_000, "en")).toBe("just now");
    expect(formatElapsed(45 * MIN, "en")).toBe("45m ago");
    expect(formatElapsed(2 * HOUR + 15 * MIN, "en")).toBe("2h 15m ago");
    expect(formatElapsed(3 * HOUR, "en")).toBe("3h ago");
    expect(formatElapsed(27 * HOUR, "en")).toBe("1d 3h ago");
  });
});

describe("formatDuration", () => {
  it("formats hours and minutes", () => {
    expect(formatDuration(32 * MIN, "ja")).toBe("32分");
    expect(formatDuration(95 * MIN, "ja")).toBe("1時間35分");
    expect(formatDuration(95 * MIN, "en")).toBe("1h 35m");
    expect(formatDuration(0, "ja")).toBe("0分");
  });
});

describe("formatClock", () => {
  it("uses the given time zone", () => {
    const date = new Date("2026-11-09T05:29:00Z");
    expect(formatClock(date, "Asia/Tokyo")).toBe("14:29");
    expect(formatClock(date, "UTC")).toBe("05:29");
  });
});

describe("formatSides", () => {
  it("omits sides that were not recorded", () => {
    expect(formatSides(480, 360, "ja")).toBe("左 8分 / 右 6分");
    expect(formatSides(undefined, 360, "ja")).toBe("右 6分");
    expect(formatSides(undefined, undefined, "ja")).toBe("");
  });
});
