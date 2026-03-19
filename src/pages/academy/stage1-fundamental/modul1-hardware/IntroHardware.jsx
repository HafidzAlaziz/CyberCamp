import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, ChevronRight, ChevronLeft, Cpu } from 'lucide-react';

const IntroHardware = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8 border-b border-cyan-950 pb-6"
        >
          <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/50">
            <Shield className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-500 tracking-[0.3em] uppercase">Stage 1: Fundamentals</h1>
            <h2 className="text-3xl font-bold text-white tracking-tighter">MODUL 1: COMPUTER HARDWARE</h2>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-cyan-400 mb-6 italic">Yo, Welcome to the Matrix! ⚡</h3>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                Selamat datang di langkah pertama lo jadi <span className="text-white font-bold">Cyber Ninja</span>. 
                Mungkin lo mikir, "Ngapain sih gue belajar ginian? Gue kan mau nge-hack, bukan jadi tukang servis komputer!"
              </p>
              <p className="bg-cyan-500/5 border-l-2 border-cyan-500 p-4 italic">
                Sini gue kasih tau rahasianya: <span className="text-cyan-300 font-bold">Hardware itu pondasi segala serangan.</span>
              </p>
              <p>
                Analogi gampangnya gini: Kalau lo nggak tau bentuk rumahnya luar-dalem, jalur kabelnya di mana, atau ventilasinya di sebelah mana, 
                gimana lo mau nyusup ke dalamnya tanpa ketauah? <span className="text-white">Exactly!</span>
              </p>
              <p>
                Di modul ini, kita bakal bongkar "jeroan" komputer biar lo paham gimana data ngalir dan gimana kita bisa "interupsi" aliran itu.
              </p>
            </div>
          </motion.div>

          {/* Visual: Denah Sirkuit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-square bg-gray-900 rounded-3xl border-2 border-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.1)] p-8 flex items-center justify-center relative overflow-hidden">
              {/* Circuit Lines Decorative */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/2 left-0 w-full h-px bg-cyan-500"></div>
                <div className="absolute left-1/2 top-0 w-px h-full bg-cyan-500"></div>
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-cyan-500 rounded-full animate-ping"></div>
              </div>

              {/* Central Core Visual */}
              <div className="relative z-10 w-full h-full border-2 border-cyan-500 rounded-2xl p-4 flex flex-col items-center justify-center gap-4 bg-black/40 backdrop-blur-sm">
                <div className="grid grid-cols-3 gap-2 w-full">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="h-4 bg-cyan-500/20 rounded-sm border border-cyan-500/30 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                  ))}
                </div>
                <Cpu className="w-20 h-20 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                <div className="text-[10px] text-cyan-500 tracking-[0.5em] animate-pulse">SYSTEM_INITIALIZED</div>
                <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                   <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]"
                   />
                </div>
              </div>
            </div>
            {/* Legend Tag */}
            <div className="absolute -bottom-4 -right-4 bg-cyan-500 text-black px-4 py-1 text-[10px] font-bold skew-x-[-12deg] shadow-lg">
              INTERNAL_CIRCUIT_V1.0
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex justify-end px-4"
        >
          <Link 
            to="/academy/stage-1/modul-1/cpu-ram"
            className="flex items-center gap-3 bg-cyan-500 hover:bg-white text-black px-8 py-4 rounded-sm font-bold transition-all group overflow-hidden relative"
          >
            <span className="relative z-10 uppercase">GAS LANJUT: CPU & RAM</span>
            <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default IntroHardware;
