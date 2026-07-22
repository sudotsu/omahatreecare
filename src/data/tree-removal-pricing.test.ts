import { describe, expect, it } from "vitest";
import { treeRemovalCostArticle } from "./treehouse/tree-removal-cost";
import {
  TREE_REMOVAL_ARTICLE_ROWS,
  formatTreeRemovalRange,
  getTreeRemovalPlanningAssessment,
} from "./tree-removal-pricing";

describe("tree-removal planning ranges", () => {
  it("uses the shared pricing rows in the published article", () => {
    const pricingTable = treeRemovalCostArticle.body.find(
      (block) => block.type === "table" && block.caption?.includes("planning ranges by tree height"),
    );

    expect(pricingTable).toMatchObject({
      type: "table",
      rows: TREE_REMOVAL_ARTICLE_ROWS,
    });
  });

  it("returns the published height range without adding invented dollars", () => {
    const result = getTreeRemovalPlanningAssessment({
      heightId: "50",
      access: "restricted",
      targets: "dense",
      condition: "declining",
    });

    if (!result.range) throw new Error("Expected a height-based range");
    expect(formatTreeRemovalRange(result.range)).toBe("$1,040–$1,540");
    expect(result.position).toBe("upper");
    expect(result.drivers).toEqual(expect.arrayContaining([
      expect.objectContaining({ label: "Access", selection: "Restricted backyard access", influence: "pushes-higher" }),
      expect.objectContaining({ label: "Drop zone", influence: "pushes-higher" }),
    ]));
  });

  it("uses the broad benchmark when the homeowner cannot estimate height", () => {
    const result = getTreeRemovalPlanningAssessment({
      heightId: "unsure",
      access: "open",
      targets: "clear",
      condition: "intact",
    });

    expect(result.range).toBeNull();
    expect(result.position).toBe("broad");
    expect(result.explanation).toMatch(/cannot responsibly place this project within the benchmark/i);
    expect(result.drivers).toHaveLength(3);
  });

  it.each([
    ["utilities", "intact", true, false],
    ["clear", "urgent", false, true],
  ] as const)(
    "requires a site review for targets=%s and condition=%s",
    (targets, condition, requiresUtilityReview, hasUrgentWarningSigns) => {
      const result = getTreeRemovalPlanningAssessment({
        heightId: "40",
        access: "open",
        targets,
        condition,
      });

      expect(result.position).toBe("site-review");
      expect(result.requiresUtilityReview).toBe(requiresUtilityReview);
      expect(result.hasUrgentWarningSigns).toBe(hasUrgentWarningSigns);
      expect(result.explanation).not.toMatch(/major damage|unpredictable|high-risk/i);
    },
  );
});
