# Midwest Roots Tree Services — omahatreecare.com

Next.js 16.2.6 App Router website for Midwest Roots Tree Services, including five no-account homeowner screening and planning tools.

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

The lead API deliberately fails closed unless a durable, access-restricted directory is configured:

```dotenv
LEAD_STORE_DIR=/absolute/path/on-durable-storage
LEAD_DELIVERY_WEBHOOK_URL=
LEAD_DELIVERY_TOKEN=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

`LEAD_STORE_DIR` must survive deployments and instance replacement. A default Vercel function filesystem is not durable and must not be used as the production store. Until production storage, routing, destination, and labeled delivery tests are complete, the site is not release-ready for lead capture. Do not put secrets or production lead data in logs, commits, or revision artifacts.

## Lead lifecycle

- `/api/leads` validates size and schema, applies a honeypot and burst limit, and writes an idempotent first-party record before returning a receipt.
- The accepted first-party record—not an analytics event—is the source of truth for receipt and qualification.
- Unconverted records carry a 12-month delete-or-anonymize date. Access is restricted to the owner and explicitly authorized operators.
- Records begin as `delivery: pending`. The server attempts the configured authenticated webhook with the receipt as its idempotency key and marks provider acknowledgment; failed delivery stays pending and emits an operator-visible signal. Production retry automation remains a release gate.
- Labeled tests, obvious spam, duplicates, requests without a return contact method, implausible needs, and out-of-area inquiries are excluded from qualified-lead counts.

## Tool and product boundaries

The hazard tool is a preliminary screening based on self-reported observations, not an on-site inspection or diagnosis. Numeric cost output is an uncalibrated broad planning range, not a quote. The photo workflow opens a draft only; the homeowner must attach and send files manually.

Business identity, routing policy, service area, pricing status, analytics identifiers, tool copy, authority disclaimers, and bounded feature flags live in `src/lib/site-config.ts`. Midwest Roots remains the default. This is a reusable boundary, not tenancy or SaaS infrastructure.

PWA/service-worker support has been removed. The product remains an ordinary responsive, install-free website. A deployment operator must verify that `/sw.js` is no longer served and that previously installed service workers no longer control clients before release.

A future managed-embed pilot is intentionally deferred until the local release gates close. Before any build, the owner must name the buyer, fee and support boundary, content/liability review owner, update mechanism, lead destination, privacy roles, and exit plan. Pilot success means one paying company completes agreed homeowner journeys, receives accepted leads without loss or duplication during the trial, and explicitly chooses renewal; those thresholds are not evidence that a broader SaaS market exists.

See [OPERATIONS_SOP.md](OPERATIONS_SOP.md) for drills, ownership, retention, incident handling, and external release gates.
