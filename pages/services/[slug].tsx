import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import servicesData from '../../src/data/services.json'
import { CONTACT, SITE_URL } from '../../src/constants'
import { getServiceSEO } from '../../src/seo'

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

        {/* JSON-LD Schema - Server-rendered */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seo.jsonLd),
          }}
        />
      </Head>

      <div className="min-h-screen bg-stone-100 dark:bg-slate-900">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary via-primary-dark to-slate-800 text-white py-16">
          <div className="container mx-auto px-4">
            <nav className="mb-8 text-sm">
              <Link href="/" className="hover:text-emerald-300 transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/services" className="hover:text-emerald-300 transition-colors">
                Services
              </Link>
              <span className="mx-2">/</span>
              <span className="text-emerald-300">{service.title}</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.hero_headline}</h1>
            <p className="text-xl text-emerald-100">{service.hero_sub}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Pain Point */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-card p-8 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                The Problem
              </h2>
              <p className="text-lg text-slate-700 dark:text-slate-300">{service.pain_point}</p>
            </div>

            {/* Solution */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-card p-8 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Our Solution
              </h2>
              <p className="text-lg text-slate-700 dark:text-slate-300">{service.solution}</p>
            </div>

            {/* Benefits */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-card p-8 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Key Benefits
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-700 dark:text-slate-300">{service.benefit_1}</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-700 dark:text-slate-300">{service.benefit_2}</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-700 dark:text-slate-300">{service.benefit_3}</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg shadow-lg p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="mb-6 text-emerald-100">
                Call us today for a free consultation and quote
              </p>
              <a
                href={`tel:${CONTACT.phoneRaw}`}
                className="inline-block bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
              >
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
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
