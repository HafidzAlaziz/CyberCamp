import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Terminal, ShieldAlert, ShieldCheck, ChevronRight, ChevronLeft, Zap, Info, Search, Database, Globe, Key } from 'lucide-react';

const NmapScanner = () => {
  const [scanStatus, setScanStatus] = useState('idle'); // 'idle', 'scanning', 'complete'
  const [lines, setLines] = useState([]);
  const intervalRef = React.useRef(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const scanOutput = [
    'Starting Nmap 7.92 ( https://nmap.org ) at 2026-03-19 17:05',
    'Nmap scan report for target-server.com (192.168.1.13)',
    'Host is up (0.00045s latency).',
    'Not shown: 997 closed ports',
    'PORT     STATE  SERVICE     VERSION',
    '80/tcp   OPEN   http        Apache httpd 2.4.41',
    '22/tcp   OPEN   ssh         OpenSSH 8.2p1 Ubuntu 4ubuntu0.1',
    '3306/tcp CLOSED mysql       MySQL 5.7.27',
    'MAC Address: 00:0C:29:3E:4D:1F (VMware)',
    'Nmap done: 1 IP address (1 host up) scanned in 2.34 seconds'
  ];

  const startScan = () => {
    setScanStatus('scanning');
    setLines([]);
    
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    let currentLine = 0;
    intervalRef.current = setInterval(() => {
      if (currentLine < scanOutput.length) {
        setLines(prev => [...prev, scanOutput[currentLine]]);
        currentLine++;
      } else {
        clearInterval(intervalRef.current);
        setScanStatus('complete');
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-cyan-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/50">
            <Search className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-sm text-emerald-400 tracking-[0.3em] uppercase font-black">Stage 4: Security Skills</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              MODUL 4: Nmap (Pengetok Pintu)
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
              <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-8 leading-tight">
                Ngetes Gagang <br/>
                <span className="text-emerald-500" style={{ textShadow: '0 0 10px rgba(16, 185, 129, 0.5)' }}>PINTU (NMAP)</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Tools <span className="text-white font-bold underline decoration-emerald-500 underline-offset-4 uppercase">Nmap (Network Mapper)</span> ini dipake buat <span className="text-white">Port Scanning</span>. 
              </p>
            </section>

            <div className="space-y-6 text-sm leading-relaxed text-gray-400">
               <p>
                 Ingat materi Port di Tahap 3? Nmap bakal ngirim "ketukan" ke ribuan pintu (Port) server target buat nyari tau mana yang <span className="text-emerald-400 font-black">OPEN</span>.
               </p>
               
               <p>
                 Hacker nyari port yang OPEN buat nyari celah masuk. Kalau Port 22 (SSH) kebuka, mereka bisa nyoba brute-force buat masuk ke sistem pusat!
               </p>

               <div className="p-6 bg-gray-900 border-l-4 border-amber-500 rounded-r-2xl space-y-4">
                  <p className="text-amber-500 font-black italic uppercase tracking-widest text-[10px]">Analogi Gagang Pintu:</p>
                  <p className="italic text-gray-400 text-xs">
                     "Hacker itu kayak maling yang jalan di lorong hotel, trus ngetok/ngetes gagang pintu satu-satu. Kalau ada yang gak dikunci (OPEN), di situlah mereka masuk."
                  </p>
               </div>
            </div>

            <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-6 space-y-2 rounded-r-xl relative group">
               <ShieldAlert className="w-6 h-6 text-emerald-500 mb-2" />
               <p className="text-white font-black italic uppercase tracking-tighter text-xs">Defense Tip</p>
               <p className="text-[11px] text-gray-400 italic leading-relaxed">
                 Jangan pernah buka port yang gak perlu. Kalau web lo cuma butuh HTTP, tutup Port SSH (22) buat publik. Gunakan <span className="text-white">Firewall</span> biar kuncian pintunya makin berlapis.
               </p>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12">
            <div className="p-1 px-1 bg-gray-800 rounded-t-xl flex items-center justify-between border-t border-x border-gray-700">
               <div className="flex gap-1.5 ml-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
               </div>
               <span className="text-[10px] text-gray-500 font-black tracking-widest mr-4">bash — nmap@kali</span>
            </div>
            <div className="p-8 bg-black border-x border-b border-gray-800 rounded-b-3xl relative overflow-hidden min-h-[500px] flex flex-col shadow-2xl">
              
              <div className="text-center mb-10">
                 <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">TERMINAL NMAP</h2>
                 <p className="text-[9px] text-emerald-500 font-bold tracking-[0.3em] mt-1 italic">VULNERABILITY_SCAN_V1.2</p>
              </div>
              
              {/* Terminal Output */}
              <div className="flex-1 font-mono text-xs leading-relaxed space-y-2">
                 <div className="flex gap-2">
                    <span className="text-emerald-500 font-bold">nmap@kali:~$</span>
                    <span className="text-white">nmap -sV target-hq.com</span>
                 </div>
                 
                 <div className="space-y-1">
                     {lines.map((line, idx) => {
                        if (!line) return null;
                        const isOpen = line.includes('OPEN');
                        const isSsh = line.includes('22/tcp');
                        return (
                          <motion.div 
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            key={idx}
                            className={`
                              ${isOpen ? 'text-emerald-400' : 'text-gray-500'}
                              ${isSsh && isOpen ? 'bg-emerald-500/10 border-l-2 border-emerald-500 pl-2' : ''}
                            `}
                          >
                            {line}
                            {isSsh && isOpen && scanStatus === 'complete' && (
                              <motion.span 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="ml-2 px-2 py-0.5 bg-red-500 text-white text-[9px] font-black rounded italic animate-pulse"
                              >
                                TARGET!
                              </motion.span>
                            )}
                          </motion.div>
                        );
                     })}
                    {scanStatus === 'scanning' && (
                      <motion.div 
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="w-2 h-4 bg-gray-600 inline-block align-middle"
                      />
                    )}
                 </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-6 border-t border-gray-900 space-y-4">
                 <button 
                   onClick={startScan}
                   disabled={scanStatus === 'scanning'}
                   className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 font-black uppercase tracking-[0.2em] transition-all group ${scanStatus === 'scanning' ? 'bg-gray-900 text-gray-700' : 'bg-emerald-600 hover:bg-white text-white hover:text-black shadow-[0_0_30px_rgba(16,185,129,0.2)]'}`}
                 >
                    <Terminal className={`w-5 h-5 ${scanStatus === 'scanning' && 'animate-spin'}`} />
                    {scanStatus === 'scanning' ? 'PEMINDAIAN BERJALAN...' : 'JALANKAN NMAP SCAN'}
                 </button>

                 <AnimatePresence>
                   {scanStatus === 'complete' && (
                     <motion.div 
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl"
                     >
                        <p className="text-[10px] text-gray-500 italic leading-relaxed">
                          <span className="text-emerald-500 font-bold">Hasil:</span> Port 22 (SSH) dan 80 (HTTP) kebuka. Hacker biasanya langsung nyerbu SSH buat nyoba login paksa!
                        </p>
                     </motion.div>
                   )}
                 </AnimatePresence>
              </div>

              {/* Decorative Icons */}
              <div className="absolute top-1/2 right-4 opacity-5 pointer-events-none">
                 <Database className="w-32 h-32" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link 
            to="/academy/stage-4/modul-4/intro"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « KEMBALI KE "INTRO IR TOOLS"
          </Link>
          
          <Link 
            to="/academy/stage-4/modul-4/wireshark-sniffer"
            className="flex items-center gap-3 bg-cyan-600 hover:bg-white text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
          >
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest leading-none uppercase">
              LANJUT KE "WIRESHARK: SI PENYADAP" » <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NmapScanner;
