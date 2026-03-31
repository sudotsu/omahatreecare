# Midwest Roots Tree Services — omahatreecare.com

Next.js 15 rewrite of the Omaha tree care marketing site. Deployed on Vercel at [omahatreecare.com](https://omahatreecare.com).

## Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Email**: EmailJS (`@emailjs/browser`) for lead capture
- **Analytics**: Google Analytics 4 via `window.gtag`
- **Deployment**: Vercel (branch: `main`)

## Dev

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Project structure

```text
src/
├── app/
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout (fonts, nav, footer)
│   └── tools/
│       ├── layout.tsx            # Shared tools header/footer
│       └── [tool]/page.tsx       # Dynamic tool routes (hazard|species|cost|diy|ailments)
├── components/
│   ├── layout/                   # Navigation, Footer
│   ├── tools/                    # Tool components (one per slug)
│   ├── forms/                    # FastQuoteWidget
│   └── ui/                       # Shared UI components
├── data/                         # Static data (services, locations, species, ailments…)
├── lib/
│   └── constants.ts              # CONTACT, STATS, COLORS, SERVICE_AREAS
└── types/
    └── gtag.d.ts                 # window.gtag type augmentation
```

## Tool routes

| URL | Component |
|-----|-----------|
| `/tools/hazard` | HazardAssessment — risk scoring quiz |
| `/tools/species` | SpeciesIdentifier — Omaha tree database + photo email |
| `/tools/cost` | CostEstimator — price range by service type |
| `/tools/diy` | DIYvsProGuide — safe/risky/pro-only task categorization |
| `/tools/ailments` | CommonAilments — 11 diseases/pests/environmental issues |

## Environment variables

Required in Vercel project settings (and `.env.local` for local dev):

```dotenv
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

Without these the email capture modal in the Hazard Assessment tool shows a fallback CTA instead of the signup form.

## Pages not yet built (404s)

The following routes are linked from the nav, footer, or tool CTAs but have no page yet:

| Route | Linked from |
|-------|-------------|
| `/services/winter-tree-prep` | Nav, Footer, Homepage service cards |
