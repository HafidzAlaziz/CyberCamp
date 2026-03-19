import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, ShieldCheck, ChevronLeft, LayoutGrid, Award, Bug, ShieldAlert, Zap, Search, Database } from 'lucide-react';

const KesimpulanAttacks = () => {
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
               MODUL 3: Common Attacks
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
                MODUL <br/>
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }}>CLEARED!</span>
              </h2>
              <p className="text-gray-400 leading-relaxed text-base italic">
                GILAAAK! Lo sukses ngebongkar trik-trik licik hacker. Sekarang lo tau kalau dunia cyber itu bukan cuma soal kode, tapi soal gimana kita waspada sama segala jenis inputan.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-start gap-4 group">
                 <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 group-hover:border-cyan-500/50 transition-colors">
                    <Zap className="w-6 h-6 text-cyan-500" />
                 </div>
                 <div>
                    <h4 className="text-white font-black text-xs uppercase italic tracking-widest mb-1">PHISHING</h4>
                    <p className="text-[10px] text-gray-500 leading-relaxed uppercase font-black">Serangan ke otak manusia. Kuncinya: Cek pengirim & link sebelum klik!</p>
                 </div>
              </div>
              <div className="flex items-start gap-4 group">
                 <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 group-hover:border-emerald-500/50 transition-colors">
                    <Database className="w-6 h-6 text-emerald-500" />
                 </div>
                 <div>
                    <h4 className="text-white font-black text-xs uppercase italic tracking-widest mb-1">SQL INJECTION</h4>
                    <p className="text-[10px] text-gray-500 leading-relaxed uppercase font-black">Serangan ke database lewat input form. Kuncinya: Filter setiap teks user!</p>
              </div>
            </div>
            <div className="flex items-start gap-4 group">
                 <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 group-hover:border-purple-500/50 transition-colors">
                    <Bug className="w-6 h-6 text-purple-500" />
                 </div>
                 <div>
                    <h4 className="text-white font-black text-xs uppercase italic tracking-widest mb-1">XSS</h4>
                    <p className="text-[10px] text-gray-500 leading-relaxed uppercase font-black">Serangan ke browser pengunjung web. Kuncinya: Jangan percaya script orang asing!</p>
                 </div>
              </div>
            </div>

            <div className="pt-8 flex items-center gap-6">
               <div className="h-0.5 flex-1 bg-gradient-to-r from-cyan-500 to-transparent opacity-20" />
               <ShieldCheck className="w-6 h-6 text-cyan-500/50 animate-pulse" />
               <div className="h-0.5 flex-1 bg-gradient-to-l from-cyan-500 to-transparent opacity-20" />
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
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-red-500 rounded-full blur-[80px]"
              />
              
              <div className="bg-gray-900 w-64 h-64 rounded-full border-4 border-red-500 flex flex-col items-center justify-center p-8 relative shadow-[0_0_50px_rgba(239,68,68,0.3)]">
                 <div className="absolute inset-2 border border-red-500/20 rounded-full border-dashed animate-spin" style={{ animationDuration: '15s' }} />
                 
                 <Award className="w-24 h-24 text-red-500 mb-4" />
                 <h3 className="text-white font-black text-center text-xl italic leading-tight uppercase tracking-tighter">
                   VULNERABILITY <br/>
                   <span className="text-red-500 text-sm tracking-[0.2em]">HUNTER</span>
                 </h3>
                 
                 {/* Decorative elements */}
                 <div className="absolute -top-4 -left-4 p-2 bg-gray-950 border border-gray-800 rounded-lg">
                    <Bug className="w-4 h-4 text-red-500" />
                 </div>
                 <div className="absolute -bottom-4 -right-4 p-2 bg-gray-950 border border-gray-800 rounded-lg">
                    <Search className="w-4 h-4 text-cyan-500" />
                 </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-red-500 shadow-2xl">
          <Link 
            to="/academy/stage-4/modul-3/xss"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « KEMBALI KE XSS
          </Link>
          
          <Link 
            to="/academy"
            state={{ expandedId: 'security-skills' }}
            className="flex items-center gap-4 bg-red-600 hover:bg-white text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
          >
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest leading-none uppercase">
              SELESAI & KEMBALI KE HQ <LayoutGrid className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            </span>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default KesimpulanAttacks;
