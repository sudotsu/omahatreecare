import { Tree, Ailment, Service } from '../types/tree-tools';

/**
 * Tree Species Database - Omaha-specific risk profiles
 */
export const treeDatabase: Tree[] = [
  {
    name: 'Ash Trees',
    scientificName: 'Fraxinus spp.',
    riskLevel: 'high',
    characteristics: ['Compound leaves', 'Opposite branching', 'Diamond-pattern bark'],
    commonIssues: ['Fatal Risk: 99% mortality if untreated due to EAB'],
    maintenanceNotes: 'Trunk injections every 2 years required.',
    size: '50-80 feet'
  },
  {
    name: 'Silver Maple',
    scientificName: 'Acer saccharinum',
    riskLevel: 'moderate',
    characteristics: ['Deeply lobed leaves', 'Silver underside', 'Fast growing'],
    commonIssues: ['Brittle wood', 'Storm damage susceptibility'],
    maintenanceNotes: 'Regular structural pruning to prevent limb failure.',
    size: '60-80 feet'
  },
  {
    name: 'Bur Oak',
    scientificName: 'Quercus macrocarpa',
    riskLevel: 'low',
    characteristics: ['Fringed acorns', 'Thick, corky bark', 'Lobes with deep sinuses'],
    commonIssues: ['Oak Wilt (low risk in Omaha)', 'Iron Chlorosis'],
    maintenanceNotes: 'Slow growing; very hardy for Nebraska soil.',
    size: '70-90 feet'
  }
];

/**
 * Common Ailments - Local pests and diseases [1]
 */
export const ailments: Ailment[] = [
  {
    name: 'Emerald Ash Borer (EAB)',
    type: 'pest',
    severity: 'critical',
    symptoms: ['D-shaped exit holes', 'Canopy thinning', 'S-shaped galleries under bark'],
    affectedSpecies: ['All ash species'],
    treatment: 'Trunk injection (Emamectin Benzoate) every 2 years.',
    prevention: 'Do not move firewood.',
    timing: 'Treat in May-June.'
  },
  {
    name: 'Oak Wilt',
    type: 'disease',
    severity: 'critical',
    symptoms: ['Leaf browning from tips', 'Rapid leaf drop', 'Fungal mats'],
    affectedSpecies: ['Red Oaks', 'White Oaks (slower progression)'],
    treatment: 'Fungicide injections and root graft disruption.',
    prevention: 'Avoid pruning oaks between April and July.',
    timing: 'Early detection is vital.'
  }
];

/**
 * Service Price Estimator - Based on typical Omaha market rates [2]
 */
export const services: Service[] = [
  {
    name: 'Tree Removal',
    description: 'Complete removal of tree including trunk and major branches',
    priceRange: '$400 - $3,500+',
    typical: '$800 - $1,500 for average tree',
    factors: ['Tree size', 'Accessibility', 'Proximity to structures']
  },
  {
    name: 'Standard Pruning',
    description: 'Structural trimming and deadwood removal',
    priceRange: '$200 - $1,200',
    typical: '$400 - $700',
    factors: ['Canopy density', 'Equipment access', 'Safety requirements']
  }
];
