import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import LearningDashboard from './pages/LearningDashboard';
import { Terminal, ShieldAlert } from 'lucide-react';

// Temporary Page Component for CTF Arena
const CTFArena = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.05 }}
    transition={{ duration: 0.4 }}
    className="flex flex-col items-center justify-center p-8 text-center min-h-[80vh]"
  >
    <div className="relative mb-8">
      <ShieldAlert className="w-24 h-24 text-cyber-cyan animate-pulse" />
      <div className="absolute inset-0 bg-cyber-cyan/20 blur-xl rounded-full" />
    </div>
    <h1 className="text-4xl font-bold text-white mb-4 tracking-tighter">
      CTF_ARENA <span className="text-cyber-cyan text-glow-cyan text-shadow-[0_0_10px_#00ffff]">[OFFLINE]</span>
    </h1>
    <div className="max-w-md p-6 border border-cyber-cyan/30 bg-[#161b22] rounded-lg relative overflow-hidden">
      {/* Glitch sub-background */}
      <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#00ffff_2px,#00ffff_4px)]" />
      <p className="relative z-10 text-gray-400 text-sm mb-6 leading-relaxed">
        Halaman CTF Arena sedang dalam tahap pembangunan. Koneksi ke server simulasi belum terjalin.
      </p>
      <div className="relative z-10 flex items-center gap-2 justify-center text-cyber-cyan text-xs">
        <Terminal className="w-4 h-4" />
        <span className="animate-pulse">WAITING_FOR_ADMIN_DEPLOYMENT...</span>
      </div>
    </div>
    <Link 
      to="/" 
      className="mt-10 text-cyan-400 hover:text-white border-b border-cyan-400 transition-colors uppercase tracking-widest text-xs"
    >
      RETURN TO SECTOR 0 (HOME)
    </Link>
  </motion.div>
);

import MainLayout from './components/MainLayout';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/academy" element={<LearningDashboard />} />
        <Route path="/ctf-arena" element={<CTFArena />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <MainLayout>
        <AnimatedRoutes />
      </MainLayout>
    </Router>
  );
}

export default App;
