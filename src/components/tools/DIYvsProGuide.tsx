'use client'

import { AlertTriangle, CheckCircle, Wrench, ArrowRight } from 'lucide-react'
import { CONTACT } from '@/lib/constants'
import { useRouter } from 'next/navigation'

type TaskCategory = 'safe-diy' | 'risky-diy' | 'professional-only'

interface Task {
  name: string
  category: TaskCategory
  description: string
  safety: string[]
  tools: string[]
  whenToCall: string
}

const tasks: Task[] = [
  {
    name: 'Small Branch Pruning (under 2" diameter)',
    category: 'safe-diy',
    description: 'Removing small branches reachable from stable ground only',
    safety: [
      'Use proper pruning shears or hand saw',
      'Make clean cuts at the branch collar',
      'Never cut branches above your head',
      'Stop if the work cannot be completed while standing on stable ground',
    ],
    tools: ['Hand pruners', 'Loppers', 'Hand saw', 'Safety glasses'],
    whenToCall: 'If branches are near power lines or over 10 feet high',
  },
  {
    name: 'Small Tree Planting',
    category: 'safe-diy',
    description: 'Planting trees under 6 feet tall',
    safety: [
      'Call 811 before digging to locate utilities',
      'Dig hole 2-3x wider than root ball',
      'Plant at proper depth (root flare visible)',
      'Water thoroughly after planting',
    ],
    tools: ['Shovel', 'Wheelbarrow', 'Garden hose', 'Mulch'],
    whenToCall: 'For large trees or if you hit utility lines while digging',
  },
  {
    name: 'Mulching Around Trees',
    category: 'safe-diy',
    description: 'Applying mulch properly around tree base',
    safety: [
      'Keep mulch 3-6 inches away from trunk',
      'Apply 2-4 inch layer, no deeper',
      'Use organic mulch (wood chips, bark)',
      "Don't create \"volcano mulching\" against trunk",
    ],
    tools: ['Wheelbarrow', 'Rake', 'Mulch'],
    whenToCall: 'Stop if the root flare is hidden, the trunk is damaged, the site is unstable, or you are unsure how much mulch to remove',
  },
  {
    name: 'Watering & Basic Care',
    category: 'safe-diy',
    description: 'Regular watering and general tree care',
    safety: [
      'Deep water (12-18 inches) weekly for young trees',
      'Water at soil level, not leaves',
      'Morning watering prevents disease',
      'Adjust for rainfall and season',
    ],
    tools: ['Garden hose', 'Soaker hose (optional)'],
    whenToCall: 'If tree shows signs of disease or severe stress',
  },
  {
    name: 'Medium Branch Pruning (2-4" diameter)',
    category: 'professional-only',
    description: 'Pruning larger branches that require more skill',
    safety: [
      'Large limbs can swing, split, or remain under hidden tension',
      'Do not use a chainsaw, ladder, or overhead cutting tool',
      'Keep people away from the work zone',
      'Arrange an appropriately equipped service provider',
    ],
    tools: [],
    whenToCall: 'Keep clear of the work area and arrange an appropriately equipped, qualified tree-service provider',
  },
  {
    name: 'Small Stump Removal',
    category: 'professional-only',
    description: 'Removing stumps under 10 inches diameter',
    safety: [
      'Do not pull a stump with a vehicle',
      'Do not operate a rental grinder without appropriate training',
      'Roots may conflict with buried utilities',
      'Request a site-specific removal method',
    ],
    tools: [],
    whenToCall: 'Keep clear of the stump and arrange an appropriately equipped, qualified stump-service provider',
  },
  {
    name: 'Small Dead Tree Removal (under 15 feet)',
    category: 'professional-only',
    description: 'Removing small dead trees with open space to fall',
    safety: [
      'Dead trees are unpredictable and brittle',
      'Do not cut, pull, or fell a dead tree yourself',
      'Keep people and pets out of reach of the tree',
      'Arrange an on-site work plan',
    ],
    tools: [],
    whenToCall: 'Keep clear of the dead tree and arrange an appropriately equipped, qualified tree-service provider',
  },
  {
    name: 'Any Work Over 20 Feet High',
    category: 'professional-only',
    description: 'Pruning, removal, or any work requiring climbing or bucket truck',
    safety: [
      'Falls and falling material can cause severe injury during elevated tree work',
      'Specialized training, access systems, and equipment are required',
      'Confirm the service provider’s insurance and work scope directly',
      'Difficult to judge branch weight and direction of fall from ground',
    ],
    tools: [],
    whenToCall: 'Keep clear of elevated tree work and arrange an appropriately equipped, qualified tree-service provider',
  },
  {
    name: 'Trees Near Power Lines',
    category: 'professional-only',
    description: 'Any work on trees touching or within 10 feet of power lines',
    safety: [
      'Electricity can arc through trees and tools',
      'Even "de-energized" lines can be deadly',
      'Special training and equipment required',
      'The utility can explain its responsibility and the safe next step for the specific line',
    ],
    tools: [],
    whenToCall: 'Keep clear, contact the utility first, and arrange an appropriately equipped, qualified provider only as the utility directs',
  },
  {
    name: 'Large Tree Removal (over 15 feet)',
    category: 'professional-only',
    description: 'Removing any substantial tree',
    safety: [
      'Requires rigging, ropes, and advanced felling techniques',
      'Unpredictable forces can cause serious injury or property damage',
      'Confirm the selected provider’s insurance and equipment directly',
      'Heavy equipment may be needed for large trees',
    ],
    tools: [],
    whenToCall: 'Keep clear of the tree and arrange an appropriately equipped, qualified tree-service provider',
  },
  {
    name: 'Storm-Damaged Trees',
    category: 'professional-only',
    description: 'Dealing with broken, hanging, or uprooted trees',
    safety: [
      'Damaged trees under tension are extremely dangerous',
      'Branches can spring with deadly force',
      'Hung-up trees ("widow makers") are unpredictable',
      'Root balls can flip back when cutting',
    ],
    tools: [],
    whenToCall: 'Keep clear and contact emergency services, the utility, or an appropriately equipped, qualified tree-service provider as the situation requires',
  },
  {
    name: 'Disease Diagnosis & Treatment',
    category: 'professional-only',
    description: 'Identifying and treating tree diseases',
    safety: [
      'Misdiagnosis can lead to wrong treatment and wasted money',
      'Some diseases require quarantine procedures',
      'Treatment timing is critical for effectiveness',
      'An independently credentialed professional can help distinguish treatable problems from removal cases',
    ],
    tools: [],
    whenToCall: 'Keep clear of dead or hanging parts and arrange an appropriately qualified plant-health professional before treatment',
  },
]

/**
 * Displays guidance for choosing between DIY and professional tree care.
 */
export function DIYvsProGuide() {
  const router = useRouter()
  const safeItems  = tasks.filter(t => t.category === 'safe-diy')
  const riskyItems = tasks.filter(t => t.category === 'risky-diy')
  const proItems   = tasks.filter(t => t.category === 'professional-only')

  const handleProRequest = (taskName: string) => {
    const params = new URLSearchParams({
      source: 'diy_guide',
      task: taskName
    })
    router.push(`/contact?${params.toString()}`)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-amber-900 mb-3">DIY vs Professional Guide</h2>
        <p className="text-amber-800 leading-relaxed mb-4">
          Learn which tree care tasks you can safely do yourself and when to call a professional.
          Your safety is the most important consideration.
        </p>
        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-900 font-medium">
              <strong>Safety First:</strong> Tree work is inherently dangerous. If you have any doubt
              about your ability to safely complete a task, <strong>do not attempt it.</strong> Medical bills and
              property damage cost far more than hiring an expert.
            </p>
          </div>
        </div>
      </div>

      {/* Safe DIY */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-green-800">Safe for DIY</h3>
        </div>
        <div className="space-y-4">
          {safeItems.map((task, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 border-2 border-green-200">
              <h4 className="text-xl font-bold text-amber-900 mb-2">{task.name}</h4>
              <p className="text-amber-700 mb-4">{task.description}</p>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-green-800 mb-2">Safety Tips:</h5>
                  <ul className="space-y-1 text-sm">
                    {task.safety.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span className="text-amber-800">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {task.tools.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-green-800 mb-2">Tools Needed:</h5>
                    <ul className="space-y-1 text-sm">
                      {task.tools.map((tool, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Wrench className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-amber-800">{tool}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-4 bg-blue-50 rounded-lg p-3">
                <p className="text-sm text-blue-900">
                  <strong>When to call a pro:</strong> {task.whenToCall}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risky DIY */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-2xl font-bold text-yellow-800">Proceed with Caution</h3>
        </div>
        <div className="space-y-4">
          {riskyItems.map((task, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 border-2 border-yellow-300">
              <h4 className="text-xl font-bold text-amber-900 mb-2">{task.name}</h4>
              <p className="text-amber-700 mb-4">{task.description}</p>

              <div className="bg-yellow-50 rounded-lg p-4 mb-4">
                <h5 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Critical Safety Information:
                </h5>
                <ul className="space-y-1 text-sm">
                  {task.safety.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-yellow-600">⚠</span>
                      <span className="text-yellow-900">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {task.tools.length > 0 && (
                <div className="mb-4">
                  <h5 className="font-semibold text-amber-900 mb-2">Required Equipment:</h5>
                  <p className="text-sm text-amber-700">{task.tools.join(', ')}</p>
                </div>
              )}

              <div className="bg-red-50 rounded-lg p-3">
                <p className="text-sm text-red-900">
                  <strong>When to call a pro:</strong> {task.whenToCall}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Only */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-red-800">Professional Only — Do Not Attempt</h3>
        </div>
        <div className="space-y-4">
          {proItems.map((task, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 border-2 border-red-300">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-amber-900 mb-2">{task.name}</h4>
                  <p className="text-amber-700 mb-4">{task.description}</p>

                  <div className="bg-red-50 rounded-lg p-4">
                    <h5 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Why This Must Be Done By Professionals:
                    </h5>
                    <ul className="space-y-2 text-sm">
                      {task.safety.map((reason, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-red-600 text-lg">⛔</span>
                          <span className="text-red-900">{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 bg-blue-50 rounded-lg p-3">
                    <p className="text-sm text-blue-900">
                      <strong>What to do:</strong> {task.whenToCall}
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <button
                    onClick={() => handleProRequest(task.name)}
                    className="flex w-full md:w-auto items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-4 font-bold text-white shadow-lg transition-all hover:bg-red-700 hover:scale-105 active:scale-95"
                  >
                    Request Professional Help
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-8 bg-gradient-to-br from-amber-800 to-yellow-700 text-white rounded-2xl p-8">
        <h3 className="text-2xl font-bold mb-4">Still Not Sure? Ask a Pro</h3>
        <p className="text-amber-100 mb-6">
          If you&apos;re uncertain whether a task is safe for DIY, err on the side of caution.
          Contact Midwest Roots to discuss service fit and current availability, or seek an independently credentialed professional for safety-sensitive assessment.
        </p>
        <div className="space-y-3">
          <a
            href={`tel:${CONTACT.phoneRaw}`}
            className="block w-full px-6 py-4 bg-white text-amber-900 rounded-xl font-bold hover:bg-amber-50 transition-colors text-center"
          >
            Call Andrew: {CONTACT.phone}
            <div className="text-sm font-normal text-amber-700 mt-1">Service fit and availability confirmed after contact</div>
          </a>
          <a
            href={`mailto:${CONTACT.email}?subject=Question%20About%20Tree%20Work%20-%20DIY%20vs%20Pro`}
            className="block w-full px-6 py-3 bg-amber-900 text-white rounded-xl font-semibold hover:bg-amber-800 transition-colors text-center"
          >
            Email Your Question
          </a>
        </div>
      </div>
    </div>
  )
}
