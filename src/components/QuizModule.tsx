/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useElementStore } from '../store/useElementStore';
import { ALL_ELEMENTS } from '../data/elements';
import { Trophy, Timer, Zap, RotateCcw } from 'lucide-react';

export default function QuizModule() {
  const { quizScore, quizStreak, updateQuizProgress } = useElementStore();
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [showResult, setShowResult] = useState<null | boolean>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isGameOver, setIsGameOver] = useState(false);

  const generateQuestion = () => {
    const qTypes = ['name-to-symbol', 'symbol-to-name', 'atomic-to-symbol'];
    const type = qTypes[Math.floor(Math.random() * qTypes.length)];
    const target = ALL_ELEMENTS[Math.floor(Math.random() * ALL_ELEMENTS.length)];
    
    let distractors: string[] = [];
    while (distractors.length < 3) {
      const d = ALL_ELEMENTS[Math.floor(Math.random() * ALL_ELEMENTS.length)];
      if (d.atomicNumber !== target.atomicNumber) {
        distractors.push(type === 'symbol-to-name' ? d.name : type === 'name-to-symbol' ? d.symbol : d.symbol);
      }
    }

    const correctAnswer = type === 'symbol-to-name' ? target.name : (type === 'name-to-symbol' ? target.symbol : target.symbol);
    const options = [...distractors, correctAnswer].sort(() => Math.random() - 0.5);

    setCurrentQuestion({
      type,
      target,
      options,
      correctAnswer
    });
    setShowResult(null);
    setTimeLeft(15);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer('');
    }
  }, [timeLeft, showResult]);

  const handleAnswer = (answer: string) => {
    const correct = answer === currentQuestion.correctAnswer;
    setShowResult(correct);
    updateQuizProgress(correct);
    setTimeout(() => {
      generateQuestion();
    }, 1500);
  };

  if (!currentQuestion) return null;

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Quiz Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-50">
            <Trophy className="w-5 h-5 text-yellow-500" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Total Score</span>
            <span className="text-xl font-bold text-slate-800 tracking-tight">{quizScore}</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center">
             <div className="flex items-center gap-1 text-orange-500 font-bold">
               <Zap className={quizStreak > 0 ? "fill-current" : ""} />
               <span>x{quizStreak}</span>
             </div>
             <span className="text-[9px] text-slate-400 font-bold uppercase">Streak</span>
          </div>
          <div className="relative w-12 h-12 flex items-center justify-center">
             <svg className="w-12 h-12 -rotate-90">
               <circle 
                cx="24" cy="24" r="20" fill="none" stroke="#f1f5f9" strokeWidth="4" 
               />
               <motion.circle 
                cx="24" cy="24" r="20" fill="none" stroke={timeLeft < 5 ? "#ef4444" : "#3b82f6"} strokeWidth="4" 
                strokeDasharray="125.6"
                animate={{ strokeDashoffset: 125.6 - (125.6 * timeLeft) / 15 }}
               />
             </svg>
             <span className="absolute text-xs font-bold text-slate-700">{timeLeft}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.target.atomicNumber}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="w-full"
          >
            <div className="text-center mb-12">
               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Identify the Element</h3>
               <div className="flex flex-col items-center">
                  {currentQuestion.type === 'symbol-to-name' ? (
                    <div className="text-6xl font-black text-slate-800 tracking-tighter">{currentQuestion.target.symbol}</div>
                  ) : currentQuestion.type === 'name-to-symbol' ? (
                    <div className="text-3xl font-black text-slate-800 tracking-tight uppercase">{currentQuestion.target.name}</div>
                  ) : (
                    <div className="text-5xl font-black text-slate-800">#{currentQuestion.target.atomicNumber}</div>
                  )}
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQuestion.options.map((opt: string) => {
                const isCorrect = opt === currentQuestion.correctAnswer;
                const isSelected = showResult !== null && isCorrect;
                const isWrongSelection = showResult === false && opt !== currentQuestion.correctAnswer;

                return (
                  <motion.button
                    key={opt}
                    whileHover={showResult === null ? { scale: 1.02 } : {}}
                    whileTap={showResult === null ? { scale: 0.98 } : {}}
                    disabled={showResult !== null}
                    onClick={() => handleAnswer(opt)}
                    className={`
                      p-6 rounded-2xl font-bold text-sm transition-all shadow-sm
                      ${showResult === null 
                        ? 'bg-white border border-slate-100 hover:border-blue-200 hover:shadow-md text-slate-700' 
                        : isCorrect 
                          ? 'bg-green-500 text-white border-green-500' 
                          : 'bg-white border-slate-100 text-slate-300'}
                    `}
                  >
                    {opt}
                  </motion.button>
                );
              })}
            </div>

            {showResult !== null && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-center mt-8 font-bold ${showResult ? 'text-green-500' : 'text-red-500'}`}
              >
                {showResult ? (
                   <div className="flex items-center justify-center gap-2">
                     <Zap className="fill-current" /> Perfect! +100pts
                   </div>
                ) : (
                   <div>Incorrect. It was {currentQuestion.correctAnswer}.</div>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Achievement Sneak-peek */}
      <div className="mt-auto bg-white/40 p-4 rounded-3xl border border-white/50 flex items-center gap-4">
         <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
           <Trophy className="w-5 h-5" />
         </div>
         <div className="flex-1">
           <span className="text-[10px] font-bold text-slate-400 uppercase">Latest Achievement</span>
           <h5 className="text-xs font-bold text-slate-700">Quiz Beginner</h5>
         </div>
         <button className="text-[10px] font-bold text-blue-500 pr-2">View All</button>
      </div>
    </div>
  );
}
