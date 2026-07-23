# Technical Audit

## Architecture and correctness

The App Router structure, static data, shared pricing source, lead modules, and Treehouse publication model are understandable and build cleanly. The largest architectural defect is layout ownership: the root always mounts marketing chrome while tools and field estimate also implement standalone behavior. Field estimate hides root chrome with `body:has(...)`; tools do not, producing duplicate shells (ARCH-001). Route groups should make this explicit and eliminate CSS/runtime hiding as a layout mechanism.

The dynamic tool route also gives all five components one `searchParams` interface even though only Hazard uses it. That decision accounts for several of the 13 lint warnings and one hidden suppression (BUILD-001).

The confirmed correctness defect in the core conversion path is duplicated lead validation: the homepage accepts seven phone characters, the multi-step form checks ten digits, and the API normalizes to digits then checks ten (FUNC-001).

## State, data, concurrency, and failure handling

Lead idempotency, fail-closed production storage behavior, validation limits, and storage abstraction have focused unit coverage. The system avoids the prior false-receipt behavior. Production persistence, retry, and final delivery remain blocked by external configuration and authorization (OPS-001).

Client dialog and disclosure state is local and simple, but custom focus management is incomplete. The species dialog traps focus while open yet loses the opener on close; mobile navigation has no Escape path (A11Y-002).

The one-release service-worker cleanup is carefully scoped and versioned. Its code quality is not the concern; its exit criterion is. Production evidence is required before safe removal (PWA-001).

## Dependencies, performance, and resource limits

The framework is Next.js 16.2.6 while eslint-config-next resolves to 16.2.1. A disposable aligned upgrade to 16.2.11 passed all current checks, providing a low-risk patch path (SEC-001). The remaining sharp advisory should be handled through a documented trusted-input boundary and supported upstream upgrade, not an unapproved override (SEC-002).

Knip and direct usage searches found six unused files, three unused direct dependencies, dead values, and unnecessarily public exports (CLEAN-001). The Node runtime is 22 while `@types/node` targets 20; align the type package to the supported runtime during cleanup.

Performance is not a current blocker. The homepage scored 95 and representative layouts did not overflow (PERF-001). A later trace may justify lazy-loading the below-fold estimate form, but no speculative split is required now.

## Tests, build, packaging, delivery, and configuration

From a clean clone:

- installation passed;
- typecheck passed;
- 36 unit tests passed;
- lint passed with 13 warnings;
- the webpack production build passed with 65 generated routes;
- 11 Chromium end-to-end tests passed.

This is strong syntactic completion and selected functional completion, not operational completion. CI allows unlimited warnings and lacks route invariants for duplicate shells, metadata, console errors, accessibility, keyboard behavior, and form boundaries. It only runs Chromium (TEST-001).

Installed Next.js 16 guidance confirms React Compiler is not enabled by default. The React Hook Form warning therefore does not mean the current production component is skipped by an active compiler; replacing `watch` with `useWatch` is still the right forward-compatible cleanup.

## Observability, documentation, and platform behavior

Analytics and Speed Insights are mounted unconditionally, producing Vercel endpoint 404/MIME errors under supported local production starts (OBS-001). Environment-gate the integrations and make unexpected console errors test failures.

The CSP correctly omits unsafe-eval, but Zod's default JIT mode attempts it before falling back. Configure `jitless` rather than weakening CSP (CSP-001).

Homepage metadata assumes a same-segment title template that Next.js documentation says does not apply, and it omits a canonical (META-001). A sitemap-driven metadata test should prevent recurrence.

Documentation and content have drifted across duplicated facts, including the old planner description, tool counts, and accessibility promises (DOC-001). Shared registries and a claims check are more durable than one-off copy edits.
