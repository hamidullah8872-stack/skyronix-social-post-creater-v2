import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Download, 
  Sparkles, 
  User, 
  Zap, 
  Cpu, 
  Bot,
  Image as ImageIcon,
  Search,
  BookOpen,
  Menu,
  X,
  Upload,
  RefreshCw,
  MessageSquare,
  Camera,
  UserCheck
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { GoogleGenAI, Type } from "@google/genai";
import { AppMode, MarkhorData, SkyronixData, GeneralData, ResearchData, CompetitionData, Participant, TrackerData } from './types';
import MarkhorTalent from './components/MarkhorTalent';
import Skyronix from './components/Skyronix';
import GeneralCreator from './components/GeneralCreator';
import ResearchCreator from './components/ResearchCreator';
import CompetitionTemplate from './components/CompetitionTemplate';
import ProfileTracker from './components/ProfileTracker';
import { generateAIText, generateSkyronixPoints, chatWithAI, generateImage, generateResearchPlan, generateSeriesPlan, searchProfiles } from './lib/gemini';

export default function App() {
  const [mode, setMode] = useState<AppMode>('markhor');
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const [isProcessing, setIsProcessing] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getScale = () => {
    if (typeof window === 'undefined' || windowWidth >= 1024) return 1;
    const maxPreviewWidth = 600;
    const availableSpace = windowWidth - (windowWidth < 640 ? 48 : 80);
    return Math.min(1, availableSpace / maxPreviewWidth);
  };

  const scale = getScale();

  // Markhor State
  const [markhor, setMarkhor] = useState<MarkhorData>({
    personImage: null,
    content: "Meet [Noor Ul Ain]: Who help small Businesses to grow their sales & visibility through [social media and digital Marketing].",
    logo: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=200&h=200&auto=format&fit=crop", // Elegant Gold/Dark placeholder for Markhor
    topRightLogo: null,
    optionalTopText: "",
    aspectRatio: '9/16',
    contentFontSize: 100
  });

  // Skyronix State
  const [skyronix, setSkyronix] = useState<SkyronixData>({
    rawScript: "Social media is evolving. If you're not using AI for your business, you're leaving money on the table. Automation isn't just about saving time; it's about scaling your systems so you can focus on high-level strategy. Here are 3 ways to start: 1. Use AI for content ideation. 2. Automate your lead follow-up. 3. Use data-driven insights for ads. Start today.",
    hook: "AI-POWERED BUSINESS GROWTH",
    points: [
      { title: "CONTENT IDEATION", description: "Use neural networks for 24/7 creativity." },
      { title: "LEAD AUTOMATION", description: "Scale your follow-up with zero friction." },
      { title: "DATA INSIGHTS", description: "Optimize ads with predictive analytics." }
    ],
    cta: "SCALE YOUR SYSTEMS TODAY",
    layoutStyle: 'card',
    aspectRatio: '1/1',
    isProcessing: false
  });

  const handleSkyronixAI = async () => {
    if (!skyronix.rawScript.trim()) return;
    
    setSkyronix(prev => ({ ...prev, isProcessing: true }));
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are a premium-level visual designer specialized in social media graphics. 
        Analyze the following raw script and extract:
        1. A strong HOOK (short, punchy title)
        2. 3-5 key points (each with a short title and a one-sentence high-impact description)
        3. A clear CTA (Call To Action)

        Rules:
        - Use simple, high-impact language.
        - Tone: Modern, professional, and minimal.
        - Output strictly in JSON format.

        Script: "${skyronix.rawScript}"`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              hook: { type: Type.STRING },
              points: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING }
                  },
                  required: ["title", "description"]
                }
              },
              cta: { type: Type.STRING }
            },
            required: ["hook", "points", "cta"]
          }
        }
      });

      const result = JSON.parse(response.text);
      const layouts: ('card' | 'split' | 'center' | 'dashboard' | 'notebook')[] = ['card', 'split', 'center', 'dashboard', 'notebook'];
      const randomLayout = layouts[Math.floor(Math.random() * layouts.length)];

      setSkyronix(prev => ({
        ...prev,
        hook: result.hook.toUpperCase(),
        points: result.points.map((p: any) => ({
          title: p.title.toUpperCase(),
          description: p.description
        })),
        cta: result.cta.toUpperCase(),
        layoutStyle: randomLayout,
        isProcessing: false
      }));
    } catch (error) {
      console.error("Gemini AI failed:", error);
      setSkyronix(prev => ({ ...prev, isProcessing: false }));
    }
  };

  // General State
  const [general, setGeneral] = useState<GeneralData>({
    messages: [
      { role: 'assistant', content: 'Hello! I am Skyronix, your creative AI assistant. I can help with social media strategy, write high-impact content, or even generate professional images. How can I help you today?' }
    ],
    lastInput: '',
    isImagePending: false
  });

  // Research State
  const [research, setResearch] = useState<ResearchData>({
    topic: "",
    plan: [],
    status: 'idle',
    viewMode: 'research',
    dayCount: 30
  });

  // Competition State
  const [competition, setCompetition] = useState<CompetitionData>({
    title: "VOTE FOR YOUR TOP WEEKLY",
    mainHeading: "TALENT",
    subHeading: "HURRY! VOTING ENDS WITHIN 48 HOURS",
    participants: [
      { id: 1, name: "Tanzila Fatima", image: null },
      { id: 2, name: "Esha Nawaz", image: null },
      { id: 3, name: "Saleha Azhar", image: null },
      { id: 4, name: "Amna Khan", image: null },
      { id: 5, name: "Zainab Ali", image: null },
      { id: 6, name: "Sana Ahmed", image: null },
      { id: 7, name: "Hira Malik", image: null }
    ],
    bottomDescription: "all nominees are talented, but only your vote will decide who is the winner, support your favorite today.",
    timerText: "ONLY 48 HOURS ARE LEFT",
    footerWebsite: "markhortalenthub.com",
    footerPhone: "+92 311 491 8272",
    footerEmail: "markhortalenthub@gmail.com",
    logo: null,
    aspectRatio: '1/1',
    participantSize: 100,
    participantSpacing: 16,
    logoSize: 100,
    competitionType: 'weekly'
  });

  const [tracker, setTracker] = useState<TrackerData>({
    platform: 'facebook',
    topic: '',
    recognition: '',
    location: '',
    followerCount: '',
    results: [],
    searchHistory: [],
    status: 'idle'
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (previewRef.current === null) return;
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const dataUrl = await toPng(previewRef.current, { 
        quality: 1.0, 
        pixelRatio: 2, 
        cacheBust: true,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        }
      });
      
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `skyronix-${mode}-${Date.now()}.png`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
      
    } catch (err) {
      console.error('Download failed', err);
      alert('Could not generate picture. Please ensure you are on a compatible browser (Chrome/Safari) and try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerateGeneral = async (customInput?: string) => {
    const input = customInput || general.lastInput;
    if (!input) return;
    setIsProcessing(true);
    
    const userMsg = { role: 'user' as const, content: input };
    setGeneral(prev => ({ 
      ...prev, 
      messages: [...prev.messages, userMsg],
      lastInput: '' 
    }));

    try {
      const imageKeywords = ['draw', 'generate image', 'create picture', 'make a picture', 'generate a picture', 'show me a picture', 'create logo', 'design a logo', 'crate picture', 'draw a', 'sketch', 'paint', 'image of', 'photo of'];
      const lowercaseInput = input.toLowerCase();
      let isImageIntent = imageKeywords.some(keyword => lowercaseInput.includes(keyword));

      if (!isImageIntent && input.split(' ').length < 20) {
        const imageIntentPrompt = `Does the user want you to GENERATE/CREATE an image, photo, or picture based on their request? (Handle typos like 'crate' for 'create').
        Respond ONLY with the word "YES" if they want an image, or "NO" if they just want to chat.

        User Request: "${input}"`;
        const isImageIntentStr = await generateAIText(imageIntentPrompt);
        isImageIntent = isImageIntentStr.toUpperCase().includes('YES');
      }

      if (isImageIntent) {
        const imageResult = await generateImage(input);
        setGeneral(prev => ({
          ...prev,
          messages: [...prev.messages, { role: 'assistant', content: 'Here is the visual you requested:', image: imageResult }]
        }));
      } else {
        const chatMessages = general.messages.map(m => ({
          role: m.role === 'user' ? 'user' as const : 'model' as const,
          parts: [{ text: m.content }]
        }));
        chatMessages.push({ role: 'user', parts: [{ text: input }] });

        const assistantResponse = await chatWithAI(chatMessages);
        setGeneral(prev => ({
          ...prev,
          messages: [...prev.messages, { role: 'assistant', content: assistantResponse }]
        }));
      }
    } catch (err) {
      console.error('General mode error:', err);
      const errorMsg = err instanceof Error ? err.message : 'Something went wrong';
      setGeneral(prev => ({
        ...prev,
        messages: [...prev.messages, { role: 'assistant', content: `Sorry, I encountered an error: ${errorMsg}` }]
      }));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerateResearch = async (topic: string) => {
    if (!topic) return;
    setIsProcessing(true);
    setResearch(prev => ({ ...prev, topic, status: 'generating', viewMode: 'research' }));
    
    try {
      const plan = await generateResearchPlan(topic);
      setResearch(prev => ({ 
        ...prev, 
        plan, 
        status: 'completed'
      }));
    } catch (err) {
      console.error('Research mode error:', err);
      setResearch(prev => ({ ...prev, status: 'error' }));
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      alert(`Research Analysis Error: ${errorMessage}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerateSeries = async (topic: string, days: 30 | 100, instructions: string) => {
    if (!topic) return;
    setIsProcessing(true);
    setResearch(prev => ({ ...prev, topic, status: 'generating', viewMode: 'series', dayCount: days, extraInstructions: instructions }));
    
    try {
      const plan = await generateSeriesPlan(topic, days, instructions);
      setResearch(prev => ({ 
        ...prev, 
        plan, 
        status: 'completed'
      }));
    } catch (err) {
      console.error('Series mode error:', err);
      setResearch(prev => ({ ...prev, status: 'error' }));
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      alert(`Series Generation Error: ${errorMessage}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTrackerSearch = async (platform: 'facebook' | 'linkedin', topic: string, recognition: string, location: string, followers: string) => {
    setIsProcessing(true);
    setTracker(prev => ({ ...prev, platform, topic, recognition, location, followerCount: followers, status: 'searching' }));
    
    try {
      const results = await searchProfiles(platform, topic, recognition, location, followers, tracker.searchHistory);
      setTracker(prev => ({ 
        ...prev, 
        results, 
        searchHistory: [...prev.searchHistory, ...results.map(r => r.url)],
        status: 'completed'
      }));
    } catch (err) {
      console.error('Tracker error:', err);
      setTracker(prev => ({ ...prev, status: 'error' }));
      alert(`Profile Search Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark text-neutral-100 flex overflow-hidden">
      {/* Mobile Sidebar Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && windowWidth < 1024 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.div 
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-80 glass-sidebar flex flex-col z-50 fixed inset-y-0 lg:relative lg:translate-x-0"
          >
            <div className="p-8 lg:p-10 pb-4">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 border-[3px] border-aqua-primary rounded-lg flex items-center justify-center font-black text-aqua-primary text-sm">
                    S
                  </div>
                  <h1 className="text-xl font-display font-extrabold tracking-tighter text-white">
                    SOCIAL<span className="text-aqua-primary">GEN</span>
                  </h1>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-lg text-white/40 lg:hidden"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 px-6 mb-6">
                {[
                  { id: 'markhor', icon: Zap, label: 'Markhor', color: 'text-gold-primary' },
                  { id: 'skyronix', icon: Cpu, label: 'Skyronix', color: 'text-aqua-primary' },
                  { id: 'research', icon: Search, label: 'Research', color: 'text-[#ff4e00]' },
                  { id: 'general', icon: Bot, label: 'General', color: 'text-white' },
                  { id: 'competition', icon: Plus, label: 'Compete', color: 'text-aqua-primary' },
                  { id: 'tracker', icon: UserCheck, label: 'Tracker', color: 'text-aqua-primary' }
                ].map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => { setMode(item.id as any); if(windowWidth < 1024) setIsSidebarOpen(false); }}
                    title={item.label}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl transition-all duration-300 border ${mode === item.id ? 'bg-white/10 border-white/20 shadow-lg' : 'bg-transparent border-transparent text-neutral-500 hover:bg-white/5 hover:text-neutral-300'}`}
                  >
                    <item.icon size={18} className={mode === item.id ? item.color : ''} />
                    <span className="text-[8px] font-black uppercase tracking-tighter mt-1 opacity-60">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 pt-2 custom-scrollbar">
              <div className="space-y-8">
                {mode === 'markhor' && (
                  <div className="space-y-6">
                    <div className="glass-card p-6 rounded-[20px] space-y-4">
                      <h3 className="text-sm font-bold text-white/90">Platform Compatibility</h3>
                      <div className="flex gap-2 p-1 bg-black/20 rounded-xl">
                        {[
                          { id: '9/16', label: 'TikTok/Story', sub: '9:16' },
                          { id: '4/5', label: 'FB/IG Portrait', sub: '4:5' }
                        ].map((ratio) => (
                          <button 
                            key={ratio.id}
                            onClick={() => setMarkhor({...markhor, aspectRatio: ratio.id as any})}
                            className={`flex-1 flex flex-col items-center py-2 rounded-lg transition-all ${markhor.aspectRatio === ratio.id ? 'bg-white/10 text-white shadow-lg' : 'bg-transparent text-neutral-500 hover:text-neutral-300'}`}
                          >
                            <span className="text-[9px] font-black uppercase tracking-tight">{ratio.label}</span>
                            <span className="text-[8px] opacity-50">{ratio.sub}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="glass-card p-6 rounded-[20px] space-y-4">
                      <h3 className="text-sm font-bold text-white/90">Canvas Settings</h3>
                      <label className="block">
                        <span className="text-[11px] font-bold uppercase tracking-[1px] text-white/40">Content Text</span>
                        <textarea 
                          value={markhor.content}
                          onChange={(e) => setMarkhor({...markhor, content: e.target.value})}
                          className="mt-2 w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm focus:border-aqua-primary outline-none transition-all h-28"
                        />
                      </label>
                      <label className="block">
                        <div className="flex justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-[1px] text-white/40">Text Size</span>
                          <span className="text-[10px] text-gold-primary">{markhor.contentFontSize}%</span>
                        </div>
                        <input 
                          type="range" min="50" max="250" value={markhor.contentFontSize} 
                          onChange={(e) => setMarkhor({...markhor, contentFontSize: parseInt(e.target.value)})}
                          className="w-full mt-2 accent-gold-primary cursor-pointer"
                        />
                      </label>
                    </div>
                    
                    <div className="glass-card p-6 rounded-[20px] space-y-4">
                      <h3 className="text-sm font-bold text-white/90">Asset Upload</h3>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-[1px] text-white/40">Person Image</span>
                        <div className="mt-2 flex items-center justify-center h-32 w-full bg-black/20 border border-dashed border-white/10 rounded-xl hover:border-aqua-primary transition-colors relative cursor-pointer group overflow-hidden">
                          {markhor.personImage ? (
                            <img src={markhor.personImage} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <div className="flex flex-col items-center gap-2 text-neutral-500">
                               <Upload size={24} />
                               <span className="text-[10px] uppercase font-bold tracking-widest">Select Image</span>
                            </div>
                          )}
                          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleImageUpload(e, (url) => setMarkhor({...markhor, personImage: url}))} />
                        </div>
                      </div>
                      <label className="block">
                        <span className="text-[11px] font-bold uppercase tracking-[1px] text-white/40">Left Side Logo (Permanent)</span>
                        <input type="file" className="mt-2 block w-full text-xs text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-bold file:uppercase file:bg-white/10 file:text-white hover:file:bg-white/20" onChange={(e) => handleImageUpload(e, (url) => setMarkhor({...markhor, logo: url}))} />
                      </label>
                      <label className="block">
                        <span className="text-[11px] font-bold uppercase tracking-[1px] text-white/40">Right Side Logo (Top Right)</span>
                        <input type="file" className="mt-2 block w-full text-xs text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-bold file:uppercase file:bg-white/10 file:text-white hover:file:bg-white/20" onChange={(e) => handleImageUpload(e, (url) => setMarkhor({...markhor, topRightLogo: url}))} />
                      </label>
                    </div>
                  </div>
                )}

                {mode === 'skyronix' && (
                  <div className="space-y-6">
                    <div className="glass-card p-6 rounded-[20px] space-y-4 text-center">
                       <Zap className="mx-auto text-aqua-primary" size={32} />
                       <h2 className="text-xl font-display font-black text-white italic tracking-widest uppercase">Skyronix AI</h2>
                       <p className="text-[10px] text-white/40 uppercase font-black tracking-widest leading-relaxed">
                          Premium Visual Design Engine
                       </p>
                    </div>

                    <div className="glass-card p-6 rounded-[20px] space-y-4">
                      <h3 className="text-sm font-bold text-white/90">AI Script Input</h3>
                      <textarea 
                        value={skyronix.rawScript}
                        onChange={(e) => setSkyronix({...skyronix, rawScript: e.target.value})}
                        placeholder="Paste your raw script here..."
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white/80 focus:border-aqua-primary outline-none transition-all h-40 resize-none custom-scrollbar"
                      />
                      <button 
                        onClick={handleSkyronixAI}
                        disabled={skyronix.isProcessing}
                        className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 font-black uppercase tracking-widest transition-all ${skyronix.isProcessing ? 'bg-neutral-800 text-neutral-500 italic' : 'bg-aqua-primary text-black hover:scale-[1.02] active:scale-[0.98]'}`}
                      >
                        {skyronix.isProcessing ? (
                          <>
                            <RefreshCw className="animate-spin" size={18} />
                            Architecting Visuals...
                          </>
                        ) : (
                          <>
                            <Sparkles size={18} />
                            Generate Premium Design
                          </>
                        )}
                      </button>
                    </div>

                    <div className="glass-card p-6 rounded-[20px] space-y-4">
                      <h3 className="text-sm font-bold text-white/90">Platform Scaling</h3>
                      <div className="flex gap-2 p-1 bg-black/20 rounded-xl">
                        {[
                          { id: '1/1', label: 'Square', sub: '1:1' },
                          { id: '4/5', label: 'FB/IG Portrait', sub: '4:5' },
                          { id: '9/16', label: 'TikTok/Story', sub: '9:16' }
                        ].map((ratio) => (
                          <button 
                            key={ratio.id}
                            onClick={() => setSkyronix({...skyronix, aspectRatio: ratio.id as any})}
                            className={`flex-1 flex flex-col items-center py-2 rounded-lg transition-all ${skyronix.aspectRatio === ratio.id ? 'bg-aqua-primary text-black shadow-lg shadow-aqua-primary/20' : 'bg-transparent text-neutral-500 hover:text-neutral-300'}`}
                          >
                            <span className="text-[9px] font-black uppercase tracking-tight">{ratio.label}</span>
                            <span className="text-[8px] opacity-50">{ratio.sub}</span>
                          </button>
                        ))}
                      </div>
                      <button 
                        onClick={() => {
                          const layouts: SkyronixData['layoutStyle'][] = ['card', 'split', 'center', 'dashboard', 'notebook'];
                          const currentIdx = layouts.indexOf(skyronix.layoutStyle);
                          const nextIdx = (currentIdx + 1) % layouts.length;
                          setSkyronix(prev => ({ ...prev, layoutStyle: layouts[nextIdx] }));
                        }}
                        className="w-full py-3 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/60 hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                      >
                        <RefreshCw size={12} />
                        Cycle Layout Style: {skyronix.layoutStyle}
                      </button>
                    </div>
                  </div>
                )}

                {mode === 'research' && (
                  <div className="space-y-6">
                    <div className="glass-card p-6 rounded-[20px] space-y-4">
                      <h3 className="text-sm font-bold text-white/90">Strategy Terminal</h3>
                      <p className="text-[10px] text-white/40 uppercase tracking-wider leading-relaxed">
                        Deploy neural research agents to synthesize 30 days of high-impact content strategy and daily post ideas.
                      </p>

                      <div className="flex flex-col gap-2">
                         <div className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                            <RefreshCw size={10} className="text-[#ff4e00]" />
                            <span>Neural System: Online</span>
                         </div>
                         <div className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                            <Sparkles size={10} className="text-[#ff4e00]" />
                            <span>Persona: Human-Like</span>
                         </div>
                      </div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-3 text-white/40">
                        <BookOpen size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">30-Day Matrix Ready</span>
                      </div>
                    </div>
                  </div>
                )}

                {mode === 'general' && (
                  <div className="space-y-6">
                    <div className="glass-card p-6 rounded-[20px] space-y-4">
                      <h3 className="text-sm font-bold text-white/90">Skyronix AI Assistant</h3>
                      <p className="text-[10px] text-white/40 uppercase tracking-wider leading-relaxed">
                        Interaction is now direct! Use the message bar at the bottom of the main screen to chat or generate images instantly.
                      </p>
                    </div>

                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-3 text-white/40">
                        <MessageSquare size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Conversational UI Active</span>
                      </div>
                    </div>
                  </div>
                )}

                {mode === 'competition' && (
                  <div className="space-y-6">
                    <div className="glass-card p-6 rounded-[20px] space-y-4">
                      <h3 className="text-sm font-bold text-white/90">Competition Mode</h3>
                      <div className="flex gap-2 p-1 bg-black/20 rounded-xl">
                        {[
                          { id: 'weekly', label: 'Weekly' },
                          { id: 'winners', label: 'Winners' },
                          { id: 'award', label: 'Monthly Award' }
                        ].map((type) => (
                          <button 
                            key={type.id}
                            onClick={() => setCompetition({...competition, competitionType: type.id as any})}
                            className={`flex-1 py-3 rounded-lg transition-all text-[9.5px] font-black uppercase tracking-tight ${competition.competitionType === type.id ? 'bg-aqua-primary text-black shadow-lg shadow-aqua-primary/20' : 'bg-transparent text-neutral-500 hover:text-neutral-300'}`}
                          >
                            {type.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="glass-card p-6 rounded-[20px] space-y-4">
                      <h3 className="text-sm font-bold text-white/90">Platform Compatibility</h3>
                      <div className="flex gap-2 p-1 bg-black/20 rounded-xl">
                        {[
                          { id: '1/1', label: 'Square', sub: '1:1' },
                          { id: '4/5', label: 'FB/IG Portrait', sub: '4:5' },
                          ...(competition.competitionType === 'weekly' ? [{ id: '9/16', label: 'TikTok/Story', sub: '9:16' }] : [])
                        ].map((ratio) => (
                          <button 
                            key={ratio.id}
                            onClick={() => setCompetition({...competition, aspectRatio: ratio.id as any})}
                            className={`flex-1 flex flex-col items-center py-2 rounded-lg transition-all ${competition.aspectRatio === ratio.id ? 'bg-white/10 text-white shadow-lg' : 'bg-transparent text-neutral-500 hover:text-neutral-300'}`}
                          >
                            <span className="text-[9px] font-black uppercase tracking-tight">{ratio.label}</span>
                            <span className="text-[8px] opacity-50">{ratio.sub}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="glass-card p-6 rounded-[20px] space-y-4">
                      <h3 className="text-sm font-bold text-white/90">Identity & Layout</h3>
                      <label className="block">
                        <span className="text-[11px] font-bold uppercase tracking-[1px] text-white/40">Main Logo</span>
                        <input type="file" className="mt-2 block w-full text-xs text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-bold file:uppercase file:bg-white/10 file:text-white hover:file:bg-white/20" onChange={(e) => handleImageUpload(e, (url) => setCompetition({...competition, logo: url}))} />
                      </label>
                      <label className="block">
                        <div className="flex justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-[1px] text-white/40">Logo Size</span>
                          <span className="text-[10px] text-aqua-primary">{competition.logoSize}%</span>
                        </div>
                        <input 
                          type="range" min="50" max="150" value={competition.logoSize} 
                          onChange={(e) => setCompetition({...competition, logoSize: parseInt(e.target.value)})}
                          className="w-full mt-2 accent-aqua-primary cursor-pointer"
                        />
                      </label>
                      <label className="block">
                        <div className="flex justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-[1px] text-white/40">Participant Photo Size</span>
                          <span className="text-[10px] text-aqua-primary">{competition.participantSize}%</span>
                        </div>
                        <input 
                          type="range" min="50" max="150" value={competition.participantSize} 
                          onChange={(e) => setCompetition({...competition, participantSize: parseInt(e.target.value)})}
                          className="w-full mt-2 accent-aqua-primary cursor-pointer"
                        />
                      </label>
                      <label className="block">
                        <div className="flex justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-[1px] text-white/40">Photo Spacing</span>
                          <span className="text-[10px] text-aqua-primary">{competition.participantSpacing}px</span>
                        </div>
                        <input 
                          type="range" min="0" max="60" value={competition.participantSpacing} 
                          onChange={(e) => setCompetition({...competition, participantSpacing: parseInt(e.target.value)})}
                          className="w-full mt-2 accent-aqua-primary cursor-pointer"
                        />
                      </label>
                    </div>

                    <div className="glass-card p-6 rounded-[20px] space-y-4">
                      <h3 className="text-sm font-bold text-white/90">Headings</h3>
                      <label className="block">
                        <span className="text-[11px] font-bold uppercase tracking-[1px] text-white/40">Top Title</span>
                        <input 
                          value={competition.title}
                          onChange={(e) => setCompetition({...competition, title: e.target.value})}
                          className="mt-2 w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm focus:border-aqua-primary outline-none transition-all"
                        />
                      </label>
                      <label className="block">
                        <span className="text-[11px] font-bold uppercase tracking-[1px] text-white/40">Main Heading</span>
                        <input 
                          value={competition.mainHeading}
                          onChange={(e) => setCompetition({...competition, mainHeading: e.target.value})}
                          className="mt-2 w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm focus:border-aqua-primary outline-none transition-all"
                        />
                      </label>
                      <label className="block">
                        <span className="text-[11px] font-bold uppercase tracking-[1px] text-white/40">Sub Heading</span>
                        <input 
                          value={competition.subHeading}
                          onChange={(e) => setCompetition({...competition, subHeading: e.target.value})}
                          className="mt-2 w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm focus:border-aqua-primary outline-none transition-all"
                        />
                      </label>
                    </div>

                    <div className="glass-card p-6 rounded-[20px] space-y-4">
                      <h3 className="text-sm font-bold text-white/90">
                        {competition.competitionType === 'winners' ? 'Winner Profiles (First 2 only)' : competition.competitionType === 'award' ? 'Award Recipient (First only)' : `Participants (${competition.participants.length}/7)`}
                      </h3>
                      <div className="space-y-4">
                        {competition.participants.map((p, idx) => (
                          <div key={idx} className="p-3 bg-black/20 rounded-xl border border-white/5 space-y-3">
                             <div className="flex items-center justify-between">
                               <span className="text-[10px] font-bold text-aqua-primary uppercase">Participant #{p.id}</span>
                               <button 
                                 onClick={() => {
                                   const newParts = competition.participants.filter((_, i) => i !== idx).map((item, i) => ({...item, id: i + 1}));
                                   setCompetition({...competition, participants: newParts});
                                 }}
                                 className="text-white/20 hover:text-red-500 transition-colors"
                               >
                                 <X size={12} />
                               </button>
                             </div>
                             <input 
                                value={p.name}
                                onChange={(e) => {
                                  const newParts = [...competition.participants];
                                  newParts[idx].name = e.target.value;
                                  setCompetition({...competition, participants: newParts});
                                }}
                                placeholder="Name"
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs outline-none"
                             />
                             <div className="flex items-center gap-3">
                                <div className="h-8 w-8 bg-black/40 rounded-full border border-white/10 overflow-hidden flex items-center justify-center">
                                  {p.image ? <img src={p.image} className="w-full h-full object-cover" /> : <Camera size={12} className="text-white/20" />}
                                </div>
                                <input 
                                  type="file" 
                                  className="flex-1 text-[10px] text-white/40 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[9px] file:bg-white/10 file:text-white"
                                  onChange={(e) => handleImageUpload(e, (url) => {
                                    const newParts = [...competition.participants];
                                    newParts[idx].image = url;
                                    setCompetition({...competition, participants: newParts});
                                  })}
                                />
                             </div>
                          </div>
                        ))}
                        
                        {competition.participants.length < 7 && (
                          <button 
                            onClick={() => {
                              setCompetition({
                                ...competition, 
                                participants: [...competition.participants, { id: competition.participants.length + 1, name: "", image: null }]
                              });
                            }}
                            className="w-full py-3 border border-dashed border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white/40 hover:border-aqua-primary hover:text-aqua-primary transition-all"
                          >
                            + Add Participant
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="glass-card p-6 rounded-[20px] space-y-4">
                      <h3 className="text-sm font-bold text-white/90">Footer Details</h3>
                      <label className="block">
                        <span className="text-[11px] font-bold uppercase tracking-[1px] text-white/40">Description</span>
                        <textarea 
                          value={competition.bottomDescription}
                          onChange={(e) => setCompetition({...competition, bottomDescription: e.target.value})}
                          className="mt-2 w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm focus:border-aqua-primary outline-none transition-all h-20"
                        />
                      </label>
                      <label className="block">
                        <span className="text-[11px] font-bold uppercase tracking-[1px] text-white/40">
                          {competition.competitionType === 'award' ? 'Award Month (e.g. MAY 2026)' : 'Timer Label'}
                        </span>
                        <input 
                          value={competition.timerText}
                          onChange={(e) => setCompetition({...competition, timerText: e.target.value})}
                          placeholder={competition.competitionType === 'award' ? "MAY 2026" : "ONLY 48 HOURS LEFT"}
                          className="mt-2 w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm focus:border-aqua-primary outline-none transition-all"
                        />
                      </label>
                      <label className="block">
                        <span className="text-[11px] font-bold uppercase tracking-[1px] text-white/40">Phone</span>
                        <input value={competition.footerPhone} onChange={(e) => setCompetition({...competition, footerPhone: e.target.value})} className="mt-2 w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm focus:border-aqua-primary outline-none transition-all" />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-8 border-t border-white/10 space-y-4">
               <button 
                onClick={handleDownload}
                disabled={isProcessing}
                className="w-full bg-aqua-primary text-black font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all text-xs uppercase tracking-widest"
               >
                 <Download size={18} />
                 <span>Export Artwork</span>
               </button>
               <p className="text-[10px] text-white/30 text-center uppercase tracking-[2px] font-bold">
                 Powered by OpenAI & Gemini
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto flex flex-col items-center">
        {/* Top Header */}
        <header className="w-full p-6 md:p-8 flex items-center justify-between sticky top-0 bg-bg-dark/60 backdrop-blur-xl z-40 border-b border-white/10">
           <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="p-3 hover:bg-white/5 rounded-xl transition-colors lg:hidden"
           >
             {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
           </button>
           
           <div className="flex-1 lg:hidden text-center pl-4">
             <span className="font-display font-black tracking-tighter text-aqua-primary text-xl">SOCIALGEN</span>
           </div>

           <div className="flex items-center gap-6 ml-auto">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">Workspace</span>
                <span className="text-xs font-bold text-aqua-primary uppercase">{mode} Template</span>
              </div>
              <div className="h-10 w-10 glass-card rounded-xl flex items-center justify-center text-aqua-primary">
                 <User size={20} />
              </div>
           </div>
        </header>

        {/* Preview Container Area */}
        <div className="w-full max-w-7xl p-6 md:p-12 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12 min-h-[calc(100vh-100px)]">
           <div className="flex-1 w-full max-w-[600px] flex flex-col items-center gap-8">
              <div className="w-full flex items-center justify-between opacity-30 px-2">
                 <span className="text-[10px] font-bold uppercase tracking-[4px]">Live Preview Mode</span>
                 <div className="flex gap-4">
                   <div className="h-1 w-12 bg-white/20 rounded-full" />
                   <div className="h-1 w-6 bg-aqua-primary rounded-full" />
                 </div>
              </div>
              
              <div className="w-full flex flex-col items-center">
                <div 
                  className="w-full shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] rounded-3xl overflow-hidden ring-1 ring-white/10 relative group bg-neutral-900 border border-dashed border-white/10 p-1"
                  style={{ 
                    width: '600px',
                    maxWidth: 'none',
                    transform: `scale(${scale})`,
                    transformOrigin: 'top center',
                    height: 'auto',
                    marginBottom: `${(scale - 1) * 600}px` 
                  }}
                >
                   <div className="overflow-hidden rounded-[22px]">
                   {mode === 'markhor' && <MarkhorTalent data={markhor} containerRef={previewRef} />}
                   {mode === 'skyronix' && <Skyronix data={skyronix} containerRef={previewRef} />}
                   {mode === 'research' && <ResearchCreator data={research} onGenerate={handleGenerateResearch} onGenerateSeries={handleGenerateSeries} isProcessing={isProcessing} containerRef={previewRef} />}
                   {mode === 'general' && <GeneralCreator data={general} containerRef={previewRef} onSend={(text) => handleGenerateGeneral(text)} isProcessing={isProcessing} />}
                   {mode === 'competition' && <CompetitionTemplate data={competition} containerRef={previewRef} />}
                   {mode === 'tracker' && <ProfileTracker data={tracker} onSearch={handleTrackerSearch} isProcessing={isProcessing} />}
                  </div>
               </div>
              </div>

               <div className="flex items-center gap-10 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                <div className="text-center">
                   <span className="block text-[10px] font-bold uppercase tracking-widest mb-1">Format</span>
                    <span className="text-sm font-medium">
                     {mode === 'markhor' ? (markhor.aspectRatio === '9/16' ? '1080 x 1920' : '1080 x 1350') : 
                      mode === 'skyronix' ? (skyronix.aspectRatio === '9/16' ? '1080 x 1920' : skyronix.aspectRatio === '4/5' ? '1080 x 1350' : '1080 x 1080') :
                      mode === 'competition' ? '1200 x 1200' :
                      'Various'}
                   </span>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div className="text-center">
                   <span className="block text-[10px] font-bold uppercase tracking-widest mb-1">Ratio</span>
                   <span className="text-sm font-medium">
                     {mode === 'markhor' ? (markhor.aspectRatio === '9/16' ? '9:16 vertical' : '4:5 Portrait') :
                      mode === 'skyronix' ? (skyronix.aspectRatio === '9/16' ? '9:16 Story' : skyronix.aspectRatio === '4/5' ? '4:5 Portrait' : '1:1 Square') :
                      mode === 'competition' ? '1:1 Square' :
                      'Adaptive'}
                   </span>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div className="text-center">
                   <span className="block text-[10px] font-bold uppercase tracking-widest mb-1">Render</span>
                   <span className="text-sm font-medium">HD Engine</span>
                </div>
              </div>
           </div>
        </div>

        {/* Desktop Sidebar Toggle */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="hidden lg:flex fixed bottom-10 left-10 p-4 glass-card rounded-2xl hover:bg-white/10 transition-all z-50 text-neutral-400 shadow-2xl"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </main>

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex flex-col items-center justify-center gap-6">
           <div className="relative">
              <RefreshCw className="text-aqua-primary animate-spin" size={48} />
              <div className="absolute inset-0 bg-aqua-primary blur-3xl opacity-20" />
           </div>
           <p className="text-lg font-display font-medium text-white/80 animate-pulse uppercase tracking-[0.2em]">Processing Creative</p>
        </div>
      )}
    </div>
  );
}
