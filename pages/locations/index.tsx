import Head from 'next/head'
import Link from 'next/link'
import locationsData from '@/data/locations.json'
import { CONTACT } from '@/constants'

export default function LocationsIndexPage() {
  const pageTitle = `Service Areas | ${CONTACT.businessName}`
  const metaDescription = `Professional tree services across Omaha and surrounding areas. We serve ${Object.keys(locationsData).join(', ')} and more.`
  const canonicalUrl = `${CONTACT.siteUrl}/locations`

  const cities = Object.keys(locationsData)

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
              Our Service Areas
            </h1>
            <p className="text-xl text-primary-100">
              Professional tree care across Omaha and surrounding communities
            </p>
          </div>
        </div>

        {/* Cities Grid */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cities.map((city) => {
                const neighborhoods = locationsData[city as keyof typeof locationsData]
                const cityName = city
                  .split('-')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')

                return (
                  <Link
                    key={city}
                    href={`/locations/${city}`}
                    className="block bg-white dark:bg-slate-800 rounded-lg shadow-card p-6 hover:shadow-lg transition-shadow"
                  >
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {cityName}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      {neighborhoods.length} neighborhoods served
                    </p>
                    <div className="text-primary-600 dark:text-primary-400 font-semibold flex items-center gap-2">
                      View Areas
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
                )
              })}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="container mx-auto px-4 pb-12">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Serving Your Community</h2>
            <p className="mb-6 text-primary-100">
              Local tree care experts who know your neighborhood
            </p>
            <a
              href={`tel:${CONTACT.phoneRaw}`}
              className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
