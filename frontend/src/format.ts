import { strings } from "./i18n";
import type { Lang } from "./types";

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/** "2時間15分" / "2h 15m". Under a minute shows "0分". */
export function formatDuration(ms: number, lang: Lang): string {
  const s = strings(lang);
  const total = Math.max(0, Math.floor(ms / MINUTE));
  const d = Math.floor(total / (24 * 60));
  const h = Math.floor((total % (24 * 60)) / 60);
  const m = total % 60;
  const sep = lang === "ja" ? "" : " ";
  const parts: string[] = [];
  if (d > 0) parts.push(`${d}${s.days}`);
  if (d > 0 || h > 0) parts.push(`${h}${s.hours}`);
  if (d === 0 && (m > 0 || h === 0)) parts.push(`${m}${s.minutes}`);
  if (d > 0 && h === 0 && m === 0) parts.pop();
  return parts.join(sep).trim();
}

/** "2時間15分前" / "2h 15m ago" / "たった今". */
export function formatElapsed(ms: number, lang: Lang): string {
  const s = strings(lang);
  if (ms < MINUTE) return s.justNow;
  if (ms >= DAY) {
    // Days and hours only; minutes are noise at that scale.
    const d = Math.floor(ms / DAY);
    const h = Math.floor((ms % DAY) / HOUR);
    const text = h > 0 ? formatDuration(d * DAY + h * HOUR, lang) : formatDuration(d * DAY, lang);
    return `${text}${s.agoSuffix}`;
  }
  return `${formatDuration(ms, lang)}${s.agoSuffix}`;
}

/** Clock time such as "14:29" in the Home Assistant time zone. */
export function formatClock(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone,
  }).format(date);
}

/** Left/right breastfeeding durations, e.g. "左 8分 / 右 6分". */
export function formatSides(left: number | undefined, right: number | undefined, lang: Lang): string {
  const s = strings(lang);
  const part = (label: string, seconds: number | undefined) =>
    seconds && seconds > 0 ? `${label} ${Math.round(seconds / 60)}${s.minutesShort}` : undefined;
  return [part(s.left, left), part(s.right, right)].filter(Boolean).join(" / ");
}
