import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  MessageSquare, 
  History,
  Search,
  Lock,
  X,
  Zap,
  Skull,
  Play,
  Check
} from 'lucide-react';

const Level8 = () => {
  const navigate = useNavigate();

  // Timer Persistence Logic
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem('ctf_level8_time');
    return saved ? parseInt(saved) : 900; // 15 minutes
  });

  const [stars, setStars] = useState(() => {
    const saved = localStorage.getItem('ctf_level8_stars');
    return saved ? parseInt(saved) : 3;
  });

  const [hintStage, setHintStage] = useState(() => {
    return parseInt(localStorage.getItem('ctf_level8_hint_stage') || '0');
  });

  const [hasOvertimePenalty, setHasOvertimePenalty] = useState(() => {
    return localStorage.getItem('ctf_level8_overtime') === 'true';
  });

  const [inputText, setInputText] = useState('');
  const [status, setStatus] = useState('active'); // 'active', 'wrong', 'complete'
  const [attempts, setAttempts] = useState([]);
  const [showHintModal, setShowHintModal] = useState(false);
  const [completionTime, setCompletionTime] = useState(null);
  const [showExitModal, setShowExitModal] = useState(false);

  const realFlag = "CTF{SHADOW_GHOST_2024}";

  useEffect(() => {
    if (status !== 'complete') {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          const nextValue = prev - 1;
          localStorage.setItem('ctf_level8_time', nextValue.toString());
          if (nextValue < 0 && !hasOvertimePenalty) {
            setHasOvertimePenalty(true);
            localStorage.setItem('ctf_level8_overtime', 'true');
            setStars(s => {
              const newStars = Math.max(0, s - 1);
              localStorage.setItem('ctf_level8_stars', newStars.toString());
              return newStars;
            });
          }
          return nextValue;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status, hasOvertimePenalty]);

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
      const timeTakenStr = formatTime(900 - timeLeft);
      setCompletionTime(timeTakenStr);
      
      const stats = JSON.parse(localStorage.getItem('ctf_mode_acak_stats')) || {};
      const currentBestStars = stats[8]?.stars || 0;
      if (stars >= currentBestStars) {
         stats[8] = { stars: stars, bestTime: timeTakenStr };
         localStorage.setItem('ctf_mode_acak_stats', JSON.stringify(stats));
      }
      localStorage.removeItem('ctf_level8_time');
      localStorage.removeItem('ctf_level8_stars');
      localStorage.removeItem('ctf_level8_hint_stage');
      localStorage.removeItem('ctf_level8_overtime');
    } else {
      setStatus('wrong');
      setAttempts(prev => [...prev, inputText]);
      setTimeout(() => setStatus('active'), 2000);
    }
    setInputText('');
  };

  const handleExit = () => {
    localStorage.removeItem('ctf_level8_time');
    localStorage.removeItem('ctf_level8_stars');
    localStorage.removeItem('ctf_level8_hint_stage');
    localStorage.removeItem('ctf_level8_overtime');
    navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 8 } });
  };

  const unlockHintStage = (stage) => {
    if (stage <= hintStage) return;
    const penalty = stage === 3 ? 3 : 1;
    setStars(s => {
      const newStars = Math.max(0, s - penalty);
      localStorage.setItem('ctf_level8_stars', newStars.toString());
      return newStars;
    });
    setHintStage(stage);
    localStorage.setItem('ctf_level8_hint_stage', stage.toString());
  };

  if (status === 'complete') {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 font-mono text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.1)_0%,transparent_70%)]" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="z-10 bg-gray-900 border-4 border-rose-500 p-12 rounded-3xl text-center max-w-xl shadow-[0_0_50px_rgba(244,63,94,0.3)]">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-24 h-24 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-rose-500/30">
            <Lock className="w-12 h-12 text-rose-400 drop-shadow-[0_0_10px_#f43f5e]" />
          </motion.div>
          <h1 className="text-5xl font-black italic tracking-tighter mb-2 text-white uppercase leading-none text-rose-500">MISI BERHASIL</h1>
          <p className="text-rose-500 font-bold tracking-[0.3em] mb-4 text-[10px]">SEKTOR: PENGINTAIAN_OSINT // DATA_DIEKSTRAKSI</p>
          <div className="bg-rose-500/5 border border-rose-500/10 rounded-2xl py-6 px-10 mb-8 inline-block">
             <div className="text-[10px] font-black text-gray-500 tracking-[0.4em] uppercase mb-4">Misi terselesaikan dalam</div>
             <div className="text-4xl font-black text-white italic tracking-tighter mb-6">{completionTime}</div>
             <div className="flex justify-center gap-4">
               {[1, 2, 3].map(s => (
                 <Zap key={s} className={`w-10 h-10 transition-all duration-500 ${s <= stars ? 'text-rose-400 fill-rose-400 drop-shadow-[0_0_15px_#f43f5e]' : 'text-gray-800 fill-transparent'}`} />
               ))}
             </div>
          </div>
          <button onClick={handleExit} className="w-full bg-rose-500 text-black font-black py-4 rounded-xl hover:bg-rose-400 transition-all text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(244,63,94,0.2)]">KEMBALI KE MAP TAKTIS</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-4 md:p-8 flex flex-col overflow-hidden relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #f43f5e15 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col relative z-10">
        
        {/* HEADER AREA */}
        <div className="flex justify-between items-start mb-8 relative">
          <div className="flex gap-4 items-start z-10">
            <button 
              onClick={() => setShowExitModal(true)} 
              className="mt-1 p-2 bg-gray-900 border border-rose-500/30 rounded-xl hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 transition-all group"
              title="Abort Mission"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse shadow-[0_0_8px_#f43f5e]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-400/80">TARGET: SEKTOR_PENGINTAIAN</span>
              </div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">
                LEVEL 8: <span className="text-rose-500 drop-shadow-[0_0_10px_#f43f5e]">OSINT RECON</span>
              </h1>
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
             <div className="text-[8px] font-black text-gray-700 tracking-[0.5em] uppercase mb-2">RANK_EFFICIENCY</div>
             <div className="flex gap-3">
                {[1, 2, 3].map(s => (
                  <Zap key={s} className={`w-6 h-6 transition-all duration-700 ${s <= stars ? 'text-rose-400 fill-rose-400 drop-shadow-[0_0_10px_#f43f5e]' : 'text-white/10 fill-transparent opacity-20'}`} />
                ))}
             </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] font-black text-red-500/80 tracking-[0.3em] uppercase mb-1">WAKTU_TERSISA</div>
            <div className={`text-4xl font-black italic tracking-tighter transition-colors duration-500 ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-rose-600'}`}>
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* LAYOUT GRID */}
        <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
          
          {/* LEFT SIDE: BRIEFING & ANALYTICS */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <div className="bg-gray-950/50 border border-rose-500/30 rounded-2xl p-6 flex-1 flex flex-col relative overflow-hidden group shadow-[inset_0_0_20px_rgba(244,63,94,0.05)]">
              <div className="absolute top-0 left-0 w-1 h-full bg-rose-500 shadow-[0_0_15px_#f43f5e]" />
              <div className="flex items-center gap-3 mb-6">
                <Search className="w-5 h-5 text-rose-400" />
                <h2 className="text-sm font-black text-rose-200 uppercase tracking-widest">BRIEFING MISI</h2>
              </div>
              <div className="text-xs leading-relaxed text-gray-400 overflow-y-auto pr-2 custom-scrollbar space-y-4 italic mb-8">
                <p>{" > "} Intelijen telah mencegat pengiriman data terfragmentasi dari server messenger pribadi "The Shadow Syndicate".</p>
                <p>{" > "} Misi Anda melakukan profiling mendalam pada log chat. Temukan kata kunci untuk brankas aman mereka.</p>
                <div className="p-4 bg-rose-950/20 border border-rose-500/20 rounded-xl space-y-2">
                   <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest flex items-center gap-2">
                      <History className="w-3 h-3" /> Metadata_Sistem
                   </p>
                   <div className="space-y-1">
                      <div className="flex justify-between text-[9px] font-bold">
                         <span className="text-gray-500">Tahun_Aktif:</span>
                         <span className="text-rose-400 font-black">2024</span>
                      </div>
                      <div className="flex justify-between text-[9px] font-bold">
                         <span className="text-gray-500">Proyek:</span>
                         <span className="text-gray-300">SHADOW</span>
                      </div>
                   </div>
                   <p className="text-[8px] text-gray-600 uppercase italic mt-4 border-t border-rose-500/10 pt-2">
                      Tugas: Inisial proyek + Tahun lahir pengembang utama (Ghost).
                   </p>
                </div>
              </div>

              {/* HINT BUTTON */}
              <button 
                onClick={() => setShowHintModal(true)} 
                className={`mt-auto bg-rose-900/20 border rounded-xl p-4 flex items-center justify-center gap-3 group transition-all shadow-[0_0_20px_rgba(244,63,94,0.1)] ${hintStage > 0 ? 'border-rose-400 bg-rose-900/40' : 'border-rose-500/40 hover:bg-rose-900/30'}`}
              >
                <Zap className={`w-4 h-4 transition-colors ${hintStage > 0 ? 'text-rose-400 fill-rose-400' : 'text-rose-400'}`} />
                <span className="text-xs font-black text-rose-100 uppercase tracking-widest">
                  {hintStage > 0 ? `PETUNJUK AKTIF (Tahap ${hintStage})` : '💡 MINTA PETUNJUK'}
                </span>
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: MESSENGER UI & FLAG INPUT */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            
            {/* MESSENGER INTERFACE */}
            <div className="flex-1 bg-black/40 border border-rose-500/20 rounded-2xl flex flex-col overflow-hidden shadow-2xl relative">
               <div className="p-4 border-b border-rose-500/20 bg-rose-950/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                     <span className="text-[10px] font-black text-gray-500 tracking-widest uppercase">Shadow_Syndicate_Messenger // Encrypted_Link</span>
                  </div>
                  <div className="flex gap-1">
                     <div className="w-1.5 h-1.5 rounded-full bg-rose-500/40" />
                     <div className="w-1.5 h-1.5 rounded-full bg-rose-500/20" />
                  </div>
               </div>

               <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-black/20">
                  <div className="text-center py-4">
                     <span className="px-4 py-1 bg-white/5 border border-white/5 rounded-full text-[8px] font-black text-gray-500 uppercase tracking-[0.3em]">-- Akhir Log Terenkripsi: 28 Maret 2024 --</span>
                  </div>

                  {/* CHAT LOGS */}
                  <div className="flex flex-col gap-1">
                     <span className="text-[10px] text-rose-500 font-bold uppercase tracking-widest flex items-center gap-2"><div className="w-1 h-1 bg-rose-500 rounded-full" /> ShadowKing [14:02]</span>
                     <p className="bg-white/5 p-3 rounded-2xl rounded-tl-none text-[11px] text-gray-300 border border-white/5 max-w-[80%]">Apakah file proyek <span className="text-white font-bold">"SHADOW_LOG"</span> sudah diamankan?</p>
                  </div>
                  
                  <div className="flex flex-col gap-1 items-end">
                     <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">CyberGhost [14:05]</span>
                     <p className="bg-rose-900/20 p-3 rounded-2xl rounded-tr-none text-[11px] text-rose-100 border border-rose-500/20 max-w-[80%]">Sudah bos. Semua log terenkripsi di server pusat.</p>
                  </div>

                  <div className="flex flex-col gap-1">
                     <span className="text-[10px] text-rose-500 font-bold uppercase tracking-widest flex items-center gap-2"><div className="w-1 h-1 bg-rose-500 rounded-full" /> ShadowKing [14:08]</span>
                     <p className="bg-white/5 p-3 rounded-2xl rounded-tl-none text-[11px] text-gray-300 border border-white/5 max-w-[80%]">Bagus. Ingat, kuncinya adalah inisial proyek dan tahun lahir pengembang utamamu (si Ghost itu lahir <span className="text-white font-bold">2024</span> kan?).</p>
                  </div>

                  <div className="flex flex-col gap-1 items-end">
                     <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">CyberGhost [14:10]</span>
                     <p className="bg-rose-900/20 p-3 rounded-2xl rounded-tr-none text-[11px] text-rose-100 border border-rose-500/20 max-w-[80%] uppercase font-black tracking-widest">Siap Bos. Kode Proyek: SHADOW. User: GHOST. Tahun: 2024.</p>
                  </div>
               </div>
            </div>

            {/* FLAG INPUT terminal style */}
            <div className={`bg-gray-950 border rounded-2xl p-6 relative overflow-hidden transition-all duration-500 ${status === 'wrong' ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]' : 'border-rose-500/30'}`}>
               <div className="text-[10px] font-black text-gray-500 tracking-[0.3em] uppercase mb-4 flex justify-between">
                  <span>TERMINAL_RECON_INPUT</span>
                  {status === 'wrong' && <span className="text-red-500 animate-pulse">FLAG_INVALID</span>}
                  {attempts.length > 0 && <span>PERCOBAAN: {attempts.length}</span>}
               </div>
               
               <form onSubmit={submitFlag} className="flex gap-4">
                  <div className="flex-1 relative">
                     <span className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-500 font-bold">$</span>
                     <input 
                        type="text" 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="MASUKKAN FLAG AKSES (CTF{...})"
                        className={`w-full bg-gray-900 border ${status === 'wrong' ? 'border-red-500/50 text-red-100' : 'border-rose-500/20 text-rose-100 focus:border-rose-400'} rounded-xl py-4 pl-12 pr-4 outline-none font-mono text-sm tracking-wider transition-all`}
                        onKeyDown={(e) => e.key === 'Enter' && submitFlag()}
                     />
                  </div>
                  <button 
                    type="submit"
                    className="bg-rose-600 hover:bg-rose-500 text-white px-8 rounded-xl font-black tracking-widest uppercase transition-all flex items-center gap-2 hover:shadow-[0_0_20px_rgba(244,63,94,0.4)]"
                  >
                    KIRIM <Check className="w-4 h-4" />
                  </button>
               </form>
            </div>
          </div>
        </div>
      </div>

      {/* MODALS */}
      <AnimatePresence>
         {showExitModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex justify-center items-center p-4">
               <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-gray-900 border border-rose-500/30 rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 left-0 w-full h-1 bg-rose-500" />
                  <Skull className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                  <h3 className="text-xl font-black text-white tracking-widest uppercase mb-2">BATALKAN MISI?</h3>
                  <p className="text-sm text-gray-400 mb-8">Progress saat ini akan hilang dan di-reset dari awal.</p>
                  <div className="flex gap-4">
                    <button onClick={() => setShowExitModal(false)} className="flex-1 py-3 bg-gray-800 text-white font-bold rounded-xl border border-white/5 hover:bg-gray-700 transition-colors">BATAL</button>
                    <button onClick={handleExit} className="flex-1 py-3 bg-red-600 text-white font-black uppercase tracking-widest rounded-xl hover:bg-red-400 transition-colors">KELUAR</button>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>

      {/* HINT MODAL */}
      <AnimatePresence>
        {showHintModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex justify-center items-center p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-gray-900 border border-rose-500/30 rounded-2xl p-8 max-w-lg w-full relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-rose-500" />
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-rose-500" />
                  <h3 className="text-lg font-black italic text-white uppercase tracking-tighter">Petunjuk_Hacker</h3>
                </div>
                <button onClick={() => setShowHintModal(false)} className="p-1 hover:bg-white/5 rounded-lg border border-transparent active:border-white/10 transition-all">
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              <div className="space-y-3 mb-6">
                {[1, 2, 3].map(stage => (
                  <div key={stage} className={`p-4 rounded-xl border transition-all ${
                    hintStage >= stage 
                      ? 'bg-rose-500/10 border-rose-500/40 text-rose-100' 
                      : 'bg-white/5 border-white/5 text-gray-600 cursor-not-allowed'
                  }`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[8px] font-black tracking-widest uppercase">
                        Tahap {stage}: {stage === 1 ? 'Petunjuk Logika' : stage === 2 ? 'Panduan Teknis' : 'Pola Solusi'}
                      </span>
                      {hintStage < stage && (
                        <button
                          onClick={() => unlockHintStage(stage)}
                          className="text-[8px] px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-md transition-colors"
                        >
                          {stage === 3 ? 'UNGKAP POLA (-3 BINTANG)' : 'BUKA (-1 BINTANG)'}
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] font-bold italic">
                      {hintStage >= stage ? (
                        stage === 1
                          ? "Log chat menyimpan lebih dari sekedar obrolan. Perhatikan setiap kata yang dicetak tebal — ada nama, peran, dan angka yang tersembunyi di dalamnya."
                          : stage === 2
                          ? "Ada tiga elemen kunci: nama PROYEK, nama peran pengguna (GHOST), dan TAHUN. Cari ketiga elemen itu di chat log dan susun dengan pemisah garis bawah (_)."
                          : "Format flag: CTF{SHADOW_GHOST_2024} — proyek SHADOW, pengguna GHOST, tahun 2024."
                      ) : 'Data Terenkripsi...'}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-[9px] text-gray-500 italic text-center uppercase tracking-widest font-black">
                -- Peringatan Sistem: Penggunaan hint mempengaruhi skor akhir --
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Level8;
