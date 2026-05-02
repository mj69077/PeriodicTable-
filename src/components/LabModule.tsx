/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FlaskConical, Share2, Zap, RotateCcw, HelpCircle } from 'lucide-react';
import { useElementStore, PeriodicElement } from '../store/useElementStore';
import { ALL_ELEMENTS } from '../data/elements';
import { CATEGORY_COLORS, cn } from '../lib/utils';
import ReactionsModule from './ReactionsModule';
import BondingGameModule from './BondingGameModule';
import ReactionLab from './ReactionLab';
import EquationBalancer from './EquationBalancer';

export default function LabModule() {
  const [activeSubTab, setActiveSubTab] = useState<'reactions' | 'bonding' | 'simulator' | 'balancer'>('reactions');

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 pt-6 flex justify-between items-center bg-white/50 border-b border-slate-100">
         <div className="flex gap-6">
           <button 
             onClick={() => setActiveSubTab('reactions')}
             className={cn("pb-3 text-xs font-bold uppercase tracking-widest transition-all relative", activeSubTab === 'reactions' ? "text-slate-800" : "text-slate-400")}
           >
             Reactions
             {activeSubTab === 'reactions' && <motion.div layoutId="labTab" className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800 rounded-t-full" />}
           </button>
           <button 
             onClick={() => setActiveSubTab('bonding')}
             className={cn("pb-3 text-xs font-bold uppercase tracking-widest transition-all relative", activeSubTab === 'bonding' ? "text-slate-800" : "text-slate-400")}
           >
             Bonding
             {activeSubTab === 'bonding' && <motion.div layoutId="labTab" className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800 rounded-t-full" />}
           </button>
           <button 
             onClick={() => setActiveSubTab('simulator')}
             className={cn("pb-3 text-xs font-bold uppercase tracking-widest transition-all relative", activeSubTab === 'simulator' ? "text-slate-800" : "text-slate-400")}
           >
             Simulator 3D
             {activeSubTab === 'simulator' && <motion.div layoutId="labTab" className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800 rounded-t-full" />}
           </button>
           <button 
             onClick={() => setActiveSubTab('balancer')}
             className={cn("pb-3 text-xs font-bold uppercase tracking-widest transition-all relative", activeSubTab === 'balancer' ? "text-slate-800" : "text-slate-400")}
           >
             Balancer
             {activeSubTab === 'balancer' && <motion.div layoutId="labTab" className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800 rounded-t-full" />}
           </button>
         </div>
         <FlaskConical className="text-purple-400 mb-3" size={18} />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {activeSubTab === 'reactions' ? (
          <ReactionsModule />
        ) : activeSubTab === 'bonding' ? (
          <BondingGameModule />
        ) : activeSubTab === 'simulator' ? (
          <ReactionLab />
        ) : (
          <EquationBalancer />
        )}
      </div>
    </div>
  );
}
