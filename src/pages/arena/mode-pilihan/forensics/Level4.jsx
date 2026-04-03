import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Zap, 
  Target, 
  ShieldAlert, 
  CheckCircle2, 
  Activity,
  X,
  XCircle,
  Eye,
  EyeOff,
  Layers,
  Send,
  AlertTriangle,
  Copy,
  Check
} from 'lucide-react';

/* 
   TRAP_FLAG: <!-- CTF{STEGO_FILTER_TRAP_2020} -->
*/

const ForensicsLevel4 = () => {
  /* 
     TRAP_FLAG: <!-- CTF{PIXEL_HTML_TRAP_2020} -->
  */

  const navigate = useNavigate();
  const [flag, setFlag] = useState('');
  const [status, setStatus] = useState('idle');
  const [showHint, setShowHint] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [attempts, setAttempts] = useState([]);
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  // Challenge State
  const [lsbActive, setLsbActive] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctFlag = atob('Q1RGe0w1Ql9QMXgzbF9IdU5udGVyXzkyfQ==');
    const decoyFlags = [atob('Q1RGe0w1Ql9GQUswX1BMWTM0Ul83NzF9')]; // Decoy
    
    const cleanFlag = flag.trim();

    if (cleanFlag === correctFlag) {
      setStatus('success');
      setIsPaused(true);
      saveProgress(1 + (time <= 300 ? 1 : 0) + (!hintUsed ? 1 : 0));
    } else if (decoyFlags.includes(cleanFlag)) {
      setStatus('decoy');
      setAttempts([...attempts, cleanFlag]);
      setTimeout(() => setStatus('idle'), 3000);
    } else {
      setStatus('wrong');
      setAttempts([...attempts, cleanFlag]);
      setTimeout(() => setStatus('idle'), 3000);

    }
  };

  const saveProgress = (stars) => {
    const saved = localStorage.getItem('ctf_forensics_stats');
    const stats = saved ? JSON.parse(saved) : {};
    stats[4] = { stars: Math.max(stats[4]?.stars || 0, stars), bestTime: Math.min(stats[4]?.bestTime || 999999, time) };
    localStorage.setItem('ctf_forensics_stats', JSON.stringify(stats));
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-mono p-4 md:p-8 relative overflow-hidden forensics-page-theme">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-between items-start mb-8 relative">
          <div className="flex gap-4 items-start">
            <button onClick={() => setShowExitModal(true)} className="mt-1 w-10 h-10 flex items-center justify-center bg-gray-900 border border-orange-500/30 rounded-xl transition-all group hover:bg-orange-500/20"><ChevronLeft className="w-5 h-5 text-gray-400" /></button>
            <div>
              <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-[0_0_8px_#f97316]" /><span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-400/80">SECTOR: STEGO_ANALYSIS</span></div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">LEVEL 4: <span className="text-orange-500 drop-shadow-[0_0_10px_#f97316]">HIDDEN PIXELS</span></h1>
            </div>
          </div>
          <div className="text-right">
             <div className="text-[10px] font-black text-orange-500/30 tracking-[0.3em] uppercase mb-1">ELAPSED_TIME</div>
             <div className="text-4xl font-black italic tracking-tighter text-orange-500">{formatTime(time)}</div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-gray-950/50 border border-orange-500/30 rounded-2xl p-6 relative overflow-hidden group shadow-2xl">
               <div className="absolute top-0 left-0 w-1 h-full bg-orange-500 shadow-[0_0_15px_#f97316]" />
               <h3 className="text-xl font-black italic tracking-tighter uppercase text-white mb-3">OBJECT: EVIDENCE.PNG</h3>
               <p className="text-[11px] text-gray-400 font-bold leading-relaxed mb-6 italic uppercase tracking-wider">
                  Intelijen menemukan sebuah gambar yang dicurigai memiliki data tersembunyi di pixel-pixelnya menggunakan teknik **LSB (Least Significant Bit)**. 
                  Gunakan filter analisis untuk membongkarnya.
               </p>
               <button onClick={() => { setShowHint(!showHint); if (!showHint) setHintUsed(true); }} className={`w-full py-4 border rounded-xl flex items-center justify-center gap-2.5 transition-all uppercase text-[10px] font-black tracking-widest ${showHint ? 'bg-orange-500/20 border-orange-500 text-orange-400' : 'bg-white/5 border-white/10 text-gray-500 hover:text-orange-400'}`}><Zap className="w-3.5 h-3.5" /><span>{showHint ? 'HINT_AKTIF' : 'MINTA_HINT'}</span></button>
               {showHint && (
                 <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-3 p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-bold text-gray-400 italic tracking-wider leading-relaxed">
                    <p className="text-orange-300 uppercase font-black mb-2">💡 Apa itu LSB Steganography?</p>
                    <p>Warna pixel di layar dibentuk dari nilai biner (Red, Green, Blue). LSB adalah metode menyisipkan data pada bit terakhir (paling tidak signifikan) dari nilai warna tersebut. Mata manusia tidak bisa melihat perbedaannya, tapi teknik filter bisa.</p>
                 </motion.div>
               )}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            <div className="flex-1 bg-gray-950 border-2 border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col relative group min-h-[400px]">
               <div className="h-12 bg-gray-900 border-b border-white/5 flex items-center px-6 gap-3">
                  <Layers className="w-4 h-4 text-orange-500" />
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Stego_Visualizer v4.0</span>
                  <div className="ml-auto flex gap-3">
                     <button onClick={() => setLsbActive(!lsbActive)} className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all border ${lsbActive ? 'bg-orange-500 text-black border-orange-400' : 'bg-white/5 border-white/10 text-gray-500'}`}>
                        {lsbActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span className="text-[9px] font-black uppercase tracking-widest">LSB Filter</span>
                     </button>
                  </div>
               </div>
               
               <div className="flex-1 relative bg-[#05080F] flex items-center justify-center p-12">
                  <div className="relative w-full max-w-sm aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                     {/* Base Image */}
                     <div className={`absolute inset-0 transition-opacity duration-500 ${lsbActive ? 'opacity-20' : 'opacity-100'}`} 
                          style={{ background: 'linear-gradient(45deg, #1e293b, #0f172a)' }}>
                        <div className="absolute inset-0 flex items-center justify-center opacity-30">
                           <div className="w-full h-full bg-[radial-gradient(circle_at_center,_#f97316_0.5px,_transparent_1.5px)] bg-[size:12px_12px]" />
                        </div>
                     </div>
                     
                     {/* LSB Discovery Layer */}
                     <AnimatePresence>
                        {lsbActive ? (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full text-center p-4">
                            <Activity className="w-8 h-8 text-green-400 mb-2 animate-pulse" />
                            <p className="text-green-400 font-bold tracking-widest text-[10px] mb-2 uppercase select-none">LSB DATA REVEALED</p>
                            <div className="bg-black/60 border border-green-500/30 p-3 rounded-lg relative group">
                               <div className="absolute top-0 left-0 w-full h-full opacity-0 select-all text-[1px] pointer-events-none">{"CTF{PIXEL_STUB_DECOY_404}"}</div>
                               <span className="text-white font-black select-all cursor-crosshair px-2 py-1 bg-white/5 rounded hover:bg-white/10 transition-colors">CTF{L5B_P1x3l_HuNnter_92}</span>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black flex items-center justify-center">
                             <div className="grid grid-cols-12 grid-rows-6 w-full h-full opacity-40">
                                {[...Array(72)].map((_, i) => (
                                   <div key={i} className="border-[0.5px] border-orange-500/10" />
                                ))}
                             </div>
                             <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="absolute text-orange-500 font-bold italic tracking-[0.5em] text-xs uppercase animate-pulse flex flex-col items-center gap-2">
                                <span className="text-[8px] text-white/20 select-none not-italic">Data_Bit_Extracted:</span>
                                <span className="select-all px-2 py-1 bg-orange-500/10 rounded border border-orange-500/30 cursor-pointer">
                                   CTF&#123;L5B_P1x3l_HuNnter_92&#125;
                                </span>
                             </motion.div>
                             {/* Decoy in source-like layer */}
                             <div className="absolute top-2 left-2 text-[8px] text-red-500/5 select-none font-black italic">VAR_FLAG: {"CTF{PIXEL_TRAP_091}"}</div>
                          </motion.div>
                        )}
                     </AnimatePresence>
                     
                     <div className="absolute bottom-4 left-4 p-2 bg-black/60 border border-white/5 rounded-lg text-[8px] font-black uppercase tracking-widest text-gray-500 backdrop-blur-md">
                        FILE: EVIDENCE_04.PNG // RESOLUTION: 1920x1080
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-[#0A0F1D]/80 border border-orange-500/30 rounded-2xl p-6 shadow-2xl">
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 relative">
                   <div className="flex-1 relative">
                      <input type="text" value={flag} onChange={(e) => setFlag(e.target.value)} placeholder="Masukkan flag (CTF{...})" className={`w-full bg-black/40 border-2 rounded-xl py-3.5 px-6 text-xs tracking-widest text-white focus:outline-none transition-all ${status === 'wrong' ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : status === 'decoy' ? 'border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.1)]' : 'border-orange-500/20 focus:border-orange-500/50'}`} />
                      <AnimatePresence>
                         {status === 'decoy' && <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-3 -right-3 bg-yellow-500 text-[8px] font-black italic px-3 py-1 rounded-full text-black shadow-lg uppercase whitespace-nowrap">DECOY DETECTED</motion.div>}
                         {status === 'wrong' && (
                            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-3 -right-3 bg-red-500 text-[8px] font-black italic px-3 py-1 rounded-full text-white shadow-lg uppercase whitespace-nowrap">
                               WRONG FLAG
                            </motion.div>
                         )}
                      </AnimatePresence>
                   </div>
                   <button type="submit" className="bg-orange-500 hover:bg-orange-400 text-black font-black uppercase text-[10px] tracking-[0.2em] px-8 py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"><span>SUBMIT</span><Send className="w-3.5 h-3.5" /></button>
                </form>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
         {status === 'success' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[500] bg-[#020617]/90 backdrop-blur-md flex flex-col justify-center items-center p-6 text-center">
               <div className="absolute inset-0 pointer-events-none overflow-hidden">
                 {[...Array(20)].map((_, i) => (
                   <motion.div key={`op-${i}`} style={{ left: `${(i * 5 + 2) % 94}%`, position: 'absolute', bottom: '-4px' }} className="w-2 h-2 bg-orange-400 rounded-full shadow-[0_0_10px_#f97316]" initial={{ opacity: 0, y: 0 }} animate={{ opacity: [0, 1, 0], y: '-100vh' }} transition={{ duration: 4 + (i % 6) * 0.7, delay: i * 0.25, repeat: Infinity }} />
                 ))}
               </div>
               <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className="max-w-sm w-full p-8 bg-gray-950 border border-orange-500/30 rounded-[2.5rem] shadow-[0_0_80px_rgba(249,115,22,0.3)] relative">
                  <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="w-8 h-8 text-orange-500" /></div>
                  <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white mb-2 leading-none">PIXEL_REVEALED</h2>
                  <p className="text-orange-500/60 font-black tracking-[0.4em] uppercase text-[8px] mb-8 italic">LSB_Analysis_Success</p>
                  <div className="bg-black/40 rounded-2xl p-5 mb-8 text-left space-y-2">
                     <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5"><span className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-none italic">Execution_Time</span><span className="text-xl font-black italic text-orange-400 leading-none">{formatTime(time)}</span></div>
                  </div>
                  <button onClick={() => navigate('/ctf-arena/forensics/mudah', { state: { lastLevel: 4 } })} className="w-full py-4 bg-orange-500 text-black font-black uppercase text-[11px] tracking-[0.2em] rounded-xl shadow-lg">LANJUTKAN MISI</button>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

export default ForensicsLevel4;
