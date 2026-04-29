/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import PeriodicTable from './components/PeriodicTable';
import SearchBar from './components/SearchBar';
import BottomNav from './components/BottomNav';
import ElementDetail from './components/ElementDetail';
import TrendsModule from './components/TrendsModule';
import ReactionsModule from './components/ReactionsModule';
import QuizModule from './components/QuizModule';
import LearnModule from './components/LearnModule';
import LabModule from './components/LabModule';
import CalculatorModule from './components/CalculatorModule';
import ProfileModule from './components/ProfileModule';
import { useElementStore } from './store/useElementStore';
import { X, Heart, Trophy, Flame, Star, Bell } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function App() {
  const { 
    selectedElement, setSelectedElement, activeTab, 
    toggleFavorite, favorites, xp, streak 
  } = useElementStore();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'trends': return <TrendsModule />;
      case 'reactions': return <ReactionsModule />;
      case 'quiz': return <QuizModule />;
      case 'learn': return <LearnModule />;
      case 'game': return <LabModule />;
      case 'calculator': return <CalculatorModule />;
      case 'profile': return <ProfileModule />;
      default: return <PeriodicTable />;
    }
  };

  return (
    <div className="min-h-screen p-2 sm:p-8 flex items-center justify-center font-sans bg-[#f0f0f5]">
      <div className="w-full max-w-7xl h-[94vh] flex gap-8 relative overflow-hidden">
        
        {/* LEFT PANEL: Main Content Card */}
        <div className="w-full lg:w-[480px] flex flex-col bg-white/80 backdrop-blur-xl rounded-[40px] shadow-2xl border border-white/50 overflow-hidden shrink-0">
          {/* Header */}
          <div className="flex flex-col p-8 pb-4 gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-slate-800 tracking-tighter leading-none">Periodic</h2>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-orange-50 text-orange-500 rounded-lg text-[10px] font-bold">
                    <Flame size={12} className="fill-current" />
                    {streak}
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-yellow-50 text-yellow-600 rounded-lg text-[10px] font-bold">
                    <Star size={12} className="fill-current" />
                    {xp.toLocaleString()} XP
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="p-3 bg-white rounded-2xl shadow-sm text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-all relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                </button>
                <SearchBar />
              </div>
            </div>
          </div>

          {/* Dynamic Content */}
          <div className="flex-1 overflow-hidden relative">
            <AnimatePresence mode="wait">
               <motion.div
                 key={activeTab}
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 1.02 }}
                 transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                 className="h-full"
               >
                 {renderContent()}
               </motion.div>
            </AnimatePresence>
          </div>

          {/* Tab Navigation */}
          <BottomNav />
        </div>

        {/* RIGHT PANEL: Detail Card (Desktop/Tablet) */}
        {!isMobile && (
          <div className="flex-1 bg-white/80 backdrop-blur-md rounded-[32px] shadow-2xl p-8 flex flex-col border border-white/50 overflow-hidden">
            <ElementDetail />
          </div>
        )}

        {/* Mobile Detail Slide-up */}
        <AnimatePresence>
          {isMobile && selectedElement && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedElement(null)}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed bottom-0 left-0 right-0 h-[80vh] bg-white rounded-t-[2.5rem] z-50 shadow-2xl p-2"
              >
                <div className="flex justify-center mt-2 mb-2">
                  <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
                </div>
                <button 
                  onClick={() => setSelectedElement(null)}
                  className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="h-full overflow-hidden">
                  <ElementDetail />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
