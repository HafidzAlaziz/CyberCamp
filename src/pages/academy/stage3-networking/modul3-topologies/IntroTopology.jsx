import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Network, 
  Search, 
  Map as MapIcon, 
  Database, 
  ShieldAlert, 
  ChevronRight, 
  Terminal,
  Server,
  Monitor
} from 'lucide-react';

const IntroTopology = () => {
  const [isMapping, setIsMapping] = useState(false);
  const [discoveredNodes, setDiscoveredNodes] = useState([]);

  const nodes = [
    { id: 1, type: 'pc', label: 'PC Satpam', x: 20, y: 80, delay: 0.5 },
    { id: 2, type: 'switch', label: 'Switch Lantai 1', x: 40, y: 50, delay: 1.5, connectTo: [1] },
    { id: 3, type: 'pc', label: 'PC Staff HR', x: 30, y: 20, delay: 2.5, connectTo: [2] },
    { id: 4, type: 'server', label: 'Server Database', x: 80, y: 50, delay: 4, connectTo: [2] },
    { id: 5, type: 'pc', label: 'Laptop Manager', x: 70, y: 80, delay: 3.2, connectTo: [4] },
  ];

  const startMapping = () => {
    setIsMapping(true);
    setDiscoveredNodes([]);
    nodes.forEach((node, index) => {
      setTimeout(() => {
        setDiscoveredNodes(prev => [...prev, node]);
      }, node.delay * 1000);
    });
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
          <h1 className="text-sm text-cyan-500 tracking-[0.3em] uppercase font-black text-glow-cyan">Stage 3: Networking</h1>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            MODUL 3: Network Topologies
          </h2>
        </div>
      </motion.div>

      {/* Main Content: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-grow">
        {/* Kolom Kiri: Materi */}
        <div className="space-y-6">
          <section className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <MapIcon className="w-24 h-24 text-cyan-500" />
            </div>
            <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
              <span className="text-cyan-500">01.</span> APA ITU TOPOLOGI?
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Bayangin lo lagi masuk ke komplek perumahan elit yang dijaga ketat. Lo nggak bisa asal lari-larian di situ tanpa tau jalan mana yang buntu dan jalan mana yang nembus ke rumah target.
            </p>
            <div className="bg-cyan-500/5 border-l-4 border-cyan-500 p-4 italic text-sm">
              "Topologi Jaringan itu ibarat **Peta Denah Jalan** di komplek tersebut. Ini adalah bentuk fisik atau logis gimana komputer-komputer saling disambungin pake kabel atau wireless."
            </div>
          </section>

          <section className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800">
            <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-3 text-glow-cyan">
              KENAPA HACKER PEDULI?
            </h2>
            <div className="space-y-4 text-sm md:text-base">
              <p>
                Admin jaringan biasanya punya peta rapi, tapi buat kita (sebagai penyusup), kita masuk dalam keadaan **BUTA**. 
              </p>
              <p>
                Kalau lo berhasil *jebol* satu PC satpam di depan, lo nggak bakal dapet apa-apa kalau cuma diem di situ. Lo butuh peta rute buat pindah ke PC lain yang lebih penting, kayak **Server Database**. 
              </p>
              <div className="p-4 bg-black/40 border border-gray-800 rounded-xl">
                 <p className="text-cyan-400 font-bold mb-2 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4" /> LATERAL MOVEMENT
                 </p>
                 <p className="text-xs text-gray-500">
                    Proyeksi pergerakan hacker di dalem jaringan dari satu node ke node lain buat nyari target utama. Tanpa tau topologi, lo cuma muter-muter nggak jelas!
                 </p>
              </div>
            </div>
          </section>
        </div>

        {/* Kolom Kanan: Simulasi */}
        <div className="bg-gray-900/50 border-2 border-cyan-500/30 rounded-3xl p-6 relative flex flex-col items-center justify-center min-h-[400px] overflow-hidden shadow-[inset_0_0_50px_rgba(6,182,212,0.1)]">
           {/* Scanline Effect */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
           
           <div className="relative w-full h-full flex items-center justify-center">
             {!isMapping && discoveredNodes.length === 0 ? (
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="text-center"
               >
                 <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-dashed border-gray-600 animate-pulse">
                   <Search className="w-10 h-10 text-gray-600" />
                 </div>
                 <h3 className="text-gray-500 font-black tracking-widest uppercase mb-4">Network Is Dark</h3>
                 <button 
                   onClick={startMapping}
                   className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-3 rounded-full font-black text-sm uppercase transition-all shadow-lg shadow-cyan-500/20 active:scale-95 flex items-center gap-3 mx-auto"
                 >
                   <Terminal className="w-4 h-4" /> Mulai Ping Sweep
                 </button>
               </motion.div>
             ) : (
               <div className="w-full h-full relative">
                 {/* Discovered Nodes */}
                 <AnimatePresence>
                   {discoveredNodes.map((node) => (
                     <React.Fragment key={node.id}>
                        {/* Connection Lines */}
                        {node.connectTo && node.connectTo.map(parentId => {
                          const parent = nodes.find(n => n.id === parentId);
                          return (
                            <motion.svg 
                              key={`line-${node.id}-${parentId}`}
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              className="absolute inset-0 w-full h-full pointer-events-none"
                            >
                              <line 
                                x1={`${parent.x}%`} 
                                y1={`${parent.y}%`} 
                                x2={`${node.x}%`} 
                                y2={`${node.y}%`} 
                                stroke="#22d3ee" 
                                strokeWidth="2"
                                strokeDasharray="5,5"
                                className="animate-[dash_20s_linear_infinite]"
                              />
                            </motion.svg>
                          );
                        })}

                        {/* Node Icon */}
                        <motion.div 
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                          style={{ left: `${node.x}%`, top: `${node.y}%` }}
                        >
                          <div className={`p-3 rounded-lg border-2 shadow-[0_0_15px_rgba(34,211,238,0.2)] ${node.type === 'server' ? 'bg-cyan-500 border-white' : 'bg-gray-800 border-cyan-500'}`}>
                            {node.type === 'pc' && <Monitor className={`w-6 h-6 ${node.type === 'server' ? 'text-black' : 'text-cyan-400'}`} />}
                            {node.type === 'switch' && <Network className={`w-6 h-6 ${node.type === 'server' ? 'text-black' : 'text-cyan-400'}`} />}
                            {node.type === 'server' && <Database className={`w-6 h-6 ${node.type === 'server' ? 'text-black' : 'text-cyan-400'}`} />}
                          </div>
                          <span className="text-[10px] text-white font-bold mt-2 whitespace-nowrap bg-black/80 px-2 py-0.5 rounded border border-gray-800">
                            {node.label}
                          </span>
                        </motion.div>
                     </React.Fragment>
                   ))}
                 </AnimatePresence>

                 {/* Mapping Status Overlay */}
                 <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping"></div>
                       <span className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase truncate">
                          {discoveredNodes.length < nodes.length ? 'Scanning_Segments...' : 'Network_Map_Complete'}
                       </span>
                    </div>
                    {discoveredNodes.length === nodes.length && (
                       <button 
                         onClick={() => { setIsMapping(false); setDiscoveredNodes([]); }}
                         className="text-[10px] text-gray-500 hover:text-white underline uppercase font-bold"
                       >
                         Reset Map
                       </button>
                    )}
                 </div>
               </div>
             )}
           </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="mt-12 flex justify-between items-center bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-y-0 left-0 w-1 bg-cyan-500"></div>
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black group-hover:text-cyan-500/50 transition-colors">Sekarang di:</span>
          <span className="text-white font-black italic tracking-tighter uppercase">01. INTRO_TOPOLOGY</span>
        </div>
        
        <div className="flex gap-4">
          <Link 
            to="/academy"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-400 text-xs font-black rounded-lg transition-all uppercase tracking-widest border border-gray-700"
          >
            « Kembali
          </Link>
          <Link 
            to="/academy/stage-3/modul-3/star-bus-ring"
            className="px-8 py-3 bg-cyan-500 hover:bg-white hover:text-black text-black text-xs font-black rounded-lg transition-all uppercase tracking-widest flex items-center gap-3 group/btn"
          >
            Lanjut: Star, Bus, & Ring <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
        .text-glow-cyan {
          text-shadow: 0 0 10px rgba(6, 182, 212, 0.4);
        }
      `}</style>
    </div>
  );
};

export default IntroTopology;
