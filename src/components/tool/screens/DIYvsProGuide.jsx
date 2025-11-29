import { Wrench, AlertTriangle, CheckCircle } from 'lucide-react'


const tasks = [
  {
    name: 'Small Branch Pruning (under 2" diameter)',
    category: 'safe-diy',
    description: 'Removing small branches at ground level or with a ladder',
    safety: [
      'Use proper pruning shears or hand saw',
      'Make clean cuts at the branch collar',
      'Never cut branches above your head',
      'Use a stable ladder with someone to spot you'
    ],
    tools: ['Hand pruners', 'Loppers', 'Hand saw', 'Sturdy ladder', 'Safety glasses'],
    whenToCall: 'If branches are near power lines or over 10 feet high'
  },
  {
    name: 'Small Tree Planting',
    category: 'safe-diy',
    description: 'Planting trees under 6 feet tall',
    safety: [
      'Call 811 before digging to locate utilities',
      'Dig hole 2-3x wider than root ball',
      'Plant at proper depth (root flare visible)',
      'Water thoroughly after planting'
    ],
    tools: ['Shovel', 'Wheelbarrow', 'Garden hose', 'Mulch'],
    whenToCall: 'For large trees or if you hit utility lines while digging'
  },
  {
    name: 'Mulching Around Trees',
    category: 'safe-diy',
    description: 'Applying mulch properly around tree base',
    safety: [
      'Keep mulch 3-6 inches away from trunk',
      'Apply 2-4 inch layer, no deeper',
      'Use organic mulch (wood chips, bark)',
      'Don\'t create "volcano mulching" against trunk'
    ],
    tools: ['Wheelbarrow', 'Rake', 'Mulch'],
    whenToCall: 'Never - this is always safe to DIY'
  },
  {
    name: 'Watering & Basic Care',
    category: 'safe-diy',
    description: 'Regular watering and general tree care',
    safety: [
      'Deep water (12-18 inches) weekly for young trees',
      'Water at soil level, not leaves',
      'Morning watering prevents disease',
      'Adjust for rainfall and season'
    ],
    tools: ['Garden hose', 'Soaker hose (optional)'],
    whenToCall: 'If tree shows signs of disease or severe stress'
  },
  {
    name: 'Medium Branch Pruning (2-4" diameter)',
    category: 'risky-diy',
    description: 'Pruning larger branches that require more skill',
    safety: [
      'Use three-cut method to prevent bark tearing',
      'Never use a chainsaw from a ladder',
      'Wear proper safety equipment',
      'Be aware of branch spring and tension'
    ],
    tools: ['Pole saw', 'Bow saw', 'Safety equipment', 'Chainsaw (if experienced)'],
    whenToCall: 'If branches are over head height, near power lines, or you\'re uncomfortable'
  },
  {
    name: 'Small Stump Removal',
    category: 'risky-diy',
    description: 'Removing stumps under 10 inches diameter',
    safety: [
      'Excavate around stump to expose roots',
      'Cut major roots with saw or axe',
      'Pull stump with vehicle only if safe and clear',
      'Rental stump grinders are powerful and dangerous'
    ],
    tools: ['Shovel', 'Axe', 'Root saw', 'Stump grinder rental (advanced)'],
    whenToCall: 'For stumps over 10", near utilities, or if uncomfortable with equipment'
  },
  {
    name: 'Small Dead Tree Removal (under 15 feet)',
    category: 'risky-diy',
    description: 'Removing small dead trees with open space to fall',
    safety: [
      'Dead trees are unpredictable and brittle',
      'Ensure clear fall zone 2x tree height',
      'Use proper felling techniques',
      'Plan escape route 45° from fall direction'
    ],
    tools: ['Chainsaw', 'Wedges', 'Rope', 'Safety gear'],
    whenToCall: 'If any structures, fences, or obstacles in fall zone, or tree is leaning'
  },
  {
    name: 'Any Work Over 20 Feet High',
    category: 'professional-only',
    description: 'Pruning, removal, or any work requiring climbing or bucket truck',
    safety: [
      'Falls from height are the #1 cause of tree work fatalities',
      'Professional arborists have specialized training and equipment',
      'Insurance rarely covers homeowner tree work injuries',
      'Difficult to judge branch weight and direction of fall from ground'
    ],
    tools: [],
    whenToCall: 'Always call a professional - never attempt high tree work yourself'
  },
  {
    name: 'Trees Near Power Lines',
    category: 'professional-only',
    description: 'Any work on trees touching or within 10 feet of power lines',
    safety: [
      'Electricity can arc through trees and tools',
      'Even "de-energized" lines can be deadly',
      'Special training and equipment required',
      'Your utility company may provide free trimming service'
    ],
    tools: [],
    whenToCall: 'Always - contact utility company first, then professional tree service'
  },
  {
    name: 'Large Tree Removal (over 15 feet)',
    category: 'professional-only',
    description: 'Removing any substantial tree',
    safety: [
      'Requires rigging, ropes, and advanced felling techniques',
      'Unpredictable forces can cause serious injury or property damage',
      'Professionals have liability insurance',
      'Heavy equipment may be needed for large trees'
    ],
    tools: [],
    whenToCall: 'Always - tree removal is extremely dangerous and complex'
  },
  {
    name: 'Storm-Damaged Trees',
    category: 'professional-only',
    description: 'Dealing with broken, hanging, or uprooted trees',
    safety: [
      'Damaged trees under tension are extremely dangerous',
      'Branches can spring with deadly force',
      'Hung-up trees ("widow makers") are unpredictable',
      'Root balls can flip back when cutting'
    ],
    tools: [],
    whenToCall: 'Always - storm damage creates hidden dangers only pros can handle safely'
  },
  {
    name: 'Disease Diagnosis & Treatment',
    category: 'professional-only',
    description: 'Identifying and treating tree diseases',
    safety: [
      'Misdiagnosis can lead to wrong treatment and wasted money',
      'Some diseases require quarantine procedures',
      'Treatment timing is critical for effectiveness',
      'Certified arborists can save trees that homeowners might remove unnecessarily'
    ],
    tools: [],
    whenToCall: 'When tree shows unusual symptoms, discoloration, or decline'
  }
]

export function DIYvsProGuide() {
  const safeItems = tasks.filter(t => t.category === 'safe-diy')
  const riskyItems = tasks.filter(t => t.category === 'risky-diy')
  const proItems = tasks.filter(t => t.category === 'professional-only')

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-amber-900 dark:text-slate-100 mb-3">DIY vs Professional Guide</h2>
        <p className="text-amber-800 dark:text-slate-300 leading-relaxed mb-4">
          Learn which tree care tasks you can safely do yourself and when to call a professional. 
          Your safety is the most important consideration.
        </p>
        <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 rounded-xl p-4">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-900 dark:text-red-200 font-medium">
              <strong>Safety First:</strong> Tree work is inherently dangerous. If you have any doubt 
              about your ability to safely complete a task, call a professional. Medical bills and 
              property damage cost far more than hiring an expert.
            </p>
          </div>
        </div>
      </div>

      {/* Safe DIY */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-2xl font-bold text-green-800">Safe for DIY</h3>
        </div>
        <div className="space-y-4">
          {safeItems.map((task, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border-2 border-green-200">
              <h4 className="text-xl font-bold text-amber-900 dark:text-slate-100 mb-2">{task.name}</h4>
              <p className="text-amber-700 dark:text-slate-400 mb-4">{task.description}</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-green-800 mb-2">Safety Tips:</h5>
                  <ul className="space-y-1 text-sm">
                    {task.safety.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-600 dark:text-emerald-400">✓</span>
                        <span className="text-amber-800 dark:text-slate-300">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {task.tools && (
                  <div>
                    <h5 className="font-semibold text-green-800 mb-2">Tools Needed:</h5>
                    <ul className="space-y-1 text-sm">
                      {task.tools.map((tool, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Wrench className="w-4 h-4 text-green-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span className="text-amber-800 dark:text-slate-300">{tool}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                <p className="text-sm text-blue-900 dark:text-blue-200">
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
            <div key={index} className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border-2 border-yellow-300">
              <h4 className="text-xl font-bold text-amber-900 dark:text-slate-100 mb-2">{task.name}</h4>
              <p className="text-amber-700 dark:text-slate-400 mb-4">{task.description}</p>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mb-4">
                <h5 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Critical Safety Information:
                </h5>
                <ul className="space-y-1 text-sm">
                  {task.safety.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-yellow-600">⚠</span>
                      <span className="text-yellow-900 dark:text-yellow-200">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {task.tools && (
                <div className="mb-4">
                  <h5 className="font-semibold text-amber-900 dark:text-slate-100 mb-2">Required Equipment:</h5>
                  <p className="text-sm text-amber-700 dark:text-slate-400">{task.tools.join(', ')}</p>
                </div>
              )}
              
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                <p className="text-sm text-red-900 dark:text-red-200">
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
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-2xl font-bold text-red-800">Professional Only - Do Not Attempt</h3>
        </div>
        <div className="space-y-4">
          {proItems.map((task, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border-2 border-red-300">
              <h4 className="text-xl font-bold text-amber-900 dark:text-slate-100 mb-2">{task.name}</h4>
              <p className="text-amber-700 dark:text-slate-400 mb-4">{task.description}</p>
              
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                <h5 className="font-semibold text-red-900 dark:text-red-200 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Why This Must Be Done By Professionals:
                </h5>
                <ul className="space-y-2 text-sm">
                  {task.safety.map((reason, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-red-600 dark:text-red-400 text-lg">⛔</span>
                      <span className="text-red-900 dark:text-red-200">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                <p className="text-sm text-blue-900 dark:text-blue-200">
                  <strong>What to do:</strong> {task.whenToCall}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-8 bg-gradient-to-br from-amber-800 to-yellow-700 text-white rounded-2xl p-8">
        <h3 className="text-2xl font-bold mb-4">Still Not Sure? Ask a Pro</h3>
        <p className="text-amber-100 mb-6">
          If you're uncertain whether a task is safe for DIY, err on the side of caution. 
          Free consultations are always available - we'd rather answer your question than see you get hurt.
        </p>
        <div className="space-y-3">
          <a
            href="tel:+14028123294"
            className="block w-full px-6 py-4 bg-white dark:bg-slate-800 text-amber-900 dark:text-slate-100 rounded-xl font-bold hover:bg-amber-50 dark:bg-slate-700/50 transition-colors text-center"
          >
            📞 Call Andrew: (402) 812-3294
            <div className="text-sm font-normal text-amber-700 dark:text-slate-400 mt-1">Free advice, no obligation</div>
          </a>
          <a
            href="mailto:andrew@midwestroots.info?subject=Question%20About%20Tree%20Work%20-%20DIY%20vs%20Pro"
            className="block w-full px-6 py-3 bg-amber-900 text-white rounded-xl font-semibold hover:bg-amber-800 transition-colors text-center"
          >
            📧 Email Your Question
          </a>
          <a
            href="https://www.google.com/search?q=tree+removal+omaha"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full px-6 py-3 bg-amber-700 text-white rounded-xl font-semibold hover:bg-amber-600 dark:bg-slate-600 transition-colors text-center text-sm"
          >
            🔍 Compare Tree Service Pros
          </a>
        </div>
      </div>
    </div>
  )
}
