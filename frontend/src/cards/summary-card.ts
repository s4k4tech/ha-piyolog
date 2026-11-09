import { html, type TemplateResult } from "lit";
import { PiyologBaseCard, emphasizeNumbers } from "../base-card";
import type { PiyologData } from "../data";
import type { PiyologCardConfig } from "../types";
import { SUMMARY_TILES, SUMMARY_TOTALS, pickItems } from "../items";
import { formatDuration, formatElapsed, formatSides } from "../format";

export class PiyologSummaryCard extends PiyologBaseCard {
  private tile(
    label: string,
    color: string,
    time: Date | undefined,
    detail: string | undefined,
  ): TemplateResult {
    const dot = html`<i class="dot" style="background:var(${color})"></i>`;
    if (!time) {
      return html`<div class="tile">
        <div class="k">${dot}${label}</div>
        <div class="v empty">${this.s.noRecord}</div>
        <div class="d"></div>
      </div>`;
    }
    return html`<div class="tile">
      <div class="k">${dot}${label}</div>
      <div class="v">${emphasizeNumbers(formatElapsed(this._now - time.getTime(), this.uiLang))}</div>
      <div class="d num">${[this.clock(time), detail].filter(Boolean).join(" · ")}</div>
    </div>`;
  }

  override setConfig(config: PiyologCardConfig): void {
    pickItems(config.tiles, SUMMARY_TILES, "tiles");
    pickItems(config.totals, SUMMARY_TOTALS, "totals");
    super.setConfig(config);
  }

  private count(value: number | undefined, unit = ""): TemplateResult {
    return value === undefined
      ? html`<span class="v">–</span>`
      : html`<span class="v">${value}${unit ? html`<span class="unit">${unit}</span>` : ""}</span>`;
  }

  protected renderCard(data: PiyologData): TemplateResult {
    const s = this.s;
    const poopDetail = [
      data.poop?.hardness ? (s.hardness[data.poop.hardness] ?? data.poop.hardness) : undefined,
      data.poop?.color ? (s.color[data.poop.color] ?? data.poop.color) : undefined,
    ]
      .filter(Boolean)
      .join(" · ");
    const feedingDetail = data.breastfeeding
      ? formatSides(data.breastfeeding.leftSeconds, data.breastfeeding.rightSeconds, this.uiLang)
      : undefined;
    const sleepSeconds = data.today.sleepSeconds;

    const tileOf = {
      formula: this.tile(
        s.lastFormula,
        "--piyolog-milk",
        data.formula?.time,
        data.formula?.ml !== undefined ? `${data.formula.ml}ml` : undefined,
      ),
      breastfeeding: this.tile(s.lastBreastfeeding, "--piyolog-milk", data.breastfeeding?.time, feedingDetail),
      pee: this.tile(s.lastPee, "--piyolog-pee", data.pee?.time, undefined),
      poop: this.tile(s.lastPoop, "--piyolog-poop", data.poop?.time, poopDetail || undefined),
    };
    const totalOf = {
      formula: html`<div>${this.count(data.today.formulaMl, "ml")}<span class="k">${s.formula}</span></div>`,
      breastfeeding: html`<div>${this.count(data.today.breastfeedings)}<span class="k">${s.breastfeeding}</span></div>`,
      diapers: html`<div>${this.count(data.today.diapers)}<span class="k">${s.diapers}</span></div>`,
      sleep: html`<div>
        <span class="v"
          >${sleepSeconds === undefined ? "–" : emphasizeNumbers(formatDuration(sleepSeconds * 1000, this.uiLang))}</span
        ><span class="k">${s.sleepConfirmed}</span>
      </div>`,
    };
    const tiles = pickItems(this._config?.tiles, SUMMARY_TILES, "tiles");
    const totals = pickItems(this._config?.totals, SUMMARY_TOTALS, "totals");

    return html`
      <div class="head">
        <div style="min-width:0">
          <div class="name">${data.name}</div>
          <div class="sub num">${data.lastUpdated ? s.updated(this.clock(data.lastUpdated)) : ""}</div>
        </div>
        ${this.renderSleepPill(data)}
      </div>
      ${tiles.length ? html`<div class="tiles">${tiles.map((id) => tileOf[id])}</div>` : ""}
      ${totals.length ? html`<div class="today">${totals.map((id) => totalOf[id])}</div>` : ""}
    `;
  }

  static getConfigElement(): HTMLElement {
    return document.createElement("piyolog-card-editor");
  }

  static getStubConfig(): Record<string, unknown> {
    return {};
  }
}
