import { CheckCircle2, Leaf } from 'lucide-react';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import FastQuote from '../components/FastQuote';
import { CONTACT } from '../constants';

// FULL DATA STRUCTURE - No placeholders
const servicesData = {
    "tree-removal": {
        title: "Hazardous Tree Removal",
        description: "Specialized removal for large, dangerous, or hard-to-access trees.",
        fullDescription: "We specialize in 'surgical removal' for trees located in tight quarters. Using advanced rigging techniques and crane-assisted removal when necessary, we dismantle trees piece-by-piece to ensure zero impact on your home, fence, or landscaping.",
        benefits: [
            { title: "Zero Property Damage", desc: "We guarantee your yard will look cleaner than when we arrived." },
            { title: "Technical Rigging", desc: "We lower heavy wood safely using ropes and pulleys, never gravity." },
            { title: "Stump Management", desc: "We can grind the stump immediately after removal." },
            { title: "Liability Protection", desc: "Fully insured for high-risk operations near structures." }
        ],
        process: [
            { title: "Site Assessment", desc: "We identify targets (roofs, fences) and plan the rigging path." },
            { title: "Climb & Dismantle", desc: "Our climbers systematically remove limbs and trunk sections." },
            { title: "Debris Cleanup", desc: "All brush is chipped and wood is hauled away immediately." },
            { title: "Final Raking", desc: "We rake the yard to remove twigs and sawdust." }
        ]
    },
    "tree-trimming": {
        title: "Structural Trimming",
        description: "Corrective pruning to improve health, safety, and aesthetics.",
        fullDescription: "Proper pruning is about more than just clearance; it's about the long-term architecture of the tree. We follow ANSI A300 standards to remove deadwood, correct crossing limbs, and reduce wind resistance without harmful 'topping'.",
        benefits: [
            { title: "Storm Safety", desc: "Reduces the 'sail effect' so wind passes through the canopy." },
            { title: "Tree Health", desc: "Removing deadwood prevents decay and insect infestation." },
            { title: "Aesthetics", desc: "Raises the canopy to improve views and sunlight." },
            { title: "Structure Correction", desc: "Fixes co-dominant stems that are prone to splitting." }
        ],
        process: [
            { title: "Health Check", desc: "We verify the tree can handle the pruning stress." },
            { title: "Crown Cleaning", desc: "Removing dead, dying, and diseased branches." },
            { title: "Structural Cuts", desc: "Reducing end-weight on over-extended limbs." },
            { title: "Cleanup", desc: "Brush is chipped and recycled." }
        ]
    },
    "stump-grinding": {
        title: "Stump Grinding",
        description: "Complete removal of unsightly stumps below grade.",
        fullDescription: "Don't let an old stump ruin your lawn or attract termites. We grind stumps 6-8 inches below grade, allowing you to replant grass or a new tree in the exact same spot.",
        benefits: [
            { title: "Reclaim Your Lawn", desc: "Mow right over the spot where the tree used to be." },
            { title: "Prevent Pests", desc: "Decaying stumps attract termites, ants, and beetles." },
            { title: "Safety", desc: "Eliminates tripping hazards for kids and guests." },
            { title: "Complete Cleanup", desc: "We can haul away the mulch or leave it for your garden." }
        ],
        process: [
            { title: "Utility Check", desc: "We ensure no lines run directly under the stump." },
            { title: "Grinding", desc: "Our machine turns the wood into mulch." },
            { title: "Backfilling", desc: "We fill the hole with the resulting mulch/soil mix." },
            { title: "Cleanup", desc: "Excess debris is swept from driveways and walks." }
        ]
    },
    "emergency-tree-service": {
        title: "Emergency Storm Response",
        description: "24/7 rapid response for storm-damaged and hazardous trees.",
        fullDescription: "When a tree falls on your house or blocks your driveway, you can't wait. We prioritize emergency calls to remove immediate hazards, tarp damaged roofs, and restore safety to your property.",
        benefits: [
            { title: "24/7 Availability", desc: "We answer the phone when storms hit." },
            { title: "Crane Service", desc: "We can lift trees off roofs without further damage." },
            { title: "Insurance Help", desc: "We provide documentation and photos for your claim." },
            { title: "Safety First", desc: "We stabilize the situation before cutting." }
        ],
        process: [
            { title: "Triage", desc: "We assess the immediate danger to people and structures." },
            { title: "Stabilization", desc: "Securing the tree so it doesn't shift during cutting." },
            { title: "Removal", desc: "Careful extraction of the tree from the structure." },
            { title: "Debris Haul", desc: "We clear the access points and driveway." }
        ]
    },
    "commercial-tree-services": {
        title: "Commercial Tree Care",
        description: "Reliable tree management for HOAs, apartments, and businesses.",
        fullDescription: "We partner with property managers to maintain safety and curb appeal. From annual trimming budgets to emergency storm response, we act as your dedicated tree care department.",
        benefits: [
            { title: "Budget Planning", desc: "Multi-year plans to manage tree costs." },
            { title: "Risk Mitigation", desc: "Proactive removal of hazards near parking and walks." },
            { title: "Uniform Appeal", desc: "Consistent pruning standards across the property." },
            { title: "Tenant Safety", desc: "Maintaining clearance for lights and signage." }
        ],
        process: [
            { title: "Inventory", desc: "Mapping the trees and identifying needs." },
            { title: "Proposal", desc: "Clear, itemized pricing for approval." },
            { title: "Scheduling", desc: "Minimizing disruption to tenants and traffic." },
            { title: "Execution", desc: "Professional crews with proper PPE and safety gear." }
        ]
    },
    "plant-health-care": {
        title: "Plant Health Care (PHC)",
        description: "Diagnosis and treatment for sick or struggling trees.",
        fullDescription: "Saving a tree is often cheaper than removing it. Our PHC program diagnoses fungal issues, insect infestations (like EAB), and soil deficiencies to restore your trees to vigor.",
        benefits: [
            { title: "EAB Treatment", desc: "Protecting Ash trees from Emerald Ash Borer." },
            { title: "Soil Injection", desc: "Delivering nutrients directly to the root zone." },
            { title: "Disease Control", desc: "Managing blights, rusts, and fungal spots." },
            { title: "Growth Regulation", desc: "Slowing growth to reduce pruning needs." }
        ],
        process: [
            { title: "Diagnosis", desc: " identifying the root cause of the stress." },
            { title: "Prescription", desc: "Developing a treatment plan tailored to the species." },
            { title: "Application", desc: "Injecting or spraying the precise treatment." },
            { title: "Monitoring", desc: "Follow-up visits to track recovery." }
        ]
    }
};

export default function ServiceTemplate() {
    const { serviceId } = useParams();
    const location = useLocation();

    // Fallback if the slug doesn't match exactly, prevents crash
    const service = servicesData[serviceId] || {
        title: "Service Not Found",
        description: "Please check the URL or return to home.",
        fullDescription: "",
        benefits: [],
        process: []
    };

    const canonicalUrl = `https://omahatreecare.com${location.pathname}`;

    if (!servicesData[serviceId]) {
        // If we really don't have data, render a safe fallback or redirect
        return (
             <div className="min-h-screen pt-32 pb-16 px-6 text-center">
                <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
                <p>The service you are looking for ({serviceId}) could not be loaded.</p>
                <a href="/" className="text-emerald-600 hover:underline mt-4 inline-block">Return Home</a>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen">
            <Head>
                <title>{service.title} in Omaha | {CONTACT.businessName}</title>
                <meta name="description" content={`Professional ${service.title.toLowerCase()} services in Omaha. Expert assessment and safe execution. Get a free estimate.`} />
                <link rel="canonical" href={canonicalUrl} />
            </Head>

            {/* Hero Section */}
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