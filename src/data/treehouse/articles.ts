import { treeRemovalCostArticle } from "./tree-removal-cost";
import type { TreehouseArticle } from "./types";

export const articles: TreehouseArticle[] = [treeRemovalCostArticle];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(category: TreehouseArticle["category"]) {
  return articles.filter((article) => article.category === category);
}

export function getPublishedArticles() {
  return articles.filter((article) => article.status === "published");
}
