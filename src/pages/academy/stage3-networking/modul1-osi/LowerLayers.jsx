import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Zap, Globe, Server, Computer, Box, Scissors, Shield, Terminal, Home, ArrowRight } from 'lucide-react';

const LowerLayers = () => {
  const [activeTab, setActiveTab] = useState(4);
  const [showSegments, setShowSegments] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-6xl mx-auto">

        {/* Standardized Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-cyan-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/50 text-emerald-400">
            <Zap className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-500 tracking-[0.3em] uppercase font-black">Stage 3: Networking</h1>
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
              MODUL 1: OSI MODEL
            </h2>
          </div>
        </motion.div>

        {/* 2-Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Material */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="space-y-6">
               <div className="space-y-2">
                  <h3 className="text-xl font-black text-white uppercase italic flex items-center gap-3 font-mono">
                     <Box className="w-6 h-6 text-emerald-500" /> Layer 4: Transport
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    Si "Kurir". Dia mecah surat/data lo jadi paket kecil-kecil biar gampang dibawa dan gak macetin jalan. Ibarat <span className="text-emerald-400 font-bold underline font-mono italic">surat dipecah ke beberapa amplop.</span>
                  </p>
               </div>

               <div className="space-y-2">
                  <h3 className="text-xl font-black text-white uppercase italic flex items-center gap-3 font-mono">
                     <Globe className="w-6 h-6 text-blue-500" /> Layer 3: Network
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    Si "Navigasi". Paket tadi ditempelin <span className="text-blue-400 font-bold">Alamat IP</span> (Nomor Rumah). Biar kurirnya tau harus lewat jalan mana dan gak nyasar ke rumah mantan!
                  </p>
               </div>

               <div className="space-y-2">
                  <h3 className="text-xl font-black text-white uppercase italic flex items-center gap-3 font-mono">
                     <Server className="w-6 h-6 text-cyan-500" /> Layer 2: Data Link
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    Pas keamanan hardware. Paket ditempelin <span className="text-cyan-400 font-bold">MAC Address</span>. Ini kayak plat nomor motor kurir yang bawa paket lo.
                  </p>
               </div>

               <div className="space-y-2">
                  <h3 className="text-xl font-black text-white uppercase italic flex items-center gap-3 font-mono">
                     <Computer className="w-6 h-6 text-yellow-500" /> Layer 1: Physical
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    Kabel & Sinyal. Data berubah jadi sinyal listrik atau WiFi (0 dan 1). Ibarat kurirnya udah mulai <span className="text-yellow-500 font-bold italic">ngegas motornya</span> di jalan raya!
                  </p>
               </div>
            </div>
          </motion.div>

          {/* Right Column: Simulation Case */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-900/50 border border-emerald-500/30 rounded-xl p-8 shadow-2xl relative overflow-hidden flex flex-col min-h-[550px]"
          >
            <div className="absolute top-4 left-4 flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
               <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest font-mono">SIMULATION: LOWER_LAYERS</span>
            </div>

            {/* Tabs */}
            <div className="mt-8 flex bg-black/40 p-1 rounded-lg mb-8 border border-white/5">
              {[4, 3, 2, 1].map((layer) => (
                <button
                  key={layer}
                  onClick={() => setActiveTab(layer)}
                  className={`flex-1 py-3 rounded-md text-[10px] font-black transition-all ${activeTab === layer ? 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  LAYER {layer}
                </button>
              ))}
            </div>

            <div className="flex-1 flex flex-col">
              <AnimatePresence mode="wait">
                {activeTab === 4 && (
                  <motion.div 
                    key="l4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="flex flex-col h-full items-center justify-center space-y-8"
                  >
                    {!showSegments ? (
                      <motion.div 
                        layoutId="data-box"
                        className="w-40 h-40 bg-emerald-500/10 border-2 border-emerald-500/50 rounded-lg flex flex-col items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                      >
                         <Box className="w-16 h-16 text-emerald-400 mb-2" />
                         <span className="text-[10px] font-black text-emerald-300">DATA_100MB</span>
                      </motion.div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                          <motion.div 
                            key={i} 
                            initial={{ opacity: 0, y: 10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            className="w-24 h-24 bg-emerald-500/5 border border-emerald-500/30 rounded-sm flex flex-col items-center justify-center"
                          >
                             <Scissors className="w-6 h-6 text-emerald-500/40 mb-1" />
                             <span className="text-[8px] font-black text-emerald-200 uppercase">Segment_0{i}</span>
                          </motion.div>
                        ))}
                      </div>
                    )}
                    
                    <div className="w-full">
                       <button 
                         onClick={() => setShowSegments(!showSegments)}
                         className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-sm font-black uppercase tracking-widest text-[9px] transition-all"
                       >
                         {showSegments ? 'GABUNGKAN DATA' : 'PECAH DATA (FRAGMENTATION)'}
                       </button>
                       <p className="mt-4 text-[10px] text-emerald-500/60 font-medium italic text-center">
                         "Data dipecah jadi ukuran kecil (Segments) biar muat di jalan raya."
                       </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 3 && (
                  <motion.div 
                    key="l3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col h-full items-center justify-center space-y-6"
                  >
                    <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                          <motion.div 
                            key={i} 
                            className="w-32 h-20 bg-blue-500/5 border border-blue-500/30 rounded-sm flex flex-col items-center justify-center relative overflow-hidden"
                          >
                             <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                             <span className="text-[7px] text-gray-500 font-black mb-1 italic">PACKET_0{i}</span>
                             <div className="flex flex-col items-center gap-0.5">
                                <span className="text-[8px] text-blue-400 font-bold font-mono">192.168.1.{i}</span>
                                <ArrowRight className="w-2 h-2 text-gray-600" />
                                <span className="text-[8px] text-emerald-400 font-bold font-mono">10.0.0.254</span>
                             </div>
                          </motion.div>
                        ))}
                    </div>
                    <div className="p-4 bg-blue-500/10 border-l-2 border-blue-500 rounded-sm">
                       <p className="text-[10px] text-blue-300 font-bold uppercase tracking-wider leading-relaxed">
                          Network Layer (L3):<br/>
                          <span className="text-gray-500 font-medium normal-case block mt-1">Ngasih alamat rumah (IP Address) biar paket gak nyasar ke rumah mantan!</span>
                       </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 2 && (
                  <motion.div 
                    key="l2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col h-full items-center justify-center space-y-6"
                  >
                    <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                          <motion.div 
                            key={i} 
                            className="w-32 h-20 bg-cyan-500/5 border border-cyan-500/30 rounded-sm flex flex-col items-center justify-center relative group"
                          >
                             <Shield className="w-4 h-4 text-cyan-500/40 mb-1" />
                             <span className="text-[8px] text-cyan-200 font-bold font-mono">MAC: AA:BB:CC:0{i}</span>
                             <div className="absolute -top-2 -right-2">
                                <motion.div animate={{ rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                                   <Server className="w-4 h-4 text-cyan-500" />
                                </motion.div>
                             </div>
                          </motion.div>
                        ))}
                    </div>
                    <div className="p-4 bg-cyan-500/10 border-l-2 border-cyan-500 rounded-sm">
                       <p className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider leading-relaxed">
                          Data Link Layer (L2):<br/>
                          <span className="text-gray-500 font-medium normal-case block mt-1">Ngasih plat nomor motor kurir (MAC Address) untuk jalan antar-gang terdekat.</span>
                       </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 1 && (
                  <motion.div 
                    key="l1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col h-full items-center justify-center space-y-12"
                  >
                    <div className="w-full h-24 bg-black/60 border border-yellow-500/20 rounded-xl relative flex items-center overflow-hidden">
                       <div className="absolute inset-0 flex items-center justify-around px-4">
                          {[...Array(20)].map((_, i) => (
                             <motion.span 
                               key={i}
                               animate={{ 
                                 x: [0, 400],
                                 opacity: [0, 1, 0]
                               }}
                               transition={{ 
                                 repeat: Infinity, 
                                 duration: 1.5,
                                 delay: i * 0.1,
                                 ease: "linear"
                               }}
                               className="text-yellow-500 font-black text-xl"
                             >
                               {Math.round(Math.random())}
                             </motion.span>
                          ))}
                       </div>
                       <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-transparent to-gray-950 pointer-events-none"></div>
                    </div>
                    
                    <div className="flex items-center gap-12">
                       <div className="flex flex-col items-center gap-2">
                          <Computer className="w-8 h-8 text-yellow-500" />
                          <span className="text-[7px] text-gray-600 font-black uppercase">SENDER</span>
                       </div>
                       <div className="h-px w-32 bg-yellow-500/30 relative">
                          <motion.div 
                            animate={{ x: [0, 128] }} 
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="absolute top-1/2 -translate-y-1/2 w-4 h-[2px] bg-yellow-400 shadow-[0_0_10px_#f59e0b]"
                          />
                       </div>
                       <div className="flex flex-col items-center gap-2">
                          <Zap className="w-8 h-8 text-yellow-500 animate-pulse" />
                          <span className="text-[7px] text-gray-600 font-black uppercase">RECEIVER</span>
                       </div>
                    </div>

                    <div className="p-4 bg-yellow-500/10 border-l-2 border-yellow-500 rounded-sm w-full">
                       <p className="text-[10px] text-yellow-300 font-bold uppercase tracking-widest text-center animate-pulse">
                          Wushhh! Data diubah jadi sinyal listrik/cahaya!
                       </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
            to="/academy/stage-3/modul-1/upper-layers"
            className="flex items-center gap-2 text-gray-600 hover:text-white transition-all font-black uppercase tracking-widest text-[10px] group"
          >
             <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> BACK: UPPER LAYERS
          </Link>
          <Link 
            to="/academy/stage-3/modul-1/kesimpulan"
            className="flex items-center gap-2 text-cyan-500 hover:text-white transition-all font-black uppercase tracking-widest text-[10px] group"
          >
             LANJUT: KESIMPULAN <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

// Helper components for icons not defined in lucide-react (like Play/RotateCcw if they weren't imported correctly)
const Play = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
);
const RotateCcw = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
);

export default LowerLayers;
