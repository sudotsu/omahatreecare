# Publishing in The Treehouse

The Treehouse is a structured, statically generated editorial section. New articles use shared cards, article layout, table of contents, calls to action, FAQs, source lists, metadata, JSON-LD, category archives, and sitemap rules. Do not create a new page component for each article.

## Add the next article

1. Create one data file in `src/data/treehouse/`, following `tree-removal-cost.ts` and the `TreehouseArticle` type in `types.ts`.
2. Give the article a unique `id` and URL-safe `slug`. The public URL will be `/treehouse/{slug}`.
3. Choose one supported category:
   - `homeowner-guides` → `/treehouse/guides`
   - `field-notes` → `/treehouse/field-notes`
   - `tree-profiles` → `/treehouse/tree-profiles`
4. Add the article import and object to the `articles` array in `src/data/treehouse/articles.ts`.
5. Build the body from reusable `ContentBlock` entries. Use stable, descriptive IDs on level-two headings; those IDs create the table of contents.
6. Add relevant, verified internal tool and service links. All available routes are centralized in `src/data/treehouse/links.ts`.
7. Add visible FAQ answers and authoritative source references. Do not add FAQ JSON-LD solely for search enhancements.

## Required publication fields

Keep `status: "draft"` until every item below is complete:

- A real publication date in `YYYY-MM-DD` format
- An updated date when the article has materially changed
- A real author or the approved company byline, with a truthful role and biography
- Verified credentials only when tied to a real person and independently confirmable
- An approved original featured image with dimensions, descriptive alt text, and optional caption
- Owner approval for customer/property details and identifiable project photography
- Independent review of safety-sensitive content by an appropriately credentialed tree professional, as required by `siteConfig.authority.professionalReviewGate`
- Working internal links and current authoritative external sources
- No invented pricing, project stories, reviews, credentials, service capabilities, or risk conclusions

When the article is ready, change `status` to `"published"`. Published articles automatically become indexable, populate their non-empty category archive, and enter the generated sitemap. Draft articles and empty category archives stay `noindex` and are excluded from the sitemap.

## Known MVP publication holds

The first article intentionally remains a draft. Publication still requires the owner-supplied date, approved byline details, original imagery, and the independent safety review listed above. In addition, the two supplied City of Omaha Parks source URLs returned `403` to automated verification on July 21, 2026. Verify the licensed-arborist and right-of-way/city-park permit language in a normal browser or replace those references with current City sources before publishing.

## Images

Put approved originals under `public/images/treehouse/` and reference them with a root-relative path such as `/images/treehouse/example.jpg`. Supply the real pixel width and height in the article data so Next.js can reserve space and avoid layout shift.

Recommended crops:

- Featured image: 16:9
- Supporting context image: 4:3
- Social sharing image: 1200 × 630 when a separate approved crop is available

Do not replace missing project photos with generic stock arborists or AI-generated jobsite scenes. Draft pages render an explicit missing-image state instead.

## Field Notes

Field Notes must describe a real Midwest Roots project. Anonymize homeowner details, use only approved photographs, describe the decision process, and avoid operational detail that encourages unsafe imitation. Set the article category to `field-notes`; cards can use the `field-note` visual variant.

## Pre-publication checks

Run:

```bash
npm test
npm run typecheck
npm run lint
npm run build
npm run test:e2e -- tests/e2e/treehouse.spec.ts
```

Then review the landing page, article, and category pages at mobile and desktop widths. Confirm one H1, logical headings, keyboard behavior, visible focus, image alt text, canonical/robots metadata, JSON-LD values, and every internal link. Recheck business-specific claims against `src/lib/site-config.ts` and authoritative sources before changing a draft to published.
