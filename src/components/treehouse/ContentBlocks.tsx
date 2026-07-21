import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { AlertTriangle, ArrowRight, ExternalLink, Leaf, Wrench } from "lucide-react";
import type { ContentBlock, FAQItem, InternalLink, SourceReference } from "@/data/treehouse/types";
import { treehouseLinks } from "@/data/treehouse/links";

const internalPhrases: Record<string, string> = {
  "Omaha tree-removal services": treehouseLinks.treeRemoval,
  "preliminary cost-planning tool": treehouseLinks.costTool,
  "cost-planning tool": treehouseLinks.costTool,
  "preliminary tree-hazard screening tool": treehouseLinks.hazardTool,
  "common Omaha tree species guide": treehouseLinks.speciesTool,
  "DIY or professional tree-work guide": treehouseLinks.diyTool,
  "contact Midwest Roots Tree Services": treehouseLinks.contact,
};

export function RichText({ text }: { text: string }) {
  const phrases = Object.keys(internalPhrases).sort((a, b) => b.length - a.length);
  const expression = new RegExp(`(${phrases.map(escapeRegExp).join("|")})`, "g");
  return text.split(expression).map((part, index) => {
    const href = internalPhrases[part];
    return href ? <Link className="font-semibold text-primary underline decoration-primary/35 underline-offset-4 hover:decoration-primary" key={`${part}-${index}`} href={href}>{part}</Link> : part;
  });
}

export function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return blocks.map((block, index) => {
    switch (block.type) {
      case "paragraph":
        return <p className="my-5 text-[1.0625rem] leading-8 text-[#3d3027]" key={index}><RichText text={block.text} /></p>;
      case "heading": {
        const content = <RichText text={block.text} />;
        return block.level === 2
          ? <h2 className="scroll-mt-28 border-t border-forest/15 pt-10 text-3xl font-bold leading-tight tracking-tight text-forest first:border-0" id={block.id} key={index}>{content}</h2>
          : <h3 className="scroll-mt-28 pt-6 text-2xl font-bold leading-tight tracking-tight text-forest" id={block.id} key={index}>{content}</h3>;
      }
      case "jump-nav":
        return (
          <nav className="my-7 flex flex-wrap gap-3" aria-label="Jump to article sections" key={index}>
            {block.links.map((link) => (
              <a className="inline-flex min-h-11 items-center rounded-full border border-primary/30 bg-stone px-4 py-2 text-sm font-bold text-forest transition hover:border-primary hover:bg-[#edf3ee] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" href={`#${link.targetId}`} key={link.targetId}>{link.label}</a>
            ))}
          </nav>
        );
      case "list": {
        const List = block.style === "numbered" ? "ol" : "ul";
        return <List className={`my-6 space-y-2 pl-6 text-[1.0625rem] leading-8 text-[#3d3027] ${block.style === "numbered" ? "list-decimal" : "list-disc marker:text-primary"}`} key={index}>{block.items.map((item) => <li className="pl-1" key={item}><RichText text={item} /></li>)}</List>;
      }
      case "takeaway":
        return <TreehouseTakeaway key={index}>{block.text}</TreehouseTakeaway>;
      case "safety":
        return <SafetyNotice key={index} title={block.title}>{block.text}</SafetyNotice>;
      case "tool-cta":
        return <ToolCta key={index} title={block.title} text={block.text} link={block.link} />;
      case "service-cta":
        return (
          <aside className="my-10 border-y-4 border-gold bg-forest p-7 text-cream-warm md:p-9" key={index}>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Professional tree service</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">{block.title}</h2>
            <p className="mt-3 max-w-2xl leading-7 text-cream-warm/75">{block.text}</p>
            <Link className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded bg-gold px-6 py-3 text-sm font-bold text-forest hover:bg-white" href={block.link.href}>{block.link.label}<ArrowRight className="size-4" /></Link>
          </aside>
        );
      case "checklist":
        return <EstimateChecklist key={index} title={block.title} items={block.items} />;
      case "example":
        return <aside className="my-8 border-l-4 border-gold bg-amber-50 p-6" key={index}><strong className="text-xs uppercase tracking-[0.16em] text-forest">Example</strong><p className="mt-2 leading-7 text-slate-700">{block.text}</p></aside>;
      case "quote":
        return <blockquote className="my-9 border-l-4 border-primary bg-[#edf3ee] p-6 text-xl font-semibold leading-8 text-forest md:p-8" key={index}><p>“{block.quote}”</p>{block.attribution && <footer className="mt-4 text-sm font-medium text-slate-600">— {block.attribution}</footer>}</blockquote>;
      case "table":
        return (
          <figure className="my-9 overflow-x-auto" key={index}>
            {block.caption && <figcaption className="mb-3 text-sm font-semibold text-forest">{block.caption}</figcaption>}
            <table className="w-full min-w-xl border-collapse text-left text-sm">
              <thead className="bg-forest text-cream-warm"><tr>{block.columns.map((column) => <th className="border border-forest px-4 py-3" key={column} scope="col">{column}</th>)}</tr></thead>
              <tbody>{block.rows.map((row, rowIndex) => <tr className="odd:bg-white even:bg-stone" key={`${row.join("-")}-${rowIndex}`}>{row.map((cell, cellIndex) => <td className="border border-slate-200 px-4 py-3 align-top leading-6 text-slate-700" key={`${cell}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody>
            </table>
          </figure>
        );
      case "image":
        return <figure className="my-9" key={index}><Image alt={block.alt} className="h-auto w-full" height={block.height} sizes="(min-width: 1024px) 48rem, 100vw" src={block.src} width={block.width} />{block.caption && <figcaption className="mt-3 text-sm leading-6 text-slate-600">{block.caption}</figcaption>}</figure>;
      case "source-note":
        return <p className="-mt-2 mb-6 text-sm text-slate-500" key={index}>Source: <a className="inline-flex items-center gap-1 font-medium underline underline-offset-4 hover:text-forest" href={block.url} target="_blank" rel="noreferrer">{block.label}<ExternalLink className="size-3.5" /></a></p>;
    }
  });
}

export function TreehouseTakeaway({ children }: { children: ReactNode }) {
  return (
    <aside className="my-9 border border-primary/25 bg-[#edf3ee] p-6 md:p-8">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-forest"><Leaf className="size-5 text-primary" /> Treehouse Takeaway</div>
      <p className="mt-3 text-lg font-semibold leading-8 text-forest">{children}</p>
    </aside>
  );
}

export function SafetyNotice({ title = "Safety Notice", children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="my-9 border border-amber-400/60 bg-amber-50 p-6 md:p-8" role="note">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-900"><AlertTriangle className="size-5" /> {title}</div>
      <p className="mt-3 text-base font-medium leading-7 text-amber-950">{children}</p>
    </aside>
  );
}

export function ToolCta({ title, text, link }: { title: string; text: string; link: InternalLink }) {
  return (
    <aside className="my-10 overflow-hidden bg-forest p-7 text-cream-warm md:p-9">
      <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gold"><Wrench className="size-4" /> Free planning tool</span>
      <h2 className="mt-3 text-3xl font-bold tracking-tight">{title}</h2>
      <p className="mt-3 max-w-2xl leading-7 text-cream-warm/75">{text}</p>
      <Link className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded bg-gold px-6 py-3 text-sm font-bold text-forest transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold" href={link.href}>{link.label}<ArrowRight className="size-4" /></Link>
    </aside>
  );
}

export function EstimateChecklist({ title, items }: { title: string; items: string[] }) {
  return (
    <aside className="my-9 border-y border-forest/20 bg-stone p-6 md:p-8">
      <h3 className="text-2xl font-bold text-forest">{title}</h3>
      <ol className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((item, index) => <li className="flex items-start gap-3 bg-white p-4 leading-6 text-slate-700" key={item}><span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-forest text-xs font-bold text-gold">{index + 1}</span><RichText text={item} /></li>)}
      </ol>
    </aside>
  );
}

export function FAQ({ items }: { items: FAQItem[] }) {
  return (
    <section className="mt-16 scroll-mt-28 border-t border-forest/20 pt-12" id="frequently-asked-questions" aria-labelledby="faq-heading">
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Questions homeowners ask</span>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-forest" id="faq-heading">Frequently Asked Questions</h2>
      <div className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
        {items.map((item) => (
          <details className="group bg-white open:bg-[#fbfaf7]" key={item.question}>
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-1 py-5 font-bold text-forest marker:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
              {item.question}<span className="text-xl text-primary transition group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <div className="pb-6 pr-8 text-base leading-7 text-slate-700"><p>{item.answer}</p>{item.sourceUrl && <a className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-4" href={item.sourceUrl} target="_blank" rel="noreferrer">View source <ExternalLink className="size-3.5" /></a>}</div>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Sources({ items }: { items: SourceReference[] }) {
  return (
    <section className="mt-16 scroll-mt-28 border-t border-forest/20 pt-12" id="sources" aria-labelledby="sources-heading">
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Reviewed references</span>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-forest" id="sources-heading">Sources</h2>
      <ol className="mt-6 space-y-4">
        {items.map((source, index) => (
          <li className="grid grid-cols-[2rem_1fr] gap-3 border-b border-slate-200 pb-4" key={source.url}>
            <span className="font-mono text-sm text-primary">{String(index + 1).padStart(2, "0")}</span>
            <div><a className="inline-flex items-start gap-1 font-semibold text-forest underline decoration-primary/30 underline-offset-4 hover:decoration-primary" href={source.url} target="_blank" rel="noreferrer">{source.title}<ExternalLink className="mt-1 size-3.5 shrink-0" /></a><span className="mt-1 block text-sm text-slate-500">{source.organization}{source.accessedDate ? ` · Accessed ${source.accessedDate}` : ""}</span></div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function RelatedContent({ tools, services }: { tools: InternalLink[]; services: InternalLink[] }) {
  return (
    <section className="mt-16 border-t border-forest/20 pt-12" aria-labelledby="related-heading">
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Keep planning</span>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-forest" id="related-heading">Related Tools and Services</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {[...tools.slice(0, 1), ...services].map((item) => (
          <Link className="group relative flex min-h-44 flex-col border border-slate-200 bg-white p-6 transition hover:border-primary hover:shadow-md" href={item.href} key={item.href}>
            <strong className="pr-8 text-lg text-forest">{item.label}</strong>{item.description && <span className="mt-3 leading-6 text-slate-600">{item.description}</span>}<ArrowRight className="absolute right-5 top-5 size-5 text-primary transition group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </section>
  );
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
