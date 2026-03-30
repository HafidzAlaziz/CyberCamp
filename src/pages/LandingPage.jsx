import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Target, Zap } from 'lucide-react';

const TiltCard = ({ children, colorClass, borderColor }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`group relative w-full max-w-3xl bg-[#161b22]/80 backdrop-blur-md border-2 ${borderColor} p-8 md:p-10 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]`}
    >
      <div style={{ transform: "translateZ(50px)" }} className="flex flex-col items-center text-center">
        {children}
      </div>
    </motion.div>
  );
};

const LandingPage = () => {
  const [time, setTime] = useState(new Date());

  // Persist User ID for the session to avoid flickering on re-renders
  const userId = useMemo(() => `STU_${Math.floor(Math.random() * 90) + 10}`, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col min-h-screen bg-[#020617] text-gray-300 font-mono items-center justify-center py-12 px-4 md:px-6 relative overflow-hidden selection:bg-cyan-500/30"
    >
      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[130px] rounded-full opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[130px] rounded-full opacity-60" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      <div className="max-w-[1400px] w-full flex-1 flex flex-col items-center justify-center relative z-20">
        
        {/* Hero Section */}
        <header className="flex flex-col items-center text-center mb-16 max-w-4xl w-full">
          <motion.div variants={itemVariants} className="mb-4">
            <span className="text-[10px] md:text-[11px] tracking-[0.8em] md:tracking-[1.2em] text-cyan-500/80 font-black uppercase drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] italic">
              [ System_Initialized ]
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white uppercase leading-none mb-6 italic"
            style={{ textShadow: '0 0 60px rgba(255,255,255,0.15), 0 0 100px rgba(6,182,212,0.1)' }}
          >
            CYBERCAMP
          </motion.h1>
          
          <motion.div 
            variants={itemVariants}
            className="relative mb-12"
          >
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full" />
            <div className="relative bg-gray-950/60 backdrop-blur-3xl border border-cyan-500/40 px-6 md:px-10 py-2.5 rounded-full">
              <h2 className="text-sm md:text-lg font-black tracking-[0.4em] md:tracking-[0.5em] text-cyan-400 uppercase italic">
                Hacker Training Ground
              </h2>
            </div>
          </motion.div>
  
          <motion.p 
            variants={itemVariants}
            className="max-w-md md:max-w-lg text-gray-500 text-[11px] md:text-sm font-black tracking-wider uppercase leading-relaxed italic border-l-2 border-cyan-500/20 pl-6 text-center md:text-left mx-auto opacity-70"
          >
            {">>"} Platform interaktif untuk belajar Cybersecurity dan simulasi Capture The Flag.
          </motion.p>
        </header>
  
        {/* Main Menu Cards */}
        <main className="flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-14 p-4 md:p-8 w-full max-w-5xl mb-20">
          {/* Card 1: Academy */}
          <motion.div variants={itemVariants} className="w-full">
            <Link to="/academy" className="block h-full transition-transform active:scale-95">
              <TiltCard colorClass="text-cyan-500" borderColor="border-cyan-500/20 hover:border-cyan-500/60">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                   <Target className="w-24 h-24 text-cyan-400" />
                </div>
                <div className="text-6xl md:text-7xl mb-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">📚</div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tighter uppercase italic">
                  Cyber Academy
                </h3>
                <p className="text-gray-500 text-[10px] md:text-xs mb-10 font-black tracking-[0.1em] uppercase italic opacity-80 max-w-[200px]">
                  Fundamental IT, OS Hardening, & Network Security.
                </p>
                <div className="w-full bg-cyan-500 hover:bg-white text-black py-4 font-black text-[10px] tracking-[0.3em] uppercase italic transition-all shadow-[0_10px_30px_rgba(6,182,212,0.3)] rounded-xl">
                  Mulai Belajar
                </div>
                <div className="absolute top-0 left-0 w-4 h-1.5 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                <div className="absolute -bottom-1 right-12 w-12 h-0.5 bg-cyan-500/30" />
              </TiltCard>
            </Link>
          </motion.div>
  
          {/* Card 2: CTF Arena */}
          <motion.div variants={itemVariants} className="w-full">
            <Link to="/ctf-arena" className="block h-full transition-transform active:scale-95">
              <TiltCard colorClass="text-rose-500" borderColor="border-rose-500/20 hover:border-rose-500/60">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                   <Zap className="w-24 h-24 text-rose-500" />
                </div>
                <div className="text-6xl md:text-7xl mb-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">🚩</div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tighter uppercase italic">
                  CTF Arena
                </h3>
                <p className="text-gray-500 text-[10px] md:text-xs mb-10 font-black tracking-[0.1em] uppercase italic opacity-80 max-w-[200px]">
                  Offensive Security, Scripting, & Vulnerability Exploit.
                </p>
                <div className="w-full bg-rose-600 hover:bg-white text-white hover:text-rose-600 py-4 font-black text-[10px] tracking-[0.3em] uppercase italic transition-all shadow-[0_10px_30px_rgba(244,63,94,0.3)] rounded-xl">
                  Masuk Arena
                </div>
                <div className="absolute top-0 left-0 w-4 h-1.5 bg-rose-600 shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
                <div className="absolute -bottom-1 right-12 w-12 h-0.5 bg-rose-600/30" />
              </TiltCard>
            </Link>
          </motion.div>
        </main>
  
        {/* Status Footer */}
        <footer className="w-full py-12 px-6 mt-auto border-t border-white/5 bg-gray-950/20">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.4em] italic text-gray-700">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              <span className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
                System_Status: <span className="text-emerald-500">Online</span>
              </span>
              <span>Enc: <span className="text-cyan-600/60">AES-256</span></span>
              <span>Node: <span className="text-gray-500">Asia-S1</span></span>
            </div>
            <div className="flex items-center gap-6 opacity-40">
              <span>Terminal_Access</span>
              <span className="text-gray-800">|</span>
              <span>User_ID: {userId}</span>
              <span className="text-gray-800">|</span>
              <span>{time.toLocaleTimeString()}</span>
            </div>
          </div>
        </footer>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent pointer-events-none" />
    </motion.div>
  );
};

export default LandingPage;
