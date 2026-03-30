import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Terminal,
  Clock,
  Zap,
  ChevronLeft,
  X,
  Play,
  Command,
  Code,
  ShieldAlert,
  Activity,
  Lock,
  Search,
  Database,
  ChevronDown
} from 'lucide-react';

const Level5 = () => {
  const navigate = useNavigate();
  const terminalEndRef = useRef(null);
  
  // Timer Persistence Logic (720s / 12 Minutes)
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem('ctf_level5_time');
    return saved ? parseInt(saved) : 720;
  });

  const [stars, setStars] = useState(() => {
    const saved = localStorage.getItem('ctf_level5_stars');
    return saved ? parseInt(saved) : 3;
  });
  const [hasUsedHint, setHasUsedHint] = useState(() => {
    return localStorage.getItem('ctf_level5_hint_used') === 'true';
  });
  const [hasOvertimePenalty, setHasOvertimePenalty] = useState(() => {
    return localStorage.getItem('ctf_level5_overtime') === 'true';
  });

  const [flag, setFlag] = useState('');
  const [status, setStatus] = useState('active'); // 'active', 'wrong', 'decoy', 'complete'
  const [attempts, setAttempts] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [completionTime, setCompletionTime] = useState(null);
  const [showExitModal, setShowExitModal] = useState(false);
  
  // Terminal Simulator States
  const [history, setHistory] = useState([
    { type: 'output', content: 'CyberCamp Secure Terminal [v5.0.1]' },
    { type: 'output', content: 'Authorized login: guest@cybercamp' },
    { type: 'output', content: 'Type "help" for available commands.' },
    { type: 'output', content: '' }
  ]);
  const [currentDir, setCurrentDir] = useState('~');
  const [inputValue, setInputValue] = useState('');

  // SECURITY: Obfuscation & Content
  const [realFlag] = useState(() => atob("Q1RGe0wxbnV4X0gxZGQzbl9GMWwzc19GMHVuZH0=")); // CTF{L1nux_H1dd3n_F1l3s_F0und}
  const [decoyFlag] = useState(() => atob("Q1RGe1RoMXNfMXNfVDAwXzM0c3lfVHJ5X0g0cmQzcn0=")); // CTF{Th1s_1s_T00_34sy_Try_H4rd3r}
  
  const fs = {
    '~': {
      files: ['readme.txt', 'flag.txt'],
      hidden: ['.vault']
    },
    '~/.vault': {
      files: ['sys_config.bak'],
      hidden: []
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  useEffect(() => {
    // ANTI-CHEAT Console Warning
    console.log("%c[SYSTEM TERMINAL] ALERT: UNAUTHORIZED COMMAND LINE ACCESS LOGGED.", "color: #facc15; font-weight: bold; font-size: 16px; background: black; padding: 4px; border: 1px solid #facc15;");
    
    if (status !== 'complete') {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          const nextValue = prev - 1;
          localStorage.setItem('ctf_level5_time', nextValue.toString());
          if (nextValue < 0 && !hasOvertimePenalty) {
            setHasOvertimePenalty(true);
            localStorage.setItem('ctf_level5_overtime', 'true');
            setStars(s => {
              const newStars = Math.max(0, s - 1);
              localStorage.setItem('ctf_level5_stars', newStars.toString());
              return newStars;
            });
          }
          return nextValue;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status, hasOvertimePenalty]);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (seconds) => {
    const isNegative = seconds < 0;
    const absSeconds = Math.abs(seconds);
    const mins = Math.floor(absSeconds / 60);
    const secs = absSeconds % 60;
    return `${isNegative ? '-' : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCommand = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const cmd = inputValue.trim().toLowerCase();
    const args = cmd.split(' ');
    const mainCmd = args[0];

    // Add command to history
    setHistory(prev => [...prev, { type: 'input', content: `guest@cybercamp:${currentDir}$ ${inputValue}` }]);

    // Command Logic
    switch (mainCmd) {
      case 'help':
        setHistory(prev => [...prev, { type: 'output', content: 'Available commands: help, clear, whoami, ls, ls -a, cd [dir], cat [file]' }]);
        break;
      
      case 'whoami':
        setHistory(prev => [...prev, { type: 'output', content: 'guest' }]);
        break;

      case 'clear':
        setHistory([]);
        break;

      case 'ls':
        const isAll = args[1] === '-a';
        const currentFs = fs[currentDir];
        let entries = [...currentFs.files];
        if (isAll) entries = ['.', '..', ...currentFs.hidden, ...entries];
        setHistory(prev => [...prev, { type: 'output', content: entries.join('  ') }]);
        break;

      case 'cd':
        const target = args[1];
        if (!target || target === '~') {
          setCurrentDir('~');
        } else if (target === '..') {
          setCurrentDir('~');
        } else if (target === '.vault' && currentDir === '~') {
          setCurrentDir('~/.vault');
        } else if (target === '.vault' && currentDir === '~/.vault') {
          // Stay here
        } else {
          setHistory(prev => [...prev, { type: 'output', content: `cd: no such directory: ${target}` }]);
        }
        break;

      case 'cat':
        const file = args[1];
        if (!file) {
          setHistory(prev => [...prev, { type: 'output', content: 'usage: cat [file]' }]);
        } else if (currentDir === '~' && file === 'readme.txt') {
          setHistory(prev => [...prev, { type: 'output', content: 'Welcome guest. Access restricted. Confidential files moved to secure vault.' }]);
        } else if (currentDir === '~' && file === 'flag.txt') {
          setHistory(prev => [...prev, { type: 'output', content: decoyFlag }]);
        } else if (currentDir === '~/.vault' && file === 'sys_config.bak') {
          const content = [
            '# CyberCamp System Configuration',
            '# LAST_UPDATE: 2024-05-12',
            'NETWORK_IP=10.0.0.1',
            'ENCRYPTION_KEY=RSA_4096_OFF',
            `INTERNAL_SECRET_FLAG=${realFlag}`,
            'DB_SYNC=DISABLED'
          ];
          content.forEach(line => setHistory(prev => [...prev, { type: 'output', content: line }]));
        } else {
          setHistory(prev => [...prev, { type: 'output', content: `cat: ${file}: No such file or directory` }]);
        }
        break;

      default:
        setHistory(prev => [...prev, { type: 'output', content: `command not found: ${mainCmd}` }]);
    }

    setInputValue('');
  };

  const handleHintClick = () => {
    if (!showHint) {
      setShowHint(true);
      if (!hasUsedHint) {
        setHasUsedHint(true);
        localStorage.setItem('ctf_level5_hint_used', 'true');
        setStars(s => {
          const newStars = Math.max(0, s - 1);
          localStorage.setItem('ctf_level5_stars', newStars.toString());
          return newStars;
        });
      }
    } else {
      setShowHint(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputFlag = flag.trim();

    if (inputFlag === realFlag) {
      const timeTaken = 720 - timeLeft;
      const timeTakenStr = formatTime(timeTaken);
      setCompletionTime(timeTakenStr);
      setStatus('complete');
      
      const savedStats = localStorage.getItem('ctf_mode_acak_stats');
      const stats = savedStats ? JSON.parse(savedStats) : {};
      const currentBestStars = stats[5]?.stars || 0;
      if (stars >= currentBestStars) {
         stats[5] = { stars: stars, bestTime: timeTakenStr };
         localStorage.setItem('ctf_mode_acak_stats', JSON.stringify(stats));
      }
      localStorage.removeItem('ctf_level5_time');
      localStorage.removeItem('ctf_level5_stars');
      localStorage.removeItem('ctf_level5_hint_used');
      localStorage.removeItem('ctf_level5_overtime');
    } else if (inputFlag === decoyFlag) {
      setStatus('decoy');
      setAttempts(prev => [...prev, inputFlag]);
      setTimeout(() => setStatus('active'), 2000);
    } else if (inputFlag !== "") {
      setStatus('wrong');
      setAttempts(prev => [...prev, inputFlag]);
      setTimeout(() => setStatus('active'), 2000);
    }
    setFlag('');
  };

  const handleExit = () => {
    localStorage.removeItem('ctf_level5_time');
    localStorage.removeItem('ctf_level5_stars');
    localStorage.removeItem('ctf_level5_hint_used');
    localStorage.removeItem('ctf_level5_overtime');
    navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 5 } });
  };

  if (status === 'complete') {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 font-mono text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.1)_0%,transparent_70%)]" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="z-10 bg-gray-900 border-4 border-yellow-500 p-12 rounded-3xl text-center max-w-xl shadow-[0_0_50px_rgba(250,204,21,0.3)]">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-24 h-24 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-yellow-500/30">
            <Zap className="w-12 h-12 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_10px_#facc15]" />
          </motion.div>
          <h1 className="text-5xl font-black italic tracking-tighter mb-2 text-white uppercase leading-none">MISSION COMPLETE</h1>
          <p className="text-yellow-500 font-bold tracking-[0.3em] mb-4 text-[10px]">SECTOR: TERMINAL_CORE // ACCESS_GRANTED</p>
          <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-2xl py-6 px-10 mb-8 inline-block">
             <div className="text-[10px] font-black text-gray-500 tracking-[0.4em] uppercase mb-4">Misi terselesaikan dalam</div>
             <div className="text-4xl font-black text-white italic tracking-tighter mb-6">{completionTime}</div>
             <div className="flex justify-center gap-4">
                {[1, 2, 3].map(s => (
                  <Zap key={s} className={`w-10 h-10 transition-all duration-500 ${s <= stars ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_15px_#facc15]' : 'text-gray-800 fill-transparent'}`} />
                ))}
             </div>
          </div>
          <button onClick={() => navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 5 } })} className="w-full bg-yellow-500 text-black font-black py-4 rounded-xl hover:bg-yellow-400 transition-all text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(250,204,21,0.2)]">KEMBALI KE MAP TAKTIS</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-4 md:p-8 flex flex-col overflow-hidden relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #facc1510 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col relative z-10">
        
        {/* HEADER AREA */}
        <div className="flex justify-between items-start mb-8 relative">
          <div className="flex gap-4 items-start z-10">
            <button 
              onClick={() => setShowExitModal(true)} 
              className="mt-1 p-2 bg-gray-900 border border-yellow-500/30 rounded-xl hover:bg-yellow-500/20 text-gray-400 hover:text-yellow-400 transition-all group"
              title="Abort Mission"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse shadow-[0_0_8px_#facc15]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-yellow-400/80">TARGET: SECTOR_TERMINAL</span>
              </div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none shadow-yellow-500/20">
                LEVEL 5: <span className="text-yellow-500 drop-shadow-[0_0_10px_#facc15]">SYSTEM TERMINAL</span>
              </h1>
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
             <div className="text-[8px] font-black text-gray-700 tracking-[0.5em] uppercase mb-2">RANK_EFFICIENCY</div>
             <div className="flex gap-3">
                {[1, 2, 3].map(s => (
                  <Zap key={s} className={`w-6 h-6 transition-all duration-700 ${s <= stars ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_10px_#facc15]' : 'text-white/10 fill-transparent opacity-20'}`} />
                ))}
             </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] font-black text-red-500/80 tracking-[0.3em] uppercase mb-1">REMAINING_TIME</div>
            <div className={`text-4xl font-black italic tracking-tighter transition-colors duration-500 ${timeLeft < 0 ? 'text-red-500' : timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-yellow-600'}`}>
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* LAYOUT */}
        <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
          
          {/* LEFT SIDE: BRIEFING */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <div className="bg-gray-950/50 border border-yellow-500/30 rounded-2xl p-6 flex-1 flex flex-col relative overflow-hidden group shadow-[inset_0_0_20px_rgba(250,204,21,0.05)]">
              <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500 shadow-[0_0_15px_#facc15]" />
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="w-5 h-5 text-yellow-400" />
                <h2 className="text-sm font-black text-yellow-200 uppercase tracking-widest">BRIEFING MISI</h2>
              </div>
              <div className="text-xs leading-relaxed text-gray-400 overflow-y-auto pr-2 custom-scrollbar space-y-4 italic">
                <p>{" > "} Target: Server File System.</p>
                <p>{" > "} Intelligence: Lo berhasil mendapatkan akses ke terminal server Shadow Syndicate sebagai 'guest'. Tidak ada antarmuka grafis (GUI) di sini.</p>
                <p>{" > "} Tugas lo: Navigasi sistem file ini, cari file rahasia yang disembunyikan admin, dan baca isinya untuk mendapatkan Flag!</p>
                <div className="p-3 bg-yellow-950/20 border border-yellow-500/20 rounded-lg">
                   <p className="text-yellow-400 font-black tracking-tight uppercase mb-1 flex items-center gap-2">
                     <Command className="w-3 h-3" /> COMMAND_LOGIC
                   </p>
                   <p className="text-[9px] text-gray-600 uppercase italic">Ketik 'help' untuk melihat perintah. Ingat: File/folder tersembunyi diawali titik (.)</p>
                </div>
              </div>
            </div>

            <button onClick={handleHintClick} className={`bg-yellow-900/20 border rounded-xl p-4 flex items-center justify-center gap-3 group transition-all shadow-[0_0_20px_rgba(250,204,21,0.1)] ${showHint ? 'border-yellow-400 bg-yellow-900/40' : 'border-yellow-500/40 hover:bg-yellow-900/30'}`}>
              <Zap className={`w-4 h-4 transition-colors ${showHint ? 'text-yellow-400 fill-yellow-400' : 'text-yellow-400'}`} />
              <span className="text-xs font-black text-yellow-200 uppercase tracking-widest">{showHint ? 'HINT ACTIVE' : '💡 MINTA HINT BOS'}</span>
            </button>
            
            <AnimatePresence>
              {showHint && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-gray-900/50 border border-white/5 rounded-xl p-4 text-[10px] text-gray-500 italic uppercase leading-tight">
                  Linux menyimpan file tersembunyi dengan prefix titik. Perintah 'ls -a' mungkin berguna untuk menemukan folder rahasia.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CENTER: WORKSPACE (TERMINAL EMULATOR) */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6 min-h-0">
             <div className="flex-1 bg-black border border-yellow-500/20 rounded-2xl flex flex-col overflow-hidden relative group shadow-2xl">
                <div className="h-10 bg-gray-900/80 border-b border-white/5 flex items-center px-4 gap-4 backdrop-blur-md">
                   <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/50" />
                   </div>
                   <div className="flex items-center gap-2">
                      <Code className="w-3 h-3 text-yellow-500" />
                      <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Bash Terminal // guest@cybercamp</span>
                   </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 font-mono text-sm md:text-base selection:bg-yellow-500/30">
                   <div className="space-y-1">
                      {history.map((line, i) => (
                        <div key={i} className={line.type === 'input' ? 'text-white font-bold' : 'text-gray-400'}>
                          {line.content}
                        </div>
                      ))}
                      <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2">
                        <span className="text-yellow-500 font-bold">guest@cybercamp:{currentDir}$</span>
                        <input
                          type="text"
                          autoFocus
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          className="flex-1 bg-transparent border-none outline-none text-white caret-yellow-500"
                        />
                      </form>
                      <div ref={terminalEndRef} />
                   </div>
                </div>
                
                <div className="h-6 bg-gray-900/30 border-t border-white/5 flex items-center px-4 justify-between">
                   <div className="text-[7px] font-black text-gray-700 tracking-[0.2em]">TTY: pts/0 // TERM: xterm-256color</div>
                   <div className="text-[7px] font-black text-yellow-500/30 tracking-[0.2em]">CONNECTED_VIA_SSH_LEVEL_5</div>
                </div>
             </div>

             {/* SUBMISSION */}
             <div className="bg-gray-900/40 border border-yellow-500/30 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Terminal className="w-12 h-12 text-yellow-500" /></div>
                <form onSubmit={handleSubmit} className="relative z-10 flex flex-col md:flex-row gap-4">
                   <div className="flex-1 relative">
                     <input type="text" value={flag} onChange={(e) => setFlag(e.target.value)} placeholder="Masukkan flag di sini (CTF_{...})" className={`w-full bg-black/60 border-2 rounded-xl py-4 px-6 text-sm tracking-widest text-white placeholder:text-gray-700 focus:outline-none transition-all ${status === 'wrong' || status === 'decoy' ? 'border-red-500 shadow-[0_0_15px_#ef4444]' : 'border-yellow-500/40 focus:border-yellow-500 focus:shadow-[0_0_20px_rgba(250,204,21,0.2)]'}`} />
                     <AnimatePresence>
                       {status === 'wrong' && <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-3 -right-3 bg-red-600 text-[8px] font-black italic px-3 py-1 rounded-full text-white shadow-lg uppercase">ACCESS DENIED</motion.div>}
                       {status === 'decoy' && <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-3 -right-3 bg-yellow-600 text-[8px] font-black italic px-3 py-1 rounded-full text-black shadow-lg uppercase animate-bounce">DECOY DETECTED: Itu file pancingan!</motion.div>}
                     </AnimatePresence>
                   </div>
                   <button type="submit" className="bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase text-xs tracking-[0.2em] px-10 py-4 rounded-xl transition-all active:scale-95 shadow-[0_10px_30px_rgba(250,204,21,0.3)]">[ SUBMIT FLAG ]</button>
                </form>
                <div className="mt-6 flex flex-wrap gap-2">
                   {attempts.map((att, idx) => (
                     <span key={idx} className="text-[9px] font-bold text-gray-700 italic border border-gray-800 px-2 py-1 rounded line-through decoration-red-500/50">{att}</span>
                   ))}
                </div>
             </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-700">
           <div className="flex items-center gap-4 text-[9px] font-black tracking-widest">
              <span className="text-yellow-500/50">{" > "} SYSTEM: OPERATIONAL</span>
              <span className="text-gray-800">//</span>
              <span>MODE: ACAK</span>
              <span className="text-gray-800">//</span>
              <span>LEVEL: 5</span>
           </div>
           <div className="text-[8px] font-bold uppercase tracking-tighter italic opacity-50">-- CORE_GRID_ESTABLISHED // TERMINAL_SIM_READY --</div>
        </div>

      </div>
      <AnimatePresence>
         {showExitModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex justify-center items-center p-4">
               <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-gray-900 border border-yellow-500/30 rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden shadow-[0_0_40px_rgba(250,204,21,0.1)]">
                  <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500" />
                  <ShieldAlert className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-xl font-black text-white tracking-widest uppercase mb-2">ABORT MISSION?</h3>
                  <p className="text-sm text-gray-400 mb-8 font-sans">Anda yakin ingin keluar? Waktu akan terus berjalan dan progress misi Anda saat ini akan di-reset.</p>
                  <div className="flex gap-4">
                    <button onClick={() => setShowExitModal(false)} className="flex-1 py-3 bg-gray-800 text-white font-bold rounded-xl border border-white/5 hover:bg-gray-700 transition-colors">BATAL</button>
                    <button onClick={handleExit} className="flex-1 py-3 bg-red-500 text-white font-black uppercase tracking-widest rounded-xl hover:bg-red-400 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.3)]">KELUAR</button>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>

    </div>
  );
};

export default Level5;
