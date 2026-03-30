import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Lock,
  Terminal,
  Zap,
  Target,
  Plus,
  Server,
  Play,
  X,
  Globe,
  Radio,
  HardDrive,
  Network,
  Database,
  Image,
  Search,
  Binary,
  Skull
} from 'lucide-react';

const IndexModeAcak = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  // Navigation: Drag to Scroll Map
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };
  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Custom drag scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };
  
  // States
  const [isShuffling, setIsShuffling] = useState(false);
  const [shuffleText, setShuffleText] = useState('SYSTEM READY');
  const [shuffleColor, setShuffleColor] = useState('text-cyan-400');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [showTransitionCard, setShowTransitionCard] = useState(false);

  // Load persistent stats
  const [levelStats] = useState(() => {
    const saved = localStorage.getItem('ctf_mode_acak_stats');
    return saved ? JSON.parse(saved) : { 1: { stars: 0, bestTime: null } };
  });

  // Auto-scroll saat kembali dari sebuah level
  useEffect(() => {
    if (location.state?.returnToLevel) {
       setTimeout(() => {
          if (scrollContainerRef.current) {
             const scrollPos = (location.state.returnToLevel - 1) * 188 - 50;
             scrollContainerRef.current.scrollLeft = scrollPos > 0 ? scrollPos : 0;
          }
       }, 300);
    }
  }, [location.state]);

  const poolModes = ["WEB EXPLOITATION", "CRYPTOGRAPHY", "FORENSICS", "STEGANOGRAPHY", "OSINT", "REVERSING", "PWNING"];
  const colors = ["text-cyan-400", "text-magenta-500", "text-pink-500", "text-purple-500"];
  
  const levels = [
    {
      id: 1,
      current: !levelStats[1]?.bestTime,
      active: true,
      title: "Sektor 01: Infiltrasi Web",
      challengeType: "WEB EXPLOITATION",
      stars: levelStats[1]?.stars || 0,
      bestTime: levelStats[1]?.bestTime || null,
      objectives: [
        { text: "Selesaikan Tantangan", sub: "Status: Operasional", type: "COMPLETE" },
        { text: "Tanpa Bantuan / Hint", sub: "Gunakan keahlian murni", type: "HINT" },
        { text: "Selesai di bawah 10 Menit", sub: "Kecepatan eksekusi tinggi", type: "TIME" }
      ]
    },
    { 
      id: 2, 
      current: !!levelStats[1]?.bestTime && !levelStats[2]?.bestTime, 
      active: !!levelStats[1]?.bestTime, 
      title: "Sektor 02: Sinyal Kripto",
      challengeType: "CRYPTOGRAPHY",
      stars: levelStats[2]?.stars || 0,
      bestTime: levelStats[2]?.bestTime || null,
      objectives: [
        { text: "Selesaikan Tantangan", sub: "Status: Operasional", type: "COMPLETE" },
        { text: "Tanpa Bantuan / Hint", sub: "Gunakan keahlian murni", type: "HINT" },
        { text: "Selesai di bawah 5 Menit", sub: "Kecepatan eksekusi tinggi", type: "TIME" }
      ]
    },
    { 
      id: 3, 
      current: !!levelStats[2]?.bestTime && !levelStats[3]?.bestTime, 
      active: !!levelStats[2]?.bestTime, 
      title: "Sektor 03: Digital Forensics",
      challengeType: "DIGITAL FORENSICS",
      stars: levelStats[3]?.stars || 0,
      bestTime: levelStats[3]?.bestTime || null,
      objectives: [
        { text: "Selesaikan Tantangan", sub: "Status: Operasional", type: "COMPLETE" },
        { text: "Tanpa Bantuan / Hint", sub: "Gunakan keahlian murni", type: "HINT" },
        { text: "Selesai di bawah 7 Menit", sub: "Kecepatan eksekusi tinggi", type: "TIME" }
      ]
    },
    { 
      id: 4, 
      current: !!levelStats[3]?.bestTime && !levelStats[4]?.bestTime, 
      active: !!levelStats[3]?.bestTime, 
      title: "Sektor 04: Analisis Jaringan",
      challengeType: "NETWORK ANALYSIS",
      stars: levelStats[4]?.stars || 0,
      bestTime: levelStats[4]?.bestTime || null,
      objectives: [
        { text: "Selesaikan Tantangan", sub: "Status: Operasional", type: "COMPLETE" },
        { text: "Tanpa Bantuan / Hint", sub: "Gunakan keahlian murni", type: "HINT" },
        { text: "Selesai di bawah 10 Menit", sub: "Kecepatan eksekusi tinggi", type: "TIME" }
      ]
    },
    { 
      id: 5, 
      current: !!levelStats[4]?.bestTime && !levelStats[5]?.bestTime, 
      active: !!levelStats[4]?.bestTime, 
      title: "Sektor 05: System Terminal",
      challengeType: "LINUX / TERMINAL",
      stars: levelStats[5]?.stars || 0,
      bestTime: levelStats[5]?.bestTime || null,
      objectives: [
        { text: "Selesaikan Tantangan", sub: "Status: Operasional", type: "COMPLETE" },
        { text: "Tanpa Bantuan / Hint", sub: "Gunakan keahlian murni", type: "HINT" },
        { text: "Selesai di bawah 12 Menit", sub: "Kecepatan eksekusi tinggi", type: "TIME" }
      ]
    },
    { 
      id: 6, 
      current: !!levelStats[5]?.bestTime && !levelStats[6]?.bestTime, 
      active: !!levelStats[5]?.bestTime, 
      title: "Sektor 06: Infiltrasi Database",
      challengeType: "SQL INJECTION",
      stars: levelStats[6]?.stars || 0,
      bestTime: levelStats[6]?.bestTime || null,
      objectives: [
        { text: "Selesaikan Tantangan", sub: "Status: Operasional", type: "COMPLETE" },
        { text: "Tanpa Bantuan / Hint", sub: "Gunakan keahlian murni", type: "HINT" },
        { text: "Selesai di bawah 10 Menit", sub: "Kecepatan eksekusi tinggi", type: "TIME" }
      ]
    },
    { 
      id: 7, 
      current: !!levelStats[6]?.bestTime && !levelStats[7]?.bestTime, 
      active: !!levelStats[6]?.bestTime, 
      title: "Sektor 07: Steganografi Media",
      challengeType: "STEGANOGRAPHY",
      stars: levelStats[7]?.stars || 0,
      bestTime: levelStats[7]?.bestTime || null,
      objectives: [
        { text: "Selesaikan Tantangan", sub: "Misi Utama Berhasil", type: "COMPLETE" },
        { text: "Analisis Mandiri I", sub: "Tanpa Hint Tahap 1", type: "HINT" },
        { text: "Analisis Mandiri II", sub: "Tanpa Hint Tahap 2", type: "HINT" },
        { text: "Analisis Mandiri III", sub: "Tanpa Hint Tahap 3", type: "HINT" }
      ]
    },
    { 
      id: 8, 
      current: !!levelStats[7]?.bestTime && !levelStats[8]?.bestTime, 
      active: !!levelStats[7]?.bestTime, 
      title: "Sektor 08: Pengintaian OSINT",
      challengeType: "OSINT",
      stars: levelStats[8]?.stars || 0,
      bestTime: levelStats[8]?.bestTime || null,
      objectives: [
        { text: "Selesaikan Tantangan", sub: "Misi Utama Berhasil", type: "COMPLETE" },
        { text: "Analisis Mandiri I", sub: "Tanpa Hint Tahap 1", type: "HINT" },
        { text: "Analisis Mandiri II", sub: "Tanpa Hint Tahap 2", type: "HINT" },
        { text: "Analisis Mandiri III", sub: "Tanpa Hint Tahap 3", type: "HINT" }
      ]
    },
    { 
      id: 9, 
      current: !!levelStats[8]?.bestTime && !levelStats[9]?.bestTime, 
      active: !!levelStats[8]?.bestTime, 
      title: "Sektor 09: Pembalikan Logika",
      challengeType: "REVERSE ENGINEERING",
      stars: levelStats[9]?.stars || 0,
      bestTime: levelStats[9]?.bestTime || null,
      objectives: [
        { text: "Selesaikan Tantangan", sub: "Misi Utama Berhasil", type: "COMPLETE" },
        { text: "Analisis Mandiri I", sub: "Tanpa Hint Tahap 1", type: "HINT" },
        { text: "Analisis Mandiri II", sub: "Tanpa Hint Tahap 2", type: "HINT" },
        { text: "Analisis Mandiri III", sub: "Tanpa Hint Tahap 3", type: "HINT" }
      ]
    },
    { 
      id: 10, 
      current: !!levelStats[9]?.bestTime && !levelStats[10]?.bestTime, 
      active: !!levelStats[9]?.bestTime, 
      title: "Sektor 10: Inti Pwning",
      challengeType: "PWNING",
      stars: levelStats[10]?.stars || 0,
      bestTime: levelStats[10]?.bestTime || null,
      objectives: [
        { text: "Selesaikan Tantangan", sub: "Misi Utama Berhasil", type: "COMPLETE" },
        { text: "Analisis Mandiri I", sub: "Tanpa Hint Tahap 1", type: "HINT" },
        { text: "Analisis Mandiri II", sub: "Tanpa Hint Tahap 2", type: "HINT" },
        { text: "Analisis Mandiri III", sub: "Tanpa Hint Tahap 3", type: "HINT" }
      ]
    },
  ];

  const handleDeployMission = () => {
    if (!selectedLevel) return;
    
    setIsShuffling(true);
    const missionId = selectedLevel.id;
    const finalType = selectedLevel.challengeType || poolModes[missionId % poolModes.length];

    let counter = 0;
    const shuffleInterval = setInterval(() => {
      // Shuffle randomly through pool modes
      setShuffleText(poolModes[Math.floor(Math.random() * poolModes.length)]);
      setShuffleColor(colors[Math.floor(Math.random() * colors.length)]);
      counter++;

      // In the last few frames, lock to the correct type for this level
      if (counter > 25) {
        setShuffleText(finalType);
      }

      if (counter > 30) {
        clearInterval(shuffleInterval);
        setIsShuffling(false);
        setShowTransitionCard(true);
        
        setTimeout(() => {
          navigate(`/ctf-arena/mode-acak/level/${missionId}`);
        }, 2000);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-mono selection:bg-cyan-500/30 overflow-hidden relative">
      
      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex flex-col h-screen">
        
        {/* HEADER */}
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-6">
            <Link 
              to="/ctf-arena"
              className="p-2 hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/10 group"
            >
              <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-cyan-400" />
            </Link>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_#06b6d4]" />
                <span className="text-[10px] uppercase font-black tracking-[0.4em] text-cyan-500/60">Mission Hub</span>
              </div>
              <h1 className="text-3xl font-black italic tracking-tighter uppercase flex items-center gap-3 text-white">
                Arena <span className="text-cyan-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">Mode Acak</span>
              </h1>
            </div>
          </div>
        </header>

        {/* MAIN INTERACTIVE AREA */}
        <div className="flex-1 flex gap-8 relative overflow-hidden">
            
            {/* LEFT SIDE: MISSION GRID */}
            <div className="flex-1 flex flex-col transition-all duration-700 relative group min-w-0">
                {/* Scroll Nav Buttons */}
                <button 
                   onClick={() => scrollContainerRef.current?.scrollBy({ left: -300, behavior: 'smooth' })}
                   className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center bg-black/50 border border-white/10 rounded-full text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-cyan-500/20 hover:border-cyan-500/50 shadow-lg"
                >
                   <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                   onClick={() => scrollContainerRef.current?.scrollBy({ left: 300, behavior: 'smooth' })}
                   className="absolute right-2 md:right-12 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center bg-black/50 border border-white/10 rounded-full text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-cyan-500/20 hover:border-cyan-500/50 shadow-lg"
                >
                   <ChevronRight className="w-6 h-6" />
                </button>

                <div className="mb-10 flex flex-col items-center">
                   <div className="text-[10px] font-black tracking-[0.6em] text-white/20 uppercase mb-4">Tactical_Grid: Sector_Alpha</div>
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: 300 }}
                     className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent relative"
                   >
                        <motion.div 
                          animate={{ left: ['0%', '100%', '0%'] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          className="absolute top-1/2 -translate-y-1/2 w-8 h-[2px] bg-cyan-400 blur-[2px]" 
                        />
                   </motion.div>
                </div>

                <div 
                   ref={scrollContainerRef} 
                   onMouseDown={handleMouseDown}
                   onMouseLeave={handleMouseLeave}
                   onMouseUp={handleMouseUp}
                   onMouseMove={handleMouseMove}
                   className={`flex-1 w-full overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
                >
                   <div className="min-w-max min-h-full flex flex-col justify-center gap-4 relative px-12 md:px-24">
                   
                   {/* 1. STARS & BEST TIME ROW */}
                   <div className="flex justify-between items-end w-[1960px] h-12 relative z-10">
                      {levels.map((node) => (
                        <div key={`stars-${node.id}`} className="w-20 flex flex-col items-center justify-end">
                           {node.active && (
                             <motion.div 
                               initial={{ opacity: 0, y: 10 }}
                               animate={{ opacity: 1, y: 0 }}
                               className={`flex flex-col items-center gap-1 transition-all duration-700 ${node.id === selectedLevel?.id || (node.current && !selectedLevel) ? 'opacity-100' : 'opacity-60'}`}
                             >
                                <div className="flex gap-1">
                                   {[...Array(node.id >= 7 ? 4 : 3)].map((_, i) => {
                                     const s = i + 1;
                                     return (
                                       <Zap 
                                         key={s} 
                                         className={`w-3.5 h-3.5 transition-all duration-500
                                           ${s <= node.stars ? 'text-cyan-400 fill-cyan-400 drop-shadow-[0_0_8px_#06b6d4]' : 'text-white/10 fill-transparent'}
                                         `} 
                                       />
                                     );
                                   })}
                                </div>
                                {node.bestTime && (
                                   <div className="text-[7px] font-black text-white/40 tracking-wider uppercase">BEST: {node.bestTime}</div>
                                )}
                             </motion.div>
                           )}
                        </div>
                      ))}
                      <div className="w-20" />
                   </div>

                   {/* 2. MISSION ROW (HEX + SVG LINES) */}
                   <div className="relative w-[1960px] h-24 flex items-center">
                      <div className="absolute inset-x-0 inset-y-0 pointer-events-none z-0">
                          <svg className="w-full h-full" viewBox="0 0 1960 100" preserveAspectRatio="none">
                            <defs>
                              <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="4" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                              </filter>
                              <linearGradient id="path-grad-inactive" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#374151" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#374151" stopOpacity="0.1" />
                              </linearGradient>
                              <linearGradient id="path-grad-1-2" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
                                <stop offset="100%" stopColor="#a855f7" stopOpacity="1" />
                              </linearGradient>
                              <linearGradient id="path-grad-2-3" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#a855f7" stopOpacity="1" />
                                <stop offset="100%" stopColor="#f97316" stopOpacity="1" />
                              </linearGradient>
                              <linearGradient id="path-grad-3-4" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#f97316" stopOpacity="1" />
                                <stop offset="100%" stopColor="#10b981" stopOpacity="1" />
                              </linearGradient>
                              <linearGradient id="path-grad-4-5" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
                                <stop offset="100%" stopColor="#facc15" stopOpacity="1" />
                              </linearGradient>
                              <linearGradient id="path-grad-5-6" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#facc15" stopOpacity="1" />
                                <stop offset="100%" stopColor="#ec4899" stopOpacity="1" />
                              </linearGradient>
                              <linearGradient id="path-grad-6-7" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#ec4899" stopOpacity="1" />
                                <stop offset="100%" stopColor="#6366f1" stopOpacity="1" />
                              </linearGradient>
                              <linearGradient id="path-grad-7-8" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#6366f1" stopOpacity="1" />
                                <stop offset="100%" stopColor="#f43f5e" stopOpacity="1" />
                              </linearGradient>
                              <linearGradient id="path-grad-8-9" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#f43f5e" stopOpacity="1" />
                                <stop offset="100%" stopColor="#ef4444" stopOpacity="1" />
                              </linearGradient>
                              <linearGradient id="path-grad-9_10" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#ef4444" stopOpacity="1" />
                                <stop offset="100%" stopColor="#991b1b" stopOpacity="1" />
                              </linearGradient>
                            </defs>
                            
                            {/* Connection 1-2 */}
                            <motion.line x1="71" y1="50" x2="179" y2="50" stroke={!!levelStats[1]?.bestTime ? "url(#path-grad-1-2)" : "url(#path-grad-inactive)"} strokeWidth="3" strokeLinecap="round" />
                            {!!levelStats[1]?.bestTime && (
                              <>
                                <motion.line x1="71" y1="50" x2="179" y2="50" stroke="#06b6d4" strokeWidth="12" filter="url(#neon-glow)" opacity="0.3" />
                                <motion.line x1="71" y1="50" x2="179" y2="50" stroke="#ffffff" strokeWidth="2" strokeDasharray="8 16" animate={{ strokeDashoffset: [0, -24] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="opacity-60" />
                              </>
                            )}

                            {/* Connection 2-3 */}
                            <motion.line x1="259" y1="50" x2="367" y2="50" stroke={!!levelStats[2]?.bestTime ? "url(#path-grad-2-3)" : "url(#path-grad-inactive)"} strokeWidth="3" strokeLinecap="round" />
                            {!!levelStats[2]?.bestTime && (
                              <>
                                <motion.line x1="259" y1="50" x2="367" y2="50" stroke="#a855f7" strokeWidth="12" filter="url(#neon-glow)" opacity="0.3" />
                                <motion.line x1="259" y1="50" x2="367" y2="50" stroke="#ffffff" strokeWidth="2" strokeDasharray="8 16" animate={{ strokeDashoffset: [0, -24] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="opacity-60" />
                              </>
                            )}

                            {/* Connection 3-4 */}
                            <motion.line x1="447" y1="50" x2="555" y2="50" stroke={!!levelStats[3]?.bestTime ? "url(#path-grad-3-4)" : "url(#path-grad-inactive)"} strokeWidth="3" strokeLinecap="round" />
                            {!!levelStats[3]?.bestTime && (
                              <>
                                <motion.line x1="447" y1="50" x2="555" y2="50" stroke="#f97316" strokeWidth="12" filter="url(#neon-glow)" opacity="0.3" />
                                <motion.line x1="447" y1="50" x2="555" y2="50" stroke="#ffffff" strokeWidth="2" strokeDasharray="8 16" animate={{ strokeDashoffset: [0, -24] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="opacity-60" />
                              </>
                            )}

                            {/* Connection 4-5 */}
                            <motion.line x1="635" y1="50" x2="743" y2="50" stroke={!!levelStats[4]?.bestTime ? "url(#path-grad-4-5)" : "url(#path-grad-inactive)"} strokeWidth="3" strokeLinecap="round" />
                            {!!levelStats[4]?.bestTime && (
                              <>
                                <motion.line x1="635" y1="50" x2="743" y2="50" stroke="#10b981" strokeWidth="12" filter="url(#neon-glow)" opacity="0.3" />
                                <motion.line x1="635" y1="50" x2="743" y2="50" stroke="#ffffff" strokeWidth="2" strokeDasharray="8 16" animate={{ strokeDashoffset: [0, -24] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="opacity-60" />
                              </>
                            )}

                            {/* Connection 5-6 */}
                            <motion.line x1="823" y1="50" x2="931" y2="50" stroke={!!levelStats[5]?.bestTime ? "url(#path-grad-5-6)" : "url(#path-grad-inactive)"} strokeWidth="3" strokeLinecap="round" />
                            {!!levelStats[5]?.bestTime && (
                              <>
                                <motion.line x1="823" y1="50" x2="931" y2="50" stroke="#facc15" strokeWidth="12" filter="url(#neon-glow)" opacity="0.3" />
                                <motion.line x1="823" y1="50" x2="931" y2="50" stroke="#ffffff" strokeWidth="2" strokeDasharray="8 16" animate={{ strokeDashoffset: [0, -24] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="opacity-60" />
                              </>
                            )}

                            {/* Connection 6-7 */}
                            <motion.line x1="1011" y1="50" x2="1119" y2="50" stroke={!!levelStats[6]?.bestTime ? "url(#path-grad-6-7)" : "url(#path-grad-inactive)"} strokeWidth="3" strokeLinecap="round" />
                            {!!levelStats[6]?.bestTime && (
                              <>
                                <motion.line x1="1011" y1="50" x2="1119" y2="50" stroke="#ec4899" strokeWidth="12" filter="url(#neon-glow)" opacity="0.3" />
                                <motion.line x1="1011" y1="50" x2="1119" y2="50" stroke="#ffffff" strokeWidth="2" strokeDasharray="8 16" animate={{ strokeDashoffset: [0, -24] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="opacity-60" />
                              </>
                            )}

                            {/* Connection 7-8 */}
                            <motion.line x1="1199" y1="50" x2="1307" y2="50" stroke={!!levelStats[7]?.bestTime ? "url(#path-grad-7-8)" : "url(#path-grad-inactive)"} strokeWidth="3" strokeLinecap="round" />
                            {!!levelStats[7]?.bestTime && (
                              <>
                                <motion.line x1="1199" y1="50" x2="1307" y2="50" stroke="#6366f1" strokeWidth="12" filter="url(#neon-glow)" opacity="0.3" />
                                <motion.line x1="1199" y1="50" x2="1307" y2="50" stroke="#ffffff" strokeWidth="2" strokeDasharray="8 16" animate={{ strokeDashoffset: [0, -24] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="opacity-60" />
                              </>
                            )}

                            {/* Connection 8-9 */}
                            <motion.line x1="1387" y1="50" x2="1495" y2="50" stroke={!!levelStats[8]?.bestTime ? "url(#path-grad-8-9)" : "url(#path-grad-inactive)"} strokeWidth="3" strokeLinecap="round" />
                            {!!levelStats[8]?.bestTime && (
                              <>
                                <motion.line x1="1387" y1="50" x2="1495" y2="50" stroke="#f43f5e" strokeWidth="12" filter="url(#neon-glow)" opacity="0.3" />
                                <motion.line x1="1387" y1="50" x2="1495" y2="50" stroke="#ffffff" strokeWidth="2" strokeDasharray="8 16" animate={{ strokeDashoffset: [0, -24] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="opacity-60" />
                              </>
                            )}

                            {/* Connection 9-10 */}
                            <motion.line x1="1575" y1="50" x2="1683" y2="50" stroke={!!levelStats[9]?.bestTime ? "url(#path-grad-9_10)" : "url(#path-grad-inactive)"} strokeWidth="3" strokeLinecap="round" />
                            {!!levelStats[9]?.bestTime && (
                              <>
                                <motion.line x1="1575" y1="50" x2="1683" y2="50" stroke="#ef4444" strokeWidth="12" filter="url(#neon-glow)" opacity="0.3" />
                                <motion.line x1="1575" y1="50" x2="1683" y2="50" stroke="#ffffff" strokeWidth="2" strokeDasharray="8 16" animate={{ strokeDashoffset: [0, -24] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="opacity-60" />
                              </>
                            )}
                          </svg>
                      </div>

                      <div className="w-full flex justify-between items-center relative z-10">
                         {levels.map((node) => (
                            <motion.button
                               key={`hex-${node.id}`}
                               disabled={!node.active}
                               onClick={() => setSelectedLevel(node)}
                               whileHover={node.active ? { scale: 1.05, y: -2 } : {}}
                               className={`w-20 h-20 flex items-center justify-center relative transition-all duration-700
                                 ${node.active ? 'cursor-pointer active:scale-95' : 'cursor-not-allowed'}
                                 ${(!node.current && !selectedLevel) || (selectedLevel && node.id !== selectedLevel.id) ? node.active ? 'opacity-100' : 'opacity-30 grayscale-[0.8]' : 'opacity-100'}`}
                            >
                               <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                                  <polygon 
                                     points="50 3, 93 25, 93 75, 50 97, 7 75, 7 25" 
                                     className={`transition-all duration-700 stroke-[2.5]
                                       ${node.id === selectedLevel?.id || (node.current && !selectedLevel)
                                         ? node.id === 2 ? 'fill-purple-900/90 stroke-purple-400 shadow-[0_0_35px_rgba(168,85,247,0.8)]' 
                                           : node.id === 10 ? 'fill-red-800/90 stroke-red-500 shadow-[0_0_35px_rgba(239,68,68,0.8)]'
                                           : node.id === 3 ? 'fill-orange-900/90 stroke-orange-400 shadow-[0_0_35px_rgba(249,115,22,0.8)]'
                                           : node.id === 4 ? 'fill-emerald-900/90 stroke-emerald-400 shadow-[0_0_35px_rgba(16,185,129,0.8)]'
                                           : node.id === 5 ? 'fill-yellow-900/90 stroke-yellow-400 shadow-[0_0_35px_rgba(250,204,21,0.8)]'
                                           : node.id === 6 ? 'fill-pink-900/90 stroke-pink-400 shadow-[0_0_35px_rgba(236,72,153,0.8)]'
                                           : node.id === 7 ? 'fill-indigo-900/90 stroke-indigo-400 shadow-[0_0_35px_rgba(99,102,241,0.8)]'
                                           : node.id === 8 ? 'fill-rose-900/90 stroke-rose-400 shadow-[0_0_35px_rgba(244,63,94,0.8)]'
                                           : node.id === 9 ? 'fill-red-900/90 stroke-red-400 shadow-[0_0_35px_rgba(239,68,68,0.8)]'
                                           : 'fill-cyan-900/90 stroke-cyan-400 shadow-[0_0_35px_rgba(6,182,212,0.8)]' 
                                         : node.active 
                                           ? node.id === 1 ? 'fill-cyan-800/40 stroke-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.6)]' 
                                             : node.id === 10 ? 'fill-red-800/40 stroke-red-500 shadow-[0_0_25px_rgba(239,68,68,0.6)]'
                                             : node.id === 3 ? 'fill-orange-800/40 stroke-orange-400 shadow-[0_0_25px_rgba(249,115,22,0.6)]'
                                             : node.id === 4 ? 'fill-emerald-800/40 stroke-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.6)]'
                                             : node.id === 5 ? 'fill-yellow-800/40 stroke-yellow-400 shadow-[0_0_25px_rgba(250,204,21,0.6)]'
                                             : node.id === 6 ? 'fill-pink-800/40 stroke-pink-400 shadow-[0_0_25px_rgba(236,72,153,0.6)]'
                                             : node.id === 7 ? 'fill-indigo-800/40 stroke-indigo-400 shadow-[0_0_25px_rgba(99,102,241,0.6)]'
                                             : node.id === 8 ? 'fill-rose-800/40 stroke-rose-400 shadow-[0_0_25px_rgba(244,63,94,0.6)]'
                                             : node.id === 9 ? 'fill-red-800/40 stroke-red-400 shadow-[0_0_25px_rgba(239,68,68,0.6)]'
                                             : 'fill-purple-800/40 stroke-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.6)]'
                                           : 'fill-gray-900 stroke-gray-800'}`}
                                     style={{ opacity: Math.max(0.2, 1 - ((node.id - 1) * 0.045)) }}
                                  />
                               </svg>
                               <div className="relative z-10 flex flex-col items-center">
                                  {!node.active && <Lock className="w-4 h-4 text-gray-700 mb-0.5" />}
                                  <span className={`text-2xl font-black italic tracking-tighter ${node.active ? 'text-white' : 'text-gray-800'}`}
                                     style={{ opacity: Math.max(0.3, 1 - ((node.id - 1) * 0.045)) }}
                                  >
                                    {node.id}
                                  </span>
                               </div>

                               {node.active && (
                                 <motion.div 
                                   animate={{ 
                                     scale: [1, 1.25, 1], 
                                     opacity: (node.id === selectedLevel?.id || (node.current && !selectedLevel) ? [0.3, 0.6, 0.3] : [0.2, 0.4, 0.2]).map(v => v * Math.max(0.2, 1 - ((node.id - 1) * 0.05)))
                                   }}
                                   transition={{ duration: 2, repeat: Infinity }}
                                   className={`absolute inset-0 rounded-lg blur-3xl -z-10 ${node.id === 2 ? 'bg-purple-400' : node.id === 3 ? 'bg-orange-400' : node.id === 4 ? 'bg-emerald-400' : node.id === 5 ? 'bg-yellow-400' : node.id === 6 ? 'bg-pink-400' : node.id === 7 ? 'bg-indigo-400' : node.id === 8 ? 'bg-rose-400' : node.id === 9 ? 'bg-red-400' : node.id === 10 ? 'bg-red-500' : 'bg-cyan-400'}`}
                                 />
                               )}
                            </motion.button>
                         ))}

                         <div className="w-20 h-20 relative flex items-center justify-center group/soon cursor-not-allowed">
                            <motion.div 
                               animate={{ rotate: 360 }}
                               transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                               className="w-full h-full border border-dashed border-white/10 rounded-full flex items-center justify-center bg-white/[0.03]"
                            >
                               <Plus className="w-6 h-6 text-white/10" />
                            </motion.div>
                         </div>
                      </div>
                   </div>

                   <div className="flex justify-between items-start w-[1960px] h-10 relative z-10">
                      {levels.map((node) => (
                         <div key={`status-${node.id}`} className="w-20 flex flex-col items-center text-center pb-2 px-1">
                            <div className="flex flex-col items-center gap-1.5 h-6">
                               {(node.id === selectedLevel?.id || (node.current && !selectedLevel)) && (
                                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5"
                                     style={{ opacity: Math.max(0.2, 1 - ((node.id - 1) * 0.05)) }}
                                  >
                                     <div className={`w-1 h-1 rounded-full animate-ping ${node.id === 2 ? 'bg-purple-400 shadow-[0_0_5px_#a855f7]' : node.id === 3 ? 'bg-orange-400 shadow-[0_0_5px_#f97316]' : node.id === 4 ? 'bg-emerald-400 shadow-[0_0_5px_#10b981]' : node.id === 5 ? 'bg-yellow-400 shadow-[0_0_5px_#facc15]' : node.id === 6 ? 'bg-pink-400 shadow-[0_0_5px_#ec4899]' : node.id === 7 ? 'bg-indigo-400 shadow-[0_0_5px_#6366f1]' : node.id === 8 ? 'bg-rose-400 shadow-[0_0_5px_#f43f5e]' : node.id === 9 ? 'bg-red-400 shadow-[0_0_5px_#ef4444]' : node.id === 10 ? 'bg-red-500 shadow-[0_0_5px_#ef4444]' : 'bg-cyan-400 shadow-[0_0_5px_#06b6d4]'}`} />
                                     <span className={`text-[9px] font-black tracking-[0.2em] italic ${node.id === 2 ? 'text-purple-400' : node.id === 3 ? 'text-orange-400' : node.id === 4 ? 'text-emerald-400' : node.id === 5 ? 'text-yellow-400' : node.id === 6 ? 'text-pink-400' : node.id === 7 ? 'text-indigo-400' : node.id === 8 ? 'text-rose-400' : node.id === 9 ? 'text-red-400' : node.id === 10 ? 'text-red-500' : 'text-cyan-400'}`}>
                                        Aktif
                                     </span>
                                  </motion.div>
                               )}
                               {!node.active && <span className="text-[8px] font-black text-gray-800 tracking-widest uppercase italic leading-none inline-block">TERKUNCI</span>}
                            </div>
                         </div>
                      ))}
                      <div className="w-20 flex justify-center">
                         <span className="text-[7px] font-black text-white/20 tracking-[0.4em] uppercase italic transition-colors">Segera</span>
                      </div>
                   </div>
                   </div>
                </div>
            </div>

            {/* RIGHT SIDE: BRIEFING PANEL */}
            <AnimatePresence>
               {selectedLevel && (
                  <React.Fragment key="briefing-panel">
                     {/* Backdrop Click-to-Close */}
                     <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setSelectedLevel(null)}
                        className="absolute inset-0 z-40 cursor-pointer" // No bg color, just invisible click catcher
                     />
                     
                     <motion.div 
                       initial={{ opacity: 0, x: 380 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 380 }}
                       transition={{ type: "spring", damping: 25, stiffness: 200 }}
                       className="absolute right-0 top-0 bottom-0 w-[400px] bg-gray-950/80 backdrop-blur-2xl border-l border-white/10 z-50 p-8 flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
                     >
                     <div className="flex justify-between items-start mb-6 pt-4">
                        <div className="flex-1">
                           <div className="flex items-center gap-2 mb-1">
                              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#06b6d4]" />
                              <span className="text-[9px] uppercase font-black tracking-[0.3em] text-cyan-400/60">Mission Protocol</span>
                           </div>
                           <h3 className="text-xl font-black text-white italic uppercase tracking-tighter leading-none">{selectedLevel.title}</h3>
                        </div>
                        <button onClick={() => setSelectedLevel(null)} className="p-1.5 hover:bg-white/5 rounded-lg transition-all group">
                           <X className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                        </button>
                     </div>

                      <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        <div className="pt-2">
                           <div className="text-[9px] font-black uppercase text-gray-600 mb-3 tracking-[0.2em] flex items-center gap-2">Reward Efficiency</div>
                           <div className="space-y-1.5">
                               {selectedLevel.objectives?.map((obj, i) => {
                                 const isCompleted = (levelStats[selectedLevel.id]?.stars || 0) > i;
                                 return (
                                   <div key={i} className={`flex gap-4 p-2 rounded-lg border transition-all ${isCompleted ? 'bg-cyan-500/5 border-cyan-500/10' : 'bg-white/[0.01] border-transparent opacity-40'}`}>
                                       <div className="relative flex flex-col items-center">
                                          <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all duration-700 ${
                                            !isCompleted ? 'bg-gray-800 border-white/5' :
                                            selectedLevel.id === 2 ? 'bg-purple-500/10 border-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.2)]' : 
                                            selectedLevel.id === 3 ? 'bg-orange-500/10 border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.2)]' : 
                                            selectedLevel.id === 4 ? 'bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 
                                            selectedLevel.id === 5 ? 'bg-yellow-500/10 border-yellow-500/20 shadow-[0_0_10px_rgba(250,204,21,0.2)]' : 
                                            selectedLevel.id === 6 ? 'bg-pink-500/10 border-pink-500/20 shadow-[0_0_10px_rgba(236,72,153,0.2)]' : 
                                            selectedLevel.id === 7 ? 'bg-indigo-500/10 border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.2)]' : 
                                            selectedLevel.id === 8 ? 'bg-rose-500/10 border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.2)]' : 
                                            selectedLevel.id === 9 ? 'bg-red-500/10 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 
                                            selectedLevel.id === 10 ? 'bg-red-700/10 border-red-700/20 shadow-[0_0_10px_rgba(185,28,28,0.2)]' : 
                                            'bg-cyan-500/10 border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.2)]'}`}>
                                             <Zap className={`w-2.5 h-2.5 ${
                                               !isCompleted ? 'text-gray-700 fill-transparent' :
                                               selectedLevel.id === 2 ? 'text-purple-400 fill-purple-400 drop-shadow-[0_0_5px_#a855f7]' : 
                                               selectedLevel.id === 3 ? 'text-orange-400 fill-orange-400 drop-shadow-[0_0_5px_#f97316]' : 
                                               selectedLevel.id === 4 ? 'text-emerald-400 fill-emerald-400 drop-shadow-[0_0_5px_#10b981]' : 
                                               selectedLevel.id === 5 ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_5px_#facc15]' : 
                                               selectedLevel.id === 6 ? 'text-pink-400 fill-pink-400 drop-shadow-[0_0_5px_#ec4899]' : 
                                               selectedLevel.id === 7 ? 'text-indigo-400 fill-indigo-400 drop-shadow-[0_0_5px_#6366f1]' : 
                                               selectedLevel.id === 8 ? 'text-rose-400 fill-rose-400 drop-shadow-[0_0_5px_#f43f5e]' : 
                                               selectedLevel.id === 9 ? 'text-red-400 fill-red-400 drop-shadow-[0_0_5px_#ef4444]' : 
                                               selectedLevel.id === 10 ? 'text-red-600 fill-red-600 drop-shadow-[0_0_5px_#b91c1c]' : 
                                               'text-cyan-400 fill-cyan-400 drop-shadow-[0_0_5px_#06b6d4]'}`} />
                                          </div>
                                       </div>
                                       <div className="flex-1 min-w-0">
                                          <div className={`text-[10px] font-black uppercase tracking-tight leading-none mb-1 ${isCompleted ? 'text-white' : 'text-gray-600'}`}>{obj.text}</div>
                                          <div className="text-[8px] text-gray-500 font-bold tracking-widest leading-none">{obj.sub}</div>
                                       </div>
                                       {isCompleted && (
                                          <div className="flex items-center">
                                             <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                                          </div>
                                       )}
                                    </div>
                                 );
                               })}
                           </div>
                        </div>

                     </div>

                     <div className="mt-auto pt-6 border-t border-white/10">
                        <motion.button 
                          onClick={handleDeployMission}
                          whileHover={{ scale: 1.02, backgroundColor: '#22d3ee' }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-cyan-500 text-black font-black italic tracking-tighter flex items-center justify-center gap-3 py-3 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all group"
                        >
                           <Play className="w-4 h-4 fill-black group-hover:translate-x-1 transition-transform" />
                           <span className="text-sm">DEPLOY MISSION</span>
                        </motion.button>
                     </div>
                  </motion.div>
                  </React.Fragment>
               )}
            </AnimatePresence>
        </div>

        {/* BOTTOM NAV */}
        <div className="flex justify-between items-center opacity-30 px-8 mt-4">
             <div className="flex items-center gap-8 text-[8px] font-black tracking-widest uppercase">
               <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
                 <span>Node_Selection: REQUIRED</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-cyan-500/50 rounded-full" />
                 <span>Operation: PENDING</span>
               </div>
             </div>
             <div className="text-[8px] font-bold text-gray-700 uppercase tracking-tighter italic">-- SECTOR_ALPHA // CORE_GRID_ESTABLISHED --</div>
        </div>

        {/* DECOS */}
        <div className="mt-10 flex justify-center gap-20 opacity-10">
          <Terminal className="text-gray-500" />
          <Server className="text-gray-500" />
          <Target className="text-gray-500" />
        </div>
      </div>

      {/* OVERLAYS */}
      <AnimatePresence>
         {isShuffling && (
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="fixed inset-0 z-[100] bg-gray-950/90 backdrop-blur-md flex flex-col items-center justify-center"
            >
               <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.5, repeat: Infinity }} className="text-cyan-400 font-black text-[10px] tracking-[1em] mb-10 uppercase">SEDANG MEMILIH TANTANGAN...</motion.div>
               <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, -1, 1, -1, 0], filter: ["blur(0px)", "blur(2px)", "blur(0px)"] }} transition={{ duration: 0.1, repeat: Infinity }} className={`${shuffleColor} text-6xl md:text-8xl font-black italic tracking-tighter px-10 text-center uppercase drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]`}>{shuffleText}</motion.div>
               <div className="w-full max-w-md h-1 bg-gray-900 mt-20 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 3, ease: "linear" }} className="h-full bg-cyan-500 shadow-[0_0_15px_#06b6d4]" />
               </div>
            </motion.div>
         )}
      </AnimatePresence>

      <AnimatePresence>
         {showTransitionCard && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="fixed inset-0 z-[110] bg-gray-950 flex items-center justify-center p-6">
               <motion.div 
                  animate={{ boxShadow: ["0 0 20px 0px rgba(6,182,212,0.2)", "0 0 60px 10px rgba(6,182,212,0.4)", "0 0 20px 0px rgba(6,182,212,0.2)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-full max-w-2xl bg-gray-900 border-4 border-cyan-500 rounded-3xl p-10 md:p-14 flex flex-col items-center text-center relative overflow-hidden"
               >
                  <Target className="w-14 h-14 text-cyan-400 animate-pulse mb-8" />
                   <div className="mb-4">
                      <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-tight mb-2">LEVEL {selectedLevel?.id}:</h2>
                      <h2 className={`text-4xl md:text-7xl font-black italic tracking-tighter uppercase leading-none ${
                        selectedLevel?.id === 2 ? 'text-purple-400' : 
                        selectedLevel?.id === 3 ? 'text-orange-400' : 
                        selectedLevel?.id === 4 ? 'text-emerald-400' : 
                        selectedLevel?.id === 5 ? 'text-yellow-400' : 
                        selectedLevel?.id === 6 ? 'text-pink-400' : 
                        selectedLevel?.id === 7 ? 'text-indigo-400' : 
                        selectedLevel?.id === 8 ? 'text-rose-400' : 
                        selectedLevel?.id === 9 ? 'text-red-500' : 
                        selectedLevel?.id === 10 ? 'text-red-700' : 
                        'text-cyan-400'
                      }`}>
                        {selectedLevel?.challengeType || 'WEB EXPLOITATION'}
                      </h2>
                   </div>
                   <div className="flex items-center gap-3 mb-10">
                      {selectedLevel?.id === 2 ? <Radio className="w-5 h-5 text-purple-500" /> : selectedLevel?.id === 3 ? <HardDrive className="w-5 h-5 text-orange-500" /> : selectedLevel?.id === 4 ? <Network className="w-5 h-5 text-emerald-500" /> : selectedLevel?.id === 5 ? <Terminal className="w-5 h-5 text-yellow-500" /> : selectedLevel?.id === 6 ? <Database className="w-5 h-5 text-pink-500" /> : selectedLevel?.id === 7 ? <Image className="w-5 h-5 text-indigo-500" /> : selectedLevel?.id === 8 ? <Search className="w-5 h-5 text-rose-500" /> : selectedLevel?.id === 9 ? <Binary className="w-5 h-5 text-red-500" /> : selectedLevel?.id === 10 ? <Skull className="w-5 h-5 text-red-700" /> : <Globe className="w-5 h-5 text-cyan-500" />}
                      <span className={`${
                        selectedLevel?.id === 2 ? 'text-purple-500/80' : 
                        selectedLevel?.id === 3 ? 'text-orange-500/80' : 
                        selectedLevel?.id === 4 ? 'text-emerald-500/80' : 
                        selectedLevel?.id === 5 ? 'text-yellow-500/80' : 
                        selectedLevel?.id === 6 ? 'text-pink-500/80' : 
                        selectedLevel?.id === 7 ? 'text-indigo-500/80' : 
                        selectedLevel?.id === 8 ? 'text-rose-500/80' : 
                        selectedLevel?.id === 9 ? 'text-red-500/80' : 
                        selectedLevel?.id === 10 ? 'text-red-700/80' : 
                        'text-cyan-400/80'
                      } font-black tracking-[0.3em] text-xs uppercase leading-none inline-block`}>
                        TARGET: {selectedLevel?.id === 2 ? 'SECTOR_CRYPTO' : selectedLevel?.id === 3 ? 'SECTOR_MEMORY' : selectedLevel?.id === 4 ? 'SECTOR_NETWORK' : selectedLevel?.id === 5 ? 'SECTOR_TERMINAL' : selectedLevel?.id === 6 ? 'SECTOR_DATABASE' : selectedLevel?.id === 7 ? 'SECTOR_MEDIA' : selectedLevel?.id === 8 ? 'SECTOR_OSINT' : selectedLevel?.id === 9 ? 'SECTOR_ASSEMBLY' : selectedLevel?.id === 10 ? 'SECTOR_KERNEL' : 'SECTOR_ALPHA'}
                      </span>
                   </div>
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.8, repeat: Infinity }} className="text-white font-black text-[10px] tracking-[0.5em] uppercase border-t border-white/10 pt-6 w-full max-w-xs leading-none inline-block">TANTANGAN FIXED: MEMUAT LEVEL...</motion.div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>

    </div>
  );
};

export default IndexModeAcak;
