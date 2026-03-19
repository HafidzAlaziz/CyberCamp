import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, ShieldCheck, ShieldAlert, ChevronLeft, LayoutGrid, Award, Star, Zap, Terminal, Globe, Lock } from 'lucide-react';

const KesimpulanTahap4 = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12 overflow-hidden relative">
      
      {/* CSS Fireworks Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 1, x: `${Math.random() * 100}%`, y: '100%' }}
            animate={{ 
              scale: [0, 1.5, 2], 
              opacity: [1, 1, 0],
              y: [`${60 + Math.random() * 20}%`, `${20 + Math.random() * 20}%`]
            }}
            transition={{ 
              duration: 2 + Math.random() * 2, 
              repeat: Infinity, 
              delay: i * 0.8,
              ease: "easeOut" 
            }}
            className="absolute w-2 h-2 bg-amber-500 rounded-full blur-[2px] shadow-[0_0_20px_#f59e0b]"
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-cyan-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/50">
            <Award className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 4: Completed</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
               SECURITY ANALYST BOOTCAMP
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
                Selamat, lo udah namatin Tahap 4: **Security Skills & Knowledge**! Dari urusan login sampe urusan membedah taktik hacker, lo udah lahap semua materinya. 
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-900/50 rounded-xl border border-white/5 space-y-2">
                 <Lock className="w-5 h-5 text-purple-500" />
                 <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Cryptography</h4>
                 <p className="text-[8px] text-gray-500 uppercase font-bold">Data Aman & Terkunci</p>
              </div>
              <div className="p-4 bg-gray-900/50 rounded-xl border border-white/5 space-y-2">
                 <ShieldAlert className="w-5 h-5 text-red-500" />
                 <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Attack Mastery</h4>
                 <p className="text-[8px] text-gray-500 uppercase font-bold">Paham Cara Hacker Nyerang</p>
              </div>
              <div className="p-4 bg-gray-900/50 rounded-xl border border-white/5 space-y-2">
                 <Terminal className="w-5 h-5 text-emerald-500" />
                 <h4 className="text-[10px] font-black text-white uppercase tracking-widest">IR Tools</h4>
                 <p className="text-[8px] text-gray-500 uppercase font-bold">Nmap & Wireshark Pro</p>
              </div>
              <div className="p-4 bg-gray-900/50 rounded-xl border border-white/5 space-y-2">
                 <ShieldCheck className="w-5 h-5 text-cyan-500" />
                 <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Frameworks</h4>
                 <p className="text-[8px] text-gray-500 uppercase font-bold">NIST & MITRE Strategy</p>
              </div>
            </div>

            <p className="text-[11px] text-gray-500 italic border-l-2 border-cyan-500 pl-4">
              "Ingat pesan gue: Seorang Security Analyst yang hebat bukan cuma yang jago ngetik kode, tapi yang punya mentalitas buat terus belajar dan nggak pernah sombong. Jalan lo masih panjang, tapi lo udah punya bekal yang sangat kuat!"
            </p>
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
                animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.05, 0.1] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute inset-0 bg-cyan-500 rounded-full blur-[100px]"
              />
              
              <div className="bg-gradient-to-br from-gray-900 to-black w-80 h-80 rounded-full border-4 border-amber-500 flex flex-col items-center justify-center p-8 relative shadow-[0_0_80px_rgba(245,158,11,0.2)] overflow-hidden">
                 
                 {/* Rotating Border */}
                 <div className="absolute inset-0 border-[10px] border-amber-500/10 rounded-full border-dashed animate-spin" style={{ animationDuration: '30s' }} />
                 
                 <div className="p-6 bg-amber-500/10 rounded-full border border-amber-500/30 mb-4 relative z-10">
                    <ShieldCheck className="w-20 h-20 text-amber-500" />
                 </div>
                 <div className="relative z-10 flex flex-col items-center">
                    <h3 className="text-white font-black text-center text-2xl italic leading-tight uppercase tracking-tighter">
                      SECURITY <br/>
                      <span className="text-amber-500">ANALYST</span>
                    </h3>
                    <div className="flex gap-1 mt-2">
                       <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                       <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                       <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                       <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    </div>
                    <p className="mt-4 text-[9px] text-gray-400 font-black uppercase tracking-[0.4em]">Stage_04: CLEAR</p>
                 </div>

                 {/* Shine effect */}
                 <motion.div 
                   animate={{ x: [-200, 200] }}
                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                   className="absolute top-0 bottom-0 w-20 bg-white/5 skew-x-[30deg] pointer-events-none"
                 />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link 
            to="/academy/stage-4/modul-5/mitre-attack"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « KEMBALI KE MITRE ATT&CK
          </Link>
          
          <Link 
            to="/academy"
            state={{ expandedId: 'security-skills' }}
            className="flex items-center gap-4 bg-cyan-600 hover:bg-white text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
          >
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest leading-none uppercase">
              SELESAI & KEMBALI KE HQ » <LayoutGrid className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default KesimpulanTahap4;
