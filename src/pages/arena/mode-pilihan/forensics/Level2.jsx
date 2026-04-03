import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Terminal,
  Zap,
  Target,
  Search,
  ShieldAlert,
  CheckCircle2,
  Activity,
  X,
  XCircle,
  FileCode,
  Binary,
  Send,
  AlertTriangle,
  Copy,
  Check
} from 'lucide-react';

/* 
   <!-- CTF{HEX_DUMP_DECOY_8821} -->
*/

const ForensicsLevel2 = () => {
  /* 
     <!-- CTF{HEX_DUMP_HTML_TRAP_8821} -->
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
    const correctFlag = atob('Q1RGezN2M3J5X0IxbjRyeV9INDVfNTdyMW5nNX0=');
    const decoyFlags = [atob('Q1RGezN2M3J5X0IxbjRyeV9UUlA0UH1=')]; // Decoy

    const cleanFlag = flag.trim();

    if (cleanFlag === correctFlag) {
      setStatus('success');
      setIsPaused(true);
      saveProgress(1 + (time <= 180 ? 1 : 0) + (!hintUsed ? 1 : 0));
    } else if (decoyFlags.includes(cleanFlag)) {
      setStatus('decoy');
      setAttempts([...attempts, cleanFlag]);
      setTimeout(() => setStatus('idle'), 3000);
    } else {
      setStatus('wrong');
      setAttempts([...attempts, cleanFlag]);
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  const saveProgress = (stars) => {
    const saved = localStorage.getItem('ctf_forensics_stats');
    const stats = saved ? JSON.parse(saved) : {};
    stats[2] = { stars: Math.max(stats[2]?.stars || 0, stars), bestTime: Math.min(stats[2]?.bestTime || 999999, time) };
    localStorage.setItem('ctf_forensics_stats', JSON.stringify(stats));
  };

  const hexData = [
    { addr: '00000000', hex: '7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00', ascii: '.ELF............' },
    { addr: '00000010', hex: '02 00 3e 00 01 00 00 00 70 10 40 00 00 00 00 00', ascii: '..>.....p.@.....' },
    { addr: '00000020', hex: '40 00 00 00 00 00 00 00 08 30 00 00 00 00 00 00', ascii: '@........0......' },
    { addr: '00000030', hex: '00 00 00 00 40 00 38 00 09 00 40 00 1e 00 1d 00', ascii: '....@.8...@.....' },
    { addr: '00000040', hex: '55 53 45 52 5f 44 45 42 55 47 3d 30 00 00 00 00', ascii: 'USER_DEBUG=0....' },
    { addr: '00000050', hex: '43 54 46 7b 33 76 33 72 79 5f 42 31 6e 34 72 79', ascii: 'CTF{3v3ry_B1n4ry' },
    { addr: '00000060', hex: '5f 48 34 35 5f 35 37 72 31 6e 67 35 7d 00 00 00', ascii: '_H45_57r1ng5}...' },
    { addr: '00000070', hex: '01 1b 03 3b 00 00 00 00 05 00 00 00 00 00 00 00', ascii: '...;............' },
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
              <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-[0_0_8px_#f97316]" /><span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-400/80">SECTOR: BINARY_INSPECTION</span></div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">LEVEL 2: <span className="text-orange-500 drop-shadow-[0_0_10px_#f97316]">BINARY STRINGS</span></h1>
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
              <h3 className="text-xl font-black italic tracking-tighter uppercase text-white mb-3">OBJECT: DUMP.BIN</h3>
              <p className="text-[11px] text-gray-400 font-bold leading-relaxed mb-6 italic uppercase tracking-wider">
                Sebuah file biner misterius ditemukan di server musuh. Analis memperkirakan ada teks rahasia yang tidak terenkripsi di dalamnya.
                Coba periksa representasi ASCII dari file ini.
              </p>
              <button onClick={() => { setShowHint(!showHint); if (!showHint) setHintUsed(true); }} className={`w-full py-4 border rounded-xl flex items-center justify-center gap-2.5 transition-all uppercase text-[10px] font-black tracking-widest ${showHint ? 'bg-orange-500/20 border-orange-500 text-orange-400' : 'bg-white/5 border-white/10 text-gray-500 hover:text-orange-400'}`}><Zap className="w-3.5 h-3.5" /><span>{showHint ? 'HINT_AKTIF' : 'MINTA_HINT'}</span></button>
              {showHint && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-3 p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-bold text-gray-400 italic tracking-wider leading-relaxed">
                  <p className="text-orange-300 uppercase font-black mb-2">💡 Tips Pencarian String:</p>
                  <p>Programmer sering melakukan "hardcode" informasi sensitif. Gunakan tools seperti **strings** pada Linux untuk melihat teks yang bisa dibaca manusia di dalam file biner. Perhatikan kolom sebelah kanan (ASCII View) pada Hex Dump.</p>
                </motion.div>
              )}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            <div className="flex-1 bg-gray-950 border-2 border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col relative group">
              <div className="h-12 bg-gray-900 border-b border-white/5 flex items-center px-6 gap-3"><Binary className="w-4 h-4 text-orange-500" /><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Hex_Editor_Express v2.1</span></div>
              <div className="flex-1 p-8 bg-[#020617] font-mono text-[12px] overflow-auto">
                <div className="grid grid-cols-[auto_1fr_auto] gap-x-8 gap-y-1">
                  <div className="text-gray-600 font-bold border-b border-white/5 pb-2 uppercase text-[10px]">ADDRESS</div>
                  <div className="text-gray-600 font-bold border-b border-white/5 pb-2 uppercase text-[10px]">HEXADECIMAL_DUMP</div>
                  <div className="text-gray-600 font-bold border-b border-white/5 pb-2 uppercase text-[10px]">ASCII</div>
                  {hexData.map((row, i) => (
                    <React.Fragment key={i}>
                      <div className="text-gray-500">{row.addr}</div>
                      <div className="text-orange-400/80 select-all cursor-crosshair hover:bg-orange-500/10 px-1 rounded transition-colors">{row.hex}</div>
                      <div className="text-orange-200 select-all cursor-crosshair hover:bg-orange-500/10 px-1 rounded transition-colors whitespace-pre relative">
                        {row.ascii}
                        {/* Hidden stub trap */}
                        {i === 3 && <div className="absolute top-0 right-0 opacity-0 select-all text-[1px] pointer-events-none">{"CTF{HEX_STUB_DECOY_202}"}</div>}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#0A0F1D]/80 border border-orange-500/30 rounded-2xl p-6 shadow-2xl">
              <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 relative">
                <div className="flex-1 relative">
                  <input type="text" value={flag} onChange={(e) => setFlag(e.target.value)} placeholder="Masukkan flag (CTF{...})" className={`w-full bg-black/40 border-2 rounded-xl py-3.5 px-6 text-xs tracking-widest text-white focus:outline-none transition-all ${status === 'wrong' ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : status === 'decoy' ? 'border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.1)]' : 'border-orange-500/20 focus:border-orange-500/50'}`} />
                  <AnimatePresence>
                    {status === 'decoy' && (
                      <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-3 -right-3 bg-yellow-500 text-[8px] font-black italic px-3 py-1 rounded-full text-black shadow-lg uppercase whitespace-nowrap">
                        DECOY DETECTED
                      </motion.div>
                    )}
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
              <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white mb-2 leading-none">STRINGS_EXTRACTED</h2>
              <p className="text-orange-500/60 font-black tracking-[0.4em] uppercase text-[8px] mb-8 italic">Data_Leak_Analyzed</p>
              <div className="bg-black/40 rounded-2xl p-5 mb-8 text-left space-y-2">
                <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5"><span className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-none italic">Execution_Time</span><span className="text-xl font-black italic text-orange-400 leading-none">{formatTime(time)}</span></div>
              </div>
              <button onClick={() => navigate('/ctf-arena/forensics/mudah', { state: { lastLevel: 2 } })} className="w-full py-4 bg-orange-500 text-black font-black uppercase text-[11px] tracking-[0.2em] rounded-xl shadow-lg">LANJUTKAN MISI</button>
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

export default ForensicsLevel2;
