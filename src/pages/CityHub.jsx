import { AlertTriangle, CheckCircle2, MapPin, Phone, Shield } from 'lucide-react';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import FastQuote from '../components/FastQuote';
import LocalOrdinances from '../components/LocalOrdinances';
import ServiceAreaMap from '../components/ServiceAreaMap';
import { CONTACT } from '../constants';

export default function CityHub() {
  const { city } = useParams();
  const location = useLocation();

  const cityName = city ? city.charAt(0).toUpperCase() + city.slice(1) : "Omaha";

  const pageTitle = `Tree Service in ${cityName}, NE | ${CONTACT.businessName}`;
  const metaDesc = `Expert tree removal, trimming, and risk assessment in ${cityName}. We follow ${cityName} municipal codes for physics-based, safe tree care.`;
  const canonicalUrl = `https://omahatreecare.com${location.pathname}`;

  const neighborhoodData = {
    omaha: { areas: ["Dundee", "Benson", "Florence", "Millard", "Westside", "Aksarben", "Midtown", "North Omaha"] },
    millard: { areas: ["Oak Hills", "Walnut Grove", "Stony Brook", "Harvey Oaks"] },
    elkhorn: { areas: ["The Ridges", "Skyline Ranches", "Indian Creek", "Fire Ridge"] },
    gretna: { areas: ["Tiburon", "Sarpy Heights", "Aspen Creek"] },
    papillion: { areas: ["Shadow Lake", "Eagle Hills"] },
    bellevue: { areas: ["Fontenelle Hills"] },
    bennington: { areas: ["New Newport", "Ridgemont"] },
    ralston: { areas: ["Mockingbird Hills"] }
  };

  const currentNeighborhoods = neighborhoodData[city?.toLowerCase()]?.areas || [];

  return (
    <div className="bg-slate-50 min-h-screen">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
      </Head>

      <section className="relative bg-slate-900 text-white pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-900/90"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-4 py-1 rounded-full text-sm font-semibold mb-6 border border-emerald-500/30">
              <MapPin size={14} /> Serving {cityName} & Surrounding Areas
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Physics-Based Tree Care in <span className="text-emerald-400">{cityName}, NE</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              We don't just "cut trees." We provide structural risk assessments and hazardous removals specifically for {cityName}'s mature canopy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href={`tel:${CONTACT.phoneRaw}`} className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2 shadow-lg shadow-emerald-900/20">
                <Phone size={20} /> Call {CONTACT.phone}
              </a>
              <span className="text-slate-400 text-sm">or</span>
              <a href="#assessment" className="text-white hover:text-emerald-300 font-semibold underline underline-offset-4 decoration-emerald-500/50 hover:decoration-emerald-500 transition-all">
                Get a Fast Quote Online
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <Shield className="text-emerald-600" />
                Why {cityName} Homeowners Choose Us
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 bg-emerald-100 p-2 rounded-lg h-fit text-emerald-700"><CheckCircle2 size={20} /></div>
                  <div>
                    <h3 className="font-bold text-slate-900">No Sales Pressure</h3>
                    <p className="text-slate-600 leading-relaxed">We are arborists, not door-to-door salesmen. We assess your trees based on biology and physics, not quotas.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 bg-emerald-100 p-2 rounded-lg h-fit text-emerald-700"><CheckCircle2 size={20} /></div>
                  <div>
                    <h3 className="font-bold text-slate-900">Zero-Impact Rigging</h3>
                    <p className="text-slate-600 leading-relaxed">We use modern rigging techniques to dismantle hazardous trees over roofs and fences without touching your property.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 bg-emerald-100 p-2 rounded-lg h-fit text-emerald-700"><CheckCircle2 size={20} /></div>
                  <div>
                    <h3 className="font-bold text-slate-900">100% Cleanup Guarantee</h3>
                    <p className="text-slate-600 leading-relaxed">We leave your yard cleaner than we found it. No sawdust piles, no ruts, no debris left behind.</p>
                  </div>
                </div>
              </div>
            </div>

            {currentNeighborhoods.length > 0 && (
              <div className="bg-slate-100 rounded-2xl p-8 border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <MapPin size={18} className="text-slate-500" />
                  Active Crews in {cityName} Neighborhoods:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentNeighborhoods.map((hood) => (
                    <span key={hood} className="bg-white px-3 py-1 rounded-full text-sm text-slate-600 border border-slate-200 shadow-sm">
                      {hood}
                    </span>
                  ))}
                  <span className="bg-emerald-100 px-3 py-1 rounded-full text-sm text-emerald-700 border border-emerald-200 font-medium">
                    + All Surrounding Areas
                  </span>
                </div>
              </div>
            )}

            <div id="ordinances">
              <LocalOrdinances cityName={cityName} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div id="assessment">
                <FastQuote />
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <MapPin className="text-emerald-600" size={20} />
                  Service Area Map
                </h3>
                <div className="h-48 rounded-xl overflow-hidden mb-4 border border-slate-100">
                  <ServiceAreaMap />
                </div>
                <p className="text-xs text-slate-500 text-center">
                  Dispatching from our HQ near 56th & Corby
                </p>
              </div>
              <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                <h4 className="font-bold text-amber-800 flex items-center gap-2 mb-2">
                  <AlertTriangle size={18} /> Storm Damage?
                </h4>
                <p className="text-sm text-amber-900/80 mb-4">
                  We prioritize hazardous trees leaning on structures in {cityName}.
                </p>
                <a href={`tel:${CONTACT.phoneRaw}`} className="block w-full text-center bg-white border-2 border-amber-200 text-amber-800 font-bold py-2 rounded-lg hover:bg-amber-100 transition-colors">
                  Call for Emergency Assessment
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}