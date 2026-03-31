import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Phone, CheckCircle } from 'lucide-react'
import { servicesData, serviceIds } from '@/data/services'
import { CONTACT } from '@/lib/constants'

interface PageProps {
  params: Promise<{ service: string }>
}

export function generateStaticParams() {
  return serviceIds.map(service => ({ service }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service } = await params
  const data = servicesData[service]
  if (!data) return {}
  return {
    title: `${data.title} | Midwest Roots Tree Services`,
    description: data.meta_desc,
    alternates: { canonical: `${CONTACT.siteUrl}/services/${service}` },
    openGraph: {
      title: `${data.title} | Midwest Roots`,
      description: data.meta_desc,
      url: `${CONTACT.siteUrl}/services/${service}`,
    },
  }
}

const otherServices = (currentSlug: string) =>
  serviceIds.filter(s => s !== currentSlug)

const serviceLabel: Record<string, string> = {
  'tree-removal':          'Tree Removal',
  'tree-trimming':         'Tree Trimming',
  'tree-health-assessment':'Health Assessment',
  'winter-tree-prep':      'Winter Prep',
}

export default async function ServicePage({ params }: PageProps) {
  const { service } = await params
  const data = servicesData[service]
  if (!data) notFound()

  const benefits = [data.benefit_1, data.benefit_2, data.benefit_3]
  const related = otherServices(service)

  return (
    <div className="bg-[#f8f6f1] min-h-screen">
      {/* Hero */}
      <section className="bg-[#11261B] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <nav className="text-green-300 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-green-100">Services</span>
            <span className="mx-2">/</span>
            <span className="text-white">{data.title}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{data.hero_headline}</h1>
          <p className="text-xl text-green-100 max-w-2xl">{data.hero_sub}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={`tel:${CONTACT.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 text-[#11261B] rounded-xl font-bold hover:bg-amber-300 transition-colors"
            >
              <Phone className="w-5 h-5" />
              {CONTACT.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white border border-white/30 rounded-xl font-semibold hover:bg-white/20 transition-colors"
            >
              Get Free Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* Pain point + Solution */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-7">
            <h2 className="text-lg font-bold text-red-800 mb-3">The Problem</h2>
            <p className="text-red-700 leading-relaxed">{data.pain_point}</p>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-7">
            <h2 className="text-lg font-bold text-green-800 mb-3">Our Approach</h2>
            <p className="text-green-700 leading-relaxed">{data.solution}</p>
          </div>
        </div>

        {/* Benefits */}
        <h2 className="text-2xl font-bold text-amber-900 mb-6">What You Get</h2>
        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {benefits.map((benefit) => (
            <div key={benefit} className="bg-white border-2 border-amber-200 rounded-2xl p-6 flex items-start gap-3 shadow-sm">
              <CheckCircle className="w-6 h-6 text-[#11261B] flex-shrink-0 mt-0.5" />
              <p className="font-semibold text-amber-900">{benefit}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-[#11261B] text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to Get Started?</h2>
          <p className="text-green-100 mb-6">Free on-site assessment — Andrew comes to you, no obligation.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`tel:${CONTACT.phoneRaw}`}
              className="px-8 py-4 bg-amber-400 text-[#11261B] rounded-xl font-bold hover:bg-amber-300 transition-colors text-center"
            >
              Call {CONTACT.phone}
            </a>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white/10 text-white border border-white/30 rounded-xl font-semibold hover:bg-white/20 transition-colors text-center"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>

      {/* Related services + tools */}
      <section className="bg-amber-50 border-t-2 border-amber-200 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-amber-900 mb-5">Other Services</h2>
          <div className="flex flex-wrap gap-3 mb-8">
            {related.map(slug => (
              <Link
                key={slug}
                href={`/services/${slug}`}
                className="px-5 py-2 bg-white border-2 border-amber-200 text-amber-900 rounded-xl text-sm font-semibold hover:border-amber-400 transition-colors"
              >
                {serviceLabel[slug] ?? slug}
              </Link>
            ))}
          </div>
          <h2 className="text-xl font-bold text-amber-900 mb-5">Free Diagnostic Tools</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/tools/hazard" className="px-5 py-2 bg-white border-2 border-amber-200 text-amber-900 rounded-xl text-sm font-semibold hover:border-amber-400 transition-colors">
              Hazard Assessment
            </Link>
            <Link href="/tools/cost" className="px-5 py-2 bg-white border-2 border-amber-200 text-amber-900 rounded-xl text-sm font-semibold hover:border-amber-400 transition-colors">
              Cost Estimator
            </Link>
            <Link href="/tools" className="px-5 py-2 bg-white border-2 border-amber-200 text-amber-900 rounded-xl text-sm font-semibold hover:border-amber-400 transition-colors">
              All Tools
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
