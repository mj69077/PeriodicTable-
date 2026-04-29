/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Reaction } from '../store/useElementStore';

interface ReactionCardProps {
  reaction: Reaction;
}

const ReactionCard: React.FC<ReactionCardProps> = ({ reaction }) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-50 flex items-center gap-3">
      {/* Reactant 1 */}
      <div className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center text-[11px] font-bold shadow-sm"
           style={{ backgroundColor: reaction.reactant1.color }}>
        {reaction.reactant1.symbol}
      </div>
      
      <span className="text-slate-400">+</span>
      
      {/* Reactant 2 */}
      <div className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center text-[11px] font-bold shadow-sm"
           style={{ backgroundColor: reaction.reactant2.color }}>
        {reaction.reactant2.symbol}
      </div>
      
      <span className="text-slate-400 text-lg">→</span>
      
      {/* Product */}
      <div className="flex-1 h-10 rounded-lg flex items-center justify-center text-[11px] font-bold shadow-sm px-2 text-center truncate"
           style={{ backgroundColor: reaction.product.color }}>
        {reaction.product.name}
      </div>
    </div>
  );
};

export default ReactionCard;
