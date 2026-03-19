import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, Home, Trophy, CheckCircle2, Zap, Shield, DoorOpen, ArrowRight } from 'lucide-react';

const KesimpulanPorts = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Standardized Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-cyan-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/50">
            <DoorOpen className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 3: Networking</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              MODUL 2: PORTS & PROTOCOLS
            </h2>
          </div>
        </motion.div>
        
        <div className="bg-gray-900/50 border border-cyan-500/30 rounded-2xl p-8 md:p-16 shadow-2xl relative overflow-hidden text-center">
          
          {/* Background Glows */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/5 blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-500/5 blur-[100px] pointer-events-none"></div>

          {/* Achievement Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="inline-block mb-12 relative"
          >
            <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full animate-pulse"></div>
            <div className="relative p-10 bg-black/60 border-2 border-cyan-500/50 rounded-full shadow-[0_0_50px_rgba(34,211,238,0.2)]">
               <DoorOpen className="w-20 h-20 text-cyan-400" />
               <motion.div 
                 animate={{ scale: [1, 1.2, 1] }}
                 transition={{ repeat: Infinity, duration: 2 }}
                 className="absolute -top-2 -right-2 bg-emerald-500 p-2 rounded-full border-2 border-gray-900"
               >
                  <CheckCircle2 className="w-6 h-6 text-white" />
               </motion.div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
             <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase grayscale-0">
               PORT SCANNER: <span className="text-cyan-400 text-glow-cyan">CLEARED</span>
             </h1>
             
             <div className="max-w-2xl mx-auto space-y-4">
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                   Gokil! Lo udah paham gimana data keluar masuk server lewat "Pintu" (Port) dan ngomong pake "Bahasa" (Protocol). Inget pesan utamanya: <span className="text-white font-bold underline italic">"Tutup semua pintu yang nggak kepake!"</span> demi keamanan server lo.
                </p>
                <div className="flex flex-wrap justify-center gap-4 py-6">
                   <div className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-sm text-[10px] font-black text-cyan-400 uppercase tracking-widest">
                      Nmap Expert
                   </div>
                   <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-sm text-[10px] font-black text-blue-400 uppercase tracking-widest">
                      HTTPS Secured
                   </div>
                   <div className="px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-sm text-[10px] font-black text-orange-400 uppercase tracking-widest">
                      SSH Master
                   </div>
                </div>
             </div>
          </motion.div>

          {/* Action Buttons Summary Style */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6"
          >
             <Link 
               to="/academy/stage-3/modul-2/admin-protocols" 
               className="flex items-center gap-2 text-[10px] font-black text-gray-600 hover:text-white transition-all uppercase tracking-widest group"
             >
               <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> RE-WATCH ADMIN PORTS
             </Link>
             
             <Link 
               to="/academy"
               state={{ expandedId: 'networking' }}
               className="w-full md:w-auto bg-cyan-500 hover:bg-white text-black px-12 py-5 text-sm font-black transition-all group rounded-sm shadow-[0_0_40px_rgba(34,211,238,0.3)] flex items-center justify-center gap-3 overflow-hidden relative skew-x-[-12deg]"
             >
                <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
                <span className="relative z-10 skew-x-[12deg] flex items-center gap-2 uppercase tracking-tighter">
                  FINISH MODULE & RETURN TO HQ <Home className="w-6 h-6" />
                </span>
             </Link>
          </motion.div>

        </div>
      </div>

      <style>{`
        .text-glow-cyan {
          text-shadow: 0 0 10px rgba(34, 211, 238, 0.5), 0 0 30px rgba(34, 211, 238, 0.3);
        }
      `}</style>
    </div>
  );
};

export default KesimpulanPorts;
