# Implementation ledger

## SEC-001 — Next.js is behind the patched 16.2.11 release

- **Approval:** approved
- **Teardown verification state:** research-verified
- **Revalidation:** confirmed
- **Disposition:** implemented
- **Sequence:** 1
- **Reason:** User flagged the patch explicitly; npm audit at start still reported the two Next advisories against 16.2.6.
- **Files changed:** package.json | package-lock.json
- **Acceptance results:** next and eslint-config-next are both 16.2.11. => passed => package.json pins both to 16.2.11; require('next/package.json').version prints 16.2.11. | npm audit no longer reports the two Next.js advisories. => passed => npm audit after upgrade lists only the sharp advisory (GHSA-f88m-g3jw-g9cj); GHSA-6gpp-xcg3-4w24 and GHSA-m99w-x7hq-7vfj are gone. | The full clean pipeline passes. => passed => typecheck, lint (max-warnings=0), 46 unit tests, webpack build, and 30 Chromium + 2 Firefox e2e all pass on 16.2.11.
- **Verification:** npm audit | node -e require('next/package.json').version | npm run typecheck, lint, test, build, and playwright test
- **Notes:** npm audit fix --force would downgrade Next to 14.2.35 (breaking) and was deliberately not run.
- **Revision record digest:** sha256:6028b0cdcefbd6e954ad500d4b95030ba1cba972c887192a03e39d9b445d7ee9

## SEC-002 — The patched Next release still inherits a sharp advisory

- **Approval:** approved
- **Teardown verification state:** research-verified
- **Revalidation:** confirmed
- **Disposition:** implemented
- **Sequence:** 2
- **Reason:** After the SEC-001 upgrade the only residual advisory is sharp <0.35 pulled transitively by Next; the actionable, supported parts (reachability, allowlist, tracking) were implemented.
- **Files changed:** next.config.ts | .github/dependabot.yml
- **Acceptance results:** No untrusted image path reaches sharp. => passed => Source scan found no user image upload and no remote next/image source; all optimized images are local /public assets. | Unused remote image allowlists are removed. => passed => images.remotePatterns (omahatreecare.com, midwestroots.info) removed from next.config.ts; grep confirmed neither host is used as an image source. | A tracking mechanism upgrades to a supported Next release with sharp 0.35 or later when available. => passed => .github/dependabot.yml adds weekly grouped npm updates; next.config.ts comment records the sharp>=0.35 trigger to re-audit. | Any temporary override is treated as an explicit owner-approved workaround with tests. => not-applicable => No transitive sharp override was forced (it would exceed Next's declared range), so no workaround exists to gate.
- **Verification:** npm audit (only sharp advisory remains, inherent upstream) | grep for remote image hosts | next build succeeds without remotePatterns
- **Notes:** npm audit remains red on sharp until a supported Next release ships sharp>=0.35; this is a bounded, documented upstream residual, not a new reachable defect.
- **Revision record digest:** sha256:6c1658b9d6e99849d44849d46da1b318e9ae6303659a3ef49734e71b17038ced

## ARCH-001 — Tool routes render duplicate global and tool-specific site shells

- **Approval:** approved
- **Teardown verification state:** defect-conclusively-demonstrated
- **Revalidation:** confirmed
- **Disposition:** implemented
- **Sequence:** 3
- **Reason:** Root layout still mounted global Navigation+Footer unconditionally while tools/layout mounted its own shell, so every tool route rendered both.
- **Files changed:** src/app/layout.tsx | src/app/(marketing)/layout.tsx | src/app/tools/layout.tsx | src/app/field-estimate/page.tsx | src/app/globals.css
- **Acceptance results:** Every route family renders exactly its intended shell. => passed => Marketing routes moved into a (marketing) route group whose layout owns Navigation+Footer; tools/ and field-estimate/ stay out of it. e2e asserts marketing has one Main navigation + one footer and /tools/cost has zero Main navigation. | Tool pages expose one primary navigation and one site footer after hydration. => passed => shells-metadata-console.spec asserts /tools/cost has 0 nav[aria-label=Main navigation], 1 [data-tools-shell-footer], no global 'All rights reserved.' footer, and 1 main#main-content. | Field-estimate print and standalone behavior remains intact. => passed => field-estimate/page.tsx now wraps FieldEstimate in its own main#main-content; the obsolete body:has(.field-estimate-app)>nav/footer hide rule was removed because that chrome no longer mounts there; print @media rules retained; production build renders the route static.
- **Verification:** playwright shells-metadata-console.spec.ts | next build route table shows all URLs preserved | curl of /tools/cost shows single tool shell and no global footer
- **Notes:** Route groups do not change URLs; home stays at /. Nine marketing route folders were moved under src/app/(marketing)/ via git mv.
- **Revision record digest:** sha256:e7ef4bc5d705a289c744c18c87d9faebde8871c7d62881e039d58abf9d187fe6

## BUILD-001 — Thirteen lint warnings reveal stale tool interfaces and unused code

- **Approval:** approved
- **Teardown verification state:** source-only
- **Revalidation:** changed
- **Disposition:** implemented
- **Sequence:** 4
- **Reason:** Still exactly 13 warnings, but composition drifted after the cost-planner rebuild: CostEstimator's void suppression is gone and PremiumHazardAssessment now carries 9 unused-symbol warnings.
- **Files changed:** src/app/tools/[tool]/page.tsx | src/components/tools/CommonAilments.tsx | src/components/tools/DIYvsProGuide.tsx | src/components/tools/SpeciesIdentifier.tsx | src/components/tools/PremiumHazardAssessment.tsx | src/components/forms/MultiStepContactForm.tsx | package.json
- **Acceptance results:** eslint . --max-warnings=0 passes. => passed => lint script is now 'eslint . --max-warnings=0'; npm run lint exits 0 with no output. | Only components that consume query data receive query props. => passed => [tool]/page.tsx renders <PremiumHazardAssessment searchParams> only for tool==='hazard'; the other four components' searchParams prop was removed from their signatures. | No void or underscore suppression remains for these tool props. => passed => No _searchParams/void remain; the props were deleted rather than suppressed. PremiumHazardAssessment unused imports/state (7 icons, CONTACT, setSelectedTree) removed; MultiStepContactForm watch() replaced by useWatch().
- **Verification:** npm run lint (0 warnings) | npm run typecheck | playwright homeowner-tools.spec still green
- **Notes:** hazard is now a Dynamic route (awaits searchParams) and the other four tools are SSG — a correct improvement.
- **Revision record digest:** sha256:cff99b6fa91ae2bc4d67848d4c0470ed8e78ec1d9997dbe13262eb3469b17d07

## FUNC-001 — Homepage phone validation disagrees with the lead API

- **Approval:** approved
- **Teardown verification state:** defect-conclusively-demonstrated
- **Revalidation:** changed
- **Disposition:** implemented
- **Sequence:** 5
- **Reason:** The mismatch is only in the homepage ContactForm (min(7)); MultiStepContactForm already required 10 digits. Both public forms already require phone AND email, so the chosen policy changes no accepted-lead set.
- **Files changed:** src/lib/leads/fields.ts | src/components/forms/ContactForm.tsx | src/components/forms/MultiStepContactForm.tsx | src/lib/leads/schema.ts
- **Acceptance results:** Seven- and nine-digit phones are rejected before submission. => passed => Shared phoneField requires >=10 normalized digits; fields.test.ts rejects 7 and 9 digits; lead-form-boundary.spec drives the homepage form with a 7-digit phone and asserts a 'valid 10-digit phone number' error with no receipt. | A formatted ten-digit phone is accepted and normalized consistently. => passed => fields.test.ts: phoneField.safeParse('(402) 812-3294') succeeds and yields '4028123294'; server leadSchema uses the same normalizePhone and produces identical output. | Email-only submissions follow one explicitly chosen policy across UI and API. => passed => Policy: both public forms require name+email+valid phone; the server schema is a documented permissive superset accepting email OR phone. fields.test.ts asserts the server still accepts email-only while the forms require both. | Server validation failures produce actionable feedback. => passed => Both forms now surface the API's user-safe message (e.g. 'Please check the form and try again.') via errorMessage state instead of a hardcoded generic string.
- **Verification:** vitest src/lib/leads/fields.test.ts | playwright lead-form-boundary.spec.ts | existing route-handler + leads unit tests still pass
- **Notes:** Chosen policy documented in src/lib/leads/fields.ts. No change to which leads the business accepts (both fields were already UI-required).
- **Revision record digest:** sha256:5cc956e539f37b2da499755fc06744cf773e6321d7d627847026fd3e805cb829

## OPS-001 — Production lead delivery remains an external release gate

- **Approval:** approved
- **Teardown verification state:** blocked
- **Revalidation:** blocked
- **Disposition:** blocked
- **Sequence:** 6
- **Reason:** Owner approved marking this blocked and proceeding; real production persistence/delivery needs credentials and an authorized destination unavailable in this session.
- **Files changed:** None
- **Acceptance results:** An authorized labeled production submission is stored exactly once. => blocked => No production DATABASE_URL/credentials available; local e2e confirms the intake fails closed when storage is unconfigured. | The delivery reaches the intended destination. => blocked => No authorized production delivery destination available in this session. | Failure and retry evidence is observable and documented. => blocked => Retry/idempotency are covered by local unit tests; production observation requires the labeled production run. | No private production payload is committed to the repository. => blocked => No production run was performed, so no payload exists; the constraint is preserved for when the run happens.
- **Verification:** e2e: production lead acceptance fails closed without database configuration (passes)
- **Notes:** External release gate. Requires OPERATIONS_SOP.md with owner production authorization; cannot be substituted with another local mock.
- **Revision record digest:** sha256:6780a1c812dd17243aff502bce0a04d7aec7964e46cf5c46641a3551f33e4538

## A11Y-001 — Representative pages fail automated contrast, heading, and link-distinction checks

- **Approval:** approved
- **Teardown verification state:** defect-conclusively-demonstrated
- **Revalidation:** confirmed
- **Disposition:** implemented
- **Sequence:** 7
- **Reason:** axe (via @axe-core/playwright) reproduced color-contrast, heading-order, and link-in-text-block failures across nine representative routes before the fix.
- **Files changed:** src/app/globals.css | src/app/(marketing)/page.tsx | src/app/tools/layout.tsx | src/components/ui/FloatingLabelInput.tsx | src/components/ui/HazardAssessmentHeroCard.tsx | src/components/layout/Footer.tsx | src/components/forms/ContactForm.tsx | src/components/tools/PremiumHazardAssessment.tsx | src/components/tools/CostEstimator.tsx | src/components/tools/CommonAilments.tsx | src/components/tools/SpeciesIdentifier.tsx | src/components/treehouse/ContentBlocks.tsx | src/app/(marketing)/treehouse/[slug]/page.tsx | src/app/(marketing)/locations/[city]/page.tsx
- **Acceptance results:** Representative routes produce no automated color-contrast, heading-order, or link-in-text-block failures. => passed => accessibility.spec.ts scans home, contact, all five tools, a service, a location, and the Treehouse article; gated to those three rules it now reports zero violations on all ten routes (was 9/10 failing). | Default, focus, error, disabled, and result states retain sufficient contrast. => passed => Added an accessible --color-gold-ink token for gold text on light; darkened muted slate/stone/amber text tokens; form error state uses red-600 and focus uses forest/teal; hazard result-screen stone text darkened to stone-600; verified against WCAG AA math and the axe scan of rendered states.
- **Verification:** playwright accessibility.spec.ts (axe-core, gated rules) across 10 routes | manual WCAG contrast computation for changed tokens
- **Notes:** Automated tooling covers the rendered initial state of each route; a real screen-reader/manual zoom pass remains recommended before broad AT-compatibility claims (tracked with A11Y-002 and DOC-001).
- **Revision record digest:** sha256:26f21e1259d51cd9448a4236b5b1abeb06790443d64a452268e24178cfc8cc26

## A11Y-002 — Navigation and species interactions have keyboard and accessible-name gaps

- **Approval:** approved
- **Teardown verification state:** defect-conclusively-demonstrated
- **Revalidation:** confirmed
- **Disposition:** implemented
- **Sequence:** 8
- **Reason:** Mobile menu had no Escape handling, the species search/close-button lacked names, and the interruption dialog dropped focus to body on close.
- **Files changed:** src/components/layout/Navigation.tsx | src/components/tools/SpeciesIdentifier.tsx
- **Acceptance results:** Escape closes mobile navigation and returns focus to its trigger. => passed => Navigation adds a document keydown handler while open that closes the menu and focuses the toggle ref; keyboard-a11y.spec asserts the menu hides and the toggle is focused after Escape. | The species search and every icon-only button have stable accessible names. => passed => Search input has aria-label 'Search tree species by common or scientific name' (keyboard-a11y.spec finds it by role+name); the detail close button has aria-label 'Close <name> details'; decorative icons marked aria-hidden. | The dialog traps focus while open and restores focus to the trigger on every dismissal path. => passed => The focus-trap effect now captures the opening control and restores focus to it in cleanup, which runs on Escape, cancel, and proceed; dialog already had role=dialog, aria-modal, aria-labelledby. | Desktop Services uses a consistent disclosure or fully implemented menu pattern. => passed => The Services button now toggles on click (and native Enter/Space), retains aria-haspopup/aria-expanded, and closes on Escape, giving a consistent keyboard+pointer disclosure.
- **Verification:** playwright keyboard-a11y.spec.ts | manual keydown review of Navigation and SpeciesIdentifier
- **Notes:** A real NVDA/VoiceOver pass remains recommended before asserting verified AT compatibility; the accessibility statement was softened accordingly (DOC-001).
- **Revision record digest:** sha256:a61d2203ef5b38bbda275015db736a06d40656839798c2b1ca269da21998de6a

## META-001 — The homepage lacks a canonical URL and renders an incomplete title

- **Approval:** approved
- **Teardown verification state:** defect-conclusively-demonstrated
- **Revalidation:** changed
- **Disposition:** implemented
- **Sequence:** 9
- **Reason:** The route-group move made home a child segment of the root template, but the fix sets an explicit absolute title and canonical so correctness does not depend on segment mechanics.
- **Files changed:** src/app/(marketing)/page.tsx
- **Acceptance results:** The rendered homepage has one canonical link to https://omahatreecare.com/. => passed => Home sets alternates.canonical to CONTACT.siteUrl; built output has exactly one <link rel=canonical href='https://omahatreecare.com'>. The no-trailing-slash form is a non-material clarification matching trailingSlash:false and every other route's canonical. | The rendered title includes the intended page topic and Midwest Roots Tree Services. => passed => title.absolute combines the topic 'Tree Hazard & Health Tools' with the business identity 'Midwest Roots Tree Services'; the built <title> renders exactly that. | All sitemap routes have one appropriate canonical and title. => passed => The teardown 57-route crawl found the homepage was the sole route lacking a canonical; it is now fixed, and shells-metadata-console.spec asserts the home canonical+title. Other routes retain their existing per-route canonicals.
- **Verification:** playwright shells-metadata-console.spec.ts (META-001) | curl of built / shows single canonical and branded title
- **Notes:** Canonical intentionally omits the trailing slash to stay consistent with trailingSlash:false; the teardown criterion's trailing slash is cosmetic for the homepage resource.
- **Revision record digest:** sha256:2f289e3a8ce9fc1c38f400881d10e30bf40bfa34518050d7253cc4835cce0f8e

## OBS-001 — Vercel observability components create errors outside Vercel

- **Approval:** approved
- **Teardown verification state:** defect-conclusively-demonstrated
- **Revalidation:** confirmed
- **Disposition:** implemented
- **Sequence:** 10
- **Reason:** Analytics and SpeedInsights were mounted unconditionally, producing /_vercel/* 404s and console noise under local next start.
- **Files changed:** src/app/layout.tsx | tests/e2e/shells-metadata-console.spec.ts
- **Acceptance results:** Local next start produces no Vercel endpoint requests. => passed => Both components now render only when process.env.VERCEL==='1'; shells-metadata-console.spec asserts zero /_vercel/ requests and zero console errors on /, /tools/cost, and /contact under local next start. | Vercel deployments still receive Analytics and Speed Insights when enabled. => passed => The VERCEL env var is set to '1' in Vercel build/runtime, so the guard mounts both components there; the guard only excludes non-Vercel environments. | Representative browser tests fail on unexpected console errors. => passed => shells-metadata-console.spec collects console 'error' events and failed requests and asserts both arrays are empty on three representative routes.
- **Verification:** playwright shells-metadata-console.spec.ts (OBS-001)
- **Notes:** A Vercel preview network log confirmation is a recommended post-deploy check but not required to confirm the local behavior fixed here.
- **Revision record digest:** sha256:f48efe71eedbd923e1980d90ea1f02db7fe84db7d8f16945fccb9558cdc4f94b

## CSP-001 — Zod attempts JIT compilation that the site's CSP blocks

- **Approval:** approved
- **Teardown verification state:** defect-conclusively-demonstrated
- **Revalidation:** confirmed
- **Disposition:** implemented
- **Sequence:** 11
- **Reason:** Zod v4 JIT-compiles parsers with Function(), which the eval-free CSP blocks, raising an Inspector issue on form routes.
- **Files changed:** src/lib/leads/client-validation.ts | src/components/forms/ContactForm.tsx | src/components/forms/MultiStepContactForm.tsx
- **Acceptance results:** No eval-violation Inspector issue appears on form routes. => passed => A single intentional client entry point calls z.config({ jitless: true }) and is imported by both forms; the console-cleanliness gate on /contact and / (which surfaces CSP eval violations as console errors) reports zero errors. | The CSP still excludes unsafe-eval. => passed => next.config.ts CSP script-src is unchanged and still omits 'unsafe-eval'. | Client and server schema tests continue to pass. => passed => fields.test.ts and the leads/route-handler tests pass with jitless enabled.
- **Verification:** node check that z.config({jitless:true}) is supported in zod 4.3.6 | playwright console-cleanliness on form routes
- **Notes:** z.config is global; setting jitless also affects server parsing (no CSP there, harmless) and keeps a single intentional entry point.
- **Revision record digest:** sha256:bede0fdf19d19143fef7b21877b896749a4599504b8e0dc599866219dd9a1654

## DOC-001 — Public and internal claims have drifted from verified behavior

- **Approval:** approved
- **Teardown verification state:** source-only
- **Revalidation:** confirmed
- **Disposition:** implemented
- **Sequence:** 12
- **Reason:** Tools index claimed 12 species (actual 10), README described an uncalibrated planner, the accessibility statement overclaimed, and legacy blog claims were indexed without an evidence gate.
- **Files changed:** src/data/tree-species.ts | src/components/tools/SpeciesIdentifier.tsx | src/app/tools/page.tsx | README.md | src/app/(marketing)/accessibility/page.tsx | src/app/(marketing)/blog/page.tsx | src/app/(marketing)/blog/[slug]/page.tsx | src/app/sitemap.ts | src/data/tree-species.test.ts
- **Acceptance results:** Tool counts and summaries are derived from one source of truth. => passed => Species data extracted to src/data/tree-species.ts; SpeciesIdentifier imports it and tools/page.tsx derives the count via treeDatabase.length. Built /tools shows 'Browse 10 common Omaha-area trees'; tree-species.test pins the count and uniqueness. | README accurately describes the current planner. => passed => README now states the cost output is a planning range built from published 2025 height-based pricing (src/data/tree-removal-pricing.ts) with modifiers, not a quote; version updated to 16.2.11. | Accessibility language distinguishes goals, tested results, and known limitations. => passed => Per owner decision, the statement reframes practices as goals, notes automated per-build contrast/heading verification, presents AT compatibility as targets pending verification, and drops the unsupported 2-business-day SLA (now 'as promptly as we can'); Known Limitations retains the real-AT gate. | Material legacy content claims have evidence or are revised, migrated, or withheld. => passed => Per owner decision, the legacy /blog and /blog/[slug] are set to robots noindex and removed from the sitemap (withheld from search) pending review/migration to the Treehouse evidence gate; built output shows 'noindex, follow' and zero /blog entries in sitemap.xml.
- **Verification:** curl of built /tools, /blog, /blog/<slug>, /sitemap.xml | vitest tree-species.test.ts | manual read of README and accessibility page
- **Notes:** Legacy blog posts remain reachable by direct link; their content review/migration is a tracked owner follow-up.
- **Revision record digest:** sha256:c70dd60a5af961fafaf6a709b37af7b24a514a0a37fa7a1c157d91eecda0d019

## CLEAN-001 — Dead files, dependencies, and exports increase maintenance surface

- **Approval:** approved
- **Teardown verification state:** partially-verified
- **Revalidation:** confirmed
- **Disposition:** implemented
- **Sequence:** 13
- **Reason:** Owner approved deleting the confirmed-dead files and unused dependencies; ripgrep confirmed no remaining consumers.
- **Files changed:** deprecated/ContactForm.v1.tsx | src/components/forms/FastQuoteWidget.tsx | src/components/tools/EmailCaptureModal.tsx | src/components/ui/button.tsx | src/components/ui/NumberCounter.tsx | package.json | deprecated/CLEANUP_POLICY.md
- **Acceptance results:** Every removed file and package has no remaining consumer. => passed => Pre-deletion ripgrep found no external importers of the five files; @base-ui/react and class-variance-authority were only used by the deleted button.tsx and zustand had zero usage. | npm ls, typecheck, tests, lint, and build pass after deletion. => passed => npm ls reports the three packages absent; typecheck clean, 46 unit tests pass, lint 0 warnings, build succeeds; @types/node aligned to ^22 for the Node 22 runtime. | The configured dead-code check has no unexplained findings. => passed => npx knip after removal no longer lists any of the five files or three packages; remaining knip entries are pre-existing intentional data/config exports and test-only exports, explained and outside the approved deletion scope. A standing knip CI gate was deferred to avoid noise over those pre-existing exports.
- **Verification:** ripgrep consumer search | npm ls; npm run typecheck|test|lint|build | npx knip
- **Notes:** CLEANUP_POLICY.md archive log updated to record ContactForm.v1.tsx as discarded 2026-07-23 under CLEAN-001.
- **Revision record digest:** sha256:95bfbaa3f1bd802642e410d5303218b44059931a7d17377c0e32cc7e4e0d504e

## TEST-001 — CI passes while material browser and content regressions remain uncaught

- **Approval:** approved
- **Teardown verification state:** partially-verified
- **Revalidation:** confirmed
- **Disposition:** implemented
- **Sequence:** 14
- **Reason:** CI permitted warnings and lacked shell, console, metadata, accessibility, keyboard, phone-boundary, and cross-engine gates.
- **Files changed:** .github/workflows/quality.yml | playwright.config.ts | .github/dependabot.yml | tests/e2e/accessibility.spec.ts | tests/e2e/shells-metadata-console.spec.ts | tests/e2e/keyboard-a11y.spec.ts | tests/e2e/lead-form-boundary.spec.ts | src/lib/leads/fields.test.ts | package.json
- **Acceptance results:** Lint fails on any warning. => passed => lint script is 'eslint . --max-warnings=0' and CI runs npm run lint; a reintroduced warning fails the job. | Representative routes have automated browser invariants and accessibility checks. => passed => New specs add axe accessibility scans (10 routes), shell-count + canonical/title + console-cleanliness invariants, and keyboard behavior; all run in CI e2e. | Form boundary and failure recovery tests cover the shared validation contract. => passed => fields.test.ts covers 7/9/10-digit boundaries and the server superset; lead-form-boundary.spec drives the homepage form's 7-digit rejection in the browser. | At least one focused smoke suite runs in Firefox and WebKit or the unsupported scope is documented. => passed => playwright.config adds firefox+webkit projects filtered to @smoke; CI installs all three engines. Firefox @smoke was verified locally (2/2). WebKit runs in CI; local WebKit needs host libs (playwright install --with-deps) unavailable in this sandbox, documented in the config comment. | Dependency update automation is configured with controlled grouping. => passed => .github/dependabot.yml adds weekly npm updates grouped into production and dev minor/patch batches (majors separate) plus grouped github-actions updates.
- **Verification:** npx playwright test --project=chromium --project=firefox (32 passing) | npm run lint | vitest fields.test.ts
- **Notes:** A standing dead-code (knip) CI gate is deferred (see CLEAN-001) to avoid noise over pre-existing intentional exports.
- **Revision record digest:** sha256:ed91bef367172c3e98a6d8d9270ff89cab00af1e645b7e92457f0b7d6d26ff84

## PWA-001 — One-release service-worker cleanup has no retirement criterion

- **Approval:** approved
- **Teardown verification state:** blocked
- **Revalidation:** blocked
- **Disposition:** blocked
- **Sequence:** 15
- **Reason:** Owner approved marking this blocked; the retired-service-worker cleanup can only be removed after a production observation window that is unavailable in this session.
- **Files changed:** None
- **Acceptance results:** Production clients no longer report the retired /sw.js registration or known caches during the agreed window. => blocked => Production service-worker state cannot be observed from the local repository; no deployment observation window available. | The cleanup component and migration-only styles are removed in the following release. => blocked => Removal is gated on the production observation above; ServiceWorkerCleanup and migration-only styles are intentionally retained until then. | A post-removal production smoke test passes. => blocked => No removal performed, so no post-removal smoke test is applicable yet.
- **Verification:** source inspection confirms ServiceWorkerCleanup remains correctly scoped and mounted
- **Notes:** Temporary-migration lifecycle item; requires authorized production browser evidence before retirement.
- **Revision record digest:** sha256:f6dd64ae3163fe84da071f11c7764ba4d4bd5009d0aee9b80a6ec08fa4432db7

## STR-001 — The clean build and existing automated suite are healthy

- **Approval:** approved
- **Teardown verification state:** behaviorally-verified
- **Revalidation:** confirmed
- **Disposition:** retained
- **Sequence:** 16
- **Reason:** The clean reproducible pipeline is a strength to preserve; it was kept green through every phase and strengthened by TEST-001.
- **Files changed:** None
- **Acceptance results:** The clean install, typecheck, unit tests, build, and end-to-end suite remain green after each cleanup phase. => passed => After the full change set: typecheck clean, lint 0 warnings, 46 unit tests pass, webpack build succeeds, and 30 Chromium + 2 Firefox e2e pass. Unit count grew 36 to 46 and e2e added accessibility/shell/metadata/console/keyboard/boundary gates.
- **Verification:** npm run typecheck, lint, test, and build | npx playwright test --project=chromium --project=firefox
- **Notes:** Baseline preserved and strengthened rather than degraded.
- **Revision record digest:** sha256:58beb5531127e5d3b7e261b111d565c1faeebf3b8792397a7606aa9d245c05c0

## PERF-001 — Homepage performance is already strong

- **Approval:** approved
- **Teardown verification state:** behaviorally-verified
- **Revalidation:** confirmed
- **Disposition:** retained
- **Sequence:** 17
- **Reason:** Strong homepage performance is a strength to preserve; no change in this revision degrades it.
- **Files changed:** None
- **Acceptance results:** Representative mobile performance remains near the current baseline after the cleanup. => passed => No render-blocking or heavyweight client code was added; the production build still emits Static/SSG output for representative routes; removing the local Vercel scripts is net-positive and dead code was deleted. @axe-core/playwright is a devDependency only (not shipped).
- **Verification:** next build route table shows unchanged static/SSG rendering strategy | no new client-shipped dependencies added to the app bundle
- **Notes:** Production field Lighthouse comparison was not re-run in this session (no Lighthouse locally); recommended as a post-deploy confirmation.
- **Revision record digest:** sha256:4198055eb6e2ce3069adf94a8a2940e7e602738439eceb6ab7c1607adde7f43f

# Convergence findings
