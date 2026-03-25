import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ShieldAlert, Terminal, Play, Delete, Search, SearchCode } from 'lucide-react';

const BashLinux = () => {
  const [pipeline, setPipeline] = useState([]); // Array of commands
  const [output, setOutput] = useState(null); // Result string

  const availableCommands = [
    { id: 'cat', text: 'cat server.log', desc: 'Membaca file log', icon: <SearchCode className="w-3 h-3" /> },
    { id: 'grep', text: 'grep "password"', desc: 'Saring baris berisi "password"', icon: <Search className="w-3 h-3" /> },
    { id: 'awk', text: "awk '{print $2}'", desc: 'Ambil kolom kedua teks', icon: <Terminal className="w-3 h-3" /> }
  ];

  const addToPipeline = (cmd) => {
    if (pipeline.length < 3) {
      setPipeline([...pipeline, cmd]);
      setOutput(null); // Reset output when pipeline changes
    }
  };

  const removeFromPipeline = (index) => {
    const newPipe = [...pipeline];
    newPipe.splice(index, 1);
    setPipeline(newPipe);
    setOutput(null);
  };

  const runPipeline = () => {
    if (pipeline.length === 0) {
      setOutput("Error: Perintah kosong!");
      return;
    }

    const cmdString = pipeline.map(c => c.id).join('|');

    // Expected sequence: cat | grep
    if (cmdString === 'cat|grep') {
      setOutput("SUCCESS: admin_password=Hacked123");
    } else if (cmdString === 'cat') {
      setOutput("ERROR: 10.000+ baris teks. Terminal lo nge-hang kepenuhan teks acak!");
    } else if (cmdString.startsWith('grep')) {
      setOutput("ERROR: grep butuh input dari file atau pipe sebelumnya.");
    } else {
      setOutput("OUTPUT KOSONG atau FORMAT SALAH. Coba lagi.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-green-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/50">
            <Terminal className="w-8 h-8 text-green-400" />
          </div>
          <div>
            <h1 className="text-sm text-green-400 tracking-[0.3em] uppercase font-black">Stage 6 · Modul 3: Bash & PowerShell Scripting</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              BASH LINUX MAGIC
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
                Kekuatan <br/>
                <span className="text-green-500" style={{ textShadow: '0 0 10px rgba(34, 197, 94, 0.5)' }}>PIPELINING (|)</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Bash Scripting adalah senjata utama kalau lo pake Kali Linux. Fitur paling dewanya adalah <span className="text-white font-bold">Pipelining</span>.
              </p>
            </section>

            <div className="space-y-6 text-sm leading-relaxed text-gray-400">
               <p>
                 Pipelining yang pake simbol pipa tegak <code className="bg-gray-800 text-green-400 px-2 py-0.5 rounded">|</code> ibarat lo nyambungin selang air antar mesin pabrik.
               </p>
               
               <p>
                 Output dari satu perintah, nggak cuma ditampilin ke layar, tapi langsung <span className="text-white font-bold underline decoration-green-500 text-underline-offset-4">dilempar jadi input</span> buat perintah berikutnya! Lo cuma pesen sekali 1 baris kode yang panjang, dan Bash bakal ngerjain sisanya urut otomatis.
               </p>

               <div className="p-4 bg-[#0d1117] border border-gray-700 rounded-xl">
                 <p className="text-xs text-gray-500 mb-2 font-bold uppercase">Contoh Kasus:</p>
                 <p className="leading-relaxed">
                   Lo punya file server <code className="text-blue-400">server.log</code> isinya jutaan baris teks log website. Lo mau nyari satu baris doang yang ngandung kata password curian.
                 </p>
               </div>

               <div className="p-6 bg-green-900/10 border-l-4 border-green-500 space-y-2 rounded-r-xl shadow-lg mt-8">
                  <div className="flex items-center gap-3 mb-2">
                     <ShieldAlert className="w-5 h-5 text-green-400" />
                     <p className="text-white font-black italic uppercase tracking-widest text-[10px]">Taktik Hacker:</p>
                  </div>
                  <p className="italic text-gray-300 text-xs leading-relaxed font-bold">
                    "Hacker sejati jarang bikin script gede 500 baris. Mereka milih ngegabung-gabungin 5 tool kecil bawaan Linux pake <span className="text-green-400">| (Pipa)</span> buat dapetin hasil spesifik dalam 1 baris. Elegan dan efisien!"
                  </p>
               </div>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12">
            <div className="p-8 border-2 border-green-500/30 bg-gray-900/50 rounded-xl relative overflow-hidden flex flex-col shadow-2xl">
              
              <div className="mb-6 text-center relative z-10 flex flex-col items-center">
                 <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">SIMULASI: BASH PIPELINE</h2>
                 <p className="text-[9px] text-green-500 font-bold tracking-[0.2em] mt-1">LOG_PARSER_CHALLENGE</p>
              </div>

              <div className="flex-1 flex flex-col space-y-5 relative z-10 w-full min-h-[350px]">
                 
                 {/* Drag & Drop Area Mockup */}
                 <div className="w-full bg-[#0d1117] border border-gray-700 rounded-xl p-4 flex flex-col shadow-xl">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3">Pilih & Susun Pipa Lo (Maks 3):</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                       {availableCommands.map(cmd => (
                         <button
                           key={cmd.id}
                           onClick={() => addToPipeline(cmd)}
                           disabled={pipeline.length >= 3}
                           className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded text-xs font-bold text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                         >
                           {cmd.icon} {cmd.id}
                         </button>
                       ))}
                    </div>

                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-2 border-b border-gray-800 pb-1">Susunan Perintah Terminal (Klik untuk hapus):</p>
                    <div className="bg-black/80 border border-green-900/50 p-4 rounded min-h-[70px] flex items-center flex-wrap gap-2 font-mono text-sm shadow-inner">
                       <span className="text-green-500 font-bold mr-2">$</span>
                       
                       {pipeline.length === 0 && <span className="text-gray-600 italic text-xs">Pilih perintah di atas...</span>}

                       <AnimatePresence>
                         {pipeline.map((cmd, index) => (
                           <motion.div 
                             initial={{ opacity: 0, scale: 0.8 }}
                             animate={{ opacity: 1, scale: 1 }}
                             exit={{ opacity: 0, scale: 0.8 }}
                             key={index}
                             onClick={() => removeFromPipeline(index)}
                             className="flex items-center cursor-pointer group"
                           >
                              {index > 0 && <span className="text-gray-500 mx-2">|</span>}
                              <div className="bg-green-900/30 border border-green-500/50 text-green-400 px-2 py-1 rounded group-hover:bg-red-900/50 group-hover:border-red-500/50 group-hover:text-red-400 transition-colors relative">
                                {cmd.text}
                                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none">
                                  Hapus
                                </div>
                              </div>
                           </motion.div>
                         ))}
                       </AnimatePresence>
                    </div>

                    <button 
                      onClick={runPipeline}
                      className="mt-4 w-full bg-green-600 hover:bg-green-500 text-white font-black text-xs uppercase tracking-widest py-3 rounded flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(22,163,74,0.3)]"
                    >
                      <Play className="w-4 h-4 fill-white" /> Jalankan Perintah
                    </button>
                 </div>

                 {/* Terminal Output */}
                 <div className="w-full bg-black border border-gray-800 rounded-xl p-4 min-h-[100px] flex flex-col font-mono relative overflow-hidden">
                    <div className="flex gap-2 mb-2">
                       <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                       <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                       <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs flex-1">
                       {!output ? (
                         <span className="text-gray-600 italic">...menunggu eksekusi...</span>
                       ) : output.startsWith('SUCCESS') ? (
                         <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-green-400">
                           <p className="mb-2">Scanning server.log (1,054,321 lines)...</p>
                           <p className="font-bold underline uppercase bg-green-900/30 p-2 border border-green-500/30 rounded shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                             {output.split(': ')[1]}
                           </p>
                           <p className="mt-3 text-white">Mantap! Lo baru aja jadi detektif data cuma pake 2 kata gabungan!</p>
                         </motion.div>
                       ) : (
                         <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-red-400">
                           {output}
                         </motion.div>
                       )}
                    </div>
                 </div>

              </div>
              
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-green-500 shadow-2xl">
          <Link 
            to="/academy/stage-6/modul-3/intro"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « SEBELUMNYA
          </Link>
          
          <Link 
            to="/academy/stage-6/modul-3/powershell-windows"
            className="flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
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

export default BashLinux;
