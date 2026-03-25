import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Key, Server, ChevronRight, ChevronLeft, ShieldCheck, Banknote, ShieldAlert, Cpu, HardDrive } from 'lucide-react';

const PrivateCloud = () => {
  const [modal, setModal] = useState(0); // in millions (0 = 0)
  const [progress, setProgress] = useState(0); // 0 to 100
  const [hardwareBought, setHardwareBought] = useState(false);
  const [stepText, setStepText] = useState("Menunggu Keputusan Bos...");

  const handleBuy = () => {
    setHardwareBought(true);
    setModal(-1000); // minus 1 Miliar
    setStepText("Hardware Dibeli! Lanjut Setup Jaringan.");
  };

  const handleSetup = () => {
    if (!hardwareBought) return;
    if (progress < 50) {
      setProgress(prev => Math.min(prev + 10, 50));
      if (progress + 10 === 50) {
        setStepText("Jaringan Terhubung! Lanjut Install OS.");
      }
    }
  };

  const handleInstall = () => {
    if (progress < 50) return;
    if (progress < 100) {
      setProgress(prev => Math.min(prev + 10, 100));
      if (progress + 10 === 100) {
        setStepText("Private Cloud Siap Digunakan!");
      }
    }
  };

  const resetSim = () => {
    setModal(0);
    setProgress(0);
    setHardwareBought(false);
    setStepText("Menunggu Keputusan Bos...");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-cyan-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/50">
            <ShieldCheck className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 5: Cloud Security</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              MODUL 2: Private Cloud
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <section>
              <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-6 leading-tight">
                Rumah <br/>
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }}>GEDONGAN PRIBADI</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Apa itu <span className="text-white font-bold underline decoration-cyan-500 underline-offset-4">Private Cloud</span>?
              </p>
            </section>

            <div className="space-y-6 text-sm leading-relaxed text-gray-400">
               <p>
                 Ini kebalikannya Public Cloud! Konsepnya adalah <span className="text-white font-bold italic">Single-tenant</span>. Seluruh hardware, server, dan kabel-kabelnya cuma didedikasikan buat <span className="text-cyan-400 font-bold">1 perusahaan lo doang</span>. Gak ada yang namanya tetangga iseng!
               </p>
               
               <p>
                 Biasanya tipe cloud ini dipakai sama Bank, Rumah Sakit, Militer, atau Pemerintah yang aturan datanya ketat banget (Compliance). Karena eksklusif, lo punya kendali penuh atas keamanan dari fisik sampe software.
               </p>

               <div className="p-6 bg-cyan-900/10 border border-cyan-500/30 rounded-2xl relative overflow-hidden group">
                  <div className="flex items-center gap-3 mb-4">
                     <Key className="w-5 h-5 text-cyan-400" />
                     <p className="text-white font-black italic uppercase tracking-widest text-[10px]">Konteks Hacker:</p>
                  </div>
                  <p className="italic text-gray-400 text-xs leading-relaxed">
                    "Hacker susah banget nembus Private Cloud dari internet langsung. Makanya, mereka butuh nyerang 'orang dalem' (Insider Threat) entah nipu karyawan lewat phising, atau nge-bobol gerbang VPN kantornya dulu."
                  </p>
               </div>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12">
            <div className="p-8 border-2 border-cyan-500/30 rounded-xl bg-gray-900/50 relative overflow-hidden min-h-[500px] flex flex-col shadow-2xl transition-colors duration-500">
              
              <div className="mb-8 text-center relative z-10 flex flex-col items-center">
                 <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">SIMULASI: BANGUN BENTENG PRIVATE</h2>
                 <p className="text-[9px] text-cyan-500 font-bold tracking-[0.2em] mt-1">ON_PREM_CAPEX_SIMULATOR</p>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center py-4 text-center space-y-6 relative z-10 w-full">
                 
                 {/* Monitor Status */}
                 <div className="w-full h-32 bg-black/40 border border-cyan-500/20 rounded-xl p-4 flex flex-col relative overflow-hidden justify-center items-center group">
                    <Server className={`w-12 h-12 mb-2 transition-all duration-1000 ${progress === 100 ? 'text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]' : hardwareBought ? 'text-gray-500' : 'text-gray-800'}`} />
                    <p className={`text-xs font-bold uppercase tracking-widest ${progress === 100 ? 'text-cyan-300' : 'text-gray-500'}`}>{stepText}</p>
                    
                    {/* Visual Effect */}
                    {progress === 100 && (
                      <div className="absolute inset-0 bg-cyan-500/10 blur-xl pointer-events-none" />
                    )}
                 </div>

                 {/* Uang Modal Panel */}
                 <div className="w-full space-y-4">
                    <div className="bg-red-950/20 border border-red-500/20 p-4 rounded-xl flex items-center justify-between">
                       <div className="flex items-center gap-2 text-gray-400">
                          <Banknote className="w-5 h-5 text-gray-500" />
                          <span className="font-bold text-xs uppercase tracking-widest">Saldo Modal:</span>
                       </div>
                       <motion.div 
                         key={modal}
                         initial={{ scale: 1.2, color: '#ef4444' }}
                         animate={{ scale: 1, color: modal < 0 ? '#f87171' : '#9ca3af' }}
                         className="font-black text-xl font-mono"
                       >
                          {modal < 0 ? `- Rp ${Math.abs(modal)} Juta` : `Rp ${modal} Juta`}
                       </motion.div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-800 rounded-full h-3 mb-4 overflow-hidden border border-gray-700">
                      <div 
                        className="bg-cyan-500 h-3 rounded-full transition-all duration-300 ease-out flex items-center justify-end pr-2 overflow-hidden" 
                        style={{ width: `${progress}%` }}
                      >
                         <div className="w-full h-full bg-[linear-gradient(45deg,rgba(255,255,255,0.2)25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)50%,rgba(255,255,255,0.2)75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-scanline" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                       <button 
                         onClick={handleBuy}
                         disabled={hardwareBought}
                         className={`py-3 px-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all flex flex-col items-center justify-center gap-1 border ${!hardwareBought ? 'bg-cyan-600/20 text-cyan-400 border-cyan-500/50 hover:bg-cyan-500 hover:text-white' : 'bg-gray-800 text-gray-600 border-gray-700'}`}
                       >
                         Beli Hardware<span className="text-[8px] opacity-70 block -mt-1 font-mono">(Rp 1 Miliar)</span>
                       </button>
                       <button 
                         onClick={handleSetup}
                         disabled={!hardwareBought || progress >= 50}
                         className={`py-3 px-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all flex flex-col items-center justify-center gap-1 border ${(hardwareBought && progress < 50) ? 'bg-cyan-600/20 text-cyan-400 border-cyan-500/50 hover:bg-cyan-500 hover:text-white active:scale-95' : 'bg-gray-800 text-gray-600 border-gray-700'}`}
                       >
                         Setup Jaringan<span className="text-[8px] opacity-70 block -mt-1">{hardwareBought ? '(Klik berkali-kali)' : ''}</span>
                       </button>
                       <button 
                         onClick={handleInstall}
                         disabled={progress < 50 || progress >= 100}
                         className={`py-3 px-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all flex flex-col items-center justify-center gap-1 border ${(progress >= 50 && progress < 100) ? 'bg-cyan-600/20 text-cyan-400 border-cyan-500/50 hover:bg-cyan-500 hover:text-white active:scale-95' : 'bg-gray-800 text-gray-600 border-gray-700'}`}
                       >
                         Install OS<span className="text-[8px] opacity-70 block -mt-1">{progress >= 50 ? '(Klik berkali-kali)' : ''}</span>
                       </button>
                    </div>
                 </div>
                 
                 <div className="flex flex-col items-center justify-center mt-4">
                    <p className={`text-center font-bold text-[10px] uppercase max-w-xs transition-colors duration-500 ${progress === 100 ? 'text-cyan-400' : 'text-gray-500'}`}>
                      "Aman sih aman... tapi butuh modal awal super gede (CAPEX) dan setup yang bikin emosi. Beda banget sama Public Cloud yang tinggal klik!"
                    </p>
                    {progress === 100 && (
                      <button 
                        onClick={resetSim}
                        className="mt-4 text-[10px] text-gray-500 underline underline-offset-4 hover:text-cyan-400 transition-all uppercase font-black"
                      >
                         Reset Skenario
                      </button>
                    )}
                 </div>

              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link 
            to="/academy/stage-5/modul-2/public-cloud"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « SEBELUMNYA
          </Link>
          
          <Link 
            to="/academy/stage-5/modul-2/hybrid-cloud"
            className="flex items-center gap-3 bg-cyan-600 hover:bg-cyan-500 text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
          >
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest leading-none uppercase">
              SELANJUTNYA » <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivateCloud;
