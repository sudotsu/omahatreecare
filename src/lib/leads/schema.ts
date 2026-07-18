import { z } from "zod";

export const leadSchema = z.object({
  idempotencyKey: z.string().trim().min(16).max(128).regex(/^[a-zA-Z0-9_-]+$/),
  user_name: z.string().trim().min(1).max(100),
  user_email: z.union([z.literal(""), z.string().trim().email().max(254)]).default(""),
  user_phone: z.string().transform((value) => value.replace(/\D/g, "")).refine((value) => value === "" || value.length >= 10, "Invalid phone number"),
  service_type: z.string().trim().min(1).max(100),
  message: z.string().trim().min(3).max(4000),
  address: z.string().trim().max(300).default(""),
  source: z.string().trim().min(1).max(100).default("website"),
  attribution: z.record(z.string(), z.string().max(200)).default({}),
  website: z.string().max(0).default(""),
}).refine((lead) => Boolean(lead.user_email || lead.user_phone), {
  message: "Provide an email address or phone number",
  path: ["user_email"],
});

export type LeadInput = z.infer<typeof leadSchema>;

export function isQualifiedLead(lead: LeadInput) {
  const isTest = /PROJECT TEARDOWN TEST|DO NOT CONTACT/i.test(`${lead.user_name} ${lead.message}`);
  const plausibleNeed = lead.service_type !== "Other" || lead.message.length >= 12;
  const nearby = !lead.address || /\b(NE|IA|Omaha|Bellevue|Papillion|Ralston|Gretna|Elkhorn|Bennington|Council Bluffs)\b/i.test(lead.address);
  return !isTest && plausibleNeed && nearby && Boolean(lead.user_email || lead.user_phone);
}
