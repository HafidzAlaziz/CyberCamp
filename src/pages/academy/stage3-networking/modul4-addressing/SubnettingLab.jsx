import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Network, 
  ChevronRight, 
  ChevronLeft,
  Scissors,
  Layers,
  ShieldCheck,
  Globe,
  Lock,
  Grid,
  Divide
} from 'lucide-react';

const SubnettingLab = () => {
  const [cidr, setCidr] = useState(24);

  // Calculate subnet properties based on CIDR
  const getSubnetInfo = (c) => {
    if (c === 24) return { subnets: 1, hosts: 254, mask: '255.255.255.0', color: 'cyan' };
    if (c === 26) return { subnets: 4, hosts: 62, mask: '255.255.255.192', color: 'emerald' };
    if (c === 28) return { subnets: 16, hosts: 14, mask: '255.255.255.240', color: 'purple' };
    return { subnets: 1, hosts: 254, mask: '255.255.255.0', color: 'cyan' };
  };

  const info = getSubnetInfo(cidr);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-4 md:p-8 flex flex-col">
      {/* Standardized Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-12 border-b border-emerald-900/30 pb-6 pl-0 md:pl-32"
      >
        <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/50">
          <Divide className="w-8 h-8 text-emerald-400" />
        </div>
        <div>
          <h1 className="text-sm text-emerald-500 tracking-[0.3em] uppercase font-black">Stage 3: Networking</h1>
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
               <Scissors className="w-24 h-24 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
               SUBNETTING: <span className="text-emerald-500 italic">POTONG KUE</span> 🍰
            </h2>
            <p className="text-gray-400 leading-relaxed">
               Punya satu rumah gede (Network) itu bagus, tapi kalau semua orang bisa masuk ke semua ruangan, bahaya kan? 
            </p>
            <div className="mt-4 p-4 bg-emerald-500/5 border-l-4 border-emerald-500 text-sm italic">
               "Subnetting itu kayak bikin sekat-sekat atau tembok di dalem rumah tadi. Jaringan gede dipotong jadi bagian-bagian kecil biar lebih rapi dan aman."
            </div>
          </section>

          <section className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800 relative group">
            <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
               CIDR & MASKING 🛡️
            </h2>
            <p className="text-gray-400 leading-relaxed text-sm">
               **CIDR** (angka di belakang garis miring kayak `/24`) itu instruksi buat si pisau: seberapa kecil potongannya?
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
               <div className="p-3 bg-black/40 border border-gray-800 rounded-xl">
                  <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1">Kegunaan:</span>
                  <span className="text-xs text-emerald-400 font-black italic">Biar malware nggak gampang 'nyebar' antar divisi.</span>
               </div>
               <div className="p-3 bg-black/40 border border-gray-800 rounded-xl">
                  <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1">Security:</span>
                  <span className="text-xs text-purple-400 font-black italic">Membatasi area broadcast data sensitif.</span>
               </div>
            </div>
          </section>
        </div>

        {/* Kolom Kanan: Simulasi */}
        <div className="bg-gray-900/50 border-2 border-emerald-500/30 rounded-3xl p-8 relative flex flex-col items-center justify-center min-h-[450px] overflow-hidden shadow-[inset_0_0_50px_rgba(16,185,129,0.05)]">
           <div className="w-full max-w-md">
              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-2 mb-8 uppercase font-black tracking-tighter">
                 <div className="bg-gray-900 p-3 rounded-xl border border-gray-800 text-center">
                    <span className="text-[8px] text-gray-600 block mb-1">Subnets</span>
                    <span className="text-xl text-emerald-500">{info.subnets}</span>
                 </div>
                 <div className="bg-gray-900 p-3 rounded-xl border border-gray-800 text-center">
                    <span className="text-[8px] text-gray-600 block mb-1">Hosts/Sub</span>
                    <span className="text-xl text-white">{info.hosts}</span>
                 </div>
                 <div className="bg-gray-900 p-3 rounded-xl border border-gray-800 text-center">
                    <span className="text-[8px] text-gray-600 block mb-1">CIDR_MASK</span>
                    <span className="text-[10px] text-cyan-500 mt-2 block">{info.mask}</span>
                 </div>
              </div>

              {/* Network Visualizer */}
              <div className="bg-black/60 aspect-video rounded-3xl border border-gray-800 p-4 relative overflow-hidden group">
                 {/* Grid Overlay */}
                 <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity bg-[length:20px_20px] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)]"></div>
                 
                 <div className={`w-full h-full grid gap-2 p-2 transition-all duration-700 ${cidr === 24 ? 'grid-cols-1' : cidr === 26 ? 'grid-cols-2' : 'grid-cols-4'}`}>
                    {[...Array(info.subnets)].map((_, i) => (
                       <motion.div 
                         key={i}
                         initial={{ scale: 0.8, opacity: 0 }}
                         animate={{ scale: 1, opacity: 1 }}
                         transition={{ delay: i * 0.02 }}
                         className={`border-2 rounded-xl flex flex-col items-center justify-center relative group/box ${
                            cidr === 24 ? 'border-cyan-500 bg-cyan-500/10' : 
                            cidr === 26 ? 'border-emerald-500 bg-emerald-500/5' : 
                            'border-purple-500 bg-purple-500/5'
                         }`}
                       >
                          <Grid className={`w-4 h-4 opacity-20 ${cidr === 28 ? 'scale-75' : ''}`} />
                          <span className="text-[6px] font-black pointer-events-none opacity-40 mt-1 uppercase">Subnet_{i+1}</span>
                       </motion.div>
                    ))}
                 </div>
              </div>

              {/* Slider Control */}
              <div className="mt-12 bg-gray-900/80 p-6 rounded-2xl border border-gray-800">
                 <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Adjust_Network_Slice:</span>
                    <span className="text-lg font-black text-emerald-500 italic">/{cidr}</span>
                 </div>
                 <div className="relative h-2 bg-gray-800 rounded-full mb-8 px-1">
                    <input 
                      type="range" 
                      min="24" 
                      max="28" 
                      step="2" 
                      value={cidr} 
                      onChange={(e) => setCidr(parseInt(e.target.value))}
                      className="absolute inset-0 w-full h-full appearance-none bg-transparent cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:bg-emerald-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                    />
                    {/* Tick Marks */}
                    <div className="absolute inset-0 flex justify-between pointer-events-none px-1">
                       {[24, 26, 28].map(tick => (
                          <div key={tick} className={`w-1 h-3 -translate-y-0.5 ${cidr === tick ? 'bg-white' : 'bg-gray-700'}`}></div>
                       ))}
                    </div>
                 </div>
                 <div className="flex justify-between text-[8px] font-black text-gray-600 uppercase tracking-widest">
                    <span>Large (/24)</span>
                    <span>Medium (/26)</span>
                    <span>Granular (/28)</span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="mt-12 flex justify-between items-center bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-2xl relative overflow-hidden group text-emerald-400">
        <div className="absolute inset-y-0 left-0 w-1 bg-emerald-500"></div>
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black group-hover:text-emerald-500/50 transition-colors">Sekarang di:</span>
          <span className="text-white font-black italic tracking-tighter uppercase">03. SUBNET_SLICING_LAB</span>
        </div>
        
        <div className="flex gap-4">
          <Link 
            to="/academy/stage-3/modul-4/dhcp-pool"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-400 text-xs font-black rounded-lg transition-all uppercase tracking-widest border border-gray-700 flex items-center gap-2"
          >
            « Kembali
          </Link>
          <Link 
            to="/academy/stage-3/modul-4/kesimpulan"
            className="px-8 py-3 bg-emerald-500 hover:bg-white hover:text-black text-black text-xs font-black rounded-lg transition-all uppercase tracking-widest flex items-center gap-3 group/btn"
          >
            Lanjut: Kesimpulan <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubnettingLab;
