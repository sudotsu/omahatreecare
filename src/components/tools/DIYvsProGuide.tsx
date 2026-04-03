"use client";

import { 
  AlertTriangle, 
  CheckCircle, 
  Wrench, 
  ArrowRight, 
  ShieldCheck, 
  ShieldAlert, 
  Shield, 
  Hammer, 
  Construction,
  Info,
  ArrowLeft
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CONTACT } from "@/lib/constants";
import { dmSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { TreeRingsBackground } from "@/components/ui/TreeRingsBackground";

type TaskCategory = 'safe-diy' | 'risky-diy' | 'professional-only';

interface Task {
  name: string;
  category: TaskCategory;
  description: string;
  safety: string[];
  tools: string[];
  whenToCall: string;
}

const tasks: Task[] = [
  {
    name: 'Small Branch Pruning (under 2" diameter)',
    category: 'safe-diy',
    description: 'Removing small branches at ground level or with a ladder',
    safety: [
      'Use proper pruning shears or hand saw',
      'Make clean cuts at the branch collar',
      'Never cut branches above your head',
      'Use a stable ladder with someone to spot you',
    ],
    tools: ['Hand pruners', 'Loppers', 'Hand saw', 'Sturdy ladder', 'Safety glasses'],
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
    whenToCall: 'Never — this is always safe to DIY',
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
    category: 'risky-diy',
    description: 'Pruning larger branches that require more skill',
    safety: [
      'Use three-cut method to prevent bark tearing',
      'Never use a chainsaw from a ladder',
      'Wear proper safety equipment',
      'Be aware of branch spring and tension',
    ],
    tools: ['Pole saw', 'Bow saw', 'Safety equipment', 'Chainsaw (if experienced)'],
    whenToCall: "If branches are over head height, near power lines, or you're uncomfortable",
  },
  {
    name: 'Small Stump Removal',
    category: 'risky-diy',
    description: 'Removing stumps under 10 inches diameter',
    safety: [
      'Excavate around stump to expose roots',
      'Cut major roots with saw or axe',
      'Pull stump with vehicle only if safe and clear',
      'Rental stump grinders are powerful and dangerous',
    ],
    tools: ['Shovel', 'Axe', 'Root saw', 'Stump grinder rental (advanced)'],
    whenToCall: "For stumps over 10\", near utilities, or if uncomfortable with equipment",
  },
  {
    name: 'Small Dead Tree Removal (under 15 feet)',
    category: 'risky-diy',
    description: 'Removing small dead trees with open space to fall',
    safety: [
      'Dead trees are unpredictable and brittle',
      'Ensure clear fall zone 2x tree height',
      'Use proper felling techniques',
      'Plan escape route 45° from fall direction',
    ],
    tools: ['Chainsaw', 'Wedges', 'Rope', 'Safety gear'],
    whenToCall: 'If any structures, fences, or obstacles in fall zone, or tree is leaning',
  },
  {
    name: 'Any Work Over 20 Feet High',
    category: 'professional-only',
    description: 'Pruning, removal, or any work requiring climbing or bucket truck',
    safety: [
      'Falls from height are the #1 cause of tree work fatalities',
      'Professional arborists have specialized training and equipment',
      'Insurance rarely covers homeowner tree work injuries',
      'Difficult to judge branch weight and direction of fall from ground',
    ],
    tools: [],
    whenToCall: 'Always call a professional — never attempt high tree work yourself',
  },
  {
    name: 'Trees Near Power Lines',
    category: 'professional-only',
    description: 'Any work on trees touching or within 10 feet of power lines',
    safety: [
      'Electricity can arc through trees and tools',
      'Even "de-energized" lines can be deadly',
      'Special training and equipment required',
      'Your utility company may provide free trimming service',
    ],
    tools: [],
    whenToCall: 'Always — contact utility company first, then professional tree service',
  },
  {
    name: 'Large Tree Removal (over 15 feet)',
    category: 'professional-only',
    description: 'Removing any substantial tree',
    safety: [
      'Requires rigging, ropes, and advanced felling techniques',
      'Unpredictable forces can cause serious injury or property damage',
      'Professionals have liability insurance',
      'Heavy equipment may be needed for large trees',
    ],
    tools: [],
    whenToCall: 'Always — tree removal is extremely dangerous and complex',
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
    whenToCall: 'Always — storm damage creates hidden dangers only pros can handle safely',
  },
  {
    name: 'Disease Diagnosis & Treatment',
    category: 'professional-only',
    description: 'Identifying and treating tree diseases',
    safety: [
      'Misdiagnosis can lead to wrong treatment and wasted money',
      'Some diseases require quarantine procedures',
      'Treatment timing is critical for effectiveness',
      'Certified arborists can save trees that homeowners might remove unnecessarily',
    ],
    tools: [],
    whenToCall: 'When tree shows unusual symptoms, discoloration, or decline',
  },
];

export function DIYvsProGuide() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TaskCategory>('professional-only');
  const filteredTasks = tasks.filter(t => t.category === activeTab);

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="mb-12 text-center text-forest">
        <h2 className={`${dmSerif.className} text-4xl mb-4`}>DIY vs Professional Guide</h2>
        <p className="text-stone-500 max-w-2xl mx-auto text-lg">
          Tree work is a high-liability operation. Use this guide to determine where your safety ends and expert intervention begins.
        </p>
      </div>

      {/* Safety Alert Anchor */}
      <div className="mb-12 relative overflow-hidden rounded-2xl bg-red-50 border border-red-100 p-8 shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="rounded-full bg-red-100 p-4 shrink-0">
            <ShieldAlert className="w-10 h-10 text-red-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-red-900 mb-2">Zero-Tolerance Safety Baseline</h3>
            <p className="text-red-800 leading-relaxed text-sm">
              Medical bills and property damage costs are non-linear. If you lack the rigging equipment, insurance, or certified training for a task, **do not attempt it.** Professional expertise is a risk-mitigation investment.
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {[
          { id: 'professional-only', label: 'Pro Required', icon: ShieldAlert, color: 'text-red-600', activeBg: 'bg-red-600 border-red-600' },
          { id: 'risky-diy', label: 'Risky DIY', icon: AlertTriangle, color: 'text-amber-600', activeBg: 'bg-amber-600 border-amber-600' },
          { id: 'safe-diy', label: 'Safe for DIY', icon: ShieldCheck, color: 'text-emerald-600', activeBg: 'bg-emerald-600 border-emerald-600' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TaskCategory)}
              className={cn(
                "flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm border-2 transition-all shadow-sm",
                isActive 
                  ? `${tab.activeBg} text-white shadow-lg` 
                  : "bg-white border-stone-100 text-stone-400 hover:border-gold hover:text-forest"
              )}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Task List */}
      <div className="space-y-6">
        {filteredTasks.map((task, index) => (
          <div key={index} className="animate-fade-in bg-white rounded-3xl border border-stone-100 shadow-xl overflow-hidden group hover:border-gold/30 transition-all">
            <div className="p-8 md:p-10 flex flex-col md:flex-row gap-10">
              
              {/* Task Core */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  {activeTab === 'professional-only' && <ShieldAlert className="text-red-500" size={20} />}
                  {activeTab === 'risky-diy' && <AlertTriangle className="text-amber-500" size={20} />}
                  {activeTab === 'safe-diy' && <ShieldCheck className="text-emerald-500" size={20} />}
                  <h4 className={`${dmSerif.className} text-2xl text-forest`}>{task.name}</h4>
                </div>
                <p className="text-stone-500 text-lg leading-relaxed mb-8">{task.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-4">Operational Protocol</h5>
                    <ul className="space-y-3">
                      {task.safety.map((tip, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-stone-600">
                          <div className={cn(
                            "w-1.5 h-1.5 rounded-full mt-1.5 shrink-0",
                            activeTab === 'professional-only' ? "bg-red-400" : 
                            activeTab === 'risky-diy' ? "bg-amber-400" : "bg-emerald-400"
                          )} />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {task.tools.length > 0 && (
                    <div>
                      <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-4">Required Hardware</h5>
                      <div className="flex flex-wrap gap-2">
                        {task.tools.map((tool, i) => (
                          <span key={i} className="px-3 py-1 bg-stone-50 border border-stone-100 rounded-md text-xs font-medium text-stone-500">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Column */}
              <div className="md:w-64 shrink-0 flex flex-col justify-between border-t md:border-t-0 md:border-l border-stone-100 pt-8 md:pt-0 md:pl-10">
                <div>
                  <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-2">Liability Threshold</h5>
                  <p className="text-sm font-bold text-forest leading-tight mb-6">
                    {task.whenToCall}
                  </p>
                </div>
                
                {activeTab !== 'safe-diy' && (
                  <button
                    onClick={() => router.push(`/contact?source=diy_guide&task=${task.name}`)}
                    className="w-full bg-forest text-white font-bold py-4 rounded-xl hover:bg-forest-deep transition-all flex items-center justify-center gap-2 shadow-md group-hover:bg-forest-deep"
                  >
                    Get Pro Quote <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Authority Card */}
      <div className="mt-16 relative overflow-hidden rounded-3xl bg-white shadow-2xl border border-stone-100">
        <TreeRingsBackground />
        <div className="relative z-10 p-10 md:p-16 text-center">
          <h3 className={`${dmSerif.className} text-4xl text-forest mb-6`}>Avoid the Risk of Uncertainty</h3>
          <p className="text-stone-500 max-w-xl mx-auto mb-10 text-lg">
            If you&apos;re debating between a ladder and an arborist, the decision is already made. We provide free advice to keep Omaha homeowners safe.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${CONTACT.phoneRaw}`}
              className="px-10 py-5 bg-gold text-forest font-bold rounded-full hover:bg-amber-400 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              Call for Advice: {CONTACT.phone}
            </a>
            <button
              onClick={() => router.push('/contact?source=diy_bottom')}
              className="px-10 py-5 border-2 border-forest text-forest font-bold rounded-full hover:bg-forest hover:text-white transition-all flex items-center justify-center gap-2"
            >
              Request Free Walkthrough <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
