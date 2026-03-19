import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, ChevronLeft, Home, Trophy, Terminal, ShieldCheck, Star } from 'lucide-react';

const KesimpulanOffice = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12 flex items-center justify-center overflow-hidden">
      <div className="max-w-4xl w-full text-center relative">
        {/* Extreme Celebration Decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 blur-[150px] pointer-events-none"></div>

        {/* Triple Badge Visual */}
        <div className="flex justify-center items-end gap-4 mb-12">
           <motion.div 
             initial={{ opacity: 0, scale: 0 }} 
             animate={{ opacity: 0.3, scale: 0.8 }} 
             transition={{ delay: 0.8 }}
             className="p-6 rounded-full border-2 border-cyan-500/50 bg-gray-900"
           >
              <ShieldCheck className="w-8 h-8 text-cyan-500" />
           </motion.div>
           
           <motion.div 
             initial={{ scale: 0, rotate: -20 }}
             animate={{ scale: 1, rotate: 0 }}
             transition={{ type: 'spring', stiffness: 200, damping: 15 }}
             className="relative z-10 p-12 rounded-full border-[8px] border-emerald-500 bg-gray-900 shadow-[0_0_80px_rgba(16,185,129,0.3)] group cursor-pointer"
           >
              <Trophy className="w-24 h-24 text-emerald-500 drop-shadow-[0_0_20px_rgba(16,185,129,0.6)] group-hover:scale-110 transition-transform duration-500" />
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 border-2 border-dashed border-emerald-500/20 rounded-full scale-125"
              />
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, scale: 0 }} 
             animate={{ opacity: 0.3, scale: 0.8 }} 
             transition={{ delay: 1 }}
             className="p-6 rounded-full border-2 border-purple-500/50 bg-gray-900"
           >
              <Star className="w-8 h-8 text-purple-500" />
           </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="inline-block px-4 py-1.5 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-[0.2em] mb-6 skew-x-[-15deg]">
             <span className="skew-x-[15deg] block">Tahap 1: Lulus Sempurna</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase italic">
            STAGE 1: <span className="text-emerald-500 text-glow-emerald">COMPLETED</span> 🏆
          </h1>
          
          <h2 className="text-gray-500 text-sm md:text-lg mb-12 max-w-2xl mx-auto tracking-widest font-black uppercase">
             Fundamental IT Mastered
          </h2>
          
          <div className="max-w-2xl mx-auto bg-black border border-gray-800 p-8 rounded-3xl mb-16 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors"></div>
             <p className="text-lg text-gray-400 leading-relaxed italic relative z-10">
                "Goks! Lo udah namatin dasar-dasar IT. Dari bongkar-pasang <span className="text-white">Hardware</span>, ngerti jalan paket <span className="text-white">Jaringan</span>, jago <span className="text-white">Troubleshoot</span>, sampe tau cara mainnya file <span className="text-white">Dokumen</span> kantoran."
             </p>
             <p className="mt-6 text-gray-500 text-sm not-italic relative z-10 font-bold uppercase tracking-tight">
                Fondasi lo udah kuat banget buat masuk ke <span className="text-emerald-500">Tahap 2: Operating Systems</span>. 🚀
             </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            <Link 
              to="/academy/stage-1/modul-4/excel-target"
              className="flex items-center gap-2 text-[10px] font-black text-gray-700 hover:text-white transition-all uppercase tracking-widest group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" /> RE-SCAN EXCEL SECRETS
            </Link>
            
            <Link 
              to="/academy"
              state={{ expandedId: 'fundamental-it' }}
              className="w-full md:w-auto bg-emerald-500 hover:bg-white text-black px-12 py-6 text-sm font-black transition-all group rounded-sm shadow-[0_0_50px_rgba(16,185,129,0.3)] flex items-center justify-center gap-3 overflow-hidden relative skew-x-[-12deg]"
            >
              <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
               <Award className="relative z-10 w-6 h-6 mr-2" />
               <span className="relative z-10 skew-x-[12deg] flex items-center gap-2 uppercase tracking-tighter">
                KLAIM SERTIFIKAT & KEMBALI KE HQ
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Footer Status */}
        <div className="mt-24 flex flex-col items-center gap-3 opacity-30 text-[9px] text-gray-500 uppercase tracking-[0.6em] font-black">
           <div className="flex items-center gap-4">
              <Terminal className="w-4 h-4" />
              <span>Rank_Update: Semi-Pro // Security_Knowledge: Fundamental_Unlocked</span>
           </div>
        </div>
      </div>

      <style jsx>{`
        .text-glow-emerald {
          text-shadow: 0 0 10px rgba(16, 185, 129, 0.5), 0 0 30px rgba(16, 185, 129, 0.3);
        }
      `}</style>
    </div>
  );
};

export default KesimpulanOffice;
