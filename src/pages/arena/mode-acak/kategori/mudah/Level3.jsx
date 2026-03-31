import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Radio,
  Zap,
  ChevronLeft,
  Terminal,
  Cpu,
  Copy,
  Check,
  ShieldAlert,
  Activity
} from 'lucide-react';

const MudahLevel3 = () => {
  const navigate = useNavigate();
  
  // Timer: Count-up
  const [hasUsedHint, setHasUsedHint] = useState(() => {
    return localStorage.getItem('ctf_mudah_level3_hint_used') === 'true';
  });
  const [elapsed, setElapsed] = useState(0);

  // Calculate dynamic stars
  const timeLimit = 600; // 10 minutes
  const isTimeFailed = elapsed > timeLimit;
  const hintPenalty = hasUsedHint ? 1 : 0;
  const timePenalty = isTimeFailed ? 1 : 0;
  const stars = Math.max(1, 3 - hintPenalty - timePenalty);

  const [flag, setFlag] = useState('');
  const [status, setStatus] = useState('active'); // 'active', 'wrong', 'decoy', 'complete'
  const [attempts, setAttempts] = useState([]);
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
        setElapsed(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status]);

  const handleHintClick = () => {
    setHasUsedHint(true);
    localStorage.setItem('ctf_mudah_level3_hint_used', 'true');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(PAYLOAD);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (flag.trim() === CORRECT_FLAG) {
      const timeTakenStr = formatTime(elapsed);
      setCompletionTime(timeTakenStr);
      setStatus('complete');
      
      const savedStats = localStorage.getItem('ctf_mode_acak_stats');
      const stats = savedStats ? JSON.parse(savedStats) : {};
      const currentBestStars = stats['mudah-3']?.stars || 0;
      const currentBestTimeSec = (() => { 
        const t = stats['mudah-3']?.bestTime; 
        if (!t) return 999999;
        const parts = String(t).split(':').map(Number);
        return parts.length === 2 ? parts[0] * 60 + parts[1] : (Number(parts[0]) || 999999);
      })();
      const isBetter = stars > currentBestStars || (stars === currentBestStars && elapsed < currentBestTimeSec);
      if (isBetter) {
         stats['mudah-3'] = { stars: stars, bestTime: timeTakenStr, conditions: [true, !hasUsedHint, !isTimeFailed] };
         localStorage.setItem('ctf_mode_acak_stats', JSON.stringify(stats));
      }
      localStorage.removeItem('ctf_mudah_level3_time');
      localStorage.removeItem('ctf_mudah_level3_stars');
      localStorage.removeItem('ctf_mudah_level3_hint_used');
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

  
  const unlockHintStage = (stage) => {
    if (stage <= hintStage) return;
    setHintStage(stage);
    localStorage.setItem('ctf_mudah_level3_hint_stage', stage.toString());
  };

  const handleExit = () => {
    localStorage.removeItem('ctf_mudah_level3_time');
    localStorage.removeItem('ctf_mudah_level3_stars');
    localStorage.removeItem('ctf_mudah_level3_hint_used');
    navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 'mudah-3' } });
  };

  if (status === 'complete') {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 font-mono text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_70%)]" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="z-10 bg-gray-900 border-4 border-cyan-500 p-12 rounded-3xl text-center max-w-xl shadow-[0_0_50px_rgba(6,182,212,0.3)]">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-cyan-500/30">
            <Zap className="w-12 h-12 text-cyan-400 fill-cyan-400 drop-shadow-[0_0_10px_#06b6d4]" />
          </motion.div>
          <h1 className="text-5xl font-black italic tracking-tighter mb-2 text-white uppercase leading-none">MISSION COMPLETE</h1>
          <p className="text-cyan-500 font-bold tracking-[0.3em] mb-4 text-[10px]">SECTOR: CRYPTO_CORE // SIGNAL_DECODED</p>
          <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-2xl py-6 px-10 mb-8 inline-block">
             <div className="text-[10px] font-black text-gray-500 tracking-[0.4em] uppercase mb-4">Misi terselesaikan dalam</div>
             <div className="text-4xl font-black text-white italic tracking-tighter mb-6">{completionTime}</div>
             <div className="flex justify-center gap-4">
               {[1, 2, 3].map(s => (
                 <Zap key={s} className={`w-10 h-10 transition-all duration-500 ${s <= stars ? 'text-cyan-400 fill-cyan-400 drop-shadow-[0_0_15px_#06b6d4]' : 'text-gray-800 fill-transparent'}`} />
               ))}
             </div>
          </div>
          <button onClick={() => navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 'mudah-3' } })} className="w-full bg-cyan-500 text-black font-black py-4 rounded-xl hover:bg-cyan-400 transition-all text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(6,182,212,0.2)]">KEMBALI KE MAP TAKTIS</button>
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
              className="mt-1 p-2 bg-gray-900 border border-cyan-500/30 rounded-xl hover:bg-cyan-500/20 text-gray-400 hover:text-cyan-400 transition-all group"
              title="Abort Mission"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_#06b6d4]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400/80">TARGET: SECTOR_CRYPTO</span>
              </div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none shadow-cyan-500/20">
                LEVEL 3: <span className="text-cyan-400 drop-shadow-[0_0_10px_#22d3ee]">SINYAL KRIPTO</span>
              </h1>
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
             <div className="text-[8px] font-black text-gray-700 tracking-[0.5em] uppercase mb-2">RANK_EFFICIENCY</div>
             <div className="flex gap-3">
                {[1, 2, 3].map(s => (
                  <Zap key={s} className={`w-6 h-6 transition-all duration-700 ${s <= stars ? 'text-cyan-400 fill-cyan-400 drop-shadow-[0_0_10px_#06b6d4]' : 'text-white/10 fill-transparent opacity-20'}`} />
                ))}
             </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] font-black text-cyan-500/30 tracking-[0.3em] uppercase mb-1">ELAPSED_TIME</div>
            <div className={`text-4xl font-black italic tracking-tighter transition-colors duration-500 text-cyan-500`}>
              {formatTime(elapsed)}
            </div>
          </div>
        </div>

        {/* LAYOUT */}
        <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
          
          {/* LEFT SIDE: BRIEFING */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <div className="bg-gray-950/50 border border-cyan-500/30 rounded-2xl p-6 flex-1 flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 shadow-[0_0_15px_#06b6d4]" />
              <div className="flex items-center gap-3 mb-6">
                <Radio className="w-5 h-5 text-cyan-400" />
                <h2 className="text-sm font-black text-cyan-200 uppercase tracking-widest">BRIEFING MISI</h2>
              </div>
              <div className="text-xs leading-relaxed text-gray-400 overflow-y-auto pr-2 custom-scrollbar space-y-4 italic">
                <p>{" > "} Target: Transmisi Sinyal Sindikat 'Cyber'.</p>
                <p>{" > "} Intelligence: Komunikasi berhasil disadap dari jalur frekuensi gelap. Pesan disandikan menggunakan teknik encoding 64-bit standar.</p>
                <p>{" > "} Tugas lo: Dekode pesan rahasia di layar terminal untuk mendapatkan Flag.</p>
                <div className="p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-lg">
                   <p className="text-cyan-400 font-black tracking-tight uppercase mb-1 flex items-center gap-2">
                     <ShieldAlert className="w-3 h-3" /> DATA_ENCODED
                   </p>
                   <p className="text-[9px] text-gray-600 uppercase">Terdeteksi karakter padding khas pada payload yang ter-intercept.</p>
                </div>
              </div>
            </div>

            <div className="mt-auto space-y-3">
               <button 
                  onClick={handleHintClick} 
                  className={`w-full border rounded-xl p-4 flex items-center justify-center gap-3 group transition-all shadow-[0_0_20px_rgba(6,182,212,0.1)] ${hasUsedHint ? 'border-cyan-400 bg-cyan-950/40 text-cyan-400' : 'border-cyan-500/40 bg-cyan-950/20 hover:bg-cyan-950/30 text-cyan-200'}`}
               >
                  <Zap className={`w-4 h-4 transition-colors ${hasUsedHint ? 'fill-cyan-400' : ''}`} />
                  <span className="text-xs font-black uppercase tracking-widest">{hasUsedHint ? 'HINT ACTIVE' : '💡 MINTA JAWABAN (-1 BINTANG)'}</span>
               </button>
               <AnimatePresence>
                  {hasUsedHint && (
                     <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-gray-900/50 border border-white/5 rounded-xl p-4 text-[10px] text-gray-400 italic leading-tight uppercase font-black tracking-widest text-center mt-2 overflow-hidden">
                        <span className="text-cyan-400">ANSWER:</span> {CORRECT_FLAG}
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>
          </div>

          {/* CENTER: WORKSPACE */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            <div className="flex-1 bg-black border border-cyan-500/20 rounded-2xl flex flex-col overflow-hidden relative group shadow-2xl">
              
              <div className="h-10 bg-gray-900/80 border-b border-white/5 flex items-center px-4 gap-4 backdrop-blur-md">
                 <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-cyan-500/50" />
                    <div className="w-3 h-3 rounded-full bg-cyan-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                 </div>
                 <div className="flex items-center gap-2">
                    <Terminal className="w-3 h-3 text-cyan-500" />
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
                      whileHover={{ scale: 1.02, borderColor: '#06b6d4', boxShadow: '0 0 30px rgba(6,182,212,0.2)' }}
                      className="bg-gray-900/50 border-2 border-cyan-500/30 p-8 rounded-2xl relative group/payload transition-all duration-500"
                    >
                       <div className="text-[8px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-4 text-center">Interception_Result: BASE64_ENCODED</div>
                       <div className="flex items-center gap-6">
                          <span className="text-xl md:text-2xl font-black text-white tracking-widest select-all">
                             {PAYLOAD}
                          </span>
                          <button 
                            type="button"
                            onClick={handleCopy}
                            className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl hover:bg-cyan-500/20 transition-all text-cyan-400 group-active:scale-95"
                          >
                             {isCopied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                             {isCopied && <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-green-500 text-black text-[10px] font-black px-3 py-1 rounded-md">Copied!</span>}
                          </button>
                       </div>
                    </motion.div>
                    
                    <div className="mt-8 flex items-center gap-6 text-[10px] font-black text-gray-700 tracking-widest uppercase">
                       <div className="flex items-center gap-2">
                          <Activity className="w-3 h-3 text-cyan-500 animate-pulse" /> BITRATE: 12.4 KBPS
                       </div>
                       <div className="flex items-center gap-2">
                          <Cpu className="w-3 h-3 text-cyan-500" /> SOURCE: SHADOW_RELAY_B
                       </div>
                    </div>
                 </div>
              </div>
              
              <div className="absolute inset-0 bg-cyan-500/5 opacity-10 pointer-events-none" />
            </div>

            {/* SUBMISSION */}
            <div className="bg-gray-900/40 border border-cyan-500/30 rounded-2xl p-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10"><Terminal className="w-12 h-12 text-cyan-400" /></div>
               <form onSubmit={handleSubmit} className="relative z-10 flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <input type="text" value={flag} onChange={(e) => setFlag(e.target.value)} placeholder="Masukkan flag di sini (CTF_{...})" className={`w-full bg-black/60 border-2 rounded-xl py-4 px-6 text-sm tracking-widest text-white placeholder:text-gray-700 focus:outline-none transition-all ${status === 'wrong' || status === 'decoy' ? 'border-cyan-500 shadow-[0_0_15px_#06b6d4]' : 'border-cyan-500/40 focus:border-cyan-500 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)]'}`} />
                    <AnimatePresence>
                      {status === 'wrong' && <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-3 -right-3 bg-cyan-600 text-[8px] font-black italic px-3 py-1 rounded-full text-white shadow-lg uppercase">ACCESS DENIED</motion.div>}
                      {status === 'decoy' && <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-3 -right-3 bg-orange-600 text-[8px] font-black italic px-3 py-1 rounded-full text-white shadow-lg uppercase">DECOY DETECTED</motion.div>}
                    </AnimatePresence>
                  </div>
                  <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase text-xs tracking-[0.2em] px-10 py-4 rounded-xl transition-all active:scale-95 shadow-[0_10px_30px_rgba(6,182,212,0.3)]">[ SUBMIT FLAG ]</button>
               </form>
               <div className="mt-6 flex flex-wrap gap-2">
                  {attempts.map((att, idx) => (
                    <span key={idx} className="text-[9px] font-bold text-gray-700 italic border border-gray-800 px-2 py-1 rounded line-through decoration-cyan-500/50">{att}</span>
                  ))}
               </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-700">
           <div className="flex items-center gap-4 text-[9px] font-black tracking-widest">
              <span className="text-cyan-500/50">{" > "} SYSTEM: OPERATIONAL</span>
              <span className="text-gray-800">//</span>
              <span>MODE: ACAK</span>
              <span className="text-gray-800">//</span>
              <span>LEVEL: 3</span>
           </div>
           <div className="text-[8px] font-bold uppercase tracking-tighter italic opacity-50">-- CORE_GRID_ESTABLISHED // TARGET_DECODED --</div>
        </div>

      </div>
      <AnimatePresence>
         {showExitModal && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowExitModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
               <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="relative bg-gray-900 border border-cyan-500/30 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
                  <ShieldAlert className="w-12 h-12 text-cyan-600 mx-auto mb-4" />
                  <h3 className="text-xl font-black text-white italic tracking-tighter uppercase mb-2">ABORT MISSION?</h3>
                  <p className="text-xs text-gray-500 uppercase italic mb-8 leading-relaxed">INTERSEPSI YANG SEDANG BERJALAN AKAN DIPUTUSKAN DAN PROGRESS LOG AKAN DI-RESET.</p>
                  <div className="flex gap-4">
                     <button onClick={handleExit} className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-black py-4 rounded-xl text-xs tracking-widest uppercase transition-all">YES, ABORT</button>
                     <button onClick={() => setShowExitModal(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-black py-4 rounded-xl border border-white/5 text-xs tracking-widest uppercase transition-all">CANCEL</button>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>

    </div>
  );
};

export default MudahLevel3;
