/** Items each card can show. The order of a config list is the order on screen. */
export const SUMMARY_TILES = ["formula", "breastfeeding", "pee", "poop"] as const;
export const SUMMARY_TOTALS = ["formula", "breastfeeding", "diapers", "sleep"] as const;
export const TIMELINE_ROWS = ["sleep", "milk", "diaper"] as const;
export const COMPACT_QUICK = ["breastfeeding", "diapers", "poop_since"] as const;

/**
 * Validates a configured item list. An unset option shows every item;
 * an empty list shows none. Unknown names throw so a typo shows up as a card error.
 */
export function pickItems<T extends string>(value: unknown, allowed: readonly T[], key: string): T[] {
  if (value === undefined || value === null) return [...allowed];
  if (!Array.isArray(value)) throw new Error(`${key} must be a list`);
  const seen = new Set<T>();
  for (const item of value) {
    if (!allowed.includes(item as T)) {
      throw new Error(`Unknown ${key} item "${String(item)}". Use: ${allowed.join(", ")}`);
    }
    seen.add(item as T);
  }
  return [...seen];
}
