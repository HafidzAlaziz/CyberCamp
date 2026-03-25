import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  ChevronLeft,
  Lock,
  Terminal,
  Zap,
  Target,
  Plus,
  Server,
  Clock,
  ShieldAlert,
  Play,
  X,
  Globe
} from 'lucide-react';
import Level1 from './levels/Level1';

const IndexModeAcak = () => {
  const navigate = useNavigate();
  // States
  const [gameState, setGameState] = useState('selection'); // 'selection', 'playing'
  const [isShuffling, setIsShuffling] = useState(false);
  const [shuffleText, setShuffleText] = useState('SYSTEM READY');
  const [shuffleColor, setShuffleColor] = useState('text-cyan-400');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [showTransitionCard, setShowTransitionCard] = useState(false);

  // Load persistent stats
  const [levelStats, setLevelStats] = useState(() => {
    const saved = localStorage.getItem('ctf_mode_acak_stats');
    return saved ? JSON.parse(saved) : { 1: { stars: 0, bestTime: null } };
  });

  const poolModes = ["WEB EXPLOITATION", "CRYPTOGRAPHY", "FORENSICS", "STEGANOGRAPHY", "OSINT", "REVERSING", "PWNING"];
  const colors = ["text-cyan-400", "text-magenta-500", "text-pink-500", "text-purple-500"];

  const levels = [
    {
      id: 1,
      current: true,
      active: true,
      title: "Sektor 01: Infiltrasi Web",
      stars: levelStats[1]?.stars || 0,
      bestTime: levelStats[1]?.bestTime || null,
      objectives: [
        { text: "Selesaikan Tantangan", sub: "Status: Operasional", type: "COMPLETE" },
        { text: "Tanpa Bantuan / Hint", sub: "Gunakan keahlian murni", type: "HINT" },
        { text: "Selesai di bawah 10 Menit", sub: "Kecepatan eksekusi tinggi", type: "TIME" }
      ]
    },
    { id: 2, current: false, active: false, stars: 0 },
    { id: 3, current: false, active: false, stars: 0 },
    { id: 4, current: false, active: false, stars: 0 },
    { id: 5, current: false, active: false, stars: 0 },
  ];

  // Logic Gacha & Transitions
  const handleDeployMission = () => {
    if (!selectedLevel) return;
    
    setIsShuffling(true);
    setSelectedLevel(null); // Close sidebar

    let counter = 0;
    const shuffleInterval = setInterval(() => {
      setShuffleText(poolModes[Math.floor(Math.random() * poolModes.length)]);
      setShuffleColor(colors[Math.floor(Math.random() * colors.length)]);
      counter++;

      if (counter > 30) { // Approx 3 seconds
        clearInterval(shuffleInterval);
        setIsShuffling(false);
        setShowTransitionCard(true);
        
        // Wait 2 seconds then navigate
        setTimeout(() => {
          navigate('/ctf-arena/mode-acak/level/1');
        }, 2000);
      }
    }, 100);
  };

  const handleBackToDashboard = () => {
    setGameState('selection');
    setSelectedLevel(null);
  };

  if (gameState === 'playing') {
    return <Level1 onBack={handleBackToDashboard} />;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-4 md:p-10 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* TOP NAV */}
        <div className="flex justify-between items-center mb-10">
          <Link to="/ctf-arena" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all group">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> <span>KEMBALI KE ARENA</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-12 bg-gray-800" />
            <span className="text-[10px] font-black text-gray-700 tracking-[0.3em]">VERSION 4.0.2</span>
          </div>
        </div>

        {/* VIEWPORT-FITTING MISSION DASHBOARD */}
        <div className="w-full h-[calc(100vh-200px)] flex relative overflow-hidden">
            
            {/* LEFT SIDE: THE MAP AREA */}
            <div className={`flex-1 flex flex-col justify-between py-4`}>
               
               {/* TACTICAL HEADER */}
               <div className="flex justify-between items-end relative z-20 px-8">
                  <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                     <div className="flex items-center gap-3 mb-1">
                       <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_#06b6d4]" />
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400/80">Tactical Recon: Sector_Alpha</span>
                     </div>
                     <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">
                       MISSION <span className="text-cyan-500">MAP</span>
                     </h1>
                  </motion.div>
                  <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-right">
                     <div className="text-[9px] text-gray-700 font-bold uppercase tracking-widest mb-1.5">Sector_Progression: 01/05</div>
                     <div className="h-1 w-24 bg-gray-900 rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                           initial={{ width: 0 }} 
                           animate={{ width: '20%' }} 
                           className="h-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]" 
                        />
                     </div>
                  </motion.div>
               </div>

               {/* THE MAP AREA - TIGHTER HORIZONTAL PATH */}
               <div className="flex-1 relative flex items-center justify-center">
                  
                  {/* SVG CONNECTION LAYER (Contained) */}
                  <div className="absolute inset-0 max-w-5xl mx-auto flex items-center pointer-events-none">
                     <svg className="w-full h-[100px]" viewBox="0 0 1000 100" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="path-grad-fade" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#374151" stopOpacity="0.15" />
                          </linearGradient>
                        </defs>
                        <motion.line 
                          x1="50" y1="50" x2="950" y2="50"
                          stroke="url(#path-grad-fade)" 
                          strokeWidth="1.5"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.5 }}
                        />
                     </svg>
                  </div>

                  {/* HTML NODES (Contained) */}
                  <div className="w-full max-w-5xl mx-auto flex justify-between items-center relative z-10 px-8">
                     {levels.map((node) => (
                       <div key={node.id} className="relative flex flex-col items-center">
                          {/* Stars */}
                          {node.active && (
                             <div className={`flex flex-col items-center gap-1 mb-4 transition-opacity duration-700 ${node.id === selectedLevel?.id || (node.current && !selectedLevel) ? 'opacity-100' : 'opacity-40'}`}>
                                <div className="flex gap-1">
                                   {[1,2,3].map(s => (
                                     <Zap 
                                       key={s} 
                                       className={`w-3.5 h-3.5 transition-all duration-500
                                         ${s <= node.stars ? 'text-cyan-400 fill-cyan-400 drop-shadow-[0_0_8px_#06b6d4]' : 'text-white/10 fill-transparent'}
                                       `} 
                                     />
                                   ))}
                                </div>
                                {node.bestTime && (
                                   <div className="text-[7px] font-black text-white/40 tracking-wider uppercase">BEST: {node.bestTime}</div>
                                )}
                             </div>
                          )}
                          {!node.active && <div className="h-[30px] mb-4" />}

                          {/* Hex Button */}
                          <motion.button
                            disabled={!node.active}
                            onClick={() => setSelectedLevel(node)}
                            whileHover={node.active ? { scale: 1.05, y: -2 } : {}}
                            className={`w-20 h-20 flex items-center justify-center relative transition-all duration-700
                              ${node.active ? 'cursor-pointer active:scale-95' : 'cursor-not-allowed'}
                              ${(!node.current && !selectedLevel) || (selectedLevel && node.id !== selectedLevel.id) ? 'opacity-40 grayscale-[0.3]' : 'opacity-100'}`}
                          >
                             <svg className="absolute inset-0 w-full h-full drop-shadow-2xl" viewBox="0 0 100 100">
                                <polygon 
                                  points="50 3, 93 25, 93 75, 50 97, 7 75, 7 25" 
                                  className={`transition-all duration-700 stroke-[2]
                                    ${node.id === selectedLevel?.id || (node.current && !selectedLevel)
                                      ? 'fill-cyan-950/90 stroke-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]' 
                                      : 'fill-gray-900 stroke-gray-800'}`}
                                />
                             </svg>
                             <div className="relative z-10 flex flex-col items-center">
                                {!node.active && <Lock className="w-4 h-4 text-gray-700 mb-0.5" />}
                                <span className={`text-2xl font-black italic tracking-tighter ${node.id === selectedLevel?.id || (node.current && !selectedLevel) ? 'text-white' : 'text-gray-700'}`}>
                                  {node.id}
                                </span>
                             </div>

                             {(node.id === selectedLevel?.id || (node.current && !selectedLevel)) && (
                               <motion.div 
                                 animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0, 0.1] }}
                                 transition={{ duration: 3, repeat: Infinity }}
                                 className="absolute inset-0 bg-cyan-400 rounded-lg blur-2xl -z-10"
                               />
                             )}
                          </motion.button>
                          
                          <div className="h-6 mt-4">
                             {node.current && (
                                <span className="text-[8px] font-black text-cyan-400 tracking-[0.3em] uppercase italic">Current</span>
                             )}
                          </div>
                       </div>
                     ))}

                     {/* COMING SOON NODE - PERFECTLY ALIGNED */}
                     <div className="relative flex flex-col items-center group/soon">
                        <div className="h-[30px] mb-4" />
                        <motion.div 
                           animate={{ rotate: 360 }}
                           transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                           className="w-20 h-20 border border-dashed border-white/20 group-hover/soon:border-cyan-500/40 rounded-full flex items-center justify-center transition-all duration-500 bg-white/[0.05]"
                        >
                           <Plus className="w-6 h-6 text-white/20 group-hover/soon:text-cyan-400/60 transition-colors" />
                        </motion.div>
                        <div className="h-6 mt-4">
                           <span className="text-[7px] font-black text-white/30 group-hover/soon:text-cyan-400/50 tracking-[0.4em] uppercase italic transition-colors">Soon</span>
                        </div>
                     </div>
                  </div>

               </div>
            </div>

            {/* RIGHT SIDE: MISSION BRIEFING PANEL (Non-Modal) */}
            <AnimatePresence>
               {selectedLevel && (
                  <motion.div 
                    initial={{ opacity: 0, x: 380 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 380 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="absolute right-0 top-0 bottom-0 w-[400px] bg-gray-950/80 backdrop-blur-2xl border-l border-white/10 z-50 p-8 flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
                  >
                     {/* Compact Header */}
                     <div className="flex justify-between items-start mb-6 pt-4">
                        <div className="flex-1">
                           <div className="flex items-center gap-2 mb-1">
                              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#06b6d4]" />
                              <span className="text-[9px] uppercase font-black tracking-[0.3em] text-cyan-400/60">Mission Protocol</span>
                           </div>
                           <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">
                              {selectedLevel.title}
                           </h3>
                        </div>
                        <button 
                          onClick={() => setSelectedLevel(null)} 
                          className="p-1.5 hover:bg-white/5 rounded-lg transition-all group"
                        >
                           <X className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                        </button>
                     </div>

                     {/* NO-SCROLL COMPACT CONTENT */}
                     <div className="space-y-4 flex-1 overflow-hidden">
                        {/* Tighter Star Criteria */}
                        <div className="pt-2">
                           <div className="text-[9px] font-black uppercase text-gray-600 mb-3 tracking-[0.2em] flex items-center gap-2">
                              Reward Efficiency
                           </div>
                           <div className="space-y-1.5">
                              {selectedLevel.objectives?.map((obj, i) => (
                                 <div key={i} className="flex gap-4 p-2 rounded-lg bg-white/[0.01] border border-transparent hover:border-white/[0.03]">
                                    <div className="relative flex flex-col items-center">
                                       <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all duration-700 bg-cyan-500/10 border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.2)]`}>
                                          <Zap className={`w-2.5 h-2.5 text-cyan-400 fill-cyan-400 drop-shadow-[0_0_5px_#06b6d4]`} />
                                       </div>
                                    </div>
                                    <div>
                                       <div className={`text-[10px] font-black uppercase tracking-tight text-cyan-200`}>
                                          {obj.text}
                                       </div>
                                       <div className="text-[8px] text-gray-700 uppercase font-bold italic tracking-tighter">{obj.sub}</div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>

                     {/* TIGHTER FOOTER */}
                     <div className="mt-4 pt-4 border-t border-white/5 pb-6">
                        <motion.button 
                          onClick={handleDeployMission}
                          whileHover={{ scale: 1.02, backgroundColor: '#22d3ee' }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-cyan-500 text-black font-black italic tracking-tighter flex items-center justify-center gap-3 py-3 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all group"
                        >
                           <Play className="w-4 h-4 fill-black group-hover:translate-x-1 transition-transform" />
                           <span className="text-sm">DEPLOY MISSION</span>
                        </motion.button>
                        <div className="text-center mt-3 flex flex-col items-center gap-2">
                           <div className="w-8 h-px bg-gray-900 rounded-full" />
                           <span className="text-[7px] font-black text-gray-800 tracking-[0.5em] uppercase">Sector: Alpha_Recon</span>
                        </div>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
        </div>

        {/* BOTTOM NAV HINT */}
        <div className="flex justify-between items-center opacity-30 px-8 mt-4">
             <div className="flex items-center gap-8">
               <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
                 <span className="text-[8px] uppercase font-black tracking-widest text-gray-500">Node_Selection: REQUIRED</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-cyan-500/50 rounded-full" />
                 <span className="text-[8px] uppercase font-black tracking-widest text-gray-500">Operation: PENDING</span>
               </div>
             </div>
             <div className="text-[8px] font-bold text-gray-700 uppercase tracking-tighter italic">-- SECTOR_ALPHA // CORE_GRID_ESTABLISHED --</div>
        </div>

        {/* BOTTOM DECORATION */}
        <div className="mt-10 flex justify-center gap-20 opacity-10">
          <Terminal className="text-gray-500" />
          <Server className="text-gray-500" />
          <Target className="text-gray-500" />
        </div>

      </div>

      {/* SHUFFLE OVERLAY (3s) */}
      <AnimatePresence>
         {isShuffling && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-[100] bg-gray-950/90 backdrop-blur-md flex flex-col items-center justify-center"
            >
               <motion.div 
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-cyan-400 font-black text-[10px] tracking-[1em] mb-10 uppercase"
               >
                  SEDANG MEMILIH TANTANGAN...
               </motion.div>
               <motion.div 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, -1, 1, -1, 0],
                    filter: ["blur(0px)", "blur(2px)", "blur(0px)"]
                  }}
                  transition={{ duration: 0.1, repeat: Infinity }}
                  className={`${shuffleColor} text-6xl md:text-8xl font-black italic tracking-tighter px-10 text-center uppercase drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]`}
               >
                  {shuffleText}
               </motion.div>
               <div className="w-full max-w-md h-1 bg-gray-900 mt-20 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3, ease: "linear" }}
                    className="h-full bg-cyan-500 shadow-[0_0_15px_#06b6d4]"
                  />
               </div>
            </motion.div>
         )}
      </AnimatePresence>

      {/* TRANSITION CARD ENABLED (2s) - UI FIXED */}
      <AnimatePresence>
         {showTransitionCard && (
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               className="fixed inset-0 z-[110] bg-gray-950 flex items-center justify-center p-6"
            >
               <motion.div 
                  initial={{ boxShadow: "0 0 0px 0px rgba(6,182,212,0)" }}
                  animate={{ 
                    boxShadow: ["0 0 20px 0px rgba(6,182,212,0.2)", "0 0 60px 10px rgba(6,182,212,0.4)", "0 0 20px 0px rgba(6,182,212,0.2)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-full max-w-2xl bg-gray-900 border-4 border-cyan-500 rounded-3xl p-10 md:p-14 flex flex-col items-center text-center relative overflow-hidden"
               >
                  <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 animate-pulse" />
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-cyan-500 animate-pulse" />
                  
                  <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mb-10 border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                     <Target className="w-10 h-10 text-cyan-400 animate-pulse" />
                  </div>

                  <div className="mb-4">
                     <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-tight">
                        LEVEL 1:
                     </h2>
                     <h2 className="text-4xl md:text-7xl font-black text-cyan-400 italic tracking-tighter uppercase leading-none drop-shadow-[0_0_20px_#06b6d4]">
                        WEB EXPLOIT
                     </h2>
                  </div>

                  <div className="flex items-center gap-3 mb-10">
                     <Globe className="w-5 h-5 text-cyan-500" />
                     <span className="text-cyan-500/80 font-black tracking-[0.3em] text-xs uppercase">Target Found: Sector_Alpha</span>
                  </div>

                  <motion.div 
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="text-white font-black text-[10px] tracking-[0.5em] uppercase border-t border-white/10 pt-6 w-full max-w-xs"
                  >
                     TANTANGAN FIXED: MEMUAT LEVEL 1...
                  </motion.div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>

    </div>
  );
};

export default IndexModeAcak;
