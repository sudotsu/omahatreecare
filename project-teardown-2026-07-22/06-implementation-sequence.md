# Implementation Sequence

## Phase 1 — Patch and establish clean foundations

Implement SEC-001 first: align `next` and `eslint-config-next` on the already verified 16.2.11 patch. Then record the remaining sharp reachability and upstream trigger under SEC-002; do not block all cleanup on an unsupported override.

Fix ARCH-001 before styling individual tool pages. Route groups should assign one shell to marketing routes, one to tools, and standalone behavior to field estimate. In parallel, resolve BUILD-001 by giving only Hazard query parameters, removing unused code, switching the form subscription to `useWatch`, and setting lint's warning ceiling to zero.

Validation gate: clean install, `npm ls`, audit triage, typecheck, zero-warning lint, unit tests, build, all existing end-to-end tests, and shell-count checks at phone and desktop widths.

## Phase 2 — Correct the core request workflow

Implement FUNC-001 with a shared client-safe normalization/validation contract. The owner must decide whether email-only submissions are intentionally accepted across both forms. Preserve the API's fail-closed behavior and add boundary tests before changing UX copy.

OPS-001 remains a separate operational gate: after local verification, execute one labeled authorized production request and record persistence, idempotency/retry, and destination receipt. This cannot be replaced with another mocked success.

Validation gate: 7-, 9-, formatted 10-digit, email-only-policy, duplicate, storage-failure, delivery-failure, and success tests; sanitized production receipt evidence.

## Phase 3 — Accessibility, metadata, and diagnostic correctness

Fix A11Y-001 at shared tokens and components, then A11Y-002 at the interaction-pattern level. Correct META-001 and OBS-001 in parallel. Configure Zod jitless under CSP for CSP-001 without adding unsafe-eval.

Validation gate: automated accessibility passes on representative route families, keyboard scripts for navigation/dialogs, 200% zoom inspection, sitemap metadata crawl, clean local browser console, and zero CSP Inspector eval issues. Real assistive technology remains required before claiming compatibility.

## Phase 4 — Claims, tests, and maintainability

Reconcile README, tool summaries/counts, accessibility language, and legacy content under DOC-001. Prefer a shared tool registry over duplicating counts and summaries. Then remove the owner-approved dead files/dependencies in CLEAN-001.

Complete TEST-001 alongside the fixes: add regression tests that first reproduce each known failure, representative accessibility automation, metadata and shell invariants, unexpected-console failure, and focused Firefox/WebKit smoke coverage. Add controlled dependency automation and a configured dead-code check only after the baseline is clean.

Validation gate: the complete pipeline from a fresh checkout plus a claims-inventory review and source-usage search.

## Phase 5 — Retained strengths and deferred operational cleanup

Preserve STR-001 and PERF-001; compare performance after each phase rather than launching a speculative optimization project. PWA-001 stays blocked until deployed clients prove the retired worker and caches are gone; then remove the temporary cleanup and migration-only styles in the next authorized release.

## Coverage ledger

| Sequence | Finding ID | Planned disposition | Prerequisites | Rationale |
| --- | --- | --- | --- | --- |
| 1 | SEC-001 | fix | None | Apply the tested supported security patch before further baseline work. |
| 2 | SEC-002 | investigate | SEC-001 | Triage only the residual sharp finding after removing the patched Next advisories. |
| 3 | ARCH-001 | fix | None | Establish one shell owner before page-level accessibility and visual fixes. |
| 4 | BUILD-001 | fix | None | Remove the 13-warning baseline and expose future warnings. |
| 5 | FUNC-001 | fix | Owner decision on email-only policy | Repair the primary local conversion defect. |
| 6 | OPS-001 | investigate | Authorized production credentials and destination | Prove operational completion of the primary workflow. |
| 7 | A11Y-001 | fix | ARCH-001 | Avoid testing contrast and hierarchy against duplicate chrome. |
| 8 | A11Y-002 | fix | ARCH-001 | Correct shared interaction semantics after layout ownership is stable. |
| 9 | META-001 | fix | None | Restore canonical and complete homepage identity. |
| 10 | OBS-001 | fix | None | Make browser diagnostics trustworthy before adding console gates. |
| 11 | CSP-001 | fix | None | Remove the eval issue without weakening CSP. |
| 12 | DOC-001 | fix | Owner review of business promises | Reconcile public claims with the corrected implementation. |
| 13 | CLEAN-001 | remove | Owner approval for deletion | Remove confirmed dead surface after behavior is protected. |
| 14 | TEST-001 | add | Known defects fixed or represented by failing regression tests | Make the cleanup durable across CI and browsers. |
| 15 | PWA-001 | investigate | Production observation window | Retire temporary migration code only after external proof. |
| 16 | STR-001 | retain | None | Preserve the clean reproducible pipeline. |
| 17 | PERF-001 | retain | None | Preserve strong performance while prioritizing correctness. |
