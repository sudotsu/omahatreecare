# Homepage Design Spec
**Date:** 2026-03-27
**Branch:** claude/feat-app-shell
**Route:** `/` → `src/app/page.tsx`

---

## Section Order (Tool-Forward)

1. Hero + FastQuote
2. Stats Strip
3. Tools Hub (5 cards)
4. Services
5. Contact Form

---

## 1. Hero Section

**File:** `src/app/page.tsx` (inline, server component — no interactivity needed at this level)

**Layout:** Two-column on md+, stacked on mobile. Left: text. Right: FastQuote widget.

**Background:**
- Base: `#f8f6f1` (brand warm cream)
- Overlay: `repeating-radial-gradient` concentric ellipses anchored at `70% 50%`, color `rgba(61,48,39,0.05)`, 30px ring pitch
- No image, no external asset needed

**Left column content:**
- Pill badge: teal bg (`#52796f`), white text — `⏱ Free Assessment · Takes 10 Minutes`
- Headline: `Know Your Tree Risk` (dark `#3d3027`) + `Before Winter Storms Hit` (teal `#52796f`). Font: Geist (already loaded), 4xl–6xl responsive, font-weight 800
- Subtext: "Free winter prep diagnostic tool. Assess ice storm damage risk, get honest recommendations. Omaha-specific." — `#6b5a4e`, text-lg
- Trust signals row: 3 items with check icons — "No email required" · "Instant results" · "Certified Arborist Standards"
- Secondary CTA link: "Or use the full Diagnostic Tool →" links to `/tools`

**Right column — FastQuote widget:**
- Dark card: `bg-[#2d3748]` or `bg-[#1e2a24]` (dark forest), rounded-xl, shadow-xl
- Header: lightning bolt icon + "Fast Quote Request" — white text
- Fields: ZIP Code (text input), Service Needed (select dropdown — 4 services from `servicesData`)
- CTA button: full-width, teal bg, "Next →"
- Widget is a `"use client"` component: `src/components/forms/FastQuoteWidget.tsx`
- On submit: routes to `/free-tree-assessment-omaha?zip=XXXXX&service=YYYYY` (query params, no API call needed yet)

---

## 2. Stats Strip

**File:** inline section in `page.tsx`
**Background:** `#2d4a3e` (dark teal)
**Layout:** 3 columns, centered, py-16

Each stat uses `<NumberCounter>` (already built):
- `{ end: 1200, suffix: '+', label: 'Omaha homeowners served' }`
- `{ end: 500, suffix: '+', label: 'Trees assessed & serviced' }`
- `{ end: 3, suffix: '', label: 'Years serving Omaha' }`

Numbers: white, 4xl, bold. Labels: `#a8c5be` (muted teal-white).

---

## 3. Tools Hub

**File:** inline section in `page.tsx`
**Background:** `#f8f6f1` with very faint background — same cream as hero, creates visual breathing room
**Heading:** "Free Tree Care Tools" — centered, `#3d3027`
**Subheading:** "Professional arborist knowledge, free for Omaha homeowners. No account, no email."

**5 Tool Cards** — responsive grid (1 col mobile, 3 col md+, wraps to 2+3):

| Tool | Icon | Icon bg | Route |
|---|---|---|---|
| Species Identifier | `TreeDeciduous` | green-100 / `#52796f` | `/tools/species` |
| Hazard Assessment | `TriangleAlert` | orange-100 / `#c1666b` | `/tools/hazard` |
| Common Problems | `Bug` | purple-100 | `/tools/ailments` |
| DIY vs Professional | `Wrench` | blue-100 | `/tools/diy` |
| Cost Estimator | `DollarSign` | yellow-100 | `/tools/cost` |

Each card: white bg, rounded-xl, subtle shadow, hover:shadow-md + hover:translate-y-[-2px] transition. Icon in colored square (48px, rounded-lg). Title + short description. Arrow link to tool route.

Cards are Next.js `<Link>` components — fully server-rendered, no client JS needed.

---

## 4. Services Section

**File:** inline section in `page.tsx`
**Background:** `#f0ebe3` (slightly deeper cream — visual break from Tools section)
**Heading:** "Our Services"
**Layout:** 4-card grid (2×2 on md, 1 col mobile)

Services from `servicesData` in `src/data/services.ts`. Each card: service name, short description, icon from lucide-react, teal CTA link to `/services/[service]`.

---

## 5. Contact Section

**File:** inline section in `page.tsx`
**Background:** `#2d4a3e` (same dark teal as stats strip — bookends the page)
**Heading:** "Get a Free Estimate" — white
**Subtext:** "No obligation. We'll call you back within 2 hours." — muted
**Component:** `<ContactForm />` — already built at `src/components/forms/ContactForm.tsx`

---

## New Components to Build

| Component | Path | Type |
|---|---|---|
| FastQuoteWidget | `src/components/forms/FastQuoteWidget.tsx` | client |
| ToolCard | `src/components/ui/ToolCard.tsx` | server |
| ServiceCard | `src/components/ui/ServiceCard.tsx` | server |

---

## generateMetadata

`page.tsx` exports `generateMetadata()`:
- title: `"Omaha Tree Care | Free Tree Health Diagnostic Tools"`
- description: `"Free winter prep diagnostic tool for Omaha homeowners. Assess ice storm damage risk, identify tree species, get cost estimates. No email required."`
- OG image: `/images/og-image.jpg` (stub present, real image TBD)
- canonical: `https://omahatreecare.com`

No JSON-LD on homepage (LocalBusiness schema goes on `/locations/[city]` pages).

---

## Constraints

- No `@ts-ignore`, no `any` casts
- `src/data/` files untouched
- All colors from design tokens (no raw hex except where token doesn't exist)
- Server components everywhere possible — only FastQuoteWidget needs `"use client"`
- Mobile-first responsive
