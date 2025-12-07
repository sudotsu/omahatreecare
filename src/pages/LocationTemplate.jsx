import { ArrowLeft, ArrowRight, CheckCircle, Leaf, MapPin, Phone, TreeDeciduous, Wrench, ShieldAlert } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import ContactForm from '../components/ContactForm'
import neighborhoodData from '../data/neighborhoodData.json'
import { CONTACT, TRUST_SIGNALS, BUSINESS_HOURS } from '../constants'

/**
 * Render a neighborhood-specific location page with SEO metadata, Social Cards, Service Links, and CTAs.
 *
 * Uses URL parameters (city, neighborhood) to derive display names and select neighborhood-specific content;
 * tracks page views and phone click events with `gtag`.
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

  // Get neighborhood-specific data with rich fallback and Geo-Coordinates
  const data = neighborhoodData[neighborhood] || {
    vibe: "Professional Tree Care",
    dominant_trees: "mature shade trees and ornamental species",
    common_issues: "storm safety assessment and seasonal pruning",
    local_risk: "Weather patterns and tree health require regular monitoring by certified arborists.",
    meta_snippet: "Professional tree service and arborist consultations.",
    geo: { lat: 41.2565, lng: -95.9345 } // Fallback to Omaha center
  }

  const pageTitle = `Tree Service ${neighborhoodName}, ${cityName} NE | Midwest Roots Tree Services`
  const metaDescription = `Tree service in ${neighborhoodName}: ${data.meta_snippet} We handle ${data.dominant_trees} common in ${cityName}. Call (402) 812-3294`
  const canonicalUrl = `${CONTACT.siteUrl}/locations/${city}/${neighborhood}`
  // Dynamic Social Image: Uses the city image if available, else generic
  // Note: Ensure /images/Omaha-Nebraska.webp exists, otherwise it falls back to og-image.jpg handled by meta tags if 404
  const socialImage = `${CONTACT.siteUrl}/images/${cityName}-Nebraska.webp`

  // Core Services List for Internal Linking
  const localServices = [
    {
      id: 'tree-removal',
      name: `Tree Removal in ${neighborhoodName}`,
      icon: Wrench,
      desc: `Safe removal of ${data.dominant_trees.split(' ')[0]} trees and hazardous limbs.`
    },
    {
      id: 'tree-trimming',
      name: `Trimming & Pruning`,
      icon: TreeDeciduous,
      desc: `Structural pruning for ${cityName}'s specific urban canopy.`
    },
    {
      id: 'tree-health-assessment',
      name: `Health Assessment`,
      icon: Leaf,
      desc: `Diagnosis of ${data.common_issues.split(' ')[0]} and soil issues.`
    },
    {
      id: 'winter-tree-prep',
      name: `Winter Storm Prep`,
      icon: ShieldAlert,
      desc: `Preventative clearing to withstand Omaha ice storms.`
    }
  ]

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
        {/* Standard SEO */}
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* OpenGraph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={socialImage} />
        <meta property="og:site_name" content={CONTACT.businessName} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={socialImage} />
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
            backgroundImage: `url(/images/${cityName}-Nebraska.webp), url(/images/og-image.jpg)`,
            backgroundPosition: 'center 40%'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/75 via-emerald-900/20 to-slate-900/75"></div>

        <div className="container mx-auto px-6 relative z-10">
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

          <div className="grid lg:grid-cols-2 gap-6 max-w-6xl">
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
      <section className="bg-slate-800 py-16 border-b border-slate-700">
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
            </div>
          </div>
        </div>
      </section>

      {/* Services in Neighborhood - The New "Bridge" Section */}
      <section className="bg-slate-900 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Complete Tree Care for {neighborhoodName}
            </h2>
            <p className="text-slate-400">
              Professional arboriculture services tailored to {cityName}'s climate.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {localServices.map((service) => (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className="bg-slate-800 border border-slate-700 p-6 rounded-xl hover:border-emerald-500/50 hover:bg-slate-800/80 transition group"
              >
                <service.icon className="w-10 h-10 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400">
                  {service.name}
                </h3>
                <p className="text-sm text-slate-400">
                  {service.desc}
                </p>
                <div className="mt-4 flex items-center text-emerald-500 text-sm font-semibold">
                  View Service <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": CONTACT.siteUrl
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Locations",
                "item": `${CONTACT.siteUrl}/locations/${city}`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": neighborhoodName,
                "item": canonicalUrl
              }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": `Midwest Roots Tree Services - ${neighborhoodName}`,
            "image": `${CONTACT.siteUrl}/images/og-image.jpg`,
            "telephone": CONTACT.phone,
            "email": CONTACT.email,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": neighborhoodName,
              "addressRegion": "NE",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": data.geo?.lat,
              "longitude": data.geo?.lng
            },
            "areaServed": {
              "@type": "Place",
              "name": neighborhoodName,
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": data.geo?.lat,
                "longitude": data.geo?.lng
              }
            },
            "priceRange": "$$",
            "openingHours": BUSINESS_HOURS.schedule,
            "url": canonicalUrl,
            // STANDARD MAP URL: No magic numbers.
            "hasMap": `https://maps.google.com/maps?q=${data.geo?.lat},${data.geo?.lng}`
          }
        ])}
      </script>
    </div>
  )
}
