import React from 'react';
import { motion } from 'motion/react';
import { CompetitionData } from '../types';
import { Globe, Phone, Mail, Heart } from 'lucide-react';

interface Props {
  data: CompetitionData;
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function CompetitionTemplate({ data, containerRef }: Props) {
  const aspectClass = data.aspectRatio === '9/16' ? 'aspect-[9/16]' : data.aspectRatio === '4/5' ? 'aspect-[4/5]' : 'aspect-square';

  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${aspectClass} bg-[#004f55] overflow-hidden flex flex-col font-sans transition-all duration-500`}
      id="competition-template"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#006066] to-[#003d41]" />
        
        {/* Subtle decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05)_0%,transparent_50%)]" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Header with Logo */}
      <div className="relative z-10 flex flex-col items-center pt-6 pb-2">
        {data.logo ? (
            <div className="h-14 md:h-16 w-auto bg-white rounded-b-2xl px-6 py-2 shadow-lg -mt-6 flex items-center justify-center border-x border-b border-white/20">
              <img src={data.logo} alt="Logo" className="h-full object-contain" crossOrigin="anonymous" referrerPolicy="no-referrer" />
            </div>
        ) : (
          <div className="h-12 w-24 bg-white/10 rounded-b-2xl -mt-6 backdrop-blur-sm" />
        )}
      </div>

      {/* Headings */}
      <div className="relative z-10 text-center px-4 mt-6">
        <h3 className="text-white/80 text-xl md:text-2xl font-display font-medium tracking-widest uppercase italic">
          {data.title}
        </h3>
        <h1 className="text-gold-primary text-4xl md:text-6xl font-sans font-black tracking-tighter uppercase filter drop-shadow-[0_4px_0_rgba(0,0,0,0.3)] mt-1">
          {data.mainHeading}
        </h1>
        <div className="bg-black/40 backdrop-blur-md text-white py-1.5 px-6 inline-block rounded-lg mt-3 border border-white/10">
          <p className="text-xs md:text-sm font-display font-bold tracking-widest uppercase">
            {data.subHeading}
          </p>
        </div>
      </div>

      {/* Participants Grid - Fixed 4 columns horizontally as requested */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-4 overflow-hidden">
        <div className="grid grid-cols-4 gap-x-2 md:gap-x-6 gap-y-8 w-full max-w-5xl justify-items-center">
          {data.participants.map((person, idx) => (
            <motion.div 
              key={person.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center relative w-full"
            >
              <div className="relative">
                {/* White circle frame */}
                <div className="h-16 w-16 sm:h-20 sm:w-20 md:h-28 md:w-28 bg-white rounded-full p-1 shadow-2xl overflow-hidden relative border-2 border-white/20 flex-shrink-0">
                  {person.image ? (
                    <img 
                      src={person.image} 
                      alt={person.name} 
                      className="h-full w-full object-cover rounded-full" 
                      crossOrigin="anonymous" 
                      referrerPolicy="no-referrer" 
                    />
                  ) : (
                    <div className="h-full w-full bg-neutral-200 rounded-full flex items-center justify-center text-neutral-400 font-bold uppercase text-[7px]">Photo</div>
                  )}
                </div>
              </div>

              {/* Name exactly at the bottom */}
              <div className="mt-2 w-full text-center">
                <span className="text-white font-display font-black text-[8px] sm:text-[10px] md:text-sm uppercase tracking-tight block truncate">
                  {person.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Description and Timer */}
      <div className="relative z-10 text-center px-8 mb-4">
        <div className="max-w-2xl mx-auto space-y-3">
          <p className="text-white/60 text-[10px] md:text-xs leading-relaxed font-medium">
            {data.bottomDescription}
          </p>
          
          <div className="bg-gold-primary/10 border border-gold-primary/30 p-2 md:p-3 rounded-xl backdrop-blur-sm">
             <p className="text-gold-primary text-[9px] md:text-[11px] font-bold uppercase tracking-wider leading-relaxed">
               <span className="text-white font-black underline mr-1">IMPORTANT NOTE:</span>
               Remember that the monthly winner will be featured permanently in Markhor Talent cover photo and the monthly nominees will be Top 2 winner of weekly competition
             </p>
          </div>

          <div className="flex justify-center mt-4">
            <div className="bg-white/10 backdrop-blur-md rounded-full px-5 py-1.5 flex items-center gap-2 border border-white/20 shadow-xl">
              <div className="text-red-500 animate-pulse">
                <Heart size={14} fill="currentColor" />
              </div>
              <span className="text-gold-primary font-display font-black text-[10px] uppercase tracking-[2px]">
                {data.timerText}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Contact - Removed Website and Email as requested */}
      <div className="relative z-10 bg-black/30 w-full py-3 px-10 flex items-center justify-center border-t border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3 text-gold-primary">
           <Phone size={18} strokeWidth={2.5} />
           <span className="text-white font-sans font-bold text-xs tracking-wider">{data.footerPhone}</span>
        </div>
      </div>
    </div>
  );
}
