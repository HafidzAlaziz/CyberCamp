import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, DoorOpen, ShieldCheck, ShieldX, Play, Search, Terminal as TerminalIcon } from 'lucide-react';

const PortDanProtokol = () => {
  const [scanning, setScanning] = useState(false);
  const [portStatus, setPortStatus] = useState({
    22: 'IDLE',
    80: 'IDLE',
    443: 'IDLE'
  });

  const startScan = () => {
    setScanning(true);
    setPortStatus({ 22: 'SCANNING', 80: 'IDLE', 443: 'IDLE' });

    // Port 22
    setTimeout(() => {
      setPortStatus(prev => ({ ...prev, 22: 'CLOSED', 80: 'SCANNING' }));
      // Port 80
      setTimeout(() => {
        setPortStatus(prev => ({ ...prev, 80: 'OPEN', 443: 'SCANNING' }));
        // Port 443
        setTimeout(() => {
          setPortStatus(prev => ({ ...prev, 443: 'OPEN' }));
          setScanning(false);
        }, 1200);
      }, 1000);
    }, 800);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'OPEN': return 'text-emerald-400 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] bg-emerald-500/10';
      case 'CLOSED': return 'text-red-400 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)] bg-red-500/10';
      case 'SCANNING': return 'text-yellow-400 border-yellow-500 animate-pulse bg-yellow-500/10';
      default: return 'text-gray-600 border-gray-800 bg-gray-950';
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12 border-b border-gray-800 pb-6 uppercase italic tracking-[0.2em] text-[10px]">
           <button className="flex items-center gap-2 text-emerald-500 hover:text-white transition-colors">
              <TerminalIcon className="w-4 h-4" /> 
              <span>Console_Nmap_v7.92</span>
           </button>
           <div className="text-gray-600">Module_02 // Sector_Ports</div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12 items-start">
          {/* Explanation Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
             <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-8">
               Port & Protokol: <br/>
               <span className="text-emerald-500">Pintu & Aturan</span>
             </h1>

             <div className="space-y-4 text-gray-400 leading-relaxed text-sm">
                <p>
                  Kalau IP Address itu alamat rumah lo, Port itu pintu-pintu di dalam rumah lo. Ada pintu depan (Port 80), pintu balkon (Port 22), sampe pintu rahasia di gudang (Port 443).
                </p>
                <p>
                  Nah, Protokol itu bahasanya. Kalau lo masuk lewat pintu depan (buat web), lo harus ngomong bahasa web (namanya HTTP). Kalau masuk lewat pintu balkon buat nge-remote komputer, lo harus ngomong bahasa remote (namanya SSH).
                </p>
                <p className="bg-gray-900/50 p-4 border-l-2 border-gray-700 italic text-gray-500 text-xs">
                  Tapi chill aja! Lo nggak perlu hafal apa itu HTTP, SSH, atau FTP sekarang. Nanti bakal kita kupas tuntas di modul Web Exploitation dan Advanced Networking. Buat sekarang, yang penting lo paham aja konsep 'pintu' dan 'bahasa' ini!
                </p>
                
                <div className="p-5 bg-black/40 border-l-4 border-emerald-500 rounded-r-xl mt-8">
                   <h4 className="text-emerald-400 font-bold mb-2 flex items-center gap-2 uppercase text-xs">
                     <Search className="w-4 h-4 font-bold" /> Kenapa hacker peduli sama Port?
                   </h4>
                   <p className="italic text-gray-400 text-xs">
                     Karena hacker pakai tools kayak <span className="text-white font-bold">Nmap</span> buat nge-scan Port mana aja yang terbuka. Pintu (Port) yang terbuka dan nggak dijaga adalah celah masuk (<span className="text-red-400">vulnerability</span>) buat di-hack.
                   </p>
                </div>
             </div>
          </motion.div>

          {/* Hands-on Simulation */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-900 border border-gray-800 rounded-3xl p-8 relative overflow-hidden flex flex-col items-center"
          >
             <div className="w-full mb-8 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white tracking-widest uppercase">Target_Scanner</h3>
                <div className="flex gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                   <div className="w-2 h-2 rounded-full bg-gray-700"></div>
                   <div className="w-2 h-2 rounded-full bg-gray-700"></div>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10">
                {[22, 80, 443].map((port) => (
                  <motion.div 
                    key={port}
                    whileHover={{ scale: 1.05 }}
                    className={`p-6 border-2 rounded-2xl transition-all flex flex-col items-center justify-center gap-4 group ${getStatusColor(portStatus[port])}`}
                  >
                     <div className="text-2xl font-black">{port}</div>
                     <div className="text-[10px] uppercase font-bold tracking-widest">{port === 22 ? 'SSH' : port === 80 ? 'HTTP' : 'HTTPS'}</div>
                     
                     <AnimatePresence mode="wait">
                       {portStatus[port] === 'OPEN' ? (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} key="open">
                             <ShieldCheck className="w-8 h-8 opacity-80" />
                          </motion.div>
                       ) : portStatus[port] === 'CLOSED' ? (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} key="closed">
                             <ShieldX className="w-8 h-8 opacity-40 text-red-500" />
                          </motion.div>
                       ) : portStatus[port] === 'SCANNING' ? (
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} key="scanning">
                             <Search className="w-8 h-8 opacity-100" />
                          </motion.div>
                       ) : (
                          <div className="w-8 h-8 opacity-20"><DoorOpen className="w-8 h-8" /></div>
                       )}
                     </AnimatePresence>
                     
                     <div className="text-[8px] font-bold py-1 px-3 rounded-full bg-black/40 border border-white/5 uppercase text-center w-full">
                        {portStatus[port]}
                     </div>
                  </motion.div>
                ))}
             </div>

             <button 
                onClick={startScan}
                disabled={scanning}
                className="w-full flex items-center justify-center gap-4 bg-emerald-500 hover:bg-white text-black font-black uppercase tracking-[0.3em] py-5 rounded-sm transition-all shadow-[0_0_30px_rgba(16,185,129,0.2)] disabled:opacity-30 group"
             >
                <Play className={`w-5 h-5 fill-current group-hover:scale-125 transition-transform ${scanning ? 'animate-pulse' : ''}`} />
                <span>{scanning ? 'SYSTEM_SCANNING...' : '>_ MULAI PORT SCANNING'}</span>
             </button>

             <div className="mt-8 w-full p-4 bg-black rounded border border-gray-800 text-[10px] text-emerald-500/70 font-mono leading-relaxed overflow-hidden">
                <div className="flex gap-2 mb-1">
                   <span className="text-emerald-500">$</span>
                   <span className="text-white font-bold">nmap -sT -p 22,80,443 target_node_15</span>
                </div>
                {portStatus[22] !== 'IDLE' && <div>Starting Nmap...</div>}
                {portStatus[22] === 'CLOSED' && <div className="text-red-500/50">Port 22/tcp closed ssh</div>}
                {portStatus[80] === 'OPEN' && <div className="text-emerald-400">Port 80/tcp open http</div>}
                {portStatus[443] === 'OPEN' && <div className="text-emerald-400 font-bold">Port 443/tcp open https - SUCCESS!</div>}
             </div>
          </motion.div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-emerald-500 shadow-2xl">
          <Link 
            to="/academy/stage-1/modul-2/ip-mac"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « KEMBALI KE IP & MAC
          </Link>
          
          <Link 
            to="/academy/stage-1/modul-2/kesimpulan"
            className="flex items-center gap-3 bg-emerald-600 hover:bg-white text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
          >
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest leading-none uppercase">
              LANJUT KE KESIMPULAN » <ChevronRight className="w-4 h-4 font-bold" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PortDanProtokol;
