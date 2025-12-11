import { CheckCircle2, Leaf } from 'lucide-react';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom'; // IMPORT useLocation
import { Head } from 'vite-react-ssg';
import FastQuote from '../components/FastQuote';
import { CONTACT } from '../constants';

// ... (Keep your servicesData object exactly as it is) ...
const servicesData = {
    "tree-removal": {
        title: "Hazardous Tree Removal",
        // ... rest of data
    },
    "tree-trimming": {
        title: "Structural Trimming",
        // ... rest of data
    },
    "storm-damage": {
        title: "Emergency Storm Response",
        // ... rest of data
    },
    "plant-health-care": {
        title: "Plant Health Care (PHC)",
        // ... rest of data
    }
};

export default function ServiceTemplate() {
    const { serviceId } = useParams();
    const location = useLocation(); // GET LOCATION
    const service = servicesData[serviceId];

    if (!service) {
        return <div className="p-12 text-center">Service not found</div>;
    }

    const canonicalUrl = `https://omahatreecare.com${location.pathname}`; // BUILD URL

    return (
        <div className="bg-slate-50 min-h-screen">
            <Head>
                <title>{service.title} in Omaha | {CONTACT.businessName}</title>
                <meta name="description" content={`Professional ${service.title.toLowerCase()} services in Omaha. Physics-based assessment and safe execution. Get a free estimate.`} />

                {/* ADD CANONICAL LINK */}
                <link rel="canonical" href={canonicalUrl} />
            </Head>

            {/* ... rest of your component (Hero, Content, etc.) ... */}
            {/* (Keep the rest of the file content exactly as you uploaded it) */}
             <div className="bg-slate-900 text-white pt-32 pb-16">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-4 py-1 rounded-full text-sm font-semibold mb-6 border border-emerald-500/30">
                            <Leaf size={14} /> Omaha Tree Services
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">{service.title}</h1>
                        <p className="text-xl text-slate-300 max-w-2xl">{service.description}</p>
                    </div>
                </div>
            </div>

            <section className="py-16 container mx-auto px-6">
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        {/* Service Content */}
                        <div className="prose prose-lg max-w-none text-slate-600">
                           <p className="text-xl leading-relaxed text-slate-700 font-medium">
                                {service.fullDescription}
                           </p>
                        </div>

                         {/* Benefits Grid */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {service.benefits.map((benefit, index) => (
                                <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                    <div className="bg-emerald-100 w-fit p-2 rounded-lg text-emerald-700 mb-4">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <h3 className="font-bold text-slate-900 text-lg mb-2">{benefit.title}</h3>
                                    <p className="text-slate-600">{benefit.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Process Section */}
                         <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8">Our Process</h2>
                            <div className="space-y-8">
                                {service.process.map((step, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-lg mb-2">{step.title}</h3>
                                            <p className="text-slate-600">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                           <FastQuote />
                            <div className="mt-8 bg-slate-200 rounded-xl p-6 text-center">
                                <h3 className="font-bold text-slate-900 mb-2">Have questions?</h3>
                                <p className="text-slate-600 mb-4 text-sm">Speak directly with an arborist, not a call center.</p>
                                <a href={`tel:${CONTACT.phoneRaw}`} className="text-emerald-700 font-bold hover:underline">
                                    {CONTACT.phone}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}