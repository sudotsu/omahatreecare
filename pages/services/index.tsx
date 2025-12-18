import Head from 'next/head'
import Link from 'next/link'
import servicesData from '../../src/data/services.json'
import { CONTACT } from '../../src/constants'

export default function ServicesIndexPage() {
  const pageTitle = `Our Services | ${CONTACT.businessName}`
  const metaDescription = `Professional tree services in Omaha: removal, trimming, health assessment, and winter prep. Expert care for your trees. Call ${CONTACT.phone}.`
  const canonicalUrl = `${CONTACT.siteUrl}/services`

  const services = Object.values(servicesData)

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

      <div className="min-h-screen bg-stone-100 dark:bg-slate-900">
        {/* Hero */}
        <div className="bg-gradient-to-br from-primary via-primary-dark to-slate-800 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Professional Tree Services
            </h1>
            <p className="text-xl text-emerald-100">
              Expert care for your trees in Omaha and surrounding areas
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="block bg-white dark:bg-slate-800 rounded-lg shadow-card p-8 hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    {service.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">{service.meta_desc}</p>
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                    Learn More
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg shadow-lg p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Need Expert Tree Care?</h2>
              <p className="mb-6 text-emerald-100">
                Call today for a free consultation and quote
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
