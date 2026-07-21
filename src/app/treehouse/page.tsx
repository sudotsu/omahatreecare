import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Leaf, NotebookTabs } from "lucide-react";
import { ArticleCard } from "@/components/treehouse/ArticleCard";
import { getPublishedArticles, getVisibleArticles } from "@/data/treehouse/articles";
import { categories } from "@/data/treehouse/categories";
import { treehouseLinks } from "@/data/treehouse/links";
import { CONTACT } from "@/lib/constants";
import { dmSerif } from "@/lib/fonts";

const hasPublishedArticle = getPublishedArticles().length > 0;
const visibleArticles = getVisibleArticles();

export const metadata: Metadata = {
  title: "The Treehouse",
  description: "Practical Omaha tree care, explained from the ground up. Browse homeowner guides, field notes, local tree profiles, safety information, and planning tools.",
  alternates: { canonical: `${CONTACT.siteUrl}/treehouse` },
  robots: { index: hasPublishedArticle, follow: true },
  openGraph: {
    title: "The Treehouse | Midwest Roots Tree Services",
    description: "Practical Omaha tree care, explained from the ground up.",
    url: `${CONTACT.siteUrl}/treehouse`,
    siteName: CONTACT.businessName,
    type: "website",
  },
};

const featured = visibleArticles.find((article) => article.featured);

const tools = [
  { name: "Cost planning guide", text: "Organize the variables that can affect a project estimate.", href: treehouseLinks.costTool, number: "01" },
  { name: "Hazard screening", text: "Review reported warning signs and learn when on-site help may be appropriate.", href: treehouseLinks.hazardTool, number: "02" },
  { name: "Tree species guide", text: "Compare common Omaha trees and recognizable traits.", href: treehouseLinks.speciesTool, number: "03" },
  { name: "DIY or professional", text: "Consider the work conditions before choosing a next step.", href: treehouseLinks.diyTool, number: "04" },
];

export default function TreehousePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-forest px-6 pb-20 pt-32 text-cream-warm md:pb-28 md:pt-40">
        <div className="pointer-events-none absolute -right-40 -top-52 -z-10 size-[44rem] rounded-full border border-white/10" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-24 -top-36 -z-10 size-[36rem] rounded-full border border-white/10" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-8 -top-20 -z-10 size-[28rem] rounded-full border border-white/10" aria-hidden="true" />
        <div className="mx-auto grid max-w-6xl items-end gap-12 lg:grid-cols-[1.5fr_0.7fr]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold"><Leaf className="size-4" /> The Treehouse</div>
            <h1 className={`${dmSerif.className} mt-5 max-w-4xl text-5xl leading-[1.04] tracking-tight sm:text-6xl md:text-7xl`}>Practical Omaha tree care, explained from the ground up.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-link-dark">Homeowner guides, real project lessons, Omaha tree profiles, safety information, and planning resources—built to make the next decision clearer.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-gold px-6 py-3 font-bold text-forest transition hover:-translate-y-0.5 hover:bg-white" href={treehouseLinks.guides}>Explore homeowner guides <ArrowRight className="size-4" /></Link>
              <Link className="inline-flex min-h-12 items-center justify-center rounded border border-white/30 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/15" href={treehouseLinks.tools}>Use our tree-care tools</Link>
            </div>
          </div>
          <aside className="border-l border-gold/50 pl-6">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-gold">From the Treehouse</span>
            <p className="mt-3 text-xl font-semibold leading-8">Real Omaha tree situations, explained clearly by the people doing the work.</p>
            <p className="mt-5 border-t border-white/15 pt-5 text-sm leading-6 text-link-dark">Guidance for planning—not a substitute for an on-site evaluation when safety or structural condition is uncertain.</p>
          </aside>
        </div>
      </section>

      {featured && (
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="mb-10 grid gap-5 md:grid-cols-[1fr_0.7fr] md:items-end">
            <div><span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Start here</span><h2 className={`${dmSerif.className} mt-2 text-4xl text-forest md:text-5xl`}>A clearer way to plan a removal</h2></div>
            <p className="leading-7 text-slate-600">The first Treehouse guide explains the work behind an estimate without relying on a misleading citywide average.</p>
          </div>
          <ArticleCard article={featured} variant="featured" />
        </section>
      )}

      <section className="bg-stone px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Browse the Treehouse</span>
          <h2 className={`${dmSerif.className} mt-2 text-4xl text-forest md:text-5xl`}>Three ways to dig deeper</h2>
          <div className="mt-10 grid gap-px bg-forest/15 border border-forest/15 md:grid-cols-3">
            {categories.map((category) => (
              <Link className="group flex min-h-80 flex-col bg-cream p-7 transition hover:bg-white" href={`/treehouse/${category.route}`} key={category.slug}>
                <span className="font-mono text-sm text-primary">{category.marker}</span><h3 className="mt-10 text-2xl font-bold text-forest">{category.name}</h3><p className="mt-4 leading-7 text-slate-600">{category.description}</p><span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-bold uppercase tracking-wider text-forest">Browse {category.shortName.toLowerCase()} <ArrowRight className="size-4 transition group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-deep px-6 py-16 text-cream-warm md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-[1fr_0.7fr] md:items-end"><div><span className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Treehouse tools</span><h2 className={`${dmSerif.className} mt-2 text-4xl md:text-5xl`}>Move from reading to planning</h2></div><p className="leading-7 text-link-dark">Free homeowner tools can organize visible conditions and project questions. They do not diagnose a tree or replace an on-site review.</p></div>
          <div className="mt-10 grid gap-px bg-white/15 border border-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((tool) => <Link href={tool.href} className="group relative min-h-64 bg-forest p-6 transition hover:bg-[#173525]" key={tool.href}><span className="font-mono text-xs text-gold">{tool.number}</span><h3 className="mt-10 text-xl font-bold">{tool.name}</h3><p className="mt-3 text-sm leading-6 text-link-dark">{tool.text}</p><ArrowRight className="absolute bottom-6 right-6 size-5 text-gold transition group-hover:translate-x-1" /></Link>)}
          </div>
        </div>
      </section>

      {visibleArticles.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-5"><div><span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Latest from the Treehouse</span><h2 className={`${dmSerif.className} mt-2 text-4xl text-forest md:text-5xl`}>Useful now. Built to grow.</h2></div><Link className="inline-flex items-center gap-2 font-bold text-forest underline-offset-4 hover:underline" href={treehouseLinks.guides}>View all guides <ArrowRight className="size-4" /></Link></div>
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{visibleArticles.map((article) => <ArticleCard article={article} key={article.id} />)}</div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-8 bg-forest p-8 text-cream-warm md:grid-cols-[0.25fr_1fr_auto] md:items-center md:p-10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gold"><NotebookTabs className="size-5" /> From the field</div>
          <div><h2 className="text-2xl font-bold">Field Notes will begin with an approved Midwest Roots project.</h2><p className="mt-3 leading-7 text-link-dark">No job story, neighborhood, property detail, or photograph has been invented for the MVP. The first Field Note needs an owner-selected project, anonymized details, and approved original images.</p></div>
          <Link className="inline-flex min-h-12 items-center justify-center rounded bg-cream px-5 py-3 font-bold text-forest hover:bg-gold" href={treehouseLinks.fieldNotes}>See the format</Link>
        </div>
      </section>

      <section className="border-t border-forest/10 bg-[#e6ece6] px-6 py-16">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 lg:flex-row lg:items-center"><div className="max-w-3xl"><span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Not sure what your tree needs?</span><h2 className={`${dmSerif.className} mt-2 text-4xl text-forest`}>Start with a guide, use a planning tool, or request an on-site estimate.</h2></div><div className="flex flex-col gap-3 sm:flex-row"><Link className="inline-flex min-h-12 items-center justify-center rounded bg-gold px-6 py-3 font-bold text-forest hover:bg-forest hover:text-white" href={treehouseLinks.contact}>Request an estimate</Link><Link className="inline-flex min-h-12 items-center justify-center rounded border border-forest/30 px-6 py-3 font-bold text-forest hover:bg-white" href={treehouseLinks.hazardTool}>Screen visible concerns</Link></div></div>
      </section>
    </>
  );
}
