import { MapPin, ArrowRight, TreeDeciduous } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { CONTACT } from '../constants'
import locationsData from '../data/locations.json'

/**
 * Renders the master "Service Areas" directory.
 * Lists all 8 cities and their respective neighborhoods for maximum SEO crawlability.
 */
export default function Locations() {
  // Helper to capitalize names (e.g., "old-millard" -> "Old Millard")
  const formatName = (str) => {
    return str.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  const cities = Object.keys(locationsData)

  return (
    <div className="min-h-screen bg-slate-900">
      <Head>
        <title>Tree Service Areas Omaha & Surrounding Metro | Midwest Roots</title>
        <meta name="description" content="Midwest Roots Tree Services serves the entire Omaha metro area including Millard, Elkhorn, Gretna, Papillion, and Bellevue. Find your neighborhood arborist here." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${CONTACT.siteUrl}/locations`} />

        {/* OpenGraph */}
        <meta property="og:title" content="Our Service Areas | Midwest Roots Tree Services" />
        <meta property="og:description" content="Professional tree care across Omaha, Millard, Elkhorn, Gretna, and Bellevue." />
        <meta property="og:image" content={`${CONTACT.siteUrl}/images/og-image.jpg`} />
      </Head>

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 px-4 py-2 rounded-full mb-6 font-semibold">
            <MapPin className="w-5 h-5" />
            <span>Serving 8 Cities & {Object.values(locationsData).flat().length}+ Neighborhoods</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Where We Work
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            From historic Dundee to the acreages of Gretna, we provide specialized tree care tailored to each neighborhood's unique canopy.
          </p>
        </div>
      </section>

      {/* Directory Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cities.map((city) => {
              const neighborhoods = locationsData[city]
              const cityName = formatName(city)

              return (
                <div key={city} className="bg-slate-800 border border-slate-700 rounded-2xl p-8 hover:border-emerald-500/50 transition group">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {cityName}
                    </h2>
                    <TreeDeciduous className="w-8 h-8 text-slate-600 group-hover:text-emerald-500 transition-colors" />
                  </div>

                  {/* Neighborhood List */}
                  <div className="mb-8">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                      Neighborhoods Served:
                    </h3>
                    <ul className="space-y-2">
                      {neighborhoods.map(hood => (
                        <li key={hood}>
                          <Link
                            to={`/locations/${city}/${hood}`}
                            className="text-slate-300 hover:text-white hover:underline decoration-emerald-500 underline-offset-4 text-sm flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                            {formatName(hood)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to={`/locations/${city}`}
                    className="inline-flex items-center w-full justify-center bg-slate-900 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl border border-slate-700 hover:border-emerald-500 transition-all"
                  >
                    View {cityName} Hub
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}