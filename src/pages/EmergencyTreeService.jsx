import { useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Phone, Clock, AlertTriangle, CheckCircle, ArrowLeft } from 'lucide-react'
import ContactForm from '../components/ContactForm'

/**
 * Render the Emergency Tree Service page with CTAs, risk indicator, and a contact form.
 *
 * Reads the `risk` query parameter to conditionally display a high-risk badge, sets the
 * document title for SEO, and emits `page_view` and `phone_click` analytics events via
 * `gtag` when available.
 *
 * @returns {JSX.Element} The rendered Emergency Tree Service page component.
 */
export default function EmergencyTreeService() {
  const [searchParams] = useSearchParams()
  const riskLevel = searchParams.get('risk')

  useEffect(() => {
    // Update page title for SEO
    document.title = 'Emergency Tree Service Omaha - Immediate Risk Response | Midwest Roots'

    // Track page view
    if (window.gtag) {
      gtag('event', 'page_view', {
        page_title: 'Emergency Tree Service',
        page_location: window.location.href,
        risk_level: riskLevel
      })
    }
  }, [riskLevel])

  const handlePhoneClick = () => {
    if (window.gtag) {
      gtag('event', 'phone_click', {
        event_category: 'engagement',
        event_label: 'emergency_page',
        risk_level: riskLevel
      })
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Back to results link */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-6 py-4">
          <Link
            to="/tools"
            className="inline-flex items-center text-slate-300 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Diagnostic Tools
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 to-transparent"></div>

        <div className="container mx-auto px-6 relative z-10">
          {riskLevel && (
            <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full mb-6 font-semibold">
              <AlertTriangle className="w-5 h-5" />
              HIGH RISK DETECTED - Priority Response Available
            </div>
          )}

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Emergency Tree Service<br />
            <span className="text-emerald-400">Omaha Metro</span>
          </h1>

          <p className="text-xl text-slate-300 mb-8">
            Your hazard assessment indicated immediate action needed.
            I'm standing by to help protect your property.
          </p>

          {/* Two-column layout: Phone CTA + Emergency Scenarios | Contact Form */}
          <div className="grid lg:grid-cols-2 gap-6 max-w-6xl">
            {/* Left column: Call CTA + Emergency Scenarios */}
            <div className="space-y-6">
              {/* Primary CTA - Phone */}
              <div className="bg-slate-800 border-2 border-emerald-500 rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <Phone className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Call or Text Andrew Now
                    </h2>
                    <p className="text-slate-300 text-lg">
                      Available 24/7 for urgent tree emergencies
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

                <div className="flex items-start gap-3 text-sm text-slate-400">
                  <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-slate-300">Response time:</strong> If voicemail,
                    expect callback within 2 hours during business hours (8am-6pm),
                    or first thing next morning after hours. Your safety is my priority.
                  </p>
                </div>
              </div>

              {/* Emergency Scenarios - Moved here */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Common Emergency Situations We Handle
                </h3>
                <div className="space-y-4">
                  <div className="bg-slate-800 border-l-4 border-red-500 rounded-lg p-6">
                    <h4 className="text-lg font-bold text-white mb-2">
                      Trees Leaning Toward Structures
                    </h4>
                    <p className="text-slate-300 text-sm">
                      Sudden lean after storms, especially in Omaha's clay soil, can indicate root failure.
                      Quick assessment prevents property damage.
                    </p>
                  </div>

                  <div className="bg-slate-800 border-l-4 border-orange-500 rounded-lg p-6">
                    <h4 className="text-lg font-bold text-white mb-2">
                      Large Dead Branches ("Widow Makers")
                    </h4>
                    <p className="text-slate-300 text-sm">
                      Dead limbs over driveways, roofs, or high-traffic areas are ticking time bombs.
                      Ice and wind can cause sudden failure.
                    </p>
                  </div>

                  <div className="bg-slate-800 border-l-4 border-yellow-500 rounded-lg p-6">
                    <h4 className="text-lg font-bold text-white mb-2">
                      Storm Damage & Split Trunks
                    </h4>
                    <p className="text-slate-300 text-sm">
                      Omaha ice storms create massive loads on branches. Split trunks and hanging limbs
                      need immediate removal before they fall.
                    </p>
                  </div>

                  <div className="bg-slate-800 border-l-4 border-emerald-500 rounded-lg p-6">
                    <h4 className="text-lg font-bold text-white mb-2">
                      EAB-Infested Ash Trees
                    </h4>
                    <p className="text-slate-300 text-sm">
                      Emerald Ash Borer weakens ash trees to the point of sudden failure.
                      Dead or dying ash trees near structures require urgent removal.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column: Contact Form */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                Or Request a Callback
              </h3>
              <p className="text-slate-400 mb-6">
                I'll call you back within 2 hours (business hours) to discuss your tree emergency.
              </p>
              <ContactForm urgency="high" pageSource="emergency_tree_service" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-slate-800 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Why Omaha Homeowners Trust Midwest Roots
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
              <CheckCircle className="w-10 h-10 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                Honest Assessment
              </h3>
              <p className="text-slate-300">
                I'll never recommend unnecessary work. If your tree can be saved,
                I'll tell you how. If it needs removal, you'll know why.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
              <CheckCircle className="w-10 h-10 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                Local Expertise
              </h3>
              <p className="text-slate-300">
                Based in Omaha, I understand our unique challenges:
                ice storms, wind shear, EAB, and alkaline soil affecting tree health.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
              <CheckCircle className="w-10 h-10 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                ISA Standards
              </h3>
              <p className="text-slate-300">
                All assessments follow International Society of Arboriculture
                guidelines for tree risk evaluation and safety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Emergency Tree Removal",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Midwest Roots Tree Care",
            "telephone": "(402) 812-3294",
            "areaServed": {
              "@type": "City",
              "name": "Omaha",
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "NE",
                "addressCountry": "US"
              }
            }
          },
          "availableChannel": {
            "@type": "ServiceChannel",
            "servicePhone": {
              "@type": "ContactPoint",
              "telephone": "+1-402-812-3294",
              "contactType": "Emergency Service",
              "availableLanguage": "English",
              "hoursAvailable": "24/7 phone availability"
            }
          }
        })}
      </script>
    </div>
  )
}