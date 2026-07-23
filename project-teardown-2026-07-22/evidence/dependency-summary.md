# Dependency and Maintainability Evidence Summary

## Current and verified patch path

- Audited: Next.js 16.2.6, eslint-config-next 16.2.1, React 19.2.4.
- Current primary advisories report the two Next.js issues fixed in 16.2.11:
  - <https://github.com/advisories/GHSA-6gpp-xcg3-4w24>
  - <https://github.com/advisories/GHSA-m99w-x7hq-7vfj>
- Official release: <https://github.com/vercel/next.js/releases/tag/v16.2.11>
- A disposable install of Next.js 16.2.11 and eslint-config-next 16.2.11 passed typecheck, lint with the same pre-existing warnings, all 36 unit tests, the production webpack build, and all 11 Chromium end-to-end tests.
- No middleware/proxy, Next i18n configuration, Turbopack production build, or Server Actions were found, so the documented triggers for the two Next advisories were not identified in this source tree.

## Residual sharp advisory

- Advisory: <https://github.com/advisories/GHSA-f88m-g3jw-g9cj>.
- The patch begins at sharp 0.35.0. Next 16.2.11 currently declares sharp `^0.34.5`, so forcing 0.35 would be outside its declared range.
- No user image upload was found. Current Next Image sources are local trusted assets. `remotePatterns` permits omahatreecare.com and midwestroots.info, but no current external image use was found.
- Recommended posture: patch Next now; do not silently override sharp; remove unused remote allowlists; document trusted-only image input; monitor the first supported Next release that pulls sharp 0.35 or later.

## Clean-install package tree

`npm ls --depth=0` exited successfully but displayed five optional wasm/native helper packages as extraneous after a clean npm install: `@emnapi/core`, `@emnapi/runtime`, `@emnapi/wasi-threads`, `@napi-rs/wasm-runtime`, and `@tybys/wasm-util`. These are associated with optional image-processing dependency paths and were treated as npm tree information, not an application defect.

## Dead-code scan

Knip plus direct usage searches identified these unused files:

- `deprecated/ContactForm.v1.tsx`
- `src/app/page.module.css`
- `src/components/forms/FastQuoteWidget.tsx`
- `src/components/tools/EmailCaptureModal.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/NumberCounter.tsx`

Unused direct dependencies:

- `@base-ui/react`
- `class-variance-authority`
- `zustand`

The first two packages are only referenced by the unused button component; no Zustand import was found. Additional symbols are either truly dead or needlessly exported, including `AuthorBox`, `assessmentQuestions`, `fallbackNeighborhoodData`, several constants, and internal helper exports. Deletion remains an implementation action requiring scope confirmation; nothing was removed during this audit.
