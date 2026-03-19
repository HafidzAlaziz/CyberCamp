import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Usb, Laptop, ShieldCheck, Zap, Info, ArrowRight } from 'lucide-react';

const IntroInstalasi = () => {
  const [isHackerMode, setIsHackerMode] = useState(false);

  return (
    <div className={`min-h-screen transition-colors duration-700 ${isHackerMode ? 'bg-gray-950' : 'bg-gray-900'} text-gray-300 font-mono p-6 md:p-12`}>
      <div className="max-w-4xl mx-auto">
        {/* Standardized Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-4 mb-12 border-b pb-6 transition-colors pl-0 md:pl-32 ${isHackerMode ? 'border-emerald-900/30' : 'border-blue-900/30'}`}
        >
          <div className={`p-3 rounded-lg border transition-colors ${isHackerMode ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-blue-500/10 border-blue-500/50'}`}>
            <Usb className={`w-8 h-8 ${isHackerMode ? 'text-emerald-400' : 'text-blue-400'}`} />
          </div>
          <div>
            <h1 className={`text-sm tracking-[0.3em] uppercase font-black ${isHackerMode ? 'text-emerald-400' : 'text-blue-400'}`}>Stage 2: Operating Systems</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              MODUL 2: Installation & Booting
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
            <h3 className={`text-2xl font-bold mb-6 italic tracking-tight uppercase transition-colors ${isHackerMode ? 'text-emerald-500' : 'text-blue-500'}`}>
              Jangan Biarkan Laptop Lo Jadi Ganjal Pintu 🏠
            </h3>
            <div className="space-y-4 text-base leading-relaxed text-gray-400">
              <p>
                Beli laptop kosongan itu ibarat <span className={isHackerMode ? 'text-emerald-400 font-bold' : 'text-blue-400 font-bold'}>beli rumah yang belum di-aci</span>. 
                Hardware itu temboknya, tapi lo nggak bisa tinggal di sana kalau nggak ada perabotannya (OS).
              </p>
              <p>
                 <span className="text-white font-bold">Instal OS</span> itu proses mindahin "nyawa" ke dalam mesin. Tanpa OS, laptop mahal lo cuma seonggok besi yang gak bisa ngapa-ngapain.
              </p>
              <div className={`p-4 border-l-2 rounded-sm italic text-xs leading-relaxed transition-colors ${isHackerMode ? 'bg-emerald-500/5 border-emerald-500 text-emerald-300' : 'bg-blue-500/5 border-blue-500 text-blue-300'}`}>
                 <span className="text-white font-black">Trik Hacker (Live USB):</span> Hacker sejati sering bawa OS di kantong (Flashdisk). 
                 Mereka colok ke komputer target, booting pake OS mereka sendiri, nge-hack, terus cabut. 
                 <span className="underline ml-1">Hasilnya?</span> Komputer itu bersih total, gak ada jejak sejarah lo pernah mampir! Super stealth!
              </div>
            </div>
          </motion.div>

          {/* Practical Simulation: Colok Flashdisk Hacker */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className={`border rounded-3xl p-8 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[420px] transition-all duration-700 ${isHackerMode ? 'bg-black border-emerald-900/40 shadow-emerald-500/10' : 'bg-gray-800/40 border-blue-900/40'}`}
          >
            {/* Status Indicator */}
            <div className="absolute top-8 left-8 flex items-center gap-2">
               <div className={`w-2 h-2 rounded-full animate-pulse ${isHackerMode ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
               <span className={`text-[9px] font-black uppercase tracking-widest ${isHackerMode ? 'text-emerald-500' : 'text-blue-500'}`}>
                  System_Status: {isHackerMode ? 'RECON_MODE_ACTIVE' : 'IDLE_WINDOWS'}
               </span>
            </div>

            {/* Laptop Visual Container */}
            <div className="relative mb-12 flex flex-col items-center justify-center w-full">
               {/* Screen Notch Aspect */}
               <motion.div 
                 animate={isHackerMode ? { filter: 'drop-shadow(0 0 20px #10b981)' } : {}}
                 className={`w-64 h-40 rounded-t-xl border-4 relative transition-all duration-700 flex flex-col items-center justify-center ${isHackerMode ? 'bg-gray-950 border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.2)]' : 'bg-blue-600 border-white/20'}`}
               >
                  {/* Subtle Notch Visual */}
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-b-sm transition-colors ${isHackerMode ? 'bg-emerald-500/30' : 'bg-white/10'}`}></div>

                  <AnimatePresence mode="wait">
                    {!isHackerMode ? (
                      <motion.div 
                        key="win"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="text-center"
                      >
                         <div className="text-[10px] text-white/50 mb-2 uppercase font-black">Windows Home</div>
                         <div className="w-12 h-12 bg-white/10 rounded-full mx-auto animate-pulse flex items-center justify-center">
                            <Laptop className="w-6 h-6 text-white" />
                         </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="hacker"
                        initial={{ opacity: 0, scale: 1.2 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        className="text-center space-y-1"
                      >
                         <div className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.3em] mb-2 animate-pulse">LIVE OS BOOTED</div>
                         <div className="font-mono text-[8px] text-emerald-500/50 leading-none">
                            [######..........] 24%<br/>
                            {">"} INITIATING_STEALTH...<br/>
                            {">"} VOICING_RECORDS: NULL<br/>
                            {">"} NO_TRACES_LEFT
                         </div>
                         <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto mt-2" />
                      </motion.div>
                    )}
                  </AnimatePresence>
               </motion.div>
               {/* Hinge & Base Visual */}
               <div className={`w-72 h-3 rounded-b-lg border-x-4 border-b-4 transition-colors duration-700 ${isHackerMode ? 'bg-gray-900 border-emerald-500 shadow-[0_10px_30px_rgba(16,185,129,0.1)]' : 'bg-gray-400 border-white/20'}`}></div>
               <div className={`w-16 h-1 mt-[-1px] transition-colors ${isHackerMode ? 'bg-emerald-500/40' : 'bg-white/5'}`}></div>
            </div>

            <button 
              onClick={() => setIsHackerMode(!isHackerMode)}
              className={`group px-8 py-3 rounded-sm font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-500 flex items-center justify-center gap-3 overflow-hidden relative border ${isHackerMode ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-black shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'bg-blue-500/10 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white shadow-[0_0_30px_rgba(59,130,246,0.3)]'}`}
            >
               <div className={`absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ${isHackerMode ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
               <Usb className="w-4 h-4 relative z-10 transition-transform group-hover:rotate-12" />
               <span className="relative z-10">
                 {isHackerMode ? 'CABUT USB (BACK TO NORMAL)' : 'COLOK USB KALI LINUX'}
               </span>
            </button>
            
            <div className={`mt-8 text-[8px] uppercase tracking-tighter italic transition-opacity duration-700 ${isHackerMode ? 'opacity-40 text-emerald-500' : 'opacity-10'}`}>
               {isHackerMode ? '$ ghost_mode: enabled // amnesia_module: loaded' : '$ standby_mode: windows_os'}
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex justify-end items-center mt-12 bg-gray-900/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
          <Link 
            to="/academy/stage-2/modul-2/booting-bios"
            className={`flex items-center gap-3 px-8 py-3 rounded-sm font-black transition-all group overflow-hidden relative border ${isHackerMode ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-black shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'border-blue-500/50 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white shadow-[0_0_20px_rgba(59,130,246,0.1)]'}`}
          >
            <div className={`absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ${isHackerMode ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
            <span className="relative z-10 flex items-center gap-2 uppercase tracking-[0.2em] text-[10px]">
              LANJUT: BOOTING & BIOS <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IntroInstalasi;
