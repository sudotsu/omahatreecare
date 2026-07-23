# Build and Browser Evidence Summary

Audited revision: `be301ac133149d31133a9a52d093fd94b2e2c90e` on 2026-07-22. Product source remained read-only during this review. A disposable clone under `/tmp` was used for clean-install and dependency-upgrade tests.

## Clean pipeline

- Node 22.22.2 and npm 10.9.7.
- `npm ci`: passed; npm reported two high-severity dependency advisories.
- `npm run typecheck`: passed.
- `npm test`: 36 tests in seven files passed.
- `npm run lint`: passed with exactly 13 warnings.
- `npm run build`: passed with 65 generated routes using the repository's webpack build command.
- `npm run test:e2e`: all 11 Chromium tests passed.

## The 13 lint warnings

1. `MultiStepContactForm.tsx`: React Hook Form `watch` is flagged by `react-hooks/incompatible-library`; React Compiler is not enabled in current Next config, so this is forward compatibility rather than a current optimization failure.
2. `CommonAilments.tsx`: unused `_searchParams`.
3. `DIYvsProGuide.tsx`: unused `searchParams`.
4. `PremiumHazardAssessment.tsx`: unused `AlertTriangle`.
5. `PremiumHazardAssessment.tsx`: unused `CheckCircle`.
6. `PremiumHazardAssessment.tsx`: unused `Info`.
7. `PremiumHazardAssessment.tsx`: unused `Mail`.
8. `PremiumHazardAssessment.tsx`: unused `MessageSquare`.
9. `PremiumHazardAssessment.tsx`: unused `Share2`.
10. `PremiumHazardAssessment.tsx`: unused `ArrowLeft`.
11. `PremiumHazardAssessment.tsx`: unused `CONTACT`.
12. `PremiumHazardAssessment.tsx`: unused `setSelectedTree`.
13. `SpeciesIdentifier.tsx`: unused `_searchParams`.

`CostEstimator.tsx` has the same unused prop but suppresses it with `void _searchParams`. The common source is the dynamic route passing `searchParams` to all five tools even though only Hazard consumes query input.

## Browser routes and behavior

- A production crawl covered 57 paths: all expected statuses, one H1 per route, non-empty bodies, no broken images, no duplicate IDs, valid JSON-LD, no horizontal overflow, and no duplicate title or canonical values.
- The homepage was the only crawled indexable page without a canonical. Its rendered title was exactly `Tree Hazard & Health Tools`.
- Representative widths 320, 375, 768, and 1440 pixels showed no horizontal overflow on home, cost tool, contact, and the published Treehouse article.
- At every width, the cost tool contained the global navigation plus its tool header and three footer elements: the planner control footer, integrated tool footer, and global site footer. The global site footer was visible after the integrated tool footer.
- Every local application route attempted Vercel Analytics and Speed Insights requests; 56 routes logged the resulting 404 and MIME errors.
- A seven-digit homepage phone passed client validation, reached `/api/leads`, received HTTP 400, and displayed only the generic failure message.
- Mobile navigation stayed open after Escape.
- The species search input had no accessible name, its detail close icon button was unnamed, and closing the high-concern dialog with Escape moved focus to `body` rather than the invoking button.

## Lighthouse and accessibility

Lighthouse 13.4.1 against the local production server:

| Route | Performance | Accessibility | Best practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| `/` | 95 | 91 | 92 | 100 |
| `/tools/species` | not sampled | 95 | 92 | 100 |
| `/tools/cost` | not sampled | 94 | 92 | 100 |
| `/contact` | not sampled | 98 | 92 | 100 |

Confirmed failures included color contrast, heading order, inline-link distinction on the homepage, browser console errors, and Chrome Inspector issues. Examples included slate-400 form labels on white at approximately 2.63:1, a 4.4:1 homepage eyebrow against a 4.5:1 target, gold tool-shell labels below threshold, footer headings starting at h4, and an inline phone link with no persistent underline.

CDP Inspector issue capture identified a CSP eval violation from Zod JIT schema compilation. Forms continued through Zod's fallback; no `unsafe-eval` change is recommended.

## Limits

- No real NVDA, JAWS, VoiceOver, Firefox, WebKit, physical device, Search Console, production field-performance, or authorized production lead-destination test was available.
- Native email-client delivery and production analytics ingestion were not exercised.
