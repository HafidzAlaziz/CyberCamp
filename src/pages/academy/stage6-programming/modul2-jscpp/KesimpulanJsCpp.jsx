import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ShieldCheck, Globe, Cpu, Target } from 'lucide-react';

const KesimpulanJsCpp = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-fuchsia-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-fuchsia-500/10 rounded-lg border border-fuchsia-500/50">
            <ShieldCheck className="w-8 h-8 text-fuchsia-400" />
          </div>
          <div>
            <h1 className="text-sm text-fuchsia-400 tracking-[0.3em] uppercase font-black">Stage 6 · Modul 2: JavaScript & C++</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              KESIMPULAN JS & C++
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
                Rekap <br/>
                <span className="text-fuchsia-500" style={{ textShadow: '0 0 10px rgba(217, 70, 239, 0.5)' }}>KARIR ELIT</span>
              </h1>
            </section>

            <div className="space-y-6 text-sm leading-relaxed text-gray-400">
               <p>
                 Dua bahasa ini mencetak dua jenis Hacker dengan spesialisasi yang beda jauh, tapi dua-duanya adalah <span className="text-white font-bold decoration-fuchsia-500 underline underline-offset-4">skill termahal</span> di industri Cyber Security saat ini!
               </p>
               
               <ul className="space-y-4">
                  <li className="flex items-start gap-4 p-4 bg-gray-900 border border-gray-800 rounded-xl">
                     <div className="p-2 bg-yellow-950/30 rounded border border-yellow-500/30 text-yellow-500">
                        <Globe className="w-5 h-5"/>
                     </div>
                     <div className="flex-1 text-xs">
                        <span className="text-yellow-400 font-bold uppercase tracking-widest block mb-1">Bug Bounty Hunter (JS)</span>
                        Berfokus nyari celah di website raksasa macam Google/Facebook. Modalnya jago JavaScript buat nipu sistem mereka dapet hadiah ribuan dollar (XSS).
                     </div>
                  </li>
                  <li className="flex items-start gap-4 p-4 bg-gray-900 border border-gray-800 rounded-xl">
                     <div className="p-2 bg-blue-950/30 rounded border border-blue-500/30 text-blue-500">
                        <Cpu className="w-5 h-5"/>
                     </div>
                     <div className="flex-1 text-xs">
                        <span className="text-blue-400 font-bold uppercase tracking-widest block mb-1">Vulnerability Researcher (C/C++)</span>
                        Berstatus dewa. Mereka nggak nyerang web, tapi nyari celah langsung di jantung OS (Windows/Linux) pake teknik Reverse Engineering dan manipulasi memori.
                     </div>
                  </li>
               </ul>
            </div>
          </motion.div>

          {/* Right Column: Interactive Badge Display */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center p-8"
          >
             <div className="relative group w-full max-w-sm aspect-square flex flex-col items-center justify-center border-4 border-fuchsia-500/30 rounded-full bg-gray-900/80 shadow-[0_0_50px_rgba(217,70,239,0.15)] hover:shadow-[0_0_80px_rgba(217,70,239,0.4)] hover:border-fuchsia-400 transition-all duration-700 overflow-hidden">
                
                {/* Visual Background fx */}
                <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-900/40 to-transparent pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-fuchsia-500/10 blur-3xl rounded-full" />
                
                {/* Badge Center */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 flex flex-col items-center gap-4 w-full"
                >
                   <div className="relative flex justify-center w-full">
                      <div className="relative border-b-2 border-fuchsia-500/30 pb-4 w-full text-center flex justify-center">
                         <div className="relative z-10 flex justify-center items-center gap-4">
                            <div className="p-4 bg-yellow-950 border border-yellow-500/50 rounded-2xl shadow-[0_0_20px_rgba(234,179,8,0.4)] rotate-[-10deg]">
                              <Globe className="w-10 h-10 text-yellow-400" />
                            </div>
                            <Target className="w-6 h-6 text-fuchsia-500 opacity-50 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                            <div className="p-4 bg-blue-950 border border-blue-500/50 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.4)] rotate-[10deg]">
                              <Cpu className="w-10 h-10 text-blue-400" />
                            </div>
                         </div>
                      </div>
                   </div>
                   
                   <div className="text-center mt-6 space-y-2 px-2 z-20">
                     <p className="text-fuchsia-400 font-bold text-[10px] tracking-[0.4em] uppercase">Stage 6 Modul 2 Selesai</p>
                     <p className="text-white font-black text-2xl sm:text-3xl italic tracking-tighter uppercase leading-none drop-shadow-[0_0_15px_rgba(217,70,239,0.8)] text-fuchsia-50">
                       FRONTEND &<br/>CORE HACKER
                     </p>
                     <div className="inline-block mt-3 px-5 py-2 bg-fuchsia-500/20 text-fuchsia-300 text-xs font-black tracking-widest border border-fuchsia-500/50 rounded-full shadow-lg">
                       CLEARED ✓
                     </div>
                   </div>
                </motion.div>
             </div>
          </motion.div>

        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-fuchsia-500 shadow-2xl">
          <Link 
            to="/academy/stage-6/modul-2/cpp-memory"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « SEBELUMNYA
          </Link>
          
          <Link 
            to="/academy"
            state={{ expandedId: 'programming-skills' }}
            className="flex items-center gap-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
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

export default KesimpulanJsCpp;
