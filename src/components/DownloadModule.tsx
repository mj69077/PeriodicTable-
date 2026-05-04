/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Download, FileJson, FileText, Database, Shield } from 'lucide-react';
import { useElementStore } from '../store/useElementStore';
import { ALL_ELEMENTS } from '../data/elements';

export default function DownloadModule() {
  const { xp, level, streak, userName, favorites, achievements, elementsViewed, lessonsProgress } = useElementStore();

  const downloadFile = (data: any, fileName: string, type: string = "json") => {
    let content = "";
    let mimeType = "application/json";

    if (type === "json") {
      content = JSON.stringify(data, null, 2);
    } else if (type === "text") {
      content = data;
      mimeType = "text/plain";
    }

    const dataUri = `data:${mimeType};charset=utf-8,${encodeURIComponent(content)}`;
    const link = document.createElement("a");
    link.href = dataUri;
    link.download = fileName;
    link.click();
  };

  const exportProfile = () => {
    const profileData = {
      userName,
      level,
      xp,
      streak,
      favorites,
      achievements,
      elementsViewed,
      exportedAt: new Date().toISOString(),
    };
    downloadFile(profileData, `${userName}_chem_profile.json`);
  };

  const exportElements = () => {
    downloadFile(ALL_ELEMENTS, "periodic_table_data.json");
  };

  const exportLabReport = () => {
    const report = `
# Chemistry Project Report: ${userName}
Generated: ${new Date().toLocaleDateString()}

## Student Statistics
- Level: ${level}
- Total XP: ${xp}
- Study Streak: ${streak} days
- Elements Discovered: ${elementsViewed.length} / 118

## Learning Progress
- Completed Lessons: ${Object.values(lessonsProgress).filter(p => p === 100).length}
- Achievements Earned: ${achievements.filter(a => a.unlocked).length}
- Favorite Elements: ${favorites.length > 0 ? favorites.join(', ') : 'None yet'}

## Explorer Log
You have researched ${elementsViewed.length} elements in depth. 
Keep up the scientific curiosity!

---
Produced by Modern Chemistry Laboratory App
    `.trim();
    downloadFile(report, `${userName}_Lab_Report.txt`, "text");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
            <Download size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-800">Export Center</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Download your data</p>
          </div>
        </div>

        <div className="space-y-3">
          <button 
            onClick={exportLabReport}
            className="w-full flex items-center gap-4 p-4 bg-blue-600 text-white rounded-2xl border border-blue-700 shadow-lg shadow-blue-100 transition-all hover:scale-[1.02] active:scale-[0.98] group"
          >
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
              <FileText size={20} />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold">Full Lab Project Report</div>
              <div className="text-[10px] text-blue-100">Comprehensive study summary (TXT)</div>
            </div>
          </button>

          <button 
            onClick={exportProfile}
            className="w-full flex items-center gap-4 p-4 bg-slate-50 hover:bg-blue-50 rounded-2xl border border-slate-100 hover:border-blue-100 transition-all group"
          >
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
              <FileJson size={20} />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-slate-800">My Progress Data</div>
              <div className="text-[10px] text-slate-400">Personal achievements (JSON)</div>
            </div>
          </button>

          <button 
            onClick={exportElements}
            className="w-full flex items-center gap-4 p-4 bg-slate-50 hover:bg-green-50 rounded-2xl border border-slate-100 hover:border-green-100 transition-all group"
          >
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
              <Database size={20} />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-slate-800">Chemistry Dataset</div>
              <div className="text-[10px] text-slate-400">All 118 elements & properties (JSON)</div>
            </div>
          </button>
        </div>
      </div>

      <div className="bg-slate-800 rounded-[2rem] p-6 text-white/90">
        <div className="flex items-start gap-4">
          <Shield className="text-blue-400 mt-1 shrink-0" size={20} />
          <div>
            <h4 className="text-sm font-bold mb-1">Data Privacy</h4>
            <p className="text-[10px] leading-relaxed opacity-60">
              All data is processed locally in your browser. 
              We do not store your learning progress on our servers. 
              Exporting allows you to keep a backup of your achievements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
