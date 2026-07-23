# User Experience

## Tested journeys

The clean production build was exercised through the homepage, both contact surfaces, all five homeowner tools, the published Treehouse article, representative service/location pages, sitemap routes, 404 handling, mobile navigation, cost-planner emergency and uncertain-height states, and lead failure/receipt simulations. A 57-path crawl checked status, H1, content, images, IDs, JSON-LD, overflow, titles, canonicals, and browser errors.

The defining real production lead receipt remained blocked. Native email sending, real screen-reader use, physical devices, and Firefox/WebKit were not available.

## Onboarding and information architecture

The homepage quickly communicates that five tools are free and require no account. The cost planner now gives value before a contact request. Treehouse navigation and the published article are readable and coherent.

Tool routes break the otherwise clear information architecture: their nested layout renders an integrated header and footer while the root layout also mounts the global navigation and footer. The covered global navigation remains in the accessibility tree, and users encounter the full global footer after the integrated tool footer (ARCH-001). Route-group layout ownership is the appropriate fix.

## Interaction, content, visual system, and accessibility

The visual system is distinctive, consistent, and responsive. No representative page overflowed at 320, 375, 768, or 1440 pixels. The cost planner's emergency pricing boundary is calm and useful rather than alarmist.

Automated accessibility results were materially below the stated goal on representative routes: 91 on home, 95 on species, 94 on cost, and 98 on contact. Shared failures include low-contrast muted text, skipped footer heading levels, a hero-card heading skip, and an inline link dependent on color (A11Y-001). Manual keyboard inspection additionally found an Escape-resistant mobile menu, an unnamed species search, an unnamed icon button, and missing dialog focus restoration (A11Y-002).

Content consistency needs a shared registry. The species count is stale on the tools hub, README describes the old cost model, and accessibility copy states outcomes that current checks contradict (DOC-001).

## Feedback, recovery, trust, and performance

Lead intake correctly avoids false success when persistence is unavailable. However, the homepage accepts a seven-digit phone that the API rejects and collapses the validation failure into a generic error (FUNC-001). The fix should align client and server constraints and preserve field-specific recovery.

Local platform script errors appear on nearly every route, which makes browser diagnostics look worse and can conceal real failures (OBS-001). Zod's blocked JIT attempt creates a separate Inspector issue but falls back without breaking forms (CSP-001).

Perceived performance is a strength. The homepage scored 95 for mobile performance with approximately 2.6-second LCP and 140-millisecond total blocking time in the local run. Correctness work should preserve that baseline rather than initiate a broad optimization project.

## Passed checks and strengths to preserve

- All current Chromium end-to-end journeys passed.
- Every crawled route had the expected status, exactly one H1, content, valid JSON-LD, no broken image, no duplicate ID, and no horizontal overflow.
- 404 behavior returned the correct status and noindex metadata.
- Cost-planner emergency and uncertainty paths remain contact-free and explicit about what cannot be priced online.
- Accepted test receipts move focus to a single confirmation status.
- Homepage performance and responsive layout are strong (PERF-001).
