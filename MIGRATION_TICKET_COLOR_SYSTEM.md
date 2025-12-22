# MIGRATION TICKET: Color System - Refactor 'cream' to 'surface.warm'

**Ticket ID:** #COLOR-SYS-2025-001
**Status:** TRACKED
**Priority:** MEDIUM
**Category:** Design System / Refactoring

## Context
The project is migrating from a legacy 'cream' color scale to a semantic 'surface.warm' token. Both currently share the same hex value (`#f5efe0`), but the 'cream' scale is deprecated.

## Audit Results (As of 2025-12-22)

### 1. Components to be Refactored
These components have internal logic or prop types referencing 'cream' variants/backgrounds:
- [ ] `src/components/PageHero.tsx`: Refactor `variant="cream"` to use `surface.warm`.
- [ ] `src/components/sections/IconBulletList.tsx`: Refactor `background="cream"` to use `surface.warm`.
- [ ] `src/components/sections/ThreeUpCards.tsx`: Refactor `background="cream"` to use `surface.warm`.
- [ ] `src/components/sections/TextWithImage.tsx`: Refactor `background="cream"` to use `surface.warm`.
- [ ] `src/components/sections/ProcessSteps.tsx`: Refactor `background="cream"` to use `surface.warm`.
- [ ] `src/components/sections/FAQAccordion.tsx`: Refactor `background="cream"` to use `surface.warm`.
- [ ] `src/components/sections/CTASection.tsx`: Refactor `variant="subtle"` (which uses `bg-cream-100`).

### 2. Pages to be Refactored
- [ ] `pages/services/[slug].tsx`: Uses `Section variant="warm"` (which maps to `bg-surface-warm`), but nested components might still pass "cream" strings if props weren't updated.
- [ ] `pages/tree-consultation-omaha-old.tsx`: (Note: This file appears to be removed or moved; verify if it still exists in any legacy folders).

### 3. Global Files
- [ ] `src/constants.ts`: Remove/rename `cream` and `creamLight` hex constants.
- [ ] `tailwind.config.js`: Remove the `cream` color object once refactoring is complete.

### 4. Documentation
The following docs need updates to reflect the semantic naming:
- `docs/PAGE_LAYOUT_CHECKLIST.md`
- `docs/VISUAL-BRANDING-GUIDE.md`
- `COLOR-SYSTEM.md`
- `MASTER-PLAYBOOK.md`

## Audit Script Results (Codebase Scan)
- `background="cream"`: Found in `FAQAccordion.tsx`, `IconBulletList.tsx`, `ProcessSteps.tsx`, `TextWithImage.tsx`, `ThreeUpCards.tsx`.
- `variant="cream"`: Found in `PageHero.tsx`.
- `bg-cream-100`: Found in multiple section components and `CTASection.tsx`.
- `border-cream-300`: Found in `PageHero.tsx` and `CTASection.tsx`.

## Next Steps
1. Update `tailwind.config.js` TODO to link to this ticket.
2. Schedule a coordinated PR to update props in components and usages in pages.
3. Finalize by removing 'cream' from tailwind config.
