import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Terminal, Wifi, Activity, Server, AlertCircle } from 'lucide-react';

const PerintahPing = () => {
  const [terminalLines, setTerminalLines] = useState([]);
  const [isPinging, setIsPinging] = useState(false);
  const target = "target-server.com";

  const runPing = () => {
    setIsPinging(true);
    setTerminalLines(["C:\\> ping " + target]);
    
    const responses = [
      "Pinging " + target + " [192.168.1.10] with 32 bytes of data:",
      "Reply from 192.168.1.10: bytes=32 time=14ms TTL=54",
      "Reply from 192.168.1.10: bytes=32 time=12ms TTL=54",
      "Reply from 192.168.1.10: bytes=32 time=15ms TTL=54",
      "Reply from 192.168.1.10: bytes=32 time=13ms TTL=54",
      "",
      "Ping statistics for 192.168.1.10:",
      "    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)",
      "Approximate round trip times in milli-seconds:",
      "    Minimum = 12ms, Maximum = 15ms, Average = 13ms"
    ];

    responses.forEach((line, index) => {
      setTimeout(() => {
        setTerminalLines(prev => [...prev, line]);
        if (index === responses.length - 1) setIsPinging(false);
      }, (index + 1) * 600);
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Standardized Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-cyan-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/50 text-cyan-400">
            <Wifi className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 2: Operating Systems</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
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
            <h3 className="text-2xl font-bold text-cyan-500 mb-6 italic tracking-tight uppercase">
              "Woi, Lo Ada di Rumah Gak?!" ✊
            </h3>
            <div className="space-y-4 text-base leading-relaxed text-gray-400">
              <p>
                Di dunia jaringan, perintah <span className="text-cyan-400 font-bold">ping</span> itu ibarat lo ngetok pintu rumah tetangga sambil teriak nanya ada orang atau nggak.
              </p>
              <p>
                Kalau tetangganya jawab (Reply), berarti koneksi aman dan rumahnya (server) <span className="text-white italic underline">Online</span>. Kalau diem aja (Request Timed Out), ada dua kemungkinan: servernya mati, atau dia sengaja gak mau jawab tamu gak diundang.
              </p>
              <div className="p-4 bg-cyan-950/20 border-l-4 border-cyan-600 rounded text-xs leading-relaxed italic">
                 <span className="text-cyan-500 font-black uppercase text-[10px] block mb-1 tracking-widest leading-none flex items-center gap-2">
                   <Server className="w-4 h-4" /> Strategi Hacker:
                 </span>
                 Sebelum nyerang target, hacker selalu <span className="text-white">ping</span> dulu buat mastiin targetnya nyala. Gak guna kan nyerang server yang lagi mati? Ini langkah pertama buat <span className="text-white italic">Reconnaissance</span> (pengintaian)!
              </div>
            </div>
          </motion.div>

          {/* Practical Simulation: Terminal Ping */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-black border border-cyan-900/40 rounded-sm p-0 shadow-2xl relative overflow-hidden flex flex-col min-h-[400px]"
          >
            {/* Terminal Bar */}
            <div className="bg-gray-900 px-4 py-2 border-b border-white/5 flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
               <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
               <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest ml-2 flex items-center gap-2">
                  <Terminal className="w-3 h-3" /> Command Prompt - ping_test.exe
               </span>
            </div>

            <div className="flex-1 p-6 font-mono text-[11px] overflow-y-auto space-y-1">
               <AnimatePresence>
                 {terminalLines.map((line, idx) => (
                   <motion.div 
                     key={idx}
                     initial={{ opacity: 0, x: -5 }}
                     animate={{ opacity: 1, x: 0 }}
                     className={`${line.includes('Reply') ? 'text-emerald-400' : 'text-gray-400'}`}
                   >
                     {line}
                   </motion.div>
                 ))}
               </AnimatePresence>
               {isPinging && (
                 <motion.div 
                   animate={{ opacity: [1, 0, 1] }} 
                   transition={{ repeat: Infinity, duration: 0.8 }}
                   className="w-2 h-4 bg-cyan-500 inline-block align-middle"
                 />
               )}
            </div>

            <div className="p-4 bg-gray-900/50 border-t border-white/5">
              <button 
                onClick={runPing}
                disabled={isPinging}
                className={`w-full py-4 rounded-sm font-black uppercase tracking-[0.3em] text-[10px] transition-all flex items-center justify-center gap-3 border ${isPinging ? 'bg-cyan-500/5 border-cyan-500/30 text-cyan-500/50' : 'bg-cyan-500/10 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black shadow-[0_0_30px_rgba(6,182,212,0.2)]'}`}
              >
                <Activity className={`w-4 h-4 ${isPinging ? 'animate-pulse' : ''}`} />
                {isPinging ? 'PINGING_TARGET...' : 'KETIK: PING TARGET.COM'}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Info Box */}
        {terminalLines.length > 5 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-emerald-950/20 border border-emerald-500/30 rounded-xl mb-16 flex items-start gap-4"
          >
             <AlertCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
             <p className="text-sm text-emerald-100 italic leading-relaxed">
               "Lihat? Servernya nyahut dengan status <span className="font-bold underline">Reply from 192.168.1.10</span>. Artinya target lagi online dan bisa lo ajak kenalan lebih jauh. Misi pengintaian berhasil!"
             </p>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900/30 p-6 rounded-2xl border border-gray-800">
          <Link 
            to="/academy/stage-2/modul-3/intro"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            « SEBELUMNYA
          </Link>
          
          <Link 
            to="/academy/stage-2/modul-3/perintah-ipconfig"
            className="flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 px-8 py-3 rounded-sm font-black transition-all group overflow-hidden relative shadow-[0_0_30px_rgba(6,182,212,0.1)] hover:bg-cyan-500 hover:text-black"
          >
            <div className="absolute inset-0 bg-cyan-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
            <span className="relative z-10 flex items-center gap-2 uppercase tracking-[0.2em] text-[10px]">
              LANJUT: PERINTAH IPCONFIG <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PerintahPing;
