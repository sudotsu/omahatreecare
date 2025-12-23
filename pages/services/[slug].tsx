/**
 * Service Detail Page (REFACTORED)
 *
 * Architectural Intent:
 * 1. Resolved IDE "Red" selection by using 'import type' for Next.js interfaces.
 * 2. Integrated 'TRUST_SIGNALS' and 'Badge' primitives to shift from generic text to verified standards.
 * 3. Utilized 'Section' and 'Container' hierarchy to enforce design system spacing.
 * 4. Implemented 'Lucide' icons directly within data structures to satisfy 'unused' import warnings.
 */

import { PageHero } from "@/components/PageHero";
import { Badge, Button, Card, Container, Grid, Input, Section } from "@/components/primitives";
import { QuickPhoneCTA, TextWithImage } from "@/components/sections";
import { CONTACT, TRUST_SIGNALS } from "@/constants";
import servicesData from "@/data/services.json";
import { submitLeadForm, validateFormData, type FormSubmissionData } from "@/lib/emailjs";
import { getServiceSEO } from "@/seo";
import { ArrowRight, Award, Check, Clock, ShieldAlert } from "lucide-react";
import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useState } from "react";

interface ServiceData {
  title: string;
  slug: string;
  meta_desc: string;
  hero_headline: string;
  hero_sub: string;
  pain_point: string;
  solution: string;
  benefit_1: string;
  benefit_2: string;
  benefit_3: string;
  is_emergency?: boolean;
}

interface ServicePageProps {
  service: ServiceData;
}

export default function ServicePage({ service }: ServicePageProps) {
  const seo = getServiceSEO(service);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleInquiry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const emailData: FormSubmissionData = {
      from_name: String(formData.get("name") || ""),
      from_phone: String(formData.get("phone") || ""),
      service_type: service.title,
      form_location: `Service Detail: ${service.slug}`,
    };
    const validation = validateFormData(emailData);
    if (!validation.isValid) {
      setSubmitStatus({ type: "error", text: validation.error || "Check inputs" });
      setIsSubmitting(false);
      return;
    }

    const result = await submitLeadForm(emailData);
    setSubmitStatus({ type: result.success ? "success" : "error", text: result.message });
    setIsSubmitting(false);
    if (result.success) e.currentTarget.reset();
  };

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.metaDescription} />
        <link rel="canonical" href={seo.canonical} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:site_name" content={CONTACT.businessName} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }}
        />
      </Head>

      <PageHero
        eyebrow={service.is_emergency ? "24/7 Emergency Dispatch" : "Professional Omaha Care"}
        title={service.hero_headline}
        description={service.hero_sub}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title, href: "#" },
        ]}
        // Fix: Use "dark" for emergency to avoid type error, or update PageHeroProps
        variant={service.is_emergency ? "dark" : "default"}
      />

      <Section variant={service.is_emergency ? "default" : "warm"} spacing="lg">
        <Container>
          <Grid cols={service.is_emergency ? 1 : 2} gap="xl" className="items-center">
            <TextWithImage
              title={`Why ${service.title} Matters`}
              content={
                <div className="space-y-6">
                  <p className="text-lg text-neutral-700 leading-relaxed">{service.pain_point}</p>
                  {service.is_emergency && (
                    <Card className="p-4 bg-alert-50 border-alert-100 flex items-start gap-3">
                      <ShieldAlert className="w-6 h-6 text-alert-600 shrink-0" />
                      <p className="text-sm font-bold text-alert-900 uppercase tracking-tight">
                        Hazardous conditions detected. Immediate arborist intervention recommended.
                      </p>
                    </Card>
                  )}
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="neutral">Fully Insured $2M</Badge>
                    <Badge variant="steel">{TRUST_SIGNALS.certificationShort} Standards</Badge>
                  </div>
                </div>
              }
              imageSrc={`/images/services/${service.slug}-hazard.webp`}
              imageAlt={`${service.title} complications in Omaha`}
              imagePosition="right"
            />

            {!service.is_emergency && (
              <Card className="p-6 bg-white shadow-2xl border-t-4 border-primary-600">
                <h3 className="text-xl font-bold mb-4">Quick {service.title} Inquiry</h3>
                <form onSubmit={handleInquiry} className="space-y-4">
                  <Input name="name" placeholder="Your Name" required disabled={isSubmitting} />
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    required
                    disabled={isSubmitting}
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Request Quote"}{" "}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  {submitStatus && (
                    <p
                      role="status"
                      className={`text-xs mt-2 font-bold ${submitStatus.type === "success" ? "text-green-600" : "text-alert-600"}`}
                    >
                      {submitStatus.text}
                    </p>
                  )}
                </form>
              </Card>
            )}
          </Grid>
        </Container>
      </Section>

      <Section variant="default" spacing="xl">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-neutral-900 uppercase tracking-tighter">
              The Midwest Roots Advantage
            </h2>
            <div className="h-1.5 w-24 bg-primary-600 mx-auto mt-4" />
          </div>

          <Grid cols={3} gap="lg">
            <Card hover className="p-8 border-b-4 border-primary-500">
              <Check className="w-10 h-10 text-primary-600 mb-6" />
              <h3 className="text-xl font-bold mb-3">{service.benefit_1}</h3>
              <p className="text-neutral-600 leading-relaxed">
                Precision equipment combined with local expertise to mitigate property liability.
              </p>
            </Card>
            <Card hover className="p-8 border-b-4 border-primary-500">
              <Award className="w-10 h-10 text-primary-600 mb-6" />
              <h3 className="text-xl font-bold mb-3">{service.benefit_2}</h3>
              <p className="text-neutral-600 leading-relaxed">
                Adherence to {TRUST_SIGNALS.certification} ensures long-term structural integrity.
              </p>
            </Card>
            <Card hover className="p-8 border-b-4 border-primary-500">
              <Clock className="w-10 h-10 text-primary-600 mb-6" />
              <h3 className="text-xl font-bold mb-3">{service.benefit_3}</h3>
              <p className="text-neutral-600 leading-relaxed">
                Transparent communication from dispatch to debris removal. No hidden fees.
              </p>
            </Card>
          </Grid>
        </Container>
      </Section>

      <QuickPhoneCTA
        title={
          service.is_emergency ? "Emergency Dispatch Active" : `Get a Free ${service.title} Quote`
        }
        description={
          service.is_emergency
            ? "Storm response crews are currently prioritized for Omaha."
            : "Contact Andrew directly for a no-pressure evaluation."
        }
        variant={service.is_emergency ? "emergency" : "primary"}
      />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const services = Object.values(servicesData) as ServiceData[];
  const paths = services.map((service: ServiceData) => ({
    params: { slug: service.slug },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<ServicePageProps> = async ({ params }) => {
  const services = Object.values(servicesData) as ServiceData[];
  const service = services.find((s: ServiceData) => s.slug === params?.slug);

  if (!service) return { notFound: true };
  return { props: { service } };
};
