import React from 'react';
import { motion } from 'motion/react';
import { SkyronixData } from '../types';
import { CheckCircle2, Award, Shield, Gem, Star, Rocket, Check, Lightbulb } from 'lucide-react';

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
  lightbulb: Lightbulb
};

export default function Skyronix({ data, containerRef }: Props) {
  const aspectClass = data.aspectRatio === '9/16' ? 'aspect-[9/16]' : data.aspectRatio === '4/5' ? 'aspect-[4/5]' : 'aspect-square';

  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${aspectClass} bg-black overflow-hidden flex flex-col font-sans transition-all duration-500`}
      id="skyronix-template"
    >
      {/* High-End Dynamic Background (Golden & Aqua theme) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Deep Gradient Base */}
        <div className="absolute inset-0 bg-[#060b13]" />
        
        {/* Dynamic Mesh Glows */}
        <div className="absolute -top-[20%] -right-[10%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(251,191,36,0.15)_0%,transparent_70%)] animate-pulse" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(0,255,255,0.15)_0%,transparent_70%)] animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Golden Light Beams */}
        <div className="absolute top-0 right-0 w-[400px] h-full bg-gradient-to-l from-gold-primary/5 via-transparent to-transparent opacity-40 rotate-[35deg] translate-x-[50%]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-full bg-gradient-to-r from-aqua-primary/5 via-transparent to-transparent opacity-40 -rotate-[35deg] -translate-x-[50%]" />

        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: `linear-gradient(to right, #ffffff11 1px, transparent 1px), linear-gradient(to bottom, #ffffff11 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />

        {/* Floating Particle Accents */}
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: 'radial-gradient(circle, #00ffff 1px, transparent 1px)', 
          backgroundSize: '60px 60px' 
        }} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-8 md:px-14 pt-10 md:pt-16 pb-6 flex flex-col items-center justify-between relative z-10 overflow-hidden">
        {/* Heading Section: Golden/Aqua Gradient Title */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="text-center space-y-3 mb-6 w-full"
        >
          <h1 className={`font-display font-black leading-[0.95] tracking-tighter uppercase
            ${data.aspectRatio === '9/16' ? 'text-4xl sm:text-6xl md:text-7xl' : 'text-3xl sm:text-5xl md:text-6xl'}`}>
            <span className="text-white drop-shadow-[0_5px_15px_rgba(255,255,255,0.2)]">
              {data.title ? data.title.split(' ')[0] : "AI"}
            </span>{' '}
            <span className="bg-gradient-to-r from-gold-primary via-aqua-primary to-gold-primary bg-clip-text text-transparent drop-shadow-[0_5px_15px_rgba(0,255,255,0.3)] bg-[length:200%_auto] animate-pulse">
              {data.title ? data.title.split(' ').slice(1).join(' ') : "POWERED STRATEGY"}
            </span>
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-gold-primary" />
            <div className="h-1.5 w-1.5 rounded-full bg-aqua-primary animate-ping" />
            <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-aqua-primary" />
          </div>
          <p className="text-[10px] sm:text-base font-bold text-white/60 max-w-xl mx-auto uppercase tracking-[0.3em] font-display italic">
            {data.subHeadline || "Analyzing market neural networks in real-time"}
          </p>
        </motion.div>

        {/* Strategic Cards: Beautified with Gold/Aqua Accents */}
        <div className={`w-full grid gap-4 md:gap-8 transition-all duration-500
          ${!data.points || data.points.length === 0 ? 'hidden' : 
            data.points.length === 1 ? 'grid-cols-1 max-w-xl' : 
            data.points.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-5xl' : 
            data.points.length === 3 ? 'grid-cols-1 sm:grid-cols-3' : 
            'grid-cols-2'}`}>
          {data.points?.map((point, index) => {
            const Icon = IconMap[point.iconType] || Shield;
            const isFirst = index % 2 === 0;
            const accentColor = isFirst ? 'text-gold-primary' : 'text-aqua-primary';
            const borderGlow = isFirst ? 'shadow-[0_0_20px_rgba(251,191,36,0.15)]' : 'shadow-[0_0_20px_rgba(0,255,255,0.15)]';

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-3xl p-6 md:p-8 bg-white/[0.03] border border-white/10 backdrop-blur-xl group hover:border-white/20 transition-all ${borderGlow}`}
              >
                {/* Visual Connector */}
                <div className={`absolute -top-px left-[20%] w-[30%] h-[2px] bg-gradient-to-r from-transparent ${isFirst ? 'to-gold-primary' : 'to-aqua-primary'} to-transparent`} />
                
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`p-4 rounded-2xl bg-white/[0.05] border border-white/5 ${accentColor} transition-transform group-hover:scale-110 group-hover:rotate-12`}>
                    <Icon size={32} strokeWidth={2.5} />
                  </div>
                  <div className="space-y-2">
                    <h3 className={`font-display font-black uppercase text-lg md:text-2xl tracking-tighter ${accentColor}`}>
                      {point.title}
                    </h3>
                    <div className={`h-1 w-8 mx-auto rounded-full ${isFirst ? 'bg-gold-primary/20' : 'bg-aqua-primary/20'}`} />
                    <p className="text-[10px] md:text-sm text-white/50 leading-relaxed font-medium">
                      {point.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary Footer Detail */}
        {data.summary && (
          <motion.div
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            className="w-full max-w-4xl relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gold-primary/10 via-aqua-primary/10 to-gold-primary/10 blur-2xl opacity-50" />
            <div className="relative bg-black/40 border border-white/10 p-5 md:p-8 rounded-[2rem] text-center shadow-2xl overflow-hidden group">
               {/* Animated side borders */}
               <div className="absolute top-0 left-0 w-1 h-full bg-gold-primary shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
               <div className="absolute top-0 right-0 w-1 h-full bg-aqua-primary shadow-[0_0_15px_rgba(0,255,255,0.5)]" />
               
               <p className="text-white font-display font-black text-xl md:text-2xl leading-tight italic tracking-tight">
                "{data.summary}"
               </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Profile Signature - The "Always Consistent" Bottom Bar */}
      <div className="relative z-20 mx-4 md:mx-10 mb-6 md:mb-10 min-h-[7rem] md:min-h-[10rem] h-auto bg-[#0c121d] rounded-[2rem] md:rounded-[2.5rem] border-2 border-white/10 p-4 md:p-8 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3 md:gap-6 min-w-0 py-1 md:py-2">
          <div className="relative shrink-0">
            {/* Elegant Ring Accents */}
            <div className="absolute inset-[-4px] md:inset-[-6px] rounded-full border border-aqua-primary/30" />
            <div className="absolute inset-[-2px] md:inset-[-3px] rounded-full border-2 border-gold-primary rotate-45" />
            <div className="w-14 h-14 md:w-24 md:h-24 rounded-full border-4 border-transparent overflow-hidden relative shadow-2xl bg-neutral-800">
              {data.userImage ? (
                <img src={data.userImage} alt={data.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" crossOrigin="anonymous" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[8px] md:text-[10px] text-neutral-500 font-bold uppercase">Photo</div>
              )}
            </div>
            {/* Status Badge */}
            <div className="absolute -bottom-1 -right-1 bg-gold-primary rounded-full p-1 md:p-2 text-black shadow-lg border-2 border-[#0c121d]">
              <CheckCircle2 size={10} className="md:w-4 md:h-4" strokeWidth={4} />
            </div>
          </div>
          
          <div className="flex flex-col min-w-0">
             <div className="flex items-center gap-1 md:gap-2">
                <h3 className="text-lg md:text-3xl font-display font-black text-white italic tracking-tighter uppercase leading-none whitespace-nowrap">
                  {data.name || "Hamid Ullah"}
                </h3>
              <Award size={16} className="text-gold-primary shrink-0 md:w-6 md:h-6" />
             </div>
             <p className="text-aqua-primary font-black text-[8px] md:text-[13px] uppercase tracking-tighter mt-1 md:mt-2 opacity-90 leading-tight">
                {data.description || "Digital Marketing Expert with Ai integration"}
             </p>
          </div>
        </div>

        {/* Brand Side Branding - Custom Logo Replacement */}
        <div className="flex items-center ml-4 shrink-0">
          {data.brandLogo ? (
            <div className="h-16 md:h-24 w-auto max-w-[120px] md:max-w-[150px] flex items-center justify-center">
              <img src={data.brandLogo} alt="Brand" className="h-full w-full object-contain" referrerPolicy="no-referrer" crossOrigin="anonymous" />
            </div>
          ) : (
            <>
              <div className="flex flex-col items-end text-right">
                 <span className="text-[8px] md:text-[10px] text-white/40 uppercase tracking-[0.4em] font-black opacity-80 mb-1">
                   Authorized by
                 </span>
                 <div className="flex flex-col leading-none">
                   <span className="text-gold-primary font-display font-black text-xl md:text-2xl select-none tracking-tighter uppercase whitespace-nowrap">
                     SKYRONIX
                   </span>
                   <span className="text-aqua-primary text-[8px] md:text-[10px] font-black tracking-widest uppercase opacity-80">
                     Artificial Intelligence
                   </span>
                 </div>
              </div>
            </>
          )}
          {/* Vertical Separator */}
          <div className="w-[3px] h-12 bg-aqua-primary ml-4 md:ml-5 rounded-full shadow-[0_0_10px_rgba(0,242,255,0.4)]" />
        </div>
      </div>
    </div>
  );
}
