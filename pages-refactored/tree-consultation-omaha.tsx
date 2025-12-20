import Head from 'next/head'
import Link from 'next/link'
import { CONTACT } from '../src/constants'

export default function TreeConsultationPage() {
  const pageTitle = 'Tree Consultation Omaha - Professional Assessment Before DIY | Midwest Roots'
  const metaDescription = `Get a professional tree risk assessment in Omaha before you DIY. Expert advice on safety, pruning vs removal, and storm risks. Call ${CONTACT.phone}.`
  const canonicalUrl = `${CONTACT.siteUrl}/tree-consultation-omaha`

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

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: 'Tree Consultation Service',
              description: metaDescription,
              provider: {
                '@type': 'LocalBusiness',
                name: CONTACT.businessName,
                telephone: CONTACT.phone,
                email: CONTACT.email,
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: CONTACT.streetAddress,
                  addressLocality: CONTACT.addressLocality,
                  addressRegion: CONTACT.addressRegion,
                  postalCode: CONTACT.postalCode,
                  addressCountry: CONTACT.addressCountry,
                },
              },
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                description: 'Free consultation',
              },
            }),
          }}
        />
      </Head>

      <div className="min-h-screen bg-slate-900">
        {/* Hero */}
        <div className="bg-gradient-to-br from-primary via-primary-dark to-slate-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="inline-block bg-emerald-500/20 border border-emerald-400 text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                100% FREE - NO OBLIGATION
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Expert Tree Consultation <br />
                Before You DIY
              </h1>
              <p className="text-2xl text-emerald-100 mb-8">
                Get professional advice without the sales pressure
              </p>

              <a
                href={`tel:${CONTACT.phoneRaw}`}
                className="inline-block bg-emerald-500 text-white px-10 py-5 rounded-lg text-xl font-bold hover:bg-emerald-600 transition-colors shadow-lg"
              >
                Call for Free Consult: {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Why Get a Consultation */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800 rounded-lg shadow-xl p-8 mb-8">
              <h2 className="text-3xl font-bold text-white mb-6">
                Why Get a Professional Consultation?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <svg
                    className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1"
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
                  <div>
                    <h3 className="font-bold text-white mb-2">Safety Assessment</h3>
                    <p className="text-slate-300">
                      Know if your tree is truly dangerous or just looks scary. Most homeowner
                      injuries happen during DIY tree work that should have been left to pros.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <svg
                    className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1"
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
                  <div>
                    <h3 className="font-bold text-white mb-2">Prune or Remove?</h3>
                    <p className="text-slate-300">
                      Removing a healthy tree costs $2,000+. Pruning might cost $400. We will tell
                      you honestly which you need (or if you need neither).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <svg
                    className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1"
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
                  <div>
                    <h3 className="font-bold text-white mb-2">Disease Identification</h3>
                    <p className="text-slate-300">
                      Is it Emerald Ash Borer, Oak Wilt, or just fall leaf drop? Misdiagnosis can
                      waste thousands on unnecessary treatments.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <svg
                    className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1"
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
                  <div>
                    <h3 className="font-bold text-white mb-2">Realistic Cost Ranges</h3>
                    <p className="text-slate-300">
                      Know what you should actually pay before getting quotes. Avoid both low-ball
                      hacks and overpriced operators.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* What to Expect */}
            <div className="bg-slate-800 rounded-lg shadow-xl p-8 mb-8">
              <h2 className="text-3xl font-bold text-white mb-6">What to Expect</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">15-Minute Phone Call</h3>
                    <p className="text-slate-300">
                      Describe your tree, your concerns, and what you are trying to accomplish
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Honest Assessment</h3>
                    <p className="text-slate-300">
                      We will tell you if it is DIY-safe or needs a pro. No sales pressure.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Next Steps (Your Choice)</h3>
                    <p className="text-slate-300">
                      If you want a quote, we can schedule that. If not, no follow-up calls.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg shadow-xl p-10 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Get Your Free Consultation</h2>
              <p className="text-xl mb-8 text-emerald-100">
                No obligation. No sales pitch. Just honest advice.
              </p>
              <a
                href={`tel:${CONTACT.phoneRaw}`}
                className="inline-block bg-white text-emerald-600 px-12 py-5 rounded-lg text-2xl font-bold hover:bg-emerald-50 transition-colors shadow-lg"
              >
                {CONTACT.phone}
              </a>
              <p className="mt-6 text-sm text-emerald-200">
                Available daily 7am - 9pm
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
