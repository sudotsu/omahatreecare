# Security and Reliability

This review is not a penetration test, legal opinion, safety certification, or accessibility conformance audit. Conclusions below are limited to source inspection, local behavioral tests, dependency research, and the stated environment.

## Threat-relevant surfaces and trust boundaries

The public lead API is the main data trust boundary. It accepts homeowner contact and property details, applies Zod validation and size limits, uses idempotency, persists through an adapter, and can egress to a delivery webhook. Public tools otherwise run primarily in the client and do not require accounts. The species photo workflow opens an email draft and does not upload files through the site.

The image pipeline currently consumes local trusted assets. No user-uploaded or current remote Next Image source was found. This materially limits the documented trigger for the residual sharp advisory, but configured unused remote allowlists should still be removed (SEC-002).

## Secrets, data, authentication, authorization, and egress

No committed production secret was identified in the reviewed source. Production database and delivery credentials are environment-provided. The field-estimate route is deliberately noindex and local-first but is not authenticated; treat its URL as a public tool whose browser storage can be read by anyone using that browser profile.

Lead egress and destination receipt could not be verified without authorization. The code fails closed when production storage is missing, which is a retained reliability strength, but operational delivery remains blocked (OPS-001).

## Unsafe defaults, containment, and destructive behavior

The CSP excludes unsafe-eval. The observed Zod violation should be resolved by jitless client validation, not by weakening the policy (CSP-001). The current CSP still permits inline scripts; nonce-based hardening is a larger future initiative and was not required to resolve this audit's confirmed issue.

No destructive product behavior was exercised. The retired-service-worker cleanup only targets `/sw.js` registrations and known retired caches and records completion after both chains succeed. Removal must wait for production evidence (PWA-001).

## Failure containment, recovery, portability, and operational risk

Next.js 16.2.6 is covered by two high-severity advisories. Source inspection did not find their documented prerequisites—middleware/proxy or Server Actions—and the supported 16.2.11 upgrade passed the complete current suite. Patch promptly despite low observed reachability (SEC-001).

The residual sharp advisory is conditional on malicious image input. Because the current app uses trusted local assets, it is a tracked upstream risk rather than evidence of an exploitable current route. Keep that assumption explicit and recheck it whenever upload or remote image behavior changes (SEC-002).

Repeated local Vercel script failures reduce diagnostic reliability (OBS-001). The duplicated tool shell and custom keyboard defects also show why a compiling build cannot be the sole release signal (ARCH-001, TEST-001).

## Specialized testing still required

- Authorized production lead persistence, idempotency/retry, and final destination receipt.
- Production inspection for retired service-worker registrations and caches across the agreed observation window.
- Real NVDA or VoiceOver verification, plus Firefox/WebKit and physical-device smoke tests.
- Production response-header and analytics verification on an actual Vercel deployment.
- Ongoing dependency research after each Next.js patch until sharp 0.35 or later is supported.
- A formal penetration test only if the business later requires one; this teardown does not substitute for it.
