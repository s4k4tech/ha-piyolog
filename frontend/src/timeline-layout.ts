import type { Timeline } from "./data";

export type MarkKind = "milk" | "pee" | "poop" | "open-sleep";

export interface Bar {
  left: number;
  width: number;
}

export interface Mark {
  left: number;
  kind: MarkKind;
}

export interface TimelineLayout {
  sleepBars: Bar[];
  milkMarks: Mark[];
  diaperMarks: Mark[];
  openSleepMark?: Mark;
  /** Percent position of "now", or undefined when now is outside today. */
  now?: number;
}

function clampPercent(value: number): number {
  return Math.min(100, Math.max(0, value));
}

/** Converts a timeline into percentages of the day, so rendering needs no date math. */
export function layoutTimeline(timeline: Timeline, now: number): TimelineLayout {
  const start = timeline.start.getTime();
  const span = timeline.end.getTime() - start;
  const pct = (t: number) => clampPercent(((t - start) / span) * 100);

  const sleepBars: Bar[] = [];
  for (const interval of timeline.sleepIntervals) {
    const left = pct(interval.start.getTime());
    const right = pct(interval.end.getTime());
    if (right > left) sleepBars.push({ left, width: right - left });
  }

  const milkMarks: Mark[] = [];
  const diaperMarks: Mark[] = [];
  for (const r of timeline.records) {
    const left = pct(r.time.getTime());
    if (r.type === "Formula" || r.type === "BreastFeeding") milkMarks.push({ left, kind: "milk" });
    else if (r.type === "Pee") diaperMarks.push({ left, kind: "pee" });
    else if (r.type === "Poop") diaperMarks.push({ left, kind: "poop" });
  }

  const open = timeline.openSleepSince;
  const openSleepMark =
    open && open.getTime() >= start && open.getTime() < start + span
      ? ({ left: pct(open.getTime()), kind: "open-sleep" } as Mark)
      : undefined;

  const inDay = now >= start && now < start + span;
  return { sleepBars, milkMarks, diaperMarks, openSleepMark, now: inDay ? pct(now) : undefined };
}
