import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Terminal, Eye, AlertCircle, FileText, Database, Trash2, ArrowLeft } from 'lucide-react';

const MembacaLog = () => {
  const [logs, setLogs] = useState([]);
  const [isReading, setIsReading] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const displayLastLog = () => {
    setIsReading(true);
    setIsClearing(false);
    setLogs([]); // Clear first
    
    setTimeout(() => {
      setLogs([
        "[INFO] System boot completed at 10:52:14",
        "[DEBUG] Memory check: 32768MB available",
        "[WARN] Port 22 received suspicious probe from 102.34.11.9",
        "[FATAL] /var/log/apache2/error.log : SQL Syntax Error at line 42.",
        "[ALERT] Database unauthorized access attempt detected!",
      ]);
      setIsReading(false);
    }, 1200);
  };

  const handleClearLogs = () => {
    setIsClearing(true);
    setTimeout(() => {
      setLogs([]);
      setIsClearing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-10 border-b border-gray-800 pb-6"
        >
          <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/50">
            <Eye className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-500 tracking-[0.3em] uppercase font-black">Troubleshoot Phase_03</h1>
            <h2 className="text-3xl font-bold text-white tracking-tighter italic">MEMBACA LOG</h2>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-cyan-400 mb-6 italic tracking-tight uppercase">Log: Si "CCTV" Sistem 👁️</h3>
            <div className="space-y-4 text-base leading-relaxed text-gray-400">
              <p>
                Log itu adalah <span className="text-white font-bold italic">"CCTV"-nya sistem</span>. 
                Apapun yang terjadi—dari login gagal sampe server yang mau meledak—semuanya dicatat otomatis di situ. 
              </p>
              <p>
                 <span className="text-white font-black">Konteks Cyber:</span> Hacker baca <span className="text-red-400 italic">Error Log</span> buat nyari celah keamanan, kayak versi aplikasi yang udah jadul atau bocoran data sensitif (<span className="text-red-400">Information Disclosure</span>). 
              </p>
              <p className="bg-cyan-500/5 p-4 border-l-2 border-cyan-500 rounded-sm italic text-xs">
                Pro-tip: Hacker pro selalu <span className="text-white underline decoration-red-500">ngehapus log</span> setelah mereka berhasil masuk buat ngilangin jejak (<span className="text-cyan-400">Clearing Tracks</span>). Kalo log nggak ada, admin nggak tau siapa yang baru aja bertamu.
              </p>
            </div>
          </motion.div>

          {/* Practical Simulation: Terminal Baca Log */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-black border border-gray-800 rounded-2xl p-6 shadow-2xl relative"
          >
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between mb-4 text-[10px] text-gray-600 bg-gray-900 -mx-6 -mt-6 p-3 px-6 rounded-t-2x border-b border-gray-800">
               <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                     <div className="w-2.5 h-2.5 rounded-full bg-red-500/30"></div>
                     <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30"></div>
                     <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/30"></div>
                  </div>
                  <span className="font-bold tracking-widest uppercase">/var/log/apache2/error.log</span>
               </div>
               <Terminal className="w-4 h-4 opacity-30" />
            </div>

            <div className="min-h-[220px] bg-[#050505] p-4 rounded border border-gray-900 font-mono text-[10px] md:text-[11px] leading-relaxed relative group">
               {isReading || isClearing ? (
                 <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 backdrop-blur-sm z-10">
                    <div className="w-12 h-1 bg-gray-900 rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }} 
                         animate={{ width: '100%' }} 
                         transition={{ duration: 1.2, repeat: Infinity }}
                         className={`h-full ${isClearing ? 'bg-red-500' : 'bg-cyan-500'}`}
                       />
                    </div>
                    <span className={`text-[10px] uppercase font-black tracking-[0.3em] animate-pulse ${isClearing ? 'text-red-500' : 'text-cyan-500/60'}`}>
                      {isClearing ? 'CLEARING_TRACKS_...' : 'ANALYZING_CCTV_DATA'}
                    </span>
                 </div>
               ) : logs.length === 0 ? (
                 <div className="flex flex-col items-center justify-center h-[200px] text-gray-700 opacity-40 italic">
                    <Database className="w-8 h-8 mb-4 stroke-1" />
                    <span>No log entries displayed. Initiate read command.</span>
                 </div>
               ) : (
                 <div className="space-y-1.5">
                    {logs.map((log, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -5 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className={`${log.includes('FATAL') ? 'text-red-500 border-l border-red-500 pl-2 bg-red-500/5 font-black' : log.includes('WARN') ? 'text-yellow-500' : 'text-emerald-500/70'}`}
                      >
                         {log}
                      </motion.div>
                    ))}
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      transition={{ delay: 1 }}
                      className="inline-block w-2 h-4 bg-cyan-500 animate-pulse ml-1 align-middle"
                    />
                 </div>
               )}
            </div>

            <div className="mt-6 flex gap-3">
               <button 
                 onClick={displayLastLog}
                 disabled={isReading || isClearing}
                 className="flex-1 py-4 border border-cyan-500/50 hover:bg-cyan-500/10 text-cyan-400 font-black text-[10px] uppercase tracking-[0.2em] transition-all rounded-sm flex items-center justify-center gap-2 group disabled:opacity-30"
               >
                 <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                 Tampilkan Log Terakhir
               </button>
               <button 
                 onClick={handleClearLogs}
                 disabled={isReading || isClearing || logs.length === 0}
                 className={`p-4 border rounded-sm transition-all flex items-center gap-2 text-[9px] uppercase font-bold
                   ${logs.length > 0 
                     ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                     : 'border-red-500/20 text-red-500/30 cursor-not-allowed italic'}
                   disabled:opacity-50`}
               >
                 <Trash2 className="w-4 h-4" /> Clear Logs
               </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900/30 p-6 rounded-2xl border border-gray-800">
          <Link 
            to="/academy/stage-1/modul-3/isolasi-masalah"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            « KEMBALI KE ISOLASI
          </Link>
          
          <Link 
            to="/academy/stage-1/modul-3/kesimpulan"
            className="flex items-center gap-3 bg-cyan-500 hover:bg-white text-black px-8 py-4 rounded-sm font-black transition-all group overflow-hidden relative"
          >
             <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
             <span className="relative z-10 flex items-center gap-2 uppercase tracking-tighter">
                LANJUT: KESIMPULAN <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MembacaLog;
