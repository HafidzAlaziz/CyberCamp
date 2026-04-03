import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
   ChevronLeft,
   Terminal,
   Zap,
   Target,
   Search,
   ShieldAlert,
   CheckCircle2,
   Clock,
   Activity,
   X,
   XCircle,
   FileSearch,
   Image as ImageIcon,
   Info,
   Send,
   AlertTriangle,
   Copy,
   Check
} from 'lucide-react';

/* 
 <!-- CTF{INSPECT_ELEMENT_DECOY_7721} -->
*/

const ForensicsLevel1 = () => {
   const navigate = useNavigate();
   const [flag, setFlag] = useState('');
   const [status, setStatus] = useState('idle'); // idle, wrong, success, decoy
   const [showHint, setShowHint] = useState(false);
   const [hintUsed, setHintUsed] = useState(false);
   const [attempts, setAttempts] = useState([]);
   const [time, setTime] = useState(0);
   const [isPaused, setIsPaused] = useState(false);
   const [showExitModal, setShowExitModal] = useState(false);

   // Challenge State
   const [showProperties, setShowProperties] = useState(false);

   // Timer logic
   useEffect(() => {
      let interval;
      if (!isPaused && status !== 'success') {
         interval = setInterval(() => setTime(t => t + 1), 1000);
      }
      return () => clearInterval(interval);
   }, [isPaused, status]);

   const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
   };
   const TARGET_TIME = 120; // 2 minutes
   const projectedStars = 1 + (time <= TARGET_TIME ? 1 : 0) + (!hintUsed ? 1 : 0);


   const handleSubmit = (e) => {
      e.preventDefault();
      const correctFlag = atob('Q1RGe00zdDRfRDR0NF9FeDFmXzU3Mzl9');
      const decoyFlags = [atob('Q1RGe0g0SzNSX0ZMNTRHX1RSNFB9'), atob('Q1RGe0lOU1BFQ1RfRUxFTUVOVF9ERUNPWV83NzIxfQ==')]; // Decoys

      const cleanFlag = flag.trim();

      if (cleanFlag === correctFlag) {
         setStatus('success');
         setIsPaused(true);

         // Calculate Stars
         let finalStars = 1; // 1 for success
         if (time <= 120) finalStars += 1; // 1 for time
         if (!hintUsed) finalStars += 1; // 1 for no hint

         saveProgress(finalStars);
      } else if (decoyFlags.includes(cleanFlag)) {
         setStatus('decoy');
         setAttempts([...attempts, cleanFlag]);
         setTimeout(() => setStatus('idle'), 3000);
      } else {
         setStatus('wrong');
         setAttempts([...attempts, cleanFlag]);
         setTimeout(() => setStatus('idle'), 2000);
      }
   };

   const saveProgress = (stars) => {
      const saved = localStorage.getItem('ctf_forensics_stats');
      const stats = saved ? JSON.parse(saved) : {};

      // Only update if better or first time
      const currentStars = stats[1]?.stars || 0;
      const currentBest = stats[1]?.bestTime || 999999;

      stats[1] = {
         stars: Math.max(currentStars, stars),
         bestTime: Math.min(currentBest, time)
      };
      localStorage.setItem('ctf_forensics_stats', JSON.stringify(stats));
   };

   return (
      <div className="min-h-screen bg-[#020617] text-white font-mono p-4 md:p-8 relative overflow-hidden forensics-page-theme">
         {/* BACKGROUND DECORATION */}
         <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full animate-pulse" />
         </div>

         <div className="max-w-7xl mx-auto relative z-10">
            {/* TOP NAV BAR */}
            <div className="flex justify-between items-start mb-8 relative">
               <div className="flex gap-4 items-start z-10">
                  <button
                     onClick={() => setShowExitModal(true)}
                     className="mt-1 w-10 h-10 flex items-center justify-center bg-gray-900 border border-orange-500/30 rounded-xl transition-all group hover:bg-orange-500/20 active:scale-95"
                  >
                     <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:-translate-x-0.5 transition-transform" />
                  </button>
                  <div>
                     <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-[0_0_8px_#f97316]" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-400/80">SECTOR: FORENSICS_ALPHA</span>
                     </div>
                     <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">
                        LEVEL 1: <span className="text-orange-500 drop-shadow-[0_0_10px_#f97316]">GHOST METADATA</span>
                     </h1>
                  </div>
               </div>

               <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
                  <div className="text-[8px] font-black text-gray-700 tracking-[0.5em] uppercase mb-2">RANK_EFFICIENCY</div>
                  <div className="flex gap-2">
                     {[1, 2, 3].map(s => (
                        <div key={s} className={`w-2 h-6 rounded-sm border transition-all duration-500 ${s <= projectedStars
                              ? 'bg-orange-400 border-orange-300 shadow-[0_0_8px_rgba(249,115,22,0.8)]'
                              : 'bg-white/5 border-white/10'
                           }`} />
                     ))}
                  </div>
               </div>

               <div className="text-right">
                  <div className="text-[10px] font-black text-orange-500/30 tracking-[0.3em] uppercase mb-1">ELAPSED_TIME</div>
                  <div className="text-4xl font-black italic tracking-tighter text-orange-500">
                     {formatTime(time)}
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
               {/* LEFT: MISSION BRIEFING */}
               <div className="col-span-12 lg:col-span-4 space-y-6">
                  <div className="bg-gray-950/50 border border-orange-500/30 rounded-2xl p-6 flex-1 flex flex-col relative overflow-hidden group shadow-2xl">
                     <div className="absolute top-0 left-0 w-1 h-full bg-orange-500 shadow-[0_0_15px_#f97316]" />
                     <div className="flex items-center gap-2.5 mb-5">
                        <Target className="w-4 h-4 text-orange-500" />
                        <h2 className="text-[10px] font-black tracking-[0.3em] text-orange-100/50 uppercase italic">OBJEKTIF_FORENSIK</h2>
                     </div>
                     <h3 className="text-xl font-black italic tracking-tighter uppercase text-white mb-3">FILE: SUSPICIOUS_IMG_01</h3>
                     <p className="text-[11px] text-gray-400 font-bold leading-relaxed mb-6 italic uppercase tracking-wider">
                        Intelijen menemukan sebuah gambar yang ditinggalkan oleh agen ganda. Gambar tersebut tampak biasa,
                        namun kami yakin ada data tersembunyi di balik "Identitas Digital" (Metadata) file ini.
                     </p>

                     <div className="p-3.5 bg-orange-500/5 border border-orange-500/20 rounded-xl mb-6">
                        <div className="flex items-center gap-2.5 mb-1.5 text-orange-400">
                           <ShieldAlert className="w-3.5 h-3.5" />
                           <span className="text-[9px] font-black tracking-widest uppercase">Target_Goal</span>
                        </div>
                        <p className="text-[10px] font-bold text-orange-100/60 italic tracking-wider leading-relaxed">
                           Temukan flag CTF&#123;...&#125; yang disisipkan dalam Exif Metadata gambar tersebut.
                        </p>
                     </div>

                     <button
                        onClick={() => {
                           setShowHint(!showHint);
                           if (!showHint) setHintUsed(true);
                        }}
                        className={`w-full py-4 border rounded-xl flex items-center justify-center gap-2.5 transition-all uppercase text-[10px] font-black tracking-widest ${showHint ? 'bg-orange-500/20 border-orange-500 text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.1)]' : 'bg-white/5 border-white/10 text-gray-500 hover:border-orange-500/40 hover:text-orange-400'
                           }`}
                     >
                        <Zap className={`w-3.5 h-3.5 ${showHint ? 'fill-orange-400 text-orange-400' : ''}`} />
                        <span>{showHint ? 'HINT_AKTIF' : 'MINTA_HINT'}</span>
                     </button>
                     {showHint && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-3 p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-bold text-gray-400 italic tracking-wider leading-relaxed space-y-2">
                           <p className="text-orange-300 uppercase font-black">💡 Apa itu Metadata?</p>
                           <p>Setiap file digital memiliki "data tentang data" yang disebut metadata. Pada gambar, ini sering disebut **EXIF**. Metadata bisa berisi model kamera, koordinat GPS, atau informasi hak cipta (Copyright/Artist).</p>
                           <p className="text-gray-500">Coba periksa bagian <span className="text-orange-400">'File Properties'</span> pada panel analisis di kanan.</p>
                        </motion.div>
                     )}
                  </div>

                  <div className="bg-black/60 border border-white/5 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                     <div className="flex items-center gap-3 mb-6 text-white/30">
                        <Activity className="w-4 h-4" />
                        <h2 className="text-[9px] font-black tracking-[0.4em] uppercase leading-none">ANALYSIS_LOG</h2>
                     </div>
                     <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                        <div className="text-[10px] font-bold tracking-wider italic text-orange-500/60 uppercase">-- 09:42:15 -- Forensic environment initialized</div>
                        <div className="text-[10px] font-bold tracking-wider italic text-gray-700 uppercase">-- 09:42:18 -- Loading Suspect_Image_01.jpg...</div>

                        {/* Decoy log for anti-cheat hint */}
                        <div className="text-[10px] font-bold tracking-wider italic text-white/5 uppercase select-none opacity-0">-- {"CTF{AN4LYS1S_LOG_TRAP_01}"} -- INTERNAL_DEBUG</div>

                        {attempts.map((att, i) => (
                           <div key={i} className="text-[10px] font-bold tracking-wider italic text-red-500/60 uppercase group">
                              -- {att} -- {status === 'decoy' && i === attempts.length - 1 ? 'DECOY_FLAG_DETECTED' : 'INVALID_FLAG_STRUCTURE'}
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               {/* RIGHT: CHALLENGE AREA */}
               <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
                  <div className="flex-1 bg-gray-950 border-2 border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col relative group">
                     {/* TOOLBAR */}
                     <div className="h-12 bg-gray-900 border-b border-white/5 flex items-center px-6 gap-3 z-20">
                        <div className="flex items-center gap-2">
                           <FileSearch className="w-4 h-4 text-orange-500" />
                           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Image_Analyzer_V4</span>
                        </div>
                        <div className="flex gap-2 ml-auto">
                           <button
                              onClick={() => setShowProperties(!showProperties)}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all border ${showProperties ? 'bg-orange-500/20 border-orange-500 text-orange-400' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white hover:border-white/20'}`}
                           >
                              <Info className="w-3.5 h-3.5" />
                              <span className="text-[9px] font-black uppercase tracking-widest">Properties</span>
                           </button>
                        </div>
                     </div>

                     {/* VIEWPORT */}
                     <div className="flex-1 relative bg-[#020617] flex items-center justify-center overflow-hidden">
                        <div className="relative group/img max-w-md w-full aspect-square bg-gray-900/50 rounded-2xl border border-white/5 flex flex-col items-center justify-center p-8 transition-all hover:border-orange-500/20">
                           <ImageIcon className="w-24 h-24 text-gray-800 mb-4 group-hover/img:text-orange-500/20 transition-colors" />
                           <div className="text-center">
                              <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-1 italic">Suspect_Image_01.jpg</p>
                              <p className="text-[9px] text-gray-700 font-bold uppercase tracking-tighter">Size: 4.2 MB // Resolution: 4032x3024</p>
                           </div>

                           {/* Floating Info Overlay if not showing properties */}
                           {!showProperties && (
                              <div className="absolute top-4 right-4 animate-bounce">
                                 <div className="bg-orange-500/10 border border-orange-500/30 p-2 rounded-full cursor-pointer" onClick={() => setShowProperties(true)}>
                                    <Info className="w-4 h-4 text-orange-500" />
                                 </div>
                              </div>
                           )}
                        </div>

                        {/* Properties Panel (The "Target") */}
                        <AnimatePresence>
                           {showProperties && (
                              <motion.div
                                 initial={{ x: '100%' }}
                                 animate={{ x: 0 }}
                                 exit={{ x: '100%' }}
                                 className="absolute top-0 right-0 bottom-0 w-80 bg-gray-950 border-l border-white/10 shadow-2xl z-30 p-6 overflow-y-auto"
                              >
                                 <div className="flex items-center justify-between mb-8">
                                    <h4 className="text-[11px] font-black text-orange-500 uppercase tracking-[0.3em] italic">FILE_PROPERTIES</h4>
                                    <button onClick={() => setShowProperties(false)} className="p-1 hover:bg-white/5 rounded-lg transition-colors"><X className="w-4 h-4 text-gray-500" /></button>
                                 </div>

                                 <div className="space-y-6">
                                    <section className="space-y-3 pb-6 border-b border-white/5">
                                       <h5 className="text-[8px] font-black text-white/20 uppercase tracking-widest italic">General_Info</h5>
                                       <div className="space-y-2">
                                          <div className="flex justify-between text-[10px] font-bold italic"><span className="text-gray-600 uppercase">Filename</span><span className="text-gray-300">Suspect_01.jpg</span></div>
                                          <div className="flex justify-between text-[10px] font-bold italic"><span className="text-gray-600 uppercase">Extension</span><span className="text-gray-300">JPEG</span></div>
                                          <div className="flex justify-between text-[10px] font-bold italic"><span className="text-orange-500/60">Permissions</span><span className="text-orange-500/60">RWX-R-R</span></div>
                                       </div>
                                    </section>

                                    <section className="space-y-3 pb-6 border-b border-white/5">
                                       <h5 className="text-[8px] font-black text-white/20 uppercase tracking-widest italic">Exif_Metadata</h5>
                                       <div className="space-y-2">
                                          <div className="flex justify-between text-[10px] font-bold italic"><span className="text-gray-600 uppercase">Make</span><span className="text-gray-300">CyberCam-X1</span></div>
                                          <div className="flex justify-between text-[10px] font-bold italic"><span className="text-gray-600 uppercase">Model</span><span className="text-gray-300">Sentinel-700</span></div>
                                          <div className="flex justify-between text-[10px] font-bold italic"><span className="text-gray-600 uppercase">Aperture</span><span className="text-gray-300">f/1.8</span></div>
                                          <div className="flex justify-between text-[10px] font-bold italic"><span className="text-gray-600 uppercase">Focal Length</span><span className="text-gray-300">26mm</span></div>
                                       </div>
                                    </section>

                                    <section className="space-y-3 pb-6 border-b border-white/5">
                                       <h5 className="text-[8px] font-black text-orange-500/40 uppercase tracking-widest italic">Advanced_Tags</h5>
                                       <div className="space-y-2">
                                          <div className="flex justify-between text-[10px] font-bold italic"><span className="text-gray-600 uppercase">Location</span><span className="text-gray-300">51.5074° N, 0.1278° W</span></div>
                                          <div className="flex justify-between text-[10px] font-bold italic"><span className="text-gray-600 uppercase">Artist</span><span className="text-gray-300 italic">Agent_Raven</span></div>
                                          <div className="p-3 bg-orange-500/5 rounded-xl border border-orange-500/20 mt-4">
                                             <span className="text-[8px] font-black text-orange-400 uppercase tracking-widest block mb-1 italic">Copyright_Note:</span>
                                             <p className="text-[10px] font-black text-white italic break-all leading-relaxed flex items-center gap-2">
                                                <span className="select-none text-white/40">RESTRICTED_PROPERTY:</span>
                                                <span className="select-all bg-orange-500/10 px-1 border border-orange-500/20 rounded cursor-pointer" title="Klik untuk pilih flag">
                                                   CTF&#123;M3t4_D4t4_Ex1f_5739&#125;
                                                </span>
                                             </p>
                                          </div>
                                          <div className="p-3 bg-red-500/5 rounded-xl border border-red-500/10 mt-2 opacity-30">
                                             <span className="text-[8px] font-black text-red-500/40 uppercase tracking-widest block mb-1 italic">Internal_Stub:</span>
                                             <p className="text-[10px] font-bold text-gray-800 italic break-all leading-relaxed">
                                                CTF&#123;D3C0Y_METADATA_1922&#125;
                                             </p>
                                          </div>
                                       </div>
                                    </section>
                                 </div>
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </div>
                  </div>

                  {/* SUBMISSION AREA */}
                  <div className="bg-[#0A0F1D]/80 border border-orange-500/30 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
                     <form onSubmit={handleSubmit} className="relative z-10 flex flex-col md:flex-row gap-3">
                        <div className="flex-1 relative">
                           <input
                              type="text"
                              value={flag}
                              onChange={(e) => setFlag(e.target.value)}
                              placeholder="Masukkan flag (CTF{...})"
                              className={`w-full bg-black/40 border-2 rounded-xl py-3.5 px-6 text-xs tracking-widest text-white placeholder:text-gray-700 focus:outline-none transition-all ${status === 'wrong' ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : status === 'decoy' ? 'border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.1)]' : 'border-orange-500/20 focus:border-orange-500/50'
                                 }`}
                           />
                           <AnimatePresence>
                              {status === 'decoy' && (
                                 <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-3 -right-3 bg-yellow-500 text-[8px] font-black italic px-3 py-1 rounded-full text-black shadow-lg uppercase">
                                    DECOY DETECTED
                                 </motion.div>
                              )}
                              {status === 'wrong' && (
                                 <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-3 -right-3 bg-red-500 text-[8px] font-black italic px-3 py-1 rounded-full text-white shadow-lg uppercase">
                                    INVALID FLAG
                                 </motion.div>
                              )}
                           </AnimatePresence>
                        </div>
                        <button
                           type="submit"
                           className="bg-orange-500 hover:bg-orange-400 text-black font-black uppercase text-[10px] tracking-[0.2em] px-8 py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                           <span>SUBMIT</span>
                           <Send className="w-3.5 h-3.5" />
                        </button>
                     </form>
                  </div>
               </div>
            </div>

            {/* BOTTOM STATUS */}
            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-700">
               <div className="flex items-center gap-6 text-[9px] font-black tracking-widest">
                  <span className="text-orange-500/50">{" > "} SYSTEM: ANALYSIS_ACTIVE</span>
                  <span className="text-gray-800">//</span>
                  <span>ENTITY: CYBERCAMP_SENTINEL</span>
                  <span className="text-gray-800">//</span>
                  <span className="text-white/20 italic">ARTIFACT_V1.0</span>
               </div>
               <div className="text-[8px] font-bold uppercase tracking-tighter italic opacity-50">-- TACTICAL_OVERLAY_ENABLED // SEC_GATE_MONITORING --</div>
            </div>
         </div>

         {/* SUCCESS OVERLAY */}
         <AnimatePresence>
            {status === 'success' && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[500] bg-[#020617]/90 backdrop-blur-md flex flex-col justify-center items-center p-6 text-center">
                  {/* ✨ Orange particles rising in backdrop */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                     {[...Array(20)].map((_, i) => (
                        <motion.div
                           key={`op-${i}`}
                           style={{ left: `${(i * 5 + 2) % 94}%`, position: 'absolute', bottom: '-4px' }}
                           className="w-2 h-2 bg-orange-400 rounded-full shadow-[0_0_10px_#f97316]"
                           initial={{ opacity: 0, y: 0 }}
                           animate={{ opacity: [0, 1, 0], y: '-100vh' }}
                           transition={{ duration: 4 + (i % 6) * 0.7, delay: i * 0.25, repeat: Infinity, ease: 'linear' }}
                        />
                     ))}
                  </div>
                  <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className="max-w-sm w-full p-8 bg-gray-950 border border-orange-500/30 rounded-[2.5rem] shadow-[0_0_80px_rgba(249,115,22,0.3)] relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-full h-1 bg-orange-500 shadow-[0_0_15px_#f97316]" />
                     <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.1)]">
                        <CheckCircle2 className="w-8 h-8 text-orange-500" />
                     </div>

                     <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white mb-2 leading-none">ANALYSIS_COMPLETE</h2>
                     <p className="text-orange-500/60 font-black tracking-[0.4em] uppercase text-[8px] mb-8 italic">Investigation_Lead_Secured</p>

                     <div className="bg-black/40 border border-white/5 rounded-2xl p-5 mb-8 text-left space-y-2">
                        <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5 mb-2">
                           <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-none italic">Execution_Time</span>
                           <span className="text-xl font-black italic text-orange-400 leading-none tabular-nums">{formatTime(time)}</span>
                        </div>

                        <div className="space-y-1.5">
                           <div className="flex items-center justify-between p-3 bg-orange-500/5 rounded-xl border border-orange-500/10 transition-all hover:bg-orange-500/10">
                              <span className="text-[10px] font-black uppercase italic text-orange-400">1. Selesaikan Analisis Sektor</span>
                              <div className="w-5 h-5 flex items-center justify-center bg-orange-500/20 rounded-lg">
                                 <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shadow-[0_0_10px_#f97316]" />
                              </div>
                           </div>

                           <div className={`flex items-center justify-between p-3 rounded-xl border transition-all ${time <= 120 ? 'bg-orange-500/5 border-orange-500/10 hover:bg-orange-500/10' : 'bg-red-500/5 border-red-500/10'}`}>
                              <span className={`text-[10px] font-black uppercase italic ${time <= 120 ? 'text-orange-400' : 'text-gray-600'}`}>
                                 2. Target Waktu (120s)
                              </span>
                              <div className={`w-5 h-5 flex items-center justify-center rounded-lg ${time <= 120 ? 'bg-orange-500/20' : 'bg-red-500/20'}`}>
                                 {time <= 120 ? (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shadow-[0_0_10px_#f97316]" />
                                 ) : (
                                    <XCircle className="w-3.5 h-3.5 text-red-500" />
                                 )}
                              </div>
                           </div>

                           <div className={`flex items-center justify-between p-3 rounded-xl border transition-all ${!hintUsed ? 'bg-orange-500/5 border-orange-500/10 hover:bg-orange-500/10' : 'bg-red-500/5 border-red-500/10'}`}>
                              <span className={`text-[10px] font-black uppercase italic ${!hintUsed ? 'text-orange-400' : 'text-gray-600'}`}>
                                 3. Tanpa Hint Digital
                              </span>
                              <div className={`w-5 h-5 flex items-center justify-center rounded-lg ${!hintUsed ? 'bg-orange-500/20' : 'bg-red-500/20'}`}>
                                 {!hintUsed ? (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shadow-[0_0_10px_#f97316]" />
                                 ) : (
                                    <XCircle className="w-3.5 h-3.5 text-red-500" />
                                 )}
                              </div>
                           </div>
                        </div>
                     </div>

                     <button
                        onClick={() => navigate('/ctf-arena/forensics/mudah', { state: { lastLevel: 1 } })}
                        className="w-full py-4 bg-orange-500 text-black font-black uppercase text-[11px] tracking-[0.2em] rounded-xl shadow-[0_10px_30px_rgba(249,115,22,0.3)] hover:scale-[1.02] transition-all active:scale-95"
                     >
                        LANJUTKAN MISI
                     </button>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>

         {/* EXIT MODAL */}
         <AnimatePresence>
            {showExitModal && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[600] bg-black/80 backdrop-blur-sm flex justify-center items-center p-4">
                  <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-gray-900 border border-orange-500/30 rounded-3xl p-10 max-w-md w-full text-center relative overflow-hidden shadow-2xl">
                     <div className="absolute top-0 left-0 w-full h-1 bg-orange-500" />
                     <ShieldAlert className="w-16 h-16 text-orange-500 mx-auto mb-6" />
                     <h3 className="text-2xl font-black text-white tracking-widest uppercase mb-4 italic">ABORT ANALYSIS?</h3>
                     <p className="text-sm text-gray-400 mb-10 font-bold leading-relaxed italic uppercase tracking-wider">Anda yakin ingin keluar? Progres investigasi saat ini tidak akan disimpan.</p>
                     <div className="flex gap-4">
                        <button onClick={() => setShowExitModal(false)} className="flex-1 py-4 bg-gray-800 text-white font-bold rounded-2xl border border-white/5 hover:bg-gray-700 transition-colors uppercase tracking-widest text-xs">Batalkan</button>
                        <button onClick={() => navigate('/ctf-arena/forensics/mudah')} className="flex-1 py-4 bg-red-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-red-500 transition-colors shadow-[0_0_20px_rgba(239,68,68,0.3)]">Keluar</button>
                     </div>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>

      </div>
   );
};

export default ForensicsLevel1;
