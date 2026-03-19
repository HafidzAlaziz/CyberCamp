import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Terminal, TerminalSquare, Zap, HardDrive, Package, Settings, Info } from 'lucide-react';

const ALL_LINES = [
  "user@cybercamp:~$ sudo apt update",
  "[sudo] password for user: ************",
  "Hit:1 http://archive.ubuntu.com/ubuntu jammy InRelease",
  "Get:2 http://security.ubuntu.com/ubuntu jammy-security InRelease [110 kB]",
  "Get:3 http://archive.ubuntu.com/ubuntu jammy-updates InRelease [119 kB]",
  "Reading package lists... Done",
  "Building dependency tree... Done",
  "Calculating upgrade... Done",
  "System Updated Successfully. Control level: ROOT",
];

const KekuatanLinux = () => {
  const [terminalLines, setTerminalLines] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [done, setDone] = useState(false);
  const intervalRef = React.useRef(null);

  const runCommand = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    setIsUpdating(true);
    setTerminalLines([]);
    setDone(false);

    // Push first line IMMEDIATELY so it doesn't feel "missing"
    setTerminalLines([ALL_LINES[0]]);
    let currentLine = 1;
    
    const interval = setInterval(() => {
      if (currentLine < ALL_LINES.length) {
        setTerminalLines(prev => [...prev, ALL_LINES[currentLine]]);
        currentLine++;
      }
      
      if (currentLine >= ALL_LINES.length) {
        clearInterval(interval);
        intervalRef.current = null;
        setIsUpdating(false);
        setDone(true);
      }
    }, 400);
    
    intervalRef.current = interval;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12 text-sm">
      <div className="max-w-4xl mx-auto">
        {/* Standardized Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-emerald-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/50">
            <TerminalSquare className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-sm text-emerald-400 tracking-[0.3em] uppercase font-black">Stage 2: Operating Systems</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              MODUL 1: Basics of OS
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
            <h3 className="text-2xl font-bold text-emerald-500 mb-6 italic tracking-tight uppercase">Bebas 100%, Ribet 100% 🛠️</h3>
            <div className="space-y-4 text-base leading-relaxed text-gray-400">
              <p>
                Kalo Windows itu Mobil Matic, <span className="text-white font-bold italic underline decoration-emerald-500">Linux itu Mobil Manual Rakitan Sendiri</span>. 
                Awalnya emang kerasa ribet banget karena lo harus ngetik perintah (<span className="text-emerald-400">CLI</span>) buat ngapa-ngapain. 
              </p>
              <p>
                 Tapi seninya, Linux itu <span className="text-emerald-500 font-black">Open Source</span>. Lo dikasih kebebasan 100% buat bongkar mesinnya, ganti bodinya, sampe bikin bahan bakarnya sendiri. Nggak ada "kunci pabrik" di sini.
              </p>
              <div className="p-4 bg-emerald-500/5 border-l-2 border-emerald-500 rounded-sm italic text-xs leading-relaxed">
                 <span className="text-white font-black">Kenapa Hacker Suka Linux?</span> Karena lo punya kontrol penuh (<span className="text-emerald-400 italic">Root Access</span>). Lo bisa bikin tools hacking sebebas lo tanpa dihalangi aturan sistem. Makanya ada distro khusus kayak <span className="text-white">Kali Linux</span> yang isinya bengkel tempur hacker!
              </div>
            </div>
          </motion.div>

          {/* Practical Simulation: Terminal Sakti */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-black border border-gray-800 rounded-2xl p-6 shadow-2xl relative flex flex-col min-h-[400px]"
          >
            <div className="flex items-center gap-2 mb-6 border-b border-gray-900 pb-4">
               <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/40"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40"></div>
               </div>
               <span className="text-[9px] text-gray-600 font-bold tracking-widest uppercase ml-2">Bash — Terminal Simulation</span>
            </div>
            
            <div className="flex-1 bg-black/80 rounded p-4 font-mono text-[10px] md:text-[11px] overflow-hidden space-y-1">
               {/* Static Prompt if not started */}
               {terminalLines.length === 0 && !isUpdating && (
                 <div className="text-gray-700 animate-pulse">user@cybercamp:~$ <span className="bg-emerald-500 w-2 h-4 inline-block align-middle animate-blink"></span></div>
               )}
               
               {terminalLines.map((line, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, x: -5 }}
                   animate={{ opacity: 1, x: 0 }}
                   className={`
                     ${line && typeof line === 'string' && line.startsWith('System') ? 'text-emerald-500 font-black mt-2 pt-2 border-t border-emerald-900/30' : ''}
                     ${line && typeof line === 'string' && line.startsWith('user@') ? 'text-white border-b border-gray-900 pb-1 mb-2' : ''}
                     ${line && typeof line === 'string' && !line.startsWith('System') && !line.startsWith('user@') ? 'text-emerald-500/70' : ''}
                   `}
                 >
                    {line}
                 </motion.div>
               ))}
               {isUpdating && terminalLines.length < ALL_LINES.length && (
                 <div className="text-emerald-500/30 animate-pulse">_</div>
               )}
            </div>

            <div className="mt-8">
               <button 
                 onClick={runCommand}
                 disabled={isUpdating}
                 className="w-full py-4 bg-emerald-600 hover:bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] transition-all rounded-sm flex items-center justify-center gap-2 group"
               >
                 <Zap className="w-4 h-4 group-hover:scale-125 transition-transform" />
                 {isUpdating ? 'EXECUTING_COMMAND...' : 'KETIK PERINTAH: sudo apt update'}
               </button>
               
               {done && (
                 <p className="mt-4 text-[9px] text-emerald-500/50 italic text-center uppercase tracking-tighter">
                   $ Status: Root Access Granted. System Under Full Control.
                 </p>
               )}
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900/30 p-6 rounded-2xl border border-gray-800">
          <Link 
            to="/academy/stage-2/modul-1/windows-matic"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            « KEMBALI KE WINDOWS
          </Link>
          
          <Link 
            to="/academy/stage-2/modul-1/kesimpulan"
            className="flex items-center gap-3 bg-emerald-600 hover:bg-white text-black px-8 py-4 rounded-sm font-black transition-all group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
            <span className="relative z-10 flex items-center gap-2 uppercase tracking-tighter">
              LANJUT: KESIMPULAN <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .animate-blink { animation: blink 1s step-end infinite; }
      `}</style>
    </div>
  );
};

export default KekuatanLinux;
