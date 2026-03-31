import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft,
  Terminal, 
  Zap, 
  Cpu, 
  Binary, 
  Code, 
  Play,
  X,
  ShieldAlert,
  Lock,
  Check
} from 'lucide-react';

const SulitLevel2 = () => {
  const navigate = useNavigate();

  // Timer: Count-up
  const [elapsed, setElapsed] = useState(0);
  const [hintStage, setHintStage] = useState(() => parseInt(localStorage.getItem('ctf_sulit_level2_hint_stage') || '0'));
  
  // Calculate dynamic stars
  const timeLimit = 1200; // 20 minutes
  const isTimeFailed = elapsed > timeLimit;
  const timePenalty = isTimeFailed ? 1 : 0;
  const hintPenalty = Math.min(3, hintStage); // max 3 penalties for 3 hint stages
  const stars = Math.max(1, 5 - hintPenalty - timePenalty);


  const [inputText, setInputText] = useState('');
  const [calcInput, setCalcInput] = useState('');
  const [unlockStatus, setUnlockStatus] = useState('locked');
  const [unlockError, setUnlockError] = useState('');
  const [status, setStatus] = useState('active');
  const [attempts, setAttempts] = useState([]);
  const [showHintModal, setShowHintModal] = useState(false);
  const [completionTime, setCompletionTime] = useState(null);
  const [showExitModal, setShowExitModal] = useState(false);

  const realFlag = "CTF{0x1E_LOGIC_MASTER}";
  const correctHex = "0x1E"; // (14 + 15 XOR 5) = 15 XOR 5 = 10 (0xA). 0xA + 20 (0x14) = 30 (0x1E).

  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', '#ef4444');
    return () => document.documentElement.style.setProperty('--accent-color', '#00ffff');
  }, []);

  useEffect(() => {
    if (status !== 'complete') {
      const timer = setInterval(() => {
        setElapsed(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status]);

  const formatTime = (seconds) => {
    const isNeg = seconds < 0;
    const absSecs = Math.abs(seconds);
    const m = Math.floor(absSecs / 60);
    const s = absSecs % 60;
    return `${isNeg ? '-' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const checkCalc = () => {
    if (calcInput.toUpperCase() === correctHex || calcInput.toLowerCase() === correctHex.toLowerCase()) {
      setUnlockStatus('unlocked');
      setUnlockError('');
    } else {
      setUnlockStatus('locked');
      setUnlockError('ERROR: INVALID_KERNEL_HEX_KEY');
      setTimeout(() => setUnlockError(''), 3000);
    }
  };

  const submitFlag = (e) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    if (inputText.trim() === realFlag) {
      setStatus('complete');
      const timeTakenStr = formatTime(elapsed);
      setCompletionTime(timeTakenStr);
      
      const savedStats = localStorage.getItem('ctf_mode_acak_stats');
      const stats = savedStats ? JSON.parse(savedStats) : {};
      const currentBestStars = stats['sulit-2']?.stars || 0;
      const currentBestTimeSec = (() => { 
        const t = stats['sulit-2']?.bestTime; 
        if (!t) return 999999;
        const parts = String(t).split(':').map(Number);
        return parts.length === 2 ? parts[0] * 60 + parts[1] : (Number(parts[0]) || 999999);
      })();
      const isBetter = stars > currentBestStars || (stars === currentBestStars && elapsed < currentBestTimeSec);
      if (isBetter) {
         stats['sulit-2'] = { stars: stars, bestTime: timeTakenStr, conditions: [true, hintStage < 1, hintStage < 2, hintStage < 3, !isTimeFailed] };
         localStorage.setItem('ctf_mode_acak_stats', JSON.stringify(stats));
      }
      localStorage.removeItem('ctf_sulit_level2_time');
      localStorage.removeItem('ctf_sulit_level2_stars');
      localStorage.removeItem('ctf_sulit_level2_hint_stage');
      localStorage.removeItem('ctf_sulit_level2_overtime');
    } else {
      setStatus('wrong');
      setAttempts(prev => [...prev, inputText]);
      setTimeout(() => setStatus('active'), 2000);
    }
    setInputText('');
  };

  
  const unlockHintStage = (stage) => {
    if (stage <= hintStage) return;
    setHintStage(stage);
    localStorage.setItem('ctf_sulit_level2_hint_stage', stage.toString());
  };

  const handleExit = () => {
    localStorage.removeItem('ctf_sulit_level2_time');
    localStorage.removeItem('ctf_sulit_level2_stars');
    localStorage.removeItem('ctf_sulit_level2_hint_stage');
    localStorage.removeItem('ctf_sulit_level2_overtime');
    navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 'sulit-2' } });
  };

  

  if (status === 'complete') {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 font-mono text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1)_0%,transparent_70%)]" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="z-10 bg-gray-900 border-4 border-red-500 p-12 rounded-3xl text-center max-w-xl shadow-[0_0_50px_rgba(239,68,68,0.3)]">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/30">
            <Cpu className="w-12 h-12 text-red-500 drop-shadow-[0_0_10px_#ef4444]" />
          </motion.div>
          <h1 className="text-5xl font-black italic tracking-tighter mb-2 text-white uppercase leading-none">MISSION COMPLETE</h1>
          <p className="text-red-500 font-bold tracking-[0.3em] mb-4 text-[10px]">SECTOR: LOGIC_GATE // ACCESS_GRANTED</p>
          <div className="bg-red-500/5 border border-red-500/10 rounded-2xl py-6 px-10 mb-8 inline-block">
             <div className="text-[10px] font-black text-gray-500 tracking-[0.4em] uppercase mb-4">Misi terselesaikan dalam</div>
             <div className="text-4xl font-black text-white italic tracking-tighter mb-6">{completionTime}</div>
             <div className="flex justify-center gap-4">
               {[1, 2, 3, 4, 5].map(s => (
                 <Zap key={s} className={`w-10 h-10 transition-all duration-500 ${s <= stars ? 'text-red-500 fill-red-500 drop-shadow-[0_0_15px_#ef4444]' : 'text-gray-800 fill-transparent'}`} />
               ))}
             </div>
          </div>
          <button onClick={() => navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 'sulit-2' } })} className="w-full bg-red-500 text-black font-black py-4 rounded-xl hover:bg-red-500 transition-all text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(239,68,68,0.2)]">KEMBALI KE MAP TAKTIS</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-4 md:p-8 flex flex-col overflow-hidden relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(239, 68, 68, 0.15) 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col relative z-10">
        
        {/* HEADER AREA */}
        <div className="flex justify-between items-start mb-8 relative">
          <div className="flex gap-4 items-start z-10">
             <button 
                onClick={() => setShowExitModal(true)} 
                className="mt-1 p-2 bg-gray-900 border border-red-500/30 rounded-xl hover:bg-red-500/20 text-gray-400 hover:text-red-500 transition-all group"
                title="Abort Mission"
             >
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
             </button>
             <div>
                <div className="flex items-center gap-2 mb-1">
                   <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_#ef4444]" />
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500/80">TARGET: SECTOR_HARDWARE</span>
                </div>
                <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">
                   LEVEL 9: <span className="text-red-500 drop-shadow-[0_0_10px_#ef4444]">PEMBALIKAN LOGIKA</span>
                </h1>
             </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
             <div className="text-[8px] font-black text-gray-700 tracking-[0.5em] uppercase mb-2">RANK_EFFICIENCY</div>
             <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map(s => (
                  <Zap key={s} className={`w-6 h-6 transition-all duration-700 ${s <= stars ? 'text-red-500 fill-red-500 drop-shadow-[0_0_10px_#ef4444]' : 'text-white/10 fill-transparent opacity-20'}`} />
                ))}
             </div>
          </div>

          <div className="text-right">
             <div className="text-[10px] font-black text-red-500/30 tracking-[0.3em] uppercase mb-1">ELAPSED_TIME</div>
             <div className="text-4xl font-black italic tracking-tighter transition-colors duration-500 text-red-500">
                {formatTime(elapsed)}
             </div>
          </div>
        </div>

        {/* LAYOUT GRID */}
        <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
          
          {/* LEFT SIDE: BRIEFING */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
             <div className="bg-gray-950/50 border border-red-500/30 rounded-2xl p-6 flex-1 flex flex-col relative overflow-hidden group shadow-[inset_0_0_20px_rgba(239,68,68,0.05)]">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500 shadow-[0_0_15px_#ef4444]" />
                <div className="flex items-center gap-3 mb-6">
                   <Terminal className="w-5 h-5 text-red-500" />
                   <h2 className="text-sm font-black text-red-200 uppercase tracking-widest">BRIEFING MISI</h2>
                </div>
                <div className="text-xs leading-relaxed text-gray-400 overflow-y-auto pr-2 custom-scrollbar space-y-4 italic mb-8">
                   <p>{" > "} Misi lo: Bypass sistem otorisasi hardware Shadow Syndicate.</p>
                   <p>{" > "} Engineer mereka membuat sistem login berbasis logika gerbang biner dan hexadecimal.</p>
                   <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-lg">
                      <p className="text-red-500 font-black tracking-tight uppercase mb-1 flex items-center gap-2">
                        <Binary className="w-3 h-3" /> LOGIC_CHECK
                      </p>
                      <p className="text-[9px] text-gray-600 uppercase italic">Hitung hasil akhir dari operasi logika di bawah ini dan konversi ke Hexadecimal (format: 0xXX) untuk membuka terminal admin.</p>
                   </div>
                </div>

                <div className="mt-auto space-y-3">
                   <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase text-gray-500">System_Status</span>
                      <span className="text-[9px] font-bold text-red-500">ENCRYPTED</span>
                   </div>
                   <div className="mt-auto space-y-3">
                   <button onClick={() => setShowHintModal(true)} className={`bg-red-900/20 border rounded-xl p-4 flex items-center justify-center gap-3 group transition-all shadow-[0_0_20px_rgba(239,68,68,0.1)] ${hintStage > 0 ? 'border-red-500 bg-red-900/40' : 'border-red-500/40 hover:bg-red-900/30'}`}>
              <Zap className={`w-4 h-4 transition-colors ${hintStage > 0 ? 'text-red-500 fill-red-500' : 'text-red-500'}`} />
              <span className="text-xs font-black text-red-200 uppercase tracking-widest">{hintStage > 0 ? `HINT ACTIVE (${hintStage}/3)` : '💡 MINTA HINT BOS'}</span>
            </button>
                 </div>
                </div>
             </div>
          </div>

          {/* CENTER: WORKSPACE */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
             <div className="flex-1 bg-black border border-red-500/20 rounded-2xl flex flex-col overflow-hidden relative shadow-2xl">
                <div className="h-10 bg-gray-900/80 border-b border-white/5 flex items-center px-4 gap-4 backdrop-blur-md justify-between">
                   <div className="flex items-center gap-2">
                      <Cpu className="w-3 h-3 text-red-500" />
                      <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Hardware Otorisasi // Interface: /dev/tty0</span>
                   </div>
                </div>

                <div className="flex-1 p-8 flex flex-col items-center justify-center space-y-12 overflow-y-auto custom-scrollbar">
                   {/* PSEUDO ASSEMBLY DECOMPILER BOX */}
                   <div className="bg-[#050505] border border-white/5 rounded-lg p-6 max-w-2xl w-full font-mono relative shadow-2xl">
                      <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-2">
                         <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500/50" />
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">PSEUDO_ASSEMBLY_DECOMPILER // KERNEL_V9</span>
                         </div>
                      </div>

                      <div className="space-y-1 text-[13px] leading-relaxed">
                         <div className="flex gap-8">
                            <span className="text-gray-800 w-8">0x00</span>
                            <span className="text-[#4a1c1c] italic">; Tahap Inisialisasi</span>
                         </div>
                         <div className="flex gap-8">
                            <span className="text-gray-800 w-8">0x01</span>
                            <div>
                               <span className="text-[#ef4444] font-bold">MOV</span>
                               <span className="text-[#f87171] ml-4">EAX</span>, 
                               <span className="text-[#f97316] ml-2">0xF</span>
                               <span className="text-[#4a1c1c] italic ml-12">; Load 15 ke EAX</span>
                            </div>
                         </div>
                         <div className="flex gap-8">
                            <span className="text-gray-800 w-8">0x02</span>
                            <div>
                               <span className="text-[#ef4444] font-bold">MOV</span>
                               <span className="text-[#f87171] ml-4">EBX</span>, 
                               <span className="text-[#f97316] ml-2">0x5</span>
                               <span className="text-[#4a1c1c] italic ml-12">; Load 5 ke EBX</span>
                            </div>
                         </div>
                         <div className="h-4" />
                         <div className="flex gap-8">
                            <span className="text-gray-800 w-8">0x03</span>
                            <span className="text-[#4a1c1c] italic">; Tahap Eksekusi</span>
                         </div>
                         <div className="flex gap-8">
                            <span className="text-gray-800 w-8">0x04</span>
                            <div>
                               <span className="text-[#ef4444] font-bold">XOR</span>
                               <span className="text-[#f87171] ml-4">EAX</span>, 
                               <span className="text-[#f87171] ml-2">EBX</span>
                               <span className="text-[#4a1c1c] italic ml-10">; XOR EAX dengan EBX</span>
                            </div>
                         </div>
                         <div className="flex gap-8">
                            <span className="text-gray-800 w-8">0x05</span>
                            <div>
                               <span className="text-[#ef4444] font-bold">ADD</span>
                               <span className="text-[#f87171] ml-4">EAX</span>, 
                               <span className="text-[#f97316] ml-2">0x14</span>
                               <span className="text-[#4a1c1c] italic ml-9">; Tambah 20 (dec) ke EAX</span>
                            </div>
                         </div>
                         <div className="flex gap-8">
                            <span className="text-gray-800 w-8">0x06</span>
                            <div>
                               <span className="text-[#ef4444] font-bold">RET</span>
                               <span className="text-[#4a1c1c] italic ml-16">; Selesai</span>
                            </div>
                         </div>
                         <div className="flex gap-8 opacity-20">
                            <span className="text-gray-800 w-8">0x07</span>
                            <span className="text-gray-800">NOP</span>
                         </div>
                         <div className="flex gap-8 opacity-20">
                            <span className="text-gray-800 w-8">0x08</span>
                            <span className="text-gray-800">NOP</span>
                         </div>
                      </div>

                      <div className="mt-12 flex flex-col gap-4 max-w-xs mx-auto">
                         <div className="relative">
                            <input
                               type="text"
                               value={calcInput}
                               onChange={(e) => setCalcInput(e.target.value)}
                               placeholder="INPUT_VAL (HEX)"
                               className="w-full bg-black/40 border border-white/5 rounded-lg py-3 px-4 text-center text-lg font-mono text-red-100 focus:outline-none focus:border-red-500/50 transition-all uppercase placeholder:text-gray-800"
                            />
                         </div>
                         <button onClick={checkCalc} className="bg-red-600/10 hover:bg-red-600/20 border border-red-500/30 text-red-500 font-bold py-3 rounded-lg text-[10px] tracking-widest uppercase transition-all active:scale-95">
                            EXECUTE_KERNEL_ACCESS
                         </button>
                         <AnimatePresence>
                            {unlockError && (
                               <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-[10px] text-red-500 font-black tracking-widest text-center uppercase italic">
                                  {unlockError}
                               </motion.div>
                            )}
                         </AnimatePresence>
                      </div>
                   </div>

                   {/* ADMIN TERMINAL REVEAL */}
                   <AnimatePresence>
                      {unlockStatus === 'unlocked' && (
                         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full bg-red-950/20 border-2 border-red-500/40 rounded-2xl p-6 text-center relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 bg-red-500 text-black text-[9px] font-black italic rounded-full uppercase py-0.5 shadow-[0_0_15px_#ef4444]">ACCESS_UNLOCKED</div>
                            <div className="text-gray-400 font-mono text-xs mb-4">Decrypted flag found in hardware memory:</div>
                            <div className="bg-black/40 p-4 rounded-xl border border-white/5 font-mono text-red-500 font-bold tracking-widest break-all select-all">
                               {realFlag}
                            </div>
                         </motion.div>
                      )}
                   </AnimatePresence>
                </div>

                {/* FLAG SUBMISSION AREA */}
                <div className="bg-gray-900 border-t border-red-500/20 p-6 backdrop-blur-md">
                   <div className="text-[9px] font-black text-red-500/50 uppercase tracking-[0.3em] mb-4">Enter decrypted credentials:</div>
                   <form onSubmit={submitFlag} className="flex flex-col md:flex-row gap-4">
                      <div className="relative flex-1 group">
                         <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500/30 group-focus-within:text-red-500 transition-colors" />
                         <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="CTF{...}"
                            className={`w-full bg-black/60 border ${status === 'wrong' ? 'border-red-500 shadow-[0_0_15px_#ef4444]' : 'border-red-500/30 focus:border-red-500'} rounded-xl py-4 pl-12 pr-4 text-xs font-mono text-white focus:outline-none transition-all tracking-widest`}
                         />
                      </div>
                      <button type="submit" className="bg-red-600 hover:bg-red-500 text-white font-black px-12 py-4 rounded-xl text-xs tracking-widest uppercase transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
                         [ SUBMIT ] <Check className="w-4 h-4" />
                      </button>
                   </form>
                   <div className="mt-4 flex gap-2 overflow-x-auto pb-2 h-8">
                      {attempts.map((att, i) => (
                        <div key={i} className="px-2 py-1 bg-red-950/30 border border-red-500/20 rounded text-[8px] text-red-500/50 italic line-through whitespace-nowrap">{att}</div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-700">
           <div className="flex items-center gap-4 text-[9px] font-black tracking-widest">
              <span className="text-red-500/50">{" > "} HW_LINK: STABLE</span>
              <span className="text-gray-800">//</span>
              <span>MODE: ACAK</span>
              <span className="text-gray-800">//</span>
              <span>LEVEL: 9</span>
           </div>
           <div className="text-[8px] font-bold uppercase tracking-tighter italic opacity-50">-- HW_AUTH_INTERFACE_V.9 --</div>
        </div>
      </div>

      {/* MODALS */}
      <AnimatePresence>
        {showHintModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowHintModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-gray-900 border border-red-500/30 rounded-3xl p-8 max-w-lg w-full shadow-[0_0_50px_rgba(239,68,68,0.2)] overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
               <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-1">EXPLOIT_RECOVERY_HUB</h2>
                    <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Target Analysis Protocol</p>
                  </div>
                  <button onClick={() => setShowHintModal(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
               </div>
               <div className="space-y-4 mb-8">
                  {[
                    { depth: 1, label: "ANALYZING_PROTECTION", content: "Analisis proteksi awal: Evaluasi apa yang memblokir instruksimu. Biasanya sistem ini rentan dengan manipulasi memori dasar." },
                    { depth: 2, label: "CALCULATING_OFFSET", content: "Penghitungan offset: Hitung alamat injeksi yang valid atau cari parameter tersembunyi untuk ditembus." },
                    { depth: 3, label: "PWN_INSTRUCTION", content: "Instruksi eksekusi: Bypass telah dipetakan, lakukan submit <span className='text-red-500 font-black tracking-widest select-all'>`" + "CTF{0x1E_LOGIC_MASTER}" + "`</span>" }
                  ].map((h, i) => (
                    <div key={i} className={`p-4 rounded-2xl border transition-all ${hintStage >= h.depth ? 'bg-red-500/10 border-red-500/40 text-gray-200' : 'bg-black/40 border-white/5 text-gray-600'}`}>
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-black tracking-widest uppercase">{h.label}</span>
                          {hintStage >= h.depth ? <Check className="w-3 h-3 text-red-500" /> : <Lock className="w-3 h-3" />}
                       </div>
                       {hintStage >= h.depth ? (
                         <p className="text-xs leading-relaxed italic" dangerouslySetInnerHTML={{ __html: h.content }} />
                       ) : (
                         <button onClick={() => { setHintStage(h.depth); localStorage.setItem('ctf_sulit_level2_hint_stage', h.depth.toString()); }} className="w-full py-2 bg-red-600 hover:bg-red-500 text-black text-[10px] font-black uppercase tracking-widest rounded-lg transition-all">UNLOCK EXPLOIT DEPTH {h.depth}</button>
                       )}
                    </div>
                  ))}
               </div>
               <p className="text-[8px] text-center text-gray-700 uppercase font-bold tracking-[0.2em]">-- RANK_EFFICIENCY will be reduced upon unlock --</p>
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

export default SulitLevel2;
