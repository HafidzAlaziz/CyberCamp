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
  Terminal
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
    <div className="relative min-h-screen bg-cyber-dark text-white font-mono overflow-hidden">
      {/* Performance optimized CSS-only Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,#00ffff15,transparent)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex flex-col min-h-screen">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-cyber-cyan animate-pulse"></div>
            <div className="text-xs tracking-widest uppercase">
              <span className="text-gray-500">CTF ARENA //</span> 
              <span className="text-cyber-cyan ml-1">SELECT MODE</span>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-xs uppercase tracking-tighter hover:text-cyber-cyan transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>KEMBALI</span>
          </button>
        </header>

        <motion.main 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex-1 flex flex-col justify-center items-center"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold mb-16 tracking-tighter text-center"
          >
            PILIH <span className="text-cyber-cyan text-glow-cyan">MODE</span> PERMAINAN
          </motion.h1>

          <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
            {/* Mode Acak */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(236,72,153,0.2)' }}
              className="relative group p-8 rounded-xl border-2 border-pink-500/50 bg-cyber-gray/80 backdrop-blur-sm shadow-[0_0_15px_rgba(236,72,153,0.1)] transition-all flex flex-col items-center text-center cursor-pointer"
              onClick={() => navigate('/ctf-arena/mode-acak')}
            >
              <div className="mb-6 p-4 rounded-full bg-pink-500/10 text-pink-500 group-hover:scale-110 transition-transform duration-300">
                <Dices className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-pink-500 tracking-tight">MODE ACAK</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">
                Sistem akan memilihkan tantangan CTF secara acak sesuai levelmu.
              </p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/ctf-arena/mode-acak');
                }}
                className="w-full py-3 bg-pink-600 text-white font-bold uppercase tracking-widest text-xs hover:bg-pink-500 transition-colors rounded-sm"
              >
                MULAI GACHA
              </button>
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-pink-500/50 rounded-tr-xl group-hover:w-12 group-hover:h-12 transition-all"></div>
            </motion.div>

            {/* Mode Pilihan */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,255,255,0.2)' }}
              className="relative group p-8 rounded-xl border-2 border-cyber-cyan/50 bg-cyber-gray/80 backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,255,0.1)] transition-all flex flex-col items-center text-center cursor-pointer"
              onClick={() => navigate('/ctf-arena/mode-pilihan')}
            >
              <div className="mb-6 p-4 rounded-full bg-cyber-cyan/10 text-cyber-cyan group-hover:scale-110 transition-transform duration-300">
                <Target className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-cyber-cyan tracking-tight">MODE PILIHAN</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">
                Pilih sendiri kategori peretasan yang ingin kamu kuasai hari ini.
              </p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/ctf-arena/mode-pilihan');
                }}
                className="w-full py-3 bg-cyber-cyan text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors rounded-sm"
              >
                PILIH KATEGORI
              </button>
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyber-cyan/50 rounded-tr-xl group-hover:w-12 group-hover:h-12 transition-all"></div>
            </motion.div>
          </div>
        </motion.main>

        {/* Footer Status */}
        <footer className="mt-12 flex justify-between items-center text-[10px] text-gray-500 border-t border-white/5 pt-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-3 h-3 text-cyber-cyan" />
            <span className="animate-pulse tracking-widest uppercase">System Operational // Level 3 Security</span>
          </div>
          <div className="tracking-tighter uppercase italic">
            CyberCamp Arena v1.0.4-beta
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CtfArenaHome;

