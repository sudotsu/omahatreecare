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
  return articles.filter((article) => article.status === "published");
}
