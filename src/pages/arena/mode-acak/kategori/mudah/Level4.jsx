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
  Lock,
  Check
} from 'lucide-react';

const MudahLevel4 = () => {
  const navigate = useNavigate();
  
  // Timer: Count-up
  const [elapsed, setElapsed] = useState(0);

  const [hasUsedHint, setHasUsedHint] = useState(() => localStorage.getItem('ctf_mudah_level4_hint_used') === 'true');
  
  // Calculate dynamic stars
  const timeLimit = 600; // 10 minutes
  const isTimeFailed = elapsed > timeLimit;
  const timePenalty = isTimeFailed ? 1 : 0;
  const hintPenalty = hasUsedHint ? 1 : 0;
  const stars = Math.max(1, 3 - hintPenalty - timePenalty);
  

  const [flag, setFlag] = useState('');
  const [status, setStatus] = useState('active'); // 'active', 'wrong', 'decoy', 'complete'
  const [attempts, setAttempts] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [showHintModal, setShowHintModal] = useState(false);
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
    if (status !== 'complete') {
      const timer = setInterval(() => {
        setElapsed(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status]);

  const handleHintClick = () => {
    if (!showHint) {
      setShowHint(true);
      if (!hintStage > 0) {
        
        localStorage.setItem('ctf_mudah_level4_hint_used', 'true');
      }
    } else {
      setShowHint(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputFlag = flag.trim();

    if (inputFlag === _0x_f_val) {
      const timeTakenStr = formatTime(elapsed);
      setCompletionTime(timeTakenStr);
      setStatus('complete');
      
      const savedStats = localStorage.getItem('ctf_mode_acak_stats');
      const stats = savedStats ? JSON.parse(savedStats) : {};
      const currentBestStars = stats['mudah-4']?.stars || 0;
      const currentBestTimeSec = (() => { 
        const t = stats['mudah-4']?.bestTime; 
        if (!t) return 999999;
        const parts = String(t).split(':').map(Number);
        return parts.length === 2 ? parts[0] * 60 + parts[1] : (Number(parts[0]) || 999999);
      })();
      const isBetter = stars > currentBestStars || (stars === currentBestStars && elapsed < currentBestTimeSec);
      if (isBetter) {
         stats['mudah-4'] = { stars: stars, bestTime: timeTakenStr, conditions: [true, !hasUsedHint, !isTimeFailed] };
         localStorage.setItem('ctf_mode_acak_stats', JSON.stringify(stats));
      }
      localStorage.removeItem('ctf_mudah_level4_time');
      localStorage.removeItem('ctf_mudah_level4_stars');
      localStorage.removeItem('ctf_mudah_level4_hint_used');
      localStorage.removeItem('ctf_mudah_level4_overtime');
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
    localStorage.removeItem('ctf_mudah_level4_time');
    localStorage.removeItem('ctf_mudah_level4_stars');
    localStorage.removeItem('ctf_mudah_level4_hint_used');
    localStorage.removeItem('ctf_mudah_level4_overtime');
    navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 'mudah-4' } });
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
          <p className="text-cyan-500 font-bold tracking-[0.3em] mb-4 text-[10px]">SECTOR: MEMORY_CORE // DATA_EXTRACTED</p>
          <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-2xl py-6 px-10 mb-8 inline-block">
             <div className="text-[10px] font-black text-gray-500 tracking-[0.4em] uppercase mb-4">Misi terselesaikan dalam</div>
             <div className="text-4xl font-black text-white italic tracking-tighter mb-6">{completionTime}</div>
             <div className="flex justify-center gap-4">
               {[1, 2, 3].map(s => (
                 <Zap key={s} className={`w-10 h-10 transition-all duration-500 ${s <= stars ? 'text-cyan-400 fill-cyan-400 drop-shadow-[0_0_15px_#06b6d4]' : 'text-gray-800 fill-transparent'}`} />
               ))}
             </div>
          </div>
          <button onClick={() => navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 'mudah-4' } })} className="w-full bg-cyan-500 text-black font-black py-4 rounded-xl hover:bg-cyan-400 transition-all text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(6,182,212,0.2)]">KEMBALI KE MAP TAKTIS</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-4 md:p-8 flex flex-col overflow-hidden relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #06b6d410 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
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
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400/80">TARGET: SECTOR_MEMORY</span>
              </div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none shadow-cyan-500/20">
                LEVEL 4: <span className="text-cyan-500 drop-shadow-[0_0_10px_#06b6d4]">DIGITAL FORENSICS</span>
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
            <div className={`text-4xl font-black italic tracking-tighter transition-colors duration-500 text-cyan-600`}>
              {formatTime(elapsed)}
            </div>
          </div>
        </div>

        {/* LAYOUT */}
        <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
          
          {/* LEFT SIDE: BRIEFING */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <div className="bg-gray-950/50 border border-cyan-500/30 rounded-2xl p-6 flex-1 flex flex-col relative overflow-hidden group shadow-[inset_0_0_20px_rgba(6,182,212,0.05)]">
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 shadow-[0_0_15px_#06b6d4]" />
              <div className="flex items-center gap-3 mb-6">
                <HardDrive className="w-5 h-5 text-cyan-400" />
                <h2 className="text-sm font-black text-cyan-200 uppercase tracking-widest">BRIEFING MISI</h2>
              </div>
              <div className="text-xs leading-relaxed text-gray-400 overflow-y-auto pr-2 custom-scrollbar space-y-4 italic">
                <p>{" > "} Target: Ekstraksi Memori Server (Dump).</p>
                <p>{" > "} Intelligence: Kita berhasil mengunduh fragmen memori dari server Shadow Syndicate. File ini berupa raw hex dump.</p>
                <p>{" > "} Tugas lo: Analisis anomali pada kolom ASCII di tumpukan memori tersebut!</p>
                <div className="p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-lg">
                   <p className="text-cyan-400 font-black tracking-tight uppercase mb-1 flex items-center gap-2">
                     <Search className="w-3 h-3" /> ANOMALY_DETECTOR
                   </p>
                   <p className="text-[9px] text-gray-600 uppercase italic">Analis yakin ada Flag yang disembunyikan di dalam struktur data ini.</p>
                </div>
              </div>
            </div>

            <div className="mt-auto space-y-3">
                   <button onClick={() => setShowHintModal(true)} className={`bg-cyan-900/20 border rounded-xl p-4 flex items-center justify-center gap-3 group transition-all shadow-[0_0_20px_rgba(6,182,212,0.1)] ${hasUsedHint ? 'border-cyan-400 bg-cyan-900/40' : 'border-cyan-500/40 hover:bg-cyan-900/30'}`}>
              <Zap className={`w-4 h-4 transition-colors ${hasUsedHint ? 'text-cyan-400 fill-cyan-400' : 'text-cyan-400'}`} />
              <span className="text-xs font-black text-cyan-200 uppercase tracking-widest">{hasUsedHint ? "HINT ACTIVE (1/1)" : "💡 MINTA HINT BOS"}</span>
            </button>
                 </div>
            
            <AnimatePresence>
              {showHint && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-gray-900/50 border border-white/5 rounded-xl p-4 text-[10px] text-gray-500 italic uppercase leading-tight">
                  <span dangerouslySetInnerHTML={{ __html: `<span className="text-cyan-300 font-black block mb-2">💡 Apa itu Hex Dump?</span><span className="text-gray-400 block normal-case not-italic">File raw memory menyimpan data dalam format biner yang kita lihat sebagai Hexadecimal. Fokus pada kolom ASCII (teks di sebelah kanan) — teliti baris demi baris, Flag seringkali terlihat jelas di sana jika tidak dienkripsi. Cari pola <span className="text-cyan-300 font-mono">CTF{...}</span>.</span>` }} /></motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CENTER: WORKSPACE (HEX EDITOR) */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            <div className="flex-1 bg-black border border-cyan-500/20 rounded-2xl flex flex-col overflow-hidden relative group shadow-2xl">
              
              <div className="h-10 bg-gray-900/80 border-b border-white/5 flex items-center px-4 gap-4 backdrop-blur-md">
                 <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-cyan-500/50" />
                    <div className="w-3 h-3 rounded-full bg-cyan-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                 </div>
                 <div className="flex items-center gap-2">
                    <Cpu className="w-3 h-3 text-cyan-500" />
                    <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Memory_Explorer.v3.1 // RAW_DUMP</span>
                 </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-0 bg-gray-950 font-mono text-[10px] md:text-xs">
                 <div className="sticky top-0 bg-gray-900 border-b border-cyan-500/20 flex px-4 py-2 font-black text-cyan-500/60 tracking-widest uppercase z-20">
                    <div className="w-24">OFFSET</div>
                    <div className="flex-1 text-center">HEX CODES</div>
                    <div className="w-32 md:w-48 text-right">ASCII</div>
                 </div>
                 
                 <div className="divide-y divide-white/5">
                    {hexRows.map((row, idx) => (
                      <div key={idx} className="flex px-4 py-1.5 hover:bg-cyan-500/5 group/row transition-colors">
                        <div className="w-24 text-cyan-500/40 font-bold group-hover/row:text-cyan-500 transition-colors">0x{row.offset}</div>
                        <div className="flex-1 text-gray-600 px-4 tracking-widest break-all group-hover/row:text-gray-400">
                           {row.hex}
                        </div>
                        <div className="w-32 md:w-48 text-gray-500 group-hover/row:text-cyan-300 italic truncate text-right">
                           {row.ascii}
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
              
              <div className="h-8 bg-gray-900/50 border-t border-white/5 flex items-center px-4 gap-6">
                 <div className="flex items-center gap-2 text-[8px] font-black text-gray-600 uppercase tracking-widest">
                    <Activity className="w-2.5 h-2.5 text-cyan-500 animate-pulse" /> SCANBAR: 100% COMPLETE
                 </div>
                 <div className="flex items-center gap-2 text-[8px] font-black text-gray-600 uppercase tracking-widest">
                    <Database className="w-2.5 h-2.5 text-cyan-500" /> FILE: MEMORY_DUMP_ALPHA_91.RAW
                 </div>
                 <div className="ml-auto text-[8px] font-black text-cyan-500/40 uppercase tracking-widest">
                    OFFSET_RANGE: 0x00 - 0x270
                 </div>
              </div>
            </div>

            {/* SUBMISSION */}
            <div className="bg-gray-900/40 border border-cyan-500/30 rounded-2xl p-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10"><Terminal className="w-12 h-12 text-cyan-400" /></div>
               <form onSubmit={handleSubmit} className="relative z-10 flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <input type="text" value={flag} onChange={(e) => setFlag(e.target.value)} placeholder="Masukkan flag di sini (CTF_{...})" className={`w-full bg-black/60 border-2 rounded-xl py-4 px-6 text-sm tracking-widest text-white placeholder:text-gray-700 focus:outline-none transition-all ${status === 'wrong' || status === 'decoy' ? 'border-cyan-500 shadow-[0_0_15px_#06b6d4]' : 'border-cyan-500/40 focus:border-cyan-500 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)]'}`} />
                    <AnimatePresence>
                      {status === 'wrong' && <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-3 -right-3 bg-cyan-600 text-[8px] font-black italic px-3 py-1 rounded-full text-white shadow-lg uppercase">ACCESS DENIED</motion.div>}
                      {status === 'decoy' && <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-3 -right-3 bg-cyan-600 text-[8px] font-black italic px-3 py-1 rounded-full text-white shadow-lg uppercase">DECOY DETECTED</motion.div>}
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
              <span>LEVEL: 6</span>
           </div>
           <div className="text-[8px] font-bold uppercase tracking-tighter italic opacity-50">-- CORE_GRID_ESTABLISHED // MEMORY_DUMP_LOADED --</div>
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
      {showHintModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-gray-900 border border-cyan-500/30 p-8 rounded-2xl max-w-md w-full shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10"><Zap className="w-20 h-20 text-cyan-500" /></div>
              <h3 className="text-xl font-black text-cyan-400 italic tracking-tighter mb-2 uppercase">System_Hint // Override</h3>
              <div className="p-4 bg-cyan-950/30 border border-cyan-500/20 rounded-xl mb-6">
                 <p className="text-cyan-200 text-sm leading-relaxed text-left">
                   {hasUsedHint ? "HINT ACTIVE: Perhatikan file yang bisa kamu enumerasi. Direktori tersembunyi biasanya bisa diakses dengan tools seperti Gobuster atau Dirb. Akses /robots.txt atau /backup/ untuk menemukan flag." : "Meminta petunjuk akan mengurangi skor efisiensi (-1 Bintang). Lanjutkan?"}
                 </p>
              </div>
              {!hasUsedHint ? (
                 <div className="flex gap-4">
                    <button onClick={() => { setHasUsedHint(true); localStorage.setItem('ctf_mudah_level4_hint_used', 'true'); setShowHintModal(false); }} className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black font-black py-4 rounded-xl text-xs tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)]">AKSES HINT (-1 ⚡)</button>
                    <button onClick={() => setShowHintModal(false)} className="flex-1 bg-transparent hover:bg-white/5 text-gray-400 hover:text-white font-black py-4 rounded-xl border border-white/10 text-xs tracking-widest uppercase transition-all">BATAL</button>
                 </div>
              ) : (
                 <button onClick={() => setShowHintModal(false)} className="w-full bg-gray-800 hover:bg-gray-700 text-white font-black py-4 rounded-xl text-xs tracking-widest uppercase transition-all">TUTUP</button>
              )}
           </motion.div>
        </div>
      )}
    </AnimatePresence>
    </div>
  );
};

export default MudahLevel4;
