"use client";

import { 
  AlertCircle, 
  Camera, 
  CheckCircle, 
  Info, 
  Search, 
  Upload, 
  X, 
  ArrowRight, 
  ArrowLeft,
  AlertTriangle,
  ShieldAlert,
  ChevronRight
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CONTACT } from "@/lib/constants";
import { treeDatabase, TreeSpecies } from "@/data/species";
import { dmSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export function SpeciesIdentifier() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTree, setSelectedTree] = useState<TreeSpecies | null>(null);
  const [isInterrupted, setIsInterrupted] = useState(false);

  const filteredTrees = treeDatabase.filter(
    t =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (tree: TreeSpecies) => {
    setSelectedTree(tree);
    if (tree.threatProfile === "CRITICAL") {
      setIsInterrupted(true);
    } else {
      setIsInterrupted(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Search Header */}
      <div className="mb-12 text-center">
        <h2 className={`${dmSerif.className} text-4xl text-forest mb-4`}>Species Identifier</h2>
        <p className="text-stone-500 max-w-xl mx-auto">
          Identify common Omaha trees and understand their specific structural risks and maintenance requirements.
        </p>
        
        <div className="relative mt-8 max-w-lg mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name (e.g. Ash, Oak, Maple)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-stone-100 focus:border-gold focus:outline-none transition-all shadow-sm text-forest"
          />
        </div>
      </div>

      {/* Tree List Grid */}
      {!selectedTree && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTrees.map((tree) => (
            <button
              key={tree.name}
              onClick={() => handleSelect(tree)}
              className="group flex items-center justify-between p-6 bg-white rounded-2xl border-2 border-stone-100 hover:border-gold hover:shadow-md transition-all text-left"
            >
              <div>
                <h3 className="text-lg font-bold text-forest">{tree.name}</h3>
                <p className="text-xs text-stone-400 italic">{tree.scientificName}</p>
                
                <div className="mt-3 flex gap-2">
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md",
                    tree.threatProfile === 'CRITICAL' ? "bg-red-50 text-red-600" :
                    tree.threatProfile === 'ELEVATED' ? "bg-amber-50 text-amber-600" :
                    "bg-emerald-50 text-emerald-600"
                  )}>
                    {tree.threatProfile} Profile
                  </span>
                </div>
              </div>
              <ChevronRight className="text-stone-200 group-hover:text-gold transition-colors" />
            </button>
          ))}
        </div>
      )}

      {/* Detail View / Interruption Overlay */}
      {selectedTree && (
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-100">
          
          {/* Critical Interruption Overlay */}
          {isInterrupted && (
            <div className="absolute inset-0 z-50 bg-forest/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-fade-in">
              <div className="mb-6 rounded-full bg-red-500/20 p-6 animate-pulse">
                <ShieldAlert className="w-16 h-16 text-red-400" />
              </div>
              <h3 className={`${dmSerif.className} text-4xl text-white mb-4`}>High-Risk Species Detected</h3>
              <p className="text-red-100/80 max-w-md mb-8 text-lg leading-relaxed">
                {selectedTree.name} are currently classified as **CRITICAL** in the Omaha metro area. 
                {selectedTree.name.includes("Ash") ? " Emerald Ash Borer has a 99% mortality rate for untreated specimens." : " This species is prone to sudden structural failures."}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <button
                  onClick={() => router.push(`/tools/hazard?species=${selectedTree.name}`)}
                  className="flex-1 bg-gold text-forest font-bold py-4 rounded-xl hover:bg-amber-400 transition-all flex items-center justify-center gap-2"
                >
                  Run Risk Assessment <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => setIsInterrupted(false)}
                  className="flex-1 border-2 border-white/20 text-white font-bold py-4 rounded-xl hover:bg-white/10 transition-all"
                >
                  View Details Anyway
                </button>
              </div>
            </div>
          )}

          {/* Standard Detail Header */}
          <div className="bg-forest p-8 md:p-12 text-white">
            <button 
              onClick={() => setSelectedTree(null)}
              className="mb-6 text-white/60 hover:text-white flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
            >
              <ArrowLeft size={16} /> Back to Search
            </button>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className={`${dmSerif.className} text-5xl mb-2`}>{selectedTree.name}</h2>
                <p className="text-xl text-gold/80 italic">{selectedTree.scientificName}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 block mb-1">Magnitude</span>
                <span className="text-2xl font-light">{selectedTree.size}</span>
              </div>
            </div>
          </div>

          {/* Data Sections */}
          <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <section>
                <h4 className="flex items-center gap-2 text-gold font-bold uppercase tracking-widest text-xs mb-4">
                  <Search size={16} /> Identification
                </h4>
                <ul className="space-y-3">
                  {selectedTree.characteristics.map((c, i) => (
                    <li key={i} className="flex items-start gap-3 text-stone-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h4 className="flex items-center gap-2 text-red-500 font-bold uppercase tracking-widest text-xs mb-4">
                  <AlertTriangle size={16} /> Critical Issues
                </h4>
                <ul className="space-y-3">
                  {selectedTree.commonIssues.map((issue, i) => (
                    <li key={i} className="flex items-start gap-3 text-stone-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="space-y-8">
              <div className="bg-stone-50 rounded-2xl p-8 border border-stone-100">
                <h4 className="text-forest font-bold mb-4 flex items-center gap-2">
                  <Info size={18} className="text-gold" /> Arborist Recommendation
                </h4>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {selectedTree.maintenanceNotes}
                </p>
                
                <button
                  onClick={() => router.push(`/contact?source=species_guide&tree=${selectedTree.name}`)}
                  className="mt-8 w-full bg-forest text-white font-bold py-4 rounded-xl hover:bg-forest-deep transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  Request Consultation <ArrowRight size={18} />
                </button>
              </div>
              
              <p className="text-[10px] text-stone-400 text-center uppercase tracking-widest leading-relaxed">
                Data based on Midwest Roots local species tracking.<br />
                Always verify structural integrity with a physical walkthrough.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
