import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrackerData, ProfileResult } from '../types';
import { Search, UserCheck, MapPin, Users, Globe, ExternalLink, Facebook, Linkedin, ShieldCheck, RefreshCw, Copy, Check } from 'lucide-react';

interface Props {
  data: TrackerData;
  onSearch: (platform: 'facebook' | 'linkedin', topic: string, recognition: string, location: string, followers: string) => void;
  isProcessing: boolean;
}

export default function ProfileTracker({ data, onSearch, isProcessing }: Props) {
  const [formData, setFormData] = useState({
    platform: data.platform,
    topic: data.topic,
    recognition: data.recognition,
    location: data.location,
    followerCount: data.followerCount
  });
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(formData.platform, formData.topic, formData.recognition, formData.location, formData.followerCount);
  };

  return (
    <div className="w-full min-h-[800px] bg-[#050a10] rounded-[2.5rem] border border-white/10 p-6 md:p-10 flex flex-col font-sans relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-aqua-primary/5 blur-[100px]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 bg-gradient-to-br from-blue-600 to-aqua-primary rounded-2xl flex items-center justify-center shadow-lg">
              <UserCheck className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-display font-black text-white tracking-tight uppercase">Profile <span className="text-aqua-primary">Tracker</span></h2>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.3em]">Neural Prospecting Engine</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
            <ShieldCheck size={14} className="text-aqua-primary" />
            <span className="text-[10px] text-white/60 font-black uppercase tracking-widest">Global Verified Search</span>
          </div>
        </div>

        {/* Search Panel */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, platform: 'facebook' })}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${formData.platform === 'facebook' ? 'bg-[#1877F2] text-white' : 'text-white/40 hover:text-white'}`}
            >
              <Facebook size={16} />
              <span className="text-[10px] font-bold uppercase">FB</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, platform: 'linkedin' })}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${formData.platform === 'linkedin' ? 'bg-[#0A66C2] text-white' : 'text-white/40 hover:text-white'}`}
            >
              <Linkedin size={16} />
              <span className="text-[10px] font-bold uppercase">IN</span>
            </button>
          </div>

          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-aqua-primary transition-colors" size={18} />
            <input
              type="text"
              placeholder="Topic (e.g. Marketing)"
              value={formData.topic}
              onChange={e => setFormData({ ...formData, topic: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-aqua-primary transition-all text-sm"
              required
            />
          </div>

          <div className="relative group">
            <UserCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-aqua-primary transition-colors" size={18} />
            <input
              type="text"
              placeholder="Role (e.g. Manager)"
              value={formData.recognition}
              onChange={e => setFormData({ ...formData, recognition: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-aqua-primary transition-all text-sm"
              required
            />
          </div>

          <div className="relative group">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-aqua-primary transition-colors" size={18} />
            <input
              type="text"
              placeholder="Location (e.g. USA)"
              value={formData.location}
              onChange={e => setFormData({ ...formData, location: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-aqua-primary transition-all text-sm"
              required
            />
          </div>

          <div className="relative flex gap-2">
            <div className="relative group flex-1">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-aqua-primary transition-colors" size={18} />
              <input
                type="text"
                placeholder="Followers (e.g. 5000)"
                value={formData.followerCount}
                onChange={e => setFormData({ ...formData, followerCount: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-aqua-primary transition-all text-sm"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isProcessing}
              className="px-6 bg-aqua-primary hover:bg-aqua-primary/80 text-black rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:scale-100"
            >
              {isProcessing ? <RefreshCw className="animate-spin" size={18} /> : "Search"}
            </button>
          </div>
        </form>

        {/* Results Area */}
        <div className="flex-1">
          {data.status === 'searching' ? (
            <div className="flex flex-col items-center justify-center py-20 animate-pulse">
              <div className="h-20 w-20 border-4 border-aqua-primary/20 border-t-aqua-primary rounded-full animate-spin mb-6" />
              <h3 className="text-white font-display font-black uppercase text-xl tracking-widest italic">Scraping Neural Data...</h3>
              <p className="text-white/40 text-xs mt-2 uppercase tracking-[0.3em]">Connecting to global servers</p>
            </div>
          ) : data.results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
              <AnimatePresence>
                {data.results.map((profile, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-6 bg-white/[0.03] border border-white/10 rounded-3xl hover:border-aqua-primary/30 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-aqua-primary/5 blur-3xl -mr-10 -mt-10 group-hover:bg-aqua-primary/10 transition-all" />
                    
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-aqua-primary/50 transition-colors">
                        {data.platform === 'facebook' ? <Facebook size={20} className="text-[#1877F2]" /> : <Linkedin size={20} className="text-[#0A66C2]" />}
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleCopy(profile.url)}
                          className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-aqua-primary hover:text-black transition-all"
                          title="Copy Link"
                        >
                          {copiedUrl === profile.url ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                        <a 
                          href={profile.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-aqua-primary hover:text-black transition-all"
                          title="Visit Profile"
                        >
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                    
                    <h4 className="text-lg font-display font-black text-white uppercase tracking-tight mb-1 group-hover:text-aqua-primary transition-colors truncate flex items-center gap-2">
                      {profile.name}
                      {profile.isVerified && (
                        <div className="bg-blue-500 rounded-full p-0.5" title="Verified Profile">
                          <Check size={8} className="text-white" strokeWidth={4} />
                        </div>
                      )}
                    </h4>
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-4 truncate italic">
                      {profile.headline}
                    </p>
                    
                    <div className="flex items-center gap-4 border-t border-white/5 pt-4">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <MapPin size={10} className="text-aqua-primary shrink-0" />
                        <span className="text-[9px] text-white/60 font-bold truncate uppercase">{profile.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Users size={10} className="text-aqua-primary" />
                        <span className="text-[9px] text-white/60 font-bold uppercase">{data.followerCount}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/5 rounded-[2rem] opacity-40">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                <Globe size={32} className="text-white/20" />
              </div>
              <h3 className="text-lg font-display font-bold text-white uppercase tracking-widest mb-2 italic">Neural Map Empty</h3>
              <p className="text-[10px] text-white/60 uppercase tracking-widest max-w-xs text-center leading-relaxed">
                Enter your criteria above and trigger the search to track professional profiles across global networks.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
