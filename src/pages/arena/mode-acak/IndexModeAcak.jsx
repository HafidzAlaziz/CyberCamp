import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, Lock, Terminal, Zap, Target, Plus, Server, Play, X, Globe, Radio, HardDrive, Network, Database, Image, Search, Binary, Skull, ShieldCheck, Cpu
} from 'lucide-react';

const baseLevelData = {
  'MUDAH': {
    1: { id: 1, title: "Sektor 01: Pengintaian OSINT", challengeType: "OSINT", target: "SECTOR_OSINT", icon: 'Search', objectives: [{ text: "Selesaikan Tantangan", sub: "Misi Utama Berhasil", type: "COMPLETE" }, { text: "Tanpa Bantuan / Hint", sub: "Gunakan keahlian murni", type: "HINT" }, { text: "Selesai di bawah 10 Menit", sub: "Kecepatan eksekusi tinggi", type: "TIME" }] },
    2: { id: 2, title: "Sektor 02: System Terminal", challengeType: "LINUX / TERMINAL", target: "SECTOR_TERMINAL", icon: 'Terminal', objectives: [{ text: "Selesaikan Tantangan", sub: "Status: Operasional", type: "COMPLETE" }, { text: "Tanpa Bantuan / Hint", sub: "Gunakan keahlian murni", type: "HINT" }, { text: "Selesai di bawah 12 Menit", sub: "Kecepatan eksekusi tinggi", type: "TIME" }] },
    3: { id: 3, title: "Sektor 03: Sinyal Kripto", challengeType: "CRYPTOGRAPHY", target: "SECTOR_CRYPTO", icon: 'Radio', objectives: [{ text: "Selesaikan Tantangan", sub: "Status: Operasional", type: "COMPLETE" }, { text: "Tanpa Bantuan / Hint", sub: "Gunakan keahlian murni", type: "HINT" }, { text: "Selesai di bawah 5 Menit", sub: "Kecepatan eksekusi tinggi", type: "TIME" }] },
    4: { id: 4, title: "Sektor 04: Digital Forensics", challengeType: "DIGITAL FORENSICS", target: "SECTOR_FORENSIC", icon: 'HardDrive', objectives: [{ text: "Selesaikan Tantangan", sub: "Misi Utama Berhasil", type: "COMPLETE" }, { text: "Tanpa Bantuan / Hint", sub: "Gunakan keahlian murni", type: "HINT" }, { text: "Selesai di bawah 10 Menit", sub: "Kecepatan eksekusi tinggi", type: "TIME" }] },
    5: { id: 5, title: "Sektor 05: Infiltrasi Web", challengeType: "WEB EXPLOITATION", target: "SECTOR_ALPHA", icon: 'Globe', objectives: [{ text: "Selesaikan Tantangan", sub: "Misi Utama Berhasil", type: "COMPLETE" }, { text: "Tanpa Bantuan / Hint", sub: "Gunakan keahlian murni", type: "HINT" }, { text: "Selesai di bawah 12 Menit", sub: "Kecepatan eksekusi tinggi", type: "TIME" }] },
    6: { id: 6, title: "Sektor 06: Analisis Jaringan", challengeType: "NETWORK ANALYSIS", target: "SECTOR_NETWORK", icon: 'Network', objectives: [{ text: "Selesaikan Tantangan", sub: "Misi Utama Berhasil", type: "COMPLETE" }, { text: "Tanpa Bantuan / Hint", sub: "Gunakan keahlian murni", type: "HINT" }, { text: "Selesai di bawah 15 Menit", sub: "Kecepatan eksekusi tinggi", type: "TIME" }] },
    7: { id: 7, title: "Sektor 07: Steganografi Media", challengeType: "STEGANOGRAPHY", target: "SECTOR_MEDIA", icon: 'Image', objectives: [{ text: "Selesaikan Tantangan", sub: "Misi Utama Berhasil", type: "COMPLETE" }, { text: "Tanpa Bantuan / Hint", sub: "Gunakan keahlian murni", type: "HINT" }, { text: "Selesai di bawah 15 Menit", sub: "Kecepatan eksekusi tinggi", type: "TIME" }] },
    8: { id: 8, title: "Sektor 08: Infiltrasi Database", challengeType: "SQL INJECTION", target: "SECTOR_DATABASE", icon: 'Database', objectives: [{ text: "Selesaikan Tantangan", sub: "Misi Utama Berhasil", type: "COMPLETE" }, { text: "Tanpa Bantuan / Hint", sub: "Gunakan keahlian murni", type: "HINT" }, { text: "Selesai di bawah 20 Menit", sub: "Kecepatan eksekusi tinggi", type: "TIME" }] },
    9: { id: 9, title: "Sektor 09: Pembalikan Logika", challengeType: "REVERSE ENGINEERING", target: "SECTOR_LOGIC", icon: 'Binary', objectives: [{ text: "Selesaikan Tantangan", sub: "Misi Utama Berhasil", type: "COMPLETE" }, { text: "Tanpa Bantuan / Hint", sub: "Gunakan keahlian murni", type: "HINT" }, { text: "Selesai di bawah 20 Menit", sub: "Kecepatan eksekusi tinggi", type: "TIME" }] },
    10: { id: 10, title: "Sektor 10: Inti Pwning", challengeType: "PWNING", target: "SECTOR_KERNEL", icon: 'Skull', objectives: [{ text: "Selesaikan Tantangan", sub: "Misi Utama Berhasil", type: "COMPLETE" }, { text: "Tanpa Bantuan / Hint", sub: "Gunakan keahlian murni", type: "HINT" }, { text: "Selesai di bawah 20 Menit", sub: "Kecepatan eksekusi tinggi", type: "TIME" }] }
  },
  'MENENGAH': {},
  'SULIT': {}
};

const categories = {
  MUDAH: {
    title: "MUDAH",
    label: "EASY",
    color: "text-cyan-400",
    border: "border-cyan-500",
    stroke: "stroke-cyan-400",
    fill: "fill-cyan-900",
    shadow: "shadow-[0_0_30px_rgba(6,182,212,0.2)]",
    hoverShadow: "hover:shadow-[0_0_50px_rgba(6,182,212,0.4)]",
    bgGlow: "bg-cyan-500/10",
    hexGlow: "bg-cyan-400",
    lineColor: "#22d3ee",
    ping: "bg-cyan-400 shadow-[0_0_5px_#22d3ee]",
    icon: <ShieldCheck className="w-10 h-10 text-cyan-400 mb-2" />,
    levels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    isComingSoon: false
  },
  MENENGAH: {
    title: "MENENGAH",
    label: "MEDIUM",
    color: "text-yellow-400",
    border: "border-yellow-500",
    stroke: "stroke-yellow-400",
    fill: "fill-yellow-900",
    shadow: "shadow-[0_0_30px_rgba(234,179,8,0.2)]",
    hoverShadow: "hover:shadow-[0_0_50px_rgba(234,179,8,0.4)]",
    bgGlow: "bg-yellow-500/10",
    hexGlow: "bg-yellow-400",
    lineColor: "#facc15",
    ping: "bg-yellow-400 shadow-[0_0_5px_#facc15]",
    icon: <Globe className="w-10 h-10 text-yellow-400 mb-2" />,
    levels: [],
    isComingSoon: true
  },
  SULIT: {
    title: "SULIT",
    label: "HARD",
    color: "text-red-500",
    border: "border-red-500",
    stroke: "stroke-red-500",
    fill: "fill-red-900",
    shadow: "shadow-[0_0_30px_rgba(239,68,68,0.2)]",
    hoverShadow: "hover:shadow-[0_0_50px_rgba(239,68,68,0.4)]",
    bgGlow: "bg-red-500/10",
    hexGlow: "bg-red-500",
    lineColor: "#ef4444",
    ping: "bg-red-500 shadow-[0_0_5px_#ef4444]",
    icon: <Cpu className="w-10 h-10 text-red-500 mb-2" />,
    levels: [],
    isComingSoon: true
  }
};

const iconMap = {
  Globe: Globe,
  Radio: Radio,
  HardDrive: HardDrive,
  Network: Network,
  Terminal: Terminal,
  Database: Database,
  Image: Image,
  Search: Search,
  Binary: Binary,
  Skull: Skull
};

const IndexModeAcak = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  const handleMouseDown = (e) => {
    setIsDragging(true);
    if (scrollContainerRef.current) {
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
    }
  };
  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; 
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };
  
  const [isShuffling, setIsShuffling] = useState(false);
  const [shuffleText, setShuffleText] = useState('SYSTEM READY');
  const [shuffleColor, setShuffleColor] = useState('text-cyan-400');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [showTransitionCard, setShowTransitionCard] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const [levelStats] = useState(() => {
    const saved = localStorage.getItem('ctf_mode_acak_stats');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    if (location.state?.returnToLevel) {
       const returnVal = location.state.returnToLevel;
       const [catLower, lvlStr] = returnVal.split('-');
       const catKey = catLower ? catLower.toUpperCase() : null;
       const lvl = parseInt(lvlStr);

       if(catKey && categories[catKey]) {
           setSelectedDifficulty(catKey);
           setTimeout(() => {
              if (scrollContainerRef.current) {
                 const index = categories[catKey].levels.indexOf(lvl);
                 const scrollPos = index * 188 - 50;
                 scrollContainerRef.current.scrollLeft = scrollPos > 0 ? scrollPos : 0;
              }
           }, 300);
       }
    }
  }, [location.state]);

  useEffect(() => {
    if (selectedDifficulty) {
      const cat = categories[selectedDifficulty];
      // Set global accent color for scrollbars etc
      const hex = cat.lineColor;
      document.documentElement.style.setProperty('--accent-color', hex);
    } else {
      document.documentElement.style.setProperty('--accent-color', '#00ffff'); // default cyan
    }
  }, [selectedDifficulty]);

  const poolModes = ["WEB EXPLOITATION", "CRYPTOGRAPHY", "FORENSICS", "STEGANOGRAPHY", "OSINT", "REVERSING", "PWNING"];
  const colorsArray = ["text-cyan-400", "text-yellow-400", "text-red-500", "text-purple-500"];
  
  const currentCategory = selectedDifficulty ? categories[selectedDifficulty] : null;

  const getMapLevels = () => {
    if (!selectedDifficulty || !baseLevelData[selectedDifficulty]) return [];
    
    return currentCategory.levels.map((id, index) => {
        const prevId = index === 0 ? null : currentCategory.levels[index - 1];
        const prevKey = prevId === null ? null : `${selectedDifficulty.toLowerCase()}-${prevId}`;
        const currentKey = `${selectedDifficulty.toLowerCase()}-${id}`;
        
        const isPrevCompleted = prevKey === null ? true : !!levelStats[prevKey]?.bestTime;
        const isCurrentCompleted = !!levelStats[currentKey]?.bestTime;

        return {
          ...baseLevelData[selectedDifficulty][id],
          active: isPrevCompleted,
          current: isPrevCompleted && !isCurrentCompleted,
          stars: levelStats[currentKey]?.stars || 0,
          bestTime: levelStats[currentKey]?.bestTime || null,
          index
        };
    });
  };

  const mapLevels = getMapLevels();

  // Cek apakah semua level mudah sudah selesai
  const mudahLevelIds = categories['MUDAH']?.levels || [];
  const allMudahCompleted = mudahLevelIds.length > 0 && mudahLevelIds.every(
    id => !!levelStats[`mudah-${id}`]?.bestTime
  );

  const handleDeployMission = () => {
    if (!selectedLevel) return;
    
    setIsShuffling(true);
    const missionId = selectedLevel.id;
    const finalType = selectedLevel.challengeType || poolModes[missionId % poolModes.length];

    let counter = 0;
    const shuffleInterval = setInterval(() => {
      setShuffleText(poolModes[Math.floor(Math.random() * poolModes.length)]);
      setShuffleColor(colorsArray[Math.floor(Math.random() * colorsArray.length)]);
      counter++;

      if (counter > 25) {
        setShuffleText(finalType);
      }

      if (counter > 30) {
        clearInterval(shuffleInterval);
        setIsShuffling(false);
        setShowTransitionCard(true);
        setTimeout(() => {
          navigate(`/ctf-arena/mode-acak/${selectedDifficulty.toLowerCase()}/level/${missionId}`);
        }, 2000);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-mono selection:bg-white/20 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] ${selectedDifficulty ? currentCategory.bgGlow : 'bg-cyan-500/5'} blur-[120px] rounded-full transition-all duration-1000`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] ${selectedDifficulty ? (selectedDifficulty === 'MENENGAH' ? 'bg-orange-500/5' : 'bg-red-950/10') : 'bg-purple-500/5'} blur-[120px] rounded-full transition-all duration-1000`} />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex flex-col h-screen">
        <header className="flex justify-between items-center mb-12 shrink-0">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => {
                 if (selectedDifficulty) {
                     setSelectedDifficulty(null);
                     setSelectedLevel(null);
                 } else {
                     navigate('/ctf-arena');
                 }
              }}
              className={`p-2 hover:bg-white/5 rounded-xl transition-all border border-transparent ${selectedDifficulty ? `hover:border-${currentCategory.color.replace('text-', '')}/50` : 'hover:border-white/10'} group z-20`}
            >
              <ChevronLeft className={`w-6 h-6 transition-all ${selectedDifficulty ? `${currentCategory.color} drop-shadow-[0_0_10px_currentColor]` : 'text-gray-400 group-hover:text-cyan-400'}`} />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2 h-2 rounded-full animate-pulse ${selectedDifficulty ? currentCategory.ping : 'bg-cyan-500 shadow-[0_0_10px_#06b6d4]'}`} />
                <span className="text-[10px] uppercase font-black tracking-[0.4em] text-white/60">
                   {selectedDifficulty ? `${selectedDifficulty} PROTOCOL` : 'Mission Hub'}
                </span>
              </div>
              <h1 className="text-3xl font-black italic tracking-tighter uppercase flex items-center gap-3 text-white">
                Arena <span className={selectedDifficulty ? `${currentCategory.color} drop-shadow-[0_0_15px_currentColor]` : 'text-cyan-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]'}>Mode Acak</span>
              </h1>
            </div>
          </div>
        </header>

        <div className="flex-1 flex gap-8 relative overflow-hidden">
            {!selectedDifficulty ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 w-full px-8 z-10 pb-20"
                >
                    {Object.entries(categories).map(([catKey, cat]) => (
                        <motion.button 
                          key={catKey}
                          onClick={() => {
                              if (cat.isComingSoon) {
                                  setSelectedLevel(null);
                                  setIsShuffling(true);
                                  setShuffleText('COMING SOON');
                                  setShuffleColor(cat.color);
                                  setTimeout(() => setIsShuffling(false), 2000);
                                  return;
                              }
                              setSelectedDifficulty(catKey);
                          }}
                          whileHover={{ scale: 1.05, y: -10 }}
                          whileTap={{ scale: 0.95 }}
                          className={`relative group w-full md:w-1/3 max-w-[340px] md:max-w-[300px] aspect-[1/1] flex flex-col items-center justify-center border ${cat.border} rounded-3xl bg-gray-900/50 backdrop-blur-sm transition-all duration-500 overflow-hidden ${cat.shadow} ${cat.hoverShadow}`}
                        >
                             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                             <div className={`absolute -inset-20 blur-3xl rounded-full ${cat.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                             
                             <div className="relative z-10 flex flex-col items-center p-8">
                                 {cat.icon}
                                 <h2 className={`text-4xl font-black italic tracking-tighter uppercase mb-2 ${cat.color} drop-shadow-[0_0_10px_currentColor]`}>{catKey}</h2>
                                 <div className="text-[10px] font-black tracking-[0.4em] uppercase text-white/50 mb-6">{cat.label} MODE</div>
                                 
                                 <div className="flex items-center gap-2 mt-auto">
                                    {cat.isComingSoon ? (
                                       <span className="text-[9px] font-black uppercase text-gray-500 tracking-widest group-hover:text-white transition-colors">🚧 SYSTEM IN DEVELOPMENT 🚧</span>
                                    ) : (
                                       <>
                                          <div className={`w-1.5 h-1.5 rounded-full ${cat.levels.filter(id => !!levelStats[`${catKey.toLowerCase()}-${id}`]?.bestTime).length === cat.levels.length ? 'bg-green-500' : 'bg-white/30 group-hover:bg-white animate-pulse'}`} />
                                          <span className="text-[9px] font-black uppercase text-gray-500 tracking-widest group-hover:text-white transition-colors">Diselesaikan {cat.levels.filter(id => !!levelStats[`${catKey.toLowerCase()}-${id}`]?.bestTime).length}/{cat.levels.length}</span>
                                       </>
                                    )}
                                 </div>
                             </div>
                        </motion.button>
                    ))}
                </motion.div>
            ) : (
                <div className="flex-1 flex flex-col transition-all duration-700 relative group min-w-0">
                    <button 
                       onClick={() => scrollContainerRef.current?.scrollBy({ left: -300, behavior: 'smooth' })}
                       className={`absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center bg-black/50 border border-white/10 rounded-full text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all ${selectedDifficulty ? `hover:bg-${currentCategory.color.replace('text-', '')}/20 hover:border-${currentCategory.border.replace('border-', '')}/50` : 'hover:bg-cyan-500/20 hover:border-cyan-500/50'} shadow-lg`}
                    >
                       <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                       onClick={() => scrollContainerRef.current?.scrollBy({ left: 300, behavior: 'smooth' })}
                       className={`absolute right-2 md:right-12 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center bg-black/50 border border-white/10 rounded-full text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all ${selectedDifficulty ? `hover:bg-${currentCategory.color.replace('text-', '')}/20 hover:border-${currentCategory.border.replace('border-', '')}/50` : 'hover:bg-cyan-500/20 hover:border-cyan-500/50'} shadow-lg`}
                    >
                       <ChevronRight className="w-6 h-6" />
                    </button>

                    <div className="mb-10 flex flex-col items-center">
                       <div className="text-[10px] font-black tracking-[0.6em] text-white/20 uppercase mb-4">Tactical_Grid: {selectedDifficulty}</div>
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: 300 }}
                         className={`h-px bg-gradient-to-r from-transparent via-${currentCategory.color.replace('text-', '')}/30 to-transparent relative`}
                       >
                            <motion.div 
                              animate={{ left: ['0%', '100%', '0%'] }}
                              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                              className={`absolute top-1/2 -translate-y-1/2 w-8 h-[2px] blur-[2px] ${currentCategory.hexGlow}`} 
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
                       
                       <div className="flex items-end h-12 relative z-10" style={{ gap: '108px' }}>
                          {mapLevels.map((node) => (
                            <div key={`stars-${node.id}`} className="w-20 flex flex-col items-center justify-end">
                               {node.active && (
                                 <motion.div 
                                   initial={{ opacity: 0, y: 10 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   className={`flex flex-col items-center gap-1 transition-all duration-700 ${node.id === selectedLevel?.id || (node.current && !selectedLevel) ? 'opacity-100' : 'opacity-60'}`}
                                 >
                                    <div className="flex gap-1">
                                       {[...Array(node.objectives ? node.objectives.length : 3)].map((_, i) => {
                                         const s = i + 1;
                                         return (
                                           <Zap 
                                             key={s} 
                                             className={`w-3.5 h-3.5 transition-all duration-500
                                               ${s <= node.stars ? `${currentCategory.color} fill-current drop-shadow-[0_0_8px_currentColor]` : 'text-white/10 fill-transparent'}
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
                       </div>

                       <div className="relative h-24 flex items-center">
                           <div className="absolute inset-x-0 inset-y-0 pointer-events-none z-0" style={{ width: `${currentCategory.levels.length * 188 - 108}px` }}>
                               <svg className="w-full h-full" style={{ overflow: 'visible' }}>
                                 <defs>
                                   <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                                     <feGaussianBlur stdDeviation="4" result="blur" />
                                     <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                   </filter>
                                 </defs>
                                 {mapLevels.map((node, i) => {
                                    if (i === mapLevels.length - 1) return null;
                                    const nodeStep = 188; const startX = 40 + i * nodeStep + 31;
                                    const endX = 40 + (i + 1) * nodeStep - 31;
                                    const nextCompleted = !!levelStats[`${selectedDifficulty.toLowerCase()}-${mapLevels[i+1].id}`]?.bestTime || mapLevels[i+1].active;
                                    const isCompleted = nextCompleted; 
                                    return (
                                        <React.Fragment key={`conn-${i}`}>
                                            <motion.line x1={startX} y1="50" x2={endX} y2="50" stroke={isCompleted ? currentCategory.lineColor : "#374151"} strokeWidth="3" strokeOpacity={isCompleted ? 1 : 0.2} strokeLinecap="round" />
                                            {isCompleted && (
                                                <>
                                                  <motion.line x1={startX} y1="50" x2={endX} y2="50" stroke={currentCategory.lineColor} strokeWidth="12" filter="url(#neon-glow)" opacity="0.3" />
                                                  <motion.line x1={startX} y1="50" x2={endX} y2="50" stroke="#ffffff" strokeWidth="2" strokeDasharray="8 16" animate={{ strokeDashoffset: [0, -24] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="opacity-60" />
                                                </>
                                            )}
                                        </React.Fragment>
                                    )
                                 })}
                               </svg>
                           </div>

                           <div className="w-full flex items-center relative z-10" style={{ gap: '108px' }}>
                              {mapLevels.map((node) => (
                                 <motion.button
                                    key={`hex-${node.id}`}
                                    disabled={!node.active}
                                    onClick={() => setSelectedLevel(node)}
                                    whileHover={node.active ? { scale: 1.05, y: -2 } : {}}
                                    className={`w-20 h-20 flex-shrink-0 flex items-center justify-center relative transition-all duration-700
                                      ${node.active ? 'cursor-pointer active:scale-95' : 'cursor-not-allowed'}
                                      ${(!node.current && !selectedLevel) || (selectedLevel && node.id !== selectedLevel.id) ? node.active ? 'opacity-100' : 'opacity-30 grayscale-[0.8]' : 'opacity-100'}`}
                                 >
                                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                                       <polygon 
                                          points="50 3, 93 25, 93 75, 50 97, 7 75, 7 25" 
                                          className={`transition-all duration-700 stroke-[2.5]
                                            ${node.id === selectedLevel?.id || (node.current && !selectedLevel)
                                              ? `${currentCategory.fill}/90 ${currentCategory.stroke} ${currentCategory.shadow.replace('0.2)', '0.8)')}`
                                              : node.active 
                                                ? `${currentCategory.fill.replace('900', '800')}/40 ${currentCategory.stroke} ${currentCategory.shadow.replace('0.2)', '0.6)')}`
                                                : 'fill-gray-900 stroke-gray-800'}`}
                                          style={{ opacity: Math.max(0.4, 1 - (node.index * 0.1)) }}
                                       />
                                    </svg>
                                    <div className="relative z-10 flex flex-col items-center">
                                       {!node.active && <Lock className="w-4 h-4 text-gray-700 mb-0.5" />}
                                       <span className={`text-2xl font-black italic tracking-tighter ${node.active ? 'text-white' : 'text-gray-800'}`}
                                          style={{ opacity: Math.max(0.4, 1 - (node.index * 0.1)) }}
                                       >
                                         {node.index + 1}
                                       </span>
                                    </div>

                                    {node.active && (
                                      <motion.div 
                                        animate={{ 
                                          scale: [1, 1.25, 1], 
                                          opacity: (node.id === selectedLevel?.id || (node.current && !selectedLevel) ? [0.3, 0.6, 0.3] : [0.2, 0.4, 0.2]).map(v => v * Math.max(0.2, 1 - (node.index * 0.1)))
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className={`absolute inset-0 rounded-lg blur-3xl -z-10 ${currentCategory.hexGlow}`}
                                      />
                                    )}
                                 </motion.button>
                              ))}
                              
                               {/* COMING SOON NODE */}
                               <div className="w-20 h-20 relative flex items-center justify-center group/soon cursor-default">
                                  {allMudahCompleted && selectedDifficulty === 'MUDAH' ? (
                                     <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="absolute inset-0 flex flex-col items-center justify-center"
                                     >
                                        <motion.div
                                           animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
                                           transition={{ duration: 2.5, repeat: Infinity }}
                                           className="w-full h-full flex items-center justify-center"
                                        >
                                           <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                                              <polygon
                                                 points="50 3, 93 25, 93 75, 50 97, 7 75, 7 25"
                                                 className="fill-cyan-900/30 stroke-cyan-400 stroke-[2.5]"
                                                 style={{ filter: 'drop-shadow(0 0 8px #06b6d4)' }}
                                              />
                                           </svg>
                                           <span className="relative z-10 text-[8px] font-black text-center text-cyan-400 leading-tight uppercase tracking-tight px-1">NEXT<br/>UPDATE</span>
                                        </motion.div>
                                        {/* Pulse ring */}
                                        <motion.div
                                           animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
                                           transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                                           className="absolute inset-0 rounded-full border border-cyan-400/50"
                                        />
                                     </motion.div>
                                  ) : (
                                     <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                        className="w-full h-full border border-dashed border-white/10 rounded-full flex items-center justify-center bg-white/[0.03]"
                                     >
                                        <Plus className="w-6 h-6 text-white/10" />
                                     </motion.div>
                                  )}
                               </div>
                           </div>
                       </div>

                       <div className="flex items-start h-10 relative z-10" style={{ gap: '108px' }}>
                          {mapLevels.map((node) => (
                             <div key={`status-${node.id}`} className="w-20 flex flex-col items-center text-center">
                                <div className="flex flex-col items-center gap-1.5 h-6">
                                   {(node.id === selectedLevel?.id || (node.current && !selectedLevel)) && (
                                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5">
                                         <div className={`w-1 h-1 rounded-full animate-ping ${currentCategory.ping}`} />
                                         <span className={`text-[9px] font-black tracking-[0.2em] italic ${currentCategory.color}`}>
                                             Aktif
                                         </span>
                                      </motion.div>
                                   )}
                                   {!node.active && <span className="text-[8px] font-black text-gray-800 tracking-widest uppercase italic leading-none inline-block">TERKUNCI</span>}
                                </div>
                             </div>
                          ))}
                          <div className="w-20 flex justify-center mt-1">
                             <span className={`text-[7px] font-black tracking-[0.4em] uppercase italic transition-colors ${allMudahCompleted && selectedDifficulty === 'MUDAH' ? 'text-cyan-400 animate-pulse' : 'text-white/20'}`}>
                                {allMudahCompleted && selectedDifficulty === 'MUDAH' ? 'UPDATE' : 'Segera'}
                             </span>
                          </div>
                       </div>
                       </div>
                    </div>

                    {/* Banner ketika semua level MUDAH selesai */}
                    {allMudahCompleted && selectedDifficulty === 'MUDAH' && (
                       <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-10 px-6"
                       >
                          <div className="bg-cyan-950/30 border border-cyan-500/30 rounded-2xl p-5 text-center relative overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.08)]">
                             <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                             <motion.div
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="text-[9px] font-black tracking-[0.6em] text-cyan-500 uppercase mb-2"
                             >
                                ✦ SEKTOR MUDAH: DILUMPUHKAN TOTAL ✦
                             </motion.div>
                             <p className="text-sm font-bold text-white/80 leading-relaxed">
                                "Perjalanan belum berakhir di sini."
                             </p>
                             <p className="text-[10px] text-gray-400 mt-1 italic">
                                Sistem sedang mempersiapkan sektor berikutnya. Tetap waspada — tantangan yang lebih dalam sedang menanti.
                             </p>
                             <div className="mt-4 inline-flex items-center gap-2 bg-black/40 border border-cyan-500/20 rounded-full px-4 py-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                <span className="text-[9px] font-black text-cyan-400 uppercase tracking-[0.3em]">Tunggu Update Selanjutnya</span>
                             </div>
                          </div>
                       </motion.div>
                    )}
                </div>
            )}

            <AnimatePresence>
               {selectedLevel && (
                  <React.Fragment key="briefing-panel">
                     <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setSelectedLevel(null)}
                        className="absolute inset-0 z-40 cursor-pointer" 
                     />
                     
                     <motion.div 
                       initial={{ opacity: 0, x: 380 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 380 }}
                       transition={{ type: "spring", damping: 25, stiffness: 200 }}
                       className={`absolute right-0 top-0 bottom-0 w-[400px] bg-gray-950/80 backdrop-blur-2xl border-l border-white/10 z-50 p-8 flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)]`}
                     >
                        <div className="flex justify-between items-start mb-6 pt-4">
                           <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                 <div className={`w-1.5 h-1.5 rounded-full ${currentCategory.ping}`} />
                                 <span className={`text-[9px] uppercase font-black tracking-[0.3em] ${currentCategory.color} opacity-60`}>Mission Protocol</span>
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
                                    const statsKey = `${selectedDifficulty.toLowerCase()}-${selectedLevel.id}`;
                                    const statEntry = levelStats[statsKey];
                                    const isCompleted = statEntry?.conditions ? statEntry.conditions[i] : (statEntry?.stars || 0) > i;
                                    return (
                                      <div key={i} className={`flex gap-4 p-2 rounded-lg border transition-all ${isCompleted ? `${currentCategory.bgGlow} ${currentCategory.border}/10` : 'bg-white/[0.01] border-transparent opacity-40'}`}>
                                          <div className="relative flex flex-col items-center">
                                             <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all duration-700 ${
                                               !isCompleted ? 'bg-gray-800 border-white/5' :
                                               `${currentCategory.bgGlow} ${currentCategory.border}/20 ${currentCategory.shadow.replace('0.2)', '0.2)')}`
                                             }`}>
                                                <Zap className={`w-2.5 h-2.5 ${!isCompleted ? 'text-gray-700 fill-transparent' : `${currentCategory.color} fill-current drop-shadow-[0_0_5px_currentColor]`}`} />
                                             </div>
                                          </div>
                                          <div className="flex-1 min-w-0">
                                             <div className={`text-[10px] font-black uppercase tracking-tight leading-none mb-1 ${isCompleted ? 'text-white' : 'text-gray-600'}`}>{obj.text}</div>
                                             <div className="text-[8px] text-gray-500 font-bold tracking-widest leading-none">{obj.sub}</div>
                                          </div>
                                          {isCompleted && (
                                             <div className="flex items-center">
                                                <div className={`w-1 h-1 rounded-full animate-pulse ${currentCategory.hexGlow}`} />
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
                             whileHover={{ scale: 1.02 }}
                             whileTap={{ scale: 0.98 }}
                             className={`w-full text-black font-black italic tracking-tighter flex items-center justify-center gap-3 py-3 rounded-xl transition-all group ${currentCategory.hexGlow} ${currentCategory.shadow}`}
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

        <div className="flex justify-between items-center opacity-30 px-8 mt-4 shrink-0">
             <div className="flex items-center gap-8 text-[8px] font-black tracking-widest uppercase">
               <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
                 <span>Node_Selection: {selectedDifficulty ? 'ACTIVE' : 'REQUIRED'}</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className={`w-1.5 h-1.5 rounded-full ${selectedDifficulty ? currentCategory.hexGlow : 'bg-cyan-500/50'}`} />
                 <span>Operation: PENDING</span>
               </div>
             </div>
             <div className="text-[8px] font-bold text-gray-700 uppercase tracking-tighter italic">-- {selectedDifficulty ? `SECTOR_${selectedDifficulty}` : 'SECTOR_ALPHA'} // CORE_GRID_ESTABLISHED --</div>
        </div>

        <div className="mt-6 flex justify-center gap-20 opacity-10 shrink-0">
          <Terminal className="text-gray-500" />
          <Server className="text-gray-500" />
          <Target className="text-gray-500" />
        </div>
      </div>

      <AnimatePresence>
         {isShuffling && (
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="fixed inset-0 z-[100] bg-gray-950/90 backdrop-blur-md flex flex-col items-center justify-center"
            >
               <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.5, repeat: Infinity }} className={`${currentCategory.color} font-black text-[10px] tracking-[1em] mb-10 uppercase`}>SEDANG MEMILIH TANTANGAN...</motion.div>
               <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, -1, 1, -1, 0], filter: ["blur(0px)", "blur(2px)", "blur(0px)"] }} transition={{ duration: 0.1, repeat: Infinity }} className={`${shuffleColor} text-6xl md:text-8xl font-black italic tracking-tighter px-10 text-center uppercase drop-shadow-[0_0_30px_${selectedDifficulty ? (selectedDifficulty === 'MENENGAH' ? 'rgba(234,179,8,0.5)' : 'rgba(239,68,68,0.5)') : 'rgba(6,182,212,0.5)'}]`}>{shuffleText}</motion.div>
               <div className="w-full max-w-md h-1 bg-gray-900 mt-20 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 3, ease: "linear" }} className={`h-full ${currentCategory.shadow}`} style={{ backgroundColor: currentCategory.lineColor }} />
               </div>
            </motion.div>
         )}
      </AnimatePresence>

      <AnimatePresence>
         {showTransitionCard && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="fixed inset-0 z-[110] bg-gray-950 flex items-center justify-center p-6">
               <motion.div 
                  animate={{ boxShadow: [`0 0 20px 0px ${currentCategory.lineColor}33`, `0 0 60px 10px ${currentCategory.lineColor}66`, `0 0 20px 0px ${currentCategory.lineColor}33`] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`w-full max-w-2xl bg-gray-900 border-4 ${currentCategory.border} rounded-3xl p-10 md:p-14 flex flex-col items-center text-center relative overflow-hidden`}
               >
                  <Target className={`w-14 h-14 ${currentCategory.color} animate-pulse mb-8`} />
                   <div className="mb-4">
                      <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-tight mb-2">LEVEL {selectedLevel?.id}:</h2>
                      <h2 className={`text-4xl md:text-7xl font-black italic tracking-tighter uppercase leading-none ${currentCategory.color}`}>
                        {selectedLevel?.challengeType || 'WEB EXPLOITATION'}
                      </h2>
                   </div>
                   <div className="flex items-center gap-3 mb-10">
                      {(() => {
                        const IconComp = iconMap[selectedLevel?.icon] || Globe;
                        return <IconComp className={`w-5 h-5 ${currentCategory.color}`} />;
                      })()}
                      <span className={`${currentCategory.color} font-black tracking-[0.3em] text-xs uppercase leading-none inline-block opacity-80`}>
                        TARGET: {selectedLevel?.target || 'SECTOR_ALPHA'}
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
