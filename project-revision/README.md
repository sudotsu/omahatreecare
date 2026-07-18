# Project Revision

**Project:** sudotsu/omahatreecare  
**Teardown revision:** `3909e4efed404566a1b2fac3490ee9e0103a64a9`  
**Implementation start:** `b1f3c8867c8512e1e84be1c00648b86d46bc0084`  
**Implementation endpoint:** `e9211475e7aff21a4391d248e96d9fb1f130f546`  
**Revision status:** `partial`  
**Review convergence:** `passed`  
**Merge readiness:** `not-ready`  
**Release readiness:** `not-ready`

## Start here

1. [Decisions and scope](00-decisions-and-scope.md)
2. [Baseline and revalidation](01-baseline-and-revalidation.md)
3. [Dependency-aware execution plan](02-execution-plan.md)
4. [Generated implementation ledger](03-implementation-ledger.md)
5. [Verification and handoff](04-verification-and-handoff.md)

`revision.json` is the canonical structured record. This README and the implementation ledger are generated views; do not edit them manually.

## Finding dispositions

| Disposition | Count |
| --- | ---: |
| `blocked` | 11 |
| `implemented` | 13 |
| `retained` | 1 |

## Owner attention and blockers

- **CONV-001 — Replace the false fast-quote receipt with a real lead handoff:** approval `approved`, disposition `blocked` — The current head no longer mounted FastQuoteWidget, but the legacy GET receipt remained public and was contained. Final production once-only receipt remains external CONV-003 evidence.
- **SAFE-002 — Remove hazardous DIY instructions and adopt a credential-reviewed safety taxonomy:** approval `approved`, disposition `blocked` — Ladder, chainsaw, vehicle pull, felling, overhead cutting, and utility instructions were removed/reclassified, but named independent safety review has not occurred.
- **CONTENT-001 — Separate educational ailment/species guidance from diagnosis and treatment claims:** approval `approved`, disposition `blocked` — UI now states educational possibilities, uncertainty, no diagnosis, and urgent referral, but material biological/treatment entries still require authoritative sourcing and dated professional review.
- **SEO-002 — Prove unique homeowner value on programmatic location pages or consolidate them:** approval `approved`, disposition `blocked` — Owner chose to keep useful local coverage and obvious credential assertions were removed, but query/lead evidence and owner substantiation for every unique local assertion are unavailable.
- **A11Y-001 — Repair heading hierarchy and keyboard entry semantics across tools:** approval `approved`, disposition `blocked` — Skip link, one-H1 tool route semantics, and active hazard/cost focus were repaired; Firefox/WebKit and real NVDA/VoiceOver gates remain unavailable.
- **CONV-003 — Complete controlled production lead-delivery and routing verification:** approval `approved`, disposition `blocked` — Production provider/account/destination evidence is unavailable; only local labeled acceptance, duplicate, failure, and redaction behavior was exercised.
- **PROD-002 — Calibrate and truthfully present cost-estimator ranges:** approval `approved`, disposition `blocked` — Owner approved broad numeric planning ranges without blocking on missing job data; UI is truthful now, but original calibration/source/back-test criteria remain unavailable.
- **SEC-002 — Add and verify application security headers and lead-form abuse controls:** approval `approved`, disposition `blocked` — Application CSP/frame/referrer/permissions/content-type headers and server size/schema/honeypot/idempotency/rate controls were added, but distributed production abuse behavior, HSTS, provider quotas, and deployed responses remain external.
- **TECH-001 — Extract a tenant-neutral tool kernel before embedding or licensing:** approval `approved`, disposition `blocked` — A bounded default Midwest Roots configuration and pure tested hazard/lead rules exist, duplicated unused datasets were removed, but all five interactive rule sets are not yet extracted into a tenant-neutral router-free kernel.
- **PWA-001 — Decide whether offline/installable PWA behavior is a supported promise:** approval `approved`, disposition `blocked` — Serwist, service worker source/dependencies, both install manifests, and metadata links were removed; one-release cleanup unregisters workers/deletes caches, but deployed stale-client proof is external.
- **OPS-002 — Establish the production lead operations runbook and ownership model:** approval `approved`, disposition `blocked` — A complete executable public runbook structure exists, but private backup owner/destinations/provider accounts and production drills cannot be completed without owner operational access.

## Delivery state

| State | Value |
| --- | --- |
| Committed | `verified` |
| Pushed | `unverified` |
| Pull request updated | `unverified` |
| Merged | `not-performed` |

## Interpretation

Readiness is an assessment, not authorization. Consult the full verification and handoff artifact for limitations, blocked evidence, changed-path attribution, and exact delivery facts.
