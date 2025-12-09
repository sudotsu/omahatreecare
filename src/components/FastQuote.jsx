import emailjs from '@emailjs/browser';
import { AlertTriangle, Camera, CheckCircle, Loader2, MessageSquare, Scissors, Send, TreeDeciduous } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { CONTACT } from '../constants';

export default function FastQuote() {
  const form = useRef();
  const [step, setStep] = useState(1);
  const [issue, setIssue] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  // Detect Mobile for "Text Me" priority
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const handleIssueSelect = (selected) => {
    setIssue(selected);
    setStep(2);
  };

  const handleSMS = () => {
    // SMS Link with pre-filled body
    const body = `Hi Andrew, I have a tree issue: ${issue}. I'm sending a photo next.`;
    window.location.href = `sms:${CONTACT.phoneRaw}?body=${encodeURIComponent(body)}`;
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    // REAL EMAILJS LOGIC
    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then((result) => {
      setSuccess(true);
      setSending(false);
      // Reset after 3 seconds
      setTimeout(() => {
        setSuccess(false);
        setStep(1);
        setIssue('');
      }, 4000);
    }, (error) => {
      console.error('EmailJS Error:', error.text);
      alert("Error sending. Please just text or call: " + CONTACT.phone);
      setSending(false);
    });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border-2 border-emerald-500/50 max-w-md mx-auto transform transition-all hover:scale-[1.01]">

      {/* Header */}
      <div className="bg-slate-900 p-4 text-center">
        <h3 className="text-white font-bold text-lg flex items-center justify-center gap-2">
          <Camera className="text-emerald-400 w-5 h-5" />
          Fast-Track Estimate
        </h3>
        <p className="text-slate-400 text-xs mt-1">Skip the scheduling. Get an answer in minutes.</p>
      </div>

      <div className="p-6">

        {/* SUCCESS STATE */}
        {success ? (
           <div className="text-center py-8 animate-fade-in">
             <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
             <h4 className="text-xl font-bold text-slate-800 dark:text-white">Received!</h4>
             <p className="text-slate-500 mt-2">I'll look at the satellite view and text/call you shortly.</p>
           </div>
        ) : (
          <>
            {/* STEP 1: PICK ISSUE */}
            {step === 1 && (
              <div className="space-y-3">
                <p className="text-slate-700 dark:text-slate-200 font-medium mb-3 text-center">
                  What's the main issue?
                </p>

                <button
                  onClick={() => handleIssueSelect('Storm Damage / Hazard')}
                  className="w-full flex items-center gap-3 p-3 rounded-lg border-2 border-slate-100 hover:border-red-500 hover:bg-red-50 dark:border-slate-700 dark:hover:bg-red-900/20 transition-all group text-left"
                >
                  <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full text-red-600">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-bold text-slate-900 dark:text-white">Emergency / Hazard</span>
                    <span className="text-xs text-slate-500 group-hover:text-red-700">Leaning, split, or broken limb</span>
                  </div>
                </button>

                <button
                  onClick={() => handleIssueSelect('Trimming / Pruning')}
                  className="w-full flex items-center gap-3 p-3 rounded-lg border-2 border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 dark:border-slate-700 dark:hover:bg-emerald-900/20 transition-all group text-left"
                >
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-full text-emerald-600">
                    <Scissors className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-bold text-slate-900 dark:text-white">Trimming / Pruning</span>
                    <span className="text-xs text-slate-500 group-hover:text-emerald-700">Overhangs, deadwood, shaping</span>
                  </div>
                </button>

                <button
                  onClick={() => handleIssueSelect('Removal')}
                  className="w-full flex items-center gap-3 p-3 rounded-lg border-2 border-slate-100 hover:border-amber-500 hover:bg-amber-50 dark:border-slate-700 dark:hover:bg-amber-900/20 transition-all group text-left"
                >
                  <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full text-amber-600">
                    <TreeDeciduous className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-bold text-slate-900 dark:text-white">Full Removal</span>
                    <span className="text-xs text-slate-500 group-hover:text-amber-700">Tree needs to go completely</span>
                  </div>
                </button>
              </div>
            )}

            {/* STEP 2: ACTION */}
            {step === 2 && (
              <div className="animate-fade-in">
                <div className="text-center mb-6">
                  <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">
                    Regarding: {issue}
                  </span>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                    Show Me The Tree
                  </h4>
                  <p className="text-sm text-slate-500 mt-1">
                    Photos help me give you a quote instantly.
                  </p>
                </div>

                {isMobile ? (
                  <div className="space-y-3">
                    <button
                      onClick={handleSMS}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-emerald-900/20 animate-pulse-slow"
                    >
                      <MessageSquare className="w-6 h-6" />
                      Text Andrew a Photo
                    </button>
                    <p className="text-xs text-center text-slate-400">
                      Opens your messaging app. Attach photo after clicking.
                    </p>
                    <button
                      onClick={() => setStep(1)}
                      className="w-full py-2 text-sm text-slate-400 hover:text-slate-600"
                    >
                      Back
                    </button>
                  </div>
                ) : (
                  <form ref={form} onSubmit={handleEmailSubmit} className="space-y-4">

                    {/* HIDDEN INPUTS TO MAP TO YOUR TEMPLATE */}
                    <input type="hidden" name="user_name" value="FAST QUOTE REQUEST" />
                    <input type="hidden" name="user_address" value="Not Provided (Ask in reply)" />
                    <input type="hidden" name="message" value={`Issue: ${issue}. (User is on Desktop, asked to reply with photos).`} />

                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 text-center border border-slate-200 dark:border-slate-700">
                      <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                        Since you are on a computer, just leave your number.
                      </p>
                      <p className="text-xs text-slate-400">
                        I will text you to request the photos.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <label className="text-xs font-bold text-slate-500 uppercase">Your Phone Number</label>
                      <input
                        type="tel"
                        name="user_phone" // Matches template
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-emerald-500 outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white transition-colors"
                        placeholder="(402) ..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2"
                    >
                      {sending ? (
                        <><Loader2 className="animate-spin w-4 h-4" /> Sending...</>
                      ) : (
                        <><Send className="w-4 h-4" /> Request Quote</>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full py-1 text-xs text-slate-400 hover:text-slate-600"
                    >
                      Back
                    </button>
                  </form>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}