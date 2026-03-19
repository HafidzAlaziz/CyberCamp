import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  ChevronLeft, 
  Home, 
  Server, 
  Globe, 
  ShieldCheck, 
  Cpu,
  Layers,
  Map as MapIcon,
  Search
} from 'lucide-react';

const KesimpulanIp = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 blur-[100px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 blur-[100px] rounded-full animate-pulse delay-1000"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Standardized Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-cyan-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/50">
            <Trophy className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 3: Networking</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              MODUL 4: NETWORK ADDRESSING
            </h2>
          </div>
        </motion.div>

        <div className="text-center relative">
          {/* Main Badge Visual */}
          <div className="flex justify-center mb-12 relative scale-90 md:scale-100">
             <motion.div 
               initial={{ scale: 0, rotate: -45 }}
               animate={{ scale: 1, rotate: 0 }}
               transition={{ type: 'spring', stiffness: 200, damping: 20 }}
               className="relative z-10 p-16 rounded-[4rem] border-2 border-emerald-500/30 bg-gray-900/60 backdrop-blur-2xl shadow-[0_0_80px_rgba(16,185,129,0.2)] group"
             >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)] rounded-[4rem]"></div>
                <Layers className="w-32 h-32 text-emerald-400 drop-shadow-[0_0_30px_rgba(16,185,129,0.6)] group-hover:scale-110 transition-transform duration-500" />
                
                {/* Rotating Circuit Elements */}
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-2 border border-dashed border-emerald-500/10 rounded-[3.5rem]"
                />
                <motion.div 
                  animate={{ rotate: -360 }} 
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-6 border border-dotted border-cyan-500/10 rounded-[3rem]"
                />
             </motion.div>
             
             {/* Floating Mini Icons */}
             <motion.div 
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="absolute -top-4 -left-12 p-3 bg-gray-900 border border-gray-800 rounded-2xl shadow-xl"
             >
                <Globe className="w-6 h-6 text-cyan-400" />
             </motion.div>
             <motion.div 
               animate={{ y: [0, 15, 0] }}
               transition={{ duration: 5, repeat: Infinity, delay: 1 }}
               className="absolute -bottom-4 -right-12 p-3 bg-gray-900 border border-gray-800 rounded-2xl shadow-xl"
             >
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
             </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="inline-block px-6 py-2 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-[0.4em] mb-10 skew-x-[-15deg]">
               <span className="skew-x-[15deg] block">System_Finalized: ARCHITECT_VERIFIED</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase italic leading-none">
              NETWORK <span className="text-emerald-500 text-glow">ARCHITECT</span> 📐
            </h1>
            
            <div className="bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-gray-800 mb-16 max-w-2xl mx-auto shadow-2xl relative group text-left">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 border border-gray-800 px-4 py-1 rounded-full text-[8px] text-gray-500 font-black uppercase tracking-widest">
                  Post-Operation Analysis
               </div>
               <p className="text-gray-400 text-base md:text-lg italic leading-relaxed">
                 "Mantap, Bos! Lo udah paham gimana Identity (**IP**), Security (**Subnetting**), dan Automation (**DHCP**) kerja barengan buat ngebentuk pondasi internet. 
                 Sekarang lo bukan cuma pengguna, tapi udah jadi arsitek yang tau seluk-beluk jalur data secara mendalam!"
               </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-12">
              <Link 
                to="/academy/stage-3/modul-4/subnetting"
                className="flex items-center gap-3 text-xs font-black text-gray-600 hover:text-white transition-all uppercase tracking-widest group"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" /> RE-ENTER SUBNET LAB
              </Link>
              
              <Link 
                to="/academy"
                state={{ expandedId: 'networking' }}
                className="w-full md:w-auto bg-cyan-500 hover:bg-white text-black px-16 py-6 text-sm font-black transition-all group rounded-sm shadow-[0_0_50px_rgba(34,211,238,0.3)] flex items-center justify-center gap-4 overflow-hidden relative skew-x-[-12deg]"
              >
                <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                <span className="relative z-10 skew-x-[12deg] flex items-center gap-2 uppercase tracking-[0.1em]">
                  FINISH MODULE & RETURN TO HQ <Home className="w-6 h-6" />
                </span>
              </Link>
            </div>

            {/* Achievement Row */}
            <div className="flex justify-center gap-4 opacity-30">
               <Server className="w-5 h-5 text-gray-500" />
               <div className="w-8 h-px bg-gray-800 mt-2.5"></div>
               <Search className="w-5 h-5 text-gray-500" />
               <div className="w-8 h-px bg-gray-800 mt-2.5"></div>
               <MapIcon className="w-5 h-5 text-gray-500" />
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .text-glow {
          text-shadow: 0 0 15px rgba(16, 185, 129, 0.5), 0 0 30px rgba(16, 185, 129, 0.2);
        }
      `}</style>
    </div>
  );
};

export default KesimpulanIp;
