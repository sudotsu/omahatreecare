export const TREE_REMOVAL_PRICING_YEAR = 2025;

export const TREE_REMOVAL_MARKET_SUMMARY = {
  typical: 1_500,
  mostJobsMin: 900,
  mostJobsMax: 2_200,
} as const;

export const TREE_REMOVAL_HEIGHT_RANGES = [
  {
    id: "up-to-20",
    articleLabel: "Up to 20 ft (ornamentals, small evergreens)",
    toolLabel: "Up to 20 ft",
    min: 350,
    max: 780,
    driver: "Simple ground-level cuts, minimal material",
  },
  {
    id: "30",
    articleLabel: "30 ft",
    toolLabel: "About 30 ft",
    min: 820,
    max: 1_120,
    driver: "Moderate canopy, some lowering",
  },
  {
    id: "40",
    articleLabel: "40 ft",
    toolLabel: "About 40 ft",
    min: 930,
    max: 1_330,
    driver: "Larger canopy, more rigging",
  },
  {
    id: "50",
    articleLabel: "50 ft",
    toolLabel: "About 50 ft",
    min: 1_040,
    max: 1_540,
    driver: "Heavier limbs, careful lowering",
  },
  {
    id: "60",
    articleLabel: "60 ft",
    toolLabel: "About 60 ft",
    min: 1_150,
    max: 1_740,
    driver: "Large crew, more rigging",
  },
  {
    id: "70",
    articleLabel: "70 ft",
    toolLabel: "About 70 ft",
    min: 1_260,
    max: 1_950,
    driver: "Sectional removal, specialized equipment",
  },
  {
    id: "80",
    articleLabel: "80 ft",
    toolLabel: "About 80 ft",
    min: 1_370,
    max: 2_160,
    driver: "Sectional removal near targets, largest crews",
  },
] as const;

export type TreeRemovalHeightId = (typeof TREE_REMOVAL_HEIGHT_RANGES)[number]["id"];
export type TreeRemovalHeightSelection = TreeRemovalHeightId | "unsure";
export type TreeRemovalAccess = "open" | "limited" | "restricted";
export type TreeRemovalTargets = "clear" | "some" | "dense" | "utilities";
export type TreeRemovalCondition = "intact" | "declining" | "urgent";
export type RangePosition = "lower" | "middle" | "upper" | "broad" | "site-review";
export type PlanningDriverInfluence = "supports-lower" | "adds-work" | "pushes-higher" | "site-review";

export interface TreeRemovalPlanningDriver {
  label: string;
  selection: string;
  influence: PlanningDriverInfluence;
  explanation: string;
}

export interface TreeRemovalPlanningInputs {
  heightId: TreeRemovalHeightSelection;
  access: TreeRemovalAccess;
  targets: TreeRemovalTargets;
  condition: TreeRemovalCondition;
}

export interface TreeRemovalPlanningAssessment {
  range: (typeof TREE_REMOVAL_HEIGHT_RANGES)[number] | null;
  position: RangePosition;
  positionLabel: string;
  explanation: string;
  drivers: TreeRemovalPlanningDriver[];
  requiresUtilityReview: boolean;
  hasUrgentWarningSigns: boolean;
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatTreeRemovalCurrency(value: number): string {
  return currencyFormatter.format(value);
}

export function formatTreeRemovalRange(
  range: Pick<(typeof TREE_REMOVAL_HEIGHT_RANGES)[number], "min" | "max">,
): string {
  return `${formatTreeRemovalCurrency(range.min)}–${formatTreeRemovalCurrency(range.max)}`;
}

export const TREE_REMOVAL_ARTICLE_ROWS: string[][] = TREE_REMOVAL_HEIGHT_RANGES.map((range) => [
  range.articleLabel,
  formatTreeRemovalRange(range),
  range.driver,
]);

/**
 * Characterizes where the reported site factors may place a job within its
 * height-based range. It intentionally does not invent dollar adjustments.
 */
export function getTreeRemovalPlanningAssessment(
  inputs: TreeRemovalPlanningInputs,
): TreeRemovalPlanningAssessment {
  const range = inputs.heightId === "unsure"
    ? null
    : TREE_REMOVAL_HEIGHT_RANGES.find(({ id }) => id === inputs.heightId) ?? null;

  if (inputs.heightId !== "unsure" && !range) {
    throw new Error(`Unknown tree-removal height range: ${inputs.heightId}`);
  }

  const requiresUtilityReview = inputs.targets === "utilities";
  const hasUrgentWarningSigns = inputs.condition === "urgent";
  const drivers: TreeRemovalPlanningDriver[] = [
    {
      label: "Access",
      selection: {
        open: "Open access",
        limited: "Some access limits",
        restricted: "Restricted backyard access",
      }[inputs.access],
      influence: {
        open: "supports-lower" as const,
        limited: "adds-work" as const,
        restricted: "pushes-higher" as const,
      }[inputs.access],
      explanation: {
        open: "A wide, mostly level route supports the lower part of the planning range.",
        limited: "Gates, slope, or carrying distance can add handling time.",
        restricted: "Narrow or obstructed access can move a project toward the upper end or beyond it.",
      }[inputs.access],
    },
    {
      label: "Drop zone",
      selection: {
        clear: "Mostly open",
        some: "A few nearby obstacles",
        dense: "Structures or tight targets",
        utilities: "Utility lines reported",
      }[inputs.targets],
      influence: {
        clear: "supports-lower" as const,
        some: "adds-work" as const,
        dense: "pushes-higher" as const,
        utilities: "site-review" as const,
      }[inputs.targets],
      explanation: {
        clear: "An open work area supports the lower part of the planning range.",
        some: "Nearby obstacles can require more controlled lowering.",
        dense: "Structures and tight targets can require smaller pieces and more controlled movement.",
        utilities: "Utility responsibility and clearance need review before pricing guidance is useful.",
      }[inputs.targets],
    },
    {
      label: "Reported condition",
      selection: {
        intact: "Appears intact",
        declining: "Dead, declining, or uncertain",
        urgent: "Emergency or storm cleanup",
      }[inputs.condition],
      influence: {
        intact: "supports-lower" as const,
        declining: "adds-work" as const,
        urgent: "site-review" as const,
      }[inputs.condition],
      explanation: {
        intact: "No major visible damage was reported in this planning step.",
        declining: "Uncertain wood condition can change the safe work method and move pricing upward.",
        urgent: "Emergency and storm-cleanup pricing needs an in-person review.",
      }[inputs.condition],
    },
  ];

  if (requiresUtilityReview || hasUrgentWarningSigns) {
    return {
      range,
      position: "site-review",
      positionLabel: hasUrgentWarningSigns
        ? "Site-specific guidance is the honest answer"
        : "Utility review comes before pricing",
      explanation: hasUrgentWarningSigns
        ? "Emergency tree care and storm cleanup vary too much from one property to another for an online pricing average to be accurate. An in-person look is the responsible way to advise on price and next steps."
        : "Utility involvement can change who should inspect or perform the work, so placing this project within an online price range would be misleading.",
      drivers,
      requiresUtilityReview,
      hasUrgentWarningSigns,
    };
  }

  if (!range) {
    return {
      range,
      position: "broad",
      positionLabel: "Broad benchmark—height still matters",
      explanation:
        "Without an approximate height, the planner cannot responsibly place this project within the benchmark. The factor notes below still show what may move the eventual estimate.",
      drivers,
      requiresUtilityReview,
      hasUrgentWarningSigns,
    };
  }

  const complexityScore =
    { open: 0, limited: 1, restricted: 2 }[inputs.access] +
    { clear: 0, some: 1, dense: 2, utilities: 0 }[inputs.targets] +
    { intact: 0, declining: 1, urgent: 0 }[inputs.condition];

  if (complexityScore <= 1) {
    return {
      range,
      position: "lower",
      positionLabel: "More likely toward the lower part",
      explanation:
        "The access, nearby-target, and condition answers suggest a comparatively straightforward setup for a tree in this height band.",
      drivers,
      requiresUtilityReview,
      hasUrgentWarningSigns,
    };
  }

  if (complexityScore <= 3) {
    return {
      range,
      position: "middle",
      positionLabel: "More likely around the middle",
      explanation:
        "The reported site factors add some control or handling work, but do not by themselves indicate the most restricted setup.",
      drivers,
      requiresUtilityReview,
      hasUrgentWarningSigns,
    };
  }

  return {
    range,
    position: "upper",
    positionLabel: "More likely toward the upper part or above",
    explanation:
      "Restricted access, nearby targets, or uncertain condition can require more controlled cutting, rigging, and material handling than height alone suggests.",
    drivers,
    requiresUtilityReview,
    hasUrgentWarningSigns,
  };
}
