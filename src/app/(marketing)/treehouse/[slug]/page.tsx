import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleMedia, ArticleMeta, EstimateRail, TableOfContents } from "@/components/treehouse/ArticleChrome";
import { Breadcrumbs } from "@/components/treehouse/Breadcrumbs";
import { ContentRenderer, FAQ, RelatedContent, Sources, ToolCta } from "@/components/treehouse/ContentBlocks";
import { getVisibleArticle, getVisibleArticles, isPublishedArticle } from "@/data/treehouse/articles";
import { getCategory } from "@/data/treehouse/categories";
import type { TreehouseArticle } from "@/data/treehouse/types";
import { treehouseLinks } from "@/data/treehouse/links";
import { CONTACT } from "@/lib/constants";
import { dmSerif } from "@/lib/fonts";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getVisibleArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getVisibleArticle(slug);
  if (!article) return {};
  const canonical = `${CONTACT.siteUrl}/treehouse/${article.slug}`;
  const published = isPublishedArticle(article);
  const socialImage = article.featuredImage
    ? {
        url: `${CONTACT.siteUrl}${article.featuredImage.src}`,
        width: article.featuredImage.width,
        height: article.featuredImage.height,
        alt: article.featuredImage.alt,
      }
    : undefined;
  return {
    title: article.seoTitle,
    description: article.metaDescription,
    authors: [{ name: article.author.name }],
    alternates: { canonical },
    robots: { index: published, follow: true },
    openGraph: {
      title: article.seoTitle,
      description: article.metaDescription,
      url: canonical,
      siteName: CONTACT.businessName,
      type: "article",
      ...(socialImage ? { images: [socialImage] } : {}),
      ...(article.datePublished ? { publishedTime: article.datePublished } : {}),
      ...(article.dateModified ? { modifiedTime: article.dateModified } : {}),
    },
    twitter: {
      card: socialImage ? "summary_large_image" : "summary",
      title: article.seoTitle,
      description: article.metaDescription,
      ...(socialImage ? { images: [socialImage.url] } : {}),
    },
  };
}

export default async function TreehouseArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getVisibleArticle(slug);
  if (!article) notFound();
  return <ArticlePage article={article} />;
}

function ArticlePage({ article }: { article: TreehouseArticle }) {
  const category = getCategory(article.category);
  const canonical = `${CONTACT.siteUrl}/treehouse/${article.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.metaDescription,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    author: { "@type": "Organization", name: article.author.name, url: CONTACT.siteUrl },
    publisher: { "@type": "Organization", name: CONTACT.businessName, url: CONTACT.siteUrl },
    ...(article.datePublished ? { datePublished: article.datePublished } : {}),
    ...(article.dateModified ? { dateModified: article.dateModified } : {}),
    ...(article.featuredImage ? { image: [`${CONTACT.siteUrl}${article.featuredImage.src}`] } : {}),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: CONTACT.siteUrl },
      { "@type": "ListItem", position: 2, name: "The Treehouse", item: `${CONTACT.siteUrl}/treehouse` },
      { "@type": "ListItem", position: 3, name: category.name, item: `${CONTACT.siteUrl}/treehouse/${category.route}` },
      { "@type": "ListItem", position: 4, name: article.title, item: canonical },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(faqSchema) }} />
      <header className="bg-forest px-6 pb-16 pt-28 text-cream-warm md:pb-20 md:pt-36">
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs items={[{ label: "Home", href: treehouseLinks.home }, { label: "The Treehouse", href: treehouseLinks.treehouse }, { label: category.name, href: `/treehouse/${category.route}` }, { label: article.title }]} />
          {article.status === "draft" && <div className="mt-8 border border-gold/40 bg-gold/10 px-4 py-3 text-sm leading-6 text-cream-warm"><strong className="text-gold">Publication hold:</strong> named professional review of safety-sensitive content and the owner-approved publication date are pending. This preview is noindex.</div>}
          <Link className="mt-10 inline-block text-xs font-bold uppercase tracking-[0.2em] text-gold underline-offset-4 hover:underline" href={`/treehouse/${category.route}`}>{category.name}</Link>
          <h1 className={`${dmSerif.className} mt-4 max-w-4xl text-4xl leading-[1.08] tracking-tight sm:text-5xl md:text-6xl`}>{article.title}</h1>
          <p className="mt-6 max-w-3xl border-l-2 border-gold pl-5 text-lg leading-8 text-link-dark md:text-xl">{article.directAnswer}</p>
          <ArticleMeta article={article} />
        </div>
      </header>

      <div className="mx-auto -mb-8 max-w-5xl px-6 pt-10 md:-mb-14 md:pt-14"><ArticleMedia article={article} /></div>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:py-24 lg:grid-cols-[minmax(0,46rem)_17rem] lg:items-start lg:justify-between">
        <div className="min-w-0">
          <ContentRenderer blocks={article.body} />
          <ToolCta title="Need a site-specific plan?" text="Request an estimate from Midwest Roots Tree Services in Omaha for a site-specific recommendation and written scope." link={{ label: "Request an estimate", href: treehouseLinks.contact }} />
          <RelatedContent tools={article.relatedTools} services={article.relatedServices} />
          <FAQ items={article.faq} />
          <Sources items={article.sources} />
          <section className="mt-16 border-t border-forest/20 pt-12" aria-labelledby="related-treehouse-heading">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Related Treehouse articles</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-forest" id="related-treehouse-heading">More guides will appear here as they are published.</h2>
            <p className="mt-3 leading-7 text-slate-600">Related article links are intentionally omitted until real Treehouse content exists.</p>
          </section>
          {/* Restore with a "Reviewed by [Name], ISA Certified Arborist #____" credit once the reviewer is secured. */}
          <p className="mt-8 border-l-2 border-slate-300 pl-5 text-sm leading-6 text-slate-600">This article provides general educational information. Tree condition, property access, utilities, and work requirements vary by site. A photograph or online guide cannot replace an on-site evaluation when safety or structural condition is uncertain.</p>
        </div>
        <aside className="order-first space-y-5 lg:order-none lg:sticky lg:top-24" aria-label="Article resources"><TableOfContents article={article} /><EstimateRail /></aside>
      </div>
    </article>
  );
}

function safeJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
