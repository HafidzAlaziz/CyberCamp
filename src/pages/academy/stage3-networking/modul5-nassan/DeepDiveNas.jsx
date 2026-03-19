import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Server, Wifi, ShieldAlert, FileText, Lock, Mail, ChevronRight, ChevronLeft, Activity, Terminal, LayoutGrid } from 'lucide-react';

const DeepDiveNas = () => {
  const [infected, setInfected] = useState(false);
  const [filesLocked, setFilesLocked] = useState(false);

  const startAttack = () => {
    setInfected(true);
    setTimeout(() => {
      setFilesLocked(true);
    }, 2000);
  };

  const reset = () => {
    setInfected(false);
    setFilesLocked(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-red-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/50">
              <Server className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <h1 className="text-sm text-red-500 tracking-[0.3em] uppercase font-black">Stage 3: Networking</h1>
              <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
                MODUL 5: NAS Deep Dive
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
                Anatomi <br/>
                <span className="text-red-500" style={{ textShadow: '0 0 10px rgba(239, 68, 68, 0.5)' }}>NAS (Network Storage)</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                NAS itu sebenernya komputer kecil (server) yang isinya cuma Harddisk doang. Dia dicolok langsung ke Router pake kabel LAN.
              </p>
            </section>

            <div className="bg-cyan-500/5 border-l-4 border-cyan-500 p-6 space-y-4 rounded-r-xl">
              <h3 className="text-white font-black flex items-center gap-2 italic uppercase tracking-tighter text-sm">
                <Wifi className="w-5 h-5 text-cyan-500" /> Akses Via Jaringan
              </h3>
              <p className="text-xs text-gray-400">
                Data dikirim lewat protokol <span className="text-white font-bold italic">SMB (Windows)</span> atau <span className="text-white font-bold italic">NFS (Linux)</span>. Ibaratnya lo buka folder lewat WiFi.
              </p>
            </div>

            <section className="space-y-4">
              <h4 className="text-white font-black uppercase italic tracking-tighter flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-500" /> Kenapa Hacker Suka NAS?
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Hacker seneng banget sama NAS karena isinya data penting perusahaan. Sekali NAS kena jebol, semua data rahasia bisa di-copy atau yang paling parah: <span className="text-red-500 font-bold underline underline-offset-4 decoration-red-500/50">DI-RANSOMWARE!</span>
              </p>
            </section>

            <div className="p-4 bg-gray-900 border border-gray-800 rounded-xl">
              <p className="text-xs italic text-gray-500">
                NAS itu <span className="text-gray-200">File-Level Storage</span>. Artinya dia nyimpen dan ngatur data dalam bentuk File dan Folder, persis kayak di Explorer lo.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12">
            <div className="p-8 bg-gray-900/50 border-2 border-red-500/30 rounded-3xl backdrop-blur-sm relative overflow-hidden min-h-[500px] flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-black text-white mb-2 flex items-center gap-3 italic uppercase tracking-tighter">
                  <Terminal className="w-8 h-8 text-red-500" /> RANSOMWARE SIMULATOR
                </h2>
                <p className="text-gray-500 text-[10px] mb-8 uppercase tracking-[0.2em] font-black italic">Target: NAS Internal Perusahaan</p>

                <div className="bg-black/60 rounded-2xl p-6 border border-gray-800 relative mb-8">
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <motion.div 
                        key={i}
                        animate={filesLocked ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
                        className={`p-4 rounded-xl border flex flex-col items-center gap-2 ${filesLocked ? 'bg-red-500/20 border-red-500 text-red-500' : 'bg-gray-800/40 border-gray-700 text-gray-600'}`}
                      >
                        {filesLocked ? <Lock className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                        <span className="text-[8px] font-black uppercase tracking-tighter">DATA_{i}.PDF</span>
                      </motion.div>
                    ))}
                  </div>

                  <AnimatePresence>
                    {infected && !filesLocked && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-red-600/20 flex flex-col items-center justify-center backdrop-blur-[2px] rounded-2xl"
                      >
                        <Activity className="w-12 h-12 text-red-500 animate-pulse mb-2" />
                        <p className="text-red-500 font-black italic uppercase tracking-tighter">Encrypting Server...</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence>
                  {filesLocked && (
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-red-600 p-6 rounded-2xl text-center space-y-4 shadow-[0_0_30px_rgba(220,38,38,0.5)]"
                    >
                      <Skull className="w-12 h-12 text-white mx-auto" />
                      <div>
                        <h4 className="text-white font-black text-xl italic uppercase tracking-tighter leading-none mb-2">NAS LO KENA LOCK!</h4>
                        <p className="text-[10px] text-white leading-tight opacity-90 italic">Seluruh file di NAS tim lo udah dienkripsi. Bayar 10 Bitcoin atau data ilang selamanya!</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {!infected ? (
                <button 
                  onClick={startAttack} 
                  className="w-full py-4 bg-red-600 hover:bg-white text-white hover:text-red-600 font-black transition-all flex items-center justify-center gap-3 uppercase italic text-xs tracking-widest skew-x-[-12deg] shadow-lg"
                >
                  Kirim Phishing Ke Karyawan 🎣
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
        <div className="flex justify-end items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-red-500 shadow-2xl">
          <Link 
            to="/academy/stage-3/modul-5/san-deep-dive"
            className="flex items-center gap-3 bg-cyan-600 hover:bg-white text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
          >
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest leading-none uppercase">
              LANJUT KE DEEP DIVE SAN » <ChevronRight className="w-4 h-4 font-bold" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Skull = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2a5 5 0 0 0-5 5v3c0 1.1.9 2 2 2h6a2 2 0 0 0 2-2V7a5 5 0 0 0-5-5z"/><path d="M10 14h4v3a2 2 0 0 1-2 2h0a2 2 0 0 1-2-2v-3z"/><path d="M9 22h6"/><path d="M8 9h.01"/><path d="M16 9h.01"/>
  </svg>
);

export default DeepDiveNas;
