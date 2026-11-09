import { css } from "lit";

export const cardStyles = css`
  :host {
    display: block;
    --piyolog-milk: #4a90e2;
    --piyolog-sleep: #7c6fd6;
    --piyolog-pee: #e0834a;
    --piyolog-poop: #9a6b3f;
    --piyolog-dim: var(--secondary-text-color, #6a7587);
    --piyolog-fg: var(--primary-text-color, #1d2530);
    --piyolog-tile: var(--secondary-background-color, #f3f5f8);
    --piyolog-line: var(--divider-color, #e2e6ec);
  }
  ha-card {
    padding: 16px;
    display: grid;
    gap: 14px;
    color: var(--piyolog-fg);
  }
  ha-card.compact {
    padding: 12px 14px;
    gap: 12px;
  }
  .num {
    font-variant-numeric: tabular-nums;
  }
  .head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px 12px;
    min-width: 0;
  }
  .name {
    font-size: 16px;
    font-weight: 700;
    line-height: 1.25;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .sub {
    font-size: 12px;
    color: var(--piyolog-dim);
  }
  .pill {
    margin-left: auto;
    flex: none;
    font-size: 12px;
    font-weight: 700;
    padding: 5px 10px;
    border-radius: 999px;
    white-space: nowrap;
    color: var(--piyolog-sleep);
    background: color-mix(in srgb, var(--piyolog-sleep) 16%, transparent);
    font-variant-numeric: tabular-nums;
  }
  .tiles {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .tile {
    background: var(--piyolog-tile);
    border-radius: 10px;
    padding: 10px 12px;
    display: grid;
    gap: 2px;
    min-width: 0;
  }
  .tile .k {
    font-size: 11px;
    color: var(--piyolog-dim);
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .tile .v {
    font-size: 20px;
    font-weight: 500;
    line-height: 1.3;
    font-variant-numeric: tabular-nums;
  }
  .tile .v .unit,
  .big .v .unit {
    font-size: 12px;
    font-weight: 400;
    color: var(--piyolog-dim);
  }
  .tile .v.empty {
    font-size: 14px;
    color: var(--piyolog-dim);
    font-weight: 400;
  }
  .tile .d {
    font-size: 11px;
    color: var(--piyolog-dim);
    min-height: 1.2em;
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex: none;
  }
  .today {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-top: 1px solid var(--piyolog-line);
    padding-top: 12px;
    text-align: center;
  }
  .today > div {
    display: grid;
    gap: 2px;
    min-width: 0;
  }
  .today > div + div {
    border-left: 1px solid var(--piyolog-line);
  }
  .today .v {
    font-size: 16px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }
  .today .v .unit {
    font-size: 11px;
    font-weight: 400;
    color: var(--piyolog-dim);
  }
  .today .k {
    font-size: 11px;
    color: var(--piyolog-dim);
  }
  .message {
    padding: 8px 0;
    color: var(--piyolog-dim);
    font-size: 14px;
  }

  /* timeline */
  .tl {
    display: grid;
    gap: 10px;
  }
  .row {
    display: grid;
    grid-template-columns: 52px 1fr;
    align-items: center;
    gap: 8px;
  }
  .row .lab {
    font-size: 11px;
    color: var(--piyolog-dim);
  }
  .track {
    position: relative;
    height: 22px;
    background: var(--piyolog-tile);
    border-radius: 6px;
  }
  .bar {
    position: absolute;
    top: 3px;
    bottom: 3px;
    border-radius: 4px;
    background: var(--piyolog-sleep);
    opacity: 0.85;
  }
  .mark {
    position: absolute;
    top: 50%;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 2px var(--ha-card-background, var(--card-background-color, #fff));
  }
  .mark.milk {
    background: var(--piyolog-milk);
  }
  .mark.pee {
    background: var(--piyolog-pee);
  }
  .mark.poop {
    background: var(--piyolog-poop);
  }
  .mark.open-sleep {
    background: var(--ha-card-background, var(--card-background-color, #fff));
    border: 2px solid var(--piyolog-sleep);
    width: 8px;
    height: 8px;
  }
  .now {
    position: absolute;
    top: -4px;
    bottom: -4px;
    width: 2px;
    border-radius: 1px;
    background: var(--primary-color, #f2b705);
  }
  .axis {
    display: grid;
    grid-template-columns: 52px 1fr;
    gap: 8px;
  }
  .ticks {
    position: relative;
    height: 14px;
    font-size: 10px;
    color: var(--piyolog-dim);
    font-variant-numeric: tabular-nums;
  }
  .ticks span {
    position: absolute;
    transform: translateX(-50%);
  }
  .ticks span:first-child {
    transform: none;
  }
  .ticks span:last-child {
    transform: translateX(-100%);
  }
  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 14px;
    font-size: 11px;
    color: var(--piyolog-dim);
  }
  .legend i {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 5px;
    box-sizing: border-box;
  }
  .log {
    border-top: 1px solid var(--piyolog-line);
  }
  .log .item {
    display: grid;
    grid-template-columns: 44px 1fr auto;
    gap: 10px;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid var(--piyolog-line);
    font-size: 13px;
  }
  .log .item:last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }
  .log .t,
  .log .r {
    font-size: 12px;
    color: var(--piyolog-dim);
    font-variant-numeric: tabular-nums;
  }

  /* compact */
  .line {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }
  .ico {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: grid;
    place-items: center;
    flex: none;
  }
  .txt {
    min-width: 0;
    display: grid;
  }
  .txt b {
    font-size: 14px;
  }
  .txt span {
    font-size: 12px;
    color: var(--piyolog-dim);
  }
  .big {
    margin-left: auto;
    text-align: right;
    display: grid;
    flex: none;
  }
  .big .v {
    font-size: 18px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }
  .big .d {
    font-size: 11px;
    color: var(--piyolog-dim);
  }
  .quick {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
  .quick > div {
    background: var(--piyolog-tile);
    border-radius: 10px;
    padding: 8px 6px;
    text-align: center;
    font-size: 12px;
    color: var(--piyolog-dim);
    display: grid;
    gap: 2px;
    min-width: 0;
  }
  .quick .v {
    color: var(--piyolog-fg);
    font-size: 15px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }
`;
