# Implementation ledger

## TRUST-001 — Remove false ISA-certified arborist claims and replace them with truthful competence signals

- **Approval:** approved
- **Teardown verification state:** owner-provided
- **Revalidation:** confirmed
- **Disposition:** implemented
- **Sequence:** 1
- **Reason:** Current-head scans and rendered pages confirmed first-party credential implications; public copy now describes Midwest Roots without an ISA credential and uses independent credential referrals only.
- **Files changed:** src/app/layout.tsx | src/app/blog/page.tsx | src/app/blog/[slug]/page.tsx | src/app/tools/layout.tsx | src/app/tools/page.tsx | src/data/services.ts | src/lib/constants.ts
- **Acceptance results:** No page, metadata, schema, manifest, or social copy implies an active ISA credential => passed => Current source scan has no Midwest Roots certified-arborist claim; manifests were removed; rendered metadata was inspected. | Any third-party credential includes holder, credential, verification link, and role => passed => No specific third-party credential is published; generic referrals explicitly say independently credentialed and make no holder claim.
- **Verification:** case-insensitive material-claim scan | production build | Chrome rendered DOM review
- **Notes:** No active ISA credential is attributed to the company or owner.
- **Revision record digest:** sha256:34008d2c76e3f1503c8dc8213cb68cd8b5ac95bac499d86a18b38a7839bcc491

## CONV-001 — Replace the false fast-quote receipt with a real lead handoff

- **Approval:** approved
- **Teardown verification state:** defect-conclusively-demonstrated
- **Revalidation:** blocked
- **Disposition:** blocked
- **Sequence:** 2
- **Reason:** The current head no longer mounted FastQuoteWidget, but the legacy GET receipt remained public and was contained. Final production once-only receipt remains external CONV-003 evidence.
- **Files changed:** None
- **Acceptance results:** No success state is reachable without acknowledged persistence or delivery => passed => Legacy GET renders Finish Your Estimate Request; form success requires a first-party receipt. | Until durable lead acceptance exists, the fast-quote path routes into the real contact flow and never promises follow-up from ZIP/service alone => passed => Dormant widget routes to /contact and legacy URL states ZIP/service alone do not submit. | A labeled test lead arrives once with source, service, ZIP, contact, timestamp, and receipt ID after final closure => blocked => Local accepted/duplicate behavior passed, but destination arrival requires production store/provider/inbox access. | Direct GET cannot display a receipt => passed => Playwright direct-GET regression passed.
- **Verification:** Playwright legacy GET regression | local labeled accepted/duplicate API checks
- **Notes:** Containment files are attributed to CONV-002 because blocked records cannot list changed files under schema v2.
- **Revision record digest:** sha256:5c666a7e9a38ee7eb9d22068ffb1c2b62d18d73716e2f838c05d776a697c5015

## CONV-002 — Move lead capture to a first-party server boundary with durable delivery

- **Approval:** approved
- **Teardown verification state:** source-only
- **Revalidation:** confirmed
- **Disposition:** implemented
- **Sequence:** 3
- **Reason:** Browser EmailJS was replaced by a server-owned schema, durable file-backed receipt/idempotency store, pending queue state, authenticated delivery attempt, and fail-closed UI.
- **Files changed:** src/app/api/leads/route.ts | src/lib/leads/schema.ts | src/lib/leads/store.ts | src/lib/leads/client.ts | src/components/forms/ContactForm.tsx | src/components/forms/MultiStepContactForm.tsx | src/components/forms/FastQuoteWidget.tsx | src/app/free-tree-assessment-omaha/page.tsx | package.json | package-lock.json
- **Acceptance results:** Submission has a stable receipt ID => passed => 201 response and persisted UUID receipt verified locally. | Duplicate requests are idempotent => passed => Same idempotency key returned the same receipt with duplicate=true; Vitest covers durable duplicate lookup. | Provider outage produces queued/retry or explicit failure => passed => Accepted record remains delivery=pending on absent/failed webhook with operator signal; missing durable store returns homeowner-safe 503. | No provider key is shipped to browsers => passed => @emailjs/browser and NEXT_PUBLIC EmailJS configuration were removed; delivery token is server-only.
- **Verification:** 9 Vitest tests | local 201/200 duplicate/503/413 fault checks | typecheck | build | Playwright defining journeys
- **Notes:** Production durable storage and retry scheduling remain release configuration gates, not hidden success claims.
- **Revision record digest:** sha256:98e0ee99766a77185a9c6eda1d1f71cb5f1738648ff57a7789ace41aa2a7a616

## SEC-001 — Patch the pinned Next.js release and verify advisory applicability

- **Approval:** approved
- **Teardown verification state:** research-verified
- **Revalidation:** confirmed
- **Disposition:** implemented
- **Sequence:** 4
- **Reason:** Next.js was patched from 16.2.1 to 16.2.6, clearing applicable high/critical direct production advisories.
- **Files changed:** package.json | package-lock.json
- **Acceptance results:** npm audit has no applicable high/critical production advisory => passed => Final npm audit --omit=dev reports four moderate findings and zero high/critical. | Build and defining workflows pass on patched version => passed => 60-page Next 16.2.6 production build and three Playwright defining tests passed.
- **Verification:** npm audit --omit=dev | npm run build | npm run test:e2e
- **Notes:** Next's nested PostCSS advisory remains moderate and has no nonbreaking upstream resolution in the installed release.
- **Revision record digest:** sha256:a598c59cb1e062c7940a096878a093eb8b205728e086ca0969a234f2a7f4d192

## TEST-001 — Add automated coverage for scoring, routing, metadata, and lead acceptance

- **Approval:** approved
- **Teardown verification state:** source-only
- **Revalidation:** confirmed
- **Disposition:** implemented
- **Sequence:** 5
- **Reason:** Vitest characterization/failure coverage, production-server Playwright journeys, and a pull-request quality workflow were added without weakening the unsafe historical contract.
- **Files changed:** src/data/hazard-criteria.test.ts | src/lib/leads/leads.test.ts | tests/e2e/homeowner-tools.spec.ts | playwright.config.ts | .github/workflows/quality.yml | package.json | package-lock.json | .gitignore
- **Acceptance results:** Characterization coverage captures the false-receipt, active hazard scoring, current range selection, and photo-mailto behavior before risky replacement => passed => Retained teardown evidence established historical behaviors; regression tests now prove direct GET containment, scoring thresholds, broad range UI, and manual mail without a file input. | CI runs deterministic tests for five tools and the lead lifecycle => passed => Quality workflow runs Vitest plus production Playwright; local Playwright exercised all five tool routes. | Tests cover invalid, boundary, failure, duplicate, and mobile navigation paths => passed => Schema size/contact boundaries, no-store 503, duplicate receipt, oversize 413, mobile menu/skip/overflow passed. | No test weakens or normalizes an unsafe or misleading current contract => passed => Tests assert false receipt absent, hazard uncertainty present, dangerous vehicle-pull copy absent, and photo picker absent.
- **Verification:** npm test: 9 passed | npm run test:e2e: 3 passed | workflow syntax inspected
- **Notes:** Firefox/WebKit and real AT stay under A11Y-001 rather than being overstated as CI coverage.
- **Revision record digest:** sha256:912e4d35f0c06a816778161527515407acd0427bbd1b5bd0b31eb3ee60c4190f

## TRUST-002 — Substantiate or replace non-ISA authority, insurance, guarantee, statistics, and response claims

- **Approval:** approved
- **Teardown verification state:** source-only
- **Revalidation:** confirmed
- **Disposition:** implemented
- **Sequence:** 6
- **Reason:** Owner selected rewrite/remove; guarantees, licensing/insurance, equipment, experience, volume, quantified performance, and response promises were removed or bounded.
- **Files changed:** src/app/page.tsx | src/app/contact/page.tsx | src/app/locations/[city]/[neighborhood]/page.tsx | src/data/services.ts | src/data/blog/posts.ts | src/components/ui/HazardAssessmentHeroCard.tsx | src/components/forms/ContactForm.tsx | src/components/forms/MultiStepContactForm.tsx
- **Acceptance results:** Owner supplies evidence or selects replace/remove for every claims-inventory row mapped to TRUST-002 => passed => Owner explicitly selected retain only with evidence or rewrite/remove; current scan and rendered review found no retained unsupported mapped claim. | Insurance/licensing claims identify jurisdiction, status, and verification where applicable => passed => No public insurance or licensing claim remains. | Guarantee terms are written, bounded, and available before purchase => passed => Unsupported zero-damage and implied outcome guarantees were removed; no guarantee is offered. | Quantified statistics and response promises have an owner, source period, and update cadence => passed => Unsubstantiated statistics, since-2023 claim, operating hours, response times, and performance percentages were removed rather than retained.
- **Verification:** material claim scan | Chrome DOM adversarial review | full diff review
- **Notes:** Authority-heavy prior copy was treated as implementation debt, not owner intent.
- **Revision record digest:** sha256:98bc54a29780b1d6574f9ef8303152d7d04a6e3bfc802deb2bf32545c96a4055

## SAFE-001 — Reframe the hazard quiz as conservative screening and remove invented authority

- **Approval:** approved
- **Teardown verification state:** defect-conclusively-demonstrated
- **Revalidation:** confirmed
- **Disposition:** implemented
- **Sequence:** 7
- **Reason:** Questions, scoring, result depth, urgency, safety guidance, next steps, and conversion remain; conclusions now report only the homeowner's answers and limitations.
- **Files changed:** src/components/tools/PremiumHazardAssessment.tsx | src/data/hazard-criteria.ts | src/data/hazard-criteria.test.ts | src/components/ui/HazardAssessmentHeroCard.tsx
- **Acceptance results:** Owner records option A (conservative screener) or option B (credential-reviewed rebuild); recommendation is option A unless an active independent credential holder accepts review responsibility => passed => Owner selected conservative preliminary homeowner screening. | No “official,” “certified method,” “diagnosis,” or ISA-framework claim => passed => Active component and public copy scan contain none of these authority claims. | Emergency red flags give keep-away and appropriate emergency/utility instructions => passed => Extreme result directs keep-away, no work beneath tree, emergency services for immediate danger, and utility for line contact. | All results state limits and route formal assessment to qualified help => passed => Every score narrative is tied to reported signs; low result explicitly does not establish soundness; CTA routes on-site help.
- **Verification:** hazard threshold tests | Playwright maximum-score journey and focus | 390x844 Chrome screenshot
- **Notes:** Independent professional review remains a release-strengthening gate, not a claim that review occurred.
- **Revision record digest:** sha256:4690ea42b4e77a39850ea7e96b2a3d2d39ebab8c6a850b22b9833e7bc0f80724

## SAFE-002 — Remove hazardous DIY instructions and adopt a credential-reviewed safety taxonomy

- **Approval:** approved
- **Teardown verification state:** source-only
- **Revalidation:** blocked
- **Disposition:** blocked
- **Sequence:** 8
- **Reason:** Ladder, chainsaw, vehicle pull, felling, overhead cutting, and utility instructions were removed/reclassified, but named independent safety review has not occurred.
- **Files changed:** None
- **Acceptance results:** No homeowner instruction recommends ladder, chainsaw, vehicle pulling, climbing, overhead cutting, or work near utilities => passed => Current DIY tool prohibits or reclassifies these tasks; Playwright asserts vehicle-pull copy absent. | Safety copy has named outside review date/owner => blocked => No independently qualified reviewer has been engaged; the site and artifact preserve this release gate.
- **Verification:** source safety-term review | Playwright DIY journey
- **Notes:** Safety edits are attributed to TRUST-002/CONTENT-002 because schema-blocked findings cannot list changed files.
- **Revision record digest:** sha256:a38ba5996c4dd7183f5529011d04875cf880547cfabbee40877afd889084b4f2

## CONTENT-001 — Separate educational ailment/species guidance from diagnosis and treatment claims

- **Approval:** approved
- **Teardown verification state:** source-only
- **Revalidation:** blocked
- **Disposition:** blocked
- **Sequence:** 9
- **Reason:** UI now states educational possibilities, uncertainty, no diagnosis, and urgent referral, but material biological/treatment entries still require authoritative sourcing and dated professional review.
- **Files changed:** None
- **Acceptance results:** Each material biological/treatment claim has source and review date => blocked => Independent sources and a qualified review owner/date are not available for every retained entry. | Outputs use uncertainty language and distinguish identification from diagnosis => passed => Species matching and ailment reference explicitly deny confirmed identification/diagnosis and warn not to treat from an entry alone. | Urgent triggers route appropriately without asserting diagnosis => passed => Urgent CTA refers to warning signs/reference entry and requests on-site review without saying the ailment was diagnosed.
- **Verification:** Playwright species and ailment journeys | authority copy scan
- **Notes:** Related UI changes are attributed to TRUST-002/CONTENT-002 while professional content review remains blocked.
- **Revision record digest:** sha256:f4fb4a99ecf4a93a6c82edbf9ab0e6d72435ec7b81eb9d94eeda1ee9c251cc99

## PRIV-001 — Add transparent privacy terms and consent for lead and photo handling

- **Approval:** approved
- **Teardown verification state:** source-only
- **Revalidation:** confirmed
- **Disposition:** implemented
- **Sequence:** 10
- **Reason:** Owner supplied retention/access/deletion choices; a linked privacy notice covers current first-party records and honest manual-photo email with no reuse opt-in.
- **Files changed:** src/app/privacy/page.tsx | src/components/forms/ContactForm.tsx | src/components/forms/MultiStepContactForm.tsx | src/components/layout/Footer.tsx | src/components/tools/SpeciesIdentifier.tsx | README.md | OPERATIONS_SOP.md
- **Acceptance results:** Owner records a specific retention duration for first-party lead records => passed => 12 months for unconverted leads is encoded, displayed, and documented. | Owner defines routine deletion, deletion-request handling, and any legal/operational hold exception => passed => Privacy page and runbook define delete/anonymize, request steps, and bounded active-customer/dispute/security/business-record holds. | Owner names the roles or individuals permitted to access stored lead records and the access-review cadence => passed => Owner and explicitly authorized operators only; changes and quarterly review documented. | Privacy page is linked at every collection point => passed => Both forms link it and global footer exposes it; photo workflow collects no file or consent. | Photo reuse is unchecked and separable => passed => Reuse checkbox was removed; sending email explicitly grants no reuse. | Retention/deletion contact and processors are named => passed => Privacy page names owner contact and current Vercel hosting/analytics; future owner-selected delivery/email provider must be privately documented before configuration.
- **Verification:** privacy route build | collection-point source review | Playwright manual-photo check
- **Notes:** No claim of compliance with a named legal regime is made.
- **Revision record digest:** sha256:66a78821c1173a189c1334df311f18dc593423e447dd588e26f6c07380464d73

## SEO-001 — Correct false and duplicated global metadata before further SEO expansion

- **Approval:** approved
- **Teardown verification state:** defect-conclusively-demonstrated
- **Revalidation:** confirmed
- **Disposition:** implemented
- **Sequence:** 11
- **Reason:** Page titles no longer embed the global brand template redundantly; each tool has generated accurate title, description, and canonical metadata.
- **Files changed:** src/app/layout.tsx | src/app/page.tsx | src/app/tools/page.tsx | src/app/tools/[tool]/page.tsx | src/app/blog/page.tsx | src/app/blog/[slug]/page.tsx | src/app/services/[service]/page.tsx | src/app/locations/[city]/page.tsx | src/app/locations/[city]/[neighborhood]/page.tsx | src/app/contact/page.tsx | src/app/accessibility/page.tsx
- **Acceptance results:** Rendered titles are unique, accurate, and not double-branded => passed => Title sources were normalized to rely on the root template; rendered contact title and build routes inspected. | All five tools have canonical and accurate descriptions => passed => generateMetadata maps all five slugs to bounded titles/descriptions/canonicals.
- **Verification:** 60-page build | rendered head inspection | metadata source review
- **Notes:** None
- **Revision record digest:** sha256:0e9668935094f5b0a5e2202753221d9bdd30fac76858d9a88a9170d7ce0f0f00

## SEO-002 — Prove unique homeowner value on programmatic location pages or consolidate them

- **Approval:** approved
- **Teardown verification state:** research-verified
- **Revalidation:** blocked
- **Disposition:** blocked
- **Sequence:** 12
- **Reason:** Owner chose to keep useful local coverage and obvious credential assertions were removed, but query/lead evidence and owner substantiation for every unique local assertion are unavailable.
- **Files changed:** None
- **Acceptance results:** Owner decides retain/consolidate based on query and lead evidence => blocked => Retain-useful direction is recorded, but Search Console/query/lead evidence was not available to select consolidation candidates. | Every retained page has verified unique content and clear conversion path => blocked => Routes build and conversion links exist; full owner verification of each local assertion remains unavailable.
- **Verification:** 24 neighborhood and 8 city pages built | representative source review
- **Notes:** No mass deletion was performed; baseline neighborhood work was preserved.
- **Revision record digest:** sha256:4c457335e418b5d75ebdd67b673fca7b03d97f319582b4be9f05626cc5719392

## A11Y-001 — Repair heading hierarchy and keyboard entry semantics across tools

- **Approval:** approved
- **Teardown verification state:** defect-conclusively-demonstrated
- **Revalidation:** blocked
- **Disposition:** blocked
- **Sequence:** 13
- **Reason:** Skip link, one-H1 tool route semantics, and active hazard/cost focus were repaired; Firefox/WebKit and real NVDA/VoiceOver gates remain unavailable.
- **Files changed:** None
- **Acceptance results:** One H1 per tool route => passed => Dynamic route supplies one slug-specific H1; production pages built. | Skip link is first focusable control and visible on focus => passed => Playwright mobile keyboard test proves first Tab focuses the skip link. | Results receive programmatic focus or appropriate live announcement => passed => Hazard and cost headings receive focus; result containers expose live/result markers. | Supported Firefox/WebKit journeys verify keyboard entry, focus order, result announcement, and recovery without engine-specific failure => blocked => Only installed Chrome was executable; Firefox/WebKit were not available. | At least one real NVDA or VoiceOver pass verifies the defining tool and lead journeys; unavailable engines or assistive technology remain an explicit release gate => blocked => No real NVDA/VoiceOver environment was available; accessibility page and handoff retain the gate.
- **Verification:** Playwright Chromium keyboard/focus/mobile checks | semantic source review
- **Notes:** Accessibility edits are attributed to SEO-001/TEST-001 while this evidence-complete finding remains blocked.
- **Revision record digest:** sha256:152aae44f18c134bd369a0c13c3aabeaf4255bc67ef0f3142fa77b9ad2ae01b8

## UX-001 — Preserve responsive, low-friction tool access while correcting trust and conversion

- **Approval:** approved
- **Teardown verification state:** behaviorally-verified
- **Revalidation:** confirmed
- **Disposition:** retained
- **Sequence:** 14
- **Reason:** No-account access, five routes, phone fallback, interaction depth, and narrow/wide responsive behavior were preserved.
- **Files changed:** None
- **Acceptance results:** Core tools remain usable without account => passed => All five production routes returned 200 and defining Playwright journeys required no account. | 390px and 1440px layouts have no horizontal overflow => passed => 390px Playwright overflow assertion passed; 390 screenshot and 1440 Chrome render completed. | Direct call fallback remains available => passed => Navigation, forms, tool footer, and failure copy retain tel links.
- **Verification:** five-route HTTP checks | Playwright Chrome | 390x844 screenshot | 1440x900 render
- **Notes:** None
- **Revision record digest:** sha256:13c3c3a7d100ac2d5e013063d051429da66e3f30511f2c43208708db67fda749

## OPS-001 — Align documentation, deployment prerequisites, and operational ownership

- **Approval:** approved
- **Teardown verification state:** source-only
- **Revalidation:** confirmed
- **Disposition:** implemented
- **Sequence:** 15
- **Reason:** README now matches Next 16.2.6, server lead configuration, safe failure, PWA removal, and explicit production gates without claiming the private runbook is complete.
- **Files changed:** README.md | OPERATIONS_SOP.md | package.json | next.config.ts | src/app/field-estimate/page.tsx | src/app/globals.css | src/components/ServiceWorkerCleanup.tsx | src/sw.ts | public/manifest.json | public/field-estimate-manifest.json | tsconfig.json
- **Acceptance results:** README framework and dependency versions match the audited or replacement lockfile => passed => README names Next 16.2.6 and Node 22; lock/build confirm. | Setup instructions name required configuration without exposing secrets => passed => Durable directory, delivery URL/token, and analytics ID are named with blank examples only. | Documentation explicitly states the current lead delivery limitation and points to the controlled verification gate => passed => README says production storage/routing/delivery test is required; runbook provides labeled drill. | Immediate documentation corrections do not claim the later operational runbook is complete => passed => Private owners/destinations, retry automation, and drills are explicit release gates.
- **Verification:** documentation behavior cross-check | build and dependency inspection
- **Notes:** None
- **Revision record digest:** sha256:b0f3a96c8dc586f2692b1f769d13fbe962f8ae7e12a5f2cfd8a2fa45a25bb669

## CONV-003 — Complete controlled production lead-delivery and routing verification

- **Approval:** approved
- **Teardown verification state:** blocked
- **Revalidation:** blocked
- **Disposition:** blocked
- **Sequence:** 16
- **Reason:** Production provider/account/destination evidence is unavailable; only local labeled acceptance, duplicate, failure, and redaction behavior was exercised.
- **Files changed:** None
- **Acceptance results:** One labeled test per distinct transport uses “PROJECT TEARDOWN TEST — DO NOT CONTACT” => blocked => Local API test used the prefix; no production transport was submitted without configured private authorization/evidence. | Sanitized evidence records timestamp, source route, provider acknowledgment, destination, received fields, attribution, and duplicate count => blocked => Local receipt/source/attribution/duplicate evidence exists; production provider/destination evidence does not. | A controlled provider/configuration failure produces a homeowner-safe failure and an operator-visible signal => passed => No-store returns 503 safe copy; delivery failure remains pending and logs structured receipt signal. | No production customer data or secrets are copied into evidence => passed => Only obvious placeholder local test data was used; no production data/secrets entered artifacts.
- **Verification:** local labeled 201 and duplicate 200 | local no-store 503 | operator log inspection
- **Notes:** Exact production destination and provider remain private release configuration.
- **Revision record digest:** sha256:621065116d6d5e7556f9d7357e06c2bcd0fccdc5ed4151dc2fe6b7abee8f5751

## AN-001 — Define and verify a conversion measurement model

- **Approval:** approved
- **Teardown verification state:** source-only
- **Revalidation:** confirmed
- **Disposition:** implemented
- **Sequence:** 17
- **Reason:** First-party accepted record is documented and implemented as truth; qualification is measurable; analytics emits PII-free tool start/complete/CTA attribution only.
- **Files changed:** src/lib/leads/schema.ts | src/lib/leads/store.ts | src/components/tools/ToolAnalytics.tsx | src/app/tools/[tool]/page.tsx | src/app/contact/ContactFormWrapper.tsx | README.md | OPERATIONS_SOP.md
- **Acceptance results:** Owner names one analytics source of truth and the reconciliation role of every secondary analytics system => passed => Accepted first-party record is receipt/qualification truth; Vercel/optional GA are attribution/funnel only. | Owner defines a qualified lead with measurable minimum fields, service-area fit, service intent, contactability, exclusions, and the event/state that records qualification => passed => Schema/isQualifiedLead encode return contact, plausible need, nearby address, accepted state, and test/spam/duplicate exclusions. | Event dictionary and funnel documented => passed => Runbook documents tool_start/tool_complete/tool_cta and accepted/delivery states. | All five tools emit start/complete/CTA with no PII => passed => Shared wrapper applies to all five slugs and emits only event plus tool slug. | Accepted and routed lead states are measurable => passed => Records store acceptedAt, qualification, receipt, source/attribution, and pending/acknowledged delivery.
- **Verification:** qualification unit tests | all-five Playwright journey | record inspection
- **Notes:** None
- **Revision record digest:** sha256:fe8c38cdfc902be1933cfffbab63aa47063988d5202721b689c78853a9e30fe9

## UX-002 — Replace the misleading photo-selection and mailto attachment workflow

- **Approval:** approved
- **Teardown verification state:** defect-conclusively-demonstrated
- **Revalidation:** confirmed
- **Disposition:** implemented
- **Sequence:** 18
- **Reason:** File selection/preview/reuse/success state was removed and replaced by explicit mail-draft instructions requiring the homeowner to attach and send.
- **Files changed:** src/components/tools/SpeciesIdentifier.tsx | src/app/privacy/page.tsx
- **Acceptance results:** Owner records manual-email containment or real-upload implementation => passed => Owner selected temporary manual email containment. | Selecting photos never implies transfer unless bytes are actually acknowledged by the receiving system => passed => No file input exists; copy says website does not upload or attach. | Success appears only after acknowledged receipt or is labeled only as “mail draft opened” => passed => No photo success state exists; opening draft is explicitly not sending. | Selected files are not cleared before acknowledged transfer or explicit cancellation => not-applicable => Manual path has no website file selection or in-memory files. | Photo reuse remains separate, unchecked, and recorded only when a photo is actually received => passed => No reuse control or grant exists; email text and privacy page state sending grants no reuse.
- **Verification:** Playwright asserts mail link and zero file inputs | source review
- **Notes:** Future upload lifecycle requirements remain documented, not implemented.
- **Revision record digest:** sha256:975dc75740f13dd246b07045b44161c2b93fe8a13078d135450240f043261cfd

## PROD-002 — Calibrate and truthfully present cost-estimator ranges

- **Approval:** approved
- **Teardown verification state:** source-only
- **Revalidation:** blocked
- **Disposition:** blocked
- **Sequence:** 19
- **Reason:** Owner approved broad numeric planning ranges without blocking on missing job data; UI is truthful now, but original calibration/source/back-test criteria remain unavailable.
- **Files changed:** None
- **Acceptance results:** Owner selects calibrated-range or nonnumeric/qualified-guide path => passed => Owner selected retained numeric broad qualified planning ranges with future calibration. | Every retained number has source period, sample size, geography, included/excluded scope, and review owner => blocked => UI discloses uncalibrated status, Omaha area, exclusions, and owner, but source period/sample do not exist. | A back-test against representative completed quotes meets an owner-approved error band => blocked => Representative redacted jobs, quotes, and approved error band were unavailable. | UI never labels a four-bucket lookup personalized, firm, professionally accurate, or market-validated without evidence => passed => Playwright confirms Broad Planning Range and Not a quote; authority labels/precise typical anchor removed.
- **Verification:** Playwright cost journey | pricing copy/source review
- **Notes:** Cost edits are attributed to TRUST-002/CONTENT-002 while calibration remains an external future strengthening gate per owner direction.
- **Revision record digest:** sha256:5edbdb6caf6e1351068994c80a606380d02d6ada86dfd60c7ac9b6d7089855d6

## CONTENT-002 — Reconcile misleading tool counts, capabilities, and service availability claims

- **Approval:** approved
- **Teardown verification state:** defect-conclusively-demonstrated
- **Revalidation:** confirmed
- **Disposition:** implemented
- **Sequence:** 20
- **Reason:** Public count now matches ten active profiles, tools use screening/matching/range/reference language, and unsupported treatment/equipment/availability selections were removed or bounded as inquiries.
- **Files changed:** src/app/page.tsx | src/app/tools/page.tsx | src/components/tools/SpeciesIdentifier.tsx | src/components/tools/CostEstimator.tsx | src/components/tools/CommonAilments.tsx | src/components/tools/DIYvsProGuide.tsx | src/components/tools/EmailCaptureModal.tsx | src/components/forms/MultiStepContactForm.tsx | src/components/forms/ContactForm.tsx | src/data/services.ts | src/data/ailments.ts | src/data/species.ts | src/data/diy-guide.ts | src/data/cost-ranges.ts | src/components/tools/HazardAssessment.tsx
- **Acceptance results:** All public counts equal the active canonical dataset count => passed => Homepage states 10 profiles and active species component has ten; contradictory 12/24+ claims removed. | Tool names and descriptions state lookup/screening/range behavior rather than exact identification or diagnosis => passed => Metadata, hub, homepage, and results use matching, screening, broad planning, and reference terminology. | Owner confirms every marketed service, equipment claim, geographic availability, and response capability => passed => Owner approved capable local tree-service positioning; specific equipment, treatment, guarantee, response-time, and unbounded availability claims were removed. | Unavailable services cannot be selected or advertised => passed => Health/EAB treatment selection removed; storm is an inquiry with availability confirmation; specialized equipment is no longer promised.
- **Verification:** material claim scan | all-five Playwright journey | dead duplicated dataset/import search
- **Notes:** Unused duplicate data and dormant hazard implementation were removed; the active five tools and field estimate remain.
- **Revision record digest:** sha256:a66cb9993731c6bad6b62420ff83151025499db7c46a82a28631203bc4dfcb4c

## SEC-002 — Add and verify application security headers and lead-form abuse controls

- **Approval:** approved
- **Teardown verification state:** source-only
- **Revalidation:** blocked
- **Disposition:** blocked
- **Sequence:** 21
- **Reason:** Application CSP/frame/referrer/permissions/content-type headers and server size/schema/honeypot/idempotency/rate controls were added, but distributed production abuse behavior, HSTS, provider quotas, and deployed responses remain external.
- **Files changed:** None
- **Acceptance results:** Automated duplicate/burst tests are bounded and produce observable operator signals without blocking ordinary accessible use => blocked => Duplicate test and in-process 8/10-minute burst boundary exist; distributed production behavior/alert routing is unverified. | Production responses verify the approved CSP, frame-ancestors or equivalent, Referrer-Policy, Permissions-Policy, X-Content-Type-Options, and HSTS where TLS ownership permits => blocked => Local production server captured all except HSTS; deployed TLS-owned response capture is unavailable. | Lead payload size, schema, idempotency, and logging/redaction boundaries have failure-path tests => passed => Vitest and HTTP checks cover contact/size/idempotency/no-store; structured logs omit contact fields. | Provider-side protections and quotas are documented but not treated as substitutes for application controls => blocked => Runbook states application boundaries; actual selected provider quota/protection is not configured or known.
- **Verification:** local response header capture | 413/503/duplicate checks | schema/store tests
- **Notes:** Security files are attributed to CONV-002/SEC-001 while deployed verification remains blocked.
- **Revision record digest:** sha256:4191d90696e97d607094944755ba9d450b7e568d2298b2796d748467035f646a

## TECH-001 — Extract a tenant-neutral tool kernel before embedding or licensing

- **Approval:** approved
- **Teardown verification state:** source-only
- **Revalidation:** blocked
- **Disposition:** blocked
- **Sequence:** 22
- **Reason:** A bounded default Midwest Roots configuration and pure tested hazard/lead rules exist, duplicated unused datasets were removed, but all five interactive rule sets are not yet extracted into a tenant-neutral router-free kernel.
- **Files changed:** None
- **Acceptance results:** Owner records build-boundary-now or defer-until-local-stability; commercialization remains a separate PROD-001 decision => passed => Owner selected boundary now and separately deferred commercialization. | No tool kernel imports Midwest Roots constants or Next router => blocked => Pure hazard/lead modules meet this, but species/DIY/ailment/cost rules remain embedded in UI adapters that import routing/business context. | Rules are pure and covered by boundary tests => blocked => Hazard and lead rules are pure/tested; equivalent extraction/tests for all remaining tools are incomplete. | Tenant adapter owns branding, locale, leads, analytics, and disclosures => passed => siteConfig separates identity, routing/retention, service areas, pricing status, analytics, tool copy, authority, and feature flags with Midwest Roots defaults.
- **Verification:** configuration source review | dependency/import search | hazard/lead tests
- **Notes:** No tenancy, billing, generalized SaaS, or managed-embed runtime was added.
- **Revision record digest:** sha256:3224f78320bcd727dd58bab9d5c8da72458068037cd08d78a8b6cfbb84945e89

## PWA-001 — Decide whether offline/installable PWA behavior is a supported promise

- **Approval:** approved
- **Teardown verification state:** partially-verified
- **Revalidation:** blocked
- **Disposition:** blocked
- **Sequence:** 23
- **Reason:** Serwist, service worker source/dependencies, both install manifests, and metadata links were removed; one-release cleanup unregisters workers/deletes caches, but deployed stale-client proof is external.
- **Files changed:** None
- **Acceptance results:** Decision recorded => passed => Owner explicitly chose remove PWA installation/offline/cache/update complexity. | If retained, install/offline/update tested in supported browsers; if removed, no stale registrations remain => blocked => New build has no SW registration/output and cleanup runs in Chrome; deployed /sw.js and previously installed client control have not been observed after deployment.
- **Verification:** Serwist/manifest/source scan | production build | Chrome cleanup component render
- **Notes:** PWA changes are attributed to OPS-001/CONTENT-002 while production stale-control clearance remains a release gate.
- **Revision record digest:** sha256:f05cfbde9f8808d203e6fe81befe56f67278c80336afbfb31210f31575c56e9a

## PROD-001 — Choose and validate the tool commercialization model before platform work

- **Approval:** approved
- **Teardown verification state:** partially-verified
- **Revalidation:** changed
- **Disposition:** implemented
- **Sequence:** 24
- **Reason:** Owner chose local stabilization and one later paid managed-embed pilot only; broad platform infrastructure was excluded and pilot thresholds/ownership prerequisites documented.
- **Files changed:** README.md | src/lib/site-config.ts
- **Acceptance results:** Owner chooses local-only, licensed embed, managed SaaS, or deferral => passed => Owner chose stabilize local now, then preserve one paid managed-embed pilot path. | Pilot success thresholds and liability/content ownership are written before build => passed => README requires named buyer/fee/support/content-liability/update/lead/privacy/exit owners and defines paid journey/lead integrity/renewal threshold before pilot build.
- **Verification:** scope/diff review confirms no SaaS, tenancy, billing, or pilot runtime
- **Notes:** None
- **Revision record digest:** sha256:bf9b0519f6fe5200ceb46665e152152805dec1b31c655cacf3cf3dff0b9842c4

## OPS-002 — Establish the production lead operations runbook and ownership model

- **Approval:** approved
- **Teardown verification state:** operationally-unverified
- **Revalidation:** blocked
- **Disposition:** blocked
- **Sequence:** 25
- **Reason:** A complete executable public runbook structure exists, but private backup owner/destinations/provider accounts and production drills cannot be completed without owner operational access.
- **Files changed:** None
- **Acceptance results:** Runbook names system owner, backup owner, destinations, provider accounts, and escalation path without embedding secrets => blocked => System owner/roles/escalation method are defined; backup owner, selected provider, and private destinations still require owner configuration. | A labeled test-lead drill and provider-outage drill can be completed from the runbook => passed => Runbook gives exact prefix, evidence fields, success/pending/no-store cases, restoration, and once-only proof steps. | Retention, deletion, duplicate reconciliation, alert thresholds, rollback, and provider rotation are documented => passed => All topics have explicit procedures and safe rollback boundary. | Runbook version facts match the deployed system => blocked => Facts match current branch implementation; no deployment has occurred and production provider facts are unavailable.
- **Verification:** runbook-to-source cross-check | local labeled and outage drills
- **Notes:** No secrets or production customer records are present.
- **Revision record digest:** sha256:dcbb50954e712c8228cd647d3f935b546d414eb71daefb1c8365a3e85cab8545

# Convergence findings

### REV-001 — Rendered homepage retained unsupported authority and response claims

- **Source:** Playwright rendered-DOM adversarial review
- **Severity:** high
- **Status:** fixed
- **Reason:** The first browser snapshot exposed professional-arborist, exact-safety, since-2023, and two-hour callback claims missed by the initial scan; all were replaced with bounded wording.
- **Files changed:** src/app/page.tsx | src/components/ui/HazardAssessmentHeroCard.tsx | src/components/forms/ContactForm.tsx
- **Verification:** repeat material-claim scan | Playwright three-test pass
- **Convergence record digest:** sha256:695ad7e7c1d015cdad131c88c761d5c6aba67f4ef3bd683e8d22efb6e87c1f80

### REV-002 — Failed acceptance could leave an empty idempotency lock

- **Source:** manual lead-store fault and concurrency review
- **Severity:** medium
- **Status:** fixed
- **Reason:** An error after exclusive key creation could leave an empty key and make future duplicates fail indefinitely; failure now removes the lock and concurrent empty locks fail safely.
- **Files changed:** src/lib/leads/store.ts | src/lib/leads/leads.test.ts
- **Verification:** Vitest store suite passed | local 503 and duplicate checks passed
- **Convergence record digest:** sha256:d70d25cd17e582f126e6303bcb20e50850f443b8f600445aa6fd8643cac8c6d8

### REV-003 — Vitest discovered Playwright specifications

- **Source:** full-suite verification
- **Severity:** medium
- **Status:** fixed
- **Reason:** The initial npm test glob loaded Playwright specs in Vitest; the unit script now excludes tests/e2e and each runner passes independently.
- **Files changed:** package.json
- **Verification:** npm test passed 9 tests | npm run test:e2e passed 3 tests
- **Convergence record digest:** sha256:a4805d39f6dea035ac03ce037bf4c4daeea6d9b4ea3b5dd9dc2f6e511d977590

### REV-004 — Species and location surfaces retained unsupported certainty and service claims

- **Source:** current-head material-claim and rendered-route review
- **Severity:** high
- **Status:** fixed
- **Reason:** Species entries still presented unsupported mortality, lifespan, treatment, and tree-level risk certainty; location pages asserted neighborhood conditions, free assessment, permit handling, and equipment knowledge without evidence. The surfaces now use bounded concern language, property-specific planning, municipal confirmation, and estimate-scope wording.
- **Files changed:** src/components/tools/SpeciesIdentifier.tsx | src/components/tools/DIYvsProGuide.tsx | src/app/locations/[city]/[neighborhood]/page.tsx | src/app/locations/[city]/page.tsx | src/data/services.ts | tests/e2e/homeowner-tools.spec.ts
- **Verification:** typecheck passed | Vitest 9 tests passed | lint passed with 23 warnings and no errors | Playwright 4 tests passed in installed Chrome | production build passed with 60 routes | full product diff reviewed
- **Convergence record digest:** sha256:612db991f21efd2f69f6e5346e6c2851df64697ef173f1ba3ca311e411b94b05
