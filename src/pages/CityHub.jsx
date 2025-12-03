import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { MapPin, ArrowLeft, TreeDeciduous } from 'lucide-react'
import locationsData from '../data/locations.json'

/**
 * City hub page template - lists all neighborhoods
 * Example: /locations/millard shows all Millard neighborhoods
 */
export default function CityHub() {
  const { city } = useParams()

  const formatName = (str) => {
    if (!str) return ''
    return str.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  const cityName = formatName(city)
  const neighborhoods = locationsData[city] || []

  const pageTitle = `Tree Service ${cityName} NE - All Neighborhoods | Midwest Roots Tree Care`
  const metaDescription = `Expert tree service in ${cityName}, Nebraska. Serving ${neighborhoods.length} neighborhoods. Free diagnostic tool. Call (402) 812-3294`

  useEffect(() => {
    if (window.gtag) {
      gtag('event', 'page_view', {
        page_title: `${cityName} Tree Care Hub`,
        page_location: window.location.href,
        city: cityName
      })
    }
  }, [city, cityName])

  return (
    <div className="min-h-screen bg-slate-900">
      <Head prioritizeSeoTags>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={`https://omahatreecare.com/locations/${city}`} />
      </Head>

      {/* Back to home */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center text-slate-300 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative pt-16 pb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 to-transparent"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-full mb-6 font-semibold">
            <MapPin className="w-5 h-5" />
            Serving {cityName}, Nebraska
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Tree Care in {cityName}<br />
            <span className="text-emerald-400">All Neighborhoods</span>
          </h1>

          <p className="text-xl text-slate-300 mb-8 max-w-2xl">
            Professional tree service for all {cityName} neighborhoods. Select your area below for
            neighborhood-specific information, or use our free diagnostic tool.
          </p>

          <Link
            to="/tools"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition transform hover:scale-105"
          >
            <TreeDeciduous className="w-5 h-5" />
            Start Free Tree Assessment
          </Link>
        </div>
      </section>

      {/* Neighborhoods Grid */}
      <section className="bg-slate-800 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-8">
            {cityName} Neighborhoods We Serve
          </h2>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl">
            {neighborhoods.map((neighborhood) => (
              <Link
                key={neighborhood}
                to={`/locations/${city}/${neighborhood}`}
                className="bg-slate-900 border border-slate-700 hover:border-emerald-500 rounded-lg p-6 transition group"
              >
                <MapPin className="w-6 h-6 text-emerald-400 mb-3 group-hover:scale-110 transition" />
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition">
                  {formatName(neighborhood)}
                </h3>
                <p className="text-slate-400 text-sm mt-2">
                  Tree service in {formatName(neighborhood)} →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-slate-900 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Serving All of {cityName}
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Not seeing your neighborhood? We serve the entire {cityName} area.
            Call Andrew for a free consultation.
          </p>
          <a
            href="tel:4028123294"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 px-10 rounded-xl text-2xl transition transform hover:scale-105"
          >
            (402) 812-3294
          </a>
        </div>
      </section>

      {/* Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Tree Care",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Midwest Roots Tree Care",
            "telephone": "(402) 812-3294",
            "email": "andrew@omahatreecare.com"
          },
          "areaServed": neighborhoods.map(n => ({
            "@type": "Place",
            "name": formatName(n),
            "address": {
              "@type": "PostalAddress",
              "addressLocality": cityName,
              "addressRegion": "NE"
            }
          })),
          "url": `https://omahatreecare.com/locations/${city}`
        })}
      </script>
    </div>
  )
}
