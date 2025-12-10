import { CheckCircle, ExternalLink, Eye, Keyboard, ShieldCheck } from 'lucide-react';
import React from 'react';
import { Head } from 'vite-react-ssg';
import { CONTACT } from '../constants';

export default function Accessibility() {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      <Head>
        <title>Accessibility Statement | {CONTACT.businessName}</title>
        <meta name="robots" content="noindex, follow" />
      </Head>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Accessibility Statement</h1>
        <p className="text-slate-600 mb-8">omahatreecare.com</p>

        {/* --- TRUST BADGE (LINKS TO VERIFICATION) --- */}
        <a
          // PASTE YOUR EXACT REPORT URL HERE:
          href="https://seojuice.io/accessibility-compliance/303f6beb-ea60-4a57-913c-409669387e39"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-4 bg-slate-900 text-white p-4 rounded-xl mb-8 hover:bg-slate-800 transition-colors shadow-md group w-full sm:w-auto"
        >
          <div className="bg-emerald-500/20 p-3 rounded-full">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
          </div>
          <div className="text-left">
            <p className="font-bold text-base">Independently Audited & Verified</p>
            <p className="text-sm text-slate-400 group-hover:text-emerald-300 transition-colors flex items-center gap-2 mt-1">
              View Official Compliance Certificate <ExternalLink className="w-3 h-3" />
            </p>
          </div>
        </a>
        {/* ------------------------------------------- */}

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-8">
          <p className="mb-4">
            This accessibility statement applies to the service <strong>omahatreecare.com</strong> and has been prepared on December 10, 2025.
          </p>
          <p>
            The service is subject to the Act on the Provision of Digital Services, which requires that public web services be accessible. We strive to ensure compliance with this legislation to make our digital presence available to all users.
          </p>
        </div>

        {/* Compliance Status */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Compliance Status</h2>
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-emerald-900">WCAG 2.1 Level AA Compliant</p>
                <p className="text-emerald-800 mt-1 text-sm leading-relaxed">
                  The service fully complies with accessibility requirements according to the Web Content Accessibility Guidelines (WCAG) 2.1 Level A and AA. All critical and non-critical issues have been addressed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Accessibility Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <Eye className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-slate-800 mb-2">Screen Readers</h3>
              <p className="text-sm text-slate-600">Optimized with ARIA attributes and semantic HTML structure.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <Keyboard className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-slate-800 mb-2">Navigation</h3>
              <p className="text-sm text-slate-600">Full keyboard navigation support for menus and tools.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <ShieldCheck className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-slate-800 mb-2">UI Adjustments</h3>
              <p className="text-sm text-slate-600">High contrast text and scalable font sizing.</p>
            </div>
          </div>
        </section>

        {/* Exclusions */}
        <section className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Inaccessible Content</h3>
            <p className="text-slate-600">No accessibility violations have been identified under the WCAG 2.1 guidelines for this service.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Content Not Covered</h3>
            <p className="text-slate-600 mb-2">The Act on the provision of digital services does not apply to:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Online Maps and mapping services</li>
              <li>Content published by third parties (e.g., social media embeds)</li>
              <li>Attachment files published before September 23, 2018</li>
            </ul>
          </div>
        </section>

        {/* Feedback */}
        <div className="mt-12 pt-8 border-t border-slate-200 text-center">
          <p className="text-slate-600">
            Did you find an accessibility issue? Please tell us.<br />
            <a href={`mailto:${CONTACT.email}`} className="text-emerald-600 font-bold hover:underline">
              {CONTACT.email}
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}