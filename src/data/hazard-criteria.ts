/**
 * Hazard assessment data — ISA Tree Risk Assessment framework
 * Risk score = likelihood × consequence (max 4 × 4 = 16)
 */

export type RiskColor = 'red' | 'orange' | 'yellow' | 'green';

export interface RiskLevel {
  level: string;
  color: RiskColor;
  action: string;
}

export interface AssessmentOption {
  text: string;
  value: number;
  issues: string[];
}

export interface AssessmentQuestion {
  title: string;
  description: string;
  options: AssessmentOption[];
  /** When true, this question scores the "consequence" axis rather than "likelihood" */
  isConsequence?: boolean;
}

/** Risk level thresholds and corresponding actions */
export const RISK_LEVELS: { threshold: number; level: RiskLevel }[] = [
  {
    threshold: 9,
    level: { level: 'Extreme', color: 'red',    action: 'Immediate action required (0-14 days)' }
  },
  {
    threshold: 6,
    level: { level: 'High',    color: 'orange', action: 'Priority service within 30-60 days' }
  },
  {
    threshold: 3,
    level: { level: 'Moderate',color: 'yellow', action: 'Schedule maintenance within 90 days' }
  },
  {
    threshold: 0,
    level: { level: 'Low',     color: 'green',  action: 'Monitor during regular visits' }
  }
];

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    title: 'Root & Trunk Condition',
    description: 'Check the base of your tree for these warning signs',
    options: [
      { text: 'Tree appears healthy with no visible defects',                                   value: 1, issues: [] },
      { text: 'Minor issues like small cracks or minor lean',                                   value: 2, issues: ['Minor structural defects'] },
      { text: 'Significant cracks, large cavities, or noticeable lean',                         value: 3, issues: ['Significant structural defects'] },
      { text: 'Severe lean, major cracks, mushrooms at base, or lifting soil',                  value: 4, issues: ['Severe structural damage', 'Root decay indicators'] }
    ]
  },
  {
    title: 'Branch Structure',
    description: 'Look at the branches and overall tree structure',
    options: [
      { text: 'Branches appear strong and well-attached',                                        value: 1, issues: [] },
      { text: 'Some dead branches or minor structural issues',                                   value: 2, issues: ['Dead branches present'] },
      { text: 'Multiple dead branches, weak attachments, or co-dominant stems',                  value: 3, issues: ['Multiple dead branches', 'Weak branch unions'] },
      { text: 'Large dead branches, severe storm damage, or major splits',                       value: 4, issues: ['Large dead limbs (widow makers)', 'Major storm damage'] }
    ]
  },
  {
    title: 'Tree Health',
    description: 'Assess the overall health and foliage',
    options: [
      { text: 'Full, healthy canopy with good color',                                            value: 1, issues: [] },
      { text: 'Some thinning or minor discoloration',                                            value: 2, issues: ['Minor canopy thinning'] },
      { text: 'Significant die-back or less than 50% normal foliage',                           value: 3, issues: ['Significant die-back', 'Sparse foliage'] },
      { text: 'Tree is dead or dying with minimal living tissue',                                value: 4, issues: ['Tree in severe decline or dead'] }
    ]
  },
  {
    title: 'Target Assessment',
    description: 'What could be damaged if the tree or branches fail?',
    options: [
      { text: 'Remote area, no structures or people nearby',                                     value: 1, issues: [] },
      { text: 'Occasional use area, some property at risk',                                      value: 2, issues: [] },
      { text: 'Frequent use area, near structures or regular parking',                           value: 3, issues: [] },
      { text: 'House, garage, or high-traffic area directly below',                              value: 4, issues: [] }
    ],
    isConsequence: true
  }
];

/**
 * Derives the risk level from a numeric score.
 * Score = likelihood × consequence.
 */
export function getRiskLevel(score: number): RiskLevel {
  for (const { threshold, level } of RISK_LEVELS) {
    if (score >= threshold) return level;
  }
  return RISK_LEVELS[RISK_LEVELS.length - 1].level;
}
