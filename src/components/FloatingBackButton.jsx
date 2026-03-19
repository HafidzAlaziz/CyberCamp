import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Home } from 'lucide-react';

const FloatingBackButton = () => {
  const location = useLocation();
  
  // Only show on module pages (not on the main academy/dashboard page)
  const isModulePage = location.pathname.startsWith('/academy/stage-1/');

  if (!isModulePage) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="fixed top-6 left-6 z-[60] pointer-events-auto"
      >
        <Link 
          to="/academy"
          state={{ expandedId: 'fundamental-it' }}
          className="flex items-center gap-3 bg-gray-900/40 backdrop-blur-xl border border-white/5 px-5 py-2.5 rounded-full text-[10px] font-black tracking-widest text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all group overflow-hidden relative"
        >
          {/* Subtle Scanline Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent,rgba(255,255,255,0.02),transparent)] animate-scanline pointer-events-none"></div>
          
          <div className="relative z-10 flex items-center gap-2">
            <div className="p-1.5 bg-white/5 rounded-full group-hover:bg-cyan-500/20 transition-colors border border-white/5 group-hover:border-cyan-500/30">
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
            <span className="hidden sm:inline uppercase">BACK_TO_HQ</span>
            <Home className="w-4 h-4 sm:hidden" />
          </div>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingBackButton;
