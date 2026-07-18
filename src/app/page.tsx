import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  TreeDeciduous,
  TriangleAlert,
  Bug,
  Wrench,
  DollarSign,
  CheckCircle2,
  ArrowRight,
  Activity,
} from "lucide-react";
import { TreeRingsBackground } from "@/components/ui/TreeRingsBackground";
import { HazardAssessmentHeroCard } from "@/components/ui/HazardAssessmentHeroCard";
import { ContactForm } from "@/components/forms/ContactForm";
import { dmSerif } from "@/lib/fonts";
import { CONTACT } from "@/lib/constants";
import { serviceIds, servicesData } from "@/data/services";

export const metadata: Metadata = {
  title: "Tree Hazard & Health Tools",
  description:
    "Five free tree-care screening and planning tools for Omaha homeowners. No account required.",
  openGraph: {
    title: "Tree Hazard & Health Tools | Midwest Roots",
    description:
      "Five free tree-care screening and planning tools for Omaha homeowners. No account required.",
    url: "https://omahatreecare.com",
    siteName: CONTACT.businessName,
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tree Hazard & Health Tools | Midwest Roots",
    description:
      "Five free tree-care screening and planning tools for Omaha homeowners. No account required.",
    images: ["/images/og-image.jpg"],
  },
};

interface Tool {
  id: string;
  label: string;
  badge: string | null;
  desc: string;
  cta: string;
  Icon: LucideIcon;
}

const TOOLS: Tool[] = [
  {
    id: "species",
    label: "Species Matching Guide",
    badge: "10 Profiles",
    desc: "Compare visible characteristics with ten common Omaha-area tree profiles, including care topics and warning signs. A match is not a confirmed identification.",
    cta: "Access Directory",
    Icon: TreeDeciduous,
  },
  {
    id: "diy",
    label: "DIY vs. Professional",
    badge: null,
    desc: "Compare ground-based homeowner tasks with clear stop conditions and work that requires appropriately equipped help.",
    cta: "View Guide",
    Icon: Wrench,
  },
  {
    id: "ailments",
    label: "Common Diseases",
    badge: null,
    desc: "Compare spotting, early leaf drop, and bark issues with common educational references, then learn when an on-site assessment is warranted.",
    cta: "Explore Possible Causes",
    Icon: Bug,
  },
  {
    id: "hazard",
    label: "Hazard Assessment",
    badge: null,
    desc: "Check if your tree poses a safety risk to your property and get a clear action plan based on your tree's specific warning signs.",
    cta: "Assess Now",
    Icon: TriangleAlert,
  },
  {
    id: "cost",
    label: "Cost Estimator",
    badge: null,
    desc: "Get typical price ranges for common tree services in the Omaha area before you call anyone.",
    cta: "See Estimates",
    Icon: DollarSign,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Fixed parallax tree rings — sits above all section backgrounds, below nav (z-50) */}
      <TreeRingsBackground />

      {/* ─── HERO — deep forest ─────────────────────────────────────────── */}
      <section
        id="section-hero"
        className="relative overflow-hidden bg-forest pb-16 pt-20 md:pb-24 md:pt-28"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
            {/* Left: copy */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-sm font-bold text-white">
                <Activity size={14} className="text-gold" />
                Five Free Homeowner Tools
              </div>

              <h1
                className={`${dmSerif.className} text-[clamp(2.8rem,5.5vw,4.8rem)] leading-[1.05] tracking-tight text-cream`}
              >
                Stop Guessing.{" "}
                <br className="hidden sm:block" />
                <span className="text-gold">Know Your Risk.</span>
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
                Use five homeowner tools to compare tree characteristics,
                screen reported warning signs, plan broad costs, and recognize
                when an on-site or independently credentialed review is appropriate.
              </p>

              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5">
                {["Omaha-Specific Data", "No Account Needed", "Instant Action Plan"].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm font-medium text-white/80"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Hazard Assessment card */}
            <div className="lg:col-span-6 w-full">
              <HazardAssessmentHeroCard />
            </div>
          </div>
        </div>
      </section>

      {/* ─── TOOLS HUB ───────────────────────────────────────────────────── */}
      <section id="section-tools" className="bg-cream py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between border-b border-slate-200 pb-6">
            <div>
              <span className="mb-2 block text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                Tree-Care Reference Library
              </span>
              <h2
                className={`${dmSerif.className} text-[clamp(2rem,3.5vw,3rem)] text-forest`}
              >
                More Free Resources
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map(({ id, label, badge, desc, cta, Icon }) => (
              <Link
                key={id}
                href={`/tools/${id}`}
                className="group flex h-full flex-col rounded-sm border border-slate-200 bg-white p-8 transition-colors hover:border-gold"
              >
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-slate-100 transition-colors group-hover:bg-gold group-hover:text-forest">
                    <Icon className="h-6 w-6" />
                  </div>
                  {badge && (
                    <span className="rounded-sm bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">
                      {badge}
                    </span>
                  )}
                </div>
                <h3 className="mb-3 text-xl font-bold text-forest">{label}</h3>
                <p className="mb-8 flex-1 text-sm leading-relaxed text-slate-600">
                  {desc}
                </p>
                <div className="flex items-center text-sm font-bold uppercase tracking-wider text-forest">
                  <span>{cta}</span>
                  <ArrowRight
                    size={16}
                    className="ml-2 transition-transform group-hover:translate-x-1"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ────────────────────────────────────────────────────── */}
      <section id="section-services" className="bg-stone py-20">
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#3d6b5e]">
              Our Services
            </p>
            <h2
              className={`${dmSerif.className} text-[clamp(2rem,3.5vw,3rem)] text-[#1a2e1c]`}
            >
              Tree-Service Inquiries
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-[#3d3020]">
              Contact Midwest Roots to confirm service fit and current availability in the Omaha area.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {serviceIds.map((id) => {
              const svc = servicesData[id];
              if (!svc) return null;
              return (
                <Link
                  key={id}
                  href={`/services/${id}`}
                  className="group flex flex-col rounded-sm border border-slate-200 bg-white p-6 transition-colors hover:border-gold"
                >
                  <h3 className="text-base font-bold text-forest">
                    {svc.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {svc.hero_sub}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-bold uppercase tracking-wider text-forest">
                    <span>Learn More</span>
                    <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CONTACT — back to dark forest ──────────────────────────────── */}
      <section id="section-contact" className="bg-forest-deep py-20">
        <div className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gold">
              Get in Touch
            </p>
            <h2
              className={`${dmSerif.className} text-[clamp(2rem,3.5vw,3rem)] text-[#f0ede8]`}
            >
              Request an Estimate
            </h2>
            <p className="mt-3 text-[#98bdb5]">
              A server receipt confirms acceptance; response timing depends on current workload.
            </p>
          </div>
          {/* Light card so ContactForm renders correctly without restyling it */}
          <div className="rounded-2xl bg-white p-8 shadow-2xl">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
