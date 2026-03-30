import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  Dices, 
  Target, 
  Globe, 
  Key, 
  Search, 
  Settings, 
  Link as LinkIcon,
  Terminal,
  Server,
  Skull,
  Play
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const CtfArenaHome = () => {
  const navigate = useNavigate();

  // Animation Variants
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

  return (
    <div className="relative min-h-screen bg-[#020617] text-white font-mono overflow-hidden flex flex-col selection:bg-cyan-500/30">
      
      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex flex-col min-h-screen w-full">
        
        {/* HEADER (Standardized with Mode Acak style) */}
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/')}
              className="p-2 hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/10 group"
            >
              <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-cyan-400" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_#06b6d4]" />
                <span className="text-[10px] uppercase font-black tracking-[0.4em] text-cyan-500/60">Arena Hub</span>
              </div>
              <h1 className="text-3xl font-black italic tracking-tighter uppercase text-white">
                Arena <span className="text-cyan-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">CTF</span>
              </h1>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2 text-[10px] font-black text-gray-500 tracking-[0.2em] uppercase">
            <span>SYSTEM_OPERATIONAL</span>
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
          </div>
        </header>

        <motion.main 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex-1 flex flex-col justify-center items-center py-10"
        >
          <div className="mb-12 flex flex-col items-center">
            <div className="text-[10px] font-black tracking-[0.6em] text-white/20 uppercase mb-4 italic">Tactical_Interface: Select_Mode</div>
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

          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-7xl font-black mb-20 tracking-tighter text-center italic uppercase leading-tight"
          >
            PILIH <span className="text-cyan-500 drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]">MODE</span> PERMAINAN
          </motion.h1>

          <div className="grid md:grid-cols-2 gap-10 w-full max-w-5xl px-4">
            {/* Mode Acak Card */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -12, scale: 1.02 }}
              onClick={() => navigate('/ctf-arena/mode-acak')}
              className="relative group p-12 rounded-3xl border-2 border-pink-500/20 bg-gray-950/60 backdrop-blur-3xl transition-all cursor-pointer overflow-hidden flex flex-col items-center text-center ring-1 ring-white/5 hover:ring-pink-500/60 hover:shadow-[0_0_60px_-15px_rgba(236,72,153,0.4)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 via-transparent to-pink-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              
              <div className="mb-10 p-8 rounded-2xl bg-pink-500/10 text-pink-500 group-hover:scale-110 group-hover:bg-pink-500/20 transition-all duration-500 shadow-[0_0_40px_rgba(236,72,153,0.1)] group-hover:shadow-[0_0_50px_rgba(236,72,153,0.5)] border border-pink-500/30">
                <Dices className="w-16 h-16 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
              </div>
              
              <h2 className="text-4xl font-black mb-4 text-pink-500 tracking-tighter italic uppercase drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]">MODE ACAK</h2>
              <p className="text-gray-400 text-sm font-bold leading-relaxed mb-12 flex-1 max-w-[320px] uppercase">
                Sistem akan memilihkan tantangan <span className="text-white">CTF secara acak</span> sesuai dengan level peretasanmu.
              </p>
              
              <button 
                className="w-full py-5 bg-pink-600/90 text-white font-black uppercase tracking-tighter italic text-sm hover:bg-white hover:text-black transition-all rounded-xl shadow-[0_0_30px_rgba(236,72,153,0.4)] flex items-center justify-center gap-3"
              >
                <span>INISIASI GACHA</span>
                <Play className="w-5 h-5 fill-current" />
              </button>
            </motion.div>

            {/* Mode Pilihan Card */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -12, scale: 1.02 }}
              onClick={() => navigate('/ctf-arena/mode-pilihan')}
              className="relative group p-12 rounded-3xl border-2 border-cyan-500/20 bg-gray-950/60 backdrop-blur-3xl transition-all cursor-pointer overflow-hidden flex flex-col items-center text-center ring-1 ring-white/5 hover:ring-cyan-500/60 hover:shadow-[0_0_60px_-15px_rgba(6,182,212,0.4)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-cyan-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              
              <div className="mb-10 p-8 rounded-2xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-500 shadow-[0_0_40px_rgba(6,182,212,0.1)] group-hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] border border-cyan-500/30">
                <Target className="w-16 h-16 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
              </div>
              
              <h2 className="text-4xl font-black mb-4 text-cyan-400 tracking-tighter italic uppercase drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">MODE PILIHAN</h2>
              <p className="text-gray-400 text-sm font-bold leading-relaxed mb-12 flex-1 max-w-[320px] uppercase">
                Pilih sendiri <span className="text-white">kategori peretasan spesifik</span> yang ingin kamu kuasai hari ini.
              </p>
              
              <button 
                className="w-full py-5 bg-cyan-500/90 text-black font-black uppercase tracking-tighter italic text-sm hover:bg-white transition-all rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center justify-center gap-3"
              >
                <span>AKSES KATEGORI</span>
                <Play className="w-5 h-5 fill-current" />
              </button>
            </motion.div>
          </div>
        </motion.main>

        {/* Footer Status */}
        <footer className="mt-12 flex justify-between items-center text-[10px] text-gray-500/40 font-bold border-t border-white/5 pt-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-3" />
              <span className="tracking-[0.2em] uppercase italic">Kernel_Node: ONLINE</span>
            </div>
            <div className="hidden sm:block text-gray-700 tracking-tighter italic">-- CYBERCAMP ARENA v1.0.4-TACTICAL --</div>
          </div>
          <div className="flex items-center gap-2">
             <span className="text-cyan-500/40">SEC_LEVEL_3</span>
             <div className="w-1.5 h-1.5 bg-cyan-500/20 rounded-full" />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CtfArenaHome;

