import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Network, 
  ChevronRight, 
  ChevronLeft,
  Zap,
  ShieldAlert,
  Scissors,
  Wifi,
  Cpu,
  Monitor,
  Database
} from 'lucide-react';

const StarBusRing = () => {
  const [activeTab, setActiveTab] = useState('star');
  const [isHacked, setIsHacked] = useState(false);
  const [isCut, setIsCut] = useState(false);
  const [ringRotation, setRingRotation] = useState(0);

  // Animation for Ring Topology
  useEffect(() => {
    if (activeTab === 'ring') {
      const interval = setInterval(() => {
        setRingRotation(prev => (prev + 90) % 360);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  const resetSimulation = (tab) => {
    setActiveTab(tab);
    setIsHacked(false);
    setIsCut(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-4 md:p-8 flex flex-col">
      {/* Standardized Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-12 border-b border-cyan-900/30 pb-6 pl-0 md:pl-32"
      >
        <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/50">
          <Network className="w-8 h-8 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-sm text-cyan-500 tracking-[0.3em] uppercase font-black">Stage 3: Networking</h1>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            MODUL 3: Network Topologies
          </h2>
        </div>
      </motion.div>

      {/* Main Content: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-grow">
        {/* Kolom Kiri: Materi */}
        <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
          <div className="flex gap-2 mb-4">
            {['star', 'bus', 'ring'].map((tab) => (
              <button
                key={tab}
                onClick={() => resetSimulation(tab)}
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-md transition-all ${
                  activeTab === tab 
                  ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]' 
                  : 'bg-gray-900 text-gray-500 hover:text-white border border-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'star' && (
              <motion.section 
                key="star-materi"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-black text-white flex items-center gap-3 italic underline decoration-cyan-500 decoration-4 underline-offset-8">
                  STAR TOPOLOGY
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  Ini yang paling sering lo temuin di kantor atau rumah. Semua PC nyolok ke satu **Switch** (atau Router) di tengah.
                </p>
                <div className="p-4 bg-gray-900/60 border border-gray-800 rounded-xl space-y-3">
                  <h4 className="text-sm font-black text-cyan-400 uppercase tracking-widest">Hacker Vision:</h4>
                  <p className="text-xs italic leading-relaxed">
                    "Gue paling demen nih. Daripada gue hack PC satu-satu, mending gue hajar **Switch-nya**. Kalau Switch-nya udah di-kontrol (misal pake ARP Spoofing), gue bisa nyadap semua data yang lewat dari PC 1 ke PC lainnya tanpa ketahuan!"
                  </p>
                </div>
              </motion.section>
            )}

            {activeTab === 'bus' && (
              <motion.section 
                key="bus-materi"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-black text-white flex items-center gap-3 italic underline decoration-cyan-500 decoration-4 underline-offset-8">
                  BUS TOPOLOGY
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  Pola jadul. Semua PC 'numpang' di satu jalur kabel panjang (Backbone). Kayak angkot yang lewat di satu jalur utama.
                </p>
                <div className="p-4 bg-gray-900/60 border border-red-500/20 rounded-xl space-y-3">
                  <h4 className="text-sm font-black text-red-400 uppercase tracking-widest">Kelemahan Fatal:</h4>
                  <p className="text-xs italic leading-relaxed">
                    "Kalo kabel tumpuan utamanya (Bus) diputus atau rusak, ya wassalam. Jaringan satu garis itu bakal mati semua. Gampang banget dilumpuhin!"
                  </p>
                </div>
              </motion.section>
            )}

            {activeTab === 'ring' && (
              <motion.section 
                key="ring-materi"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-black text-white flex items-center gap-3 italic underline decoration-cyan-500 decoration-4 underline-offset-8">
                  RING TOPOLOGY
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  Semua PC nyambung muter kayak cincin. Datanya jalan searah (atau dua arah) ngelewatin tiap PC sampe ketemu tujuannya.
                </p>
                <div className="p-4 bg-gray-900/60 border border-amber-500/20 rounded-xl space-y-3">
                  <h4 className="text-sm font-black text-amber-400 uppercase tracking-widest">Fakta Unik:</h4>
                  <p className="text-xs italic leading-relaxed">
                    "Datanya muter-muter. Kalo satu PC mati, koneksinya bisa putus (kecuali pake Dual Ring). Ini ribet buat di-manage tapi rapi buat aliran data tertentu."
                  </p>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        {/* Kolom Kanan: Simulasi */}
        <div className="bg-gray-900/50 border-2 border-cyan-500/30 rounded-3xl p-8 relative flex flex-col items-center justify-center min-h-[450px] overflow-hidden">
           <div className="absolute top-4 left-6 text-[10px] text-gray-600 font-black tracking-widest flex items-center gap-2">
              <Cpu className="w-3 h-3" /> Simulation_Mode: {activeTab.toUpperCase()}
           </div>

           <div className="w-full h-full flex flex-col items-center justify-center gap-12">
             {/* Star Visual */}
             {activeTab === 'star' && (
               <div className="relative w-64 h-64 flex items-center justify-center">
                  <motion.div 
                    animate={isHacked ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
                    transition={{ duration: 0.5, repeat: isHacked ? Infinity : 0 }}
                    className={`z-20 p-4 rounded-xl border-2 transition-all duration-500 ${isHacked ? 'bg-red-500 border-red-300 shadow-[0_0_30px_rgba(239,68,68,0.5)]' : 'bg-cyan-500 border-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.3)]'}`}
                  >
                    <Network className={`w-10 h-10 ${isHacked ? 'text-black' : 'text-black'}`} />
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-black text-white whitespace-nowrap tracking-widest uppercase">
                       {isHacked ? 'SYSTEM_COMPROMISED' : 'CENTRAL_SWITCH'}
                    </span>
                  </motion.div>

                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="absolute inset-0 flex items-center justify-center" style={{ transform: `rotate(${i * 90}deg)` }}>
                      <div className={`w-36 h-0.5 border-t-2 border-dashed transition-colors duration-700 ${isHacked ? 'border-red-500' : 'border-cyan-500/30'}`}></div>
                      <div className="absolute left-[85%] -translate-x-1/2" style={{ transform: `rotate(${-i * 90}deg)` }}>
                        <div className="bg-gray-800 p-2 rounded-lg border border-gray-700">
                           <Monitor className={`w-5 h-5 ${isHacked ? 'text-red-500' : 'text-gray-400'}`} />
                        </div>
                      </div>
                    </div>
                  ))}
               </div>
             )}

             {/* Bus Visual */}
             {activeTab === 'bus' && (
               <div className="relative w-full px-12 h-64 flex items-center">
                  <div className={`w-full h-1 relative transition-colors duration-500 ${isCut ? 'bg-gray-800' : 'bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]'}`}>
                     {isCut && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-950 p-2"><Scissors className="w-6 h-6 text-red-500" /></div>}
                     
                     {[20, 40, 60, 80].map((pos, i) => (
                       <div key={i} className="absolute flex flex-col items-center gap-4" style={{ left: `${pos}%`, bottom: '0' }}>
                          <div className={`w-0.5 h-10 transition-colors ${isCut && pos > 50 ? 'bg-gray-700/50' : 'bg-cyan-500/40'}`}></div>
                          <div className={`p-2 rounded-lg border transition-all ${isCut && pos > 50 ? 'bg-black border-gray-800 opacity-30 grayscale' : 'bg-gray-800 border-cyan-500/30 shadow-lg shadow-cyan-500/5'}`}>
                             <Monitor className={`w-5 h-5 ${isCut && pos > 50 ? 'text-gray-700' : 'text-cyan-400'}`} />
                          </div>
                          <span className={`text-[8px] font-bold ${isCut && pos > 50 ? 'text-gray-600' : 'text-white'}`}>PC_{i+1}</span>
                       </div>
                     ))}
                  </div>
               </div>
             )}

             {/* Ring Visual */}
             {activeTab === 'ring' && (
               <div className="relative w-64 h-64 border-4 border-cyan-500/20 rounded-full flex items-center justify-center">
                  {[...Array(4)].map((_, i) => (
                    <motion.div 
                      key={i}
                      className="absolute w-12 h-12 bg-gray-800 border border-cyan-500/30 rounded-xl flex items-center justify-center"
                      style={{ 
                        left: `${50 + 40 * Math.cos(i * Math.PI/2 - Math.PI/2)}%`, 
                        top: `${50 + 40 * Math.sin(i * Math.PI/2 - Math.PI/2)}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                       <Monitor className="w-6 h-6 text-cyan-500" />
                    </motion.div>
                  ))}

                  {/* Rotating Data Token */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0"
                  >
                    <motion.div 
                       animate={{ scale: [1, 1.3, 1] }}
                       transition={{ duration: 1, repeat: Infinity }}
                       className="absolute left-[10%] top-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)]"
                    />
                  </motion.div>
               </div>
             )}

             {/* Action Button */}
             <div className="mt-8">
               {activeTab === 'star' && (
                 <button 
                   onClick={() => setIsHacked(!isHacked)}
                   className={`px-8 py-3 rounded-xl font-black text-xs uppercase transition-all flex items-center gap-3 ${isHacked ? 'bg-red-500 text-black shadow-lg shadow-red-500/20' : 'bg-gray-800 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10'}`}
                 >
                   <ShieldAlert className="w-4 h-4" /> {isHacked ? 'Stop Sniffing' : 'Retas Switch Tengah'}
                 </button>
               )}
               {activeTab === 'bus' && (
                 <button 
                    onClick={() => setIsCut(!isCut)}
                    className={`px-8 py-3 rounded-xl font-black text-xs uppercase transition-all flex items-center gap-3 ${isCut ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'bg-gray-800 text-red-400 border border-red-500/30 hover:bg-red-500/10'}`}
                 >
                   {isCut ? <Zap className="w-4 h-4" /> : <Scissors className="w-4 h-4" />} {isCut ? 'Perbaiki Jalur Kabel' : 'Gunting Kabel Utama'}
                 </button>
               )}
               {activeTab === 'ring' && (
                 <div className="flex items-center gap-2 text-cyan-500 bg-cyan-500/5 px-4 py-2 rounded-full border border-cyan-500/20">
                    <Wifi className="w-4 h-4 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Data_Stream_Active</span>
                 </div>
               )}
             </div>
           </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="mt-12 flex justify-between items-center bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-y-0 left-0 w-1 bg-cyan-500"></div>
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black group-hover:text-cyan-500/50 transition-colors">Sekarang di:</span>
          <span className="text-white font-black italic tracking-tighter uppercase">02. STAR_BUS_&_RING</span>
        </div>
        
        <div className="flex gap-4">
          <Link 
            to="/academy/stage-3/modul-3/intro"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-400 text-xs font-black rounded-lg transition-all uppercase tracking-widest border border-gray-700 flex items-center gap-2"
          >
            « Kembali
          </Link>
          <Link 
            to="/academy/stage-3/modul-3/mesh-tree"
            className="px-8 py-3 bg-cyan-500 hover:bg-white hover:text-black text-black text-xs font-black rounded-lg transition-all uppercase tracking-widest flex items-center gap-3 group/btn"
          >
            Lanjut: Mesh & Tree <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StarBusRing;
