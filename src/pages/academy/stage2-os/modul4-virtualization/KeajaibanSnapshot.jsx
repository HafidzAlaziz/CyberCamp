import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, RotateCcw, Skull, ShieldCheck, AlertTriangle, Clock, History } from 'lucide-react';

const KeajaibanSnapshot = () => {
  const [vmStatus, setVmStatus] = useState('safe'); // safe, infected, restoring

  const detonateMalware = () => {
    setVmStatus('infected');
  };

  const restoreSnapshot = () => {
    setVmStatus('restoring');
    setTimeout(() => {
      setVmStatus('safe');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Standardized Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-purple-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/50 text-purple-400">
            <History className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-sm text-purple-400 tracking-[0.3em] uppercase font-black">Stage 2: Operating Systems</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              MODUL 4: Virtualization
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
            <h3 className="text-2xl font-bold text-purple-500 mb-6 italic tracking-tight uppercase">
              "Ctrl+Z" Buat Seluruh Komputer! 🕰️
            </h3>
            <div className="space-y-4 text-base leading-relaxed text-gray-400">
              <p>
                Bayangin lo lagi ngetik dokumen terus salah, lo tinggal pencet <span className="text-white font-bold">Undo</span>. Nah, <span className="text-purple-400 font-black">Snapshot</span> itu tombol Undo buat satu sistem operasi utuh!
              </p>
              <p>
                Lo bisa nge-save kondisi VM lo sekarang (Klik Snapshot). Lalu lo iseng buka link virus. Kalau VM lo meledak atau kena <span className="text-red-500 italic">Ransomware</span>, lo tinggal klik <span className="text-white underline italic">Restore Snapshot</span>.
              </p>
              <div className="p-4 bg-purple-950/20 border-l-4 border-purple-600 rounded text-xs leading-relaxed italic">
                 <span className="text-purple-500 font-black uppercase text-[10px] b-1 tracking-widest leading-none flex items-center gap-2 mb-2">
                   <Skull className="w-4 h-4" /> Lab Hacking:
                 </span>
                 Inilah rahasia kenapa hacker gak takut kena virus pas lagi ngebedah file aneh. Mereka selalu pake Snapshot! Kalau sistemnya ancur, mereka "Time Travel" balik ke kondisi pas sistemnya masih perawan. <span className="text-white font-black">MAGIC!</span>
              </div>
            </div>
          </motion.div>

          {/* Practical Simulation: Malware Detonation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className={`border rounded-sm p-0 shadow-2xl relative overflow-hidden flex flex-col min-h-[440px] transition-all duration-500 ${vmStatus === 'infected' ? 'bg-red-950/20 border-red-500' : vmStatus === 'restoring' ? 'bg-blue-950/20 border-blue-500' : 'bg-gray-900 border-white/5'}`}
          >
            {/* VM Screen Header */}
            <div className={`px-4 py-2 flex items-center justify-between border-b transition-colors ${vmStatus === 'infected' ? 'bg-red-500/20 border-red-500/30' : 'bg-black/40 border-white/5'}`}>
               <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full transition-colors ${vmStatus === 'infected' ? 'bg-red-500 animate-ping' : 'bg-emerald-500'}`}></div>
                  <span className={`text-[8px] font-black uppercase tracking-widest ${vmStatus === 'infected' ? 'text-red-400' : 'text-gray-500'}`}>
                    VM_STATUS: {vmStatus.toUpperCase()}
                  </span>
               </div>
               <div className="flex gap-1.5 opacity-30">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  <div className="w-2 h-2 rounded-full bg-white"></div>
               </div>
            </div>

            {/* VM Screen Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
               <AnimatePresence mode="wait">
                 {vmStatus === 'safe' && (
                   <motion.div key="safe" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                      <ShieldCheck className="w-20 h-20 text-emerald-500/50 mx-auto" />
                      <div className="text-emerald-400 font-black uppercase text-[10px] tracking-widest">System Secure</div>
                      <p className="text-[10px] text-gray-500 italic max-w-xs">Ready for testing. No malware detected.</p>
                   </motion.div>
                 )}
                 {vmStatus === 'infected' && (
                   <motion.div key="infected" initial={{ opacity: 0, scale: 1.2 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-4 bg-red-600/10 p-6 border border-red-500/30 rounded">
                      <AlertTriangle className="w-24 h-24 text-red-500 mx-auto animate-pulse" />
                      <div className="text-red-500 font-black uppercase text-2xl tracking-tighter">CRITICAL ALERT!</div>
                      <div className="text-[11px] text-red-200 font-bold bg-red-500 text-black px-2 mt-2">SYSTEM_FILES_ENCRYPTED</div>
                      <p className="text-[9px] text-red-400/80 italic mt-4 uppercase">"Ooops! All your files have been encrypted by CyberCamp Ransomware!"</p>
                   </motion.div>
                 )}
                 {vmStatus === 'restoring' && (
                   <motion.div key="restoring" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                      <div className="relative">
                         <Clock className="w-16 h-16 text-blue-400 mx-auto animate-spin" />
                         <RotateCcw className="w-8 h-8 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      <div className="text-blue-400 font-black uppercase text-[10px] tracking-widest animate-pulse">RESTORING_SNAPSHOT...</div>
                      <div className="w-48 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden">
                         <motion.div initial={{ x: '-100%' }} animate={{ x: '0%' }} transition={{ duration: 2 }} className="h-full bg-blue-500" />
                      </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>

            {/* VM Botom Actions */}
            <div className="p-4 bg-black/40 border-t border-white/5 grid grid-cols-2 gap-4">
              <button 
                onClick={detonateMalware}
                disabled={vmStatus !== 'safe'}
                className={`py-3 rounded-sm font-black uppercase tracking-widest text-[9px] transition-all flex items-center justify-center gap-2 border ${vmStatus === 'safe' ? 'bg-red-500/10 border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white' : 'opacity-20 bg-gray-900 border-white/10 text-gray-700 cursor-not-allowed'}`}
              >
                <Skull className="w-3.5 h-3.5" /> BUKA VIRUS.EXE
              </button>
              <button 
                onClick={restoreSnapshot}
                disabled={vmStatus === 'safe' || vmStatus === 'restoring'}
                className={`py-3 rounded-sm font-black uppercase tracking-widest text-[9px] transition-all flex items-center justify-center gap-2 border ${vmStatus === 'infected' ? 'bg-blue-500/10 border-blue-500/50 text-blue-400 hover:bg-blue-500 hover:text-white shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'opacity-20 bg-gray-900 border-white/10 text-gray-700 cursor-not-allowed'}`}
              >
                <RotateCcw className={`w-3.5 h-3.5 ${vmStatus === 'restoring' ? 'animate-spin' : ''}`} /> RESTORE SNAPSHOT
              </button>
            </div>
          </motion.div>
        </div>

        {/* Tip Box */}
        <div className="p-6 bg-purple-950/10 border border-purple-500/20 rounded-xl mb-16 flex items-start gap-4">
           <History className="w-6 h-6 text-purple-500 shrink-0 mt-1" />
           <p className="text-sm text-purple-100 italic leading-relaxed">
             "Bikin Snapshot sesering mungkin! Terutama sebelum lo instal software aneh atau ngerubah settingan penting di Linux. Gak butuh waktu lama buat Restore, tapi bisa nyelamatin progres lo berminggu-minggu!"
           </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900/50 p-6 rounded-2xl border border-white/5 backdrop-blur-sm shadow-xl">
          <Link 
            to="/academy/stage-2/modul-4/software-vm"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            « SEBELUMNYA
          </Link>
          
          <Link 
            to="/academy/stage-2/modul-4/kesimpulan"
            className="flex items-center gap-3 bg-purple-500/10 border border-purple-500/50 text-purple-400 px-8 py-3 rounded-sm font-black transition-all group overflow-hidden relative shadow-[0_0_30px_rgba(168,85,247,0.1)] hover:bg-purple-500 hover:text-black"
          >
            <div className="absolute inset-0 bg-purple-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
            <span className="relative z-10 flex items-center gap-2 uppercase tracking-[0.2em] text-[10px]">
              LANJUT: KESIMPULAN TAHAP 2 <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default KeajaibanSnapshot;
