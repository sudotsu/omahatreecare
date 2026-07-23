# Review Coverage

**Review status:** provisional
**Core workflows fully exercised:** no
**Validator status:** passed

## Surface coverage

| Surface | Importance | Status | Verification class | Evidence level | Evidence | Limitations | Next step |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Clean install, lint, typecheck, tests, and production build | required | passed | behaviorally-verified | test | Fresh clone passed install, typecheck, 36 unit tests, build, and 11 e2e tests; lint exposed 13 warnings | CI environment itself was not rerun remotely | Preserve baseline and make warnings fatal |
| Homepage navigation and primary estimate request | defining | failed | defect-conclusively-demonstrated | behavioral | Responsive rendering passed; seven-digit phone reproduced client/server mismatch | Real accepted production destination unavailable | Implement FUNC-001 and OPS-001 |
| Contact-page multi-step estimate request | defining | partial | partially-verified | mixed | Existing success/failure and focus tests passed; Lighthouse scored 98 accessibility | Live destination and real assistive technology unavailable | Unify validation and repeat keyboard/AT checks |
| Production lead persistence, delivery, retry, and destination receipt | defining | blocked | blocked | source-only | Fail-closed local path and operational procedure inspected | No authorized production credentials or destination | Complete OPS-001 with labeled production evidence |
| Tree-removal cost planner | defining | failed | defect-conclusively-demonstrated | mixed | Emergency, uncertain height, worksheet, build, and responsive paths passed | Tool route has duplicate shell and accessibility failures | Fix ARCH-001 and A11Y-001, then replay full matrix |
| Hazard screening tool | defining | partial | partially-verified | test | Existing defining interactions passed in Chromium | Full decision matrix, real AT, and content-specialist review unavailable | Add matrix, keyboard, and content review |
| Species reference and photo-email workflow | defining | failed | defect-conclusively-demonstrated | behavioral | Reference renders and email handoff is truthful | Search/button names and dialog focus restoration fail; native mail not sent | Implement A11Y-002 and retest |
| DIY/professional guide | defining | partial | partially-verified | test | Defining selection interaction passed | Safety copy and alternate browsers not fully reviewed | Add content and cross-browser checks |
| Common ailments reference | defining | partial | partially-verified | test | Defining interaction and 11-entry source count verified | No specialist diagnosis/treatment review | Review claims and referral thresholds |
| Treehouse article and publishing gate | major | passed | behaviorally-verified | mixed | Landing, article, archive, metadata, image, JSON-LD, and mobile checks passed | Search ingestion and independent professional review remain outside this audit | Preserve publication gates |
| Legacy blog content | major | partial | source-only | source-only | Older posts and claims inventory inspected | Full content evidence review not performed | Bring legacy content under DOC-001 publication standard |
| Location and service pages | major | partial | partially-verified | mixed | Sample routes and scaled crawl passed status/content/metadata invariants | Search Console and exhaustive claim review unavailable | Add shared metadata/content invariants |
| Field-estimate standalone route | major | partial | partially-verified | mixed | Noindex metadata, local-first source, and layout behavior inspected | Operational field workflow and print on a real device not tested | Retain standalone route under explicit shell layout |
| Responsive layouts and overflow | required | passed | behaviorally-verified | behavioral | Home, cost, contact, and article had no overflow at 320, 375, 768, and 1440 pixels | No physical devices or extreme zoom reflow | Repeat after layout changes and at 200% zoom |
| Firefox and WebKit behavior | required | not-tested | operationally-unverified | none | Chromium baseline exists | Engines were not installed in the audit environment | Add focused smoke projects under TEST-001 |
| Keyboard and screen-reader semantics | required | failed | defect-conclusively-demonstrated | behavioral | Mobile Escape, species names, and dialog focus defects reproduced | No real screen reader | Fix A11Y-001/A11Y-002 and run NVDA or VoiceOver |
| Metadata, sitemap, robots, social previews, and structured data | major | failed | defect-conclusively-demonstrated | behavioral | 57-path crawl passed all invariants except homepage canonical/title | Search-engine ingestion and social platform preview unavailable | Implement META-001 and metadata tests |
| Performance and production asset behavior | major | passed | behaviorally-verified | behavioral | Homepage Lighthouse performance 95; no broken crawled images | No production field CWV | Preserve PERF-001 and compare after changes |
| Privacy, analytics, and third-party requests | required | partial | partially-verified | mixed | Privacy/source flow inspected; local network captured | Production Analytics ingestion unavailable; local Vercel scripts error | Implement OBS-001 and verify on Vercel preview |
| API validation, abuse controls, idempotency, and failure containment | required | partial | partially-verified | mixed | Focused unit/e2e tests passed; form mismatch reproduced | Production storage and egress blocked | Fix FUNC-001 and complete OPS-001 |
| Dependency security and version support | required | failed | research-verified | research | Current advisories checked; 16.2.11 upgrade fully tested | sharp patch awaits supported framework range | Implement SEC-001 and track SEC-002 |
| Deployment, headers, environment separation, and operations | required | partial | partially-verified | source-only | Config, CI, CSP, and SOP inspected | No authorized live deployment inspection | Verify Vercel headers, analytics, lead delivery, and PWA state live |
| Documentation and implementation consistency | major | failed | defect-conclusively-demonstrated | source-only | README, tool counts, accessibility copy, and legacy content contradict current evidence | Owner approval required for business promises | Implement DOC-001 |
| Dead code and direct dependency necessity | supporting | failed | partially-verified | mixed | Knip plus direct usage searches identified unused files/packages | Dynamic/external consumers cannot be proven by Knip alone | Confirm and implement CLEAN-001 |
| Current local tree and generated artifact cleanliness | supporting | passed | behaviorally-verified | test | Baseline was clean before report creation | This report folder is intentionally untracked | Keep product source unchanged until implementation approval |
| Current Next/Vercel dependency guidance | research | passed | research-verified | research | Installed Next 16 docs, official release, and primary advisories reviewed on 2026-07-22 | Guidance can change | Recheck at implementation time |

## Narrative reconciliation

| Report section | Classification | Finding IDs | Rationale |
| --- | --- | --- | --- |
| 01-product-and-market.md | mixed | DOC-001, OPS-001, STR-001 | Product differentiation is strong, but duplicated claims and unverified delivery constrain trust. |
| 02-user-experience.md | actionable | ARCH-001, FUNC-001, A11Y-001, A11Y-002, META-001, OBS-001, CSP-001, PERF-001 | Browser testing established both confirmed defects and a performance strength. |
| 03-technical-audit.md | actionable | ARCH-001, BUILD-001, FUNC-001, SEC-001, SEC-002, CLEAN-001, TEST-001, PWA-001, STR-001 | Build evidence and source tracing define the implementation plan. |
| 04-security-and-reliability.md | mixed | SEC-001, SEC-002, CSP-001, OBS-001, OPS-001, PWA-001 | Current reachable risk is bounded, but patching and external operational proof remain required. |

## Finding counts

**Total findings:** 17

### By severity

- high: 1
- medium: 9
- low: 5
- informational: 2

### By status

- open: 13
- blocked: 2
- retained: 2

### By type

- defect: 7
- shortcoming: 5
- investigation: 3
- strength: 2

### By action

- fix: 10
- add: 1
- remove: 1
- investigate: 3
- retain: 2

## Validator result

**Validator status:** passed

Command run at 2026-07-22T18:48:12-05:00:

`python3 /home/sudotsu/.codex/skills/project-teardown/scripts/validate_teardown.py project-teardown-2026-07-22`

Successful output: `Teardown validation passed`
