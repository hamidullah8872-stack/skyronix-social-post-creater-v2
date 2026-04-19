/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Bot, Search, Command, ArrowRight } from 'lucide-react';

type Mode = 'markhor' | 'syronix' | 'skyronix' | 'general' | null;

interface Option {
  id: Mode;
  title: string;
  description: string;
  icon: typeof Users;
  color: string;
}

const options: Option[] = [
  {
    id: 'markhor',
    title: 'Markhor Talent',
    description: 'Expert matching and talent acquisition.',
    icon: Users,
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'syronix',
    title: 'Syronix AI',
    description: 'Next-generation neural architecture.',
    icon: Bot,
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'skyronix',
    title: 'Skyronix Research',
    description: 'Advanced technological breakthroughs.',
    icon: Search,
    color: 'from-purple-500 to-indigo-600',
  },
  {
    id: 'general',
    title: 'General Mode',
    description: 'Standard operating environment.',
    icon: Command,
    color: 'from-slate-500 to-slate-700',
  },
];

export default function App() {
  const [activeMode, setActiveMode] = useState<Mode>(null);

  const activeOption = options.find(o => o.id === activeMode);

  return (
    <div className="min-h-screen bg-bg-deep text-text-primary font-sleek selection:bg-accent-blue selection:text-white overflow-hidden relative flex flex-col">
      {/* Background Atmosphere - Using the radial gradients from the sleek design */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 100% 100%, rgba(6, 182, 212, 0.08) 0%, transparent 40%)
          `
        }}
      />

      <header className="relative z-10 px-15 pt-10 pb-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-accent-blue to-accent-cyan shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
          <div className="text-2xl font-bold tracking-tight uppercase">Syronix Plattform</div>
        </div>
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <div className="w-2 h-2 bg-[#10b981] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
          System Operational
        </div>
      </header>

      <main className="relative z-10 flex-1 px-15 pb-15">
        <AnimatePresence mode="wait">
          {!activeMode ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="h-full grid grid-cols-2 grid-rows-2 gap-6"
            >
              {options.map((option, index) => (
                <motion.button
                  key={option.id}
                  onClick={() => setActiveMode(option.id)}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
                  whileTap={{ scale: 0.99 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="card group relative p-10 bg-bg-card border border-border-glow rounded-[24px] flex flex-col justify-between items-start text-left backdrop-blur-sm transition-colors overflow-hidden"
                >
                  {/* Styling from the card::before style */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-transparent group-hover:bg-accent-blue/10 transition-colors" />
                  
                  <div className="w-full">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                      <option.icon className={`w-6 h-6 ${
                        option.id === 'markhor' ? 'text-[#f59e0b]' : 
                        option.id === 'syronix' ? 'text-[#8b5cf6]' : 
                        option.id === 'skyronix' ? 'text-[#06b6d4]' : 'text-text-secondary'
                      }`} />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{option.title}</h2>
                    <p className="text-sm text-text-secondary mb-auto">{option.description}</p>
                  </div>

                  <div className="mt-5 text-4xl font-light tracking-tight text-accent-cyan">Hi</div>

                  <div className="absolute bottom-10 right-10 w-8 h-8 rounded-full border border-border-glow flex items-center justify-center opacity-50 group-hover:opacity-100 group-hover:border-white/20 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center text-center p-10"
            >
              <div className="bg-bg-card border border-border-glow p-12 rounded-[32px] backdrop-blur-xl relative overflow-hidden max-w-2xl w-full">
                <div className={`absolute top-0 left-0 w-full h-2 bg-linear-to-r ${activeOption?.color} opacity-50`} />
                <div className="text-[10px] uppercase tracking-[0.2em] text-text-secondary mb-6">
                  {activeOption?.title} // Protocol Initialized
                </div>
                <h2 className="text-8xl font-light tracking-tighter text-accent-cyan mb-8">Hi</h2>
                <div className="h-px w-20 bg-border-glow mx-auto mb-8" />
                <p className="text-text-secondary text-sm font-medium tracking-widest uppercase">
                  Awaiting operational input
                </p>
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setActiveMode(null)}
                className="mt-10 flex items-center gap-2 text-text-secondary hover:text-white transition-colors uppercase text-xs font-bold tracking-[.3em] group"
              >
                <div className="w-6 h-px bg-current group-hover:w-10 transition-all" />
                Return to Node Selection
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
