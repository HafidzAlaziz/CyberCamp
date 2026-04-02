import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Database,
  ChevronLeft,
  X,
  Zap,
  Terminal,
  ShieldAlert,
  Search,
  ServerCrash,
  User,
  Key,
  Lock,
  RefreshCw
} from 'lucide-react';

const MudahLevel8 = () => {
  const navigate = useNavigate();
  
  // Timer Logic
  const [elapsed, setElapsed] = useState(0);

  const [hasUsedHint, setHasUsedHint] = useState(() => {
    return localStorage.getItem('ctf_mudah_level8_hint_used') === 'true';
  });

  // Calculate dynamic stars
  const timeLimit = 600; // 10 minutes
  const isTimeFailed = elapsed > timeLimit;
  const hintPenalty = hasUsedHint ? 1 : 0;
  const timePenalty = isTimeFailed ? 1 : 0;
  const stars = Math.max(1, 3 - hintPenalty - timePenalty);

  const [flag, setFlag] = useState('');
  const [status, setStatus] = useState('active'); 
  const [attempts, setAttempts] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [completionTime, setCompletionTime] = useState(null);
  const [showExitModal, setShowExitModal] = useState(false);

  // Challenge specifics
  const [viewMode, setViewMode] = useState('login'); // 'login', 'loading', 'crashed'
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Challenge Config - ANTI CHEAT via atob
  const [realFlag] = useState(() => atob("Q1RGe1MxbXBsM19TUUxfRXJyMHJ9")); // CTF{S1mpl3_SQL_Err0r}
  const [decoyFlag] = useState(() => atob("Q1RGe0Y0azNfU1FMX0luajNjdDEwbn0=")); // CTF{F4k3_SQL_Inj3ct10n}

  useEffect(() => {
    if (status !== 'complete') {
      const timer = setInterval(() => {
        setElapsed(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginForm.username && !loginForm.password) return;
    
    setViewMode('loading');
    setLoginError('');
    
    setTimeout(() => {
      const u = loginForm.username;
      const p = loginForm.password;
      // SQL Error Trigger Condition
      if (u.includes("'") || u.includes('"') || p.includes("'") || p.includes('"')) {
        setViewMode('crashed');
      } else {
         setViewMode('login');
         setLoginError('Invalid Administrator Credentials.');
      }
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanFlag = flag.trim();
    if (cleanFlag === realFlag) {
      const timeTakenStr = formatTime(elapsed);
      setCompletionTime(timeTakenStr);
      setStatus('complete');
      
      const savedStats = localStorage.getItem('ctf_mode_acak_stats');
      const stats = savedStats ? JSON.parse(savedStats) : {};
      const currentBestStars = stats['mudah-8']?.stars || 0;
      if (stars >= currentBestStars) {
         stats['mudah-8'] = { stars: stars, bestTime: timeTakenStr, conditions: [true, !hasUsedHint, !isTimeFailed] };
         localStorage.setItem('ctf_mode_acak_stats', JSON.stringify(stats));
      }
      localStorage.removeItem('ctf_mudah_level8_hint_used');
    } else if (cleanFlag === decoyFlag) {
      setStatus('decoy');
      setAttempts(prev => [...prev, cleanFlag]);
      setTimeout(() => setStatus('active'), 2000);
    } else if (cleanFlag !== "") {
      setStatus('wrong');
      setAttempts(prev => [...prev, cleanFlag]);
      setTimeout(() => setStatus('active'), 2000);
    }
    setFlag('');
  };

  const handleExit = () => {
    localStorage.removeItem('ctf_mudah_level8_hint_used');
    navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 'mudah-8' } });
  };

  if (status === 'complete') {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 font-mono text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_70%)]" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="z-10 bg-gray-900 border-4 border-cyan-500 p-12 rounded-3xl text-center max-w-xl shadow-[0_0_50px_rgba(6,182,212,0.3)]">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-cyan-500/30">
            <Database className="w-12 h-12 text-cyan-400 drop-shadow-[0_0_10px_#06b6d4]" />
          </motion.div>
          <h1 className="text-5xl font-black italic tracking-tighter mb-2 text-white uppercase leading-none">MISSION COMPLETE</h1>
          <p className="text-cyan-500 font-bold tracking-[0.3em] mb-4 text-[10px]">SECTOR: DATABASE // SQL_INJECTED</p>
          <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-2xl py-6 px-10 mb-8 inline-block">
             <div className="text-[10px] font-black text-gray-500 tracking-[0.4em] uppercase mb-4">Misi terselesaikan dalam</div>
             <div className="text-4xl font-black text-white italic tracking-tighter mb-6">{completionTime}</div>
             <div className="flex justify-center gap-4">
               {[1, 2, 3].map(s => (
                 <Zap key={s} className={`w-10 h-10 transition-all duration-500 ${s <= stars ? 'text-cyan-400 fill-cyan-400 drop-shadow-[0_0_15px_#06b6d4]' : 'text-gray-800 fill-transparent'}`} />
               ))}
             </div>
          </div>
          <button onClick={() => navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 'mudah-8' } })} className="w-full bg-cyan-500 text-black font-black py-4 rounded-xl hover:bg-cyan-400 transition-all text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(6,182,212,0.2)]">KEMBALI KE MAP TAKTIS</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-4 md:p-8 flex flex-col overflow-hidden relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #1e1b4b 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
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
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400/80">TARGET: SECTOR_DATABASE</span>
              </div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none shadow-cyan-500/20">
                LEVEL 8: <span className="text-cyan-500 drop-shadow-[0_0_10px_#06b6d4]">INFILTRASI DATABASE</span>
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
            <div className="text-[10px] font-black text-cyan-500/50 tracking-[0.3em] uppercase mb-1">ELAPSED_TIME</div>
            <div className="text-4xl font-black italic tracking-tighter transition-colors duration-500 text-cyan-600">
              {formatTime(elapsed)}
            </div>
          </div>
        </div>

        {/* LAYOUT */}
        <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
          
          {/* LEFT SIDE: BRIEFING */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <div className="bg-gray-950/50 border border-cyan-500/30 rounded-2xl p-6 flex-1 flex flex-col relative overflow-hidden group shadow-[inset_0_0_20px_rgba(6,182,212,0.05)]">
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 shadow-[0_0_15px_#06b6d4]" />
              <div className="flex items-center gap-3 mb-6">
                <Database className="w-5 h-5 text-cyan-400" />
                <h2 className="text-sm font-black text-cyan-200 uppercase tracking-widest">BRIEFING MISI</h2>
              </div>
              <div className="text-xs leading-relaxed text-gray-400 overflow-y-auto pr-2 custom-scrollbar space-y-4 italic">
                <p>{" > "} Target: Portal Admin Internal (Legacy System).</p>
                <p>{" > "} Intelligence: Situs web ini menggunakan metode kueri SQL lawas secara mentah tanpa validasi *input* (Sanitasi). Mereka juga ceroboh karena mengembalikan pesan *error* teknis langsung ke layar pengguna.</p>
                <p>{" > "} Tugas lo: Cobalah masuk ke dalam sistem. Picu suatu malfungsi *syntax* pada form otentikasi di layar kanan untuk memprovokasi *Internal Server Error* dan membongkar kerangka tabel *Database*-nya.</p>
                <div className="p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-lg mt-4">
                   <p className="text-cyan-400 font-black tracking-tight uppercase mb-1 flex items-center gap-2">
                     <ServerCrash className="w-3 h-3" /> ANALISIS ERROR LOG
                   </p>
                   <p className="text-[9px] text-gray-600 uppercase normal-case">Teknik memicu kesalahan paksa (*Error-Based SQL Injection*) pada sistem target untuk mengekstraksi struktur kueri yang disembunyikan *backend*.</p>
                </div>
              </div>
            </div>

            <button 
                onClick={() => {
                  if (!hasUsedHint) {
                    setHasUsedHint(true);
                    localStorage.setItem('ctf_mudah_level8_hint_used', 'true');
                  }
                  setShowHint(!showHint);
                }} 
                className={`border rounded-xl p-4 flex items-center justify-center gap-3 group transition-all shadow-[0_0_20px_rgba(6,182,212,0.1)] ${hasUsedHint ? 'border-cyan-400 bg-cyan-950/40 text-cyan-400' : 'border-cyan-500/40 bg-cyan-950/20 hover:bg-cyan-950/30 text-cyan-200'}`}
            >
              <Zap className={`w-4 h-4 transition-colors ${hasUsedHint ? 'fill-cyan-400' : ''}`} />
              <span className="text-xs font-black uppercase tracking-widest">{hasUsedHint ? 'HINT ACTIVE (-1 BINTANG)' : '💡 MINTA KLU (-1 BINTANG)'}</span>
            </button>
            
            <AnimatePresence>
              {showHint && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-gray-900/50 border border-white/5 rounded-xl p-4 text-[10px] text-gray-500 italic uppercase leading-tight overflow-hidden mt-3">
                  Perhatikan susunan klausa <span className="text-cyan-400 font-mono text-[9px]">WHERE</span> dalam Query SQL yang crash. Jika input bocor ke log, biasanya flag tersemat sebagai parameter perbandingan tersembunyi. 
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CENTER: WORKSPACE */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            <div className="flex-1 bg-black border border-cyan-500/20 rounded-2xl flex flex-col overflow-hidden relative group shadow-2xl">
              
              <div className={`h-10 bg-gray-900/80 border-b flex items-center px-4 gap-4 backdrop-blur-md transition-colors duration-500 ${viewMode === 'crashed' ? 'border-red-500/30' : 'border-white/10'}`}>
                 <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                 </div>
                 <div className="flex items-center gap-2">
                    {viewMode === 'crashed' ? (
                       <><ServerCrash className="w-3 h-3 text-red-500" /> <span className="text-[10px] text-red-500 font-bold tracking-widest uppercase">CRITICAL SYSTEM FAILURE</span></>
                    ) : (
                       <><Lock className="w-3 h-3 text-cyan-500" /> <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Shadow Portal v1.0</span></>
                    )}
                 </div>
              </div>

              <div className="flex-1 p-6 font-mono text-[11px] md:text-sm overflow-y-auto custom-scrollbar select-text flex flex-col">
                 <AnimatePresence mode="wait">
                    {viewMode === 'login' && (
                       <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-full w-full flex flex-col items-center justify-center py-4 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)]">
                           <div className="w-full max-w-sm bg-gray-950 border border-white/10 rounded-2xl p-6 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
                               <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500" />
                               <div className="text-center mb-6">
                                  <div className="w-12 h-12 bg-cyan-950/30 rounded-full flex items-center justify-center mx-auto mb-3 border border-cyan-500/20">
                                     <User className="w-6 h-6 text-cyan-500" />
                                  </div>
                                  <h3 className="text-lg font-bold text-white tracking-widest">ADMIN PORTAL</h3>
                                  <p className="text-[9px] text-gray-500 uppercase tracking-widest mt-1">Authorized Personnel Only</p>
                               </div>

                               {loginError && (
                                   <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-[10px] text-red-400 text-center tracking-widest shadow-[0_0_10px_rgba(239,68,68,0.1)]">
                                       {loginError}
                                   </motion.div>
                               )}

                               <form onSubmit={handleLoginSubmit} className="space-y-3">
                                   <div>
                                       <div className="relative group">
                                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                                          <input type="text" value={loginForm.username} onChange={(e) => setLoginForm({...loginForm, username: e.target.value})} placeholder="Username" className="w-full bg-gray-900 border border-gray-800 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors shadow-inner" />
                                       </div>
                                   </div>
                                   <div>
                                       <div className="relative group">
                                          <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                                          <input type="password" value={loginForm.password} onChange={(e) => setLoginForm({...loginForm, password: e.target.value})} placeholder="Password" className="w-full bg-gray-900 border border-gray-800 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors shadow-inner" />
                                       </div>
                                   </div>
                                   <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-[0.2em] py-3 rounded-xl transition-all shadow-[0_5px_20px_rgba(6,182,212,0.2)] text-xs mt-2">Secure Login</button>
                               </form>
                           </div>
                       </motion.div>
                    )}

                    {viewMode === 'loading' && (
                       <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-full w-full flex flex-col items-center justify-center text-cyan-500">
                           <RefreshCw className="w-8 h-8 animate-spin mb-4" />
                           <div className="text-[10px] font-black uppercase tracking-[0.3em] overflow-hidden whitespace-nowrap border-r-2 border-cyan-500 pr-1 animate-pulse">Authenticating Payload...</div>
                       </motion.div>
                    )}

                    {viewMode === 'crashed' && (
                       <motion.div key="error" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4 w-full pb-8">
                           <div className="flex justify-between items-start border-b border-red-500/20 pb-4 mb-4">
                               <div>
                                   <div className="text-red-500 font-bold text-lg mb-1 flex items-center gap-2"><ServerCrash className="w-5 h-5" /> Internal Server Error 500</div>
                                   <div className="text-gray-400 text-xs text-left">Uncaught Database Exception</div>
                               </div>
                               <button onClick={() => { setViewMode('login'); setLoginForm({username:'', password:''}); setLoginError(''); }} className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 border border-white/10 rounded text-[10px] text-gray-400 uppercase tracking-widest transition-colors flex items-center gap-2">
                                  <RefreshCw className="w-3 h-3" /> Reboot
                               </button>
                           </div>
                           
                           <div className="text-gray-300 text-left">
                               <span className="text-gray-500">Timestamp:</span> {new Date().toISOString()}<br/>
                               <span className="text-gray-500">Route:</span> /api/v1/auth/login<br/>
                               <span className="text-gray-500">Environment:</span> Production
                           </div>
                           <div className="bg-red-950/30 border border-red-500/20 p-4 rounded text-red-300 text-xs break-all leading-relaxed font-mono text-left">
                               <b>Error:</b> ER_PARSE_ERROR: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'AND is_active = 1' at line 1.
                           </div>
                           <div className="text-gray-300 text-left">
                               <span className="text-yellow-500 font-bold text-xs uppercase block mb-1 mt-6">Stack Trace:</span>
                               <div className="text-gray-500 text-[10px] space-y-1">
                                   <div>at Query.Sequence._packetToError (mysql/lib/protocol/sequences/Sequence.js:47:14)</div>
                                   <div>at Query.ErrorPacket (mysql/lib/protocol/sequences/Query.js:77:18)</div>
                                   <div>at Protocol._parsePacket (mysql/lib/protocol/Protocol.js:278:23)</div>
                                   <div>at Parser.write (mysql/lib/protocol/Parser.js:76:12)</div>
                               </div>
                           </div>
                           <div className="bg-gray-900 border border-gray-700 p-4 rounded mt-6 relative overflow-hidden group text-left">
                               <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
                               <span className="text-cyan-500 font-bold text-[10px] tracking-widest uppercase block mb-3">Executing Query:</span>
                               <div className="text-cyan-100 font-mono text-xs leading-loose">
                                   SELECT id, username, role, last_login <br/>
                                   FROM administrators <br/>
                                   WHERE username = <span className="bg-red-500/20 border border-red-500/50 text-red-300 px-1 py-0.5 rounded break-all">'{loginForm.username}'</span> <br/>
                                   AND password = <span className="bg-red-500/20 border border-red-500/50 text-red-300 px-1 py-0.5 rounded break-all">'{loginForm.password}'</span> <br/>
                                   AND bypass_token = <span className="text-green-400 font-bold">'{decoyFlag}'</span> <br/>
                                   AND security_flag = <span className="text-cyan-400 font-bold">'{realFlag}'</span> <br/>
                                   AND is_active = 1
                               </div>
                           </div>
                       </motion.div>
                    )}
                 </AnimatePresence>
              </div>
              
              {viewMode === 'crashed' && <div className="absolute inset-0 bg-red-500/5 opacity-10 pointer-events-none transition-opacity" />}
            </div>

            {/* SUBMISSION */}
            <div className="bg-gray-900/40 border border-cyan-500/30 rounded-2xl p-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10"><Terminal className="w-12 h-12 text-cyan-400" /></div>
               <form onSubmit={handleSubmit} className="relative z-10 flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <input 
                      type="text" 
                      value={flag} 
                      onChange={(e) => setFlag(e.target.value)} 
                      placeholder="Masukkan flag di sini (CTF_{...})" 
                      className={`w-full bg-black/60 border-2 rounded-xl py-4 px-6 text-sm tracking-widest text-white placeholder:text-gray-700 focus:outline-none transition-all ${status === 'wrong' || status === 'decoy' ? 'border-red-500 shadow-[0_0_15px_#ef4444]' : 'border-cyan-500/40 focus:border-cyan-500 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)]'}`} 
                    />
                    <AnimatePresence>
                      {status === 'wrong' && <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-3 -right-3 bg-red-600 text-[8px] font-black italic px-3 py-1 rounded-full text-white shadow-lg uppercase">ACCESS DENIED</motion.div>}
                      {status === 'decoy' && <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-3 -right-3 bg-yellow-600 text-[8px] font-black italic px-3 py-1 rounded-full text-black shadow-lg uppercase">DECOY DETECTED</motion.div>}
                    </AnimatePresence>
                  </div>
                  <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase text-xs tracking-[0.2em] px-10 py-4 rounded-xl transition-all active:scale-95 shadow-[0_10px_30px_rgba(6,182,212,0.3)]">[ SUBMIT FLAG ]</button>
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
              <span className="text-red-500/50">{" > "} SYSTEM: CRASHED_PARTIAL</span>
              <span className="text-gray-800">//</span>
              <span>MODE: ACAK</span>
              <span className="text-gray-800">//</span>
              <span>LEVEL: 8</span>
           </div>
           <div className="text-[8px] font-bold uppercase tracking-tighter italic opacity-50">-- ERROR_STATE // DATABASE_LEAK --</div>
        </div>

      </div>
      <AnimatePresence>
         {showExitModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex justify-center items-center p-4">
               <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.1)]">
                  <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500" />
                  <ShieldAlert className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                  <h3 className="text-xl font-black text-white tracking-widest uppercase mb-2">ABORT MISSION?</h3>
                  <p className="text-sm text-gray-400 mb-8 font-sans">Anda yakin ingin keluar? Waktu akan terus berjalan dan progress misi Database Anda saat ini akan di-reset.</p>
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

export default MudahLevel8;
