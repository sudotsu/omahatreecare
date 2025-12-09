import emailjs from '@emailjs/browser';
import { AlertTriangle, Camera, Loader2, MessageSquare, Scissors, Send, TreeDeciduous } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { CONTACT } from '../constants';

export default function FastQuote() {
  const [step, setStep] = useState(1);
  const [issue, setIssue] = useState('');
  const [phone, setPhone] = useState('');
  const [sending, setSending] = useState(false);

  // HYDRATION SAFE MOBILE DETECTION
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // USE ENV VARS
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleIssueSelect = (selected) => {
    setIssue(selected);
    setStep(2);
  };

  const handleSMS = () => {
    const body = `Hi Andrew, I have a tree issue: ${issue}. I'm sending a photo next.`;
    window.location.href = `sms:${CONTACT.phoneRaw}?body=${encodeURIComponent(body)}`;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    const templateParams = {
        from_name: "Fast Quote User",
        phone: phone,
        message: `FAST QUOTE REQUEST: User selected issue "${issue}". Please text them back at ${phone} to request photos.`,
        urgency: 'high',
        page_source: 'hero_fast_quote'
    };

    try {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        alert("Got it! I'll text you shortly to ask for that photo.");

        // Reset after 4 seconds to match code behavior
        setTimeout(() => {
            setStep(1);
            setPhone('');
        }, 4000);

    } catch (err) {
        console.error("EmailJS Error:", err);
        alert("Error sending. Please call me directly.");
    } finally {
        setSending(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border-2 border-emerald-500/50 max-w-md mx-auto transform transition-all hover:scale-[1.01]">
      <div className="bg-slate-900 p-4 text-center">
        <h3 className="text-white font-bold text-lg flex items-center justify-center gap-2">
          <Camera className="text-emerald-400 w-5 h-5" />
          Fast-Track Estimate
        </h3>
        <p className="text-slate-400 text-xs mt-1">Skip the scheduling. Get an answer in minutes.</p>
      </div>

      <div className="p-6">
        {step === 1 && (
          <div className="space-y-3">
            <p className="text-slate-700 dark:text-slate-200 font-medium mb-3 text-center">
              What's the main issue?
            </p>
            <button onClick={() => handleIssueSelect('Storm Damage / Hazard')} className="w-full flex items-center gap-3 p-3 rounded-lg border-2 border-slate-100 hover:border-red-500 hover:bg-red-50 dark:border-slate-700 dark:hover:bg-red-900/20 transition-all group text-left">
              <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full text-red-600"><AlertTriangle className="w-5 h-5" /></div>
              <div><span className="block font-bold text-slate-900 dark:text-white">Emergency / Hazard</span></div>
            </button>
            <button onClick={() => handleIssueSelect('Trimming / Pruning')} className="w-full flex items-center gap-3 p-3 rounded-lg border-2 border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 dark:border-slate-700 dark:hover:bg-emerald-900/20 transition-all group text-left">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-full text-emerald-600"><Scissors className="w-5 h-5" /></div>
              <div><span className="block font-bold text-slate-900 dark:text-white">Trimming / Pruning</span></div>
            </button>
            <button onClick={() => handleIssueSelect('Removal')} className="w-full flex items-center gap-3 p-3 rounded-lg border-2 border-slate-100 hover:border-amber-500 hover:bg-amber-50 dark:border-slate-700 dark:hover:bg-amber-900/20 transition-all group text-left">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full text-amber-600"><TreeDeciduous className="w-5 h-5" /></div>
              <div><span className="block font-bold text-slate-900 dark:text-white">Full Removal</span></div>
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <div className="text-center mb-6">
              <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">
                Regarding: {issue}
              </span>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">Where should I send the quote?</h4>
            </div>

            {isMobile ? (
              <div className="space-y-3">
                <button onClick={handleSMS} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-emerald-900/20 animate-pulse-slow">
                  <MessageSquare className="w-6 h-6" /> Text Andrew a Photo
                </button>
                <p className="text-xs text-center text-slate-400">Opens messaging app. Attach photo after clicking.</p>
                <button onClick={() => setStep(1)} className="w-full py-2 text-sm text-slate-400 hover:text-slate-600">Back</button>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <input
                  type="tel"
                  placeholder="Your Phone Number"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white transition-all"
                />
                <button type="submit" disabled={sending} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2">
                  {sending ? <><Loader2 className="animate-spin w-4 h-4" /> Sending...</> : <><Send className="w-4 h-4" /> Get My Quote</>}
                </button>
                <button type="button" onClick={() => setStep(1)} className="w-full py-1 text-xs text-slate-400 hover:text-slate-600">Back</button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}