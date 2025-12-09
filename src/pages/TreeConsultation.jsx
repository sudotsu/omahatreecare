import { useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { Phone, AlertTriangle, CheckCircle, ArrowLeft, Shield } from 'lucide-react'
import ContactForm from '../components/ContactForm'
import { CONTACT } from '../constants' // <--- Added Import

/**
 * Render the Tree Consultation landing page with risk-aware messaging, phone and callback CTAs, educational sections, a contact form, and embedded JSON-LD structured data.
 *
 * Reads the `risk` query parameter to adjust the UI (badge and analytics metadata) and emits analytics events for page views and phone clicks when an analytics function is available.
 *
 * @returns {JSX.Element} The Tree Consultation page UI.
 */
export default function TreeConsultation() {
  const [searchParams] = useSearchParams()
  const riskLevel = searchParams.get('risk')

  const pageTitle = 'Tree Consultation Omaha - Professional Assessment Before DIY | Midwest Roots';
  const metaDescription = 'Get a professional tree risk assessment in Omaha before you DIY. Expert advice on safety, pruning vs removal, and storm risks. Save money and stay safe.';

  useEffect(() => {
    // Track page view (Title is now handled statically by <Head>)
    if (window.gtag) {
      gtag('event', 'page_view', {
        page_title: 'Tree Consultation',
        page_location: window.location.href,
        risk_level: riskLevel
      })
    }
  }, [riskLevel])

  const handlePhoneClick = () => {
    if (window.gtag) {
      gtag('event', 'phone_click', {
        event_category: 'engagement',
        event_label: 'consultation_page',
        risk_level: riskLevel
      })
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={`${CONTACT.siteUrl}/tree-consultation-omaha`} />

        {/* OpenGraph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${CONTACT.siteUrl}/tree-consultation-omaha`} />
        <meta property="og:image" content={`${CONTACT.siteUrl}/images/og-image.jpg`} />
        <meta property="og:site_name" content={CONTACT.businessName} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={`${CONTACT.siteUrl}/images/og-image.jpg`} />
      </Head>

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
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/10 to-transparent"></div>

        <div className="container mx-auto px-6 relative z-10">
          {riskLevel && (
            <div className="inline-flex items-center gap-2 bg-yellow-600 text-slate-900 px-4 py-2 rounded-full mb-6 font-semibold">
              <AlertTriangle className="w-5 h-5" />
              MODERATE RISK - Professional Consultation Recommended
            </div>
          )}

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Get a Professional Look<br />
            <span className="text-emerald-400">Before You DIY</span>
          </h1>

          <p className="text-xl text-slate-300 mb-8">
            Your assessment shows some concerns that warrant a closer look.
            Let me give you an honest opinion before you invest time or money.
          </p>

          {/* Two-column layout: Phone CTA + DIY Guide | Contact Form */}
          <div className="grid lg:grid-cols-2 gap-6 max-w-6xl">
            {/* Left column: Call CTA + DIY vs Pro Guide */}
            <div className="space-y-6">
              {/* Primary CTA - Phone */}
              <div className="bg-slate-800 border-2 border-emerald-500 rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <Phone className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Talk to Andrew - Free Consultation
                    </h2>
                    <p className="text-slate-300 text-lg">
                      Quick phone call to discuss your tree situation
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
                  <strong className="text-slate-300">Best times to call:</strong> Mon-Sat 8am-6pm.
                  I'll walk you through what to look for and whether you need professional help.
                </p>
              </div>

              {/* DIY vs Pro Guide - Moved here */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  DIY-Friendly vs Call a Professional
                </h3>

                {/* DIY Friendly */}
                <div className="bg-slate-800 border border-green-600/50 rounded-xl p-6 mb-4">
                  <h4 className="text-xl font-bold text-green-400 mb-4">
                    Often DIY-Friendly:
                  </h4>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                      <span>Small branches (under 3 inches diameter)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                      <span>Work that doesn't require ladders or climbing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                      <span>Clear of power lines, structures, and obstacles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                      <span>Routine pruning on young, healthy trees</span>
                    </li>
                  </ul>
                </div>

                {/* Call a Pro */}
                <div className="bg-slate-800 border border-red-600/50 rounded-xl p-6 mb-4">
                  <h4 className="text-xl font-bold text-red-400 mb-4">
                    Call a Professional:
                  </h4>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-1" />
                      <span>Any work near power lines</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-1" />
                      <span>Trees/branches leaning toward structures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-1" />
                      <span>Large branches (over 6 inches diameter)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-1" />
                      <span>Any tree removal or stump grinding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-1" />
                      <span>Dead, diseased, or compromised trees</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-yellow-600/10 border border-yellow-600/30 rounded-xl p-4">
                  <p className="text-yellow-200 text-sm">
                    <strong>Not sure which category fits?</strong> A quick call can save you from injury or expensive mistakes.
                  </p>
                </div>
              </div>
            </div>

            {/* Right column: Contact Form */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                Or Request a Callback
              </h3>
              <p className="text-slate-400 mb-6">
                Leave your details and I'll reach out within 24 hours to schedule a time that works for you.
              </p>
              <ContactForm urgency="medium" pageSource="tree_consultation" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Get a Second Opinion */}
      <section className="bg-slate-800 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Why Get a Professional Opinion First?
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
              <Shield className="w-10 h-10 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                Safety First
              </h3>
              <p className="text-slate-300">
                Tree work is one of the most dangerous DIY projects. A quick assessment
                can identify hidden risks like powerlines, weak unions, or rot you can't see.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
              <CheckCircle className="w-10 h-10 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                Save Money
              </h3>
              <p className="text-slate-300">
                Sometimes DIY is the right call, sometimes it's not. I'll give you an honest
                assessment so you don't waste money on the wrong approach.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
              <CheckCircle className="w-10 h-10 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                Omaha-Specific Knowledge
              </h3>
              <p className="text-slate-300">
                Every consultation considers Nebraska's unique tree conditions:
                clay soil impacts, ice load risks, EAB treatment decisions, and
                native species behavior. Regional expertise saves you costly mistakes.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
              <CheckCircle className="w-10 h-10 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                No Pressure
              </h3>
              <p className="text-slate-300">
                If your tree is healthy or you can handle it yourself, I'll tell you.
                My goal is to help you make the right decision, not sell you services you don't need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BreadcrumbList Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
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
              "name": "Tree Consultation",
              "item": `${CONTACT.siteUrl}/tree-consultation-omaha`
            }
          ]
        })}
      </script>

      {/* Service Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Tree Consultation",
          "provider": {
            "@type": "LocalBusiness",
            "name": CONTACT.businessName,
            "telephone": CONTACT.phone,
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
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "description": "Free consultation phone call"
          }
        })}
      </script>
    </div>
  )
}
