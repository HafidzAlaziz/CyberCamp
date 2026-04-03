import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Globe,
    ChevronLeft,
    X,
    Zap,
    Terminal,
    ShieldAlert,
    Code,
    Check,
    Search,
    Server
} from 'lucide-react';

const MudahLevel5 = () => {
  /* 
     TRAP_FLAG: <!-- CTF{WEB_HTML_TRAP_5050} -->
  */

    const navigate = useNavigate();

    // Timer Persistence Logic
    const [elapsed, setElapsed] = useState(0);

    const [hasUsedHint, setHasUsedHint] = useState(() => {
        return localStorage.getItem('ctf_mudah_level5_hint_used') === 'true';
    });

    // Calculate dynamic stars
    const timeLimit = 720; // 12 minutes
    const isTimeFailed = elapsed > timeLimit;
    const hintPenalty = hasUsedHint ? 1 : 0;
    const timePenalty = isTimeFailed ? 1 : 0;
    const stars = Math.max(1, 3 - hintPenalty - timePenalty);

    const [flag, setFlag] = useState('');
    const [status, setStatus] = useState('active'); // 'active', 'wrong', 'decoy', 'complete'
    const [attempts, setAttempts] = useState([]);
    const [showHint, setShowHint] = useState(false);
    const [completionTime, setCompletionTime] = useState(null);
    const [showExitModal, setShowExitModal] = useState(false);

    // Challenge Config - ANTI CHEAT via atob
    const [realFlag] = useState(() => atob("Q1RGe0gxZGQzbl9DMG1tM250X0MwZDN9")); // CTF{H1dd3n_C0mm3nt_C0d3}
    const [decoyFlag] = useState(() => atob("Q1RGe0Y0azNfSHRtTF9DMG1tM250fQ==")); // CTF{F4k3_HtmL_C0mm3nt}

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
            const currentBestStars = stats['mudah-5']?.stars || 0;
            if (stars >= currentBestStars) {
                stats['mudah-5'] = { stars: stars, bestTime: timeTakenStr, conditions: [true, !hasUsedHint, !isTimeFailed] };
                localStorage.setItem('ctf_mode_acak_stats', JSON.stringify(stats));
            }
            localStorage.removeItem('ctf_mudah_level5_hint_used');
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
        localStorage.removeItem('ctf_mudah_level5_hint_used');
        navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 'mudah-5' } });
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
                        <Zap className="w-12 h-12 text-cyan-400 fill-cyan-400 drop-shadow-[0_0_10px_#06b6d4]" />
                    </motion.div>
                    <h1 className="text-5xl font-black italic tracking-tighter mb-2 text-white uppercase leading-none">MISSION COMPLETE</h1>
                    <p className="text-cyan-500 font-bold tracking-[0.3em] mb-4 text-[10px]">SECTOR: ALPHA // WEB_INFILTRATED</p>
                    <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-2xl py-6 px-10 mb-8 inline-block">
                        <div className="text-[10px] font-black text-gray-500 tracking-[0.4em] uppercase mb-4">Misi terselesaikan dalam</div>
                        <div className="text-4xl font-black text-white italic tracking-tighter mb-6">{completionTime}</div>
                        <div className="flex justify-center gap-4">
                            {[1, 2, 3].map(s => (
                                <Zap key={s} className={`w-10 h-10 transition-all duration-500 ${s <= stars ? 'text-cyan-400 fill-cyan-400 drop-shadow-[0_0_15px_#06b6d4]' : 'text-gray-800 fill-transparent'}`} />
                            ))}
                        </div>
                    </div>
                    <button onClick={() => navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 'mudah-5' } })} className="w-full bg-cyan-500 text-black font-black py-4 rounded-xl hover:bg-cyan-400 transition-all text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(6,182,212,0.2)]">KEMBALI KE MAP TAKTIS</button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-4 md:p-8 flex flex-col overflow-hidden relative">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #164e63 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
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
                                LEVEL 5: <span className="text-cyan-500 drop-shadow-[0_0_10px_#06b6d4]">INFILTRASI WEB</span>
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
                                <Globe className="w-5 h-5 text-cyan-400" />
                                <h2 className="text-sm font-black text-cyan-200 uppercase tracking-widest">BRIEFING MISI</h2>
                            </div>
                            <div className="text-xs leading-relaxed text-gray-400 overflow-y-auto pr-2 custom-scrollbar space-y-4 italic">
                                <p>{" > "} Target: Portal Administrator Shadow Syndicate.</p>
                                <p>{" > "} Intelligence: Developer portal ini sering lupa menghapus catatan pengembangan mereka sebelum rilis ke publik.</p>
                                <p>{" > "} Tugas lo: Analisis <b>Source Code</b> HTML yang ter-intercept di terminal sebelah kanan. Cari jejak komentar administrator yang ditinggalkan di kode.</p>
                                <div className="p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-lg mt-4">
                                    <p className="text-cyan-400 font-black tracking-tight uppercase mb-1 flex items-center gap-2">
                                        <Code className="w-3 h-3" /> ANALISIS KODE
                                    </p>
                                    <p className="text-[9px] text-gray-600 uppercase normal-case">Perhatikan sintaks komentar HTML. Hal yang tak terlihat di layar GUI, seringkali nampak jelas di back-end.</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                if (!hasUsedHint) {
                                    setHasUsedHint(true);
                                    localStorage.setItem('ctf_mudah_level5_hint_used', 'true');
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
                                    Di dalam barisan kode HTML, komentar ditandai dengan sintaks <span className="text-cyan-400 font-mono text-[9px]">&lt;!--</span> dan diakhiri dengan <span className="text-cyan-400 font-mono text-[9px]">--&gt;</span>. Cari baris yang mengandung teks ini pada panel kode sumber.
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* CENTER: WORKSPACE */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            <div className="flex-1 flex flex-col min-h-0 border border-cyan-500/20 rounded-2xl overflow-hidden shadow-2xl bg-black">
              
              {/* BROWSER WINDOW */}
              <div className="flex-1 bg-[#1e1e1e] border-b border-gray-800 flex flex-col min-h-[50%] relative">
                 <div className="h-10 bg-gray-900 border-b border-gray-800 flex items-center px-4 gap-4 flex-shrink-0 z-10">
                    <div className="flex gap-1.5">
                       <div className="w-3 h-3 rounded-full bg-red-500/80" />
                       <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                       <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex-1 bg-gray-950/50 rounded-md border border-gray-700/50 text-gray-400 flex items-center px-3 py-1.5 gap-2 mx-2 md:mx-8 shadow-inner">
                       <Globe className="w-3 h-3 text-cyan-500/70" />
                       <span className="text-[10px] sm:text-xs text-gray-300 truncate tracking-wide">https://admin.shadow-syndicate.onion/login</span>
                    </div>
                 </div>
                 <div className="flex-1 bg-gray-950 flex items-center justify-center p-6 relative overflow-y-auto">
                    {/* Rendered View */}
                    <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-2xl w-full max-w-sm">
                       <div className="text-center mb-8">
                          <ShieldAlert className="w-10 h-10 text-cyan-500 mx-auto mb-3" />
                          <h1 className="text-xl font-bold text-white tracking-widest font-sans">ADMIN ACCESS ONLY</h1>
                          <p className="text-xs text-gray-500 mt-1">Authorized personnel restricted area</p>
                       </div>
                       <form className="space-y-4 font-sans" onSubmit={(e) => e.preventDefault()}>
                          <div>
                             <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 block">Username</label>
                             <input type="text" className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500" disabled placeholder="admin" />
                          </div>
                          <div>
                             <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 block">Password</label>
                             <input type="password" className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500" disabled placeholder="••••••••" />
                          </div>
                          <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg text-sm mt-4 transition-colors tracking-widest" disabled>SECURE LOGIN</button>
                       </form>
                    </div>
                 </div>
              </div>

              {/* DEVTOOLS WINDOW */}
              <div className="flex-1 bg-[#1e1e1e] flex flex-col min-h-[50%] relative">
                 <div className="h-8 bg-[#252526] border-b border-[#333] flex items-center flex-shrink-0 select-none z-10 w-full overflow-hidden">
                    <div className="px-4 h-full flex items-center bg-[#1e1e1e] border-t-2 border-cyan-500 text-gray-300 text-[10px] md:text-xs font-sans whitespace-nowrap">
                       <Code className="w-3 h-3 mr-1.5" /> Elements
                    </div>
                    <div className="px-4 h-full flex items-center text-gray-500 hover:text-gray-300 text-[10px] md:text-xs cursor-default font-sans whitespace-nowrap">
                       Console
                    </div>
                    <div className="px-4 h-full flex items-center text-gray-500 hover:text-gray-300 text-[10px] md:text-xs cursor-default font-sans whitespace-nowrap">
                       Sources
                    </div>
                    <div className="px-4 h-full flex items-center text-gray-500 hover:text-gray-300 text-[10px] md:text-xs cursor-default font-sans whitespace-nowrap">
                       Network
                    </div>
                 </div>
                 
                 <div className="flex-1 p-4 font-mono text-[10px] md:text-xs overflow-y-auto custom-scrollbar select-text bg-[#1e1e1e]">
                 <div className="text-gray-400 space-y-1">
                    <div><span className="text-blue-400">&lt;!DOCTYPE html&gt;</span></div>
                    <div><span className="text-blue-400">&lt;</span><span className="text-blue-500">html</span><span className="text-blue-400">&gt;</span></div>
                    <div className="pl-4"><span className="text-blue-400">&lt;</span><span className="text-blue-500">head</span><span className="text-blue-400">&gt;</span>...<span className="text-blue-400">&lt;/</span><span className="text-blue-500">head</span><span className="text-blue-400">&gt;</span></div>
                    <div className="pl-4"><span className="text-blue-400">&lt;</span><span className="text-blue-500">body</span> <span className="text-cyan-300">class</span>=<span className="text-green-400">"bg-gray-950"</span><span className="text-blue-400">&gt;</span></div>
                    <div className="pl-8"><span className="text-blue-400">&lt;</span><span className="text-blue-500">div</span> <span className="text-cyan-300">class</span>=<span className="text-green-400">"bg-gray-900 p-8 rounded-xl..."</span><span className="text-blue-400">&gt;</span></div>
                    <div className="pl-12"><span className="text-blue-400">&lt;</span><span className="text-blue-500">h1</span><span className="text-blue-400">&gt;</span>ADMIN ACCESS ONLY<span className="text-blue-400">&lt;/</span><span className="text-blue-500">h1</span><span className="text-blue-400">&gt;</span></div>
                    <div className="pl-12"><span className="text-blue-400">&lt;</span><span className="text-blue-500">form</span> <span className="text-cyan-300">action</span>=<span className="text-green-400">"/api/auth"</span> <span className="text-cyan-300">method</span>=<span className="text-green-400">"POST"</span><span className="text-blue-400">&gt;</span></div>
                    <div className="pl-16"><span className="text-blue-400">&lt;</span><span className="text-blue-500">input</span> <span className="text-cyan-300">type</span>=<span className="text-green-400">"text"</span> <span className="text-cyan-300">placeholder</span>=<span className="text-green-400">"Username"</span><span className="text-blue-400">&gt;</span></div>
                    <div className="pl-16"><span className="text-blue-400">&lt;</span><span className="text-blue-500">input</span> <span className="text-cyan-300">type</span>=<span className="text-green-400">"password"</span> <span className="text-cyan-300">placeholder</span>=<span className="text-green-400">"Password"</span><span className="text-blue-400">&gt;</span></div>
                    <div className="pl-16"><span className="text-blue-400">&lt;</span><span className="text-blue-500">button</span> <span className="text-cyan-300">type</span>=<span className="text-green-400">"submit"</span><span className="text-blue-400">&gt;</span>SECURE LOGIN<span className="text-blue-400">&lt;/</span><span className="text-blue-500">button</span><span className="text-blue-400">&gt;</span></div>
                    <div className="pl-12"><span className="text-blue-400">&lt;/</span><span className="text-blue-500">form</span><span className="text-blue-400">&gt;</span></div>
                     <div className="pl-12 text-[#6a9955] italic mt-4 mb-4 leading-relaxed border-l-2 border-gray-700 pl-4 py-2 bg-gray-800/10 rounded-r shadow-inner selection:bg-cyan-900/50 relative">
                        &lt;!-- TODO: NOTE FOR FE DEVS --&gt;
                        <br />
                        &lt;!-- Make sure to remove temporary bypass tokens before deploying! --&gt;
                        <br />
                        &lt;!-- Decoy bypass test: <span className="select-all cursor-crosshair px-1 bg-cyan-500/5 rounded hover:bg-cyan-500/10 transition-colors">{decoyFlag}</span> --&gt;
                        <br />
                        &lt;!-- Real authenticated flag: <span className="select-all cursor-crosshair px-1 bg-cyan-500/5 rounded hover:bg-cyan-500/10 transition-colors">{realFlag}</span> --&gt;
                        {/* Hidden stub trap */}
                        <div className="absolute top-0 right-0 opacity-0 select-all text-[1px] pointer-events-none">{"CTF{WEB_STUB_DECOY_005}"}</div>
                     </div>
                    <div className="pl-8"><span className="text-blue-400">&lt;/</span><span className="text-blue-500">div</span><span className="text-blue-400">&gt;</span></div>
                    <div className="pl-4"><span className="text-blue-400">&lt;/</span><span className="text-blue-500">body</span><span className="text-blue-400">&gt;</span></div>
                    <div><span className="text-blue-400">&lt;/</span><span className="text-blue-500">html</span><span className="text-blue-400">&gt;</span></div>
                 </div>
                 </div>
                 
                 <div className="h-6 bg-[#007acc] flex items-center px-4 flex-shrink-0 cursor-default shadow-md z-10 w-full">
                    <span className="text-[9px] font-sans text-white font-medium tracking-wide">html &gt; body &gt; div &gt; form &gt; input</span>
                 </div>
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
                        <span>LEVEL: 5</span>
                    </div>
                    <div className="text-[8px] font-bold uppercase tracking-tighter italic opacity-50">-- CORE_GRID_ESTABLISHED // SOURCE_INSPECTED --</div>
                </div>

            </div>
            <AnimatePresence>
                {showExitModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex justify-center items-center p-4">
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.1)]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500" />
                            <ShieldAlert className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                            <h3 className="text-xl font-black text-white tracking-widest uppercase mb-2">ABORT MISSION?</h3>
                            <p className="text-sm text-gray-400 mb-8 font-sans">Anda yakin ingin keluar? Waktu akan terus berjalan dan progress misi Web Anda saat ini akan di-reset.</p>
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

export default MudahLevel5;
