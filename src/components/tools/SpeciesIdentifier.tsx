'use client'

import { AlertCircle, AlertTriangle, Camera, CheckCircle, Info, Search, ArrowRight } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { CONTACT } from '@/lib/constants'
import { useRouter } from 'next/navigation'

interface Tree {
  name: string
  scientificName: string
  riskLevel: 'high' | 'moderate' | 'low'
  characteristics: string[]
  commonIssues: string[]
  strengths?: string[]
  maintenanceNotes: string
  size: string
}

const treeDatabase: Tree[] = [
  {
    name: 'Ash Trees',
    scientificName: 'Fraxinus spp.',
    riskLevel: 'high',
    characteristics: ['Compound leaves (5–11 leaflets)', 'Opposite branching', 'Diamond-pattern bark'],
    commonIssues: [
      'Fatal Risk: 99% mortality if untreated due to Emerald Ash Borer (EAB)',
      'Rapid decline: 2–4 years from infestation to death',
      'Extremely brittle wood when dead = extreme hazard',
    ],
    maintenanceNotes: 'Remove all untreated ash unless active EAB treatment program in place. Treatment requires trunk injections every 2 years ($10–15 per diameter inch). Treatment must start BEFORE infestation for best results.',
    size: '50–80 feet',
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
      'Short lifespan (60–80 years) with rapid decline',
    ],
    maintenanceNotes: 'Requires regular pruning every 3–5 years. Monitor branch unions closely. Plan for eventual removal at maturity.',
    size: '50–80 feet',
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
      'Short lifespan for size (70–100 years)',
    ],
    maintenanceNotes: 'Keep away from structures. Regular dead-wooding is essential for safety.',
    size: '70–100+ feet',
  },
  {
    name: 'Bradford Pear',
    scientificName: 'Pyrus calleryana',
    riskLevel: 'high',
    characteristics: ['White spring flowers', 'Oval shape', 'Tight branching'],
    commonIssues: [
      'Weak branch attachments causing catastrophic splitting at 15–20 years',
      'All branches emerge at similar angle creating structural weakness',
      'Ice/wind storms cause total failures',
    ],
    maintenanceNotes: 'Remove proactively before maturity. Do not plant new Bradford Pears.',
    size: '30–50 feet',
  },
  {
    name: 'Bur Oak',
    scientificName: 'Quercus macrocarpa',
    riskLevel: 'low',
    characteristics: ['Large lobed leaves with "bur" on acorn cap', 'Massive spreading form', 'Thick bark'],
    commonIssues: [
      'Slow growth makes replacement difficult',
      'Iron chlorosis on alkaline soils (but more tolerant than pin oak)',
      'Oak wilt (rare but fatal)',
    ],
    strengths: ['Extremely long-lived (200–300 years)', 'Very strong wood', 'Drought-tolerant'],
    maintenanceNotes: 'Preserve when possible. Prune ONLY October–March (outside oak wilt season). Deep root fertilization helps with chlorosis.',
    size: '70–80 feet spread',
  },
  {
    name: 'Red Oak',
    scientificName: 'Quercus rubra',
    riskLevel: 'low',
    characteristics: ['Pointed leaf lobes', 'Reddish fall color', 'Gray furrowed bark'],
    commonIssues: [
      'Oak wilt susceptibility (DO NOT prune April–July)',
      'Iron chlorosis on alkaline soils',
    ],
    strengths: ['Fast-growing for an oak', 'Strong wood', 'Beautiful fall color'],
    maintenanceNotes: 'Prune ONLY October–March. Monitor for oak wilt symptoms (rapid leaf browning from top down).',
    size: '60–75 feet',
  },
  {
    name: 'Hackberry',
    scientificName: 'Celtis occidentalis',
    riskLevel: 'moderate',
    characteristics: ['Warty bark', 'Elm-like leaves', 'Very adaptable'],
    commonIssues: ["Witches' broom (harmless but unsightly)", 'Occasionally develops co-dominant stems'],
    strengths: ['Extremely tough', 'Wind-resistant', 'Drought-tolerant'],
    maintenanceNotes: 'Low-maintenance tree. Excellent ash replacement option.',
    size: '40–60 feet',
  },
  {
    name: 'Honeylocust',
    scientificName: 'Gleditsia triacanthos',
    riskLevel: 'moderate',
    characteristics: ['Fine compound leaves', 'Delicate appearance', 'Thornless cultivars common'],
    commonIssues: ['Cankers can develop on stressed trees', 'Occasional branch dieback'],
    strengths: ['Drought-tolerant', 'Filtered shade', 'Clean fall cleanup'],
    maintenanceNotes: 'Standard maintenance. Good urban tree choice.',
    size: '30–70 feet',
  },
  {
    name: 'American Elm (Resistant)',
    scientificName: 'Ulmus americana',
    riskLevel: 'moderate',
    characteristics: ['Vase-shaped form', 'Saw-toothed leaves', 'Graceful branching'],
    commonIssues: ['Dutch Elm Disease in non-resistant varieties', 'Elm leaf beetle'],
    strengths: ['Classic form', 'Rapid growth', 'Disease-resistant cultivars available'],
    maintenanceNotes: 'Choose resistant cultivars like "Valley Forge". Regular monitoring for DED symptoms.',
    size: '60–80 feet',
  },
  {
    name: 'Kentucky Coffeetree',
    scientificName: 'Gymnocladus dioicus',
    riskLevel: 'low',
    characteristics: ['Very large compound leaves', 'Thick rough bark', 'Unique winter silhouette'],
    commonIssues: ['Large pods create minor litter', 'Slow to leaf out in spring'],
    strengths: ['Extremely tough', 'No major pests', 'Adaptable to urban conditions'],
    maintenanceNotes: 'Excellent ash replacement. Native Midwest species. Very low maintenance.',
    size: '60–75 feet',
  },
]

const getRiskLabel = (level: Tree['riskLevel']) => {
  switch (level) {
    case 'high':     return { text: 'High Risk' }
    case 'moderate': return { text: 'Moderate Risk' }
    case 'low':      return { text: 'Low Risk' }
  }
}

const getRiskColor = (level: Tree['riskLevel']) => {
  switch (level) {
    case 'high':     return 'text-red-700 bg-red-100'
    case 'moderate': return 'text-yellow-700 bg-yellow-100'
    case 'low':      return 'text-green-700 bg-green-100'
  }
}

const getRiskIcon = (level: Tree['riskLevel']) => {
  switch (level) {
    case 'high':     return AlertTriangle
    case 'low':      return CheckCircle
    default:         return Info
  }
}

/**
 * Provides tree species identification, care information, photo-based identification requests, and hazard assessment navigation.
 *
 * @param searchParams - Optional route parameters accepted by the component.
 */
export function SpeciesIdentifier({ searchParams: _searchParams }: { searchParams?: Record<string, unknown> }) {
  const router = useRouter()
  const [searchTerm, setSearchTerm]           = useState('')
  const [selectedTree, setSelectedTree]       = useState<Tree | null>(null)
  const [isInterrupted, setIsInterrupted]     = useState(false)
  
  const dialogRef = useRef<HTMLDivElement>(null)

  // Proper Focus Trap
  useEffect(() => {
    if (isInterrupted && dialogRef.current) {
      const focusableElements = dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0] as HTMLElement
      firstElement?.focus()

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return
        
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
        
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus()
            e.preventDefault()
          }
        }
      }

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsInterrupted(false)
      }

      window.addEventListener('keydown', handleTab)
      window.addEventListener('keydown', handleEscape)
      return () => {
        window.removeEventListener('keydown', handleTab)
        window.removeEventListener('keydown', handleEscape)
      }
    }
  }, [isInterrupted])

  const handleStartAssessment = () => {
    if (!selectedTree) return
    if (selectedTree.riskLevel === 'high') {
      setIsInterrupted(true)
    } else {
      router.push(`/tools/hazard?species=${encodeURIComponent(selectedTree.name)}`)
    }
  }

  const proceedToAssessment = () => {
    if (!selectedTree) return
    setIsInterrupted(false)
    router.push(`/tools/hazard?species=${encodeURIComponent(selectedTree.name)}`)
  }

  const filteredTrees = treeDatabase.filter(
    t =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-amber-900 mb-3">Tree Species Identifier</h2>
        <p className="text-amber-800 leading-relaxed">
          Identify common Omaha-area tree species and learn about their specific care requirements,
          potential issues, and maintenance needs.
        </p>
      </div>

      {/* Photo upload */}
      <div className="mb-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 border-2 border-emerald-200">
        <div className="flex items-start gap-4 mb-4">
          <div className="bg-emerald-100 rounded-full p-3">
            <Camera className="w-6 h-6 text-emerald-700" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-emerald-900 mb-1">
              Can&apos;t Find Your Tree? Email Photos Manually
            </h3>
            <p className="text-sm text-emerald-800">
              This website does not upload or attach files. Open an email draft, then attach clear photos of the leaves, bark, and full tree yourself before sending.
            </p>
          </div>
        </div>

        <a
          href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('Tree photo question')}&body=${encodeURIComponent('Please attach your photos to this email before sending. Include the property area, what changed, and when you first noticed it. Do not send sensitive documents. Photo reuse is not granted by sending this email.')}`}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
        >
          <Camera className="h-5 w-5" /> Open Email Draft
        </a>
        <p className="mt-2 text-center text-xs text-emerald-700">Opening a draft does not send anything. You must attach the files and press Send in your email app. Identification and response timing are not guaranteed.</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-600 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by common or scientific name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none text-lg bg-white text-amber-900"
          />
        </div>
      </div>

      {/* Tree list */}
      {!selectedTree && (
        <div className="space-y-3">
          {filteredTrees.map((tree) => {
            const RiskIcon = getRiskIcon(tree.riskLevel)
            const riskInfo = getRiskLabel(tree.riskLevel)
            return (
              <button
                key={tree.name}
                onClick={() => setSelectedTree(tree)}
                className="w-full bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-5 text-left group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-amber-900 group-hover:text-amber-700 transition-colors">
                        {tree.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getRiskColor(tree.riskLevel)}`}>
                        <RiskIcon className="w-3 h-3" />
                        {riskInfo.text}
                      </span>
                    </div>
                    <p className="text-sm text-amber-700 italic">{tree.scientificName}</p>
                  </div>
                  <svg className="w-6 h-6 text-amber-600 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            )
          })}
          {filteredTrees.length === 0 && (
            <div className="text-center py-12 text-amber-700">
              <p className="text-lg font-medium mb-2">No trees found for &quot;{searchTerm}&quot;</p>
              <p className="text-sm">Try uploading a photo above for expert identification.</p>
            </div>
          )}
        </div>
      )}

      {/* Tree detail */}
      {selectedTree && (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-amber-800 to-yellow-700 text-white p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="text-3xl font-bold mb-2">{selectedTree.name}</h2>
                <p className="text-amber-100 italic text-lg">{selectedTree.scientificName}</p>
              </div>
              <button onClick={() => setSelectedTree(null)} className="text-white/80 hover:text-white transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <span className={`px-4 py-2 rounded-full font-semibold ${getRiskColor(selectedTree.riskLevel)}`}>
                {getRiskLabel(selectedTree.riskLevel).text}
              </span>
              <span className="text-amber-100">Typical Size: {selectedTree.size}</span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-amber-900 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5" /> Key Characteristics
              </h3>
              <ul className="space-y-2">
                {selectedTree.characteristics.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-amber-800">
                    <span className="text-green-600 mt-1">•</span><span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {selectedTree.strengths && selectedTree.strengths.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-amber-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" /> Strengths
                </h3>
                <ul className="space-y-2">
                  {selectedTree.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-amber-800">
                      <span className="text-green-600 mt-1">✓</span><span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h3 className="text-xl font-bold text-amber-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" /> Common Issues
              </h3>
              <ul className="space-y-2">
                {selectedTree.commonIssues.map((issue, i) => (
                  <li key={i} className="flex items-start gap-2 text-amber-800">
                    <span className="text-orange-600 mt-1">⚠</span><span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 rounded-xl p-5 border-2 border-amber-200">
              <h3 className="text-xl font-bold text-amber-900 mb-3">Maintenance Recommendations</h3>
              <p className="text-amber-800 leading-relaxed">{selectedTree.maintenanceNotes}</p>
            </div>

            {/* Run Assessment CTA */}
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6 text-center">
              <h3 className="text-lg font-bold text-emerald-900 mb-2">Check This Tree for Hazards</h3>
              <p className="text-sm text-emerald-800 mb-4">Run a preliminary screening based on the warning signs you can see.</p>
              <button
                onClick={handleStartAssessment}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-md"
              >
                Start Hazard Assessment
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {selectedTree.riskLevel === 'high' ? (
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-5">
                <h3 className="text-lg font-bold text-red-900 mb-3 text-center">High-Risk Species — Get Expert Help</h3>
                <div className="space-y-3">
                  <a href={`tel:${CONTACT.phoneRaw}`} className="block w-full px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors text-center">
                    Call Andrew: {CONTACT.phone}
                  </a>
                  <a
                    href={`mailto:${CONTACT.email}?subject=Question%20About%20My%20${encodeURIComponent(selectedTree.name)}%20-%20From%20Species%20Guide`}
                    className="block w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors text-center"
                  >
                    Email for Free Advice
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5">
                <h3 className="text-lg font-bold text-blue-900 mb-3 text-center">Questions About Your {selectedTree.name}?</h3>
                <div className="space-y-2">
                  <a
                    href={`mailto:${CONTACT.email}?subject=Question%20About%20My%20${encodeURIComponent(selectedTree.name)}%20-%20From%20Species%20Guide`}
                    className="block w-full px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors text-center"
                  >
                    Ask an Expert
                  </a>
                  <a href={`tel:${CONTACT.phoneRaw}`} className="block w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors text-center text-sm">
                    {CONTACT.phone}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Interruption Overlay */}
      {isInterrupted && selectedTree && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in"
        >
          {(() => {
            const HighRiskIcon = getRiskIcon('high');
            return (
              <div 
                ref={dialogRef}
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="interruption-title"
                aria-describedby="interruption-desc"
                className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl border-4 border-red-500"
              >
                <div className="flex items-center gap-3 mb-4 text-red-600">
                  <HighRiskIcon size={32} strokeWidth={3} />
                  <h3 id="interruption-title" className="text-2xl font-black uppercase tracking-tight">
                    Critical Species Risk
                  </h3>
                </div>
                
                <p id="interruption-desc" className="text-stone-600 text-lg leading-relaxed mb-8">
                  Because <strong>{selectedTree.name}</strong> is classified as a high-risk species in the Omaha area, 
                  self-assessment results may be insufficient. <strong>CRITICAL:</strong> Structural failures in this species 
                  are often sudden and catastrophic.
                </p>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setIsInterrupted(false);
                      router.push(`/contact?source=species_interrupt&task=urgent_assessment&species=${encodeURIComponent(selectedTree.name)}`);
                    }}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Request Urgent Professional Review
                  </button>
                  <button
                    onClick={proceedToAssessment}
                    className="w-full bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold py-3 px-6 rounded-xl transition-colors"
                  >
                    I Understand, Continue to Tool
                  </button>
                  <button
                    onClick={() => setIsInterrupted(false)}
                    className="w-full text-stone-400 text-xs font-bold uppercase tracking-widest mt-2 hover:text-stone-600 transition-colors"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  )
}
