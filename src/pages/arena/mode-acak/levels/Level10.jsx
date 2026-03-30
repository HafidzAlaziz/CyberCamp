import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
   ChevronLeft,
   Terminal,
   Zap,
   ShieldAlert,
   Skull,
   ZapOff,
   Database,
   Play,
   X,
   Lock,
   Check
} from 'lucide-react';

const Level10 = () => {
   const navigate = useNavigate();

   // Timer: Count-up
   const [elapsed, setElapsed] = useState(0);

   const [hintStage, setHintStage] = useState(() => {
      return parseInt(localStorage.getItem('ctf_level10_hint_stage') || '0');
   });

   const [stars, setStars] = useState(() => {
      const saved = localStorage.getItem('ctf_level10_stars');
      if (saved) return parseInt(saved);
      // Jika belum ada data bintang tapi ada hint yang terbuka, sinkronkan
      const currentHint = parseInt(localStorage.getItem('ctf_level10_hint_stage') || '0');
      return Math.max(1, 4 - currentHint);
   });

   const [inputText, setInputText] = useState('');
   const [bufferInput, setBufferInput] = useState('');
   const [pwnStatus, setPwnStatus] = useState('locked');
   const [pwnError, setPwnError] = useState('');
   const [status, setStatus] = useState('active');
   const [attempts, setAttempts] = useState([]);
   const [showHintModal, setShowHintModal] = useState(false);
   const [completionTime, setCompletionTime] = useState(null);
   const [showExitModal, setShowExitModal] = useState(false);

   const realFlag = "CTF{B0FF3R_0V3RFL0W_D34DB33F}";

   useEffect(() => {
      if (status !== 'complete') {
         const timer = setInterval(() => {
            setElapsed(prev => prev + 1);
         }, 1000);
         return () => clearInterval(timer);
      }
   }, [status]);

   // Check for overflow condition
   // Overflow condition is now handled manually via the Execute button to ensure clear user intent.

   const formatTime = (seconds) => {
      const isNeg = seconds < 0;
      const absSecs = Math.abs(seconds);
      const m = Math.floor(absSecs / 60);
      const s = absSecs % 60;
      return `${isNeg ? '-' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
   };

   const submitFlag = (e) => {
      if (e) e.preventDefault();
      if (!inputText.trim()) return;

      if (inputText.trim() === realFlag) {
         setStatus('complete');
         const timeTakenStr = formatTime(elapsed);
         setCompletionTime(timeTakenStr);

         const stats = JSON.parse(localStorage.getItem('ctf_mode_acak_stats')) || {};
         const currentBestStars = stats[10]?.stars || 0;
         if (stars >= currentBestStars) {
            stats[10] = { stars: stars, bestTime: timeTakenStr };
            localStorage.setItem('ctf_mode_acak_stats', JSON.stringify(stats));
         }
         localStorage.removeItem('ctf_level10_time');
         localStorage.removeItem('ctf_level10_stars');
         localStorage.removeItem('ctf_level10_hint_stage');
         localStorage.removeItem('ctf_level10_overtime');
      } else {
         setStatus('wrong');
         setAttempts(prev => [...prev, inputText]);
         setTimeout(() => setStatus('active'), 2000);
      }
      setInputText('');
   };

   const handleExit = () => {
      localStorage.removeItem('ctf_level10_time');
      localStorage.removeItem('ctf_level10_stars');
      localStorage.removeItem('ctf_level10_hint_stage');
      localStorage.removeItem('ctf_level10_overtime');
      navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 10 } });
   };

   const unlockHintStage = (stage) => {
      if (stage <= hintStage) return;
      const newStars = Math.max(1, 4 - stage);
      setStars(newStars);
      localStorage.setItem('ctf_level10_stars', newStars.toString());

      setHintStage(stage);
      localStorage.setItem('ctf_level10_hint_stage', stage.toString());
   };

   if (status === 'complete') {
      return (
         <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 font-mono text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1)_0%,transparent_70%)]" />
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="z-10 bg-gray-900 border-4 border-red-500 p-12 rounded-3xl text-center max-w-xl shadow-[0_0_50px_rgba(239,68,68,0.3)]">
               <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/30">
                  <Skull className="w-12 h-12 text-red-500 drop-shadow-[0_0_10px_#ef4444]" />
               </motion.div>
               <h1 className="text-5xl font-black italic tracking-tighter mb-2 text-white uppercase leading-none">MISSION COMPLETE</h1>
               <p className="text-red-500 font-bold tracking-[0.3em] mb-4 text-[10px]">SECTOR: EXPLOIT_CORE // SYSTEM_PWNED</p>
               <div className="bg-red-500/5 border border-red-500/10 rounded-2xl py-6 px-10 mb-8 inline-block">
                  <div className="text-[10px] font-black text-gray-500 tracking-[0.4em] uppercase mb-4">Misi terselesaikan dalam</div>
                  <div className="text-4xl font-black text-white italic tracking-tighter mb-6">{completionTime}</div>
                  <div className="flex justify-center gap-4">
                     {[1, 2, 3, 4].map(s => (
                        <Zap key={s} className={`w-10 h-10 transition-all duration-500 ${s <= stars ? 'text-red-400 fill-red-400 drop-shadow-[0_0_15px_#ef4444]' : 'text-gray-800 fill-transparent'}`} />
                     ))}
                  </div>
               </div>
               <button onClick={() => navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 10 } })} className="w-full bg-red-500 text-black font-black py-4 rounded-xl hover:bg-red-400 transition-all text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(239,68,68,0.2)]">KEMBALI KE MAP TAKTIS</button>
            </motion.div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-4 md:p-8 flex flex-col overflow-hidden relative">
         <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #450a0a 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
         <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col relative z-10">

            {/* HEADER AREA */}
            <div className="flex justify-between items-start mb-8 relative">
               <div className="flex gap-4 items-start z-10">
                  <button
                     onClick={() => setShowExitModal(true)}
                     className="mt-1 p-2 bg-gray-900 border border-red-500/30 rounded-xl hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all group"
                     title="Abort Mission"
                  >
                     <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                  </button>
                  <div>
                     <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_#ef4444]" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500/80">TARGET: SECTOR_ROOT</span>
                     </div>
                     <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none shadow-red-500/20">
                        LEVEL 10: <span className="text-red-600 drop-shadow-[0_0_10px_#ef4444]">BINARY EXPLOITATION</span>
                     </h1>
                  </div>
               </div>

               <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
                  <div className="text-[8px] font-black text-gray-700 tracking-[0.5em] uppercase mb-2">RANK_EFFICIENCY</div>
                  <div className="flex gap-3">
                     {[1, 2, 3, 4].map(s => (
                        <Zap key={s} className={`w-6 h-6 transition-all duration-700 ${s <= stars ? 'text-red-400 fill-red-400 drop-shadow-[0_0_10px_#ef4444]' : 'text-white/10 fill-transparent opacity-20'}`} />
                     ))}
                  </div>
               </div>

               <div className="text-right">
                  <div className="text-[10px] font-black text-cyan-500/30 tracking-[0.3em] uppercase mb-1">ELAPSED_TIME</div>
                  <div className="text-4xl font-black italic tracking-tighter transition-colors duration-500 text-red-600">
                     {formatTime(elapsed)}
                  </div>
               </div>
            </div>

            {/* LAYOUT GRID */}
            <div className="flex-1 grid grid-cols-12 gap-8 min-h-0">

               {/* LEFT SIDE: BRIEFING & CONTROL */}
               <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                  {/* BRIEFING */}
                  <div className="bg-[#0a0a0a] border border-red-900/30 rounded-lg p-6 flex flex-col relative overflow-hidden shadow-2xl">
                     <div className="flex items-center gap-3 mb-6">
                        <div className="w-5 h-5 flex items-center justify-center bg-red-500/10 rounded">
                           <Skull className="w-3 h-3 text-red-500" />
                        </div>
                        <h2 className="text-xs font-black text-red-200 uppercase tracking-[0.2em]">BRIEFING MISI</h2>
                     </div>
                     <div className="text-[13px] leading-relaxed text-gray-400 italic space-y-4">
                        <p>{" > "} Anda berada di inti sistem. Lapisan terakhir adalah buffer memori yang stabil (16 byte).</p>
                        <p>{" > "} Gunakan overflow untuk menimpa alamat return!</p>
                     </div>
                  </div>

                  {/* CONTROL PAYLOAD */}
                  <div className="bg-[#0a0a0a] border border-red-900/30 rounded-lg p-6 flex flex-col relative overflow-hidden shadow-2xl">
                     <div className="flex items-center gap-3 mb-6 font-black italic text-red-500">
                        <ShieldAlert className="w-4 h-4" />
                        <h2 className="text-[10px] uppercase tracking-[0.2em]">KONTROL_PAYLOAD</h2>
                     </div>
                     <div className="text-[10px] text-gray-600 uppercase mb-6 leading-relaxed italic">
                        Buffer memiliki batas <span className="text-red-500 font-bold">16 byte</span>. Masukkan lebih dari itu dan sertakan string <span className="text-red-500 font-bold">DEADBEEF</span>.
                     </div>

                     <div className="space-y-6">
                        <div className="relative">
                           <input
                              type="text"
                              value={bufferInput}
                              onChange={(e) => setBufferInput(e.target.value)}
                              placeholder="INPUT PAYLOAD (Hex/Text)"
                              className="w-full bg-black/60 border border-white/5 rounded-lg py-4 px-4 text-sm font-mono text-red-100 placeholder:text-gray-800 focus:outline-none focus:border-red-500/30 transition-all uppercase"
                           />
                        </div>

                        <button
                           onClick={() => {
                              if (bufferInput.length > 16 && bufferInput.toUpperCase().includes('DEADBEEF')) {
                                 setPwnStatus('pwned');
                                 setPwnError('');
                              } else {
                                 setPwnStatus('locked');
                                 if (bufferInput.length <= 16) {
                                    setPwnError('ERROR: INSUFFICIENT_PAYLOAD_SIZE (MIN. 16 BYTES)');
                                 } else {
                                    setPwnError('ERROR: MISSING_DEADBEEF_STRING');
                                 }
                                 setTimeout(() => setPwnError(''), 3000);
                              }
                           }}
                           className="w-full bg-red-600/10 hover:bg-red-600/20 border border-red-600/50 text-red-500 font-black py-4 rounded-lg text-xs tracking-[0.2em] uppercase transition-all shadow-lg active:scale-95"
                        >
                           EXECUTE_PAYLOAD_OVERFLOW
                        </button>

                        <AnimatePresence>
                           {pwnError && (
                              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-[10px] text-red-500 font-black tracking-widest text-center uppercase italic">
                                 {pwnError}
                              </motion.div>
                           )}
                        </AnimatePresence>

                        <div className="flex justify-between items-center text-[10px] font-black italic tracking-widest border-t border-white/5 pt-4">
                           <span className="text-gray-700 uppercase">REGISTER_STATUS:</span>
                           <span className={bufferInput.length > 16 ? "text-red-500 animate-pulse" : "text-green-500"}>
                              {pwnStatus === 'pwned' ? "SYSTEM_PWNED" : (bufferInput.length > 16 ? "UNSTABLE" : "STABLE")}
                           </span>
                        </div>
                     </div>

                     <div className="mt-8">
                        <button onClick={() => setShowHintModal(true)} className="w-full py-4 bg-red-950/10 hover:bg-red-950/20 border border-red-500/20 text-red-100 text-[11px] font-black uppercase tracking-[0.2em] rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg">
                           <Zap className={`w-4 h-4 text-red-500 ${hintStage > 0 ? 'fill-red-500' : ''}`} />
                           💡 MINTA HINT BOS ({hintStage}/3)
                        </button>
                     </div>
                  </div>

                  {/* FLAG REVELATION AREA */}
                  <AnimatePresence>
                     {pwnStatus === 'pwned' && (
                        <motion.div
                           initial={{ opacity: 0, scale: 0.95 }}
                           animate={{ opacity: 1, scale: 1 }}
                           className="bg-red-950/20 border-2 border-red-500/40 rounded-lg p-6 mb-6 text-center relative shadow-[0_0_30px_rgba(239,68,68,0.2)]"
                        >
                           <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 bg-red-500 text-black text-[8px] font-black italic rounded-full uppercase py-1 shadow-[0_0_15px_#ef4444]">
                              PWNED_EXECUTION_SUCCESSFUL
                           </div>
                           <div className="text-gray-400 font-mono text-[10px] mb-3 uppercase italic tracking-widest">Stack dump successful. Flag found:</div>
                           <div className="bg-black/60 p-4 rounded border border-red-500/20 font-mono text-red-400 font-bold tracking-[0.2em] break-all select-all text-sm">
                              {realFlag}
                           </div>
                        </motion.div>
                     )}
                  </AnimatePresence>

                  {/* FLAG SUBMISSION */}
                  <div className="bg-[#050505] border border-white/5 rounded-lg p-6">
                     <div className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-4">ROOT_FLAG_SUBMISSION</div>
                     <form onSubmit={submitFlag} className="space-y-4">
                        <input
                           type="text"
                           value={inputText}
                           onChange={(e) => setInputText(e.target.value)}
                           placeholder="CTF{...}"
                           className="w-full bg-black border border-white/5 rounded-lg py-3 px-4 text-xs font-mono text-white focus:outline-none focus:border-red-500/30 transition-all uppercase"
                        />
                        <button type="submit" className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-3 rounded-lg text-[10px] tracking-[0.2em] uppercase transition-all shadow-lg active:scale-95">
                           EXECUTE_SUBMISSION
                        </button>
                     </form>
                  </div>
               </div>

               {/* RIGHT SIDE: MEMORY VISUALIZATION */}
               <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
                  <div className="flex items-center justify-between px-2 text-[10px] font-black tracking-widest text-[#444]">
                     <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
                        <span>VISUALISASI_STACK_MEMORY // CORE_BUFFER</span>
                     </div>
                     <div className="flex gap-4">
                        <div className="flex items-center gap-2"><div className="w-2 h-2 bg-red-900/40 border border-red-500/40 rounded" /> BUFFER</div>
                        <div className="flex items-center gap-2"><div className="w-2 h-2 bg-green-900/40 border border-green-500/40 rounded" /> RET_ADDR</div>
                     </div>
                  </div>

                  <div className="flex-1 bg-[#050505] border border-white/5 rounded-lg p-6 overflow-y-auto custom-scrollbar shadow-inner">
                     <div className="grid grid-cols-4 gap-4">
                        {/* BUFFER BOXES 0-F (16 total) */}
                        {[...Array(16)].map((_, i) => {
                           const char = bufferInput[i] || null;
                           const hexId = i.toString(16).toUpperCase();
                           return (
                              <div key={i} className={`h-24 rounded-lg border flex flex-col p-3 transition-all duration-300 ${char ? 'bg-red-950/20 border-red-500/40' : 'bg-[#0a0a0a] border-white/5 opacity-40'}`}>
                                 <span className="text-[8px] font-black text-gray-700">BUF_{hexId}</span>
                                 <div className="flex-1 flex items-center justify-center text-2xl font-black text-gray-800">
                                    {char || "?"}
                                 </div>
                              </div>
                           );
                        })}

                        {/* RET_PTR BOXES (8 total) */}
                        {[...Array(8)].map((_, i) => {
                           const char = bufferInput[i + 16] || null;
                           return (
                              <div key={i + 16} className={`h-24 rounded-lg border flex flex-col p-3 transition-all duration-300 ${char ? 'bg-green-950/20 border-green-500/40' : 'bg-[#0a0a0a] border-white/5 opacity-40'}`}>
                                 <span className="text-[8px] font-black text-gray-700 uppercase italic">RET_PTR</span>
                                 <div className="flex-1 flex items-center justify-center text-2xl font-black text-gray-800">
                                    {char || "?"}
                                 </div>
                              </div>
                           );
                        })}
                     </div>
                  </div>
               </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-700">
               <div className="flex items-center gap-4 text-[9px] font-black tracking-widest">
                  <span className="text-red-500/50">{" > "} ROOT_ACCESS: PENDING</span>
                  <span className="text-gray-800">//</span>
                  <span>MODE: ACAK</span>
                  <span className="text-gray-800">//</span>
                  <span>LEVEL: 10</span>
               </div>
               <div className="text-[8px] font-bold uppercase tracking-tighter italic opacity-50">-- FINAL_PWN_INTERFACE_V.10 --</div>
            </div>
         </div>

         {/* MODALS */}
         <AnimatePresence>
            {showHintModal && (
               <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowHintModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                  <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-gray-900 border border-red-500/30 rounded-3xl p-8 max-w-lg w-full shadow-[0_0_50px_rgba(239,68,68,0.2)] overflow-hidden">
                     <div className="absolute top-0 left-0 w-full h-1 bg-red-500 shadow-[0_0_15px_#ef4444]" />
                     <div className="flex justify-between items-start mb-8">
                        <div>
                           <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-1">EXPLOIT_RECOVERY_HUB</h2>
                           <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Sector 10: Final Binary Pwnage</p>
                        </div>
                        <button onClick={() => setShowHintModal(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
                     </div>

                     <div className="space-y-4 mb-8">
                        {[
                           { depth: 1, label: "ANALYZING_PROTECTION", content: `<span class="text-purple-300 font-black block mb-2">💡 Apa itu Buffer Overflow?</span><span class="text-gray-400 block normal-case not-italic">Kerentanan yang terjadi ketika aplikasi mencoba menulis data melebihi kapasitas buffer yang disediakan. Dengan mengisi input lebih dari 20 karakter, kamu bisa menimpa register EIP untuk mengubah alur eksekusi aplikasi ke kode milikmu.</span>` },
                           { depth: 2, label: "CALCULATING_OFFSET", content: "Buffer hanya disediakan sebesar 20 byte. Karakter ke-21 dan seterusnya akan menimpa memori penting di stack. Gunakan string 'DEADBEEF' tepat setelah 20 karakter sampah." },
                           { depth: 3, label: "PWN_INSTRUCTION", content: "Kirimkan payload: <span class='text-red-500 font-mono font-black'>AAAAAAAAAAAAAAAAAAAADEADBEEF</span> (20 'A' dan string DEADBEEF)." }
                        ].map((h, i) => (
                           <div key={i} className={`p-4 rounded-2xl border transition-all ${hintStage >= h.depth ? 'bg-red-500/10 border-red-500/40 text-gray-200' : 'bg-black/40 border-white/5 text-gray-600'}`}>
                              <div className="flex justify-between items-center mb-2">
                                 <span className="text-[10px] font-black tracking-widest uppercase">{h.label}</span>
                                 {hintStage >= h.depth ? <Check className="w-3 h-3 text-red-500" /> : <Lock className="w-3 h-3" />}
                              </div>
                              {hintStage >= h.depth ? (
                                 <p className="text-xs leading-relaxed italic" dangerouslySetInnerHTML={{ __html: h.content }} />
                              ) : (
                                 <button onClick={() => unlockHintStage(h.depth)} className="w-full py-2 bg-red-600 hover:bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all">UNLOCK EXPLOIT DEPTH {h.depth}</button>
                              )}
                           </div>
                        ))}
                     </div>

                     <p className="text-[8px] text-center text-gray-700 uppercase font-bold tracking-[0.2em]">-- WARNING: Final rank will be severely impacted --</p>
                  </motion.div>
               </div>
            )}

            {showExitModal && (
               <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowExitModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="relative bg-gray-900 border border-red-500/30 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
                     <ShieldAlert className="w-12 h-12 text-red-600 mx-auto mb-4" />
                     <h3 className="text-xl font-black text-white italic tracking-tighter uppercase mb-2">ABORT MISSION?</h3>
                     <p className="text-xs text-gray-500 uppercase italic mb-8 leading-relaxed">INTERSEPSI YANG SEDANG BERJALAN AKAN DIPUTUSKAN DAN PROGRESS LOG AKAN DI-RESET.</p>
                     <div className="flex gap-4">
                        <button onClick={handleExit} className="flex-1 bg-red-600 hover:bg-red-500 text-white font-black py-4 rounded-xl text-xs tracking-widest uppercase transition-all">YES, ABORT</button>
                        <button onClick={() => setShowExitModal(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-black py-4 rounded-xl border border-white/5 text-xs tracking-widest uppercase transition-all">CANCEL</button>
                     </div>
                  </motion.div>
               </div>
            )}
         </AnimatePresence>
      </div>
   );
};

export default Level10;
