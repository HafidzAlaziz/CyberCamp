import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldAlert,
  Clock,
  Zap,
  ChevronLeft,
  X,
  Play,
  Terminal,
  Cpu,
  Search,
  HardDrive,
  Activity,
  Database,
  Lock
} from 'lucide-react';

const Level3 = () => {
  const navigate = useNavigate();
  
  // Timer Persistence Logic (420s / 7 Minutes)
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem('ctf_level3_time');
    return saved ? parseInt(saved) : 420;
  });

  const [stars, setStars] = useState(() => {
    const saved = localStorage.getItem('ctf_level3_stars');
    return saved ? parseInt(saved) : 3;
  });
  const [hasUsedHint, setHasUsedHint] = useState(() => {
    return localStorage.getItem('ctf_level3_hint_used') === 'true';
  });
  const [hasOvertimePenalty, setHasOvertimePenalty] = useState(() => {
    return localStorage.getItem('ctf_level3_overtime') === 'true';
  });

  const [flag, setFlag] = useState('');
  const [status, setStatus] = useState('active'); // 'active', 'wrong', 'decoy', 'complete'
  const [attempts, setAttempts] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [completionTime, setCompletionTime] = useState(null);
  const [showExitModal, setShowExitModal] = useState(false);

  // SECURITY: Obfuscation & Decoys
  const [_0x_f_val] = useState(() => atob("Q1RGe0gxZGQzbl8xbl9QbDRxbl9TMWdodH0=")); // CTF{H1dd3n_1n_Pl41n_S1ght}
  const [decoys] = useState(["CTF{F4K3_FL4G_D0_N0T_SUBM1T}", "CTF{M3M0RY_C0RRUPT3D}"]);

  // Generate Hex Dump Data
  const hexRows = useMemo(() => {
    const rows = [];
    const hexChars = "0123456789ABCDEF";
    const asciiChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

    for (let i = 0; i < 40; i++) {
      let offset = (i * 16).toString(16).padStart(8, '0').toUpperCase();
      let hex = "";
      let ascii = "";

      // Flag Placement Logic
      if (i === 7) {
        // Decoy at Row 7
        hex = "43 54 46 7B 46 34 4B 33 5F 46 4C 34 47 5F 44 30";
        ascii = decoys[0];
      } else if (i === 32) {
        // Real Flag at Row 32
        hex = "43 54 46 7B 48 31 64 64 33 6E 5F 31 6E 5F 50 6C";
        ascii = _0x_f_val;
      } else {
        // Random Data
        for (let j = 0; j < 16; j++) {
          hex += hexChars[Math.floor(Math.random() * 16)] + hexChars[Math.floor(Math.random() * 16)] + (j === 15 ? "" : " ");
          ascii += asciiChars[Math.floor(Math.random() * asciiChars.length)];
        }
      }

      rows.push({ offset, hex, ascii });
    }
    return rows;
  }, [_0x_f_val, decoys]);

  useEffect(() => {
    // ANTI-CHEAT Console Warning
    console.log("%c[FORENSICS SYSTEM] WARNING: UNAUTHORIZED MEMORY DUMP ANALYSIS DETECTED.", "color: orange; font-weight: bold; font-size: 16px; background: black; padding: 10px; border: 2px solid orange;");
    
    if (status !== 'complete') {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          const nextValue = prev - 1;
          localStorage.setItem('ctf_level3_time', nextValue.toString());
          if (nextValue < 0 && !hasOvertimePenalty) {
            setHasOvertimePenalty(true);
            setStars(s => Math.max(0, s - 1));
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
        localStorage.setItem('ctf_level3_hint_used', 'true');
        setStars(s => {
          const newStars = Math.max(0, s - 1);
          localStorage.setItem('ctf_level3_stars', newStars.toString());
          return newStars;
        });
      }
    } else {
      setShowHint(false);
    }
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
    const inputFlag = flag.trim();

    if (inputFlag === _0x_f_val) {
      const timeTaken = 420 - timeLeft;
      const timeTakenStr = formatTime(timeTaken);
      setCompletionTime(timeTakenStr);
      setStatus('complete');
      
      const savedStats = localStorage.getItem('ctf_mode_acak_stats');
      const stats = savedStats ? JSON.parse(savedStats) : {};
      const currentBestStars = stats[3]?.stars || 0;
      if (stars >= currentBestStars) {
         stats[3] = { stars: stars, bestTime: timeTakenStr };
         localStorage.setItem('ctf_mode_acak_stats', JSON.stringify(stats));
      }
      localStorage.removeItem('ctf_level3_time');
      localStorage.removeItem('ctf_level3_stars');
      localStorage.removeItem('ctf_level3_hint_used');
      localStorage.removeItem('ctf_level3_overtime');
    } else if (decoys.includes(inputFlag)) {
      setStatus('decoy');
      setAttempts(prev => [...prev, inputFlag]);
      setTimeout(() => setStatus('active'), 2000);
    } else if (inputFlag !== "") {
      setStatus('wrong');
      setAttempts(prev => [...prev, inputFlag]);
      setTimeout(() => setStatus('active'), 2000);
    }
    setFlag('');
  };

  const handleExit = () => {
    localStorage.removeItem('ctf_level3_time');
    localStorage.removeItem('ctf_level3_stars');
    localStorage.removeItem('ctf_level3_hint_used');
    localStorage.removeItem('ctf_level3_overtime');
    navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 3 } });
  };

  if (status === 'complete') {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 font-mono text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.1)_0%,transparent_70%)]" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="z-10 bg-gray-900 border-4 border-orange-500 p-12 rounded-3xl text-center max-w-xl shadow-[0_0_50px_rgba(249,115,22,0.3)]">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-24 h-24 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-orange-500/30">
            <Zap className="w-12 h-12 text-orange-400 fill-orange-400 drop-shadow-[0_0_10px_#f97316]" />
          </motion.div>
          <h1 className="text-5xl font-black italic tracking-tighter mb-2 text-white uppercase leading-none">MISSION COMPLETE</h1>
          <p className="text-orange-500 font-bold tracking-[0.3em] mb-4 text-[10px]">SECTOR: MEMORY_CORE // DATA_EXTRACTED</p>
          <div className="bg-orange-500/5 border border-orange-500/10 rounded-2xl py-6 px-10 mb-8 inline-block">
             <div className="text-[10px] font-black text-gray-500 tracking-[0.4em] uppercase mb-4">Misi terselesaikan dalam</div>
             <div className="text-4xl font-black text-white italic tracking-tighter mb-6">{completionTime}</div>
             <div className="flex justify-center gap-4">
               {[1, 2, 3].map(s => (
                 <Zap key={s} className={`w-10 h-10 transition-all duration-500 ${s <= stars ? 'text-orange-400 fill-orange-400 drop-shadow-[0_0_15px_#f97316]' : 'text-gray-800 fill-transparent'}`} />
               ))}
             </div>
          </div>
          <button onClick={() => navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 3 } })} className="w-full bg-orange-500 text-black font-black py-4 rounded-xl hover:bg-orange-400 transition-all text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(249,115,22,0.2)]">KEMBALI KE MAP TAKTIS</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-4 md:p-8 flex flex-col overflow-hidden relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #f9731610 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col relative z-10">
        
        {/* HEADER AREA */}
        <div className="flex justify-between items-start mb-8 relative">
          <div className="flex gap-4 items-start z-10">
            <button 
              onClick={() => setShowExitModal(true)} 
              className="mt-1 p-2 bg-gray-900 border border-orange-500/30 rounded-xl hover:bg-orange-500/20 text-gray-400 hover:text-orange-400 transition-all group"
              title="Abort Mission"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-[0_0_8px_#f97316]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-400/80">TARGET: SECTOR_MEMORY</span>
              </div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none shadow-orange-500/20">
                LEVEL 3: <span className="text-orange-500 drop-shadow-[0_0_10px_#f97316]">DIGITAL FORENSICS</span>
              </h1>
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
             <div className="text-[8px] font-black text-gray-700 tracking-[0.5em] uppercase mb-2">RANK_EFFICIENCY</div>
             <div className="flex gap-3">
                {[1, 2, 3].map(s => (
                  <Zap key={s} className={`w-6 h-6 transition-all duration-700 ${s <= stars ? 'text-orange-400 fill-orange-400 drop-shadow-[0_0_10px_#f97316]' : 'text-white/10 fill-transparent opacity-20'}`} />
                ))}
             </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] font-black text-red-500/80 tracking-[0.3em] uppercase mb-1">REMAINING_TIME</div>
            <div className={`text-4xl font-black italic tracking-tighter transition-colors duration-500 ${timeLeft < 0 ? 'text-red-500' : timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-orange-600'}`}>
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* LAYOUT */}
        <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
          
          {/* LEFT SIDE: BRIEFING */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <div className="bg-gray-950/50 border border-orange-500/30 rounded-2xl p-6 flex-1 flex flex-col relative overflow-hidden group shadow-[inset_0_0_20px_rgba(249,115,22,0.05)]">
              <div className="absolute top-0 left-0 w-1 h-full bg-orange-500 shadow-[0_0_15px_#f97316]" />
              <div className="flex items-center gap-3 mb-6">
                <HardDrive className="w-5 h-5 text-orange-400" />
                <h2 className="text-sm font-black text-orange-200 uppercase tracking-widest">BRIEFING MISI</h2>
              </div>
              <div className="text-xs leading-relaxed text-gray-400 overflow-y-auto pr-2 custom-scrollbar space-y-4 italic">
                <p>{" > "} Target: Ekstraksi Memori Server (Dump).</p>
                <p>{" > "} Intelligence: Kita berhasil mengunduh fragmen memori dari server Shadow Syndicate. File ini berupa raw hex dump.</p>
                <p>{" > "} Tugas lo: Analisis anomali pada kolom ASCII di tumpukan memori tersebut!</p>
                <div className="p-3 bg-orange-950/20 border border-orange-500/20 rounded-lg">
                   <p className="text-orange-400 font-black tracking-tight uppercase mb-1 flex items-center gap-2">
                     <Search className="w-3 h-3" /> ANOMALY_DETECTOR
                   </p>
                   <p className="text-[9px] text-gray-600 uppercase italic">Analis yakin ada Flag yang disembunyikan di dalam struktur data ini.</p>
                </div>
              </div>
            </div>

            <button onClick={handleHintClick} className={`bg-orange-900/20 border rounded-xl p-4 flex items-center justify-center gap-3 group transition-all shadow-[0_0_20px_rgba(249,115,22,0.1)] ${showHint ? 'border-orange-400 bg-orange-900/40' : 'border-orange-500/40 hover:bg-orange-900/30'}`}>
              <Zap className={`w-4 h-4 transition-colors ${showHint ? 'text-orange-400 fill-orange-400' : 'text-orange-400'}`} />
              <span className="text-xs font-black text-orange-200 uppercase tracking-widest">{showHint ? 'HINT ACTIVE' : '💡 MINTA HINT BOS'}</span>
            </button>
            
            <AnimatePresence>
              {showHint && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-gray-900/50 border border-white/5 rounded-xl p-4 text-[10px] text-gray-500 italic uppercase leading-tight">
                  Gunakan fitur pencarian browser (Ctrl+F) dan ketik 'CTF' untuk mencari teks yang dapat dibaca di kolom ASCII sebelah kanan.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CENTER: WORKSPACE (HEX EDITOR) */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            <div className="flex-1 bg-black border border-orange-500/20 rounded-2xl flex flex-col overflow-hidden relative group shadow-2xl">
              
              <div className="h-10 bg-gray-900/80 border-b border-white/5 flex items-center px-4 gap-4 backdrop-blur-md">
                 <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                 </div>
                 <div className="flex items-center gap-2">
                    <Cpu className="w-3 h-3 text-orange-500" />
                    <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Memory_Explorer.v3.1 // RAW_DUMP</span>
                 </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-0 bg-gray-950 font-mono text-[10px] md:text-xs">
                 <div className="sticky top-0 bg-gray-900 border-b border-orange-500/20 flex px-4 py-2 font-black text-orange-500/60 tracking-widest uppercase z-20">
                    <div className="w-24">OFFSET</div>
                    <div className="flex-1 text-center">HEX CODES</div>
                    <div className="w-32 md:w-48 text-right">ASCII</div>
                 </div>
                 
                 <div className="divide-y divide-white/5">
                    {hexRows.map((row, idx) => (
                      <div key={idx} className="flex px-4 py-1.5 hover:bg-orange-500/5 group/row transition-colors">
                        <div className="w-24 text-orange-500/40 font-bold group-hover/row:text-orange-500 transition-colors">0x{row.offset}</div>
                        <div className="flex-1 text-gray-600 px-4 tracking-widest break-all group-hover/row:text-gray-400">
                           {row.hex}
                        </div>
                        <div className="w-32 md:w-48 text-gray-500 group-hover/row:text-orange-300 italic truncate text-right">
                           {row.ascii}
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
              
              <div className="h-8 bg-gray-900/50 border-t border-white/5 flex items-center px-4 gap-6">
                 <div className="flex items-center gap-2 text-[8px] font-black text-gray-600 uppercase tracking-widest">
                    <Activity className="w-2.5 h-2.5 text-orange-500 animate-pulse" /> SCANBAR: 100% COMPLETE
                 </div>
                 <div className="flex items-center gap-2 text-[8px] font-black text-gray-600 uppercase tracking-widest">
                    <Database className="w-2.5 h-2.5 text-orange-500" /> FILE: MEMORY_DUMP_ALPHA_91.RAW
                 </div>
                 <div className="ml-auto text-[8px] font-black text-orange-500/40 uppercase tracking-widest">
                    OFFSET_RANGE: 0x00 - 0x270
                 </div>
              </div>
            </div>

            {/* SUBMISSION */}
            <div className="bg-gray-900/40 border border-orange-500/30 rounded-2xl p-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10"><Terminal className="w-12 h-12 text-orange-400" /></div>
               <form onSubmit={handleSubmit} className="relative z-10 flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <input type="text" value={flag} onChange={(e) => setFlag(e.target.value)} placeholder="MASUKKAN FLAG DI SINI (CTF_{...})" className={`w-full bg-black/60 border-2 rounded-xl py-4 px-6 text-sm font-black tracking-widest text-white placeholder:text-gray-700 focus:outline-none transition-all ${status === 'wrong' || status === 'decoy' ? 'border-red-500 shadow-[0_0_15px_#ef4444]' : 'border-orange-500/40 focus:border-orange-500 focus:shadow-[0_0_20px_rgba(249,115,22,0.2)]'}`} />
                    <AnimatePresence>
                      {status === 'wrong' && <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-3 -right-3 bg-red-600 text-[8px] font-black italic px-3 py-1 rounded-full text-white shadow-lg uppercase">ACCESS DENIED</motion.div>}
                      {status === 'decoy' && <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-3 -right-3 bg-orange-600 text-[8px] font-black italic px-3 py-1 rounded-full text-white shadow-lg uppercase">DECOY DETECTED</motion.div>}
                    </AnimatePresence>
                  </div>
                  <button type="submit" className="bg-orange-500 hover:bg-orange-400 text-black font-black uppercase text-xs tracking-[0.2em] px-10 py-4 rounded-xl transition-all active:scale-95 shadow-[0_10px_30px_rgba(249,115,22,0.3)]">[ SUBMIT FLAG ]</button>
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
              <span className="text-orange-500/50">{" > "} SYSTEM: OPERATIONAL</span>
              <span className="text-gray-800">//</span>
              <span>MODE: ACAK</span>
              <span className="text-gray-800">//</span>
              <span>LEVEL: 3</span>
           </div>
           <div className="text-[8px] font-bold uppercase tracking-tighter italic opacity-50">-- CORE_GRID_ESTABLISHED // MEMORY_DUMP_LOADED --</div>
        </div>

      </div>
      <AnimatePresence>
         {showExitModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex justify-center items-center p-4">
               <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-gray-900 border border-orange-500/30 rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden shadow-[0_0_40px_rgba(249,115,22,0.1)]">
                  <div className="absolute top-0 left-0 w-full h-1 bg-orange-500" />
                  <ShieldAlert className="w-12 h-12 text-orange-500 mx-auto mb-4" />
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

export default Level3;
