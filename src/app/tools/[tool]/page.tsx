import { notFound } from 'next/navigation'
import { CommonAilments } from '@/components/tools/CommonAilments'
import { CostEstimator } from '@/components/tools/CostEstimator'
import { DIYvsProGuide } from '@/components/tools/DIYvsProGuide'
import { HazardAssessment } from '@/components/tools/HazardAssessment'
import { SpeciesIdentifier } from '@/components/tools/SpeciesIdentifier'

const TOOL_MAP = {
  hazard:   HazardAssessment,
  species:  SpeciesIdentifier,
  cost:     CostEstimator,
  diy:      DIYvsProGuide,
  ailments: CommonAilments,
} as const

type ToolSlug = keyof typeof TOOL_MAP

export function generateStaticParams() {
  return Object.keys(TOOL_MAP).map((tool) => ({ tool }))
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ tool: string }>
}) {
  const { tool } = await params
  const Tool = TOOL_MAP[tool as ToolSlug]
  if (!Tool) notFound()
  return <Tool />
}
