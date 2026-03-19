import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, ChevronLeft, Home, CheckCircle, Terminal } from 'lucide-react';

const KesimpulanHardware = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Standardized Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-yellow-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/50">
            <Award className="w-8 h-8 text-yellow-500" />
          </div>
          <div>
            <h1 className="text-sm text-yellow-500 tracking-[0.3em] uppercase font-black">Stage 1: Fundamentals</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              MODUL 1: COMPUTER HARDWARE
            </h2>
          </div>
        </motion.div>

        <div className="text-center">
        {/* Animated Badge */}
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="relative inline-block mb-12"
        >
           <div className="absolute inset-0 bg-yellow-500 blur-3xl opacity-20 rounded-full animate-pulse"></div>
           <div className="relative z-10 p-8 rounded-full border-4 border-yellow-500 bg-gray-900 shadow-[0_0_50px_rgba(234,179,8,0.3)]">
              <Award className="w-24 h-24 text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
           </div>
           {/* Floating Particles */}
           {[...Array(6)].map((_, i) => (
             <motion.div
               key={i}
               animate={{ 
                 y: [0, -20, 0],
                 opacity: [0.2, 1, 0.2]
               }}
               transition={{ 
                 duration: 2 + i,
                 repeat: Infinity,
                 delay: i * 0.5
               }}
               className="absolute w-2 h-2 bg-yellow-500 rounded-full"
               style={{
                 top: `${Math.random() * 100}%`,
                 left: `${Math.random() * 100}%`
               }}
             />
           ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter uppercase italic">
            MODUL 1: <span className="text-yellow-500 text-glow-yellow">TAMAT!</span> 🏆
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Goks! Lo baru aja namatin dasar-dasar <span className="text-white italic">Hardware</span>. 
            Sekarang lo udah tau kan kenapa hacker gak cuma butuh <span className="text-cyan-400">Software</span>, tapi harus ngerti <span className="text-purple-400">Hardware</span> juga?
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-12">
             {[
               { label: 'CPU Mastered', icon: <CheckCircle className="w-4 h-4 text-emerald-500" /> },
               { label: 'RAM Analyzed', icon: <CheckCircle className="w-4 h-4 text-emerald-500" /> },
               { label: 'Storage Decoded', icon: <CheckCircle className="w-4 h-4 text-emerald-500" /> }
             ].map((item, idx) => (
               <div key={idx} className="bg-gray-900 p-4 border border-gray-800 rounded-lg flex items-center justify-center gap-2">
                  {item.icon}
                  <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
               </div>
             ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <Link 
              to="/academy/stage-1/modul-1/storage-mobo"
              className="w-full md:w-auto flex items-center gap-2 px-8 py-4 text-gray-500 hover:text-white transition-colors uppercase text-sm font-bold"
            >
              <ChevronLeft className="w-4 h-4" /> RE-VIEW MATERI
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
        <div className="mt-20 flex items-center justify-center gap-3 text-[10px] text-gray-600 uppercase tracking-[0.5em]">
           <Terminal className="w-3 h-3" />
           <span>Session_End // Achievement_Unlocked</span>
        </div>
      </div>
    </div>
      
      <style jsx>{`
        .text-glow-yellow {
          text-shadow: 0 0 10px rgba(234, 179, 8, 0.5), 0 0 20px rgba(234, 179, 8, 0.3);
        }
      `}</style>
    </div>
  );
};

export default KesimpulanHardware;
