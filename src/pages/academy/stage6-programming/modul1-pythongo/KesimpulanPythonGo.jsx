import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ShieldCheck, Hammer, Wrench, Code2, Cpu } from 'lucide-react';

const KesimpulanPythonGo = () => {
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
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 6 · Modul 1: Programming</h1>
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
                Rekap <br/>
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }}>SANG PANDAI BESI</span>
              </h1>
            </section>

            <div className="space-y-6 text-sm leading-relaxed text-gray-400">
               <p>
                 Sebagai Cyber Security Engineer, menguasai salah satu aja dari dua bahasa ini udah bikin lo jauh lebih jago dari 80% orang di industri! Lo bukan lagi Script Kiddie yang cuma bisa pake tool buatan orang lain.
               </p>
               
               <p className="font-bold text-gray-300">Pilih senjatamu sesuai kebutuhan:</p>
               <ul className="space-y-4">
                  <li className="flex items-start gap-4 p-4 bg-gray-900 border border-gray-800 rounded-xl">
                     <div className="p-2 bg-green-950/30 rounded border border-green-500/30 text-green-400">
                        <Code2 className="w-5 h-5"/>
                     </div>
                     <div className="flex-1 text-xs">
                        <span className="text-green-400 font-bold uppercase tracking-widest block mb-1">Si Pisau Lipat (Python)</span>
                        Beraksi mendadak, butuh <span className="text-white">library siap pakai</span> buat hacking web/jaringan, dan butuh nulis kode dalam hitungan menit.
                     </div>
                  </li>
                  <li className="flex items-start gap-4 p-4 bg-gray-900 border border-gray-800 rounded-xl">
                     <div className="p-2 bg-cyan-950/30 rounded border border-cyan-500/30 text-cyan-400">
                        <Cpu className="w-5 h-5"/>
                     </div>
                     <div className="flex-1 text-xs">
                        <span className="text-cyan-400 font-bold uppercase tracking-widest block mb-1">Si Gergaji Mesin (Go)</span>
                        Bikin tool malware sungguhan, <span className="text-white">multi-tasking paralel kilat</span>, gampang dicompile jadi .exe dan langsung dikirim tanpa syarat install apa-apa ke korban.
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
             <div className="relative group w-full max-w-sm aspect-square flex flex-col items-center justify-center border-4 border-cyan-500/30 rounded-full bg-gray-900/80 shadow-[0_0_50px_rgba(6,182,212,0.15)] hover:shadow-[0_0_80px_rgba(6,182,212,0.4)] hover:border-cyan-400 transition-all duration-700 overflow-hidden">
                
                {/* Visual Background fx */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/40 to-transparent pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full" />
                
                {/* Badge Center */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 flex flex-col items-center gap-4 w-full"
                >
                   <div className="relative flex justify-center w-full">
                      <div className="relative">
                         {/* Circle rings */}
                         <div className="w-32 h-32 rounded-full border border-dashed border-cyan-500/50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-[spin_10s_linear_infinite]" />
                         <div className="w-40 h-40 rounded-full border border-cyan-500/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-[pulse_3s_ease-in-out_infinite]" />
                         
                         <div className="relative z-10 bg-cyan-950 p-6 rounded-full border-2 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.6)] flex justify-center items-center gap-3">
                            <Hammer className="w-10 h-10 text-cyan-300 drop-shadow-[0_0_8px_rgba(103,232,249,0.8)] -mr-2 rotate-[-20deg]" />
                            <Wrench className="w-10 h-10 text-cyan-100 drop-shadow-[0_0_8px_rgba(207,250,254,0.8)] z-10" />
                         </div>
                      </div>
                   </div>
                   
                   <div className="text-center mt-8 space-y-2 px-2 z-20">
                     <p className="text-cyan-400 font-bold text-[10px] tracking-[0.4em] uppercase">Stage 6 Selesai</p>
                     <p className="text-white font-black text-3xl italic tracking-tighter uppercase leading-none drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] text-cyan-50">
                       TOOL FORGER
                     </p>
                     <div className="inline-block mt-3 px-5 py-2 bg-cyan-500/20 text-cyan-300 text-xs font-black tracking-widest border border-cyan-500/50 rounded-full shadow-lg">
                       CLEARED ✓
                     </div>
                   </div>
                </motion.div>
             </div>
          </motion.div>

        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link 
            to="/academy/stage-6/modul-1/go-speed"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « SEBELUMNYA
          </Link>
          
          <Link 
            to="/academy"
            state={{ expandedId: 'programming-skills' }}
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

export default KesimpulanPythonGo;
