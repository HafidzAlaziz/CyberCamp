import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Globe, Lock, Unlock, Shield, Zap, Home, Search, MousePointer2 } from 'lucide-react';

const WebProtocols = () => {
  const [activeTab, setActiveTab] = useState('http');
  const [isSniffing, setIsSniffing] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-6xl mx-auto">

        {/* Standardized Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-blue-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/50">
            <Globe className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-sm text-blue-500 tracking-[0.3em] uppercase font-black">Stage 3: Networking</h1>
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
              <p>
                Lo pasti sering liat <span className="text-white font-bold">HTTP</span> sama <span className="text-cyan-400 font-bold underline">HTTPS</span> pas lagi browsing. Apa bedanya?
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-red-500/5 border border-red-500/20 rounded">
                  <span className="text-[10px] font-black text-red-500 block mb-1">HTTP (PORT 80)</span>
                  <p className="text-xs text-gray-500">Ibarat lo ngirim surat terbuka lewat pos. Siapa aja yang lewat bisa baca isi suratnya!</p>
                </div>
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded">
                  <span className="text-[10px] font-black text-emerald-500 block mb-1">HTTPS (PORT 443)</span>
                  <p className="text-xs text-gray-500">Ibarat surat lo dimasukin ke kotak brankas baja yang cuma penerima yang punya kuncinya.</p>
                </div>
              </div>

              <div className="p-6 bg-blue-950/20 border-l-4 border-blue-500 rounded-sm italic">
                <span className="text-blue-400 font-black uppercase text-[10px] block mb-2 tracking-widest flex items-center gap-2 font-mono">
                  <Shield className="w-4 h-4" /> Hacker POV: Sniffing
                </span>
                Hacker seneng banget nyari WiFi gratisan di kafe cuma buat <span className="text-white font-bold">"Sniffing"</span>. Mereka nyadap data yang lewat di udara. Kalau websitenya HTTP, password lo bakal keliatan jelas di layar mereka!
              </div>

              <p className="text-sm italic">
                Makanya, JANGAN PERNAH masukin password di web yang nggak ada <span className="text-emerald-500 font-bold italic">Logo Gemboknya</span>! 🔐
              </p>
            </div>
          </motion.div>

          {/* Right Column: Simulation Case */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-900/50 border border-blue-500/30 rounded-xl p-8 shadow-2xl relative overflow-hidden flex flex-col min-h-[550px]"
          >
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest font-mono">SIMULATION: NETWORK_SNIFFER</span>
            </div>

            {/* Tabs */}
            <div className="mt-8 flex bg-black/40 p-1 rounded-lg mb-8 border border-white/5">
              <button
                onClick={() => { setActiveTab('http'); setIsSniffing(false); }}
                className={`flex-1 py-3 rounded-md text-[10px] font-black transition-all ${activeTab === 'http' ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'text-gray-500 hover:text-gray-300'}`}
              >
                HTTP (PORT 80)
              </button>
              <button
                onClick={() => { setActiveTab('https'); setIsSniffing(false); }}
                className={`flex-1 py-3 rounded-md text-[10px] font-black transition-all ${activeTab === 'https' ? 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'text-gray-500 hover:text-gray-300'}`}
              >
                HTTPS (PORT 443)
              </button>
            </div>

            {/* Sniffing Area */}
            <div className="flex-1 flex flex-col items-center justify-between p-4">
              <div className="flex justify-between w-full relative">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center">
                    <Home className="w-6 h-6 text-gray-500" />
                  </div>
                  <span className="text-[8px] font-black text-gray-600 uppercase">CLIENT (LO)</span>
                </div>

                {/* Packet Animation */}
                <div className="flex-1 flex items-center justify-center relative">
                  {isSniffing && (
                    <motion.div
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 100, opacity: [0, 1, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className={`w-10 h-6 border ${activeTab === 'http' ? 'bg-red-500/20 border-red-500/50' : 'bg-emerald-500/20 border-emerald-500/50'} rounded-sm p-1 flex items-center justify-center`}
                    >
                      <Zap className={`w-3 h-3 ${activeTab === 'http' ? 'text-red-400' : 'text-emerald-400'}`} />
                    </motion.div>
                  )}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                    <Search className={`w-8 h-8 ${isSniffing ? 'text-blue-500 animate-bounce' : 'text-gray-800'}`} />
                    <span className={`text-[7px] font-black uppercase ${isSniffing ? 'text-blue-500' : 'text-gray-800'}`}>HACKER_EYE</span>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-blue-500" />
                  </div>
                  <span className="text-[8px] font-black text-gray-600 uppercase">SERVER (FB/IG)</span>
                </div>
              </div>

              {/* Hacker Terminal View */}
              <div className="w-full bg-black/60 border border-white/5 rounded-lg p-6 font-mono min-h-[160px] relative overflow-hidden">
                <div className="text-[10px] mb-2 text-gray-600 flex justify-between">
                  <span>Hacker_Console: Sniffing_WiFi_Public</span>
                  <span className="text-[8px] px-1 bg-red-500/20 text-red-500 font-bold uppercase">Live_Interception</span>
                </div>

                {isSniffing ? (
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="flex items-start gap-4">
                      <MousePointer2 className="w-4 h-4 text-white mt-1" />
                      <div className="space-y-1">
                        <div className="text-gray-500">POST /login HTTP/1.1</div>
                        <div className="text-gray-500">Host: website-apa-gitu.com</div>
                        <div className="h-px w-full bg-white/10 my-2"></div>
                        {activeTab === 'http' ? (
                          <motion.div
                            animate={{ color: ['#ef4444', '#f87171', '#ef4444'] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="text-xs font-black tracking-widest bg-red-500/10 p-2 border border-red-500/30 rounded"
                          >
                            Payload Found: user=hafidz&pass=123koding
                          </motion.div>
                        ) : (
                          <div className="text-xs font-black tracking-widest bg-emerald-500/10 p-2 border border-emerald-500/30 rounded text-emerald-400">
                            Payload Encrypted: *#@!&%^0x7F83...
                          </div>
                        )}
                      </div>
                    </div>
                    <p className={`text-[10px] italic text-center ${activeTab === 'http' ? 'text-red-500' : 'text-emerald-500'}`}>
                      {activeTab === 'http'
                        ? 'MAMPUS! Hacker dapet password lo karena gak di-enkripsi! 💀'
                        : 'SUKSES! Data diacak (HTTPS), hacker cuma dapet sampah!'}
                    </p>
                  </motion.div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center italic text-gray-800 text-[10px]">
                    Start sniffing to see live traffic...
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsSniffing(!isSniffing)}
                className={`w-full py-4 rounded-sm font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-300 flex items-center justify-center gap-3 border ${activeTab === 'http' ? 'bg-red-600 border-red-400 hover:bg-red-500' : 'bg-emerald-600 border-emerald-400 hover:bg-emerald-500'} text-white shadow-lg`}
              >
                {isSniffing ? <Zap className="w-4 h-4 animate-pulse" /> : <Search className="w-4 h-4" />}
                <span>{isSniffing ? 'STOP SNIFFING' : 'MULAI NYADAP (SNIFF)'}</span>
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
          <Link
            to="/academy/stage-3/modul-2"
            className="flex items-center gap-2 text-gray-600 hover:text-white transition-all font-black uppercase tracking-widest text-[10px] group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> BACK: INTRO PORTS
          </Link>
          <Link
            to="/academy/stage-3/modul-2/admin-protocols"
            className="flex items-center gap-2 text-cyan-500 hover:text-white transition-all font-black uppercase tracking-widest text-[10px] group"
          >
            LANJUT: ADMIN PROTOCOLS <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default WebProtocols;
