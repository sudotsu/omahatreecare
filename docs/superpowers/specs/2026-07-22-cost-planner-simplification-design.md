# Cost Planner Simplification — Design

**Date:** 2026-07-22
**Status:** Approved (pending spec review)
**Scope:** Loosen the tree-removal cost planner and its shared pricing data so it stays deliberately ballpark, matches how Midwest Roots actually operates, and reduces on-screen density — without inventing any new pricing.

## Problem

The cost planner (`/tools/cost`) and the published article now share one pricing source (`src/data/tree-removal-pricing.ts`), so their numbers can no longer drift. But three things push past the owner's "as loose and ballpark as possible while still useful" intent:

1. **Seven height bands (20/30/40/50/60/70/80 ft) imply false precision.** A homeowner cannot distinguish a 60 ft tree from a 70 ft tree by eye, so offering seven distinct dollar ranges promises accuracy the input can't support.
2. **Cleanup and stump inputs misrepresent the business.** Cleanup/hauling is always included (no customer has ever declined it), so asking is noise. Stump grinding is a *separate* service the owner only runs when several stumps are queued (the grinder rents at $400/day); presenting a per-tree stump toggle invites an expectation that usually won't be met.
3. **The tool is visually busy.** The per-driver influence chips add analytical texture that fights the "loose" goal.

## Goals

- Collapse height to **4 buckets everywhere** (module → article table → tool).
- Remove the cleanup and stump *inputs*; state cleanup as an included baseline and stump as a separate service.
- Remove the on-screen driver chips (keep the plain-language position summary).
- Keep a single source of truth. No invented dollar figures — all bucket ranges are derived from already-approved band numbers.

## Non-Goals (YAGNI)

- No new pricing math, multipliers, or dollar add-ons for access/condition/cleanup/stump.
- No change to the qualitative "position in range" engine logic.
- No redesign of the contact flow or lead CTA.
- Do **not** delete the `drivers` computation from the engine — it stays so the chips can be restored later; we simply stop rendering them.

## Data Model: the 4 buckets (derived)

Replace the seven-entry `TREE_REMOVAL_HEIGHT_RANGES` with four. Each bucket's `min`/`max` is the lowest/highest of the bands it absorbs — no new numbers.

| id | toolLabel | articleLabel | min | max | absorbs |
|---|---|---|---|---|---|
| `small` | Small (~under 25 ft) | Small — under 25 ft (ornamentals, small evergreens) | 350 | 780 | old 20 |
| `medium` | Medium (~25–45 ft) | Medium — about 25–45 ft | 820 | 1330 | old 30 + 40 |
| `large` | Large (~45–65 ft) | Large — about 45–65 ft | 1040 | 1740 | old 50 + 60 |
| `very-large` | Very large (~65 ft+) | Very large — about 65 ft and up | 1260 | 2160 | old 70 + 80 |

`driver` copy per bucket (short, describes what tends to drive that size):
- small: "Simple ground-level cuts, minimal material"
- medium: "Moderate canopy, some rigging and lowering"
- large: "Heavier limbs, more rigging, larger crew"
- very-large: "Sectional removal near targets, specialized equipment"

Unchanged: `TREE_REMOVAL_MARKET_SUMMARY` (typical $1,500; most jobs $900–$2,200), `TREE_REMOVAL_PRICING_YEAR` (2025), the "unsure → broad benchmark" path, and `getTreeRemovalPlanningAssessment` logic. `TREE_REMOVAL_ARTICLE_ROWS` continues to derive from the array, so the article table becomes 4 rows automatically.

## Component Changes

### 1. `src/data/tree-removal-pricing.ts`
- Swap the 7 band entries for the 4 buckets above. Types (`TreeRemovalHeightId`, etc.) update automatically.
- Everything else untouched.

### 2. `src/data/treehouse/tree-removal-cost.ts` (article)
- Cost table auto-collapses to 4 rows (already maps from the module — no manual edit).
- Rewrite the stump-grinding FAQ answer to match practice:
  > "Stump grinding is a separate service we schedule when there are several to do, not a standard part of a single-tree removal — ask us if you need it, especially if you have more than one stump."
- FAQ count stays 10; sources stay 7.

### 3. `src/components/tools/CostEstimator.tsx` (tool)
- Height input renders the 4 buckets + "I'm not sure" (auto from module; grid tightens).
- **Remove** the cleanup input (`CLEANUP_CHOICES`, `CleanupChoice`, its state, its ChoiceGroup, its worksheet row, its scope card).
- **Remove** the stump input (`STUMP_CHOICES`, `StumpChoice`, its state, its ChoiceGroup, its worksheet row, its scope card, the `stump` contact-query param).
- Inputs drop from 6 to 4 (height, access, drop zone, condition). Update "6 practical inputs" → "4", "N of 6 complete" → "N of 4", `canCalculate` follows the reduced answer set.
- **Cleanup baseline:** add a stated fact in the intro and result ("Cleanup and hauling are included as standard").
- **Stump note:** replace the stump scope card with a one-line note: "Stump grinding is a separate service, not part of a standard removal — ask us if you have several."
- **Remove the "What shaped this result" driver-chip section** (the grid mapping `assessment.drivers`) and the `DRIVER_STYLES`/`DRIVER_LABELS` maps if now unused. Keep the headline `positionLabel` + `explanation`, the utility/emergency alerts, the worksheet, and the CTA.
- Worksheet text: drop the cleanup/stump answer rows and the "WHAT SHAPED THE RESULT" driver block; add static "Cleanup & hauling: included" and "Stump grinding: separate service" lines. Keep the range, position label, answers, and disclaimers.

### 4. `src/data/tree-removal-pricing.test.ts`
- Update `heightId: "50"` → `"large"` and `heightId: "40"` → `"medium"` (and any asserted range values to the corresponding bucket min/max).
- The article-rows equality test needs no change (auto-derives).
- Driver assertions stay valid (engine unchanged, still 3 drivers).

## Data Flow

Unchanged in shape: `PlannerAnswers` (now 4 fields) → `getTreeRemovalPlanningAssessment(inputs)` → `{ range, position, positionLabel, explanation, drivers, requiresUtilityReview, hasUrgentWarningSigns }`. The result screen renders range + position + explanation + alerts + worksheet; `drivers` is computed but no longer displayed on screen.

## Error / Edge Handling (unchanged behavior)

- `heightId: "unsure"` → broad benchmark ($900–$2,200), no bucket.
- `targets: "utilities"` or `condition: "urgent"` → "no responsible online average," route to in-person review.
- Unknown height id still throws (guards against stale ids after the collapse).

## Testing / Verification

- `npm run typecheck` clean (band-id type change ripples through consumers).
- `npx vitest run src/data/tree-removal-pricing.test.ts src/data/treehouse/articles.test.ts` green.
- `npx eslint` clean on the three changed source files + test.
- Drive the tool in the browser: 4 height buckets render; a normal job shows a bucket range + position; an "unsure" job shows the broad benchmark; a "utilities"/"urgent" job shows the site-review result; worksheet copy/print reflects the removed inputs and the new cleanup/stump lines.
- Spot-check the published article page: cost table shows 4 rows; stump FAQ reads the new wording.

## Files Touched

- `src/data/tree-removal-pricing.ts` (buckets)
- `src/data/treehouse/tree-removal-cost.ts` (stump FAQ; table auto-updates)
- `src/components/tools/CostEstimator.tsx` (inputs, chips, copy, worksheet)
- `src/data/tree-removal-pricing.test.ts` (band-id references)
