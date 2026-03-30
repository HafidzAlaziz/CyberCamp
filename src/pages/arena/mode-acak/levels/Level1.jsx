import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldAlert,
  Clock,
  Zap,
  ChevronLeft,
  X,
  Play,
  Globe,
  Terminal,
  Server,
  Target,
  Plus,
  Lock,
  Eye,
  EyeOff,
  Cpu,
  Activity
} from 'lucide-react';

const Level1 = () => {
  const navigate = useNavigate();
  
  // Timer Persistence Logic
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem('ctf_level1_time');
    return saved ? parseInt(saved) : 600;
  });

  const [stars, setStars] = useState(() => {
    const saved = localStorage.getItem('ctf_level1_stars');
    return saved ? parseInt(saved) : 3;
  });
  const [hasUsedHint, setHasUsedHint] = useState(() => {
    return localStorage.getItem('ctf_level1_hint_used') === 'true';
  });
  const [hasOvertimePenalty, setHasOvertimePenalty] = useState(() => {
    return localStorage.getItem('ctf_level1_overtime') === 'true';
  });

  const [flag, setFlag] = useState('');
  const [status, setStatus] = useState('active'); // 'active', 'wrong', 'decoy', 'complete'
  const [attempts, setAttempts] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [completionTime, setCompletionTime] = useState(null);
  const [showExitModal, setShowExitModal] = useState(false);

  // Mini-Browser Challenge States
  const [mockUsername, setMockUsername] = useState('');
  const [mockPassword, setMockPassword] = useState('');
  const [showMockPassword, setShowMockPassword] = useState(false);
  const [isMockLoggedIn, setIsMockLoggedIn] = useState(false);
  const [mockError, setMockError] = useState('');

  // SECURITY: Obfuscation & Decoys
  const generateRandomString = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // TRUE FLAG (Obfuscated in Base64)
  const [raw_f] = useState(() => `CTF{SECTOR_ALPHA_${generateRandomString(8)}}`);
  const [_0x_v_auth] = useState(() => btoa(raw_f)); // Base64 Encoded

  // DECOYS (Stored plainly to bait curious users)
  const [decoys] = useState([
    `CTF{DEBUG_MODE_ON_${generateRandomString(4)}}`,
    `CTF{TEMP_ACCESS_KEY_${generateRandomString(4)}}`,
    "CTF{HAMPIR_LOLOS_COBA_LAGI}",
    "CTF{DATABASE_RECOVERED_BETA}"
  ]);

  useEffect(() => {
    // ANTI-CHEAT: Console Warning & Bait
    console.log("%c STOP! ACCESSING SYSTEM MEMORY IS A PUNISHABLE OFFENSE IN SECTOR ALPHA.", "color: red; font-size: 20px; font-weight: bold; background: black; padding: 10px;");
    console.log("%c[SYSTEM] CACHED_FLAG_RECOVERY: " + decoys[0], "color: #06b6d4; font-family: monospace;");
    
    if (status !== 'complete') {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          const nextValue = prev - 1;
          localStorage.setItem('ctf_level1_time', nextValue.toString());
          if (nextValue < 0 && !hasOvertimePenalty) {
            setHasOvertimePenalty(true);
            localStorage.setItem('ctf_level1_overtime', 'true');
            setStars(s => {
              const newStars = Math.max(0, s - 1);
              localStorage.setItem('ctf_level1_stars', newStars.toString());
              return newStars;
            });
          }
          return nextValue;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status, hasOvertimePenalty, decoys]);

  const handleHintClick = () => {
    if (!showHint) {
      setShowHint(true);
      if (!hasUsedHint) {
        setHasUsedHint(true);
        localStorage.setItem('ctf_level1_hint_used', 'true');
        setStars(s => {
          const newStars = Math.max(0, s - 1);
          localStorage.setItem('ctf_level1_stars', newStars.toString());
          return newStars;
        });
      }
    } else {
      setShowHint(false);
    }
  };

  const handleMockAuthenticate = (e) => {
    e.preventDefault();
    setMockError('');
    if (mockUsername.includes("' OR '1'='1")) {
      setIsMockLoggedIn(true);
    } else {
      setMockError('INVALID_CREDENTIALS: ACCESS_DENIED_BY_FIREWALL');
      setTimeout(() => setMockError(''), 3000);
    }
  };

  const formatTime = (seconds) => {
    const isNegative = seconds < 0;
    const absSeconds = Math.abs(seconds);
    const mins = Math.floor(absSeconds / 60);
    const secs = absSeconds % 60;
    return `${isNegative ? '-' : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Compare decoded flag
    if (flag === atob(_0x_v_auth)) {
      const timeTaken = 600 - timeLeft;
      const timeTakenStr = formatTime(timeTaken);
      setCompletionTime(timeTakenStr);
      setStatus('complete');
      const savedStats = localStorage.getItem('ctf_mode_acak_stats');
      const stats = savedStats ? JSON.parse(savedStats) : {};
      const currentBestStars = stats[1]?.stars || 0;
      if (stars >= currentBestStars) {
         stats[1] = { stars: stars, bestTime: timeTakenStr };
         localStorage.setItem('ctf_mode_acak_stats', JSON.stringify(stats));
      }
      localStorage.removeItem('ctf_level1_time');
      localStorage.removeItem('ctf_level1_stars');
      localStorage.removeItem('ctf_level1_hint_used');
      localStorage.removeItem('ctf_level1_overtime');
    } else if (decoys.includes(flag)) {
      setStatus('decoy');
      setAttempts(prev => [...prev, flag]);
      setTimeout(() => setStatus('active'), 2000);
    } else {
      setStatus('wrong');
      setAttempts(prev => [...prev, flag]);
      setTimeout(() => setStatus('active'), 2000);
    }
    setFlag('');
  };

  const handleExit = () => {
    localStorage.removeItem('ctf_level1_time');
    localStorage.removeItem('ctf_level1_stars');
    localStorage.removeItem('ctf_level1_hint_used');
    localStorage.removeItem('ctf_level1_overtime');
    navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 1 } });
  };

  if (status === 'complete') {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 font-mono text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_70%)]" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="z-10 bg-gray-900 border-4 border-cyan-500 p-12 rounded-3xl text-center max-w-xl shadow-[0_0_50px_rgba(6,182,212,0.3)]">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-cyan-500/30">
            <Zap className="w-12 h-12 text-cyan-400 fill-cyan-400 drop-shadow-[0_0_10px_#06b6d4]" />
          </motion.div>
          <h1 className="text-5xl font-black italic tracking-tighter mb-2 text-white uppercase leading-none">MISSION COMPLETE</h1>
          <p className="text-cyan-500 font-bold tracking-[0.3em] mb-4 text-[10px]">SECTOR: ALPHA_RECON // CLEAN_SWEEP</p>
          <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-2xl py-6 px-10 mb-8 inline-block">
             <div className="text-[10px] font-black text-gray-500 tracking-[0.4em] uppercase mb-4">Misi terselesaikan dalam</div>
             <div className="text-4xl font-black text-white italic tracking-tighter mb-6">{completionTime}</div>
             <div className="flex justify-center gap-4">
               {[1, 2, 3].map(s => (
                 <Zap key={s} className={`w-10 h-10 transition-all duration-500 ${s <= stars ? 'text-cyan-400 fill-cyan-400 drop-shadow-[0_0_15px_#06b6d4]' : 'text-gray-800 fill-transparent'}`} />
               ))}
             </div>
          </div>
          <button onClick={() => navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 1 } })} className="w-full bg-cyan-500 text-black font-black py-4 rounded-xl hover:bg-cyan-400 transition-all text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(6,182,212,0.2)]">KEMBALI KE MAP TAKTIS</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-4 md:p-8 flex flex-col overflow-hidden relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #1e293b 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col relative z-10">
        {/* HEADER AREA */}
        <div className="flex justify-between items-start mb-8 relative">
          <div className="flex gap-4 items-start z-10">
            <button 
              onClick={() => setShowExitModal(true)} 
              className="mt-1 p-2 bg-gray-900 border border-cyan-500/30 rounded-xl hover:bg-cyan-500/20 text-gray-400 hover:text-cyan-400 transition-all group"
              title="Abort Mission"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_#06b6d4]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400/80">TARGET: SECTOR_ALPHA</span>
              </div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none shadow-cyan-500/20">
                LEVEL 1: <span className="text-cyan-500 drop-shadow-[0_0_10px_#06b6d4]">WEB EXPLOITATION</span>
              </h1>
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
             <div className="text-[8px] font-black text-gray-700 tracking-[0.5em] uppercase mb-2">RANK_EFFICIENCY</div>
             <div className="flex gap-3">
                {[1, 2, 3].map(s => (
                  <Zap key={s} className={`w-6 h-6 transition-all duration-700 ${s <= stars ? 'text-cyan-400 fill-cyan-400 drop-shadow-[0_0_10px_#06b6d4]' : 'text-white/10 fill-transparent opacity-20'}`} />
                ))}
             </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] font-black text-red-500/80 tracking-[0.3em] uppercase mb-1">REMAINING_TIME</div>
            <div className={`text-4xl font-black italic tracking-tighter transition-colors duration-500 ${timeLeft < 0 ? 'text-red-500' : timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-red-600'}`}>
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* LAYOUT */}
        <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
          
          {/* LEFT SIDE: BRIEFING */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <div className="bg-gray-950/50 border border-purple-500/30 rounded-2xl p-6 flex-1 flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-purple-500 shadow-[0_0_15px_#a855f7]" />
              <div className="flex items-center gap-3 mb-6">
                <ShieldAlert className="w-5 h-5 text-purple-400" />
                <h2 className="text-sm font-black text-purple-200 uppercase tracking-widest">BRIEFING MISI</h2>
              </div>
              <div className="text-xs leading-relaxed text-gray-400 overflow-y-auto pr-2 custom-scrollbar space-y-4 italic">
                <p>{" > "} Target: Portal Admin Rumah Sakit 'CareNet'</p>
                <p>{" > "} Intelligence: Sistem database menggunakan SQL legacy yang rentan terhadap bypass otentikasi.</p>
                <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-lg">
                   <p className="text-red-400 font-black tracking-tight uppercase mb-1 flex items-center gap-2">
                     <ShieldAlert className="w-3 h-3" /> SECURITY_LEAK_DETECTED
                   </p>
                   <p className="text-[9px] text-gray-600">Terdeteksi fragmen data tercecer di memori log sitem: <span className="text-red-400/50 select-all">{decoys[2]}</span></p>
                </div>
                <p>{" > "} Goal: Temukan titik masuk di halaman login admin dan jebol akses tanpa kredensial yang valid.</p>
                <p className="text-purple-300 font-bold">{" > "} Flag tersembunyi jauh di dalam response log sistem setelah bypass berhasil.</p>
              </div>
            </div>

            <button onClick={handleHintClick} className={`bg-purple-900/20 border rounded-xl p-4 flex items-center justify-center gap-3 group transition-all shadow-[0_0_20px_rgba(168,85,247,0.1)] ${showHint ? 'border-purple-400 bg-purple-900/40' : 'border-purple-500/40 hover:bg-purple-900/30'}`}>
              <Zap className={`w-4 h-4 transition-colors ${showHint ? 'text-purple-400 fill-purple-400' : 'text-purple-400'}`} />
              <span className="text-xs font-black text-purple-200 uppercase tracking-widest uppercase">{showHint ? 'HINT ACTIVE' : '💡 MINTA HINT BOS'}</span>
            </button>
            
            <AnimatePresence>
              {showHint && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-gray-900/50 border border-white/5 rounded-xl p-4 text-[10px] text-gray-500 italic uppercase leading-tight">
                  Coba gunakan payload klasik pada input username: <span className="text-purple-400">' OR '1'='1</span> -- atau periksa source code dengan teliti untuk menemukan nomor ID admin yang bocor.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CENTER: WORKSPACE */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            <div className="flex-1 bg-gray-950 border border-white/10 rounded-2xl flex flex-col overflow-hidden relative group shadow-2xl">
              
              <div className="h-10 bg-gray-900 border-b border-white/5 flex items-center px-4 gap-4">
                 <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                 </div>
                 <div className="flex-1 bg-black/40 rounded-md h-6 px-3 flex items-center gap-2 border border-white/5">
                    <Lock className="w-2.5 h-2.5 text-gray-600" />
                    <span className="text-[10px] text-gray-600 font-bold truncate tracking-tight uppercase">https://carenet-hospital.intranet/admin/portal</span>
                 </div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center p-8 bg-black relative overflow-hidden">
                 <div className="absolute inset-0 bg-cyan-500/5 opacity-20 pointer-events-none" />
                 
                 <AnimatePresence mode="wait">
                   {!isMockLoggedIn ? (
                     <motion.div key="login" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="w-full max-w-sm bg-gray-900/80 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl space-y-6 z-10">
                        <div className="text-center">
                           <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-3 border border-cyan-500/20">
                              <Plus className="w-6 h-6 text-cyan-400" />
                           </div>
                           <h3 className="text-lg font-black text-white italic tracking-tighter uppercase italic">CareNet Admin</h3>
                           <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.2em]">Secure Access Required</p>
                        </div>

                        {/* DECOY IN HTML COMMENT (Findable via Inspect) */}
                        <div 
                           className="hidden" 
                           dangerouslySetInnerHTML={{ __html: `<!-- TODO: REMOVE EMERGENCY DEBUG FLAG CTF{ALPHA_DBG_3921} --> <!-- SECRET_DECOY_STORAGE: CTF{HAMPIR_BOBOL_DATABASE} -->` }} 
                        />

                        <form onSubmit={handleMockAuthenticate} className="space-y-4">
                           <div className="space-y-1.5">
                              <div className="text-[8px] font-black text-gray-600 uppercase tracking-widest pl-1">Username / ID</div>
                              <input type="text" value={mockUsername} onChange={(e) => setMockUsername(e.target.value)} placeholder="Enter Username" className="w-full h-11 bg-black/60 border border-white/10 rounded-xl px-4 text-xs text-white placeholder:text-gray-800 focus:outline-none focus:border-cyan-500/50 transition-all font-mono" />
                           </div>
                           <div className="space-y-1.5">
                              <div className="text-[8px] font-black text-gray-600 uppercase tracking-widest pl-1">Password</div>
                              <div className="relative">
                                <input type={showMockPassword ? "text" : "password"} value={mockPassword} onChange={(e) => setMockPassword(e.target.value)} placeholder="••••••••" className="w-full h-11 bg-black/60 border border-white/10 rounded-xl px-4 text-xs text-white placeholder:text-gray-800 focus:outline-none focus:border-cyan-500/50 transition-all font-mono" />
                                <button type="button" onClick={() => setShowMockPassword(!showMockPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:text-cyan-400 text-gray-600 transition-colors">
                                  {showMockPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                              </div>
                           </div>
                           {mockError && <div className="text-[9px] text-red-500 font-black tracking-widest uppercase animate-pulse">{mockError}</div>}
                           <button type="submit" className="w-full h-11 bg-cyan-600/20 border border-cyan-500/30 rounded-xl flex items-center justify-center text-[10px] font-black text-cyan-400 hover:bg-cyan-600/30 uppercase tracking-[0.2em] transition-all">Authenticate System</button>
                        </form>
                     </motion.div>
                   ) : (
                     <motion.div key="admin" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md bg-gray-900 border border-cyan-500/30 p-8 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.1)] z-10">
                        <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                           <Cpu className="w-5 h-5 text-cyan-400" />
                           <div className="flex-1">
                              <h3 className="text-xs font-black text-white italic uppercase tracking-widest">ADMIN_PORTAL // DATABASE_ROOT</h3>
                              <div className="text-[8px] text-cyan-500 font-black animate-pulse uppercase">STATUS: BYPASS_SUCCESSFUL</div>
                           </div>
                        </div>
                        <div className="space-y-4">
                           <div className="bg-black/60 p-4 rounded-xl border border-white/5 space-y-2">
                              <div className="flex justify-between items-center text-[9px] font-black text-gray-600 uppercase tracking-widest italic">
                                 <span>System_Logs</span>
                                 <Activity className="w-3 h-3" />
                              </div>
                              <div className="text-[10px] text-gray-400 font-mono leading-relaxed overflow-hidden">
                                 <div>[INFO] Loading secure sector...</div>
                                 <div className="text-cyan-400">[FOUND] SECRET_KEY_REVEALED:</div>
                                 <div className="bg-cyan-500/10 p-3 rounded mt-2 border border-cyan-500/20 text-center select-all">
                                    <span className="text-cyan-400 font-black tracking-widest text-xs select-all">
                                       {atob(_0x_v_auth)}
                                    </span>
                                 </div>
                                 <div className="text-[8px] text-gray-700 italic mt-2 uppercase">-- COPY FLAG TERSEBUT DAN MASUKKAN DI PANEL BAWAH --</div>
                              </div>
                           </div>
                           <button onClick={() => setIsMockLoggedIn(false)} className="w-full py-2 text-[8px] font-black text-gray-700 hover:text-white transition-colors uppercase tracking-[0.3em]">[ LOGOUT_SESSION ]</button>
                        </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full -z-0" />
              </div>
            </div>

            {/* SUBMISSION */}
            <div className="bg-gray-900/40 border border-cyan-500/30 rounded-2xl p-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10"><Terminal className="w-12 h-12 text-cyan-400" /></div>
               <form onSubmit={handleSubmit} className="relative z-10 flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <input type="text" value={flag} onChange={(e) => setFlag(e.target.value)} placeholder="Masukkan flag di sini (CTF_{...})" className={`w-full bg-black/60 border-2 rounded-xl py-4 px-6 text-sm tracking-widest text-white placeholder:text-gray-700 focus:outline-none transition-all ${status === 'wrong' || status === 'decoy' ? 'border-red-500 shadow-[0_0_15px_#ef4444]' : 'border-cyan-500/40 focus:border-cyan-500 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)]'}`} />
                    <AnimatePresence>
                      {status === 'wrong' && <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-3 -right-3 bg-red-600 text-[8px] font-black italic px-3 py-1 rounded-full text-white shadow-lg uppercase">ACCESS DENIED</motion.div>}
                      {status === 'decoy' && <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-3 -right-3 bg-orange-600 text-[8px] font-black italic px-3 py-1 rounded-full text-white shadow-lg uppercase">DECOY DETECTED</motion.div>}
                    </AnimatePresence>
                  </div>
                  <button type="submit" className="bg-cyan-400 hover:bg-cyan-300 text-black font-black uppercase text-xs tracking-[0.2em] px-10 py-4 rounded-xl transition-all active:scale-95 shadow-[0_10px_30px_rgba(6,182,212,0.3)]">[ SUBMIT FLAG ]</button>
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
              <span className="text-cyan-500/50">{" > "} SYSTEM: OPERATIONAL</span>
              <span className="text-gray-800">//</span>
              <span>MODE: ACAK</span>
              <span className="text-gray-800">//</span>
              <span>LEVEL: 1</span>
           </div>
           <div className="text-[8px] font-bold uppercase tracking-tighter italic opacity-50">-- CORE_GRID_ESTABLISHED // TARGET_IN_SIGHT --</div>
        </div>

      </div>
      <AnimatePresence>
         {showExitModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex justify-center items-center p-4">
               <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.1)]">
                  <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500" />
                  <ShieldAlert className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
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

export default Level1;
