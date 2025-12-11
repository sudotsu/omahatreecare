import { Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import ContactForm from '../components/ContactForm';
import { CONTACT, SERVICE_AREAS } from '../constants';

export default function Contact() {
  const location = useLocation();
  const canonicalUrl = `https://omahatreecare.com${location.pathname}`;

  const displayAddress = `${CONTACT.addressLocality}, ${CONTACT.addressRegion} ${CONTACT.postalCode}`;

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      <Head>
        <title>Contact Midwest Roots | Omaha Tree Assessments</title>
        <meta name="description" content={`Request a structural tree assessment in Omaha, Dundee, and Millard. Call ${CONTACT.phone} or use our form.`} />
        <link rel="canonical" href={canonicalUrl} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "mainEntity": {
              "@type": "LocalBusiness",
              "name": CONTACT.businessName,
              "telephone": CONTACT.phoneRaw,
              "email": CONTACT.email,
              "areaServed": SERVICE_AREAS.map(area => area.name)
            }
          })}
        </script>
      </Head>

      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Let's Talk Physics & Pruning</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We don't have a call center. You are reaching Andrew and the local crew directly.
            If we don't answer, we are likely running a chainsaw. Leave a note here.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-slate-900 text-white p-10 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-green-400">Direct Line</h2>
              <div className="space-y-6">
                <a href={`tel:${CONTACT.phoneRaw}`} className="flex items-start gap-4 hover:text-green-300 transition group">
                  <Phone className="w-6 h-6 mt-1 flex-shrink-0 group-hover:scale-110 transition" />
                  <div>
                    <span className="block font-semibold text-lg">Call or Text</span>
                    <span className="block opacity-90">{CONTACT.phone}</span>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 mt-1 flex-shrink-0 text-green-400" />
                  <div>
                    <span className="block font-semibold text-lg">Service Area Base</span>
                    <span className="block opacity-80">{displayAddress}</span>
                  </div>
                </div>
                <a href={`mailto:${CONTACT.email}`} className="flex items-start gap-4 hover:text-green-300 transition group">
                  <Mail className="w-6 h-6 mt-1 flex-shrink-0 group-hover:scale-110 transition" />
                  <div>
                    <span className="block font-semibold text-lg">Email</span>
                    <span className="block opacity-90 break-all">{CONTACT.email}</span>
                  </div>
                </a>
              </div>
            </div>
            <div className="mt-12">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-700 pb-2">
                Currently Serving
              </h3>
              <ul className="grid grid-cols-2 gap-2 text-sm text-slate-300">
                {SERVICE_AREAS.map((area) => (
                  <li key={area.name}>• {area.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="p-0 md:p-6">
             <ContactForm urgency="medium" pageSource="contact_page" />
          </div>
        </div>
      </main>
    </div>
  );
}