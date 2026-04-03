export type AilmentType = 'pest' | 'disease' | 'environmental';
export type AilmentSeverity = 'critical' | 'serious' | 'moderate';
export type ThreatProfile = 'CRITICAL' | 'ELEVATED' | 'STANDARD';

export interface TreeAilment {
  name: string;
  type: AilmentType;
  severity: AilmentSeverity;
  threatProfile: ThreatProfile;
  symptoms: string[];
  affectedSpecies: string[];
  treatment: string;
  prevention: string;
  timing: string;
}

export const ailments: TreeAilment[] = [
  {
    name: 'Emerald Ash Borer (EAB)',
    type: 'pest',
    severity: 'critical',
    threatProfile: 'CRITICAL',
    symptoms: [
      'D-shaped exit holes in bark (1/8 inch)',
      'S-shaped larvae galleries under bark',
      'Canopy thinning starting at top',
      'Epicormic shoots (water sprouts) on trunk',
      'Woodpecker activity (birds feeding on larvae)',
      'Bark splitting and cracking'
    ],
    affectedSpecies: ['All ash species (Fraxinus)'],
    treatment: 'Trunk injection treatments every 2 years ($10-15 per diameter inch). Treatment must start BEFORE infestation for best results. Once heavily infested, removal is typically more cost-effective.',
    prevention: 'Preventive treatments for valuable ash trees. Do not move firewood - EAB spreads through infected wood transport.',
    timing: 'Treatments must be applied in spring (May-June) when trees are actively growing'
  },
  {
    name: 'Oak Wilt',
    type: 'disease',
    severity: 'critical',
    threatProfile: 'CRITICAL',
    symptoms: [
      'Rapid leaf browning from top down (red oaks)',
      'Leaves turn brown but stay attached',
      'Fungal mats under bark (sweet smell)',
      'Wilting occurs in just 2-4 weeks',
      'Progressive crown thinning',
      'Vascular discoloration visible in sapwood'
    ],
    affectedSpecies: ['Red Oak (highly susceptible)', 'Bur Oak (moderately resistant)', 'White Oak (resistant)'],
    treatment: 'No cure once infected. Immediately remove infected trees and sever root grafts to prevent spread. Fungicide injections can protect high-value uninfected trees nearby.',
    prevention: 'NEVER prune oaks April-July (insect transmission season). Paint ALL pruning wounds immediately, even in dormant season. Remove infected trees promptly.',
    timing: 'If tree shows symptoms, removal should be immediate (within days) to prevent spread'
  },
  {
    name: 'Dutch Elm Disease',
    type: 'disease',
    severity: 'critical',
    threatProfile: 'CRITICAL',
    symptoms: [
      'Wilting and yellowing of leaves on individual branches',
      'Brown streaking in sapwood',
      'Leaf drop on affected branches',
      'Progressive crown decline',
      'Branches die from tip backwards',
      'Symptoms appear mid-summer'
    ],
    affectedSpecies: ['American Elm (susceptible)', 'Red Elm (susceptible)', 'Disease-resistant cultivars (Valley Forge, Princeton)'],
    treatment: 'Remove infected trees immediately. Fungicide injections can protect valuable uninfected trees. Root graft disruption may protect nearby trees.',
    prevention: 'Plant disease-resistant elm varieties. Remove dead/dying elms promptly. Control elm bark beetles that spread the disease.',
    timing: 'Symptoms appear June-August. Immediate removal critical to prevent spread'
  },
  {
    name: 'Iron Chlorosis',
    type: 'environmental',
    severity: 'moderate',
    threatProfile: 'STANDARD',
    symptoms: [
      'Yellowing leaves with green veins',
      'New growth most affected',
      'Leaf margins turn brown and crispy',
      'Stunted growth',
      'Twig die-back in severe cases',
      'Overall tree decline over years'
    ],
    affectedSpecies: ['Pin Oak (very susceptible)', 'River Birch', 'Red Maple', 'Some other species on alkaline soil'],
    treatment: 'Trunk injections with chelated iron (Fe-EDDHA) in spring. Soil acidification treatments. Deep root fertilization. May require annual treatment.',
    prevention: 'Plant species adapted to alkaline soils (Bur Oak instead of Pin Oak). Avoid overwatering which makes chlorosis worse. Maintain proper mulching.',
    timing: 'Symptoms appear in spring on new growth. Treat in early spring before leaf-out'
  },
  {
    name: 'Fire Blight',
    type: 'disease',
    severity: 'serious',
    threatProfile: 'ELEVATED',
    symptoms: [
      'Sudden browning of shoots and branches',
      'Branches curve into "shepherd\'s crook" shape',
      'Bark appears water-soaked then darkens',
      'Oozing bacterial exudate (looks sticky)',
      'Leaves remain attached but dead',
      'Rapid spread during wet spring weather'
    ],
    affectedSpecies: ['Crabapple', 'Apple', 'Pear', 'Mountain Ash', 'Hawthorn'],
    treatment: 'Prune infected branches 12 inches below visible symptoms. Disinfect tools between cuts. Antibiotic sprays during bloom period (professional application).',
    prevention: 'Choose resistant varieties. Avoid excessive nitrogen fertilizer. Prune only when dry. Remove all infected material immediately.',
    timing: 'Disease most active in warm, wet spring weather. Prune when infected branches appear'
  },
  {
    name: 'Apple Scab',
    type: 'disease',
    severity: 'moderate',
    threatProfile: 'STANDARD',
    symptoms: [
      'Olive-green to brown spots on leaves',
      'Early leaf drop (defoliation)',
      'Scabby lesions on fruits',
      'Twig lesions in severe cases',
      'Repeated yearly infections weaken tree',
      'Worse in cool, wet springs'
    ],
    affectedSpecies: ['Crabapple (most common)', 'Apple'],
    treatment: 'Fungicide sprays starting at bud break (professional application best). Rake and destroy fallen leaves. Not life-threatening but unsightly.',
    prevention: 'Plant resistant varieties (many excellent disease-resistant crabapples available). Ensure good air circulation through proper pruning.',
    timing: 'Preventive sprays needed in early spring. Cultural controls year-round'
  },
  {
    name: 'Bagworms',
    type: 'pest',
    severity: 'serious',
    threatProfile: 'ELEVATED',
    symptoms: [
      'Cone-shaped bags (1-2 inches) hanging on branches',
      'Needle/leaf loss around bags',
      'Severe defoliation possible',
      'Bags most visible in winter',
      'Young larvae (June) feed actively',
      'Can kill evergreens if left untreated'
    ],
    affectedSpecies: ['Arborvitae', 'Juniper', 'Spruce', 'Pine', 'Sometimes deciduous trees'],
    treatment: 'Hand-pick and destroy bags in fall/winter. Insecticide spray in early June when larvae are young and vulnerable. Bt (Bacillus thuringiensis) is organic option.',
    prevention: 'Regular monitoring. Remove all bags before they release eggs in spring. Natural predators help but not always sufficient.',
    timing: 'Hand removal: Fall through spring. Spray treatment: Early June when larvae are small'
  },
  {
    name: 'Drought Stress',
    type: 'environmental',
    severity: 'moderate',
    threatProfile: 'STANDARD',
    symptoms: [
      'Wilting or drooping leaves',
      'Leaf scorch (brown leaf edges)',
      'Early fall color and leaf drop',
      'Twig die-back',
      'Cracks in soil around tree',
      'Reduced growth',
      'Long-term: increased susceptibility to pests/disease'
    ],
    affectedSpecies: ['All species, especially newly planted trees and shallow-rooted species'],
    treatment: 'Deep watering (12-18 inches) slowly over several hours. Water drip line area, not just trunk. Mulch to retain moisture. May take months to recover.',
    prevention: 'Proper watering schedule (1-1.5" per week). Mulch ring 2-4" deep. Water deeply but infrequently to encourage deep roots. Avoid grass competition.',
    timing: 'Water during extended dry periods, especially for trees planted within last 2 years'
  },
  {
    name: 'Winter Damage & Frost Cracks',
    type: 'environmental',
    severity: 'moderate',
    threatProfile: 'STANDARD',
    symptoms: [
      'Vertical cracks in bark (southwest side most common)',
      'Bark splitting and peeling',
      'Branch die-back after harsh winters',
      "Dead buds that don't leaf out in spring",
      'Browning of evergreen needles',
      'Ice storm breakage'
    ],
    affectedSpecies: ['Thin-barked trees (maple, willow, fruit trees)', 'Evergreens (winter burn)', 'Trees with weak structure'],
    treatment: 'Prune dead and damaged branches. Do NOT paint or fill cracks - trees heal naturally. Monitor for secondary pest/disease problems. Remove severely damaged trees.',
    prevention: 'Young tree trunk wrapping (November-March). Proper watering in fall. Structural pruning to prevent storm damage. Anti-desiccant spray for evergreens.',
    timing: 'Damage assessment in early spring. Corrective pruning in late winter/early spring'
  },
  {
    name: 'Verticillium Wilt',
    type: 'disease',
    severity: 'serious',
    threatProfile: 'ELEVATED',
    symptoms: [
      'Wilting on one side or scattered branches',
      'Yellowing leaves that may turn brown',
      'Green streaking in sapwood',
      'Progressive branch dieback',
      'Symptoms worsen in hot weather',
      'Can be confused with drought stress'
    ],
    affectedSpecies: ['Maple (especially Norway)', 'Ash', 'Redbud', 'Smoke tree', 'Lilac'],
    treatment: 'No cure. Prune dead branches. Fertilize and water to support tree. Severely infected trees should be removed. Soil fungus persists for years.',
    prevention: 'Avoid planting susceptible species in infected soil. Plant resistant varieties. Maintain tree vigor through proper care.',
    timing: 'Symptoms appear in summer heat. Remove infected trees to prevent soil contamination'
  },
  {
    name: 'Girdling Roots',
    type: 'environmental',
    severity: 'serious',
    threatProfile: 'ELEVATED',
    symptoms: [
      'Gradual decline over years',
      'One-sided canopy thinning',
      'Trunk appears flattened or has indentations',
      'Early fall color',
      'Reduced vigor and growth',
      'Trunk does not flare properly at base',
      'Tree planted too deep initially'
    ],
    affectedSpecies: ['Lindens', 'Maples', 'Many nursery-grown trees'],
    treatment: 'Expose and cut girdling roots (professional arborist recommended). Remove excess soil if tree was planted too deep. May improve tree condition but damage is often irreversible.',
    prevention: 'Proper planting depth (root flare visible). Choose field-grown over container trees when possible. Inspect root ball before planting.',
    timing: 'Can be corrected any time, but spring/fall preferred. Earlier detection = better outcomes'
  }
];
