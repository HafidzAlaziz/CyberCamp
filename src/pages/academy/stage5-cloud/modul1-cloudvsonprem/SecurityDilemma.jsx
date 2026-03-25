import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Server, Cloud, ChevronRight, ChevronLeft, ShieldAlert, Waves, LockOpen, ArrowDownToLine, Skull, Database, AlertCircle, Wifi, DatabaseBackup } from 'lucide-react';

const SecurityDilemma = () => {
  const [activeTab, setActiveTab] = useState('onprem'); // 'onprem', 'cloud'
  const [simState, setSimState] = useState('idle'); // 'idle', 'disaster', 'hacked'

  const handleSimulate = () => {
    if (activeTab === 'onprem') setSimState('disaster');
    else setSimState('hacked');
  };

  const resetSim = () => setSimState('idle');

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
            <ShieldAlert className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 5: Cloud Security</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              Security Dilemma
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
                Aman Mana: <br/>
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }}>On-Prem vs Cloud?</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Setiap teknologi punya titik lemahnya sendiri. Gak ada yang 100% aman!
              </p>
            </section>

            <div className="space-y-6 text-sm leading-relaxed text-gray-400">
               <div className="p-5 bg-gray-900 border border-gray-700 rounded-xl">
                 <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Server className="w-5 h-5"/> Kelemahan On-Premises</h3>
                 <p className="mb-2">
                   Di On-Prem, lo emang pegang kendali 100%. Data super rahasia aman di tangan lo karena fisik servernya ada di gedung lo sendiri.
                 </p>
                 <p className="text-red-400 font-bold">
                   TAPI: <span className="text-gray-400 font-normal">Kalau gedung lo tiba-tiba kena banjir bandang atau gempa dhasyat, hardware lo rusak, data ludes semua tanpa sisa!</span>
                 </p>
               </div>
               
               <div className="p-5 bg-cyan-900/10 border border-cyan-500/30 rounded-xl">
                 <h3 className="text-lg font-bold text-cyan-400 mb-2 flex items-center gap-2"><Cloud className="w-5 h-5"/> Kelemahan Cloud</h3>
                 <p className="mb-2">
                   Di Cloud, infrastrukturnya "anti-bencana alam" karena servernya dicopy (direplikasi) di berbagai negara oleh AWS/Google. Gempa di satu negara, data tetap aman di negara lain.
                 </p>
                 <p className="text-red-400 font-bold">
                   TAPI: <span className="text-gray-400 font-normal">Kalau admin IT lo males dan bikin database-nya bisa diakses *Public* (gak dipassword), hacker dari ujung dunia manapun bisa nyedot data lo tanpa harus repot-repot ngejebol gedung!</span>
                 </p>
               </div>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12">
            <div className="p-8 border-2 border-cyan-500/30 rounded-xl bg-gray-900/50 relative overflow-hidden min-h-[500px] flex flex-col shadow-2xl transition-colors duration-500">
              
              <div className="mb-6 text-center relative z-10">
                 <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">SIMULASI: BENCANA VS HACKER</h2>
                 <p className="text-[9px] text-cyan-500 font-bold tracking-[0.2em] mt-1">THREAT_VECTOR_ANALYSIS</p>
              </div>

              {/* Tabs Container */}
              <div className="flex gap-2 mb-8 justify-center relative z-10 w-full max-w-sm mx-auto">
                 <button 
                   onClick={() => { setActiveTab('onprem'); setSimState('idle'); }}
                   className={`flex-1 py-3 px-4 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'onprem' ? 'bg-gray-800 border-gray-400 text-white' : 'bg-black/40 border-white/5 text-gray-500 hover:border-gray-500'}`}
                 >
                    On-Premises
                 </button>
                 <button 
                   onClick={() => { setActiveTab('cloud'); setSimState('idle'); }}
                   className={`flex-1 py-3 px-4 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'cloud' ? 'bg-cyan-600 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'bg-black/40 border-white/5 text-gray-500 hover:border-cyan-500/30'}`}
                 >
                    Cloud
                 </button>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center relative z-10">
                 
                 <AnimatePresence mode="wait">
                    {simState === 'idle' && (
                      <motion.div 
                        key={`idle-${activeTab}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6 w-full"
                      >
                         <div className="flex justify-center p-8 bg-black/40 rounded-2xl border border-white/5">
                            {activeTab === 'onprem' ? <Server className="w-20 h-20 text-blue-400" /> : <DatabaseBackup className="w-20 h-20 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />}
                         </div>
                         <button 
                           onClick={handleSimulate}
                           className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'onprem' ? 'bg-blue-900/50 text-blue-300 border border-blue-500/50 hover:bg-blue-600 hover:text-white' : 'bg-red-900/50 text-red-400 border border-red-500/50 hover:bg-red-600 hover:text-white'}`}
                         >
                           {activeTab === 'onprem' ? 'Simulasikan Banjir' : 'Set Database ke Public'}
                         </button>
                      </motion.div>
                    )}

                    {simState === 'disaster' && activeTab === 'onprem' && (
                      <motion.div 
                        key="disaster"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-6 relative"
                      >
                         <motion.div 
                           animate={{ y: [0, -10, 0] }}
                           transition={{ duration: 1, repeat: Infinity }}
                           className="relative"
                         >
                            <div className="absolute inset-0 bg-blue-600/40 blur-xl animate-pulse rounded-full" />
                            <Waves className="w-24 h-24 text-blue-400 mx-auto relative z-10" />
                            <Server className="w-12 h-12 text-gray-700 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 opacity-50 z-0" />
                         </motion.div>
                         <p className="text-blue-400 font-black text-xl italic tracking-tighter uppercase relative z-10">Gedung kebanjiran, server mati total!</p>
                         <button 
                           onClick={resetSim}
                           className="text-[10px] text-gray-500 underline underline-offset-4 hover:text-white transition-all uppercase font-black"
                         >
                            Reset Skenario
                         </button>
                      </motion.div>
                    )}

                    {simState === 'hacked' && activeTab === 'cloud' && (
                      <motion.div 
                        key="hacked"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6 w-full"
                      >
                         <div className="relative h-40 flex items-center justify-between px-10 border border-red-500/20 bg-red-950/20 rounded-2xl overflow-hidden">
                            <Wifi className="w-8 h-8 text-cyan-400 absolute top-4 left-4 opacity-30" />
                            
                            {/* Database Side */}
                            <div className="relative z-10 flex flex-col items-center ml-4">
                               <Database className="w-16 h-16 text-cyan-500 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                               <motion.div 
                                 initial={{ scale: 0 }} 
                                 animate={{ scale: 1 }} 
                                 className="absolute -bottom-2 -right-2 bg-red-900/90 p-1.5 rounded-full border border-red-500/50"
                               >
                                  <LockOpen className="w-5 h-5 text-red-500 animate-pulse" />
                               </motion.div>
                            </div>
                            
                            {/* Data Sucking Animation */}
                            <motion.div 
                              className="flex items-center gap-2"
                              animate={{ x: [0, -20, 0] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                               <span className="hidden sm:inline-block text-[9px] text-red-400 font-bold uppercase tracking-widest leading-none self-center bg-red-950/50 px-2 py-1 border border-red-500/20 rounded-sm">Maling data</span>
                               <ArrowDownToLine className="w-6 h-6 text-red-500 rotate-90" />
                            </motion.div>

                            {/* Hacker Side */}
                            <div className="relative z-10 flex flex-col items-center gap-2 mr-4">
                               <Skull className="w-16 h-16 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
                            </div>
                         </div>
                         <p className="text-red-400 font-black text-sm italic tracking-tighter uppercase">
                           Gak perlu banjir, salah klik settingan aja data langsung disedot Hacker!
                         </p>
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
              
              {/* Background red tint for hacked state */}
              {simState === 'hacked' && (
                 <div className="absolute inset-0 bg-red-900/10 pointer-events-none transition-colors duration-1000" />
              )}
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link 
            to="/academy/stage-5/modul-1/intro"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « SEBELUMNYA
          </Link>
          
          <Link 
            to="/academy/stage-5/modul-1/shared-responsibility"
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

// Cleaned up unused components

export default SecurityDilemma;
