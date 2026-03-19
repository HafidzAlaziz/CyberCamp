import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, AlertTriangle, ShieldAlert, Cpu, RefreshCcw, Skull, Bug, Zap } from 'lucide-react';

const TroubleshootOS = () => {
  const [isBSOD, setIsBSOD] = useState(false);
  const [isExploiting, setIsExploiting] = useState(false);

  const triggerExploit = () => {
    setIsExploiting(true);
    setTimeout(() => {
      setIsBSOD(true);
    }, 1500);
  };

  const restartSystem = () => {
    setIsBSOD(false);
    setIsExploiting(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isBSOD ? 'bg-[#0078d7]' : 'bg-gray-950'} text-gray-300 font-mono p-6 md:p-12`}>
      <div className="max-w-4xl mx-auto">
        {/* Standardized Header Section */}
        {!isBSOD && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-12 border-b border-red-900/30 pb-6 pl-0 md:pl-32"
          >
            <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/50 text-red-500">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-sm text-red-500 tracking-[0.3em] uppercase font-black">Stage 2: Operating Systems</h1>
              <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
                MODUL 2: Installation & Booting
              </h2>
            </div>
          </motion.div>
        )}

        {/* Content Section */}
        <AnimatePresence mode="wait">
          {!isBSOD ? (
            <motion.div 
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 gap-12 items-start mb-16"
            >
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-red-500 mb-6 italic tracking-tight uppercase underline decoration-red-900 decoration-4 underline-offset-8">
                  Pas Mesin Lo "Ngambek" 😩
                </h3>
                <div className="space-y-4 text-base leading-relaxed text-gray-400">
                  <p>
                    Komputer itu benda mati, tapi dosanya banyak. Kadang dia bisa <span className="text-white underline decoration-red-500">Ngadat</span> tiba-tiba. 
                    Di Windows, mimpi buruknya namanya <span className="text-blue-500 font-black">Blue Screen of Death (BSOD)</span>. 
                  </p>
                  <p>
                     Masalah ini biasanya terjadi karena <span className="text-white font-bold italic">Kernel</span> (inti sistem) lo "nabrak tembok". 
                     Antara hardware-nya yang rusak, atau ada software yang maksa masuk ke area terlarang di memori.
                  </p>
                  <div className="p-4 bg-red-950/20 border-l-4 border-red-600 rounded text-xs leading-relaxed italic">
                     <span className="text-red-500 font-black uppercase text-[10px] block mb-1 tracking-widest leading-none flex items-center gap-2">
                       <ShieldAlert className="w-4 h-4" /> Catatan Hacker:
                     </span>
                     Saking "sensitifnya" sistem operasi, kadang hacker kalau nyoba nembus celah keamanan tapi kodenya gak rapi, malah bikin komputer target kena <span className="text-white">Blue Screen</span> (alias <span className="text-white italic">Denial of Service</span> gak sengaja). Targetnya mati, misinya gagal!
                  </div>
                </div>
              </div>

              {/* Practical Simulation: Exploit Trigger */}
              <div className="bg-black/60 border border-gray-800 rounded-3xl p-10 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.1),transparent_70%)]"></div>
                 
                 <div className="relative z-10 text-center space-y-8">
                    <div className="flex justify-center flex-wrap gap-4 opacity-20">
                       <Bug className="w-12 h-12" />
                       <Skull className="w-12 h-12" />
                       <Cpu className="w-12 h-12" />
                    </div>

                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">System_Experiment_Panel</h4>
                    
                    <motion.div 
                      animate={isExploiting ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
                      className="p-8 border-4 border-red-500/10 rounded-full"
                    >
                       <button 
                         onClick={triggerExploit}
                         disabled={isExploiting}
                         className={`w-32 h-32 rounded-full font-black text-[10px] uppercase transition-all duration-300 transform active:scale-95 border-2 flex flex-col items-center justify-center gap-2 ${isExploiting ? 'bg-red-500/20 border-red-500 text-white animate-pulse' : 'bg-red-500/10 border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]'}`}
                       >
                          <Zap className="w-8 h-8" />
                          {isExploiting ? 'CRASHING...' : 'JALANKAN EXPLOIT'}
                       </button>
                    </motion.div>
                    
                    <p className="text-[8px] italic text-red-500/50 uppercase tracking-widest">⚠️ Warning: Unstable Code Execution Risk</p>
                 </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="bsod"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-[#0078d7] text-white p-12 md:p-24 z-50 overflow-hidden font-sans"
            >
               <div className="max-w-4xl mx-auto space-y-12">
                  <div className="text-[120px] font-light leading-none">:(</div>
                  
                  <div className="text-xl md:text-3xl font-light leading-relaxed max-w-3xl">
                     Your PC ran into a problem and needs to restart. We're just collecting some error info, and then we'll restart for you.
                  </div>
                  
                  <div className="text-lg font-light opacity-80">
                     0% complete
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                     <div className="w-32 h-32 bg-white flex items-center justify-center">
                        <div className="w-24 h-24 border-8 border-black"></div>
                     </div>
                     <div className="space-y-4 text-sm font-light opacity-80">
                        <p>For more information about this issue and possible fixes, visit https://www.windows.com/stopcode</p>
                        <p>If you call a support person, give them this info:</p>
                        <p className="font-bold">Stop code: EXPLOIT_FAILED_MEMORY_CORRUPTION</p>
                     </div>
                  </div>

                  <button 
                    onClick={restartSystem}
                    className="mt-12 bg-white text-blue-600 px-8 py-4 rounded font-bold uppercase tracking-widest text-sm hover:bg-blue-100 transition-colors flex items-center gap-3"
                  >
                    <RefreshCcw className="w-4 h-4" /> Restart System Now
                  </button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        {!isBSOD && (
          <div className="flex justify-between items-center mt-12 bg-gray-900/30 p-6 rounded-2xl border border-gray-800">
            <Link 
              to="/academy/stage-2/modul-2/booting-bios"
              className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              « SEBELUMNYA
            </Link>
            
            <Link 
              to="/academy/stage-2/modul-2/kesimpulan"
              className="flex items-center gap-3 bg-red-500/10 border border-red-500/50 text-red-400 px-8 py-4 rounded-sm font-black transition-all group overflow-hidden relative shadow-[0_0_30px_rgba(239,68,68,0.1)] hover:bg-red-500 hover:text-white"
            >
              <div className="absolute inset-0 bg-red-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
              <span className="relative z-10 flex items-center gap-2 uppercase tracking-[0.2em] text-[10px]">
                LANJUT: KESIMPULAN <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TroubleshootOS;
