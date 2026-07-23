# Findings Register

<!-- Generated from findings.json by scripts/render_findings.py. Do not edit manually. -->

## STR-001 — The clean build and existing automated suite are healthy

- **Type:** strength
- **Category:** build
- **Severity:** informational
- **Confidence:** confirmed
- **Verification state:** behaviorally-verified
- **Status:** retained
- **Impact:** The repository has a dependable baseline for cleanup: a fresh install passes type checking, all 36 unit tests, the production build, and all 11 Chromium end-to-end tests.
- **Evidence:** [test] npm ci, typecheck, 36 unit tests, production build, and 11 Chromium end-to-end tests passed at the audited revision. — clean disposable clone (evidence/build-and-browser-summary.md)
- **Expected behavior:** A release candidate should install and pass its documented quality pipeline from a clean checkout.
- **Actual behavior:** The full documented pipeline passed; lint exited successfully with 13 non-fatal warnings.
- **Root cause:** The project has a coherent npm workflow and a CI job that exercises the principal build stages.
- **Affected components:** package.json | .github/workflows/quality.yml | tests
- **Recommendation:** Preserve the clean pipeline while strengthening its gates in TEST-001.
- **If implemented:** Future cleanup can proceed against a stable, reproducible baseline.
- **If unchanged:** The existing baseline remains useful, but it will continue to miss the runtime defects documented in this report.
- **Dependencies:** None
- **Dependents:** None
- **Conflicts:** None
- **Acceptance criteria:** The clean install, typecheck, unit tests, build, and end-to-end suite remain green after each cleanup phase.
- **Verification:** Repeat the full clean-checkout pipeline after implementation.
- **Estimated scope:** trivial
- **Regression risk:** low
- **Action:** retain
- **Strategic classification:** strength-to-preserve
- **JSON record digest:** sha256:d76429f3957c4946456081b10efb7d5a122c90b75ec118205afdf4329abfed5a

## PERF-001 — Homepage performance is already strong

- **Type:** strength
- **Category:** performance
- **Severity:** informational
- **Confidence:** confirmed
- **Verification state:** behaviorally-verified
- **Status:** retained
- **Impact:** The mobile homepage reached a Lighthouse performance score of 95 with no horizontal overflow across tested widths, so correctness and accessibility work should take priority over speculative optimization.
- **Evidence:** [behavioral] Homepage performance scored 95; representative pages had zero horizontal overflow at 320, 375, 768, and 1440 pixels. — Lighthouse 13.4.1 and Playwright (evidence/build-and-browser-summary.md)
- **Expected behavior:** The site should remain responsive without sacrificing correctness or maintainability.
- **Actual behavior:** Observed performance is strong; LCP was approximately 2.6 seconds and total blocking time approximately 140 milliseconds in the local mobile run.
- **Root cause:** Static generation, local images, and a relatively restrained visual implementation keep the primary experience fast.
- **Affected components:** src/app/page.tsx | Next.js production output
- **Recommendation:** Retain the current performance envelope and measure after functional changes; treat form lazy-loading as optional only if later traces justify it.
- **If implemented:** Cleanup work will preserve a measurable performance budget rather than introducing premature complexity.
- **If unchanged:** Performance remains acceptable, subject to real-user production data that was unavailable here.
- **Dependencies:** None
- **Dependents:** None
- **Conflicts:** None
- **Acceptance criteria:** Representative mobile performance remains near the current baseline after the cleanup.
- **Verification:** Rerun production Lighthouse and compare LCP, blocking time, and the performance score.
- **Estimated scope:** trivial
- **Regression risk:** low
- **Action:** retain
- **Strategic classification:** strength-to-preserve
- **JSON record digest:** sha256:0183aafd62dc231a3c58574e54b7d920df8d2c73900600f9c7b0890a9859d8ad

## ARCH-001 — Tool routes render duplicate global and tool-specific site shells

- **Type:** defect
- **Category:** architecture
- **Severity:** medium
- **Confidence:** confirmed
- **Verification state:** defect-conclusively-demonstrated
- **Status:** open
- **Impact:** Every tool page mounts a global fixed navigation and footer in addition to the tool header and footer. The top navigation is visually covered, the second footer remains visible after the tool footer, and hidden duplicate chrome distorts accessibility results and document semantics.
- **Evidence:** [behavioral] At all four tested widths, /tools/cost contained the global navigation and three footer elements; scrolling to the bottom exposed the full second site footer. — Playwright production route inspection (evidence/build-and-browser-summary.md) ; [source] The root layout always renders global chrome while the nested tools layout independently renders integrated chrome. — root and tool layouts (src/app/layout.tsx:117 and src/app/tools/layout.tsx:8)
- **Expected behavior:** Each route should have one intentional navigation/header system and one intentional footer, with clear layout ownership.
- **Actual behavior:** Tool routes receive both shells; stacking hides one header but does not remove it semantically, and both footers are user-visible in sequence.
- **Root cause:** Global site chrome is mounted unconditionally in the root layout while standalone surfaces also own chrome; route groups do not currently separate marketing, tools, and field-estimate shells.
- **Affected components:** src/app/layout.tsx | src/app/tools/layout.tsx | src/app/field-estimate/page.tsx | src/app/globals.css
- **Recommendation:** Move shared html/body providers to the root and use route-group layouts so marketing pages, tool pages, and the field estimate each mount exactly one shell. Do not extend the existing :has-based hiding pattern.
- **If implemented:** Tool pages will have correct semantics, predictable styling, less client work, and no duplicate footer experience.
- **If unchanged:** Accessibility and visual behavior will remain timing- and stacking-dependent, and future layout changes can expose duplicate chrome more prominently.
- **Dependencies:** None
- **Dependents:** None
- **Conflicts:** None
- **Acceptance criteria:** Every route family renders exactly its intended shell. | Tool pages expose one primary navigation and one site footer after hydration. | Field-estimate print and standalone behavior remains intact.
- **Verification:** Add shell-count assertions and visually verify marketing, tools, Treehouse, and field-estimate routes at phone and desktop widths.
- **Estimated scope:** medium
- **Regression risk:** medium
- **Action:** fix
- **Strategic classification:** foundational-fix
- **JSON record digest:** sha256:25616b2b111dd97930ff1a9db5b09ef42e3b0566474e9372772f511dcfc2293b

## BUILD-001 — Thirteen lint warnings reveal stale tool interfaces and unused code

- **Type:** shortcoming
- **Category:** build-quality
- **Severity:** low
- **Confidence:** confirmed
- **Verification state:** source-only
- **Status:** open
- **Impact:** Lint is noisy enough that new warnings can blend into the baseline, while several warnings reflect a shared route interface that passes query parameters to tools that do not use them.
- **Evidence:** [test] Lint exited zero with exactly 13 warnings: one React Hook Form compiler-compatibility warning and 12 unused symbols or values. — eslint . (evidence/build-and-browser-summary.md) ; [source] The route passes searchParams to every tool even though only the hazard tool consumes query input. — dynamic tool route (src/app/tools/[tool]/page.tsx:50)
- **Expected behavior:** Lint should be warning-free and component interfaces should represent actual data needs.
- **Actual behavior:** Four tools accept unused search parameters, CostEstimator suppresses the same issue with a void expression, PremiumHazardAssessment retains unused imports/state, and MultiStepContactForm uses watch in a pattern flagged for future React Compiler compatibility.
- **Root cause:** The dynamic component map forces one overly broad prop signature, and warning cleanup was not enforced as a release gate.
- **Affected components:** src/app/tools/[tool]/page.tsx | src/components/forms/MultiStepContactForm.tsx | src/components/tools/CommonAilments.tsx | src/components/tools/DIYvsProGuide.tsx | src/components/tools/CostEstimator.tsx | src/components/tools/PremiumHazardAssessment.tsx | src/components/tools/SpeciesIdentifier.tsx
- **Recommendation:** Render the hazard component as the only query-aware branch, remove fake props and suppression expressions, delete unused symbols, replace React Hook Form watch with useWatch, and then enforce eslint --max-warnings=0.
- **If implemented:** The original 13 warnings will disappear for architectural reasons and future warning regressions will fail CI.
- **If unchanged:** The build stays green but the warning baseline will normalize avoidable debt and obscure newly introduced warnings.
- **Dependencies:** None
- **Dependents:** None
- **Conflicts:** None
- **Acceptance criteria:** eslint . --max-warnings=0 passes. | Only components that consume query data receive query props. | No void or underscore suppression remains for these tool props.
- **Verification:** Run lint, typecheck, unit tests, production build, and all tool end-to-end tests.
- **Estimated scope:** small
- **Regression risk:** low
- **Action:** fix
- **Strategic classification:** quality-gate
- **JSON record digest:** sha256:617c09f524c4c9911b8a94d65b411ea3a36cc9312d26f5d8ffc07b14304cdf7e

## FUNC-001 — Homepage phone validation disagrees with the lead API

- **Type:** defect
- **Category:** lead-intake
- **Severity:** medium
- **Confidence:** confirmed
- **Verification state:** defect-conclusively-demonstrated
- **Status:** open
- **Impact:** A homeowner can submit a seven-digit phone number that the homepage accepts, only to receive a generic server failure because the API requires ten digits. The form gives no actionable field-level correction.
- **Evidence:** [behavioral] A seven-digit phone passed homepage client validation, produced a 400 response from /api/leads, and rendered the generic failure state. — Playwright production form exercise (evidence/build-and-browser-summary.md) ; [source] The homepage requires only seven characters while the API strips non-digits and requires at least ten digits. — client and server schemas (src/components/forms/ContactForm.tsx:26 and src/lib/leads/schema.ts:7)
- **Expected behavior:** Client and server should agree on phone normalization and constraints, and invalid data should be corrected before submission.
- **Actual behavior:** The two schemas enforce different boundaries and the server error is collapsed into a generic message.
- **Root cause:** Lead validation rules are duplicated across two forms and the server schema rather than shared through a client-safe validation contract.
- **Affected components:** src/components/forms/ContactForm.tsx | src/components/forms/MultiStepContactForm.tsx | src/lib/leads/schema.ts | src/app/api/leads/route.ts
- **Recommendation:** Create shared phone normalization and validation primitives used by both client forms and the API, then map API validation failures back to field-level feedback without exposing internal details.
- **If implemented:** Homeowners will receive immediate, specific correction and valid requests will reach the API consistently.
- **If unchanged:** Some legitimate-looking submissions will continue to fail after users invest time in the form, reducing trust and leads.
- **Dependencies:** None
- **Dependents:** None
- **Conflicts:** None
- **Acceptance criteria:** Seven- and nine-digit phones are rejected before submission. | A formatted ten-digit phone is accepted and normalized consistently. | Email-only submissions follow one explicitly chosen policy across UI and API. | Server validation failures produce actionable feedback.
- **Verification:** Add unit boundary tests and browser tests for 7, 9, and 10 digits plus the chosen email-only policy.
- **Estimated scope:** medium
- **Regression risk:** medium
- **Action:** fix
- **Strategic classification:** core-workflow-fix
- **JSON record digest:** sha256:060b541c8a1ac9f3c93bdc18248c852ced5f2347497ef86db3e39357e638e4b7

## A11Y-001 — Representative pages fail automated contrast, heading, and link-distinction checks

- **Type:** defect
- **Category:** accessibility
- **Severity:** medium
- **Confidence:** confirmed
- **Verification state:** defect-conclusively-demonstrated
- **Status:** open
- **Impact:** Low-vision and screen-reader users encounter text below WCAG contrast thresholds, skipped heading levels, and a phone link distinguished only on hover.
- **Evidence:** [behavioral] Accessibility scores were 91 home, 95 species, 94 cost, and 98 contact; automated failures included color contrast, heading order, and link-in-text-block. — Lighthouse 13.4.1 (evidence/build-and-browser-summary.md) ; [source] The global footer begins its section headings at h4 and the homepage uses slate-400 labels and footnote text on white. — shared footer and homepage components (src/components/layout/Footer.tsx:22 and src/app/page.tsx)
- **Expected behavior:** Text and interactive links should meet WCAG AA contrast and non-color distinction requirements, and headings should describe a coherent hierarchy.
- **Actual behavior:** Several labels render at approximately 2.63:1, a homepage eyebrow is 4.4:1 against a 4.5:1 target, tool-shell gold text falls below threshold, footer h4 headings skip levels, and one inline phone link lacks persistent non-color styling.
- **Root cause:** Muted design tokens were applied to essential text without contrast verification, and visual heading sizes were coupled to semantic heading levels.
- **Affected components:** src/app/page.tsx | src/app/tools/layout.tsx | src/components/ui/FloatingLabelInput.tsx | src/components/layout/Footer.tsx | src/components/ui/HazardAssessmentHeroCard.tsx
- **Recommendation:** Correct shared color tokens and component classes, make footer and hero-card heading semantics sequential, and keep inline links visibly underlined. Re-test component states rather than adjusting each page independently.
- **If implemented:** Core pages will be easier to read and navigate and the accessibility statement will be closer to its stated goal.
- **If unchanged:** The site will continue to make unsupported accessibility claims while measurable barriers remain.
- **Dependencies:** None
- **Dependents:** None
- **Conflicts:** None
- **Acceptance criteria:** Representative routes produce no automated color-contrast, heading-order, or link-in-text-block failures. | Default, focus, error, disabled, and result states retain sufficient contrast.
- **Verification:** Run automated accessibility checks on home, contact, every tool, a service page, a location page, and the published Treehouse article; manually inspect hierarchy and zoom.
- **Estimated scope:** medium
- **Regression risk:** medium
- **Action:** fix
- **Strategic classification:** trust-and-accessibility
- **JSON record digest:** sha256:fcb84d0a61f82239b4ad77ea26907de9ca2975360ad99cf25bf6c01072532ebe

## A11Y-002 — Navigation and species interactions have keyboard and accessible-name gaps

- **Type:** defect
- **Category:** accessibility
- **Severity:** medium
- **Confidence:** confirmed
- **Verification state:** defect-conclusively-demonstrated
- **Status:** open
- **Impact:** Keyboard and assistive-technology users cannot reliably identify some controls, dismiss the mobile menu with Escape, or return to the invoking control after closing the species interruption dialog.
- **Evidence:** [behavioral] Escape left the mobile menu open; the species search had no accessible name; the tree-detail close button was unnamed; closing the dialog with Escape moved focus to body rather than the trigger. — Playwright keyboard inspection (evidence/build-and-browser-summary.md) ; [source] The mobile disclosure has no Escape handler and the custom dialog trap does not preserve and restore its opener. — navigation and species components (src/components/layout/Navigation.tsx and src/components/tools/SpeciesIdentifier.tsx:178)
- **Expected behavior:** Disclosures, dialogs, search inputs, and icon buttons should expose names and predictable keyboard behavior, including Escape and focus restoration.
- **Actual behavior:** The mobile menu only toggles by click, search depends on placeholder text, the close icon has no label, and the dialog unmounts with focus falling to body.
- **Root cause:** Custom interaction patterns implement only their visible happy paths and lack a shared accessibility contract or automated keyboard coverage.
- **Affected components:** src/components/layout/Navigation.tsx | src/components/tools/SpeciesIdentifier.tsx
- **Recommendation:** Use disclosure semantics for site navigation, add Escape and focus-return behavior, label the species search and icon buttons, preserve the dialog opener, restore focus on all close paths, and mark decorative icons hidden.
- **If implemented:** The primary navigation and species workflow will be operable and understandable without a pointer.
- **If unchanged:** Keyboard and screen-reader behavior will remain inconsistent despite the site's accessibility commitment.
- **Dependencies:** None
- **Dependents:** None
- **Conflicts:** None
- **Acceptance criteria:** Escape closes mobile navigation and returns focus to its trigger. | The species search and every icon-only button have stable accessible names. | The dialog traps focus while open and restores focus to the trigger on every dismissal path. | Desktop Services uses a consistent disclosure or fully implemented menu pattern.
- **Verification:** Add Playwright keyboard assertions and perform a real NVDA or VoiceOver pass before claiming compatibility.
- **Estimated scope:** medium
- **Regression risk:** medium
- **Action:** fix
- **Strategic classification:** trust-and-accessibility
- **JSON record digest:** sha256:642d6471d98f9653d98bff0906207a70c4b7f547199a30deea7daca83f9ca558

## META-001 — The homepage lacks a canonical URL and renders an incomplete title

- **Type:** defect
- **Category:** metadata
- **Severity:** medium
- **Confidence:** confirmed
- **Verification state:** defect-conclusively-demonstrated
- **Status:** open
- **Impact:** The site's most important page omits its canonical link and displays only 'Tree Hazard & Health Tools' in the browser title instead of the business identity used elsewhere.
- **Evidence:** [behavioral] The homepage was the sole crawled route without a canonical; its rendered title was exactly Tree Hazard & Health Tools. — 57-route production crawl (evidence/build-and-browser-summary.md) ; [documentation] A title template does not apply to a title defined in the same route segment. — installed Next.js 16 metadata guide (node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md)
- **Expected behavior:** The homepage should declare the production canonical and a complete, intentional title including the business identity.
- **Actual behavior:** Open Graph contains the production URL, but standard alternates.canonical is absent and the root template does not augment the same-segment page title.
- **Root cause:** Homepage metadata assumes the root layout title template will apply to the page's own title and does not define a canonical alternate.
- **Affected components:** src/app/page.tsx | src/app/layout.tsx
- **Recommendation:** Set an explicit absolute homepage title and alternates.canonical, then protect all indexable routes with a metadata crawl test.
- **If implemented:** Homepage search and browser metadata will be consistent with the business and the rest of the site.
- **If unchanged:** Search engines must infer the canonical and users see an under-branded primary title.
- **Dependencies:** None
- **Dependents:** None
- **Conflicts:** None
- **Acceptance criteria:** The rendered homepage has one canonical link to https://omahatreecare.com/. | The rendered title includes the intended page topic and Midwest Roots Tree Services. | All sitemap routes have one appropriate canonical and title.
- **Verification:** Crawl the production build and assert title, canonical, robots, H1, JSON-LD parsing, and duplicate metadata invariants.
- **Estimated scope:** small
- **Regression risk:** low
- **Action:** fix
- **Strategic classification:** search-foundation
- **JSON record digest:** sha256:e5fc44410fabc821e457a29e91c69f551f557349a8a3f75f9b51383daf606427

## OBS-001 — Vercel observability components create errors outside Vercel

- **Type:** defect
- **Category:** observability
- **Severity:** low
- **Confidence:** confirmed
- **Verification state:** defect-conclusively-demonstrated
- **Status:** open
- **Impact:** Every local production page logs four avoidable browser errors for missing Analytics and Speed Insights scripts, lowering Lighthouse best-practices scores and masking real console regressions.
- **Evidence:** [behavioral] 56 crawled application routes emitted 404 and MIME errors for /_vercel/insights/script.js and /_vercel/speed-insights/script.js. — 57-route production crawl and Lighthouse (evidence/build-and-browser-summary.md) ; [source] Analytics and SpeedInsights are mounted unconditionally. — root layout (src/app/layout.tsx:120)
- **Expected behavior:** Supported local and non-Vercel production starts should not request platform endpoints they cannot serve.
- **Actual behavior:** Both components request Vercel-only endpoints under local next start and create repeated console errors.
- **Root cause:** Platform observability components are not guarded by the deployment environment.
- **Affected components:** src/app/layout.tsx | tests/e2e
- **Recommendation:** Render Vercel observability only in the intended Vercel environment and add a browser-console cleanliness assertion with explicit, minimal exceptions if any remain.
- **If implemented:** Local diagnostics will become trustworthy and Lighthouse best-practices checks will stop failing for platform noise.
- **If unchanged:** Real browser errors can continue to hide among expected 404s.
- **Dependencies:** None
- **Dependents:** None
- **Conflicts:** None
- **Acceptance criteria:** Local next start produces no Vercel endpoint requests. | Vercel deployments still receive Analytics and Speed Insights when enabled. | Representative browser tests fail on unexpected console errors.
- **Verification:** Test local production and a Vercel preview network log after introducing the environment guard.
- **Estimated scope:** small
- **Regression risk:** low
- **Action:** fix
- **Strategic classification:** diagnostic-hygiene
- **JSON record digest:** sha256:71b7b63b7f7716a58a0b4e67f9e5becbd326eb84d211296fda2ef57e1ab63e2a

## CSP-001 — Zod attempts JIT compilation that the site's CSP blocks

- **Type:** shortcoming
- **Category:** security-configuration
- **Severity:** low
- **Confidence:** confirmed
- **Verification state:** defect-conclusively-demonstrated
- **Status:** open
- **Impact:** Client schema initialization triggers a Chrome Inspector CSP issue because Zod calls Function under a policy that correctly excludes unsafe-eval. Zod falls back, so forms still work, but diagnostics remain noisy and behavior depends on fallback code.
- **Evidence:** [behavioral] The browser reported a kEvalViolation under script-src originating from the client Zod bundle. — Chrome DevTools Protocol issue capture (evidence/build-and-browser-summary.md) ; [source] Zod exposes z.config({ jitless: true }) for environments that disallow eval. — installed Zod 4 source (node_modules/zod/src/v4/core/core.ts)
- **Expected behavior:** Client validation should operate cleanly under the site's strict CSP without adding unsafe-eval.
- **Actual behavior:** Zod first attempts JIT compilation, CSP blocks it, and the library falls back.
- **Root cause:** The client validation setup uses Zod's default JIT mode despite a no-eval CSP.
- **Affected components:** client-side Zod schemas | next.config.ts
- **Recommendation:** Configure Zod jitless mode through one intentional client-validation entry point and keep unsafe-eval out of the CSP.
- **If implemented:** Forms will preserve the stronger CSP without Inspector violations or fallback dependence.
- **If unchanged:** The app likely remains functional, but every diagnostic run retains a preventable security-policy issue.
- **Dependencies:** None
- **Dependents:** None
- **Conflicts:** None
- **Acceptance criteria:** No eval-violation Inspector issue appears on form routes. | The CSP still excludes unsafe-eval. | Client and server schema tests continue to pass.
- **Verification:** Capture CDP Inspector issues on home and contact after exercising validation states.
- **Estimated scope:** small
- **Regression risk:** low
- **Action:** fix
- **Strategic classification:** defense-in-depth
- **JSON record digest:** sha256:0e71e18d642769af3ff10110e8b877d27d0864dd6e39693f7cb65fa397352069

## SEC-001 — Next.js is behind the patched 16.2.11 release

- **Type:** shortcoming
- **Category:** dependency-security
- **Severity:** medium
- **Confidence:** confirmed
- **Verification state:** research-verified
- **Status:** open
- **Impact:** npm audit reports two high-severity Next.js advisories against 16.2.6. Their documented triggers are not present in this repository, reducing current reachability, but the supported patch is available and should not be deferred.
- **Evidence:** [research] Next.js versions below 16.2.11 are affected; 16.2.11 is patched. — GitHub advisories GHSA-6gpp-xcg3-4w24 and GHSA-m99w-x7hq-7vfj (https://github.com/advisories/GHSA-6gpp-xcg3-4w24 and https://github.com/advisories/GHSA-m99w-x7hq-7vfj) ; [test] Next.js and eslint-config-next 16.2.11 passed typecheck, lint, all 36 unit tests, build, and all 11 end-to-end tests. — disposable dependency upgrade (evidence/dependency-summary.md)
- **Expected behavior:** The framework and its lint configuration should be aligned on the current patched release within the chosen major version.
- **Actual behavior:** Next.js is 16.2.6 and eslint-config-next resolves to 16.2.1.
- **Root cause:** Framework patch updates and dependency monitoring are not automated.
- **Affected components:** package.json | package-lock.json | Next.js runtime
- **Recommendation:** Upgrade next and eslint-config-next together to 16.2.11, preserve the webpack build command, and rerun the full pipeline.
- **If implemented:** The project removes two known framework advisories with a verified low-risk patch path.
- **If unchanged:** The repository remains intentionally behind available security patches even though the currently documented exploit paths appear absent.
- **Dependencies:** None
- **Dependents:** SEC-002
- **Conflicts:** None
- **Acceptance criteria:** next and eslint-config-next are both 16.2.11. | npm audit no longer reports the two Next.js advisories. | The full clean pipeline passes.
- **Verification:** Run npm audit, npm ls, typecheck, lint, unit tests, webpack production build, and end-to-end tests from a clean checkout.
- **Estimated scope:** small
- **Regression risk:** low
- **Action:** fix
- **Strategic classification:** security-maintenance
- **JSON record digest:** sha256:2b8c1f308d361164ccbbb248a8f48b7c4b27fb5adf038979b59576b529551d51

## SEC-002 — The patched Next release still inherits a sharp advisory

- **Type:** investigation
- **Category:** dependency-security
- **Severity:** medium
- **Confidence:** high
- **Verification state:** research-verified
- **Status:** open
- **Impact:** After the verified Next.js upgrade, npm audit remains red because Next 16.2.11 declares sharp ^0.34.5 while the sharp advisory is patched at 0.35.0. Current repository image inputs are local and trusted, so the documented untrusted-image trigger was not found.
- **Evidence:** [research] sharp versions before 0.35.0 can crash or expose memory when processing malicious image input. — GitHub advisory GHSA-f88m-g3jw-g9cj (https://github.com/advisories/GHSA-f88m-g3jw-g9cj) ; [source] No user image upload or current remote image use was found; configured remotePatterns are broader than current usage. — image source audit (evidence/dependency-summary.md)
- **Expected behavior:** Dependency risk should be patched through supported upstream ranges or explicitly documented as non-reachable until upstream support is available.
- **Actual behavior:** The latest verified Next 16.2 patch still pulls an advisory-affected sharp range, and an unsupported transitive override would exceed Next's declared range.
- **Root cause:** The framework has not yet declared compatibility with the patched sharp major-minor line.
- **Affected components:** next | sharp | next.config.ts image remotePatterns
- **Recommendation:** Do not silently force a transitive override. Remove unused remotePatterns if confirmed unnecessary, document that all accepted images are trusted local assets, monitor the next supported Next release that includes sharp 0.35 or later, and add dependency automation.
- **If implemented:** The residual audit finding will have a bounded trust model and a supported upgrade trigger.
- **If unchanged:** Audit remains red without a recorded reachability judgment, making real dependency regressions harder to triage.
- **Dependencies:** SEC-001
- **Dependents:** None
- **Conflicts:** None
- **Acceptance criteria:** No untrusted image path reaches sharp. | Unused remote image allowlists are removed. | A tracking mechanism upgrades to a supported Next release with sharp 0.35 or later when available. | Any temporary override is treated as an explicit owner-approved workaround with tests.
- **Verification:** Re-run source reachability and npm audit after each Next patch; if upstream support appears, repeat the full image and build suite.
- **Estimated scope:** small
- **Regression risk:** medium
- **Action:** investigate
- **Strategic classification:** tracked-upstream-risk
- **JSON record digest:** sha256:487feaa86f2355f163019641ea1a73efe7c5297e15c6880353afefbc4eab5b15

## CLEAN-001 — Dead files, dependencies, and exports increase maintenance surface

- **Type:** shortcoming
- **Category:** maintainability
- **Severity:** low
- **Confidence:** high
- **Verification state:** partially-verified
- **Status:** open
- **Impact:** Obsolete form code, unused UI components, unused dependencies, and unnecessary public exports increase review effort and can preserve outdated behavior that later gets copied back into active code.
- **Evidence:** [test] Six unused files, three unused dependencies, and multiple dead or unnecessarily exported symbols were identified; direct ripgrep checks confirmed no active imports for the listed files and packages. — Knip plus targeted usage searches (evidence/dependency-summary.md)
- **Expected behavior:** Tracked application code and direct dependencies should have a current consumer or an explicit archival reason.
- **Actual behavior:** The repository retains deprecated/ContactForm.v1.tsx, src/app/page.module.css, FastQuoteWidget, EmailCaptureModal, two unused UI components, and direct dependencies @base-ui/react, class-variance-authority, and zustand without active consumers.
- **Root cause:** Feature replacement and PWA/lead-flow revisions removed callers without a final dead-code convergence pass.
- **Affected components:** deprecated/ContactForm.v1.tsx | src/app/page.module.css | src/components/forms/FastQuoteWidget.tsx | src/components/tools/EmailCaptureModal.tsx | src/components/ui/button.tsx | src/components/ui/NumberCounter.tsx | package.json
- **Recommendation:** After confirming no intentional archive requirement, delete dead files and values, remove unused dependencies, narrow internal exports, align @types/node with the Node 22 runtime, and add a configured dead-code check as a non-noisy maintenance gate.
- **If implemented:** The codebase and dependency graph will better represent the product actually shipped.
- **If unchanged:** Obsolete behavior and packages will continue to consume attention and widen the audit surface.
- **Dependencies:** None
- **Dependents:** None
- **Conflicts:** None
- **Acceptance criteria:** Every removed file and package has no remaining consumer. | npm ls, typecheck, tests, lint, and build pass after deletion. | The configured dead-code check has no unexplained findings.
- **Verification:** Repeat rg usage searches, npm ls, Knip, and the complete pipeline after owner-authorized deletion.
- **Estimated scope:** small
- **Regression risk:** medium
- **Action:** remove
- **Strategic classification:** maintenance-cleanup
- **JSON record digest:** sha256:43f58c82069873737d67fea4d1ebba21bedaa3252e3d1143d840cdb31817ea5b

## DOC-001 — Public and internal claims have drifted from verified behavior

- **Type:** defect
- **Category:** content-integrity
- **Severity:** medium
- **Confidence:** confirmed
- **Verification state:** source-only
- **Status:** open
- **Impact:** Visitors and maintainers receive contradictory counts, outdated pricing descriptions, and accessibility claims that the current implementation and test evidence do not support.
- **Evidence:** [source] The tools index claims 12 species while the current guide and homepage consistently expose 10 profiles. — tools index and species database (src/app/tools/page.tsx:30 and src/components/tools/SpeciesIdentifier.tsx) ; [source] README still calls numeric cost output uncalibrated even though the tool now uses the published 2025 height ranges. — README and rebuilt cost planner (README.md:65 and src/components/tools/CostEstimator.tsx) ; [source] The statement says sufficient contrast and all keyboard functionality are being ensured while current routes have confirmed contrast and keyboard defects; real screen-reader verification remains explicitly incomplete. — accessibility statement and measured behavior (src/app/accessibility/page.tsx:39)
- **Expected behavior:** Counts, capability descriptions, pricing boundaries, response promises, and accessibility language should match current evidence and publication controls.
- **Actual behavior:** The tools hub is stale, internal documentation describes a prior cost model, the accessibility statement mixes goals with unverified outcomes, and legacy blog copy remains outside the newer Treehouse evidence gate.
- **Root cause:** The same product facts are duplicated across pages and documentation without shared data or a release-time claims inventory.
- **Affected components:** README.md | src/app/tools/page.tsx | src/app/accessibility/page.tsx | src/data/blog/posts.ts | Treehouse publication controls
- **Recommendation:** Derive tool counts and summaries from one registry, update README to the current pricing model, qualify the accessibility statement to tested facts, remove unsupported response-time language unless operationally guaranteed, and migrate or review legacy blog claims under the Treehouse evidence gate.
- **If implemented:** The site will present one defensible account of its capabilities and limitations.
- **If unchanged:** Trust-sensitive contradictions will recur after future tool or article changes.
- **Dependencies:** None
- **Dependents:** None
- **Conflicts:** None
- **Acceptance criteria:** Tool counts and summaries are derived from one source of truth. | README accurately describes the current planner. | Accessibility language distinguishes goals, tested results, and known limitations. | Material legacy content claims have evidence or are revised, migrated, or withheld.
- **Verification:** Run exact-count/content tests, inspect the claims inventory, and obtain owner/content approval for business promises.
- **Estimated scope:** medium
- **Regression risk:** medium
- **Action:** fix
- **Strategic classification:** trust-foundation
- **JSON record digest:** sha256:be6a88402484ce2449dfdce79b18e80d710b840ec1316dbf68211efb032216be

## TEST-001 — CI passes while material browser and content regressions remain uncaught

- **Type:** shortcoming
- **Category:** test-coverage
- **Severity:** medium
- **Confidence:** confirmed
- **Verification state:** partially-verified
- **Status:** open
- **Impact:** The current quality job permits warnings and does not detect duplicate shells, console errors, metadata gaps, accessibility failures, keyboard regressions, or the homepage phone boundary.
- **Evidence:** [source] CI runs Chromium only, lint without a warning ceiling, and no automated accessibility, metadata-crawl, console-cleanliness, dead-code, or dependency-monitoring gate. — quality workflow and Playwright configuration (.github/workflows/quality.yml and playwright.config.ts) ; [behavioral] All existing checks passed while the audit reproduced duplicate chrome, invalid phone handling, metadata omissions, console failures, and accessibility defects. — audit comparison (evidence/build-and-browser-summary.md)
- **Expected behavior:** CI should fail on the classes of regression that materially affect core workflows, trust, and supported browser behavior.
- **Actual behavior:** The pipeline proves compilation and selected happy paths but not the full user-facing quality contract.
- **Root cause:** Tests grew around prior incidents and defining tool interactions without shared browser invariants or accessibility and content-integrity checks.
- **Affected components:** .github/workflows/quality.yml | playwright.config.ts | tests/e2e | package.json
- **Recommendation:** After fixing the baseline, enforce zero warnings; add shared assertions for shell count, unexpected console/page errors, canonical/title/H1/JSON-LD, phone boundaries, keyboard behavior, and representative automated accessibility; add Firefox and WebKit smoke coverage where supported; schedule dependency and dead-code checks.
- **If implemented:** The cleanup will become durable and future failures will be localized near their cause.
- **If unchanged:** A green CI badge will continue to overstate user-facing readiness.
- **Dependencies:** None
- **Dependents:** None
- **Conflicts:** None
- **Acceptance criteria:** Lint fails on any warning. | Representative routes have automated browser invariants and accessibility checks. | Form boundary and failure recovery tests cover the shared validation contract. | At least one focused smoke suite runs in Firefox and WebKit or the unsupported scope is documented. | Dependency update automation is configured with controlled grouping.
- **Verification:** Demonstrate that each new gate fails against the known pre-fix defect and passes after the fix, then run CI from a clean checkout.
- **Estimated scope:** large
- **Regression risk:** medium
- **Action:** add
- **Strategic classification:** quality-system
- **JSON record digest:** sha256:09d93016021d416016f3b52f79a490cdd8f0d179cce5f5007f77ad02988ec3f3

## OPS-001 — Production lead delivery remains an external release gate

- **Type:** investigation
- **Category:** operations
- **Severity:** high
- **Confidence:** high
- **Verification state:** blocked
- **Status:** blocked
- **Impact:** Local tests prove fail-closed behavior and test receipts, but they cannot prove that a real production request persists, retries, and arrives at the intended business destination. That is the site's primary business workflow.
- **Evidence:** [source] Production PostgreSQL and delivery destination verification are explicitly external and unresolved. — current handoff (project-revision/README.md) ; [test] Missing production database configuration fails closed as designed; no authorized production destination was available for a labeled end-to-end receipt test. — local production suite (evidence/build-and-browser-summary.md)
- **Expected behavior:** A labeled production smoke submission should persist once, retry safely, reach the intended destination, and be auditable without exposing private data.
- **Actual behavior:** Code and local failure paths are tested, but production persistence and receipt remain unverified.
- **Root cause:** Completion requires deployment credentials, an authorized destination, and operational observation outside the repository.
- **Affected components:** src/app/api/leads/route.ts | src/lib/leads | production PostgreSQL | delivery webhook | OPERATIONS_SOP.md
- **Recommendation:** Run the existing labeled production verification procedure with the owner, record persistence, retry/idempotency, and destination receipt evidence, then update the operational status. Do not substitute another local mock.
- **If implemented:** The primary conversion workflow will be operationally verified rather than only syntactically and locally correct.
- **If unchanged:** The site can build and deploy without proof that real homeowner requests reach the business.
- **Dependencies:** None
- **Dependents:** None
- **Conflicts:** None
- **Acceptance criteria:** An authorized labeled production submission is stored exactly once. | The delivery reaches the intended destination. | Failure and retry evidence is observable and documented. | No private production payload is committed to the repository.
- **Verification:** Follow OPERATIONS_SOP.md with production authorization and retain sanitized evidence outside source control where appropriate.
- **Estimated scope:** medium
- **Regression risk:** high
- **Action:** investigate
- **Strategic classification:** release-gate
- **JSON record digest:** sha256:b713bb51239827691736a41aa2f8cf0f1c941b1fc1ce8a5ed77d12c5fbf4a78c

## PWA-001 — One-release service-worker cleanup has no retirement criterion

- **Type:** investigation
- **Category:** lifecycle-maintenance
- **Severity:** low
- **Confidence:** high
- **Verification state:** blocked
- **Status:** blocked
- **Impact:** Every page still mounts a client effect whose documented purpose is temporary cleanup of a retired PWA. Removing it too early can strand stale clients; keeping it indefinitely adds permanent code and browser work.
- **Evidence:** [source] The cleanup is intentionally scoped and versioned, but deployed stale-client proof remains external. — cleanup component and prior handoff (src/components/ServiceWorkerCleanup.tsx and project-revision/README.md)
- **Expected behavior:** Temporary migration code should have an explicit deployment observation window and safe deletion criterion.
- **Actual behavior:** The cleanup is correct and bounded, but no evidence yet establishes when the promised one release has completed across deployed clients.
- **Root cause:** Production service-worker state cannot be established from the local repository alone.
- **Affected components:** src/components/ServiceWorkerCleanup.tsx | src/app/layout.tsx | src/app/globals.css
- **Recommendation:** Verify the retired worker and caches are gone in production across the agreed support window, then remove the component and related migration-only selectors in an owner-authorized cleanup.
- **If implemented:** The migration remains safe and does not become permanent application code.
- **If unchanged:** A temporary effect and its CSS accommodations become indefinite maintenance surface.
- **Dependencies:** None
- **Dependents:** None
- **Conflicts:** None
- **Acceptance criteria:** Production clients no longer report the retired /sw.js registration or known caches during the agreed window. | The cleanup component and migration-only styles are removed in the following release. | A post-removal production smoke test passes.
- **Verification:** Collect authorized production browser evidence before and after retirement; local tests alone are insufficient.
- **Estimated scope:** small
- **Regression risk:** medium
- **Action:** investigate
- **Strategic classification:** temporary-migration
- **JSON record digest:** sha256:17cb990b4f4765c713ec0a9e2394c47e282c4df585826b9d41033c701b51fa1f
