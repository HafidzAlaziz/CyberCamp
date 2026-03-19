import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, ChevronLeft, Home, Terminal, Zap, ShieldCheck, Activity, Wifi } from 'lucide-react';

const KesimpulanCli = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-4xl mx-auto relative">
        {/* Standardized Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-cyan-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/50">
            <Terminal className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 2: Operating Systems</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              MODUL 3: GUI VS CLI
            </h2>
          </div>
        </motion.div>

        <div className="text-center relative">
        {/* Extreme Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/5 blur-[120px] pointer-events-none"></div>

        {/* Main Terminal Badge Visual */}
        <div className="flex justify-center mb-12 relative">
           <motion.div 
             initial={{ scale: 0, rotate: -30 }}
             animate={{ scale: 1, rotate: 0 }}
             transition={{ type: 'spring', stiffness: 150, damping: 20 }}
             className="relative z-10 p-16 rounded-3xl border border-cyan-500/30 bg-gray-900/50 shadow-[0_0_100px_rgba(6,182,212,0.2)] group"
           >
              <Terminal className="w-32 h-32 text-cyan-500 drop-shadow-[0_0_20px_rgba(6,182,212,0.6)] group-hover:scale-110 transition-transform duration-500" />
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }} 
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-cyan-500 rounded-3xl"
              />
           </motion.div>
           
           {/* Supporting Icons */}
           <motion.div 
             initial={{ x: -100, opacity: 0 }}
             animate={{ x: -110, y: 40, opacity: 1 }}
             className="absolute"
           >
              <Wifi className="w-10 h-10 text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
           </motion.div>
           <motion.div 
             initial={{ x: 100, opacity: 0 }}
             animate={{ x: 110, y: -40, opacity: 1 }}
             className="absolute"
           >
              <Activity className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
           </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-block px-4 py-1.5 bg-cyan-500 text-black text-[10px] font-black uppercase tracking-[0.3em] mb-8">
             Stage 2 Phase_03: COMPLETED
          </div>

          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase italic">
            CLI BASICS: <span className="text-cyan-500 text-glow">TERMINAL UNLOCKED</span> 🔓
          </h1>
          
          <p className="text-gray-400 text-sm md:text-lg mb-12 max-w-2xl mx-auto tracking-widest font-bold uppercase leading-relaxed">
             Sekarang lo udah gak takut lagi liat layar hitam. <span className="text-white">Ping</span> buat ngetok pintu, <span className="text-white">ipconfig</span> buat cek KTP digital. 
             Lo udah selangkah lebih deket buat jadi koki di dapur sistem operasi!
          </p>
          
          <div className="p-10 bg-black/60 border border-gray-800 rounded-3xl mb-16 relative group max-w-2xl mx-auto shadow-inner">
             <div className="text-[10px] text-gray-600 uppercase font-black tracking-widest border-b border-gray-900 pb-4 mb-6 text-left flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-500" /> CLI_REPORT: [MISSION_ACCOMPLISHED]
             </div>
             <p className="text-gray-300 italic text-lg leading-relaxed">
                "Keren! Lo udah berhasil naklukin rasa takut sama layar hitam. Skill terminal itu aset paling berharga buat hacker. Jangan pernah berhenti ngetik!"
             </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            <Link 
              to="/academy/stage-2/modul-3/perintah-ipconfig"
              className="flex items-center gap-2 text-[10px] font-black text-gray-700 hover:text-white transition-all uppercase tracking-widest group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" /> RE-ENTER IPCONFIG
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
        .text-glow {
          text-shadow: 0 0 10px rgba(6, 182, 212, 0.5), 0 0 30px rgba(6, 182, 212, 0.3);
        }
      `}</style>
    </div>
  );
};

export default KesimpulanCli;
