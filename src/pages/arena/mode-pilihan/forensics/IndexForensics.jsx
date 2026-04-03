import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Search,
  ShieldAlert,
  Cpu,
  Lock,
  Zap
} from 'lucide-react';

const IndexForensics = () => {
  const navigate = useNavigate();

  // Load stats to compute completion
  const [levelStats] = useState(() => {
    const saved = localStorage.getItem('ctf_forensics_stats');
    return saved ? JSON.parse(saved) : {};
  });

  const mudahTotal = 10;
  const mudahCompleted = Array.from({ length: mudahTotal }, (_, i) => i + 1)
    .filter(id => !!levelStats[id]?.bestTime).length;

  const difficulties = [
    {
      key: 'mudah',
      label: 'MUDAH',
      sub: 'EASY',
      desc: 'Analisis artefak dasar: Metadata, File Signatures, Strings tersembunyi, dan PCAP sederhana.',
      levels: mudahTotal,
      completed: mudahCompleted,
      isLocked: false,
      isComingSoon: false,
      color: 'text-orange-400',
      border: 'border-orange-500',
      glow: 'shadow-[0_0_30px_rgba(249,115,22,0.3)]',
      bg: 'bg-orange-500/10',
      lineColor: '#f97316',
      icon: <Search className="w-10 h-10 text-orange-400 mb-3" />,
      path: '/ctf-arena/forensics/mudah'
    },
    {
      key: 'menengah',
      label: 'MENENGAH',
      sub: 'MEDIUM',
      desc: 'Analisis tingkat lanjut: Disk Image carving, Memory forensics, dan Malicious documents.',
      levels: 0,
      completed: 0,
      isLocked: false,
      isComingSoon: true,
      color: 'text-orange-400',
      border: 'border-orange-500',
      glow: 'shadow-[0_0_30px_rgba(249,115,22,0.2)]',
      bg: 'bg-orange-500/10',
      lineColor: '#fb923c',
      icon: <ShieldAlert className="w-10 h-10 text-orange-400 mb-3" />,
      path: null
    },
    {
      key: 'sulit',
      label: 'SULIT',
      sub: 'HARD',
      desc: 'Investigasi insiden nyata: APT attribution, Anti-forensics bypass, dan Corrupted filesystem analysis.',
      levels: 0,
      completed: 0,
      isLocked: true,
      isComingSoon: true,
      color: 'text-red-500',
      border: 'border-red-500',
      glow: 'shadow-[0_0_30px_rgba(239,68,68,0.2)]',
      bg: 'bg-red-500/10',
      lineColor: '#ef4444',
      icon: <Cpu className="w-10 h-10 text-red-500 mb-3" />,
      path: null
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-mono overflow-hidden relative flex flex-col forensics-page-theme">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-orange-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 flex flex-col flex-1 w-full">

        {/* Header */}
        <header className="flex items-center gap-5 mb-16">
          <button
            onClick={() => navigate('/ctf-arena/mode-pilihan')}
            className="p-2.5 bg-white/5 hover:bg-orange-500/10 rounded-xl transition-all border border-white/10 hover:border-orange-500/30 group"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-orange-400 group-hover:-translate-x-0.5 transition-all" />
          </button>
          <div className="h-10 w-px bg-white/10" />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-[9px] uppercase font-black tracking-[0.3em] text-orange-500/60">MODE: PILIHAN // DIGITAL FORENSICS</span>
            </div>
            <h1 className="text-2xl font-black italic tracking-tighter uppercase text-white leading-none">
              PILIH <span className="text-orange-400">TINGKAT KESULITAN</span>
            </h1>
          </div>
        </header>

        {/* Difficulty Cards */}
        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            {difficulties.map((diff, i) => (
              <motion.button
                key={diff.key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => !diff.isComingSoon && diff.path && navigate(diff.path)}
                disabled={diff.isComingSoon}
                className={`relative group flex flex-col items-center p-8 rounded-2xl border-2 transition-all duration-500 overflow-hidden text-center
                  ${diff.isComingSoon
                    ? 'opacity-50 cursor-not-allowed bg-black/20 border-white/10'
                    : `${diff.bg} ${diff.border} ${diff.glow} hover:scale-[1.03] active:scale-[0.98] cursor-pointer`
                  }`}
              >
                {/* Glow overlay on hover */}
                {!diff.isComingSoon && (
                  <div className={`absolute -inset-10 blur-3xl rounded-full ${diff.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                )}

                <div className="relative z-10 flex flex-col items-center">
                  {diff.icon}
                  <h2 className={`text-4xl font-black italic tracking-tighter uppercase mb-1 ${diff.color} drop-shadow-[0_0_10px_currentColor]`}>
                    {diff.label}
                  </h2>
                  <div className="text-[10px] font-black tracking-[0.4em] uppercase text-white/40 mb-4">{diff.sub} MODE</div>

                  <p className="text-[10px] text-gray-500 italic leading-relaxed mb-6 font-bold">
                    {diff.desc}
                  </p>

                  {/* Progress / Status */}
                  <div className="flex items-center gap-2 mt-auto">
                    {diff.isComingSoon ? (
                      <>
                        <Lock className="w-3 h-3 text-gray-600" />
                        <span className="text-[9px] font-black uppercase text-gray-600 tracking-widest">🚧 SEGERA HADIR 🚧</span>
                      </>
                    ) : (
                      <>
                        <div className={`w-1.5 h-1.5 rounded-full ${diff.completed === diff.levels ? 'bg-green-500' : `animate-pulse`}`}
                          style={{ backgroundColor: diff.completed === diff.levels ? '#22c55e' : diff.lineColor }}
                        />
                        <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">
                          Diselesaikan {diff.completed}/{diff.levels}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Star progress bar */}
                  {!diff.isComingSoon && (
                    <div className="mt-4 w-full bg-white/5 rounded-full h-1 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${diff.levels > 0 ? (diff.completed / diff.levels) * 100 : 0}%`,
                          backgroundColor: diff.lineColor,
                          boxShadow: `0 0 8px ${diff.lineColor}`
                        }}
                      />
                    </div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 flex justify-between items-center text-[9px] text-white/10 font-black border-t border-white/5 pt-6">
          <div className="flex items-center gap-2">
            <Zap className="w-3 h-3" />
            <span className="uppercase tracking-[0.2em] italic">Node: FORENSICS_INVESTIGATION // Grid: F-991</span>
          </div>
          <span className="uppercase tracking-tighter italic">CyberCamp Arena v1.4</span>
        </footer>
      </div>
    </div>
  );
};

export default IndexForensics;
