import { ArrowLeft, CheckCircle, Leaf, MapPin, Phone, TreeDeciduous } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import ContactForm from '../components/ContactForm'
import neighborhoodData from '../data/neighborhoodData.json'
import { CONTACT, TRUST_SIGNALS, BUSINESS_HOURS } from '../constants'

/**
 * Render a neighborhood-specific location page with SEO metadata, structured data, CTAs, and a contact form.
 *
 * Uses URL parameters (city, neighborhood) to derive display names and select neighborhood-specific content;
 * tracks page views and phone click events with `gtag` when available.
 *
 * @returns {JSX.Element} The rendered React component for the location page.
 */
export default function LocationTemplate() {
  const { city, neighborhood } = useParams()

  // Format names for display (capitalize, remove hyphens)
  const formatName = (str) => {
    if (!str) return ''
    return str.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  const cityName = formatName(city)
  const neighborhoodName = formatName(neighborhood)

  // Get neighborhood-specific data with rich fallback
  const data = neighborhoodData[neighborhood] || {
    vibe: "Professional Tree Care",
    dominant_trees: "mature shade trees and ornamental species",
    common_issues: "storm safety assessment and seasonal pruning",
    local_risk: "Weather patterns and tree health require regular monitoring by certified arborists.",
    meta_snippet: "Professional tree service and arborist consultations."
  }

  const pageTitle = `Tree Service ${neighborhoodName}, ${cityName} NE | Midwest Roots Tree Care`
  const metaDescription = `Tree service in ${neighborhoodName}: ${data.meta_snippet} We handle ${data.dominant_trees} common in ${cityName}. Call (402) 812-3294`

  useEffect(() => {
    // Track page view
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: `${neighborhoodName} ${cityName} Tree Care`,
        page_location: window.location.href,
        city: cityName,
        neighborhood: neighborhoodName
      })
    }
  }, [city, neighborhood, cityName, neighborhoodName])

  const handlePhoneClick = () => {
    if (window.gtag) {
      window.gtag('event', 'phone_click', {
        event_category: 'engagement',
        event_label: 'neighborhood_page',
        city: cityName,
        neighborhood: neighborhoodName
      })
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Head prioritizeSeoTags>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={`https://omahatreecare.com/locations/${city}/${neighborhood}`} />
      </Head>

      {/* Back to city link */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-6 py-4">
          <Link
            to={`/locations/${city}`}
            className="inline-flex items-center text-slate-300 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {cityName}
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden">
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/og-image.jpg)',
            backgroundPosition: 'center 40%'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-emerald-900/30 to-slate-900/95"></div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-full mb-6 font-semibold">
            <MapPin className="w-5 h-5" />
            Serving {neighborhoodName}, {cityName}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Tree Care in {neighborhoodName}<br />
            <span className="text-emerald-400">{cityName}, Nebraska</span>
          </h1>

          <p className="text-xl text-slate-300 mb-8 max-w-2xl">
            Specialized tree care for {neighborhoodName} homeowners. We handle {data.dominant_trees} and understand the unique challenges of {data.vibe.toLowerCase()} neighborhoods.
          </p>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-2 gap-6 max-w-6xl">
            {/* Left: Call CTA + Free Tool */}
            <div className="space-y-6">
              <div className="bg-slate-800 border-2 border-emerald-500 rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <Phone className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Call or Text Andrew
                    </h2>
                    <p className="text-slate-300 text-lg">
                      Local {neighborhoodName} tree service
                    </p>
                  </div>
                </div>

                <a
                  href={`tel:${CONTACT.phoneRaw}`}
                  onClick={handlePhoneClick}
                  className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 px-8 rounded-xl text-center text-2xl mb-4 transition transform hover:scale-105"
                >
                  {CONTACT.phone}
                </a>

                <p className="text-sm text-slate-400">
                  <strong className="text-slate-300">Serving {neighborhoodName} since 2024.</strong> {BUSINESS_HOURS.display}.
                </p>
              </div>

              {/* Free Tool CTA */}
              <div className="bg-slate-800 border border-emerald-500/50 rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-4">
                  <TreeDeciduous className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Free Diagnostic Tool
                    </h3>
                    <p className="text-slate-300 text-sm">
                      10-minute assessment based on {TRUST_SIGNALS.certification}.
                    </p>
                  </div>
                </div>

                <Link
                  to="/tools"
                  className="block w-full bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 font-semibold py-4 px-6 rounded-lg text-center transition border border-emerald-500/50"
                >
                  Start Free Assessment →
                </Link>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                Request a Callback
              </h3>
              <p className="text-slate-400 mb-6">
                Leave your details and I'll call you back within 24 hours.
              </p>
              <ContactForm urgency="medium" pageSource={`${city}_${neighborhood}`} />
            </div>
          </div>
        </div>
      </section>

      {/* Local Insight - The "Mad Scientist" Content Block */}
      <section className="bg-slate-800 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-emerald-900/40 to-slate-900 border-2 border-emerald-500/30 rounded-2xl p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <Leaf className="w-8 h-8 text-emerald-400" />
                <h2 className="text-3xl font-bold text-white">
                  Why {neighborhoodName} is Unique
                </h2>
              </div>

              <div className="space-y-6 text-slate-200">
                <p className="text-lg leading-relaxed">
                  Homeowners in <strong className="text-white">{neighborhoodName}</strong> face unique challenges.
                  The area is dominated by <strong className="text-emerald-300">{data.dominant_trees}</strong>, which means we
                  frequently handle <strong className="text-white">{data.common_issues}</strong>.
                </p>

                <div className="bg-slate-900/50 border-l-4 border-emerald-500 rounded-r-lg p-6">
                  <h3 className="text-lg font-bold text-emerald-400 mb-2">Local Risk Factor:</h3>
                  <p className="text-slate-300 leading-relaxed">
                    {data.local_risk}
                  </p>
                </div>

                <p className="text-lg leading-relaxed">
                  At Midwest Roots, we don't just "cut trees." We understand the biology of {neighborhoodName}'s urban forest
                  and the specific challenges of <strong className="text-white">{data.vibe.toLowerCase()}</strong> areas.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-700">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-white mb-1">{TRUST_SIGNALS.certificationShort} Methods</h4>
                      <p className="text-sm text-slate-400">Proper pruning for {neighborhoodName}'s species</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-white mb-1">Local Knowledge</h4>
                      <p className="text-sm text-slate-400">We know your neighborhood's tree history</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": `${CONTACT.businessName} - ${neighborhoodName}`,
          "image": `${CONTACT.siteUrl}/images/og-image.jpg`,
          "telephone": CONTACT.phone,
          "email": CONTACT.email,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": neighborhoodName,
            "addressRegion": "NE",
            "addressCountry": "US"
          },
          "areaServed": {
            "@type": "Place",
            "name": neighborhoodName,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": cityName,
              "addressRegion": "NE",
              "addressCountry": "US"
            }
          },
          "priceRange": "$$",
          "openingHours": BUSINESS_HOURS.schedule,
          "url": `${CONTACT.siteUrl}/locations/${city}/${neighborhood}`
        })}
      </script>
    </div>
  )
}