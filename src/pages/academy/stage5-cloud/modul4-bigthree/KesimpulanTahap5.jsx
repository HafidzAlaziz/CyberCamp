import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ShieldCheck, Cloud, Server, Box, Hexagon } from 'lucide-react';

const KesimpulanTahap5 = () => {
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
            <ShieldCheck className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 5 · Modul Terakhir</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              KESIMPULAN TAHAP 5
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center min-h-[60vh]">
          
          {/* Left Column: Recap */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <section>
              <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-6 leading-tight">
                Gila Lo Bos! <br/>
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }}>LULUS TAHAP 5</span>
              </h1>
            </section>

            <div className="space-y-6 text-sm leading-relaxed text-gray-400">
               <p>
                 Selamat! Lo udah resmi namatin materi Cloud Security & Architecture. Lo udah nggak buta lagi soal "Awan" ini.
               </p>
               
               <p className="font-bold text-gray-300">Inti dari ilmu yang lo dapetin:</p>
               <ul className="space-y-4">
                  <li className="flex items-start gap-4 p-4 bg-gray-900 border border-gray-800 rounded-xl">
                     <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs">Arsitektur</span>
                     <div className="flex-1">
                        Paham bedanya nyimpen server di kantor (On-Prem) sama Public/Private/Hybrid Cloud.
                     </div>
                  </li>
                  <li className="flex items-start gap-4 p-4 bg-gray-900 border border-gray-800 rounded-xl">
                     <span className="text-purple-400 font-bold uppercase tracking-widest text-xs">Trinitas</span>
                     <div className="flex-1">
                        Hafal di luar kepala analogi pizza: <span className="text-white italic">IaaS</span> (nyewa dapur), <span className="text-white italic">PaaS</span> (delivery pizza), <span className="text-white italic">SaaS</span> (restoran mewah).
                     </div>
                  </li>
                  <li className="flex items-start gap-4 p-4 bg-gray-900 border border-gray-800 rounded-xl">
                     <span className="text-yellow-500 font-bold uppercase tracking-widest text-xs">Big Three</span>
                     <div className="flex-1">
                        Ngerti kekuatan dan titik buta <span className="text-white italic">AWS, Azure, </span>dan<span className="text-white italic"> GCP</span>. Termasuk horornya S3 Bucket yang lupa digembok dan bocornya API Key GitHub.
                     </div>
                  </li>
               </ul>

               <div className="p-6 bg-cyan-900/10 border-l-4 border-cyan-500 space-y-2 rounded-r-xl shadow-lg mt-8">
                  <p className="italic text-white font-black text-sm uppercase tracking-widest">
                    "Tanggung Jawab Bersama (Shared Responsibility)"
                  </p>
                  <p className="text-xs text-cyan-300 leading-relaxed">
                    Di Cloud, Provider urus keamanan fisik, TAPI LO yang ngurus keamanan data dan konfigurasi lo. Kalau lo lupa gembok folder, Provider lepas tangan. Jangan jadi admin IT nyebelin!
                  </p>
               </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Badge Display */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center p-8"
          >
             <div className="relative group w-full max-w-sm aspect-square flex flex-col items-center justify-center border-4 border-cyan-500/30 rounded-full bg-gray-900/80 shadow-[0_0_50px_rgba(6,182,212,0.15)] hover:shadow-[0_0_80px_rgba(6,182,212,0.3)] hover:border-cyan-400 transition-all duration-700 overflow-hidden">
                
                {/* Visual Background fx */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/20 to-transparent pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 blur-3xl rounded-full" />
                
                {/* Layer 3 logos / Hexagon */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 flex flex-col items-center gap-4 w-full"
                >
                   <div className="relative flex justify-center w-full">
                      <div className="relative">
                         <Hexagon className="w-32 h-32 text-cyan-500/30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90" strokeWidth={1} />
                         <div className="relative z-10 bg-cyan-950 p-6 rounded-3xl border border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.4)] flex justify-center items-center gap-3">
                            <Server className="w-10 h-10 text-orange-500" />
                            <Box className="w-10 h-10 text-blue-500" />
                            <Cloud className="w-10 h-10 text-green-500" />
                         </div>
                      </div>
                   </div>
                   
                   <div className="text-center mt-6 space-y-2 px-2">
                     <p className="text-cyan-400 font-bold text-xs tracking-[0.3em] uppercase">Stage 5 Selesai</p>
                     <p className="text-white font-black text-2xl italic tracking-tighter uppercase leading-none" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.8)' }}>
                       MULTI-CLOUD ARCHITECT
                     </p>
                     <div className="inline-block mt-2 px-4 py-1.5 bg-cyan-500/20 text-cyan-300 text-[10px] font-black tracking-widest border border-cyan-500/40 rounded-full shadow-lg">
                       TIER 5 CLEARED ✓
                     </div>
                   </div>
                </motion.div>
             </div>
          </motion.div>

        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link 
            to="/academy/stage-5/modul-4/azure-gcp"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « SEBELUMNYA
          </Link>
          
          <Link 
            to="/academy"
            state={{ expandedId: 'cloud-skills' }}
            className="flex items-center gap-3 bg-cyan-600 hover:bg-cyan-500 text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
          >
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest leading-none uppercase">
              KEMBALI KE HQ » <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default KesimpulanTahap5;
