"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { 
  AlertCircle, 
  CheckCircle, 
  Loader2, 
  ArrowRight, 
  ArrowLeft,
  TreeDeciduous,
  Scissors,
  Hammer,
  Zap,
  Leaf,
  HelpCircle,
  MapPin,
  MessageSquare,
  User,
  Mail,
  Phone,
  ShieldCheck,
  LucideIcon
} from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FloatingLabelInput } from "@/components/ui/FloatingLabelInput";
import { CONTACT } from "@/lib/constants";
import emailjs from "@emailjs/browser";
import { cn } from "@/lib/utils";
import { dmSerif } from "@/lib/fonts";

// ── Env vars ────────────────────────────────────────────────────────────────
const SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? "";

const EMAILJS_CONFIGURED = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

// ── Types & Schemas ─────────────────────────────────────────────────────────
const schema = z.object({
  service_type: z.string().min(1, { message: "Please select a service." }),
  address:      z.string().optional(),
  message:      z.string().optional(),
  user_name:    z.string().trim().min(1, { message: "Name is required." }),
  user_email:   z.string().trim().email({ message: "Please enter a valid email." }),
  user_phone:   z.string()
    .transform(val => val.replace(/\D/g, ""))
    .refine(val => val.length >= 10, { message: "Please enter a valid 10-digit phone number." }),
});

type FormValues = z.infer<typeof schema>;

type Step = 1 | 2 | 3;

interface ServiceOption {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
}

export interface MultiStepContactFormProps {
  initialValues?: Partial<FormValues>;
  trackingData?: {
    source?: string;
    city?: string;
    neighborhood?: string;
    risk?: string;
    score?: string;
    task?: string;
    archetype?: string;
    species?: string;
    [key: string]: string | undefined;
  };
}

const SERVICES: ServiceOption[] = [
  { id: "Tree Removal", label: "Removal", icon: TreeDeciduous, description: "Safe removal of dead or hazardous trees." },
  { id: "Pruning / Trimming", label: "Pruning", icon: Scissors, description: "Structural pruning and canopy cleaning." },
  { id: "Stump Grinding", label: "Stumps", icon: Hammer, description: "Full removal of unsightly tree stumps." },
  { id: "Storm Damage", label: "Emergency", icon: Zap, description: "Rapid response for storm-damaged trees." },
  { id: "Plant Health / EAB", label: "Health", icon: Leaf, description: "Emerald Ash Borer and disease treatments." },
  { id: "Other", label: "Not Sure", icon: HelpCircle, description: "General inquiry or custom tree care needs." },
];

export function MultiStepContactForm({ initialValues, trackingData }: MultiStepContactFormProps = {}) {
  const [step, setStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | "config_error" | null>(null);
  const [missingKeys, setMissingKeys] = useState<string[]>([]);
  const [isPreparing, setIsPreparing] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ 
    resolver: zodResolver(schema),
    defaultValues: {
      service_type: initialValues?.service_type || "",
      address: initialValues?.address || "",
      message: initialValues?.message || "",
      user_name: initialValues?.user_name || "",
      user_email: initialValues?.user_email || "",
      user_phone: initialValues?.user_phone || "",
    }
  });

  const selectedService = watch("service_type");

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormValues)[] = [];
    if (step === 1) fieldsToValidate = ["service_type"];
    if (step === 2) fieldsToValidate = ["address"];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      if (step === 1) {
        setIsPreparing(true);
        setTimeout(() => {
          setIsPreparing(false);
          setStep(2);
        }, 800);
      } else {
        setStep((s) => (s + 1) as Step);
      }
    }
  };

  const prevStep = () => setStep((s) => (s - 1) as Step);

  const onSubmit = async (data: FormValues) => {
    // Validate EmailJS Config
    const missing = [];
    if (!SERVICE_ID) missing.push("NEXT_PUBLIC_EMAILJS_SERVICE_ID");
    if (!TEMPLATE_ID) missing.push("NEXT_PUBLIC_EMAILJS_TEMPLATE_ID");
    if (!PUBLIC_KEY) missing.push("NEXT_PUBLIC_EMAILJS_PUBLIC_KEY");

    if (missing.length > 0) {
      setMissingKeys(missing);
      setSubmitStatus("config_error");
      return;
    }

    setIsSubmitting(true);
    try {
      await emailjs.send(
        SERVICE_ID, 
        TEMPLATE_ID, 
        {
          user_name:    data.user_name.trim(),
          user_email:   data.user_email.trim(),
          user_phone:   data.user_phone, // already transformed
          service_type: data.service_type?.trim() || "Not specified",
          message:      data.message?.trim()      || "No description provided",
          address:      data.address?.trim()      || "Not provided",
          // Include tracking data in payload
          city:         trackingData?.city         ?? "Not specified",
          neighborhood: trackingData?.neighborhood ?? "Not specified",
          source:       trackingData?.source       ?? "Website Contact Form",
          risk_level:   trackingData?.risk         ?? "Not assessed",
          risk_score:   trackingData?.score        ?? "N/A",
          task_name:    trackingData?.task         ?? "Not specified",
          archetype:    trackingData?.archetype    ?? "None",
          species:      trackingData?.species      ?? "None",
        }, 
        PUBLIC_KEY
      );
      setSubmitStatus("success");
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Success State ──────────────────────────────────────────────────────────
  if (submitStatus === "success") {
    return (
      <div className="animate-fade-in flex flex-col items-center py-12 px-6 text-center">
        <div className="mb-6 rounded-full bg-emerald-100 p-4">
          <CheckCircle className="h-12 w-12 text-emerald-600" />
        </div>
        <h3 className={`${dmSerif.className} mb-3 text-3xl text-forest`}>Estimate Request Sent</h3>
        <p className="mb-8 max-w-sm text-stone-600">
          Thanks for choosing Midwest Roots. Andrew is reviewing your details and will call you within a few hours.
        </p>
        <button
          onClick={() => {
            setSubmitStatus(null);
            setStep(1);
            reset();
          }}
          className="font-bold text-forest hover:underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 h-1.5 w-full bg-stone-100">
        <div 
          className="h-full bg-gold transition-all duration-500 ease-out"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      <div className="p-8 pt-10">
        {/* Header Section */}
        <div className="mb-8">
          <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#52796f]">
            Step {step} of 3
          </span>
          <h2 className={`${dmSerif.className} text-3xl text-forest`}>
            {step === 1 && "What can we help you with?"}
            {step === 2 && "Tell us about the project"}
            {step === 3 && "Where should we send the estimate?"}
          </h2>
          <p className="mt-2 text-sm text-stone-500">
            {step === 1 && "Select the primary service you're interested in."}
            {step === 2 && "Details about your trees. Address is helpful but optional."}
            {step === 3 && "Secure contact information for your custom proposal."}
          </p>
        </div>

        {submitStatus === "error" && (
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
            <p className="text-sm text-red-700">
              Something went wrong. Please call us at <strong>{CONTACT.phone}</strong>.
            </p>
          </div>
        )}

        {submitStatus === "config_error" && (
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
            <p className="text-sm text-red-700">
              Missing EmailJS configuration: <strong>{missingKeys.join(", ")}</strong>.
            </p>
          </div>
        )}

        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {/* Inject dynamic initial value if not in standard list */}
              {initialValues?.service_type && !SERVICES.find(s => s.id === initialValues.service_type) && (
                <button
                  type="button"
                  onClick={() => {
                    setValue("service_type", initialValues.service_type as string);
                    nextStep();
                  }}
                  className={cn(
                    "group flex flex-col items-center rounded-xl border-2 p-4 transition-all hover:shadow-md",
                    selectedService === initialValues.service_type 
                      ? "border-gold bg-gold/5" 
                      : "border-emerald-100 bg-emerald-50/30 hover:border-emerald-200"
                  )}
                >
                  <div className={cn(
                    "mb-3 rounded-full p-3 transition-colors",
                    selectedService === initialValues.service_type ? "bg-gold text-forest" : "bg-emerald-50 text-emerald-600"
                  )}>
                    <HelpCircle size={24} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-tight text-center text-forest leading-tight">
                    {initialValues.service_type}
                  </span>
                </button>
              )}

              {SERVICES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setValue("service_type", s.id);
                    nextStep();
                  }}
                  className={cn(
                    "group flex flex-col items-center rounded-xl border-2 p-4 transition-all hover:shadow-md",
                    selectedService === s.id 
                      ? "border-gold bg-gold/5" 
                      : "border-stone-100 bg-white hover:border-stone-200"
                  )}
                >
                  <div className={cn(
                    "mb-3 rounded-full p-3 transition-colors",
                    selectedService === s.id ? "bg-gold text-forest" : "bg-stone-50 text-stone-400 group-hover:bg-stone-100"
                  )}>
                    <s.icon size={24} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-tight text-center text-forest leading-tight">{s.label}</span>
                </button>
              ))}
            </div>
            {errors.service_type && (
              <p className="text-center text-xs text-red-500">{errors.service_type.message}</p>
            )}
          </div>
        )}

        {/* Step 2: Property & Details */}
        {step === 2 && (
          <div className="animate-fade-in space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-4 top-[1.15rem] z-10 text-stone-400" size={18} />
                <FloatingLabelInput
                  id="address"
                  label="Property Address (Optional)"
                  className="pl-12"
                  labelInset="left-12"
                  error={errors.address?.message}
                  {...register("address")}
                />
              </div>

              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 z-10 text-stone-400" size={18} />
                <textarea
                  id="message"
                  placeholder="Additional details (e.g. 'Backyard oak near fence')"
                  rows={4}
                  className="w-full rounded-lg border border-slate-300 pl-12 pr-4 py-4 text-sm transition-all focus:border-[#52796f] focus:ring-2 focus:ring-[#52796f]/20 focus:outline-none"
                  {...register("message")}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={prevStep}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-stone-200 py-4 text-sm font-bold text-stone-600 transition-colors hover:bg-stone-50"
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="flex flex-[2] items-center justify-center gap-2 rounded-lg bg-forest py-4 text-sm font-bold text-white transition-all hover:bg-forest-deep"
              >
                Continue <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Contact Info */}
        {step === 3 && (
          <form onSubmit={handleSubmit(onSubmit)} className="animate-fade-in space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-[1.15rem] z-10 text-stone-400" size={18} />
                <FloatingLabelInput
                  id="user_name"
                  label="Your Name"
                  className="pl-12"
                  labelInset="left-12"
                  error={errors.user_name?.message}
                  {...register("user_name")}
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-[1.15rem] z-10 text-stone-400" size={18} />
                <FloatingLabelInput
                  id="user_email"
                  label="Email Address"
                  className="pl-12"
                  labelInset="left-12"
                  error={errors.user_email?.message}
                  {...register("user_email")}
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-4 top-[1.15rem] z-10 text-stone-400" size={18} />
                <FloatingLabelInput
                  id="user_phone"
                  label="Phone Number"
                  className="pl-12"
                  labelInset="left-12"
                  error={errors.user_phone?.message}
                  {...register("user_phone")}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={prevStep}
                disabled={isSubmitting}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-stone-200 py-4 text-sm font-bold text-stone-600 transition-colors hover:bg-stone-50 disabled:opacity-50"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex flex-[2] items-center justify-center gap-2 rounded-lg bg-gold py-4 text-sm font-bold text-forest transition-all hover:bg-amber-400 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Request My Estimate <ShieldCheck size={18} />
                  </>
                )}
              </button>
            </div>
            
            <p className="text-center text-[10px] text-stone-400 uppercase tracking-widest font-bold">
              Secure Submission · Omaha Certified Arborist
            </p>
          </form>
        )}

        {/* Preparation Overlay */}
        {isPreparing && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm animate-fade-in">
            <Loader2 className="mb-4 h-10 w-10 animate-spin text-[#52796f]" />
            <p className="font-bold text-forest tracking-tight">Preparing your estimate...</p>
            <p className="mt-1 text-xs text-stone-500">Customizing the consultation for your needs</p>
          </div>
        )}

      </div>
    </div>
  );
}
