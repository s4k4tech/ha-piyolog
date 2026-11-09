import { LitElement, html, nothing } from "lit";
import { langOf, strings } from "./i18n";
import { COMPACT_QUICK, SUMMARY_TILES, SUMMARY_TOTALS, TIMELINE_ROWS } from "./items";
import type { HomeAssistant, PiyologCardConfig } from "./types";

interface SchemaItem {
  name: string;
  selector: Record<string, unknown>;
}

/** Visual editor shared by all three cards. */
export class PiyologCardEditor extends LitElement {
  static override properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  declare hass?: HomeAssistant;
  declare _config?: PiyologCardConfig;

  setConfig(config: PiyologCardConfig): void {
    this._config = config;
  }

  private multi(values: readonly string[], labels: Record<string, string>) {
    return {
      select: {
        multiple: true,
        reorder: true,
        mode: "list",
        options: values.map((value) => ({ value, label: labels[value] ?? value })),
      },
    };
  }

  private schema(): SchemaItem[] {
    const s = strings(langOf(this.hass?.language));
    const type = this._config?.type ?? "";
    const items: SchemaItem[] = [
      { name: "device_id", selector: { device: { integration: "piyolog" } } },
      { name: "name", selector: { text: {} } },
    ];
    if (type.endsWith("piyolog-summary-card")) {
      items.push(
        {
          name: "tiles",
          selector: this.multi(SUMMARY_TILES, {
            formula: s.lastFormula,
            breastfeeding: s.lastBreastfeeding,
            pee: s.lastPee,
            poop: s.lastPoop,
          }),
        },
        {
          name: "totals",
          selector: this.multi(SUMMARY_TOTALS, {
            formula: s.formula,
            breastfeeding: s.breastfeeding,
            diapers: s.diapers,
            sleep: s.sleepConfirmed,
          }),
        },
      );
    } else if (type.endsWith("piyolog-timeline-card")) {
      items.push(
        {
          name: "rows",
          selector: this.multi(TIMELINE_ROWS, {
            sleep: s.sleepRow,
            milk: s.milkRow,
            diaper: s.diaperRow,
          }),
        },
        { name: "legend", selector: { boolean: {} } },
        { name: "log", selector: { boolean: {} } },
      );
    } else if (type.endsWith("piyolog-compact-card")) {
      items.push({
        name: "kind",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "formula", label: s.kindFormula },
              { value: "sleep", label: s.kindSleep },
            ],
          },
        },
      });
      if (this._config?.kind !== "sleep") {
        items.push({
          name: "quick",
          selector: this.multi(COMPACT_QUICK, {
            breastfeeding: s.breastfeeding,
            diapers: s.diapers,
            poop_since: s.poopSince,
          }),
        });
      }
    }
    return items;
  }

  /** What the form shows: options that are not configured behave as "show everything". */
  private formData(): Record<string, unknown> {
    return {
      tiles: [...SUMMARY_TILES],
      totals: [...SUMMARY_TOTALS],
      rows: [...TIMELINE_ROWS],
      legend: true,
      log: true,
      quick: [...COMPACT_QUICK],
      ...this._config,
    };
  }

  private label = (item: { name: string }): string => {
    const s = strings(langOf(this.hass?.language));
    const labels: Record<string, string> = {
      device_id: s.editorDevice,
      name: s.editorName,
      kind: s.editorKind,
      tiles: s.editorTiles,
      totals: s.editorTotals,
      rows: s.editorRows,
      legend: s.editorLegend,
      log: s.editorLog,
      quick: s.editorQuick,
    };
    return labels[item.name] ?? item.name;
  };

  private changed(event: CustomEvent<{ value: PiyologCardConfig }>): void {
    event.stopPropagation();
    // The form data carries defaults for every card type; keep only this card's own fields.
    const value = event.detail.value as unknown as Record<string, unknown>;
    const own: Record<string, unknown> = {};
    for (const { name } of this.schema()) own[name] = value[name];
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: { ...this._config, ...own } },
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    if (!this.hass || !this._config) return nothing;
    return html`<ha-form
      .hass=${this.hass}
      .data=${this.formData()}
      .schema=${this.schema()}
      .computeLabel=${this.label}
      @value-changed=${this.changed}
    ></ha-form>`;
  }
}
