import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Terminal, 
  Zap, 
  Target, 
  ShieldAlert, 
  CheckCircle2, 
  Activity,
  X,
  XCircle,
  Wrench,
  FileWarning,
  FileCheck,
  Send,
  AlertTriangle,
  Copy,
  Check
} from 'lucide-react';

/* 
   TRAP_FLAG: <!-- CTF{REPAIR_TOOL_TRAP_1010} -->
*/

const ForensicsLevel3 = () => {
  /* 
     TRAP_FLAG: <!-- CTF{REPAIR_HTML_TRAP_1010} -->
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
  const [isRepaired, setIsRepaired] = useState(false);

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
    const correctFlag = atob('Q1RGe000ZzFjX0J5dDM1XzRyM19QaDBueX0=');
    const decoyFlags = [atob('Q1RGe000ZzFjX0J5dDM1X0ZBSzVfOTkxfQ==')]; // Decoy
    
    const cleanFlag = flag.trim();

    if (cleanFlag === correctFlag) {
      setStatus('success');
      setIsPaused(true);
      saveProgress(1 + (time <= 240 ? 1 : 0) + (!hintUsed ? 1 : 0));
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
    stats[3] = { stars: Math.max(stats[3]?.stars || 0, stars), bestTime: Math.min(stats[3]?.bestTime || 999999, time) };
    localStorage.setItem('ctf_forensics_stats', JSON.stringify(stats));
  };

  const corruptedHex = [
    { addr: '00000000', hex: '00 00 00 00', desc: '?? ?? ?? ?? (Corrupted Header)' },
    { addr: '00000004', hex: '0d 0a 1a 0a', desc: '.. .. .. .. (Valid Structure)' },
    { addr: '00000008', hex: '00 00 00 0d', desc: '.... .... (IHDR Length)' },
    { addr: '0000000c', hex: '49 48 44 52', desc: 'I H D R (Chunk Type)' },
  ];

  const repairedHex = [
    { addr: '00000000', hex: '89 50 4e 47', desc: '. P N G (Fixed Signature!)' },
    { addr: '00000004', hex: '0d 0a 1a 0a', desc: '.. .. .. ..' },
    { addr: '00000008', hex: '00 00 00 0d', desc: '.... ....' },
    { addr: '0000000c', hex: '49 48 44 52', desc: 'I H D R' },
  ];

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
              <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-[0_0_8px_#f97316]" /><span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-400/80">SECTOR: FILE_INTEGRITY</span></div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">LEVEL 3: <span className="text-orange-500 drop-shadow-[0_0_10px_#f97316]">MAGIC REPAIR</span></h1>
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
               <h3 className="text-xl font-black italic tracking-tighter uppercase text-white mb-3">OBJECT: CORRUPTED.PNG</h3>
               <p className="text-[11px] text-gray-400 font-bold leading-relaxed mb-6 italic uppercase tracking-wider">
                  Sebuah file PNG penting tidak bisa dibuka karena header-nya telah dihapus oleh malware. 
                  Gunakan teknik **Magic Bytes Repair** untuk mengembalikan identitas file tersebut.
               </p>
               <button onClick={() => { setShowHint(!showHint); if (!showHint) setHintUsed(true); }} className={`w-full py-4 border rounded-xl flex items-center justify-center gap-2.5 transition-all uppercase text-[10px] font-black tracking-widest ${showHint ? 'bg-orange-500/20 border-orange-500 text-orange-400' : 'bg-white/5 border-white/10 text-gray-500 hover:text-orange-400'}`}><Zap className="w-3.5 h-3.5" /><span>{showHint ? 'HINT_AKTIF' : 'MINTA_HINT'}</span></button>
               {showHint && (
                 <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-3 p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-bold text-gray-400 italic tracking-wider leading-relaxed">
                    <p className="text-orange-300 uppercase font-black mb-2">💡 Apa itu Magic Bytes?</p>
                    <p>Browser dan OS mengenali tipe file bukan hanya dari ekstensi, tapi dari beberapa byte pertama di awal file (Magic Bytes). File PNG selalu diawali dengan 8 byte spesifik: **89 50 4E 47 0D 0A 1A 0A**.</p>
                 </motion.div>
               )}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            <div className="flex-1 bg-gray-950 border-2 border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col relative group">
               <div className="h-12 bg-gray-900 border-b border-white/5 flex items-center px-6 gap-3"><Wrench className="w-4 h-4 text-orange-500" /><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Hex_Repair_Toolkit v1.0</span></div>
               <div className="flex-1 p-8 bg-[#020617] flex flex-col items-center justify-center gap-10">
                  <div className="w-full max-w-md bg-black/40 border border-white/5 rounded-2xl p-6 font-mono text-[11px] space-y-4">
                     <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <div className="flex items-center gap-3">
                           {isRepaired ? <FileCheck className="w-5 h-5 text-green-500" /> : <FileWarning className="w-5 h-5 text-red-500 animate-pulse" />}
                           <span className="font-black text-gray-400 uppercase tracking-widest">{isRepaired ? 'FILE_REPAIRED' : 'CORRUPTED_SIGNATURE'}</span>
                        </div>
                        <span className="text-orange-500/40">SIZE: 1,024 KB</span>
                     </div>
                     
                     <div className="space-y-1.5 opacity-80">
                          {(isRepaired ? repairedHex : corruptedHex).map((row, i) => (
                            <React.Fragment key={i}>
                              <div className="text-gray-600 font-mono text-[10px]">{row.addr}</div>
                              <div className={`${isRepaired ? 'text-green-400' : 'text-red-400'} font-bold select-all cursor-crosshair hover:bg-orange-500/10 px-1 rounded transition-colors`}>{row.hex}</div>
                              <div className="text-gray-400 text-[10px] select-all cursor-crosshair hover:bg-orange-500/10 px-1 rounded transition-colors whitespace-nowrap overflow-hidden relative">
                                 {row.desc}
                                 {/* Hidden stub trap */}
                                 {i === 2 && <div className="absolute top-0 right-0 opacity-0 select-all text-[1px] pointer-events-none">{"CTF{REPAIR_STUB_DECOY_303}"}</div>}
                              </div>
                            </React.Fragment>
                          ))}

                        <div className="text-gray-900">... rest of binary data ...</div>
                     </div>
                  </div>

                  {!isRepaired ? (
                    <button onClick={() => setIsRepaired(true)} className="flex items-center gap-3 bg-orange-500 hover:bg-orange-400 text-black px-10 py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(249,115,22,0.2)] active:scale-95 group">
                       <Wrench className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                       <span>Inject Magic Bytes</span>
                    </button>
                  ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-4">
                       <div className="w-full max-w-sm p-6 bg-green-500/10 border border-green-500/30 rounded-2xl text-center">
                          <p className="text-[9px] text-green-500 font-bold uppercase tracking-[0.3em] mb-3">File Restored Successfully!</p>
                          <p className="text-xs font-black text-white italic break-all tracking-widest transition-colors hover:text-green-400 flex flex-col items-center gap-2">
                             <span className="text-[8px] text-white/20 select-none uppercase tracking-widest not-italic">Data_Found:</span>
                             <span className="select-all px-2 py-1 bg-green-500/10 rounded border border-green-500/20 cursor-pointer" title="Double click to copy">
                                CTF&#123;M4g1c_Byt35_4r3_Ph0ny&#125;
                             </span>
                          </p>
                          {/* Decoy trap in UI */}
                          <p className="mt-4 text-[8px] text-red-500/10 select-none">DEBUG_ENV: {"CTF{WRENCH_DECOY_9912}"}</p>
                       </div>
                    </motion.div>
                  )}
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
                  <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white mb-2 leading-none">SIGNATURE_RESTORED</h2>
                  <p className="text-orange-500/60 font-black tracking-[0.4em] uppercase text-[8px] mb-8 italic">Magic_Bytes_Injected</p>
                  <div className="bg-black/40 rounded-2xl p-5 mb-8 text-left space-y-2">
                     <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5"><span className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-none italic">Execution_Time</span><span className="text-xl font-black italic text-orange-400 leading-none">{formatTime(time)}</span></div>
                  </div>
                  <button onClick={() => navigate('/ctf-arena/forensics/mudah', { state: { lastLevel: 3 } })} className="w-full py-4 bg-orange-500 text-black font-black uppercase text-[11px] tracking-[0.2em] rounded-xl shadow-lg">LANJUTKAN MISI</button>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>

      <AnimatePresence>
         {showExitModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[600] bg-black/80 backdrop-blur-md flex justify-center items-center p-4">
               <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-gray-900 border border-orange-500/30 rounded-3xl p-10 max-w-md w-full text-center shadow-2xl">
                  <ShieldAlert className="w-12 h-12 text-orange-500 mx-auto mb-6" />
                  <h3 className="text-xl font-black text-white tracking-widest uppercase mb-4 italic">ABORT ANALYSIS?</h3>
                  <div className="flex gap-4">
                    <button onClick={() => setShowExitModal(false)} className="flex-1 py-4 bg-gray-800 text-white font-bold rounded-2xl border border-white/5 text-xs uppercase">Batalkan</button>
                    <button onClick={() => navigate('/ctf-arena/forensics/mudah')} className="flex-1 py-4 bg-red-600 text-white font-black uppercase text-xs rounded-2xl">Keluar</button>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

export default ForensicsLevel3;
