import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getVisibleArticlesByCategory } from "@/data/treehouse/articles";
import type { TreehouseCategory } from "@/data/treehouse/categories";
import { treehouseLinks } from "@/data/treehouse/links";
import { ArticleCard } from "./ArticleCard";
import { Breadcrumbs } from "./Breadcrumbs";

export function CategoryArchive({ category }: { category: TreehouseCategory }) {
  const categoryArticles = getVisibleArticlesByCategory(category.slug);
  return (
    <>
      <section className="bg-forest px-6 pb-16 pt-28 text-cream-warm md:pb-20 md:pt-36">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs items={[{ label: "Home", href: treehouseLinks.home }, { label: "The Treehouse", href: treehouseLinks.treehouse }, { label: category.name }]} />
          <span className="mt-10 block text-xs font-bold uppercase tracking-[0.2em] text-gold">The Treehouse · {category.marker}</span>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">{category.name}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-link-dark">{category.description}</p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        {categoryArticles.length > 0 ? (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{categoryArticles.map((article) => <ArticleCard article={article} key={article.id} />)}</div>
        ) : (
          <div className="max-w-3xl border border-slate-200 bg-white p-8 md:p-12">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Owner content needed</span>
            <h2 className="mt-3 text-3xl font-bold text-forest">No placeholder articles here.</h2>
            <p className="mt-4 leading-7 text-slate-600">This archive is intentionally marked <code className="rounded bg-stone px-1.5 py-0.5 text-sm">noindex</code> until Midwest Roots supplies a real, approved {category.shortName.toLowerCase()} entry.</p>
            <Link className="mt-7 inline-flex min-h-12 items-center gap-2 rounded bg-gold px-6 py-3 font-bold text-forest hover:bg-forest hover:text-white" href={treehouseLinks.treehouse}>Back to The Treehouse <ArrowRight className="size-4" /></Link>
          </div>
        )}
      </section>
    </>
  );
}
