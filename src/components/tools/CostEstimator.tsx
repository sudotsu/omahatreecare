"use client";

import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Copy,
  DollarSign,
  FileText,
  Info,
  Printer,
  Ruler,
  ShieldCheck,
  TreePine,
  Truck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { TreeRingsBackground } from "@/components/ui/TreeRingsBackground";
import {
  TREE_REMOVAL_HEIGHT_RANGES,
  TREE_REMOVAL_MARKET_SUMMARY,
  TREE_REMOVAL_PRICING_YEAR,
  formatTreeRemovalCurrency,
  formatTreeRemovalRange,
  getTreeRemovalPlanningAssessment,
  type TreeRemovalAccess,
  type TreeRemovalCondition,
  type TreeRemovalHeightSelection,
  type TreeRemovalPlanningDriver,
  type TreeRemovalTargets,
} from "@/data/tree-removal-pricing";
import { dmSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";

type CleanupChoice = "haul" | "keep" | "unsure";
type StumpChoice = "include" | "exclude" | "unsure";

interface PlannerAnswers {
  heightId: TreeRemovalHeightSelection | "";
  access: TreeRemovalAccess | "";
  targets: TreeRemovalTargets | "";
  condition: TreeRemovalCondition | "";
  cleanup: CleanupChoice | "";
  stump: StumpChoice | "";
}

interface Choice<T extends string> {
  value: T;
  label: string;
  description: string;
  disclosure?: {
    label: string;
    content: string;
  };
}

const INITIAL_ANSWERS: PlannerAnswers = {
  heightId: "",
  access: "",
  targets: "",
  condition: "",
  cleanup: "",
  stump: "",
};

const ACCESS_CHOICES: Choice<TreeRemovalAccess>[] = [
  {
    value: "open",
    label: "Open access",
    description: "The tree and street are connected by a wide, mostly level route.",
  },
  {
    value: "limited",
    label: "Some limits",
    description: "A gate, fence, slope, or longer carry may limit equipment.",
  },
  {
    value: "restricted",
    label: "Restricted backyard",
    description: "Narrow access, steps, retaining walls, or no equipment route.",
  },
];

const TARGET_CHOICES: Choice<TreeRemovalTargets>[] = [
  {
    value: "clear",
    label: "Mostly open drop zone",
    description: "Few structures, fences, or valuable plantings below the canopy.",
  },
  {
    value: "some",
    label: "A few nearby obstacles",
    description: "Some branches may need controlled lowering around property.",
  },
  {
    value: "dense",
    label: "Over structures or tight targets",
    description: "Roof, garage, fence, neighbor, or landscaping limits the work zone.",
  },
  {
    value: "utilities",
    label: "Near or touching utility lines",
    description: "Utility responsibility and safe clearance need to be confirmed first.",
  },
];

const CONDITION_CHOICES: Choice<TreeRemovalCondition>[] = [
  {
    value: "intact",
    label: "Standing and appears intact",
    description: "No major visible breakage, uprooting, or hanging sections reported.",
  },
  {
    value: "declining",
    label: "Dead, declining, or uncertain",
    description: "Decay or weak wood may change the safe removal method.",
  },
  {
    value: "urgent",
    label: "Emergency tree care or storm cleanup",
    description: "Choose this for storm-related cleanup or work that needs prompt, site-specific attention.",
    disclosure: {
      label: "Why no online price average?",
      content:
        "We can’t accurately give pricing averages for individual emergency or storm-cleanup projects. We’ll gladly review the situation in person and provide a free quote so you have a clear next step. The goal is accurate, site-specific guidance—not pressure to hire us.",
    },
  },
];

const CLEANUP_CHOICES: Choice<CleanupChoice>[] = [
  {
    value: "haul",
    label: "Haul branches and logs",
    description: "Plan for the crew to remove the above-ground tree material.",
  },
  {
    value: "keep",
    label: "Keep useful logs or chips",
    description: "Leaving suitable material onsite may reduce handling and hauling.",
  },
  {
    value: "unsure",
    label: "Not sure yet",
    description: "Ask for the estimate to list cleanup and hauling explicitly.",
  },
];

const STUMP_CHOICES: Choice<StumpChoice>[] = [
  {
    value: "include",
    label: "Include stump grinding",
    description: "Treat grinding depth, surface roots, and debris as separate scope items.",
  },
  {
    value: "exclude",
    label: "Removal only",
    description: "Leave the stump after the above-ground tree is removed.",
  },
  {
    value: "unsure",
    label: "Compare both options",
    description: "Request removal totals with and without stump work.",
  },
];

const DRIVER_STYLES: Record<TreeRemovalPlanningDriver["influence"], string> = {
  "supports-lower": "bg-emerald-50 text-emerald-800",
  "adds-work": "bg-amber-50 text-amber-900",
  "pushes-higher": "bg-orange-50 text-orange-900",
  "site-review": "bg-stone-200 text-stone-800",
};

const DRIVER_LABELS: Record<TreeRemovalPlanningDriver["influence"], string> = {
  "supports-lower": "Supports lower end",
  "adds-work": "May add work",
  "pushes-higher": "May push higher",
  "site-review": "Needs site review",
};

function getChoiceLabel<T extends string>(choices: Choice<T>[], value: T): string {
  return choices.find((choice) => choice.value === value)?.label ?? value;
}

function ChoiceGroup<T extends string>({
  legend,
  help,
  choices,
  value,
  onChange,
}: {
  legend: string;
  help: string;
  choices: Choice<T>[];
  value: T | "";
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
      <legend className="px-1 text-lg font-bold text-forest">{legend}</legend>
      <p className="mb-4 mt-1 text-sm leading-relaxed text-stone-500">{help}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {choices.map((choice) => {
          const isSelected = value === choice.value;
          return (
            <div
              key={choice.value}
              className={cn(
                "overflow-hidden rounded-xl border-2 transition-colors",
                isSelected
                  ? "border-gold bg-amber-50 text-forest"
                  : "border-stone-100 bg-white text-stone-600 hover:border-amber-300",
              )}
            >
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => onChange(choice.value)}
                className="flex min-h-24 w-full items-start gap-3 p-4 text-left"
              >
                <span
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                    isSelected ? "border-forest bg-forest text-white" : "border-stone-300",
                  )}
                  aria-hidden="true"
                >
                  {isSelected && <Check size={12} strokeWidth={3} />}
                </span>
                <span>
                  <span className="block font-bold text-forest">{choice.label}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-stone-500">
                    {choice.description}
                  </span>
                </span>
              </button>
              {choice.disclosure && (
                <details className="group border-t border-amber-200 bg-amber-50/70">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-bold text-amber-950 marker:content-none">
                    {choice.disclosure.label}
                    <ChevronDown
                      size={17}
                      className="shrink-0 transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="px-4 pb-4 text-sm leading-relaxed text-amber-950">
                    {choice.disclosure.content}
                  </p>
                </details>
              )}
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}

export function CostEstimator({ searchParams: _searchParams }: { searchParams?: Record<string, unknown> }) {
  void _searchParams;
  const router = useRouter();
  const [answers, setAnswers] = useState<PlannerAnswers>(INITIAL_ANSWERS);
  const [isComplete, setIsComplete] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);

  const completedCount = Object.values(answers).filter(Boolean).length;
  const canCalculate = completedCount === Object.keys(INITIAL_ANSWERS).length;

  useEffect(() => {
    if (isComplete) resultHeadingRef.current?.focus();
  }, [isComplete]);

  const updateAnswer = <K extends keyof PlannerAnswers>(key: K, value: PlannerAnswers[K]) => {
    setAnswers((current) => ({ ...current, [key]: value }));
  };

  const reset = () => {
    setAnswers(INITIAL_ANSWERS);
    setIsComplete(false);
    setCopyStatus("idle");
  };

  if (isComplete && canCalculate) {
    const assessment = getTreeRemovalPlanningAssessment({
      heightId: answers.heightId as TreeRemovalHeightSelection,
      access: answers.access as TreeRemovalAccess,
      targets: answers.targets as TreeRemovalTargets,
      condition: answers.condition as TreeRemovalCondition,
    });
    const requiresSiteSpecificPricing = assessment.position === "site-review";
    const usesBroadBenchmark = assessment.range === null;
    const range = assessment.range
      ? formatTreeRemovalRange(assessment.range)
      : `${formatTreeRemovalCurrency(TREE_REMOVAL_MARKET_SUMMARY.mostJobsMin)}–${formatTreeRemovalCurrency(TREE_REMOVAL_MARKET_SUMMARY.mostJobsMax)}`;
    const heightLabel = answers.heightId === "unsure"
      ? "Not sure — broad benchmark used"
      : TREE_REMOVAL_HEIGHT_RANGES.find(({ id }) => id === answers.heightId)?.toolLabel ?? "Not recorded";
    const answerRows = [
      ["Approximate height", heightLabel],
      ["Access", getChoiceLabel(ACCESS_CHOICES, answers.access as TreeRemovalAccess)],
      ["Drop zone", getChoiceLabel(TARGET_CHOICES, answers.targets as TreeRemovalTargets)],
      ["Reported condition", getChoiceLabel(CONDITION_CHOICES, answers.condition as TreeRemovalCondition)],
      ["Cleanup", getChoiceLabel(CLEANUP_CHOICES, answers.cleanup as CleanupChoice)],
      ["Stump", getChoiceLabel(STUMP_CHOICES, answers.stump as StumpChoice)],
    ] as const;
    const worksheetPricing = requiresSiteSpecificPricing
      ? "No responsible online average — site-specific guidance needed"
      : `${usesBroadBenchmark ? "Broad budgeting benchmark" : "Height-based planning range"}: ${range}`;
    const worksheetText = [
      "MIDWEST ROOTS TREE REMOVAL PLANNING WORKSHEET",
      "Planning aid for one tree — not a quote",
      "",
      worksheetPricing,
      `Result: ${assessment.positionLabel}`,
      "",
      "YOUR ANSWERS",
      ...answerRows.map(([label, value]) => `${label}: ${value}`),
      "",
      "WHAT SHAPED THE RESULT",
      ...assessment.drivers.map((driver) => `${driver.label} — ${driver.selection}: ${driver.explanation}`),
      "",
      "Do not add or multiply planner ranges for multiple trees. Shared crew, equipment, access, and hauling can change multi-tree pricing.",
      "A final price requires a site-specific written estimate.",
    ].join("\n");
    const contactQuery = new URLSearchParams({
      source: "cost_planner",
      height: answers.heightId,
      access: answers.access,
      condition: answers.condition,
      stump: answers.stump,
    });
    const copyWorksheet = async () => {
      try {
        await navigator.clipboard.writeText(worksheetText);
        setCopyStatus("copied");
      } catch {
        setCopyStatus("failed");
      }
    };

    return (
      <div
        data-tool-result="true"
        data-cost-planner-result="true"
        className="animate-fade-in relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        role="region"
        aria-live="polite"
      >
        <div data-cost-planner-decoration="true">
          <TreeRingsBackground />
        </div>
        <div className="hidden border-b-2 border-forest pb-4 print:block">
          <p className={`${dmSerif.className} text-3xl text-forest`}>Tree Removal Planning Worksheet</p>
          <p className="mt-1 text-sm text-stone-600">One tree · budgeting aid · not a quote</p>
        </div>
        <div data-cost-planner-layout="true" className="relative z-10 grid lg:grid-cols-[19rem_1fr]">
          <aside className="flex flex-col border-b-2 border-stone-100 bg-stone-50 p-7 lg:min-h-[690px] lg:border-b-0 lg:border-r-2 lg:p-8">
            {requiresSiteSpecificPricing ? (
              <>
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">
                  Site-specific pricing only
                </span>
                <p className={`${dmSerif.className} mt-2 text-4xl leading-none text-forest`}>
                  No responsible online average
                </p>
                <p className="mt-3 text-sm font-bold uppercase tracking-wider text-amber-700">
                  In-person guidance available
                </p>
              </>
            ) : usesBroadBenchmark ? (
              <>
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">
                  Broad budgeting benchmark
                </span>
                <p className={`${dmSerif.className} mt-2 text-4xl leading-none text-forest`}>{range}</p>
                <p className="mt-3 text-sm font-bold uppercase tracking-wider text-amber-700">
                  Height not confirmed · not a quote
                </p>
              </>
            ) : (
              <>
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">
                  {TREE_REMOVAL_PRICING_YEAR} height-based range
                </span>
                <p className={`${dmSerif.className} mt-2 text-4xl leading-none text-forest`}>{range}</p>
                <p className="mt-3 text-sm font-bold uppercase tracking-wider text-amber-700">Not a quote</p>
              </>
            )}

            <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-amber-900">How to read this</p>
              <p className="mt-2 text-sm leading-relaxed text-amber-950">
                {requiresSiteSpecificPricing
                  ? "Emergency, storm-cleanup, and utility-sensitive projects need an in-person look before pricing guidance can be accurate."
                  : usesBroadBenchmark
                    ? "Because the height is uncertain, this uses the broader published benchmark for most Midwest Roots removals instead of pretending one height band applies."
                  : "This is the article’s base removal range for a tree around this height. The planner does not add invented dollar amounts for access, condition, cleanup, or stump work."}
              </p>
            </div>

            <div className="mt-6 text-sm leading-relaxed text-stone-600 lg:mt-auto">
              {requiresSiteSpecificPricing ? (
                <p>
                  We&apos;ll gladly review the situation in person so you have a clear, site-specific next step. If a visit is appropriate, the quote is free and there is no obligation to hire us.
                </p>
              ) : (
                <p>
                  Across Midwest Roots jobs, the published planning benchmark is about{" "}
                  <strong>{formatTreeRemovalCurrency(TREE_REMOVAL_MARKET_SUMMARY.typical)}</strong>, with most jobs between{" "}
                  <strong>
                    {formatTreeRemovalCurrency(TREE_REMOVAL_MARKET_SUMMARY.mostJobsMin)} and{" "}
                    {formatTreeRemovalCurrency(TREE_REMOVAL_MARKET_SUMMARY.mostJobsMax)}
                  </strong>.
                </p>
              )}
              <button
                type="button"
                data-cost-planner-controls="true"
                onClick={reset}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-stone-200 py-3 text-xs font-bold text-stone-600 transition-colors hover:bg-white"
              >
                <ArrowLeft size={14} /> Change answers
              </button>
            </div>
          </aside>

          <section className="p-7 sm:p-10 lg:p-12" aria-labelledby="cost-result-heading">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Your planning result</p>
                <h2
                  id="cost-result-heading"
                  ref={resultHeadingRef}
                  tabIndex={-1}
                  className={`${dmSerif.className} mt-2 text-3xl text-forest outline-none sm:text-4xl`}
                >
                  {assessment.positionLabel}
                </h2>
              </div>
              <div className="rounded-full bg-forest p-3 text-gold shadow-lg" aria-hidden="true">
                <FileText size={24} />
              </div>
            </div>

            <p className="mt-5 text-lg leading-relaxed text-stone-600">{assessment.explanation}</p>

            {assessment.requiresUtilityReview && (
              <div className="mt-6 rounded-xl border-l-4 border-red-600 bg-red-50 p-5 text-red-950">
                <div className="flex gap-3">
                  <AlertTriangle className="mt-0.5 shrink-0 text-red-700" size={20} />
                  <div>
                    <p className="font-bold">Keep clear and arrange the right review first.</p>
                    <p className="mt-1 text-sm leading-relaxed">
                      If any part of the tree is touching a wire, keep people away and contact the utility. OPPD responsibility depends on the line and situation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {assessment.hasUrgentWarningSigns && !assessment.requiresUtilityReview && (
              <div className="mt-6 rounded-xl border-l-4 border-gold bg-amber-50 p-5 text-amber-950">
                <div className="flex gap-3">
                  <Info className="mt-0.5 shrink-0 text-amber-700" size={20} />
                  <div>
                    <p className="font-bold">Why the online pricing stops here</p>
                    <p className="mt-1 text-sm leading-relaxed">
                      We can&apos;t accurately average an individual emergency or storm-cleanup project online. An in-person review lets us advise accurately on price and next steps.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <section className="mt-8" aria-labelledby="result-drivers-heading">
              <h3 id="result-drivers-heading" className="text-lg font-bold text-forest">
                What shaped this result
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-stone-500">
                These are directional planning signals, not dollar add-ons.
              </p>
              <div className="mt-4 grid gap-3">
                {assessment.drivers.map((driver) => (
                  <div key={driver.label} className="rounded-xl border border-stone-200 bg-white p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wide text-stone-400">
                          {driver.label}
                        </span>
                        <p className="font-bold text-forest">{driver.selection}</p>
                      </div>
                      <span className={cn("rounded-full px-3 py-1 text-xs font-bold", DRIVER_STYLES[driver.influence])}>
                        {DRIVER_LABELS[driver.influence]}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600">{driver.explanation}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-8" aria-labelledby="scope-summary-heading">
              <h3 id="scope-summary-heading" className="text-lg font-bold text-forest">
                Scope to put in the written estimate
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                  <div className="flex items-center gap-2 font-bold text-forest">
                    <Truck size={17} className="text-gold" /> Cleanup and hauling
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">
                    {answers.cleanup === "haul" && "Confirm that all branches and logs, final raking, and hauling are included."}
                    {answers.cleanup === "keep" && "Identify which logs or chips will stay onsite and exactly where the crew should leave them."}
                    {answers.cleanup === "unsure" && "Ask for cleanup, log hauling, and chip handling to be itemized so totals are comparable."}
                  </p>
                </div>
                <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                  <div className="flex items-center gap-2 font-bold text-forest">
                    <TreePine size={17} className="text-gold" /> Stump work
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">
                    {answers.stump === "include" && "Request stump grinding as a separate scope item, including depth, surface roots, grindings, and backfill."}
                    {answers.stump === "exclude" && "The planning scope leaves the stump in place after above-ground removal."}
                    {answers.stump === "unsure" && "Ask for written totals both with and without stump grinding before deciding."}
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-8 rounded-xl border-2 border-stone-200 bg-stone-50 p-5" aria-labelledby="planning-worksheet-heading">
              <h3 id="planning-worksheet-heading" className="text-lg font-bold text-forest">
                Your one-tree planning worksheet
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-stone-600">
                Keep this for your own budgeting or use it to compare written estimates. No contact information is required.
              </p>
              <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {answerRows.map(([label, value]) => (
                  <div key={label} className="border-b border-stone-200 pb-2">
                    <dt className="text-xs font-bold uppercase tracking-wide text-stone-400">{label}</dt>
                    <dd className="mt-1 text-sm font-semibold text-forest">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
                <strong>One tree at a time:</strong> do not add or multiply planner ranges for multiple trees. Shared crew, equipment, access, and hauling can change multi-tree pricing.
              </div>
              <div data-cost-planner-controls="true" className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={copyWorksheet}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-forest px-5 py-3 text-sm font-bold text-forest transition-colors hover:bg-white"
                >
                  {copyStatus === "copied" ? <Check size={17} /> : <Copy size={17} />}
                  {copyStatus === "copied" ? "Copied" : "Copy worksheet"}
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-forest px-5 py-3 text-sm font-bold text-forest transition-colors hover:bg-white"
                >
                  <Printer size={17} /> Print or save as PDF
                </button>
              </div>
              <p data-cost-planner-controls="true" className="mt-3 text-xs text-stone-500" role="status" aria-live="polite">
                {copyStatus === "failed" && "Copy is unavailable in this browser. Use the print option instead."}
                {copyStatus === "copied" && "Worksheet copied to your clipboard."}
              </p>
            </section>

            <div className="mt-8 rounded-xl border-l-4 border-gold bg-stone-50 p-5">
              <div className="flex gap-3">
                <Info className="mt-0.5 shrink-0 text-amber-700" size={20} />
                <p className="text-sm leading-relaxed text-stone-700">
                  {requiresSiteSpecificPricing
                    ? "The planner intentionally stops short of a dollar range here because the site conditions needed for accurate pricing have not been reviewed in person."
                    : "An on-site estimate can fall outside the published range because trunk diameter, canopy volume, decay, equipment needs, emergency timing, permits, utility coordination, and hidden site conditions are not confirmed here."}
                </p>
              </div>
            </div>

            <div data-cost-planner-controls="true" className="mt-9 text-center">
              <button
                type="button"
                data-lead-cta="true"
                onClick={() => router.push(`/contact?${contactQuery.toString()}`)}
                className="group inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-base font-bold text-forest shadow-lg transition-all hover:bg-amber-400 sm:px-10 sm:text-lg"
              >
                {requiresSiteSpecificPricing ? "Get site-specific guidance" : "Request an on-site estimate"}
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </button>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400">
                {requiresSiteSpecificPricing
                  ? "Clear next steps · no obligation to hire us"
                  : "Final price and scope are confirmed on site"}
              </p>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl bg-stone-50 shadow-2xl">
      <header className="border-b border-stone-200 bg-white p-7 sm:p-10">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-forest/5 p-2 text-forest" aria-hidden="true">
            <DollarSign size={22} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Tree removal · planning only</p>
            <h2 className={`${dmSerif.className} text-3xl text-forest sm:text-4xl`}>
              Build a useful cost range
            </h2>
          </div>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone-600">
          Start with the same {TREE_REMOVAL_PRICING_YEAR} height-based ranges published in our Omaha cost guide, then identify the property and scope factors most likely to move your project within—or beyond—that range.
        </p>
        <div className="mt-5 flex flex-wrap gap-4 text-xs font-bold uppercase tracking-wider text-stone-500">
          <span className="flex items-center gap-2"><Ruler size={14} /> 6 practical inputs</span>
          <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-600" /> No account required</span>
          <span className="flex items-center gap-2"><Info size={14} /> Not a quote</span>
        </div>
        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
          <strong>Plan one tree at a time.</strong> Don&apos;t add several planner ranges together—shared crew, equipment, access, and hauling can change multi-tree pricing.
        </div>
      </header>

      <div className="space-y-5 p-5 sm:p-8">
        <fieldset className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
          <legend className="px-1 text-lg font-bold text-forest">1. Approximate tree height</legend>
          <p className="mb-4 mt-1 text-sm leading-relaxed text-stone-500">
            Choose the closest height. If you cannot estimate it confidently from a safe viewing spot, choose “I&apos;m not sure.”
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {TREE_REMOVAL_HEIGHT_RANGES.map((range) => {
              const isSelected = answers.heightId === range.id;
              return (
                <button
                  key={range.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => updateAnswer("heightId", range.id)}
                  className={cn(
                    "rounded-xl border-2 px-3 py-4 text-left transition-colors",
                    isSelected
                      ? "border-gold bg-amber-50"
                      : "border-stone-100 bg-white hover:border-amber-300",
                  )}
                >
                  <span className="block font-bold text-forest">{range.toolLabel}</span>
                  <span className="mt-1 block text-xs font-semibold text-stone-500">
                    {formatTreeRemovalRange(range)}
                  </span>
                </button>
              );
            })}
            <button
              type="button"
              aria-pressed={answers.heightId === "unsure"}
              onClick={() => updateAnswer("heightId", "unsure")}
              className={cn(
                "rounded-xl border-2 px-3 py-4 text-left transition-colors",
                answers.heightId === "unsure"
                  ? "border-gold bg-amber-50"
                  : "border-stone-100 bg-white hover:border-amber-300",
              )}
            >
              <span className="block font-bold text-forest">I&apos;m not sure</span>
              <span className="mt-1 block text-xs font-semibold text-stone-500">Use broad benchmark</span>
            </button>
          </div>
          <details className="group mt-4 rounded-xl border border-stone-200 bg-stone-50">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-bold text-forest marker:content-none">
              Help me choose a height band
              <ChevronDown
                size={17}
                className="shrink-0 transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <p className="px-4 pb-4 text-sm leading-relaxed text-stone-600">
              From a safe spot where you can see the whole tree, compare it with a nearby building or another object whose height you roughly know. If the top or base is hidden, or you are between choices, use “I&apos;m not sure” rather than forcing an answer. Do not climb or approach damaged material to measure it.
            </p>
          </details>
        </fieldset>

        <ChoiceGroup
          legend="2. Equipment and backyard access"
          help="Think about the narrowest point between the street and the trunk, plus slope and carrying distance."
          choices={ACCESS_CHOICES}
          value={answers.access}
          onChange={(value) => updateAnswer("access", value)}
        />
        <ChoiceGroup
          legend="3. Drop zone and nearby targets"
          help="More obstacles usually mean smaller pieces, more rigging, and more controlled movement."
          choices={TARGET_CHOICES}
          value={answers.targets}
          onChange={(value) => updateAnswer("targets", value)}
        />
        <ChoiceGroup
          legend="4. Reported condition"
          help="This is not a diagnosis. Choose only from what you can safely see from the ground."
          choices={CONDITION_CHOICES}
          value={answers.condition}
          onChange={(value) => updateAnswer("condition", value)}
        />
        <ChoiceGroup
          legend="5. Cleanup preference"
          help="Quotes are easier to compare when they say exactly what happens to branches, logs, chips, and final cleanup."
          choices={CLEANUP_CHOICES}
          value={answers.cleanup}
          onChange={(value) => updateAnswer("cleanup", value)}
        />
        <ChoiceGroup
          legend="6. Stump preference"
          help="The published removal ranges do not include a separate stump-grinding price, so the planner records scope without inventing an add-on."
          choices={STUMP_CHOICES}
          value={answers.stump}
          onChange={(value) => updateAnswer("stump", value)}
        />
      </div>

      <footer className="sticky bottom-0 border-t border-stone-200 bg-white/95 p-5 backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm font-semibold text-stone-500" aria-live="polite">
            {completedCount} of 6 inputs complete
          </p>
          <button
            type="button"
            disabled={!canCalculate}
            onClick={() => setIsComplete(true)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 font-bold text-forest shadow-md transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-500 disabled:shadow-none sm:w-auto"
          >
            See my planning range <ArrowRight size={18} />
          </button>
        </div>
      </footer>
    </div>
  );
}
