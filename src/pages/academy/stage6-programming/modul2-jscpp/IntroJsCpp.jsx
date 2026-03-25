import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ShieldAlert, Cpu, Globe, LockKeyholeOpen, DatabaseZap, PlayCircle, Code2, Binary } from 'lucide-react';

const IntroJsCpp = () => {
  const [selectedTarget, setSelectedTarget] = useState(null); // 'js' or 'cpp'
  const [isHacked, setIsHacked] = useState(false);

  const handleSelect = (target) => {
    setSelectedTarget(target);
    setIsHacked(false);
    
    // Simulate hacking process
    setTimeout(() => {
      setIsHacked(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-fuchsia-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-fuchsia-500/10 rounded-lg border border-fuchsia-500/50">
            <Code2 className="w-8 h-8 text-fuchsia-400" />
          </div>
          <div>
            <h1 className="text-sm text-fuchsia-400 tracking-[0.3em] uppercase font-black">Stage 6 · Modul 2: JavaScript & C++</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              INTRO: JS & C++
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
              <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-6 leading-tight">
                Ninja Web vs <br/>
                <span className="text-fuchsia-500" style={{ textShadow: '0 0 10px rgba(217, 70, 239, 0.5)' }}>AHLI BEDAH</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Apa bedanya JavaScript (JS) dan C++ di dunia hacking? Beda alam, Bos!
              </p>
            </section>

            <div className="space-y-6 text-sm leading-relaxed text-gray-400">
               <ul className="space-y-4">
                  <li className="p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-yellow-500/30 transition-colors">
                     <span className="text-yellow-400 font-black uppercase tracking-widest text-xs mb-1 flex items-center gap-2">
                        <Globe className="w-4 h-4"/> JavaScript (JS)
                     </span>
                     JS itu hidupnya di Browser (Chrome, Safari). Kalo lo buka web, JS yang bikin visual nyala dan jalan. Hacker pake JS buat jadi <span className="text-white font-bold">"Ninja Web"</span>: nyusup nipu browser korban, nyolong <i>Cookie Login</i>, sampe maksa browser korban ngeklik tombol bayar tanpa sadar!
                  </li>
                  <li className="p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-blue-500/30 transition-colors">
                     <span className="text-blue-400 font-black uppercase tracking-widest text-xs mb-1 flex items-center gap-2">
                        <Cpu className="w-4 h-4" /> C++
                     </span>
                     C++ itu hidupnya di deket Hardware (Mesin). Dia <span className="text-white font-bold">"Ahli Bedah"</span> yang ngatur seberapa banyak memori RAM yang kepake. Hacker dewa pake C++ buat bikin Malware yang nancep langsung di jantung OS dan berurusan sama memori yang bikin Antivirus buta!
                  </li>
               </ul>

               <div className="p-6 bg-fuchsia-900/10 border-l-4 border-fuchsia-500 space-y-2 rounded-r-xl shadow-lg mt-8">
                  <div className="flex items-center gap-3 mb-2">
                     <ShieldAlert className="w-5 h-5 text-fuchsia-400" />
                     <p className="text-white font-black italic uppercase tracking-widest text-[10px]">Konteks Hacker:</p>
                  </div>
                  <p className="italic text-gray-300 text-xs leading-relaxed font-bold">
                    "Mau nyerang End-User lewat Website? Pelajari <span className="text-yellow-400">JavaScript</span>. Mau nyerang Sistem Operasi atau nge-hack program di PC korban? Pelajari <span className="text-blue-400">C++</span>."
                  </p>
               </div>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12">
            <div className={`p-8 border-2 rounded-xl relative overflow-hidden flex flex-col shadow-2xl transition-colors duration-500 ${isHacked && selectedTarget === 'js' ? 'border-yellow-500/50 bg-yellow-950/20' : isHacked && selectedTarget === 'cpp' ? 'border-blue-500/50 bg-blue-950/20' : 'border-fuchsia-500/30 bg-gray-900/50'}`}>
              
              <div className="mb-6 text-center relative z-10 flex flex-col items-center">
                 <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">SIMULASI: TARGET OPERASI</h2>
                 <p className="text-[9px] text-fuchsia-500 font-bold tracking-[0.2em] mt-1">ATTACK_VECTOR_SELECTION</p>
              </div>

              <div className="flex-1 flex flex-col space-y-4 relative z-10 w-full min-h-[300px]">
                 
                 {/* Action Area */}
                 <div className="w-full bg-[#0d1117] border border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-xl relative overflow-hidden flex-1">
                    
                    {!selectedTarget && (
                       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4 w-full">
                          <button 
                            onClick={() => handleSelect('js')}
                            className="w-full py-4 bg-yellow-600/20 hover:bg-yellow-600/40 border border-yellow-500/50 text-yellow-400 font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-3 drop-shadow-[0_0_10px_rgba(234,179,8,0.2)]"
                          >
                            <Globe className="w-5 h-5" /> Serang Web (JS)
                          </button>
                          
                          <button 
                            onClick={() => handleSelect('cpp')}
                            className="w-full py-4 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/50 text-blue-400 font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-3 drop-shadow-[0_0_10px_rgba(59,130,246,0.2)]"
                          >
                            <Binary className="w-5 h-5" /> Serang Sistem (C++)
                          </button>
                       </motion.div>
                    )}

                    {selectedTarget === 'js' && (
                       <AnimatePresence mode="wait">
                         {!isHacked ? (
                           <motion.div key="hacking_js" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-3">
                              <Globe className="w-12 h-12 text-yellow-500 animate-spin-slow" />
                              <p className="text-xs text-yellow-400 font-bold uppercase tracking-widest">Menyusup DOM Browser...</p>
                           </motion.div>
                         ) : (
                           <motion.div key="hacked_js" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-4">
                              <div className="relative">
                                <Globe className="w-16 h-16 text-yellow-400 opacity-50 absolute inset-0" />
                                <LockKeyholeOpen className="w-16 h-16 text-red-500 relative z-10 animate-pulse drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
                              </div>
                              <p className="text-xs text-yellow-300 font-black uppercase tracking-widest px-4 leading-relaxed">
                                 Browser korban berhasil dikuasai! <br/> Siap nyolong Cookie Login.
                              </p>
                              <button onClick={() => setSelectedTarget(null)} className="mt-4 text-[10px] text-gray-500 underline uppercase">Pilih Target Lain</button>
                           </motion.div>
                         )}
                       </AnimatePresence>
                    )}

                    {selectedTarget === 'cpp' && (
                       <AnimatePresence mode="wait">
                         {!isHacked ? (
                           <motion.div key="hacking_cpp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-3">
                              <Cpu className="w-12 h-12 text-blue-500 animate-pulse" />
                              <p className="text-xs text-blue-400 font-bold uppercase tracking-widest">Nge-Buffer Overflow Memori RAM...</p>
                           </motion.div>
                         ) : (
                           <motion.div key="hacked_cpp" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-4">
                              <div className="relative">
                                <Cpu className="w-16 h-16 text-blue-400 opacity-20 absolute inset-0" />
                                <DatabaseZap className="w-16 h-16 text-red-500 relative z-10 animate-bounce drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
                              </div>
                              <p className="text-xs text-blue-300 font-black uppercase tracking-widest px-4 leading-relaxed">
                                 Akses ke memori RAM berhasil! <br/> Siap menanam Rootkit di Jantung OS.
                              </p>
                              <button onClick={() => setSelectedTarget(null)} className="mt-4 text-[10px] text-gray-500 underline uppercase">Pilih Target Lain</button>
                           </motion.div>
                         )}
                       </AnimatePresence>
                    )}

                 </div>

              </div>
              
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-fuchsia-500 shadow-2xl">
          <Link 
            to="/academy"
            state={{ expandedId: 'programming-skills' }}
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « KEMBALI KE HQ
          </Link>
          
          <Link 
            to="/academy/stage-6/modul-2/js-ninja"
            className="flex items-center gap-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
          >
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest leading-none uppercase">
              SELANJUTNYA » <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IntroJsCpp;
