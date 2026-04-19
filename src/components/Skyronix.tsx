import React from 'react';
import { motion } from 'motion/react';
import { SkyronixData } from '../types';
import { CheckCircle2, Award, Shield, Gem, Star, Rocket, Check, Lightbulb, Zap, Target, Trophy, Laptop, Globe, TrendingUp, Search, Activity, Cpu } from 'lucide-react';

interface Props {
  data: SkyronixData;
  containerRef: React.RefObject<HTMLDivElement>;
}

const IconMap: Record<string, any> = {
  shield: Shield,
  diamond: Gem,
  star: Star,
  rocket: Rocket,
  check: Check,
  lightbulb: Lightbulb,
  zap: Zap,
  target: Target,
  trophy: Trophy,
  award: Award,
  laptop: Laptop,
  globe: Globe,
  trending: TrendingUp,
  search: Search,
  activity: Activity,
  cpu: Cpu
};

export default function Skyronix({ data, containerRef }: Props) {
  const aspectClass = data.aspectRatio === '9/16' ? 'aspect-[9/16]' : data.aspectRatio === '4/5' ? 'aspect-[4/5]' : 'aspect-square';
  const pointCount = data.points?.length || 0;

  // Smart Grid Logic for professional layout
  const getGridCols = () => {
    if (pointCount <= 1) return 'grid-cols-1 max-w-2xl mx-auto';
    if (pointCount === 2) return 'grid-cols-1 sm:grid-cols-2 max-w-5xl mx-auto';
    if (pointCount === 3) return 'grid-cols-1 sm:grid-cols-3 max-w-6xl mx-auto';
    if (pointCount === 4) return 'grid-cols-1 sm:grid-cols-2 max-w-5xl mx-auto';
    if (pointCount >= 5) return 'grid-cols-2 sm:grid-cols-3 max-w-6xl mx-auto';
    return 'grid-cols-2';
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${aspectClass} bg-[#04080f] overflow-hidden flex flex-col font-sans transition-all duration-500`}
      id="skyronix-template"
    >
      {/* High-End Dynamic Background (Premium Golden & Aqua theme) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Deep Gradient Base */}
        <div className="absolute inset-0 bg-[#060b13]" />
        
        {/* Stronger Dynamic Mesh Glows */}
        <div className="absolute -top-[10%] -right-[10%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(251,191,36,0.3)_0%,transparent_70%)] animate-pulse" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(0,255,255,0.3)_0%,transparent_70%)] animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* High-Impact Beams */}
        <div className="absolute top-0 right-0 w-[600px] h-full bg-gradient-to-l from-gold-primary/15 via-transparent to-transparent opacity-70 rotate-[20deg] translate-x-[20%]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-full bg-gradient-to-r from-aqua-primary/15 via-transparent to-transparent opacity-70 -rotate-[20deg] -translate-x-[20%]" />

        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.15]" style={{ 
          backgroundImage: `linear-gradient(to right, #00f2ff11 1px, transparent 1px), linear-gradient(to bottom, #00f2ff11 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />

        {/* Floating Particle Accents */}
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: 'radial-gradient(circle, #fbbf24 1px, transparent 1px)', 
          backgroundSize: '120px 120px' 
        }} />
      </div>

      {/* Main Content Area: Use a structured flex column to prevent overflow */}
      <div className={`flex-1 w-full px-4 md:px-10 flex flex-col items-center relative z-10 overflow-hidden
        ${data.aspectRatio === '9/16' ? 'pt-20 pb-4 justify-between' : 'pt-12 pb-4 justify-between'}`}>
        
        {/* Heading Section: Proportional scaling */}
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center space-y-2 md:space-y-4 w-full shrink-0"
        >
          <div className="inline-block px-3 py-0.5 rounded-full border border-aqua-primary/30 bg-aqua-primary/5 mb-2">
            <span className="text-[8px] md:text-[10px] font-black tracking-[0.3em] text-aqua-primary uppercase">Neural Output</span>
          </div>
          <h1 className={`font-display font-black leading-[0.9] tracking-tighter uppercase
            ${data.aspectRatio === '9/16' ? 'text-4xl sm:text-7xl md:text-8xl' : 'text-3xl sm:text-5xl md:text-6xl'}
            ${pointCount > 4 ? 'scale-90 md:scale-100' : ''}`}>
            <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              {data.title ? data.title.split(' ')[0] : "AI"}
            </span>{' '}
            <span className="bg-gradient-to-r from-gold-primary via-white to-aqua-primary bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(251,191,36,0.3)] bg-[length:200%_auto] animate-pulse">
              {data.title ? data.title.split(' ').slice(1).join(' ') : "NEURAL INSIGHT"}
            </span>
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-gold-primary to-transparent" />
            <div className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
            <div className="h-[2px] w-12 bg-gradient-to-l from-transparent via-aqua-primary to-transparent" />
          </div>
          <p className={`font-bold text-white/50 max-w-xl mx-auto uppercase tracking-[0.4em] font-display italic
            ${data.aspectRatio === '9/16' ? 'text-[10px] md:text-base' : 'text-[8px] md:text-sm'}`}>
            {data.subHeadline || "High-impact conversion methodology"}
          </p>
        </motion.div>

        {/* Strategic Cards: Dynamically shrink to fit */}
        <div className={`w-full grid gap-3 md:gap-5 transition-all duration-700 items-stretch overflow-hidden flex-1 my-4
          ${!data.points || data.points.length === 0 ? 'hidden' : getGridCols()}`}>
          {data.points?.map((point, index) => {
            const Icon = IconMap[point.iconType] || Shield;
            const isFirst = index % 2 === 0;
            const accentColor = isFirst ? 'text-gold-primary' : 'text-aqua-primary';
            const borderColor = isFirst ? 'border-gold-primary/20' : 'border-aqua-primary/20';
            
            // Adjust card appearance based on point count
            const cardPadding = pointCount > 4 ? 'p-3 md:p-5' : 'p-4 md:p-8';
            const iconSize = pointCount > 4 ? 24 : 36;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`relative rounded-[1.5rem] md:rounded-[2rem] ${cardPadding} bg-black/40 border-2 ${borderColor} backdrop-blur-3xl group overflow-hidden flex flex-col items-center text-center justify-center`}
              >
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
                <div className="relative z-10 flex flex-col items-center space-y-2 md:space-y-3 w-full">
                  <div className={`shrink-0 p-2 md:p-3 rounded-xl bg-white/[0.03] border border-white/10 ${accentColor} shadow-lg`}>
                    <Icon size={iconSize} className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2.5} />
                  </div>
                  <div className="space-y-1 w-full">
                    <h3 className={`font-display font-black uppercase tracking-tight text-white leading-tight
                      ${pointCount > 4 ? 'text-xs md:text-lg' : 'text-sm md:text-2xl'}`}>
                      {point.title}
                    </h3>
                    <div className={`h-1 w-8 mx-auto rounded-full ${isFirst ? 'bg-gold-primary/40' : 'bg-aqua-primary/40'}`} />
                  </div>
                  <p className={`text-white/60 leading-tight font-bold tracking-tight line-clamp-3
                    ${pointCount > 4 ? 'text-[8px] md:text-[11px]' : 'text-[9px] md:text-[13px]'}`}>
                    {point.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary Footer Detail: Fixed Prominence and size constraints */}
        {data.summary && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-5xl relative shrink-0 mb-2"
          >
            <div className="relative bg-[#0c121d]/80 border-2 border-white/10 p-4 md:p-10 rounded-[2rem] md:rounded-[2.5rem] text-center shadow-2xl flex flex-col items-center justify-center overflow-hidden">
               <div className="absolute -top-px left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-primary to-transparent opacity-50" />
               <div className="absolute -bottom-px left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-aqua-primary to-transparent opacity-50" />
               
               <div className="mb-2 text-white/20 uppercase font-black text-[8px] md:text-[10px] tracking-[0.4em]">Strategic Conclusion</div>
               
               <p className={`text-white font-display font-black leading-[1.1] italic tracking-tight uppercase max-w-4xl
                 ${data.aspectRatio === '9/16' ? 'text-xl sm:text-3xl md:text-5xl' : 'text-lg md:text-3xl'}
                 ${pointCount > 4 ? 'scale-95' : ''}`}>
                "{data.summary}"
               </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Profile Signature - The "Always Consistent" Bottom Bar */}
      <div className={`relative z-20 mx-4 md:mx-10 mb-4 md:mb-8 bg-[#0c121d] rounded-[1.5rem] md:rounded-[2.5rem] border-2 border-white/10 flex items-center justify-between shadow-2xl
        ${data.aspectRatio === '9/16' ? 'min-h-[7rem] md:min-h-[10rem] p-4 md:p-8' : 'min-h-[5rem] md:min-h-[7rem] p-3 md:p-6 mb-4'}`}>
        <div className="flex items-center gap-2 md:gap-6 min-w-0 py-1">
          <div className="relative shrink-0">
            {/* Elegant Ring Accents */}
            <div className="absolute inset-[-3px] md:inset-[-6px] rounded-full border border-aqua-primary/30" />
            <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border-2 border-transparent overflow-hidden relative shadow-2xl bg-neutral-800">
              {data.userImage ? (
                <img src={data.userImage} alt={data.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" crossOrigin="anonymous" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[7px] md:text-[10px] text-neutral-500 font-bold uppercase">Photo</div>
              )}
            </div>
            {/* Status Badge */}
            <div className="absolute -bottom-0 -right-0 bg-gold-primary rounded-full p-1 text-black shadow-lg border-2 border-[#0c121d]">
              <CheckCircle2 size={pointCount > 4 ? 8 : 12} className="md:w-4 md:h-4" strokeWidth={4} />
            </div>
          </div>
          
          <div className="flex flex-col min-w-0">
             <div className="flex items-center gap-1">
                <h3 className={`font-display font-black text-white italic tracking-tighter uppercase leading-none whitespace-nowrap
                  ${data.aspectRatio === '9/16' ? 'text-lg md:text-3xl' : 'text-sm md:text-2xl'}`}>
                  {data.name || "Hamid Ullah"}
                </h3>
              <Award size={14} className="text-gold-primary shrink-0 md:w-5 md:h-5" />
             </div>
             <p className={`text-aqua-primary font-black uppercase tracking-tighter opacity-90 leading-tight
                ${data.aspectRatio === '9/16' ? 'text-[8px] md:text-[13px] mt-1' : 'text-[7px] md:text-[11px] mt-0.5'}`}>
                {data.description || "Digital Marketing Expert with Ai integration"}
             </p>
          </div>
        </div>

        {/* Brand Side Branding - Custom Logo Replacement */}
        <div className="flex items-center ml-2 shrink-0">
          {data.brandLogo ? (
            <div className={`w-auto flex items-center justify-center
              ${data.aspectRatio === '9/16' ? 'h-14 md:h-20 max-w-[100px] md:max-w-[150px]' : 'h-10 md:h-14 max-w-[80px] md:max-w-[120px]'}`}>
              <img src={data.brandLogo} alt="Brand" className="h-full w-full object-contain" referrerPolicy="no-referrer" crossOrigin="anonymous" />
            </div>
          ) : (
            <div className="flex flex-col items-end text-right">
               <span className="text-[7px] md:text-[9px] text-white/40 uppercase tracking-[0.3em] font-black opacity-80 mb-0.5">
                 Authorized by
               </span>
               <div className="flex flex-col leading-none">
                 <span className={`text-gold-primary font-display font-black select-none tracking-tighter uppercase whitespace-nowrap
                   ${data.aspectRatio === '9/16' ? 'text-lg md:text-2xl' : 'text-sm md:text-xl'}`}>
                   SKYRONIX
                 </span>
                 <span className={`text-aqua-primary font-black tracking-widest uppercase opacity-80
                   ${data.aspectRatio === '9/16' ? 'text-[7px] md:text-[9px]' : 'text-[6px] md:text-[8px]'}`}>
                   AI Neural
                 </span>
               </div>
            </div>
          )}
          {/* Vertical Separator */}
          <div className={`w-[2px] bg-aqua-primary ml-3 md:ml-4 rounded-full shadow-[0_0_10px_rgba(0,242,255,0.4)]
            ${data.aspectRatio === '9/16' ? 'h-10 md:h-12' : 'h-8 md:h-10'}`} />
        </div>
      </div>
    </div>
  );
}
