import { ArrowLeft, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react'; // Added MapPin
import React from 'react'
import { Link } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { CONTACT } from '../constants'

export default function Accessibility() {
  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <Head>
        <title>Accessibility Statement | {CONTACT.businessName}</title>
        <meta name="description" content={`Accessibility statement for ${CONTACT.businessName}. We are committed to ensuring digital accessibility for people with disabilities.`} />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <Link
          to="/"
          className="inline-flex items-center text-slate-500 hover:text-emerald-600 transition mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Return Home
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-10 h-10 text-emerald-600" />
            <h1 className="text-3xl font-bold text-slate-900">Accessibility Statement</h1>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="lead text-xl text-slate-600 mb-6">
              <strong>{CONTACT.businessName}</strong> is committed to ensuring digital accessibility for people with disabilities.
              We are continually improving the user experience for everyone and applying the relevant accessibility standards.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Conformance Status</h2>
            <p>
              The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility
              for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA.
              <strong>{CONTACT.businessName}</strong> is partially conformant with WCAG 2.1 level AA.
              Partially conformant means that some parts of the content may not fully conform to the accessibility standard,
              though we strive for full compliance.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Feedback</h2>
            <p>
              We welcome your feedback on the accessibility of our website. Please let us know if you encounter accessibility
              barriers on <strong>{CONTACT.siteUrl}</strong>:
            </p>

            <div className="bg-slate-50 rounded-xl p-6 mt-6 border border-slate-200">
              <ul className="space-y-4 list-none pl-0">
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold">Phone:</span>
                  <a href={`tel:${CONTACT.phoneRaw}`} className="text-emerald-700 hover:underline">{CONTACT.phone}</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold">E-mail:</span>
                  <a href={`mailto:${CONTACT.email}`} className="text-emerald-700 hover:underline">{CONTACT.email}</a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold">Postal Address:</span>
                  <span>{CONTACT.address}</span>
                </li>
              </ul>
            </div>

            <p className="mt-6 text-sm text-slate-500">
              We try to respond to feedback within 2 business days.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Technical Specifications</h2>
            <p>
              Accessibility of this website relies on the following technologies to work with the particular combination of
              web browser and any assistive technologies or plugins installed on your computer:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>HTML</li>
              <li>WAI-ARIA</li>
              <li>CSS</li>
              <li>JavaScript</li>
            </ul>
            <p>
              These technologies are relied upon for conformance with the accessibility standards used.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Limitations and Alternatives</h2>
            <p>
              Despite our best efforts to ensure accessibility of {CONTACT.businessName}, there may be some limitations.
              Below is a description of known limitations, and potential solutions. Please contact us if you observe an issue not listed below.
            </p>
            <p className="mt-2">
              <strong>Known limitations:</strong>
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>Third-party tools:</strong> Some interactive tools (like maps or external widgets) may not be fully accessible
                as they are controlled by third-party providers. We monitor these and report issues to the vendors.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}