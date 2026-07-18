# Baseline and revalidation

## Baseline state

- Workspace: `/home/sudotsu/omahatreecare`; remote `origin=https://github.com/sudotsu/omahatreecare`.
- Implementation start: clean `main` at `b1f3c8867c8512e1e84be1c00648b86d46bc0084`; branch `codex/project-revision-midwest-roots`.
- Teardown drift: audited `3909e4e`; current head includes the field-estimate PWA merge and contact-form restoration, so every finding was revalidated.
- Toolchain: Node `v22.22.2`, npm `10.9.7`, Next initially `16.2.1`, then patched to `16.2.6`.
- Baseline PR/review/CI: no branch PR existed; remote `main` equaled the start revision. No production delivery/deployment facts were imported from teardown evidence.

## Preservation inventory

The start tree was clean. Baseline hashes retained outside the repository: `.gitignore` `202907…a48`; `src/app/contact/ContactFormWrapper.tsx` `135c8f…4ae`; `src/app/locations/[city]/[neighborhood]/page.tsx` `02b6dc…a23`. `.gitignore` remained byte-identical. Contact query-prefill intent was preserved and extended with ZIP attribution. Neighborhood fallback/local-page work was preserved while false credential metadata and one authority claim were narrowed.

## Current-state revalidation

Each row preserves the original recommendation, dependencies, acceptance criteria, and verification unless the evidence note says the implementation premise changed. Digests are SHA-256 of the original canonical teardown record.

| ID | Classification and current evidence | Original digest |
| --- | --- | --- |
| TRUST-001 | confirmed; credential claims remained across metadata/tool/content and were removed or changed to independent credential referrals. | `28c4be…86f0` |
| CONV-001 | confirmed; fast quote still routed to GET-only receipt. | `2cd9d2…4050e` |
| CONV-002 | confirmed; all forms still shipped EmailJS public configuration. | `ff7ee2…5e5bb` |
| SAFE-001 | confirmed; active premium tool retained official/ISA/conclusive language. | `76544e…889b9` |
| SAFE-002 | confirmed; ladder/chainsaw/vehicle-pull instructions remained; outside review blocked. | `fdcb20…c1c0` |
| CONTENT-001 | confirmed; diagnosis/treatment certainty and uncited duplicated biology remained; outside review blocked. | `2661c9…50e3` |
| PRIV-001 | confirmed; no collection-point notice/retention terms; manual email processors remain partly operational. | `dbdb08…d7a8` |
| SEO-001 | confirmed; branded titles double-appended and tool metadata was generic. | `613b5d…6f2b` |
| SEO-002 | confirmed; owner chose retain-useful, but query/lead/local substantiation remains unavailable. | `68d6c4…ecdf` |
| A11Y-001 | confirmed; skip link/H1/result focus gaps remained; external browser/AT evidence blocked. | `301516…816` |
| SEC-001 | confirmed; Next 16.2.1 was directly vulnerable. | `5bc9da…44b4` |
| AN-001 | confirmed; accepted-record truth and qualification definition were absent. | `556bb9…8d97` |
| TECH-001 | confirmed; identity/routing/pricing/copy/flags were coupled; full tenant-neutral kernel remains incomplete. | `24a5d5…9062` |
| PROD-001 | changed by owner; broad commercialization deferred and one managed pilot bounded. | `f9ce44…9040` |
| TEST-001 | confirmed; no test script existed; full five-tool/browser automation remains incomplete. | `3d2d98…14f1` |
| PWA-001 | confirmed; Serwist plus two manifests existed; deployed stale-client proof blocked. | `416f5e…0d29` |
| UX-001 | confirmed retained strength; five routes and phone fallback remain. | `c7a2ff…76d4` |
| OPS-001 | confirmed; README named wrong Next version and browser EmailJS. | `ff2c00…5f69` |
| TRUST-002 | confirmed; guarantees/equipment/statistics/response/insurance claims remained. | `9b2130…ea53` |
| CONV-003 | blocked; production accounts/inbox and controlled observation remain unavailable. | `9c9db8…e112` |
| UX-002 | confirmed; File objects were previewed then discarded before mailto. | `08bdc1…f057` |
| PROD-002 | confirmed; four precise anchors had no calibration evidence. | `dd2bad…8006` |
| CONTENT-002 | confirmed; count/capability/service contradictions remained. | `095ab6…515a` |
| SEC-002 | confirmed; no application headers/server abuse boundary; deployed proof remains external. | `c21d0e…1e29` |
| OPS-002 | confirmed; operations ownership/recovery absent; private names and live drills remain blocked. | `6075ae…38e6` |
