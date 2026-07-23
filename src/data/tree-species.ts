// Single source of truth for the Omaha-area tree species reference used by
// the Species tool and any tool-count copy (DOC-001). Update species here only.

export interface Tree {
  name: string
  scientificName: string
  concernLevel: 'high' | 'moderate' | 'low'
  characteristics: string[]
  commonIssues: string[]
  strengths?: string[]
  maintenanceNotes: string
  size: string
}

export const treeDatabase: Tree[] = [
  {
    name: 'Ash Trees',
    scientificName: 'Fraxinus spp.',
    concernLevel: 'high',
    characteristics: ['Compound leaves (5–11 leaflets)', 'Opposite branching', 'Diamond-pattern bark'],
    commonIssues: [
      'Emerald ash borer can cause severe decline and death in untreated ash',
      'Decline can progress quickly after symptoms become visible',
      'Dead ash branches can become brittle and hazardous',
    ],
    maintenanceNotes: 'If you suspect emerald ash borer, avoid choosing treatment or removal from this guide alone. Ask a qualified plant-health professional to confirm the tree, condition, treatment window, and current options on site.',
    size: '50–80 feet',
  },
  {
    name: 'Silver Maple',
    scientificName: 'Acer saccharinum',
    concernLevel: 'high',
    characteristics: ['Deeply lobed leaves with silvery undersides', 'Fast growth', 'Shallow roots'],
    commonIssues: [
      'Weak wood prone to storm breakage',
      'Surface roots may conflict with lawns, walks, or nearby hardscape',
      'V-shaped branch unions split easily',
      'Fast growth and included bark can create maintenance concerns',
    ],
    maintenanceNotes: 'Watch for included bark, storm damage, and dead branches. Pruning needs and timing depend on the individual tree and site.',
    size: '50–80 feet',
  },
  {
    name: 'Cottonwood',
    scientificName: 'Populus deltoides',
    concernLevel: 'high',
    characteristics: ['Large triangular leaves', 'Thick ridged bark', 'Massive size'],
    commonIssues: [
      'Brittle branches with frequent limb drop',
      'Aggressive roots seek water lines',
      'Large dead branches ("widow makers")',
      'Large mature size can make failures consequential near targets',
    ],
    maintenanceNotes: 'Consider mature size, nearby targets, access, and visible deadwood when planning an on-site review.',
    size: '70–100+ feet',
  },
  {
    name: 'Bradford Pear',
    scientificName: 'Pyrus calleryana',
    concernLevel: 'high',
    characteristics: ['White spring flowers', 'Oval shape', 'Tight branching'],
    commonIssues: [
      'Tight branch unions can split during wind or ice events',
      'All branches emerge at similar angle creating structural weakness',
      'Ice/wind storms cause total failures',
    ],
    maintenanceNotes: 'Inspect branch unions and storm damage. Whether pruning or removal is appropriate depends on the individual tree and nearby targets.',
    size: '30–50 feet',
  },
  {
    name: 'Bur Oak',
    scientificName: 'Quercus macrocarpa',
    concernLevel: 'low',
    characteristics: ['Large lobed leaves with "bur" on acorn cap', 'Massive spreading form', 'Thick bark'],
    commonIssues: [
      'Slow growth makes replacement difficult',
      'Iron chlorosis on alkaline soils (but more tolerant than pin oak)',
      'Oak wilt is a serious regional disease to rule out when symptoms fit',
    ],
    strengths: ['Long-lived when well-sited', 'Strong mature form', 'Tolerates many dry sites'],
    maintenanceNotes: 'Preserve healthy mature trees when practical. Confirm current local oak-wilt precautions and any chlorosis treatment with a qualified professional before work.',
    size: '70–80 feet spread',
  },
  {
    name: 'Red Oak',
    scientificName: 'Quercus rubra',
    concernLevel: 'low',
    characteristics: ['Pointed leaf lobes', 'Reddish fall color', 'Gray furrowed bark'],
    commonIssues: [
      'Oak wilt susceptibility (DO NOT prune April–July)',
      'Iron chlorosis on alkaline soils',
    ],
    strengths: ['Fast-growing for an oak', 'Strong wood', 'Beautiful fall color'],
    maintenanceNotes: 'Monitor unusual canopy browning and confirm current local oak-wilt precautions before pruning or treatment.',
    size: '60–75 feet',
  },
  {
    name: 'Hackberry',
    scientificName: 'Celtis occidentalis',
    concernLevel: 'moderate',
    characteristics: ['Warty bark', 'Elm-like leaves', 'Very adaptable'],
    commonIssues: ["Witches' broom (harmless but unsightly)", 'Occasionally develops co-dominant stems'],
    strengths: ['Extremely tough', 'Wind-resistant', 'Drought-tolerant'],
    maintenanceNotes: 'Often considered for difficult urban sites, but cultivar, mature size, utilities, and site conditions still matter.',
    size: '40–60 feet',
  },
  {
    name: 'Honeylocust',
    scientificName: 'Gleditsia triacanthos',
    concernLevel: 'moderate',
    characteristics: ['Fine compound leaves', 'Delicate appearance', 'Thornless cultivars common'],
    commonIssues: ['Cankers can develop on stressed trees', 'Occasional branch dieback'],
    strengths: ['Drought-tolerant', 'Filtered shade', 'Clean fall cleanup'],
    maintenanceNotes: 'Often used in urban sites. Check cultivar, mature size, cankers, and branch condition for the specific tree.',
    size: '30–70 feet',
  },
  {
    name: 'American Elm (Resistant)',
    scientificName: 'Ulmus americana',
    concernLevel: 'moderate',
    characteristics: ['Vase-shaped form', 'Saw-toothed leaves', 'Graceful branching'],
    commonIssues: ['Dutch Elm Disease in non-resistant varieties', 'Elm leaf beetle'],
    strengths: ['Classic form', 'Rapid growth', 'Disease-resistant cultivars available'],
    maintenanceNotes: 'When planting, compare locally appropriate disease-resistant cultivars. Existing trees with suspicious decline need confirmation rather than identification from this guide alone.',
    size: '60–80 feet',
  },
  {
    name: 'Kentucky Coffeetree',
    scientificName: 'Gymnocladus dioicus',
    concernLevel: 'low',
    characteristics: ['Very large compound leaves', 'Thick rough bark', 'Unique winter silhouette'],
    commonIssues: ['Large pods create minor litter', 'Slow to leaf out in spring'],
    strengths: ['Tolerates many urban conditions', 'Few commonly reported serious pest issues', 'Distinctive mature form'],
    maintenanceNotes: 'A possible regional planting option when its mature size and site needs fit; confirm cultivar and placement before planting.',
    size: '60–75 feet',
  },
]
