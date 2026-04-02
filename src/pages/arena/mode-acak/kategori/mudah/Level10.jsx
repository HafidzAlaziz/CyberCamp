import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Skull,
  ChevronLeft,
  Zap,
  Terminal,
  ShieldAlert,
  Code,
  Microscope,
  CornerDownLeft,
  AlertTriangle,
  Copy,
  Check,
  LayoutTemplate
} from 'lucide-react';

const MudahLevel10 = () => {
  const navigate = useNavigate();
  const terminalRef = useRef(null);

  // Timer Logic
  const [elapsed, setElapsed] = useState(0);

  const [hasUsedHint, setHasUsedHint] = useState(() => {
    return localStorage.getItem('ctf_mudah_level10_hint_used') === 'true';
  });

  const timeLimit = 600;
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
  const [isCopied, setIsCopied] = useState(false);

  // Tab state
  const [activeTab, setActiveTab] = useState('terminal'); // 'terminal', 'source'

  // Terminal states
  const BUFFER_SIZE = 12; // hidden buffer size
  const [termInput, setTermInput] = useState('');
  const [termHistory, setTermHistory] = useState([
    { type: 'system', text: 'Shadow Portal OS v2.3.1 -- Login Module' },
    { type: 'system', text: 'Type your password to authenticate.' },
    { type: 'prompt', text: 'Enter password: ' },
  ]);
  const [termState, setTermState] = useState('idle'); // 'idle', 'overflow', 'granted', 'denied'
  const [memoryViz, setMemoryViz] = useState({ buffer: '', adminFlag: '0x00000000' });

  // Challenge Config - ANTI CHEAT via atob
  const [realFlag] = useState(() => atob("Q1RGe0IwZmYzcl8wdjNyZmwwd19XMW59")); // CTF{B0ff3r_0v3rfl0w_W1n}
  const [decoyFlag] = useState(() => atob("Q1RGe1MzZ20zbnQ0dDEwbl9GNHVsdH0=")); // CTF{S3gm3nt4t10n_F4ult}

  useEffect(() => {
    if (status !== 'complete') {
      const timer = setInterval(() => setElapsed(prev => prev + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [status]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [termHistory]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyFlag = () => {
    navigator.clipboard.writeText(realFlag);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    if (!termInput || termState === 'overflow' || termState === 'granted') return;

    const pw = termInput;
    setTermInput('');

    const newLines = [{ type: 'input', text: `> ${pw}` }];

    // update memory viz
    setMemoryViz({
      buffer: pw.substring(0, Math.min(pw.length, BUFFER_SIZE * 2)),
      adminFlag: pw.length > BUFFER_SIZE ? '0xDEADBEEF' : '0x00000000',
    });

    if (pw.length > BUFFER_SIZE) {
      // OVERFLOW!
      newLines.push({ type: 'warn', text: `[!] STACK SMASHING DETECTED` });
      newLines.push({ type: 'warn', text: `[!] buffer[${BUFFER_SIZE}] overwritten by ${pw.length - BUFFER_SIZE} byte(s)` });
      newLines.push({ type: 'warn', text: `[!] admin_flag corrupted → 0xDEADBEEF` });
      newLines.push({ type: 'blank', text: '' });
      newLines.push({ type: 'success', text: `[ACCESS GRANTED] Buffer Overflow successful!` });
      newLines.push({ type: 'success', text: `[KERNEL] Privilege escalation triggered.` });
      newLines.push({ type: 'flag', text: `[FLAG] ${realFlag}` });
      setTermState('granted');
    } else {
      newLines.push({ type: 'error', text: `[ACCESS DENIED] Invalid password.` });
      newLines.push({ type: 'prompt', text: `Enter password: ` });
      setTermState('idle');
    }

    setTermHistory(prev => [...prev, ...newLines]);
  };

  const handleReset = () => {
    setTermHistory([
      { type: 'system', text: 'Shadow Portal OS v2.3.1 -- Login Module' },
      { type: 'system', text: 'Type your password to authenticate.' },
      { type: 'prompt', text: 'Enter password: ' },
    ]);
    setTermState('idle');
    setMemoryViz({ buffer: '', adminFlag: '0x00000000' });
    setTermInput('');
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
      const currentBestStars = stats['mudah-10']?.stars || 0;
      if (stars >= currentBestStars) {
        stats['mudah-10'] = { stars: stars, bestTime: timeTakenStr, conditions: [true, !hasUsedHint, !isTimeFailed] };
        localStorage.setItem('ctf_mode_acak_stats', JSON.stringify(stats));
      }
      localStorage.removeItem('ctf_mudah_level10_hint_used');
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
    localStorage.removeItem('ctf_mudah_level10_hint_used');
    navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 'mudah-10' } });
  };

  if (status === 'complete') {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 font-mono text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_70%)]" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="z-10 bg-gray-900 border-4 border-cyan-500 p-12 rounded-3xl text-center max-w-xl shadow-[0_0_50px_rgba(6,182,212,0.3)]">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-cyan-500/30">
            <Skull className="w-12 h-12 text-cyan-400 drop-shadow-[0_0_10px_#06b6d4]" />
          </motion.div>
          <h1 className="text-5xl font-black italic tracking-tighter mb-2 text-white uppercase leading-none">MISSION COMPLETE</h1>
          <p className="text-cyan-500 font-bold tracking-[0.3em] mb-4 text-[10px]">SECTOR: KERNEL // BUFFER_OVERFLOWED</p>
          <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-2xl py-6 px-10 mb-8 inline-block">
            <div className="text-[10px] font-black text-gray-500 tracking-[0.4em] uppercase mb-4">Misi terselesaikan dalam</div>
            <div className="text-4xl font-black text-white italic tracking-tighter mb-6">{completionTime}</div>
            <div className="flex justify-center gap-4">
              {[1, 2, 3].map(s => (
                <Zap key={s} className={`w-10 h-10 transition-all duration-500 ${s <= stars ? 'text-cyan-400 fill-cyan-400 drop-shadow-[0_0_15px_#06b6d4]' : 'text-gray-800 fill-transparent'}`} />
              ))}
            </div>
          </div>
          <button onClick={() => navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 'mudah-10' } })} className="w-full bg-cyan-500 text-black font-black py-4 rounded-xl hover:bg-cyan-400 transition-all text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(6,182,212,0.2)]">KEMBALI KE MAP TAKTIS</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-4 md:p-8 flex flex-col overflow-hidden relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #312e81 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col relative z-10">

        {/* HEADER */}
        <div className="flex justify-between items-start mb-8 relative">
          <div className="flex gap-4 items-start z-10">
            <button onClick={() => setShowExitModal(true)} className="mt-1 p-2 bg-gray-900 border border-cyan-500/30 rounded-xl hover:bg-cyan-500/20 text-gray-400 hover:text-cyan-400 transition-all group" title="Abort Mission">
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_#06b6d4]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400/80">TARGET: SECTOR_KERNEL</span>
              </div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none shadow-cyan-500/20">
                LEVEL 10: <span className="text-cyan-500 drop-shadow-[0_0_10px_#06b6d4]">INTI PWNING</span>
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
            <div className="text-4xl font-black italic tracking-tighter transition-colors duration-500 text-cyan-600">{formatTime(elapsed)}</div>
          </div>
        </div>

        {/* LAYOUT */}
        <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">

          {/* LEFT: BRIEFING */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <div className="bg-gray-950/50 border border-cyan-500/30 rounded-2xl p-6 flex-1 flex flex-col relative overflow-hidden group shadow-[inset_0_0_20px_rgba(6,182,212,0.05)]">
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 shadow-[0_0_15px_#06b6d4]" />
              <div className="flex items-center gap-3 mb-6">
                <Skull className="w-5 h-5 text-cyan-400" />
                <h2 className="text-sm font-black text-cyan-200 uppercase tracking-widest">BRIEFING MISI</h2>
              </div>
              <div className="text-xs leading-relaxed text-gray-400 overflow-y-auto pr-2 custom-scrollbar space-y-4 italic">
                <p>{" > "} Target: Program Login biner <code className="text-orange-300">"login.elf"</code> yang berjalan di server target.</p>
                <p>{" > "} Intelligence: Program tersebut memiliki <b>fungsi berbahaya</b> <code className="text-red-400">gets()</code> dalam bahasa C yang tidak memvalidasi panjang input, membuka celah <b>Buffer Overflow</b>.</p>
                <p>{" > "} Tugas lo: Akses tab <b>[SOURCE CODE]</b> untuk menganalisa kode C-nya. Pelajari batas buffer, lalu kembali ke <b>[TERMINAL]</b> dan kirimkan payload yang cukup panjang untuk menimpa memori <code className="text-yellow-400">admin_flag</code>!</p>
                <div className="p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-lg mt-4">
                  <p className="text-cyan-400 font-black tracking-tight uppercase mb-1 flex items-center gap-2">
                    <Microscope className="w-3 h-3" /> BUFFER OVERFLOW
                  </p>
                  <p className="text-[9px] text-gray-600 uppercase normal-case">Fungsi `gets()` membaca input tanpa membatasi panjangnya. Jika input melebihi ukuran buffer yang dialokasikan di stack, ia akan menimpa variabel di memori yang berdekatan!</p>
                </div>

                {/* MEMORY VISUALIZER */}
                <div className="mt-4 p-3 bg-black/50 border border-white/10 rounded-lg">
                  <p className="text-[9px] font-black tracking-widest text-gray-500 uppercase mb-3">// STACK MEMORY PREVIEW</p>
                  <div className="space-y-1.5 text-[10px] font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 w-28 shrink-0">buffer[{BUFFER_SIZE}]:</span>
                      <span className={`flex-1 truncate px-2 py-0.5 rounded border transition-all ${memoryViz.buffer.length > BUFFER_SIZE ? 'border-red-500/50 text-red-300 bg-red-950/30' : 'border-gray-800 text-cyan-300 bg-gray-900'}`}>
                        {memoryViz.buffer ? `"${memoryViz.buffer}"` : '(empty)'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 w-28 shrink-0">admin_flag:</span>
                      <span className={`px-2 py-0.5 rounded border font-bold transition-all ${memoryViz.adminFlag !== '0x00000000' ? 'border-red-500/50 text-red-300 bg-red-950/30 animate-pulse' : 'border-gray-800 text-gray-500 bg-gray-900'}`}>
                        {memoryViz.adminFlag}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (!hasUsedHint) {
                  setHasUsedHint(true);
                  localStorage.setItem('ctf_mudah_level10_hint_used', 'true');
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
                  Lihat di source code: buffer berukuran berapa byte? Coba kirim input yang <span className="text-cyan-400 font-mono">LEBIH PANJANG</span> dari ukuran buffer-nya di terminal!
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: WORKSPACE */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            <div className="flex-1 bg-black border border-cyan-500/20 rounded-2xl flex flex-col overflow-hidden relative group shadow-2xl min-h-[400px]">

              {/* TAB BAR */}
              <div className="h-12 bg-gray-900/80 border-b border-white/5 flex items-center justify-between px-4 gap-4 backdrop-blur-md shrink-0">
                <div className="flex gap-1.5 hidden md:flex">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex bg-black/50 rounded-lg p-1 border border-white/10">
                  <button
                    onClick={() => setActiveTab('terminal')}
                    className={`flex-1 px-4 py-1.5 rounded-md text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${activeTab === 'terminal' ? 'bg-cyan-500/20 text-cyan-400 shadow-[inset_0_0_10px_rgba(6,182,212,0.2)]' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                    <Terminal className="w-3 h-3" /> TERMINAL
                  </button>
                  <button
                    onClick={() => setActiveTab('source')}
                    className={`flex-1 px-4 py-1.5 rounded-md text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${activeTab === 'source' ? 'bg-cyan-500/20 text-cyan-400 shadow-[inset_0_0_10px_rgba(6,182,212,0.2)]' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                    <Code className="w-3 h-3" /> SOURCE CODE
                  </button>
                </div>
                {activeTab === 'terminal' && termState !== 'idle' && (
                  <button onClick={handleReset} className="text-[9px] text-gray-500 hover:text-cyan-400 uppercase tracking-widest transition-colors border border-gray-800 hover:border-cyan-500/30 px-2 py-1 rounded">
                    REBOOT
                  </button>
                )}
              </div>

              {/* CONTENT */}
              <div className="flex-1 relative overflow-hidden">
                <AnimatePresence mode="wait">

                  {/* TERMINAL TAB */}
                  {activeTab === 'terminal' && (
                    <motion.div key="terminal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col bg-black/90">
                      {/* Terminal output */}
                      <div ref={terminalRef} className="flex-1 p-4 overflow-y-auto custom-scrollbar font-mono text-[12px] space-y-1 select-text">
                        {termHistory.map((line, i) => (
                          <div key={i} className={
                            line.type === 'system' ? 'text-gray-500' :
                            line.type === 'prompt' ? 'text-cyan-400' :
                            line.type === 'input' ? 'text-white' :
                            line.type === 'warn' ? 'text-yellow-400' :
                            line.type === 'error' ? 'text-red-400' :
                            line.type === 'success' ? 'text-green-400 font-bold' :
                            line.type === 'flag' ? 'text-cyan-300 font-black bg-cyan-950/30 px-2 py-1 rounded border border-cyan-500/30 mt-2' :
                            'text-transparent'
                          }>
                            {line.text}
                          </div>
                        ))}

                        {/* Copy button for flag */}
                        {termState === 'granted' && (
                          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-3 flex items-center gap-3">
                            <button onClick={handleCopyFlag} className={`flex items-center gap-2 text-[10px] font-black px-3 py-1.5 rounded border transition-all ${isCopied ? 'bg-green-500 text-black border-green-500' : 'bg-gray-900 text-gray-300 border-gray-700 hover:text-cyan-400 hover:border-cyan-500/40'}`}>
                              {isCopied ? <><Check className="w-3 h-3" /> FLAG COPIED!</> : <><Copy className="w-3 h-3" /> COPY FLAG</>}
                            </button>
                            <span className="text-gray-600 text-[9px] uppercase tracking-widest">Tempel ke form submit di bawah.</span>
                          </motion.div>
                        )}
                      </div>

                      {/* Input area */}
                      {termState !== 'granted' && (
                        <form onSubmit={handleTerminalSubmit} className="flex items-center gap-3 border-t border-white/5 p-3 bg-black/60 shrink-0">
                          <span className="text-cyan-400 text-sm font-black shrink-0">$</span>
                          <input
                            autoFocus
                            type="text"
                            value={termInput}
                            onChange={(e) => setTermInput(e.target.value)}
                            placeholder="Ketik payload di sini..."
                            className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder:text-gray-700 font-mono tracking-wide"
                          />
                          <button type="submit" className="text-cyan-500 hover:text-cyan-300 transition-colors shrink-0">
                            <CornerDownLeft className="w-4 h-4" />
                          </button>
                        </form>
                      )}
                    </motion.div>
                  )}

                  {/* SOURCE CODE TAB */}
                  {activeTab === 'source' && (
                    <motion.div key="source" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 p-6 font-mono text-[11px] md:text-sm overflow-y-auto custom-scrollbar select-text bg-black/80">
                      <div className="text-[10px] font-black tracking-widest text-cyan-500 uppercase border-b border-white/10 pb-2 mb-4">// login_vuln.c — DECOMPILED SOURCE</div>
                      <div className="text-gray-400 space-y-1 leading-relaxed">
                        <div><span className="text-pink-400">#include</span> <span className="text-green-400">&lt;stdio.h&gt;</span></div>
                        <div><span className="text-pink-400">#include</span> <span className="text-green-400">&lt;string.h&gt;</span></div>
                        <div><span className="text-pink-400">#include</span> <span className="text-green-400">&lt;stdlib.h&gt;</span></div>
                        <br />
                        <div><span className="text-purple-400">void</span> <span className="text-blue-400">login</span>() {'{'}</div>
                        <div className="pl-4"><span className="text-purple-400">int</span> admin_flag = <span className="text-yellow-400">0</span>; <span className="text-gray-500 italic">// 0 = user, non-zero = admin</span></div>
                        <div className="pl-4"><span className="text-purple-400">char</span> buffer[<span className="text-yellow-400">{BUFFER_SIZE}</span>]; <span className="text-gray-500 italic">// 12 bytes only!</span></div>
                        <br />
                        <div className="pl-4 text-blue-300">printf<span className="text-gray-400">(</span><span className="text-green-400">"Welcome to Shadow Portal.\n"</span><span className="text-gray-400">)</span>;</div>
                        <div className="pl-4 text-blue-300">printf<span className="text-gray-400">(</span><span className="text-green-400">"Enter your password: "</span><span className="text-gray-400">)</span>;</div>
                        <br />
                        <div className="pl-4 text-gray-500 italic">
                          // ⚠ VULNERABILITY: gets() reads until newline WITHOUT bounds checking!<br/>
                          // Input longer than {BUFFER_SIZE} chars → overwrites 'admin_flag' on the stack!
                        </div>
                        <div className="pl-4 bg-red-950/40 py-1 border border-red-500/30 text-red-300 flex items-center gap-2 rounded">
                          <AlertTriangle className="w-3 h-3 text-red-500 shrink-0" />
                          <span><span className="text-blue-400">gets</span><span className="text-gray-400">(buffer)</span>; <span className="text-gray-600 italic text-[10px]">// UNSAFE — never use in production!</span></span>
                        </div>
                        <br />
                        <div className="pl-4"><span className="text-purple-400">if</span> (admin_flag <span className="text-cyan-400">!=</span> <span className="text-yellow-400">0</span>) {'{'}</div>
                        <div className="pl-8 text-blue-300">printf<span className="text-gray-400">(</span><span className="text-green-400">"Buffer Overflow Detected! Access Granted.\n"</span><span className="text-gray-400">)</span>;</div>
                        <div className="pl-8 text-gray-500 italic">// Privilege escalation triggered...</div>
                        <div className="pl-8 text-blue-300">system<span className="text-gray-400">(</span><span className="text-green-400">"/bin/sh"</span><span className="text-gray-400">)</span>;</div>
                        <div className="pl-4">{'}'} <span className="text-purple-400">else</span> {'{'}</div>
                        <div className="pl-8 text-blue-300">printf<span className="text-gray-400">(</span><span className="text-green-400">"Access Denied.\n"</span><span className="text-gray-400">)</span>;</div>
                        <div className="pl-4">{'}'}</div>
                        <div>{'}'}</div>
                        <br />
                        <div><span className="text-purple-400">int</span> <span className="text-blue-400">main</span>() {'{'}</div>
                        <div className="pl-4 text-blue-400">login<span className="text-gray-400">()</span>;</div>
                        <div className="pl-4"><span className="text-purple-400">return</span> <span className="text-yellow-400">0</span>;</div>
                        <div>{'}'}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
            <span>LEVEL: 10</span>
          </div>
          <div className="text-[8px] font-bold uppercase tracking-tighter italic opacity-50">-- CORE_GRID_ESTABLISHED // BUFFER_LIMIT_REACHED --</div>
        </div>
      </div>

      {/* EXIT MODAL */}
      <AnimatePresence>
        {showExitModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex justify-center items-center p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.1)]">
              <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500" />
              <ShieldAlert className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
              <h3 className="text-xl font-black text-white tracking-widest uppercase mb-2">ABORT MISSION?</h3>
              <p className="text-sm text-gray-400 mb-8 font-sans">Anda yakin ingin keluar? Waktu akan terus berjalan dan progress misi Pwning Anda saat ini akan di-reset.</p>
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

export default MudahLevel10;
