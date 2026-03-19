import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Cpu, Layout, Zap, Shield, AlertTriangle, CheckCircle2, ShoppingCart, Chrome } from 'lucide-react';

const CpuRam = () => {
  const [ramSize, setRamSize] = useState(2);
  const [isUpgrading, setIsUpgrading] = useState(false);

  const upgradeRAM = () => {
    setIsUpgrading(true);
    setTimeout(() => {
      setRamSize(8);
      setIsUpgrading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-cyan-900/30 pb-6"
        >
          <div className="p-3 bg-cyan-500/10 rounded-sm border border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            <Cpu className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-500 tracking-[0.3em] uppercase font-black">Hardware Phase_02</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">CPU & RAM: KOKI & MEJA</h2>
          </div>
        </motion.div>

        {/* 2-Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Material */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="space-y-6">
               <div className="space-y-2">
                  <h3 className="text-xl font-black text-white uppercase italic flex items-center gap-3">
                     <Cpu className="w-6 h-6 text-cyan-500" /> CPU (Prosesor): Si Koki
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Ini adalah <span className="text-cyan-400 font-bold italic">otak</span> atau Koki di dapur komputer lo. Dia yang mikir, ngitung, dan ngerjain semua pesenan perintah dari aplikasi. Makin kenceng CPU, makin cepet koki-nya masak!
                  </p>
               </div>

               <div className="space-y-2">
                  <h3 className="text-xl font-black text-white uppercase italic flex items-center gap-3">
                     <Layout className="w-6 h-6 text-purple-500" /> RAM (Memory): Meja Kerja
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Bayangin meja kerja koki. Makin luas mejanya (RAM gede), makin banyak bahan makanan (data) yang bisa ditaruh barengan. Kalau mejanya sempit (RAM 2GB), koki harus bolak-balik ke kulkas (Storage) buat ambil bahan, yang bikin komputer jadi <span className="text-red-500 font-black">LEMOT/LAG</span>.
                  </p>
               </div>
               
               <div className="p-6 bg-purple-900/10 border-l-4 border-purple-500 rounded-sm italic">
                  <span className="text-purple-400 font-black uppercase text-[10px] block mb-2 tracking-widest flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Hacker POV: Memory Forensics
                  </span>
                  Data sensitif kayak <span className="text-white font-bold">password</span> atau kunci enkripsi itu ibarat kertas resep yang ditaruh sementara di atas meja (RAM). Hacker bisa "motret" isi meja ini (dump memory) buat nyuri rahasia lo sebelum datanya dibuang!
               </div>
            </div>
          </motion.div>

          {/* Right Column: Simulation Case */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-900/50 border border-purple-500/30 rounded-xl p-8 shadow-2xl relative overflow-hidden flex flex-col items-center min-h-[500px]"
          >
            <div className="absolute top-4 left-4 flex items-center gap-2">
               <div className={`w-2 h-2 rounded-full ${ramSize < 4 ? 'bg-red-500' : 'bg-green-500'} animate-pulse`}></div>
               <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">SYSTEM_MONITOR: RAM_STRESS_TEST</span>
            </div>

            {/* Simulation Header */}
            <div className="mt-8 mb-12 text-center">
               <div className="flex justify-center gap-2 mb-4">
                  {[...Array(ramSize < 4 ? 8 : 4)].map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={{ 
                        opacity: [0.3, 1, 0.3],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ repeat: Infinity, delay: i * 0.1, duration: 2 }}
                    >
                      <Chrome className={`w-6 h-6 ${ramSize < 4 ? 'text-red-500' : 'text-cyan-500 opacity-50'}`} />
                    </motion.div>
                  ))}
               </div>
               <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest">Google Chrome: 12 Tab Terbuka</h4>
            </div>

            {/* Performance Bar */}
            <div className="w-full max-w-sm space-y-4">
               <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-tighter">Memory Capacity (RAM)</span>
                  <span className={`text-xl font-black italic ${ramSize < 4 ? 'text-red-500' : 'text-green-500'}`}>
                    {ramSize}GB
                  </span>
               </div>
               <div className="h-6 w-full bg-black/40 rounded-full border border-white/5 overflow-hidden p-1 shadow-inner">
                  <motion.div 
                    initial={{ width: '90%' }}
                    animate={{ width: ramSize < 4 ? '95%' : '30%' }}
                    className={`h-full rounded-full flex items-center justify-end px-3 transition-all duration-1000 ${ramSize < 4 ? 'bg-gradient-to-r from-orange-500 to-red-600 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]'}`}
                  >
                     <Zap className="w-3 h-3 text-white animate-pulse" />
                  </motion.div>
               </div>
               
               <AnimatePresence mode="wait">
                 {ramSize < 4 ? (
                   <motion.div 
                     key="warning"
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
                   >
                      <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                      <p className="text-[10px] font-bold text-red-400 uppercase leading-relaxed">
                        RAM PENUH! MEJA KERJA SEMPIT. KOMPUTER LEBIH LEMOT DARI SIPUT!
                      </p>
                   </motion.div>
                 ) : (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
                    >
                       <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                       <p className="text-[10px] font-bold text-green-400 uppercase leading-relaxed">
                         Sistem Lancar Jaya! Meja kerja luas. Koki bisa lari-lari!
                       </p>
                    </motion.div>
                 )}
               </AnimatePresence>
            </div>

            {/* Interaction Button */}
            <div className="mt-auto w-full pt-10">
               <button 
                 disabled={ramSize >= 8 || isUpgrading}
                 onClick={upgradeRAM}
                 className={`w-full py-4 rounded-sm font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-300 flex items-center justify-center gap-3 border ${ramSize >= 8 ? 'bg-gray-800 text-gray-600 border-gray-700 cursor-not-allowed' : 'bg-purple-600 text-white border-purple-400 shadow-[0_0_30px_rgba(147,51,234,0.4)] hover:bg-purple-500'}`}
               >
                  {isUpgrading ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                       <ShoppingCart className="w-4 h-4" />
                    </motion.div>
                  ) : ramSize >= 8 ? <CheckCircle2 className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                  <span>{isUpgrading ? 'MEMASANG RAM...' : ramSize >= 8 ? 'RAM TELAH DI-UPGRADE' : 'BELI RAM 8GB (+ Upgrade)'}</span>
               </button>
            </div>
          </motion.div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-20 bg-gray-900/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
          <Link 
            to="/academy/stage-1/modul-1/intro" 
            className="flex items-center gap-2 text-xs font-black text-gray-600 hover:text-white transition-all uppercase tracking-widest group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> SEBELUMNYA
          </Link>
          <Link 
            to="/academy/stage-1/modul-1/storage-motherboard"
            className="flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 px-8 py-3 rounded-sm font-black transition-all group overflow-hidden relative shadow-[0_0_30px_rgba(34,211,238,0.1)] hover:bg-cyan-500 hover:text-black"
          >
             <div className="absolute inset-0 bg-cyan-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
             <span className="relative z-10 flex items-center gap-2 uppercase tracking-[0.2em] text-[10px]">
              LANJUT: STORAGE & MOBO <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CpuRam;
