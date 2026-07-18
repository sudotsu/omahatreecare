'use client'

import { CheckCircle, X } from 'lucide-react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function EmailCaptureModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Your Answers Did Not Flag Major Warning Signs
              </h2>
              <p className="text-slate-600">
                This screening is limited to what you reported and does not establish that the tree is structurally sound.
              </p>
            </div>

            <a href="/contact?source=low_risk_screening" className="block w-full rounded-lg bg-emerald-600 px-6 py-3 text-center font-semibold text-white hover:bg-emerald-700">
              Ask About Ongoing Tree Care
            </a>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-sm font-semibold text-slate-700 mb-3">You&apos;ll receive:</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Spring pruning reminders (optimal timing for Omaha trees)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Winter storm prep checklist (before the ice hits)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>EAB updates and ash tree protection tips</span>
                </li>
              </ul>
            </div>
          </>
      </div>
    </div>
  )
}
