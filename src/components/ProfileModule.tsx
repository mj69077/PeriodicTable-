/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useElementStore } from '../store/useElementStore';
import { BADGES } from '../data/achievements';
import { Trophy, Zap, ShieldCheck, Flame, Star, Award, Download, Code2 } from 'lucide-react';
import { cn } from '../lib/utils';
import DownloadModule from './DownloadModule';
import ProjectInfo from './ProjectInfo';

export default function ProfileModule() {
  const { xp, level, streak, userName, userAvatar, achievements, elementsViewed, lessonsProgress } = useElementStore();
  const [activeView, setActiveView] = useState<'profile' | 'downloads' | 'project'>('profile');
  
  const xpToNext = 500 - (xp % 500);
  const progressPercent = ((xp % 500) / 500) * 100;

  if (activeView !== 'profile') {
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveView('profile')}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 font-bold"
            >
              ←
            </button>
            <h2 className="text-xl font-black text-slate-800">
              {activeView === 'downloads' ? 'Download Center' : 'React Project Info'}
            </h2>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {activeView === 'downloads' ? <DownloadModule /> : <ProjectInfo />}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-y-auto no-scrollbar space-y-8 bg-slate-50/20 pb-20">
      <div className="text-center pt-8">
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-white rounded-[2rem] shadow-xl flex items-center justify-center text-4xl border-2 border-white ring-4 ring-blue-50">
            {userAvatar}
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-slate-800 text-white rounded-2xl flex items-center justify-center font-black text-xs shadow-lg">
            LV{level}
          </div>
        </div>
        <h2 className="text-3xl font-black text-slate-800 mt-6 tracking-tight">{userName}</h2>
        <div className="flex items-center justify-center gap-4 mt-2">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-bold">
            <Flame size={12} className="fill-current" />
            <span>{streak} Day Streak</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs font-bold">
            <Star size={12} className="fill-current" />
            <span>{xp} Total XP</span>
          </div>
        </div>
      </div>

      {/* XP Progress Card */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Next Level Progress</span>
          <span className="text-xs font-bold text-slate-700">{xp % 500} / 500 XP</span>
        </div>
        <div className="h-4 bg-slate-100 rounded-full overflow-hidden p-1 shadow-inner">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full shadow-lg"
          />
        </div>
        <p className="text-[10px] text-slate-300 text-center mt-4 font-bold uppercase tracking-widest">
          {Math.floor(xpToNext)} XP remaining until Level {level + 1}
        </p>
      </div>

      {/* Download Center Button */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => setActiveView('downloads')}
          className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:bg-blue-50 transition-colors group"
        >
          <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Download size={22} />
          </div>
          <div className="text-xs font-black text-slate-800 uppercase tracking-widest">Exports</div>
        </button>

        <button 
          onClick={() => setActiveView('project')}
          className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:bg-indigo-50 transition-colors group"
        >
          <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Code2 size={22} />
          </div>
          <div className="text-xs font-black text-slate-800 uppercase tracking-widest">Project</div>
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-50 shadow-sm">
          <div className="text-2xl font-black text-slate-800 mb-1">{elementsViewed.length}</div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Elements Discovered</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-50 shadow-sm">
          <div className="text-2xl font-black text-slate-800 mb-1">{Object.keys(lessonsProgress).length}</div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lessons Mastered</div>
        </div>
      </div>

      {/* Achievements Section */}
      <div>
        <div className="flex justify-between items-center mb-6 px-2">
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Achievements</h3>
          <span className="text-xs font-bold text-blue-500">View All</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {BADGES.map((badge) => {
            const isUnlocked = xp > 200; // Placeholder for logic
            return (
              <div key={badge.id} className="group relative flex flex-col items-center">
                <div className={cn(
                  "w-full aspect-square rounded-2xl flex items-center justify-center text-2xl transition-all duration-500",
                  isUnlocked ? "bg-white shadow-md border border-white" : "bg-slate-100 grayscale opacity-40 border border-transparent"
                )}>
                  {badge.icon}
                </div>
                {!isUnlocked && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-400">
                    <Award size={16} />
                  </div>
                )}
                <span className="text-[8px] font-bold text-slate-400 uppercase mt-2 text-center truncate w-full">{badge.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leaderboard Sneak-Peek */}
      <div className="bg-slate-800 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
         <Trophy size={80} className="absolute -top-4 -right-4 text-white/5 rotate-12" />
         <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Leaderboard</h4>
         <div className="space-y-4">
           {[
             { rank: 1, name: "Alex Chem", xp: "4,520", avatar: "👨‍🔬" },
             { rank: 2, name: "Marie Curie", xp: "3,890", avatar: "👩‍🔬" },
             { rank: 3, name: "P. Mole", xp: "3,110", avatar: "🐹" },
           ].map(u => (
             <div key={u.rank} className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/10">
               <span className="text-xs font-black text-slate-500 w-4">{u.rank}</span>
               <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center text-sm">{u.avatar}</div>
               <span className="flex-1 text-sm font-bold truncate">{u.name}</span>
               <span className="text-xs font-black text-slate-400">{u.xp}</span>
             </div>
           ))}
           <div className="pt-4 mt-4 border-t border-white/10 flex items-center gap-4">
             <span className="text-xs font-black text-blue-400 w-4">12</span>
             <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center text-sm">{userAvatar}</div>
             <span className="flex-1 text-sm font-bold truncate">You</span>
             <span className="text-xs font-black text-blue-400">{xp}</span>
           </div>
         </div>
      </div>
    </div>
  );
}
