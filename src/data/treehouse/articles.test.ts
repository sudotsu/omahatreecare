import { describe, expect, it } from "vitest";
import { articles, assertArticleReadyForPublication, canPreviewDrafts, getPublishedArticles, getVisibleArticle, getVisibleArticles } from "./articles";
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
  it("publishes the first article with complete owner and professional review evidence", () => {
    const article = articles[0];
    expect(article.slug).toBe("tree-removal-cost-omaha");
    expect(article.status).toBe("published");
    expect(article.datePublished).toBe("2026-07-21");
    expect(article.publication.safetyReview).toMatchObject({
      reviewerName: "Andrew Warner",
      reviewerRole: "Owner and climber, Midwest Roots Tree Services",
      reviewedOn: "2026-07-21",
    });
    expect(article.featuredImage?.src).toBe("/images/treehouse/tree-removal-cost-omaha.webp");
    expect(getPublishedArticles()).toEqual([article]);
  });

  it("shows drafts only in development and Vercel preview environments", () => {
    expect(canPreviewDrafts({ NODE_ENV: "development" })).toBe(true);
    expect(canPreviewDrafts({ NODE_ENV: "production", VERCEL_ENV: "preview" })).toBe(true);
    expect(canPreviewDrafts({ NODE_ENV: "production", VERCEL_ENV: "production" })).toBe(false);
    expect(getVisibleArticles({ NODE_ENV: "production", VERCEL_ENV: "production" })).toEqual([articles[0]]);
    expect(getVisibleArticle("tree-removal-cost-omaha", { NODE_ENV: "production", VERCEL_ENV: "production" })).toBe(articles[0]);
    expect(getVisibleArticle("tree-removal-cost-omaha", { NODE_ENV: "production", VERCEL_ENV: "preview" })).toBe(articles[0]);
  });

  it("rejects a published article when required publication evidence is incomplete", () => {
    const incompletePublishedArticle = {
      ...articles[0],
      status: "published" as const,
      datePublished: "2026-07-21",
      publication: {
        ...articles[0].publication,
        safetyReview: undefined,
      },
    };
    expect(() => assertArticleReadyForPublication(incompletePublishedArticle)).toThrow(/named professional safety review/);
  });

  it("accepts an accountable professional review based on disclosed experience without claiming a certification", () => {
    const reviewedArticle = {
      ...articles[0],
      status: "published" as const,
      datePublished: "2026-07-21",
      publication: {
        ...articles[0].publication,
        safetyReview: {
          reviewerName: "Test Reviewer",
          reviewerRole: "Tree-service owner-operator",
          experienceBasis: "Hands-on experience planning and performing residential tree removals",
          reviewedOn: "2026-07-21",
        },
      },
    };

    expect(() => assertArticleReadyForPublication(reviewedArticle)).not.toThrow();
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
    expect(categories).toHaveLength(3);
    for (const article of articles) {
      for (const source of article.sources) expect(source.url).toMatch(/^https:\/\//);
      expect(categories.some((category) => category.slug === article.category)).toBe(true);
    }
  });
});
