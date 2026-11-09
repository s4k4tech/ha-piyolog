import { LitElement, html, nothing, type TemplateResult } from "lit";
import { buildData, findPiyologDevices, type PiyologData } from "./data";
import { formatClock, formatDuration } from "./format";
import { langOf, strings, type Strings } from "./i18n";
import { cardStyles } from "./styles";
import type { Lang, HomeAssistant, PiyologCardConfig } from "./types";

const TICK_MS = 30_000;

/** Splits "2時間15分前" into numbers and units so the numbers can be emphasised. */
export function emphasizeNumbers(text: string): TemplateResult {
  const parts = text.split(/(\d+)/).filter((p) => p !== "");
  return html`${parts.map((p) => (/^\d+$/.test(p) ? html`${p}` : html`<span class="unit">${p}</span>`))}`;
}

export abstract class PiyologBaseCard extends LitElement {
  static override properties = {
    hass: { attribute: false },
    _config: { state: true },
    _now: { state: true },
  };
  static override styles = cardStyles;

  declare hass?: HomeAssistant;
  declare _config?: PiyologCardConfig;
  declare _now: number;
  private _timer?: number;

  constructor() {
    super();
    this._now = Date.now();
  }

  setConfig(config: PiyologCardConfig): void {
    this._config = { ...config };
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this._now = Date.now();
    this._timer = window.setInterval(() => (this._now = Date.now()), TICK_MS);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    window.clearInterval(this._timer);
  }

  getCardSize(): number {
    return 4;
  }

  protected get uiLang(): Lang {
    return langOf(this.hass?.language);
  }

  protected get s(): Strings {
    return strings(this.uiLang);
  }

  protected clock(date: Date): string {
    return formatClock(date, this.hass?.config.time_zone ?? "UTC");
  }

  /** The device to show: the configured one, or the only PiyoLog device if there is just one. */
  private deviceId(): string | undefined {
    if (!this.hass) return undefined;
    if (this._config?.device_id) return this._config.device_id;
    const all = findPiyologDevices(this.hass);
    return all.length === 1 ? all[0] : undefined;
  }

  protected abstract renderCard(data: PiyologData): TemplateResult;

  protected compactCard = false;

  override render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const id = this.deviceId();
    if (!id) {
      const none = findPiyologDevices(this.hass).length === 0;
      return html`<ha-card><div class="message">${none ? this.s.noDevice : this.s.pickDevice}</div></ha-card>`;
    }
    const data = buildData(this.hass, id, this._config.name);
    return html`<ha-card class=${this.compactCard ? "compact" : ""}>${this.renderCard(data)}</ha-card>`;
  }

  /** The Sleep/WakeUp pill. It states the last record and how long ago it was made. */
  protected renderSleepPill(data: PiyologData): TemplateResult | typeof nothing {
    const ev = data.sleepEvent;
    if (!ev) return nothing;
    const text = (ev.kind === "sleep" ? this.s.sleptSince : this.s.wokeSince)(
      this.clock(ev.time),
      formatDuration(this._now - ev.time.getTime(), this.uiLang),
    );
    return html`<div class="pill">${text}</div>`;
  }
}
