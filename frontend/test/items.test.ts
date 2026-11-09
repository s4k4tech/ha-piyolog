import { describe, expect, it } from "vitest";
import { COMPACT_QUICK, SUMMARY_TILES, pickItems } from "../src/items";

describe("pickItems", () => {
  it("shows everything when unset", () => {
    expect(pickItems(undefined, SUMMARY_TILES, "tiles")).toEqual([...SUMMARY_TILES]);
  });

  it("keeps the configured order and drops duplicates", () => {
    expect(pickItems(["poop", "formula", "poop"], SUMMARY_TILES, "tiles")).toEqual(["poop", "formula"]);
  });

  it("treats an empty list as hiding everything", () => {
    expect(pickItems([], COMPACT_QUICK, "quick")).toEqual([]);
  });

  it("rejects unknown names and non-lists", () => {
    expect(() => pickItems(["milk"], SUMMARY_TILES, "tiles")).toThrow(/Unknown tiles item "milk"/);
    expect(() => pickItems("formula", SUMMARY_TILES, "tiles")).toThrow(/must be a list/);
  });
});
