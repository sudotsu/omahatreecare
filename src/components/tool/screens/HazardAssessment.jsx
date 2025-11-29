import { useState } from 'react'
import { AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react'


export function HazardAssessment() {
  const [step, setStep] = useState(0)
  const [assessment, setAssessment] = useState({
    likelihood: 0,
    consequence: 0,
    issues: []
  })

  const calculateRisk = () => assessment.likelihood * assessment.consequence

  const getRiskLevel = () => {
    const risk = calculateRisk()
    if (risk >= 9) return { level: 'Extreme', color: 'red', action: 'Immediate action required (0-14 days)' }
    if (risk >= 6) return { level: 'High', color: 'orange', action: 'Priority service within 30-60 days' }
    if (risk >= 3) return { level: 'Moderate', color: 'yellow', action: 'Schedule maintenance within 90 days' }
    return { level: 'Low', color: 'green', action: 'Monitor during regular visits' }
  }

  const questions = [
    {
      title: 'Root & Trunk Condition',
      description: 'Check the base of your tree for these warning signs',
      options: [
        { text: 'Tree appears healthy with no visible defects', value: 1, issues: [] },
        { text: 'Minor issues like small cracks or minor lean', value: 2, issues: ['Minor structural defects'] },
        { text: 'Significant cracks, large cavities, or noticeable lean', value: 3, issues: ['Significant structural defects'] },
        { text: 'Severe lean, major cracks, mushrooms at base, or lifting soil', value: 4, issues: ['Severe structural damage', 'Root decay indicators'] }
      ]
    },
    {
      title: 'Branch Structure',
      description: 'Look at the branches and overall tree structure',
      options: [
        { text: 'Branches appear strong and well-attached', value: 1, issues: [] },
        { text: 'Some dead branches or minor structural issues', value: 2, issues: ['Dead branches present'] },
        { text: 'Multiple dead branches, weak attachments, or co-dominant stems', value: 3, issues: ['Multiple dead branches', 'Weak branch unions'] },
        { text: 'Large dead branches, severe storm damage, or major splits', value: 4, issues: ['Large dead limbs (widow makers)', 'Major storm damage'] }
      ]
    },
    {
      title: 'Tree Health',
      description: 'Assess the overall health and foliage',
      options: [
        { text: 'Full, healthy canopy with good color', value: 1, issues: [] },
        { text: 'Some thinning or minor discoloration', value: 2, issues: ['Minor canopy thinning'] },
        { text: 'Significant die-back or less than 50% normal foliage', value: 3, issues: ['Significant die-back', 'Sparse foliage'] },
        { text: 'Tree is dead or dying with minimal living tissue', value: 4, issues: ['Tree in severe decline or dead'] }
      ]
    },
    {
      title: 'Target Assessment',
      description: 'What could be damaged if the tree or branches fail?',
      options: [
        { text: 'Remote area, no structures or people nearby', value: 1, issues: [] },
        { text: 'Occasional use area, some property at risk', value: 2, issues: [] },
        { text: 'Frequent use area, near structures or regular parking', value: 3, issues: [] },
        { text: 'House, garage, or high-traffic area directly below', value: 4, issues: [] }
      ],
      isConsequence: true
    }
  ]

  const handleAnswer = (value) => {
    if (isConsequence) {
      setAssessment(prev => ({ ...prev, consequence: value }))
    } else {
      setAssessment(prev => ({
        ...prev,
        likelihood: Math.max(prev.likelihood, value),
        issues: [...new Set([...prev.issues, ...newIssues])]
      }))
    }
    
    if (step < questions.length - 1) {
      setStep(step + 1)
    }
  }

  const reset = () => {
    setStep(0)
    setAssessment({ likelihood: 0, consequence: 0, issues: [] })
  }

  const isComplete = step === questions.length - 1 && assessment.consequence > 0
  const currentQuestion = questions[step]

  if (isComplete) {
    const risk = getRiskLevel()
    const riskScore = calculateRisk()

    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className={`bg-gradient-to-r ${
            risk.color === 'red' ? 'from-red-600 to-red-800' :
            risk.color === 'orange' ? 'from-orange-600 to-orange-800' :
            risk.color === 'yellow' ? 'from-yellow-600 to-yellow-800' :
            'from-green-600 to-green-800'
          } text-white p-8`}>
            <div className="text-center">
              <div className="mb-4">
                {risk.color === 'red' && <AlertTriangle className="w-20 h-20 mx-auto" />}
                {risk.color === 'orange' && <AlertTriangle className="w-20 h-20 mx-auto" />}
                {risk.color === 'yellow' && <Info className="w-20 h-20 mx-auto" />}
                {risk.color === 'green' && <CheckCircle className="w-20 h-20 mx-auto" />}
              </div>
              <h2 className="text-4xl font-bold mb-2">{risk.level} Risk</h2>
              <p className="text-xl text-white/90">Risk Score: {riskScore} / 16</p>
            </div>
          </div>

          {/* Results */}
          <div className="p-8 space-y-6">
            <div className="bg-amber-50 dark:bg-slate-700/50 border-2 border-amber- dark:border-slate-200 dark:border-slate-600 rounded-xl p-6">
              <h3 className="text-xl font-bold text-amber-900 dark:text-slate-100 mb-3">Recommended Action</h3>
              <p className="text-lg text-amber-800 dark:text-slate-300">{risk.action}</p>
            </div>

            {assessment.issues.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-amber-900 dark:text-slate-100 mb-3">Issues Identified</h3>
                <ul className="space-y-2">
                  {assessment.issues.map((issue, i) => (
                    <li key={i} className="flex items-start gap-2 text-amber-800 dark:text-slate-300">
                      <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-blue-900 dark:text-blue-200 mb-3">What This Means</h3>
              <div className="space-y-3 text-blue-900 dark:text-blue-200">
                {riskScore >= 9 && (
                  <p>
                    <strong>Extreme Risk:</strong> This tree poses an immediate safety hazard. 
                    We strongly recommend contacting a professional arborist within 2 weeks. 
                    Consider restricting access to the area until the tree is assessed.
                  </p>
                )}
                {riskScore >= 6 && riskScore < 9 && (
                  <p>
                    <strong>High Risk:</strong> This tree has significant structural issues that should be 
                    addressed soon. Professional evaluation and corrective action (pruning, cabling, or removal) 
                    should be scheduled within 30-60 days.
                  </p>
                )}
                {riskScore >= 3 && riskScore < 6 && (
                  <p>
                    <strong>Moderate Risk:</strong> The tree has some issues that warrant attention but aren't 
                    immediately urgent. Schedule a professional inspection and maintenance within the next 90 days. 
                    Regular monitoring is recommended.
                  </p>
                )}
                {riskScore < 3 && (
                  <p>
                    <strong>Low Risk:</strong> Your tree appears to be in good condition! Continue regular 
                    monitoring and consider annual inspections. Standard maintenance practices should be sufficient.
                  </p>
                )}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-amber-900 dark:text-slate-100 mb-3">Next Steps</h3>
              <ul className="space-y-2 text-amber-800 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-emerald-400 mt-1">1.</span>
                  <span>Document the tree with photos for professional review</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-emerald-400 mt-1">2.</span>
                  <span>Get a professional evaluation from a certified arborist</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-emerald-400 mt-1">3.</span>
                  <span>Obtain multiple quotes for any recommended work</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-emerald-400 mt-1">4.</span>
                  <span>Keep records of assessments and work performed</span>
                </li>
              </ul>
            </div>

            {/* Next Steps - Contextual based on risk */}
            {(riskScore >= 6) ? (
              // High/Extreme Risk - Priority contact options
              <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 rounded-xl p-6">
                <h3 className="text-xl font-bold text-red-900 dark:text-red-200 mb-4 text-center">
                  ⚠️ Your Next Step: Get Professional Help
                </h3>
                <div className="space-y-3">
                  <a
                    href="tel:+14028123294"
                    className="block w-full px-6 py-4 bg-green-600 dark:bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 dark:hover:bg-emerald-700 transition-colors text-center shadow-lg"
                  >
                    📞 Call or Text Andrew: (402) 812-3294
                    <div className="text-sm font-normal text-green-100 mt-1">Available 24/7 - Even at 1am</div>
                  </a>
                  
                  <a
                    href="https://www.google.com/search?q=tree+removal+omaha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-6 py-4 bg-blue-600 dark:bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors text-center"
                  >
                    🔍 Compare Tree Service Pros in Your Area
                    <div className="text-sm font-normal text-blue-100 mt-1">Do your research - we're confident in our work</div>
                  </a>

                  <button
                    onClick={reset}
                    className="block w-full px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors text-center"
                  >
                    Assess Another Tree
                  </button>
                </div>
              </div>
            ) : (
              // Moderate/Low Risk - Softer email capture
              <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-300 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-200 mb-4 text-center">
                  What's Your Next Step?
                </h3>
                <div className="space-y-3">
                  <a
                    href="mailto:andrew@midwestroots.info?subject=Tree%20Care%20Question%20from%20Diagnostic%20Tool"
                    className="block w-full px-6 py-4 bg-green-600 dark:bg-emerald-600 text-white rounded-xl font-semibold hover:bg-green-700 dark:hover:bg-emerald-700 transition-colors text-center"
                  >
                    📧 Get Free Expert Advice via Email
                  </a>
                  
                  <a
                    href="tel:+14028123294"
                    className="block w-full px-6 py-4 bg-blue-600 dark:bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors text-center"
                  >
                    📞 Call for Free Phone Consultation
                    <div className="text-sm font-normal text-blue-100 mt-1">(402) 812-3294</div>
                  </a>

                  <a
                    href="mailto:andrew@midwestroots.info?subject=Send%20Me%20Seasonal%20Tree%20Care%20Tips"
                    className="block w-full px-6 py-3 bg-amber-600 dark:bg-slate-600 text-white rounded-xl font-semibold hover:bg-amber-700 dark:hover:bg-slate-700 transition-colors text-center"
                  >
                    🌳 Send Me Seasonal Tree Care Tips
                  </a>

                  <button
                    onClick={reset}
                    className="block w-full px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors text-center"
                  >
                    Assess Another Tree
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-amber-900 dark:text-slate-100 mb-3">Tree Hazard Assessment</h2>
        <p className="text-amber-800 dark:text-slate-300 leading-relaxed">
          Answer a few questions to evaluate potential risks. This assessment uses professional 
          arborist standards to calculate a risk score for your tree.
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-amber-700 dark:text-slate-400 mb-2">
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

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 animate-fade-in">
        <h3 className="text-2xl font-bold text-amber-900 dark:text-slate-100 mb-2">{currentQuestion.title}</h3>
        <p className="text-amber-700 dark:text-slate-400 mb-6">{currentQuestion.description}</p>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.value, option.issues, currentQuestion.isConsequence || false)}
              className="w-full p-5 text-left bg-amber-50 dark:bg-slate-700/50 hover:bg-amber-100 border-2 border-amber- dark:border-slate-200 dark:border-slate-600 hover:border-amber-400 rounded-xl transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-amber-900 dark:text-slate-100 font-medium group-hover:text-amber-700 dark:text-slate-400 transition-colors">
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

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 rounded-xl p-5">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900 dark:text-blue-200">
            <p className="font-semibold mb-1">Assessment Method</p>
            <p>
              This tool uses the ISA (International Society of Arboriculture) Tree Risk Assessment framework, 
              calculating risk of Failure × Consequence of Failure.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
