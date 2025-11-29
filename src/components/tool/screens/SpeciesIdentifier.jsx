import { useState } from 'react'
import { Search, AlertCircle, CheckCircle, Info } from 'lucide-react'


const treeDatabase = [
  {
    name: 'Ash Trees',
    scientificName: 'Fraxinus spp.',
    riskLevel: 'high',
    characteristics: ['Compound leaves (5-11 leaflets)', 'Opposite branching', 'Diamond-pattern bark'],
    commonIssues: [
      'Emerald Ash Borer (EAB) - 99% mortality if untreated',
      'Rapid decline: 2-4 years from infestation to death',
      'Brittle wood when dead = extreme hazard'
    ],
    maintenanceNotes: 'Remove all untreated ash unless active EAB treatment program in place. Treatment requires trunk injections every 2 years ($10-15 per diameter inch).',
    size: '50-80 feet'
  },
  {
    name: 'Silver Maple',
    scientificName: 'Acer saccharinum',
    riskLevel: 'high',
    characteristics: ['Deeply lobed leaves with silvery undersides', 'Fast growth', 'Shallow roots'],
    commonIssues: [
      'Weak wood prone to storm breakage',
      'Aggressive surface roots damage sidewalks/foundations',
      'V-shaped branch unions split easily',
      'Short lifespan (60-80 years) with rapid decline'
    ],
    maintenanceNotes: 'Requires regular pruning every 3-5 years. Monitor branch unions closely. Plan for eventual removal matures.',
    size: '50-80 feet'
  },
  {
    name: 'Cottonwood',
    scientificName: 'Populus deltoides',
    riskLevel: 'high',
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
    characteristics: ['Warty bark', 'Elm-like leaves', 'Very adaptable'],
    commonIssues: [
      'Witches\' broom (harmless but unsightly)',
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
    characteristics: ['Very large compound leaves', 'Thick rough bark', 'Unique winter silhouette'],
    commonIssues: [
      'Large pods create minor litter',
      'Slow to leaf out in spring'
    ],
    strengths: ['Extremely tough', 'No major pests', 'Adaptable to urban conditions'],
    maintenanceNotes: 'Excellent ash replacement. Native Midwest species. Very low maintenance.',
    size: '60-75 feet'
  }
]

export function SpeciesIdentifier() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTree, setSelectedTree] = useState(null)

  const filteredTrees = treeDatabase.filter(tree =>
    tree.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tree.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getRiskColor = (level) => {
    switch (level) {
      case 'high': return 'text-red-700 bg-red-100'
      case 'moderate': return 'text-yellow-700 bg-yellow-100'
      case 'low': return 'text-green-700 bg-green-100'
      default: return 'text-gray-700 bg-gray-100'
    }
  }

  const getRiskIcon = (level) => {
    switch (level) {
      case 'high': return AlertCircle
      case 'low': return CheckCircle
      default: return Info
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-amber-900 dark:text-slate-100 mb-3">Tree Species Identifier</h2>
        <p className="text-amber-800 dark:text-slate-300 leading-relaxed">
          Identify common Omaha-area tree species and learn about their specific care requirements, 
          potential issues, and maintenance needs.
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by common or scientific name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 dark:border-slate-600 border-amber- dark:border-slate-200 dark:border-slate-600 focus:border-amber-500 focus:outline-none text-lg"
          />
        </div>
      </div>

      {/* Tree List */}
      {!selectedTree && (
        <div className="space-y-3">
          {filteredTrees.map((tree, index) => {
            const RiskIcon = getRiskIcon(tree.riskLevel)
            return (
              <button
                key={index}
                onClick={() => setSelectedTree(tree)}
                className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all p-5 text-left group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-amber-900 dark:text-slate-100 group-hover:text-amber-700 dark:text-slate-400 transition-colors">
                        {tree.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getRiskColor(tree.riskLevel)}`}>
                        <RiskIcon className="w-3 h-3" />
                        {tree.riskLevel === 'high' ? 'High Risk' : tree.riskLevel === 'moderate' ? 'Moderate Risk' : 'Low Risk'}
                      </span>
                    </div>
                    <p className="text-sm text-amber-700 dark:text-slate-400 italic">{tree.scientificName}</p>
                  </div>
                  <svg className="w-6 h-6 text-amber-600 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* Tree Detail */}
      {selectedTree && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden animate-fade-in">
          <div className="bg-gradient-to-r from-amber-800 to-yellow-700 text-white p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="text-3xl font-bold mb-2">{selectedTree.name}</h2>
                <p className="text-amber-100 italic text-lg">{selectedTree.scientificName}</p>
              </div>
              <button
                onClick={() => setSelectedTree(null)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <span className={`px-4 py-2 rounded-full font-semibold ${getRiskColor(selectedTree.riskLevel)}`}>
                {selectedTree.riskLevel === 'high' ? '🔴 High Risk' : selectedTree.riskLevel === 'moderate' ? '🟡 Moderate Risk' : '🟢 Low Risk'}
              </span>
              <span className="text-amber-100">Typical Size: {selectedTree.size}</span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Characteristics */}
            <div>
              <h3 className="text-xl font-bold text-amber-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5" />
                Key Characteristics
              </h3>
              <ul className="space-y-2">
                {selectedTree.characteristics.map((char, i) => (
                  <li key={i} className="flex items-start gap-2 text-amber-800 dark:text-slate-300">
                    <span className="text-green-600 dark:text-emerald-400 mt-1">•</span>
                    <span>{char}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Strengths */}
            {selectedTree.strengths && selectedTree.strengths.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-amber-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-emerald-400" />
                  Strengths
                </h3>
                <ul className="space-y-2">
                  {selectedTree.strengths.map((strength, i) => (
                    <li key={i} className="flex items-start gap-2 text-amber-800 dark:text-slate-300">
                      <span className="text-green-600 dark:text-emerald-400 mt-1">✓</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Common Issues */}
            <div>
              <h3 className="text-xl font-bold text-amber-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                Common Issues
              </h3>
              <ul className="space-y-2">
                {selectedTree.commonIssues.map((issue, i) => (
                  <li key={i} className="flex items-start gap-2 text-amber-800 dark:text-slate-300">
                    <span className="text-orange-600 mt-1">⚠</span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Maintenance */}
            <div className="bg-amber-50 dark:bg-slate-700/50 rounded-xl p-5 border-2 border-amber- dark:border-slate-200 dark:border-slate-600">
              <h3 className="text-xl font-bold text-amber-900 dark:text-slate-100 mb-3">Maintenance Recommendations</h3>
              <p className="text-amber-800 dark:text-slate-300 leading-relaxed">{selectedTree.maintenanceNotes}</p>
            </div>

            {/* Next Steps - Contextual based on risk */}
            {selectedTree.riskLevel === 'high' ? (
              <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 rounded-xl p-5">
                <h3 className="text-lg font-bold text-red-900 dark:text-red-200 mb-3 text-center">⚠️ High-Risk Species - Get Expert Help</h3>
                <div className="space-y-3">
                  <a
                    href="tel:+14028123294"
                    className="block w-full px-6 py-3 bg-green-600 dark:bg-emerald-600 text-white rounded-xl font-semibold hover:bg-green-700 dark:hover:bg-emerald-700 transition-colors text-center"
                  >
                    📞 Call Andrew: (402) 812-3294
                  </a>
                  <a
                    href="mailto:andrew@midwestroots.info?subject=Question%20About%20My%20Tree%20-%20From%20Species%20Guide"
                    className="block w-full px-6 py-3 bg-blue-600 dark:bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors text-center"
                  >
                    📧 Email for Free Advice
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 rounded-xl p-5">
                <h3 className="text-lg font-bold text-blue-900 dark:text-blue-200 mb-3 text-center">Questions About Your Tree?</h3>
                <div className="space-y-2">
                  <a
                    href="mailto:andrew@midwestroots.info?subject=Question%20About%20My%20Tree%20-%20From%20Species%20Guide"
                    className="block w-full px-6 py-3 bg-green-600 dark:bg-emerald-600 text-white rounded-xl font-semibold hover:bg-green-700 dark:hover:bg-emerald-700 transition-colors text-center"
                  >
                    📧 Ask an Expert
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
    </div>
  )
}
