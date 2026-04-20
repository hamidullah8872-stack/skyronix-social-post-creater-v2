import React from 'react';
import { motion } from 'motion/react';
import { MarkhorData } from '../types';
import { Facebook, Instagram, Linkedin, Twitter, Music2 } from 'lucide-react';

interface Props {
  data: MarkhorData;
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function MarkhorTalent({ data, containerRef }: Props) {
  // Select aspect ratio class
  const aspectClass = data.aspectRatio === '9/16' ? 'aspect-[9/16]' : data.aspectRatio === '4/5' ? 'aspect-[4/5]' : 'aspect-square';

  // Logic to parse potential highlights in format [word]
  const renderTextWithHighlights = (text: string) => {
    const parts = text.split(/(\[.*?\])/g);
    return parts.map((part, index) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        const content = part.slice(1, -1);
        return (
          <span 
            key={index} 
            className="bg-aqua-primary text-black px-2 mx-1 inline-block transform skew-x-[-10deg] font-black"
          >
            <span className="inline-block transform skew-x-[10deg]">{content}</span>
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${aspectClass} bg-neutral-900 overflow-hidden shadow-2xl flex flex-col font-sans transition-all duration-300`}
      id="markhor-template"
    >
      {/* Top Section: Person Picture (Fixed 60% height) */}
      <div className="relative h-[60%] w-full overflow-hidden bg-neutral-800 shrink-0">
        {data.personImage ? (
          <img 
            src={data.personImage} 
            alt="Person" 
            className="absolute inset-0 w-full h-full object-cover object-top"
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-neutral-500">
            Person Photo Area
          </div>
        )}
        
        {/* Logos anchored to the image area */}
        <div className="absolute top-[8%] left-[8%] z-30">
          <div className="relative group">
            <div className="absolute inset-0 bg-aqua-primary/30 blur-xl rounded-full opacity-60 pointer-events-none" />
            <img 
              src={data.logo || "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=200&h=200&auto=format&fit=crop"} 
              alt="Markhor Logo" 
              className="h-16 w-16 md:h-20 md:w-20 object-contain rounded-full border-2 border-aqua-primary/50 relative z-10 drop-shadow-2xl bg-black/40 p-1" 
              crossOrigin="anonymous"
            />
          </div>
        </div>

        <div className="absolute top-[8%] right-[8%] z-30">
          {data.topRightLogo && (
            <div className="relative group">
              <div className="absolute inset-0 bg-white/10 blur-lg rounded-full opacity-60 pointer-events-none" />
              <img 
                src={data.topRightLogo} 
                alt="Top Right Logo" 
                className="h-10 w-10 md:h-12 md:w-12 object-contain relative z-10 drop-shadow-xl" 
                crossOrigin="anonymous"
              />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section: Text and Social Media Logos (Strictly 40% height) */}
      <div className="relative h-[40%] w-full bg-gradient-to-b from-white/10 via-black/95 to-black border-t border-white/10 flex flex-col items-center justify-between py-6 px-4 md:py-8 md:px-6 text-center overflow-hidden shrink-0">
        {/* Subtle top edge glow */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent blur-[1px]" />
        
        {/* Main Content Area: Centered and adjustable */}
        <div className="flex-1 w-full flex flex-col items-center justify-center min-h-0 px-2 mt-2">
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="w-full h-full overflow-y-auto custom-scrollbar flex flex-col items-center justify-center px-4"
          >
            {/* Auto-scaling base: 
                - Base size depends on aspectRatio
                - Scales down based on content length
                - Multiplied by user-defined contentFontSize (as a percentage)
            */}
            <div 
              style={{ 
                fontSize: `${Math.max(12, (data.aspectRatio === '9/16' ? 44 : 32) * (1 - Math.min(0.5, data.content.length / 400)) * (data.contentFontSize / 100))}px` 
              }}
              className="text-white font-display font-black leading-[1.1] drop-shadow-2xl uppercase break-words text-center"
            >
              {renderTextWithHighlights(data.content)}
            </div>
          </motion.div>
        </div>

        {/* Social Media Icons: Always at the bottom of the section */}
        <div className="w-full flex items-center justify-center gap-4 md:gap-8 pt-4 pb-4">
           {[
             { Icon: Facebook, color: 'bg-gold-primary' },
             { Icon: Instagram, color: 'bg-gold-primary' },
             { Icon: Linkedin, color: 'bg-gold-primary' },
             { Icon: Twitter, color: 'bg-gold-primary' },
             { Icon: Music2, color: 'bg-gold-primary' }
           ].map((item, idx) => (
             <motion.div 
               key={idx} 
               whileHover={{ scale: 1.15 }}
               className={`${item.color} p-2 md:p-2.5 rounded-full text-black shadow-[0_4px_15px_rgba(251,191,36,0.3)] transition-all cursor-pointer`}
             >
               <item.Icon size={14} className="md:w-4 md:h-4" strokeWidth={3} />
             </motion.div>
           ))}
        </div>

        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-aqua-primary shadow-[0_-5px_15px_rgba(0,255,255,0.3)]" />
      </div>
    </div>
  );
}
