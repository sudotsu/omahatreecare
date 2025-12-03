import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Phone, MapPin, CheckCircle, ArrowLeft, TreeDeciduous } from 'lucide-react'
import ContactForm from '../components/ContactForm'

/**
 * Gretna, Nebraska location page - local SEO optimized
 */
export default function GretnaTreeCare() {
  useEffect(() => {
    // Update page title for SEO
    document.title = 'Tree Care Gretna NE - Local Tree Service & Free Risk Assessment | Midwest Roots'

    // Track page view
    if (window.gtag) {
      gtag('event', 'page_view', {
        page_title: 'Gretna Tree Care',
        page_location: window.location.href,
        city: 'Gretna'
      })
    }
  }, [])

  const handlePhoneClick = () => {
    if (window.gtag) {
      gtag('event', 'phone_click', {
        event_category: 'engagement',
        event_label: 'gretna_page',
        city: 'Gretna'
      })
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Back to home link */}
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

      {/* Hero Section */}
      <section className="relative pt-16 pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 to-transparent"></div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-full mb-6 font-semibold">
            <MapPin className="w-5 h-5" />
            Serving Gretna, Nebraska
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Tree Care in Gretna<br />
            <span className="text-emerald-400">Free Risk Assessment Tool</span>
          </h1>

          <p className="text-xl text-slate-300 mb-8 max-w-2xl">
            Local tree service for Gretna homeowners. Use our free diagnostic tool to assess your trees,
            or call Andrew for honest recommendations.
          </p>

          {/* Two-column layout: Phone CTA + Free Tool | Contact Form */}
          <div className="grid lg:grid-cols-2 gap-6 max-w-6xl">
            {/* Left column: Call CTA + Free Tool */}
            <div className="space-y-6">
              {/* Primary CTA - Phone */}
              <div className="bg-slate-800 border-2 border-emerald-500 rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <Phone className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Call or Text Andrew
                    </h2>
                    <p className="text-slate-300 text-lg">
                      Local Gretna tree service - honest assessments
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
                  <strong className="text-slate-300">Serving Gretna since 2024.</strong> Mon-Sat 8am-6pm.
                  Emergency tree service available 24/7.
                </p>
              </div>

              {/* Free Tool CTA */}
              <div className="bg-slate-800 border border-emerald-500/50 rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-4">
                  <TreeDeciduous className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Or Use Our Free Diagnostic Tool
                    </h3>
                    <p className="text-slate-300 text-sm">
                      10-minute assessment based on ISA arborist standards. Get instant recommendations
                      specific to Gretna's soil and weather conditions.
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

            {/* Right column: Contact Form */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                Request a Callback
              </h3>
              <p className="text-slate-400 mb-6">
                Leave your details and I'll call you back within 24 hours to discuss your tree needs.
              </p>
              <ContactForm urgency="medium" pageSource="gretna_tree_care" />
            </div>
          </div>
        </div>
      </section>

      {/* Gretna-Specific Tree Concerns */}
      <section className="bg-slate-800 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Common Tree Issues in Gretna
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
              <CheckCircle className="w-10 h-10 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                Clay Soil Challenges
              </h3>
              <p className="text-slate-300">
                Gretna's heavy clay soil can cause root stress and poor drainage. We help identify trees
                struggling with soil compaction and waterlogging issues.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
              <CheckCircle className="w-10 h-10 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                Wind Damage & Ice Storms
              </h3>
              <p className="text-slate-300">
                Open prairie winds and winter ice storms take a toll on Gretna trees. Get ahead of storm
                damage with preventive pruning and risk assessment.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
              <CheckCircle className="w-10 h-10 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                Emerald Ash Borer (EAB)
              </h3>
              <p className="text-slate-300">
                EAB continues to threaten Gretna ash trees. Early detection and treatment planning
                can save your trees—or prevent dangerous failures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Available in Gretna */}
      <section className="bg-slate-900 py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Tree Services Available in Gretna
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800 border-l-4 border-emerald-500 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                Emergency Tree Removal
              </h3>
              <p className="text-slate-300 text-sm">
                Storm-damaged, leaning, or hazardous trees removed safely. Available 24/7 for emergencies.
              </p>
            </div>

            <div className="bg-slate-800 border-l-4 border-emerald-500 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                Tree Risk Assessment
              </h3>
              <p className="text-slate-300 text-sm">
                ISA-standard inspections to identify hazards before they become expensive problems.
              </p>
            </div>

            <div className="bg-slate-800 border-l-4 border-emerald-500 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                Pruning & Maintenance
              </h3>
              <p className="text-slate-300 text-sm">
                Proper pruning improves tree health, reduces storm damage risk, and keeps your property safe.
              </p>
            </div>

            <div className="bg-slate-800 border-l-4 border-emerald-500 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                Free Diagnostic Tool
              </h3>
              <p className="text-slate-300 text-sm">
                Not sure if you need service? Our free tool helps you assess your trees yourself—honestly.
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
          "name": "Midwest Roots Tree Care - Gretna",
          "image": "https://omahatreecare.com/images/og-image.jpg",
          "telephone": "(402) 812-3294",
          "email": "andrew@omahatreecare.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Gretna",
            "addressRegion": "NE",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "41.1411",
            "longitude": "-96.2397"
          },
          "areaServed": {
            "@type": "City",
            "name": "Gretna",
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "NE",
              "addressCountry": "US"
            }
          },
          "priceRange": "$$",
          "openingHours": "Mo-Sa 08:00-18:00",
          "url": "https://omahatreecare.com/locations/gretna"
        })}
      </script>
    </div>
  )
}
