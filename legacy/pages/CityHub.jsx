import { CheckCircle, MapPin, Phone } from 'lucide-react'
import React, { useState } from 'react'; // ADDED: useState for image fallback
import { Link, Navigate, useParams } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import ContactForm from '../components/ContactForm'
import { CONTACT } from '../constants'
import locationsData from '../data/locations.json'
import { formatCityName } from '../utils/formatters'; // IMPORTED UTILITY

export default function CityHub() {
  const { city } = useParams()

  // ADDED: State to handle image fallback for the hero
  const [useFallbackImage, setUseFallbackImage] = useState(false)

  // Normalize input
  const cityKey = city?.toLowerCase()
  const neighborhoods = locationsData[cityKey]

  // 404 Protection: If city doesn't exist in our data, go home
  if (!neighborhoods) {
    return <Navigate to="/" replace />
  }

  // Formatting helpers - REFACTORED
  const cityName = formatCityName(cityKey)
  const cityImageSlug = cityName.replace(/\s+/g, '-')

  // Choose image source based on state
  const primaryImageSrc = `/images/${cityImageSlug}-Nebraska.webp`
  const finalImageSrc = useFallbackImage
    ? '/images/og-image.jpg'
    : primaryImageSrc

  const pageTitle = `Tree Service in ${cityName}, NE | Midwest Roots`
  const metaDesc = `Top-rated tree removal and trimming in ${cityName}, Nebraska. Serving all neighborhoods including ${neighborhoods.slice(0,3).join(', ')}. Free estimates: ${CONTACT.phone}.`

  return (
    <div className="min-h-screen bg-slate-50">
      <Head prioritizeSeoTags>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={`${CONTACT.siteUrl}/locations/${cityKey}`} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Tree Services",
            "provider": {
              "@type": "LocalBusiness",
              "name": CONTACT.businessName,
              "telephone": CONTACT.phone
              // REMOVED: Redundant areaServed here. We define it below with more detail.
            },
            "areaServed": neighborhoods.map(n => ({
              "@type": "Place",
              "name": n.replace(/-/g, ' ')
            }))
          })}
        </script>
      </Head>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 bg-slate-900 overflow-hidden">
        {/* FIXED: Replaced brittle CSS background with <img> and onError fallback */}
        <img
          src={finalImageSrc}
          alt={`Tree canopy in ${cityName}`}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
          onError={() => setUseFallbackImage(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 to-slate-900/80" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-600/20 border border-emerald-500/50 text-emerald-400 px-4 py-2 rounded-full mb-6 font-semibold">
            <MapPin className="w-4 h-4" />
            Serving All of {cityName}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Expert Tree Care in <span className="text-emerald-400">{cityName}</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            From historic canopy preservation to storm damage prevention, we understand the specific tree needs of {cityName} homeowners.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={`tel:${CONTACT.phoneRaw}`}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call {CONTACT.phone}
            </a>
            <Link
              to="/tools"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl transition backdrop-blur-sm"
            >
              Use Free Diagnostic Tool
            </Link>
          </div>
        </div>
      </section>

      {/* Neighborhood Grid */}
      <section className="py-16 container mx-auto px-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
          Serving Your Neighborhood
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {neighborhoods.map((hood) => (
            <Link
              key={hood}
              to={`/locations/${cityKey}/${hood}`}
              className="group bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-emerald-500 hover:shadow-md transition text-center"
            >
              <h3 className="font-bold text-slate-800 group-hover:text-emerald-700 transition mb-2">
                {formatCityName(hood)}
              </h3>
              <span className="text-xs font-medium text-slate-500 group-hover:text-emerald-600 uppercase tracking-wide">
                View Local Services
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Lead Capture */}
      <section className="bg-slate-100 py-16">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Schedule Your {cityName} Estimate
            </h2>
            <p className="text-slate-600 mb-6 text-lg">
              Whether you have a hazardous removal or just need a health checkup, we're in {cityName} every week.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <strong className="text-slate-900">Local Knowledge</strong>
                  <p className="text-slate-600">We know {cityName} ordinances and native species.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <strong className="text-slate-900">Licensed & Insured</strong>
                  <p className="text-slate-600">Full protection for your property.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <strong className="text-slate-900">Fast Response</strong>
                  <p className="text-slate-600">Same-day callbacks for {cityName} residents.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200">
            <ContactForm urgency="medium" pageSource={`city_hub_${cityKey}`} />
          </div>
        </div>
      </section>

      {/* Internal Linking Footer */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-500 mb-4">
            Not in {cityName}? Check our other major service hubs:
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {Object.keys(locationsData)
              .filter(k => k !== cityKey)
              .sort() // ADDED: Stable sorting
              .slice(0, 6)
              .map(otherCity => (
                <Link
                  key={otherCity}
                  to={`/locations/${otherCity}`}
                  className="text-emerald-600 font-medium hover:underline capitalize"
                >
                  {otherCity.replace(/-/g, ' ')}
                </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}