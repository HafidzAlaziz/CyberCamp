import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, DoorOpen, DoorClosed, Terminal, Shield, Zap, Search, AlertTriangle, Home } from 'lucide-react';

const IntroPorts = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState(null);

  const startScan = () => {
    setIsScanning(true);
    setScanResults(null);
    setTimeout(() => {
      setIsScanning(false);
      setScanResults({
        21: 'vulnerable',
        80: 'open',
        3389: 'closed'
      });
    }, 2500);
  };

  const doors = [
    { id: 21, name: 'FTP', desc: 'File Transfer' },
    { id: 80, name: 'HTTP', desc: 'Web Service' },
    { id: 3389, name: 'RDP', desc: 'Remote Desktop' }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Standardized Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-cyan-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/50">
            <DoorOpen className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-500 tracking-[0.3em] uppercase font-black text-glow-cyan">Stage 3: Networking</h1>
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
              MODUL 2: Common Ports & Protocols
            </h2>
          </div>
        </motion.div>

        {/* 2-Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Material */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="space-y-4 text-lg leading-relaxed text-gray-400">
               <h3 className="text-2xl font-black text-cyan-500 italic uppercase">Pintu Masuk Data 🚪</h3>
               <p>
                 Kalau IP Address itu adalah <span className="text-white font-bold">"Alamat Gedung Apartemen"</span>, maka Port itu adalah <span className="text-cyan-400 font-bold underline">"Nomor Pintu Kamar"</span> di dalam gedung tersebut. 
               </p>
               <p className="text-sm">
                 Kenapa data game lo nggak ketuker sama data YouTube pas lagi asik browsing? Karena tiap data masuk lewat pintu yang beda-beda!
               </p>
               
               <div className="p-6 bg-cyan-950/20 border-l-4 border-cyan-500 rounded-sm italic">
                  <span className="text-cyan-400 font-black uppercase text-[10px] block mb-2 tracking-widest flex items-center gap-2 font-mono">
                    <Shield className="w-4 h-4" /> Hacker Context: Port Scanning
                  </span>
                  Hacker biasanya bakal keliling "gedung" buat nyari pintu mana yang lupa digembok atau punya celah. Teknik ini namanya <span className="text-white font-bold">Port Scanning</span> (pake tool kayak Nmap).
               </div>

               <p className="text-sm italic">
                 Protocol itu apa? Protocol itu <span className="text-emerald-400 font-bold">"Bahasa"</span> yang dipakai buat ngobrol di pintu itu. Pintu web (HTTP) pake bahasa web, pintu file (FTP) pake bahasa kirim file.
               </p>
            </div>
          </motion.div>

          {/* Right Column: Simulation Case */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-900/50 border border-cyan-500/30 rounded-xl p-8 shadow-2xl relative overflow-hidden flex flex-col min-h-[500px]"
          >
            <div className="absolute top-4 left-4 flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
               <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest font-mono">TOOL: NMAP_SCANNER_v7.9</span>
            </div>

            {/* Door Visuals */}
            <div className="mt-12 grid grid-cols-3 gap-4">
               {doors.map((door) => (
                 <motion.div 
                   key={door.id}
                   animate={{ 
                     borderColor: scanResults ? (scanResults[door.id] === 'vulnerable' ? '#ef4444' : scanResults[door.id] === 'open' ? '#10b981' : '#374151') : '#155e75'
                   }}
                   className="flex flex-col items-center p-4 bg-black/40 border-2 rounded-lg transition-colors group"
                 >
                    <div className="mb-3">
                       {scanResults && scanResults[door.id] === 'vulnerable' ? (
                         <DoorOpen className="w-8 h-8 text-red-500 animate-bounce" />
                       ) : scanResults && scanResults[door.id] === 'open' ? (
                         <DoorOpen className="w-8 h-8 text-emerald-500" />
                       ) : (
                         <DoorClosed className={`w-8 h-8 ${scanResults ? 'text-gray-700' : 'text-cyan-900'}`} />
                       )}
                    </div>
                    <span className="text-xs font-black text-white">{door.id}</span>
                    <span className="text-[8px] text-gray-500 uppercase tracking-widest">{door.name}</span>
                 </motion.div>
               ))}
            </div>

            {/* Terminal Area */}
            <div className="mt-8 flex-1 bg-black/60 border border-white/5 rounded-lg p-4 font-mono text-[10px] overflow-hidden relative">
               <div className="flex flex-col gap-1">
                  <div className="text-gray-600">hafidz@cybercamp:~$ nmap -T4 10.0.0.1</div>
                  {isScanning && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-cyan-400"
                    >
                       Starting Nmap Scan... <br/>
                       Scanning ports 21, 80, 443, 3389...<br/>
                       [######................] 30%
                    </motion.div>
                  )}
                  {scanResults && (
                    <div className="space-y-1">
                       <div className="text-emerald-500 italic">Scan complete. Results:</div>
                       <div className="text-red-500 font-bold">PORT 21: VULNERABLE (Anonymous Login)</div>
                       <div className="text-emerald-500">PORT 80: OPEN (Nginx 1.18.0)</div>
                       <div className="text-gray-600">PORT 3389: FILTERED / CLOSED</div>
                    </div>
                  )}
               </div>
               {!isScanning && !scanResults && (
                 <div className="absolute inset-0 flex items-center justify-center bg-black/20 italic text-gray-700">
                    Ready to scan target...
                 </div>
               )}
            </div>

            {/* Interaction Button */}
            <div className="mt-6">
               <button 
                 disabled={isScanning}
                 onClick={startScan}
                 className={`w-full py-4 rounded-sm font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-300 flex items-center justify-center gap-3 border ${isScanning ? 'bg-gray-800 text-gray-600 border-gray-700' : 'bg-cyan-600 text-white border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:bg-cyan-500 hover:text-black'}`}
               >
                  {isScanning ? <Search className="w-4 h-4 animate-spin" /> : <Terminal className="w-4 h-4" />}
                  <span>{isScanning ? 'SCANNING TARGET...' : 'JALANKAN PORT SCAN'}</span>
               </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Navigation Summary-style */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 p-6 bg-gray-900/20 border border-white/5 rounded-2xl flex justify-between items-center"
        >
          <div className="text-gray-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <Zap className="w-4 h-4" /> PORT_PHASE: 01/04
          </div>
          <Link 
            to="/academy/stage-3/modul-2/web-protocols"
            className="flex items-center gap-2 text-cyan-500 hover:text-white transition-all font-black uppercase tracking-widest text-[10px] group"
          >
             LANJUT: WEB PROTOCOLS <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default IntroPorts;
