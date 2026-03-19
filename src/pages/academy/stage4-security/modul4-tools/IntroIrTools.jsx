import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Search, ChevronRight, Activity, Zap, Info, Target, Laptop, Database } from 'lucide-react';

const IntroIrTools = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [showDetected, setShowDetected] = useState(false);

  const startScan = () => {
    setIsScanning(true);
    setShowDetected(false);
    setTimeout(() => {
      setIsScanning(false);
      setShowDetected(true);
    }, 4000);
  };

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
            <Activity className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 4: Security Skills</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              MODUL 4: Incident Response Tools
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
              <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-8 leading-tight">
                Polisi <br/>
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }}>DI BENDAHARA (IR)</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Apa itu <span className="text-white font-bold underline decoration-cyan-500 underline-offset-4">Incident Response (IR)</span>? 
              </p>
            </section>

            <div className="space-y-6 text-sm leading-relaxed text-gray-400">
               <p>
                 Kalau ada maling masuk ke jaringan kantor, tim **IR** ini yang jadi polisinya. Mereka bukan nunggu kejadian, tapi langsung gercep nyari barang bukti.
               </p>
               
               <p className="text-white font-bold italic">Tugas utama tim IR:</p>
               <ul className="space-y-3">
                  <li className="flex gap-3 items-start">
                     <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                     <span>Nyari tau malingnya masuk lewat pintu (Port) mana.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                     <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                     <span>Ngecek apa aja data yang udah "telanjang" dicolong maling.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                     <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                     <span>Nutup celah biar malingnya gak balik lagi.</span>
                  </li>
               </ul>

               <p>
                 Dua tools wajib yang lo harus kuasai adalah <span className="text-emerald-400 font-black">Nmap</span> (buat ngecek pintu) dan <span className="text-blue-400 font-black">Wireshark</span> (buat nyadap isi paket data).
               </p>
            </div>

            <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl relative group">
               <Zap className="w-6 h-6 text-cyan-500 mb-4 animate-pulse" />
               <p className="text-xs italic leading-relaxed">
                 "Incident Response itu bukan cuma soal pinter coding, tapi soal seberapa teliti mata lo ngelihat hal aneh di ribuan baris data jaringan."
               </p>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12">
            <div className="p-8 bg-black border-2 border-cyan-500/30 rounded-3xl relative overflow-hidden min-h-[500px] flex flex-col items-center justify-center shadow-2xl group">
              
              <div className="mb-8 text-center relative z-10">
                 <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">RADAR JARINGAN</h2>
                 <p className="text-[9px] text-cyan-500 font-bold tracking-[0.2em] mt-1">SCAN_MODE: ACTIVE_RECON</p>
              </div>
              {/* Radar Grid Background */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" 
                style={{ 
                  backgroundImage: 'radial-gradient(circle, #06b6d4 1px, transparent 1px)', 
                  backgroundSize: '30px 30px' 
                }} 
              />

              {/* Radar UI */}
              <div className="relative w-64 h-64 border-2 border-cyan-500/30 rounded-full flex items-center justify-center">
                 {/* Rotating Sweep */}
                 <motion.div 
                   animate={isScanning ? { rotate: 360 } : { rotate: 0 }}
                   transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                   className={`absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent origin-center ${!isScanning && 'hidden'}`}
                 />

                 {/* Indicators */}
                 <div className="absolute inset-4 border border-cyan-500/10 rounded-full" />
                 <div className="absolute inset-12 border border-cyan-500/5 rounded-full" />
                 
                 {/* Center Icon */}
                 <Activity className={`w-8 h-8 ${isScanning ? 'text-cyan-400 animate-pulse' : 'text-gray-700'}`} />

                 {/* Detected Elements */}
                 <AnimatePresence>
                   {showDetected && !isScanning && (
                     <>
                       <motion.div 
                         initial={{ scale: 0, opacity: 0 }}
                         animate={{ scale: 1, opacity: 1 }}
                         className="absolute top-10 right-10 flex flex-col items-center gap-1"
                       >
                          <Database className="w-6 h-6 text-emerald-500" />
                          <span className="text-[8px] font-bold text-emerald-500 uppercase">SERVER_HQ</span>
                       </motion.div>

                       <motion.div 
                         initial={{ scale: 0, opacity: 0 }}
                         animate={{ scale: 1, opacity: 1 }}
                         className="absolute bottom-16 left-8 flex flex-col items-center gap-1"
                       >
                          <Laptop className="w-6 h-6 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                          <span className="text-[8px] font-bold text-red-500 uppercase tracking-tighter">ANOMALY_DETECTED</span>
                       </motion.div>
                     </>
                   )}
                 </AnimatePresence>
              </div>

              {/* Action Area */}
              <div className="relative z-10 w-full mt-12 space-y-4">
                 <button 
                   onClick={startScan}
                   disabled={isScanning}
                   className={`w-full py-4 rounded-xl font-black uppercase tracking-widest transition-all ${isScanning ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-cyan-600 hover:bg-white text-white hover:text-black shadow-[0_0_30px_rgba(6,182,212,0.3)]'}`}
                 >
                    {isScanning ? 'MENGHUBUNGI SATELIT...' : 'MULAI PEMINDAIAN JARINGAN'}
                 </button>

                 <div className="h-12 bg-gray-900/50 border border-gray-800 rounded-lg flex items-center px-4 overflow-hidden">
                    <p className={`text-[10px] italic font-mono ${showDetected ? 'text-red-400' : 'text-gray-600'}`}>
                       <AnimatePresence mode="wait">
                         {isScanning ? (
                            <motion.span key="sc" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Mendeteksi anomali di jaringan lokal...</motion.span>
                         ) : showDetected ? (
                            <motion.span key="det" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>ALERT: Terdeteksi 1 anomali di titik 192.168.1.13!</motion.span>
                         ) : (
                            <motion.span key="st">Ready to monitor packets...</motion.span>
                         )}
                       </AnimatePresence>
                    </p>
                 </div>
              </div>

              {/* Decorative Corner Icons */}
              <div className="absolute top-4 left-4 p-2 bg-cyan-950/20 border border-cyan-500/20 rounded">
                 <Target className="w-3 h-3 text-cyan-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link 
            to="/academy"
            state={{ expandedId: 'security-skills' }}
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « KEMBALI KE HQ
          </Link>

          <Link 
            to="/academy/stage-4/modul-4/nmap-scanner"
            className="flex items-center gap-3 bg-cyan-600 hover:bg-white text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
          >
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest leading-none uppercase">
              LANJUT KE "NMAP: SI PENGETOK PINTU" » <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IntroIrTools;
