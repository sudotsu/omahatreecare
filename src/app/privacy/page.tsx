import type { Metadata } from "next";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = { title: "Privacy & Lead Records", description: "How Midwest Roots handles website estimate requests and emailed photos." };

export default function PrivacyPage() {
  return <main className="mx-auto max-w-3xl px-6 py-16 text-stone-700">
    <h1 className="mb-6 text-4xl font-bold text-forest">Privacy & Lead Records</h1>
    <div className="space-y-6 leading-7">
      <section><h2 className="text-2xl font-bold text-forest">Estimate requests</h2><p>We collect the contact details, service need, location details, and attribution context you submit so Midwest Roots can review and respond to the request. A website lead is accepted only when the server returns a receipt ID.</p></section>
      <section><h2 className="text-2xl font-bold text-forest">Retention and access</h2><p>Unconverted first-party lead records are retained for up to 12 months and then deleted or anonymized. Converted customer records may follow a separate legitimate business-record policy. Access is limited to the owner and explicitly authorized operators and should be reviewed when operator access changes.</p></section>
      <section><h2 className="text-2xl font-bold text-forest">Deletion requests and holds</h2><p>Email <a className="underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> to request access, correction, or deletion. A record may be retained longer only when needed for an active customer relationship, dispute, security investigation, or other documented business-record obligation.</p></section>
      <section><h2 className="text-2xl font-bold text-forest">Photos</h2><p>The website does not upload photos. If you email photos, your email provider and Midwest Roots&apos; email provider process them. Sending a photo does not grant permission to publish or reuse it; any reuse requires separate permission.</p></section>
      <section><h2 className="text-2xl font-bold text-forest">Service providers and limits</h2><p>Vercel hosts the website and provides site analytics and performance measurement. The owner-selected delivery and email providers process accepted requests only after they are configured and documented in the private operations record. Analytics must not receive form contents or direct contact information. This notice describes the intended operating policy; it is not a claim of compliance with a specific legal regime.</p></section>
    </div>
  </main>;
}
