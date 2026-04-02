import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Mail, Clock, MapPin } from 'lucide-react'
import { MultiStepContactForm } from '@/components/forms/MultiStepContactForm'
import { CONTACT, BUSINESS_HOURS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Get a Free Tree Service Estimate | Midwest Roots Omaha',
  description: 'Contact Andrew at Midwest Roots Tree Services for a free, no-pressure tree assessment. Call, email, or fill out the form — we respond same day.',
  alternates: { canonical: `${CONTACT.siteUrl}/contact` },
  openGraph: {
    title: 'Contact Midwest Roots Tree Services',
    description: 'Free on-site tree assessment — no obligation. Serving Omaha and surrounding areas.',
    url: `${CONTACT.siteUrl}/contact`,
  },
}

export default function ContactPage() {
  return (
    <div className="bg-[#f8f6f1] min-h-screen">
      {/* Header */}
      <section className="bg-[#11261B] text-white pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-amber-400 font-semibold uppercase tracking-widest text-sm mb-4">No Pressure, Ever</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get a Free Assessment</h1>
          <p className="text-lg text-green-100 max-w-2xl mx-auto">
            Andrew does every initial assessment himself — no junior crew members, no sales pitches. Just an honest look at your trees.
          </p>
        </div>
      </section>

      {/* Contact Details + Form */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: contact info */}
          <div>
            <h2 className="text-2xl font-bold text-amber-900 mb-6">Reach Andrew Directly</h2>

            <div className="space-y-5 mb-8">
              <a
                href={`tel:${CONTACT.phoneRaw}`}
                className="flex items-center gap-4 group"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-[#11261B] rounded-xl flex items-center justify-center group-hover:bg-[#0d1a0f] transition-colors">
                  <Phone className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-amber-700 font-medium">Call or Text</p>
                  <p className="text-xl font-bold text-amber-900 group-hover:text-[#11261B] transition-colors">{CONTACT.phone}</p>
                </div>
              </a>

              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-4 group"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-[#11261B] rounded-xl flex items-center justify-center group-hover:bg-[#0d1a0f] transition-colors">
                  <Mail className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-amber-700 font-medium">Email</p>
                  <p className="text-xl font-bold text-amber-900 group-hover:text-[#11261B] transition-colors">{CONTACT.email}</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#11261B] rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-amber-700 font-medium">Hours</p>
                  <p className="text-xl font-bold text-amber-900">{BUSINESS_HOURS.display}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#11261B] rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-amber-700 font-medium">Service Area</p>
                  <p className="text-base font-semibold text-amber-900">Omaha, Millard, Elkhorn, Gretna,</p>
                  <p className="text-base font-semibold text-amber-900">Papillion, Bellevue, Bennington &amp; more</p>
                </div>
              </div>
            </div>

            {/* How it works */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
              <h3 className="font-bold text-amber-900 mb-4">What Happens Next</h3>
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#11261B] text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <p className="text-amber-800 text-sm">Andrew responds within a few hours — usually same day.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#11261B] text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <p className="text-amber-800 text-sm">He schedules a free on-site walk-through at your convenience.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#11261B] text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <p className="text-amber-800 text-sm">You get an honest assessment and transparent quote — zero pressure to hire.</p>
                </li>
              </ol>
            </div>
          </div>

          {/* Right: form */}
          <div className="relative overflow-hidden rounded-2xl border-2 border-stone-200 bg-white shadow-xl">
            <MultiStepContactForm />
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="bg-amber-50 border-t-2 border-amber-200 py-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-amber-800 mb-4 font-medium">Not sure what you need?</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/tools/hazard" className="px-5 py-2 bg-white border-2 border-amber-200 text-amber-900 rounded-xl text-sm font-semibold hover:border-amber-400 transition-colors">
              Hazard Assessment Tool
            </Link>
            <Link href="/tools/cost" className="px-5 py-2 bg-white border-2 border-amber-200 text-amber-900 rounded-xl text-sm font-semibold hover:border-amber-400 transition-colors">
              Cost Estimator
            </Link>
            <Link href="/tools" className="px-5 py-2 bg-white border-2 border-amber-200 text-amber-900 rounded-xl text-sm font-semibold hover:border-amber-400 transition-colors">
              All Diagnostic Tools
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
