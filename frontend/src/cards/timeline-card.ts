import { html, type TemplateResult } from "lit";
import { PiyologBaseCard } from "../base-card";
import type { PiyologData, TimelineRecord } from "../data";
import { layoutTimeline, type Mark } from "../timeline-layout";

const TICK_HOURS = [0, 6, 12, 18, 24];
const LOG_ITEMS = 4;

export class PiyologTimelineCard extends PiyologBaseCard {
  private marks(marks: Mark[]): TemplateResult[] {
    return marks.map((m) => html`<div class="mark ${m.kind}" style="left:${m.left}%"></div>`);
  }

  private recordDetail(r: TimelineRecord): string {
    const s = this.s;
    if (r.type === "Poop" && r.details) {
      return [
        r.details.hardness ? (s.hardness[r.details.hardness] ?? r.details.hardness) : undefined,
        r.details.color ? (s.color[r.details.color] ?? r.details.color) : undefined,
      ]
        .filter(Boolean)
        .join(" · ");
    }
    return r.amountMl !== undefined ? `${r.amountMl}ml` : "";
  }

  protected renderCard(data: PiyologData): TemplateResult {
    const s = this.s;
    const timeline = data.timeline;
    const header = html`<div class="head">
      <div style="min-width:0">
        <div class="name">${data.name} · ${s.today}</div>
        <div class="sub num">0:00 – 24:00</div>
      </div>
      ${this.renderSleepPill(data)}
    </div>`;
    if (!timeline) return html`${header}<div class="message">${s.noRecord}</div>`;

    const layout = layoutTimeline(timeline, this._now);
    const now = layout.now === undefined ? "" : html`<div class="now" style="left:${layout.now}%"></div>`;
    const row = (label: string, inner: TemplateResult | TemplateResult[]) => html`<div class="row">
      <div class="lab">${label}</div>
      <div class="track">${inner}${now}</div>
    </div>`;

    const recent = [...timeline.records].reverse().slice(0, LOG_ITEMS);

    return html`
      ${header}
      <div class="tl">
        ${row(
          s.sleepRow,
          html`${layout.sleepBars.map(
            (b) => html`<div class="bar" style="left:${b.left}%;width:${b.width}%"></div>`,
          )}${layout.openSleepMark ? this.marks([layout.openSleepMark]) : ""}`,
        )}
        ${row(s.milkRow, this.marks(layout.milkMarks))} ${row(s.diaperRow, this.marks(layout.diaperMarks))}
      </div>
      <div class="axis">
        <span></span>
        <div class="ticks">${TICK_HOURS.map((h) => html`<span style="left:${(h / 24) * 100}%">${h}:00</span>`)}</div>
      </div>
      <div class="legend">
        <span><i style="background:var(--piyolog-sleep)"></i>${s.legendSleep}</span>
        <span><i style="border:2px solid var(--piyolog-sleep)"></i>${s.legendOpenSleep}</span>
        <span><i style="background:var(--piyolog-milk)"></i>${s.legendMilk}</span>
        <span><i style="background:var(--piyolog-pee)"></i>${s.legendPee}</span>
        <span><i style="background:var(--piyolog-poop)"></i>${s.legendPoop}</span>
      </div>
      <div class="log">
        ${recent.map(
          (r) => html`<div class="item">
            <span class="t">${this.clock(r.time)}</span>
            <span>${s.types[r.type] ?? r.type}</span>
            <span class="r">${this.recordDetail(r)}</span>
          </div>`,
        )}
      </div>
    `;
  }

  override getCardSize(): number {
    return 6;
  }

  static getConfigElement(): HTMLElement {
    return document.createElement("piyolog-card-editor");
  }

  static getStubConfig(): Record<string, unknown> {
    return {};
  }
}
