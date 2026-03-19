import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Database, ShieldCheck, ShieldAlert, Cpu, Zap, Network, Terminal, Wifi, ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';

const DeepDiveSan = () => {
  const [showVirus, setShowVirus] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const testDefense = () => {
    setShowVirus(true);
    setTimeout(() => {
      setShowResult(true);
    }, 2000);
  };

  const reset = () => {
    setShowVirus(false);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-blue-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/50">
              <Zap className="w-8 h-8 text-blue-500 font-bold" />
            </div>
            <div>
              <h1 className="text-sm text-blue-500 tracking-[0.3em] uppercase font-black">Stage 3: Networking</h1>
              <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
                MODUL 5: SAN Deep Dive
              </h2>
            </div>
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
              <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-8 leading-tight">
                SAN: Penyimpanan <br/>
                <span className="text-blue-500" style={{ textShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }}>Level Dewa (Block)</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Kalau NAS itu folder lewat WiFi, SAN itu ibaratnya lo punya kabel Harddisk sepanjang 1 KM yang nyolok ke server. Sangat cepet dan stabil!
              </p>
            </section>

            <div className="bg-blue-500/5 border-l-4 border-blue-500 p-6 space-y-4 rounded-r-xl">
              <h3 className="text-white font-black flex items-center gap-2 italic uppercase tracking-tighter text-sm">
                <Network className="w-5 h-5 text-blue-400" /> Jaringan Khusus (Fibre Channel)
              </h3>
              <p className="text-[11px] text-gray-500">
                SAN nggak lewat jaringan WiFi kantor biasa. Dia punya jalan tol sendiri pake kabel Fiber Optic. Makanya dia <span className="text-white font-bold italic">Block-Level</span>, server nganggep SAN itu Harddisk internal dia sendiri.
              </p>
            </div>

            <section className="space-y-4">
              <h4 className="text-white font-black uppercase italic tracking-tighter flex items-center gap-2 text-xs">
                <ShieldCheck className="w-5 h-5 text-blue-500" /> Keunggulan SAN:
              </h4>
              <ul className="space-y-3">
                <li className="flex gap-3 text-xs text-gray-400">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0 shadow-[0_0_5px_#3b82f6]" />
                  <span><span className="text-white font-bold">Speed Edan:</span> Gak ada lag buat database gede.</span>
                </li>
                <li className="flex gap-3 text-xs text-gray-400">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0 shadow-[0_0_5px_#3b82f6]" />
                  <span><span className="text-white font-bold">Resilience:</span> Kalo satu jalur kabel putus, ada jalur lain (Redundant).</span>
                </li>
              </ul>
            </section>

            <p className="text-xs italic text-gray-500 border-l-2 border-gray-800 pl-4 py-2 leading-relaxed">
              "SAN itu mahal dan ribet settingnya. Biasanya cuma perusahaan gede kayak Bank atau E-Commerce raksasa yang pake ini."
            </p>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12">
            <div className="p-8 bg-gray-900/50 border-2 border-blue-500/30 rounded-3xl backdrop-blur-sm relative overflow-hidden min-h-[500px] flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-black text-white mb-2 flex items-center gap-3 italic uppercase tracking-tighter">
                  <Cpu className="w-8 h-8 text-blue-500" /> DEFENSE TEST: SAN STABILITY
                </h2>
                <p className="text-gray-500 text-[10px] mb-8 uppercase tracking-[0.2em] font-black italic">Simulasi: Serangan DDoS ke Jaringan Storage</p>

                <div className="bg-black/60 rounded-2xl p-8 border border-gray-800 relative mb-8 overflow-hidden">
                  <div className="flex justify-around items-center h-24">
                    <Database className="w-12 h-12 text-blue-500 shadow-[0_0_20px_#3b82f6]" />
                    <div className="flex-1 flex justify-center relative">
                      <div className="h-1 w-full bg-gray-800" />
                      <AnimatePresence>
                        {showVirus && (
                          <motion.div 
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 100, opacity: 1 }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="absolute top-1/2 -translate-y-1/2"
                          >
                            <ShieldAlert className="w-6 h-6 text-red-500" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <Database className="w-12 h-12 text-blue-500 shadow-[0_0_20px_#3b82f6]" />
                  </div>

                  <AnimatePresence>
                    {showResult && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 p-4 bg-emerald-500/20 border border-emerald-500 rounded-xl text-center"
                      >
                        <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                        <p className="text-emerald-400 font-black italic text-xs uppercase tracking-widest">SAN SURVIVED!</p>
                        <p className="text-[10px] text-gray-400 mt-1 italic">Jaringan Fiber Optic tetep stabil meski dihajar trafik sampah.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {!showVirus ? (
                <button 
                  onClick={testDefense} 
                  className="w-full py-4 bg-blue-600 hover:bg-white text-white hover:text-blue-600 font-black transition-all flex items-center justify-center gap-3 uppercase italic text-xs tracking-widest skew-x-[-12deg] shadow-[0_0_20px_#3b82f644]"
                >
                  Gempur Jaringan Storage 💣
                </button>
              ) : (
                <button 
                  onClick={reset}
                  className="w-full py-4 bg-gray-800 hover:bg-white text-gray-500 hover:text-black font-black transition-all uppercase text-[10px] tracking-widest skew-x-[-12deg]"
                >
                  Reset Simulasi 🧹
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-end items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-blue-500 shadow-2xl">
          <Link 
            to="/academy/stage-3/modul-5/kesimpulan-storage"
            className="flex items-center gap-3 bg-cyan-600 hover:bg-white text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
          >
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest leading-none uppercase">
              LANJUT KE KESIMPULAN » <ChevronRight className="w-4 h-4 font-bold" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeepDiveSan;
