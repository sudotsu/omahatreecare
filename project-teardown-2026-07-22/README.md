# Project Teardown

<!-- Generated from findings.json by scripts/render_readme.py. Do not edit generated metadata manually. -->

**Project:** sudotsu/omahatreecare
**Audited revision:** be301ac133149d31133a9a52d093fd94b2e2c90e
**Review status:** provisional
**Core workflows fully exercised:** no
**Total findings:** 17
**Generated at:** 2026-07-22T23:30:00Z

## Start here

1. Read [00-executive-verdict.md](00-executive-verdict.md) for the overall judgment and completion limits.
2. Read [05-findings-register.md](05-findings-register.md) for the generated human view of every finding.
3. Read [06-implementation-sequence.md](06-implementation-sequence.md) for dependency-aware ordering.
4. Read [07-review-coverage.md](07-review-coverage.md) for tested, partial, blocked, and unverified surfaces.
5. Read [08-claims-inventory.md](08-claims-inventory.md) for credential, safety, guarantee, expertise, pricing, privacy, and capability claims.
6. Use [findings.json](findings.json) as the canonical machine handoff for project-revision.

## Highest-priority findings

- **OPS-001 — Production lead delivery remains an external release gate** (high, blocked, blocked)
- **A11Y-001 — Representative pages fail automated contrast, heading, and link-distinction checks** (medium, open, defect-conclusively-demonstrated)
- **A11Y-002 — Navigation and species interactions have keyboard and accessible-name gaps** (medium, open, defect-conclusively-demonstrated)
- **ARCH-001 — Tool routes render duplicate global and tool-specific site shells** (medium, open, defect-conclusively-demonstrated)
- **DOC-001 — Public and internal claims have drifted from verified behavior** (medium, open, source-only)

## Finding summary

- critical: 0
- high: 1
- medium: 9
- low: 5
- informational: 2

- open: 13
- blocked: 2
- decision-required: 0
- accepted-risk: 0
- retained: 2

## Validation

Run the project-report validator after generating the views:

```bash
python3 <skill-directory>/scripts/render_findings.py <project-teardown-directory>
python3 <skill-directory>/scripts/render_readme.py <project-teardown-directory>
python3 <skill-directory>/scripts/validate_teardown.py <project-teardown-directory>
```

Validator success proves structural and cross-file consistency, not that the audit was substantively complete.
