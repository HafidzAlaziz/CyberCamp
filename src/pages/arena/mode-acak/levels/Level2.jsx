import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  Radio,
  Clock,
  Zap,
  ChevronLeft,
  X,
  Play,
  Terminal,
  Cpu,
  Copy,
  Check,
  ShieldAlert,
  Activity
} from 'lucide-react';

const Level2 = () => {
  const navigate = useNavigate();
  
  // Timer Persistence Logic
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem('ctf_level2_time');
    return saved ? parseInt(saved) : 300;
  });

  const [stars, setStars] = useState(() => {
    const saved = localStorage.getItem('ctf_level2_stars');
    return saved ? parseInt(saved) : 3;
  });
  const [hasUsedHint, setHasUsedHint] = useState(() => {
    return localStorage.getItem('ctf_level2_hint_used') === 'true';
  });
  const [hasOvertimePenalty, setHasOvertimePenalty] = useState(() => {
    return localStorage.getItem('ctf_level2_overtime') === 'true';
  });

  const [flag, setFlag] = useState('');
  const [status, setStatus] = useState('active'); // 'active', 'wrong', 'decoy', 'complete'
  const [attempts, setAttempts] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [completionTime, setCompletionTime] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  // Challenge Config
  const PAYLOAD = "Q1RGe0I0czM2NF8xc19OMHRfM25jcnlwdDEwbn0=";
  const CORRECT_FLAG = "CTF{B4s364_1s_N0t_3ncrypt10n}";
  const DECOY_FLAG = "CTF{Q1RGe0I0czM2NF8xc19OMHRfM25jcnlwdDEwbn0=}";

  useEffect(() => {
    if (status !== 'complete') {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          const nextValue = prev - 1;
          localStorage.setItem('ctf_level2_time', nextValue.toString());
          if (nextValue < 0 && !hasOvertimePenalty) {
            setHasOvertimePenalty(true);
            localStorage.setItem('ctf_level2_overtime', 'true');
            setStars(s => {
              const newStars = Math.max(0, s - 1);
              localStorage.setItem('ctf_level2_stars', newStars.toString());
              return newStars;
            });
          }
          return nextValue;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status, hasOvertimePenalty]);

  const handleHintClick = () => {
    if (!showHint) {
      setShowHint(true);
      if (!hasUsedHint) {
        setHasUsedHint(true);
        localStorage.setItem('ctf_level2_hint_used', 'true');
        setStars(s => {
          const newStars = Math.max(0, s - 1);
          localStorage.setItem('ctf_level2_stars', newStars.toString());
          return newStars;
        });
      }
    } else {
      setShowHint(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(PAYLOAD);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const formatTime = (seconds) => {
    const isNegative = seconds < 0;
    const absSeconds = Math.abs(seconds);
    const mins = Math.floor(absSeconds / 60);
    const secs = absSeconds % 60;
    return `${isNegative ? '-' : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (flag.trim() === CORRECT_FLAG) {
      const timeTaken = 300 - timeLeft;
      const timeTakenStr = formatTime(timeTaken);
      setCompletionTime(timeTakenStr);
      setStatus('complete');
      
      const savedStats = localStorage.getItem('ctf_mode_acak_stats');
      const stats = savedStats ? JSON.parse(savedStats) : {};
      const currentBestStars = stats[2]?.stars || 0;
      if (stars >= currentBestStars) {
         stats[2] = { stars: stars, bestTime: timeTakenStr };
         localStorage.setItem('ctf_mode_acak_stats', JSON.stringify(stats));
      }
      localStorage.removeItem('ctf_level2_time');
      localStorage.removeItem('ctf_level2_stars');
      localStorage.removeItem('ctf_level2_hint_used');
      localStorage.removeItem('ctf_level2_overtime');
    } else if (flag.trim() === DECOY_FLAG) {
      setStatus('decoy');
      setAttempts(prev => [...prev, flag]);
      setTimeout(() => setStatus('active'), 2000);
    } else if (flag.trim() !== "") {
      setStatus('wrong');
      setAttempts(prev => [...prev, flag]);
      setTimeout(() => setStatus('active'), 2000);
    }
    setFlag('');
  };

  const handleExit = () => {
    localStorage.removeItem('ctf_level2_time');
    localStorage.removeItem('ctf_level2_stars');
    localStorage.removeItem('ctf_level2_hint_used');
    localStorage.removeItem('ctf_level2_overtime');
    navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 2 } });
  };

  if (status === 'complete') {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 font-mono text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1)_0%,transparent_70%)]" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="z-10 bg-gray-900 border-4 border-purple-500 p-12 rounded-3xl text-center max-w-xl shadow-[0_0_50px_rgba(168,85,247,0.3)]">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-24 h-24 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-purple-500/30">
            <Zap className="w-12 h-12 text-purple-400 fill-purple-400 drop-shadow-[0_0_10px_#a855f7]" />
          </motion.div>
          <h1 className="text-5xl font-black italic tracking-tighter mb-2 text-white uppercase leading-none">MISSION COMPLETE</h1>
          <p className="text-purple-500 font-bold tracking-[0.3em] mb-4 text-[10px]">SECTOR: CRYPTO_CORE // SIGNAL_DECODED</p>
          <div className="bg-purple-500/5 border border-purple-500/10 rounded-2xl py-6 px-10 mb-8 inline-block">
             <div className="text-[10px] font-black text-gray-500 tracking-[0.4em] uppercase mb-4">Misi terselesaikan dalam</div>
             <div className="text-4xl font-black text-white italic tracking-tighter mb-6">{completionTime}</div>
             <div className="flex justify-center gap-4">
               {[1, 2, 3].map(s => (
                 <Zap key={s} className={`w-10 h-10 transition-all duration-500 ${s <= stars ? 'text-purple-400 fill-purple-400 drop-shadow-[0_0_15px_#a855f7]' : 'text-gray-800 fill-transparent'}`} />
               ))}
             </div>
          </div>
          <button onClick={() => navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 2 } })} className="w-full bg-purple-500 text-black font-black py-4 rounded-xl hover:bg-purple-400 transition-all text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(168,85,247,0.2)]">KEMBALI KE MAP TAKTIS</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-4 md:p-8 flex flex-col overflow-hidden relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #1e293b 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col relative z-10">
        
        {/* HEADER AREA */}
        <div className="flex justify-between items-start mb-8 relative">
          <div className="flex gap-4 items-start z-10">
            <button 
              onClick={() => setShowExitModal(true)} 
              className="mt-1 p-2 bg-gray-900 border border-purple-500/30 rounded-xl hover:bg-purple-500/20 text-gray-400 hover:text-purple-400 transition-all group"
              title="Abort Mission"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse shadow-[0_0_8px_#a855f7]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400/80">TARGET: SECTOR_CRYPTO</span>
              </div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none shadow-purple-500/20">
                LEVEL 2: <span className="text-purple-500 drop-shadow-[0_0_10px_#a855f7]">CRYPTOGRAPHY</span>
              </h1>
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
             <div className="text-[8px] font-black text-gray-700 tracking-[0.5em] uppercase mb-2">RANK_EFFICIENCY</div>
             <div className="flex gap-3">
                {[1, 2, 3].map(s => (
                  <Zap key={s} className={`w-6 h-6 transition-all duration-700 ${s <= stars ? 'text-purple-400 fill-purple-400 drop-shadow-[0_0_10px_#a855f7]' : 'text-white/10 fill-transparent opacity-20'}`} />
                ))}
             </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] font-black text-red-500/80 tracking-[0.3em] uppercase mb-1">REMAINING_TIME</div>
            <div className={`text-4xl font-black italic tracking-tighter transition-colors duration-500 ${timeLeft < 0 ? 'text-red-500' : timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-red-600'}`}>
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* LAYOUT */}
        <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
          
          {/* LEFT SIDE: BRIEFING */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <div className="bg-gray-950/50 border border-purple-500/30 rounded-2xl p-6 flex-1 flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-purple-500 shadow-[0_0_15px_#a855f7]" />
              <div className="flex items-center gap-3 mb-6">
                <Radio className="w-5 h-5 text-purple-400" />
                <h2 className="text-sm font-black text-purple-200 uppercase tracking-widest">BRIEFING MISI</h2>
              </div>
              <div className="text-xs leading-relaxed text-gray-400 overflow-y-auto pr-2 custom-scrollbar space-y-4 italic">
                <p>{" > "} Target: Transmisi Sinyal Sindikat 'Cyber'.</p>
                <p>{" > "} Intelligence: Komunikasi berhasil disadap dari jalur frekuensi gelap. Pesan disandikan menggunakan teknik encoding 64-bit standar.</p>
                <p>{" > "} Tugas lo: Dekode pesan rahasia di layar terminal untuk mendapatkan Flag.</p>
                <div className="p-3 bg-purple-950/20 border border-purple-500/20 rounded-lg">
                   <p className="text-purple-400 font-black tracking-tight uppercase mb-1 flex items-center gap-2">
                     <ShieldAlert className="w-3 h-3" /> DATA_ENCODED
                   </p>
                   <p className="text-[9px] text-gray-600 uppercase">Terdeteksi karakter padding khas pada payload yang ter-intercept.</p>
                </div>
              </div>
            </div>

            <button onClick={handleHintClick} className={`bg-purple-900/20 border rounded-xl p-4 flex items-center justify-center gap-3 group transition-all shadow-[0_0_20px_rgba(168,85,247,0.1)] ${showHint ? 'border-purple-400 bg-purple-900/40' : 'border-purple-500/40 hover:bg-purple-900/30'}`}>
              <Zap className={`w-4 h-4 transition-colors ${showHint ? 'text-purple-400 fill-purple-400' : 'text-purple-400'}`} />
              <span className="text-xs font-black text-purple-200 uppercase tracking-widest">{showHint ? 'HINT ACTIVE' : '💡 MINTA HINT BOS'}</span>
            </button>
            
            <AnimatePresence>
              {showHint && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-gray-900/50 border border-white/5 rounded-xl p-4 text-[10px] text-gray-500 italic uppercase leading-tight">
                  Perhatikan tanda sama dengan (=) di akhir teks sandi. Itu adalah karakter padding khas dari Base64. Coba cari tools Decoder Base64 to Text di internet.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CENTER: WORKSPACE */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            <div className="flex-1 bg-black border border-purple-500/20 rounded-2xl flex flex-col overflow-hidden relative group shadow-2xl">
              
              <div className="h-10 bg-gray-900/80 border-b border-white/5 flex items-center px-4 gap-4 backdrop-blur-md">
                 <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                 </div>
                 <div className="flex items-center gap-2">
                    <Terminal className="w-3 h-3 text-purple-500" />
                    <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Signal_Interceptor.v2.0</span>
                 </div>
              </div>

              <div className="flex-1 p-6 font-mono text-sm overflow-y-auto custom-scrollbar">
                 <div className="space-y-1 mb-8">
                    <div className="text-gray-600">[SYSTEM] Intercepting data packet from remote relay...</div>
                    <div className="text-gray-600">[SYSTEM] Frequency locked. Extracting payload...</div>
                    <div className="text-orange-500/70 text-xs italic">[WARN] Data is encoded. Human readability: 0%</div>
                 </div>

                 <div className="flex flex-col items-center justify-center h-48 relative">
                    <motion.div 
                      whileHover={{ scale: 1.02, borderColor: '#a855f7', boxShadow: '0 0 30px rgba(168,85,247,0.2)' }}
                      className="bg-gray-900/50 border-2 border-purple-500/30 p-8 rounded-2xl relative group/payload transition-all duration-500"
                    >
                       <div className="text-[8px] font-black text-purple-500 uppercase tracking-[0.4em] mb-4 text-center">Interception_Result: BASE64_ENCODED</div>
                       <div className="flex items-center gap-6">
                          <span className="text-xl md:text-2xl font-black text-white tracking-widest select-all">
                             {PAYLOAD}
                          </span>
                          <button 
                            type="button"
                            onClick={handleCopy}
                            className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl hover:bg-purple-500/20 transition-all text-purple-400 group-active:scale-95"
                          >
                             {isCopied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                             {isCopied && <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-green-500 text-black text-[10px] font-black px-3 py-1 rounded-md">Copied!</span>}
                          </button>
                       </div>
                    </motion.div>
                    
                    <div className="mt-8 flex items-center gap-6 text-[10px] font-black text-gray-700 tracking-widest uppercase">
                       <div className="flex items-center gap-2">
                          <Activity className="w-3 h-3 text-purple-500 animate-pulse" /> BITRATE: 12.4 KBPS
                       </div>
                       <div className="flex items-center gap-2">
                          <Cpu className="w-3 h-3 text-purple-500" /> SOURCE: SHADOW_RELAY_B
                       </div>
                    </div>
                 </div>
              </div>
              
              <div className="absolute inset-0 bg-purple-500/5 opacity-10 pointer-events-none" />
            </div>

            {/* SUBMISSION */}
            <div className="bg-gray-900/40 border border-purple-500/30 rounded-2xl p-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10"><Terminal className="w-12 h-12 text-purple-400" /></div>
               <form onSubmit={handleSubmit} className="relative z-10 flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <input type="text" value={flag} onChange={(e) => setFlag(e.target.value)} placeholder="Masukkan flag di sini (CTF_{...})" className={`w-full bg-black/60 border-2 rounded-xl py-4 px-6 text-sm tracking-widest text-white placeholder:text-gray-700 focus:outline-none transition-all ${status === 'wrong' || status === 'decoy' ? 'border-red-500 shadow-[0_0_15px_#ef4444]' : 'border-purple-500/40 focus:border-purple-500 focus:shadow-[0_0_20px_rgba(168,85,247,0.2)]'}`} />
                    <AnimatePresence>
                      {status === 'wrong' && <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-3 -right-3 bg-red-600 text-[8px] font-black italic px-3 py-1 rounded-full text-white shadow-lg uppercase">ACCESS DENIED</motion.div>}
                      {status === 'decoy' && <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-3 -right-3 bg-orange-600 text-[8px] font-black italic px-3 py-1 rounded-full text-white shadow-lg uppercase">DECOY DETECTED</motion.div>}
                    </AnimatePresence>
                  </div>
                  <button type="submit" className="bg-purple-500 hover:bg-purple-400 text-black font-black uppercase text-xs tracking-[0.2em] px-10 py-4 rounded-xl transition-all active:scale-95 shadow-[0_10px_30px_rgba(168,85,247,0.3)]">[ SUBMIT FLAG ]</button>
               </form>
               <div className="mt-6 flex flex-wrap gap-2">
                  {attempts.map((att, idx) => (
                    <span key={idx} className="text-[9px] font-bold text-gray-700 italic border border-gray-800 px-2 py-1 rounded line-through decoration-red-500/50">{att}</span>
                  ))}
               </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-700">
           <div className="flex items-center gap-4 text-[9px] font-black tracking-widest">
              <span className="text-purple-500/50">{" > "} SYSTEM: OPERATIONAL</span>
              <span className="text-gray-800">//</span>
              <span>MODE: ACAK</span>
              <span className="text-gray-800">//</span>
              <span>LEVEL: 2</span>
           </div>
           <div className="text-[8px] font-bold uppercase tracking-tighter italic opacity-50">-- CORE_GRID_ESTABLISHED // TARGET_DECODED --</div>
        </div>

      </div>
      <AnimatePresence>
         {showExitModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex justify-center items-center p-4">
               <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-gray-900 border border-purple-500/30 rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.1)]">
                  <div className="absolute top-0 left-0 w-full h-1 bg-purple-500" />
                  <ShieldAlert className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-xl font-black text-white tracking-widest uppercase mb-2">ABORT MISSION?</h3>
                  <p className="text-sm text-gray-400 mb-8 font-sans">Anda yakin ingin keluar? Waktu akan terus berjalan dan progress misi Anda saat ini akan di-reset.</p>
                  <div className="flex gap-4">
                    <button onClick={() => setShowExitModal(false)} className="flex-1 py-3 bg-gray-800 text-white font-bold rounded-xl border border-white/5 hover:bg-gray-700 transition-colors">BATAL</button>
                    <button onClick={handleExit} className="flex-1 py-3 bg-red-500 text-white font-black uppercase tracking-widest rounded-xl hover:bg-red-400 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.3)]">KELUAR</button>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>

    </div>
  );
};

export default Level2;
