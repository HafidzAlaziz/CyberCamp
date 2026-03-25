import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Cloud, Server, ShieldCheck, Award } from 'lucide-react';

const KesimpulanCloud = () => {
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
              MODUL 1: KESIMPULAN
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
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }}>Risiko Berpindah Tempat</span>
              </h1>
            </section>

            <div className="space-y-6 text-sm leading-relaxed text-gray-400">
               <p>
                 Selamat! Lo udah nyelesain Modul 1 Cloud Security. 
                 Inti dari perdebatan Cloud vs On-Premises adalah: <span className="text-white font-bold underline decoration-cyan-500 underline-offset-4">Nggak Ada Yang 100% Aman</span>.
               </p>
               
               <p>
                 <span className="text-white font-bold italic">Cloud emang bikin hidup developer gampang banget!</span> Lo bisa bikin puluhan server dalam hitungan menit tanpa obeng. Tapi di sisi lain, Cloud bikin <span className="text-cyan-300 font-bold">pusing Security Engineer</span> kalau developer-nya sembarangan nge-aktifin fitur tanpa mikirin kemanan.
               </p>

               <div className="p-6 bg-cyan-900/10 border-l-4 border-cyan-500 space-y-2 rounded-r-xl">
                  <ShieldCheck className="w-6 h-6 text-cyan-400 mb-2" />
                  <p className="italic text-gray-300 font-bold">
                    "Migrasi ke Cloud berarti lo cuma mindahin risiko operasional fisik (seperti mati lampu atau gempa) ke pundak provider, TAPI lo TETEAP memegang full risiko konfigurasi atas data lo sendiri!"
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
                   <div className="relative">
                      <Cloud className="w-32 h-32 text-cyan-500 drop-shadow-[0_0_20px_rgba(6,182,212,0.6)]" />
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="absolute -bottom-4 -right-4 bg-gray-900 p-2 rounded-xl border border-cyan-500/50"
                      >
                         <Server className="w-8 h-8 text-white" />
                      </motion.div>
                   </div>
                   
                   <div className="text-center mt-6 space-y-2">
                     <p className="text-cyan-400 font-bold text-xs tracking-[0.3em] uppercase">Status Keahlian</p>
                     <p className="text-white font-black text-2xl italic tracking-tighter uppercase" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.8)' }}>
                       CLOUD ARCHITECT
                     </p>
                     <div className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-300 text-[10px] font-black tracking-widest border border-cyan-500/40 rounded-full">
                       V1: CLEARED
                     </div>
                   </div>
                </motion.div>
             </div>
          </motion.div>

        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link 
            to="/academy/stage-5/modul-1/shared-responsibility"
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

export default KesimpulanCloud;
