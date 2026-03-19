import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, ChevronLeft, Home, ShieldCheck, Fingerprint, Lock, GraduationCap, Star, LayoutGrid } from 'lucide-react';

const KesimpulanAuth = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12 overflow-hidden relative">
      {/* Decorative BG */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 blur-[150px] pointer-events-none"></div>

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
              MODUL 1: Authentication Basics
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center min-h-[60vh]">
          
          {/* Kolom Kiri: Rekap */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10 relative z-10"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-cyan-500 font-black italic uppercase tracking-[0.3em] text-sm">
                <GraduationCap className="w-5 h-5" /> REKAP_MODUL_IDENTITAS
              </div>
              <h1 className="text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
                MODUL_1 <span className="text-cyan-500 text-7xl block transition-all hover:scale-105 cursor-default mt-2" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.5), 0 0 30px rgba(6, 182, 212, 0.3)' }}>TAMAT!</span>
              </h1>
            </div>

            <div className="space-y-8 text-xl text-gray-400">
              <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-2xl relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
                <p className="italic leading-relaxed text-base">
                  "Mantap Bos! Sekarang lo udah paham kalau pertahanan paling depan itu bukan cuma soal password yang panjang, tapi soal <span className="text-white font-bold underline decoration-cyan-500">IDENTITAS</span>. Lo udah siap jadi penjaga gerbang digital yang levelnya lebih tinggi!"
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 text-[10px] font-bold uppercase tracking-widest italic">
                <div className="flex items-center gap-3 bg-cyan-500/10 p-4 border border-cyan-500/30 rounded-lg">
                  <Star className="w-5 h-5 text-cyan-400 font-bold" /> Password is NOT enough (Credential Stuffing).
                </div>
                <div className="flex items-center gap-3 bg-blue-500/10 p-4 border border-blue-500/30 rounded-lg">
                  <Star className="w-5 h-5 text-blue-400 font-bold" /> MFA is the standard (Know, Have, Are).
                </div>
                <div className="flex items-center gap-3 bg-purple-500/10 p-4 border border-purple-500/30 rounded-lg">
                  <Star className="w-5 h-5 text-purple-400 font-bold" /> SSO is easy, but secure the Token!
                </div>
              </div>
            </div>

            {/* Footer Navigation */}
            <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl text-left">
              <Link 
                to="/academy/stage-4/modul-1/sso"
                className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
                « KEMBALI KE SSO
              </Link>
              
              <Link 
                to="/academy"
                state={{ expandedId: 'security-skills' }}
                className="flex items-center gap-3 bg-cyan-600 hover:bg-white text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
              >
                <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest leading-none uppercase">
                  FINISH & RETURN TO ROADMAP » <Home className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Kolom Kanan: Badge Achievement */}
          <div className="flex justify-center items-center relative h-[600px]">
            <motion.div 
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="relative"
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed border-cyan-500/30 rounded-full scale-125"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-purple-500/20 rounded-full scale-150"
              />

              {/* Main Badge */}
              <div className="relative z-10 p-16 rounded-[4rem] border-4 border-cyan-500 bg-gray-900 shadow-[0_0_80px_rgba(6,182,212,0.4)] flex flex-col items-center group">
                <div className="relative mb-6">
                  <Fingerprint className="w-32 h-32 text-cyan-500 drop-shadow-[0_0_20px_rgba(6,182,212,0.8)] group-hover:scale-110 transition-transform duration-500" />
                  <Lock className="absolute -bottom-2 -right-2 w-12 h-12 text-white bg-cyan-600 p-2 rounded-xl border-4 border-gray-900" />
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-black uppercase tracking-[0.8em] text-gray-500 mb-2">Identity_Mastery</p>
                  <h2 className="text-4xl font-black text-white italic tracking-tighter leading-none mb-1">
                    IDENTITY GUARDIAN
                  </h2>
                  <div className="h-1 w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-cyan-500 mt-2">CLEARED // AUTHENTICATED</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KesimpulanAuth;
