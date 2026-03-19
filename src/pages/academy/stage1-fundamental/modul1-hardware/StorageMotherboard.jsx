import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, HardDrive, Layout, Zap, Shield, Play, RotateCcw, Timer, CheckCircle2, AlertCircle } from 'lucide-react';

const StorageMotherboard = () => {
  const [isBooting, setIsBooting] = useState(false);
  const [ssdProgress, setSsdProgress] = useState(0);
  const [hddProgress, setHddProgress] = useState(0);
  const [bootTime, setBootTime] = useState({ ssd: null, hdd: null });

  useEffect(() => {
    let ssdInterval, hddInterval;
    if (isBooting) {
      // SSD: Fast (2 seconds)
      ssdInterval = setInterval(() => {
        setSsdProgress((prev) => {
          if (prev >= 100) {
            clearInterval(ssdInterval);
            setBootTime(t => ({ ...t, ssd: 2 }));
            return 100;
          }
          return prev + 5;
        });
      }, 100);

      // HDD: Very Slow (around 10-15 seconds for simulation)
      hddInterval = setInterval(() => {
        setHddProgress((prev) => {
          if (prev >= 100) {
            clearInterval(hddInterval);
            setBootTime(t => ({ ...t, hdd: 45 }));
            return 100;
          }
          return prev + 0.8;
        });
      }, 100);
    }
    return () => {
      clearInterval(ssdInterval);
      clearInterval(hddInterval);
    };
  }, [isBooting]);

  const startBoot = () => {
    setIsBooting(true);
    setSsdProgress(0);
    setHddProgress(0);
    setBootTime({ ssd: null, hdd: null });
  };

  const resetBoot = () => {
    setIsBooting(false);
    setSsdProgress(0);
    setHddProgress(0);
    setBootTime({ ssd: null, hdd: null });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-cyan-900/30 pb-6"
        >
          <div className="p-3 bg-cyan-500/10 rounded-sm border border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            <HardDrive className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-500 tracking-[0.3em] uppercase font-black">Hardware Phase_03</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">STORAGE & MOTHERBOARD</h2>
          </div>
        </motion.div>

        {/* 2-Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Material */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="space-y-6">
               <div className="space-y-2">
                  <h3 className="text-xl font-black text-white uppercase italic flex items-center gap-3">
                     <HardDrive className="w-6 h-6 text-emerald-500" /> Storage (HDD/SSD): Si Kulkas
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    Ini tempat nyimpen file, game, sampe OS lo secara <span className="text-emerald-400 font-bold italic">permanen</span>. Klo RAM tadi meja, ini Kulkasnya. 
                  </p>
                  <ul className="space-y-3 mt-4">
                     <li className="flex items-start gap-3 text-xs">
                        <span className="text-emerald-500 font-black shrink-0">[HDD]</span> 
                        <span>Kulkas jadul. Harus muter-muter dulu kalau mau ambil barang. Murah tapi lambatnya minta ampun.</span>
                     </li>
                     <li className="flex items-start gap-3 text-xs">
                        <span className="text-cyan-400 font-black shrink-0">[SSD]</span> 
                        <span>Kulkas modern nan mewah. Buka pintu langsung ketemu barangnya. Nggak ada bagian berputar, makanya ngebut!</span>
                     </li>
                  </ul>
               </div>

               <div className="space-y-2">
                  <h3 className="text-xl font-black text-white uppercase italic flex items-center gap-3">
                     <Layout className="w-6 h-6 text-yellow-500" /> Motherboard: Lantai Dapur
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    Papan sirkuit utama. Ini ibarat lantai dapur yang nyambungin Koki, Meja, dan Kulkas biar mereka bisa komunikasi. Tanpa lantai, semua hardware lo bakal melayang nggak jelas!
                  </p>
               </div>
               
               <div className="p-6 bg-emerald-900/10 border-l-4 border-emerald-500 rounded-sm italic">
                  <span className="text-emerald-400 font-black uppercase text-[10px] block mb-2 tracking-widest flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Hacker POV: Persistence
                  </span>
                  Hacker suka banget nanem <span className="text-white font-bold">Rootkit</span> atau virus di dalam "Kulkas" (Storage) ini. Kenapa? Biar pas komputer dimatiin dan dinyalain lagi, virusnya tetep ada di sana, nungguin lo login.
               </div>
            </div>
          </motion.div>

          {/* Right Column: Simulation Case */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-900/50 border border-emerald-500/30 rounded-xl p-8 shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col"
          >
            <div className="absolute top-4 left-4 flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
               <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">BOOT_SIMULATOR: SPEED_BATTLE</span>
            </div>

            <div className="mt-10 space-y-12 flex-grow">
               {/* SSD Track */}
               <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                     <span className="text-cyan-400 flex items-center gap-2"><Zap className="w-3 h-3" /> SSD (Solid State Drive)</span>
                     {bootTime.ssd && <span className="text-white bg-cyan-500 px-2 py-0.5 rounded-sm">BOOTED IN {bootTime.ssd}s</span>}
                  </div>
                  <div className="h-8 w-full bg-black/40 rounded border border-white/5 relative overflow-hidden p-1">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${ssdProgress}%` }}
                        className="h-full bg-cyan-500/80 rounded-sm shadow-[0_0_15px_rgba(34,211,238,0.5)] flex items-center justify-end px-3"
                     >
                        {ssdProgress === 100 && <CheckCircle2 className="w-4 h-4 text-white" />}
                     </motion.div>
                     {!isBooting && <span className="absolute inset-0 flex items-center justify-center text-[9px] text-gray-700 font-bold uppercase">Ready to Blaze</span>}
                  </div>
               </div>

               {/* HDD Track */}
               <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                     <span className="text-yellow-500 flex items-center gap-2"><RotateCcw className="w-3 h-3" /> HDD (Hard Disk Drive)</span>
                     {bootTime.hdd && <span className="text-black bg-yellow-500 px-2 py-0.5 rounded-sm">BOOTED IN {bootTime.hdd}s</span>}
                  </div>
                  <div className="h-8 w-full bg-black/40 rounded border border-white/5 relative overflow-hidden p-1">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${hddProgress}%` }}
                        className="h-full bg-yellow-600/60 rounded-sm flex items-center justify-end px-3"
                     >
                        {hddProgress > 0 && hddProgress < 100 && <Timer className="w-4 h-4 text-white animate-spin" />}
                        {hddProgress === 100 && <CheckCircle2 className="w-4 h-4 text-white" />}
                     </motion.div>
                     {!isBooting && <span className="absolute inset-0 flex items-center justify-center text-[9px] text-gray-700 font-bold uppercase">Waiting for Spin</span>}
                     {isBooting && hddProgress < 100 && (
                        <div className="absolute inset-0 flex items-center justify-center">
                           <span className="text-[10px] font-bold text-yellow-500/40 uppercase tracking-[0.2em] animate-pulse">Tungguin... {Math.floor(hddProgress)}%</span>
                        </div>
                     )}
                  </div>
               </div>
            </div>

            {/* Interaction Button */}
            <div className="mt-auto pt-10 flex flex-col gap-4">
               {!isBooting || (bootTime.ssd && bootTime.hdd) ? (
                  <button 
                    onClick={bootTime.ssd ? resetBoot : startBoot}
                    className={`w-full py-4 rounded-sm font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-300 flex items-center justify-center gap-3 border ${bootTime.ssd ? 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700 hover:text-white' : 'bg-emerald-600 text-white border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:bg-emerald-500'}`}
                  >
                     {bootTime.ssd ? <RotateCcw className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                     <span>{bootTime.ssd ? 'ULANGI SIMULASI' : 'NYALAKAN KOMPUTER'}</span>
                  </button>
               ) : (
                  <div className="w-full py-4 bg-emerald-500/10 border border-emerald-500/30 rounded-sm flex items-center justify-center gap-3">
                     <Timer className="w-4 h-4 text-emerald-500 animate-spin" />
                     <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest italic">Memulai Booting Sistem...</span>
                  </div>
               )}
               
               {bootTime.ssd && (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="p-4 bg-black/40 border border-white/5 rounded italic text-center"
                 >
                    <p className="text-[10px] text-gray-500">
                      "Bar SSD langsung penuh (hijau) dalam sekejap. Bar HDD naiknya pelan-pelan banget kayak kura-kura. <span className="text-white italic">Masih mau pake HDD buat ngeretas?</span>"
                    </p>
                 </motion.div>
               )}
            </div>
          </motion.div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-20 bg-gray-900/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
          <Link 
            to="/academy/stage-1/modul-1/cpu-ram" 
            className="flex items-center gap-2 text-xs font-black text-gray-600 hover:text-white transition-all uppercase tracking-widest group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> SEBELUMNYA
          </Link>
          <Link 
            to="/academy/stage-1/modul-1/kesimpulan"
            className="flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 px-8 py-3 rounded-sm font-black transition-all group overflow-hidden relative shadow-[0_0_30px_rgba(34,211,238,0.1)] hover:bg-cyan-500 hover:text-black"
          >
             <div className="absolute inset-0 bg-cyan-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
             <span className="relative z-10 flex items-center gap-2 uppercase tracking-[0.2em] text-[10px]">
              LANJUT: KESIMPULAN <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StorageMotherboard;
