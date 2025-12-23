/**
 * Tree Diagnostic Tool Definitions
 *
 * Single source of truth for all tool metadata used across:
 * - pages/tools/index.tsx (for navigation links)
 * - pages/tools/[tool].tsx (for SEO metadata and routing)
 */

export interface ToolDefinition {
  id: string;
  name: string;
  title: string;
  description: string;
}

export const TREE_TOOLS: ToolDefinition[] = [
  {
    id: "hazard",
    name: "Hazard Assessment",
    title: "Tree Hazard Assessment Omaha | Midwest Roots",
    description:
      "Calculate tree safety risk scores using professional ISA standards. Free assessment tool for Omaha homeowners.",
  },
  {
    id: "cost",
    name: "Cost Estimator",
    title: "Tree Service Cost Estimator Omaha | Midwest Roots",
    description:
      "Instant price ranges for Omaha tree removals, pruning, and stump grinding. Get a transparent estimate today.",
  },
  {
    id: "species",
    name: "Species Identifier",
    title: "Omaha Tree Species Identifier | Midwest Roots",
    description: "Identify local Nebraska trees and check for Emerald Ash Borer or Oak Wilt risks.",
  },
  {
    id: "ailments",
    name: "Common Ailments",
    title: "Tree Disease & Pest Guide Omaha | Midwest Roots",
    description: "Diagnose common Omaha tree problems like bagworms, EAB, and fungal infections.",
  },
  {
    id: "diy",
    name: "DIY vs Pro Guide",
    title: "DIY vs Pro Tree Work Guide | Omaha | Midwest Roots",
    description:
      "Safety guidelines for Omaha homeowners. Learn when it is safe to DIY and when you need a pro.",
  },
];

export const TREE_TOOLS_BY_ID: Record<string, ToolDefinition> = TREE_TOOLS.reduce(
  (acc, tool) => ({ ...acc, [tool.id]: tool }),
  {},
);
