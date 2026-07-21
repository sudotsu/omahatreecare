import { describe, expect, it } from "vitest";
import { articles, canPreviewDrafts, getPublishedArticles, getVisibleArticle, getVisibleArticles } from "./articles";
import { categories } from "./categories";

const verifiedInternalRoutes = new Set([
  "/",
  "/contact",
  "/tools",
  "/tools/cost",
  "/tools/hazard",
  "/tools/species",
  "/tools/diy",
  "/tools/ailments",
  "/services/tree-removal",
]);

describe("Treehouse content integrity", () => {
  it("keeps the first article on publication hold until owner fields are supplied", () => {
    const article = articles[0];
    expect(article.slug).toBe("tree-removal-cost-omaha");
    expect(article.status).toBe("draft");
    expect(article.datePublished).toBeUndefined();
    expect(article.featuredImage?.src).toBe("/images/treehouse/tree-removal-cost-omaha.webp");
    expect(getPublishedArticles()).toEqual([]);
  });

  it("shows drafts only in development and Vercel preview environments", () => {
    expect(canPreviewDrafts({ NODE_ENV: "development" })).toBe(true);
    expect(canPreviewDrafts({ NODE_ENV: "production", VERCEL_ENV: "preview" })).toBe(true);
    expect(canPreviewDrafts({ NODE_ENV: "production", VERCEL_ENV: "production" })).toBe(false);
    expect(getVisibleArticles({ NODE_ENV: "production", VERCEL_ENV: "production" })).toEqual([]);
    expect(getVisibleArticle("tree-removal-cost-omaha", { NODE_ENV: "production", VERCEL_ENV: "production" })).toBeUndefined();
    expect(getVisibleArticle("tree-removal-cost-omaha", { NODE_ENV: "production", VERCEL_ENV: "preview" })).toBe(articles[0]);
  });

  it("contains every required first-article section in the structured body", () => {
    const headings = articles[0].body
      .filter((block) => block.type === "heading")
      .map((block) => block.type === "heading" ? block.text : "");
    expect(headings).toEqual(expect.arrayContaining([
      "Why There Is No Honest One-Price Answer",
      "What You Are Actually Paying For",
      "Eight Factors That Change a Tree-Removal Estimate",
      "Why Two Tree-Service Estimates May Be Very Different",
      "What a Written Tree-Removal Estimate Should Include",
      "Can You Reduce the Cost Without Cutting Corners?",
      "Start With a Clearer Tree-Removal Plan",
    ]));
    expect(articles[0].faq).toHaveLength(8);
    expect(articles[0].sources).toHaveLength(6);
  });

  it("uses verified production routes instead of placeholders", () => {
    const article = articles[0];
    const links = [...article.relatedTools, ...article.relatedServices, ...article.relatedArticles];
    for (const link of links) {
      expect(link.href.startsWith("/")).toBe(true);
      expect(link.href).not.toContain("#");
      expect(verifiedInternalRoutes.has(link.href)).toBe(true);
    }
  });

  it("uses only HTTPS references and keeps every article in a known category", () => {
    for (const source of articles[0].sources) expect(source.url).toMatch(/^https:\/\//);
    expect(categories).toHaveLength(3);
    expect(categories.some((category) => category.slug === articles[0].category)).toBe(true);
  });
});
