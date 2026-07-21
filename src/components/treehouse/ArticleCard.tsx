import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategory } from "@/data/treehouse/categories";
import type { TreehouseArticle } from "@/data/treehouse/types";
import { formatCalendarDate } from "@/lib/format-date";
import { MediaPlaceholder } from "./MediaPlaceholder";
import { TreehouseImage } from "./TreehouseImage";

export type ArticleCardVariant = "standard" | "featured" | "field-note";

export function ArticleCard({ article, variant = "standard" }: { article: TreehouseArticle; variant?: ArticleCardVariant }) {
  const category = getCategory(article.category);
  const featured = variant === "featured";
  const fieldNote = variant === "field-note";

  return (
    <article className={`group overflow-hidden border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg ${fieldNote ? "border-forest bg-forest text-cream-warm" : "border-slate-200"} ${featured ? "grid lg:grid-cols-[1.15fr_1fr]" : "flex h-full flex-col"}`}>
      <Link className="block overflow-hidden" href={`/treehouse/${article.slug}`} tabIndex={-1} aria-hidden="true">
        {article.featuredImage
          ? <TreehouseImage {...article.featuredImage} compact={!featured} />
          : <MediaPlaceholder compact={!featured} />}
      </Link>
      <div className={`flex flex-1 flex-col ${featured ? "p-7 md:p-10" : "p-6"}`}>
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.16em]">
          <span className={fieldNote ? "text-gold" : "text-primary"}>{fieldNote ? "From the field" : category.name}</span>
          {article.status === "draft" && <span className="rounded-full border border-current/25 px-2 py-0.5 normal-case tracking-normal">Draft</span>}
        </div>
        <h3 className={`${featured ? "text-3xl md:text-4xl" : "text-xl"} font-bold leading-tight tracking-tight`}>
          <Link className="focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4" href={`/treehouse/${article.slug}`}>{article.cardTitle}</Link>
        </h3>
        <p className={`mt-4 leading-7 ${fieldNote ? "text-cream-warm/75" : "text-slate-600"}`}>{article.summary}</p>
        <div className={`mt-6 flex flex-wrap gap-x-2 gap-y-1 text-xs ${fieldNote ? "text-link-dark" : "text-slate-500"}`}>
          <span>{article.dateModified ? `Updated ${formatCalendarDate(article.dateModified)}` : article.datePublished ? formatCalendarDate(article.datePublished) : "Publication date pending"}</span>
          <span aria-hidden="true">•</span><span>{article.readingTime} min read</span>
        </div>
        <Link className={`mt-6 inline-flex items-center gap-2 self-start text-sm font-bold uppercase tracking-wider underline-offset-4 hover:underline ${fieldNote ? "text-gold" : "text-forest"}`} href={`/treehouse/${article.slug}`}>
          Read the guide <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
