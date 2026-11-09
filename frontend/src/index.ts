import { PiyologCompactCard } from "./cards/compact-card";
import { PiyologListCard } from "./cards/list-card";
import { PiyologSummaryCard } from "./cards/summary-card";
import { PiyologTimelineCard } from "./cards/timeline-card";
import { PiyologCardEditor } from "./editor";

const CARDS = [
  {
    tag: "piyolog-summary-card",
    ctor: PiyologSummaryCard,
    name: "PiyoLog summary",
    description: "Last feeding, diaper changes and today's totals.",
  },
  {
    tag: "piyolog-timeline-card",
    ctor: PiyologTimelineCard,
    name: "PiyoLog timeline",
    description: "Sleep, feeding and diaper records across today.",
  },
  {
    tag: "piyolog-list-card",
    ctor: PiyologListCard,
    name: "PiyoLog list",
    description: "A narrow card listing the latest records, sized for the sections view.",
  },
  {
    tag: "piyolog-compact-card",
    ctor: PiyologCompactCard,
    name: "PiyoLog compact",
    description: "A one-line card for formula or sleep.",
  },
] as const;

for (const card of CARDS) {
  if (!customElements.get(card.tag)) customElements.define(card.tag, card.ctor);
}
if (!customElements.get("piyolog-card-editor")) {
  customElements.define("piyolog-card-editor", PiyologCardEditor);
}

const registry = ((window as unknown as { customCards?: unknown[] }).customCards ??= []);
for (const card of CARDS) {
  registry.push({ type: card.tag, name: card.name, description: card.description, preview: false });
}
