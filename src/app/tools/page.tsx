import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle, BookOpen, DollarSign, Leaf, Wrench } from 'lucide-react'
import { CONTACT } from '@/lib/constants'
import { treeDatabase } from '@/data/tree-species'

// Derived from the single species source so this count cannot drift (DOC-001).
const SPECIES_COUNT = treeDatabase.length

export const metadata: Metadata = {
  title: 'Five Free Tree-Care Tools',
  description: 'Five free screening and planning tools for tree hazards, species matching, costs, DIY decisions, and common ailments.',
  alternates: { canonical: `${CONTACT.siteUrl}/tools` },
  openGraph: {
    title: 'Five Free Tree-Care Tools | Midwest Roots',
    description: 'Screen warning signs, compare species, plan costs, and explore common tree problems.',
    url: `${CONTACT.siteUrl}/tools`,
  },
}

const tools = [
  {
    slug: 'hazard',
    name: 'Hazard Assessment',
    description: 'Answer 4 questions about your tree\'s root zone, branch structure, health, and what\'s underneath it. Get a risk score and recommended action timeline in under 3 minutes.',
    icon: AlertTriangle,
    color: 'text-red-600',
    bg: 'bg-red-50 border-red-200',
    cta: 'Assess My Tree',
  },
  {
    slug: 'species',
    name: 'Species Identifier',
    description: `Browse ${SPECIES_COUNT} common Omaha-area trees with leaf, bark, and size characteristics. Find yours and learn the specific risks and maintenance needs for that species in Nebraska.`,
    icon: Leaf,
    color: 'text-green-700',
    bg: 'bg-green-50 border-green-200',
    cta: 'Identify My Tree',
  },
  {
    slug: 'cost',
    name: 'Tree Removal Cost Planner',
    description: 'Start with Midwest Roots’ published height-based removal ranges, then see how access, nearby targets, condition, cleanup, and stump work may move the project within or beyond that range.',
    icon: DollarSign,
    color: 'text-amber-700',
    bg: 'bg-amber-50 border-amber-200',
    cta: 'Plan My Removal Cost',
  },
  {
    slug: 'diy',
    name: 'DIY vs Pro Guide',
    description: 'Not every tree job needs a professional. This guide breaks down what you can safely do yourself (small pruning, mulching, planting) vs. what you should never attempt without a pro.',
    icon: Wrench,
    color: 'text-blue-700',
    bg: 'bg-blue-50 border-blue-200',
    cta: 'Check My Task',
  },
  {
    slug: 'ailments',
    name: 'Common Tree Problems',
    description: 'Identify 11 diseases, pests, and environmental issues common to Omaha — from Emerald Ash Borer and Oak Wilt to Iron Chlorosis and Girdling Roots. Includes treatment and timing.',
    icon: BookOpen,
    color: 'text-purple-700',
    bg: 'bg-purple-50 border-purple-200',
    cta: 'Explore Possible Causes',
  },
]

export default function ToolsIndexPage() {
  return (
    <div className="bg-[#f8f6f1] min-h-screen">
      {/* Header */}
      <section className="bg-[#11261B] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-amber-400 font-semibold uppercase tracking-widest text-sm mb-4">Free Resources</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tree Screening & Planning Tools</h1>
          <p className="text-lg text-green-100 max-w-2xl mx-auto">
            Built for Omaha homeowners. No account required—just practical questions, bounded guidance, and clear next steps.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-6">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <div
                key={tool.slug}
                className={`bg-white rounded-2xl border-2 ${tool.bg} p-8 shadow-sm`}
              >
                <div className="flex items-start gap-5">
                  <div className={`flex-shrink-0 ${tool.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-amber-900 mb-2">{tool.name}</h2>
                    <p className="text-amber-800 leading-relaxed mb-5">{tool.description}</p>
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="inline-flex items-center gap-2 bg-[#11261B] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0d1a0f] transition-colors"
                    >
                      {tool.cta} →
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-amber-50 border-t-2 border-amber-200 py-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-amber-900 mb-3">Want a Real Expert Opinion?</h2>
          <p className="text-amber-800 mb-6">
            The tools give you a starting point. For anything that looks serious, Andrew will do a free on-site assessment — no obligation to hire.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`tel:${CONTACT.phoneRaw}`}
              className="px-8 py-4 bg-[#11261B] text-white rounded-xl font-bold hover:bg-[#0d1a0f] transition-colors text-center"
            >
              Call {CONTACT.phone}
            </a>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white border-2 border-amber-300 text-amber-900 rounded-xl font-semibold hover:border-amber-500 transition-colors text-center"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
