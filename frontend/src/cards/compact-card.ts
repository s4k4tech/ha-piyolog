import { html, type TemplateResult } from "lit";
import { PiyologBaseCard, emphasizeNumbers } from "../base-card";
import type { PiyologData } from "../data";
import { formatDuration, formatElapsed } from "../format";

export class PiyologCompactCard extends PiyologBaseCard {
  protected override compactCard = true;

  private icon(name: string, color: string): TemplateResult {
    return html`<div class="ico" style="background:color-mix(in srgb, var(${color}) 18%, transparent)">
      <ha-icon icon=${name} style="color:var(${color})"></ha-icon>
    </div>`;
  }

  private renderFormula(data: PiyologData): TemplateResult {
    const s = this.s;
    const f = data.formula;
    const sub = f ? [this.clock(f.time), f.ml !== undefined ? `${f.ml}ml` : undefined].filter(Boolean).join(" · ") : "";
    const sinceDiaper = data.poop ? formatDuration(this._now - data.poop.time.getTime(), this.uiLang) : "–";
    return html`
      <div class="line">
        ${this.icon("mdi:baby-bottle-outline", "--piyolog-milk")}
        <div class="txt"><b>${s.lastFormula}</b><span class="num">${f ? sub : s.noRecord}</span></div>
        ${f
          ? html`<div class="big">
              <span class="v" style="color:var(--piyolog-milk)"
                >${emphasizeNumbers(formatElapsed(this._now - f.time.getTime(), this.uiLang))}</span
              >
              ${data.today.formulaMl !== undefined
                ? html`<span class="d num">${s.todayTotal} ${data.today.formulaMl}ml</span>`
                : ""}
            </div>`
          : ""}
      </div>
      <div class="quick">
        <div><span class="v">${data.today.breastfeedings ?? "–"}</span>${s.breastfeeding}</div>
        <div><span class="v">${data.today.diapers ?? "–"}</span>${s.diapers}</div>
        <div><span class="v">${sinceDiaper}</span>${s.poopSince}</div>
      </div>
    `;
  }

  private renderSleep(data: PiyologData): TemplateResult {
    const s = this.s;
    const ev = data.sleepEvent;
    if (!ev) {
      return html`<div class="line">
        ${this.icon("mdi:sleep", "--piyolog-sleep")}
        <div class="txt"><b>${s.sleepConfirmed}</b><span>${s.noRecord}</span></div>
      </div>`;
    }
    const seconds = data.today.sleepSeconds;
    return html`<div class="line">
      ${this.icon("mdi:sleep", "--piyolog-sleep")}
      <div class="txt">
        <b>${ev.kind === "sleep" ? s.types.Sleep : s.types.WakeUp}</b><span class="num">${this.clock(ev.time)}</span>
      </div>
      <div class="big">
        <span class="v" style="color:var(--piyolog-sleep)"
          >${emphasizeNumbers(formatElapsed(this._now - ev.time.getTime(), this.uiLang))}</span
        >
        ${seconds !== undefined
          ? html`<span class="d num">${s.recordedSleep} ${formatDuration(seconds * 1000, this.uiLang)}</span>`
          : ""}
      </div>
    </div>`;
  }

  protected renderCard(data: PiyologData): TemplateResult {
    return this._config?.kind === "sleep" ? this.renderSleep(data) : this.renderFormula(data);
  }

  override getCardSize(): number {
    return this._config?.kind === "sleep" ? 1 : 2;
  }

  static getConfigElement(): HTMLElement {
    return document.createElement("piyolog-card-editor");
  }

  static getStubConfig(): Record<string, unknown> {
    return { kind: "formula" };
  }
}
