import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { writeFileSync } from "node:fs";

// A11Y-001 acceptance: representative routes must produce no automated
// color-contrast, heading-order, or link-in-text-block failures. These rules
// are the ones the audit reproduced; we gate on exactly them so the suite fails
// against the known pre-fix defects and passes once tokens/semantics are fixed.
const GATED_RULES = ["color-contrast", "heading-order", "link-in-text-block"];

const ROUTES = [
  { name: "home", path: "/" },
  { name: "contact", path: "/contact" },
  { name: "tool: hazard", path: "/tools/hazard" },
  { name: "tool: species", path: "/tools/species" },
  { name: "tool: cost", path: "/tools/cost" },
  { name: "tool: diy", path: "/tools/diy" },
  { name: "tool: ailments", path: "/tools/ailments" },
  { name: "service", path: "/services/tree-removal" },
  { name: "location", path: "/locations/omaha" },
  { name: "treehouse article", path: "/treehouse/tree-removal-cost-omaha" },
];

for (const route of ROUTES) {
  test(`accessibility: ${route.name} has no gated axe violations`, async ({ page }) => {
    await page.goto(route.path, { waitUntil: "networkidle" });
    const results = await new AxeBuilder({ page })
      .withRules(GATED_RULES)
      .analyze();

    const violations = results.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({ target: n.target, html: n.html })),
    }));

    if (process.env.A11Y_DUMP) {
      writeFileSync(
        `${process.env.A11Y_DUMP}/${route.name.replace(/[^a-z0-9]+/gi, "_")}.json`,
        JSON.stringify(violations, null, 2),
      );
    }

    expect(
      violations,
      `Gated a11y violations on ${route.path}:\n${JSON.stringify(violations, null, 2)}`,
    ).toEqual([]);
  });
}
