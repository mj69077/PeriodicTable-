/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FlaskConical, Play, RotateCcw, Search, Sparkles, AlertCircle } from 'lucide-react';
import { useElementStore, PeriodicElement } from '../store/useElementStore';
import { ALL_ELEMENTS } from '../data/elements';
import { cn } from '../lib/utils';
import ReactionSimulator3D from './ReactionSimulator3D';
import { geminiService } from '../services/geminiService';

export default function ReactionLab() {
  const [el1, setEl1] = useState<PeriodicElement | null>(null);
  const [el2, setEl2] = useState<PeriodicElement | null>(null);
  const [isReacting, setIsReacting] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSearch, setShowSearch] = useState<'el1' | 'el2' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredElements = ALL_ELEMENTS.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    e.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartReaction = async () => {
    if (!el1 || !el2) return;
    setIsReacting(true);
    setIsLoading(true);
    setExplanation(null);
    
    try {
      const result = await geminiService.explainReaction(el1.name, el2.name);
      setExplanation(result);
    } catch (err) {
      setExplanation("Could not generate scientific explanation, but let's see the visual!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setEl1(null);
    setEl2(null);
    setIsReacting(false);
    setExplanation(null);
  };

  return (
    <div className="p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">Reaction Simulator</h2>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-1">Experimental 3D Lab</p>
        </div>
        <button 
          onClick={handleReset}
          className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Element 1 Selection */}
        <button 
          onClick={() => setShowSearch('el1')}
          className={cn(
            "h-24 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center transition-all group",
            el1 ? "border-blue-500 bg-blue-50/50" : "border-slate-200 hover:border-blue-300 bg-slate-50"
          )}
        >
          {el1 ? (
            <>
              <span className="text-2xl font-black text-blue-600 group-hover:scale-110 transition-transform">{el1.symbol}</span>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mt-1">{el1.name}</span>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-2">
                <Search size={16} className="text-slate-400" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Reactant A</span>
            </>
          )}
        </button>

        {/* Element 2 Selection */}
        <button 
          onClick={() => setShowSearch('el2')}
          className={cn(
            "h-24 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center transition-all group",
            el2 ? "border-red-500 bg-red-50/50" : "border-slate-200 hover:border-red-300 bg-slate-50"
          )}
        >
          {el2 ? (
            <>
              <span className="text-2xl font-black text-red-600 group-hover:scale-110 transition-transform">{el2.symbol}</span>
              <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest mt-1">{el2.name}</span>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-2">
                <Search size={16} className="text-slate-400" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Reactant B</span>
            </>
          )}
        </button>
      </div>

      <div className="flex-1 relative mb-6">
        <ReactionSimulator3D 
          element1={el1} 
          element2={el2} 
          isReacting={isReacting} 
          onFinish={() => setIsReacting(false)} 
        />
        
        <AnimatePresence>
          {el1 && el2 && !isReacting && !explanation && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-3xl"
            >
              <button 
                onClick={handleStartReaction}
                className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 shadow-xl hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all"
              >
                <Play size={18} fill="currentColor" /> Let's React!
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {explanation && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl overflow-hidden relative group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12">
               <Sparkles size={48} className="text-blue-500" />
            </div>
            <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Sparkles size={12} /> AI Scientific Explanation
            </h4>
            <div className="text-sm text-slate-600 leading-relaxed max-h-40 overflow-y-auto no-scrollbar">
              {explanation}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {showSearch && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSearch(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-md bg-white rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col max-h-[80vh]"
            >
              <div className="p-8 pb-4">
                <h3 className="text-2xl font-black text-slate-800 tracking-tighter mb-4">Select Element</h3>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    autoFocus
                    type="text"
                    placeholder="Search by name or symbol..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border-none outline-none pl-12 pr-6 py-4 rounded-2xl text-slate-800 font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/10 transition-all"
                  />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 pt-0 grid grid-cols-3 gap-2">
                {filteredElements.map((e) => (
                  <button 
                    key={e.atomicNumber}
                    onClick={() => {
                      if (showSearch === 'el1') setEl1(e);
                      else setEl2(e);
                      setShowSearch(null);
                      setSearchQuery('');
                      setExplanation(null);
                    }}
                    className="flex flex-col items-center justify-center p-4 rounded-2xl hover:bg-slate-50 transition-all group"
                  >
                    <span className="text-xl font-black text-slate-800 group-hover:scale-110 transition-all">{e.symbol}</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest truncate w-full text-center">{e.name}</span>
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => setShowSearch(null)}
                className="m-4 mt-0 bg-slate-100 text-slate-500 py-3 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-slate-200 transition-all"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
