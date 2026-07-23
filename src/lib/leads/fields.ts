import { z } from "zod";

// Shared, client-safe lead-field validation contract (FUNC-001).
//
// The two public lead forms (ContactForm and MultiStepContactForm) and the
// server lead schema previously duplicated phone/email/name rules with
// divergent boundaries — the homepage accepted a 7-character phone that the API
// rejected with a generic 400. These primitives are the single source of truth
// for that normalization and those boundaries.
//
// Policy: both public forms require a name, a valid email, and a valid
// 10-digit US phone. The server schema (./schema.ts) is intentionally a more
// permissive superset that accepts an email OR a phone, so it never rejects a
// valid public-form submission but still tolerates alternate first-party
// callers. Both layers share `normalizePhone` so a formatted number normalizes
// identically everywhere.

export const MIN_PHONE_DIGITS = 10;

/** Reduce any formatted phone input to its digits for consistent storage/validation. */
export const normalizePhone = (value: string): string => value.replace(/\D/g, "");

/** True when a phone input contains at least a full US local number. */
export const hasValidPhone = (value: string): boolean =>
  normalizePhone(value).length >= MIN_PHONE_DIGITS;

export const nameField = z
  .string()
  .trim()
  .min(1, { message: "Name is required." })
  .max(100);

export const emailField = z
  .string()
  .trim()
  .email({ message: "Please enter a valid email." })
  .max(254);

export const phoneField = z
  .string()
  .transform(normalizePhone)
  .refine((value) => value.length >= MIN_PHONE_DIGITS, {
    message: "Please enter a valid 10-digit phone number.",
  });
