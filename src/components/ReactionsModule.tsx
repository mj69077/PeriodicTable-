/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useElementStore, PeriodicElement } from '../store/useElementStore';
import { ALL_ELEMENTS } from '../data/elements';
import { CATEGORY_COLORS, cn } from '../lib/utils';
import { Plus, MoveRight, FlaskConical, Atom } from 'lucide-react';

export default function ReactionsModule() {
  const [slot1, setSlot1] = useState<PeriodicElement | null>(null);
  const [slot2, setSlot2] = useState<PeriodicElement | null>(null);
  const [isReacting, setIsReacting] = useState(false);

  // Check for reaction in our data
  const foundReaction = slot1?.reactions.find(r => 
    r.reactant1.symbol === slot1.symbol && r.reactant2.symbol === slot2?.symbol ||
    r.reactant1.symbol === slot2?.symbol && r.reactant2.symbol === slot1.symbol
  ) || slot2?.reactions.find(r => 
    r.reactant1.symbol === slot1?.symbol && r.reactant2.symbol === slot2.symbol ||
    r.reactant1.symbol === slot2.symbol && r.reactant2.symbol === slot1?.symbol
  );

  const handleSimulate = () => {
    if (!slot1 || !slot2) return;
    setIsReacting(true);
    setTimeout(() => setIsReacting(false), 2000);
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Reaction Simulator</h2>
        <FlaskConical className="text-blue-400" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-12">
        <div className="flex items-center gap-6 sm:gap-12">
          {/* Slot 1 */}
          <div className="flex flex-col items-center gap-3">
            <button 
              onClick={() => setSlot1(null)}
              className={cn(
                "w-24 h-24 rounded-3xl border-2 border-dashed flex items-center justify-center transition-all",
                slot1 ? "border-transparent bg-white shadow-xl scale-110" : "border-slate-200 bg-slate-50 hover:bg-slate-100"
              )}
              style={slot1 ? { backgroundColor: CATEGORY_COLORS[slot1.category] } : {}}
            >
              {slot1 ? (
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-black text-slate-800">{slot1.symbol}</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{slot1.name}</span>
                </div>
              ) : (
                <Plus className="text-slate-300" />
              )}
            </button>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Reactant A</span>
          </div>

          <Plus className="text-slate-300 w-8 h-8" />

          {/* Slot 2 */}
          <div className="flex flex-col items-center gap-3">
            <button 
              onClick={() => setSlot2(null)}
              className={cn(
                "w-24 h-24 rounded-3xl border-2 border-dashed flex items-center justify-center transition-all",
                slot2 ? "border-transparent bg-white shadow-xl scale-110" : "border-slate-200 bg-slate-50 hover:bg-slate-100"
              )}
              style={slot2 ? { backgroundColor: CATEGORY_COLORS[slot2.category] } : {}}
            >
              {slot2 ? (
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-black text-slate-800">{slot2.symbol}</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{slot2.name}</span>
                </div>
              ) : (
                <Plus className="text-slate-300" />
              )}
            </button>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Reactant B</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!slot1 || !slot2}
          onClick={handleSimulate}
          className="px-12 py-4 bg-slate-800 text-white font-bold rounded-2xl shadow-xl disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Simulate Reaction
        </motion.button>

        {/* Result Area */}
        <div className="h-48 w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isReacting ? (
              <motion.div
                key="reacting"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: [1, 1.2, 1], opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-yellow-400 blur-3xl opacity-50 animate-pulse" />
                <Atom className="w-24 h-24 text-yellow-500 animate-spin" />
              </motion.div>
            ) : foundReaction ? (
              <motion.div
                key="product"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-white shadow-xl flex items-center gap-6"
              >
                <div className="flex flex-col items-center">
                  <div className="px-6 py-4 rounded-2xl font-black text-2xl text-slate-800 shadow-sm" style={{ backgroundColor: foundReaction.product.color }}>
                    {foundReaction.product.label}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase mt-2">Product</span>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-xl font-bold text-slate-800">{foundReaction.product.name}</h4>
                  <p className="text-xs font-mono text-slate-400 font-bold">{foundReaction.equation}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-red-50 text-red-500 text-[10px] font-bold rounded-md">🔥 Exothermic</span>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-500 text-[10px] font-bold rounded-md">Ionic</span>
                  </div>
                </div>
              </motion.div>
            ) : slot1 && slot2 ? (
              <motion.div 
                key="no-reaction"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-slate-300 font-bold italic"
              >
                No stable reaction found for these elements.
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      {/* Mini Palette */}
      <div className="mt-auto">
         <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Reactant Palette</h4>
         <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
           {ALL_ELEMENTS.slice(0, 15).map(el => (
             <button
               key={el.atomicNumber}
               onClick={() => {
                 if (!slot1) setSlot1(el);
                 else if (!slot2) setSlot2(el);
               }}
               className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center font-bold text-slate-700 shadow-sm border border-white/40 hover:-translate-y-1 transition-all"
               style={{ backgroundColor: CATEGORY_COLORS[el.category] }}
             >
               {el.symbol}
             </button>
           ))}
         </div>
      </div>
    </div>
  );
}
