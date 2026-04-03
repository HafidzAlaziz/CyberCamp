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
  Archive,
  FileArchive,
  Info,
  Send,
  AlertTriangle,
  Copy,
  Check
} from 'lucide-react';

/* 
   TRAP_FLAG: <!-- CTF{ARCHIVE_META_TRAP_4040} -->
*/

const ForensicsLevel6 = () => {
  /* 
     TRAP_FLAG: <!-- CTF{ARCHIVE_HTML_TRAP_4040} -->
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
  const [selectedFile, setSelectedFile] = useState(null);

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
    const correctFlag = atob('Q1RGe1oxcF9DMG1tM250XzE1X1YxNTFibDN9');
    const decoyFlags = [atob('Q1RGe1oxcF9UUlA0UF85OTFibDN9')]; // Decoy
    
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
    stats[6] = { stars: Math.max(stats[6]?.stars || 0, stars), bestTime: Math.min(stats[6]?.bestTime || 999999, time) };
    localStorage.setItem('ctf_forensics_stats', JSON.stringify(stats));
  };

  const filesInZip = [
    { name: 'config.xml', size: '12 KB', type: 'XML Document', comment: 'General system configuration' },
    { name: 'setup.exe', size: '4,250 KB', type: 'Executable Binary', comment: 'Installer for core tools' },
    { name: 'secret_leak.txt.enc', size: '1 KB', type: 'Encrypted Text', comment: 'Flag: CTF{Z1p_C0mm3nt_15_V151bl3}' },
    { name: 'readme.md', size: '500 Bytes', type: 'Markdown File', comment: 'Instructions for use' },
    { name: 'assets/', size: '--', type: 'Directory', comment: '' },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-mono p-4 md:p-8 relative overflow-hidden forensics-page-theme">
      <div className="absolute inset-0 pointer-events-none border-orange-500/5 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-between items-start mb-8 relative">
          <div className="flex gap-4 items-start">
            <button onClick={() => setShowExitModal(true)} className="mt-1 w-10 h-10 flex items-center justify-center bg-gray-900 border border-orange-500/30 rounded-xl transition-all group hover:bg-orange-500/20 active:scale-95"><ChevronLeft className="w-5 h-5 text-gray-400" /></button>
            <div>
              <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-[0_0_8px_#f97316]" /><span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-400/80">SECTOR: ARCHIVE_FORENSICS</span></div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">LEVEL 6: <span className="text-orange-500 drop-shadow-[0_0_10px_#f97316]">ARCHIVED SECRET</span></h1>
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
               <h3 className="text-xl font-black italic tracking-tighter uppercase text-white mb-3">OBJECT: SECURE_DATA.ZIP</h3>
               <p className="text-[11px] text-gray-400 font-bold leading-relaxed mb-6 italic uppercase tracking-wider">
                  Kami mengamankan file Zip yang mencurigakan. Meskipun isinya tampak terenkripsi, kadang kala data penting tertulis di luar konten file itu sendiri. 
                  Gunakan teknik **Archive Comment Inspection** untuk mencari petunjuk.
               </p>
               <button onClick={() => { setShowHint(!showHint); if (!showHint) setHintUsed(true); }} className={`w-full py-4 border rounded-xl flex items-center justify-center gap-2.5 transition-all uppercase text-[10px] font-black tracking-widest ${showHint ? 'bg-orange-500/20 border-orange-500 text-orange-400' : 'bg-white/5 border-white/10 text-gray-500 hover:text-orange-400'}`}><Zap className="w-3.5 h-3.5" /><span>{showHint ? 'HINT_AKTIF' : 'MINTA_HINT'}</span></button>
               {showHint && (
                 <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-3 p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-bold text-gray-400 italic tracking-wider leading-relaxed space-y-2">
                    <p className="text-orange-300 uppercase font-black">💡 Metadata Zip:</p>
                    <p>Format Zip memungkinkan penambahan "Comment" pada setiap file di dalamnya atau pada archive itu sendiri. Gunakan tools seperti **7-Zip** (Properties) atau tab komentator di manager file untuk membacanya.</p>
                 </motion.div>
               )}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            <div className="flex-1 bg-gray-950 border-2 border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col relative group min-h-[400px]">
               <div className="h-12 bg-gray-900 border-b border-white/5 flex items-center px-6 gap-3">
                  <Archive className="w-4 h-4 text-orange-500" />
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Zip_Navigator Express v10.4</span>
               </div>
               
               <div className="flex-1 flex flex-col md:flex-row bg-[#05080F] font-mono">
                  {/* File List */}
                  <div className="flex-1 border-r border-white/5 p-4 overflow-y-auto">
                     <div className="grid grid-cols-[1fr_auto] gap-4 mb-3 p-2 text-[10px] items-center text-gray-600 font-black uppercase tracking-widest border-b border-white/5 pb-3">
                        <div>FILE_NAME</div>
                        <div>SIZE</div>
                     </div>
                     <div className="space-y-1">
                        {filesInZip.map((file, i) => (
                           <div 
                              key={i} 
                              onClick={() => setSelectedFile(file)}
                              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${selectedFile?.name === file.name ? 'bg-orange-500/20 border-orange-500/40 text-orange-400' : 'hover:bg-white/5 border-transparent text-gray-400'}`}
                           >
                              <div className="flex items-center gap-3">
                                 <FileArchive className="w-4 h-4 opacity-40" />
                                 <span className="text-[11px] font-bold tracking-wider">{file.name}</span>
                              </div>
                              <span className="text-[10px] opacity-40">{file.size}</span>
                           </div>
                        ))}
                     </div>
                  </div>
                  
                  {/* Info Panel */}
                  <div className="w-full md:w-64 p-6 bg-black/40 space-y-6">
                     {selectedFile ? (
                        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                           <div className="flex-1 p-6 bg-black/60 font-mono text-[11px] overflow-auto select-text relative">
                             <div className="text-orange-500 font-black tracking-widest text-[9px] mb-4 uppercase flex items-center justify-between">
                                <span>// FILE_METADATA_COMMENT</span>
                                <span className="text-gray-800">ENCODING: UTF-8</span>
                             </div>
                             <div className="text-orange-100 whitespace-pre-wrap leading-relaxed select-all cursor-crosshair px-2 py-1 bg-orange-500/5 rounded hover:bg-orange-500/10 transition-colors">
                                {selectedFile.comment || 'No comment data available for this archive segment.'}
                             </div>
                             {/* Hidden stub trap */}
                             {selectedFile.name === 'config.xml' && <div className="absolute top-0 right-0 opacity-0 select-all text-[1px] pointer-events-none">{"CTF{ARCHIVE_STUB_DECOY_606}"}</div>}
                          </div>
                        </motion.div>
                     ) : (
                        <div className="h-full flex items-center justify-center text-center opacity-20">
                           <p className="text-[9px] font-bold uppercase tracking-widest leading-relaxed">Pilih file untuk melihat metadata entri archive</p>
                        </div>
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
               <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className="max-w-sm w-full p-8 bg-gray-950 border border-orange-500/30 rounded-[2.5rem] shadow-[0_0_80px_rgba(249,115,22,0.3)] relative">
                  <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="w-8 h-8 text-orange-500" /></div>
                  <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white mb-2 leading-none">ARCHIVE_DECODED</h2>
                  <p className="text-orange-500/60 font-black tracking-[0.4em] uppercase text-[8px] mb-8 italic">Metadata_Exploitation_Success</p>
                  <div className="bg-black/40 rounded-2xl p-5 mb-8 text-left space-y-2">
                     <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5"><span className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-none italic">Execution_Time</span><span className="text-xl font-black italic text-orange-400 leading-none">{formatTime(time)}</span></div>
                  </div>
                  <button onClick={() => navigate('/ctf-arena/forensics/mudah', { state: { lastLevel: 6 } })} className="w-full py-4 bg-orange-500 text-black font-black uppercase text-[11px] tracking-[0.2em] rounded-xl shadow-lg">LANJUTKAN MISI</button>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>

      <AnimatePresence>
         {showExitModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[600] bg-black/80 backdrop-blur-sm flex justify-center items-center p-4">
               <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-gray-900 border border-orange-500/30 rounded-3xl p-10 max-w-md w-full text-center shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-orange-500" />
                  <ShieldAlert className="w-16 h-16 text-orange-500 mx-auto mb-6 shadow-[0_0_20px_rgba(249,115,22,0.2)]" />
                  <h3 className="text-2xl font-black text-white tracking-widest uppercase mb-4 italic">ABORT ANALYSIS?</h3>
                  <p className="text-sm text-gray-400 mb-10 font-bold leading-relaxed italic uppercase tracking-wider">Anda yakin ingin keluar? Semua temuan investigasi saat ini tidak akan disimpan.</p>
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

export default ForensicsLevel6;
