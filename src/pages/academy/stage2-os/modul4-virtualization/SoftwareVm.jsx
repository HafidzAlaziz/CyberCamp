import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Zap, Shield, Cpu, ExternalLink, Info, Boxes } from 'lucide-react';

const SoftwareVm = () => {
  const [selectedVm, setSelectedVm] = useState(null);

  const vmData = {
    virtualbox: {
      name: "Oracle VirtualBox",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/50",
      glowColor: "shadow-[0_0_20px_rgba(59,130,246,0.2)]",
      desc: "Si Merakyat! Gratis tiss tiss (Open Source). Cocok banget buat pemula yang baru mau belajar bikin lab hacking pertama kali. Gak rewel dan gampang di-setup!",
      pros: ["100% Gratis & Open Source", "Ringan di RAM", "Support banyak OS"],
      cons: ["Kadang kurang smooth", "Fitur networking agak ribet"]
    },
    vmware: {
      name: "VMware Workstation",
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/50",
      glowColor: "shadow-[0_0_20px_rgba(249,115,22,0.2)]",
      desc: "Si Professional! Performanya paling kenceng (Best Performance). Biasanya dipake di level perusahaan atau buat ngebedah malware kelas berat. Ada versi gratisnya (Player) juga!",
      pros: ["Performa grafis mantap", "Networking sangat stabil", "Sangat smooth"],
      cons: ["Berbayar (Pro version)", "Makan storage lebih banyak"]
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Standardized Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-purple-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/50 text-purple-400">
            <Cpu className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-sm text-purple-400 tracking-[0.3em] uppercase font-black">Stage 2: Operating Systems</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              MODUL 4: Virtualization
            </h2>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-purple-500 mb-6 italic tracking-tight uppercase">
              Mana Yang Lebih Jago? 🥊
            </h3>
            <div className="space-y-4 text-base leading-relaxed text-gray-400">
              <p>
                Aplikasi buat bikin Virtual Machine itu namanya <span className="text-white font-bold italic underline">Hypervisor</span>. Di dunia per-hacking-an, ada dua jagoan utama yang sering dibanding-bandingin.
              </p>
              <p>
                Keduanya punya fungsi sama: bikin "Rumah Kaca" buat OS tamu. Bedanya cuma di fitur dan <span className="text-white">Price Tag</span>-nya.
              </p>
              <div className="p-4 bg-purple-950/20 border-l-4 border-purple-600 rounded text-xs leading-relaxed italic">
                 <span className="text-purple-500 font-black uppercase text-[10px] b-1 tracking-widest leading-none flex items-center gap-2 mb-2">
                   <Zap className="w-4 h-4" /> Saran Gue:
                 </span>
                 Buat lo yang baru mulai dan laptopnya spesifikasi standard, hajar <span className="text-white font-bold">VirtualBox</span> dulu. Tapi kalau lo mau yang lebih stabil dan *smooth* buat kerja profesional, <span className="text-white font-bold">VMware</span> juaranya.
              </div>
            </div>
          </motion.div>

          {/* Practical Simulation: Selection UI */}
          <div className="space-y-8">
             <div className="grid grid-cols-2 gap-6">
                {/* VirtualBox Card */}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedVm('virtualbox')}
                  className={`cursor-pointer p-6 rounded-sm border transition-all flex flex-col items-center gap-4 text-center ${selectedVm === 'virtualbox' ? 'bg-blue-500/20 border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.3)]' : 'bg-gray-900/50 border-white/5 grayscale opacity-50 hover:grayscale-0 hover:opacity-100'}`}
                >
                   <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-400/50">
                      <Boxes className="w-8 h-8 text-blue-400" />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-white">VirtualBox</span>
                </motion.div>

                {/* VMware Card */}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedVm('vmware')}
                  className={`cursor-pointer p-6 rounded-sm border transition-all flex flex-col items-center gap-4 text-center ${selectedVm === 'vmware' ? 'bg-orange-500/20 border-orange-400 shadow-[0_0_30px_rgba(249,115,22,0.3)]' : 'bg-gray-900/50 border-white/5 grayscale opacity-50 hover:grayscale-0 hover:opacity-100'}`}
                >
                   <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center border border-orange-400/50">
                      <Zap className="w-8 h-8 text-orange-400" />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-white">VMware</span>
                </motion.div>
             </div>

             {/* Description Card */}
             <div className="min-h-[220px]">
                <AnimatePresence mode="wait">
                  {selectedVm ? (
                    <motion.div 
                      key={selectedVm}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      className={`p-6 border rounded-sm ${vmData[selectedVm].bgColor} ${vmData[selectedVm].borderColor} ${vmData[selectedVm].glowColor}`}
                    >
                       <h4 className={`text-sm font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2 ${vmData[selectedVm].color}`}>
                          <Shield className="w-4 h-4" /> {vmData[selectedVm].name}
                       </h4>
                       <p className="text-xs italic text-gray-300 leading-relaxed mb-6">
                          "{vmData[selectedVm].desc}"
                       </p>
                       <div className="grid grid-cols-2 gap-4">
                          <div>
                             <span className="text-[8px] font-black tracking-widest uppercase text-emerald-500 mb-2 block">Kelebihan:</span>
                             <ul className="text-[9px] space-y-1">
                                {vmData[selectedVm].pros.map((p, i) => <li key={i}>+ {p}</li>)}
                             </ul>
                          </div>
                          <div>
                             <span className="text-[8px] font-black tracking-widest uppercase text-red-500 mb-2 block">Kekurangan:</span>
                             <ul className="text-[9px] space-y-1">
                                {vmData[selectedVm].cons.map((c, i) => <li key={i}>- {c}</li>)}
                             </ul>
                          </div>
                       </div>
                    </motion.div>
                  ) : (
                    <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-800 rounded-sm p-8 text-center bg-black/20">
                       <span className="text-[10px] text-gray-700 italic font-black uppercase tracking-[0.3em]">-- Pilih software untuk membandingkan --</span>
                    </div>
                  )}
                </AnimatePresence>
             </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="p-6 bg-purple-950/10 border border-purple-500/20 rounded-xl mb-16 flex items-start gap-4 backdrop-blur-sm">
           <Info className="w-6 h-6 text-purple-500 shrink-0 mt-1" />
           <p className="text-sm text-purple-100 italic leading-relaxed">
             "Banyak hacker pake <span className="text-white font-bold">Kali Linux</span> di dalam <span className="text-white font-bold">VirtualBox</span> sebagai simulasi lab pertama mereka. Kenapa? Karena gratis & gampang di-copy filenya!"
           </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
          <Link 
            to="/academy/stage-2/modul-4/intro"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            « SEBELUMNYA
          </Link>
          
          <Link 
            to="/academy/stage-2/modul-4/snapshot"
            className="flex items-center gap-3 bg-purple-500/10 border border-purple-500/50 text-purple-400 px-8 py-3 rounded-sm font-black transition-all group overflow-hidden relative shadow-[0_0_30px_rgba(168,85,247,0.1)] hover:bg-purple-500 hover:text-black"
          >
            <div className="absolute inset-0 bg-purple-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
            <span className="relative z-10 flex items-center gap-2 uppercase tracking-[0.2em] text-[10px]">
              LANJUT: KEAJAIBAN SNAPSHOT <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SoftwareVm;
