import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  Globe,
  Key,
  Search,
  Settings,
  Link as LinkIcon,
  Terminal,
  Play
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 'web',
    title: 'Web Exploit',
    icon: <Globe className="w-5 h-5" />,
    desc: 'Cari celah XSS, SQLi, dan bypass otentikasi pada aplikasi web.',
    colorClass: 'text-cyan-400',
    borderColor: 'border-cyan-500/50',
    shadowColor: 'shadow-cyan-500/10',
    path: '/ctf-arena/web-exploit'
  },
  {
    id: 'crypto',
    title: 'Cryptography',
    icon: <Key className="w-5 h-5" />,
    desc: 'Pecahkan kode rahasia, enkripsi klasik, dan modern cipher.',
    colorClass: 'text-yellow-400',
    borderColor: 'border-yellow-500/50',
    shadowColor: 'shadow-yellow-500/10',
    path: '#'
  },
  {
    id: 'forensics',
    title: 'Digital Forensics',
    icon: <Search className="w-5 h-5" />,
    desc: 'Analisis steganografi, file network capture, dan metadata.',
    colorClass: 'text-orange-400',
    borderColor: 'border-orange-500/50',
    shadowColor: 'shadow-orange-500/10',
    path: '#'
  },
  {
    id: 'reveng',
    title: 'Reverse Engineering',
    icon: <Settings className="w-5 h-5" />,
    desc: 'Bongkar malware dan pahami struktur assembly x86.',
    colorClass: 'text-purple-400',
    borderColor: 'border-purple-500/50',
    shadowColor: 'shadow-purple-500/10',
    path: '#'
  },
  {
    id: 'blockchain',
    title: 'Blockchain Hack',
    icon: <LinkIcon className="w-5 h-5" />,
    desc: 'Eksploitasi smart contract dan kerentanan Web3.',
    colorClass: 'text-teal-400',
    borderColor: 'border-teal-500/50',
    shadowColor: 'shadow-teal-500/10',
    path: '#'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  },
  exit: { y: -20, opacity: 0 }
};

const IndexModePilihan = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#020617] text-white font-mono overflow-hidden flex flex-col selection:bg-cyan-500/30">
      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex flex-col min-h-screen w-full">
        {/* HEADER (Standardized) */}
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/ctf-arena')}
              className="p-2 hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/10 group"
            >
              <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-cyan-400" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_#06b6d4]" />
                <span className="text-[10px] uppercase font-black tracking-[0.4em] text-cyan-500/60">Mission Hub</span>
              </div>
              <h1 className="text-3xl font-black italic tracking-tighter uppercase text-white">
                Arena <span className="text-cyan-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">Kategori</span>
              </h1>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2 text-[10px] font-black text-gray-600 tracking-[0.2em] uppercase">
            <span>TACTICAL_OVERLAY_V2.0</span>
          </div>
        </header>

        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex-1 flex flex-col"
        >
          <div className="mb-12 flex flex-col items-center">
            <div className="text-[10px] font-black tracking-[0.6em] text-white/20 uppercase mb-4 italic">Tactical_Grid: Category_Matrix</div>
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: 400 }}
               className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent relative"
            >
               <motion.div 
                  animate={{ left: ['0%', '100%', '0%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 -translate-y-1/2 w-8 h-[2px] bg-cyan-400 blur-[2px]" 
               />
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-[10px] items-center gap-2 mb-4 font-black tracking-[0.6em] text-white/20 uppercase italic flex justify-center">Tactical_Grid: Mission_Categorization</h2>
            <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase leading-tight">
              PILIH <span className="text-green-500 drop-shadow-[0_0_20px_rgba(34,197,94,0.4)]">KATEGORI</span> PERETASAN
            </h1>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto w-full px-4">
            {categories.map((cat) => (
              <motion.div
                key={cat.id}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.01 }}
                onClick={() => cat.path !== '#' && navigate(cat.path)}
                className={`relative p-8 rounded-2xl border-2 bg-[#0A0F1D]/80 backdrop-blur-3xl transition-all cursor-pointer overflow-hidden group shadow-2xl ${cat.borderColor} ${cat.shadowColor} hover:border-white/20`}
              >
                {/* Header Card: Icon & Title */}
                <div className="flex items-center gap-5 mb-8">
                  <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${cat.colorClass} shadow-inner`}>
                    {cat.icon}
                  </div>
                  <div className="flex flex-col">
                    <h3 className={`text-xl md:text-2xl font-black italic tracking-tighter uppercase leading-none ${cat.colorClass}`}>
                      {cat.title}
                    </h3>
                    <div className={`h-1 w-12 mt-2 ${cat.colorClass} bg-current opacity-30`} />
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-[11px] font-bold leading-relaxed mb-12 h-14 overflow-hidden uppercase tracking-[0.15em] italic">
                  {cat.desc}
                </p>

                {/* Separator Line */}
                <div className="h-px w-full bg-white/5 mb-6" />

                {/* Footer Row */}
                <div className="flex justify-between items-end">
                  <div className="flex flex-col gap-1.5">
                     <span className="text-[8px] uppercase font-black tracking-[0.2em] text-white/20 italic leading-none whitespace-nowrap">Status Protokol</span>
                     <span className="text-[10px] font-black text-white/50 uppercase italic tracking-tighter leading-none whitespace-nowrap">IDENTIFIKASI TERSEDIA</span>
                  </div>
                  
                  {cat.path !== '#' ? (
                    <div className="flex items-center gap-3 text-[10px] font-black italic tracking-widest uppercase text-white group-hover:text-cyan-400 transition-colors">
                      <span>MASUK</span>
                      <ChevronLeft className="w-4 h-4 rotate-180" />
                    </div>
                  ) : (
                    <div className="px-5 py-2.5 bg-white/5 rounded-xl border border-white/10">
                       <span className="text-[8px] font-black italic text-white/10 uppercase tracking-[0.3em] whitespace-nowrap">Segera Datang</span>
                    </div>
                  )}
                </div>

                {/* Subtle Scanline Effect on Hover */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-5 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.05)_2px,rgba(255,255,255,0.05)_4px)] transition-opacity"></div>
              </motion.div>
            ))}
          </div>
        </motion.main>

        {/* Footer Status */}
        <footer className="mt-16 flex justify-between items-center text-[10px] text-gray-500/40 font-bold border-t border-white/5 pt-8">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Terminal className="w-3 h-3 text-cyan-400" />
              <span className="tracking-[0.2em] uppercase italic">System_Grid: OPERATIONAL</span>
            </div>
            <div className="hidden sm:block text-gray-700 tracking-tighter italic">-- CYBERCAMP CATEGORY_MATRIX v1.0.4 --</div>
          </div>
          <div className="tracking-tighter uppercase italic flex items-center gap-2">
             <div className="w-1.5 h-1.5 bg-cyan-500/20 rounded-full animate-ping" />
             <span>SEC_NODE_V3</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default IndexModePilihan;
