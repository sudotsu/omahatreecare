import { ArrowRight, Calculator, Leaf, ShieldAlert } from 'lucide-react';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import TreeDiagnostic from '../components/tool/TreeDiagnostic'; // Ensure this path matches your file structure
import { CONTACT } from '../constants';

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState(null); // 'diagnostic', 'calculator', etc.
  const location = useLocation();
  const canonicalUrl = `https://omahatreecare.com${location.pathname}`;

  // --- SUB-COMPONENT: The Tool Cards Dashboard ---
  const ToolsDashboard = () => (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
          Free Tree Care Tools
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Professional-grade assessments you can use at home. Select a tool below to get started.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1: Tree Risk Diagnostic (The Working Tool) */}
        <button
          onClick={() => setActiveTool('diagnostic')}
          className="group text-left bg-white rounded-2xl p-8 shadow-sm border-2 border-slate-100 hover:border-emerald-500 hover:shadow-xl transition-all duration-300"
        >
          <div className="bg-emerald-100 w-14 h-14 rounded-xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
            <ShieldAlert size={32} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700">
            Risk Diagnostic
          </h3>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Worried about a leaning tree or storm damage? Answer 4 quick questions to assess the safety risk.
          </p>
          <div className="flex items-center font-bold text-emerald-600 group-hover:gap-2 transition-all">
            Start Assessment <ArrowRight size={20} className="ml-2" />
          </div>
        </button>

        {/* Card 2: Placeholder (Coming Soon) */}
        <div className="bg-slate-50 rounded-2xl p-8 border-2 border-dashed border-slate-200 opacity-75">
          <div className="bg-slate-200 w-14 h-14 rounded-xl flex items-center justify-center text-slate-400 mb-6">
            <Calculator size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-400 mb-3">
            Removal Cost Calc
          </h3>
          <p className="text-slate-500 mb-4 text-sm">
            Estimate the cost of tree removal based on height, diameter, and location.
          </p>
          <span className="inline-block bg-slate-200 text-slate-500 text-xs font-bold px-3 py-1 rounded-full">
            COMING SOON
          </span>
        </div>

        {/* Card 3: Placeholder (Coming Soon) */}
        <div className="bg-slate-50 rounded-2xl p-8 border-2 border-dashed border-slate-200 opacity-75">
          <div className="bg-slate-200 w-14 h-14 rounded-xl flex items-center justify-center text-slate-400 mb-6">
            <Leaf size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-400 mb-3">
            Species Identifier
          </h3>
          <p className="text-slate-500 mb-4 text-sm">
            Upload a photo of a leaf to identify the tree species and common local diseases.
          </p>
          <span className="inline-block bg-slate-200 text-slate-500 text-xs font-bold px-3 py-1 rounded-full">
            COMING SOON
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <Head>
        <title>Free Tree Care Tools | {CONTACT.businessName}</title>
        <meta name="description" content="Use our free tree risk diagnostic and cost estimation tools. Expert advice for Omaha homeowners." />
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <main className="container mx-auto px-4">
        {/* LOGIC:
            If activeTool is 'diagnostic', show the TreeDiagnostic component.
            Otherwise, show the ToolsDashboard.
        */}
        {activeTool === 'diagnostic' ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button
              onClick={() => setActiveTool(null)}
              className="mb-8 flex items-center text-slate-500 hover:text-emerald-600 font-medium transition-colors"
            >
              <ArrowRight className="rotate-180 mr-2" size={20} />
              Back to Tools Dashboard
            </button>

            <div className="max-w-4xl mx-auto text-center mb-10">
               <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                   Tree Risk Assessment
               </h1>
               <p className="text-lg text-slate-600">
                   A 60-second check based on ISA safety standards.
               </p>
            </div>

            <TreeDiagnostic />
          </div>
        ) : (
          <ToolsDashboard />
        )}
      </main>
    </div>
  );
}