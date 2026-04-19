import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GeneralData } from '../types';
import { Sparkles, User, Bot, Image as ImageIcon, Send, RefreshCw } from 'lucide-react';

interface Props {
  data: GeneralData;
  containerRef: React.RefObject<HTMLDivElement>;
  onSend?: (text: string) => void;
  isProcessing?: boolean;
}

export default function GeneralCreator({ data, containerRef, onSend, isProcessing }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [inputText, setInputText] = useState('');

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [data.messages]);

  const handleSend = () => {
    if (inputText.trim() && onSend && !isProcessing) {
      onSend(inputText.trim());
      setInputText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[4/5] md:aspect-[4/3] bg-[#0c121d] overflow-hidden flex flex-col font-sans border-2 border-white/5 shadow-2xl rounded-[32px]"
      id="general-template"
    >
      {/* Luxurious Background - Consistent with Skyronix style */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c121d] via-[#002a2a] to-[#0c121d]" />
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-gold-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-aqua-primary/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="flex-1 flex flex-col relative p-4 md:p-8 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-aqua-primary to-aqua-primary/50 rounded-xl flex items-center justify-center shadow-lg shadow-aqua-primary/20">
              <Bot className="text-black" size={20} />
            </div>
            <div>
              <h2 className="text-base md:text-lg font-display font-extrabold text-white tracking-tight">SKYRONIX <span className="text-aqua-primary">ASSISTANT</span></h2>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Neural Engine Online</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
             <span className="text-[9px] text-white/30 uppercase tracking-widest font-black">AI Mastermind</span>
             <span className="text-[10px] font-display font-bold text-gold-primary italic">Live Interaction</span>
          </div>
        </div>

        {/* Chat Feed */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-6 pr-2 mb-4 custom-scrollbar"
        >
          <AnimatePresence mode="popLayout">
            {data.messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`h-8 w-8 md:h-9 md:w-9 shrink-0 rounded-full flex items-center justify-center border text-xs ${
                  msg.role === 'user' 
                    ? 'bg-gold-primary shadow-lg shadow-gold-primary/20 text-black border-transparent' 
                    : 'bg-white/5 border-white/10 text-aqua-primary'
                }`}>
                  {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>

                <div className={`flex flex-col gap-2 max-w-[85%] ${msg.role === 'user' ? 'items-end' : ''}`}>
                  <div className={`px-4 py-3 rounded-2xl text-xs md:text-sm leading-relaxed shadow-xl ${
                    msg.role === 'user'
                      ? 'bg-white/10 text-white border border-white/20 rounded-tr-none'
                      : 'bg-white/5 text-white/90 border border-white/10 rounded-tl-none backdrop-blur-md'
                  }`}>
                    {msg.content}
                  </div>

                  {msg.image && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-2 rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 group relative w-full max-w-sm"
                    >
                      <img 
                        src={msg.image} 
                        alt="AI Generation" 
                        className="w-full h-auto" 
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                      />
                      <div className="absolute bottom-2 right-2 p-1.5 bg-black/60 backdrop-blur-md rounded-lg border border-white/10">
                        <ImageIcon className="text-gold-primary" size={14} />
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
            
            {isProcessing && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="h-8 w-8 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-aqua-primary">
                  <RefreshCw className="animate-spin" size={14} />
                </div>
                <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none italic text-[10px] text-white/40">
                  Skyronix is formulating intelligence...
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Direct Input Bar */}
        <div className="shrink-0 relative group">
          <div className="absolute inset-0 bg-aqua-primary/10 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
          <div className="relative flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl p-1.5 focus-within:border-aqua-primary/50 transition-all backdrop-blur-xl">
             <input 
               type="text"
               value={inputText}
               onChange={(e) => setInputText(e.target.value)}
               onKeyDown={handleKeyDown}
               placeholder="Ask anything directly..."
               disabled={isProcessing}
               className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-xs md:text-sm text-white placeholder:text-white/20"
             />
             <button 
               onClick={handleSend}
               disabled={isProcessing || !inputText.trim()}
               className="h-9 w-9 md:h-10 md:w-10 bg-aqua-primary rounded-xl flex items-center justify-center text-black hover:brightness-110 active:scale-90 transition-all disabled:opacity-30 disabled:grayscale"
             >
               <Send size={16} />
             </button>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Bar */}
      <div className="h-1 bg-gradient-to-r from-aqua-primary via-gold-primary to-aqua-primary opacity-20" />
    </div>
  );
}
