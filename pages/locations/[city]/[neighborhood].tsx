import fs from "fs";
import { Award, HardHat, MapPin, Phone, ShieldCheck } from "lucide-react";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import path from "path";
import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Container,
  Grid,
  Modal,
  Section,
} from "../../../src/components/primitives";
import { CONTACT, SITE_URL } from "../../../src/constants";
import locationsData from "../../../src/data/locations.json";
import { LocationData } from "../../../types/location-page";
import { submitLeadForm, validateFormData, type FormSubmissionData } from "../../../src/lib/emailjs";

interface LocationPageProps {
  data: LocationData;
}

/**
 * Neighborhood Landing Page Template
 * Strategy: "Resident, not Tourist" hyper-local SEO
 * UX: Dual-State (Emergency Distress + Routine Research)
 * Forms: EmailJS integration for quote requests
 */
export default function NeighborhoodPage({ data }: LocationPageProps) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteFormData, setQuoteFormData] = useState({
    name: '',
    phone: '',
    address: `${data.identifiers.neighborhoodName}, ${data.identifiers.cityName}`,
    service: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage(null);

    // Prepare data for EmailJS
    const emailData: FormSubmissionData = {
      from_name: quoteFormData.name,
      from_phone: quoteFormData.phone,
      address: quoteFormData.address,
      service_type: quoteFormData.service || 'General tree service inquiry',
      form_location: `Neighborhood Page - ${data.identifiers.neighborhoodName}, ${data.identifiers.cityName}`,
    };

    // Validate form data
    const validation = validateFormData(emailData);
    if (!validation.isValid) {
      setSubmitMessage({ type: 'error', text: validation.error! });
      return;
    }

    // Submit to EmailJS
    setIsSubmitting(true);
    const result = await submitLeadForm(emailData);
    setIsSubmitting(false);

    if (result.success) {
      setSubmitMessage({ type: 'success', text: result.message });
      // Clear form on success
      setQuoteFormData({
        name: '',
        phone: '',
        address: `${data.identifiers.neighborhoodName}, ${data.identifiers.cityName}`,
        service: '',
      });
      // Close modal after 3 seconds
      setTimeout(() => {
        setIsQuoteModalOpen(false);
        setSubmitMessage(null);
      }, 3000);
    } else {
      setSubmitMessage({ type: 'error', text: result.message });
    }
  };

  // Generate Schema.org JSON-LD
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: CONTACT.businessName,
    description: `Professional tree care services in ${data.identifiers.neighborhoodName}, ${data.identifiers.cityName}, ${data.identifiers.stateCode}`,
    telephone: CONTACT.phoneRaw,
    email: CONTACT.email,
    // Physical HQ address (NOT neighborhood-specific)
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.streetAddress,
      addressLocality: CONTACT.addressLocality,
      addressRegion: CONTACT.addressRegion,
      postalCode: CONTACT.postalCode,
      addressCountry: CONTACT.addressCountry,
    },
    // HQ geo coordinates (NOT neighborhood-specific)
    geo: {
      "@type": "GeoCoordinates",
      latitude: CONTACT.latitude,
      longitude: CONTACT.longitude,
    },
    areaServed: data.identifiers.zipCodes.map((zip) => ({
      "@type": "PostalAddress",
      postalCode: zip,
      addressLocality: data.identifiers.cityName,
      addressRegion: data.identifiers.stateCode,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Tree Care Services",
      itemListElement: data.services
        .filter((s) => s.isAvailable)
        .map((service, idx) => ({
          "@type": "Offer",
          position: idx + 1,
          itemOffered: {
            "@type": "Service",
            name: service.name,
            url: `${SITE_URL}/services/${service.slug}`,
          },
        })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.aeoContent.commonProblems.map((problem) => ({
      "@type": "Question",
      name: problem.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: problem.answer,
      },
    })),
  };

  return (
    <>
      <Head>
        <title>{data.seo.metaTitle}</title>
        <meta name="description" content={data.seo.metaDescription} />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href={`${SITE_URL}/locations/${data.identifiers.cityName.toLowerCase()}/${data.identifiers.slug}`}
        />

        {/* OpenGraph */}
        <meta property="og:title" content={data.seo.metaTitle} />
        <meta property="og:description" content={data.seo.metaDescription} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${SITE_URL}/locations/${data.identifiers.cityName.toLowerCase()}/${data.identifiers.slug}`}
        />
        <meta property="og:image" content={`${SITE_URL}/images/og-image.jpg`} />

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <div className="min-h-screen">
        {/* Hero Section - Emergency State (Dark, High Contrast) */}
        <Section className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-steel-800 text-white pt-32 pb-20">
          <Container>
            {/* Breadcrumb Navigation */}
            <nav className="mb-8 text-sm text-neutral-300">
              <Link href="/" className="hover:text-primary-400 transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/locations" className="hover:text-primary-400 transition-colors">
                Service Areas
              </Link>
              <span className="mx-2">/</span>
              <Link
                href={`/locations/${data.identifiers.cityName.toLowerCase()}`}
                className="hover:text-primary-400 transition-colors"
              >
                {data.identifiers.cityName}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-primary-400">{data.identifiers.neighborhoodName}</span>
            </nav>

            {/* Hero Content */}
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold text-neutral-50 mb-6 leading-tight">
                {data.content.heroTitle}
              </h1>
              <p className="text-xl md:text-2xl text-neutral-200 mb-10 leading-relaxed">
                {data.content.heroDescription}
              </p>

              {/* Dual-State CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Emergency CTA (High Contrast) */}
                <a href={`tel:${CONTACT.phoneRaw}`} className="block sm:w-auto">
                  <Button
                    variant="emergency"
                    className="w-full sm:w-auto flex items-center justify-center gap-3 text-lg py-6 px-8 min-h-[44px]"
                  >
                    <Phone size={20} />
                    Call Now: {CONTACT.phone}
                  </Button>
                </a>

                {/* Routine Research CTA (Modal Trigger) */}
                <Button
                  variant="ghost"
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 text-lg py-6 px-8 border-2 border-neutral-300 text-neutral-50 hover:bg-neutral-800 min-h-[44px]"
                >
                  Get Free Quote
                </Button>
              </div>
            </div>
          </Container>
        </Section>

        {/* Resident Signals Section - "We Know This Area" */}
        <Section className="bg-neutral-50 dark:bg-neutral-950 py-16">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-8 h-8 text-primary-600" />
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
                  We Know {data.identifiers.neighborhoodName}
                </h2>
              </div>

              <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-8">
                We&apos;re not just &quot;serving the area&quot; — we work in{" "}
                {data.identifiers.neighborhoodName} regularly. Here&apos;s proof we know the
                neighborhood:
              </p>

              <Grid cols={2} gap="md" className="mb-8">
                {/* Local Landmarks */}
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-4">
                    Local Landmarks We Know
                  </h3>
                  <ul className="space-y-2">
                    {data.residentSignals.localLandmarks.map((landmark, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300"
                      >
                        <span className="text-primary-600 mt-1">•</span>
                        <span>{landmark}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Proximity Tips */}
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-4">
                    Parking & Access Tips
                  </h3>
                  <ul className="space-y-2">
                    {data.residentSignals.proximityTips.map((tip, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300"
                      >
                        <span className="text-steel-600 mt-1">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Grid>

              {/* Local Vernacular */}
              {data.residentSignals.localVernacular.length > 0 && (
                <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-lg border border-primary-200 dark:border-primary-700">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-3">
                    Local Names You&apos;ll Hear Us Use
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.residentSignals.localVernacular.map((term, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-200 rounded-full text-sm font-medium"
                      >
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Container>
        </Section>

        {/* Visual Trust Section - Safety & Team (with Grid) */}
        <Section className="bg-white dark:bg-neutral-900 py-16">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
                  Safety-First Team You Can Trust
                </h2>
                <p className="text-xl text-neutral-600 dark:text-neutral-400">
                  ISA Certified Arborists • $2M Liability Insurance • OSHA Compliant
                </p>
              </div>

              <Grid cols={3} gap="lg">
                {/* Card 1: Safety Equipment */}
                <div className="bg-neutral-50 dark:bg-neutral-800 p-8 rounded-lg border border-neutral-200 dark:border-neutral-700 text-center">
                  <div className="w-16 h-16 bg-alert-100 dark:bg-alert-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HardHat className="w-8 h-8 text-alert-600" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 mb-2">
                    Full PPE
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Hard hats, hi-vis vests, steel-toe boots on every job
                  </p>
                  {/* Placeholder for future image */}
                  <div className="mt-4 text-xs text-neutral-500 italic">
                    {/* Image: Crew in full PPE (Hard hats, Hi-Vis) */}
                  </div>
                </div>

                {/* Card 2: Certifications */}
                <div className="bg-neutral-50 dark:bg-neutral-800 p-8 rounded-lg border border-neutral-200 dark:border-neutral-700 text-center">
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 mb-2">
                    ISA Certified
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    International Society of Arboriculture trained professionals
                  </p>
                </div>

                {/* Card 3: Insurance */}
                <div className="bg-neutral-50 dark:bg-neutral-800 p-8 rounded-lg border border-neutral-200 dark:border-neutral-700 text-center">
                  <div className="w-16 h-16 bg-steel-100 dark:bg-steel-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="w-8 h-8 text-steel-600" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 mb-2">
                    $2M Insurance
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Your property is protected during every tree removal or trim
                  </p>
                </div>
              </Grid>
            </div>
          </Container>
        </Section>

        {/* AEO Section - FAQ with Accordion */}
        <Section className="bg-steel-50 dark:bg-steel-900/20 py-16">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-4 text-center">
                Common Tree Care Questions in {data.identifiers.neighborhoodName}
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-12 text-center">
                These are the questions we get most often from homeowners in your neighborhood
              </p>

              <Accordion>
                {data.aeoContent.commonProblems.map((problem, idx) => (
                  <AccordionItem key={idx} title={problem.question}>
                    <p>{problem.answer}</p>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Container>
        </Section>

        {/* Services Available Section */}
        <Section className="bg-white dark:bg-neutral-900 py-16">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-8 text-center">
                Services Available in {data.identifiers.neighborhoodName}
              </h2>

              <Grid cols={3} gap="md">
                {data.services
                  .filter((s) => s.isAvailable)
                  .map((service, idx) => (
                    <Link
                      key={idx}
                      href={`/services/${service.slug}`}
                      className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-primary-500 transition-all group"
                    >
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 group-hover:text-primary-600 transition-colors">
                        {service.name}
                      </h3>
                    </Link>
                  ))}
              </Grid>
            </div>
          </Container>
        </Section>

        {/* Final CTA Section */}
        <Section className="bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 py-20">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-primary-100 mb-10">
                Call now for same-day service or request a free quote
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={`tel:${CONTACT.phoneRaw}`} className="block">
                  <Button
                    variant="emergency"
                    className="w-full sm:w-auto flex items-center justify-center gap-3 text-lg py-6 px-8 min-h-[44px]"
                  >
                    <Phone size={20} />
                    Call {CONTACT.phone}
                  </Button>
                </a>

                <Button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="w-full sm:w-auto bg-white text-primary-600 hover:bg-primary-50 flex items-center justify-center gap-3 text-lg py-6 px-8 min-h-[44px]"
                >
                  Get Free Quote
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </div>

      {/* Quote Request Modal */}
      <Modal
        isOpen={isQuoteModalOpen}
        onClose={() => {
          setIsQuoteModalOpen(false);
          setSubmitMessage(null);
        }}
        title="Request Free Quote"
      >
        <form onSubmit={handleQuoteSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Name *</label>
            <input
              type="text"
              value={quoteFormData.name}
              onChange={(e) => setQuoteFormData({ ...quoteFormData, name: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
              disabled={isSubmitting}
              placeholder="John Smith"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Phone *</label>
            <input
              type="tel"
              value={quoteFormData.phone}
              onChange={(e) => setQuoteFormData({ ...quoteFormData, phone: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
              disabled={isSubmitting}
              placeholder="(402) 555-1234"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Address *</label>
            <input
              type="text"
              value={quoteFormData.address}
              onChange={(e) => setQuoteFormData({ ...quoteFormData, address: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Service Needed
            </label>
            <select
              value={quoteFormData.service}
              onChange={(e) => setQuoteFormData({ ...quoteFormData, service: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              disabled={isSubmitting}
            >
              <option value="">Select a service...</option>
              {data.services
                .filter((s) => s.isAvailable)
                .map((service, idx) => (
                  <option key={idx} value={service.name}>
                    {service.name}
                  </option>
                ))}
            </select>
          </div>

          {submitMessage && (
            <div
              className={`p-3 rounded-lg text-sm font-medium ${
                submitMessage.type === 'success'
                  ? 'bg-primary-100 border border-primary-500 text-primary-900'
                  : 'bg-alert-100 border border-alert-500 text-alert-900'
              }`}
            >
              {submitMessage.text}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Submit Request'}
          </Button>

          <p className="text-xs text-center text-neutral-600">
            We&apos;ll contact you within 24 hours. No spam, no pressure.
          </p>
        </form>
      </Modal>
    </>
  );
}

/**
 * GetStaticPaths - Preserve existing routes
 * Copied from legacy file to keep all 24 neighborhood pages live
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const paths: { params: { city: string; neighborhood: string } }[] = [];

  // Generate paths from locations.json (same as legacy)
  Object.entries(locationsData).forEach(([city, cityData]: [string, any]) => {
    if (Array.isArray(cityData)) {
      cityData.forEach((neighborhood: string) => {
        paths.push({
          params: {
            city,
            neighborhood,
          },
        });
      });
    }
  });

  return {
    paths,
    fallback: false,
  };
};

/**
 * GetStaticProps - Hybrid Import Strategy
 * Tries to load neighborhood-specific JSON, falls back to mock data if not found
 * This allows gradual migration from mock to real data without breaking builds
 */
export const getStaticProps: GetStaticProps<LocationPageProps> = async ({ params }) => {
  const city = params?.city as string;
  const neighborhood = params?.neighborhood as string;

  let data: LocationData;

  try {
    // Attempt to load neighborhood-specific JSON file
    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      "neighborhoods",
      `${city}-${neighborhood}.json`,
    );
    const raw = fs.readFileSync(filePath, "utf8");
    data = JSON.parse(raw) as LocationData;
    console.log(`✅ Loaded real data for ${city}-${neighborhood}`);
  } catch (error) {
    // Fallback to mock data if JSON file doesn't exist yet
    console.log(`⚠️  No data file for ${city}-${neighborhood}, using mock data`);

    // Mock LocationData - Fallback for neighborhoods without JSON files
    data = {
      identifiers: {
        neighborhoodName: "Dundee",
        cityName: "Omaha",
        stateCode: "NE",
        slug: "dundee",
        zipCodes: ["68132"],
        coordinates: {
          latitude: 41.2565,
          longitude: -95.9345,
        },
      },
      seo: {
        metaTitle: "Tree Service in Dundee Omaha | Emergency Tree Removal & Trimming",
        metaDescription:
          "Professional tree removal, trimming, and emergency service in Dundee. ISA Certified Arborists serving Memorial Park, Underwood Ave, and surrounding areas. Call (402) 812-3294.",
      },
      content: {
        heroTitle: "Tree Service in Dundee You Can Trust",
        heroDescription:
          "We work in Dundee regularly — from Memorial Park to Underwood Ave. ISA Certified Arborists with $2M insurance, same-day emergency service available.",
        primaryServiceFocus: "Emergency Tree Removal",
      },
      services: [
        { name: "Tree Removal", slug: "tree-removal", isAvailable: true },
        { name: "Tree Trimming & Pruning", slug: "tree-trimming", isAvailable: true },
        { name: "Stump Grinding", slug: "stump-grinding", isAvailable: true },
        { name: "Emergency Storm Damage", slug: "emergency-tree-service", isAvailable: true },
      ],
      residentSignals: {
        localLandmarks: [
          "Memorial Park (we trim the oaks along the east side regularly)",
          "Dundee Elementary School (know the drop-off/pickup traffic patterns)",
          "Underwood Ave commercial district (tight parking, we plan accordingly)",
        ],
        proximityTips: [
          "We park behind the library on 50th Street when meters are full",
          "Avoid scheduling during Dundee Dell lunch rush (11:30am-1pm) if access is tight",
          "Happy Hollow can flood after heavy rain - we check before bringing heavy equipment",
        ],
        localVernacular: ["Happy Hollow", "The Dell", "Memorial Park Loop"],
      },
      aeoContent: {
        commonProblems: [
          {
            question: "Why are so many mature oaks dying in Dundee?",
            answer:
              'Dundee has a lot of 80-100 year old bur oaks and red oaks. Many are experiencing "oak decline" - a combination of age, soil compaction from development, and stress from drought cycles. We can assess if your oak is salvageable with proper care or if removal is safer.',
          },
          {
            question: "Can you work around the power lines near Underwood Ave?",
            answer:
              "Yes. We are certified to work near power lines and coordinate with OPPD when needed. Many Dundee properties have lines running through tree canopies - we know how to prune safely without cutting power to the block.",
          },
          {
            question: "What should I do if a branch falls during a storm?",
            answer:
              "Call us immediately at (402) 812-3294. We offer 24/7 emergency service. If the branch is on a power line, call OPPD first (402-536-5400), then call us to remove it safely once power is secured. Do not touch fallen branches near wires.",
          },
        ],
      },
    };
  }

  return {
    props: {
      data,
    },
  };
};
