import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Network, ChevronRight, ChevronLeft, Globe, Laptop, Send } from 'lucide-react';

const IntroNetworking = () => {
  const [isSending, setIsSending] = useState(false);

  const triggerPacket = () => {
    setIsSending(true);
    setTimeout(() => setIsSending(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8 border-b border-emerald-950 pb-6"
        >
          <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/50">
            <Network className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-sm text-emerald-500 tracking-[0.3em] uppercase">Stage 1: Fundamentals</h1>
            <h2 className="text-3xl font-bold text-white tracking-tighter">MODUL 2: BASICS OF NETWORKING</h2>
          </div>
        </motion.div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-emerald-400 italic">Welcome to the Web, Bro! 🌐</h3>
            <div className="space-y-4 text-base leading-relaxed text-gray-400">
              <p>
                Kalau di Modul 1 kita belajar soal "fisik" komputernya, di Modul 2 ini kita belajar gimana komputer-komputer itu <span className="text-white font-bold">ngobrol</span> satu sama lain.
              </p>
              <p>
                Ada dua istilah sakti yang wajib lo tau: <span className="text-emerald-400 font-bold">LAN</span> dan <span className="text-cyan-400 font-bold">WAN</span>.
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-emerald-500 font-bold"># LAN:</span> 
                  <span>Ibarat jalan perumahan. Cuma buat yang deket-deket aja (WiFi rumah, kantor).</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-500 font-bold"># WAN:</span> 
                  <span>Ibarat jalan tol lintas negara. Ini yang kita sebut Internet.</span>
                </li>
              </ul>
              <div className="p-4 bg-emerald-500/5 border-l-2 border-emerald-500 italic text-sm">
                <span className="text-emerald-400 font-bold">Kenapa hacker peduli?</span> Karena beda jenis jaringan, beda cara serangnya. Di LAN lo bisa pake <span className="text-white">Wireshark</span> buat nyadap data (Sniffing), tapi di WAN lo butuh teknik <span className="text-white">Remote Exploitation</span> buat nembus server di belahan dunia lain.
              </div>
            </div>
          </motion.div>

          {/* Visual/Hands-on: Packet Simulation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-900/50 p-8 rounded-3xl border border-gray-800 relative overflow-hidden"
          >
            <div className="text-center mb-10 text-xs font-bold tracking-widest text-emerald-500/50 uppercase">Data_Packet_Simulator</div>
            
            <div className="flex justify-between items-center relative py-12">
              {/* Computer A */}
              <div className="flex flex-col items-center gap-2 z-10">
                <div className="p-4 bg-gray-800 rounded-xl border border-emerald-500/30">
                  <Laptop className="w-8 h-8 text-emerald-400" />
                </div>
                <span className="text-[10px] text-gray-500">KOMPUTER A (LOCAL)</span>
              </div>

              {/* Path Line */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-800 -translate-y-1/2 overflow-hidden">
                <AnimatePresence>
                  {isSending && (
                    <motion.div 
                      initial={{ x: '-100%' }}
                      animate={{ x: '200%' }}
                      transition={{ duration: 1.5, ease: "linear" }}
                      className="h-full w-20 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981]"
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Computer B */}
              <div className="flex flex-col items-center gap-2 z-10">
                <div className="p-4 bg-gray-800 rounded-xl border border-cyan-500/30">
                  <Globe className="w-8 h-8 text-cyan-400" />
                </div>
                <span className="text-[10px] text-gray-500">SERVER WAN (INTERNET)</span>
              </div>

              {/* Traveling Packet (Dot) */}
              <AnimatePresence>
                {isSending && (
                  <motion.div
                    initial={{ left: '15%' }}
                    animate={{ left: '85%' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_20px_#10b981] z-20"
                  />
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={triggerPacket}
              disabled={isSending}
              className="w-full mt-6 py-4 bg-emerald-600 hover:bg-white text-white hover:text-black font-black text-xs uppercase tracking-widest transition-all rounded-sm flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <Send className="w-4 h-4" /> 
              {isSending ? 'SENDING PACKET...' : 'TEST KIRIM PAKET DATA'}
            </button>

            <div className="mt-4 text-[9px] text-center text-gray-600 leading-tight">
               *Tekan tombol buat liat gimana paket data "loncat" antar jaringan.
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="mt-16 flex justify-end">
          <Link 
            to="/academy/stage-1/modul-2/ip-mac"
            className="flex items-center gap-3 bg-emerald-500 hover:bg-white text-black px-8 py-4 rounded-sm font-bold transition-all group overflow-hidden relative"
          >
            <span className="relative z-10 uppercase tracking-tighter">GAS LANJUT: IP & MAC</span>
            <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IntroNetworking;
