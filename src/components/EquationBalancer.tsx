/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Equal, Zap, HelpCircle, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { useElementStore } from '../store/useElementStore';

import { geminiService } from '../services/geminiService';

// Simple chemical equation parser and balancer logic
interface ElementCount {
  [element: string]: number;
}

function parseFormula(formula: string): ElementCount {
  const counts: ElementCount = {};
  const regex = /([A-Z][a-z]*)(\d*)/g;
  let match;
  while ((match = regex.exec(formula)) !== null) {
    const element = match[1];
    const count = parseInt(match[2] || '1', 10);
    counts[element] = (counts[element] || 0) + count;
  }
  return counts;
}

export default function EquationBalancer() {
  const { addXP } = useElementStore();
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isBalancing, setIsBalancing] = useState(false);

  const handleBalance = async () => {
    if (!input.trim()) return;
    setIsBalancing(true);
    setError(null);
    setResult(null);

    try {
      const balanced = await balanceEquation(input);
      setResult(balanced);
      addXP(15);
    } catch (err: any) {
      setError(err.message || 'Could not balance this equation. Check your syntax!');
    } finally {
      setIsBalancing(false);
    }
  };

  // Mock balancer for common student reactions + basic logic
  // Real balancing algorithm (Matrix method) is complex for a single component, 
  // so we handle common ones and provide high-quality feedback.
  const balanceEquation = async (equation: string): Promise<string> => {
    const cleaned = equation.replace(/\s+/g, '');
    const parts = cleaned.split('->');
    if (parts.length !== 2) throw new Error('Equation must contain "->"');

    const reactants = parts[0].split('+');
    const products = parts[1].split('+');

    // Known common reactions for quick precise results
    const lookup: Record<string, string> = {
      'H2+O2->H2O': '2H₂ + O₂ → 2H₂O',
      'CH4+O2->CO2+H2O': 'CH₄ + 2O₂ → CO₂ + 2H₂O',
      'Na+Cl2->NaCl': '2Na + Cl₂ → 2NaCl',
      'Fe+O2->Fe2O3': '4Fe + 3O₂ → 2Fe₂O₃',
      'N2+H2->NH3': 'N₂ + 3H₂ → 2NH₃',
      'Al+O2->Al2O3': '4Al + 3O₂ → 2Al₂O₃',
      'C3H8+O2->CO2+H2O': 'C₃H₈ + 5O₂ → 3CO₂ + 4H₂O',
      'HCl+NaOH->NaCl+H2O': 'HCl + NaOH → NaCl + H₂O',
      'Mg+O2->MgO': '2Mg + O₂ → 2MgO'
    };

    const key = reactants.sort().join('+') + '->' + products.sort().join('+');
    if (lookup[key]) return lookup[key];

    // Fallback to Gemini for complex ones
    return await geminiService.balanceEquation(equation);
  };

  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
           <Equal size={120} />
        </div>
        
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-2">
          <Zap className="text-yellow-500 fill-current" size={20} />
          Stoichiometry Pro
        </h2>
        <p className="text-sm text-slate-500 mb-8 max-w-md">
          Enter an unbalanced chemical equation to find the correct coefficients.
        </p>

        <div className="space-y-4">
          <div className="relative">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. H2 + O2 -> H2O"
              className="w-full bg-slate-50 border-none outline-none px-6 py-5 rounded-2xl text-lg font-mono text-slate-700 placeholder:text-slate-300 shadow-inner"
            />
            {input && (
              <button 
                onClick={() => setInput('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-300 hover:text-slate-500 transition-colors"
              >
                <RefreshCw size={18} />
              </button>
            )}
          </div>

          <button 
            onClick={handleBalance}
            disabled={!input || isBalancing}
            className={cn(
              "w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-[0.98]",
              isBalancing ? "bg-slate-100 text-slate-400" : "bg-slate-800 text-white shadow-xl shadow-slate-200"
            )}
          >
            {isBalancing ? (
              <RefreshCw className="animate-spin" size={18} />
            ) : (
              <>
                <CheckCircle2 size={18} />
                Balance Equation (+15 XP)
              </>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 text-center"
          >
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2 block">Balanced Result</span>
            <div className="text-3xl font-mono font-black text-emerald-800 tracking-tight">
              {result}
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-50 border border-red-100 rounded-3xl p-6 flex items-start gap-4"
          >
            <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
            <div>
               <h4 className="text-sm font-bold text-red-800">Balancing Error</h4>
               <p className="text-xs text-red-600 mt-1">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
           <HelpCircle className="text-blue-500 mb-3" size={20} />
           <h4 className="text-sm font-bold text-blue-900 mb-1">How to use</h4>
           <ul className="text-xs text-blue-700/80 space-y-2">
             <li>• Use <span className="font-mono bg-white px-1 rounded">{"->"}</span> for the reaction arrow</li>
             <li>• Use <span className="font-mono bg-white px-1 rounded">+</span> to separate substances</li>
             <li>• Element symbols are case-sensitive (<span className="font-mono font-bold">Na</span> not <span className="font-mono">na</span>)</li>
           </ul>
        </div>
        
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
           <Zap className="text-orange-400 mb-3" size={20} />
           <h4 className="text-sm font-bold text-slate-800 mb-1">Common Examples</h4>
           <div className="flex flex-wrap gap-2 mt-3">
              {['H2 + O2 -> H2O', 'CH4 + O2 -> CO2 + H2O', 'Na + Cl2 -> NaCl'].map(ex => (
                <button 
                  key={ex}
                  onClick={() => setInput(ex)}
                  className="text-[10px] font-bold bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-500 transition-colors"
                >
                  {ex}
                </button>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
