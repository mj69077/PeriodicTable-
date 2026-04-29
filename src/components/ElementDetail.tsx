/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { MoreVertical, Wind, Box, Heart, Activity, Zap, Radiation, Database } from 'lucide-react';
import { useElementStore } from '../store/useElementStore';
import { ALL_ELEMENTS } from '../data/elements';
import { CATEGORY_COLORS, cn } from '../lib/utils';
import AtomModel from './AtomModel';
import ReactionCard from './ReactionCard';

const isFamousIsotope = (symbol: string, mass: number) => {
  if (symbol === 'H' && mass === 3) return 'Tritium';
  if (symbol === 'C' && mass === 14) return 'Carbon Dating';
  if (symbol === 'U' && mass === 235) return 'Nuclear Fuel';
  return null;
};

export default function ElementDetail() {
  const { 
    selectedElement, setSelectedElement, favorites, toggleFavorite,
    compareList, toggleCompare
  } = useElementStore();

  if (!selectedElement) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8 text-center italic">
        <Box className="w-16 h-16 mb-4 opacity-20" />
        <p>Select an element to view detailed information and properties.</p>
      </div>
    );
  }

  const nearbyElements = ALL_ELEMENTS.filter(e => 
    Math.abs(e.atomicNumber - selectedElement.atomicNumber) <= 2
  );

  const isFavorite = favorites.includes(selectedElement.atomicNumber);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      key={selectedElement.atomicNumber}
      className="flex flex-col h-full overflow-hidden"
    >
      {/* Header */}
      <div className="flex justify-between items-start pt-6 px-6 mb-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            {selectedElement.name} <span className="text-slate-400 font-light">({selectedElement.symbol})</span>
          </h2>
          <p className="text-slate-500 mt-1 text-sm line-clamp-1">{selectedElement.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => toggleFavorite(selectedElement.atomicNumber)}
            className={cn(
              "p-2 rounded-full transition-colors",
              isFavorite ? "text-red-500 bg-red-50" : "text-slate-400 hover:text-slate-600"
            )}
          >
            <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
          </button>
          <button className="p-2 text-slate-400 hover:text-slate-600">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Chips Row */}
      <div className="flex gap-3 px-6 py-4 overflow-x-auto no-scrollbar shrink-0">
        {nearbyElements.map(el => (
          <button
            key={el.atomicNumber}
            onClick={() => setSelectedElement(el)}
            className={cn(
              "flex items-center justify-center min-w-[54px] h-14 rounded-xl text-sm font-bold shadow-sm border border-white/40 transition-all",
              el.atomicNumber === selectedElement.atomicNumber 
                ? "bg-white ring-2 ring-blue-500 shadow-xl -translate-y-1" 
                : "opacity-80 hover:opacity-100"
            )}
            style={{ backgroundColor: el.atomicNumber === selectedElement.atomicNumber ? '#ffffff' : CATEGORY_COLORS[el.category] }}
          >
            {el.symbol}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-24 custom-scrollbar">
        {/* Overview Section */}
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Overview</h3>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-50 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-slate-800 tracking-tight">{selectedElement.atomicNumber}</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Atomic</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-50 flex flex-col items-center justify-center">
            <div className="text-xl font-bold text-slate-800 tracking-tight">{selectedElement.atomicMass}</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Atomic Weight</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-50 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1.5 mb-0.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[selectedElement.category] }}></div>
              <div className="text-[13px] font-bold text-slate-800 truncate max-w-[60px]">
                {selectedElement.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </div>
            </div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Category</div>
          </div>
        </div>

        {/* Properties Section */}
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Properties</h3>
        <div className="bg-white rounded-3xl border border-slate-50 p-6 shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Atom Model Column */}
            <div className="flex-1 flex flex-col items-center relative py-4">
              <span className="absolute top-0 left-0 text-[10px] font-bold text-slate-300 uppercase tracking-widest">Atom Model</span>
              <AtomModel />
            </div>
            
            {/* Physics Bars Column */}
            <div className="lg:w-1/2 flex flex-col gap-4 justify-center">
              <div>
                <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-tight mb-1">
                  <span>Melting Point</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: selectedElement.meltingPoint ? `${Math.min(100, (selectedElement.meltingPoint / 4000) * 100)}%` : '0%' }}
                      className="h-full bg-gradient-to-r from-purple-400 to-pink-400" 
                    />
                  </div>
                  <span className="text-xs font-bold whitespace-nowrap text-slate-700">{selectedElement.meltingPoint ?? 'N/A'} K</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-tight mb-1">
                  <span>Boiling Point</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: selectedElement.boilingPoint ? `${Math.min(100, (selectedElement.boilingPoint / 6000) * 100)}%` : '0%' }}
                      className="h-full bg-gradient-to-r from-blue-400 to-indigo-400" 
                    />
                  </div>
                  <span className="text-xs font-bold whitespace-nowrap text-slate-700">{selectedElement.boilingPoint ?? 'N/A'} K</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Icons Row in Properties Card */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-slate-50">
            <div className="flex-1 bg-slate-50/50 rounded-2xl p-4 flex items-center justify-center gap-3 border border-slate-100">
              <span className="text-xl">🌬️</span>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">{selectedElement.state}</span>
            </div>
            <div className="flex-1 bg-slate-50/50 rounded-2xl p-4 flex items-center justify-center gap-3 border border-slate-100">
              <span className="text-xl">🧊</span>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">{selectedElement.density} g/L</span>
            </div>
          </div>
        </div>

        {/* Isotope Explorer Section */}
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 mt-8 flex items-center gap-2">
          <Activity size={12} /> Isotope Explorer
        </h3>
        <div className="grid grid-cols-1 gap-3 mb-8">
          {selectedElement.isotopes?.map((iso, i) => {
            const famousLabel = isFamousIsotope(selectedElement.symbol, iso.massNumber);
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-slate-50 flex items-center justify-between group hover:border-blue-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center font-black text-slate-700 text-lg">
                      {iso.massNumber}
                    </div>
                    {!iso.isStable && (
                      <motion.div 
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white"
                      >
                        <Radiation size={10} className="text-white fill-current" />
                      </motion.div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-800">
                        {selectedElement.symbol}-{iso.massNumber}
                      </h4>
                      {famousLabel && (
                        <span className="px-1.5 py-0.5 bg-yellow-400 text-[8px] font-black uppercase text-yellow-900 rounded tracking-tighter">
                          {famousLabel}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-3 mt-0.5">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight flex items-center gap-1">
                        <Database size={10} /> {iso.neutrons} Neutrons
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                        {iso.abundance > 0 ? `${iso.abundance}% Abundance` : 'Trace Amount'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={cn(
                    "text-[10px] font-black uppercase tracking-widest",
                    iso.isStable ? "text-emerald-500" : "text-red-500"
                  )}>
                    {iso.isStable ? 'Stable' : 'Unstable'}
                  </div>
                  {!iso.isStable && iso.halfLife && (
                    <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                      t½: {iso.halfLife}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* History & Discovery Section */}
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 mt-8">Discovery</h3>
        <div className="bg-white rounded-3xl border border-slate-50 p-6 shadow-sm mb-8">
           <div className="flex items-center gap-4 mb-4">
             <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-xl font-bold text-slate-400">
               {selectedElement.discoveredYear.slice(0, 2)}
             </div>
             <div>
               <h5 className="text-sm font-bold text-slate-800">{selectedElement.discoverer}</h5>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{selectedElement.discoveredYear}</p>
             </div>
           </div>
           <p className="text-xs text-slate-500 leading-relaxed italic border-l-2 border-slate-100 pl-4">
             First identified and isolated during the {selectedElement.discoveredYear} era.
           </p>
        </div>

        {/* Real World Section */}
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">In The World</h3>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 mb-4">
            <div className="w-48 h-32 shrink-0 bg-slate-200 rounded-2xl overflow-hidden relative group">
              <img 
                src={`https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?auto=format&fit=crop&w=300&q=80`} 
                alt="Nature" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-bottom p-3">
                <span className="text-[10px] font-bold text-white mt-auto truncate">Natural Occurrence</span>
              </div>
            </div>
            <div className="w-48 h-32 shrink-0 bg-slate-200 rounded-2xl overflow-hidden relative group">
              <img 
                src={`https://images.unsplash.com/photo-1504917595217-d4dc5f666c52?auto=format&fit=crop&w=300&q=80`} 
                alt="Industry" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-bottom p-3">
                <span className="text-[10px] font-bold text-white mt-auto truncate">Industrial Use</span>
              </div>
            </div>
        </div>

        {/* Global Production */}
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Top Producers</h3>
        <div className="grid grid-cols-1 gap-2 mb-8">
           {selectedElement.production.map((p, i) => (
             <div key={i} className="bg-white/50 backdrop-blur-sm p-3 rounded-2xl border border-white flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <span className="text-xl">{p.flag}</span>
                 <span className="text-xs font-bold text-slate-700">{p.country}</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-400" style={{ width: `${p.percentage}%` }} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">{p.percentage}%</span>
               </div>
             </div>
           ))}
        </div>

        {/* Safety & Hazards */}
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Safety & Hazards</h3>
        <div className="bg-white rounded-3xl border border-slate-50 p-6 shadow-sm mb-8">
           <div className="flex gap-4 mb-4">
             {selectedElement.hazards.length > 0 ? selectedElement.hazards.map((h, i) => (
               <div key={i} className="flex flex-col items-center gap-1">
                 <div className="w-10 h-10 bg-red-50 text-red-500 rounded-lg flex items-center justify-center font-bold">
                   ⚠️
                 </div>
                 <span className="text-[8px] font-bold text-slate-400 uppercase">{h}</span>
               </div>
             )) : (
               <div className="flex items-center gap-2 text-green-500 font-bold bg-green-50 px-4 py-2 rounded-xl text-xs">
                 ✅ Generally recognized as safe
               </div>
             )}
           </div>
           <p className="text-[10px] text-slate-400 leading-relaxed">
             Always handle with appropriate lab equipment. Avoid direct inhalation or ingestion. Store in a cool, dry place away from incompatible substances.
           </p>
        </div>

        {/* Biological Role */}
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Biological Role</h3>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 border border-white shadow-sm mb-12">
           <div className="flex items-center gap-3 mb-3">
             <div className="w-8 h-8 bg-emerald-100 text-emerald-500 rounded-xl flex items-center justify-center">
               🥦
             </div>
             <span className="text-xs font-bold text-emerald-700">Health Impact</span>
           </div>
           <p className="text-xs text-emerald-800/70 leading-relaxed font-medium">
             {selectedElement.biologicalRole}
           </p>
        </div>

        {/* Bottom Actions Tray */}
        <div className="flex gap-4 mt-8 pb-12">
            <button 
              onClick={() => toggleCompare(selectedElement.atomicNumber)}
              className={cn(
                "flex-1 py-4 px-6 rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2",
                compareList.includes(selectedElement.atomicNumber)
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-200"
                  : "bg-white border border-slate-100 text-slate-600 hover:bg-slate-50"
              )}
            >
              {compareList.includes(selectedElement.atomicNumber) ? "Comparing..." : "Compare Element"}
            </button>
            <button className="flex-1 py-4 px-6 bg-slate-800 text-white rounded-2xl font-bold text-xs shadow-lg shadow-slate-200 flex items-center justify-center gap-2">
               Study Flashcards
            </button>
        </div>
      </div>
    </motion.div>
  );
}
