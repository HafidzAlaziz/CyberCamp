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
  FileText,
  Layers,
  Eye,
  EyeOff,
  Send,
  AlertTriangle,
  Copy,
  Check
} from 'lucide-react';

/* 
   TRAP_FLAG: <!-- CTF{PDF_LAYER_TRAP_5050} -->
*/

const ForensicsLevel7 = () => {
  /* 
     TRAP_FLAG: <!-- CTF{PDF_HTML_TRAP_5050} -->
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
  const [layers, setLayers] = useState({
    text: true,
    images: true,
    redacted: true,
    metadata: true
  });

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
    const correctFlag = atob('Q1RGe0gxZGQzbl9QNHRoXzFuX1BERl84Mn0=');
    const decoyFlags = [atob('Q1RGe0gxZGQzbl9UUlA0UF8wMDkxMn0=')]; // Decoy
    
    const cleanFlag = flag.trim();

    if (cleanFlag === correctFlag) {
      setStatus('success');
      setIsPaused(true);
      saveProgress(1 + (time <= 360 ? 1 : 0) + (!hintUsed ? 1 : 0));
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

  const toggleLayer = (layer) => {
    setLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  const saveProgress = (stars) => {
    const saved = localStorage.getItem('ctf_forensics_stats');
    const stats = saved ? JSON.parse(saved) : {};
    stats[7] = { stars: Math.max(stats[7]?.stars || 0, stars), bestTime: Math.min(stats[7]?.bestTime || 999999, time) };
    localStorage.setItem('ctf_forensics_stats', JSON.stringify(stats));
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-mono p-4 md:p-8 relative overflow-hidden forensics-page-theme">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-between items-start mb-8 relative">
          <div className="flex gap-4 items-start">
            <button onClick={() => setShowExitModal(true)} className="mt-1 w-10 h-10 flex items-center justify-center bg-gray-900 border border-orange-500/30 rounded-xl transition-all group hover:bg-orange-500/20 active:scale-95"><ChevronLeft className="w-5 h-5 text-gray-400" /></button>
            <div>
              <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-[0_0_8px_#f97316]" /><span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-400/80">SECTOR: DOCUMENT_HANDLING</span></div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">LEVEL 7: <span className="text-orange-500 drop-shadow-[0_0_10px_#f97316]">PDF LAYERS</span></h1>
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
               <h3 className="text-xl font-black italic tracking-tighter uppercase text-white mb-3">OBJECT: SENSITIVE_REPORT.PDF</h3>
               <p className="text-[11px] text-gray-400 font-bold leading-relaxed mb-6 italic uppercase tracking-wider">
                  Kami mengamankan draf laporan intelijen yang telah disensor. Meskipun beberapa informasi tampak ditutupi oleh kotak hitam, 
                  arsitektur PDF seringkali menyimpan data asli di lapisan bawahnya.
               </p>
               <button onClick={() => { setShowHint(!showHint); if (!showHint) setHintUsed(true); }} className={`w-full py-4 border rounded-xl flex items-center justify-center gap-2.5 transition-all uppercase text-[10px] font-black tracking-widest ${showHint ? 'bg-orange-500/20 border-orange-500 text-orange-400' : 'bg-white/5 border-white/10 text-gray-500 hover:text-orange-400'}`}><Zap className="w-3.5 h-3.5" /><span>{showHint ? 'HINT_AKTIF' : 'MINTA_HINT'}</span></button>
               {showHint && (
                 <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-3 p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-bold text-gray-400 italic tracking-wider leading-relaxed space-y-2">
                    <p className="text-orange-300 uppercase font-black">💡 Bekerja dengan PDF:</p>
                    <p>Sensor kotak hitam pada PDF seringkali hanyalah objek grafik yang diletakkan di atas teks. Cobalah menonaktifkan lapisan grafik atau menyalin teks di bawah sensor tersebut.</p>
                 </motion.div>
               )}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            <div className="flex-1 bg-gray-950 border-2 border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col relative group min-h-[500px]">
               <div className="h-12 bg-gray-900 border-b border-white/5 flex items-center px-6 gap-3">
                  <FileText className="w-4 h-4 text-orange-500" />
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Document_Forensic_Viewer v1.4</span>
               </div>
               
               <div className="flex-1 flex flex-col md:flex-row bg-[#F1F5F9] font-sans">
                  {/* PDF Sidebar (Layer Control) */}
                  <div className="w-full md:w-56 bg-gray-800 p-6 border-r border-white/10 shrink-0">
                     <div className="flex items-center gap-3 text-orange-500/40 mb-8 pb-3 border-b border-white/5">
                        <Layers className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-black uppercase tracking-widest font-mono">Layers</span>
                     </div>
                     <div className="space-y-4">
                        {Object.entries(layers).map(([key, value]) => (
                           <div 
                              key={key} 
                              onClick={() => toggleLayer(key)}
                              className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-all ${value ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' : 'bg-black/20 border-white/5 text-gray-600 grayscale'}`}
                           >
                              <span className="text-[10px] font-black uppercase tracking-widest font-mono">{key}</span>
                              {value ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                           </div>
                        ))}
                     </div>
                  </div>
                  
                  {/* PDF Canvas area */}
                  <div className="flex-1 p-12 bg-gray-300 flex items-center justify-center overflow-auto">
                     <div className="w-full max-w-sm bg-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] p-12 relative min-h-[500px]">
                        {/* PDF CONTENT */}
                        <div className="space-y-6 text-gray-800 transition-opacity duration-500" style={{ opacity: layers.text ? 1 : 0.05 }}>
                           <h4 className="text-lg font-bold border-b-2 border-gray-100 pb-2 mb-8">CONFIDENTIAL INTEL REPORT</h4>
                           <div className="space-y-4 text-xs leading-relaxed">
                              <p>Laporan ini merinci pergerakan aset intelijen di sektor 7. Semua koordinat dan identitas agen harus dirahasiakan sepenuhnya.</p>
                              <p>Subjek: <span className="font-bold">AGENT_X_99</span></p>
                              <p>Status: AKTIF</p>
                              
                              <div className="py-4 my-8 border-y border-gray-100 italic font-serif">
                                 "Operasi ini bersifat klandestin dan tidak boleh tercatat dalam arsip publik."
                              </div>

                              <div className="space-y-2">
                                 <p className="font-bold">SENSITIVE ACCESS KEY:</p>
                                 <div className="bg-gray-100 p-2 rounded text-[10px] font-mono flex flex-col gap-1 items-start">
                                    <span className="text-[8px] text-gray-400 select-none uppercase tracking-widest font-black">Extracted_String:</span>
                                    <span className="select-all px-2 py-1 bg-orange-500/5 rounded border border-orange-500/10 cursor-pointer text-orange-600 font-black">
                                       {layers.redacted ? 'DOCUMENT_REDACTED_BY_SEC_SYS_V2' : 'CTF{H1dd3n_P4th_1n_PDF_82}'}
                                    </span>
                                 </div>
                                 {/* Decoy in hidden PDF object */}
                                 <div className="absolute top-0 right-0 opacity-0 select-all text-[1px] pointer-events-none">{"CTF{PDF_STUB_DECOY_981}"}</div>
                              </div>
                           </div>
                        </div>

                        {/* Redaction Layer (Mocking actual PDF layer behavior) */}
                        <AnimatePresence>
                           {layers.redacted && (
                              <motion.div 
                                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                 className="absolute inset-0 pointer-events-none select-none flex items-center justify-center p-12"
                              >
                                 <div className="w-full h-full relative">
                                    {/* These would be 'overlay' objects in a real PDF */}
                                    <div className="absolute top-[280px] left-0 right-0 h-6 bg-black shadow-lg" />
                                 </div>
                              </motion.div>
                           )}
                        </AnimatePresence>
                        
                        {/* Hidden Payload Layer (Revealed when redacted is OFF) */}
                        {!layers.redacted && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto">
                             <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-xl backdrop-blur-sm relative group">
                                <p className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em] mb-2 text-center select-none">// RECOVERED_DATA // L7</p>
                                <span className="text-white font-black text-lg select-all cursor-crosshair px-2 py-1 bg-white/5 rounded hover:bg-white/10 transition-all">CTF{H1dd3n_P4th_1n_PDF_82}</span>
                                {/* Hidden stub trap */}
                                <div className="absolute top-0 right-0 opacity-0 select-all text-[1px] pointer-events-none">{"CTF{PDF_STUB_DECOY_707}"}</div>
                             </div>
                          </motion.div>
                        )}
                        
                        {/* Watermark layer */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] rotate-[-45deg] pointer-events-none select-none">
                           <span className="text-4xl font-black uppercase text-black">CONFIDENTIAL</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-[#0A0F1D]/80 border border-orange-500/30 rounded-2xl p-6 shadow-2xl">
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 relative">
                   <div className="flex-1 relative">
                      <input type="text" value={flag} onChange={(e) => setFlag(e.target.value)} placeholder="Masukkan flag (CTF{...})" className={`w-full bg-black/40 border-2 rounded-xl py-3.5 px-6 text-xs tracking-widest text-white placeholder:text-gray-700 focus:outline-none transition-all ${status === 'wrong' ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : status === 'decoy' ? 'border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.1)]' : 'border-orange-500/20 focus:border-orange-500/50'}`} />
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
               <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className="max-w-sm w-full p-8 bg-gray-950 border border-orange-500/30 rounded-[2.5rem] shadow-[0_0_80px_rgba(249,115,22,0.3)] relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-orange-500 shadow-[0_0_15px_#f97316]" />
                  <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="w-8 h-8 text-orange-500" /></div>
                  <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white mb-2 leading-none">DOCUMENT_UNMASKED</h2>
                  <p className="text-orange-500/60 font-black tracking-[0.4em] uppercase text-[8px] mb-8 italic">Layer_Extraction_Success</p>
                  <div className="bg-black/40 rounded-2xl p-5 mb-8 text-left space-y-2">
                     <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5"><span className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-none italic">Execution_Time</span><span className="text-xl font-black italic text-orange-400 leading-none">{formatTime(time)}</span></div>
                  </div>
                  <button onClick={() => navigate('/ctf-arena/forensics/mudah', { state: { lastLevel: 7 } })} className="w-full py-4 bg-orange-500 text-black font-black uppercase text-[11px] tracking-[0.2em] rounded-xl shadow-lg">LANJUTKAN MISI</button>
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
                  <p className="text-sm text-gray-400 mb-10 font-bold leading-relaxed italic uppercase tracking-wider">Anda yakin ingin keluar? Progres investigasi dokumen tidak akan disimpan.</p>
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

export default ForensicsLevel7;
