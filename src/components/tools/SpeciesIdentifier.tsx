'use client'

import { AlertCircle, AlertTriangle, Camera, CheckCircle, Info, Search, ArrowRight } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { CONTACT } from '@/lib/constants'
import { useRouter } from 'next/navigation'
import { type Tree, treeDatabase } from '@/data/tree-species'


const getConcernLabel = (level: Tree['concernLevel']) => {
  switch (level) {
    case 'high':     return { text: 'More concerns to review' }
    case 'moderate': return { text: 'Some concerns to review' }
    case 'low':      return { text: 'Fewer listed concerns' }
  }
}

const getConcernColor = (level: Tree['concernLevel']) => {
  switch (level) {
    case 'high':     return 'text-red-700 bg-red-100'
    case 'moderate': return 'text-yellow-700 bg-yellow-100'
    case 'low':      return 'text-green-700 bg-green-100'
  }
}

const getConcernIcon = (level: Tree['concernLevel']) => {
  switch (level) {
    case 'high':     return AlertTriangle
    case 'low':      return CheckCircle
    default:         return Info
  }
}

/**
 * Provides tree species identification, care information, photo-based identification requests, and hazard assessment navigation.
 */
export function SpeciesIdentifier() {
  const router = useRouter()
  const [searchTerm, setSearchTerm]           = useState('')
  const [selectedTree, setSelectedTree]       = useState<Tree | null>(null)
  const [isInterrupted, setIsInterrupted]     = useState(false)
  
  const dialogRef = useRef<HTMLDivElement>(null)

  // Proper Focus Trap
  useEffect(() => {
    if (isInterrupted && dialogRef.current) {
      // Remember the control that opened the dialog so focus can return to it
      // on every dismissal path (Escape, cancel, proceed) rather than falling
      // to <body> (A11Y-002).
      const trigger = document.activeElement as HTMLElement | null

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
        trigger?.focus()
      }
    }
  }, [isInterrupted])

  const handleStartAssessment = () => {
    if (!selectedTree) return
    if (selectedTree.concernLevel === 'high') {
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
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-800"
        >
          <Camera className="h-5 w-5" /> Open Email Draft
        </a>
        <p className="mt-2 text-center text-xs text-emerald-700">Opening a draft does not send anything. You must attach the files and press Send in your email app. Identification and response timing are not guaranteed.</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-600 w-5 h-5" aria-hidden="true" />
          <input
            type="text"
            aria-label="Search tree species by common or scientific name"
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
            const ConcernIcon = getConcernIcon(tree.concernLevel)
            const concernInfo = getConcernLabel(tree.concernLevel)
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
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getConcernColor(tree.concernLevel)}`}>
                        <ConcernIcon className="w-3 h-3" />
                        {concernInfo.text}
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
              <p className="text-sm">Use the manual email instructions above if you want to send photos for a follow-up conversation.</p>
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
              <button onClick={() => setSelectedTree(null)} aria-label={`Close ${selectedTree.name} details`} className="text-white/80 hover:text-white transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <span className={`px-4 py-2 rounded-full font-semibold ${getConcernColor(selectedTree.concernLevel)}`}>
                {getConcernLabel(selectedTree.concernLevel).text}
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

            {selectedTree.concernLevel === 'high' ? (
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-5">
                <h3 className="text-lg font-bold text-red-900 mb-3 text-center">More Species Concerns to Review</h3>
                <div className="space-y-3">
                  <a href={`tel:${CONTACT.phoneRaw}`} className="block w-full px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors text-center">
                    Call Andrew: {CONTACT.phone}
                  </a>
                  <a
                    href={`mailto:${CONTACT.email}?subject=Question%20About%20My%20${encodeURIComponent(selectedTree.name)}%20-%20From%20Species%20Guide`}
                    className="block w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors text-center"
                  >
                    Ask About an On-Site Review
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
            const HighConcernIcon = getConcernIcon('high');
            return (
              <div 
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="interruption-title"
                aria-describedby="interruption-desc"
                className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl border-4 border-amber-400"
              >
                <div className="flex items-center gap-3 mb-4 text-amber-700">
                  <HighConcernIcon size={32} strokeWidth={3} />
                  <h3 id="interruption-title" className="text-2xl font-black uppercase tracking-tight">
                    Review This Tree&apos;s Warning Signs
                  </h3>
                </div>
                
                <p id="interruption-desc" className="text-stone-600 text-lg leading-relaxed mb-8">
                  This profile lists more common concerns for <strong>{selectedTree.name}</strong>. That concern level does not
                  establish that your tree is hazardous or predict a failure. Continue to the preliminary screening and answer
                  only from warning signs you can observe on this tree.
                </p>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setIsInterrupted(false);
                      router.push(`/contact?source=species_concern_review&task=on_site_review&species=${encodeURIComponent(selectedTree.name)}`);
                    }}
                    className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Ask About an On-Site Review
                  </button>
                  <button
                    onClick={proceedToAssessment}
                    className="w-full bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold py-3 px-6 rounded-xl transition-colors"
                  >
                    Continue to Preliminary Screening
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
