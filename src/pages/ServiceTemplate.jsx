import { ArrowLeft, ArrowRight, CheckCircle, Clock, MapPin, ShieldAlert, Wrench } from 'lucide-react';
import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import ContactForm from '../components/ContactForm';
import { CONTACT } from '../constants';
import locationsData from '../data/locations.json';
import servicesData from '../data/services.json';

export default function ServiceTemplate() {
  const { serviceId } = useParams()
  const data = servicesData[serviceId]

  // Redirect garbage URLs to home
  if (!data) {
    return <Navigate to="/" replace />
  }

  const pageTitle = `${data.title} | Midwest Roots Tree Services`
  const canonicalUrl = `${CONTACT.siteUrl}/services/${data.slug}`
  const socialImage = `${CONTACT.siteUrl}/images/og-image.jpg`

  // Helper for city names
  const formatCityName = (city) => {
    return city.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  return (
    // FOREMAN FIX: Removed 'bg-slate-50'. Now uses global body color.
    <div className="min-h-screen">
      <Head prioritizeSeoTags>
        <title>{pageTitle}</title>
        <meta name="description" content={data.meta_desc} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={data.meta_desc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={socialImage} />
        <meta property="og:site_name" content={CONTACT.businessName} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={data.meta_desc} />
        <meta name="twitter:image" content={socialImage} />
      </Head>

      {/* Navigation */}
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center text-slate-400 hover:text-emerald-400 transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <header className="relative bg-slate-900 text-white pt-20 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/og-image.jpg)',
            backgroundPosition: 'center 40%'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-900/90"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-emerald-600/20 text-emerald-400 px-4 py-2 rounded-full font-bold mb-4 border border-emerald-500/30">
              <Wrench className="w-4 h-4" />
              Professional Tree Service
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-semibold shadow-sm ml-3 bg-[#52796f] text-white">
              <Clock size={16} aria-hidden="true" />
              <span>Free Quote • Fast Response</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {data.hero_headline}
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mb-8">
              {data.hero_sub}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${CONTACT.phoneRaw}`} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-lg text-center transition">
                Call for Quote: {CONTACT.phone}
              </a>
              <Link to="/tools" className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-lg text-center transition backdrop-blur-sm">
                Use Free Diagnostic Tool
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Pain & Solution Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-orange-50 border-l-4 border-orange-500 p-8 rounded-r-lg">
              <div className="flex items-start gap-4">
                <ShieldAlert className="w-8 h-8 text-orange-600 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">The Problem</h2>
                  <p className="text-slate-700 text-lg leading-relaxed">
                    {data.pain_point}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Solution</h2>
              <p className="text-slate-600 text-lg mb-6">
                {data.solution}
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold text-slate-800">{data.benefit_1}</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold text-slate-800">{data.benefit_2}</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold text-slate-800">{data.benefit_3}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture */}
      <section className="bg-slate-900 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Get a Free Estimate</h2>
            <p className="text-slate-400">
              Send us a photo or describe the issue. We'll get back to you fast.
            </p>
          </div>
          <div className="max-w-xl mx-auto bg-slate-800 p-8 rounded-2xl border border-slate-700">
            <ContactForm urgency="high" pageSource={serviceId} />
          </div>
        </div>
      </section>

      {/* Service Area Links */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Available Across the Metro</h3>
            <p className="text-slate-600">We provide {data.title.toLowerCase()} in all major Omaha communities.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {Object.keys(locationsData).slice(0, 8).map((city) => (
              <Link
                key={city}
                to={`/locations/${city}`}
                className="inline-flex items-center gap-2 px-5 py-3 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 rounded-lg text-slate-700 hover:text-emerald-700 transition-all group"
              >
                <MapPin className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">{formatCityName(city)}</span>
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Schema */}
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
                "name": "Services",
                "item": `${CONTACT.siteUrl}/#services`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": data.title,
                "item": canonicalUrl
              }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": data.title,
            "provider": {
              "@type": "LocalBusiness",
              "name": CONTACT.businessName,
              "telephone": CONTACT.phone,
              "email": CONTACT.email,
              "url": CONTACT.siteUrl,
              "image": `${CONTACT.siteUrl}/images/og-image.jpg`,
              "priceRange": "$$",
              "areaServed": {
                "@type": "City",
                "name": "Omaha",
                "addressRegion": "NE",
                "addressCountry": "US"
              }
            },
            "description": data.meta_desc,
            "url": canonicalUrl
          }
        ])}
      </script>
    </div>
  )
}