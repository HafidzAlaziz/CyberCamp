import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Monitor, Terminal, Settings, Shield } from 'lucide-react';

const KesimpulanOS = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none flex space-x-4 text-[10px] text-cyan-500 font-black tracking-widest px-4">
        {[...Array(20)].map((_, i) => (
          <motion.div key={i} initial={{ y: -100 }} animate={{ y: '100vh' }} transition={{ duration: 5 + i * 0.4, repeat: Infinity, ease: 'linear', delay: i * 0.3 }} className="w-12 break-all opacity-10">
            C:\WIN<br/>sudo su<br/>ls -la<br/>010010
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-12 border-b border-cyan-900/30 pb-6 pl-0 md:pl-32">
          <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/50">
            <Monitor className="w-8 h-8 text-cyan-500" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-500 tracking-[0.3em] uppercase font-black">Stage 2 · Operating Systems</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">KESIMPULAN: OS BASICS</h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center min-h-[60vh]">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-tight">
              Rekap Super <br/>
              <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6,182,212,0.5)' }}>OS BASICS!</span>
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed">Lo udah ngerti dua kerajaan besar dunia komputer! Windows yang mendominasi kantor-kantor, dan Linux yang jadi rumahnya para hacker dan server dunia.</p>
            <ul className="space-y-4">
              {[
                { icon: <Monitor className="w-4 h-4"/>, label: 'Windows Conquered', desc: 'Paham manajemen file, user, dan celah keamanan khas Windows.' },
                { icon: <Terminal className="w-4 h-4"/>, label: 'Linux Explored', desc: 'Ngerti sistem file Linux dan permission yang jadi pondasi keamanan server.' },
                { icon: <Shield className="w-4 h-4"/>, label: 'OS Security Aware', desc: 'Tahu perbedaan model keamanan antara Windows dan Linux.' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 p-4 bg-gray-900 border border-gray-800 rounded-xl">
                  <div className="p-2 bg-cyan-950/30 rounded border border-cyan-500/30 text-cyan-400">{item.icon}</div>
                  <div className="text-xs"><span className="text-cyan-400 font-bold uppercase tracking-widest block mb-1">{item.label}</span>{item.desc}</div>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-center p-8">
            <div className="relative group w-full max-w-sm aspect-square flex flex-col items-center justify-center border-4 border-cyan-500/50 rounded-[3rem] bg-gray-950 shadow-[0_0_50px_rgba(6,182,212,0.15)] hover:shadow-[0_0_80px_rgba(6,182,212,0.5)] hover:border-cyan-400 hover:rounded-full transition-all duration-700 overflow-hidden cursor-crosshair">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/40 via-transparent to-transparent pointer-events-none" />
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative z-10 flex flex-col items-center gap-4 w-full">
                <div className="relative flex justify-center w-full">
                  <div className="p-6 bg-black border-2 border-cyan-500/50 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.4)] group-hover:rotate-12 transition-transform duration-500 group-hover:scale-110">
                    <Monitor className="w-16 h-16 text-cyan-400 group-hover:animate-pulse" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-dashed border-cyan-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
                </div>
                <div className="text-center mt-8 space-y-2 px-2 z-20">
                  <p className="text-cyan-400 font-bold text-[10px] tracking-[0.4em] uppercase">Stage 2 · Modul 1 Selesai</p>
                  <p className="text-white font-black text-2xl italic tracking-tighter uppercase leading-none">OS COMMANDER</p>
                  <div className="inline-block mt-3 px-6 py-2 bg-cyan-900/80 text-cyan-300 text-xs font-black tracking-widest border border-cyan-500 rounded group-hover:bg-cyan-600 group-hover:text-black transition-colors">
                    TIER 2 CLEARED ✓
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link to="/academy/stage-2/modul-1/linux-vs-windows" className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" /> « SEBELUMNYA
          </Link>
          <Link to="/academy" state={{ expandedId: 'operating-systems' }} className="flex items-center gap-3 bg-cyan-600 hover:bg-cyan-500 text-black px-8 py-4 text-xs font-black transition-all rounded-sm skew-x-[-12deg]">
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest uppercase">KEMBALI KE HQ » <ChevronRight className="w-4 h-4" /></span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default KesimpulanOS;
