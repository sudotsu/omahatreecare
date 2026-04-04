"use client";

import { useSearchParams } from "next/navigation";
import { MultiStepContactForm } from "@/components/forms/MultiStepContactForm";

export function ContactFormWrapper() {
  const searchParams = useSearchParams();

  // Extract params for initial form values
  const initialValues = {
    service_type: searchParams.get("task") || searchParams.get("service") || "",
  };

  // Extract params for tracking/analytics
  const trackingData = {
    source:    searchParams.get("source")    || "direct",
    city:      searchParams.get("city")      || undefined,
    neighborhood: searchParams.get("neighborhood") || undefined,
    risk:      searchParams.get("risk")      || undefined,
    score:     searchParams.get("score")     || undefined,
    task:      searchParams.get("task")      || undefined,
    archetype: searchParams.get("archetype") || undefined,
    species:   searchParams.get("species")   || undefined,
  };

  return (
    <MultiStepContactForm 
      initialValues={initialValues} 
      trackingData={trackingData} 
    />
  );
}
