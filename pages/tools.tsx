import Head from 'next/head'
import Link from 'next/link'
import { CONTACT } from '../src/constants'

export default function ToolsPage() {
  const pageTitle = 'Tree Health Diagnostic Tool | Midwest Roots'
  const metaDescription =
    'Free AI-powered tree health assessment tool. Check storm risk, identify diseases, and get instant recommendations for your Omaha trees.'
  const canonicalUrl = `${CONTACT.siteUrl}/tools`

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
        <meta property="og:site_name" content={CONTACT.businessName} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={`${CONTACT.siteUrl}/images/og-image.jpg`} />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Tree Health Diagnostic Tool',
              description: metaDescription,
              url: canonicalUrl,
              applicationCategory: 'UtilityApplication',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
            }),
          }}
        />
      </Head>

      <div className="min-h-screen bg-stone-100 dark:bg-slate-900">
        {/* Hero */}
        <div className="bg-gradient-to-br from-primary via-primary-dark to-slate-800 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Free Tree Health Diagnostic Tool
            </h1>
            <p className="text-xl text-primary-100">
              Assess storm risk, identify diseases, and get instant recommendations
            </p>
          </div>
        </div>

        {/* TODO Notice */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-8 mb-8">
              <div className="flex items-start gap-4">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h2 className="text-xl font-bold text-blue-900 dark:text-blue-200 mb-2">
                    TODO: Interactive Tool Pending
                  </h2>
                  <p className="text-blue-800 dark:text-blue-300 mb-4">
                    The interactive tree diagnostic tool from the legacy components will be ported
                    in a future step. This page is a placeholder to ensure 0 internal 404s.
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    <strong>Legacy component location:</strong>{' '}
                    <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">
                      src/components-legacy/tool/TreeDiagnostic.jsx
                    </code>
                  </p>
                </div>
              </div>
            </div>

            {/* Placeholder Content */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-card p-8 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                What Our Tool Can Do
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1"
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
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                      Hazard Assessment
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Evaluate risk factors based on ISA arborist standards
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1"
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
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                      Species Identification
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Identify common trees in Omaha and their care requirements
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1"
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
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                      Cost Estimator
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Get realistic cost ranges for tree services in Omaha
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1"
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
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                      DIY vs Pro Guide
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Determine if you need professional help or can DIY
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA - Contact Instead */}
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-lg p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Need Help Now?</h2>
              <p className="mb-6 text-primary-100">
                While our diagnostic tool is being upgraded, call us for a free phone consultation
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
      </div>
    </>
  )
}
