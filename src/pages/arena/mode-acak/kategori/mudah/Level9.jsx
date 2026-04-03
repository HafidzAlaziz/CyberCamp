import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Binary,
  ChevronLeft,
  X,
  Zap,
  Terminal,
  ShieldAlert,
  Code,
  Search,
  Lock,
  Unlock,
  Key,
  LayoutTemplate,
  Copy,
  Check
} from 'lucide-react';

const MudahLevel9 = () => {
  /* 
     TRAP_FLAG: <!-- CTF{LOGIC_HTML_TRAP_9090} -->
  */

  const navigate = useNavigate();
  
  // Timer Logic
  const [elapsed, setElapsed] = useState(0);

  const [hasUsedHint, setHasUsedHint] = useState(() => {
    return localStorage.getItem('ctf_mudah_level9_hint_used') === 'true';
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

  // Widget States
  const [activeTab, setActiveTab] = useState('ui'); // 'ui', 'source'
  const [portalInput, setPortalInput] = useState('');
  const [portalStatus, setPortalStatus] = useState('locked'); // 'locked', 'error', 'unlocked'
  const [isCopied, setIsCopied] = useState(false);
  const masterPassword = "Shadow_Protocol_Activated";
  const decoyPassword = "Old_Admin_P4ss";

  const handleCopyFlag = () => {
    navigator.clipboard.writeText(realFlag);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Challenge Config - ANTI CHEAT via atob
  const [realFlag] = useState(() => atob("Q1RGe0g0cmRjMGQzZF9TdHIxbmd9")); // CTF{H4rdc0d3d_Str1ng}
  const [decoyFlag] = useState(() => atob("Q1RGe1dyMG5nX1A0c3N3MHJkX0J5cDRzc30=")); // CTF{Wr0ng_P4ssw0rd_Byp4ss}

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanFlag = flag.trim();
    if (cleanFlag === realFlag) {
      const timeTakenStr = formatTime(elapsed);
      setCompletionTime(timeTakenStr);
      setStatus('complete');
      
      const savedStats = localStorage.getItem('ctf_mode_acak_stats');
      const stats = savedStats ? JSON.parse(savedStats) : {};
      const currentBestStars = stats['mudah-9']?.stars || 0;
      if (stars >= currentBestStars) {
         stats['mudah-9'] = { stars: stars, bestTime: timeTakenStr, conditions: [true, !hasUsedHint, !isTimeFailed] };
         localStorage.setItem('ctf_mode_acak_stats', JSON.stringify(stats));
      }
      localStorage.removeItem('ctf_mudah_level9_hint_used');
    } else if (cleanFlag === decoyFlag) {
      setStatus('decoy');
      setAttempts(prev => [...prev, cleanFlag]);
      setTimeout(() => setStatus('active'), 3000);

    } else if (cleanFlag !== "") {
      setStatus('wrong');
      setAttempts(prev => [...prev, cleanFlag]);
      setTimeout(() => setStatus('active'), 2000);
    }
    setFlag('');
  };

  const handleExit = () => {
    localStorage.removeItem('ctf_mudah_level9_hint_used');
    navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 'mudah-9' } });
  };

  if (status === 'complete') {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 font-mono text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_70%)]" />
        {/* ✨ Cyan particles rising in background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`cp-${i}`}
              style={{ left: `${(i * 5 + 2) % 94}%`, position: 'absolute', bottom: '-4px' }}
              className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#06b6d4]"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], y: '-100vh' }}
              transition={{ duration: 4 + (i % 6) * 0.7, delay: i * 0.25, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </div>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="z-10 bg-gray-900 border-4 border-cyan-500 p-12 rounded-3xl text-center max-w-xl shadow-[0_0_50px_rgba(6,182,212,0.3)]">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-cyan-500/30">
            <Binary className="w-12 h-12 text-cyan-400 drop-shadow-[0_0_10px_#06b6d4]" />
          </motion.div>
          <h1 className="text-5xl font-black italic tracking-tighter mb-2 text-white uppercase leading-none">MISSION COMPLETE</h1>
          <p className="text-cyan-500 font-bold tracking-[0.3em] mb-4 text-[10px]">SECTOR: LOGIC // CODE_REVERSED</p>
          <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-2xl py-6 px-10 mb-8 inline-block">
             <div className="text-[10px] font-black text-gray-500 tracking-[0.4em] uppercase mb-4">Misi terselesaikan dalam</div>
             <div className="text-4xl font-black text-white italic tracking-tighter mb-6">{completionTime}</div>
             <div className="flex justify-center gap-4">
               {[1, 2, 3].map(s => (
                 <Zap key={s} className={`w-10 h-10 transition-all duration-500 ${s <= stars ? 'text-cyan-400 fill-cyan-400 drop-shadow-[0_0_15px_#06b6d4]' : 'text-gray-800 fill-transparent'}`} />
               ))}
             </div>
          </div>
          <button onClick={() => navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 'mudah-9' } })} className="w-full bg-cyan-500 text-black font-black py-4 rounded-xl hover:bg-cyan-400 transition-all text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(6,182,212,0.2)]">KEMBALI KE MAP TAKTIS</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-4 md:p-8 flex flex-col overflow-hidden relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #064e3b 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
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
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400/80">TARGET: SECTOR_LOGIC</span>
              </div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none shadow-cyan-500/20">
                LEVEL 9: <span className="text-cyan-500 drop-shadow-[0_0_10px_#06b6d4]">PEMBALIKAN LOGIKA</span>
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
                <Binary className="w-5 h-5 text-cyan-400" />
                <h2 className="text-sm font-black text-cyan-200 uppercase tracking-widest">BRIEFING MISI</h2>
              </div>
              <div className="text-xs leading-relaxed text-gray-400 overflow-y-auto pr-2 custom-scrollbar space-y-4 italic">
                <p>{" > "} Target: Portal Rahasia VIP (Client-Side Validation).</p>
                <p>{" > "} Intelligence: Pengembang pemula seringkali mengeksekusi validasi kredensial langsung di sisi client (browser) menggunakan Javascript, di mana semua logika dan parameternya bocor ke publik.</p>
                <p>{" > "} Tugas lo: Portal di sebelah kanan mengunci *flag* yang kita butuhkan. Coba berpindah ke tab <b>[SOURCE CODE]</b> untuk meng-*inspect* fungsi Javascript mereka. Cari *password hardcoded*-nya dan gunakan untuk membuka portal!</p>
                <div className="p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-lg mt-4">
                   <p className="text-cyan-400 font-black tracking-tight uppercase mb-1 flex items-center gap-2">
                     <Code className="w-3 h-3" /> REKAYASA BALIK LOGIKA
                   </p>
                   <p className="text-[9px] text-gray-600 uppercase normal-case">JANGAN PERNAH menyembunyikan kata sandi verifikasi langsung pada skrip *front-end* karena mudah dibaca secara *plaintext* lewat *developer tools*.</p>
                </div>
              </div>
            </div>

            <button 
                onClick={() => {
                  if (!hasUsedHint) {
                    setHasUsedHint(true);
                    localStorage.setItem('ctf_mudah_level9_hint_used', 'true');
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
                  Perhatikan pernyataan <span className="text-cyan-400 font-mono text-[9px]">if (userInput === "...")</span>. Teks di dalam tanda kurip tersebut adalah jawaban yang dicari oleh program (teks flag).
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CENTER: WORKSPACE */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            <div className="flex-1 bg-black border border-cyan-500/20 rounded-2xl flex flex-col overflow-hidden relative group shadow-2xl">
              
              <div className={`min-h-[3rem] bg-gray-900/80 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between px-4 py-2 gap-4 backdrop-blur-md transition-colors ${activeTab === 'source' ? 'border-cyan-500/30' : ''}`}>
                 <div className="flex items-center gap-4 hidden md:flex">
                     <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                     </div>
                 </div>
                 
                 <div className="flex bg-black/50 rounded-lg p-1 border border-white/10">
                    <button 
                       onClick={() => setActiveTab('ui')}
                       className={`flex-1 px-4 py-1.5 rounded-md text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${activeTab === 'ui' ? 'bg-cyan-500/20 text-cyan-400 shadow-[inset_0_0_10px_rgba(6,182,212,0.2)]' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                       <LayoutTemplate className="w-3 h-3" /> VISUAL UI
                    </button>
                    <button 
                       onClick={() => setActiveTab('source')}
                       className={`flex-1 px-4 py-1.5 rounded-md text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${activeTab === 'source' ? 'bg-cyan-500/20 text-cyan-400 shadow-[inset_0_0_10px_rgba(6,182,212,0.2)]' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                       <Code className="w-3 h-3" /> SOURCE CODE
                    </button>
                 </div>
              </div>

              <div className="flex-1 overflow-x-hidden relative flex flex-col min-h-[300px]">
                 <AnimatePresence mode="wait">
                    {activeTab === 'ui' && (
                       <motion.div key="ui" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="absolute inset-0 flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.03)_0%,transparent_70%)] overflow-y-auto">
                           <div className="bg-gray-950 border border-white/10 p-8 rounded-2xl w-full max-w-sm shadow-[0_0_30px_rgba(0,0,0,0.5)] my-auto transition-all">
                              {portalStatus === 'unlocked' ? (
                                 <div className="text-center">
                                    <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                                       <Unlock className="w-8 h-8 text-green-400" />
                                    </div>
                                    <h3 className="text-green-400 font-black tracking-widest mb-1 shadow-green-500/20 drop-shadow-md">ACCESS GRANTED</h3>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-6">Master Protocol Authorized</p>
                                    
                                    <div className="bg-black/60 border border-green-500/30 p-4 rounded-xl text-left relative overflow-hidden group">
                                       <div className="absolute top-0 left-0 w-1 h-full bg-green-500" />
                                       <div className="text-[9px] text-green-500 font-black tracking-widest mb-2 uppercase">// DECRYPTING_FLAG_NODE:</div>
                                       <div className="text-white font-mono text-sm tracking-wider select-text flex justify-between items-center px-1">
                                          <span>{realFlag}</span>
                                          <button 
                                             onClick={handleCopyFlag}
                                             className={`text-[9px] font-bold px-2 py-0.5 rounded border flex items-center gap-1 transition-all ${isCopied ? 'bg-green-500 text-black border-green-500' : 'bg-gray-900/50 text-gray-400 border-gray-600 hover:text-white hover:border-gray-400 cursor-pointer'}`}
                                          >
                                             {isCopied ? <><Check className="w-3 h-3" /> COPIED</> : <><Copy className="w-3 h-3" /> COPY</>}
                                          </button>
                                       </div>
                                    </div>
                                    
                                    <button onClick={() => { setPortalStatus('locked'); setPortalInput(''); }} className="mt-6 text-[10px] text-gray-500 hover:text-cyan-400 transition-colors uppercase tracking-widest underline decoration-gray-700 underline-offset-4">RELOCK SYSTEM</button>
                                 </div>
                              ) : (
                                 <div className="text-center text-gray-300">
                                     <div className="w-16 h-16 bg-red-950/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                                        <Lock className="w-8 h-8 text-red-500/50" />
                                     </div>
                                     <h3 className="text-white font-bold tracking-widest mb-1">VIP INTERFACE</h3>
                                     <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Client-Side Validation Only</p>
                                     <form onSubmit={(e) => {
                                        e.preventDefault();
                                        if (portalInput === masterPassword) {
                                           setPortalStatus('unlocked');
                                        } else {
                                           setPortalStatus('error');
                                           setTimeout(() => setPortalStatus('locked'), 2000);
                                        }
                                     }}>
                                         <div className="relative mb-4 group">
                                            <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 transition-colors group-focus-within:text-cyan-400" />
                                            <input 
                                               type="password" 
                                               value={portalInput} 
                                               onChange={(e) => setPortalInput(e.target.value)}
                                               placeholder="Enter Master Password..." 
                                               className={`w-full bg-gray-900 rounded-xl py-3 pl-12 pr-4 text-sm font-mono focus:outline-none transition-all ${portalStatus === 'error' ? 'border-2 border-red-500 text-red-400' : 'border border-gray-800 text-cyan-300 focus:border-cyan-500/50'}`}
                                            />
                                         </div>
                                         <AnimatePresence>
                                            {portalStatus === 'error' && (
                                               <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400 text-[10px] uppercase font-black tracking-widest mb-4 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">
                                                  [ INTRUSION DETECTED / INCORRECT ]
                                               </motion.div>
                                            )}
                                         </AnimatePresence>
                                         <button type="submit" className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center gap-2 font-black uppercase text-xs tracking-[0.2em] rounded-xl transition-colors border border-white/5">
                                             <ShieldAlert className="w-3 h-3 text-cyan-500" /> AUTHORIZE ACCESS
                                         </button>
                                     </form>
                                 </div>
                              )}
                           </div>
                       </motion.div>
                    )}

                    {activeTab === 'source' && (
                       <motion.div key="source" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="absolute inset-0 p-6 font-mono text-[11px] md:text-sm overflow-y-auto custom-scrollbar select-text bg-black/80">
                           <div className="text-[10px] font-black tracking-widest text-cyan-500 uppercase border-b border-white/10 pb-2 mb-4">// DECOMPILED_MAIN.JS_SOURCE</div>
                           <div className="text-gray-400 space-y-1">
                              <div><span className="text-purple-400">function</span> <span className="text-blue-400">checkAdminAccess</span>(<span className="text-orange-300">userInput</span>) {'{'}</div>
                              <div className="pl-4 text-gray-500 italic">// Validate basic length requirements</div>
                              <div className="pl-4"><span className="text-purple-400">if</span> (userInput.<span className="text-blue-300">length</span> <span className="text-cyan-400">&lt;</span> <span className="text-yellow-400">10</span>) {'{'}</div>
                              <div className="pl-8"><span className="text-purple-400">return</span> <span className="text-yellow-400">false</span>;</div>
                              <div className="pl-4">{'}'}</div>
                              <br />
                              <div className="pl-4 text-gray-500 italic">// Check against hardcoded master bypass token</div>
                              <div className="pl-4"><span className="text-purple-400">if</span> (userInput <span className="text-cyan-400">===</span> <span className="text-green-400">"<span className="select-all cursor-crosshair px-1 bg-cyan-500/5 rounded hover:bg-cyan-500/10 transition-colors">{masterPassword}</span>"</span>) {'{'}</div>
                              <div className="pl-8 text-gray-500 italic">// Real flag will drop via secure API response, wait for it!</div>
                              <div className="pl-8">console.<span className="text-blue-300">log</span>(<span className="text-green-400">"Master access granted!"</span>);</div>
                              <div className="pl-8">UI.<span className="text-blue-300">unlockPortalAndRevealFlag</span>();</div>
                              <div className="pl-8"><span className="text-purple-400">return</span> <span className="text-yellow-400">true</span>;</div>
                              <div className="pl-4">{'}'}</div>
                              <br />
                              <div className="pl-4 text-gray-500 italic">// Fallback check for decoy tokens</div>
                              <div className="pl-4 text-gray-500 italic">// TODO: REMOVE THIS DECOY IN PRODUCTION</div>
                              <div className="pl-4"><span className="text-purple-400">if</span> (userInput <span className="text-cyan-400">===</span> <span className="text-green-400">"<span className="select-all cursor-crosshair px-1 bg-cyan-500/5 rounded hover:bg-cyan-500/10 transition-colors">{decoyPassword}</span>"</span>) {'{'}</div>
                              <div className="pl-8 text-gray-500 italic relative">
                                 // Hidden stub trap
                                 <div className="absolute top-0 right-0 opacity-0 select-all text-[1px] pointer-events-none">{"CTF{LOGIC_STUB_DECOY_009}"}</div>
                                 console.<span className="text-blue-300">error</span>(<span className="text-green-400">"Warning: Legacy decoy token used."</span>);
                              </div>
                              <div className="pl-8"><span className="text-purple-400">return</span> <span className="text-yellow-400">false</span>;</div>
                              <div className="pl-4">{'}'}</div>
                              <br />
                              <div className="pl-4"><span className="text-purple-400">return</span> <span className="text-yellow-400">false</span>;</div>
                              <div>{'}'}</div>
                           </div>
                       </motion.div>
                    )}
                 </AnimatePresence>
              </div>
              
              <div className="absolute inset-0 bg-cyan-500/5 opacity-10 pointer-events-none" />
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
              <span className="text-cyan-500/50">{" > "} SYSTEM: OPERATIONAL</span>
              <span className="text-gray-800">//</span>
              <span>MODE: ACAK</span>
              <span className="text-gray-800">//</span>
              <span>LEVEL: 9</span>
           </div>
           <div className="text-[8px] font-bold uppercase tracking-tighter italic opacity-50">-- CORE_GRID_ESTABLISHED // SOURCE_DECOMPILED --</div>
        </div>

      </div>
      <AnimatePresence>
         {showExitModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex justify-center items-center p-4">
               <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.1)]">
                  <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500" />
                  <ShieldAlert className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                  <h3 className="text-xl font-black text-white tracking-widest uppercase mb-2">ABORT MISSION?</h3>
                  <p className="text-sm text-gray-400 mb-8 font-sans">Anda yakin ingin keluar? Waktu akan terus berjalan dan progress misi Logic Anda saat ini akan di-reset.</p>
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

export default MudahLevel9;
