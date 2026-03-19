import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, HardDrive, Layout, ShieldAlert, Cpu as CpuIcon, Database } from 'lucide-react';

const StorageDanMobo = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12 border-b border-purple-900/30 pb-6">
          <div className="flex items-center gap-4">
            <Layout className="w-8 h-8 text-purple-400" />
            <h1 className="text-xl font-bold text-white tracking-widest uppercase italic">Storage & Motherboard</h1>
          </div>
          <div className="text-[10px] text-gray-500 bg-gray-900 px-3 py-1 rounded-full border border-gray-800 uppercase">
             Sector_03_Logic
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Storage Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 bg-gray-900 border border-purple-500/20 rounded-3xl relative overflow-hidden h-full flex flex-col"
          >
             <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <HardDrive className="w-8 h-8 text-purple-400" />
                </div>
                <h2 className="text-2xl font-black text-white italic">HDD & SSD: Brankas Data</h2>
             </div>

             <div className="space-y-4 text-sm leading-relaxed flex-1">
               <p>
                 Kalau RAM itu ingatan jangka pendek, Storage (HDD/SSD) itu ingatan jangka panjang. Di sinilah semua file lo disimpen selamanya, biarpun komputernya lo matiin paksa.
               </p>
               <div className="bg-purple-950/20 p-4 border-l-4 border-purple-500 rounded-r-lg">
                 <h4 className="text-purple-400 font-bold mb-2 flex items-center gap-2 text-xs">
                   <ShieldAlert className="w-4 h-4" /> CATATAN OPERASI NYATA:
                 </h4>
                 <p className="italic text-purple-100/70 text-xs">
                   Hacker suka banget ngincer storage. Kenapa? Karena di sinilah <span className="text-white">Ransomware</span> bakal ngunci file-file berharga lo. Dan ini juga tempat favorit buat nyembunyiin <span className="text-white">Rootkit</span> atau <span className="text-white">Backdoor</span> biar tetep ada biarpun lo reboot komputer!
                 </p>
               </div>
             </div>

             {/* Visual: Storage Disk */}
             <div className="mt-8 flex justify-center">
                <div className="w-32 h-40 bg-gray-800 rounded-lg border-2 border-purple-500/30 relative shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                   <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-20 bg-black rounded-full border border-purple-500/20 flex items-center justify-center">
                      <div className="w-4 h-4 bg-gray-700 rounded-full border border-purple-500/50 animate-spin-slow"></div>
                      <div className="absolute top-1/2 right-2 w-8 h-0.5 bg-purple-500/40 origin-left"></div>
                   </div>
                   <div className="absolute bottom-4 left-4 right-4 h-8 bg-black/40 rounded border border-purple-500/10 flex flex-col justify-center px-2">
                       <div className="w-full h-1 bg-purple-500 animate-pulse"></div>
                   </div>
                </div>
             </div>
          </motion.div>

          {/* Motherboard Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="p-8 bg-gray-900 border border-emerald-500/20 rounded-3xl relative overflow-hidden h-full flex flex-col group"
          >
             <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-emerald-500/10 rounded-lg">
                  <Layout className="w-8 h-8 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-black text-white italic">Motherboard: Si Masterbone</h2>
             </div>

             <div className="space-y-4 text-sm leading-relaxed flex-1">
               <p>
                 Motherboard itu pondasi-nya. Papan sirkuit raksasa tempat CPU, RAM, dan Storage ngobrol satu sama lain. Tanpa Mobo, komponen lain cuma tumpukan besi gak berguna.
               </p>
               <p className="text-emerald-500/70 text-xs italic">
                 Hacker tingkat dewa biasanya ngincer "BIOS/UEFI" di Motherboard. Kalau ini udah kena, biarpun lo instal ulang Windows 100 kali, malware-nya bakal tetep ada!
               </p>
             </div>

             {/* Visual: Mobo Map */}
             <div className="mt-8 p-4 bg-black rounded-xl border border-emerald-500/40 relative">
                 <div className="text-[8px] text-emerald-500/50 mb-2 font-mono">MAPS_SYSTEM_CORE_V2</div>
                 <div className="grid grid-cols-4 grid-rows-4 gap-2 h-40">
                    {/* CPU Spot */}
                    <div className="col-span-2 row-span-2 border border-emerald-500 bg-emerald-500/10 rounded flex items-center justify-center relative">
                        <CpuIcon className="w-10 h-10 text-emerald-400 opacity-50" />
                        <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-black text-[6px] px-1 font-bold">CPU_SOCKET</span>
                    </div>
                    {/* RAM Slots */}
                    <div className="col-start-3 col-span-1 row-span-3 border border-emerald-500/20 bg-emerald-500/5 rounded flex flex-col gap-1 p-1">
                        {[...Array(4)].map((_, i) => <div key={i} className="h-full w-full bg-emerald-500/20 rounded-sm"></div>)}
                        <span className="text-[6px] text-emerald-500 rotate-90 origin-left translate-x-1 mt-4">RAM_DDR5</span>
                    </div>
                    {/* Connectivity/Chips */}
                    <div className="col-start-4 col-span-1 row-span-1 border border-emerald-500/30 rounded"></div>
                    <div className="col-start-4 col-span-1 row-start-2 row-span-2 border border-emerald-500/30 rounded flex items-center justify-center">
                        <div className="w-4 h-4 bg-emerald-500 rounded-sm animate-pulse"></div>
                    </div>
                    {/* Storage Connector Area */}
                    <div className="col-span-2 row-start-3 row-span-2 border border-indigo-500/40 bg-indigo-500/5 rounded p-2 flex items-center justify-center gap-2">
                        <Database className="w-4 h-4 text-indigo-400" />
                        <span className="text-[6px] text-indigo-400 font-bold uppercase">SATA / NVME Lane</span>
                    </div>
                 </div>
                 {/* Decorative Wiring */}
                 <div className="absolute -z-10 top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_50%_50%,#10b981_1px,transparent_1px)] bg-[size:10px_10px]"></div>
             </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-purple-500 shadow-2xl">
          <Link 
            to="/academy/stage-1/modul-1/cpu-ram"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            BALIK KE CPU & RAM
          </Link>
          
          <Link 
            to="/academy/stage-1/modul-1/kesimpulan"
            className="flex items-center gap-3 bg-purple-600 hover:bg-white text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
          >
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest leading-none">
              NAMATIN MODUL <ChevronRight className="w-4 h-4 font-bold" />
            </span>
          </Link>
        </div>
      </div>
      
      {/* Visual Glitch Decor */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#a855f7_2px,#a855f7_4px)] opacity-20"></div>
    </div>
  );
};

export default StorageDanMobo;
