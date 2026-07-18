# Midwest Roots Lead Operations Runbook

## Ownership and access

- System owner: Midwest Roots owner.
- Backup owner: must be explicitly named before production release.
- Authorized access: owner and explicitly authorized operators only. Review access whenever an operator joins, leaves, or changes role, and at least quarterly.
- Production PostgreSQL provider/project, migration owner, application role, delivery provider/account, destination inbox, alert destination, and escalation contact must be recorded in the private operations system; never put credentials here.

## Acceptance, qualification, and analytics

The first-party record returned by `/api/leads` is the receipt source of truth. A qualified lead has a valid return contact method, plausible tree-service need, reasonable service-area fit, successful server acceptance, and is not a labeled test, obvious spam, or duplicate. Analytics supports attribution only. Event names are `tool_start`, `tool_complete`, and `tool_cta`; events include the tool slug and no contact data.

## Daily handling

1. Review accepted records and pending delivery states.
2. Reconcile duplicate receipt IDs before contacting anyone.
3. Confirm that any downstream destination has the complete request and receipt ID.
4. Escalate a growing pending queue or acceptance failures to the owner; do not show success for a failed write.

## Labeled test-lead drill

Use exactly `PROJECT TEARDOWN TEST — DO NOT CONTACT` in the name or message and obvious placeholder contact data. Submit one test per distinct transport, not duplicates for coverage. Record timestamp, route/source, server receipt, downstream provider acknowledgment, destination, received fields, attribution, and duplicate count without copying secrets or customer data. Labeled tests must remain excluded from qualified-lead reporting.

## Provider-outage drill

In a non-production or controlled environment, disable downstream delivery while leaving durable first-party storage available. Verify that the request receives a stable receipt, remains `pending`, and creates an operator-visible structured signal. Then disable the durable store and verify the homeowner receives a safe failure with the phone fallback and no success receipt. Record recovery steps and prove pending records are delivered once after restoration.

## PostgreSQL deployment and persistence drill

1. Provision a Postgres-compatible database and transaction-pooled TLS connection string supported by the Vercel runtime.
2. Run `psql "$DATABASE_URL" --set ON_ERROR_STOP=1 --file migrations/001_create_lead_records.sql` once with a migration role. Do not run migrations from request handling.
3. Create or select a separate application role with `USAGE` on `public` and only `SELECT`, `INSERT`, and `UPDATE` on `public.lead_records`.
4. Set server-only `DATABASE_URL` and `LEAD_STORAGE_ADAPTER=postgres` for the intended Vercel environment. Do not configure `LEAD_STORE_DIR` as a production fallback.
5. Submit one labeled lead and confirm the response receipt matches the persisted row. Verify the idempotency digest is stored, not the raw key; payload and attribution are present; qualification and `pending` delivery state are correct; and the retention deadline is later than acceptance.
6. Submit the same idempotency key sequentially and concurrently. Confirm one row, one receipt, one first acceptance, and duplicate responses for the rest.
7. Disable database access and verify HTTP 503, no receipt, redacted failure logging, and the phone fallback. Restore access before continuing.
8. Disable downstream delivery while keeping Postgres available. Confirm acceptance succeeds and delivery stays `pending`. Resend duplicate API submissions with the same original client idempotency key and confirm they return the original receipt without another lead row. Separately retry webhook delivery with `receiptId` as the delivery idempotency key and confirm the destination receives it once.
9. Record the exact deployment, database, migration identifier, timestamps, and sanitized results in the private operations system.

## Retention, deletion, and access requests

Unconverted first-party leads are deleted or anonymized after 12 months. Converted customer records may follow a separate documented business-record policy. For a deletion request, verify the requester through a safe channel, locate records by receipt/contact details, record the action without retaining unnecessary data, delete or anonymize across the first-party store and downstream processors, and confirm completion. Document any active-customer, dispute, security, or other legitimate hold and review it rather than retaining indefinitely.

## Incident, rollback, and provider rotation

- Acceptance failure: preserve the fail-closed response and phone fallback; investigate `DATABASE_URL`, TLS/pooler reachability, migration state, application-role privileges, and database availability.
- Delivery backlog: keep accepted records, stop claiming routed delivery, alert the owner, restore the provider, and replay idempotently.
- Spam burst: preserve accessible ordinary use, inspect redacted rate-limit signals, and adjust controls only with regression tests.
- Credential exposure: revoke/rotate in the provider, update private deployment configuration, redeploy, and confirm old credentials fail.
- Rollback: roll back executable code only when the previous version preserves safe acceptance; never roll back to browser-only EmailJS or the false receipt path.

## Release gates

Release remains blocked until the PostgreSQL migration and Vercel configuration are applied and exercised; production delivery is configured; a backup owner and private destinations are named; controlled acceptance/delivery/failure/concurrent-duplicate tests pass; deployed security headers are captured; stale service-worker control is cleared; safety and biological content receive appropriate independent professional review; and defining journeys receive real-device, non-Chromium, and NVDA or VoiceOver coverage.
