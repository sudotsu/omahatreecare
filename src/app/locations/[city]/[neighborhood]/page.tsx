import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Phone, AlertTriangle, TreePine } from 'lucide-react'
import { allNeighborhoods } from '@/data/locations'
import { neighborhoodData } from '@/data/neighborhoodData'
import { MultiStepContactForm } from '@/components/forms/MultiStepContactForm'
import { CONTACT } from '@/lib/constants'

interface PageProps {
  params: Promise<{ city: string; neighborhood: string }>
}

export function generateStaticParams() {
  return allNeighborhoods
}

const cityDisplay: Record<string, string> = {
  omaha:      'Omaha',
  millard:    'Millard',
  elkhorn:    'Elkhorn',
  gretna:     'Gretna',
  ralston:    'Ralston',
  papillion:  'Papillion',
  bellevue:   'Bellevue',
  bennington: 'Bennington',
}

function toTitleCase(slug: string) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city, neighborhood } = await params
  const isValid = allNeighborhoods.some(n => n.city === city && n.neighborhood === neighborhood)
  if (!isValid) return {}

  const cityName = cityDisplay[city]
  const nd = neighborhoodData[neighborhood]
  if (!nd) return {}

  const neighborhoodName = toTitleCase(neighborhood)
  return {
    title: `Tree Service in ${neighborhoodName}, ${cityName} NE`,
    description: `Tree-service planning information for ${neighborhoodName}. Contact Midwest Roots to confirm service fit, access, and availability.`,
    alternates: { canonical: `${CONTACT.siteUrl}/locations/${city}/${neighborhood}` },
    openGraph: {
      title: `Tree Service in ${neighborhoodName}, ${cityName} | Midwest Roots`,
      description: `Planning considerations for tree work in ${neighborhoodName}. Service fit and availability are confirmed directly.`,
      url: `${CONTACT.siteUrl}/locations/${city}/${neighborhood}`,
    },
  }
}

export default async function NeighborhoodPage({ params }: PageProps) {
  const { city, neighborhood } = await params
  const isValid = allNeighborhoods.some(n => n.city === city && n.neighborhood === neighborhood)
  if (!isValid) notFound()

  const cityName = cityDisplay[city]
  const nd = neighborhoodData[neighborhood]
  if (!nd) notFound()

  const neighborhoodName = toTitleCase(neighborhood)

  return (
    <div className="bg-[#f8f6f1] min-h-screen">
      {/* Hero */}
      <section className="bg-[#11261B] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <nav className="text-green-300 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/locations/${city}`} className="hover:text-white transition-colors">{cityName}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{neighborhoodName}</span>
          </nav>
          <p className="text-amber-400 font-semibold uppercase tracking-widest text-sm mb-3">Service-area planning</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tree Service in {neighborhoodName}</h1>
          <p className="text-lg text-green-100 max-w-2xl">
            Start with the tree, nearby targets, access route, utilities, and cleanup needs at your {neighborhoodName} property. This page does not claim neighborhood-wide tree or soil conditions.
          </p>
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
              Request an Estimate
            </Link>
          </div>
        </div>
      </section>

      {/* Why this neighborhood is unique */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold text-amber-900 mb-8">What to note before requesting tree work</h2>

        <div className="grid md:grid-cols-2 gap-5 mb-8">
          <div className="bg-white border-2 border-amber-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <TreePine className="w-5 h-5 text-[#11261B]" />
              <h3 className="font-bold text-amber-900">Tree and targets</h3>
            </div>
            <p className="text-amber-800 leading-relaxed">Share the species if known, approximate size, visible changes, and anything beneath or beside the tree. The homeowner tools can help organize observations but do not diagnose the tree.</p>
          </div>

          <div className="bg-white border-2 border-amber-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-amber-900 mb-3">Access and work area</h3>
            <p className="text-amber-800 leading-relaxed">Note gates, alleys, slopes, fences, parked vehicles, overhead or buried utilities, and the preferred debris plan. Equipment and service availability are confirmed after site review.</p>
          </div>
        </div>

        {/* Local risk callout — the money content */}
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-7 mb-12">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-800 mb-2">Immediate safety boundary</h3>
              <p className="text-red-700 leading-relaxed">Keep clear of hanging limbs, uprooting, active failure, or utility contact. Call emergency services for immediate danger and the utility for line conflicts; do not work beneath the affected tree.</p>
            </div>
          </div>
        </div>

        {/* Services grid */}
        <h2 className="text-2xl font-bold text-amber-900 mb-5">Services for {neighborhoodName} Homeowners</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-14">
          {[
            { slug: 'tree-removal', name: 'Tree Removal', desc: 'Large, hazardous, and tight-access removals' },
            { slug: 'tree-trimming', name: 'Pruning & Deadwooding', desc: 'Structural pruning, no topping — ever' },
            { slug: 'tree-health-assessment', name: 'Tree-Service Walk-Through', desc: 'Discuss visible concerns and estimate next steps' },
            { slug: 'winter-tree-prep', name: 'Winter Storm Prep', desc: 'Weight reduction before ice season' },
          ].map(({ slug, name, desc }) => (
            <Link
              key={slug}
              href={`/services/${slug}`}
              className="bg-white border-2 border-amber-200 rounded-2xl p-5 hover:border-amber-400 hover:shadow-md transition-all group"
            >
              <h3 className="font-bold text-amber-900 group-hover:text-[#11261B] transition-colors mb-1">{name}</h3>
              <p className="text-amber-700 text-sm">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Inline contact form */}
      <section className="bg-amber-50 border-t-2 border-amber-200 py-14 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-amber-900 mb-2 text-center">Request an On-Site Estimate in {neighborhoodName}</h2>
          <p className="text-amber-700 text-center mb-8">Describe the work you are considering. Midwest Roots will confirm service fit, availability, and what the estimate can cover.</p>
          <div className="bg-white border-2 border-amber-200 rounded-2xl p-8 shadow-sm">
            <MultiStepContactForm
              trackingData={{
                city: cityName,
                neighborhood: neighborhoodName,
                source: `location_page_${neighborhood}`
              }}
            />
          </div>
        </div>
      </section>

      {/* Back + tools */}
      <section className="py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-3 justify-center">
          <Link href={`/locations/${city}`} className="px-5 py-2 bg-white border-2 border-amber-200 text-amber-900 rounded-xl text-sm font-semibold hover:border-amber-400 transition-colors">
            ← All {cityName} Neighborhoods
          </Link>
          <Link href="/tools/hazard" className="px-5 py-2 bg-white border-2 border-amber-200 text-amber-900 rounded-xl text-sm font-semibold hover:border-amber-400 transition-colors">
            Hazard Assessment Tool
          </Link>
          <Link href="/tools/cost" className="px-5 py-2 bg-white border-2 border-amber-200 text-amber-900 rounded-xl text-sm font-semibold hover:border-amber-400 transition-colors">
            Cost Estimator
          </Link>
          <Link href="/blog" className="px-5 py-2 bg-white border-2 border-amber-200 text-amber-900 rounded-xl text-sm font-semibold hover:border-amber-400 transition-colors">
            Tree Care Blog
          </Link>
        </div>
      </section>
    </div>
  )
}
