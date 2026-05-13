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

const LaurelWreath = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M50,90 C30,90 10,70 10,40 C10,30 15,20 25,15 L30,25 C25,28 22,35 22,40 C22,65 35,80 50,80 C65,80 78,65 78,40 C78,35 75,28 70,25 L75,15 C85,20 90,30 90,40 C90,70 70,90 50,90 Z" opacity="0.3" />
    <path d="M35,20 L30,10 L20,15 L25,25 Z M25,40 L15,35 L10,45 L20,50 Z M30,60 L20,65 L25,75 L35,70 Z M70,10 L65,20 L75,25 L80,15 Z M85,35 L75,40 L80,50 L90,45 Z M80,65 L70,60 L65,70 L75,75 Z" />
  </svg>
);

const CertificateDecorations = ({ aqua }: { aqua: string }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Large Elegant Swishes like the reference image */}
    <motion.svg 
      viewBox="0 0 800 800" 
      className="absolute -top-40 -right-40 w-[140%] h-[140%] "
      initial={{ rotate: -15, opacity: 0 }}
      animate={{ rotate: 0, opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Top Left Swish (based on maroon area in image) */}
      <path 
        d="M 0 0 L 0 500 Q 200 450 400 480 Q 600 510 800 400 L 800 0 Z" 
        fill={aqua} 
        className="opacity-90"
      />
      <path 
        d="M 0 0 L 0 550 Q 200 500 400 530 Q 600 560 800 450 L 800 0 Z" 
        fill="#FFD700" 
        className="opacity-40"
      />
      
      {/* Bottom Right Swish */}
      <path 
        d="M 800 800 L 800 500 Q 600 550 400 520 Q 200 490 0 600 L 0 800 Z" 
        fill={aqua} 
        className="opacity-20"
      />
    </motion.svg>

    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent)', backgroundSize: '4px 4px' }} />
    
    <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(255,215,0,0.15)_0%,transparent_50%)]" />
  </div>
);

export default function CompetitionTemplate({ data, containerRef }: Props) {
  const isWinners = data.competitionType === 'winners';
  const isAward = data.competitionType === 'award';
  // Monthly Award is specifically requested at 1:1. 
  // Winners fallback from 9:16 to 1:1.
  const effectiveRatio = isAward ? '1/1' : (isWinners && data.aspectRatio === '9/16' ? '1/1' : data.aspectRatio);
  const aspectClass = effectiveRatio === '9/16' ? 'aspect-[9/16]' : effectiveRatio === '4/5' ? 'aspect-[4/5]' : 'aspect-square';

  const AQUA_VIBRANT = "#00CFC8";
  const AQUA_DEEP = "#008B8B";

  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${aspectClass} ${isWinners ? 'bg-[#003d40]' : isAward ? 'bg-[#004d4d]' : 'bg-[#004f55]'} overflow-hidden flex flex-col font-sans transition-all duration-500`}
      id="competition-template"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute inset-0 ${isWinners ? 'bg-gradient-to-br from-[#005c60] to-[#003133]' : isAward ? 'bg-white' : 'bg-gradient-to-br from-[#006066] to-[#003d41]'}`} />
        
        {/* Subtle decorative elements */}
        {isAward ? (
          <CertificateDecorations aqua={AQUA_VIBRANT} />
        ) : (
          <>
            <div className={`absolute top-0 left-0 w-full h-full ${isWinners ? 'bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]' : 'bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05)_0%,transparent_50%)]'}`} />
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          </>
        )}
      </div>

      {/* Top Section */}
      <div className="relative z-10 flex items-start justify-between px-12 pt-12">
        {/* Header with Logo */}
        <div className="flex-shrink-0">
          {data.logo ? (
              <div 
                style={{ width: `${(data.logoSize / 100) * 90}px`, height: `${(data.logoSize / 100) * 90}px` }}
                className={`bg-white rounded-full p-1 shadow-xl flex items-center justify-center border-4 ${isAward ? 'border-gold-primary' : 'border-[#006066]'}`}
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
              style={{ width: `${(data.logoSize / 100) * 90}px`, height: `${(data.logoSize / 100) * 90}px` }}
              className={`${isWinners || isAward ? 'bg-black/10' : 'bg-white/10'} rounded-full flex items-center justify-center text-black/20`}
            >
              <Globe size={40} />
            </div>
          )}
        </div>

        <div className="flex-1 text-center pr-12 relative z-20">
          {isAward ? (
            <div className="space-y-0 -mt-2">
              <h1 className="text-white text-4xl md:text-6xl font-serif font-black tracking-[0.2em] uppercase drop-shadow-lg">
                CERTIFICATE
              </h1>
              <h3 className="text-gold-primary text-base md:text-lg font-serif font-bold tracking-[0.4em] uppercase -mt-1 drop-shadow-md">
                OF EXCELLENCE
              </h3>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>

      {/* Participants Grid/Winners Box/Award Layout */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-2 overflow-hidden">
        {isAward ? (
          /* AWARD LAYOUT: Professional Certificate Style */
          <div className="flex items-center justify-between w-full h-full max-w-5xl px-8 relative">
            {/* Left Column: Seal and Ribbons */}
            <div className="w-1/3 flex flex-col items-center justify-center relative h-full">
              {/* Vertical Ribbon (Aqua) */}
              <div 
                style={{ backgroundColor: AQUA_DEEP }}
                className="absolute top-[-30%] bottom-[-10%] w-28 shadow-2xl z-0 rounded-b-lg border-x-4 border-gold-primary/30" 
              />
              <div className="absolute top-[-30%] bottom-[-10%] w-1 bg-gold-primary left-[15%] opacity-40 z-1" />
              <div className="absolute top-[-30%] bottom-[-10%] w-1 bg-gold-primary right-[15%] opacity-40 z-1" />

              {/* The Gold Seal */}
              <motion.div 
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 12, delay: 0.5 }}
                className="relative z-10 mt-10"
              >
                {/* Wavy Gold Border for the seal (using a radial gradient and decorative border) */}
                <div className="w-56 h-56 bg-[#FFD700] rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.4)] flex items-center justify-center p-3 relative border-[6px] border-[#B8860B]">
                   {/* Ribbons coming out from bottom of seal */}
                   <div className="absolute -bottom-16 -left-2 w-14 h-32 bg-gradient-to-b from-[#FFD700] to-[#B8860B] skew-x-12 shadow-xl origin-top border-x border-[#B8860B]/30" />
                   <div className="absolute -bottom-16 -right-2 w-14 h-32 bg-gradient-to-b from-[#FFD700] to-[#B8860B] -skew-x-12 shadow-xl origin-top border-x border-[#B8860B]/30" />
                   
                   <div className="w-full h-full rounded-full bg-white p-2 overflow-hidden border-4 border-gold-primary relative z-20 shadow-inner">
                      {data.participants[0]?.image ? (
                        <img 
                          src={data.participants[0].image} 
                          alt="Winner" 
                          className="w-full h-full object-cover rounded-full"
                          crossOrigin="anonymous"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
                          <Trophy size={48} className="text-gold-primary" />
                        </div>
                      )}
                   </div>

                   {/* Seal text overlay */}
                   <div 
                    style={{ backgroundColor: AQUA_DEEP }}
                    className="absolute -bottom-4 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest z-30 border-2 border-gold-primary shadow-2xl text-white whitespace-nowrap"
                   >
                      AWARD {data.timerText || "MAY 2026"}
                   </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Text Content */}
            <div className="flex-1 pl-12 flex flex-col items-center text-center space-y-2 relative z-20">
              <div className="space-y-0.5">
                <span className="text-gold-primary font-serif italic text-base md:text-lg tracking-[3px] block uppercase font-bold">
                  This Certificate is Proudly Presented to
                </span>
                <div className="h-0.5 w-48 bg-gradient-to-r from-transparent via-gold-primary to-transparent mx-auto mt-1" />
              </div>

              <motion.h2 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-4xl md:text-5xl font-serif font-black text-[#004d4d] tracking-tight italic drop-shadow-sm leading-tight py-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {data.participants[0]?.name || "Recipient Name"}
              </motion.h2>

              <div className="max-w-md w-full">
                <div className="h-px w-full bg-black/10 mb-2" />
                <p className="text-black font-serif text-sm md:text-base leading-relaxed italic px-4 font-bold">
                  For demonstrating exceptional genius and outstanding performance in <br/>
                  <span className="text-black">Professional Excellence</span>.
                </p>
                <div className="h-px w-full bg-black/10 mt-2" />
              </div>

              {/* Founder Badge (Black marked area) */}
              <div className="bg-[#004d4d] text-white px-6 py-2.5 rounded-full shadow-lg border-2 border-gold-primary mt-4 max-w-sm">
                 <div className="flex flex-col items-center">
                    <span className="text-[9px] uppercase tracking-[2px] opacity-70">from</span>
                    <span className="text-white font-display font-black text-[11px] uppercase tracking-[2px]">
                       Hamid Ullah
                    </span>
                    <span className="text-gold-primary font-bold text-[8px] uppercase tracking-widest -mt-0.5">
                       Founder & CEO of Genius Minds
                    </span>
                 </div>
              </div>

              {/* Contact and Socials (Green marked area) */}
              <div className="flex flex-col items-center pt-6 space-y-3">
                 <div className="h-px w-48 bg-black/20 mb-1" />
                 
                 <div className="flex items-center gap-2 text-[#004d4d]">
                    <div className="bg-gold-primary p-1 rounded-full text-black shadow-sm">
                       <Phone size={10} strokeWidth={3} />
                    </div>
                    <span className="text-xs font-black tracking-widest">+923114918272</span>
                 </div>

                 <div className="flex flex-col items-center gap-1.5">
                    <span className="text-[8px] font-black uppercase tracking-[3px] text-[#004d4d]/60">Follow Us On</span>
                    <div className="flex items-center gap-4">
                      <div className="text-[#004d4d] hover:text-gold-primary transition-colors cursor-pointer">
                        <Facebook size={16} strokeWidth={2.5} />
                      </div>
                      <div className="text-[#004d4d] hover:text-gold-primary transition-colors cursor-pointer">
                        <Instagram size={16} strokeWidth={2.5} />
                      </div>
                      <div className="text-[#004d4d] hover:text-gold-primary transition-colors cursor-pointer">
                        <Youtube size={16} strokeWidth={2.5} />
                      </div>
                      <div className="text-[#004d4d] hover:text-gold-primary transition-colors cursor-pointer">
                        <TikTokIcon size={16} />
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        ) : isWinners ? (

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

      {/* Description and Timer / Award Signature */}
      {!isAward && (
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
      )}



      {/* Footer Contact and Social */}
      {!isAward && (
        <div className={`relative z-10 w-full pt-4 pb-6 px-10 flex flex-col items-center gap-4 border-t backdrop-blur-xl ${isWinners ? 'bg-black/40 border-white/20' : 'bg-black/50 border-white/10'}`}>
          <div className="flex flex-wrap items-center justify-center gap-8">
             <div className={`flex items-center gap-2 ${isWinners ? 'text-white' : 'text-gold-primary'}`}>
                <div className={`${isWinners ? 'bg-[#00d1da] text-white' : 'bg-gold-primary text-black'} h-8 w-8 rounded-full flex items-center justify-center shadow-md`}>
                  <Phone size={14} strokeWidth={3} />
                </div>
                <span className="text-white font-sans font-black text-xs md:text-sm tracking-widest">{data.footerPhone}</span>
             </div>
             
             <div className={`flex items-center gap-2 ${isWinners ? 'text-white' : 'text-gold-primary'}`}>
                <div className={`${isWinners ? 'bg-[#00d1da] text-white' : 'bg-gold-primary text-black'} h-8 w-8 rounded-full flex items-center justify-center shadow-md`}>
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
      )}
    </div>
  );
}
