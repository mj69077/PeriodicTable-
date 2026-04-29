/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Grid, BookOpen, Gamepad2, Calculator, Trophy, User } from 'lucide-react';
import { useElementStore } from '../store/useElementStore';
import { cn } from '../lib/utils';

export default function BottomNav() {
  const { activeTab, setActiveTab } = useElementStore();

  const tabs = [
    { id: 'table', icon: Grid, label: 'Table' },
    { id: 'learn', icon: BookOpen, label: 'Learn' }, // Lessons + Trends
    { id: 'game', icon: Gamepad2, label: 'Lab' }, // Reactions + Bonding
    { id: 'calculator', icon: Calculator, label: 'Tools' }, // Calc
    { id: 'quiz', icon: Trophy, label: 'Quests' }, // Quiz
    { id: 'profile', icon: User, label: 'Profile' }, // Leaderboard
  ] as const;

  return (
    <div className="mt-auto flex justify-around items-center p-4 bg-white border-t border-slate-100">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              isActive ? "text-blue-500" : "text-slate-400 hover:text-slate-500"
            )}
          >
            <Icon className="w-6 h-6" />
            <span className="text-[10px] font-bold">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
