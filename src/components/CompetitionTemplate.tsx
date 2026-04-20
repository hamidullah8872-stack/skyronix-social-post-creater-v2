import React from 'react';
import { motion } from 'motion/react';
import { CompetitionData } from '../types';
import { Globe, Phone, Mail, Heart, Facebook, Instagram, Youtube, Linkedin, Trophy, Medal, Star } from 'lucide-react';

interface Props {
  data: CompetitionData;
  containerRef: React.RefObject<HTMLDivElement>;
}

const TikTokIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47l-.02 7.2c.01 1.9-.5 3.86-1.72 5.27-1.47 1.74-3.86 2.62-6.07 2.38-2.73-.31-5.06-2.42-5.63-5.1-.64-3.08 1.05-6.52 4.1-7.51.13-.04.26-.07.39-.1v4.1c-.13.04-.26.07-.39.12-1.28.46-2.26 1.78-2.12 3.19.14 1.41 1.34 2.52 2.74 2.53 1.41.01 2.61-1.1 2.63-2.51.01-1.04-.01-12.87-.01-12.87z" />
  </svg>
);

export default function CompetitionTemplate({ data, containerRef }: Props) {
  const isWinners = data.competitionType === 'winners';
  // Winners only support 1:1 and 4:5. If 9:16 is set, fallback to 1:1 for winners.
  const effectiveRatio = isWinners && data.aspectRatio === '9/16' ? '1/1' : data.aspectRatio;
  const aspectClass = effectiveRatio === '9/16' ? 'aspect-[9/16]' : effectiveRatio === '4/5' ? 'aspect-[4/5]' : 'aspect-square';

  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${aspectClass} ${isWinners ? 'bg-[#003d40]' : 'bg-[#004f55]'} overflow-hidden flex flex-col font-sans transition-all duration-500`}
      id="competition-template"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute inset-0 ${isWinners ? 'bg-gradient-to-br from-[#005c60] to-[#003133]' : 'bg-gradient-to-br from-[#006066] to-[#003d41]'}`} />
        
        {/* Subtle decorative elements */}
        <div className={`absolute top-0 left-0 w-full h-full ${isWinners ? 'bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]' : 'bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05)_0%,transparent_50%)]'}`} />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Top Section - Logo Left, Headings Right/Center */}
      <div className="relative z-10 flex items-start justify-between px-8 pt-8">
        {/* Header with Logo - Red marked area (Top Left) */}
        <div className="flex-shrink-0">
          {data.logo ? (
              <div 
                style={{ width: `${(data.logoSize / 100) * 80}px`, height: `${(data.logoSize / 100) * 80}px` }}
                className="bg-white rounded-full p-1 shadow-2xl flex items-center justify-center border-4 border-[#006066]"
              >
                <img 
                  src={data.logo} 
                  alt="Logo" 
                  className="h-full w-full object-cover rounded-full" 
                  crossOrigin="anonymous" 
                  referrerPolicy="no-referrer" 
                />
              </div>
          ) : (
            <div 
              style={{ width: `${(data.logoSize / 100) * 80}px`, height: `${(data.logoSize / 100) * 80}px` }}
              className={`${isWinners ? 'bg-white/10' : 'bg-white/10'} rounded-full flex items-center justify-center text-white/20`}
            >
              <Globe size={40} />
            </div>
          )}
        </div>

        {/* Headings - Green marked area (Top Center/Right) */}
        <div className="flex-1 text-center pr-12">
          <h3 className={`text-white text-lg md:text-xl font-display font-black tracking-widest uppercase italic ${isWinners ? 'text-white/60' : ''}`}>
            {isWinners ? "WEEKLY COMPETITION" : data.title}
          </h3>
          <h1 className={`${isWinners ? 'text-white' : 'text-gold-primary'} text-5xl md:text-7xl font-sans font-black tracking-tighter uppercase filter drop-shadow-[0_4px_0_rgba(0,0,0,0.3)] -mt-2 leading-none`}>
            {isWinners ? "WINNERS" : data.mainHeading}
          </h1>
          <div className={`${isWinners ? 'bg-white text-[#003d40]' : 'bg-gold-primary text-black'} py-1 px-8 inline-block rounded-lg mt-2 transform -rotate-1 shadow-lg`}>
            <p className="text-[10px] md:text-[11px] font-display font-black tracking-[3px] uppercase">
              {isWinners ? "TOP PERFORMANCE OF THE WEEK" : data.subHeading}
            </p>
          </div>
        </div>
      </div>

      {/* Participants Grid/Winners Box */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-2 overflow-hidden">
        {isWinners ? (
          /* WINNERS LAYOUT: 2 Pictures side by side */
          <div className="flex items-center justify-center gap-12 w-full max-w-4xl">
            {data.participants.slice(0, 2).map((person, idx) => (
              <motion.div 
                key={person.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: idx * 0.2 }}
                className="flex flex-col items-center relative"
              >
                <div className="relative">
                  {/* Badge/Rank */}
                  <div className="absolute -top-4 -right-4 z-20 h-10 w-10 bg-gold-primary rounded-full border-4 border-white shadow-xl flex items-center justify-center text-black font-black text-sm rotate-12">
                    {idx === 0 ? "1st" : "2nd"}
                  </div>

                  {/* Batch/Frame */}
                  <div 
                    style={{ 
                      width: `${(data.participantSize / 100) * 160}px`, 
                      height: `${(data.participantSize / 100) * 160}px` 
                    }}
                    className="bg-white rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative border-8 border-white/30 flex-shrink-0"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 rounded-lg pointer-events-none" />
                    {person.image ? (
                      <img 
                        src={person.image} 
                        alt={person.name} 
                        className="h-full w-full object-cover rounded-lg" 
                        crossOrigin="anonymous" 
                        referrerPolicy="no-referrer" 
                      />
                    ) : (
                      <div className="h-full w-full bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-400 font-black uppercase text-xs italic">Winner Photo</div>
                    )}
                  </div>

                  {/* Trophy/Medal Icon below */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white text-[#006066] p-2 rounded-full shadow-lg border-2 border-[#006066] z-20">
                    {idx === 0 ? <Trophy size={18} /> : <Medal size={18} />}
                  </div>
                </div>

                <div className="mt-8 text-center bg-white/90 backdrop-blur-md px-6 py-2 rounded-xl shadow-xl border border-white/20 min-w-[140px]">
                  <span className="text-[#006066] font-display font-black text-xs md:text-sm uppercase tracking-wider block">
                    {person.name || "TOP TALENT"}
                  </span>
                  <div className="flex items-center justify-center gap-1 mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={8} className="text-gold-primary" fill="currentColor" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* WEEKLY VOTING LAYOUT: Existing grid logic */
          <div 
            className="flex flex-wrap justify-center w-full max-w-5xl"
            style={{ gap: `${data.participantSpacing}px` }}
          >
            {data.participants.map((person, idx) => (
              <motion.div 
                key={person.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center relative"
                style={{ width: `${(data.participantSize / 100) * 112}px` }}
              >
                <div className="relative group">
                  <div 
                    style={{ 
                      width: `${(data.participantSize / 100) * 96}px`, 
                      height: `${(data.participantSize / 100) * 96}px` 
                    }}
                    className="bg-white rounded-full p-1 shadow-2xl relative border-4 border-gold-primary flex-shrink-0 transition-transform duration-300 group-hover:scale-105 mx-auto"
                  >
                    {person.image ? (
                      <img 
                        src={person.image} 
                        alt={person.name} 
                        className="h-full w-full object-cover rounded-full" 
                        crossOrigin="anonymous" 
                        referrerPolicy="no-referrer" 
                      />
                    ) : (
                      <div className="h-full w-full bg-neutral-200 rounded-full flex items-center justify-center text-neutral-400 font-bold uppercase text-[7px] italic">Photo</div>
                    )}
                  </div>
                </div>

                <div className="mt-2 w-full text-center">
                  <span 
                    style={{ fontSize: `${(data.participantSize / 100) * 10}px` }}
                    className="text-white font-display font-black uppercase tracking-tight block truncate bg-black/40 py-1 rounded-md border border-white/10"
                  >
                    {person.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Description and Timer */}
      <div className="relative z-10 text-center px-10 mb-2">
        <div className="max-w-3xl mx-auto space-y-4">
          <p className={`text-xs md:text-sm leading-snug font-bold uppercase italic tracking-wide drop-shadow-sm ${isWinners ? 'text-white' : 'text-white'}`}>
            {isWinners ? "CONGRATULATIONS TO OUR OUTSTANDING TALENTS OF THE WEEK! YOUR HARD WORK AND DEDICATION HAVE PAID OFF." : data.bottomDescription}
          </p>
          
          <div className={`${isWinners ? 'bg-white text-[#006066]' : 'bg-gold-primary text-black'} p-2 md:p-3 rounded-xl shadow-lg transform rotate-1`}>
             <p className="text-[10px] md:text-[11px] font-black uppercase tracking-wider leading-relaxed">
               <span className={`${isWinners ? 'bg-[#006066] text-white' : 'bg-black text-white'} px-2 mr-2`}>IMPORTANT NOTE:</span>
               Remember that the monthly winner will be featured permanently in Markhor Talent cover photo and the monthly nominees will be Top 2 winner of weekly competition
             </p>
          </div>

          <div className="flex justify-center mt-2">
            <div className={`backdrop-blur-md rounded-full px-6 py-2 flex items-center gap-3 border shadow-xl ${isWinners ? 'bg-black/30 border-white/20' : 'bg-white/10 border-white/20'}`}>
              <div className="text-red-500 animate-pulse">
                <Heart size={16} fill="currentColor" />
              </div>
              <span className={`${isWinners ? 'text-white' : 'text-gold-primary'} font-display font-black text-xs md:text-sm uppercase tracking-[3px]`}>
                {isWinners ? "THANK YOU FOR YOUR VOTES!" : data.timerText}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Contact and Social */}
      <div className={`relative z-10 w-full pt-4 pb-6 px-10 flex flex-col items-center gap-4 border-t backdrop-blur-xl ${isWinners ? 'bg-black/40 border-white/20' : 'bg-black/50 border-white/10'}`}>
        <div className="flex flex-wrap items-center justify-center gap-8">
           <div className={`flex items-center gap-2 ${isWinners ? 'text-white' : 'text-gold-primary'}`}>
              <div className={`${isWinners ? 'bg-[#00d1da] text-white' : 'bg-gold-primary text-black'} h-8 w-8 rounded-full flex items-center justify-center`}>
                <Phone size={14} strokeWidth={3} />
              </div>
              <span className="text-white font-sans font-black text-xs md:text-sm tracking-widest">{data.footerPhone}</span>
           </div>
           
           <div className={`flex items-center gap-2 ${isWinners ? 'text-white' : 'text-gold-primary'}`}>
              <div className={`${isWinners ? 'bg-[#00d1da] text-white' : 'bg-gold-primary text-black'} h-8 w-8 rounded-full flex items-center justify-center`}>
                <Mail size={14} strokeWidth={3} />
              </div>
              <span className="text-white font-sans font-black text-xs md:text-sm tracking-widest uppercase">{data.footerEmail}</span>
           </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <span className={`${isWinners ? 'text-white' : 'text-gold-primary'} font-display font-black text-[10px] uppercase tracking-[4px]`}>Follow Us On</span>
          <div className="flex items-center gap-6">
            <div className="text-white hover:text-gold-primary transition-colors cursor-pointer opacity-80 hover:opacity-100">
              <Facebook size={20} fill="currentColor" />
            </div>
            <div className="text-white hover:text-gold-primary transition-colors cursor-pointer opacity-80 hover:opacity-100">
              <Instagram size={20} />
            </div>
            <div className="text-white hover:text-gold-primary transition-colors cursor-pointer opacity-80 hover:opacity-100">
              <TikTokIcon size={20} />
            </div>
            <div className="text-white hover:text-gold-primary transition-colors cursor-pointer opacity-80 hover:opacity-100">
              <Youtube size={20} fill="currentColor" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
