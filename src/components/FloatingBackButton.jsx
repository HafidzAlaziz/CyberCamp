import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Home } from 'lucide-react';

const FloatingBackButton = () => {
  const location = useLocation();
  
  // Show on Stage 1, Stage 2, and Stage 3 module pages
  const isModulePage = 
    location.pathname.startsWith('/academy/stage-1/') || 
    location.pathname.startsWith('/academy/stage-2/') ||
    location.pathname.startsWith('/academy/stage-3/') ||
    location.pathname.startsWith('/academy/stage-4/');
  
  // Determine which category to expand in the dashboard
  let expandedId = 'fundamental-it';
  if (location.pathname.startsWith('/academy/stage-2/')) expandedId = 'operating-systems';
  if (location.pathname.startsWith('/academy/stage-3/')) expandedId = 'networking';
  if (location.pathname.startsWith('/academy/stage-4/')) expandedId = 'security-skills';

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
          state={{ expandedId }}
          className="flex items-center gap-3 bg-gray-900/40 backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-full text-[9px] font-black tracking-[0.2em] text-gray-400 hover:text-white hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all group overflow-hidden relative"
        >
          {/* Subtle Scanline Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent,rgba(255,255,255,0.01),transparent)] animate-scanline pointer-events-none"></div>
          
          <div className="relative z-10 flex items-center gap-2">
            <div className="p-1.5 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors border border-white/5 group-hover:border-white/10">
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
            <span className="hidden sm:inline uppercase tracking-widest">BACK_TO_HQ</span>
            <Home className="w-4 h-4 sm:hidden" />
          </div>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingBackButton;
