import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, ShieldCheck, ChevronLeft, LayoutGrid, Award, Search, Activity, Zap, Terminal, Globe } from 'lucide-react';

const KesimpulanTools = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12 overflow-hidden relative">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-cyan-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/50">
            <Trophy className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 4: Security Skills</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
               MODUL 4: Incident Response Tools
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center min-h-[60vh]">
          
          {/* Left Column: Recap */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-6 leading-tight">
                MISSION <br/>
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }}>ACCOMPLISHED</span>
              </h2>
              <p className="text-gray-400 leading-relaxed text-base italic">
                Lo udah berhasil menaklukkan dua pedang bermata dua paling legendaris di dunia IT. Sekarang lo punya mata buat ngelihat "pintu" (Port) dan telinga buat dengerin "bisikan" data (Packet).
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-start gap-4 group">
                 <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 group-hover:border-emerald-500/50 transition-colors">
                    <Terminal className="w-6 h-6 text-emerald-500" />
                 </div>
                 <div>
                    <h4 className="text-white font-black text-xs uppercase italic tracking-widest mb-1">NMAP</h4>
                    <p className="text-[10px] text-gray-500 leading-relaxed uppercase font-black">Dipake buat "melihat" bentuk jaringan dan nyari pintu mana aja yang gak dikunci.</p>
                 </div>
              </div>
              <div className="flex items-start gap-4 group">
                 <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 group-hover:border-blue-500/50 transition-colors">
                    <Activity className="w-6 h-6 text-blue-500" />
                 </div>
                 <div>
                    <h4 className="text-white font-black text-xs uppercase italic tracking-widest mb-1">WIRESHARK</h4>
                    <p className="text-[10px] text-gray-500 leading-relaxed uppercase font-black">Dipake buat "mendengar" apa yang sedang dibicarakan di trafik jaringan itu.</p>
                 </div>
              </div>
            </div>

            <div className="p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl">
               <div className="flex items-center gap-2 text-cyan-500 mb-2">
                  <Zap className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase">Final Note</span>
               </div>
               <p className="text-[11px] text-gray-400 italic leading-relaxed">
                 Tools Wireshark dan Nmap itu kayak piso dapur. Kalo dipake koki (Admin) jadi masakan enak (Keamanan), tapi kalo dipake penjahat (Hacker) bisa bahaya. Gunakan kekuatan ini buat ngelindungin, bukan ngerusak!
               </p>
            </div>
          </motion.div>

          {/* Right Column: Badge Visual */}
          <div className="flex justify-center items-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20 
              }}
              className="relative"
            >
              {/* Glow Rings */}
              <motion.div 
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.1, 0.2] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute inset-0 bg-blue-500 rounded-full blur-[100px]"
              />
              
              <div className="bg-gray-900 w-72 h-72 rounded-full border-4 border-blue-500 flex flex-col items-center justify-center p-8 relative shadow-[0_0_60px_rgba(59,130,246,0.3)]">
                 <div className="absolute inset-2 border border-blue-500/20 rounded-full border-dashed animate-spin" style={{ animationDuration: '20s' }} />
                 
                 <div className="p-4 bg-blue-500/10 rounded-full border border-blue-500/30 mb-4">
                    <Search className="w-16 h-16 text-blue-400" />
                 </div>
                 <h3 className="text-white font-black text-center text-xl italic leading-tight uppercase tracking-tighter">
                   NETWORK <br/>
                   <span className="text-blue-500 text-sm tracking-[0.3em]">INVESTIGATOR</span>
                 </h3>
                 <p className="mt-2 text-[9px] text-gray-600 font-black uppercase tracking-[0.3em]">Module Cleared</p>
                 
                 {/* Decorative elements */}
                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 p-2 bg-gray-950 border border-gray-800 rounded-lg">
                    <Activity className="w-4 h-4 text-cyan-500" />
                 </div>
                 <div className="absolute top-1/2 -right-6 -translate-y-1/2 p-2 bg-gray-950 border border-gray-800 rounded-lg">
                    <Terminal className="w-4 h-4 text-emerald-500" />
                 </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-blue-500 shadow-2xl">
          <Link 
            to="/academy/stage-4/modul-4/wireshark-sniffer"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « KEMBALI KE WIRESHARK
          </Link>
          
          <Link 
            to="/academy"
            state={{ expandedId: 'security-skills' }}
            className="flex items-center gap-3 bg-blue-600 hover:bg-white text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
          >
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest leading-none uppercase">
              FINISH & RETURN TO HQ » <LayoutGrid className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default KesimpulanTools;
