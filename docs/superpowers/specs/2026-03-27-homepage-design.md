
# Homepage Design Spec

**Date:** 2026-03-27 (updated 2026-03-29)
**Branch:** claude/feat-app-shell
**Route:** `/` → `src/app/page.tsx`

---

## Section Order (Tool-Forward)

1. Hero + HazardAssessmentHeroCard
2. Stats Strip
3. Diagnostic Library (5 tool cards)
4. Services
5. Contact Form

---

## 1. Hero Section

**File:** `src/app/page.tsx` (server component)

**Layout:** 12-column CSS grid on lg+, stacked on mobile. Left (col-span-6): copy. Right (col-span-6): HazardAssessmentHeroCard.

**Background:** `bg-forest` (`#11261B`) — flat, no gradient

**Left column content:**
- Pill badge: `bg-white/10 border border-white/10`, gold Activity icon — "Free Diagnostic Suite"
- Headline: "Stop Guessing." + line break + "Know Your Risk." — cream (`text-cream`) body, gold (`text-gold`) emphasis. Font: DM Serif Display, `clamp(2.8rem, 5.5vw, 4.8rem)`, leading-[1.05]
- Subtext: "Use our professional arborist tools to identify your tree species, assess storm damage hazards, and know exactly what is safe to DIY." — `text-white/70`, max-w-lg
- Trust signals: 3 items with gold CheckCircle2 icons — "Omaha-Specific Data" · "No Account Needed" · "Instant Action Plan"

**Right column — HazardAssessmentHeroCard:**
- Component: `src/components/ui/HazardAssessmentHeroCard.tsx` (server, no `"use client"`)
- Card: `bg-cream`, `rounded-sm`, `shadow-2xl`, `border-t-8 border-gold` (thick gold top border)
- Header: AlertTriangle icon + "Hazard Assessment Tool" — `text-forest`
- Subtext: "Answer specific questions about your tree's structure to generate an immediate safety score."
- Traffic light preview block (`bg-slate-100`, `rounded-sm`):
  - `bg-green-500` dot with glow `shadow-[0_0_8px_rgba(34,197,94,0.4)]` — **GREEN** Low risk. Monitor over time.
  - `bg-yellow-400` dot with glow `shadow-[0_0_8px_rgba(250,204,21,0.4)]` — **YELLOW** Moderate. Contact a pro this month.
  - `bg-red-500` dot with glow `shadow-[0_0_8px_rgba(239,68,68,0.4)]` — **RED** Critical. Contact a pro within 3–7 days.
- CTA: full-width `bg-forest` button, "Start Hazard Assessment →", links to `/tools/hazard`. Arrow slides right on hover.

---

## 2. Stats Strip

**File:** inline section in `page.tsx`
**Background:** `bg-forest-deep` (`#0d1a0f`)
**Layout:** 3-column `<dl>`, divided by `divide-white/10`, py-16

Each stat: `<dt>` (label) before `<dd>` (value) in DOM order; `flex-col-reverse` keeps value visually on top:
- `{ end: 1200, suffix: '+', label: 'Omaha Homes Served' }`
- `{ end: 500, suffix: '+', label: 'Trees Assessed' }`
- `{ end: 3, suffix: '', label: 'Years in Omaha' }`

Values: `text-[#f0ede8]`, `clamp(2.4rem, 4vw, 3.5rem)`, font-black, via `<NumberCounter>`.
Labels: `text-gold`, `text-xs`, uppercase, tracking-widest.

---

## 3. Diagnostic Library (Tools Hub)

**File:** inline section in `page.tsx`
**Background:** `bg-cream` (`#F7F6F2`)
**Section header:** Left-aligned, `border-b border-slate-200`
- Label: "DIAGNOSTIC LIBRARY" — `text-slate-500`, `tracking-[0.2em]`, uppercase
- Heading: "More Free Resources" — DM Serif Display, `text-forest`

**5 Tool Cards** — CSS grid: 1 col mobile, 2 col sm, 3 col lg

| Tool | Icon | Route | CTA |
|------|------|-------|-----|
| Species Identifier | TreeDeciduous | `/tools/species` | Access Directory |
| DIY vs. Professional | Wrench | `/tools/diy` | View Guide |
| Common Diseases | Bug | `/tools/ailments` | Start Diagnosis |
| Hazard Assessment | TriangleAlert | `/tools/hazard` | Assess Now |
| Cost Estimator | DollarSign | `/tools/cost` | See Estimates |

Card style: `bg-white`, `rounded-sm`, `border border-slate-200`, `hover:border-gold`, `p-8`.
Icon container: `bg-slate-100 rounded-sm` → `group-hover:bg-gold group-hover:text-forest`.
Badge (Species only): "24+ Profiles" — `bg-slate-100 text-slate-600`.
CTA: uppercase, `font-bold tracking-wider text-forest`, arrow slides right on hover.

Cards are Next.js `<Link>` — fully server-rendered.

---

## 4. Services Section

**File:** inline section in `page.tsx`
**Background:** `bg-stone` (`#EDECEA`)
**Heading:** "Full-Service Tree Care" — DM Serif Display, `text-[#1a2e1c]`
**Layout:** 4-card grid (1 col mobile, 2 col sm, 4 col lg)

Services from `servicesData` in `src/data/services.ts`. Each card: `bg-white`, `rounded-sm`, `border border-slate-200`, `hover:border-gold`. CTA: "Learn More →" uppercase.

---

## 5. Contact Section

**File:** inline section in `page.tsx`
**Background:** `bg-forest-deep` (`#0d1a0f`)
**Label:** "GET IN TOUCH" — `text-gold`
**Heading:** "Get a Free Estimate" — DM Serif Display, `text-[#f0ede8]`
**Subtext:** "No obligation. We'll call you back within 2 hours during business hours."
**Component:** `<ContactForm />` at `src/components/forms/ContactForm.tsx`, wrapped in `bg-white rounded-2xl p-8`

---

## Color Tokens

Defined in `src/app/globals.css` `@theme` block. Use Tailwind class names, not raw hex.

| Token | Value | Class examples |
|-------|-------|----------------|
| `--color-forest` | `#11261B` | `bg-forest`, `text-forest`, `border-forest` |
| `--color-forest-deep` | `#0d1a0f` | `bg-forest-deep` |
| `--color-gold` | `#FFB800` | `bg-gold`, `text-gold`, `border-gold`, `hover:border-gold` |
| `--color-cream` | `#F7F6F2` | `bg-cream`, `text-cream` |
| `--color-stone` | `#EDECEA` | `bg-stone` |

JS-side values also exist in `src/lib/constants.ts` `COLORS` for use in canvas/chart contexts or dynamic style computations (e.g., Navigation scroll state). CSS tokens are the primary source of truth.

---

## Components

| Component | Path | Type | Status |
|-----------|------|------|--------|
| HazardAssessmentHeroCard | `src/components/ui/HazardAssessmentHeroCard.tsx` | server | Built |
| NumberCounter | `src/components/ui/NumberCounter.tsx` | client | Built |
| TreeRingsBackground | `src/components/ui/TreeRingsBackground.tsx` | client | Built |
| ContactForm | `src/components/forms/ContactForm.tsx` | client | Built |
| FastQuoteWidget | `src/components/forms/FastQuoteWidget.tsx` | client | Untracked — available for quote page |

---

## generateMetadata

`page.tsx` exports static `metadata`:
- title: `"Omaha Tree Care | Free Tree Health Diagnostic Tools"`
- description: `"Free arborist diagnostic tools for Omaha homeowners. Assess hazards, identify tree species, get cost estimates. No account required."`
- OG image: `/images/og-image.jpg` (1200×630, stub present)
- canonical: `https://omahatreecare.com`

No JSON-LD on homepage (LocalBusiness schema goes on `/locations/[city]` pages).

---

## Constraints

- No `@ts-ignore`, no `any` casts
- `src/data/` files untouched
- All colors via CSS tokens (`bg-forest`, `text-gold`, etc.) — no inline hex except token definitions
- Server components everywhere possible — only interactive components use `"use client"`
- Mobile-first responsive
