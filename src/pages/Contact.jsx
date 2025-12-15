import { CheckCircle, Clock, Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'; // ADDED: Fix JSX scope
import { Head } from 'vite-react-ssg'
import ContactForm from '../components/ContactForm'
import { CONTACT } from '../constants'

export default function Contact() {
  const pageTitle = "Contact Us | Midwest Roots Tree Services Omaha"
  const metaDescription = `Contact Midwest Roots Tree Services for a free estimate. Call ${CONTACT.phone} or email us. Serving Omaha, Dundee, Millard, and Elkhorn.`

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <Head prioritizeSeoTags>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={`${CONTACT.siteUrl}/contact`} />

        {/* LocalBusiness Schema specifically for Contact Page */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "mainEntity": {
              "@type": "LocalBusiness",
              "name": CONTACT.businessName,
              "telephone": CONTACT.phone,
              "email": CONTACT.email,
              "url": CONTACT.siteUrl,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": CONTACT.streetAddress, // Ensure these exist in constants or use raw string if needed
                "addressLocality": "Omaha",
                "addressRegion": "NE",
                "postalCode": "68104",
                "addressCountry": "US"
              }
            }
          })}
        </script>
      </Head>

      <div className="container mx-auto px-6 py-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-slate-600">
            We're currently scheduling estimates for the upcoming week.
            Fill out the form below or call us directly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info Column */}
          <div className="space-y-8">
            {/* Main Contact Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h2>

              <div className="space-y-6">
                <a
                  href={`tel:${CONTACT.phoneRaw}`}
                  className="flex items-start gap-4 group"
                >
                  <div className="bg-emerald-100 p-3 rounded-lg group-hover:bg-emerald-200 transition">
                    <Phone className="w-6 h-6 text-emerald-700" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Phone</p>
                    <p className="text-slate-600 group-hover:text-emerald-700 transition">{CONTACT.phone}</p>
                    <p className="text-sm text-slate-400 mt-1">Mon-Sat, 8am - 6pm</p>
                  </div>
                </a>

                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-start gap-4 group"
                >
                  <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition">
                    <Mail className="w-6 h-6 text-blue-700" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Email</p>
                    <p className="text-slate-600 group-hover:text-blue-700 transition">{CONTACT.email}</p>
                    <p className="text-sm text-slate-400 mt-1">We reply within 24 hours</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-amber-700" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Service Area</p>
                    <p className="text-slate-600">Omaha Metro Area</p>
                    <p className="text-sm text-slate-400 mt-1">Dundee, Millard, Elkhorn, Papillion, Bellevue</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us Card */}
            <div className="bg-slate-900 rounded-2xl shadow-lg p-8 text-white">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-400" />
                Why We're Different
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">We actually answer the phone.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">Detailed, written estimates (no surprises).</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">Certified Arborist on staff.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Form Column */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Send a Message</h2>
              <p className="text-slate-600 mb-8">
                Tell us about your tree project. Photos help us give faster estimates.
              </p>
              <ContactForm urgency="normal" pageSource="contact_page" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}