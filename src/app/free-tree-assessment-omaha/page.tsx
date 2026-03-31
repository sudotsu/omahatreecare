import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Phone, Clock } from 'lucide-react'
import { CONTACT, BUSINESS_HOURS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Free Tree Assessment Request Received | Midwest Roots Omaha',
  description: 'Your free tree assessment request has been received. Andrew will contact you within a few hours to schedule your on-site visit.',
  alternates: { canonical: `${CONTACT.siteUrl}/free-tree-assessment-omaha` },
  openGraph: {
    title: 'Assessment Request Received | Midwest Roots',
    description: 'We got your request. Andrew will be in touch shortly.',
    url: `${CONTACT.siteUrl}/free-tree-assessment-omaha`,
  },
  robots: { index: false, follow: true },
}

interface PageProps {
  searchParams: Promise<{ zip?: string; service?: string }>
}

export default async function FreeAssessmentPage({ searchParams }: PageProps) {
  const params = await searchParams
  const zip = params.zip
  const service = params.service

  const serviceLabel = service
    ? service
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : null

  return (
    <div className="bg-[#f8f6f1] min-h-screen">
      {/* Hero */}
      <section className="bg-[#11261B] text-white py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-[#11261B]" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Request Received!</h1>
          <p className="text-lg text-green-100 max-w-xl mx-auto">
            Andrew will reach out within a few hours to confirm your free on-site assessment.
          </p>
        </div>
      </section>

      {/* Summary */}
      <section className="max-w-2xl mx-auto px-6 py-12">
        {(zip || serviceLabel) && (
          <div className="bg-white border-2 border-amber-200 rounded-2xl p-6 mb-8 shadow-sm">
            <h2 className="text-lg font-bold text-amber-900 mb-4">Your Request Summary</h2>
            <dl className="space-y-3">
              {serviceLabel && (
                <div className="flex justify-between">
                  <dt className="text-amber-700 font-medium">Service Requested</dt>
                  <dd className="text-amber-900 font-semibold">{serviceLabel}</dd>
                </div>
              )}
              {zip && (
                <div className="flex justify-between">
                  <dt className="text-amber-700 font-medium">Your Zip Code</dt>
                  <dd className="text-amber-900 font-semibold">{zip}</dd>
                </div>
              )}
            </dl>
          </div>
        )}

        {/* Next steps */}
        <div className="space-y-6 mb-10">
          <h2 className="text-2xl font-bold text-amber-900">What Happens Next</h2>

          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-[#11261B] text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
            <div>
              <p className="font-semibold text-amber-900">Andrew reviews your request</p>
              <p className="text-amber-700 text-sm mt-1">Usually within a few hours. He&apos;ll look up your address and mentally prep before calling.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-[#11261B] text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
            <div>
              <p className="font-semibold text-amber-900">You get a call to schedule</p>
              <p className="text-amber-700 text-sm mt-1">He picks a time that works for you — evenings and weekends included.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-[#11261B] text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
            <div>
              <p className="font-semibold text-amber-900">Free on-site walk-through</p>
              <p className="text-amber-700 text-sm mt-1">Andrew comes out, looks at your trees, gives you straight answers. Zero pressure — if your tree is fine, he&apos;ll tell you.</p>
            </div>
          </div>
        </div>

        {/* Direct contact */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
          <h3 className="font-bold text-amber-900 mb-4">Need to Reach Andrew Directly?</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`tel:${CONTACT.phoneRaw}`}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#11261B] text-white rounded-xl font-semibold hover:bg-[#0d1a0f] transition-colors"
            >
              <Phone className="w-4 h-4" />
              {CONTACT.phone}
            </a>
            <div className="flex items-center gap-2 text-amber-700 text-sm">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span>{BUSINESS_HOURS.display}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="bg-amber-50 border-t-2 border-amber-200 py-10 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-amber-800 mb-4 font-medium">While you wait, explore our free tools:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/tools/hazard" className="px-5 py-2 bg-white border-2 border-amber-200 text-amber-900 rounded-xl text-sm font-semibold hover:border-amber-400 transition-colors">
              Tree Hazard Assessment
            </Link>
            <Link href="/tools/cost" className="px-5 py-2 bg-white border-2 border-amber-200 text-amber-900 rounded-xl text-sm font-semibold hover:border-amber-400 transition-colors">
              Cost Estimator
            </Link>
            <Link href="/tools/ailments" className="px-5 py-2 bg-white border-2 border-amber-200 text-amber-900 rounded-xl text-sm font-semibold hover:border-amber-400 transition-colors">
              Tree Problem Identifier
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
