import { notFound } from 'next/navigation'
import { CommonAilments } from '@/components/tools/CommonAilments'
import { CostEstimator } from '@/components/tools/CostEstimator'
import { DIYvsProGuide } from '@/components/tools/DIYvsProGuide'
import { PremiumHazardAssessment } from '@/components/tools/PremiumHazardAssessment'
import { SpeciesIdentifier } from '@/components/tools/SpeciesIdentifier'

const TOOL_MAP = {
  hazard:   PremiumHazardAssessment,
  species:  SpeciesIdentifier,
  cost:     CostEstimator,
  diy:      DIYvsProGuide,
  ailments: CommonAilments,
} as const

type ToolSlug = keyof typeof TOOL_MAP

function isToolSlug(value: string): value is ToolSlug {
  return value in TOOL_MAP
}

export function generateStaticParams() {
  return Object.keys(TOOL_MAP).map((tool) => ({ tool }))
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ tool: string }>
}) {
  const { tool } = await params
  if (!isToolSlug(tool)) notFound()
  const Tool = TOOL_MAP[tool]
  return <Tool />
}
