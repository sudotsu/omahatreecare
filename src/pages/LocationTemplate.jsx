import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { Phone, MapPin, CheckCircle, ArrowLeft, TreeDeciduous } from 'lucide-react'
import ContactForm from '../components/ContactForm'

// Neighborhood-specific data to avoid "doorway page" penalty
const neighborhoodData = {
  dundee: { specificRisk: 'Historic tree preservation and mature oak care' },
  millard: { specificRisk: 'Emerald Ash Borer mitigation' },
  tiburon: { specificRisk: 'New construction tree damage and soil compaction' },
  // Add more as needed
}

/**
 * Universal template for all neighborhood pages
 * Generates unique SEO metadata and content based on URL params
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

  // Get neighborhood-specific data if available
  const specificData = neighborhoodData[neighborhood] || { specificRisk: 'Tree health and storm damage assessment' }

  const pageTitle = `Tree Service ${neighborhoodName}, ${cityName} NE | Midwest Roots Tree Care`
  const metaDescription = `Expert tree service in ${neighborhoodName}, ${cityName}. ${specificData.specificRisk}. Free diagnostic tool. Call (402) 812-3294`

  useEffect(() => {
    // Track page view
    if (window.gtag) {
      gtag('event', 'page_view', {
        page_title: `${neighborhoodName} ${cityName} Tree Care`,
        page_location: window.location.href,
        city: cityName,
        neighborhood: neighborhoodName
      })
    }
  }, [city, neighborhood, cityName, neighborhoodName])

  const handlePhoneClick = () => {
    if (window.gtag) {
      gtag('event', 'phone_click', {
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
        <meta name="robots" content="noindex, nofollow" />
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
      <section className="relative pt-16 pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 to-transparent"></div>

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
            Local tree service for {neighborhoodName} homeowners. {specificData.specificRisk}.
            Use our free diagnostic tool or call Andrew for honest recommendations.
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
                  href="tel:4028123294"
                  onClick={handlePhoneClick}
                  className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 px-8 rounded-xl text-center text-2xl mb-4 transition transform hover:scale-105"
                >
                  (402) 812-3294
                </a>

                <p className="text-sm text-slate-400">
                  <strong className="text-slate-300">Serving {neighborhoodName} since 2024.</strong> Mon-Sat 8am-6pm.
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
                      10-minute assessment based on ISA arborist standards.
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

      {/* Common Issues in this Neighborhood */}
      <section className="bg-slate-800 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Common Tree Issues in {neighborhoodName}
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
              <CheckCircle className="w-10 h-10 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                {specificData.specificRisk}
              </h3>
              <p className="text-slate-300">
                We understand the unique challenges facing {neighborhoodName} trees.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
              <CheckCircle className="w-10 h-10 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                Storm Damage Assessment
              </h3>
              <p className="text-slate-300">
                Nebraska ice storms and wind can damage trees. We help assess and prevent failures.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
              <CheckCircle className="w-10 h-10 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                Free Diagnostic Tool
              </h3>
              <p className="text-slate-300">
                Not sure if you need service? Our free tool gives honest, arborist-grade assessments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": `Midwest Roots Tree Care - ${neighborhoodName}`,
          "image": "https://omahatreecare.com/images/og-image.jpg",
          "telephone": "(402) 812-3294",
          "email": "andrew@omahatreecare.com",
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
          "openingHours": "Mo-Sa 08:00-18:00",
          "url": `https://omahatreecare.com/locations/${city}/${neighborhood}`
        })}
      </script>
    </div>
  )
}
