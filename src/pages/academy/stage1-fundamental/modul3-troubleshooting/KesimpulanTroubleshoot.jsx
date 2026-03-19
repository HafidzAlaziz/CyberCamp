import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Home, ChevronLeft, Terminal, ShieldCheck, Zap } from 'lucide-react';

const KesimpulanTroubleshoot = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-4xl mx-auto relative">
        {/* Standardized Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-red-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/50">
            <CheckCircle className="w-8 h-8 text-red-500" />
          </div>
          <div>
            <h1 className="text-sm text-red-500 tracking-[0.3em] uppercase font-black">Stage 1: Fundamentals</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              MODUL 3: TROUBLESHOOTING
            </h2>
          </div>
        </motion.div>

        <div className="text-center relative">
        {/* Decorative Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/5 blur-[120px] pointer-events-none"></div>

        {/* Animated Badge */}
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="relative inline-block mb-12"
        >
           <div className="absolute inset-0 bg-red-500 blur-2xl opacity-20 rounded-full animate-pulse"></div>
           <div className="relative z-10 p-10 rounded-full border-[6px] border-red-500 bg-gray-900 shadow-[0_0_60px_rgba(239,68,68,0.4)] group">
              <ShieldCheck className="w-24 h-24 text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.6)] group-hover:scale-110 transition-transform duration-300" />
           </div>
           
           {/* Achievement Particles */}
           {[...Array(8)].map((_, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 0 }}
               animate={{ opacity: [0, 1, 0], y: -80, x: (i % 2 === 0 ? 30 : -30) }}
               transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
               className="absolute top-1/2 left-1/2 w-1 h-1 bg-red-400 rounded-full"
             />
           ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase italic flex flex-col items-center gap-2">
            <span className="text-lg tracking-[0.5em] text-gray-600 not-italic">Stage 1: Completed</span>
            TROUBLESHOOTER: <span className="text-red-500 text-glow-red">CLEARED</span> ⚡
          </h1>
          
          <div className="bg-black/40 border border-gray-800 p-8 rounded-2xl mb-12 max-w-2xl mx-auto backdrop-blur-sm relative">
             <Zap className="absolute top-0 right-0 w-12 h-12 text-red-500/10 -translate-x-4 translate-y-4" />
             <p className="text-lg text-gray-400 leading-relaxed italic">
                "Goks! Lo udah selangkah lebih maju dari Script Kiddie karena sekarang lo tau cara mecahin masalah secara mandiri."
             </p>
             <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-red-500/5 p-3 rounded border border-red-500/20">
                   <div className="p-1.5 bg-red-500/20 rounded"><CheckCircle className="w-4 h-4 text-red-500" /></div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-white">System Detective</span>
                </div>
                <div className="flex items-center gap-3 bg-red-500/5 p-3 rounded border border-red-500/20">
                   <div className="p-1.5 bg-red-500/20 rounded"><CheckCircle className="w-4 h-4 text-red-500" /></div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-white">Log Specialist</span>
                </div>
             </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            <Link 
              to="/academy/stage-1/modul-3/membaca-log"
              className="flex items-center gap-2 text-[10px] font-black text-gray-600 hover:text-white transition-all uppercase tracking-widest group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" /> RE-WATCH LOG RECORDS
            </Link>
            
            <Link 
              to="/academy"
              state={{ expandedId: 'fundamental-it' }}
              className="w-full md:w-auto bg-cyan-500 hover:bg-white text-black px-12 py-5 text-sm font-black transition-all group rounded-sm shadow-[0_0_40px_rgba(34,211,238,0.3)] flex items-center justify-center gap-3 overflow-hidden relative skew-x-[-12deg]"
            >
              <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
              <span className="relative z-10 skew-x-[12deg] flex items-center gap-2 uppercase tracking-tighter">
                FINISH MODULE & RETURN TO HQ <Home className="w-6 h-6" />
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Footer Status */}
        <div className="mt-24 flex items-center justify-center gap-4 text-[9px] text-gray-700 uppercase tracking-[0.5em] font-black">
           <Terminal className="w-4 h-4" />
           <span>Certification_Status: Pending // Practical_Score: 100%</span>
        </div>
      </div>
    </div>

      <style jsx>{`
        .text-glow-red {
          text-shadow: 0 0 10px rgba(239, 68, 68, 0.5), 0 0 25px rgba(239, 68, 68, 0.3);
        }
      `}</style>
    </div>
  );
};

export default KesimpulanTroubleshoot;
