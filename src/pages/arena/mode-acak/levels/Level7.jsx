import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Image,
  Clock,
  Zap,
  ChevronLeft,
  X,
  Play,
  Sliders,
  Eye,
  ShieldAlert,
  Activity,
  ScanSearch,
  Check,
  Lock
} from 'lucide-react';

const Level7 = () => {
  const navigate = useNavigate();
  
  // Timer: Count-up
  const [elapsed, setElapsed] = useState(0);
  const [hintStage, setHintStage] = useState(() => {
    return parseInt(localStorage.getItem('ctf_level7_hint_stage') || '0');
  });

  const [stars, setStars] = useState(() => {
    const saved = localStorage.getItem('ctf_level7_stars');
    if (saved) return parseInt(saved);
    const currentHint = parseInt(localStorage.getItem('ctf_level7_hint_stage') || '0');
    return Math.max(1, 4 - currentHint);
  });

  const [flagInput, setFlagInput] = useState('');
  const [status, setStatus] = useState('active'); // 'active', 'wrong', 'decoy', 'complete'
  const [attempts, setAttempts] = useState([]);
  const [showHintModal, setShowHintModal] = useState(false);
  const [completionTime, setCompletionTime] = useState(null);
  const [showExitModal, setShowExitModal] = useState(false);
  
  // Challenge Specific States (Steganography Sliders)
  const [filters, setFilters] = useState({
    alphaPhase: 30,    // Target: 85
    betaFreq: 120,    // Target: 42
    gammaRes: 10,     // Target: 175
    sigmaWave: 50     // Target: 99
  });

  // Target values to decode
  const TARGETS = { alphaPhase: 85, betaFreq: 42, gammaRes: 175, sigmaWave: 99 };
  const TOLERANCE = 5; // ±5 units wiggle room

  const TRUE_FLAG = "CTF{V1su4L_N01s3_D3c0d3d}";
  const GARBAGE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|[]<>/?";

  const isCompleteMatch = 
    Math.abs(filters.alphaPhase - TARGETS.alphaPhase) <= TOLERANCE &&
    Math.abs(filters.betaFreq - TARGETS.betaFreq) <= TOLERANCE &&
    Math.abs(filters.gammaRes - TARGETS.gammaRes) <= TOLERANCE &&
    Math.abs(filters.sigmaWave - TARGETS.sigmaWave) <= TOLERANCE;

  // Generate semi-scrambled flag based on proximity to target
  const getRenderedFlagText = () => {
    if (isCompleteMatch) return TRUE_FLAG;
    
    const maxDev = 200 * 4;
    const currentDev = 
      Math.abs(filters.alphaPhase - TARGETS.alphaPhase) +
      Math.abs(filters.betaFreq - TARGETS.betaFreq) +
      Math.abs(filters.gammaRes - TARGETS.gammaRes) +
      Math.abs(filters.sigmaWave - TARGETS.sigmaWave);
      
    const accuracy = 1 - (currentDev / maxDev);
    
    let display = "";
    for(let i=0; i<TRUE_FLAG.length; i++) {
        if (accuracy > 0.4 && (i < 4 || i === TRUE_FLAG.length -1)) {
           display += TRUE_FLAG[i];
        } else if (Math.random() < Math.pow(accuracy, 2.5)) {
           display += TRUE_FLAG[i];
        } else {
           display += GARBAGE_CHARS[Math.floor(Math.random() * GARBAGE_CHARS.length)];
        }
    }
    return display;
  };

  const [renderedText, setRenderedText] = useState(getRenderedFlagText());

  // Scramble text effect
  useEffect(() => {
    const scrambler = setInterval(() => {
      setRenderedText(getRenderedFlagText());
    }, 150);
    return () => clearInterval(scrambler);
  }, [filters]);

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

  const verifyFlag = (e) => {
    if (e) e.preventDefault();
    if (!flagInput.trim()) return;

    if (flagInput.trim() === TRUE_FLAG) {
      setStatus('complete');
      const timeTakenStr = formatTime(elapsed);
      setCompletionTime(timeTakenStr);
      
      const stats = JSON.parse(localStorage.getItem('ctf_mode_acak_stats')) || {};
      const currentBestStars = stats[7]?.stars || 0;
      if (stars >= currentBestStars) {
         stats[7] = { stars: stars, bestTime: timeTakenStr };
         localStorage.setItem('ctf_mode_acak_stats', JSON.stringify(stats));
      }
      localStorage.removeItem('ctf_level7_time');
      localStorage.removeItem('ctf_level7_stars');
      localStorage.removeItem('ctf_level7_hint_stage');
      localStorage.removeItem('ctf_level7_overtime');
    } else if (flagInput !== "") {
      setStatus('wrong');
      setAttempts(prev => [...prev, flagInput]);
      setTimeout(() => setStatus('active'), 2000);
    }
    setFlagInput('');
  };

  const handleExit = () => {
    localStorage.removeItem('ctf_level7_time');
    localStorage.removeItem('ctf_level7_stars');
    localStorage.removeItem('ctf_level7_hint_stage');
    localStorage.removeItem('ctf_level7_overtime');
    navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 7 } });
  };

  const unlockHintStage = (stage) => {
    if (stage <= hintStage) return;
    const newStars = Math.max(1, 4 - stage);
    setStars(newStars);
    localStorage.setItem('ctf_level7_stars', newStars.toString());
    
    setHintStage(stage);
    localStorage.setItem('ctf_level7_hint_stage', stage.toString());
  };

  if (status === 'complete') {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 font-mono text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)]" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="z-10 bg-gray-900 border-4 border-indigo-500 p-12 rounded-3xl text-center max-w-xl shadow-[0_0_50px_rgba(99,102,241,0.3)]">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-24 h-24 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-indigo-500/30">
            <ScanSearch className="w-12 h-12 text-indigo-400 drop-shadow-[0_0_10px_#6366f1]" />
          </motion.div>
          <h1 className="text-5xl font-black italic tracking-tighter mb-2 text-white uppercase leading-none">MISSION COMPLETE</h1>
          <p className="text-indigo-500 font-bold tracking-[0.3em] mb-4 text-[10px]">SECTOR: MEDIA_CORE // DATA_UNCOVERED</p>
          <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl py-6 px-10 mb-8 inline-block">
             <div className="text-[10px] font-black text-gray-500 tracking-[0.4em] uppercase mb-4">Misi terselesaikan dalam</div>
             <div className="text-4xl font-black text-white italic tracking-tighter mb-6">{completionTime}</div>
             <div className="flex justify-center gap-4">
               {[1, 2, 3, 4].map(s => (
                 <Zap key={s} className={`w-10 h-10 transition-all duration-500 ${s <= stars ? 'text-indigo-400 fill-indigo-400 drop-shadow-[0_0_15px_#6366f1]' : 'text-gray-800 fill-transparent'}`} />
               ))}
             </div>
          </div>
          <button onClick={() => navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 7 } })} className="w-full bg-indigo-500 text-black font-black py-4 rounded-xl hover:bg-indigo-400 transition-all text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(99,102,241,0.2)]">KEMBALI KE MAP TAKTIS</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div 
       onContextMenu={(e) => { e.preventDefault(); alert("System Alert: Right Click Inspection Disabled!"); }}
       className="min-h-screen bg-gray-950 text-gray-300 font-mono p-4 md:p-8 flex flex-col overflow-hidden relative"
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #3730a3 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col relative z-10">
        
        {/* HEADER AREA */}
        <div className="flex justify-between items-start mb-8 relative">
          <div className="flex gap-4 items-start z-10">
            <button 
              onClick={() => setShowExitModal(true)} 
              className="mt-1 p-2 bg-gray-900 border border-indigo-500/30 rounded-xl hover:bg-indigo-500/20 text-gray-400 hover:text-indigo-400 transition-all group"
              title="Abort Mission"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_8px_#6366f1]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400/80">TARGET: SECTOR_MEDIA</span>
              </div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none shadow-indigo-500/20">
                LEVEL 7: <span className="text-indigo-500 drop-shadow-[0_0_10px_#6366f1]">STEGANOGRAPHY</span>
              </h1>
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
             <div className="text-[8px] font-black text-gray-700 tracking-[0.5em] uppercase mb-2">RANK_EFFICIENCY</div>
             <div className="flex gap-3">
                {[1, 2, 3, 4].map(s => (
                  <Zap key={s} className={`w-6 h-6 transition-all duration-700 ${s <= stars ? 'text-indigo-400 fill-indigo-400 drop-shadow-[0_0_10px_#6366f1]' : 'text-white/10 fill-transparent opacity-20'}`} />
                ))}
             </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] font-black text-cyan-500/30 tracking-[0.3em] uppercase mb-1">ELAPSED_TIME</div>
            <div className={`text-4xl font-black italic tracking-tighter transition-colors duration-500 text-indigo-600`}>
              {formatTime(elapsed)}
            </div>
          </div>
        </div>

        {/* LAYOUT */}
        <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
          
          {/* LEFT SIDE: BRIEFING & CONTROLS */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <div className="bg-gray-950/50 border border-indigo-500/30 rounded-2xl p-6 flex-1 flex flex-col relative overflow-hidden group shadow-[inset_0_0_20px_rgba(99,102,241,0.05)]">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 shadow-[0_0_15px_#6366f1]" />
              <div className="flex items-center gap-3 mb-6">
                <Image className="w-5 h-5 text-indigo-400" />
                <h2 className="text-sm font-black text-indigo-200 uppercase tracking-widest">BRIEFING MISI</h2>
              </div>
              <div className="text-xs leading-relaxed text-gray-400 overflow-y-auto pr-2 custom-scrollbar space-y-4 italic mb-8">
                <p>{" > "} Target: Ekstraksi *Hidden Payload* (Steganography).</p>
                <p>{" > "} Kita menyadap satu transmisi gambar korup dari Shadow Syndicate. Gambarnya terlihat seperti artefak digital biasa, tapi sebenarnya menyembunyikan flag (pesan text).</p>
                <div className="p-3 bg-indigo-950/20 border border-indigo-500/20 rounded-lg">
                   <p className="text-indigo-400 font-black tracking-tight uppercase mb-1 flex items-center gap-2">
                     <Sliders className="w-3 h-3" /> MEDIA_ANALYST_TOOL
                   </p>
                   <p className="text-[9px] text-gray-600 uppercase italic">Gunakan panel spektrum gelombang di bawah ini. Geser nilainya untuk memfilter *layer noise* yang mengaburkan flag!</p>
                </div>
              </div>

              {/* SLIDERS CONTROLS */}
              <div className="mt-auto flex flex-col gap-5 bg-black/40 p-4 rounded-xl border border-indigo-900/40">
                <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest border-b border-indigo-500/20 pb-2 mb-2">SPECTRUM TUNER V.2</div>
                
                {[
                   { label: 'Alpha Phase (Brightness)', stateKey: 'alphaPhase', target: TARGETS.alphaPhase },
                   { label: 'Beta Frequency (Contrast)', stateKey: 'betaFreq', target: TARGETS.betaFreq },
                   { label: 'Gamma Resonance (Hue)', stateKey: 'gammaRes', target: TARGETS.gammaRes },
                   { label: 'Sigma Wavelength (Noise)', stateKey: 'sigmaWave', target: TARGETS.sigmaWave }
                ].map(slider => (
                   <div key={slider.stateKey}>
                      <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                         <span>{slider.label}</span>
                         <span className={Math.abs(filters[slider.stateKey] - slider.target) <= TOLERANCE ? 'text-indigo-400 font-bold drop-shadow-[0_0_5px_rgba(99,102,241,0.5)]' : ''}>
                           {filters[slider.stateKey]}%
                         </span>
                      </div>
                      <input 
                         type="range" min="0" max="200" 
                         value={filters[slider.stateKey]}
                         onChange={(e) => setFilters(prev => ({...prev, [slider.stateKey]: parseInt(e.target.value)}))}
                         className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 shadow-[0_0_10px_#6366f1]"
                      />
                   </div>
                ))}
              </div>
            </div>

            <button onClick={() => setShowHintModal(true)} className={`bg-indigo-900/20 border rounded-xl p-4 flex items-center justify-center gap-3 group transition-all shadow-[0_0_20px_rgba(99,102,241,0.1)] ${hintStage > 0 ? 'border-indigo-400 bg-indigo-900/40' : 'border-indigo-500/40 hover:bg-indigo-900/30'}`}>
              <Zap className={`w-4 h-4 transition-colors ${hintStage > 0 ? 'text-indigo-400 fill-indigo-400' : 'text-indigo-400'}`} />
              <span className="text-xs font-black text-indigo-200 uppercase tracking-widest">💡 MINTA HINT BOS ({hintStage}/3)</span>
            </button>
          </div>

          {/* RIGHT SIDE: STEGANOGRAPHY VIEW & FLAG INPUT */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            
            {/* NOISE / IMAGE SIMULATOR CONTAINER */}
            <div className="relative flex-1 bg-black border border-indigo-500/20 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center justify-center min-h-[300px]">
               {/* Visual Glitch Effects controlled by sliders to give a fake CSS steganography feel */}
               <div 
                  className="absolute inset-0 opacity-80 pointer-events-none mix-blend-screen transition-all duration-300"
                  style={{
                    filter: `brightness(${filters.alphaPhase}%) contrast(${filters.betaFreq}%) hue-rotate(${filters.gammaRes}deg) saturate(${filters.sigmaWave}%)`
                  }}
               >
                  {/* Generate some background repeating noise via CSS gradient */}
                  <div className="w-full h-full" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #1e1b4b 25%, transparent 25%, transparent 75%, #1e1b4b 75%, #1e1b4b), repeating-linear-gradient(45deg, #1e1b4b 25%, #0f172a 25%, #0f172a 75%, #1e1b4b 75%, #1e1b4b)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }}></div>
               </div>

               {/* The encoded text */}
               <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8 text-center font-bold tracking-[0.8em] md:text-2xl text-xl break-all">
                  
                  {isCompleteMatch && (
                     <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute -top-10 bg-indigo-500 text-black text-[10px] tracking-widest px-4 py-1 rounded-full uppercase font-black mb-10 shadow-[0_0_20px_#6366f1]">
                       DECRYPTION 100% MATCH
                     </motion.div>
                  )}

                  <span className={`transition-all duration-75 text-center block ${isCompleteMatch ? 'text-indigo-400 drop-shadow-[0_0_15px_#6366f1]' : 'text-indigo-900/30 blur-[2px]'}`}>
                     {renderedText}
                  </span>
               </div>

               {/* Scanlines Effect */}
               <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-70" />
            </div>

            {/* FLAG INPUT BOX */}
            <div className={`bg-gray-950/80 border rounded-2xl p-6 relative overflow-hidden transition-all duration-500 ${status === 'wrong' ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]' : 'border-indigo-500/30'}`}>
              <div className="text-[10px] font-black text-gray-500 tracking-[0.3em] uppercase mb-4 flex justify-between">
                <span>TERMINAL_INPUT</span>
                {status === 'wrong' && <span className="text-red-500 animate-pulse">FLAG_INVALID</span>}
                {attempts.length > 0 && <span>ATTEMPTS: {attempts.length}</span>}
              </div>
              
              <form onSubmit={verifyFlag} className="flex gap-4">
                <div className="flex-1 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500 font-bold">~#</span>
                  <input
                    type="text"
                    value={flagInput}
                    onChange={(e) => setFlagInput(e.target.value)}
                    placeholder="Masukkan flag (contoh: CTF{...})"
                    className={`w-full bg-gray-900 border ${status === 'wrong' ? 'border-red-500/50 text-red-100' : 'border-indigo-500/20 text-indigo-100 focus:border-indigo-400'} rounded-xl py-4 pl-12 pr-4 outline-none font-mono text-sm tracking-wider transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)]`}
                  />
                </div>
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 rounded-xl font-black tracking-widest uppercase transition-all flex items-center gap-2 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                  SUBMIT <Check className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-700">
           <div className="flex items-center gap-4 text-[9px] font-black tracking-widest">
              <span className="text-indigo-500/50">{" > "} SYSTEM: OPERATIONAL</span>
              <span className="text-gray-800">//</span>
              <span>MODE: ACAK</span>
              <span className="text-gray-800">//</span>
              <span>LEVEL: 7</span>
           </div>
           <div className="text-[8px] font-bold uppercase tracking-tighter italic opacity-50">-- CORE_GRID_ESTABLISHED // DATA_UNCOVERED --</div>
        </div>

      </div>

      {/* MODALS */}
      <AnimatePresence>
        {showHintModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowHintModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-gray-900 border border-indigo-500/30 rounded-3xl p-8 max-w-lg w-full shadow-[0_0_50px_rgba(99,102,241,0.2)] overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500" />
               <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-1">INTEL_RECOVERY_HUB</h2>
                    <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Sector 7: Steganography Analysis</p>
                  </div>
                  <button onClick={() => setShowHintModal(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
               </div>

               <div className="space-y-4 mb-8">
                  {[
                    { depth: 1, label: "ANALYZING_SPECTRUM", content: `<span class="text-purple-300 font-black block mb-2">💡 Apa itu Steganografi?</span><span class="text-gray-400 block normal-case not-italic">Seni menyembunyikan pesan di dalam media. Gunakan spectrum tuner di kiri untuk memfilter layer noise digital. Pesan rahasia akan muncul perlahan jika kalibrasi warnanya tepat.</span>` },
                    { depth: 2, label: "CALIBRATING_FREQUENCY", content: "Perhatikan angka persentase pada panel tuner di kiri. Jika angka tersebut sudah mendekati nilai target yang tepat, maka angkanya akan berubah warna menjadi <span class='text-indigo-400 font-bold'>Indigo Glow</span>. Pastikan keempat tuner menyala secara bersamaan." },
                    { depth: 3, label: "MASTER_OVERRIDE", content: "Intel dikonfirmasi. Berikut adalah nilai kalibrasi yang tepat untuk mengungkap flag: <span class='text-indigo-400 font-mono font-black'>ALPHA: 85</span>, <span class='text-indigo-400 font-mono font-black'>BETA: 42</span>, <span class='text-indigo-400 font-mono font-black'>GAMMA: 175</span>, <span class='text-indigo-400 font-mono font-black'>SIGMA: 99</span>." }
                  ].map((h, i) => (
                    <div key={i} className={`p-4 rounded-2xl border transition-all ${hintStage >= h.depth ? 'bg-indigo-500/10 border-indigo-500/40 text-gray-200' : 'bg-black/40 border-white/5 text-gray-600'}`}>
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-black tracking-widest uppercase">{h.label}</span>
                          {hintStage >= h.depth ? <Check className="w-3 h-3 text-indigo-500" /> : <Lock className="w-3 h-3 text-gray-700" />}
                       </div>
                       {hintStage >= h.depth ? (
                         <p className="text-xs leading-relaxed italic" dangerouslySetInnerHTML={{ __html: h.content }} />
                       ) : (
                         <button onClick={() => unlockHintStage(h.depth)} className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all">UNLOCK INTEL DEPTH {h.depth} (-1 ⚡)</button>
                       )}
                    </div>
                  ))}
               </div>
               
               <p className="text-[8px] text-center text-gray-700 uppercase font-bold tracking-[0.2em]">-- WARNING: Intel recovery will reduce efficiency rank --</p>
            </motion.div>
          </div>
        )}

        {showExitModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowExitModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="relative bg-gray-900 border border-indigo-500/30 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
                <ShieldAlert className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
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

export default Level7;
