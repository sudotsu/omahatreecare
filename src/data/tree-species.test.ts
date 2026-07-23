import { describe, expect, it } from "vitest";
import { treeDatabase } from "./tree-species";

// DOC-001: the tool species count must derive from this single source. This
// guards against the reintroduced "12 species" drift by pinning the count and
// the record shape the tools index and species tool both rely on.
describe("tree species single source of truth", () => {
  it("exposes exactly the profiles the tools describe", () => {
    expect(treeDatabase.length).toBe(10);
  });

  it("every profile has the fields the UI and counts depend on", () => {
    for (const tree of treeDatabase) {
      expect(tree.name.length).toBeGreaterThan(0);
      expect(tree.scientificName.length).toBeGreaterThan(0);
      expect(["high", "moderate", "low"]).toContain(tree.concernLevel);
    }
  });

  it("has no duplicate species names", () => {
    const names = treeDatabase.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });
});
