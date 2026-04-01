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
  Phone,
  ChevronRight,
} from "lucide-react";
import { NumberCounter } from "@/components/ui/NumberCounter";
import { HazardAssessmentHeroCard } from "@/components/ui/HazardAssessmentHeroCard";
import { ContactForm } from "@/components/forms/ContactForm";
import { dmSerif } from "@/lib/fonts";
import { CONTACT, STATS } from "@/lib/constants";
import { serviceIds, servicesData } from "@/data/services";

export const metadata: Metadata = {
  title: "Midwest Roots Tree Services | Free Tree Diagnostic Tools — Omaha",
  description:
    "Free arborist tools for Omaha homeowners. Assess hazards, diagnose tree problems, get cost estimates. Midwest Roots Tree Services — certified arborist, no account required.",
  openGraph: {
    title: "Midwest Roots Tree Services | Free Tree Diagnostic Tools",
    description:
      "Free arborist tools for Omaha homeowners. Hazard assessment, species ID, cost estimates. No account required.",
    url: CONTACT.siteUrl,
    siteName: CONTACT.businessName,
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Midwest Roots Tree Services | Free Diagnostic Tools",
    description:
      "Free arborist tools for Omaha homeowners. No account required.",
    images: ["/images/og-image.jpg"],
  },
};

interface Tool {
  id: string;
  label: string;
  desc: string;
  cta: string;
  Icon: LucideIcon;
  /** Tailwind bg class for the icon circle */
  iconBg: string;
  /** Tailwind text class for the icon */
  iconColor: string;
}

/** Ordered for mobile scroll — Hazard first, Ailments second (peek card) */
const TOOLS: Tool[] = [
  {
    id: "hazard",
    label: "Hazard Assessment",
    desc: "Get a risk score and action timeline for your specific tree.",
    cta: "Assess Now",
    Icon: TriangleAlert,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    id: "ailments",
    label: "Common Tree Problems",
    desc: "Identify diseases, pests, and environmental issues by symptom.",
    cta: "Diagnose",
    Icon: Bug,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700",
  },
  {
    id: "species",
    label: "Species Identifier",
    desc: "Match your tree's leaf and bark to 12 Omaha-area species.",
    cta: "Identify",
    Icon: TreeDeciduous,
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
  },
  {
    id: "diy",
    label: "DIY vs. Pro Guide",
    desc: "Know which jobs are safe to do yourself and which need a pro.",
    cta: "View Guide",
    Icon: Wrench,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    id: "cost",
    label: "Cost Estimator",
    desc: "Real price ranges for 9 common services before you call anyone.",
    cta: "See Estimates",
    Icon: DollarSign,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ─── HERO + MOBILE TOOL STRIP ──────────────────────────────────────
          One unified dark section. On mobile the hero content is compact
          enough that tool cards begin within the viewport, with the second
          card peeking to signal scroll. On desktop the hero splits with the
          HazardCard on the right; full tool grid appears in its own section.
      ──────────────────────────────────────────────────────────────────── */}
      <section
        id="section-hero"
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(155deg, #0d1a0f 0%, #11261B 55%, #1c3826 100%)",
        }}
      >
        {/* ── Hero copy ─────────────────────────────────────────────────── */}
        <div className="relative z-10 mx-auto max-w-7xl px-5 pt-20 pb-8 sm:px-8 lg:pt-28 lg:pb-20">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">

            {/* Left: copy */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <h1
                className={`${dmSerif.className} text-[clamp(2.6rem,5.5vw,4.6rem)] leading-[1.08] tracking-tight text-[#f0ede8]`}
              >
                Stop Guessing.{" "}
                <br className="hidden sm:block" />
                <span className="text-[#FFB800]">Know Your Risk.</span>
              </h1>

              {/* Local trust pill — below H1 so headline hits first */}
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Locally Owned · Serving Omaha &amp; the Metro
              </div>

              <p className="mt-4 hidden sm:block max-w-md text-base leading-relaxed text-white/65 lg:text-lg">
                Identify tree species, assess storm hazards, and know what&apos;s safe to DIY. 100% free.
              </p>

              {/* CTAs — equal weight: phone for "need it now", assessment for "not sure yet" */}
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={`tel:${CONTACT.phoneRaw}`}
                  className="inline-flex items-center gap-2.5 rounded-sm bg-[#FFB800] px-6 py-3.5 text-sm font-bold text-[#0d1a0f] transition-colors hover:bg-amber-300"
                >
                  <Phone size={16} />
                  {CONTACT.phone}
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 rounded-sm border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/20"
                >
                  Free Quote
                </Link>
              </div>

              {/* Trust signals — desktop only to keep mobile compact */}
              <ul className="mt-7 hidden sm:flex flex-wrap gap-x-5 gap-y-2">
                {["Omaha-Specific Data", "No Account Needed", "Instant Action Plan"].map((item) => (
                  <li key={item} className="flex items-center gap-1.5 text-sm font-medium text-white/60">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#FFB800]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Hazard card — desktop only */}
            <div className="hidden lg:block lg:col-span-6 w-full">
              <HazardAssessmentHeroCard />
            </div>
          </div>
        </div>

        {/* ── Mobile tool card strip ─────────────────────────────────────
            Sits inside the hero section so the dark background is continuous.
            Compact horizontal cards. Second card is intentionally partially
            visible at bottom of viewport to signal scroll.
        ─────────────────────────────────────────────────────────────────── */}
        <div className="relative z-10 lg:hidden">
          <div className="px-5 pb-1">
            <p className="mb-4 text-sm leading-snug text-white/60">
              Not sure if you need a professional?{" "}
              <span className="text-white/85">
                Our risk assessment uses ISA standards — 5 clicks, no sign-up.
              </span>
            </p>
          </div>
          <div className="space-y-2.5 px-5 pb-8">
            {TOOLS.map(({ id, label, desc, cta, Icon, iconBg, iconColor }) => (
              <Link
                key={id}
                href={`/tools/${id}`}
                className="group flex items-center gap-5 rounded-sm border border-white/10 bg-white/5 px-5 py-6 transition-colors hover:bg-white/10 active:bg-white/15"
              >
                {/* Icon circle */}
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${iconBg}`}>
                  <Icon className={`h-7 w-7 ${iconColor}`} />
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <p className="text-base font-bold text-[#f0ede8]">{label}</p>
                  <p className="mt-1 text-sm leading-snug text-white/55">{desc}</p>
                </div>

                {/* Arrow */}
                <ArrowRight
                  size={16}
                  className="shrink-0 text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:text-[#FFB800]"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ──────────────────────────────────────────────────────── */}
      <section
        id="section-stats"
        className="border-t border-white/5 bg-[#0d1a0f] py-12"
      >
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
          <dl className="grid grid-cols-3 divide-x divide-white/10">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse items-center px-4 text-center sm:px-6">
                <dt className="mt-2 text-[0.65rem] font-bold uppercase tracking-widest text-[#FFB800]">
                  {stat.label}
                </dt>
                <dd className="text-[clamp(2rem,4vw,3rem)] font-black leading-none tabular-nums text-[#f0ede8]">
                  <NumberCounter end={stat.end} suffix={stat.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ─── TOOLS HUB — desktop only ────────────────────────────────────
          Mobile users already see the tool strip in the hero above.
          This full grid is for sm+ viewports only.
      ──────────────────────────────────────────────────────────────────── */}
      <section id="section-tools" className="hidden sm:block py-20" style={{ background: "linear-gradient(180deg, #1a1917 0%, #201e1b 100%)" }}>
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-10 flex items-end justify-between border-b border-white/10 pb-5">
            <div>
              <h2 className={`${dmSerif.className} text-[clamp(1.8rem,3vw,2.6rem)] text-[#f0ede8]`}>
                Homeowner Tools
              </h2>
            </div>
            <Link
              href="/tools"
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-white/50 hover:text-[#FFB800] transition-colors"
            >
              View all <ChevronRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map(({ id, label, desc, cta, Icon, iconBg, iconColor }) => (
              <Link
                key={id}
                href={`/tools/${id}`}
                className="group flex h-full flex-col rounded-sm border border-white/10 bg-white/5 p-7 transition-all hover:border-[#FFB800]/60 hover:bg-white/10 cursor-pointer"
              >
                {/* Large icon */}
                <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-full ${iconBg} transition-transform group-hover:scale-105`}>
                  <Icon className={`h-7 w-7 ${iconColor}`} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-[#f0ede8]">{label}</h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-white/55">{desc}</p>
                <div className="flex items-center text-sm font-bold uppercase tracking-wider text-[#FFB800]">
                  <span>{cta}</span>
                  <ArrowRight size={15} className="ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ────────────────────────────────────────────────────── */}
      <section id="section-services" className="bg-[#EDECEA] py-20">
        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#3d6b5e]">
              Professional Services
            </p>
            <h2 className={`${dmSerif.className} text-[clamp(1.8rem,3.5vw,2.8rem)] text-[#1a2e1c]`}>
              Full-Service Tree Care
            </h2>
            <p className="mx-auto mt-3 max-w-md text-base text-[#3d3020]">
              Serving Omaha and surrounding communities since 2023.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {serviceIds.map((id) => {
              const svc = servicesData[id];
              if (!svc) return null;
              return (
                <Link
                  key={id}
                  href={`/services/${id}`}
                  className="group flex flex-col rounded-sm border border-stone-200 bg-white p-6 transition-all hover:border-[#FFB800] hover:shadow-md cursor-pointer"
                >
                  <h3 className="text-base font-bold text-[#11261B]">{svc.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-500">{svc.hero_sub}</p>
                  <div className="mt-4 flex items-center text-xs font-bold uppercase tracking-wider text-[#11261B]">
                    <span>Learn More</span>
                    <ArrowRight size={13} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─────────────────────────────────────────────────────── */}
      <section
        id="section-contact"
        className="py-20"
        style={{ background: "linear-gradient(160deg, #0d1a0f 0%, #11261B 100%)" }}
      >
        <div className="relative z-10 mx-auto max-w-2xl px-5 sm:px-8">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#FFB800]">
              Get in Touch
            </p>
            <h2 className={`${dmSerif.className} text-[clamp(2rem,3.5vw,2.8rem)] text-[#f0ede8]`}>
              Get a Free Estimate
            </h2>
            <p className="mt-3 text-[#98bdb5]">
              No obligation. Andrew responds within a few hours.
            </p>
          </div>
          <div className="rounded-sm bg-white p-7 shadow-2xl sm:p-9">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
