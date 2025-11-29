import { useState } from 'react'
import { Bug, AlertCircle, Droplet, Wind, ThermometerSun } from 'lucide-react'


const ailments = [
  {
    name: 'Emerald Ash Borer (EAB)',
    type: 'pest',
    severity: 'critical',
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
    timing: 'Disease most active in warm, wet spring weather. Prune infected branches appear'
  },
  {
    name: 'Apple Scab',
    type: 'disease',
    severity: 'moderate',
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
    symptoms: [
      'Vertical cracks in bark (southwest side most common)',
      'Bark splitting and peeling',
      'Branch die-back after harsh winters',
      'Dead buds that don\'t leaf out in spring',
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
]

export function CommonAilments() {
  const [selectedAilment, setSelectedAilment] = useState(null)
  const [filterType, setFilterType] = useState('all')

  const filteredAilments = filterType === 'all' 
    ? ailments 
    : ailments.filter(a => a.type === filterType)

  const getTypeIcon = (type) => {
    switch (type) {
      case 'pest': return Bug
      case 'disease': return AlertCircle
      case 'environmental': return ThermometerSun
      default: return AlertCircle
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-300'
      case 'serious': return 'bg-orange-100 text-orange-700 border-orange-300'
      case 'moderate': return 'bg-yellow-100 text-yellow-700 border-yellow-300'
      default: return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'pest': return 'bg-purple-100 text-purple-700'
      case 'disease': return 'bg-red-100 text-red-700'
      case 'environmental': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-amber-900 dark:text-slate-100 mb-3">Common Tree Problems</h2>
        <p className="text-amber-800 dark:text-slate-300 leading-relaxed">
          Identify common diseases, pests, and environmental issues affecting trees in the Omaha area. 
          Early detection is key to successful treatment.
        </p>
      </div>

      {/* Filter Buttons */}
      {!selectedAilment && (
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setFilterType('all')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              filterType === 'all'
                ? 'bg-amber-600 dark:bg-slate-600 text-white'
                : 'bg-white dark:bg-slate-800 text-amber-800 dark:text-slate-300 border-2 border-amber- dark:border-slate-200 dark:border-slate-600 hover:border-amber-400'
            }`}
          >
            All Problems
          </button>
          <button
            onClick={() => setFilterType('pest')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              filterType === 'pest'
                ? 'bg-purple-600 text-white'
                : 'bg-white dark:bg-slate-800 text-purple-800 border-2 border-purple-200 hover:border-purple-400'
            }`}
          >
            <Bug className="w-4 h-4" />
            Pests
          </button>
          <button
            onClick={() => setFilterType('disease')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              filterType === 'disease'
                ? 'bg-red-600 text-white'
                : 'bg-white dark:bg-slate-800 text-red-800 border-2 border-red-200 hover:border-red-400'
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            Diseases
          </button>
          <button
            onClick={() => setFilterType('environmental')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              filterType === 'environmental'
                ? 'bg-blue-600 dark:bg-blue-600 text-white'
                : 'bg-white dark:bg-slate-800 text-blue-800 border-2 border-blue-200 hover:border-blue-400'
            }`}
          >
            <ThermometerSun className="w-4 h-4" />
            Environmental
          </button>
        </div>
      )}

      {/* Ailment List */}
      {!selectedAilment && (
        <div className="space-y-3">
          {filteredAilments.map((ailment, index) => {
            const TypeIcon = getTypeIcon(ailment.type)
            return (
              <button
                key={index}
                onClick={() => setSelectedAilment(ailment)}
                className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all p-5 text-left group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-xl font-bold text-amber-900 dark:text-slate-100 group-hover:text-amber-700 dark:text-slate-400 transition-colors">
                        {ailment.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(ailment.type)}`}>
                        <TypeIcon className="w-3 h-3 inline mr-1" />
                        {ailment.type}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${getSeverityColor(ailment.severity)}`}>
                        {ailment.severity}
                      </span>
                    </div>
                    <p className="text-sm text-amber-700 dark:text-slate-400">
                      Affects: {ailment.affectedSpecies.join(', ')}
                    </p>
                  </div>
                  <svg className="w-6 h-6 text-amber-600 transform group-hover:translate-x-1 transition-transform flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* Ailment Detail */}
      {selectedAilment && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden animate-fade-in">
          <div className={`bg-gradient-to-r ${
            selectedAilment.severity === 'critical' ? 'from-red-600 to-red-800' :
            selectedAilment.severity === 'serious' ? 'from-orange-600 to-orange-800' :
            'from-yellow-600 to-yellow-800'
          } text-white p-6`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2">{selectedAilment.name}</h2>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getTypeColor(selectedAilment.type)}`}>
                    {selectedAilment.type}
                  </span>
                  <span className="text-white/90">
                    Severity: <strong>{selectedAilment.severity}</strong>
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedAilment(null)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Affected Species */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-bold text-amber-900 dark:text-slate-100 mb-2">Affected Species:</h3>
              <p className="text-amber-800 dark:text-slate-300">{selectedAilment.affectedSpecies.join(', ')}</p>
            </div>

            {/* Symptoms */}
            <div>
              <h3 className="text-xl font-bold text-amber-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Symptoms to Look For
              </h3>
              <ul className="space-y-2">
                {selectedAilment.symptoms.map((symptom, i) => (
                  <li key={i} className="flex items-start gap-2 text-amber-800 dark:text-slate-300">
                    <span className="text-red-600 dark:text-red-400 mt-1">•</span>
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Treatment */}
            <div className="bg-green-50 dark:bg-emerald-900/20 border-2 border-green-200 rounded-xl p-5">
              <h3 className="text-xl font-bold text-green-900 dark:text-emerald-200 mb-3">Treatment Options</h3>
              <p className="text-green-900 dark:text-emerald-200 leading-relaxed">{selectedAilment.treatment}</p>
            </div>

            {/* Prevention */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 rounded-xl p-5">
              <h3 className="text-xl font-bold text-blue-900 dark:text-blue-200 mb-3">Prevention</h3>
              <p className="text-blue-900 dark:text-blue-200 leading-relaxed">{selectedAilment.prevention}</p>
            </div>

            {/* Timing */}
            <div className="bg-amber-50 dark:bg-slate-700/50 border-2 border-amber- dark:border-slate-200 dark:border-slate-600 rounded-xl p-5">
              <h3 className="text-xl font-bold text-amber-900 dark:text-slate-100 mb-3">Timing is Critical</h3>
              <p className="text-amber-900 dark:text-slate-100 leading-relaxed">{selectedAilment.timing}</p>
            </div>

            {/* Next Steps - Contextual based on severity */}
            {(selectedAilment.severity === 'critical' || selectedAilment.severity === 'serious') ? (
              <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 rounded-xl p-6">
                <h3 className="text-xl font-bold text-red-900 dark:text-red-200 mb-4 text-center">
                  ⚠️ This Issue Requires Professional Help
                </h3>
                <div className="space-y-3">
                  <a
                    href="tel:+14028123294"
                    className="block w-full px-6 py-4 bg-green-600 dark:bg-emerald-600 text-white rounded-xl font-bold hover:bg-green-700 dark:hover:bg-emerald-700 transition-colors text-center"
                  >
                    📞 Call for Urgent Consultation
                    <div className="text-sm font-normal text-green-100 mt-1">(402) 812-3294 - Available 24/7</div>
                  </a>
                  
                  <a
                    href="mailto:andrew@midwestroots.info?subject=Urgent%20-%20Tree%20Disease/Pest%20from%20Diagnostic%20Tool&body=I%20think%20my%20tree%20has:%20[AILMENT]%0A%0ASymptoms%20I'm%20seeing:%20%0A%0AMy%20address:%20%0ABest%20phone%20to%20reach%20me:%20"
                    className="block w-full px-6 py-4 bg-blue-600 dark:bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors text-center"
                  >
                    📧 Email with Photos of Your Tree
                  </a>

                  <a
                    href="https://www.google.com/search?q=tree+removal+omaha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors text-center text-sm"
                  >
                    🔍 Find Other Certified Arborists
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 rounded-xl p-5">
                <h3 className="text-lg font-bold text-blue-900 dark:text-blue-200 mb-3 text-center">Questions About Treatment?</h3>
                <div className="space-y-2">
                  <a
                    href="mailto:andrew@midwestroots.info?subject=Question%20About%20Tree%20Health%20from%20Diagnostic%20Tool"
                    className="block w-full px-6 py-3 bg-green-600 dark:bg-emerald-600 text-white rounded-xl font-semibold hover:bg-green-700 dark:hover:bg-emerald-700 transition-colors text-center"
                  >
                    📧 Get Expert Advice
                  </a>
                  <a
                    href="tel:+14028123294"
                    className="block w-full px-6 py-3 bg-blue-600 dark:bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors text-center text-sm"
                  >
                    📞 (402) 812-3294
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Info Box */}
      {!selectedAilment && (
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 rounded-xl p-6">
          <div className="flex gap-3">
            <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-blue-900 dark:text-blue-200">
              <h3 className="font-bold mb-2">When in Doubt, Get Expert Help</h3>
              <p className="text-sm leading-relaxed">
                Accurate diagnosis is critical for effective treatment. Misidentifying a problem can waste money 
                and time while the real issue gets worse. Professional arborists have the training and experience 
                to correctly identify problems and recommend the most effective solutions.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
