import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { CONTACT } from '@/lib/constants'
import { Suspense } from 'react'
import { ContactFormWrapper } from './ContactFormWrapper'

export const metadata: Metadata = {
  title: 'Request a Tree-Service Estimate',
  description: 'Contact Midwest Roots Tree Services about an Omaha-area tree-service need by phone, email, or the estimate-request form.',
  alternates: { canonical: `${CONTACT.siteUrl}/contact` },
  openGraph: {
    title: 'Contact Midwest Roots Tree Services',
    description: 'Share a tree-service need and receive a receipt after Midwest Roots safely accepts the request.',
    url: `${CONTACT.siteUrl}/contact`,
  },
}

export default async function ContactPage() {
  return (
    <div className="bg-[#f8f6f1] min-h-screen">
      {/* Header */}
      <section className="bg-[#11261B] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-amber-400 font-semibold uppercase tracking-widest text-sm mb-4">Local Tree-Service Requests</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Request an Estimate</h1>
          <p className="text-lg text-green-100 max-w-2xl mx-auto">
            Describe the service you need. A receipt appears only after the first-party system safely accepts your contact details.
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
                  <p className="text-amber-800 text-sm">Response timing depends on current workload and service availability.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#11261B] text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <p className="text-amber-800 text-sm">Midwest Roots confirms service fit, availability, and whether an on-site estimate is appropriate.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#11261B] text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <p className="text-amber-800 text-sm">The written estimate should identify the proposed service scope; diagnosis and formal risk assessment are separate professional services.</p>
                </li>
              </ol>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-white rounded-2xl border-2 border-amber-200 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">Send a Message</h2>
            <Suspense fallback={<div className="h-96 animate-pulse bg-slate-50 rounded-lg" />}>
              <ContactFormWrapper />
            </Suspense>
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
              All Homeowner Tools
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
