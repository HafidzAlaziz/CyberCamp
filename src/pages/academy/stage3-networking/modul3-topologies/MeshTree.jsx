import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Network, 
  ChevronRight, 
  ChevronLeft,
  ShieldAlert,
  Server,
  Monitor,
  Database,
  Share2,
  GitGraph,
  Skull
} from 'lucide-react';

const MeshTree = () => {
  const [activeTab, setActiveTab] = useState('mesh');
  const [destroyedNode, setDestroyedNode] = useState(null);
  const [movementStep, setMovementStep] = useState(0);

  const meshNodes = [
    { id: 1, x: 50, y: 15 }, // Top
    { id: 2, x: 85, y: 40 }, // Right
    { id: 3, x: 75, y: 80 }, // Bottom Right
    { id: 4, x: 25, y: 80 }, // Bottom Left
    { id: 5, x: 15, y: 40 }, // Left
  ];

  // All possible connections for Mesh
  const meshConnections = [
    [1, 2], [1, 3], [1, 4], [1, 5],
    [2, 3], [2, 4], [2, 5],
    [3, 4], [3, 5],
    [4, 5]
  ];

  const treeNodes = [
    { id: 'server', label: 'Main Server', x: 50, y: 15, level: 0 },
    { id: 'sw1', label: 'Switch L2-A', x: 30, y: 45, level: 1, parent: 'server' },
    { id: 'sw2', label: 'Switch L2-B', x: 70, y: 45, level: 1, parent: 'server' },
    { id: 'pc1', label: 'Staff_01', x: 20, y: 80, level: 2, parent: 'sw1' },
    { id: 'pc2', label: 'Staff_02', x: 40, y: 80, level: 2, parent: 'sw1' },
    { id: 'pc3', label: 'Staff_03', x: 60, y: 80, level: 2, parent: 'sw2' },
    { id: 'pc4', label: 'Hacker Target', x: 80, y: 80, level: 2, parent: 'sw2' },
  ];

  const resetSim = (tab) => {
    setActiveTab(tab);
    setDestroyedNode(null);
    setMovementStep(0);
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
        <div className="space-y-6">
          <div className="flex gap-2 mb-4">
            {['mesh', 'tree'].map((tab) => (
              <button
                key={tab}
                onClick={() => resetSim(tab)}
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
            {activeTab === 'mesh' ? (
              <motion.section 
                key="mesh-text"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                   MESH: <span className="text-cyan-500 italic">TANKNYA JARINGAN</span> 🛡️
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  Semua PC saling nyambung silang satu sama lain. Ibarat komplek perumahan yang setiap rumahnya punya pintu rahasia ke SEMUA rumah tetangga.
                </p>
                <div className="bg-gray-900/60 border-l-4 border-cyan-500 p-4 space-y-2">
                   <p className="text-xs font-black text-cyan-500 tracking-widest uppercase">The Pro Mindset:</p>
                   <p className="text-sm italic italic">
                     "Internet itu pake konsep Mesh. Kalo pun ada satu server atau jalur kabel di satu negara putus, data lo otomatis bakal cari rute lain biar tetep nyampe. Paling susah dilumpuhin total!"
                   </p>
                </div>
              </motion.section>
            ) : (
              <motion.section 
                key="tree-text"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                   TREE: <span className="text-emerald-500 italic">CORPORATE LADDER</span> 🏢
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  Gabungan dari beberapa topologi Star yang disusun hierarki kayak pohon. Ada Server Utama di pucuk, trus nyabang ke Switch Lantai, baru ke PC Staff.
                </p>
                <div className="bg-gray-900/60 border-l-4 border-emerald-500 p-4 space-y-2">
                   <p className="text-xs font-black text-emerald-500 tracking-widest uppercase">Pola Serangan:</p>
                   <p className="text-sm italic leading-relaxed">
                     "Hacker biasanya masuk dari **Akar** (PC Staff yang kena pancing phishing). Dari PC itu, lo 'manjat' ke Switch, trus nyari jalan buat 'melompat' ke PC IT/Admin, sampe akhirnya dapet kontrol Server Utama di pucuk."
                   </p>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        {/* Kolom Kanan: Simulasi */}
        <div className="bg-gray-900/50 border-2 border-cyan-500/30 rounded-2xl p-6 relative min-h-[450px] overflow-hidden">
           <div className="absolute top-4 right-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping"></div>
              <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest leading-none">Simulation_Active</span>
           </div>

           <div className="w-full h-full relative">
             {activeTab === 'mesh' ? (
               <div className="w-full h-full relative">
                  {/* Canvas for connection lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {meshConnections.map(([from, to], idx) => {
                      const n1 = meshNodes.find(n => n.id === from);
                      const n2 = meshNodes.find(n => n.id === to);
                      const isActive = destroyedNode !== from && destroyedNode !== to;
                      return (
                        <motion.line 
                          key={`mesh-line-${idx}`}
                          x1={`${n1.x}%`} y1={`${n1.y}%`}
                          x2={`${n2.x}%`} y2={`${n2.y}%`}
                          stroke={isActive ? '#22d3ee' : '#ef4444'}
                          strokeWidth={isActive ? '1' : '0.5'}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isActive ? 0.3 : 0.05 }}
                        />
                      );
                    })}
                  </svg>

                  {/* Nodes */}
                  {meshNodes.map((node) => {
                    const isDown = destroyedNode === node.id;
                    return (
                      <motion.div 
                        key={`mesh-node-${node.id}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                        onClick={() => setDestroyedNode(isDown ? null : node.id)}
                      >
                         <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${isDown ? 'bg-red-500 border-red-300 shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'bg-gray-800 border-cyan-500 group-hover:border-white shadow-[0_0_15px_rgba(34,211,238,0.1)]'}`}>
                            {isDown ? <Skull className="w-6 h-6 text-black" /> : <Monitor className="w-6 h-6 text-cyan-400" />}
                         </div>
                         <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-black uppercase text-white tracking-widest whitespace-nowrap opacity-40">
                           {isDown ? 'OFFLINE' : `NODE_0${node.id}`}
                         </div>
                      </motion.div>
                    );
                  })}

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full text-center">
                     <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">
                       {destroyedNode ? 'Backup rute otomatis aktif!' : 'Klik PC mana aja buat hancurin'}
                     </p>
                  </div>
               </div>
             ) : (
               <div className="w-full h-full relative">
                  {/* Tree Connections */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {treeNodes.map((node) => {
                      if (!node.parent) return null;
                      const parent = treeNodes.find(n => n.id === node.parent);
                      const isHacked = movementStep >= (2 - node.level + 1); // Simplistic hack logic
                      // Better hack logic for tree:
                      const hackLevel = 
                        (movementStep >= 1 && node.id === 'pc4') ||
                        (movementStep >= 2 && (node.id === 'sw2' || node.id === 'pc3')) ||
                        (movementStep >= 3 && (node.id === 'server' || node.id === 'sw1' || node.id === 'pc1' || node.id === 'pc2'));

                      return (
                        <motion.line 
                          key={`tree-line-${node.id}`}
                          x1={`${parent.x}%`} y1={`${parent.y}%`}
                          x2={`${node.x}%`} y2={`${node.y}%`}
                          stroke={hackLevel ? '#ef4444' : '#22d3ee'}
                          strokeWidth="2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.2 }}
                        />
                      );
                    })}
                  </svg>

                  {/* Nodes */}
                  {treeNodes.map((node) => {
                    const isControlled = 
                      (movementStep >= 1 && node.id === 'pc4') ||
                      (movementStep >= 2 && (node.id === 'sw2' || node.id === 'pc3')) ||
                      (movementStep >= 3 && (node.id === 'server' || node.id === 'sw1' || node.id === 'pc1' || node.id === 'pc2'));

                    return (
                      <motion.div 
                        key={`tree-node-${node.id}`}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                      >
                         <div className={`p-3 rounded-xl border-2 transition-all duration-500 ${isControlled ? 'bg-red-500 border-red-200 shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'bg-gray-800 border-cyan-500 shadow-lg'}`}>
                            {node.id === 'server' && <Database className={`w-8 h-8 ${isControlled ? 'text-white' : 'text-cyan-400'}`} />}
                            {node.id.startsWith('sw') && <Share2 className={`w-6 h-6 ${isControlled ? 'text-white' : 'text-cyan-400'}`} />}
                            {node.id.startsWith('pc') && <Monitor className={`w-5 h-5 ${isControlled ? 'text-white' : 'text-cyan-400'}`} />}
                         </div>
                         <span className={`text-[8px] font-black uppercase mt-2 tracking-widest ${isControlled ? 'text-red-400' : 'text-gray-500'}`}>
                           {node.label}
                         </span>
                      </motion.div>
                    );
                  })}

                  <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col gap-4">
                     <button 
                       onClick={() => setMovementStep(prev => (prev < 3 ? prev + 1 : 0))}
                       className={`p-4 rounded-full border-2 transition-all active:scale-90 ${movementStep > 0 ? 'bg-red-500 border-red-300 animate-pulse' : 'bg-gray-800 border-cyan-500 text-cyan-500 hover:bg-cyan-500/10'}`}
                     >
                        {movementStep === 0 ? <Search className="w-8 h-8" /> : <Skull className="w-8 h-8 text-white" />}
                     </button>
                     <span className="text-[10px] text-center font-black uppercase tracking-widest text-gray-600 block w-20">
                        {movementStep === 0 ? 'Mulai Lateral Entry' : movementStep === 3 ? 'Mission_Done' : 'Next Step'}
                     </span>
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
          <span className="text-white font-black italic tracking-tighter uppercase">03. MESH_&_TREE</span>
        </div>
        
        <div className="flex gap-4">
          <Link 
            to="/academy/stage-3/modul-3/star-bus-ring"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-400 text-xs font-black rounded-lg transition-all uppercase tracking-widest border border-gray-700 flex items-center gap-2"
          >
            « Kembali
          </Link>
          <Link 
            to="/academy/stage-3/modul-3/kesimpulan"
            className="px-8 py-3 bg-cyan-500 hover:bg-white hover:text-black text-black text-xs font-black rounded-lg transition-all uppercase tracking-widest flex items-center gap-3 group/btn"
          >
            Lanjut: Kesimpulan <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MeshTree;
