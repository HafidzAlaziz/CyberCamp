import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ShieldAlert, Cpu, Database, AlertTriangle, MonitorX, Send, Binary, ServerCrash, TerminalSquare } from 'lucide-react';

const CppMemory = () => {
  const [inputValue, setInputValue] = useState('');
  const [slotA, setSlotA] = useState([]); // Max 5 chars
  const [slotB, setSlotB] = useState('FALSE'); // Admin status
  const [isOverflow, setIsOverflow] = useState(false);

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (!inputValue) return;
    
    // Simulate C++ copying string into fixed 5-byte buffer without bounds checking
    const chars = inputValue.split('');
    const aChars = chars.slice(0, 5);
    const overflowChars = chars.slice(5);

    setSlotA(aChars);

    if (overflowChars.length > 0) {
      setIsOverflow(true);
      setSlotB('TRUE (OVERWRITTEN)');
    } else {
      setIsOverflow(false);
      setSlotB('FALSE');
    }
  };

  const handleReset = () => {
    setInputValue('');
    setSlotA([]);
    setSlotB('FALSE');
    setIsOverflow(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-blue-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/50">
            <Binary className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-sm text-blue-400 tracking-[0.3em] uppercase font-black">Stage 6 · Modul 2: JavaScript & C++</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              C++: SANG AHLI BEDAH
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
                Mimpi Buruk <br/>
                <span className="text-blue-500" style={{ textShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }}>BUFFER OVERFLOW</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Di bahasa C/C++, programmer dikasih wewenang mutlak buat ngatur Memori RAM sendiri.
              </p>
            </section>

            <div className="space-y-6 text-sm leading-relaxed text-gray-400">
               <p>
                 Ibarat kata, programmer dikasih tugas nyediain gelas. Kalau programmer bilang "Siapin gelas ukuran 100ml buat nampung nama user", komputer bakal ngasih memori persis 100ml.
               </p>
               
               <p>
                 <strong className="text-white">Pertanyaannya:</strong> Gimana kalau ada user nakal yang ngisi input nama sepanjang 200ml?
               </p>

               <ul className="space-y-4">
                  <li className="flex items-start gap-4 p-4 bg-gray-900 border border-gray-800 rounded-xl">
                     <div className="p-2 bg-red-950/30 rounded border border-red-500/30 text-red-500">
                        <ServerCrash className="w-5 h-5"/>
                     </div>
                     <div className="flex-1 text-xs">
                        <span className="text-red-400 font-bold uppercase tracking-widest block mb-1">Tumpah (Overflow!)</span>
                        Di bahasa modern kayak Python/Java, gelas bakal otomatis membesar. Tapi di C++, 100ml sisanya bakal TUMPAH dan menimpa data memori di sebelahnya!
                     </div>
                  </li>
               </ul>

               <div className="p-6 bg-blue-900/10 border-l-4 border-blue-500 space-y-2 rounded-r-xl shadow-lg mt-8">
                  <div className="flex items-center gap-3 mb-2">
                     <ShieldAlert className="w-5 h-5 text-blue-400" />
                     <p className="text-white font-black italic uppercase tracking-widest text-[10px]">Konteks Hacker:</p>
                  </div>
                  <p className="italic text-gray-300 text-xs leading-relaxed font-bold">
                    "Hacker sengaja masukin kata yang super panjang (misal HACKER_JAHAT). Huruf lebihannya ini sengaja diarahkan buat menimpa variabel di sebelahnya. Misalnya, numpahin huruf ke variabel <span className="text-blue-400 font-mono bg-blue-950 px-1 py-0.5 rounded">isAdmin=false</span> jadi <span className="text-red-400 font-mono bg-red-950 px-1 py-0.5 rounded">true</span>. Akses Admin didapat instan!"
                  </p>
               </div>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12">
            <div className={`p-8 border-2 rounded-xl relative overflow-hidden flex flex-col shadow-2xl transition-colors duration-500 ${isOverflow ? 'border-red-500/50 bg-red-950/30' : 'border-blue-500/30 bg-gray-900/50'}`}>
              
              <div className="mb-6 text-center relative z-10 flex flex-col items-center">
                 <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">SIMULASI: GELAS MEMORI TUMPAH</h2>
                 <p className="text-[9px] text-blue-500 font-bold tracking-[0.2em] mt-1">MEMORY_CORRUPTION_BUFOVER</p>
              </div>

              <div className="flex-1 flex flex-col space-y-6 relative z-10 w-full min-h-[350px]">
                 
                 {/* Memory Representation */}
                 <div className="w-full bg-[#0d1117] border border-gray-700 rounded-xl p-4 flex flex-col gap-4 shadow-xl relative overflow-hidden flex-1">
                    <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                       <div className="flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-gray-500" />
                          <span className="text-xs font-bold text-gray-400">RAM Allocation Map</span>
                       </div>
                       <span className="text-[10px] text-gray-600 font-mono">0x00A1F0C</span>
                    </div>

                    <div className="grid grid-cols-1 gap-6 mt-4">
                       
                       {/* Slot A */}
                       <div className="space-y-2">
                          <div className="flex justify-between text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                             <span>Slot A (Char[5] userName)</span>
                             <span className={isOverflow ? 'text-red-500' : ''}>Max: 5 Bytes</span>
                          </div>
                          <div className="flex gap-1">
                             {[0,1,2,3,4].map(idx => (
                               <div key={idx} className={`h-12 flex-1 rounded text-lg font-black flex items-center justify-center border transition-all duration-300 ${slotA[idx] ? 'border-blue-500 bg-blue-900/50 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'border-gray-800 bg-gray-900 text-gray-600'}`}>
                                 {slotA[idx] || '_'}
                               </div>
                             ))}
                          </div>
                       </div>

                       {/* Interruption Visual */}
                       <div className="flex justify-center -my-2 opacity-50 relative z-20">
                          <div className={`w-0.5 h-6 transition-colors duration-500 delay-300 ${isOverflow ? 'bg-red-500 animate-pulse' : 'bg-gray-800'}`}></div>
                       </div>

                       {/* Slot B */}
                       <div className="space-y-2">
                          <div className="flex justify-between text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                             <span>Slot B (bool isAdmin)</span>
                             <span className={isOverflow ? 'text-red-400 animate-pulse' : ''}>{isOverflow ? 'CORRUPTED!' : 'Protected'}</span>
                          </div>
                          <div className={`h-12 w-full rounded flex items-center justify-center border font-black tracking-widest text-sm transition-all duration-500 delay-300 ${isOverflow ? 'bg-red-900/80 border-red-500 text-red-300 shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'bg-gray-900 border-gray-800 text-gray-500'}`}>
                             {slotB}
                          </div>
                       </div>

                    </div>
                 </div>

                 {/* Input Area */}
                 <div className="w-full bg-black border border-gray-800 rounded-xl p-4 shadow-xl">
                    <p className="text-[10px] text-gray-500 mb-2 uppercase tracking-widest font-bold">Terminal Input</p>
                    <form onSubmit={handleInputSubmit} className="flex gap-2">
                       <div className="flex-1 relative">
                         <span className="absolute left-3 top-2.5 text-green-500 font-bold">$</span>
                         <input 
                           type="text" 
                           value={inputValue}
                           onChange={(e) => setInputValue(e.target.value.toUpperCase().replace(/\s/g, '_'))}
                           placeholder="Ketik BUDI atau HACKER_JAHAT"
                           className="w-full bg-gray-900 border border-gray-700 text-white rounded pl-8 p-2 text-xs font-mono focus:outline-none focus:border-blue-500"
                         />
                       </div>
                       <button 
                         type="submit"
                         className="bg-blue-600 hover:bg-blue-500 text-white px-4 rounded text-xs font-bold uppercase tracking-widest transition-all shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                       >
                         Enter
                       </button>
                    </form>
                 </div>

                 <AnimatePresence>
                    {isOverflow && (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                          <p className="text-xs text-red-300 bg-red-950/40 border border-red-500/50 p-3 rounded-xl font-bold uppercase tracking-wide leading-relaxed shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                             BOOM! Data membludak masuk ke memori sebelah dan ngasih lo akses Admin seketika! <br/>
                             <button onClick={handleReset} className="mt-3 text-[10px] bg-red-900 px-3 py-1 rounded border border-red-700 text-red-400 hover:text-white transition-colors">RESET SISTEM</button>
                          </p>
                       </motion.div>
                    )}
                 </AnimatePresence>

              </div>
              
              {/* Overlay Glitch */}
              {isOverflow && (
                <div className="absolute inset-0 bg-red-500/5 pointer-events-none mix-blend-overlay animate-pulse" />
              )}
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-blue-500 shadow-2xl">
          <Link 
            to="/academy/stage-6/modul-2/js-ninja"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « SEBELUMNYA
          </Link>
          
          <Link 
            to="/academy/stage-6/modul-2/kesimpulan"
            className="flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
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

export default CppMemory;
