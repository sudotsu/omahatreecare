import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Phone, MapPin, Shield } from 'lucide-react'
import { locations, cities } from '@/data/locations'
import { neighborhoodData, fallbackNeighborhoodData } from '@/data/neighborhoodData'
import { CONTACT } from '@/lib/constants'

interface PageProps {
  params: Promise<{ city: string }>
}

export function generateStaticParams() {
  return cities.map(city => ({ city }))
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

const cityOrdinances: Record<string, { title: string; text: string; contact: string; source: string; reviewedAt: string }> = {
  omaha: {
    title: 'Omaha Tree Permit Rules',
    text: 'Street trees (between sidewalk and curb) are city property — homeowners can prune but cannot remove without City Forester approval. Private property trees have no permit requirement for removal. Historic districts like Dundee and Midtown may have additional HOA covenants.',
    contact: 'Omaha Public Works: (402) 444-5220',
    source: 'https://publicworks.cityofomaha.org/forestry',
    reviewedAt: '2026-03-31',
  },
  millard: {
    title: 'Millard Tree Permit Rules',
    text: 'Millard is part of Omaha — the same Omaha ordinances apply. Street trees require City Forester approval for removal; private property trees have no permit requirement.',
    contact: 'Omaha Public Works: (402) 444-5220',
    source: 'https://publicworks.cityofomaha.org/forestry',
    reviewedAt: '2026-03-31',
  },
  elkhorn: {
    title: 'Elkhorn Tree Permit Rules',
    text: 'Elkhorn is part of Omaha — the same Omaha ordinances apply. Street trees require City Forester approval for removal; private property trees have no permit requirement.',
    contact: 'Omaha Public Works: (402) 444-5220',
    source: 'https://publicworks.cityofomaha.org/forestry',
    reviewedAt: '2026-03-31',
  },
  ralston: {
    title: 'Ralston Tree Permit Rules',
    text: 'Ralston is an independent municipality with its own municipal code. Street trees require City approval for work. Private property trees generally do not require a permit for removal, but consultation with the City is recommended for large canopy trees.',
    contact: 'Ralston City Hall: (402) 331-6674',
    source: 'https://www.cityofralston.com/municipal-code',
    reviewedAt: '2026-03-31',
  },
  gretna: {
    title: 'Gretna Tree Permit Rules',
    text: 'No permit is required to remove trees on private property in Gretna. Street tree work adjacent to city right-of-way requires city approval before any work begins.',
    contact: 'Gretna City Hall: (402) 332-4565',
    source: 'https://www.gretnane.org/168/Public-Works',
    reviewedAt: '2026-03-31',
  },
  papillion: {
    title: 'Papillion Tree Permit Rules',
    text: 'Papillion is a Tree City USA — street tree removal requires a permit from Public Works. Private property trees have no permit requirement for removal. Papillion takes street tree preservation seriously.',
    contact: 'Papillion Public Works: (402) 537-6900',
    source: 'https://www.papillion.org/218/Public-Works',
    reviewedAt: '2026-03-31',
  },
  bellevue: {
    title: 'Bellevue Tree Permit Rules',
    text: 'No permit is required for removing trees on private property in Bellevue. Trees in the easement area between the sidewalk and curb require city approval before removal.',
    contact: 'Bellevue City Hall: (402) 293-3000',
    source: 'https://www.bellevue.net/departments/public-works',
    reviewedAt: '2026-03-31',
  },
  bennington: {
    title: 'Bennington Tree Permit Rules',
    text: 'Bennington is an independent city with its own municipal standards. No local permit is required for private property tree removal, but trees in public right-of-ways are managed by the City.',
    contact: 'Bennington City Hall: (402) 238-2375',
    source: 'https://cityofbennington.com/ordinances/',
    reviewedAt: '2026-03-31',
  },
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params
  const display = cityDisplay[city]
  if (!display) return {}
  return {
    title: `Tree Service in ${display}, NE | Midwest Roots`,
    description: `Expert tree removal, pruning, and health assessment in ${display}, Nebraska. Serving all neighborhoods. Free on-site assessment — call Midwest Roots.`,
    alternates: { canonical: `${CONTACT.siteUrl}/locations/${city}` },
    openGraph: {
      title: `Tree Service in ${display}, NE | Midwest Roots`,
      description: `Professional tree care for ${display} homeowners. Free assessment.`,
      url: `${CONTACT.siteUrl}/locations/${city}`,
    },
  }
}

export default async function CityPage({ params }: PageProps) {
  const { city } = await params
  const display = cityDisplay[city]
  if (!display) notFound()

  const neighborhoods = locations[city as keyof typeof locations] ?? []
  const ordinance = cityOrdinances[city]
  const otherCities = cities.filter(c => c !== city)

  return (
    <div className="bg-[#f8f6f1] min-h-screen">
      {/* Hero */}
      <section className="bg-[#11261B] text-white pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <nav className="text-green-300 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="hover:text-green-300">Locations</span>
            <span className="mx-2">/</span>
            <span className="text-white">{display}</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-6 h-6 text-amber-400 flex-shrink-0" />
            <p className="text-amber-400 font-semibold uppercase tracking-widest text-sm">Local Tree Service</p>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tree Service in {display}, NE</h1>
          <p className="text-lg text-green-100 max-w-2xl">
            Serving all {display} neighborhoods — from routine pruning to hazardous removals. Free on-site assessment, no pressure.
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
              Free Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* Neighborhood Grid */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold text-amber-900 mb-2">Neighborhoods We Serve in {display}</h2>
        <p className="text-amber-700 mb-8">Each neighborhood has unique tree challenges. Click yours for hyper-local information.</p>

        <div className="grid sm:grid-cols-2 gap-4">
          {neighborhoods.map(slug => {
            const nd = neighborhoodData[slug] ?? fallbackNeighborhoodData
            const displayName = slug
              .split('-')
              .map(w => w.charAt(0).toUpperCase() + w.slice(1))
              .join(' ')
            return (
              <Link
                key={slug}
                href={`/locations/${city}/${slug}`}
                className="bg-white border-2 border-amber-200 rounded-2xl p-5 hover:border-amber-400 hover:shadow-md transition-all group"
              >
                <h3 className="font-bold text-amber-900 group-hover:text-[#11261B] transition-colors mb-1">{displayName}</h3>
                <p className="text-xs text-amber-600 font-medium uppercase tracking-wide mb-2">{nd.vibe}</p>
                <p className="text-amber-700 text-sm leading-snug">{nd.meta_snippet}</p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Ordinance section */}
      {ordinance && (
        <section className="max-w-4xl mx-auto px-6 pb-14">
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-[#11261B] flex-shrink-0" />
              <h2 className="text-xl font-bold text-amber-900">{ordinance.title}</h2>
            </div>
            <p className="text-amber-800 leading-relaxed mb-4">{ordinance.text}</p>
            <p className="text-sm font-semibold text-amber-700">{ordinance.contact}</p>
            <p className="text-xs text-amber-600 mt-2">We handle all permit coordination and city notifications on your behalf.</p>
          </div>
        </section>
      )}

      {/* Services links */}
      <section className="bg-amber-50 border-t-2 border-amber-200 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-amber-900 mb-5">Our Services</h2>
          <div className="flex flex-wrap gap-3 mb-10">
            {['tree-removal', 'tree-trimming', 'tree-health-assessment', 'winter-tree-prep'].map(slug => {
              const label: Record<string, string> = {
                'tree-removal': 'Tree Removal',
                'tree-trimming': 'Tree Trimming',
                'tree-health-assessment': 'Health Assessment',
                'winter-tree-prep': 'Winter Prep',
              }
              return (
                <Link key={slug} href={`/services/${slug}`} className="px-5 py-2 bg-white border-2 border-amber-200 text-amber-900 rounded-xl text-sm font-semibold hover:border-amber-400 transition-colors">
                  {label[slug]}
                </Link>
              )
            })}
          </div>

          <h2 className="text-xl font-bold text-amber-900 mb-5">Other Service Areas</h2>
          <div className="flex flex-wrap gap-3">
            {otherCities.map(c => (
              <Link key={c} href={`/locations/${c}`} className="px-5 py-2 bg-white border-2 border-amber-200 text-amber-900 rounded-xl text-sm font-semibold hover:border-amber-400 transition-colors">
                {cityDisplay[c]}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
