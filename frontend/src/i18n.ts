import type { Lang } from "./types";

export interface Strings {
  noDevice: string;
  pickDevice: string;
  noRecord: string;
  justNow: string;
  agoSuffix: string;
  updated: (time: string) => string;
  sleptSince: (time: string, duration: string) => string;
  wokeSince: (time: string, duration: string) => string;
  lastFormula: string;
  lastBreastfeeding: string;
  lastPee: string;
  lastPoop: string;
  today: string;
  formula: string;
  breastfeeding: string;
  diapers: string;
  sleepConfirmed: string;
  sleepRow: string;
  milkRow: string;
  diaperRow: string;
  legendSleep: string;
  legendOpenSleep: string;
  legendMilk: string;
  legendPee: string;
  legendPoop: string;
  left: string;
  right: string;
  minutesShort: string;
  hours: string;
  minutes: string;
  days: string;
  editorDevice: string;
  editorName: string;
  editorKind: string;
  editorTiles: string;
  editorTotals: string;
  editorRows: string;
  editorLegend: string;
  editorLog: string;
  editorQuick: string;
  editorItems: string;
  todayFormula: string;
  todayBreastfeeding: string;
  todayDiapers: string;
  todaySleep: string;
  kindFormula: string;
  kindSleep: string;
  sleepStartedAt: string;
  poopSince: string;
  recordedSleep: string;
  todayTotal: string;
  hardness: Record<string, string>;
  color: Record<string, string>;
  types: Record<string, string>;
}

const ja: Strings = {
  noDevice: "PiyoLog のデバイスが見つかりません",
  pickDevice: "カードの設定でデバイスを選んでください",
  noRecord: "記録なし",
  justNow: "たった今",
  agoSuffix: "前",
  updated: (t) => `更新 ${t}`,
  sleptSince: (t, d) => `就寝 ${t} から ${d}`,
  wokeSince: (t, d) => `起床 ${t} から ${d}`,
  lastFormula: "最後のミルク",
  lastBreastfeeding: "最後の授乳",
  lastPee: "おしっこ",
  lastPoop: "うんち",
  today: "今日",
  formula: "ミルク",
  breastfeeding: "授乳",
  diapers: "おむつ",
  sleepConfirmed: "睡眠",
  sleepRow: "睡眠",
  milkRow: "ミルク",
  diaperRow: "排泄",
  legendSleep: "睡眠（起床まで記録済み）",
  legendOpenSleep: "就寝（起床が未記録）",
  legendMilk: "ミルク・授乳",
  legendPee: "おしっこ",
  legendPoop: "うんち",
  left: "左",
  right: "右",
  minutesShort: "分",
  hours: "時間",
  minutes: "分",
  days: "日",
  editorDevice: "デバイス",
  editorName: "名前（省略するとデバイス名）",
  editorKind: "表示内容",
  editorTiles: "最後の記録（並び順どおりに表示）",
  editorTotals: "今日の合計（並び順どおりに表示）",
  editorRows: "タイムラインの行（並び順どおりに表示）",
  editorLegend: "凡例を表示",
  editorLog: "最近の記録を表示",
  editorQuick: "下段の項目（並び順どおりに表示）",
  editorItems: "表示する項目（並び順どおりに表示）",
  todayFormula: "今日のミルク",
  todayBreastfeeding: "今日の授乳",
  todayDiapers: "今日のおむつ",
  todaySleep: "今日の睡眠",
  kindFormula: "ミルク",
  kindSleep: "睡眠",
  sleepStartedAt: "就寝",
  poopSince: "うんちから",
  recordedSleep: "記録済み睡眠",
  todayTotal: "今日の合計",
  hardness: { diarrhea: "下痢", soft: "軟らかい", normal: "普通", hard: "硬い" },
  color: {
    white: "白",
    yellow: "黄色",
    orange: "オレンジ",
    brown: "茶色",
    green: "緑",
    red: "赤",
    black: "黒",
  },
  types: {
    Formula: "ミルク",
    BreastFeeding: "授乳",
    ExpressedBreastMilk: "搾母乳",
    Pumping: "搾乳",
    Sleep: "就寝",
    WakeUp: "起床",
    Pee: "おしっこ",
    Poop: "うんち",
    Temperature: "体温",
    Weight: "体重",
    Height: "身長",
    Solid: "離乳食",
    Snack: "間食",
    Meal: "食事",
    Drink: "飲み物",
    Bath: "お風呂",
    Medicine: "投薬",
    Hospital: "通院",
    Walking: "散歩",
  },
};

const en: Strings = {
  noDevice: "No PiyoLog device found",
  pickDevice: "Choose a device in the card settings",
  noRecord: "No record",
  justNow: "just now",
  agoSuffix: " ago",
  updated: (t) => `Updated ${t}`,
  sleptSince: (t, d) => `Bedtime ${t} · ${d}`,
  wokeSince: (t, d) => `Woke ${t} · ${d}`,
  lastFormula: "Last formula",
  lastBreastfeeding: "Last breastfeeding",
  lastPee: "Pee",
  lastPoop: "Poop",
  today: "Today",
  formula: "Formula",
  breastfeeding: "Feeds",
  diapers: "Diapers",
  sleepConfirmed: "Sleep",
  sleepRow: "Sleep",
  milkRow: "Milk",
  diaperRow: "Diaper",
  legendSleep: "Sleep (wake-up recorded)",
  legendOpenSleep: "Bedtime (no wake-up yet)",
  legendMilk: "Formula / breastfeeding",
  legendPee: "Pee",
  legendPoop: "Poop",
  left: "L",
  right: "R",
  minutesShort: "min",
  hours: "h",
  minutes: "m",
  days: "d",
  editorDevice: "Device",
  editorName: "Name (defaults to the device name)",
  editorKind: "Show",
  editorTiles: "Last records (shown in this order)",
  editorTotals: "Today's totals (shown in this order)",
  editorRows: "Timeline rows (shown in this order)",
  editorLegend: "Show legend",
  editorLog: "Show recent records",
  editorQuick: "Bottom items (shown in this order)",
  editorItems: "Items (shown in this order)",
  todayFormula: "Formula today",
  todayBreastfeeding: "Breastfeedings today",
  todayDiapers: "Diapers today",
  todaySleep: "Sleep today",
  kindFormula: "Formula",
  kindSleep: "Sleep",
  sleepStartedAt: "Bedtime",
  poopSince: "since poop",
  recordedSleep: "Recorded sleep",
  todayTotal: "Today",
  hardness: { diarrhea: "Diarrhea", soft: "Soft", normal: "Normal", hard: "Hard" },
  color: {
    white: "White",
    yellow: "Yellow",
    orange: "Orange",
    brown: "Brown",
    green: "Green",
    red: "Red",
    black: "Black",
  },
  types: {
    Formula: "Formula",
    BreastFeeding: "Breastfeeding",
    ExpressedBreastMilk: "Expressed milk",
    Pumping: "Pumping",
    Sleep: "Bedtime",
    WakeUp: "Wake-up",
    Pee: "Pee",
    Poop: "Poop",
    Temperature: "Temperature",
    Weight: "Weight",
    Height: "Height",
    Solid: "Solid food",
    Snack: "Snack",
    Meal: "Meal",
    Drink: "Drink",
    Bath: "Bath",
    Medicine: "Medicine",
    Hospital: "Hospital",
    Walking: "Walk",
  },
};

export function langOf(language: string | undefined): Lang {
  return language?.toLowerCase().startsWith("ja") ? "ja" : "en";
}

export function strings(lang: Lang): Strings {
  return lang === "ja" ? ja : en;
}
