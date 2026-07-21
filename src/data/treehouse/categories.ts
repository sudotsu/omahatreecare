import type { CategorySlug } from "./types";

export type TreehouseCategory = {
  slug: CategorySlug;
  route: "guides" | "field-notes" | "tree-profiles";
  name: string;
  shortName: string;
  description: string;
  marker: string;
};

export const categories: TreehouseCategory[] = [
  {
    slug: "homeowner-guides",
    route: "guides",
    name: "Homeowner Guides",
    shortName: "Guides",
    description:
      "Clear help with costs, safety questions, storm damage, estimates, access, and deciding what to do next.",
    marker: "01",
  },
  {
    slug: "field-notes",
    route: "field-notes",
    name: "Treehouse Field Notes",
    shortName: "Field Notes",
    description:
      "Approved, anonymized project stories that explain the property problem, options considered, and lessons from the work.",
    marker: "02",
  },
  {
    slug: "tree-profiles",
    route: "tree-profiles",
    name: "Omaha Tree Profiles",
    shortName: "Tree Profiles",
    description:
      "Local species guides covering recognizable traits, recurring concerns, and when an on-site assessment may help.",
    marker: "03",
  },
];

export function getCategory(slug: CategorySlug) {
  return categories.find((category) => category.slug === slug)!;
}

export function getCategoryByRoute(route: string) {
  return categories.find((category) => category.route === route);
}
