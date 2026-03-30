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

  // Timer Persistence Logic
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem('ctf_level10_time');
    return saved ? parseInt(saved) : 600; // 10 minutes
  });

  const [stars, setStars] = useState(() => {
    const saved = localStorage.getItem('ctf_level10_stars');
    return saved ? parseInt(saved) : 3;
  });

  const [hintStage, setHintStage] = useState(() => {
    return parseInt(localStorage.getItem('ctf_level10_hint_stage') || '0');
  });

  const [hasOvertimePenalty, setHasOvertimePenalty] = useState(() => {
    return localStorage.getItem('ctf_level10_overtime') === 'true';
  });

  const [inputText, setInputText] = useState('');
  const [bufferInput, setBufferInput] = useState('');
  const [pwnStatus, setPwnStatus] = useState('locked');
  const [status, setStatus] = useState('active');
  const [attempts, setAttempts] = useState([]);
  const [showHintModal, setShowHintModal] = useState(false);
  const [completionTime, setCompletionTime] = useState(null);
  const [showExitModal, setShowExitModal] = useState(false);

  const realFlag = "CTF{B0FF3R_0V3RFL0W_D34DB33F}";

  useEffect(() => {
    if (status !== 'complete') {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          const nextValue = prev - 1;
          localStorage.setItem('ctf_level10_time', nextValue.toString());
          if (nextValue < 0 && !hasOvertimePenalty) {
            setHasOvertimePenalty(true);
            localStorage.setItem('ctf_level10_overtime', 'true');
            setStars(s => {
              const newStars = Math.max(0, s - 1);
              localStorage.setItem('ctf_level10_stars', newStars.toString());
              return newStars;
            });
          }
          return nextValue;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status, hasOvertimePenalty]);

  // Check for overflow condition
  useEffect(() => {
    if (bufferInput.length > 20 && bufferInput.includes('DEADBEEF')) {
      setPwnStatus('pwned');
    } else {
      setPwnStatus('locked');
    }
  }, [bufferInput]);

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
      const timeTakenStr = formatTime(600 - timeLeft);
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
    const penalty = stage === 3 ? 3 : 1;
    setStars(s => {
      const newStars = Math.max(0, s - penalty);
      localStorage.setItem('ctf_level10_stars', newStars.toString());
      return newStars;
    });
    setHintStage(stage);
    localStorage.setItem('ctf_level10_hint_stage', stage.toString());
  };

  if (status === 'complete') {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 font-mono text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(185,28,28,0.1)_0%,transparent_70%)]" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="z-10 bg-gray-900 border-4 border-red-700 p-12 rounded-3xl text-center max-w-xl shadow-[0_0_100px_rgba(185,28,28,0.2)]">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-24 h-24 bg-red-700/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-700/30">
            <Skull className="w-12 h-12 text-red-600 drop-shadow-[0_0_15px_#991b1b]" />
          </motion.div>
          <h1 className="text-5xl font-black italic tracking-tighter mb-2 text-white uppercase leading-none text-red-700">KERNEL OWNED</h1>
          <p className="text-red-600 font-bold tracking-[0.3em] mb-4 text-[10px]">SEKTOR: INTI_KONSTRUKSI // ROOT_ACCESS_GRANTED</p>
          <div className="bg-red-700/5 border border-red-700/10 rounded-2xl py-6 px-10 mb-8 inline-block">
             <div className="text-[10px] font-black text-gray-500 tracking-[0.4em] uppercase mb-4">Misi terselesaikan dalam</div>
             <div className="text-4xl font-black text-white italic tracking-tighter mb-6">{completionTime}</div>
             <div className="flex justify-center gap-4">
               {[1, 2, 3].map(s => (
                 <Zap key={s} className={`w-10 h-10 transition-all duration-500 ${s <= stars ? 'text-red-600 fill-red-600 drop-shadow-[0_0_15px_#991b1b]' : 'text-gray-800 fill-transparent'}`} />
               ))}
             </div>
          </div>
          <button onClick={handleExit} className="w-full bg-red-700 text-white font-black py-4 rounded-xl hover:bg-red-600 transition-all text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(153,27,27,0.4)]">KEMBALI KE MAP TAKTIS</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-4 md:p-8 flex flex-col overflow-hidden relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #991b1b15 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col relative z-10">
        
        {/* HEADER AREA */}
        <div className="flex justify-between items-start mb-8 relative">
          <div className="flex gap-4 items-start z-10">
            <button 
              onClick={() => setShowExitModal(true)} 
              className="mt-1 p-2 bg-gray-900 border border-red-700/30 rounded-xl hover:bg-red-700/20 text-gray-400 hover:text-red-700 transition-all group"
              title="Abort Mission"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-red-700 rounded-full animate-pulse shadow-[0_0_8px_#991b1b]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600/80">TARGET: SEKTOR_INTI_PWNING</span>
              </div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">
                LEVEL 10: <span className="text-red-700 drop-shadow-[0_0_10px_#991b1b]">PWN THE CORE</span>
              </h1>
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
             <div className="text-[8px] font-black text-gray-700 tracking-[0.5em] uppercase mb-2">RANK_EFFICIENCY</div>
             <div className="flex gap-3">
                {[1, 2, 3].map(s => (
                  <Zap key={s} className={`w-6 h-6 transition-all duration-700 ${s <= stars ? 'text-red-600 fill-red-600 drop-shadow-[0_0_10px_#991b1b]' : 'text-white/10 fill-transparent opacity-20'}`} />
                ))}
             </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] font-black text-red-500/80 tracking-[0.3em] uppercase mb-1">WAKTU_TERSISA</div>
            <div className={`text-4xl font-black italic tracking-tighter transition-colors duration-500 ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-red-700'}`}>
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* LAYOUT GRID */}
        <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
          
          {/* LEFT SIDE: BRIEFING & PAYLOAD CONTROL */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <div className="bg-gray-950/50 border border-red-600/30 rounded-2xl p-6 flex-1 flex flex-col relative overflow-hidden group shadow-[inset_0_0_20px_rgba(153,27,27,0.05)]">
              <div className="absolute top-0 left-0 w-1 h-full bg-red-700 shadow-[0_0_15px_#991b1b]" />
              <div className="flex items-center gap-3 mb-6">
                <Database className="w-5 h-5 text-red-600" />
                <h2 className="text-sm font-black text-red-200 uppercase tracking-widest">BRIEFING MISI</h2>
              </div>
              <div className="text-xs leading-relaxed text-gray-400 overflow-y-auto pr-2 custom-scrollbar space-y-4 italic mb-8">
                <p>{" > "} Anda berada di inti sistem. Lapisan terakhir adalah buffer memori yang stabil (16 byte). Gunakan overflow untuk menimpa alamat return!</p>
                <div className="p-4 bg-red-950/20 border border-red-600/20 rounded-xl space-y-4">
                   <div className="flex items-center gap-3 mb-2">
                      <ShieldAlert className="w-5 h-5 text-red-600" />
                      <h3 className="text-xs font-black text-white uppercase tracking-widest">Kontrol_Payload</h3>
                   </div>
                   <p className="text-[10px] text-gray-500">
                      Buffer memiliki batas <span className="text-white font-bold">16 byte</span>. Masukkan lebih dari itu dan sertakan string <span className="text-red-500 font-bold">DEADBEEF</span>.
                   </p>
                   <div className="space-y-3">
                      <input 
                         type="text" 
                         value={bufferInput}
                         onChange={(e) => setBufferInput(e.target.value)}
                         placeholder="INPUT PAYLOAD (Hex/Text)"
                         className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs font-black tracking-widest transition-all focus:border-red-500/50 text-red-400 outline-none"
                      />
                      <div className="p-3 bg-black/60 rounded-xl border border-white/5 space-y-2">
                        <div className="flex justify-between items-center text-[9px] font-black">
                           <span className="text-gray-600 uppercase tracking-widest">Register_Status:</span>
                           <span className={bufferInput.includes('DEADBEEF') ? 'text-red-500 animate-pulse font-black' : 'text-emerald-500'}>
                              {bufferInput.includes('DEADBEEF') ? 'OVERFLOW_ACTIVE' : 'STABLE'}
                           </span>
                        </div>
                      </div>
                   </div>
                </div>
              </div>

              {/* HINT BUTTON */}
              <button 
                onClick={() => setShowHintModal(true)} 
                className={`mt-auto bg-red-900/20 border rounded-xl p-4 flex items-center justify-center gap-3 group transition-all shadow-[0_0_20px_rgba(153,27,27,0.1)] ${hintStage > 0 ? 'border-red-400 bg-red-900/40' : 'border-red-700/40 hover:bg-red-900/30'}`}
              >
                <Zap className={`w-4 h-4 transition-colors ${hintStage > 0 ? 'text-red-500 fill-red-500' : 'text-red-500'}`} />
                <span className="text-xs font-black text-red-100 uppercase tracking-widest">
                  {hintStage > 0 ? `PETUNJUK AKTIF (Tahap ${hintStage})` : '💡 MINTA PETUNJUK'}
                </span>
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: STACK VISUALIZER & FLAG INPUT */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            
            {/* STACK VISUALIZER INTERFACE */}
            <div className="flex-1 bg-black/40 border border-red-600/20 rounded-2xl flex flex-col overflow-hidden shadow-2xl relative">
               <div className="p-4 border-b border-red-600/20 bg-red-950/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                     <span className="text-[10px] font-black text-gray-500 tracking-widest uppercase">Visualisasi_Stack_Memory // Core_Buffer</span>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500/20 rounded-sm" />
                        <span className="text-[8px] font-bold text-gray-600 uppercase">Buffer</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500/20 rounded-sm" />
                        <span className="text-[8px] font-bold text-gray-600 uppercase">Ret_Addr</span>
                     </div>
                  </div>
               </div>

               <div className="flex-1 grid grid-cols-4 gap-4 overflow-y-auto p-8 custom-scrollbar">
                  {/* Buffer Blocks (16 Bytes) */}
                  {Array.from({ length: 16 }).map((_, i) => {
                     const char = bufferInput[i] || '';
                     return (
                        <motion.div 
                           key={`buf-${i}`}
                           animate={{ 
                              scale: char ? [1, 1.05, 1] : 1,
                              backgroundColor: char ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.01)',
                              borderColor: char ? 'rgba(239, 68, 68, 0.4)' : 'rgba(255, 255, 255, 0.1)'
                           }}
                           className={`h-20 border-2 rounded-xl flex items-center justify-center relative shadow-lg ${char ? 'shadow-red-600/20' : ''}`}
                        >
                           <span className="absolute top-2 left-2 text-[8px] font-black text-gray-700">BUF_{i.toString(16).toUpperCase()}</span>
                           <span className={`text-xl font-black ${char ? 'text-red-500 animate-pulse' : 'text-white/5'}`}>
                              {char || '?'}
                           </span>
                        </motion.div>
                     );
                  })}

                  {/* Return Address Blocks (8 Bytes) */}
                  {Array.from({ length: 8 }).map((_, i) => {
                     const j = i + 16;
                     const char = bufferInput[j] || '';
                     const isDeadBeef = bufferInput.includes('DEADBEEF');
                     return (
                        <motion.div 
                           key={`ret-${j}`}
                           animate={{ 
                              scale: char ? [1, 1.05, 1] : 1,
                              backgroundColor: isDeadBeef ? 'rgba(16, 185, 129, 0.2)' : char ? 'rgba(239, 68, 68, 0.4)' : 'rgba(255, 255, 255, 0.01)',
                              borderColor: isDeadBeef ? 'rgba(16, 185, 129, 0.8)' : char ? 'rgba(239, 68, 68, 0.6)' : 'rgba(255, 255, 255, 0.1)'
                           }}
                           className={`h-20 border-2 rounded-xl flex items-center justify-center relative shadow-lg ${char ? 'shadow-red-600/20' : ''}`}
                        >
                           <span className="absolute top-2 left-2 text-[8px] font-black text-emerald-600/40 italic">RET_PTR</span>
                           <span className={`text-xl font-black ${isDeadBeef ? 'text-white drop-shadow-[0_0_10px_white]' : char ? 'text-red-400' : 'text-white/5'}`}>
                              {char || '?'}
                           </span>
                        </motion.div>
                     );
                  })}
               </div>
            </div>

            {/* FLAG INPUT terminal style */}
            <div className={`bg-gray-950 border rounded-2xl p-6 relative overflow-hidden transition-all duration-500 ${status === 'wrong' ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]' : 'border-red-700/30'}`}>
               <div className="text-[10px] font-black text-gray-500 tracking-[0.3em] uppercase mb-4 flex justify-between">
                  <span>TERMINAL_PWN_INPUT</span>
                  {status === 'wrong' && <span className="text-red-500 animate-pulse">FLAG_INVALID</span>}
                  {pwnStatus === 'pwned' && <span className="text-emerald-500 animate-pulse font-black">MEM_ADDR_CORRUPTED: FLAG_RELEASED</span>}
               </div>

               {pwnStatus === 'pwned' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 p-3 bg-red-600/10 border border-red-600/40 rounded-xl">
                     <div className="text-[13px] font-black text-white tracking-[0.3em] italic select-all text-center">
                        CTF&#123;B0FF3R_0V3RFL0W_D34DB33F&#125;
                     </div>
                  </motion.div>
               )}
               
               <form onSubmit={submitFlag} className="flex gap-4">
                  <div className="flex-1 relative">
                     <span className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600 font-bold">#</span>
                     <input 
                        type="text" 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Masukkan flag exploitasi (CTF{...})"
                        className={`w-full bg-gray-900 border ${status === 'wrong' ? 'border-red-500/50 text-red-100' : 'border-red-700/20 text-red-100 focus:border-red-500'} rounded-xl py-4 pl-12 pr-4 outline-none font-mono text-sm tracking-wider transition-all`}
                        onKeyDown={(e) => e.key === 'Enter' && submitFlag()}
                     />
                  </div>
                  <button 
                    type="submit"
                    className="bg-red-700 hover:bg-red-600 text-white px-8 rounded-xl font-black tracking-widest uppercase transition-all flex items-center gap-2 hover:shadow-[0_0_20px_rgba(153,27,27,0.4)]"
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
               <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-gray-900 border border-red-700/30 rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 left-0 w-full h-1 bg-red-700" />
                  <Skull className="w-12 h-12 text-red-700 mx-auto mb-4" />
                  <h3 className="text-xl font-black text-white tracking-widest uppercase mb-2">HENTIKAN EXPLOITASI?</h3>
                  <p className="text-sm text-gray-500 mb-8">Data kernel akan ter-reset jika Anda berhenti.</p>
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
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-gray-900 border border-red-700/30 rounded-2xl p-8 max-w-lg w-full relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-700" />
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-red-700" />
                  <h3 className="text-lg font-black italic text-white uppercase tracking-tighter">Petunjuk_Hacker</h3>
                </div>
                <button onClick={() => setShowHintModal(false)} className="p-1 hover:bg-white/5 rounded-lg transition-all">
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="space-y-3 mb-6">
                {[1, 2, 3].map(stage => (
                  <div key={stage} className={`p-4 rounded-xl border transition-all ${
                    hintStage >= stage
                      ? 'bg-red-700/10 border-red-700/40 text-red-100'
                      : 'bg-white/5 border-white/5 text-gray-600'
                  }`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[8px] font-black tracking-widest uppercase">
                        Tahap {stage}: {stage === 1 ? 'Konsep Dasar' : stage === 2 ? 'Panduan Teknis' : 'Pola Solusi'}
                      </span>
                      {hintStage < stage && (
                        <button onClick={() => unlockHintStage(stage)} className="text-[8px] px-3 py-1 bg-red-700 hover:bg-red-600 text-white font-black rounded-md transition-colors">
                          {stage === 3 ? 'UNGKAP POLA (-3 BINTANG)' : 'BUKA (-1 BINTANG)'}
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] font-bold italic">
                      {hintStage >= stage ? (
                        stage === 1
                          ? "Buffer memori memiliki kapasitas terbatas. Jika Anda mengirim data melebihi kapasitas itu, data berlebih akan 'meluap' ke area memori yang berdekatan — termasuk Return Address."
                          : stage === 2
                          ? "Coba ketik lebih dari 16 karakter di kolom payload dan perhatikan visualisasi stack berubah. Blok RET_PTR mulai terisi ketika overflow terjadi."
                          : "Ketik minimal 17 karakter bebas lalu tambahkan 'DEADBEEF'. Contoh: 'AAAAAAAAAAAAAAAAAADEADBEEF'. Flag akan muncul di dump memori dan bisa disalin."
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

export default Level10;
