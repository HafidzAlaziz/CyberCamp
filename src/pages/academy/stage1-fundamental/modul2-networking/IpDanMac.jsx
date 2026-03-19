import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Hash, MapPin, RefreshCw, ShieldOff, Fingerprint, ShieldAlert } from 'lucide-react';

const IpDanMac = () => {
  const [ip, setIp] = useState('192.168.1.15');
  const [mac] = useState('00:1A:2B:3C:4D:5E'); // Static factory ID
  const [isSpoofing, setIsSpoofing] = useState(false);

  const generateIp = () => {
    setIsSpoofing(true);
    setTimeout(() => {
      const newIp = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
      setIp(newIp);
      setIsSpoofing(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12 border-b border-gray-800 pb-6">
          <div className="flex items-center gap-4">
            <Hash className="w-8 h-8 text-cyan-400" />
            <h1 className="text-xl font-bold text-white tracking-widest uppercase italic">Who Am I on the Net?</h1>
          </div>
          <div className="text-[10px] text-gray-500 bg-gray-900 px-3 py-1 rounded-full border border-gray-800 uppercase">
             Identity_Layer_02
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* IP & MAC Explanation */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="p-8 bg-gray-900 border border-cyan-500/20 rounded-3xl relative overflow-hidden h-full flex flex-col group">
               <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
                 <div className="w-2 h-8 bg-cyan-500"></div>
                 IP vs MAC Address
               </h2>
               
               <div className="space-y-6 text-sm leading-relaxed">
                 <div className="bg-gray-950 p-5 border border-gray-800 rounded-xl">
                    <h4 className="flex items-center gap-2 font-bold text-cyan-400 mb-2 uppercase text-xs">
                      <MapPin className="w-4 h-4" /> IP Address (Logic)
                    </h4>
                    <p className="text-gray-400">
                      Ibarat alamat rumah lo sekarang. Alamat ini bisa berubah kalau lo pindah rumah atau ganti <span className="text-white italic">Provider Internet</span>.
                    </p>
                 </div>

                 <div className="bg-gray-950 p-5 border border-gray-800 rounded-xl">
                    <h4 className="flex items-center gap-2 font-bold text-emerald-400 mb-2 uppercase text-xs">
                      <Fingerprint className="w-4 h-4" /> MAC Address (Physics)
                    </h4>
                    <p className="text-gray-400">
                      Ibarat nomor KTP atau plat nomor mobil asli dari pabrik. Ini <span className="text-white italic">Hard-coded</span> di kartu jaringan lo.
                    </p>
                 </div>

                 <div className="bg-red-500/5 p-5 border-l-4 border-red-500 rounded-r-xl">
                    <h4 className="flex items-center gap-2 font-bold text-red-400 mb-2 uppercase text-xs">
                       <ShieldOff className="w-4 h-4" /> Hacker Perspective:
                    </h4>
                    <p className="italic text-red-100/70 text-xs">
                      Hacker butuh <span className="text-white">IP Spoofing</span> buat malsuin alamat origin serangan biar nggak gampang dilacak balik sama polisi cyber. Terus ada <span className="text-white">MAC Spoofing</span> buat "tipu-tipu" WiFi publik yang biasanya cuma ngebatesin akses berdasarkan ID mesin.
                    </p>
                 </div>
               </div>
            </div>
          </motion.div>

          {/* Hands-on Simulation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900 border border-emerald-500/20 rounded-3xl p-8 relative overflow-hidden"
          >
             <div className="flex items-center gap-3 mb-8">
                <ShieldAlert className="w-6 h-6 text-emerald-500" />
                <h3 className="text-xl font-bold text-white uppercase tracking-tighter italic">Spoofing Console</h3>
             </div>

             <div className="space-y-6">
                {/* IP Field */}
                <div className="p-6 bg-gray-950 border border-gray-800 rounded-2xl relative overflow-hidden shadow-inner">
                   <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 flex justify-between">
                      <span>Public_IPv4</span>
                      <span className="text-emerald-500 font-bold animate-pulse">DHCP: ACTIVE</span>
                   </div>
                   <div className="text-3xl font-black text-center py-4 text-white tracking-[0.2em] font-mono group relative">
                      <AnimatePresence mode="wait">
                        <motion.span 
                          key={ip}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="relative z-10"
                        >
                          {ip}
                        </motion.span>
                      </AnimatePresence>
                      {/* Scanline overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(transparent,rgba(16,185,129,0.05),transparent)] animate-scanline pointer-events-none"></div>
                   </div>
                   <button 
                     onClick={generateIp}
                     className="w-full mt-4 flex items-center justify-center gap-3 bg-emerald-600 hover:bg-white text-white hover:text-black py-3 rounded-lg text-xs font-black uppercase transition-all shadow-lg active:scale-95"
                     disabled={isSpoofing}
                   >
                     <RefreshCw className={`w-4 h-4 ${isSpoofing ? 'animate-spin' : ''}`} />
                     {isSpoofing ? 'SPOOFING IP...' : 'MANIPULASI IP (RE-GENERATE)'}
                   </button>
                </div>

                {/* MAC Field */}
                <div className="p-6 bg-gray-950 border border-gray-800 rounded-2xl opacity-50 relative group">
                   <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 flex justify-between">
                      <span>Physical_MAC_Addr</span>
                      <span className="text-red-500/50">READ_ONLY</span>
                   </div>
                   <div className="text-2xl font-black text-center py-4 text-gray-500 tracking-[0.1em] font-mono">
                      {mac}
                   </div>
                   <div className="absolute top-2 right-4 text-[8px] text-gray-700 italic border border-gray-800 px-2 rounded">Bawaan Pabrik</div>
                </div>

                <div className="p-4 bg-emerald-500/10 border border-emerald-500/50 text-[11px] font-bold italic text-emerald-400 leading-relaxed text-center shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                  <span className="text-white drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]">Notice:</span> Liat kan? Biarpun lo gonta-ganti IP sampe pusing, nomor MAC lo tetep sama (kecuali lo pake teknik "MAC Changer"). Gini cara admin tau lo siapa di dalem jaringan lokal.
                </div>
             </div>
          </motion.div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 flex justify-between items-center bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
          <Link 
            to="/academy/stage-1/modul-2/intro"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors uppercase group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1" />
            BACK: NETWORKING INTRO
          </Link>
          
          <Link 
            to="/academy/stage-1/modul-2/port-protokol"
            className="flex items-center gap-2 text-xs font-black text-emerald-400 hover:text-white transition-colors uppercase group animate-pulse"
          >
            LANJUT: PORT & PROTOKOL
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IpDanMac;
