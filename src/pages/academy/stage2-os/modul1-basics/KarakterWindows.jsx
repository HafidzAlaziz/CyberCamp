import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Monitor, Lock, ShieldAlert, Cpu, AlertTriangle, XCircle, Info, HardDrive, RefreshCw, Settings } from 'lucide-react';

const KarakterWindows = () => {
  const [attemptMod, setAttemptMod] = useState(false);
  const [showError, setShowError] = useState(false);

  const testModification = () => {
    setAttemptMod(true);
    setTimeout(() => {
      setShowError(true);
      setTimeout(() => {
        setAttemptMod(false);
        setShowError(false);
      }, 3000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Standardized Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-blue-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/50">
            <Monitor className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-sm text-blue-400 tracking-[0.3em] uppercase font-black">Stage 2: Operating Systems</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              MODUL 1: Basics of OS
            </h2>
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
            <h3 className="text-2xl font-bold text-blue-400 mb-6 italic tracking-tight uppercase">Gampang Tapi "Dikunci" 🔒</h3>
            <div className="space-y-4 text-base leading-relaxed text-gray-400">
              <p>
                Kenapa Windows itu populer? Karena Windows itu kayak <span className="text-white font-bold italic underline decoration-blue-500">Mobil Matic</span>. 
                Tinggal gas (klik), nggak perlu ribet mikirin ganti gigi. Semua orang dari bocah sampe nenek lo pasti bisa pakenya.
              </p>
              <p>
                 Tapi kelemahannya, Windows itu <span className="text-blue-400 font-black">Closed Source</span>. Ibarat mobil matic yang kap mesinnya dipatri mati sama pabrik. 
                 Lo nggak boleh sembarangan bongkar jeroannya atau ganti knalpot sendiri.
              </p>
              <div className="p-4 bg-red-500/5 border-l-2 border-red-500 rounded-sm italic text-xs leading-relaxed text-gray-500">
                 <span className="text-white font-black">Konteks Hacker:</span> Hacker bikin virus paling banyak di Windows. Kenapa? Ya karena korbannya paling banyak di sini. Kasir minimarket, admin kantor, sampe laptop dosen lo, rata-rata pakainya Windows.
              </div>
            </div>
          </motion.div>

          {/* Practical Simulation: Matic vs Kunci Pabrik */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-black/60 border border-blue-900/20 rounded-[2rem] p-8 shadow-[0_0_50px_rgba(30,58,138,0.2)] relative overflow-hidden flex flex-col items-center justify-center min-h-[450px] backdrop-blur-sm"
          >
            {/* Animated Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent,rgba(59,130,246,0.03),transparent)] h-20 w-full animate-scanline pointer-events-none"></div>

            <h4 className="text-[9px] font-black text-blue-500 uppercase tracking-[0.4em] mb-12 absolute top-10 flex items-center gap-3">
               <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
               System_Audit: [WINDOWS_CORE_SECURITY]
            </h4>
            
            <div className="relative group mb-8">
               {/* Decorative Background Grid */}
               <div className="absolute -inset-10 grid grid-cols-6 gap-4 opacity-[0.03] pointer-events-none">
                  {[...Array(24)].map((_, i) => (
                    <Cpu key={i} className="w-full h-full text-blue-400" />
                  ))}
               </div>

               <motion.div 
                 animate={attemptMod ? { x: [-2, 2, -2, 2, 0], scale: [1, 1.05, 1] } : {}}
                 className={`w-44 h-44 rounded-3xl border-2 flex flex-col items-center justify-center transition-all duration-500 relative z-10 ${showError ? 'border-red-500 bg-red-500/5 shadow-[0_0_40px_rgba(239,68,68,0.2)]' : 'border-blue-500/20 bg-blue-500/5 shadow-[0_0_40px_rgba(59,130,246,0.1)] hover:border-blue-500/40'}`}
               >
                  <div className="relative">
                    <Lock className={`w-20 h-20 transition-all duration-500 ${showError ? 'text-red-500' : 'text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]'}`} />
                    {!showError && (
                      <motion.div 
                        animate={{ opacity: [0.2, 0.5, 0.2] }} 
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-blue-400 blur-2xl opacity-20 -z-10"
                      />
                    )}
                  </div>
                  
                  {/* Internal Component Icons */}
                  <div className="absolute inset-0 p-6 grid grid-cols-2 gap-4 opacity-10">
                     <Cpu className="w-full h-full" />
                     <ShieldAlert className="w-full h-full" />
                     <Settings className="w-full h-full" />
                     <HardDrive className="w-full h-full" />
                  </div>
               </motion.div>

               <AnimatePresence>
                  {showError && (
                    <motion.div 
                      initial={{ scale: 0, rotate: -45, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center z-20"
                    >
                       <div className="bg-red-600 text-white p-6 rounded-full shadow-[0_0_50px_rgba(220,38,38,0.8)] border-4 border-white/20">
                          <XCircle className="w-12 h-12" />
                       </div>
                    </motion.div>
                  )}
               </AnimatePresence>
            </div>

            <div className="w-full space-y-6 relative z-10 px-4">
               <button 
                 onClick={testModification}
                 disabled={attemptMod}
                 className="group w-full py-5 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 hover:border-blue-400 hover:from-blue-600 hover:to-indigo-600 text-blue-400 hover:text-white font-black uppercase tracking-[0.3em] text-[10px] transition-all duration-300 rounded-xl disabled:opacity-30 overflow-hidden relative"
               >
                 <span className="relative z-10 flex items-center justify-center gap-3">
                   {attemptMod ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                   {attemptMod ? 'BYPASSING_CORE...' : 'COBA MODIFIKASI INTI SISTEM'}
                 </span>
                 <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
               </button>

               <AnimatePresence>
                  {showError && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="p-5 bg-red-950/40 border border-red-500/40 rounded-2xl text-center backdrop-blur-xl"
                    >
                       <div className="text-[11px] text-red-500 font-black uppercase tracking-[0.3em] mb-3 flex items-center justify-center gap-2">
                          <AlertTriangle className="w-4 h-4" /> CRITICAL_ACCESS_DENIED
                       </div>
                       <p className="text-[10px] text-red-400/80 italic leading-relaxed font-bold uppercase tracking-tight">
                          Sistem Ini Closed Source! <br/>
                          <span className="text-white">Pabrik Microsoft nggak ngizinin lo bongkar kap mesinnya, Bos!</span>
                       </p>
                    </motion.div>
                  )}
               </AnimatePresence>
            </div>
            
            <div className="mt-12 flex items-center gap-4 opacity-20 w-full px-6">
               <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
               <span className="text-[8px] uppercase tracking-[0.2em] italic font-black text-blue-400">
                  KERNEL_PROTECTION: ACTIVE
               </span>
               <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900/30 p-6 rounded-2xl border border-gray-800">
          <Link 
            to="/academy/stage-2/modul-1/intro"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            « KEMBALI KE INTRO
          </Link>
          
          <Link 
            to="/academy/stage-2/modul-1/linux-manual"
            className="flex items-center gap-3 bg-blue-600 hover:bg-white text-black px-8 py-4 rounded-sm font-black transition-all group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
            <span className="relative z-10 flex items-center gap-2 uppercase tracking-tighter text-glow">
              LANJUT: LINUX SI MOBIL RAKITAN <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default KarakterWindows;
