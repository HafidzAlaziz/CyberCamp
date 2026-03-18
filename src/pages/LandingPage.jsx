import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

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
      className="flex flex-col min-h-screen items-center justify-center py-12 px-4 md:px-6"
    >
      {/* Hero Section */}
      <header className="flex flex-col items-center text-center mb-16 max-w-4xl w-full">
        <motion.div variants={itemVariants} className="mb-2">
          <span className="text-[9px] md:text-[10px] tracking-[0.6em] md:tracking-[1em] text-cyan-400 font-bold uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
            [ SYSTEM_INITIALIZED ]
          </span>
        </motion.div>
        
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white uppercase leading-none drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] mb-3"
        >
          CYBERCAMP
        </motion.h1>
        
        <motion.div 
          variants={itemVariants}
          className="bg-cyan-500/10 border border-cyan-500/40 px-4 md:px-6 py-1.5 mb-8"
        >
          <h2 className="text-base md:text-xl font-bold tracking-[0.2em] md:tracking-[0.3em] text-cyan-400 uppercase">
            HACKER TRAINING GROUND
          </h2>
        </motion.div>

        <motion.p 
          variants={itemVariants}
          className="max-w-md md:max-w-xl text-gray-400 text-xs md:text-base font-medium leading-relaxed italic border-l-2 border-cyan-500/20 pl-4 text-center md:text-left mx-auto"
        >
          "Platform interaktif untuk belajar Cybersecurity dan simulasi CTF."
        </motion.p>
      </header>

      {/* Main Menu Cards */}
      <main className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 p-4 md:p-8 max-w-[1600px] w-full mb-20">
        {/* Card 1: Academy */}
        <motion.div variants={itemVariants} className="w-full flex justify-center">
          <TiltCard colorClass="text-cyan-500" borderColor="border-[#30363d] hover:border-cyan-500/50">
            <motion.div 
              whileHover={{ rotate: [-2, 2, -2, 0], scale: 1.05 }}
              className="text-6xl md:text-8xl mb-6 select-none"
            >
              📚
            </motion.div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight uppercase">
              CYBER ACADEMY
            </h3>
            <p className="text-gray-400 text-xs md:text-sm mb-8 font-medium px-4">
              Pelajari fundamental IT, Jaringan, dan Keamanan dari nol.
            </p>
            <motion.div whileTap={{ scale: 0.95 }} className="w-full px-4">
              <Link 
                to="/academy" 
                className="block w-full py-4 bg-cyan-500 text-black text-xs md:text-sm font-black tracking-widest uppercase transition-all duration-300 hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                MULAI BELAJAR
              </Link>
            </motion.div>
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-500/30" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-500/30" />
          </TiltCard>
        </motion.div>

        {/* Card 2: CTF Arena */}
        <motion.div variants={itemVariants} className="w-full flex justify-center">
          <TiltCard colorClass="text-rose-500" borderColor="border-[#30363d] hover:border-rose-500/50">
            <motion.div 
              whileHover={{ rotate: [2, -2, 2, 0], scale: 1.05 }}
              className="text-6xl md:text-8xl mb-6 select-none"
            >
              🏴‍☠️
            </motion.div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight uppercase">
              CTF ARENA
            </h3>
            <p className="text-gray-400 text-xs md:text-sm mb-8 font-medium px-4">
              Simulasi peretasan server nyata dan tantangan Capture The Flag.
            </p>
            <motion.div whileTap={{ scale: 0.95 }} className="w-full px-4">
              <Link 
                to="/ctf-arena" 
                className="block w-full py-4 bg-[#ff2d55] text-white text-xs md:text-sm font-black tracking-widest uppercase transition-all duration-300 hover:bg-[#ff4d74] hover:shadow-[0_0_20px_rgba(255,45,85,0.4)]"
              >
                MASUK ARENA
              </Link>
            </motion.div>
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-rose-500/30" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-rose-500/30" />
          </TiltCard>
        </motion.div>
      </main>

      {/* Status Footer */}
      <footer className="w-full py-10 px-4 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-6 text-[8px] md:text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] md:tracking-[0.4em]">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_6px_#22c55e]"></span>
              SYSTEM_STATUS: <span className="text-green-500">ONLINE</span>
            </span>
            <span>ENC: <span className="text-cyan-400">AES-256</span></span>
            <span>NODE: <span className="text-white">ASIA-S1</span></span>
          </div>
          <div className="text-gray-600 text-[8px] md:text-[9px] text-center md:text-right font-mono">
            TERMINAL_ACCESS // USER_ID: {userId} // {time.toLocaleTimeString()}
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default LandingPage;
