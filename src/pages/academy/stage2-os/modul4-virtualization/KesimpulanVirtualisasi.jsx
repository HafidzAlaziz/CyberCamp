import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, ChevronLeft, Home, ShieldCheck, Zap, Star, Trophy, Sparkles } from 'lucide-react';

const KesimpulanVirtualisasi = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-4xl mx-auto relative">
        {/* Standardized Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-purple-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/50">
            <Trophy className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <h1 className="text-sm text-purple-400 tracking-[0.3em] uppercase font-black">Stage 2: Operating Systems</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              MODUL 4: VIRTUALIZATION
            </h2>
          </div>
        </motion.div>

        <div className="text-center relative">
        {/* Extreme Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] pointer-events-none"></div>

        {/* Floating Particles/Icons */}
        <motion.div animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-0 right-0">
           <Sparkles className="w-12 h-12 text-yellow-500/40" />
        </motion.div>
        <motion.div animate={{ y: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} className="absolute bottom-0 left-0">
           <Star className="w-10 h-10 text-purple-500/40" />
        </motion.div>

        {/* Main Badge Visual */}
        <div className="flex justify-center mb-12 relative scale-75 md:scale-100">
           <motion.div 
             initial={{ scale: 0, rotate: -45 }}
             animate={{ scale: 1, rotate: 0 }}
             transition={{ type: 'spring', stiffness: 200, damping: 15 }}
             className="relative z-10 p-20 rounded-[4rem] border-2 border-purple-500/50 bg-gray-900/40 backdrop-blur-2xl shadow-[0_0_100px_rgba(168,85,247,0.3)] group"
           >
              <Trophy className="w-32 h-32 text-purple-400 drop-shadow-[0_0_25px_rgba(168,85,247,0.8)] group-hover:scale-110 transition-transform duration-700" />
              
              {/* Spinning Ring */}
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-[3px] border-dashed border-purple-500/20 rounded-[4.5rem]"
              />
              
              {/* Outer Glow Circles */}
              <div className="absolute -inset-4 bg-purple-500/5 rounded-[5rem] animate-pulse"></div>
           </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="inline-block px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-[10px] font-black uppercase tracking-[0.4em] mb-8 rounded shadow-lg shadow-purple-500/20">
             STAGE 2: MISSION ACCOMPLISHED
          </div>

          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase italic">
            OS & VIRTUALIZATION <br/>
            <span className="text-purple-500 text-glow-purple">MASTERED</span> 🛡️
          </h1>
          
          <p className="text-gray-400 text-sm md:text-lg mb-12 max-w-2xl mx-auto tracking-widest font-black uppercase leading-relaxed">
             Selamat, Bos! Lo udah resmi lulus dari <span className="text-white underline decoration-purple-500">Tahap 2</span>. <br/>
             Windows, Linux, CLI, sampai Virtual Machine udah lo sikat semua. Lo udah punya pondasi baja buat jadi Professional Hacker!
          </p>
          
          <div className="p-10 bg-black/60 border-y border-gray-800 rounded-3xl mb-16 relative group max-w-3xl mx-auto overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
             <div className="text-[10px] text-gray-600 uppercase font-black tracking-widest mb-6 text-center flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-500" /> FINAL_LOG: [GRADUATION_READY]
             </div>
             <p className="text-gray-300 italic text-xl leading-relaxed font-bold">
                "Keren banget progres lo. Tahap 2 ini yang paling berat buat pemula, tapi lo berhasil nembus batas. Sekarang saatnya lo naik level ke dunia Jaringan (Networking) yang lebih hardcore!"
             </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            <Link 
              to="/academy/stage-2/modul-4/snapshot"
              className="flex items-center gap-2 text-[10px] font-black text-gray-700 hover:text-white transition-all uppercase tracking-widest group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" /> RE-ENTER SNAPSHOT LAB
            </Link>
            
            <Link 
              to="/academy"
              state={{ expandedId: 'operating-systems' }}
              className="w-full md:w-auto bg-cyan-500 hover:bg-white text-black px-12 py-5 text-sm font-black transition-all group rounded-sm shadow-[0_0_40px_rgba(34,211,238,0.3)] flex items-center justify-center gap-3 overflow-hidden relative skew-x-[-12deg]"
            >
              <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
              <span className="relative z-10 skew-x-[12deg] flex items-center gap-2 uppercase tracking-tighter">
                FINISH MODULE & RETURN TO HQ <Home className="w-6 h-6" />
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>

      <style jsx>{`
        .text-glow-purple {
          text-shadow: 0 0 10px rgba(168, 85, 247, 0.5), 0 0 30px rgba(168, 85, 247, 0.3);
        }
      `}</style>
    </div>
  );
};

export default KesimpulanVirtualisasi;
