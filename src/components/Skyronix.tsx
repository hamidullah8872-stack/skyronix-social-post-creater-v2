import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SkyronixData } from '../types';
import { 
  Zap, 
  Target, 
  Cpu, 
  ArrowRight, 
  Sparkles,
  Layout,
  Layers,
  Bot,
  CheckCircle2,
  Star,
  Quote,
  MoreHorizontal,
  Flame,
  Award,
  Compass,
  Lightbulb,
  Rocket,
  ShieldCheck,
  TrendingUp,
  Brain
} from 'lucide-react';

interface Props {
  data: SkyronixData;
  containerRef: React.RefObject<HTMLDivElement>;
}

const GOLD = "#FFD700"; // Rich Gold
const AQUA = "#00CFC8"; // Vibrant Aqua
const BRIGHT_AQUA = "#00FFFF";
const DARK_AQUA = "#008B8B";
const DEEP_BLACK = "#04080F";

const ICONS = [Target, Zap, Cpu, Sparkles, Flame, Award, Compass, Lightbulb, Rocket, ShieldCheck, TrendingUp, Brain];

export default function Skyronix({ data, containerRef }: Props) {
  const aspectClass = data.aspectRatio === '9/16' ? 'aspect-[9/16]' : data.aspectRatio === '4/5' ? 'aspect-[4/5]' : 'aspect-square';

  // Helper to get a random-ish but consistent icon based on index or title
  const getIcon = (index: number, title: string) => {
    const IconNode = ICONS[index % ICONS.length];
    return <IconNode className="w-full h-full" />;
  };

  // Branding Section - Highly professional and compact
  const Branding = () => (
    <div className="absolute bottom-[3%] left-1/2 -translate-x-1/2 w-[94%] z-50">
      <div className="flex items-center justify-between px-6 py-2 md:py-3 rounded-2xl bg-black/80 backdrop-blur-3xl border border-white/5 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 p-0.5 overflow-hidden bg-neutral-900" style={{ borderColor: GOLD }}>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop" 
                alt="Hamid Ullah" 
                className="w-full h-full rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="text-white font-black text-[9px] md:text-xs uppercase tracking-tight leading-none truncate">Hamid Ullah</div>
            <div className="text-[6px] md:text-[8px] font-black uppercase tracking-[0.1em] mt-1 truncate" style={{ color: BRIGHT_AQUA }}>Digital Marketing Strategist</div>
          </div>
        </div>
        <div className="flex flex-col items-end shrink-0">
           <div className="font-black text-[9px] md:text-sm italic tracking-tighter leading-none" style={{ color: GOLD }}>SKYRONIX.AI</div>
           <div className="text-white/30 text-[5px] md:text-[6px] font-bold uppercase tracking-[0.4em] mt-0.5">ELITE ENGINE</div>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${aspectClass} bg-[${AQUA}] overflow-hidden flex flex-col font-sans transition-all duration-500 shrink-0`}
      id="skyronix-template"
      style={{ backgroundColor: AQUA }}
    >
      {/* Dynamic Professional Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{ 
          background: `linear-gradient(135deg, ${AQUA}, ${DARK_AQUA})` 
        }} />
        
        {/* Subtle Luxury Overlays */}
        <div className="absolute top-[-10%] right-[-5%] w-[80%] h-[80%] opacity-30 blur-[120px]" style={{ background: GOLD }} />
        <div className="absolute bottom-[-5%] left-[-5%] w-[60%] h-[60%] opacity-20 blur-[100px]" style={{ background: BRIGHT_AQUA }} />
        
        {/* Grid for Technical Blueprint feel */}
        <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        
        {/* Dark Vignette for focus */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.1) 100%)' }} />
      </div>

      <div className="relative z-20 flex-1 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={data.layoutStyle}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col"
          >
            {data.layoutStyle === 'card' && <LayoutList data={data} getIcon={getIcon} />}
            {data.layoutStyle === 'split' && <LayoutList data={data} getIcon={getIcon} />}
            {data.layoutStyle === 'center' && <LayoutList data={data} getIcon={getIcon} />}
            {data.layoutStyle === 'dashboard' && <LayoutList data={data} getIcon={getIcon} />}
            {data.layoutStyle === 'notebook' && <LayoutList data={data} getIcon={getIcon} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <Branding />
    </div>
  );
}

// --- New Strategic List Layout (Optimized for 4:5 and Aqua/Gold) ---

const LayoutList = ({ data, getIcon }: { data: SkyronixData, getIcon: (i: number, t: string) => React.ReactNode }) => (
  <div className="flex-1 flex flex-col p-6 md:p-10 space-y-6 md:space-y-8 relative h-full">
    <div className="space-y-3 max-w-4xl text-center md:text-left shrink-0">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-lg"
      >
         <Bot size={12} style={{ color: BRIGHT_AQUA }} />
         <span className="text-[9px] md:text-[10px] font-black text-white/80 tracking-[0.3em] uppercase">Intelligence Node</span>
      </motion.div>
      
      <h1 className="text-3xl md:text-5xl font-black leading-[0.95] tracking-tight uppercase italic drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]" style={{ color: GOLD }}>
        {data.hook}
      </h1>
    </div>

    <div className="flex-1 flex flex-col justify-center gap-3 md:gap-4 overflow-hidden py-2">
       {data.points.slice(0, 4).map((point, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * (i + 1) }}
            className="flex items-stretch gap-3 md:gap-4 group relative"
          >
            <div className="shrink-0 w-12 md:w-16 rounded-2xl bg-black/60 border border-white/10 flex flex-col items-center justify-center space-y-1.5 transition-all duration-300 group-hover:border-gold-primary">
               <div className="w-6 h-6 md:w-7 md:h-7" style={{ color: GOLD }}>{getIcon(i, point.title)}</div>
               <span className="text-[8px] font-black opacity-40 text-white">#0{i+1}</span>
            </div>
            
            <div className="flex-1 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] bg-black/40 backdrop-blur-3xl border border-white/5 shadow-2xl group-hover:bg-black/60 transition-all flex flex-col justify-center min-h-0">
               <h3 className="text-base md:text-lg font-black uppercase italic leading-none mb-2" style={{ color: GOLD }}>{point.title}</h3>
               <p className="font-bold text-[10px] md:text-xs leading-tight tracking-tight italic" style={{ color: `${GOLD}CC` }}>
                 {point.description}
               </p>
            </div>
          </motion.div>
       ))}
    </div>

    <div className="flex items-center justify-between pt-4 border-t border-white/10 flex-none bg-transparent">
       <div className="flex items-center gap-3">
          <span className="text-white/40 text-[8px] font-black uppercase tracking-[0.2em] italic">Elite Visual Strategy</span>
       </div>

       <motion.button 
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.95 }}
         className="px-6 py-2.5 rounded-full text-black font-black uppercase tracking-widest text-[9px] md:text-[10px] shadow-2xl flex items-center gap-2 group"
         style={{ backgroundColor: GOLD }}
       >
         {data.cta || "GO ELITE"}
         <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
       </motion.button>
    </div>
    
    <div className="h-10 md:h-12 w-full shrink-0" /> {/* Spacer for Branding */}
  </div>
);

const LayoutSplit = ({ data }: { data: SkyronixData }) => (
  <div className="flex-1 flex flex-col md:flex-row h-full">
    {/* Comparison Side A */}
    <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-10 md:p-20 bg-[#04080f] relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-tr from-gold-primary/10 to-transparent opacity-50" />
      
      <div className="relative z-10 space-y-12 w-full max-w-sm text-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="inline-block px-4 py-1 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] text-white/30 italic">Perspective Alpha</div>
          <h2 className="text-6xl md:text-8xl font-black text-white italic uppercase leading-[0.8] tracking-tighter drop-shadow-2xl">{data.hook.split(' ')[0] || 'BEFORE'}</h2>
        </motion.div>

        <div className="space-y-6">
           {data.points.slice(0, 2).map((point, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[3rem] bg-white/5 border border-white/5 backdrop-blur-xl group-hover:bg-white/10 transition-colors"
              >
                 <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-3" style={{ color: GOLD }}>Option 01</div>
                 <h3 className="font-black text-xl uppercase italic leading-none mb-3 text-white">{point.title}</h3>
                 <p className="text-white/40 text-xs font-bold leading-tight">{point.description}</p>
              </motion.div>
           ))}
        </div>
      </div>

      <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-40 hidden md:flex items-center justify-center">
         <div className="w-[2px] h-[400px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
         <div className="absolute w-24 h-24 rounded-full bg-black border-[6px] border-[#04080f] shadow-[0_0_50px_rgba(212,175,55,0.3)] flex items-center justify-center">
            <div className="absolute inset-2 rounded-full border-2 border-white/10" />
            <span className="relative font-black text-3xl italic text-white uppercase tracking-tighter" style={{ color: GOLD }}>VS</span>
         </div>
      </div>
    </div>

    {/* Comparison Side B */}
    <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-10 md:p-20 bg-[#06101a] relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-bl from-aqua-primary/10 to-transparent opacity-50" />
      
      <div className="relative z-10 space-y-12 w-full max-w-sm text-center">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="inline-block px-4 py-1 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] text-white/30 italic">Strategic Result</div>
          <h2 className="text-6xl md:text-8xl font-black text-white italic uppercase leading-[0.8] tracking-tighter drop-shadow-2xl" style={{ color: AQUA }}>{data.hook.split(' ')[1] || 'RESULT'}</h2>
        </motion.div>

        <div className="space-y-6">
           {data.points.slice(2, 4).map((point, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="p-8 rounded-[3rem] bg-white/5 border border-white/5 backdrop-blur-xl group-hover:bg-white/10 transition-colors"
              >
                 <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-3" style={{ color: AQUA }}>Phase 02</div>
                 <h3 className="font-black text-xl uppercase italic leading-none mb-3 text-white">{point.title}</h3>
                 <p className="text-white/40 text-xs font-bold leading-tight">{point.description}</p>
              </motion.div>
           ))}
        </div>
      </div>
    </div>
  </div>
);

const LayoutCenter = ({ data, getIcon }: { data: SkyronixData, getIcon: (i: number, t: string) => React.ReactNode }) => (
  <div className="flex-1 flex flex-col items-center justify-center p-10 md:p-20 text-center relative overflow-hidden">
    {/* Floating Orbs - More dynamic like Image 2 */}
    <div className="absolute top-[20%] left-[10%] w-32 h-32 blur-3xl opacity-20 rounded-full bg-[#D4AF37] animate-pulse" />
    <div className="absolute bottom-[20%] right-[10%] w-64 h-64 blur-3xl opacity-10 rounded-full bg-[#00CFC8] animate-pulse" style={{ animationDelay: '2s' }} />

    <div className="relative z-10 space-y-16 max-w-5xl">
      <div className="flex flex-col items-center space-y-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-20 h-20 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center"
        >
           <Sparkles size={32} style={{ color: GOLD }} />
        </motion.div>
        
        <div className="space-y-2">
          <span className="text-[12px] font-black uppercase tracking-[0.8em] italic opacity-50" style={{ color: AQUA }}>Neural Executive Post</span>
          <h1 className="text-6xl md:text-[8rem] font-black text-white leading-[0.8] tracking-tighter uppercase italic drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            {data.hook}
          </h1>
        </div>

        <div className="w-1/3 h-[4px] rounded-full" style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
        {data.points.slice(0, 4).map((point, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center space-y-6 max-w-[320px] group"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-[2.5rem] border-2 border-white/10 bg-black/40 backdrop-blur-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:border-white/30 transition-all duration-500">
              <div className="w-10 h-10 md:w-12 md:h-12" style={{ color: i % 2 === 0 ? AQUA : GOLD }}>
                {getIcon(i, point.title)}
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-black text-lg md:text-xl uppercase tracking-widest italic" style={{ color: GOLD }}>{point.title}</h3>
              <p className="text-white/40 text-xs md:text-sm font-bold tracking-tight leading-relaxed max-w-[240px] uppercase italic">{point.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const LayoutDashboard = ({ data, getIcon }: { data: SkyronixData, getIcon: (i: number, t: string) => React.ReactNode }) => (
  <div className="flex-1 flex flex-col p-8 md:p-14 space-y-10 md:space-y-16">
    <div className="flex items-center justify-between border-b border-white/5 pb-8">
      <div className="flex flex-col">
        <h2 className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mb-2 italic">Neural Matrix Integration</h2>
        <div className="flex items-center gap-3">
           <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
           <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500/50" />
           <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500/50" />
           <span className="text-white font-black text-sm md:text-xl italic tracking-tighter uppercase pl-4 border-l border-white/10 ml-4 truncate">Architecture v.4.0.2</span>
        </div>
      </div>
      <div className="flex gap-2 md:gap-4 shrink-0">
         <div className="p-2 md:p-3 rounded-2xl bg-white/5 border border-white/10"><Sparkles size={20} style={{ color: GOLD }} /></div>
         <div className="p-2 md:p-3 rounded-2xl bg-white/5 border border-white/10"><MoreHorizontal size={20} className="text-white/40" /></div>
      </div>
    </div>

    <div className="flex-1 flex flex-col justify-center gap-12 md:gap-16">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-10">
        <div className="space-y-4 max-w-3xl">
          <span className="font-black text-[10px] md:text-xs uppercase tracking-[0.4em] px-4 py-1.5 rounded-full border border-white/10 bg-white/5" style={{ color: AQUA }}>Intelligent Analytics</span>
          <h1 className="text-4xl md:text-8xl font-black text-white leading-[0.8] tracking-tighter uppercase italic">{data.hook}</h1>
        </div>
        <div className="w-full md:w-64 h-28 md:h-32 p-6 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex flex-col justify-between shrink-0">
           <div className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">Efficiency Rating</div>
           <div className="flex items-end gap-2">
              <span className="text-white font-black text-4xl md:text-5xl italic tracking-tighter leading-none">98.4<span className="text-lg opacity-40">%</span></span>
              <div className="flex gap-1 pb-1">
                 {[1,2,3,4].map(i => <div key={i} className="w-1 md:w-1.5 h-4 md:h-6 rounded-full" style={{ backgroundColor: AQUA, opacity: i * 0.25 }} />)}
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {data.points.slice(0, 3).map((point, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + (i * 0.1) }}
            className="p-8 rounded-[2.5rem] bg-black/60 border border-white/5 relative group overflow-hidden hover:border-white/20 transition-all duration-500"
          >
            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity translate-x-4 group-hover:translate-x-0 group-hover:rotate-12 transition-all duration-500">
               <div className="w-20 h-20">{getIcon(i, point.title)}</div>
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 flex items-center justify-between" style={{ color: GOLD }}>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full" style={{ backgroundColor: GOLD }} />
                 Pillar 0{i+1}
               </div>
               <div className="w-6 h-6 grayscale opacity-20">{getIcon(i, point.title)}</div>
            </div>
            <h3 className="text-white font-black text-xl md:text-2xl leading-[1.1] uppercase italic mb-4">{point.title}</h3>
            <p className="text-white/40 text-xs md:text-sm font-bold tracking-tight leading-relaxed max-w-xs">{point.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const LayoutNotebook = ({ data }: { data: SkyronixData }) => (
  <div className="flex-1 flex flex-col bg-[#f0f2f5] relative overflow-hidden shrink-0">
    {/* Real Binder Texture - inspired by Image 4 */}
    <div className="absolute left-0 top-0 h-full w-[80px] z-30 bg-neutral-200/50 border-r border-black/5 shadow-2xl pointer-events-none" />
    
    <div className="absolute left-6 top-0 h-full w-4 z-40 flex flex-col justify-around py-10 pointer-events-none">
       {[...Array(15)].map((_, i) => (
          <div key={i} className="w-10 h-10 -translate-x-1/2 relative bg-neutral-200">
             <div className="absolute inset-0 bg-gradient-to-r from-neutral-400 via-neutral-100 to-neutral-400 rounded-lg shadow-xl border border-neutral-300" />
             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full shadow-inner" />
          </div>
       ))}
    </div>

    {/* Enhanced Paper Overlay */}
    <div className="absolute inset-0 z-0 bg-[#fdfdfd] shadow-inner" style={{ 
      backgroundImage: `linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)`, 
      backgroundSize: '30px 30px' 
    }} />
    
    <div className="relative z-10 flex-1 flex flex-col pl-28 pr-12 md:pr-20 py-16 space-y-16 shrink-0 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="space-y-2">
           <h2 className="text-neutral-400 font-black text-xs uppercase tracking-[0.6em] italic">Strategic Analysis Guide</h2>
           <div className="flex items-center gap-3">
              <div className="w-12 h-1 rounded-full" style={{ backgroundColor: GOLD }} />
              <span className="text-neutral-900 font-black text-sm uppercase italic tracking-tighter">System ID: 8872.X</span>
           </div>
        </div>
        <div className="flex items-center gap-6">
           <div className="text-neutral-300 font-black text-[10px] uppercase tracking-widest italic">Confidential Neural Stream</div>
           <div className="p-3 rounded-2xl bg-neutral-100 border border-neutral-200"><Target size={20} className="text-neutral-400" /></div>
        </div>
      </motion.div>

      <div className="flex-1 shrink-0 overflow-hidden space-y-16">
        <motion.h1 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-6xl md:text-[7.5rem] font-black text-neutral-900 leading-[0.8] tracking-tighter uppercase italic drop-shadow-sm pb-4 border-b-4 border-neutral-100 inline-block"
        >
          {data.hook}
        </motion.h1>

        <div className="space-y-10 max-w-4xl">
          {data.points.slice(0, 4).map((point, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="flex gap-10 group"
            >
              <div className="shrink-0 flex items-center justify-center w-16 h-16 rounded-[2rem] border-4 shadow-2xl group-hover:scale-110 transition-transform bg-white relative" style={{ color: AQUA, borderColor: AQUA }}>
                 <CheckCircle2 size={32} />
                 <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] font-black">{i+1}</div>
              </div>
              <div className="space-y-3 flex-1">
                <h3 className="font-black text-2xl md:text-3xl uppercase tracking-tighter italic leading-none" style={{ color: GOLD }}>{point.title}</h3>
                <p className="text-neutral-500 text-sm md:text-lg font-medium tracking-tight leading-relaxed border-l-2 border-neutral-100 pl-6 italic">{point.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex items-end justify-between pt-10">
        <div className="flex flex-col gap-4">
           <div className="flex gap-2">
             {[1,2,3,4,5].map(i => <div key={i} className="w-8 h-1 rounded-full bg-neutral-200" style={{ backgroundColor: i < 4 ? AQUA : undefined }} />)}
           </div>
           <h4 className="text-neutral-900 font-black text-2xl md:text-3xl italic tracking-tight uppercase leading-none">{data.cta}</h4>
        </div>
        <div className="w-20 h-20 rounded-[2.5rem] border-4 flex items-center justify-center transition-all bg-white shadow-2xl hover:scale-110 cursor-pointer" style={{ borderColor: AQUA, color: AQUA }}>
           <ArrowRight size={36} className="stroke-[3]" />
        </div>
      </div>
    </div>
  </div>
);
