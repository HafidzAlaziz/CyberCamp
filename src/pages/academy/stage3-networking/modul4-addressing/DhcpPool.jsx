import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Network, 
  ChevronRight, 
  ChevronLeft,
  Cpu,
  Monitor,
  Database,
  ShieldAlert,
  Zap,
  Server,
  UserPlus,
  Skull,
  XCircle
} from 'lucide-react';

const DhcpPool = () => {
  const [ipPool, setIpPool] = useState(Array(12).fill(null).map((_, i) => ({
    id: i,
    ip: `192.168.1.${100 + i}`,
    assignedTo: null,
    status: 'AVAILABLE'
  })));
  
  const [isStarving, setIsStarving] = useState(false);

  const requestIp = (isMalicious = false) => {
    const availableIndex = ipPool.findIndex(item => item.status === 'AVAILABLE');
    if (availableIndex === -1) return;

    const newPool = [...ipPool];
    newPool[availableIndex] = {
      ...newPool[availableIndex],
      assignedTo: isMalicious ? `FAKE_USER_${Math.random().toString(36).substring(7).toUpperCase()}` : 'GENUINE_USER',
      status: isMalicious ? 'MALICIOUS' : 'ASSIGNED'
    };
    setIpPool(newPool);
  };

  const triggerStarvation = () => {
    setIsStarving(true);
    const newPool = ipPool.map(item => ({
      ...item,
      assignedTo: item.status === 'AVAILABLE' ? `FAKE_USER_${Math.random().toString(36).substring(7).toUpperCase()}` : item.assignedTo,
      status: item.status === 'AVAILABLE' ? 'MALICIOUS' : item.status
    }));
    setIpPool(newPool);
  };

  const resetPool = () => {
    setIsStarving(false);
    setIpPool(Array(12).fill(null).map((_, i) => ({
      id: i,
      ip: `192.168.1.${100 + i}`,
      assignedTo: null,
      status: 'AVAILABLE'
    })));
  };

  const availableCount = ipPool.filter(i => i.status === 'AVAILABLE').length;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-4 md:p-8 flex flex-col">
      {/* Standardized Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-12 border-b border-cyan-900/30 pb-6 pl-0 md:pl-32"
      >
        <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/50">
          <Server className="w-8 h-8 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-sm text-cyan-500 tracking-[0.3em] uppercase font-black">Stage 3: Networking</h1>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            MODUL 4: IP, DHCP, & DNS
          </h2>
        </div>
      </motion.div>

      {/* Main Content: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-grow">
        {/* Kolom Kiri: Materi */}
        <div className="space-y-6">
          <section className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <UserPlus className="w-24 h-24 text-cyan-500" />
            </div>
            <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
               DHCP: <span className="text-cyan-500 italic">MANAJER APARTEMEN</span> 🏢
            </h2>
            <p className="text-gray-400 leading-relaxed">
               Bayangin lo masuk ke apartemen tapi nggak punya kunci kamar. Lo lapor ke Resepsionis, trus dikasih kunci kamar kosong secara acak buat sementara.
            </p>
            <p className="mt-4 text-sm bg-black/40 p-4 border border-gray-800 rounded-xl italic">
               "**DHCP** (Dynamic Host Configuration Protocol) itu si resepsionisnya. Dia yang ngasih **IP Address** otomatis ke setiap PC yang baru 'nyambung' ke jaringan."
            </p>
          </section>

          <section className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800 relative">
            <h2 className="text-2xl font-black text-red-500 mb-4 flex items-center gap-3">
               DHCP STARVATION 💀
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4 text-sm">
               Hacker benci nunggu. Biar PC lain nggak bisa dapet IP (alias nggak bisa internetan), hacker bisa pake serangan **Starvation** (Kelaparan).
            </p>
            <div className="space-y-4">
               <div className="flex items-start gap-4 p-3 bg-red-500/5 border border-red-500/20 rounded-lg">
                  <Skull className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                  <p className="text-xs italic text-gray-500">
                     "Gue bikin ribuan permintaan IP palsu secara cepet sampe IP di modem lo abis. Pas user beneran mau nyambung, modem bakal bilang: **'SORRY, IP ABIS, CARI TEMPAT LAIN!'**"
                  </p>
               </div>
               <div className="text-xs text-cyan-500 font-bold uppercase tracking-widest bg-cyan-500/5 p-2 text-center rounded">
                  Status: DOS (Denial of Service) Achieved
               </div>
            </div>
          </section>
        </div>

        {/* Kolom Kanan: Simulasi */}
        <div className="bg-gray-900/50 border-2 border-cyan-500/30 rounded-3xl p-8 relative flex flex-col min-h-[500px] overflow-hidden">
           <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-gray-800 rounded border border-gray-700">
                    <Database className="w-4 h-4 text-cyan-400" />
                 </div>
                 <div>
                    <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest block">IP_POOL_STORAGE</span>
                    <span className={`text-sm font-black italic ${availableCount === 0 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                       {availableCount} Available Leases
                    </span>
                 </div>
              </div>
              <button 
                onClick={resetPool}
                className="text-[10px] text-cyan-500 hover:text-white underline font-black tracking-widest uppercase"
              >
                Reset System
              </button>
           </div>

           {/* IP Grid */}
           <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-8">
             {ipPool.map((item) => (
               <motion.div 
                 key={item.id}
                 layout
                 className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all duration-500 relative overflow-hidden ${
                   item.status === 'AVAILABLE' ? 'bg-gray-900/50 border-gray-800' : 
                   item.status === 'MALICIOUS' ? 'bg-red-500/10 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' :
                   'bg-cyan-500/10 border-cyan-500/60'
                 }`}
               >
                 {item.status === 'AVAILABLE' && <Zap className="w-4 h-4 text-gray-800" />}
                 {item.status === 'ASSIGNED' && <Monitor className="w-4 h-4 text-cyan-400 animate-pulse" />}
                 {item.status === 'MALICIOUS' && <Skull className="w-4 h-4 text-red-500" />}
                 
                 <span className={`text-[7px] font-bold ${item.status === 'AVAILABLE' ? 'text-gray-700' : 'text-white'}`}>{item.ip}</span>
                 {item.status !== 'AVAILABLE' && (
                   <span className={`text-[6px] uppercase font-black px-1.5 py-0.5 rounded ${item.status === 'MALICIOUS' ? 'bg-red-500 text-black' : 'bg-cyan-500 text-black'}`}>
                      {item.status}
                   </span>
                 )}
               </motion.div>
             ))}
           </div>

           {/* Action Buttons */}
           <div className="mt-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                 <button 
                   onClick={() => requestIp(false)}
                   disabled={availableCount === 0}
                   className="bg-cyan-500 hover:bg-white text-black py-4 rounded-xl font-black text-[10px] uppercase transition-all flex items-center justify-center gap-3 disabled:opacity-20 active:scale-95"
                 >
                    <UserPlus className="w-4 h-4" /> Request IP (Normal)
                 </button>
                 <button 
                   onClick={() => requestIp(true)}
                   disabled={availableCount === 0}
                   className="bg-gray-800 hover:bg-red-500/10 border border-red-500/50 text-red-500 py-4 rounded-xl font-black text-[10px] uppercase transition-all flex items-center justify-center gap-3 disabled:opacity-20 active:scale-95"
                 >
                    <Skull className="w-4 h-4" /> Spoof Request
                 </button>
              </div>

              <button 
                onClick={triggerStarvation}
                disabled={availableCount === 0}
                className={`w-full py-5 rounded-2xl font-black text-xs uppercase transition-all flex items-center justify-center gap-4 relative overflow-hidden group border-2 ${availableCount === 0 ? 'bg-gray-900 border-gray-800 text-gray-700' : 'bg-red-600 border-red-400 text-black shadow-lg shadow-red-600/30'}`}
              >
                 <div className="absolute inset-x-0 bottom-0 h-1 bg-black/20 group-hover:h-full transition-all duration-500 z-0"></div>
                 <div className="relative z-10 flex items-center gap-4">
                   {availableCount === 0 ? <XCircle className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
                   {availableCount === 0 ? 'POOLED STARVED / SERVICE DOWN' : 'TRIGGER STARVATION ATTACK!'}
                 </div>
              </button>
           </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="mt-12 flex justify-between items-center bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-y-0 left-0 w-1 bg-cyan-500"></div>
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black group-hover:text-cyan-500/50 transition-colors">Sekarang di:</span>
          <span className="text-white font-black italic tracking-tighter uppercase">02. DHCP_POOL_MANAGEMENT</span>
        </div>
        
        <div className="flex gap-4">
          <Link 
            to="/academy/stage-3/modul-4/intro"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-400 text-xs font-black rounded-lg transition-all uppercase tracking-widest border border-gray-700 flex items-center gap-2"
          >
            « Kembali
          </Link>
          <Link 
            to="/academy/stage-3/modul-4/subnetting"
            className="px-8 py-3 bg-cyan-500 hover:bg-white hover:text-black text-black text-xs font-black rounded-lg transition-all uppercase tracking-widest flex items-center gap-3 group/btn"
          >
            Lanjut: Subnetting Lab <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DhcpPool;
