import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ShieldCheck, TerminalSquare, Trophy, Code2, Globe } from 'lucide-react';

const KesimpulanProgramming = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12 relative overflow-hidden">
      
      {/* Background Matrix Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden select-none">
        <div className="w-full h-[200%] absolute top-[-50%] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay animate-[spin_120s_linear_infinite]" />
        {/* Simple descending code effect */}
        <div className="w-full h-full absolute inset-0 flex space-x-4 overflow-hidden text-[10px] text-green-500 font-black tracking-widest opacity-30 px-4">
           {[...Array(20)].map((_, i) => (
             <motion.div 
               key={i} 
               initial={{ y: -100 }}
               animate={{ y: '100vh' }}
               transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, ease: 'linear', delay: Math.random() * 5 }}
               className="w-12 break-all"
             >
               {Math.random().toString(36).substring(2, 15)}<br/>
               {Math.random().toString(36).substring(2, 10)}<br/>
               010010<br/>
               110011<br/>
               var x = 0;
             </motion.div>
           ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-green-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/50">
            <Trophy className="w-8 h-8 text-green-400" />
          </div>
          <div>
            <h1 className="text-sm text-green-400 tracking-[0.3em] uppercase font-black">Stage 6 · Final Module</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              KESIMPULAN TAHAP 6
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
                Rekap Super <br/>
                <span className="text-green-500" style={{ textShadow: '0 0 10px rgba(34, 197, 94, 0.5)' }}>TAHAP 6!</span>
              </h1>
            </section>

            <div className="space-y-6 text-sm leading-relaxed text-gray-400">
               <p>
                 Selamat, Bos! 🔥 Lo udah namatin ranah Programming buat Cybersecurity. Lo sekarang bukan cuma bisa mencet tombol, tapi lo bisa <span className="text-white bg-green-900/50 px-2 py-0.5 rounded font-black italic uppercase tracking-widest border border-green-500/30">BIKIN TOMBOLNYA!</span>
               </p>
               
               <ul className="space-y-4">
                  <li className="flex items-start gap-4 p-4 bg-gray-900 border border-gray-800 rounded-xl relative overflow-hidden group">
                     <div className="p-2 bg-cyan-950/30 rounded border border-cyan-500/30 text-cyan-400 z-10">
                        <Code2 className="w-4 h-4"/>
                     </div>
                     <div className="flex-1 text-xs z-10">
                        <span className="text-cyan-400 font-bold uppercase tracking-widest block mb-1">M1: Python & Go</span>
                        Ahlinya bikin custom tools hacking (Brute-forcer cepet atau Malware EXE compiled yang mematikan).
                     </div>
                  </li>
                  
                  <li className="flex items-start gap-4 p-4 bg-gray-900 border border-gray-800 rounded-xl relative overflow-hidden group">
                     <div className="p-2 bg-yellow-950/30 rounded border border-yellow-500/30 text-yellow-500 z-10">
                        <Globe className="w-4 h-4"/>
                     </div>
                     <div className="flex-1 text-xs z-10">
                        <span className="text-yellow-400 font-bold uppercase tracking-widest block mb-1">M2: JavaScript & C++</span>
                        Pakar nyari celah. Paham nyusup via Web Browser korban (JS) atau ngancurin isi RAM langsung (C++).
                     </div>
                  </li>

                  <li className="flex items-start gap-4 p-4 bg-gray-900 border border-gray-800 rounded-xl relative overflow-hidden group">
                     <div className="p-2 bg-green-950/30 rounded border border-green-500/30 text-green-500 z-10">
                        <TerminalSquare className="w-4 h-4"/>
                     </div>
                     <div className="flex-1 text-xs z-10">
                        <span className="text-green-400 font-bold uppercase tracking-widest block mb-1">M3: Bash & PowerShell</span>
                        Dewa otomatisasi (LOTL). Nyerang dari dalem sistem Linux atau muter balik fitur bawaan Windows!
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
             <div className="relative group w-full max-w-sm aspect-square flex flex-col items-center justify-center border-4 border-green-500/50 rounded-[3rem] bg-gray-950 shadow-[0_0_50px_rgba(34,197,94,0.15)] hover:shadow-[0_0_80px_rgba(34,197,94,0.5)] hover:border-green-400 hover:rounded-full transition-all duration-700 overflow-hidden cursor-crosshair">
                
                {/* Visual Background fx */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/40 via-transparent to-transparent pointer-events-none group-hover:from-green-600/30 transition-colors" />
                
                {/* Badge Center */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 flex flex-col items-center gap-4 w-full"
                >
                   <div className="relative flex justify-center w-full">
                      <div className="p-6 bg-black border-2 border-green-500/50 rounded-2xl shadow-[0_0_30px_rgba(34,197,94,0.4)] group-hover:rotate-12 transition-transform duration-500 group-hover:scale-110">
                         <TerminalSquare className="w-16 h-16 text-green-400 group-hover:animate-pulse" />
                      </div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-dashed border-green-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
                   </div>
                   
                   <div className="text-center mt-8 space-y-2 px-2 z-20">
                     <p className="text-green-400 font-bold text-[10px] tracking-[0.4em] uppercase">Stage 6 Selesai</p>
                     <p className="text-white font-black text-2xl xs:text-3xl italic tracking-tighter uppercase leading-none drop-shadow-[0_0_15px_rgba(34,197,94,0.8)] text-green-50">
                       AUTOMATION MASTER
                     </p>
                     <div className="inline-block mt-3 px-6 py-2 bg-green-900/80 text-green-300 text-xs font-black tracking-widest border border-green-500 rounded shadow-lg shadow-green-900/50 group-hover:bg-green-600 group-hover:text-white transition-colors">
                       TIER 6 CLEARED ✓
                     </div>
                   </div>
                </motion.div>
             </div>
          </motion.div>

        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-green-500 shadow-2xl relative z-10">
          <Link 
            to="/academy/stage-6/modul-3/powershell-windows"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « SEBELUMNYA
          </Link>
          
          <Link 
            to="/academy"
            state={{ expandedId: 'programming-skills' }}
            className="flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
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

export default KesimpulanProgramming;
