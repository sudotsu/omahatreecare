import type { Metadata } from "next";
import { CategoryArchive } from "@/components/treehouse/CategoryArchive";
import { getPublishedArticles } from "@/data/treehouse/articles";
import { getCategoryByRoute } from "@/data/treehouse/categories";
import { CONTACT } from "@/lib/constants";

const category = getCategoryByRoute("tree-profiles")!;
const hasPublished = getPublishedArticles().some((article) => article.category === category.slug);

export const metadata: Metadata = { title: category.name, description: category.description, alternates: { canonical: `${CONTACT.siteUrl}/treehouse/${category.route}` }, robots: { index: hasPublished, follow: true } };

export default function TreeProfilesPage() { return <CategoryArchive category={category} />; }
