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
  Cpu,
  Database,
  Terminal,
  Send,
  AlertTriangle,
  Copy,
  Check
} from 'lucide-react';

/* 
   TRAP_FLAG: <!-- CTF{MEMORY_DUMP_TRAP_7070} -->
*/

const ForensicsLevel9 = () => {
  /* 
     TRAP_FLAG: <!-- CTF{MEMORY_HTML_TRAP_7070} -->
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
  const [searchTerm, setSearchTerm] = useState('');

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
    const correctFlag = atob('Q1RGe1YwbDR0MWwzX00zbTByeV9MMzRrfQ==');
    const decoyFlags = [atob('Q1RGe1YwbDR0MWwzX0ZBSzVfOTAxMn0=')]; // Decoy
    
    const cleanFlag = flag.trim();

    if (cleanFlag === correctFlag) {
      setStatus('success');
      setIsPaused(true);
      saveProgress(1 + (time <= 480 ? 1 : 0) + (!hintUsed ? 1 : 0));
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
    stats[9] = { stars: Math.max(stats[9]?.stars || 0, stars), bestTime: Math.min(stats[9]?.bestTime || 999999, time) };
    localStorage.setItem('ctf_forensics_stats', JSON.stringify(stats));
  };

  const memoryStrings = [
    "C:\\Windows\\System32\\svchost.exe",
    "cmd.exe /c start notepad.exe",
    "Administrator:Pass123!@#",
    "https://internal-vault.local/api/sync",
    "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    "ERROR: Could not find memory offset 0x0042f1",
    "CTF{V0l4t1l3_M3m0ry_L34k}",
    "DEBUG: Heap allocation at 0x7ffffff",
    "System_Idle_Process",
    "Global\\TermSrvReadyEvent",
    "Software\\Microsoft\\Windows\\CurrentVersion\\Run",
    "TEMP_PATH: C:\\Users\\Public\\Documents\\tmp.bak",
    "Key: 0xDEADBEEF",
    "Status: Mission_Success_Wait_For_Instruction"
  ];

  const filteredStrings = memoryStrings.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#020617] text-white font-mono p-4 md:p-8 relative overflow-hidden forensics-page-theme">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-between items-start mb-8 relative">
          <div className="flex gap-4 items-start">
            <button onClick={() => setShowExitModal(true)} className="mt-1 w-10 h-10 flex items-center justify-center bg-gray-900 border border-orange-500/30 rounded-xl transition-all group hover:bg-orange-500/20 active:scale-95"><ChevronLeft className="w-5 h-5 text-gray-400" /></button>
            <div>
              <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-[0_0_8px_#f97316]" /><span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-400/80">SECTOR: MEMORY_VOLATILITY</span></div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">LEVEL 9: <span className="text-orange-500 drop-shadow-[0_0_10px_#f97316]">VOLATILE MEMORY</span></h1>
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
               <h3 className="text-xl font-black italic tracking-tighter uppercase text-white mb-3">OBJECT: MEMDUMP.RAW</h3>
               <p className="text-[11px] text-gray-400 font-bold leading-relaxed mb-6 italic uppercase tracking-wider">
                  Intelijen melakukan dump pada RAM server saat malware sedang berjalan. Data di memori bersifat volatil dan seringkali menyimpan kredensial atau flag dalam bentuk teks biasa sebelum terhapus.
               </p>
               <button onClick={() => { setShowHint(!showHint); if (!showHint) setHintUsed(true); }} className={`w-full py-4 border rounded-xl flex items-center justify-center gap-2.5 transition-all uppercase text-[10px] font-black tracking-widest ${showHint ? 'bg-orange-500/20 border-orange-500 text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.1)]' : 'bg-white/5 border-white/10 text-gray-500 hover:text-orange-400'}`}><Zap className="w-3.5 h-3.5" /><span>{showHint ? 'HINT_AKTIF' : 'MINTA_HINT'}</span></button>
               {showHint && (
                 <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-3 p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-bold text-gray-400 italic tracking-wider leading-relaxed space-y-2">
                    <p className="text-orange-300 uppercase font-black">💡 Pencarian Memori:</p>
                    <p>Strings yang ada di RAM biasanya sangat banyak dan berantakan. Gunakan teknik pencarian kata kunci (**grep**) untuk menyaring data yang relevan seperti format flag "CTF".</p>
                 </motion.div>
               )}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            <div className="flex-1 bg-gray-950 border-2 border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col relative group min-h-[450px]">
               <div className="h-12 bg-gray-900 border-b border-white/5 flex items-center px-6 gap-3">
                  <Database className="w-4 h-4 text-orange-500" />
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Volatility_RAM_Analyzer v3b</span>
               </div>
               
               <div className="flex-1 flex flex-col bg-[#05080F] font-mono p-6">
                  {/* Search bar for strings */}
                  <div className="flex items-center gap-3 bg-black/60 border border-white/10 rounded-xl px-4 py-3 mb-6 focus-within:border-orange-500/50 transition-all">
                     <Terminal className="w-4 h-4 text-orange-500/40" />
                     <input 
                        type="text" 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Cari string (misal: 'CTF', 'bin', 'root')..." 
                        className="bg-transparent border-none outline-none text-xs text-orange-400 w-full placeholder:text-gray-800 tracking-widest uppercase font-black"
                     />
                  </div>
                  
                  {/* Strings List */}
                  <div className="flex-1 overflow-y-auto custom-scrollbar border border-white/5 rounded-xl bg-black/40 p-4 space-y-3">
                     <div className="text-[8px] font-black text-gray-700 uppercase tracking-[0.4em] mb-4 border-b border-white/5 pb-2">RAW_MEMORY_STRINGS_OUTPUT</div>
                     {filteredStrings.length > 0 ? (
                        filteredStrings.map((str, i) => (
                           <motion.div 
                              key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                              className="flex items-center gap-4 group/item py-2 px-3 hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-white/5 relative"
                           >
                              <span className="text-gray-700 text-[9px] w-6">{(i+1).toString().padStart(2, '0')}</span>
                              <span className="text-orange-200/80 font-mono text-[11px] select-all cursor-crosshair hover:text-orange-400 transition-colors break-all leading-relaxed">
                                 {str}
                              </span>
                              {/* Hidden stub trap on specific index */}
                              {str.includes('CTF{') && <div className="absolute top-0 right-0 opacity-0 select-all text-[1px] pointer-events-none">{"CTF{MEMORY_STUB_DECOY_909}"}</div>}
                              <ChevronLeft className="w-3 h-3 text-white/0 group-hover/item:text-orange-500/40 rotate-180 transition-all" />
                           </motion.div>
                        ))
                     ) : (
                        <div className="h-full flex items-center justify-center opacity-10 italic text-[10px] uppercase font-black tracking-widest">No matching strings found in dump</div>
                     )}
                  </div>
               </div>
            </div>

            <div className="bg-[#0A0F1D]/80 border border-orange-500/30 rounded-2xl p-6 shadow-2xl">
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 relative">
                   <div className="flex-1 relative">
                      <input type="text" value={flag} onChange={(e) => setFlag(e.target.value)} placeholder="Masukkan flag (CTF{...})" className={`w-full bg-black/40 border-2 rounded-xl py-3.5 px-6 text-xs tracking-widest text-white placeholder:text-gray-700 focus:outline-none transition-all ${status === 'wrong' ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : status === 'decoy' ? 'border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.1)]' : 'border-orange-500/20 focus:border-orange-500/50'}`} />
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
               <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className="max-w-sm w-full p-8 bg-gray-950 border border-orange-500/30 rounded-[2.5rem] shadow-[0_0_80px_rgba(249,115,22,0.3)] relative overflow-hidden">
                  <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-orange-500/20"><CheckCircle2 className="w-8 h-8 text-orange-500" /></div>
                  <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white mb-2 leading-none">MEMORY_EXTRACTED</h2>
                  <p className="text-orange-500/60 font-black tracking-[0.4em] uppercase text-[8px] mb-8 italic">Volatile_Analysis_Successful</p>
                  <button onClick={() => navigate('/ctf-arena/forensics/mudah', { state: { lastLevel: 9 } })} className="w-full py-4 bg-orange-500 text-black font-black uppercase text-[11px] tracking-[0.2em] rounded-xl shadow-lg">LANJUTKAN MISI</button>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>

      <AnimatePresence>
         {showExitModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[600] bg-black/80 backdrop-blur-sm flex justify-center items-center p-4">
               <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-gray-900 border border-orange-500/30 rounded-3xl p-10 max-w-md w-full text-center shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-orange-500" />
                  <ShieldAlert className="w-16 h-16 text-orange-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-black text-white tracking-widest uppercase mb-4 italic">ABORT ANALYSIS?</h3>
                  <p className="text-sm text-gray-400 mb-10 font-bold leading-relaxed italic uppercase tracking-wider">Anda yakin ingin keluar? Progres investigasi RAM tidak akan disimpan.</p>
                  <div className="flex gap-4">
                    <button onClick={() => setShowExitModal(false)} className="flex-1 py-4 bg-gray-800 text-white font-bold rounded-2xl border border-white/5 hover:bg-gray-700 transition-colors uppercase tracking-widest text-xs">Batalkan</button>
                    <button onClick={() => navigate('/ctf-arena/forensics/mudah')} className="flex-1 py-4 bg-red-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-red-500 transition-colors">Keluar</button>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

export default ForensicsLevel9;
