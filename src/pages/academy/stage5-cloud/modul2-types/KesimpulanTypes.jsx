import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Cloud, Server, Box, Award, Code2 } from 'lucide-react';

const KesimpulanTypes = () => {
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
            <Award className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 5: Cloud Security</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              MODUL 2: KESIMPULAN
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
                Rekap: <br/>
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }}>Arsitek Cloud</span>
              </h1>
            </section>

            <div className="space-y-6 text-sm leading-relaxed text-gray-400">
               <p>
                 Lo udah menamatkan modul tipe-tipe Cloud! Intinya, milih tipe infrastruktur itu kayak milih kendaraan tempur yang disesuaian sama medan perangnya.
               </p>
               
               <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                     <span className="w-8 h-8 bg-blue-900/30 text-blue-400 flex items-center justify-center rounded-lg border border-blue-500/50 flex-shrink-0 font-bold">1</span>
                     <div>
                        <span className="text-white font-bold">Public Cloud:</span> Cocok buat gerak cepet (Agility) dan budget yang pas-pasan karena fleksibel nyewa sesuka hati.
                     </div>
                  </li>
                  <li className="flex items-start gap-4">
                     <span className="w-8 h-8 bg-emerald-900/30 text-emerald-400 flex items-center justify-center rounded-lg border border-emerald-500/50 flex-shrink-0 font-bold">2</span>
                     <div>
                        <span className="text-white font-bold">Private Cloud:</span> Harga sultan buat keamanan dan privasi tingkat dewa (Single-tenant isolation).
                     </div>
                  </li>
                  <li className="flex items-start gap-4">
                     <span className="w-8 h-8 bg-fuchsia-900/30 text-fuchsia-400 flex items-center justify-center rounded-lg border border-fuchsia-500/50 flex-shrink-0 font-bold">3</span>
                     <div>
                        <span className="text-white font-bold">Hybrid Cloud:</span> Jalan keluar andalan enterprise raksasa yang pengen kuat hadapin lonjakan traffic, tanpa harus ngorbanin privasi data Inti.
                     </div>
                  </li>
               </ul>

               <div className="p-6 bg-cyan-900/10 border-l-4 border-cyan-500 space-y-2 rounded-r-xl">
                  <Code2 className="w-6 h-6 text-cyan-400 mb-2" />
                  <p className="italic text-gray-300 font-bold">
                    "Sebagai orang Cybersecurity, tugas utama lo adalah mastiin arsitektur jaringan perusahaan naruh data rahasianya di tempat dan keranjang yang tepat."
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
                
                {/* Floating animation */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 flex flex-col items-center gap-4"
                >
                   <div className="relative flex justify-center w-full">
                      <div className="flex divide-x-2 divide-gray-900 overflow-hidden rounded-3xl border-2 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                          <div className="p-4 bg-gray-800 text-cyan-400"><Cloud className="w-16 h-16"/></div>
                          <div className="p-4 bg-cyan-900 text-white"><Server className="w-16 h-16"/></div>
                      </div>
                   </div>
                   
                   <div className="text-center mt-6 space-y-2">
                     <p className="text-cyan-400 font-bold text-xs tracking-[0.3em] uppercase">Status Keahlian</p>
                     <p className="text-white font-black text-2xl italic tracking-tighter uppercase" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.8)' }}>
                       CLOUD TOPOLOGIST
                     </p>
                     <div className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-300 text-[10px] font-black tracking-widest border border-cyan-500/40 rounded-full">
                       CLEARED
                     </div>
                   </div>
                </motion.div>
             </div>
          </motion.div>

        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link 
            to="/academy/stage-5/modul-2/hybrid-cloud"
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

export default KesimpulanTypes;
