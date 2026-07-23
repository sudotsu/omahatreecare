# Baseline and Revalidation

## Baseline state

- **Repository:** sudotsu/omahatreecare, remote `origin` (GitHub sudotsu/omahatreecare)
- **Branch at start:** feat/cost-planner-simplification
- **Implementation-start revision:** `7bdd99c636b565ba5278aa5419bff6800bd6405d`
- **Teardown audited revision:** `be301ac133149d31133a9a52d093fd94b2e2c90e`
- **Drift:** The branch was **2 commits ahead** of the audited revision at start (`735b0d6` design spec, `7bdd99c` loosen cost planner to 4 buckets — the cost-planner rebuild). The teardown was therefore treated as **drifted** and every finding revalidated against current source.
- **Working tree at start:** clean except one untracked directory, `project-teardown-2026-07-22/` (the handoff). A committed prior `project-revision/` directory also exists (earlier Jul-18 teardown cycle) and was left untouched.
- **Toolchain:** Node 22.22.2, npm 10.9.7, Next 16.2.6→16.2.11, Playwright 1.61.1, Vitest 3.2.7, zod 4.3.6.
- **Baseline checks:** typecheck clean; `eslint .` reported exactly 13 warnings; 36 unit tests, webpack build, and 11 Chromium e2e all passed.
- **PR/CI/delivery:** No open PR for this branch; CI workflow `Quality` runs on PR/push. No production deployment inspected.

## Preservation inventory

- Committed prior artifact `project-revision/` (Jul-18 cycle, teardown `3909e4e`) — **not modified**; this run writes to the dated sibling `project-revision-2026-07-23/`.
- `deprecated/CLEANUP_POLICY.md` — retained (policy doc); its archive log updated to record the CLEAN-001 discard.
- All non-approved product paths unchanged; changed paths map to approved findings (see 04 changed-path attribution).

## Current-state revalidation

Drift materially changed two findings; the rest confirmed:

- **BUILD-001 → changed.** Still exactly 13 lint warnings, but composition shifted: the rebuilt CostEstimator no longer carries the `void` suppression the teardown cited; PremiumHazardAssessment now holds 9 unused-symbol warnings (7 icons + `CONTACT` + `setSelectedTree`). Same fix class, different files.
- **FUNC-001 → changed.** The phone mismatch is only in the homepage `ContactForm` (`min(7)`); `MultiStepContactForm` already enforced 10 digits. Both public forms already require phone **and** email in the UI, narrowing the "email-only policy" question to a documented server-superset decision.
- **META-001 → changed.** Root cause reconfirmed: at the audited revision `app/page.tsx` and the title template in `app/layout.tsx` were the **same** root segment, so the template did not apply. The route-group move plus an explicit absolute title makes the outcome robust.
- **SEC-001 → confirmed.** npm audit at start still reported both Next advisories on 16.2.6.
- **SEC-002 → confirmed.** Only the transitive sharp advisory remains after the upgrade; no remote/upload image path exists.
- **ARCH-001 → confirmed.** Root layout still mounts global Navigation+Footer while `tools/layout` mounts its own shell.
- **A11Y-001 → confirmed.** axe reproduced contrast/heading/link failures on 9/10 representative routes before the fix.
- **A11Y-002 → confirmed.** Mobile menu lacked Escape; species search/close button unnamed; dialog dropped focus to body.
- **OBS-001 → confirmed.** Analytics/SpeedInsights mounted unconditionally; local `/_vercel/*` 404s reproduced.
- **CSP-001 → confirmed.** zod 4.3.6 exposes `z.config({ jitless: true })`; CSP omits `unsafe-eval`.
- **DOC-001 → confirmed.** Tools index still claimed 12 species (actual 10); README still "uncalibrated"; accessibility statement overclaimed; legacy blog indexed + in sitemap.
- **CLEAN-001 → confirmed.** The five dead files exist with no external importers; the three deps trace only to the dead `button.tsx` (or zero usage for zustand).
- **TEST-001 → confirmed.** CI ran Chromium only, lint without a warning ceiling, and no accessibility/metadata/console/shell/dependency gates.
- **OPS-001 / PWA-001 → blocked.** External evidence unavailable.
- **STR-001 / PERF-001 → confirmed** strengths to preserve.
