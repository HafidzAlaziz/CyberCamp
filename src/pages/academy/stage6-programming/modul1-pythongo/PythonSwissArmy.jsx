import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ShieldAlert, Code2, Play, Terminal } from 'lucide-react';

const PythonSwissArmy = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([]);
  
  const passwordsToTry = ['12345', 'qwerty', 'admin', 'password', 'iloveyou', 'dragon'];

  const runScript = () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs(['$ python3 brutal_force.py', 'Initialising dictionary attack...']);
    
    let step = 0;
    const interval = setInterval(() => {
      if (step < passwordsToTry.length) {
        const attempt = passwordsToTry[step];
        const isSuccess = attempt === 'dragon';
        
        setLogs(prev => [
            ...prev, 
            `Mencoba password: ${attempt}... ${isSuccess ? 'SUKSES!' : 'Gagal'}`
        ]);
        
        if (isSuccess) {
          clearInterval(interval);
          setLogs(prev => [...prev, 'Akses Diberikan. Mengunduh data...']);
          setIsRunning(false);
        }
        step++;
      }
    }, 800);
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
            <Code2 className="w-8 h-8 text-green-400" />
          </div>
          <div>
            <h1 className="text-sm text-green-400 tracking-[0.3em] uppercase font-black">Stage 6 · Modul 1: Programming</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              PYTHON: SI PISAU LIPAT
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
                Bahasa Sejuta <br/>
                <span className="text-green-500" style={{ textShadow: '0 0 10px rgba(34, 197, 94, 0.5)' }}>HACKER UMAT</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Kenapa semua nge-hack selalu diajarin Python duluan?
              </p>
            </section>

            <div className="space-y-6 text-sm leading-relaxed text-gray-400">
               <p>
                 Karena Library-nya (kumpulan kodingan instan buatan orang lain) tuh banyak banget dan gratis! Lo gak perlu bikin pancingan dari nol buat nangkep ikan.
               </p>
               
               <ul className="space-y-4">
                  <li className="flex items-start gap-4 p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-green-500/30 transition-colors">
                     <span className="text-green-400 font-bold bg-green-950 px-2 py-1 rounded text-[10px] uppercase">requests</span>
                     <div className="flex-1 text-xs">Buat nyerang website, pura-pura jadi browser, login ribuan kali.</div>
                  </li>
                  <li className="flex items-start gap-4 p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-green-500/30 transition-colors">
                     <span className="text-green-400 font-bold bg-green-950 px-2 py-1 rounded text-[10px] uppercase">scapy</span>
                     <div className="flex-1 text-xs">Buat mainin paket jaringan WIFI, nyadap koneksi, dan bikin wifi palsu.</div>
                  </li>
               </ul>

               <div className="p-6 bg-red-900/10 border border-red-500/30 rounded-2xl relative overflow-hidden group mt-8">
                  <div className="flex items-center gap-3 mb-4">
                     <ShieldAlert className="w-5 h-5 text-red-500" />
                     <p className="text-white font-black italic uppercase tracking-widest text-[10px]">Kelemahan Python:</p>
                  </div>
                  <p className="italic text-gray-400 text-xs leading-relaxed">
                    Kodenya bisa dibaca orang kalau lo kirim (gak di-compile jadi exe murni secara native), dan korban <span className="text-white font-bold">Harus punya program Python di komputernya</span> secara default biar script jahat lo bisa jalan. Kalo dia gak punya Python? Error deh tuh script malware lo.
                  </p>
               </div>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12">
            <div className="p-8 border-2 border-green-500/30 rounded-xl bg-gray-900/50 relative overflow-hidden flex flex-col shadow-2xl transition-colors duration-500">
              
              <div className="mb-6 text-center relative z-10 flex flex-col items-center">
                 <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">SIMULASI: BRUTE-FORCE PYTHON</h2>
                 <p className="text-[9px] text-green-500 font-bold tracking-[0.2em] mt-1">PYTHON_AUTOMATION</p>
              </div>

              <div className="flex-1 flex flex-col space-y-4 relative z-10 w-full">
                 
                 {/* IDK Dev Screen Workspace */}
                 <div className="w-full bg-[#0d1117] border border-gray-700 rounded-xl overflow-hidden shadow-xl flex flex-col">
                    <div className="flex items-center gap-2 bg-gray-900 px-4 py-3 border-b border-gray-800">
                       <Terminal className="w-4 h-4 text-green-500" />
                       <span className="text-xs font-bold text-gray-400">Terminal - bruteforce.py</span>
                    </div>
                    
                    <div className="p-4 h-48 overflow-y-auto font-mono text-xs text-gray-300 bg-black flex flex-col justify-start">
                       {logs.length === 0 && (
                          <div className="text-gray-600 italic">Siap menjalankan script otomatis...</div>
                       )}
                       {logs.map((log, index) => (
                         <div key={index} className={`mb-1 ${log.includes('SUKSES') ? 'text-green-400 font-bold' : log.includes('Akses Diberikan') ? 'text-cyan-400 animate-pulse' : log.startsWith('$') ? 'text-yellow-400' : 'text-gray-400'}`}>
                            {log}
                         </div>
                       ))}
                       {isRunning && (
                          <div className="w-2 h-4 bg-green-500 animate-pulse mt-1 inline-block" />
                       )}
                    </div>

                 </div>

                 <button 
                   onClick={runScript}
                   disabled={isRunning}
                   className={`w-full py-4 text-white font-black text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 transition-all ${isRunning ? 'bg-gray-800 border border-gray-700 text-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500 border border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.4)]'}`}
                 >
                   {isRunning ? (
                     <>Memproses Loop...</>
                   ) : (
                     <>
                        <Play className="w-5 h-5" fill="currentColor" /> Jalankan script.py
                     </>
                   )}
                 </button>

                 <div className="mt-4 text-center">
                    <p className="text-[10px] sm:text-xs text-gray-500 italic block">
                       "Kodingannya simpel banget, cuma butuh perulangan (loop) sederhana buat nebak password otomatis."
                    </p>
                 </div>

              </div>
              
              {/* Background overlay FX */}
              {logs.some(l => l.includes('SUKSES')) && (
                 <div className="absolute inset-0 bg-green-900/10 pointer-events-none rounded-xl" />
              )}
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link 
            to="/academy/stage-6/modul-1/intro"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « SEBELUMNYA
          </Link>
          
          <Link 
            to="/academy/stage-6/modul-1/go-speed"
            className="flex items-center gap-3 bg-cyan-600 hover:bg-cyan-500 text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
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

export default PythonSwissArmy;
