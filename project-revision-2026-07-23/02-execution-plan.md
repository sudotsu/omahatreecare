# Execution Plan

## Dependency-aware execution plan

Executed in the teardown's dependency order (sequences 1–17). Batches:

1. **Foundations (SEC-001, SEC-002, ARCH-001, BUILD-001).** Patch Next → 16.2.11; remove unused `remotePatterns` and document the sharp trust model; introduce the `(marketing)` route group so exactly one shell renders per route family; clear all 13 lint warnings at their source and set `--max-warnings=0`. OBS-001's Vercel-script guard was folded into the ARCH-001 layout rewrite to avoid editing `layout.tsx` twice.
2. **Core workflow (FUNC-001).** Shared client-safe field contract (`src/lib/leads/fields.ts`) used by both public forms and composed into the server schema; surface the API's user-safe message.
3. **Accessibility / metadata / diagnostics (A11Y-001, A11Y-002, META-001, OBS-001, CSP-001).** Fix contrast/heading/link failures at token/component level, verified with `@axe-core/playwright`; add keyboard behavior + accessible names + dialog focus restoration; explicit home title+canonical; jitless zod entry point.
4. **Claims, cleanup, tests (DOC-001, CLEAN-001, TEST-001).** Single-source species data + README + softened accessibility copy + withheld legacy blog; delete dead files/deps; add browser invariants, axe scans, keyboard/boundary tests, dependabot, and Firefox/WebKit smoke.
5. **Retained / blocked (STR-001, PERF-001, OPS-001, PWA-001).** Preserve the pipeline and performance; record the two external gates as blocked.

Prerequisites honored: SEC-001 before SEC-002; ARCH-001 before A11Y (avoid testing contrast against duplicate chrome); baseline clean before adding gates.

## Verification plan

- Focused per-finding checks after each batch (lint, typecheck, targeted tests, curl of built output).
- Ground-truth accessibility via axe scan of 10 representative routes (report → fix → re-scan to green).
- Full pipeline re-run after each phase: typecheck, `eslint --max-warnings=0`, vitest, webpack build, Playwright.

## Convergence plan

- Full baseline-to-current diff review; confirm every changed path maps to an approved finding or preserved work.
- Rerun defining workflows (lead forms, all five tools, Treehouse, location/service pages) via the e2e suite.
- Re-run axe + shell + metadata + console + keyboard + boundary invariants to green.
- Verify built output directly (canonical, title, blog noindex, sitemap exclusion, species count, single tool shell).
- `npm audit` to confirm only the tracked SEC-002 residual remains.

## Stop conditions

- Any unresolved owner decision that changes the executable graph → stop and ask (done for CLEAN-001, DOC-001 claims, blocked scope, legacy blog).
- Any approved acceptance criterion that cannot pass without external evidence → record as blocked, do not fabricate (OPS-001, PWA-001).
- Any regression in the retained pipeline → stop and fix before proceeding.
