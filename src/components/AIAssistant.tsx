/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Sparkles, X } from 'lucide-react';
import { askChemistryTeacher } from '../services/aiService';
import { cn } from '../lib/utils';
import { useElementStore } from '../store/useElementStore';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIAssistant() {
  const { selectedElement } = useElementStore();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm your Chemistry Teacher AI. Ask me anything about elements or chemical reactions! 🧪" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const context = selectedElement ? `${selectedElement.name} (${selectedElement.symbol})` : "General Periodic Table";
    const reply = await askChemistryTeacher(userMessage, context);

    setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/20">
      <div className="p-6 pb-2">
         <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
           <Sparkles className="text-blue-500" size={20} />
           Ask Teacher
         </h2>
         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
           Powered by Gemini 3
         </p>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-4"
      >
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex gap-3 max-w-[85%]",
              m.role === 'user' ? "ml-auto flex-row-reverse" : ""
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
              m.role === 'user' ? "bg-slate-800 text-white" : "bg-white text-blue-500"
            )}>
              {m.role === 'user' ? <User size={14} /> : <Sparkles size={14} />}
            </div>
            <div className={cn(
              "p-4 rounded-2xl text-xs font-medium leading-relaxed shadow-sm",
              m.role === 'user' ? "bg-blue-600 text-white rounded-tr-none" : "bg-white text-slate-700 rounded-tl-none border border-slate-50"
            )}>
              {m.content}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex gap-3 max-w-[85%]">
            <div className="w-8 h-8 rounded-xl bg-white text-blue-500 flex items-center justify-center shrink-0 border border-slate-50">
              <Sparkles size={14} className="animate-spin" />
            </div>
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-50 flex gap-1">
               <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce" />
               <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
               <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white border-t border-slate-100 flex gap-2">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about a reaction or element..."
          className="flex-1 bg-slate-50 border-none outline-none px-4 py-3 rounded-xl text-xs font-medium text-slate-700 placeholder:text-slate-300"
        />
        <button 
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="w-10 h-10 bg-slate-800 text-white rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition-transform disabled:opacity-30"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
