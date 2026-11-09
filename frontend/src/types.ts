/** The small part of Home Assistant's frontend types that these cards use. */

export interface EntityEntry {
  entity_id: string;
  device_id?: string | null;
  platform?: string;
  translation_key?: string | null;
}

export interface HassState {
  state: string;
  attributes: Record<string, unknown>;
}

export interface HassDevice {
  id: string;
  name?: string | null;
  name_by_user?: string | null;
}

export interface HomeAssistant {
  states: Record<string, HassState>;
  entities: Record<string, EntityEntry>;
  devices: Record<string, HassDevice>;
  language: string;
  config: { time_zone: string };
}

export type CompactKind = "formula" | "sleep";

export interface PiyologCardConfig {
  type: string;
  device_id?: string;
  name?: string;
  kind?: CompactKind;
  tiles?: string[];
  totals?: string[];
  rows?: string[];
  legend?: boolean;
  log?: boolean;
  quick?: string[];
}

export type Lang = "ja" | "en";
