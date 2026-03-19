import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Cpu, Zap, Database } from 'lucide-react';

const CpuDanRam = () => {
  const [ramBlocks, setRamBlocks] = useState([]);

  const addRamBlock = () => {
    if (ramBlocks.length < 24) {
      setRamBlocks([...ramBlocks, Date.now()]);
    }
  };

  const clearRam = () => {
    setRamBlocks([]);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Standardized Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-cyan-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/50">
            <Cpu className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 1: Fundamentals</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              MODUL 1: COMPUTER HARDWARE
            </h2>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* CPU Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="p-6 bg-cyan-950/20 border-2 border-cyan-500/30 rounded-2xl relative group overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 flex flex-col items-center">
                  <Cpu className="w-32 h-32" />
               </div>
               
               <h2 className="text-3xl font-black text-white mb-4 flex items-center gap-3">
                 <div className="w-2 h-8 bg-cyan-500"></div>
                 CPU: Si Otak Gede
               </h2>
               
               <div className="space-y-4 text-sm leading-relaxed">
                 <p>
                   CPU (Central Processing Unit) itu ibarat otak yang gak pernah tidur. Segala macem perintah, mulai dari buka browser sampe main game, semuanya diproses di sini.
                 </p>
                 <div className="bg-black/50 p-4 border-l-4 border-cyan-500 rounded-r-lg">
                   <h4 className="text-cyan-400 font-bold mb-2 flex items-center gap-2">
                     <Zap className="w-4 h-4" /> Kacamata Hacker:
                   </h4>
                   <p className="italic text-cyan-100/70">
                     Malware lo butuh CPU buat nge-eksekusi kode jahatnya. Ada teknik namanya <span className="text-white">"CPU Hijacking"</span> atau <span className="text-white">"Cryptojacking"</span>, di mana hacker "minjem" tenaga CPU orang lain buat nambang crypto secara diem-diem. Licik banget kan?
                   </p>
                 </div>
               </div>

               {/* Visual: CPU Neon */}
               <div className="mt-8 flex justify-center">
                 <div className="w-48 h-48 border-4 border-cyan-500/50 rounded-xl relative flex items-center justify-center bg-cyan-500/5 shadow-[0_0_30px_rgba(6,182,212,0.2)] group-hover:shadow-[0_0_50px_rgba(6,182,212,0.4)] transition-all">
                    {/* CPU Pins Visual */}
                    {[...Array(20)].map((_, i) => (
                      <div key={i} className="absolute w-2 h-0.5 bg-cyan-500/50" style={{
                        top: i < 5 ? -2 : i < 10 ? 118 : i >= 15 ? 20 + (i-15) * 35 : 'auto',
                        left: i < 5 ? 20 + i * 30 : i < 10 ? 20 + (i-5) * 30 : i < 15 ? 20 + (i-10) * 30 : -2,
                        right: i >= 15 ? -2 : 'auto',
                        width: i >= 15 ? 10 : 2,
                        height: i >= 15 ? 2 : 10
                      }}></div>
                    ))}
                    <div className="text-center">
                       <Cpu className="w-16 h-16 text-cyan-400 mb-2 mx-auto animate-pulse" />
                       <div className="font-bold text-cyan-500 tracking-tighter">I7-CYBER-CORE</div>
                    </div>
                 </div>
               </div>
            </div>
          </motion.div>

          {/* RAM Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="p-6 bg-yellow-950/20 border-2 border-yellow-500/30 rounded-2xl relative overflow-hidden group">
               <h2 className="text-3xl font-black text-white mb-4 flex items-center gap-3">
                 <div className="w-2 h-8 bg-yellow-500"></div>
                 RAM: Ingatan Cefat
               </h2>
               
               <div className="space-y-4 text-sm leading-relaxed">
                 <p>
                   RAM (Random Access Memory) itu ingatan jangka pendek. Ibarat talenan di dapur, makin gede talenannya (RAM), makin banyak sayuran yang bisa lo potong barengan. Tapi begitu lo matiin komputer, semua datanya ilang! (Volatile).
                 </p>
                 <div className="bg-black/50 p-4 border-l-4 border-yellow-500 rounded-r-lg">
                   <h4 className="text-yellow-400 font-bold mb-2 flex items-center gap-2">
                     <Database className="w-4 h-4" /> Kacamata Hacker:
                   </h4>
                   <p className="italic text-yellow-100/70">
                     Di sinilah <span className="text-white">"RAM Forensics"</span> main. Banyak data sensitif kayak password, kunci enkripsi, atau jejak hacker yang lagi aktif nongkrong di RAM. Pas sistem nyala, RAM adalah tambang emas informasi!
                   </p>
                 </div>
               </div>

               {/* Visual & Hands-on: RAM Simulator */}
               <div className="mt-8">
                 <div className="flex justify-between items-end mb-4">
                   <div className="text-xs uppercase tracking-widest text-yellow-500/70 font-bold">RAM_BUFFER_VISUALIZER</div>
                   <div className="text-xs font-mono text-gray-500">{ramBlocks.length} / 24 BLOCKS</div>
                 </div>
                 
                 <div className="w-full bg-gray-900 border border-yellow-500/20 p-4 rounded-lg flex flex-wrap gap-2 min-h-[120px] content-start">
                    <AnimatePresence>
                      {ramBlocks.map((id) => (
                        <motion.div
                          key={id}
                          initial={{ scale: 0, opacity: 0, rotate: -45 }}
                          animate={{ scale: 1, opacity: 1, rotate: 0 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="w-10 h-10 bg-yellow-500/40 border border-yellow-500 rounded flex items-center justify-center text-[8px] font-bold text-white overflow-hidden"
                        >
                          <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(255,255,0,0.1)_2px,rgba(255,255,0,0.1)_4px)]"></div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {ramBlocks.length === 0 && (
                      <div className="w-full h-24 flex items-center justify-center text-gray-700 italic text-xs">
                        RAM KOSONG... SISTEM IDLE.
                      </div>
                    )}
                 </div>

                 <div className="flex gap-4 mt-6">
                    <button 
                      onClick={addRamBlock}
                      disabled={ramBlocks.length >= 24}
                      className="flex-1 py-3 bg-yellow-500 text-black font-bold text-xs uppercase hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_4px_10px_rgba(234,179,8,0.2)]"
                    >
                      ISI RAM (PUSH DATA)
                    </button>
                    <button 
                      onClick={clearRam}
                      className="px-6 py-3 border border-yellow-500/50 text-yellow-500 font-bold text-xs uppercase hover:bg-yellow-500/10 transition-colors"
                    >
                      FLUSH
                    </button>
                 </div>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 flex justify-between items-center bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
          <Link 
            to="/academy/stage-1/modul-1/intro"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors uppercase group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            BALIK KE INTRO
          </Link>
          
          <Link 
            to="/academy/stage-1/modul-1/storage-mobo"
            className="flex items-center gap-2 text-xs font-black text-cyan-400 hover:text-white transition-colors uppercase group animate-pulse"
          >
            GAS KE STORAGE & MOBO
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CpuDanRam;
