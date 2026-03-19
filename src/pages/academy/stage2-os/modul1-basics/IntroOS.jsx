import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layout, Users, Settings, Cpu, ChevronRight, ArrowRight, Utensils, Info } from 'lucide-react';

const IntroOS = () => {
  const [step, setStep] = useState(0); // 0: Idle, 1: UserReq, 2: OSProcessing, 3: HardwareAction, 4: Done

  const runSimulation = () => {
    setStep(1);
    setTimeout(() => setStep(2), 1000);
    setTimeout(() => setStep(3), 2000);
    setTimeout(() => setStep(4), 3000);
  };

  const resetSimulation = () => setStep(0);

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
            <Layout className="w-8 h-8 text-blue-400" />
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
            <h3 className="text-2xl font-bold text-blue-400 mb-6 italic tracking-tight">Sang "Jembatan" Masa Depan 🌉</h3>
            <div className="space-y-4 text-base leading-relaxed text-gray-400">
              <p>
                Gampangnya, <span className="text-white font-bold italic">Sistem Operasi (OS)</span> itu jembatan antara lo (manusia) dan mesin (hardware). 
                Tanpa OS, lo harus ngetik kode biner <span className="text-blue-500 font-mono">010101</span> cuma buat muter lagu dangdut!
              </p>
              <p>
                 <span className="text-white font-black uppercase underline decoration-blue-500 underline-offset-4">Analogi Manajer Restoran:</span> 
                 Hardware itu <span className="italic">Koki</span> di dapur. Aplikasi itu <span className="italic">Pelanggan</span> yang laper. 
                 Pelanggan nggak bisa langsung nyuruh koki masak, harus lewat <span className="text-white font-bold px-1 bg-blue-600/20">OS/Manajer</span> biar dapurnya nggak rusuh.
              </p>
              <div className="p-4 bg-blue-500/5 border-l-2 border-blue-500 rounded-sm italic text-sm">
                 <span className="text-white font-black">Konteks Hacker:</span> Kenapa harus paham OS? Karena kalau lo mau nembus sebuah sistem, lo harus tau 'hukum' dan 'aturan' yang berlaku di situ. Beda OS, beda juga celahnya!
              </div>
            </div>
          </motion.div>

          {/* Practical Simulation: Manajer Restoran IT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-900/50 border border-gray-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden group"
          >
            <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-10 block text-center">
               Simulation: [ALUR_KERJA_OS_RESTAURANT]
            </h4>
            
            <div className="flex flex-col items-center gap-6 relative">
               {/* User Box */}
               <motion.div 
                 animate={step === 1 ? { scale: 1.1, borderColor: '#60a5fa' } : {}}
                 className={`w-full p-4 rounded-xl border-2 text-center transition-colors ${step === 1 ? 'bg-blue-500/10 border-blue-500' : 'bg-black border-gray-800'}`}
               >
                  <Users className={`w-6 h-6 mx-auto mb-2 ${step === 1 ? 'text-blue-400 grow-shadow' : 'text-gray-600'}`} />
                  <span className="text-[10px] font-black uppercase tracking-tighter">User (Pelanggan)</span>
                  <div className="text-[8px] text-gray-500 mt-1">"Buka Aplikasi Web!"</div>
               </motion.div>

               <div className="h-6 flex items-center justify-center">
                  <ArrowRight className={`w-4 h-4 rotate-90 transition-colors ${step >= 2 ? 'text-blue-500' : 'text-gray-800'}`} />
               </div>

               {/* OS Box */}
               <motion.div 
                 animate={step === 2 ? { scale: 1.1, borderColor: '#60a5fa' } : {}}
                 className={`w-full p-4 rounded-xl border-2 text-center transition-colors ${step === 2 ? 'bg-blue-500/10 border-blue-500' : 'bg-black border-gray-800'}`}
               >
                  <Settings className={`w-6 h-6 mx-auto mb-2 ${step === 2 ? 'text-blue-400 animate-spin' : 'text-gray-600'}`} />
                  <span className="text-[10px] font-black uppercase tracking-tighter">OS (Manajer)</span>
                  <div className="text-[8px] text-gray-500 mt-1">"Oke, Koki! Pakai 2GB RAM ya!"</div>
               </motion.div>

               <div className="h-6 flex items-center justify-center">
                  <ArrowRight className={`w-4 h-4 rotate-90 transition-colors ${step >= 3 ? 'text-blue-500' : 'text-gray-800'}`} />
               </div>

               {/* Hardware Box */}
               <motion.div 
                 animate={step === 3 ? { scale: 1.1, borderColor: '#60a5fa' } : {}}
                 className={`w-full p-4 rounded-xl border-2 text-center transition-colors ${step === 3 ? 'bg-blue-500/10 border-blue-500' : 'bg-black border-gray-800'}`}
               >
                  <Cpu className={`w-6 h-6 mx-auto mb-2 ${step === 3 ? 'text-blue-400' : 'text-gray-600'}`} />
                  <span className="text-[10px] font-black uppercase tracking-tighter">Hardware (Koki)</span>
                  <div className="text-[8px] text-gray-500 mt-1">"Pesanan Siap! Memproses..."</div>
               </motion.div>
            </div>

            <div className="mt-10">
               <button 
                 onClick={step === 0 || step === 4 ? runSimulation : null}
                 disabled={step > 0 && step < 4}
                 className="w-full py-4 bg-blue-600 hover:bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] transition-all rounded-sm disabled:opacity-30"
               >
                 {step === 4 ? 'ULANGI SIMULASI' : step > 0 ? 'MEMPROSES...' : 'BUKA APLIKASI WEB'}
               </button>
            </div>

            {step === 4 && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="mt-4 text-center text-[10px] text-emerald-400 font-bold uppercase tracking-widest animate-pulse"
              >
                ✓ APLIKASI BERHASIL DIBUKA!
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-end mt-12 pt-8 border-t border-gray-900">
          <Link 
            to="/academy/stage-2/modul-1/windows-matic"
            className="flex items-center gap-3 bg-blue-600 hover:bg-white text-black px-10 py-5 rounded-sm font-black transition-all group overflow-hidden relative skew-x-[-12deg]"
          >
            <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
            <span className="relative z-10 skew-x-[12deg] flex items-center gap-2 uppercase tracking-tighter">
               LANJUT: WINDOWS SI MATIC <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IntroOS;
