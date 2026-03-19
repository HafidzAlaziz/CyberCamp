import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Box, Monitor, Power, Zap, Shield, HelpCircle, Terminal } from 'lucide-react';

const IntroVirtualisasi = () => {
  const [isVmOn, setIsVmOn] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12 overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        {/* Decorative Background Glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500/10 blur-[100px] pointer-events-none"></div>

        {/* Standardized Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-purple-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/50 text-purple-400">
            <Box className="w-8 h-8" />
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
              "Inception" Versi Komputer! 🌀
            </h3>
            <div className="space-y-4 text-base leading-relaxed text-gray-400">
              <p>
                Pernah nonton film <span className="text-white italic">Inception</span>? Mimpi di dalem mimpi? Nah, <span className="text-purple-400 font-bold">Virtualisasi</span> itu konsep yang mirip: <span className="text-white font-black underline">Komputer di dalem Komputer.</span>
              </p>
              
              <div className="p-4 bg-purple-950/20 border-l-4 border-purple-600 rounded text-xs leading-relaxed italic">
                 <span className="text-purple-500 font-black uppercase text-[10px] b-1 tracking-widest leading-none flex items-center gap-2 mb-2">
                   <Shield className="w-4 h-4" /> Kenapa Hacker Wajib Bisa?
                 </span>
                 Buat hacker, Virtual Machine (VM) itu adalah <span className="text-white font-bold">Safe House</span> (Rumah Aman). 
                 <br/><br/>
                 Lo bisa instal virus paling mematikan di dalam VM buat dipelajari. Kalau virusnya "meledak" dan ngerusak OS, yang hancur cuma VM-nya doang. Laptop asli lo (Host) tetep aman gak kegores sedikitpun!
              </div>

              <p className="text-sm">
                VM itu ibarat "Ruang Isolasi" kaca. Lo bisa main api di dalem, tapi asepnya gak bakal keluar ngeracunin kamar lo.
              </p>
            </div>
          </motion.div>

          {/* Practical Simulation: Inception OS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-900/50 border border-purple-900/40 rounded-sm p-8 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[400px] backdrop-blur-sm"
          >
            {/* Host OS Label */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
               <span className="text-[9px] text-blue-400 font-black uppercase tracking-widest">HOST_OS: WINDOWS_11</span>
            </div>

            {/* Visual Interface */}
            <div className="w-full max-w-sm mb-10">
               <div className="bg-black/80 rounded-lg border-2 border-gray-800 p-2 shadow-inner relative aspect-video flex items-center justify-center overflow-hidden">
                  <AnimatePresence mode="wait">
                    {!isVmOn ? (
                      <motion.div 
                        key="off"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-3"
                      >
                         <Monitor className="w-16 h-16 text-gray-800" />
                         <span className="text-[10px] text-gray-700 font-bold uppercase tracking-widest italic">VM_POWERED_OFF</span>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="on"
                        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
                        className="w-full h-full bg-[#1a1a1a] p-4 flex flex-col"
                      >
                         {/* Guest OS Header */}
                         <div className="flex justify-between items-center mb-4 border-b border-emerald-900/50 pb-2">
                            <div className="flex items-center gap-2">
                               <Terminal className="w-3 h-3 text-emerald-500" />
                               <span className="text-[8px] text-emerald-500 font-black">KALI_LINUX_GUEST</span>
                            </div>
                            <div className="flex gap-1">
                               <div className="w-1.5 h-1.5 rounded-full bg-red-500/50"></div>
                               <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50"></div>
                               <div className="w-1.5 h-1.5 rounded-full bg-green-500/50"></div>
                            </div>
                         </div>
                         {/* Hacking Terminal Visual */}
                         <div className="font-mono text-[8px] text-emerald-500/50 leading-none space-y-1">
                            <div>[SYSTEM] Booting Kernel...</div>
                            <div>[OK] Initializing Network Interface</div>
                            <div>[READY] Target Hacking Lab Active</div>
                            <div className="pt-4 text-emerald-400 font-black tracking-widest animate-pulse">
                               KALI_GUEST@ROOT:&gt; _
                            </div>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>
            </div>

            <button 
              onClick={() => setIsVmOn(!isVmOn)}
              className={`group px-8 py-3 rounded-sm font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-500 flex items-center justify-center gap-3 overflow-hidden relative border ${isVmOn ? 'bg-red-500/10 border-red-500 text-red-400 hover:bg-red-500 hover:text-white' : 'bg-purple-500/10 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-black shadow-[0_0_30px_rgba(168,85,247,0.2)]'}`}
            >
               <Power className={`w-4 h-4 transition-transform ${isVmOn ? 'rotate-180' : 'group-hover:scale-110'}`} />
               <span>{isVmOn ? 'SHUTDOWN VM' : 'NYALAKAN VIRTUAL MACHINE'}</span>
            </button>
          </motion.div>
        </div>

        {/* Tip Card */}
        <div className="p-6 bg-blue-950/20 border border-blue-500/20 rounded-xl mb-16 flex items-start gap-4 backdrop-blur-sm">
           <HelpCircle className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
           <p className="text-sm text-blue-100 italic leading-relaxed">
             "Host OS adalah sistem operasi utama laptop lo (misal Windows 11). Guest OS adalah sistem operasi yang jalan di dalem VM (misal Kali Linux). Keduanya terhubung kabel virtual tapi terpisah secara fisik!"
           </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-end items-center mt-12 bg-gray-900/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
          <Link 
            to="/academy/stage-2/modul-4/software-vm"
            className="flex items-center gap-3 bg-purple-500/10 border border-purple-500/50 text-purple-400 px-8 py-3 rounded-sm font-black transition-all group overflow-hidden relative shadow-[0_0_30px_rgba(168,85,247,0.1)] hover:bg-purple-500 hover:text-black"
          >
            <div className="absolute inset-0 bg-purple-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
            <span className="relative z-10 flex items-center gap-2 uppercase tracking-[0.2em] text-[10px]">
              LANJUT: VMWARE VS VIRTUALBOX <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IntroVirtualisasi;
