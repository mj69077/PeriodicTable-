/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useElementStore } from '../store/useElementStore';
import { LESSONS, Lesson } from '../data/lessons';
import { BookOpen, CheckCircle2, Clock, ChevronRight, Play, BarChart3, Sparkles } from 'lucide-react';
import { CATEGORY_COLORS, cn } from '../lib/utils';
import TrendsModule from './TrendsModule';
import AIAssistant from './AIAssistant';

export default function LearnModule() {
  const { lessonsProgress, completeLesson } = useElementStore();
  const [activeSubTab, setActiveSubTab] = useState<'lessons' | 'trends' | 'teacher'>('lessons');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  const startLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setCurrentSlide(0);
    setShowQuiz(false);
  };

  const handleFinish = () => {
    if (selectedLesson) {
      completeLesson(selectedLesson.id, 100);
    }
    setSelectedLesson(null);
  };

  if (selectedLesson) {
    const isLastSlide = currentSlide === selectedLesson.slides.length - 1;

    return (
      <div className="p-6 h-full flex flex-col bg-slate-50/30">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{selectedLesson.difficulty}</h3>
            <h2 className="text-xl font-bold text-slate-800">{selectedLesson.title}</h2>
          </div>
          <button 
            onClick={() => setSelectedLesson(null)}
            className="text-xs font-bold text-slate-400 hover:text-slate-600"
          >
            Exit
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar pb-8">
          <AnimatePresence mode="wait">
            {!showQuiz ? (
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-50 min-h-[300px] flex flex-col justify-center text-center">
                  <h4 className="text-2xl font-bold text-slate-800 mb-6">{selectedLesson.slides[currentSlide].title}</h4>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {selectedLesson.slides[currentSlide].content}
                  </p>
                  
                  {selectedLesson.slides[currentSlide].concept && (
                    <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-center gap-2">
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Key Concept</span>
                       <span className="px-3 py-1 bg-blue-50 text-blue-500 rounded-full text-xs font-bold">
                         {selectedLesson.slides[currentSlide].concept}
                       </span>
                    </div>
                  )}
                </div>

                {selectedLesson.slides[currentSlide].fact && (
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 flex gap-4 items-start"
                  >
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                      💡
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-1">Did you know?</span>
                      <p className="text-xs text-emerald-800 font-medium">{selectedLesson.slides[currentSlide].fact}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-slate-50 text-center"
              >
                <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Lesson Complete!</h3>
                <p className="text-slate-500 mb-8">You've mastered {selectedLesson.title}. Ready for the next challenge?</p>
                <div className="flex gap-4">
                  <button 
                    onClick={handleFinish}
                    className="flex-1 py-4 bg-slate-800 text-white rounded-2xl font-bold shadow-xl"
                  >
                    Earn 50 XP
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!showQuiz && (
          <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-4">
            <div className="flex gap-1.5">
              {selectedLesson.slides.map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    i === currentSlide ? "w-8 bg-blue-500" : "w-1.5 bg-slate-200"
                  )} 
                />
              ))}
            </div>
            
            <button
              onClick={() => {
                if (isLastSlide) setShowQuiz(true);
                else setCurrentSlide(currentSlide + 1);
              }}
              className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 font-bold text-slate-700 hover:bg-slate-50"
            >
              {isLastSlide ? "Finish Lesson" : "Next Slide"}
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 pt-6 flex justify-between items-center bg-white/50 border-b border-slate-100">
         <div className="flex gap-6">
           <button 
             onClick={() => setActiveSubTab('lessons')}
             className={cn("pb-3 text-xs font-bold uppercase tracking-widest transition-all relative", activeSubTab === 'lessons' ? "text-slate-800" : "text-slate-400")}
           >
             Lessons
             {activeSubTab === 'lessons' && <motion.div layoutId="learnTab" className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800 rounded-t-full" />}
           </button>
           <button 
             onClick={() => setActiveSubTab('trends')}
             className={cn("pb-3 text-xs font-bold uppercase tracking-widest transition-all relative", activeSubTab === 'trends' ? "text-slate-800" : "text-slate-400")}
           >
             Trends
             {activeSubTab === 'trends' && <motion.div layoutId="learnTab" className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800 rounded-t-full" />}
           </button>
           <button 
             onClick={() => setActiveSubTab('teacher')}
             className={cn("pb-3 text-xs font-bold uppercase tracking-widest transition-all relative", activeSubTab === 'teacher' ? "text-slate-800" : "text-slate-400")}
           >
             Teacher
             {activeSubTab === 'teacher' && <motion.div layoutId="learnTab" className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800 rounded-t-full" />}
           </button>
         </div>
         <BookOpen className="text-blue-400 mb-3" size={18} />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {activeSubTab === 'trends' ? (
          <TrendsModule />
        ) : activeSubTab === 'teacher' ? (
          <AIAssistant />
        ) : (
          <div className="p-6 space-y-8 pb-24">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Academy</h2>
            </div>

            {/* Progress Card */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-blue-200 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-1">Your Journey</h3>
                <p className="text-blue-100 text-xs font-bold uppercase tracking-widest">
                  {Object.keys(lessonsProgress).length} of {LESSONS.length} Lessons Done
                </p>
              </div>
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="6" />
                  <circle 
                    cx="40" cy="40" r="34" fill="none" stroke="white" strokeWidth="6" 
                    strokeDasharray="213.6"
                    strokeDashoffset={213.6 - (213.6 * Object.keys(lessonsProgress).length) / LESSONS.length}
                  />
                </svg>
                <span className="absolute text-sm font-black">{Math.round((Object.keys(lessonsProgress).length / LESSONS.length) * 100)}%</span>
              </div>
            </div>

            {/* Lessons List */}
            <div className="space-y-4">
              {LESSONS.map((lesson) => {
                const isDone = (lessonsProgress[lesson.id] || 0) === 100;
                return (
                  <motion.div
                    key={lesson.id}
                    whileHover={{ x: 8 }}
                    className="group bg-white p-6 rounded-3xl border border-slate-50 shadow-sm flex items-center gap-6 cursor-pointer"
                    onClick={() => startLesson(lesson)}
                  >
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center text-xl shadow-sm transition-colors",
                      isDone ? "bg-emerald-50 text-emerald-500" : "bg-blue-50 text-blue-500 group-hover:bg-blue-100"
                    )}>
                      {isDone ? <CheckCircle2 /> : <Play className="fill-current" />}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn(
                          "px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider",
                          lesson.difficulty === 'Beginner' ? "bg-green-50 text-green-600" :
                          lesson.difficulty === 'Intermediate' ? "bg-orange-50 text-orange-600" :
                          "bg-red-50 text-red-600"
                        )}>
                          {lesson.difficulty}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase ml-2">
                          <Clock size={12} />
                          {lesson.estimatedTime}
                        </div>
                      </div>
                      <h4 className="text-lg font-bold text-slate-800">{lesson.title}</h4>
                    </div>

                    <ChevronRight className="text-slate-300 transition-transform group-hover:translate-x-1" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
