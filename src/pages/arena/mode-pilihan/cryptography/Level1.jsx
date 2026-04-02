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
  Code, 
  Globe, 
  Share2, 
  Send,
  Database,
  Activity,
  X,
  XCircle,
  Trophy
} from 'lucide-react';

const CryptoLevel1 = () => {
  const navigate = useNavigate();
  const [flag, setFlag] = useState('');
  const [status, setStatus] = useState('idle'); // idle, wrong, success
  const [showHint, setShowHint] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [attempts, setAttempts] = useState([]);
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  // Challenge State
  const [viewSource, setViewSource] = useState(false);

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
    const correctFlag = 'CTF{ROTATION_CAESAR}';
    
    if (flag.trim() === correctFlag) {
      setStatus('success');
      setIsPaused(true);
      
      // Calculate Stars
      let finalStars = 1; // 1 for success
      if (time <= 120) finalStars += 1; // 1 for time
      if (!hintUsed) finalStars += 1; // 1 for no hint
      
      saveProgress(finalStars);
    } else {
      setStatus('wrong');
      setAttempts([...attempts, flag]);
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  const saveProgress = (stars) => {
    const saved = localStorage.getItem('ctf_cryptography_stats');
    const stats = saved ? JSON.parse(saved) : {};
    
    // Only update if better or first time
    const currentStars = stats[1]?.stars || 0;
    const currentBest = stats[1]?.bestTime || 999999;
    
    stats[1] = { 
      stars: Math.max(currentStars, stars), 
      bestTime: Math.min(currentBest, time) 
    };
    localStorage.setItem('ctf_cryptography_stats', JSON.stringify(stats));
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-mono p-4 md:p-8 relative overflow-hidden crypto-page-theme">
      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/5 blur-[120px] rounded-full animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* TOP NAV BAR (Mode Acak Style) */}
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
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse shadow-[0_0_8px_#eab308]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-yellow-400/80">TARGET: SECTOR_ALPHA</span>
              </div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">
                LEVEL 1: <span className="text-yellow-500 drop-shadow-[0_0_10px_#eab308]">IMPERIAL SHIFT</span>
              </h1>
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
             <div className="text-[8px] font-black text-gray-700 tracking-[0.5em] uppercase mb-2">RANK_EFFICIENCY</div>
             <div className="flex gap-2">
                {[1, 2, 3].map(s => (
                   <div key={s} className={`w-2 h-6 rounded-sm border transition-all duration-500 ${
                     s <= projectedStars
                       ? 'bg-yellow-400 border-yellow-300 shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                       : 'bg-white/5 border-white/10'
                   }`} />
                 ))}
             </div>
          </div>

          <div className="text-right">
             <div className="text-[10px] font-black text-yellow-500/30 tracking-[0.3em] uppercase mb-1">ELAPSED_TIME</div>
             <div className="text-4xl font-black italic tracking-tighter text-yellow-500">
               {formatTime(time)}
             </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* LEFT: MISSION BRIEFING (Mode Acak Style) */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-gray-950/50 border border-yellow-500/30 rounded-2xl p-6 flex-1 flex flex-col relative overflow-hidden group shadow-2xl">
               <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500 shadow-[0_0_15px_#eab308]" />
               <div className="flex items-center gap-2.5 mb-5">
                  <Target className="w-4 h-4 text-yellow-500" />
                  <h2 className="text-[10px] font-black tracking-[0.3em] text-yellow-100/50 uppercase italic">OBJEKTIF_MISI</h2>
               </div>
               <h3 className="text-xl font-black italic tracking-tighter uppercase text-white mb-3">SEKTOR: IMPERIAL_SHIFT</h3>
               <p className="text-[11px] text-gray-400 font-bold leading-relaxed mb-6 italic uppercase tracking-wider">
                  Intelijen mencegat sebuah transmisi rahasia kuno peninggalan bangsa Romawi. Pesan ini menggunakan teknik pergeseran huruf (Caesar Cipher).
                  Dekripsikan teks tersebut untuk memulihkan pesan asli.
               </p>

               <div className="p-3.5 bg-yellow-500/5 border border-yellow-500/20 rounded-xl mb-6">
                  <div className="flex items-center gap-2.5 mb-1.5 text-yellow-400">
                     <ShieldAlert className="w-3.5 h-3.5" />
                     <span className="text-[9px] font-black tracking-widest uppercase">Target_Goal</span>
                  </div>
                  <p className="text-[10px] font-bold text-yellow-100/60 italic tracking-wider leading-relaxed">
                     Pecahkan cipher text di panel kanan menggunakan teknik geser mundur dan temukan format CTF&#123;...&#125;
                  </p>
               </div>

               <button 
                  onClick={() => {
                    setShowHint(!showHint);
                    if (!showHint) setHintUsed(true);
                  }}
                  className={`w-full py-4 border rounded-xl flex items-center justify-center gap-2.5 transition-all uppercase text-[10px] font-black tracking-widest ${
                    showHint ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.1)]' : 'bg-white/5 border-white/10 text-gray-500 hover:border-yellow-500/40 hover:text-yellow-400'
                  }`}
               >
                  <Zap className={`w-3.5 h-3.5 ${showHint ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                  <span>{showHint ? 'HINT_AKTIF' : 'MINTA_HINT'}</span>
               </button>
               {showHint && (
                 <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-3 p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-bold text-gray-400 italic tracking-wider leading-relaxed space-y-2">
                    <p className="text-yellow-300 uppercase font-black">💡 Cara Kerja Caesar Cipher</p>
                    <p>Caesar Cipher bekerja dengan cara menggeser setiap alfabet sejumlah angka tertentu. Jika pesannya digeser maju sebanyak 3 langkah (A -&gt; D), Anda hanya perlu menggeser mundur setiap hurufnya 3 langkah (D -&gt; A) untuk membacanya. Spasi dan simbol (_, &#123;, &#125;) biasanya tidak tergeser.</p>
                 </motion.div>
               )}
            </div>

            <div className="bg-black/60 border border-white/5 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
               <div className="flex items-center gap-3 mb-6 text-white/30">
                  <Activity className="w-4 h-4" />
                  <h2 className="text-[9px] font-black tracking-[0.4em] uppercase leading-none">SISTEM_LOG</h2>
               </div>
               <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                  <div className="text-[10px] font-bold tracking-wider italic text-yellow-500/60 uppercase">-- 12:00:01 -- Connection established</div>
                  <div className="text-[10px] font-bold tracking-wider italic text-gray-700 uppercase">-- 12:00:05 -- Scanning entry_node_v1...</div>
                  {attempts.map((att, i) => (
                    <div key={i} className="text-[10px] font-bold tracking-wider italic text-red-500/60 uppercase">-- {att} -- ACCESS_DENIED</div>
                  ))}
               </div>
            </div>
          </div>

          {/* RIGHT: CHALLENGE AREA */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            <div className="flex flex-col flex-1 bg-gray-950 border-2 border-yellow-500/10 rounded-3xl overflow-hidden shadow-2xl relative group">
               {/* HEADER BAR */}
               <div className="h-12 bg-yellow-500/5 border-b border-yellow-500/10 flex items-center px-6 gap-3 z-20">
                  <div className="flex gap-1.5">
                     <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                     <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/10" />
                     <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/10" />
                  </div>
                  <div className="flex-1 flex justify-center items-center">
                     <span className="text-[10px] font-black text-yellow-500/50 tracking-widest uppercase">ENCRYPTED_MESSAGE_INTERCEPTED</span>
                  </div>
               </div>

               {/* MESSAGE VIEWPORT */}
               <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#05080F] relative">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(234,179,8,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(234,179,8,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
                  
                  <div className="relative z-10 w-full max-w-lg">
                    <div className="p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl shadow-[0_0_30px_rgba(234,179,8,0.05)] text-center">
                       <h4 className="text-[10px] font-black tracking-[0.4em] text-yellow-500/50 uppercase mb-4 italic">Raw Data Dump</h4>
                       <div className="p-6 bg-black/60 rounded-xl border border-white/5 font-mono text-xl tracking-[0.2em] text-yellow-400 break-all select-all shadow-inner">
                          FWI&#123;URWDWLRQ_FDHVDU&#125;
                       </div>
                       <p className="mt-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest italic animate-pulse">Anomali Terdeteksi: Pergeseran Alfabet +3</p>
                    </div>
                  </div>
               </div>
            </div>

            {/* SUBMISSION AREA */}
            <div className="bg-[#0A0F1D]/80 border border-yellow-500/30 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
               <form onSubmit={handleSubmit} className="relative z-10 flex flex-col md:flex-row gap-3">
                  <div className="flex-1 relative">
                    <input 
                       type="text" 
                       value={flag} 
                       onChange={(e) => setFlag(e.target.value)} 
                       placeholder="Masukkan flag (CTF{...})" 
                       className={`w-full bg-black/40 border-2 rounded-xl py-3.5 px-6 text-xs tracking-widest text-white placeholder:text-gray-700 focus:outline-none transition-all ${
                         status === 'wrong' ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-yellow-500/20 focus:border-yellow-500/50'
                       }`} 
                    />
                  </div>
                  <button 
                     type="submit" 
                     className="bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase text-[10px] tracking-[0.2em] px-8 py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                     <span>SUBMIT</span>
                     <Send className="w-3.5 h-3.5" />
                  </button>
               </form>
            </div>
          </div>
        </div>

        {/* BOTTOM LOG & STATUS */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-700">
           <div className="flex items-center gap-6 text-[9px] font-black tracking-widest">
              <span className="text-yellow-500/50">{" > "} NODE: STABLE</span>
              <span className="text-gray-800">//</span>
              <span>NETWORK: ISOLATED_VLAN</span>
              <span className="text-gray-800">//</span>
              <span className="text-white/20 italic">V1.0.1_BETA</span>
           </div>
           <div className="text-[8px] font-bold uppercase tracking-tighter italic opacity-50">-- OPERATIONAL_OVERLAY_ACTIVE // DATA_SENTINEL_WATCHING --</div>
        </div>
      </div>

      {/* SUCCESS OVERLAY */}
      <AnimatePresence>
         {status === 'success' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[500] bg-[#020617]/90 backdrop-blur-md flex flex-col justify-center items-center p-6 text-center overflow-y-auto crypto-scrollbar-theme">
               {/* ✨ Gold particles rising in backdrop */}
               <div className="absolute inset-0 pointer-events-none overflow-hidden">
                 {[...Array(20)].map((_, i) => (
                   <motion.div
                     key={`gp-${i}`}
                     style={{ left: `${(i * 5 + 2) % 94}%`, position: 'absolute', bottom: '-4px' }}
                     className="w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_10px_#eab308]"
                     initial={{ opacity: 0, y: 0 }}
                     animate={{ opacity: [0, 1, 0], y: '-100vh' }}
                     transition={{ duration: 4 + (i % 6) * 0.7, delay: i * 0.25, repeat: Infinity, ease: 'linear' }}
                   />
                 ))}
               </div>
               <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className="max-w-sm w-full p-8 bg-gray-950 border border-yellow-500/30 rounded-[2.5rem] shadow-[0_0_80px_rgba(234,179,8,0.3)] relative overflow-hidden my-auto">
                   <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500 shadow-[0_0_15px_#eab308]" />
                  <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-yellow-500/20 shadow-[0_0_20px_rgba(234,179,8,0.1)]">
                     <CheckCircle2 className="w-8 h-8 text-yellow-500" />
                  </div>
                  
                  <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white mb-2 leading-none">MISSION_COMPLETED</h2>
                  <p className="text-yellow-500/60 font-black tracking-[0.4em] uppercase text-[8px] mb-8 italic">Cipher_Key_Recovered</p>
                  
                  <div className="bg-black/40 border border-white/5 rounded-2xl p-5 mb-8 text-left space-y-2">
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
                        
                        <div className={`flex items-center justify-between p-3 rounded-xl border transition-all ${time <= 120 ? 'bg-yellow-500/5 border-yellow-500/10 hover:bg-yellow-500/10' : 'bg-red-500/5 border-red-500/10'}`}>
                           <span className={`text-[10px] font-black uppercase italic ${time <= 120 ? 'text-yellow-400' : 'text-gray-600'}`}>
                              2. Target Waktu (120s)
                           </span>
                           <div className={`w-5 h-5 flex items-center justify-center rounded-lg ${time <= 120 ? 'bg-yellow-500/20' : 'bg-red-500/20'}`}>
                              {time <= 120 ? (
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
                     onClick={() => navigate('/ctf-arena/cryptography/mudah', { state: { lastLevel: 1 } })}
                     className="w-full py-4 bg-yellow-500 text-black font-black uppercase text-[11px] tracking-[0.2em] rounded-xl shadow-[0_10px_30px_rgba(234,179,8,0.3)] hover:scale-[1.02] transition-all active:scale-95"
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
               <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-gray-900 border border-yellow-500/30 rounded-3xl p-10 max-w-md w-full text-center relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500" />
                  <ShieldAlert className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-black text-white tracking-widest uppercase mb-4 italic">ABORT MISSION?</h3>
                  <p className="text-sm text-gray-400 mb-10 font-bold leading-relaxed italic uppercase tracking-wider">Anda yakin ingin keluar? Semua progres infiltrasi saat ini akan hilang.</p>
                  <div className="flex gap-4">
                    <button onClick={() => setShowExitModal(false)} className="flex-1 py-4 bg-gray-800 text-white font-bold rounded-2xl border border-white/5 hover:bg-gray-700 transition-colors uppercase tracking-widest text-xs">Batalkan</button>
                    <button onClick={() => navigate('/ctf-arena/cryptography/mudah', { state: { lastLevel: 1 } })} className="flex-1 py-4 bg-red-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-red-500 transition-colors shadow-[0_0_20px_rgba(239,68,68,0.3)]">Keluar</button>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>

    </div>
  );
};

export default CryptoLevel1;
