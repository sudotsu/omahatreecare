# Decisions and Scope

**Project:** sudotsu/omahatreecare
**Teardown:** project-teardown-2026-07-22 (audited `be301ac`, provisional, 17 findings)
**Operating mode:** implementation (owner authorized "verify these and fix them the best way you know how")
**Implementation branch:** feat/cost-planner-simplification, working tree from `7bdd99c`

## Owner decisions and approval matrix

Three owner decisions were resolved before product edits, plus one during implementation:

1. **CLEAN-001 dead code** — Owner: *delete dead code + deps*.
2. **DOC-001 accessibility claims** — Owner: *soften both the 2-business-day SLA and the verified-AT-compatibility claim to goals/targets*.
3. **OPS-001 / PWA-001** — Owner: *mark blocked (external), proceed with everything else*.
4. **DOC-001 legacy blog** (raised during implementation) — Owner: *withhold from search (noindex + drop from sitemap) pending content review/migration*.

FUNC-001's "email-only policy" needed no owner question: both public forms already require name + email + valid phone, so aligning the client phone rule to the server's 10-digit rule changes no accepted-lead set. The chosen, documented policy is: public forms require all three; the API remains a permissive superset (email OR phone).

| Finding | Approval | Disposition |
| --- | --- | --- |
| SEC-001 | approved | implemented |
| SEC-002 | approved | implemented |
| ARCH-001 | approved | implemented |
| BUILD-001 | approved | implemented |
| FUNC-001 | approved | implemented |
| OPS-001 | approved | blocked (external) |
| A11Y-001 | approved | implemented |
| A11Y-002 | approved | implemented |
| META-001 | approved | implemented |
| OBS-001 | approved | implemented |
| CSP-001 | approved | implemented |
| DOC-001 | approved | implemented |
| CLEAN-001 | approved | implemented |
| TEST-001 | approved | implemented |
| PWA-001 | approved | blocked (external) |
| STR-001 | approved | retained |
| PERF-001 | approved | retained |

Every teardown finding is covered exactly once. 13 implemented, 2 retained strengths, 2 blocked on external evidence.

## Constraints and preserved strengths

- **STR-001** (clean reproducible pipeline) and **PERF-001** (fast homepage) are preserved. No approved work trades against either; the pipeline was kept green through every phase and strengthened by TEST-001.
- Pre-existing user work preserved: the committed prior `project-revision/` directory (an earlier Jul-18 teardown cycle) is untouched — this new artifact lives in the dated sibling `project-revision-2026-07-23/`.
- AGENTS.md constraint honored: the installed Next 16 docs (`node_modules/next/dist/docs/`) were consulted before the route-group and metadata changes.
- No commit/push performed (no authorization in this exchange).

## Blocked evidence and authority boundaries

- **OPS-001** (high): real production lead persistence/delivery requires production credentials and an authorized destination — unavailable this session. Local intake fails closed (tested). External release gate.
- **PWA-001** (low): retiring the service-worker cleanup requires a production observation window across deployed clients — unavailable this session.
- **SEC-002** residual: `npm audit` stays red on sharp `<0.35` (GHSA-f88m-g3jw-g9cj) inherited transitively via Next until a supported Next release ships sharp ≥ 0.35. No untrusted image path reaches sharp; documented and tracked via dependabot.
- **A11Y-001/A11Y-002/DOC-001**: automated axe + keyboard coverage is in place, but a real NVDA/VoiceOver pass and 200% zoom reflow review remain recommended before broad AT-compatibility claims; the accessibility statement was softened to reflect this.
- **PERF-001**: no production-field Lighthouse comparison was re-run (no Lighthouse locally); recommended post-deploy.
