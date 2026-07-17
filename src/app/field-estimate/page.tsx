import type { Metadata } from "next";
import { FieldEstimate } from "./FieldEstimate";

export const metadata: Metadata = {
  title: "Field Estimate",
  description: "Private, local-first estimate builder for Midwest Roots Tree Services.",
  robots: { index: false, follow: false, nocache: true },
  manifest: "/field-estimate-manifest.json",
};

export default function FieldEstimatePage() {
  return <FieldEstimate />;
}
