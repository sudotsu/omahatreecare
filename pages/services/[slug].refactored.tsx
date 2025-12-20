/**
 * Service Detail Page (REFACTORED)
 *
 * Uses standardized PageHero + section patterns.
 * Replace [slug].tsx with this once approved.
 */

import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import servicesData from '../../src/data/services.json'
import { CONTACT, SITE_URL } from '../../src/constants'
import { getServiceSEO } from '../../src/seo'
import { PageHero } from '../../src/components/PageHero'
import { TextWithImage, IconBulletList, QuickPhoneCTA } from '../../src/components/sections'
import { Container, Section, Card } from '../../src/components/primitives'
import { Check } from 'lucide-react'

interface ServiceData {
  title: string
  slug: string
  meta_desc: string
  hero_headline: string
  hero_sub: string
  pain_point: string
  solution: string
  benefit_1: string
  benefit_2: string
  benefit_3: string
}

interface ServicePageProps {
  service: ServiceData
}

export default function ServicePage({ service }: ServicePageProps) {
  const seo = getServiceSEO(service)

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.metaDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={seo.canonical} />

        {/* OpenGraph */}
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seo.canonical} />
        <meta property="og:image" content={`${SITE_URL}/images/og-image.jpg`} />
        <meta property="og:site_name" content={CONTACT.businessName} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.metaDescription} />
        <meta name="twitter:image" content={`${SITE_URL}/images/og-image.jpg`} />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seo.jsonLd),
          }}
        />
      </Head>

      {/* PageHero - Standardized hero with breadcrumbs */}
      <PageHero
        eyebrow={service.title}
        title={service.hero_headline}
        description={service.hero_sub}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
        ]}
        variant="default"
      />

      {/* Pain Point Section - Using TextWithImage pattern */}
      <TextWithImage
        eyebrow="The Problem"
        title="Common Challenges Homeowners Face"
        content={
          <div className="space-y-4">
            <p>{service.pain_point}</p>
          </div>
        }
        imageSrc={undefined} // TODO: Add service-specific image
        imageAlt={`${service.title} challenge illustration`}
        imagePosition="right"
        background="white"
      />

      {/* Solution Section - Using TextWithImage (reversed) */}
      <TextWithImage
        eyebrow="Our Solution"
        title="How We Help"
        content={
          <div className="space-y-4">
            <p>{service.solution}</p>
          </div>
        }
        imageSrc={undefined} // TODO: Add solution/process image
        imageAlt={`${service.title} solution`}
        imagePosition="left"
        background="cream"
      />

      {/* Benefits Section - Using IconBulletList pattern */}
      <IconBulletList
        title="Key Benefits"
        description={`When you choose ${CONTACT.businessName} for ${service.title.toLowerCase()}, you get:`}
        items={[
          {
            title: service.benefit_1,
            description: 'Professional-grade equipment and techniques ensure safe, efficient work.',
          },
          {
            title: service.benefit_2,
            description: 'Our experienced team handles projects of all sizes with care and precision.',
          },
          {
            title: service.benefit_3,
            description: 'Transparent pricing and honest recommendations you can trust.',
          },
        ]}
        background="white"
        iconVariant="check"
      />

      {/* CTA Section */}
      <QuickPhoneCTA
        title={`Ready for ${service.title}?`}
        description="Call us today for a free consultation and quote"
        variant="primary"
      />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = Object.keys(servicesData)

  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<ServicePageProps> = async ({ params }) => {
  const slug = params?.slug as string
  const service = servicesData[slug as keyof typeof servicesData]

  if (!service) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      service,
    },
  }
}
