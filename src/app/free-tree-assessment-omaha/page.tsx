import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { CONTACT } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Finish Your Tree-Service Request',
  description: 'Complete the contact form so Midwest Roots can safely receive your tree-service request.',
  alternates: { canonical: `${CONTACT.siteUrl}/free-tree-assessment-omaha` },
  openGraph: {
    title: 'Request an Estimate | Midwest Roots',
    description: 'Complete the contact form so Midwest Roots can receive your request.',
    url: `${CONTACT.siteUrl}/free-tree-assessment-omaha`,
  },
  robots: { index: false, follow: true },
}

interface PageProps {
  searchParams: Promise<{ zip?: string | string[]; service?: string | string[] }>
}

function getFirstParam(value: string | string[] | undefined): string | undefined {
  return typeof value === 'string' ? value : Array.isArray(value) ? value[0] : undefined
}

export default async function FreeAssessmentPage({ searchParams }: PageProps) {
  const params = await searchParams
  const zip = getFirstParam(params.zip)
  const service = getFirstParam(params.service)

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Finish Your Estimate Request</h1>
          <p className="text-lg text-green-100 max-w-xl mx-auto">
            ZIP code and service preference alone do not send a request. Add a valid contact method in the contact form.
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
            <span className="shrink-0 w-8 h-8 bg-[#11261B] text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
            <div>
              <p className="font-semibold text-amber-900">Complete the contact form</p>
              <p className="text-amber-700 text-sm mt-1">A receipt appears only after our server safely accepts your request.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="shrink-0 w-8 h-8 bg-[#11261B] text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
            <div>
              <p className="font-semibold text-amber-900">Keep the receipt ID</p>
              <p className="text-amber-700 text-sm mt-1">It identifies the accepted record if you need to follow up.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="shrink-0 w-8 h-8 bg-[#11261B] text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
            <div>
              <p className="font-semibold text-amber-900">Midwest Roots reviews the request</p>
              <p className="text-amber-700 text-sm mt-1">Scheduling and on-site estimating depend on the job, location, and current availability.</p>
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
            <p className="text-sm text-amber-700">Call to confirm current availability.</p>
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
