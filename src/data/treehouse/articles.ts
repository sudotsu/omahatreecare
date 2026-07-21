import { treeRemovalCostArticle } from "./tree-removal-cost";
import type { TreehouseArticle } from "./types";

export const articles: TreehouseArticle[] = [treeRemovalCostArticle];

type PublicationEnvironment = {
  NODE_ENV?: string;
  VERCEL_ENV?: string;
};

export function canPreviewDrafts(environment: PublicationEnvironment = process.env) {
  return environment.NODE_ENV === "development" || environment.VERCEL_ENV === "preview";
}

export function getVisibleArticles(environment: PublicationEnvironment = process.env) {
  return canPreviewDrafts(environment) ? articles : getPublishedArticles();
}

export function getVisibleArticle(slug: string, environment: PublicationEnvironment = process.env) {
  return getVisibleArticles(environment).find((article) => article.slug === slug);
}

export function getVisibleArticlesByCategory(
  category: TreehouseArticle["category"],
  environment: PublicationEnvironment = process.env,
) {
  return getVisibleArticles(environment).filter((article) => article.category === category);
}

export function getPublishedArticles() {
  return articles.filter(isPublishedArticle);
}

export function isPublishedArticle(article: TreehouseArticle) {
  if (article.status !== "published") return false;
  assertArticleReadyForPublication(article);
  return true;
}

export function assertArticleReadyForPublication(article: TreehouseArticle) {
  const issues = getPublicationIssues(article);
  if (issues.length > 0) {
    throw new Error(`Treehouse article "${article.slug}" cannot be published: ${issues.join("; ")}`);
  }
}

export function getPublicationIssues(article: TreehouseArticle) {
  const issues: string[] = [];
  if (!isIsoDate(article.datePublished)) issues.push("datePublished must be a real YYYY-MM-DD date");
  if (!article.publication.bylineApproved) issues.push("byline approval is missing");
  if (!article.author.name.trim() || !article.author.bio?.trim()) issues.push("author name and biography are required");
  if (!article.publication.featuredImageApproved) issues.push("featured image approval is missing");
  if (!article.featuredImage?.src || !article.featuredImage.alt.trim() || article.featuredImage.width <= 0 || article.featuredImage.height <= 0) {
    issues.push("an approved featured image with alt text and dimensions is required");
  }
  if (!isIsoDate(article.publication.sourcesVerifiedOn)) issues.push("source verification date is missing or invalid");
  if (article.sources.length === 0 || article.sources.some((source) => !source.url.startsWith("https://"))) {
    issues.push("verified HTTPS sources are required");
  }
  const review = article.publication.safetyReview;
  if (
    !review?.reviewerName.trim()
    || !review.reviewerRole.trim()
    || !review.experienceBasis.trim()
    || !isIsoDate(review.reviewedOn)
  ) {
    issues.push("named professional safety review with a disclosed experience basis is required");
  }
  return issues;
}

function isIsoDate(value: string | undefined) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}
