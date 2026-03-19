import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Search, ShieldCheck, ShieldX, Ghost, Filter, Cpu, Activity } from 'lucide-react';

const IsolasiMasalah = () => {
  const [activeCheck, setActiveCheck] = useState(null);
  const [messages, setMessages] = useState({
    jaringan: 'Unknown',
    firewall: 'Unknown',
    service: 'Unknown'
  });

  const checkStatus = (type) => {
    setActiveCheck(type);
    
    // Simulate check delay
    setTimeout(() => {
      const newMessages = { ...messages };
      if (type === 'jaringan') newMessages.jaringan = 'OK: Ping sukses! Jaringan aman.';
      if (type === 'firewall') newMessages.firewall = 'OK: Port 80 terbuka! Jalur masuk kebuka.';
      if (type === 'service') newMessages.service = 'FATAL: Web Server Crash! Error 500.';
      
      setMessages(newMessages);
      setActiveCheck(null);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-12 border-b border-gray-800 pb-6"
        >
          <div className="flex items-center gap-4">
             <div className="p-3 bg-yellow-500/10 rounded border border-yellow-500/50">
                <Search className="w-8 h-8 text-yellow-500" />
             </div>
             <div>
                <h1 className="text-sm text-yellow-500 tracking-[0.4em] uppercase font-black">Troubleshoot Phase_02</h1>
                <h2 className="text-3xl font-black text-white italic tracking-tighter">ISOLASI MASALAH</h2>
             </div>
          </div>
          <div className="hidden md:block text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">
             Metodologi: Divide & Conquer
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
            <h3 className="text-2xl font-bold text-yellow-500 mb-6 italic tracking-tight underline italic decoration-yellow-500/30 underline-offset-8">Divide and Conquer ⚔️</h3>
            <div className="space-y-4 text-base leading-relaxed text-gray-400">
              <p>
                Gimana cara nyari sumber masalah kalo sistem lo mati? Pake teknik <span className="text-white font-bold">Isolasi Masalah</span>. 
                Cek dari paling bawah ke atas: <span className="text-yellow-400 italic">Hardware/Kabel -{'>'} Jaringan -{'>'} OS -{'>'} Aplikasi</span>.
              </p>
              <p>
                 <span className="text-white font-black">Konteks Cyber:</span> Hacker nggak langsung nge-hack gitu aja. Mereka nge-isolasi target dulu: cek apakah IP target idup (<span className="text-emerald-400">Ping</span>), 
                 terus port-nya kebuka nggak (<span className="text-cyan-400">Nmap</span>), baru deh ngecek aplikasinya rentan atau nggak.
              </p>
              <div className="p-4 bg-yellow-500/5 border-l-2 border-yellow-500 rounded-sm italic text-gray-400 text-sm">
                 Jangan nyari bug di aplikasi kalo kabel LAN target aja lo belum tau dicolok apa ngga! It's basic logic, Bos.
              </div>
            </div>
          </motion.div>

          {/* Interactive Simulation: Detective Masalah */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-900/50 border border-gray-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
          >
            <h4 className="text-xs font-black text-yellow-400 uppercase tracking-widest mb-8 flex items-center gap-2">
               <Ghost className="w-4 h-4" /> Detektif Masalah v1.0
            </h4>
            
            <div className="space-y-6">
              {/* Check Grid */}
              <div className="grid gap-4">
                 {[
                   { id: 'jaringan', label: 'Cek Jaringan', icon: <Activity className="w-4 h-4" /> },
                   { id: 'firewall', label: 'Cek Firewall', icon: <Filter className="w-4 h-4" /> },
                   { id: 'service', label: 'Cek Service', icon: <Cpu className="w-4 h-4" /> }
                 ].map((item) => (
                   <div key={item.id} className="space-y-2">
                      <button 
                        onClick={() => checkStatus(item.id)}
                        disabled={activeCheck !== null}
                        className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${
                          activeCheck === item.id 
                            ? 'border-yellow-500 bg-yellow-500/10' 
                            : 'border-gray-800 bg-black hover:border-yellow-500/50'
                        }`}
                      >
                         <div className="flex items-center gap-3">
                            <div className={`p-2 rounded bg-gray-800 group-hover:bg-yellow-500/20 transition-colors ${activeCheck === item.id ? 'bg-yellow-500/30' : ''}`}>
                               {item.icon}
                            </div>
                            <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
                         </div>
                         {activeCheck === item.id ? (
                           <div className="flex gap-1">
                              <div className="w-1 h-3 bg-yellow-500 animate-bounce"></div>
                              <div className="w-1 h-3 bg-yellow-500 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-1 h-3 bg-yellow-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                           </div>
                         ) : messages[item.id] !== 'Unknown' ? (
                           messages[item.id].includes('OK') ? <ShieldCheck className="w-5 h-5 text-emerald-500" /> : <ShieldX className="w-5 h-5 text-red-500" />
                         ) : (
                           <ChevronRight className="w-4 h-4 text-gray-800" />
                         )}
                      </button>
                      
                      <AnimatePresence>
                        {messages[item.id] !== 'Unknown' && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            className={`px-4 py-2 text-[10px] font-bold italic rounded ${
                              messages[item.id].includes('OK') ? 'text-emerald-400 bg-emerald-500/5' : 'text-red-400 bg-red-500/5'
                            }`}
                          >
                            {messages[item.id]}
                          </motion.div>
                        )}
                      </AnimatePresence>
                   </div>
                 ))}
              </div>
            </div>

            {/* Hint */}
            <div className="mt-8 border-t border-gray-800 pt-6">
                <div className="text-[9px] text-gray-600 font-mono uppercase tracking-tighter">
                   $ Status_Update: {activeCheck ? `Checking_${activeCheck}...` : 'Ready_for_inspection'}
                </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900/30 p-6 rounded-2xl border border-gray-800">
          <Link 
            to="/academy/stage-1/modul-3/intro"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            « KEMBALI KE INTRO
          </Link>
          
          <Link 
            to="/academy/stage-1/modul-3/membaca-log"
            className="flex items-center gap-3 bg-yellow-500 hover:bg-white text-black px-8 py-4 rounded-sm font-black transition-all group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
            <span className="relative z-10 flex items-center gap-2 uppercase tracking-tighter">
              LANJUT: MEMBACA LOG <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IsolasiMasalah;
