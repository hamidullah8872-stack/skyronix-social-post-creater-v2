import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ResearchData, ResearchDay } from '../types';
import { Calendar, FileText, Brain, Send, Copy, Check, RefreshCw, LayoutDashboard } from 'lucide-react';

interface Props {
  data: ResearchData;
  onGenerate: (topic: string) => void;
  isProcessing: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function ResearchCreator({ data, onGenerate, isProcessing, containerRef }: Props) {
  const [inputTopic, setInputTopic] = useState(data.topic);
  const [selectedDay, setSelectedDay] = useState<ResearchDay | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[9/16] md:aspect-auto md:min-h-[800px] bg-[#0a0a0a] overflow-hidden flex flex-col font-sans"
      id="research-template"
    >
      {/* Structural Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,#ff4e0011_0%,transparent_50%)]" />
      </div>

      <div className="flex-1 flex flex-col relative p-6 md:p-10 z-10 overflow-hidden">
        {/* Technical Header */}
        <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
             <div className="h-12 w-12 border border-[#ff4e00] rounded-lg flex items-center justify-center bg-[#ff4e00]/5">
               <Brain className="text-[#ff4e00]" size={24} />
             </div>
             <div>
               <h2 className="text-xl font-display font-black text-white tracking-tight -mb-1 lowercase">skyronix <span className="text-[#ff4e00]">research</span></h2>
               <span className="text-[10px] text-white/40 uppercase tracking-[4px] font-bold italic">Strategy Engine v4.0</span>
             </div>
          </div>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full bg-white/5">
             <div className="h-2 w-2 bg-[#ff4e00] rounded-full animate-pulse" />
             <span className="text-[9px] text-white/60 uppercase tracking-widest font-black">Neural Processor Active</span>
          </div>
        </div>

        {/* Input Control Center */}
        <div className="mb-10">
          <div className="relative group">
            <input 
              type="text"
              value={inputTopic}
              onChange={(e) => setInputTopic(e.target.value)}
              placeholder="Enter main topic for 30-day strategy..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-white placeholder:text-white/20 focus:outline-none focus:border-[#ff4e00] transition-all font-display text-lg shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && inputTopic && !isProcessing) {
                  onGenerate(inputTopic);
                }
              }}
            />
            <button 
              onClick={() => onGenerate(inputTopic)}
              disabled={isProcessing || !inputTopic}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-12 w-12 bg-[#ff4e00] rounded-xl flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 disabled:bg-white/10"
            >
              {isProcessing ? <RefreshCw className="animate-spin" size={20} /> : <Send size={20} />}
            </button>
          </div>
          <div className="mt-3 flex items-center gap-4 text-[9px] uppercase tracking-widest font-bold text-white/20 px-2">
             <span className="flex items-center gap-1"><Check size={10} className="text-[#ff4e00]" /> 30-Day Content Matrix</span>
             <span className="flex items-center gap-1"><Check size={10} className="text-[#ff4e00]" /> Human-Written Logic</span>
             <span className="flex items-center gap-1"><Check size={10} className="text-[#ff4e00]" /> Strategic Journey</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col md:flex-row gap-8 overflow-hidden">
          {/* 30-Day Matrix Grid */}
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-10 gap-3">
              {data.plan.length > 0 ? (
                data.plan.map((day) => (
                  <motion.button
                    key={day.day}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: day.day * 0.01 }}
                    onClick={() => setSelectedDay(day)}
                    className={`relative aspect-square rounded-xl border flex flex-col items-center justify-center transition-all group ${
                      selectedDay?.day === day.day 
                        ? 'bg-[#ff4e00] border-[#ff4e00] shadow-[0_0_20px_rgba(255,78,0,0.3)]' 
                        : 'bg-white/5 border-white/10 hover:border-[#ff4e00]/50 hover:bg-[#ff4e00]/5'
                    }`}
                  >
                    <span className={`text-xs font-display font-black ${selectedDay?.day === day.day ? 'text-white' : 'text-white/40 group-hover:text-[#ff4e00]'}`}>
                      {day.day < 10 ? `0${day.day}` : day.day}
                    </span>
                    <div className={`absolute bottom-1 w-1 h-1 rounded-full ${selectedDay?.day === day.day ? 'bg-white' : 'bg-[#ff4e00]/30'}`} />
                  </motion.button>
                ))
              ) : (
                Array.from({ length: 30 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded-xl border border-white/5 bg-white/[0.02] animate-pulse" />
                ))
              )}
            </div>
          </div>

          {/* Context Display Pane */}
          <div className="w-full md:w-96 flex flex-col">
            <AnimatePresence mode="wait">
              {selectedDay ? (
                <motion.div
                  key={selectedDay.day}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 flex flex-col bg-white/5 rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
                >
                  <div className="p-6 border-b border-white/10 bg-white/[0.02]">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-[#ff4e00] text-[10px] font-black uppercase tracking-widest">Phase Analysis • Day {selectedDay.day}</span>
                       <Calendar size={14} className="text-white/20" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-white leading-tight italic">{selectedDay.theme}</h3>
                    <p className="text-[11px] text-white/40 mt-2 font-mono">{selectedDay.idea}</p>
                  </div>
                  
                  <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                     <div className="flex items-center gap-2 mb-4">
                        <FileText size={14} className="text-[#ff4e00]" />
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Social Media Copy</span>
                     </div>
                     <p className="text-sm text-white/80 leading-relaxed font-sans whitespace-pre-wrap">
                        {selectedDay.postContent}
                     </p>
                  </div>

                  <div className="p-4 bg-black/40 border-t border-white/10 flex gap-2">
                     <button 
                       onClick={() => handleCopy(selectedDay.postContent, selectedDay.day)}
                       className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl py-3 flex items-center justify-center gap-2 transition-all text-xs font-bold uppercase tracking-widest"
                     >
                       {copiedId === selectedDay.day ? <Check size={14} className="text-[#ff4e00]" /> : <Copy size={14} />}
                       {copiedId === selectedDay.day ? "Copied" : "Copy Post"}
                     </button>
                  </div>
                </motion.div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-3xl p-10 text-center opacity-40">
                   <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-6">
                      <LayoutDashboard size={24} className="text-white" />
                   </div>
                   <h3 className="text-sm font-display font-bold text-white uppercase tracking-widest mb-2 italic">Select a Unit</h3>
                   <p className="text-[10px] text-white/60 leading-relaxed">
                     Select a tactical day from the content matrix to reveal strategy and generated copy.
                   </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Global Footer Detail */}
        <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
           <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[8px] font-bold text-white/40 uppercase tracking-[2px]">Core Engine</span>
                <span className="text-[10px] font-display font-bold text-white italic">Gemini 3.1 Pro</span>
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div className="flex flex-col">
                <span className="text-[8px] font-bold text-white/40 uppercase tracking-[2px]">Strategy Depth</span>
                <span className="text-[10px] font-display font-bold text-[#ff4e00] italic">High Resolution</span>
              </div>
           </div>
           
           <div className="flex items-center gap-4 text-[9px] font-black text-white/30 italic uppercase tracking-widest">
              Skyronix Global Research & Analytics
           </div>
        </div>
      </div>

      {/* Decorative Scanline Animation */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden mix-blend-overlay">
        <motion.div 
          animate={{ y: ["0%", "100%", "0%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#ff4e00]/50 to-transparent"
        />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 78, 0, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 78, 0, 0.4);
        }
      `}} />
    </div>
  );
}
