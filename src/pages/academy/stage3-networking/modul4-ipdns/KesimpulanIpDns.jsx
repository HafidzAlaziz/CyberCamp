import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  ChevronLeft, 
  Home, 
  Compass, 
  Zap, 
  ShieldCheck, 
  Terminal,
  Activity,
  Fingerprint,
  Search,
  LayoutGrid
} from 'lucide-react';

const KesimpulanIpDns = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 blur-[100px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 blur-[100px] rounded-full animate-pulse delay-1000"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-cyan-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/50">
              <Trophy className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 3: Networking</h1>
              <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
                MODUL 4: IP, MAC, DHCP & DNS
              </h2>
            </div>
          </div>
        </motion.div>

        <div className="text-center relative">
          {/* Main Badge Visual */}
          <div className="flex justify-center mb-12 relative scale-90 md:scale-100">
             <motion.div 
               initial={{ scale: 0, rotate: -45 }}
               animate={{ scale: 1, rotate: 0 }}
               transition={{ type: 'spring', stiffness: 200, damping: 20 }}
               className="relative z-10 p-16 rounded-[4rem] border-2 border-cyan-500/30 bg-gray-900/60 backdrop-blur-2xl shadow-[0_0_80px_rgba(6,182,212,0.2)] group"
             >
                <div className="relative">
                   <Compass className="w-32 h-32 text-cyan-400 mb-6 drop-shadow-[0_0_20px_#22d3ee] group-hover:scale-110 transition-transform duration-500" />
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                     className="absolute -inset-4 border-2 border-dashed border-cyan-500/20 rounded-full"
                   />
                </div>
                <div className="space-y-1">
                  <h3 className="text-[10px] font-black tracking-[0.6em] text-cyan-500 uppercase italic">Skill Level: Advanced</h3>
                  <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">NETWORK NAVIGATOR</h2>
                  <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mt-2 border-t border-gray-800 pt-2">VALIDATED // ADDRESSABLE // RESOLVED</p>
                </div>
             </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto space-y-12"
          >
            <div className="space-y-4">
              <h4 className="text-white font-black italic uppercase tracking-tighter text-2xl">Misi Selesai, Agent!</h4>
              <p className="text-gray-400 leading-relaxed text-sm">
                Sekarang lo udah ngerti gmana caranya paket data nemuin tujuannya di rimba internet. Mulai dari Alamat IP (Rumah), MAC Address (KTP Fisik), sampe DNS (Buku Telepon). Lo nggak bakal tersesat lagi di dunia networking!
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-left">
               {[
                 { icon: Fingerprint, label: "IP & MAC", color: "cyan" },
                 { icon: Zap, label: "DHCP", color: "blue" },
                 { icon: Search, label: "DNS", color: "purple" },
                 { icon: ShieldCheck, label: "SECURITY", color: "emerald" }
               ].map((item, idx) => (
                 <div key={idx} className="p-4 bg-gray-900 border border-gray-800 rounded-xl">
                    <item.icon className={`w-5 h-5 text-${item.color}-500 mb-2`} />
                    <p className="text-[9px] font-black text-white tracking-widest uppercase">{item.label}</p>
                 </div>
               ))}
            </div>

            <div className="flex justify-end items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl text-left">
              <Link 
                to="/academy"
                className="flex items-center gap-3 bg-cyan-600 hover:bg-white text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
              >
                <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest leading-none uppercase">
                  FINISH & RETURN TO ROADMAP » <Home className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default KesimpulanIpDns;
