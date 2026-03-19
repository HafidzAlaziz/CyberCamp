import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, ChevronLeft, Home, Globe, Terminal, Activity } from 'lucide-react';

const KesimpulanNetworking = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12 flex items-center justify-center">
      <div className="max-w-3xl w-full text-center">
        {/* Animated Badge */}
        <motion.div 
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="relative inline-block mb-12"
        >
           <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-20 rounded-full animate-pulse"></div>
           <div className="relative z-10 p-8 rounded-full border-4 border-emerald-500 bg-gray-900 shadow-[0_0_60px_rgba(16,185,129,0.3)] group">
              <ShieldCheck className="w-24 h-24 text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] group-hover:scale-110 transition-transform duration-300" />
           </div>
           {/* Data Stream Decoration */}
           {[...Array(8)].map((_, i) => (
             <motion.div
               key={i}
               animate={{ 
                 y: [0, -100, 0],
                 opacity: [0, 0.5, 0],
                 scale: [0.5, 1, 0.5]
               }}
               transition={{ 
                 duration: 3 + i,
                 repeat: Infinity,
                 delay: i * 0.4
               }}
               className="absolute w-1 h-8 bg-emerald-500/20 rounded-full"
               style={{
                 top: '50%',
                 left: `${10 + i * 12}%`,
                 transform: 'translate(-50%, -50%)'
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
            NETWORK BASIC: <span className="text-emerald-500 text-glow-emerald tracking-[0.2em]">CLEARED!</span> ⚡
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed italic">
            "Network is the battlefield." 
            <br/> 
            <span className="text-gray-500 not-italic text-sm">Sekarang lo udah paham dasar gimana paket data ngalir, gimana spoofing alamat, sampe cara nyari pintu masuk lewat scanning port. Lo udah siap buat tempur di level berikutnya!</span>
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-12 max-w-xl mx-auto">
             {[
               { label: 'LAN/WAN Mastered', icon: <Globe className="w-4 h-4 text-emerald-400" /> },
               { label: 'Spoofing Analyst', icon: <Activity className="w-4 h-4 text-emerald-400" /> },
             ].map((item, idx) => (
               <div key={idx} className="bg-gray-900/50 p-4 border border-emerald-500/20 rounded-lg flex items-center justify-center gap-3">
                  {item.icon}
                  <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
               </div>
             ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <Link 
              to="/academy/stage-1/modul-2/port-protokol"
              className="w-full md:w-auto flex items-center gap-2 px-8 py-4 text-gray-500 hover:text-white transition-colors uppercase text-xs font-bold"
            >
              <ChevronLeft className="w-4 h-4" /> RE-SCAN PORT & PROTOKOL
            </Link>
            
            <Link 
              to="/academy"
              state={{ expandedId: 'fundamental-it' }}
              className="w-full md:w-auto bg-emerald-500 hover:bg-white text-black px-12 py-5 text-sm font-black transition-all group rounded-sm shadow-[0_0_30px_rgba(16,185,129,0.2)] flex items-center gap-3 overflow-hidden relative skew-x-[-12deg]"
            >
              <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
              <span className="relative z-10 flex items-center gap-2 uppercase tracking-tighter skew-x-[12deg]">
                FINISH MODULE & RETURN TO HQ <Home className="w-5 h-5 ml-2" />
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Footer Status */}
        <div className="mt-20 flex items-center justify-center gap-4 text-[10px] text-gray-700 uppercase tracking-[0.4em]">
           <Terminal className="w-4 h-4" />
           <span>Packet_Delivery_Complete // Level_Upgrade_Pending</span>
        </div>
      </div>
      
      <style jsx>{`
        .text-glow-emerald {
          text-shadow: 0 0 10px rgba(16, 185, 129, 0.5), 0 0 20px rgba(16, 185, 129, 0.3);
        }
      `}</style>
    </div>
  );
};

export default KesimpulanNetworking;
