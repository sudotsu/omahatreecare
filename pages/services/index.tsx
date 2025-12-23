/**
 * Services Index Page (REFACTORED)
 *
 * Uses standardized PageHero + section patterns for consistent layout.
 * Replace the current index.tsx with this file once approved.
 */

<<<<<<< Updated upstream
import Head from 'next/head'
import Link from 'next/link'
import servicesData from '@/data/services.json'
import { CONTACT } from '@/constants'
import { PageHero } from '@/components/PageHero'
import { ThreeUpCards, QuickPhoneCTA } from '@/components/sections'
import { ArrowRight } from 'lucide-react'
=======
import Head from "next/head";
import { PageHero } from "../../src/components/PageHero";
import { QuickPhoneCTA, ThreeUpCards } from "../../src/components/sections";
import { CONTACT } from "../../src/constants";
import servicesData from "../../src/data/services.json";
>>>>>>> Stashed changes

export default function ServicesIndexPage() {
  const pageTitle = `Our Services | ${CONTACT.businessName}`;
  const metaDescription = `Professional tree services in Omaha: removal, trimming, health assessment, and winter prep. Expert care for your trees. Call ${CONTACT.phone}.`;
  const canonicalUrl = `${CONTACT.siteUrl}/services`;

  const services = Object.values(servicesData);

  // Transform services data for ThreeUpCards component
  const serviceCards = services.map((service) => ({
    title: service.title,
    description: service.meta_desc,
    link: {
      href: `/services/${service.slug}`,
      label: "Learn More",
    },
  }));

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        {/* OpenGraph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${CONTACT.siteUrl}/images/og-image.jpg`} />
      </Head>

      {/* PageHero - Standardized hero section */}
      <PageHero
        eyebrow="Services"
        title="Professional Tree Services"
        description="Expert care for your trees in Omaha and surrounding areas. From emergency removal to routine maintenance, we've got you covered."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
        variant="default"
      />

      {/* Services Grid - Using ThreeUpCards pattern */}
      <ThreeUpCards
        title="Our Core Services"
        description="We offer comprehensive tree care solutions for residential and commercial properties throughout the Omaha metro area."
        cards={serviceCards}
        background="white"
        cardVariant="feature"
      />

      {/* CTA Section - Using QuickPhoneCTA pattern */}
      <QuickPhoneCTA
        title="Need Expert Tree Care?"
        description="Call today for a free consultation and quote"
        variant="primary"
      />
    </>
  );
}
