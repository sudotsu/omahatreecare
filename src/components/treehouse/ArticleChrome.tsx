import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, UserRound } from "lucide-react";
import { getCategory } from "@/data/treehouse/categories";
import type { TreehouseArticle } from "@/data/treehouse/types";
import { treehouseLinks } from "@/data/treehouse/links";
import { formatCalendarDate } from "@/lib/format-date";
import { MediaPlaceholder } from "./MediaPlaceholder";
import { TreehouseImage } from "./TreehouseImage";

export function ArticleMeta({ article }: { article: TreehouseArticle }) {
  const category = getCategory(article.category);
  return (
    <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm text-link-dark">
      <span className="inline-flex items-center gap-1.5"><UserRound className="size-4" />{article.author.name}</span>
      <span className="inline-flex items-center gap-1.5"><CalendarDays className="size-4" />{article.datePublished ? `Published ${formatCalendarDate(article.datePublished)}` : "Publication date pending"}</span>
      {article.dateModified && <span>Updated {formatCalendarDate(article.dateModified)}</span>}
      <span className="inline-flex items-center gap-1.5"><Clock className="size-4" />{article.readingTime} min read</span>
      <Link className="underline underline-offset-4 hover:text-white" href={`/treehouse/${category.route}`}>{category.name}</Link>
    </div>
  );
}

export function ArticleMedia({ article }: { article: TreehouseArticle }) {
  if (!article.featuredImage) return <MediaPlaceholder />;
  return <TreehouseImage {...article.featuredImage} priority />;
}

export function TableOfContents({ article }: { article: TreehouseArticle }) {
  const headings = article.body.filter((block) => block.type === "heading" && block.level === 2);
  return (
    <details className="border border-slate-200 bg-white p-5 open:pb-6 lg:open" open>
      <summary className="cursor-pointer list-none text-xs font-bold uppercase tracking-[0.18em] text-forest marker:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">In this guide</summary>
      <ol className="mt-4 space-y-3 border-l border-primary/30 pl-4 text-sm leading-5 text-slate-600">
        {headings.map((heading) => heading.type === "heading" && <li key={heading.id}><a className="hover:text-forest hover:underline" href={`#${heading.id}`}>{heading.text}</a></li>)}
        <li><a className="hover:text-forest hover:underline" href="#frequently-asked-questions">Frequently Asked Questions</a></li>
        <li><a className="hover:text-forest hover:underline" href="#sources">Sources</a></li>
      </ol>
    </details>
  );
}

export function AuthorBox({ article }: { article: TreehouseArticle }) {
  return (
    <section className="mt-16 grid gap-5 border-y border-forest/20 bg-[#edf3ee] p-6 sm:grid-cols-[4.5rem_1fr] md:p-8" aria-labelledby="author-heading">
      <div className="flex size-[4.5rem] items-center justify-center rounded-full bg-forest text-lg font-bold text-gold" aria-label="Author photograph pending">MR</div>
      <div><span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">About the author</span><h2 className="mt-1 text-2xl font-bold text-forest" id="author-heading">{article.author.name}</h2>{article.author.role && <p className="mt-1 text-sm font-semibold text-primary">{article.author.role}</p>}{article.author.bio && <p className="mt-3 leading-7 text-slate-700">{article.author.bio}</p>}</div>
    </section>
  );
}

export function EstimateRail() {
  return (
    <aside className="mt-5 bg-forest p-5 text-cream-warm">
      <span className="text-xs font-bold uppercase tracking-[0.16em] text-gold">Site-specific next step</span>
      <h2 className="mt-2 text-xl font-bold">Need a written estimate?</h2>
      <p className="mt-2 text-sm leading-6 text-cream-warm/70">Share the tree, property access, and the outcome you are considering.</p>
      <Link className="mt-5 inline-flex min-h-11 items-center gap-2 rounded bg-gold px-4 py-2.5 text-sm font-bold text-forest hover:bg-white" href={treehouseLinks.contact}>Request an estimate <ArrowRight className="size-4" /></Link>
    </aside>
  );
}
