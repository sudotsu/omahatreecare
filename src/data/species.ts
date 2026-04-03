export type RiskLevel = 'high' | 'moderate' | 'low';
export type ThreatProfile = 'CRITICAL' | 'ELEVATED' | 'STANDARD';

export interface TreeSpecies {
  name: string;
  scientificName: string;
  riskLevel: RiskLevel;
  threatProfile: ThreatProfile;
  characteristics: string[];
  commonIssues: string[];
  strengths?: string[];
  maintenanceNotes: string;
  size: string;
}

export const treeDatabase: TreeSpecies[] = [
  {
    name: 'Ash Trees',
    scientificName: 'Fraxinus spp.',
    riskLevel: 'high',
    threatProfile: 'CRITICAL',
    characteristics: ['Compound leaves (5-11 leaflets)', 'Opposite branching', 'Diamond-pattern bark'],
    commonIssues: [
      'Fatal Risk: 99% mortality if untreated due to Emerald Ash Borer (EAB)',
      'Rapid decline: 2-4 years from infestation to death',
      'Extremely brittle wood when dead = extreme hazard'
    ],
    maintenanceNotes: 'Remove all untreated ash unless active EAB treatment program in place. Treatment requires trunk injections every 2 years ($10-15 per diameter inch). Treatment must start BEFORE infestation for best results.',
    size: '50-80 feet'
  },
  {
    name: 'Silver Maple',
    scientificName: 'Acer saccharinum',
    riskLevel: 'high',
    threatProfile: 'ELEVATED',
    characteristics: ['Deeply lobed leaves with silvery undersides', 'Fast growth', 'Shallow roots'],
    commonIssues: [
      'Weak wood prone to storm breakage',
      'Aggressive surface roots damage sidewalks/foundations',
      'V-shaped branch unions split easily',
      'Short lifespan (60-80 years) with rapid decline'
    ],
    maintenanceNotes: 'Requires regular pruning every 3-5 years. Monitor branch unions closely. Plan for eventual removal as tree matures.',
    size: '50-80 feet'
  },
  {
    name: 'Cottonwood',
    scientificName: 'Populus deltoides',
    riskLevel: 'high',
    threatProfile: 'ELEVATED',
    characteristics: ['Large triangular leaves', 'Thick ridged bark', 'Massive size'],
    commonIssues: [
      'Brittle branches with frequent limb drop',
      'Aggressive roots seek water lines',
      'Large dead branches ("widow makers")',
      'Short lifespan for size (70-100 years)'
    ],
    maintenanceNotes: 'Keep away from structures. Regular dead-wooding is essential for safety.',
    size: '70-100+ feet'
  },
  {
    name: 'Bradford Pear',
    scientificName: 'Pyrus calleryana',
    riskLevel: 'high',
    threatProfile: 'CRITICAL',
    characteristics: ['White spring flowers', 'Oval shape', 'Tight branching'],
    commonIssues: [
      'Weak branch attachments causing catastrophic splitting at 15-20 years',
      'All branches emerge at similar angle creating structural weakness',
      'Ice/wind storms cause total failures'
    ],
    maintenanceNotes: 'Remove proactively before maturity. Do not plant new Bradford Pears.',
    size: '30-50 feet'
  },
  {
    name: 'Bur Oak',
    scientificName: 'Quercus macrocarpa',
    riskLevel: 'low',
    threatProfile: 'STANDARD',
    characteristics: ['Large lobed leaves with "bur" on acorn cap', 'Massive spreading form', 'Thick bark'],
    commonIssues: [
      'Slow growth makes replacement difficult',
      'Iron chlorosis on alkaline soils (but more tolerant than pin oak)',
      'Oak wilt (rare but fatal)'
    ],
    strengths: ['Extremely long-lived (200-300 years)', 'Very strong wood', 'Drought-tolerant'],
    maintenanceNotes: 'Preserve when possible. Prune ONLY October-March (outside oak wilt season). Deep root fertilization helps with chlorosis.',
    size: '70-80 feet spread'
  },
  {
    name: 'Red Oak',
    scientificName: 'Quercus rubra',
    riskLevel: 'low',
    threatProfile: 'ELEVATED',
    characteristics: ['Pointed leaf lobes', 'Reddish fall color', 'Gray furrowed bark'],
    commonIssues: [
      'Oak wilt susceptibility (DO NOT prune April-July)',
      'Iron chlorosis on alkaline soils'
    ],
    strengths: ['Fast-growing for an oak', 'Strong wood', 'Beautiful fall color'],
    maintenanceNotes: 'Prune ONLY October-March. Monitor for oak wilt symptoms (rapid leaf browning from top down).',
    size: '60-75 feet'
  },
  {
    name: 'Hackberry',
    scientificName: 'Celtis occidentalis',
    riskLevel: 'moderate',
    threatProfile: 'STANDARD',
    characteristics: ['Warty bark', 'Elm-like leaves', 'Very adaptable'],
    commonIssues: [
      "Witches' broom (harmless but unsightly)",
      'Occasionally develops co-dominant stems'
    ],
    strengths: ['Extremely tough', 'Wind-resistant', 'Drought-tolerant'],
    maintenanceNotes: 'Low-maintenance tree. Excellent ash replacement option.',
    size: '40-60 feet'
  },
  {
    name: 'Honeylocust',
    scientificName: 'Gleditsia triacanthos',
    riskLevel: 'moderate',
    threatProfile: 'STANDARD',
    characteristics: ['Fine compound leaves', 'Delicate appearance', 'Thornless cultivars common'],
    commonIssues: [
      'Cankers can develop on stressed trees',
      'Occasional branch dieback'
    ],
    strengths: ['Drought-tolerant', 'Filtered shade', 'Clean fall cleanup'],
    maintenanceNotes: 'Standard maintenance. Good urban tree choice.',
    size: '30-70 feet'
  },
  {
    name: 'American Elm (Resistant)',
    scientificName: 'Ulmus americana',
    riskLevel: 'moderate',
    threatProfile: 'STANDARD',
    characteristics: ['Vase-shaped form', 'Saw-toothed leaves', 'Graceful branching'],
    commonIssues: [
      'Dutch Elm Disease in non-resistant varieties',
      'Elm leaf beetle'
    ],
    strengths: ['Classic form', 'Rapid growth', 'Disease-resistant cultivars available'],
    maintenanceNotes: 'Choose resistant cultivars like "Valley Forge". Regular monitoring for DED symptoms.',
    size: '60-80 feet'
  },
  {
    name: 'Kentucky Coffeetree',
    scientificName: 'Gymnocladus dioicus',
    riskLevel: 'low',
    threatProfile: 'STANDARD',
    characteristics: ['Very large compound leaves', 'Thick rough bark', 'Unique winter silhouette'],
    commonIssues: [
      'Large pods create minor litter',
      'Slow to leaf out in spring'
    ],
    strengths: ['Extremely tough', 'No major pests', 'Adaptable to urban conditions'],
    maintenanceNotes: 'Excellent ash replacement. Native Midwest species. Very low maintenance.',
    size: '60-75 feet'
  }
];
