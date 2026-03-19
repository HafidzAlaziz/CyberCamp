import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Terminal, MousePointer2, Layout, Zap, Info, ArrowRight, Folder, FileText, Image as ImageIcon } from 'lucide-react';

const IntroCli = () => {
  const [isHackerMode, setIsHackerMode] = useState(false);

  return (
    <div className={`min-h-screen transition-all duration-700 bg-gray-950 p-6 md:p-12 font-mono`}>
      <div className="max-w-4xl mx-auto">
        {/* Standardized Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-4 mb-12 border-b pb-6 pl-0 md:pl-32 ${isHackerMode ? 'border-cyan-900/30' : 'border-blue-900/10'}`}
        >
          <div className={`p-3 rounded-lg border transition-all ${isHackerMode ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'bg-blue-500/5 border-blue-500/20 text-blue-400'}`}>
            <Terminal className="w-8 h-8" />
          </div>
          <div>
            <h1 className={`text-sm tracking-[0.3em] uppercase font-black ${isHackerMode ? 'text-cyan-400' : 'text-blue-500'}`}>Stage 2: Operating Systems</h1>
            <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white">
              MODUL 3: GUI VS CLI
            </h2>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className={`text-2xl font-bold mb-6 italic tracking-tight uppercase transition-colors ${isHackerMode ? 'text-cyan-500' : 'text-blue-500'}`}>
              Kenapa Hacker Seneng Ngetik? ⌨️
            </h3>
            <div className={`space-y-4 text-base leading-relaxed transition-colors text-gray-400`}>
              <p>
                Pernah nanya kenapa hacker di film selalu ngetik di layar hitam? Padahal kan ada mouse tinggal klik-klik aja? Jawabannya: <span className={isHackerMode ? 'text-cyan-400 font-bold' : 'text-blue-600 font-bold'}>KONTROL TOTAL</span>.
              </p>
              
              <div className="space-y-4">
                <div className={`p-4 rounded-sm border-l-4 ${isHackerMode ? 'bg-cyan-500/5 border-cyan-500' : 'bg-blue-500/5 border-blue-500/50'}`}>
                   <p className="text-xs italic leading-relaxed">
                     <span className={`font-black uppercase tracking-widest block mb-1 underline ${isHackerMode ? 'text-cyan-400' : 'text-blue-400'}`}>Analogi Pesen Makan:</span>
                     <span className="font-bold text-white/80">GUI</span> itu kayak pesen makan di layar sentuh McD. Gampang, tinggal tunjuk gambar. Tapi lo cuma bisa pesen apa yang ada di menu. 
                     <br/><br/>
                     <span className="font-bold text-white/80">CLI (Terminal)</span> itu kayak lo masuk ke dapur dan ngomong langsung ke kokinya. Lo bisa minta bumbu khusus atau cara masak yang gak ada di menu. Ribet? Iya. Tapi hasilnya bisa persis apa yang lo mau!
                   </p>
                </div>
              </div>

              <p className="text-sm">
                Hacker pake <span className="font-bold">CLI</span> karena GUI itu lambat, makan banyak RAM, dan seringkali "menutup-nutupi" akses ke akar sistem yang sebenernya.
              </p>
            </div>
          </motion.div>

          {/* Practical Simulation: GUI to CLI Transformation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className={`border rounded-sm p-8 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[400px] transition-all duration-700 ${isHackerMode ? 'bg-black border-cyan-900/40 shadow-cyan-500/10' : 'bg-gray-900/30 border-white/5'}`}
          >
            {/* Simulation Header */}
            <div className="absolute top-8 left-8 flex items-center gap-2">
               <div className={`w-2 h-2 rounded-full animate-pulse ${isHackerMode ? 'bg-cyan-500' : 'bg-blue-500'}`}></div>
               <span className={`text-[9px] font-black uppercase tracking-widest ${isHackerMode ? 'text-cyan-500' : 'text-blue-500'}`}>
                  Interface: {isHackerMode ? 'TERMINAL_SESSION' : 'WINDOWS_EXPLORER'}
               </span>
            </div>

            {/* Visual Interface */}
            <div className="w-full max-w-sm mb-12 flex flex-col items-center">
               <AnimatePresence mode="wait">
                 {!isHackerMode ? (
                   <motion.div 
                     key="gui"
                     initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                     className="w-full bg-black/40 rounded border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl"
                   >
                      <div className="bg-white/5 px-3 py-1.5 border-b border-white/5 flex justify-between items-center">
                         <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/40"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/40"></div>
                         </div>
                         <span className="text-[8px] text-white/30 font-black uppercase tracking-[0.2em]">Windows_Filesystem</span>
                      </div>
                      <div className="p-8 grid grid-cols-3 gap-6">
                         <div className="flex flex-col items-center gap-3 group cursor-not-allowed">
                            <Folder className="w-10 h-10 text-yellow-500/60 transition-transform group-hover:scale-110" />
                            <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Backups</span>
                         </div>
                         <div className="flex flex-col items-center gap-3 group cursor-not-allowed">
                            <ImageIcon className="w-10 h-10 text-blue-500/60 transition-transform group-hover:rotate-12" />
                            <span className="text-[8px] font-black underline text-blue-400 uppercase tracking-widest">Photo.jpg</span>
                         </div>
                         <div className="flex flex-col items-center gap-3 group cursor-not-allowed">
                            <FileText className="w-10 h-10 text-gray-600" />
                            <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Readme.txt</span>
                         </div>
                      </div>
                   </motion.div>
                 ) : (
                   <motion.div 
                     key="cli"
                     initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                     className="w-full bg-gray-900 rounded border border-cyan-500/30 p-4 font-mono shadow-[0_0_30px_rgba(6,182,212,0.1)]"
                   >
                      <div className="text-[10px] text-cyan-500 mb-2 font-black tracking-widest leading-none">C:\SYSTEM\SECRET_FILES&gt;</div>
                      <div className="text-[11px] text-emerald-400/90 space-y-1">
                         <div className="animate-reveal-1 flex justify-between">
                            <span>03/15/2026  14:20  &lt;DIR&gt;</span>
                            <span className="font-black">Backups</span>
                         </div>
                         <div className="animate-reveal-2 flex justify-between">
                            <span>03/18/2026  09:45  42,891</span>
                            <span className="text-white border-b border-white hover:bg-white hover:text-black transition-colors cursor-pointer">Photo.jpg*</span>
                         </div>
                         <div className="animate-reveal-3 flex justify-between">
                            <span>03/19/2026  12:01  102</span>
                            <span>Readme.txt</span>
                         </div>
                         <div className="pt-2 animate-reveal-4 text-cyan-400">
                            <span>C:\SYSTEM\SECRET_FILES&gt; ls -la --all-access</span>
                            <span className="w-2 h-4 bg-cyan-400 inline-block ml-1 animate-pulse align-middle"></span>
                         </div>
                      </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>

            <button 
              onClick={() => setIsHackerMode(!isHackerMode)}
              className={`group px-8 py-3 rounded-sm font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-500 flex items-center justify-center gap-3 overflow-hidden relative border ${isHackerMode ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black shadow-[0_0_30px_rgba(6,182,212,0.3)]' : 'bg-gray-800 border-gray-950 text-white hover:bg-cyan-500'}`}
            >
               <div className={`absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ${isHackerMode ? 'bg-cyan-500' : 'bg-cyan-500'}`}></div>
               <Zap className={`w-4 h-4 relative z-10 transition-transform group-hover:scale-120 ${isHackerMode ? 'text-cyan-900 font-bold' : ''}`} />
               <span className="relative z-10 transition-colors">
                 {isHackerMode ? 'EXIT TO GUI MODE' : 'SWITCH TO HACKER MODE'}
               </span>
            </button>
          </motion.div>
        </div>

        {/* Info Card */}
        <div className={`p-6 rounded border-t-2 transition-all duration-500 mb-16 ${isHackerMode ? 'bg-cyan-950/20 border-cyan-500 text-cyan-100' : 'bg-gray-900/40 border-blue-500/30 text-gray-400 shadow-lg'}`}>
           <h4 className="flex items-center gap-2 font-black uppercase tracking-widest text-[10px] mb-3 text-white">
              <Info className={`w-4 h-4 ${isHackerMode ? 'text-cyan-500' : 'text-blue-500'}`} /> Lab_Notes: Interface Evolution
           </h4>
           <p className="text-sm italic italic leading-relaxed">
             "Lo gak butuh hardware baru buat jadi makin jago, lo cuma butuh beralih ke CLI. GUI itu dibikin buat orang awam biar gampang makenya. CLI dibikin buat profesional biar gampang ngaturnya."
           </p>
        </div>

        {/* Navigation */}
        <div className={`flex justify-end items-center mt-12 p-6 rounded-2xl border transition-all bg-gray-900/40 border-white/5 backdrop-blur-sm`}>
          <Link 
            to="/academy/stage-2/modul-3/perintah-ping"
            className={`flex items-center gap-3 px-8 py-3 rounded-sm font-black transition-all group overflow-hidden relative border ${isHackerMode ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-black shadow-[0_0_20px_rgba(6,182,212,0.1)]' : 'border-blue-500/50 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white shadow-[0_0_20px_rgba(59,130,246,0.1)]'}`}
          >
            <div className={`absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ${isHackerMode ? 'bg-cyan-500' : 'bg-blue-500'}`}></div>
            <span className="relative z-10 flex items-center gap-2 uppercase tracking-[0.2em] text-[10px]">
              LANJUT: PERINTAH PING <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes reveal {
          0% { opacity: 0; transform: translateX(-10px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-reveal-1 { animation: reveal 0.3s forwards; }
        .animate-reveal-2 { animation: reveal 0.3s forwards 0.2s; opacity: 0; }
        .animate-reveal-3 { animation: reveal 0.3s forwards 0.4s; opacity: 0; }
        .animate-reveal-4 { animation: reveal 0.3s forwards 0.6s; opacity: 0; }
      `}</style>
    </div>
  );
};

export default IntroCli;
