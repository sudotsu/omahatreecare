# Midwest Roots Tree Services — omahatreecare.com

Next.js 16.2.11 App Router website for Midwest Roots Tree Services, including five no-account homeowner screening and planning tools.

## Local development

Use Node.js 22 and the committed lockfile:

```bash
npm ci
npm run dev
npm test
npm run typecheck
npm run lint
npm run build
```

## Required runtime configuration

Production lead acceptance uses PostgreSQL through `DATABASE_URL`. The client is initialized lazily and uses a small process-local connection pool suitable for a Vercel function connecting through a provider pooler:

```dotenv
DATABASE_URL=postgresql://application-role:secret@pooled-host/database?sslmode=require
LEAD_STORAGE_ADAPTER=postgres
LEAD_DELIVERY_WEBHOOK_URL=
LEAD_DELIVERY_TOKEN=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

`DATABASE_URL` must be a server-only Vercel environment variable; never prefix it with `NEXT_PUBLIC_`. Prefer the database provider's transaction-pooled connection string and require TLS. Production rejects the filesystem adapter even when `LEAD_STORE_DIR` is present. Missing or invalid database configuration therefore returns the homeowner-safe phone fallback without a receipt.

Local development and deterministic tests may use the filesystem adapter:

```dotenv
LEAD_STORAGE_ADAPTER=filesystem
LEAD_STORE_DIR=/absolute/local/path
```

### Database migration

Apply [migrations/001_create_lead_records.sql](migrations/001_create_lead_records.sql) once with a migration role before enabling production lead capture:

```bash
psql "$DATABASE_URL" --set ON_ERROR_STOP=1 --file migrations/001_create_lead_records.sql
```

Use a separate least-privilege application role for the deployed `DATABASE_URL`. It needs `USAGE` on schema `public` and `SELECT`, `INSERT`, and `UPDATE` on `public.lead_records`; it does not need `CREATE`, `ALTER`, `DROP`, or `DELETE`. Configure `DATABASE_URL` separately for Vercel Preview and Production, deploy, then run labeled acceptance, duplicate, concurrent-duplicate, delivery-failure, and destination-receipt checks in the intended environment. Do not put credentials or production lead data in logs, commits, or revision artifacts.

Production persistence is implemented but not yet operationally verified. Until the migration, deployment configuration, storage, routing, destination, and labeled delivery tests are complete, the site is not release-ready for lead capture.

## The Treehouse

The structured editorial section lives at `/treehouse`. See [docs/TREEHOUSE_PUBLISHING.md](docs/TREEHOUSE_PUBLISHING.md) for the article model, category rules, required publication fields, image guidance, safety review gate, and validation checklist. Draft articles and empty categories remain `noindex` and are excluded from the sitemap until approved.

## Lead lifecycle

- `/api/leads` validates size and schema, applies a honeypot and burst limit, and writes an idempotent first-party record before returning a receipt. PostgreSQL enforces idempotency with a unique SHA-256 digest; the raw client key is not stored.
- The accepted first-party record—not an analytics event—is the source of truth for receipt and qualification.
- Unconverted records carry a 12-month delete-or-anonymize date. Access is restricted to the owner and explicitly authorized operators.
- Records begin as `delivery: pending`. The server attempts the configured authenticated webhook with the receipt as its idempotency key and marks provider acknowledgment; failed delivery stays pending and emits an operator-visible signal. Production retry automation remains a release gate.
- Labeled tests, obvious spam, duplicates, requests without a return contact method, implausible needs, and out-of-area inquiries are excluded from qualified-lead counts.

## Tool and product boundaries

The hazard tool is a preliminary screening based on self-reported observations, not an on-site inspection or diagnosis. Numeric cost output is a planning range built from Midwest Roots' published 2025 height-based removal pricing (`src/data/tree-removal-pricing.ts`) with modifiers for access, condition, and site factors — a budgeting range shared with the Treehouse cost article, not a quote. The photo workflow opens a draft only; the homeowner must attach and send files manually.

Business identity, routing policy, service area, pricing status, analytics identifiers, tool copy, authority disclaimers, and bounded feature flags live in `src/lib/site-config.ts`. Midwest Roots remains the default. This bounded configuration work is complete for the local website, but the tool rules are not fully tenant-neutral or licensing-ready. Extracting all five rule sets into router-free kernels is deferred and remains required before a managed-embed pilot or broader productization.

No new PWA/service-worker support is intended; the product is meant to remain an ordinary responsive, install-free website. Legacy service-worker retirement and cleanup remain pending production verification: a deployment operator must verify that `/sw.js` is no longer served and that previously installed service workers no longer control clients before release.

A future managed-embed pilot is intentionally deferred until the local release gates close. Before any build, the owner must name the buyer, fee and support boundary, content/liability review owner, update mechanism, lead destination, privacy roles, and exit plan. Pilot success means one paying company completes agreed homeowner journeys, receives accepted leads without loss or duplication during the trial, and explicitly chooses renewal; those thresholds are not evidence that a broader SaaS market exists.

See [OPERATIONS_SOP.md](OPERATIONS_SOP.md) for drills, ownership, retention, incident handling, and external release gates.
