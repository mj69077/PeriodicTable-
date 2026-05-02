/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { useElementStore, PeriodicElement } from '../store/useElementStore';
import { ALL_ELEMENTS } from '../data/elements';
import { X, ArrowLeftRight, Activity, Thermometer, ShieldAlert, Zap, Box } from 'lucide-react';
import { CATEGORY_COLORS, cn } from '../lib/utils';

export default function CompareModule() {
  const { compareList, toggleCompare, clearComparison } = useElementStore();

  const comparedElements = ALL_ELEMENTS.filter((e) => compareList.includes(e.atomicNumber));

  if (compareList.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 text-center">
        <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-6 text-slate-300">
          <ArrowLeftRight size={40} />
        </div>
        <h3 className="text-xl font-black text-slate-800 tracking-tight mb-2">Compare Elements</h3>
        <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
          Select up to 3 elements from the table to compare their properties side-by-side.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Comparison</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Side-by-side analysis</p>
        </div>
        <button 
          onClick={clearComparison}
          className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex gap-4 min-w-max h-full">
          {comparedElements.map((el) => (
            <CompareCard key={el.atomicNumber} element={el} onRemove={() => toggleCompare(el.atomicNumber)} />
          ))}
          {comparedElements.length < 3 && (
            <div className="w-64 h-full rounded-[2.5rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center bg-slate-50/50">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Available slot</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CompareCard({ element, onRemove }: { element: PeriodicElement; onRemove: () => void }) {
  const color = CATEGORY_COLORS[element.category] || 'bg-slate-400';

  return (
    <div className="w-64 h-full bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col overflow-hidden group">
      <div className={cn("p-6 text-white relative", color)}>
        <button 
          onClick={onRemove}
          className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all"
        >
          <X size={14} />
        </button>
        <span className="text-4xl font-black tracking-tighter mb-1 block">{element.symbol}</span>
        <span className="text-sm font-bold opacity-90 uppercase tracking-widest">{element.name}</span>
        <div className="mt-4 flex gap-2">
           <span className="px-2 py-1 bg-white/20 rounded-lg text-[10px] font-black">#{element.atomicNumber}</span>
           <span className="px-2 py-1 bg-white/20 rounded-lg text-[10px] font-black">{element.state}</span>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-y-auto no-scrollbar">
        {/* Basic Props */}
        <div className="space-y-4">
          <Stat label="Atomic Mass" value={element.atomicMass} icon={<Box size={14} />} />
          <Stat label="Electronegativity" value={element.electronegativity || 'N/A'} icon={<Activity size={14} />} />
          <Stat label="Density" value={`${element.density} g/cm³`} icon={<Thermometer size={14} />} />
          <Stat label="Valence e-" value={element.valenceElectrons} icon={<Zap size={14} />} />
        </div>

        {/* Separator */}
        <div className="h-px bg-slate-50" />

        {/* Boiling/Melting */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Melting</span>
            <p className="text-xs font-bold text-slate-700">{element.meltingPoint ? `${element.meltingPoint} K` : 'N/A'}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Boiling</span>
            <p className="text-xs font-bold text-slate-700">{element.boilingPoint ? `${element.boilingPoint} K` : 'N/A'}</p>
          </div>
        </div>

        {/* Hazards */}
        {element.hazards && element.hazards.length > 0 && (
          <div className="space-y-2">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
               <ShieldAlert size={12} className="text-red-500" /> Potential Hazards
            </span>
            <div className="flex flex-wrap gap-1">
              {element.hazards.map((h, i) => (
                <span key={i} className="px-2 py-1 bg-red-50 text-red-500 text-[9px] font-bold rounded-lg">{h}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between group/stat">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover/stat:bg-blue-50 group-hover/stat:text-blue-500 transition-all">
          {icon}
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
      </div>
      <span className="text-xs font-bold text-slate-700">{value}</span>
    </div>
  );
}
