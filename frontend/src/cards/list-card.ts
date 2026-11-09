import { css, html, type TemplateResult } from "lit";
import { PiyologBaseCard, emphasizeNumbers } from "../base-card";
import type { PiyologData } from "../data";
import { formatDuration, formatElapsed } from "../format";
import { LIST_DEFAULT, LIST_ITEMS, pickItems } from "../items";
import { cardStyles } from "../styles";
import type { PiyologCardConfig } from "../types";

/**
 * A narrow card that lists records one per line. It is sized to sit next to
 * Home Assistant's entities cards in a sections dashboard (3 columns wide).
 */
export class PiyologListCard extends PiyologBaseCard {
  static override styles = [
    cardStyles,
    css`
      :host {
        height: 100%;
      }
      ha-card {
        height: 100%;
        box-sizing: border-box;
        padding: 12px 14px;
        gap: 6px;
        align-content: start;
      }
      .list-title {
        font-size: 16px;
        font-weight: 500;
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .li {
        display: grid;
        grid-template-columns: 8px minmax(0, 1fr) 3.4em auto;
        align-items: baseline;
        gap: 0 8px;
        min-height: 28px;
        align-content: center;
        font-size: 14px;
      }
      .li .dot {
        align-self: center;
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }
      .li .lab {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .li .at {
        text-align: right;
        font-size: 12px;
        color: var(--piyolog-dim);
        font-variant-numeric: tabular-nums;
      }
      .li .val {
        font-weight: 500;
        text-align: right;
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
      }
      .li .val.empty {
        color: var(--piyolog-dim);
        font-weight: 400;
      }
      .li .val .unit {
        font-size: 11px;
        font-weight: 400;
        color: var(--piyolog-dim);
      }
    `,
  ];

  override setConfig(config: PiyologCardConfig): void {
    pickItems(config.items, LIST_ITEMS, "items", LIST_DEFAULT);
    super.setConfig(config);
  }

  private line(
    color: string,
    label: string,
    value: TemplateResult | string | undefined,
    time?: Date,
  ): TemplateResult {
    return html`<div class="li">
      <i class="dot" style="background:var(${color})"></i>
      <span class="lab">${label}</span>
      <span class="at">${time ? this.clock(time) : ""}</span>
      ${value === undefined
        ? html`<span class="val empty">${this.s.noRecord}</span>`
        : html`<span class="val">${value}</span>`}
    </div>`;
  }

  private since(time: Date | undefined): TemplateResult | undefined {
    return time ? emphasizeNumbers(formatElapsed(this._now - time.getTime(), this.uiLang)) : undefined;
  }

  private total(value: number | undefined, unit = ""): TemplateResult | undefined {
    return value === undefined
      ? undefined
      : html`${value}${unit ? html`<span class="unit">${unit}</span>` : ""}`;
  }

  protected renderCard(data: PiyologData): TemplateResult {
    const s = this.s;
    const sleep = data.sleepEvent;
    const sleepSeconds = data.today.sleepSeconds;
    const lines = {
      breastfeeding: () =>
        this.line("--piyolog-milk", s.breastfeeding, this.since(data.breastfeeding?.time), data.breastfeeding?.time),
      pee: () => this.line("--piyolog-pee", s.lastPee, this.since(data.pee?.time), data.pee?.time),
      poop: () => this.line("--piyolog-poop", s.lastPoop, this.since(data.poop?.time), data.poop?.time),
      sleep: () =>
        this.line(
          "--piyolog-sleep",
          sleep ? (sleep.kind === "sleep" ? s.types.Sleep : s.types.WakeUp) : s.sleepConfirmed,
          this.since(sleep?.time),
          sleep?.time,
        ),
      formula: () => this.line("--piyolog-milk", s.formula, this.since(data.formula?.time), data.formula?.time),
      today_formula: () => this.line("--piyolog-milk", s.todayFormula, this.total(data.today.formulaMl, "ml")),
      today_breastfeeding: () =>
        this.line("--piyolog-milk", s.todayBreastfeeding, this.total(data.today.breastfeedings)),
      today_diapers: () => this.line("--piyolog-pee", s.todayDiapers, this.total(data.today.diapers)),
      today_sleep: () =>
        this.line(
          "--piyolog-sleep",
          s.todaySleep,
          sleepSeconds === undefined ? undefined : emphasizeNumbers(formatDuration(sleepSeconds * 1000, this.uiLang)),
        ),
    };
    const items = pickItems(this._config?.items, LIST_ITEMS, "items", LIST_DEFAULT);
    return html`<div class="list-title">${data.name}</div>
      ${items.map((id) => lines[id]())}`;
  }

  /** Sections view: 3 columns wide, 3 rows high for up to four lines; taller for more. */
  getGridOptions(): Record<string, number> {
    const n = pickItems(this._config?.items, LIST_ITEMS, "items", LIST_DEFAULT).length;
    return { columns: 3, min_columns: 3, rows: 3 + Math.ceil(Math.max(0, n - 4) / 2), min_rows: 2 };
  }

  override getCardSize(): number {
    return 3;
  }

  static getConfigElement(): HTMLElement {
    return document.createElement("piyolog-card-editor");
  }

  static getStubConfig(): Record<string, unknown> {
    return {};
  }
}
