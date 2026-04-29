/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator as CalcIcon, Scale, Thermometer, Box } from 'lucide-react';
import { ALL_ELEMENTS } from '../data/elements';
import { cn } from '../lib/utils';

export default function CalculatorModule() {
  const [activeSubTab, setActiveSubTab] = useState<'balancer' | 'molarmass' | 'unit'>('balancer');
  const [inputStr, setInputStr] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculateMolarMass = (formula: string) => {
     // Very simple parser for AxBy type formulas
     const matches = formula.match(/([A-Z][a-z]*)(\d*)/g);
     if (!matches) return;

     let total = 0;
     const breakdown = matches.map(m => {
       const symbol = m.match(/[A-Z][a-z]*/)?.[0];
       const countStr = m.match(/\d+/)?.[0];
       const count = countStr ? parseInt(countStr) : 1;
       const el = ALL_ELEMENTS.find(e => e.symbol === symbol);
       if (el) {
         const mass = parseFloat(el.atomicMass);
         total += mass * count;
         return { symbol, count, mass, subtotal: mass * count };
       }
       return null;
     }).filter(Boolean);

     setResult({ total, breakdown });
  };

  return (
    <div className="p-6 h-full flex flex-col bg-slate-50/20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Homework Helper</h2>
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-50">
          <button 
            onClick={() => setActiveSubTab('balancer')}
            className={cn("px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all", activeSubTab === 'balancer' ? "bg-slate-800 text-white shadow-md" : "text-slate-400 hover:text-slate-600")}
          >
            Balance
          </button>
          <button 
            onClick={() => setActiveSubTab('molarmass')}
            className={cn("px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all", activeSubTab === 'molarmass' ? "bg-slate-800 text-white shadow-md" : "text-slate-400 hover:text-slate-600")}
          >
            Mass
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar space-y-6">
        <div className="bg-white rounded-3xl p-8 border border-slate-50 shadow-sm flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-6">
            {activeSubTab === 'balancer' ? <Box size={32} /> : <Scale size={32} />}
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            {activeSubTab === 'balancer' ? "Equation Balancer" : "Molar Mass Calculator"}
          </h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-8">
            Enter chemical formula or equation
          </p>

          <div className="w-full relative group">
            <input 
              type="text" 
              placeholder={activeSubTab === 'balancer' ? "H2 + O2 = H2O" : "H2SO4"}
              className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-200 outline-none px-6 py-4 rounded-2xl font-mono text-lg text-slate-700 transition-all placeholder:text-slate-300"
              value={inputStr}
              onChange={(e) => setInputStr(e.target.value)}
            />
            {inputStr && (
              <button 
                onClick={() => activeSubTab === 'molarmass' ? calculateMolarMass(inputStr) : null}
                className="absolute right-2 top-2 bottom-2 px-6 bg-slate-800 text-white rounded-[14px] font-bold text-xs shadow-xl active:scale-95 transition-transform"
              >
                Solve
              </button>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {result && activeSubTab === 'molarmass' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] p-8 border border-slate-50 shadow-sm"
            >
              <div className="flex justify-between items-end mb-8">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Total Molar Mass</span>
                  <div className="text-4xl font-black text-slate-800 leading-none">
                    {result.total.toFixed(3)} <span className="text-lg text-slate-400">g/mol</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center">
                  ✨
                </div>
              </div>

              <div className="space-y-3">
                {result.breakdown.map((b: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center font-bold text-slate-700">
                        {b.symbol}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-700">Count: {b.count}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">{b.mass.toFixed(2)} u</div>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-slate-800">
                      {b.subtotal.toFixed(2)} g
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSubTab === 'balancer' && (
            <div className="p-8 text-center text-slate-300 italic text-sm">
               Equation balancer logic coming soon in the next lab update! 🧪
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Units */}
      <div className="mt-auto flex gap-4">
        <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
          <Thermometer className="text-red-400" size={20} />
          <div>
            <span className="text-[8px] font-bold text-slate-400 uppercase block">Temp</span>
            <span className="text-xs font-bold text-slate-700">°C ↔ K</span>
          </div>
        </div>
        <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
          <CalcIcon className="text-purple-400" size={20} />
          <div>
            <span className="text-[8px] font-bold text-slate-400 uppercase block">Units</span>
            <span className="text-xs font-bold text-slate-700">mol ↔ g</span>
          </div>
        </div>
      </div>
    </div>
  );
}
