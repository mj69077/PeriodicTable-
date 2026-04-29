/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useElementStore, PeriodicElement } from '../store/useElementStore';
import { ALL_ELEMENTS } from '../data/elements';
import { CATEGORY_COLORS, cn } from '../lib/utils';
import { Share2, Zap, RotateCcw, HelpCircle } from 'lucide-react';

interface BondChallenge {
  id: number;
  name: string;
  formula: string;
  elements: string[]; // symbols
  type: 'Ionic' | 'Covalent';
}

const CHALLENGES: BondChallenge[] = [
  { id: 1, name: "Table Salt", formula: "NaCl", elements: ["Na", "Cl"], type: "Ionic" },
  { id: 2, name: "Water", formula: "H₂O", elements: ["H", "O"], type: "Covalent" },
  { id: 3, name: "Carbon Dioxide", formula: "CO₂", elements: ["C", "O"], type: "Covalent" },
  { id: 4, name: "Methane", formula: "CH₄", elements: ["C", "H"], type: "Covalent" },
];

export default function BondingGameModule() {
  const { addXP } = useElementStore();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [slots, setSlots] = useState<(PeriodicElement | null)[]>([null, null]);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState(false);

  const challenge = CHALLENGES[currentIdx];

  const handleDrop = (element: PeriodicElement, index: number) => {
    const next = [...slots];
    next[index] = element;
    setSlots(next);
    setError(false);

      // Auto-check if both slots filled
      if (next[0] && next[1]) {
        const symbols = next.map(e => e?.symbol).sort();
        const targetSymbols = [...challenge.elements].sort();
        
        const isCorrect = symbols.length === targetSymbols.length && 
          symbols.every((s, i) => s === targetSymbols[i]);
        
        if (isCorrect) {
        setIsDone(true);
        addXP(30);
      } else {
        setError(true);
        setTimeout(() => setSlots([null, null]), 1000);
      }
    }
  };

  const nextChallenge = () => {
    setCurrentIdx((currentIdx + 1) % CHALLENGES.length);
    setSlots([null, null]);
    setIsDone(false);
    setError(false);
  };

  return (
    <div className="p-6 h-full flex flex-col bg-slate-50/50">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Bonding Builder</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="px-2 py-0.5 bg-blue-50 text-blue-500 rounded text-[9px] font-bold uppercase tracking-widest">{challenge.type} Bond</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Challenge {currentIdx + 1}/{CHALLENGES.length}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 bg-white rounded-xl shadow-sm text-slate-400 hover:text-slate-600"><RotateCcw size={18} /></button>
          <button className="p-2 bg-white rounded-xl shadow-sm text-blue-400"><HelpCircle size={18} /></button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative">
        <h3 className="text-3xl font-black text-slate-800/20 absolute top-0 text-center uppercase tracking-tighter pointer-events-none">
          Build {challenge.name}
        </h3>

        <div className="flex items-center gap-12 mb-12">
          {[0, 1].map(idx => (
            <div key={idx} className="flex flex-col items-center gap-4">
               <div className={cn(
                 "w-32 h-32 rounded-[2.5rem] border-2 border-dashed flex items-center justify-center transition-all duration-500",
                 slots[idx] ? "border-transparent bg-white shadow-2xl scale-110" : "border-slate-200 bg-white/40",
                 error && !slots[idx] && "border-red-200 bg-red-50"
               )}>
                 <AnimatePresence mode="wait">
                   {slots[idx] ? (
                     <motion.div 
                       initial={{ scale: 0.5, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       className="flex flex-col items-center"
                     >
                       <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black text-slate-800 shadow-sm" style={{ backgroundColor: CATEGORY_COLORS[slots[idx]!.category] }}>
                         {slots[idx]?.symbol}
                       </div>
                       <span className="text-[10px] font-bold text-slate-400 uppercase mt-3">{slots[idx]?.name}</span>
                     </motion.div>
                   ) : (
                     <div className="text-slate-200 font-black text-4xl group-hover:text-slate-300">?</div>
                   )}
                 </AnimatePresence>
               </div>
               {isDone && <Share2 className="text-blue-200" />}
            </div>
          ))}
        </div>

        <AnimatePresence>
          {isDone && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-emerald-500 text-white px-8 py-6 rounded-[2rem] shadow-2xl shadow-emerald-200 text-center"
            >
              <div className="text-5xl font-black mb-2">{challenge.formula}</div>
              <p className="font-bold opacity-90 mb-6">Success! You built {challenge.name}</p>
              <button 
                onClick={nextChallenge}
                className="bg-white text-emerald-600 px-8 py-3 rounded-2xl font-bold hover:shadow-lg transition-shadow"
              >
                Next Challenge (+30 XP)
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Palette */}
      <div className="mt-auto">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Choose Elements</h4>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-2 px-2">
          {ALL_ELEMENTS.filter(e => ['H', 'O', 'Na', 'Cl', 'C', 'Mg'].includes(e.symbol)).map(el => (
             <motion.button
               key={el.atomicNumber}
               whileHover={{ y: -4, scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => {
                 if (!slots[0]) handleDrop(el, 0);
                 else if (!slots[1]) handleDrop(el, 1);
               }}
               className="w-16 h-16 shrink-0 rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-1"
             >
               <span className="text-xl font-black text-slate-800">{el.symbol}</span>
               <span className="text-[8px] font-bold text-slate-400 uppercase">{el.category.split('-')[0]}</span>
             </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
