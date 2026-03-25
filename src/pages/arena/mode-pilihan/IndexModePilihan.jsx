import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  Globe, 
  Key, 
  Search, 
  Settings, 
  Link as LinkIcon,
  Terminal
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 'web',
    title: 'Web Exploitation',
    icon: <Globe className="w-8 h-8" />,
    desc: 'Cari celah XSS, SQLi, dan bypass otentikasi pada aplikasi web.',
    color: 'border-cyan-500 shadow-cyan-500/20 text-cyan-400',
    path: '/ctf-arena/web'
  },
  {
    id: 'crypto',
    title: 'Cryptography',
    icon: <Key className="w-8 h-8" />,
    desc: 'Pecahkan kode rahasia, enkripsi klasik, dan modern cipher.',
    color: 'border-yellow-500 shadow-yellow-500/20 text-yellow-500',
    path: '#'
  },
  {
    id: 'forensics',
    title: 'Digital Forensics',
    icon: <Search className="w-8 h-8" />,
    desc: 'Analisis steganografi, file network capture, dan metadata.',
    color: 'border-yellow-500 shadow-yellow-500/20 text-yellow-500',
    path: '#'
  },
  {
    id: 'reveng',
    title: 'Reverse Engineering',
    icon: <Settings className="w-8 h-8" />,
    desc: 'Bongkar malware dan pahami struktur assembly x86.',
    color: 'border-purple-500 shadow-purple-500/20 text-purple-500',
    path: '#'
  },
  {
    id: 'blockchain',
    title: 'Blockchain Hack',
    icon: <LinkIcon className="w-8 h-8" />,
    desc: 'Eksploitasi smart contract dan kerentanan Web3.',
    color: 'border-teal-500 shadow-teal-500/20 text-teal-400',
    path: '#'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  },
  exit: { y: -20, opacity: 0 }
};

const IndexModePilihan = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gray-950 text-white font-mono overflow-hidden p-6 md:p-10">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,#00ffff15,transparent)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col min-h-full">
        {/* Header */}
        <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-cyan-500 animate-pulse"></div>
            <div className="text-xs tracking-widest uppercase">
              <span className="text-gray-500">CTF ARENA //</span> 
              <span className="text-cyan-400 ml-1">SELECT CATEGORY</span>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/ctf-arena')}
            className="flex items-center gap-2 text-xs uppercase tracking-tighter hover:text-cyan-400 transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>KEMBALI</span>
          </button>
        </header>

        <motion.main 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex-1"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase whitespace-nowrap">
              PILIH <span className="text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)]">KATEGORI</span> PERETASAN
            </h1>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {categories.map((cat) => (
              <motion.div
                key={cat.id}
                variants={itemVariants}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
                }}
                className={`relative p-6 rounded-2xl border-2 bg-gray-900/80 backdrop-blur-md transition-all cursor-pointer overflow-hidden group ${cat.color}`}
                onClick={() => cat.path !== '#' && navigate(cat.path)}
              >
                {/* Background Icon Watermark */}
                <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                   {cat.icon}
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">{cat.title}</h3>
                    <div className="h-0.5 w-12 bg-current mt-1 opacity-50 group-hover:w-full transition-all duration-500"></div>
                  </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {cat.desc}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-widest text-white/40">Level: Intermediate</span>
                  {cat.path !== '#' ? (
                    <div className="flex items-center gap-2 text-xs font-bold uppercase group-hover:translate-x-1 transition-transform">
                      <span>MULAI</span>
                      <ChevronLeft className="w-4 h-4 rotate-180" />
                    </div>
                  ) : (
                    <span className="text-[10px] italic text-white/20">Coming Soon</span>
                  )}
                </div>

                {/* Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.1)_2px,rgba(255,255,255,0.1)_4px)] transition-opacity"></div>
              </motion.div>
            ))}
          </div>
        </motion.main>

        {/* Footer Status */}
        <footer className="mt-12 flex justify-between items-center text-[10px] text-gray-500 border-t border-white/5 pt-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-3 h-3 text-cyan-400" />
            <span className="animate-pulse tracking-widest uppercase">System Operational // Level 3 Security</span>
          </div>
          <div className="tracking-tighter uppercase italic">
            CyberCamp Arena v1.0.4-beta
          </div>
        </footer>
      </div>
    </div>
  );
};

export default IndexModePilihan;
