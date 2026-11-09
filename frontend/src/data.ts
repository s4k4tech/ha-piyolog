import type { HomeAssistant, HassState } from "./types";

export interface TimelineRecord {
  time: Date;
  type: string;
  amountMl?: number;
  details?: Record<string, string>;
}

export interface Timeline {
  start: Date;
  end: Date;
  records: TimelineRecord[];
  sleepIntervals: { start: Date; end: Date }[];
  openSleepSince?: Date;
}

export interface PiyologData {
  name: string;
  lastUpdated?: Date;
  formula?: { time: Date; ml?: number };
  breastfeeding?: { time: Date; leftSeconds?: number; rightSeconds?: number };
  pee?: { time: Date };
  poop?: { time: Date; hardness?: string; color?: string };
  /** The most recent Sleep or WakeUp record. Never an inference about whether the child sleeps. */
  sleepEvent?: { kind: "sleep" | "wake"; time: Date };
  today: {
    formulaMl?: number;
    breastfeedings?: number;
    diapers?: number;
    sleepSeconds?: number;
  };
  timeline?: Timeline;
}

const UNUSABLE = new Set(["unknown", "unavailable", ""]);

function usable(state: HassState | undefined): state is HassState {
  return state !== undefined && !UNUSABLE.has(state.state);
}

function toDate(value: unknown): Date | undefined {
  if (typeof value !== "string") return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function toNumber(value: unknown): number | undefined {
  const n = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  return Number.isFinite(n) ? n : undefined;
}

function toText(value: unknown): string | undefined {
  return typeof value === "string" && value !== "" ? value : undefined;
}

/** Sensors of the device, keyed by translation key. */
export function entitiesByKey(hass: HomeAssistant, deviceId: string): Record<string, string> {
  const result: Record<string, string> = {};
  for (const entry of Object.values(hass.entities)) {
    if (entry.device_id === deviceId && entry.platform === "piyolog" && entry.translation_key) {
      result[entry.translation_key] = entry.entity_id;
    }
  }
  return result;
}

export function findPiyologDevices(hass: HomeAssistant): string[] {
  const ids = new Set<string>();
  for (const entry of Object.values(hass.entities)) {
    if (entry.platform === "piyolog" && entry.device_id) ids.add(entry.device_id);
  }
  return [...ids];
}

export function deviceName(hass: HomeAssistant, deviceId: string): string {
  const device = hass.devices[deviceId];
  return device?.name_by_user || device?.name || "PiyoLog";
}

function parseTimeline(state: HassState | undefined): Timeline | undefined {
  if (!usable(state)) return undefined;
  const a = state.attributes;
  const start = toDate(a.today_start);
  const end = toDate(a.today_end);
  if (!start || !end) return undefined;

  const records: TimelineRecord[] = [];
  for (const raw of Array.isArray(a.records) ? a.records : []) {
    const r = raw as Record<string, unknown>;
    const time = toDate(r.time);
    const type = toText(r.type);
    if (!time || !type) continue;
    const details =
      r.details && typeof r.details === "object" ? (r.details as Record<string, string>) : undefined;
    records.push({ time, type, amountMl: toNumber(r.amount_ml), details });
  }

  const sleepIntervals: { start: Date; end: Date }[] = [];
  for (const raw of Array.isArray(a.sleep_intervals) ? a.sleep_intervals : []) {
    const i = raw as Record<string, unknown>;
    const s = toDate(i.start);
    const e = toDate(i.end);
    if (s && e) sleepIntervals.push({ start: s, end: e });
  }

  return { start, end, records, sleepIntervals, openSleepSince: toDate(a.open_sleep_since) };
}

export function buildData(hass: HomeAssistant, deviceId: string, nameOverride?: string): PiyologData {
  const ids = entitiesByKey(hass, deviceId);
  const get = (key: string): HassState | undefined => {
    const id = ids[key];
    return id ? hass.states[id] : undefined;
  };
  const time = (key: string): Date | undefined => {
    const s = get(key);
    return usable(s) ? toDate(s.state) : undefined;
  };
  const number = (key: string): number | undefined => {
    const s = get(key);
    return usable(s) ? toNumber(s.state) : undefined;
  };

  const formulaTime = time("last_formula");
  const feedingTime = time("last_breastfeeding");
  const peeTime = time("last_pee");
  const poopTime = time("last_poop");
  const sleepTime = time("last_sleep");
  const wakeTime = time("last_wake_up");

  let sleepEvent: PiyologData["sleepEvent"];
  if (sleepTime && (!wakeTime || sleepTime > wakeTime)) sleepEvent = { kind: "sleep", time: sleepTime };
  else if (wakeTime) sleepEvent = { kind: "wake", time: wakeTime };

  const fa = get("last_formula")?.attributes ?? {};
  const ba = get("last_breastfeeding")?.attributes ?? {};
  const pa = get("last_poop")?.attributes ?? {};
  const sleepSeconds = number("sleep_today");

  return {
    name: nameOverride || deviceName(hass, deviceId),
    lastUpdated: time("last_updated"),
    formula: formulaTime ? { time: formulaTime, ml: toNumber(fa.amount_ml) } : undefined,
    breastfeeding: feedingTime
      ? {
          time: feedingTime,
          leftSeconds: toNumber(ba.left_seconds),
          rightSeconds: toNumber(ba.right_seconds),
        }
      : undefined,
    pee: peeTime ? { time: peeTime } : undefined,
    poop: poopTime ? { time: poopTime, hardness: toText(pa.hardness), color: toText(pa.color) } : undefined,
    sleepEvent,
    today: {
      formulaMl: number("formula_today"),
      breastfeedings: number("breastfeeding_count_today"),
      diapers: number("diaper_count_today"),
      sleepSeconds,
    },
    timeline: parseTimeline(get("timeline")),
  };
}
