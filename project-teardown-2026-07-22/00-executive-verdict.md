# Executive Verdict

**Review status:** provisional

## Product thesis and audited state

Midwest Roots uses a fast public Next.js site to give Omaha-area homeowners bounded tree-care education, preliminary screening, budgeting guidance, and a path to request an on-site estimate. This review covers revision `be301ac133149d31133a9a52d093fd94b2e2c90e` after the Treehouse and cost-planner work. The product is beyond prototype maturity: it has a coherent visual system, static content architecture, defensive lead API, publication controls, and a clean reproducible build.

## Verdict and trajectory

The build is not broken. A clean checkout passes type checking, 36 unit tests, the webpack production build, and all 11 current Chromium end-to-end tests. The reported 13 items are non-fatal lint warnings.

The site is nevertheless not fully release-verified. It is catching up technically: recent work improved truthfulness and content controls, but the current automated pipeline misses a duplicate tool-page shell, a real homepage form-validation failure, accessibility barriers, homepage metadata omissions, noisy platform scripts, and dependency advisories. The best path is a bounded cleanup in dependency order, not a rewrite or mass dependency upgrade.

## Strengths to preserve

- The clean build and current tests provide a stable implementation baseline (STR-001).
- The homepage is already fast in local production, with a Lighthouse performance score of 95 and no representative-width overflow (PERF-001).
- Lead intake fails closed without production storage rather than showing a false receipt.
- The rebuilt cost planner and Treehouse article now share published pricing data and explain planning limits.
- The content system distinguishes screening from diagnosis more carefully than the legacy site copy.

## Highest-consequence findings and opportunities

1. Verify real production lead persistence and receipt; this remains the only high-severity release gate and cannot be completed locally (OPS-001).
2. Give route families one layout owner; all tool routes currently mount both the global and tool shells (ARCH-001).
3. Patch Next.js to the tested 16.2.11 release, then explicitly track the remaining upstream sharp issue (SEC-001, SEC-002).
4. Unify lead validation so a phone accepted by the homepage cannot be rejected generically by the API (FUNC-001).
5. Correct confirmed accessibility failures and custom keyboard behavior before strengthening the public accessibility claims (A11Y-001, A11Y-002, DOC-001).
6. Make the cleanup durable with zero-warning lint and browser invariants for shells, metadata, errors, forms, accessibility, and alternate engines (BUILD-001, TEST-001).

## Owner decisions required

- Authorize and observe one labeled production lead test at the real persistence and delivery destination.
- Confirm whether email-only lead submissions should be accepted in both public forms, matching the API, or whether both email and phone are intentionally required.
- Approve deletion of the dead files listed in CLEAN-001; no files were deleted in this planning review.
- Define the production observation window after which the one-release retired-PWA cleanup can be removed.
- Confirm any response-time, expertise, or free-assessment promises that should remain public before DOC-001 is implemented.

## Scope, environment, assumptions, and limitations

Research and testing were performed on 2026-07-22 in WSL2 with Node 22.22.2, npm 10.9.7, Next.js 16.2.6, Playwright 1.61.1, and installed Google Chrome. A disposable clean clone was used for build and upgrade tests. Source behavior was checked against installed Next.js 16 documentation and current primary GitHub advisories.

The review remains provisional because no production credentials, authorized lead destination, real screen reader, Firefox/WebKit installation, physical device, Search Console, production analytics, or field performance data was available. Product source was not modified. Completion requires the production lead test, representative real assistive-technology and alternate-engine checks, and production confirmation of the retired service-worker state.
