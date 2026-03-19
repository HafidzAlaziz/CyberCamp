import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Lock, Unlock, Key, User, ShieldAlert, ShieldCheck, ChevronRight, ChevronLeft, Skull, ArrowRight } from 'lucide-react';

const SymmetricAsymmetric = () => {
  const [tab, setTab] = useState('symmetric');

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-cyan-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/50">
            <Key className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 4: Security Skills</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              MODUL 2: Symmetric vs Asymmetric
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
            <div className="space-y-4">
              <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-tight">
                Duel Dua <br/>
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }}>METODE KUNCI</span>
              </h1>
            </div>

            <section className="space-y-6">
              <div className={`p-6 rounded-2xl border-2 transition-all duration-500 ${tab === 'symmetric' ? 'border-cyan-500 bg-cyan-500/5' : 'border-gray-800 bg-transparent opacity-50'}`}>
                <h3 className="text-white font-black flex items-center gap-2 uppercase italic tracking-tighter mb-2">
                  <Lock className="w-5 h-5 text-cyan-500" /> 1. Symmetric (Satu Kunci)
                </h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  Kunci buat <span className="text-white">NGE-LOCK</span> dan <span className="text-white">BUKA</span> pesannya itu <span className="text-cyan-400 font-bold underline">SAMA</span>. 
                  Gampang dipake, tapi bahaya pas lo mau ngasih kuncinya ke temen. Kalau kuncinya dicolong di jalan, wassalam!
                </p>
              </div>

              <div className={`p-6 rounded-2xl border-2 transition-all duration-500 ${tab === 'asymmetric' ? 'border-purple-500 bg-purple-500/5' : 'border-gray-800 bg-transparent opacity-50'}`}>
                <h3 className="text-white font-black flex items-center gap-2 uppercase italic tracking-tighter mb-2">
                  <Key className="w-5 h-5 text-purple-500" /> 2. Asymmetric (Dua Kunci)
                </h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  Kuncinya <span className="text-purple-400 font-bold underline">BEDA</span>! Ada <span className="text-white">Public Key</span> (Gembok yang dibagiin gratis) dan <span className="text-white">Private Key</span> (Kunci rahasia yang lo pegang sendiri). 
                  Inilah rahasia kenapa internet (HTTPS) bisa aman!
                </p>
              </div>
            </section>

            <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-xl space-y-3">
              <p className="text-red-500 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 italic">
                <ShieldAlert className="w-4 h-4" /> Security Warning
              </p>
              <p className="text-xs text-gray-500 leading-relaxed italic">
                Pake Symmetric itu kenceng tapi berisiko kuncinya bocor. Pake Asymmetric itu aman banget tapi prosesnya lebih berat. Di dunia nyata, kita pake <span className="text-white">DUA-DUANYA</span> sekaligus!
              </p>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12 h-fit">
            <div className="p-8 bg-gray-900/50 border-2 border-cyan-500/30 rounded-3xl backdrop-blur-sm relative overflow-hidden min-h-[550px] flex flex-col">
              
              {/* Tab Switcher */}
              <div className="flex bg-black/40 p-1.5 rounded-2xl mb-12 border border-gray-800">
                <button 
                  onClick={() => setTab('symmetric')}
                  className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${tab === 'symmetric' ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]' : 'text-gray-500 hover:text-white'}`}
                >
                  Symmetric
                </button>
                <button 
                  onClick={() => setTab('asymmetric')}
                  className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${tab === 'asymmetric' ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)]' : 'text-gray-500 hover:text-white'}`}
                >
                  Asymmetric
                </button>
              </div>

              <div className="flex-1 relative flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {tab === 'symmetric' ? (
                    <motion.div 
                      key="sym"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      className="space-y-12"
                    >
                      <div className="flex justify-between items-center relative">
                        {/* Users */}
                        <div className="flex flex-col items-center gap-2">
                          <div className="p-4 bg-gray-800 rounded-2xl border border-gray-700">
                            <User className="w-8 h-8 text-cyan-400" />
                          </div>
                          <span className="text-[10px] font-bold text-gray-600">BOB</span>
                        </div>

                        {/* Connection Line */}
                        <div className="flex-1 h-0.5 bg-gray-800 relative mx-4">
                           {/* Hacker in the middle */}
                           <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
                              <Skull className="w-6 h-6 text-red-500 animate-bounce" />
                              <span className="text-[8px] font-black text-red-500 tracking-widest">SNIFFER</span>
                           </div>

                           {/* Moving Key */}
                           <motion.div 
                             animate={{ x: [0, 240, 0] }}
                             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                             className="absolute top-1/2 -translate-y-1/2 p-2 bg-red-600 rounded shadow-[0_0_15px_rgba(220,38,38,0.5)] border border-white/20"
                           >
                              <Key className="w-4 h-4 text-white" />
                           </motion.div>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                          <div className="p-4 bg-gray-800 rounded-2xl border border-gray-700">
                            <User className="w-8 h-8 text-white" />
                          </div>
                          <span className="text-[10px] font-bold text-gray-600">ALICE</span>
                        </div>
                      </div>

                      <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl text-center">
                        <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest leading-relaxed">
                          ⚠️ "WARNING: Kunci Merah lewat di jalur yang sama. Hacker gampang nyolong dan buka kado lo!"
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="asym"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      className="space-y-12"
                    >
                      <div className="flex justify-between items-center relative">
                        <div className="flex flex-col items-center gap-2">
                          <div className="p-4 bg-gray-800 rounded-2xl border border-gray-700 relative">
                             <User className="w-8 h-8 text-purple-400" />
                             {/* Private Key stays here */}
                             <div className="absolute -bottom-2 -right-2 p-1.5 bg-purple-600 rounded-lg border-2 border-gray-900 shadow-lg">
                               <Key className="w-3 h-3 text-white" />
                             </div>
                          </div>
                          <span className="text-[10px] font-bold text-gray-600 italic">BOB (Owner)</span>
                        </div>

                        <div className="flex-1 h-0.5 bg-gray-800 relative mx-4">
                           {/* Public Key Moving */}
                           <motion.div 
                             animate={{ x: [0, 240, 0] }}
                             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                             className="absolute top-1/2 -translate-y-1/2 p-2 bg-emerald-500 rounded-full border-2 border-white/20"
                           >
                              <Unlock className="w-4 h-4 text-white" />
                           </motion.div>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                          <div className="p-4 bg-gray-800 rounded-2xl border border-gray-700 relative">
                            <User className="w-8 h-8 text-white" />
                          </div>
                          <span className="text-[10px] font-bold text-gray-600">ALICE</span>
                        </div>
                      </div>

                      <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl text-center">
                        <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest leading-relaxed">
                          ✅ "SAFE: Bob bagi-bagi gembok (Public Key). Kunci rahasianya (Private Key) gak pernah keluar dari rumah Bob!"
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Legend Footer */}
              <div className="mt-12 p-4 bg-black/40 rounded-2xl border border-gray-800 grid grid-cols-2 gap-4">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full" />
                    <span className="text-[8px] font-black text-gray-500 uppercase">Shared Key</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full" />
                    <span className="text-[8px] font-black text-gray-500 uppercase">Private Key</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span className="text-[8px] font-black text-gray-500 uppercase">Public Key</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    <span className="text-[8px] font-black text-gray-500 uppercase">HTTPS Protocol</span>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link 
            to="/academy/stage-4/modul-2/intro"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « KEMBALI KE INTRO
          </Link>
          
          <Link 
            to="/academy/stage-4/modul-2/hashing-gilingan"
            className="flex items-center gap-3 bg-cyan-600 hover:bg-white text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
          >
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest leading-none uppercase">
              LANJUT KE HASHING » <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SymmetricAsymmetric;
