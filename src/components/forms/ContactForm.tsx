"use client";

import "@/lib/leads/client-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle, Loader2, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FloatingLabelInput } from "@/components/ui/FloatingLabelInput";
import { CONTACT } from "@/lib/constants";
import { submitLead } from "@/lib/leads/client";
import { emailField, nameField, phoneField } from "@/lib/leads/fields";

// ── Env vars (Next.js public prefix) ─────────────────────────────────────────

const SERVICE_OPTIONS = [
  "Tree Removal",
  "Pruning / Trimming",
  "Stump Grinding",
  "Storm Damage",
  "Other / Not Sure",
];

// ── Zod schema ────────────────────────────────────────────────────────────────
// Name, email, and phone rules come from the shared client-safe lead contract
// so the homepage cannot accept a phone the API will reject (FUNC-001).
const schema = z.object({
  user_name:    nameField,
  user_email:   emailField,
  user_phone:   phoneField,
  service_type: z.string().optional(),
  message:      z.string().optional(),
  address:      z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

// ── Types ────────────────────────────────────────────────────────────────────
export interface ContactFormProps {
  initialValues?: Partial<FormValues>;
  trackingData?: {
    source?: string;
    city?: string;
    neighborhood?: string;
    risk?: string;
    score?: string;
    task?: string;
    archetype?: string;
    [key: string]: string | undefined;
  };
}

// ── Component ─────────────────────────────────────────────────────────────────
export function ContactForm({ initialValues, trackingData }: ContactFormProps = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [receiptId, setReceiptId] = useState("");
  const [idempotencyKey, setIdempotencyKey] = useState(() => crypto.randomUUID());
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitStatus === "success") successRef.current?.focus();
  }, [submitStatus]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ 
    resolver: zodResolver(schema),
    defaultValues: initialValues
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage(null);

    try {
      const result = await submitLead({
          user_name:    data.user_name,
          user_email:   data.user_email,
          user_phone:   data.user_phone,
          service_type: data.service_type?.trim() || "Not specified",
          message:      data.message?.trim()      || "No description provided",
          address:      data.address?.trim()      || "Not provided",
          source:       trackingData?.source       ?? "direct",
          attribution: Object.fromEntries(Object.entries(trackingData ?? {}).filter((entry): entry is [string, string] => Boolean(entry[1]))),
        }, idempotencyKey);
      setReceiptId(result.receiptId!);
      setSubmitStatus("success");
      reset();
    } catch (err) {
      console.error("Lead submission error:", err);
      setErrorMessage(err instanceof Error ? err.message : null);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Success state ─────────────────────────────────────────────────────────
  if (submitStatus === "success") {
    return (
      <div ref={successRef} role="status" tabIndex={-1} className="rounded-lg border border-green-200 bg-green-50 p-8 text-center shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-green-700">
        <div className="mb-4 flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-600" />
        </div>
        <h3 className="mb-2 text-2xl font-bold text-green-900">Message Received</h3>
        <p className="mb-6 text-green-800">
          Your request was safely accepted. Receipt: <strong>{receiptId}</strong>. Response timing depends on current workload.
        </p>
        <button
          onClick={() => { setSubmitStatus(null); setIdempotencyKey(crypto.randomUUID()); }}
          className="font-semibold text-green-700 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  // ── Form ──────────────────────────────────────────────────────────────────
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-lg md:p-8">
      <h2 className="mb-6 text-2xl font-bold text-slate-900">Request an Estimate</h2>

      {submitStatus === "error" && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
          <div>
            <h4 className="font-semibold text-red-900">Submission Failed</h4>
            <p className="text-sm text-red-700">
              {errorMessage ? `${errorMessage} ` : "Something went wrong. "}
              Please call us at <strong>{CONTACT.phone}</strong>.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <p className="text-sm text-slate-600">By submitting, you ask Midwest Roots to respond to this request. <a className="underline" href="/privacy">Read the privacy and 12-month lead-retention terms.</a></p>

        {/* Row 1: Name + Phone */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FloatingLabelInput
            id="user_name"
            label="Full Name"
            type="text"
            required
            error={errors.user_name?.message}
            {...register("user_name")}
          />
          <FloatingLabelInput
            id="user_phone"
            label="Phone Number"
            type="tel"
            inputMode="tel"
            required
            error={errors.user_phone?.message}
            {...register("user_phone")}
          />
        </div>

        {/* Row 2: Email */}
        <FloatingLabelInput
          id="user_email"
          label="Email Address"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          error={errors.user_email?.message}
          {...register("user_email")}
        />

        {/* Row 3: Address (optional) */}
        <FloatingLabelInput
          id="address"
          label="Property Address (Optional)"
          type="text"
          autoComplete="street-address"
          error={errors.address?.message}
          {...register("address")}
        />

        {/* Row 4: Service (select — not a floating label field) */}
        <div className="space-y-1">
          <label
            htmlFor="service_type"
            className="block text-sm font-medium text-slate-700"
          >
            Service{" "}
            <span className="font-normal text-slate-600">(Optional)</span>
          </label>
          <select
            id="service_type"
            {...register("service_type")}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 transition-all focus:border-[#52796f] focus:ring-2 focus:ring-[#52796f]/20 focus:outline-none"
          >
            <option value="">I&apos;m not sure</option>
            {initialValues?.service_type && !SERVICE_OPTIONS.includes(initialValues.service_type) && (
              <option value={initialValues.service_type}>{initialValues.service_type}</option>
            )}
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Row 5: Message (optional) */}
        <div className="space-y-1">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-slate-700"
          >
            How can we help?{" "}
            <span className="font-normal text-slate-600">(Optional)</span>
          </label>
          <textarea
            id="message"
            rows={3}
            placeholder="Leave blank if you prefer to discuss on the phone."
            {...register("message")}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 transition-all focus:border-[#52796f] focus:ring-2 focus:ring-[#52796f]/20 focus:outline-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#52796f] px-6 py-3 font-bold text-white transition-all hover:bg-[#3d5a54] hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Sending&hellip;
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              Request an Estimate
            </>
          )}
        </button>

        <p className="mt-4 text-center text-xs text-slate-600">
          Or call us directly at{" "}
          <a
            href={`tel:${CONTACT.phoneRaw}`}
            className="text-[#3d5a54] underline"
          >
            {CONTACT.phone}
          </a>
        </p>
      </form>
    </div>
  );
}
