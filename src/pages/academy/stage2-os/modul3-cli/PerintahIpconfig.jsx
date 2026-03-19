import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Terminal, User, MapPin, Database, Fingerprint } from 'lucide-react';

const PerintahIpconfig = () => {
  const [showOutput, setShowOutput] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const runIpconfig = () => {
    setIsTyping(true);
    setShowOutput(false);
    setTimeout(() => {
      setIsTyping(false);
      setShowOutput(true);
    }, 1200);
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
            <Fingerprint className="w-8 h-8" />
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
              Siapa Lo di Jaringan Ini? 🆔
            </h3>
            <div className="space-y-4 text-base leading-relaxed text-gray-400">
              <p>
                Kalau <span className="text-white font-bold italic">Ping</span> itu buat ngetok pintu tetangga, <span className="text-cyan-400 font-bold">ipconfig</span> (atau <span className="text-cyan-400 italic">ip a</span> di Linux) itu buat ngaca dan liat KTP lo sendiri.
              </p>
              <p>
                Perintah ini bakal ngasih tau alamat digital lo di dalam jaringan, alias <span className="text-white underline decoration-cyan-500">IP Address</span>. Tanpa tau IP lo sendiri, lo gak bakal bisa ngobrol sama komputer lain.
              </p>
              <div className="p-4 bg-cyan-950/20 border-l-4 border-cyan-600 rounded text-xs leading-relaxed italic">
                 <span className="text-cyan-500 font-black uppercase text-[10px] block mb-1 tracking-widest leading-none flex items-center gap-2">
                   <User className="w-4 h-4" /> Catatan Penting:
                 </span>
                 Sebelum lo mulai nge-hack atau nyerang target, lo wajib tau posisi lo. Apakah lo satu jaringan sama target (<span className="text-white">Local</span>)? Atau lo harus lewat internet (<span className="text-white">Public</span>)? <span className="font-bold">ipconfig</span> adalah GPS pertama lo!
              </div>
            </div>
          </motion.div>

          {/* Practical Simulation: Terminal Ipconfig */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-black border border-cyan-900/40 rounded-sm p-0 shadow-2xl relative overflow-hidden flex flex-col min-h-[380px]"
          >
            {/* Terminal Header */}
            <div className="bg-gray-900 px-4 py-2 border-b border-white/5 flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-cyan-500/20"></div>
               <span className="text-[9px] text-cyan-500/50 font-black uppercase tracking-[0.2em] ml-2">system_info.sh</span>
            </div>

            <div className="flex-1 p-8 font-mono text-[11px] space-y-4">
               <div>
                  <span className="text-gray-500">C:\Users\Hacker&gt;</span> 
                  <span className="ml-2 text-white">{isTyping ? 'ipconfig' : showOutput ? 'ipconfig' : ''}</span>
                  {isTyping && <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }} className="inline-block w-2 h-4 bg-cyan-500 ml-1"></motion.span>}
               </div>

               <AnimatePresence>
                 {showOutput && (
                   <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="text-gray-400 space-y-3 pt-2"
                   >
                      <div className="text-cyan-500 font-bold border-b border-cyan-950/50 pb-1">Windows IP Configuration</div>
                      
                      <div className="space-y-1 pl-2">
                         <div className="flex justify-between">
                            <span className="flex items-center gap-2">Ethernet Adapter:</span>
                            <span className="text-white">Local Area Connection</span>
                         </div>
                         <div className="flex justify-between">
                            <span className="flex items-center gap-2 ml-4 text-emerald-500/80 italic"><MapPin className="w-3 h-3" /> IPv4 Address . . . :</span>
                            <span className="text-emerald-400 font-black tracking-widest">10.0.0.88</span>
                         </div>
                         <div className="flex justify-between">
                            <span className="flex items-center gap-2 ml-4 text-gray-600 underline">Subnet Mask . . . . :</span>
                            <span className="text-gray-500">255.255.255.0</span>
                         </div>
                         <div className="flex justify-between">
                            <span className="flex items-center gap-2 ml-4 text-cyan-500/60 "><Database className="w-3 h-3" /> Default Gateway. . :</span>
                            <span className="text-cyan-400">10.0.0.1</span>
                         </div>
                      </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>

            <div className="p-4 bg-gray-950">
               <button 
                 onClick={runIpconfig}
                 disabled={isTyping}
                 className={`w-full py-4 border rounded-sm font-black uppercase tracking-[0.3em] text-[10px] transition-all flex items-center justify-center gap-3 ${isTyping ? 'bg-cyan-500/5 border-cyan-900 text-cyan-900 cursor-wait' : 'bg-cyan-500/10 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black shadow-[0_0_30px_rgba(6,182,212,0.1)]'}`}
               >
                 {isTyping ? 'RETRIEVING_NETWORK_INFO...' : 'KETIK: IPCONFIG'}
               </button>
            </div>
          </motion.div>
        </div>

        {/* Explain Card */}
        <AnimatePresence>
           {showOutput && (
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="p-6 bg-cyan-950/20 border border-cyan-500/20 rounded-xl mb-16 text-sm italic"
             >
                <div className="text-cyan-500 font-black uppercase text-[10px] mb-2 tracking-widest">Digital Identitas:</div>
                "Alamat <span className="text-white font-bold">10.0.0.88</span> itu adalah lokasi unik lo di jaringan sekarang. Kalau lo mau nyerang orang, pastikan Gateway-nya (<span className="text-white">10.0.0.1</span>) nyambung dulu! Ingat, jangan sampai nyasar di rumah sendiri!"
             </motion.div>
           )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
          <Link 
            to="/academy/stage-2/modul-3/perintah-ping"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            « SEBELUMNYA
          </Link>
          
          <Link 
            to="/academy/stage-2/modul-3/kesimpulan"
            className="flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 px-8 py-3 rounded-sm font-black transition-all group overflow-hidden relative shadow-[0_0_30px_rgba(6,182,212,0.1)] hover:bg-cyan-500 hover:text-black"
          >
            <div className="absolute inset-0 bg-cyan-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
            <span className="relative z-10 flex items-center gap-2 uppercase tracking-[0.2em] text-[10px]">
              LANJUT: KESIMPULAN <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PerintahIpconfig;
