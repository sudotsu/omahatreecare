import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CommonAilments } from '@/components/tools/CommonAilments'
import { CostEstimator } from '@/components/tools/CostEstimator'
import { DIYvsProGuide } from '@/components/tools/DIYvsProGuide'
import { PremiumHazardAssessment } from '@/components/tools/PremiumHazardAssessment'
import { SpeciesIdentifier } from '@/components/tools/SpeciesIdentifier'
import { ToolAnalytics } from '@/components/tools/ToolAnalytics'
import { CONTACT } from '@/lib/constants'

const TOOL_MAP = {
  hazard:   PremiumHazardAssessment,
  species:  SpeciesIdentifier,
  cost:     CostEstimator,
  diy:      DIYvsProGuide,
  ailments: CommonAilments,
} as const

type ToolSlug = keyof typeof TOOL_MAP

const TOOL_TITLES: Record<ToolSlug, string> = {
  hazard: 'Tree Hazard Screening', species: 'Tree Species Matching Guide', cost: 'Tree Removal Cost Planner',
  diy: 'DIY or Professional Decision Guide', ailments: 'Common Tree Ailments Reference',
}

const TOOL_DESCRIPTIONS: Record<ToolSlug, string> = {
  hazard: 'A preliminary homeowner screening based on self-reported tree warning signs and nearby targets.',
  species: 'Compare visible characteristics with ten common Omaha-area tree profiles; matches are not confirmed identifications.',
  cost: 'Use Midwest Roots tree-removal planning ranges to see how height, access, nearby targets, condition, cleanup, and stump work shape an estimate.',
  diy: 'Ground-based homeowner tasks, stop conditions, and work that should be left to appropriately equipped providers.',
  ailments: 'Educational reference entries for common tree symptoms, with uncertainty and on-site referral thresholds.',
}

function isToolSlug(value: string): value is ToolSlug {
  return value in TOOL_MAP
}

export function generateStaticParams() {
  return Object.keys(TOOL_MAP).map((tool) => ({ tool }))
}

export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> {
  const { tool } = await params
  if (!isToolSlug(tool)) return {}
  return { title: TOOL_TITLES[tool], description: TOOL_DESCRIPTIONS[tool], alternates: { canonical: `${CONTACT.siteUrl}/tools/${tool}` } }
}

export default async function ToolPage({
  params,
  searchParams,
}: {
  params: Promise<{ tool: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const { tool } = await params
  if (!isToolSlug(tool)) notFound()
  const Tool = TOOL_MAP[tool]
  // Only the hazard tool reads query input (a preselected species); the other
  // tools take no props, so query params are not threaded through them.
  return (
    <>
      <h1 className="sr-only">{TOOL_TITLES[tool]}</h1>
      <ToolAnalytics tool={tool}>
        {tool === 'hazard' ? (
          <PremiumHazardAssessment searchParams={await searchParams} />
        ) : (
          <Tool />
        )}
      </ToolAnalytics>
    </>
  )
}
