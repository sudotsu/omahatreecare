'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, AlertCircle, CheckCircle, Info, Camera, X, Upload } from 'lucide-react';
import { treeDatabase } from '@/data/tree-data';
import { Tree, RiskLevel } from '@/types/tree-tools';
import { CONTACT } from '@/constants';

export function SpeciesIdentifier() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);

  // SEO-friendly filter: Search by common or scientific name [4]
  const filteredTrees = treeDatabase.filter(tree =>
    tree.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tree.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRiskUI = (level: RiskLevel) => {
    switch (level) {
      case 'high': return { color: 'text-red-700 bg-red-100', Icon: AlertCircle, emoji: '🔴', label: 'High Risk' };
      case 'moderate': return { color: 'text-yellow-700 bg-yellow-100', Icon: Info, emoji: '🟡', label: 'Moderate Risk' };
      case 'low': return { color: 'text-green-700 bg-green-100', Icon: CheckCircle, emoji: '🟢', label: 'Low Risk' };
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-amber-900 dark:text-slate-100 uppercase italic">Species Identifier</h2>
        <p className="text-amber-800 dark:text-slate-400">Identify Omaha trees and check for Emerald Ash Borer or Oak Wilt risks [1, 5].</p>
      </div>

      {/* Search Bar [2] */}
      {!selectedTree && (
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-600 group-focus-within:text-emerald-500 transition-colors" />
          <input
            type="text"
            placeholder="Search e.g., 'Ash', 'Oak', or 'Maple'..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-amber-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-emerald-500 outline-none transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {/* Tree Grid [3] */}
      {!selectedTree && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTrees.map((tree) => {
            const ui = getRiskUI(tree.riskLevel);
            return (
              <button
                key={tree.name}
                type="button"
                onClick={() => setSelectedTree(tree)}
                className="flex items-center justify-between p-5 bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all border border-transparent hover:border-emerald-500/30 text-left"
              >
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">{tree.name}</h3>
                  <p className="text-sm italic text-slate-500">{tree.scientificName}</p>
                </div>
                <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${ui.color}`}>
                  {ui.emoji} {ui.label}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Detail View [6, 7] */}
      {selectedTree && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-amber-100 dark:border-slate-700">
          <div className="bg-emerald-700 p-6 text-white flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-black uppercase italic">{selectedTree.name}</h2>
              <p className="opacity-90 italic">{selectedTree.scientificName}</p>
            </div>
            <button type="button" onClick={() => setSelectedTree(null)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-amber-50 dark:bg-slate-900/50 p-4 rounded-2xl">
                <p className="text-xs uppercase font-bold text-amber-800 dark:text-emerald-500 mb-1">Risk Profile</p>
                <p className="font-bold flex items-center gap-2">
                  {getRiskUI(selectedTree.riskLevel).emoji} {getRiskUI(selectedTree.riskLevel).label}
                </p>
              </div>
              <div className="bg-amber-50 dark:bg-slate-900/50 p-4 rounded-2xl">
                <p className="text-xs uppercase font-bold text-amber-800 dark:text-emerald-500 mb-1">Typical Size</p>
                <p className="font-bold">{selectedTree.size}</p>
              </div>
            </div>

            <section>
              <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Info className="w-4 h-4 text-emerald-500" /> Key Characteristics
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedTree.characteristics.map(c => (
                  <li key={c} className="text-sm bg-slate-50 dark:bg-slate-700 p-2 rounded-lg border border-slate-100 dark:border-slate-600">
                    • {c}
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-red-50 dark:bg-red-900/20 p-4 rounded-2xl border border-red-100 dark:border-red-900/30">
              <h4 className="font-bold text-red-800 dark:text-red-400 mb-2">Common Omaha Issues</h4>
              <ul className="space-y-1">
                {selectedTree.commonIssues.map(issue => (
                  <li key={issue} className="text-sm text-red-900 dark:text-red-200 font-medium">⚠️ {issue}</li>
                ))}
              </ul>
            </section>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
              <a
                href={`tel:${CONTACT.phoneRaw}`}
                className="flex items-center justify-center gap-3 w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold shadow-lg transition-all"
              >
                📞 Get Expert Care for your {selectedTree.name}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
