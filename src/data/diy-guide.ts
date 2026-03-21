export type TaskCategory = 'safe-diy' | 'risky-diy' | 'professional-only';

export interface DIYTask {
  name: string;
  category: TaskCategory;
  description: string;
  safety: string[];
  tools: string[];
  whenToCall: string;
}

export const tasks: DIYTask[] = [
  {
    name: 'Small Branch Pruning (under 2" diameter)',
    category: 'safe-diy',
    description: 'Removing small branches at ground level or with a ladder',
    safety: [
      'Use proper pruning shears or hand saw',
      'Make clean cuts at the branch collar',
      'Never cut branches above your head',
      'Use a stable ladder with someone to spot you'
    ],
    tools: ['Hand pruners', 'Loppers', 'Hand saw', 'Sturdy ladder', 'Safety glasses'],
    whenToCall: 'If branches are near power lines or over 10 feet high'
  },
  {
    name: 'Small Tree Planting',
    category: 'safe-diy',
    description: 'Planting trees under 6 feet tall',
    safety: [
      'Call 811 before digging to locate utilities',
      'Dig hole 2-3x wider than root ball',
      'Plant at proper depth (root flare visible)',
      'Water thoroughly after planting'
    ],
    tools: ['Shovel', 'Wheelbarrow', 'Garden hose', 'Mulch'],
    whenToCall: 'For large trees or if you hit utility lines while digging'
  },
  {
    name: 'Mulching Around Trees',
    category: 'safe-diy',
    description: 'Applying mulch properly around tree base',
    safety: [
      'Keep mulch 3-6 inches away from trunk',
      'Apply 2-4 inch layer, no deeper',
      'Use organic mulch (wood chips, bark)',
      "Don't create \"volcano mulching\" against trunk"
    ],
    tools: ['Wheelbarrow', 'Rake', 'Mulch'],
    whenToCall: 'Never - this is always safe to DIY'
  },
  {
    name: 'Watering & Basic Care',
    category: 'safe-diy',
    description: 'Regular watering and general tree care',
    safety: [
      'Deep water (12-18 inches) weekly for young trees',
      'Water at soil level, not leaves',
      'Morning watering prevents disease',
      'Adjust for rainfall and season'
    ],
    tools: ['Garden hose', 'Soaker hose (optional)'],
    whenToCall: 'If tree shows signs of disease or severe stress'
  },
  {
    name: 'Medium Branch Pruning (2-4" diameter)',
    category: 'risky-diy',
    description: 'Pruning larger branches that require more skill',
    safety: [
      'Use three-cut method to prevent bark tearing',
      'Never use a chainsaw from a ladder',
      'Wear proper safety equipment',
      'Be aware of branch spring and tension'
    ],
    tools: ['Pole saw', 'Bow saw', 'Safety equipment', 'Chainsaw (if experienced)'],
    whenToCall: "If branches are over head height, near power lines, or you're uncomfortable"
  },
  {
    name: 'Small Stump Removal',
    category: 'risky-diy',
    description: 'Removing stumps under 10 inches diameter',
    safety: [
      'Excavate around stump to expose roots',
      'Cut major roots with saw or axe',
      'Pull stump with vehicle only if safe and clear',
      'Rental stump grinders are powerful and dangerous'
    ],
    tools: ['Shovel', 'Axe', 'Root saw', 'Stump grinder rental (advanced)'],
    whenToCall: "For stumps over 10\", near utilities, or if uncomfortable with equipment"
  },
  {
    name: 'Small Dead Tree Removal (under 15 feet)',
    category: 'risky-diy',
    description: 'Removing small dead trees with open space to fall',
    safety: [
      'Dead trees are unpredictable and brittle',
      'Ensure clear fall zone 2x tree height',
      'Use proper felling techniques',
      'Plan escape route 45° from fall direction'
    ],
    tools: ['Chainsaw', 'Wedges', 'Rope', 'Safety gear'],
    whenToCall: 'If any structures, fences, or obstacles in fall zone, or tree is leaning'
  },
  {
    name: 'Any Work Over 20 Feet High',
    category: 'professional-only',
    description: 'Pruning, removal, or any work requiring climbing or bucket truck',
    safety: [
      'Falls from height are the #1 cause of tree work fatalities',
      'Professional arborists have specialized training and equipment',
      'Insurance rarely covers homeowner tree work injuries',
      'Difficult to judge branch weight and direction of fall from ground'
    ],
    tools: [],
    whenToCall: 'Always call a professional - never attempt high tree work yourself'
  },
  {
    name: 'Trees Near Power Lines',
    category: 'professional-only',
    description: 'Any work on trees touching or within 10 feet of power lines',
    safety: [
      'Electricity can arc through trees and tools',
      'Even "de-energized" lines can be deadly',
      'Special training and equipment required',
      'Your utility company may provide free trimming service'
    ],
    tools: [],
    whenToCall: 'Always - contact utility company first, then professional tree service'
  },
  {
    name: 'Large Tree Removal (over 15 feet)',
    category: 'professional-only',
    description: 'Removing any substantial tree',
    safety: [
      'Requires rigging, ropes, and advanced felling techniques',
      'Unpredictable forces can cause serious injury or property damage',
      'Professionals have liability insurance',
      'Heavy equipment may be needed for large trees'
    ],
    tools: [],
    whenToCall: 'Always - tree removal is extremely dangerous and complex'
  },
  {
    name: 'Storm-Damaged Trees',
    category: 'professional-only',
    description: 'Dealing with broken, hanging, or uprooted trees',
    safety: [
      'Damaged trees under tension are extremely dangerous',
      'Branches can spring with deadly force',
      'Hung-up trees ("widow makers") are unpredictable',
      'Root balls can flip back when cutting'
    ],
    tools: [],
    whenToCall: 'Always - storm damage creates hidden dangers only pros can handle safely'
  },
  {
    name: 'Disease Diagnosis & Treatment',
    category: 'professional-only',
    description: 'Identifying and treating tree diseases',
    safety: [
      'Misdiagnosis can lead to wrong treatment and wasted money',
      'Some diseases require quarantine procedures',
      'Treatment timing is critical for effectiveness',
      'Certified arborists can save trees that homeowners might remove unnecessarily'
    ],
    tools: [],
    whenToCall: 'When tree shows unusual symptoms, discoloration, or decline'
  }
];
