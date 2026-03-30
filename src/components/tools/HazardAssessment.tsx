'use client'

import { AlertTriangle, CheckCircle, Info, Mail, MessageSquare, Share2, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CONTACT } from '@/lib/constants'
import EmailCaptureModal from './EmailCaptureModal'

interface AssessmentState {
  likelihood: number
  consequence: number
  issues: string[]
}

interface QuestionOption {
  text: string
  value: number
  issues: string[]
}

interface Question {
  title: string
  description: string
  options: QuestionOption[]
  isConsequence?: boolean
}

const questions: Question[] = [
  {
    title: 'Root & Trunk Condition',
    description: 'Check the base of your tree for these warning signs',
    options: [
      { text: 'Tree appears healthy with no visible defects',                               value: 1, issues: [] },
      { text: 'Minor issues like small cracks or minor lean',                               value: 2, issues: ['Minor structural defects'] },
      { text: 'Significant cracks, large cavities, or noticeable lean',                    value: 3, issues: ['Significant structural defects'] },
      { text: 'Severe lean, major cracks, mushrooms at base, or lifting soil',              value: 4, issues: ['Severe structural damage', 'Root decay indicators'] },
    ],
  },
  {
    title: 'Branch Structure',
    description: 'Look at the branches and overall tree structure',
    options: [
      { text: 'Branches appear strong and well-attached',                                   value: 1, issues: [] },
      { text: 'Some dead branches or minor structural issues',                              value: 2, issues: ['Dead branches present'] },
      { text: 'Multiple dead branches, weak attachments, or co-dominant stems',            value: 3, issues: ['Multiple dead branches', 'Weak branch unions'] },
      { text: 'Large dead branches, severe storm damage, or major splits',                 value: 4, issues: ['Large dead limbs (widow makers)', 'Major storm damage'] },
    ],
  },
  {
    title: 'Tree Health',
    description: 'Assess the overall health and foliage',
    options: [
      { text: 'Full, healthy canopy with good color',                                      value: 1, issues: [] },
      { text: 'Some thinning or minor discoloration',                                      value: 2, issues: ['Minor canopy thinning'] },
      { text: 'Significant die-back or less than 50% normal foliage',                     value: 3, issues: ['Significant die-back', 'Sparse foliage'] },
      { text: 'Tree is dead or dying with minimal living tissue',                          value: 4, issues: ['Tree in severe decline or dead'] },
    ],
  },
  {
    title: 'Target Assessment',
    description: 'What could be damaged if the tree or branches fail?',
    options: [
      { text: 'Remote area, no structures or people nearby',                               value: 1, issues: [] },
      { text: 'Occasional use area, some property at risk',                                value: 2, issues: [] },
      { text: 'Frequent use area, near structures or regular parking',                    value: 3, issues: [] },
      { text: 'House, garage, or high-traffic area directly below',                       value: 4, issues: [] },
    ],
    isConsequence: true,
  },
]

function getRiskLevel(risk: number) {
  if (risk >= 9) return { level: 'Extreme', color: 'red',    action: 'Immediate action required (0–14 days)' }
  if (risk >= 6) return { level: 'High',    color: 'orange', action: 'Priority service within 30–60 days' }
  if (risk >= 3) return { level: 'Moderate',color: 'yellow', action: 'Schedule maintenance within 90 days' }
  return           { level: 'Low',          color: 'green',  action: 'Monitor during regular visits' }
}

export function HazardAssessment() {
  const router = useRouter()
  const [step, setStep]             = useState(0)
  const [assessment, setAssessment] = useState<AssessmentState>({ likelihood: 0, consequence: 0, issues: [] })
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [shareMenuOpen, setShareMenuOpen]   = useState(false)

  const calculateRisk = () => assessment.likelihood * assessment.consequence

  const shareResults = (method: 'email' | 'sms' | 'copy') => {
    const risk      = getRiskLevel(calculateRisk())
    const riskScore = calculateRisk()
    const issuesList = assessment.issues.length > 0 ? assessment.issues.join(', ') : 'No major issues identified'
    const message = `Tree Risk Assessment Results:\n\nRisk Level: ${risk.level}\nRisk Score: ${riskScore}/16\nIssues: ${issuesList}\nRecommended Action: ${risk.action}\n\nGet your free assessment at ${CONTACT.siteUrl}/tools/hazard`

    if (method === 'email') {
      window.location.href = `mailto:?subject=My%20Tree%20Risk%20Assessment%20Results&body=${encodeURIComponent(message)}`
    } else if (method === 'sms') {
      window.location.href = `sms:?body=${encodeURIComponent(message)}`
    } else {
      navigator.clipboard.writeText(message)
        .then(() => alert('Results copied to clipboard!'))
        .catch((err) => {
          console.error('Clipboard write failed:', err)
          alert('Could not copy to clipboard. Please copy manually.')
        })
    }
    setShareMenuOpen(false)
  }

  const emailMeResults = () => {
    const risk      = getRiskLevel(calculateRisk())
    const riskScore = calculateRisk()
    const issuesList = assessment.issues.length > 0 ? assessment.issues.join(', ') : 'No major issues identified'
    const subject = `Send me my tree risk assessment results (${risk.level} Risk)`
    const body    = `Hi, I just completed your tree risk assessment tool and got a ${risk.level} risk score (${riskScore}/16).\n\nIssues identified: ${issuesList}\n\nRecommended action: ${risk.action}\n\nCould you send me a copy of these results and provide any additional recommendations?`
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const handleAnswer = (value: number, issues: string[] = [], isConsequence = false) => {
    if (isConsequence) {
      setAssessment(prev => ({ ...prev, consequence: value }))
    } else {
      setAssessment(prev => ({
        ...prev,
        likelihood: Math.max(prev.likelihood, value),
        issues: [...new Set([...prev.issues, ...issues])],
      }))
    }
    if (step < questions.length - 1) setStep(step + 1)
  }

  const reset = () => {
    setStep(0)
    setAssessment({ likelihood: 0, consequence: 0, issues: [] })
  }

  const isComplete     = step === questions.length - 1 && assessment.consequence > 0
  const currentQuestion = questions[step]

  if (isComplete) {
    const risk      = getRiskLevel(calculateRisk())
    const riskScore = calculateRisk()

    const trackAndNavigate = (eventLabel: string, path: string) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventLabel, {
          event_category: 'tool_completion',
          risk_score: riskScore,
        })
      }
      router.push(path)
    }

    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Result header */}
          <div className={`bg-gradient-to-r ${
            risk.color === 'red'    ? 'from-red-600 to-red-800' :
            risk.color === 'orange' ? 'from-orange-600 to-orange-800' :
            risk.color === 'yellow' ? 'from-yellow-600 to-yellow-800' :
            'from-green-600 to-green-800'
          } text-white p-8`}>
            <div className="text-center">
              <div className="mb-4">
                {(risk.color === 'red' || risk.color === 'orange') && <AlertTriangle className="w-20 h-20 mx-auto" />}
                {risk.color === 'yellow'  && <Info         className="w-20 h-20 mx-auto" />}
                {risk.color === 'green'   && <CheckCircle  className="w-20 h-20 mx-auto" />}
              </div>
              <h2 className="text-4xl font-bold mb-2">{risk.level} Risk</h2>
              <p className="text-xl text-white/90">Risk Score: {riskScore} / 16</p>
            </div>
          </div>

          <div className="p-8 space-y-6">
            {/* Recommended action */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-amber-900 mb-3">Recommended Action</h3>
              <p className="text-lg text-amber-800">{risk.action}</p>
            </div>

            {/* Issues */}
            {assessment.issues.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-amber-900 mb-3">Issues Identified</h3>
                <ul className="space-y-2">
                  {assessment.issues.map((issue, i) => (
                    <li key={i} className="flex items-start gap-2 text-amber-800">
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* What this means */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-3">What This Means</h3>
              <div className="text-blue-900">
                {riskScore >= 9 && (
                  <p><strong>Extreme Risk:</strong> This tree poses an immediate safety hazard. Contact a professional arborist within 2 weeks and consider restricting access to the area until assessed.</p>
                )}
                {riskScore >= 6 && riskScore < 9 && (
                  <p><strong>High Risk:</strong> This tree has significant structural issues. Professional evaluation and corrective action should be scheduled within 30–60 days.</p>
                )}
                {riskScore >= 3 && riskScore < 6 && (
                  <p><strong>Moderate Risk:</strong> The tree has issues that warrant attention but aren&apos;t immediately urgent. Schedule a professional inspection within 90 days.</p>
                )}
                {riskScore < 3 && (
                  <p><strong>Low Risk:</strong> Your tree appears to be in good condition! Continue regular monitoring and consider annual inspections.</p>
                )}
              </div>
            </div>

            {/* Next steps */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-amber-900 mb-3">Next Steps</h3>
              <ol className="space-y-2 text-amber-800">
                {[
                  'Document the tree with photos for professional review',
                  'Get a professional evaluation from a certified arborist',
                  'Obtain multiple quotes for any recommended work',
                  'Keep records of assessments and work performed',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Share & email results */}
            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3 text-center">Save or Share Your Results</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={emailMeResults}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  Email Me Results
                </button>
                <div className="flex-1 relative">
                  <button
                    onClick={() => setShareMenuOpen(!shareMenuOpen)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                    Share Results
                  </button>
                  {shareMenuOpen && (
                    <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-lg shadow-xl border-2 border-emerald-200 overflow-hidden z-10">
                      {([
                        { method: 'email' as const, Icon: Mail,         label: 'Share via Email' },
                        { method: 'sms'   as const, Icon: MessageSquare, label: 'Share via Text' },
                        { method: 'copy'  as const, Icon: Share2,        label: 'Copy to Clipboard' },
                      ]).map(({ method, Icon, label }) => (
                        <button
                          key={method}
                          onClick={() => shareResults(method)}
                          className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors flex items-center gap-2 text-slate-900"
                        >
                          <Icon className="w-4 h-4" />
                          {label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-2 text-center">
                Save your assessment or share with family / contractors
              </p>
            </div>

            {/* Contextual CTA */}
            {riskScore >= 6 ? (
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6">
                <h3 className="text-xl font-bold text-red-900 mb-4 text-center">Immediate Action Recommended</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => trackAndNavigate('high_risk_conversion', `/contact?risk=high&score=${riskScore}`)}
                    className="block w-full px-6 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-lg transition-colors text-center shadow-lg"
                  >
                    Get Emergency Help Now →
                  </button>
                  <button onClick={reset} className="block w-full px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors text-center">
                    Assess Another Tree
                  </button>
                </div>
              </div>
            ) : riskScore >= 3 ? (
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
                <h3 className="text-xl font-bold text-yellow-900 mb-4 text-center">Professional Consultation Recommended</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => trackAndNavigate('moderate_risk_conversion', `/contact?risk=medium&score=${riskScore}`)}
                    className="block w-full px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg transition-colors text-center shadow-lg"
                  >
                    Get Free Consultation →
                  </button>
                  <button onClick={reset} className="block w-full px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors text-center">
                    Assess Another Tree
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-900 mb-4 text-center">Your Tree Looks Healthy!</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      if (typeof window !== 'undefined' && window.gtag) {
                        window.gtag('event', 'low_risk_email_modal', { event_category: 'tool_completion', risk_score: riskScore })
                      }
                      setShowEmailModal(true)
                    }}
                    className="block w-full px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg transition-colors text-center shadow-lg"
                  >
                    Get Seasonal Care Tips →
                  </button>
                  <button onClick={reset} className="block w-full px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors text-center">
                    Assess Another Tree
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <EmailCaptureModal isOpen={showEmailModal} onClose={() => setShowEmailModal(false)} />
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-amber-900 mb-3">Tree Hazard Assessment</h2>
        <p className="text-amber-800 leading-relaxed">
          Answer a few questions to evaluate potential risks. This assessment uses professional
          arborist standards to calculate a risk score for your tree.
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-amber-700 mb-2">
          <span>Progress</span>
          <span>{step + 1} of {questions.length}</span>
        </div>
        <div className="h-3 bg-amber-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-yellow-600 transition-all duration-500"
            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-amber-900 mb-2">{currentQuestion.title}</h3>
        <p className="text-amber-700 mb-6">{currentQuestion.description}</p>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.value, option.issues, currentQuestion.isConsequence ?? false)}
              className="w-full p-5 text-left bg-amber-50 hover:bg-amber-100 border-2 border-amber-200 hover:border-amber-400 rounded-xl transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-amber-900 font-medium group-hover:text-amber-700 transition-colors">
                  {option.text}
                </span>
                <svg className="w-5 h-5 text-amber-600 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Method note */}
      <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-5">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">Assessment Method</p>
            <p>
              This tool uses the ISA (International Society of Arboriculture) Tree Risk Assessment
              framework, calculating Likelihood of Failure × Consequence of Failure.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
