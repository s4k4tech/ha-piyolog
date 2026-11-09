import { LitElement, html, nothing } from "lit";
import { langOf, strings } from "./i18n";
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

  private schema(): SchemaItem[] {
    const s = strings(langOf(this.hass?.language));
    const items: SchemaItem[] = [
      { name: "device_id", selector: { device: { integration: "piyolog" } } },
      { name: "name", selector: { text: {} } },
    ];
    if (this._config?.type.endsWith("piyolog-compact-card")) {
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
    }
    return items;
  }

  private label = (item: { name: string }): string => {
    const s = strings(langOf(this.hass?.language));
    const labels: Record<string, string> = {
      device_id: s.editorDevice,
      name: s.editorName,
      kind: s.editorKind,
    };
    return labels[item.name] ?? item.name;
  };

  private changed(event: CustomEvent<{ value: PiyologCardConfig }>): void {
    event.stopPropagation();
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: { ...this._config, ...event.detail.value } },
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    if (!this.hass || !this._config) return nothing;
    return html`<ha-form
      .hass=${this.hass}
      .data=${this._config}
      .schema=${this.schema()}
      .computeLabel=${this.label}
      @value-changed=${this.changed}
    ></ha-form>`;
  }
}
