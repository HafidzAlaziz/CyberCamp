import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cloud, Server, ChevronRight, ChevronLeft, HardDrive, Zap, Loader2, CheckCircle2 } from 'lucide-react';

const IntroCloudOnPrem = () => {
  const [simState, setSimState] = useState('idle'); // 'idle', 'onprem-loading', 'onprem-done', 'cloud-done'
  const [loadingText, setLoadingText] = useState('');

  const handleOnPrem = () => {
    setSimState('onprem-loading');
    setLoadingText('Beli hardware...');
    setTimeout(() => setLoadingText('Pasang kabel...'), 1500);
    setTimeout(() => setLoadingText('Install OS...'), 3000);
    setTimeout(() => setSimState('onprem-done'), 4500);
  };

  const handleCloud = () => {
    setSimState('cloud-done');
  };

  const resetSim = () => {
    setSimState('idle');
    setLoadingText('');
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
            <Cloud className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 5: Cloud Security</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              Intro: Cloud vs On-Premises
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
                Brankas di Kamar vs <br/>
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }}>LOKER BANK RAKSASA</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Apa sih bedanya <span className="text-white font-bold underline decoration-cyan-500 underline-offset-4">On-Premises</span> dan <span className="text-white font-bold underline decoration-cyan-500 underline-offset-4">Cloud</span>? 
              </p>
            </section>

            <div className="space-y-6 text-sm leading-relaxed text-gray-400">
               <p>
                 Jaman dulu (<span className="text-white font-bold italic">On-Prem</span>), kalau perusahaan lo mau bikin web, lo harus beli komputer server yang harganya selangit, taruh di ruangan khusus ber-AC, dan bayar listrik nyala 24 jam nonstop. Ribet banget bos!
               </p>
               
               <p>
                 Sekarang (<span className="text-white font-bold italic">Cloud</span>), lo tinggal "sewa" komputer punya raksasa tech kayak Google, Amazon, atau Microsoft. Bayarnya meteran kayak listrik air (pay-as-you-go), dan server lo bisa langsung online dalam 5 menit! Analogi gampangnya: On-Prem itu nyimpen brankas di kamar sendiri, Cloud itu nyewa loker di Bank raksasa.
               </p>

               <div className="p-6 bg-cyan-900/10 border border-cyan-500/30 rounded-2xl relative overflow-hidden group">
                  <div className="flex items-center gap-3 mb-4">
                     <Zap className="w-5 h-5 text-cyan-400" />
                     <p className="text-white font-black italic uppercase tracking-widest text-[10px]">Konteks Hacker:</p>
                  </div>
                  <p className="italic text-gray-400 text-xs leading-relaxed">
                    "Dulu hacker nyerang sistem dengan cara nyamar jadi teknisi buat nyolokin flashdisk ke kabel fisik LAN kantor. Sekarang? Serangannya 100% lewat internet, nyari celah salah setting di Cloud lo."
                  </p>
               </div>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12">
            <div className="p-8 border-2 border-cyan-500/30 rounded-xl bg-gray-900/50 relative overflow-hidden min-h-[500px] flex flex-col shadow-2xl transition-colors duration-500">
              
              <div className="mb-8 text-center relative z-10">
                 <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">SIMULASI: BIKIN SERVER BARU</h2>
                 <p className="text-[9px] text-cyan-500 font-bold tracking-[0.2em] mt-1">PROVISIONING_TEST_V1</p>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-8 relative z-10">
                 
                 <AnimatePresence mode="wait">
                    {simState === 'idle' && (
                      <motion.div 
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6 w-full"
                      >
                         <div className="grid grid-cols-2 gap-4">
                            <button 
                              onClick={handleOnPrem}
                              className="p-6 flex flex-col items-center gap-4 bg-gray-800/50 border border-gray-600 rounded-xl hover:bg-gray-800 hover:border-gray-400 transition-all"
                            >
                               <HardDrive className="w-12 h-12 text-gray-400" />
                               <span className="font-bold text-xs uppercase text-gray-300 tracking-widest">Build On-Premise</span>
                            </button>
                            <button 
                              onClick={handleCloud}
                              className="p-6 flex flex-col items-center gap-4 bg-cyan-900/20 border border-cyan-500/30 rounded-xl hover:bg-cyan-900/40 hover:border-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                            >
                               <Cloud className="w-12 h-12 text-cyan-400" />
                               <span className="font-bold text-xs uppercase text-cyan-300 tracking-widest">Deploy to Cloud</span>
                            </button>
                         </div>
                      </motion.div>
                    )}

                    {simState === 'onprem-loading' && (
                      <motion.div 
                        key="onprem-loading"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-6"
                      >
                         <Loader2 className="w-16 h-16 text-gray-500 animate-spin mx-auto" />
                         <div className="space-y-2">
                            <p className="text-gray-400 font-bold text-sm tracking-widest uppercase">{loadingText}</p>
                            <div className="w-48 h-2 bg-gray-800 rounded-full overflow-hidden mx-auto">
                               <motion.div 
                                 className="h-full bg-gray-500"
                                 initial={{ width: "0%" }}
                                 animate={{ width: "100%" }}
                                 transition={{ duration: 4.5, ease: "linear" }}
                               />
                            </div>
                         </div>
                      </motion.div>
                    )}

                    {simState === 'onprem-done' && (
                      <motion.div 
                        key="onprem-done"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-6"
                      >
                         <Server className="w-20 h-20 text-gray-400 mx-auto" />
                         <p className="text-gray-300 font-black text-xl italic tracking-tighter uppercase">Berhasil setelah 1 bulan!</p>
                         <button 
                           onClick={resetSim}
                           className="text-[10px] text-cyan-500 underline underline-offset-4 hover:text-cyan-400 transition-all uppercase font-black"
                         >
                            Reset Skenario
                         </button>
                      </motion.div>
                    )}

                    {simState === 'cloud-done' && (
                      <motion.div 
                        key="cloud-done"
                        initial={{ opacity: 0, scale: 0.5, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="space-y-6"
                      >
                         <div className="relative">
                            <motion.div 
                              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="absolute inset-0 bg-cyan-500 blur-2xl opacity-20"
                            />
                            <Cloud className="w-24 h-24 text-cyan-400 mx-auto drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
                            <CheckCircle2 className="w-8 h-8 text-white absolute bottom-0 right-1/4 bg-cyan-500 rounded-full p-1" />
                         </div>
                         <div className="space-y-2">
                             <p className="text-cyan-400 font-black text-2xl italic tracking-tighter uppercase">Cring! Server siap dalam 5 detik!</p>
                             <p className="text-cyan-500/70 text-xs font-bold tracking-widest uppercase">Instant Provisioning Active</p>
                         </div>
                         <button 
                           onClick={resetSim}
                           className="text-[10px] text-gray-500 underline underline-offset-4 hover:text-white transition-all uppercase font-black"
                         >
                            Reset Skenario
                         </button>
                      </motion.div>
                    )}
                 </AnimatePresence>

              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link 
            to="/academy"
            state={{ expandedId: 'cloud-skills' }}
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « KEMBALI KE HQ
          </Link>
          
          <Link 
            to="/academy/stage-5/modul-1/security-dilemma"
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

export default IntroCloudOnPrem;
