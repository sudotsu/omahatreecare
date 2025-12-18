import Head from 'next/head'
import Link from 'next/link'
import { CONTACT } from '../src/constants'

export default function EmergencyTreeServicePage() {
  const pageTitle = '24/7 Emergency Tree Service Omaha | Storm Damage Removal'
  const metaDescription = `Urgent tree removal and storm damage cleanup in Omaha. 24-hour emergency response for hazardous trees. Call ${CONTACT.phone} immediately.`
  const canonicalUrl = `${CONTACT.siteUrl}/emergency-tree-service-omaha`

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
              '@type': 'EmergencyService',
              name: 'Midwest Roots Emergency Tree Service',
              serviceType: 'Emergency Tree Removal',
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
                priceRange: '$$$',
              },
              areaServed: {
                '@type': 'City',
                name: 'Omaha',
              },
            }),
          }}
        />
      </Head>

      <div className="min-h-screen bg-slate-900">
        {/* Emergency Hero */}
        <div className="bg-gradient-to-br from-red-600 via-red-700 to-slate-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <svg
                className="w-8 h-8 animate-pulse"
                fill="currentColor"
                viewBox="0 0 24 24"
                role="img"
                aria-label="Shield"
              >
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
              </svg>
              <span className="text-xl font-bold">24/7 EMERGENCY SERVICE</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Emergency Tree Removal <br />& Storm Damage Cleanup
            </h1>
            <p className="text-2xl text-red-100 mb-8">
              Immediate response for hazardous trees in Omaha
            </p>

            <a
              href={`tel:${CONTACT.phoneRaw}`}
              className="inline-block bg-white text-red-600 px-10 py-5 rounded-lg text-2xl font-bold hover:bg-red-50 transition-colors shadow-lg"
            >
              CALL NOW: {CONTACT.phone}
            </a>
          </div>
        </div>

        {/* When to Call */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800 rounded-lg shadow-xl p-8 mb-8">
              <h2 className="text-3xl font-bold text-white mb-6">When to Call Emergency Services</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-900/20 border border-red-700 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <svg
                      className="w-6 h-6 text-red-400 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      role="img"
                      aria-label="Warning"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <div>
                      <h3 className="font-bold text-white mb-2">Tree on structure</h3>
                      <p className="text-red-200">
                        Tree or limb has fallen on house, car, or power line
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-900/20 border border-red-700 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <svg
                      className="w-6 h-6 text-red-400 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      role="img"
                      aria-label="Warning"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <div>
                      <h3 className="font-bold text-white mb-2">Imminent danger</h3>
                      <p className="text-red-200">Tree leaning dangerously after storm</p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-900/20 border border-red-700 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <svg
                      className="w-6 h-6 text-red-400 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      role="img"
                      aria-label="Warning"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <div>
                      <h3 className="font-bold text-white mb-2">Blocked access</h3>
                      <p className="text-red-200">Tree blocking driveway or emergency route</p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-900/20 border border-red-700 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <svg
                      className="w-6 h-6 text-red-400 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      role="img"
                      aria-label="Warning"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <div>
                      <h3 className="font-bold text-white mb-2">Storm damage</h3>
                      <p className="text-red-200">Major limb split creating safety hazard</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Response */}
            <div className="bg-slate-800 rounded-lg shadow-xl p-8 mb-8">
              <h2 className="text-3xl font-bold text-white mb-6">Our Emergency Response</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <svg
                    className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    role="img"
                    aria-label="Confirmed"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div>
                    <h3 className="font-bold text-white mb-1">24/7 Availability</h3>
                    <p className="text-slate-300">
                      We answer the phone day or night, weekends and holidays
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <svg
                    className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    role="img"
                    aria-label="Confirmed"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div>
                    <h3 className="font-bold text-white mb-1">Rapid Response</h3>
                    <p className="text-slate-300">
                      Crews dispatched within 1-2 hours for true emergencies
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <svg
                    className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    role="img"
                    aria-label="Confirmed"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div>
                    <h3 className="font-bold text-white mb-1">Full Equipment</h3>
                    <p className="text-slate-300">
                      Cranes, lifts, and specialized gear for any emergency
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <svg
                    className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    role="img"
                    aria-label="Confirmed"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div>
                    <h3 className="font-bold text-white mb-1">Insurance Coordination</h3>
                    <p className="text-slate-300">
                      We work directly with your insurance company
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency CTA */}
            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-lg shadow-xl p-10 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Don&apos;t Wait - Call Now</h2>
              <p className="text-xl mb-8 text-red-100">
                Every minute counts in an emergency. Our crews are standing by.
              </p>
              <a
                href={`tel:${CONTACT.phoneRaw}`}
                className="inline-block bg-white text-red-600 px-12 py-5 rounded-lg text-2xl font-bold hover:bg-red-50 transition-colors shadow-lg"
              >
                {CONTACT.phone}
              </a>
              <p className="mt-6 text-sm text-red-200">
                Available 24 hours a day, 7 days a week, 365 days a year
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
