import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import locationsData from '../../../src/data/locations.json'
import neighborhoodData from '../../../src/data/neighborhoodData.json'
import { CONTACT, SITE_URL } from '../../../src/constants'
import { getNeighborhoodSEO } from '../../../src/seo'

interface NeighborhoodData {
  vibe: string
  dominant_trees: string
  common_issues: string
  local_risk: string
  meta_snippet: string
  geo: {
    lat: number
    lng: number
  }
}

interface NeighborhoodPageProps {
  city: string
  cityName: string
  neighborhood: string
  neighborhoodName: string
  data: NeighborhoodData
}

export default function NeighborhoodPage({
  city,
  cityName,
  neighborhood,
  neighborhoodName,
  data,
}: NeighborhoodPageProps) {
  const seo = getNeighborhoodSEO(city, cityName, neighborhood, neighborhoodName, data)

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

        {/* JSON-LD Schema - Server-rendered */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seo.jsonLd),
          }}
        />
      </Head>

      <div className="min-h-screen bg-stone-100 dark:bg-slate-900">
        {/* Hero */}
        <div className="bg-gradient-to-br from-primary via-primary-dark to-slate-800 text-white py-16">
          <div className="container mx-auto px-4">
            <nav className="mb-8 text-sm">
              <Link href="/" className="hover:text-emerald-300 transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/locations" className="hover:text-emerald-300 transition-colors">
                Locations
              </Link>
              <span className="mx-2">/</span>
              <Link href={`/locations/${city}`} className="hover:text-emerald-300 transition-colors">
                {cityName}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-emerald-300">{neighborhoodName}</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tree Service in {neighborhoodName}
            </h1>
            <p className="text-xl text-emerald-100">{data.vibe}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Dominant Trees */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-card p-8 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Common Trees in {neighborhoodName}
              </h2>
              <p className="text-lg text-slate-700 dark:text-slate-300">{data.dominant_trees}</p>
            </div>

            {/* Common Issues */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-card p-8 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Common Tree Issues Here
              </h2>
              <p className="text-lg text-slate-700 dark:text-slate-300">{data.common_issues}</p>
            </div>

            {/* Local Risk */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-8 mb-8">
              <div className="flex items-start gap-4">
                <svg
                  className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <div>
                  <h2 className="text-xl font-bold text-amber-900 dark:text-amber-200 mb-2">
                    Local Risk Factor
                  </h2>
                  <p className="text-amber-800 dark:text-amber-300">{data.local_risk}</p>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-card p-8 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Our Services in {neighborhoodName}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  href="/services/tree-removal"
                  className="flex items-center gap-3 p-4 rounded-lg hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Tree Removal in {neighborhoodName}
                  </span>
                </Link>
                <Link
                  href="/services/tree-trimming"
                  className="flex items-center gap-3 p-4 rounded-lg hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Trimming & Pruning
                  </span>
                </Link>
                <Link
                  href="/services/tree-health-assessment"
                  className="flex items-center gap-3 p-4 rounded-lg hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Health Assessment
                  </span>
                </Link>
                <Link
                  href="/services/winter-tree-prep"
                  className="flex items-center gap-3 p-4 rounded-lg hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Winter Tree Prep
                  </span>
                </Link>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg shadow-lg p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Local Tree Care Experts</h2>
              <p className="mb-6 text-emerald-100">
                We know {neighborhoodName}&apos;s trees inside and out
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
  const paths: { params: { city: string; neighborhood: string } }[] = []

  Object.keys(locationsData).forEach((city) => {
    const neighborhoods = locationsData[city as keyof typeof locationsData]
    neighborhoods.forEach((neighborhood) => {
      paths.push({
        params: { city, neighborhood },
      })
    })
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<NeighborhoodPageProps> = async ({ params }) => {
  const city = params?.city as string
  const neighborhood = params?.neighborhood as string

  const data =
    neighborhoodData[neighborhood as keyof typeof neighborhoodData] ||
    ({
      vibe: 'Professional Tree Care',
      dominant_trees: 'mature shade trees and ornamental species',
      common_issues: 'storm safety assessment and seasonal pruning',
      local_risk:
        'Weather patterns and tree health require regular monitoring by certified arborists.',
      meta_snippet: 'Professional tree service and arborist consultations.',
      geo: { lat: 41.2565, lng: -95.9345 },
    } as NeighborhoodData)

  const cityName = city
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  const neighborhoodName = neighborhood
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    props: {
      city,
      cityName,
      neighborhood,
      neighborhoodName,
      data,
    },
  }
}
