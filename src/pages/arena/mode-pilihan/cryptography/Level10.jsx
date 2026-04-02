import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
   ChevronLeft,
   Zap,
   Target,
   ShieldAlert,
   CheckCircle2,
   Send,
   Activity,
   XCircle,
   Trophy,
   Skull
} from 'lucide-react';

const CryptoLevel10 = () => {
   const navigate = useNavigate();
   const [flag, setFlag] = useState('');
   const [status, setStatus] = useState('idle'); // idle, wrong, success
   const [hintUsed, setHintUsed] = useState(false);
   const [showHint, setShowHint] = useState(false);
   const [time, setTime] = useState(0);
   const [isPaused, setIsPaused] = useState(false);
   const [showExitModal, setShowExitModal] = useState(false);

   // Target Time
   const TARGET_TIME = 480; // 8 mins

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
   const projectedStars = 1 + (time <= TARGET_TIME ? 1 : 0) + (!hintUsed ? 1 : 0);

   const handleSubmit = (e) => {
      e.preventDefault();
      const correctFlag = 'CTF{BOSS_REVERSED_HEX_MASTER}';

      if (flag.trim() === correctFlag) {
         setStatus('success');
         setIsPaused(true);

         let finalStars = 1;
         if (time <= TARGET_TIME) finalStars += 1;
         if (!hintUsed) finalStars += 1;

         saveProgress(finalStars);
      } else {
         setStatus('wrong');
         setTimeout(() => setStatus('idle'), 2000);
      }
   };

   const saveProgress = (stars) => {
      const saved = localStorage.getItem('ctf_cryptography_stats');
      const stats = saved ? JSON.parse(saved) : {};
      const currentStars = stats[10]?.stars || 0;
      const currentBest = stats[10]?.bestTime || 999999;
      stats[10] = {
         stars: Math.max(currentStars, stars),
         bestTime: Math.min(currentBest, time)
      };
      localStorage.setItem('ctf_cryptography_stats', JSON.stringify(stats));
   };

   return (
      <div className="min-h-screen bg-[#020617] text-white font-mono p-4 md:p-8 relative overflow-hidden crypto-page-theme">
         {/* BACKGROUND — BOSS LEVEL */}
         <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(234,179,8,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(234,179,8,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-yellow-500/8 blur-[180px] rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-yellow-600/5 blur-[120px] rounded-full animate-pulse delay-1000" />
         </div>

         <div className="max-w-7xl mx-auto relative z-10">
            {/* TOP NAV BAR */}
            <div className="flex justify-between items-start mb-8 relative">
               <div className="flex gap-4 items-start z-10">
                  <button
                     onClick={() => setShowExitModal(true)}
                     className="mt-1 w-10 h-10 flex items-center justify-center bg-gray-900 border border-yellow-500/30 rounded-xl transition-all group hover:bg-yellow-500/20 active:scale-95"
                  >
                     <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:-translate-x-0.5 transition-transform" />
                  </button>
                  <div>
                     <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse shadow-[0_0_12px_#eab308]" />
                        <Skull className="w-3.5 h-3.5 text-yellow-500/80" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-yellow-400/80">TRANSMISSION_VAULT</span>
                     </div>
                     <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">
                        LEVEL 10: <span className="text-yellow-400 drop-shadow-[0_0_15px_#eab308]">REVERSED HEX</span>
                     </h1>
                  </div>
               </div>

               <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
                  <div className="text-[8px] font-black text-gray-700 tracking-[0.5em] uppercase mb-2">RANK_EFFICIENCY</div>
                  <div className="flex gap-2">
                     {[1, 2, 3].map(s => (
                        <div key={s} className={`w-2 h-8 rounded-sm border transition-all duration-500 ${s <= projectedStars
                           ? 'bg-yellow-400 border-yellow-300 shadow-[0_0_120px_rgba(234,179,8,0.9)]'
                           : 'bg-white/5 border-white/10'
                           }`} />
                     ))}
                  </div>
               </div>

               <div className="text-right">
                  <div className="text-[10px] font-black text-yellow-500/30 tracking-[0.3em] uppercase mb-1">ELAPSED_TIME</div>
                  <div className="text-4xl font-black italic tracking-tighter text-yellow-400 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]">
                     {formatTime(time)}
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
               {/* LEFT: MISSION BRIEFING */}
               <div className="col-span-12 lg:col-span-4 space-y-6">
                  <div className="bg-gray-950/50 border border-yellow-500/40 rounded-2xl p-6 flex-1 flex flex-col relative overflow-hidden group shadow-2xl shadow-yellow-500/10">
                     <div className="absolute top-0 left-0 w-1.5 h-full bg-yellow-400 shadow-[0_0_20px_#eab308]" />
                     <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/5 rounded-full blur-2xl" />
                     <div className="flex items-center gap-2.5 mb-5">
                        <Trophy className="w-4 h-4 text-yellow-400" />
                        <h2 className="text-[10px] font-black tracking-[0.3em] text-yellow-100/50 uppercase italic">TRIPLE MISSION</h2>
                     </div>
                     <div className="flex items-center gap-2 mb-3">
                        <Skull className="w-4 h-4 text-yellow-500/70" />
                        <h3 className="text-xl font-black italic tracking-tighter uppercase text-white">SEKTOR: TRIPLE_MISSION</h3>
                     </div>
                     <p className="text-[11px] text-gray-400 font-bold leading-relaxed mb-6 italic uppercase tracking-wider">
                        Ini ada 3 tantangan. Data yang tersimpan telah melalui tiga lapisan: pertama dibalik (reversed), lalu dikodekan dalam Hex, lalu dibalik lagi. Semua lapisan harus dipecahkan secara berurutan untuk menemukan pesan tersembunyi!
                     </p>

                     <div className="p-3.5 bg-yellow-500/5 border border-yellow-500/30 rounded-xl mb-6">
                        <div className="flex items-center gap-2.5 mb-1.5 text-yellow-400">
                           <ShieldAlert className="w-3.5 h-3.5" />
                           <span className="text-[9px] font-black tracking-widest uppercase">TRIPLE_MISSION</span>
                        </div>
                        <p className="text-[10px] font-bold text-yellow-100/60 italic tracking-wider leading-relaxed">
                           1. Balik (reverse) seluruh string ciphertext<br />
                           2. Decode hasil reversal dari Hex ke teks<br />
                           3. Balik (reverse) hasil Hex decode<br />
                           Susun menjadi flag format CTF{"{...}"}
                        </p>
                     </div>

                     <button
                        onClick={() => {
                           setShowHint(!showHint);
                           if (!showHint) setHintUsed(true);
                        }}
                        className={`w-full py-4 border rounded-xl flex items-center justify-center gap-2.5 transition-all uppercase text-[10px] font-black tracking-widest ${showHint ? 'bg-yellow-500/20 border-yellow-400 text-yellow-400 shadow-[0_0_25px_rgba(234,179,8,0.2)]' : 'bg-white/5 border-white/10 text-gray-500 hover:border-yellow-500/40 hover:text-yellow-400'
                           }`}
                     >
                        <Zap className={`w-3.5 h-3.5 ${showHint ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                        <span>{showHint ? 'HINT_AKTIF' : 'MINTA_HINT'}</span>
                     </button>
                     {showHint && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-3 p-4 bg-black/40 rounded-xl border border-yellow-500/10 text-[10px] font-bold text-gray-400 italic tracking-wider leading-relaxed space-y-2">
                           <p className="text-yellow-300 uppercase font-black">💡 Langkah-Langkah Boss</p>
                           <p>1. Salin ciphertext, balik karakternya (gunakan tool online "reverse string")</p>
                           <p>2. Decode hasil tersebut menggunakan Hex Decoder (contoh: <span className="text-yellow-400 font-mono">rapidtables.com/convert/number/hex-to-ascii.html</span>)</p>
                           <p className="text-gray-500 mt-1">3. Balik lagi hasilnya. Kamu akan menemukan isi flag!</p>
                        </motion.div>
                     )}
                  </div>

                  <div className="bg-black/60 border border-yellow-500/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                     <div className="flex items-center gap-3 mb-6 text-yellow-500/20">
                        <Activity className="w-4 h-4" />
                        <h2 className="text-[9px] font-black tracking-[0.4em] uppercase leading-none">SISTEM_LOG</h2>
                     </div>
                     <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                        <div className="text-[10px] font-bold tracking-wider italic text-yellow-500/60 uppercase">-- INTEL: Triple-Layer Obfuscation Detected</div>
                        <div className="text-[10px] font-bold tracking-wider italic text-gray-700 uppercase">-- Layer 1: String Reversal</div>
                        <div className="text-[10px] font-bold tracking-wider italic text-gray-800 uppercase">-- Layer 2: Hexadecimal Encoding</div>
                        <div className="text-[10px] font-bold tracking-wider italic text-gray-800 uppercase">-- Layer 3: Second Reversal Applied</div>
                     </div>
                  </div>
               </div>

               {/* RIGHT: CHALLENGE AREA */}
               <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
                  <div className="flex flex-col flex-1 bg-gray-950 border-2 border-yellow-500/20 rounded-3xl overflow-hidden shadow-2xl shadow-yellow-500/5 relative group">
                     {/* HEADER BAR */}
                     <div className="h-14 bg-yellow-500/5 border-b border-yellow-500/15 flex items-center px-6 gap-3 z-20">
                        <div className="flex gap-1.5">
                           <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30 shadow-[0_0_6px_#eab308]" />
                           <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/15" />
                           <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/15" />
                        </div>
                        <div className="flex-1 flex justify-center items-center gap-2">
                           <Skull className="w-3.5 h-3.5 text-yellow-400/50" />
                           <span className="text-[10px] font-black text-yellow-400/50 tracking-widest uppercase">ENCRYPTED_PAYLOAD</span>
                           <Skull className="w-3.5 h-3.5 text-yellow-400/50" />
                        </div>
                     </div>

                     {/* MESSAGE VIEWPORT */}
                     <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#030509] relative">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(234,179,8,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(234,179,8,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

                        <div className="relative z-10 w-full max-w-xl space-y-5">
                           {/* Boss Ciphertext */}
                           <div className="p-6 bg-yellow-500/5 border border-yellow-500/25 rounded-2xl shadow-[0_0_40px_rgba(234,179,8,0.07)]">
                              <div className="flex items-center gap-2 mb-4">
                                 <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center">
                                    <Skull className="w-3 h-3 text-yellow-400" />
                                 </div>
                                 <span className="text-[9px] font-black text-yellow-500/60 uppercase tracking-widest">Final Boss Ciphertext — Triple Obfuscated</span>
                              </div>
                              <div className="p-5 bg-black/70 rounded-xl border border-yellow-500/10 font-mono text-xs md:text-sm font-bold tracking-[0.08em] text-yellow-400 break-all select-all shadow-inner leading-relaxed shadow-[inset_0_0_20px_rgba(234,179,8,0.03)]">
                                 43 54 46 7B 42 4F 53 53 5F 52 45 56 45 52 53 45 44 5F 48 45 58 5F 4D 41 53 54 45 52 7D
                              </div>
                              <div className="mt-3 flex items-center gap-2">
                                 <div className="flex-1 h-px bg-yellow-500/10" />
                                 <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Reversed → Hex → Reversed</p>
                                 <div className="flex-1 h-px bg-yellow-500/10" />
                              </div>
                           </div>
                           {/* Steps guide */}
                           <div className="grid grid-cols-3 gap-3">
                              {[
                                 { step: '01', label: 'Reverse String', desc: 'Balik seluruh karakter ciphertext' },
                                 { step: '02', label: 'Hex Decode', desc: 'Decode Hex menjadi teks biasa' },
                                 { step: '03', label: 'Reverse Again', desc: 'Balik hasilnya → temukan flag!' },
                              ].map((s) => (
                                 <div key={s.step} className="p-3 bg-yellow-500/3 border border-yellow-500/10 rounded-xl text-center">
                                    <div className="text-[8px] font-black text-yellow-500/40 tracking-widest mb-1">{s.step}</div>
                                    <div className="text-[9px] font-black text-yellow-400/80 uppercase">{s.label}</div>
                                    <div className="text-[8px] text-gray-600 mt-1 italic leading-tight">{s.desc}</div>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* SUBMISSION AREA */}
                  <div className="bg-[#0A0F1D]/80 border border-yellow-500/40 rounded-2xl p-6 relative overflow-hidden shadow-2xl shadow-yellow-500/5">
                     <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
                     <form onSubmit={handleSubmit} className="relative z-10 flex flex-col md:flex-row gap-3">
                        <div className="flex-1 relative">
                           <input
                              type="text"
                              value={flag}
                              onChange={(e) => setFlag(e.target.value)}
                              placeholder="Masukkan token rahasia (CTF{...})"
                              className={`w-full bg-black/40 border-2 rounded-xl py-3.5 px-6 text-xs tracking-widest text-white placeholder:text-gray-700 focus:outline-none transition-all ${status === 'wrong' ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-yellow-500/25 focus:border-yellow-500/60 focus:shadow-[0_0_20px_rgba(234,179,8,0.1)]'
                                 }`}
                           />
                        </div>
                        <button
                           type="submit"
                           className="bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase text-[10px] tracking-[0.2em] px-8 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(234,179,8,0.5)]"
                        >
                           <span>SUBMIT</span>
                           <Send className="w-3.5 h-3.5" />
                        </button>
                     </form>
                  </div>
               </div>
            </div>

            {/* BOTTOM STATUS */}
            <div className="mt-8 pt-6 border-t border-yellow-500/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-700">
               <div className="flex items-center gap-6 text-[9px] font-black tracking-widest">
                  <span className="text-yellow-500/50">{" > "} CIPHER: TRIPLE_LAYER_OBFUSCATION</span>
                  <span className="text-gray-800">//</span>
                  <span>NODE: crypto-boss-final</span>
                  <span className="text-gray-800">//</span>
                  <span className="text-white/20 italic text-[8px]">BOSS_LEVEL_10</span>
               </div>
               <div className="text-[8px] font-bold uppercase tracking-tighter italic text-yellow-900/60">-- FINAL_VAULT_BREACH_REQUIRED // MASTER_CRYPTOGRAPHER --</div>
            </div>
         </div>

         {/* SUCCESS OVERLAY — BOSS */}
         <AnimatePresence>
            {status === 'success' && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[500] bg-[#020617]/90 backdrop-blur-md flex flex-col justify-center items-center p-6 text-center overflow-y-auto crypto-scrollbar-theme">
                  <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className="max-w-sm w-full p-8 bg-gray-950 border border-yellow-500/30 rounded-[2.5rem] shadow-[0_0_80px_rgba(234,179,8,0.3)] relative overflow-hidden my-auto">

                     {/* Gold particles effect */}
                     <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(12)].map((_, i) => (
                           <motion.div
                              key={i}
                              initial={{ opacity: 0, y: '100vh', x: `${5 + i * 8}vw` }}
                              animate={{ opacity: [0, 1, 0], y: '-20vh' }}
                              transition={{ duration: 2 + i * 0.2, delay: i * 0.1, repeat: Infinity }}
                              className="absolute w-1 h-1 bg-yellow-400 rounded-full shadow-[0_0_8px_#eab308]"
                           />
                        ))}
                     </div>

                     <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500 shadow-[0_0_15px_#eab308]" />
                     <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-yellow-500/20 shadow-[0_0_20px_rgba(234,179,8,0.1)]">
                        <Trophy className="w-8 h-8 text-yellow-500" />
                     </div>

                     <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white mb-2 leading-none">VAULT_BREACHED</h2>
                     <p className="text-yellow-500/60 font-black tracking-[0.4em] uppercase text-[8px] mb-8 italic">Master_Cryptographer</p>

                     <div className="bg-black/40 border border-white/5 rounded-2xl p-5 mb-8 text-left space-y-2 relative z-10">
                        <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5 mb-2">
                           <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-none italic">Execution_Time</span>
                           <span className="text-xl font-black italic text-yellow-400 leading-none tabular-nums">{formatTime(time)}</span>
                        </div>

                        <div className="space-y-1.5">
                           <div className="flex items-center justify-between p-3 bg-yellow-500/5 rounded-xl border border-yellow-500/10 transition-all hover:bg-yellow-500/10">
                              <span className="text-[10px] font-black uppercase italic text-yellow-400">1. Selesaikan Infiltrasi Sektor</span>
                              <div className="w-5 h-5 flex items-center justify-center bg-yellow-500/20 rounded-lg">
                                 <CheckCircle2 className="w-3.5 h-3.5 text-yellow-500 shadow-[0_0_10px_#eab308]" />
                              </div>
                           </div>

                           <div className={`flex items-center justify-between p-3 rounded-xl border transition-all ${time <= TARGET_TIME ? 'bg-yellow-500/5 border-yellow-500/10 hover:bg-yellow-500/10' : 'bg-red-500/5 border-red-500/10'}`}>
                              <span className={`text-[10px] font-black uppercase italic ${time <= TARGET_TIME ? 'text-yellow-400' : 'text-gray-600'}`}>
                                 2. Target Waktu ({TARGET_TIME}s)
                              </span>
                              <div className={`w-5 h-5 flex items-center justify-center rounded-lg ${time <= TARGET_TIME ? 'bg-yellow-500/20' : 'bg-red-500/20'}`}>
                                 {time <= TARGET_TIME ? (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-yellow-500 shadow-[0_0_10px_#eab308]" />
                                 ) : (
                                    <XCircle className="w-3.5 h-3.5 text-red-500" />
                                 )}
                              </div>
                           </div>

                           <div className={`flex items-center justify-between p-3 rounded-xl border transition-all ${!hintUsed ? 'bg-yellow-500/5 border-yellow-500/10 hover:bg-yellow-500/10' : 'bg-red-500/5 border-red-500/10'}`}>
                              <span className={`text-[10px] font-black uppercase italic ${!hintUsed ? 'text-yellow-400' : 'text-gray-600'}`}>
                                 3. Tanpa Hint Digital
                              </span>
                              <div className={`w-5 h-5 flex items-center justify-center rounded-lg ${!hintUsed ? 'bg-yellow-500/20' : 'bg-red-500/20'}`}>
                                 {!hintUsed ? (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-yellow-500 shadow-[0_0_10px_#eab308]" />
                                 ) : (
                                    <XCircle className="w-3.5 h-3.5 text-red-500" />
                                 )}
                              </div>
                           </div>
                        </div>
                     </div>

                     <button
                        onClick={() => navigate('/ctf-arena/cryptography/mudah', { state: { lastLevel: 10 } })}
                        className="w-full py-4 bg-yellow-500 text-black font-black uppercase text-[11px] tracking-[0.2em] rounded-xl shadow-[0_10px_30px_rgba(234,179,8,0.3)] hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-2 relative z-10"
                     >
                        <span>RETURN TO HUB</span>
                        <Trophy className="w-4 h-4" />
                     </button>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>

         {/* EXIT MODAL */}
         <AnimatePresence>
            {showExitModal && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[600] bg-black/90 backdrop-blur-sm flex justify-center items-center p-4 text-center">
                  <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-gray-900 border border-yellow-500/40 rounded-3xl p-10 max-w-sm w-full relative overflow-hidden shadow-2xl shadow-yellow-500/20">
                     <div className="absolute top-0 left-0 w-full h-1.5 bg-yellow-500" />
                     <ShieldAlert className="w-12 h-12 text-yellow-500 mx-auto mb-6" />
                     <h3 className="text-xl font-black text-white tracking-widest uppercase mb-4 italic">ABORT BOSS MISSION?</h3>
                     <p className="text-[11px] text-gray-500 mb-10 font-bold leading-relaxed italic uppercase tracking-wider">Anda yakin ingin meninggalkan final boss saat ini? Progress akan hilang!</p>
                     <div className="flex gap-4">
                        <button onClick={() => setShowExitModal(false)} className="flex-1 py-3.5 bg-gray-800 text-white font-bold rounded-xl border border-white/5 hover:bg-gray-700 transition-colors uppercase tracking-widest text-[10px]">BATAL</button>
                        <button onClick={() => navigate('/ctf-arena/cryptography/mudah', { state: { lastLevel: 10 } })} className="flex-1 py-3.5 bg-red-600 text-white font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-red-500 transition-colors shadow-[0_0_20px_rgba(239,68,68,0.2)]">KELUAR</button>
                     </div>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};

export default CryptoLevel10;
