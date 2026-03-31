import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  MessageSquare, 
  History,
  Search,
  Lock,
  X,
  Zap,
  Skull,
  Play,
  Check,
  ShieldAlert
} from 'lucide-react';

const MudahLevel1 = () => {
  const navigate = useNavigate();

  // Timer: Count-up
  const [hasUsedHint, setHasUsedHint] = useState(() => {
    return localStorage.getItem('ctf_mudah_level1_hint_used') === 'true';
  });
  const [elapsed, setElapsed] = useState(0);

  // Calculate dynamic stars
  const timeLimit = 600; // 10 minutes
  const isTimeFailed = elapsed > timeLimit;
  const hintPenalty = hasUsedHint ? 1 : 0;
  const timePenalty = isTimeFailed ? 1 : 0;
  const stars = Math.max(1, 3 - hintPenalty - timePenalty);

  const [inputText, setInputText] = useState('');
  const [status, setStatus] = useState('active'); // 'active', 'wrong', 'complete'
  const [attempts, setAttempts] = useState([]);
  const [completionTime, setCompletionTime] = useState(null);
  const [showExitModal, setShowExitModal] = useState(false);

  const realFlag = "CTF{SHADOW_REALM_2023}";

  useEffect(() => {
    if (status !== 'complete') {
      const timer = setInterval(() => {
        setElapsed(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status]);

  const formatTime = (seconds) => {
    const isNeg = seconds < 0;
    const absSecs = Math.abs(seconds);
    const m = Math.floor(absSecs / 60);
    const s = absSecs % 60;
    return `${isNeg ? '-' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const submitFlag = (e) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    if (inputText.trim() === realFlag) {
      setStatus('complete');
      const timeTakenStr = formatTime(elapsed);
      setCompletionTime(timeTakenStr);
      
      const savedStats = localStorage.getItem('ctf_mode_acak_stats');
      const stats = savedStats ? JSON.parse(savedStats) : {};
      const currentBestStars = stats['mudah-1']?.stars || 0;
      const currentBestTimeSec = (() => { 
        const t = stats['mudah-1']?.bestTime; 
        if (!t) return 999999;
        const parts = String(t).split(':').map(Number);
        return parts.length === 2 ? parts[0] * 60 + parts[1] : (Number(parts[0]) || 999999);
      })();
      const isBetter = stars > currentBestStars || (stars === currentBestStars && elapsed < currentBestTimeSec);
      if (isBetter) {
         stats['mudah-1'] = { stars: stars, bestTime: timeTakenStr, conditions: [true, !hasUsedHint, !isTimeFailed] };
         localStorage.setItem('ctf_mode_acak_stats', JSON.stringify(stats));
      }
      localStorage.removeItem('ctf_mudah_level1_time');
      localStorage.removeItem('ctf_mudah_level1_stars');
      localStorage.removeItem('ctf_mudah_level1_hint_used');
      localStorage.removeItem('ctf_mudah_level1_overtime');
    } else {
      setStatus('wrong');
      setAttempts(prev => [...prev, inputText]);
      setTimeout(() => setStatus('active'), 2000);
    }
    setInputText('');
  };

  const handleExit = () => {
    localStorage.removeItem('ctf_mudah_level1_time');
    localStorage.removeItem('ctf_mudah_level1_stars');
    localStorage.removeItem('ctf_mudah_level1_hint_used');
    localStorage.removeItem('ctf_mudah_level1_overtime');
    navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 'mudah-1' } });
  };

  if (status === 'complete') {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 font-mono text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_70%)]" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="z-10 bg-gray-900 border-4 border-cyan-500 p-12 rounded-3xl text-center max-w-xl shadow-[0_0_50px_rgba(6,182,212,0.3)]">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-cyan-500/30">
            <Check className="w-12 h-12 text-cyan-400 drop-shadow-[0_0_10px_#22d3ee]" />
          </motion.div>
          <h1 className="text-5xl font-black italic tracking-tighter mb-2 text-white uppercase leading-none">MISSION COMPLETE</h1>
          <p className="text-cyan-500 font-bold tracking-[0.3em] mb-4 text-[10px]">SECTOR: SHADOW_REALM // ACCESS_CRACKED</p>
          <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-2xl py-6 px-10 mb-8 inline-block">
             <div className="text-[10px] font-black text-gray-500 tracking-[0.4em] uppercase mb-4">Misi terselesaikan dalam</div>
             <div className="text-4xl font-black text-white italic tracking-tighter mb-6">{completionTime}</div>
             <div className="flex justify-center gap-4">
               {[1, 2, 3].map(s => (
                 <Zap key={s} className={`w-10 h-10 transition-all duration-500 ${s <= stars ? 'text-cyan-400 fill-cyan-400 drop-shadow-[0_0_15px_#22d3ee]' : 'text-gray-800 fill-transparent'}`} />
               ))}
             </div>
          </div>
          <button onClick={() => navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 'mudah-1' } })} className="w-full bg-cyan-500 text-black font-black py-4 rounded-xl hover:bg-cyan-400 transition-all text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(6,182,212,0.2)]">KEMBALI KE MAP TAKTIS</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-4 md:p-8 flex flex-col overflow-hidden relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #083344 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
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
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_#22d3ee]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400/80">TARGET: SECTOR_SOCIAL</span>
              </div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">
                LEVEL 1: <span className="text-cyan-400 drop-shadow-[0_0_10px_#22d3ee]">PENGINTAIAN OSINT</span>
              </h1>
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
             <div className="text-[8px] font-black text-gray-700 tracking-[0.5em] uppercase mb-2">RANK_EFFICIENCY</div>
             <div className="flex gap-3">
                {[1, 2, 3].map(s => (
                  <Zap key={s} className={`w-6 h-6 transition-all duration-700 ${s <= stars ? 'text-cyan-400 fill-cyan-400 drop-shadow-[0_0_10px_#22d3ee]' : 'text-white/10 fill-transparent opacity-20'}`} />
                ))}
             </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] font-black text-cyan-500/30 tracking-[0.3em] uppercase mb-1">ELAPSED_TIME</div>
            <div className={`text-4xl font-black italic tracking-tighter transition-colors duration-500 text-cyan-600`}>
              {formatTime(elapsed)}
            </div>
          </div>
        </div>

        {/* LAYOUT GRID */}
        <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
          
          {/* LEFT SIDE: BRIEFING & ANALYTICS */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <div className="bg-gray-950/50 border border-cyan-500/30 rounded-2xl p-6 flex-1 flex flex-col relative overflow-hidden group shadow-[inset_0_0_20px_rgba(6,182,212,0.05)]">
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 shadow-[0_0_15px_#06b6d4]" />
              <div className="flex items-center gap-3 mb-6">
                <Search className="w-5 h-5 text-cyan-400" />
                <h2 className="text-sm font-black text-cyan-200 uppercase tracking-widest">BRIEFING MISI</h2>
              </div>
              <div className="text-xs leading-relaxed text-gray-400 overflow-y-auto pr-2 custom-scrollbar space-y-4 italic mb-8">
                <p>{" > "} Intelijen telah mencegat pengiriman data terfragmentasi dari server messenger pribadi "The Shadow Syndicate".</p>
                <div className="p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-lg">
                   <p className="text-cyan-400 font-black tracking-tight uppercase mb-1 flex items-center gap-2">
                     <MessageSquare className="w-3 h-3" /> CHAT_CONTEXT
                   </p>
                   <p className="text-[9px] text-gray-600 uppercase italic">Pelajari riwayat percakapan antara anggota sindikat di panel pusat. Cari kunci akses (Flag) yang mungkin tidak sengaja mereka sebutkan selama diskusi teknis.</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                   <div className="flex items-center gap-3">
                      <History className="w-4 h-4 text-cyan-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Chat Logs Extracted</span>
                   </div>
                   <span className="text-[10px] font-bold text-cyan-500">22.4 MB</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                   <div className="flex items-center gap-3">
                      <Skull className="w-4 h-4 text-cyan-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Anonymity Shield</span>
                   </div>
                   <span className="text-[10px] font-bold text-green-500 italic">ACTIVE</span>
                </div>
              </div>
            </div>

            <div className="mt-auto space-y-3">
               <button 
                  onClick={() => { setHasUsedHint(true); localStorage.setItem('ctf_mudah_level1_hint_used', 'true'); }} 
                  className={`w-full border rounded-xl p-4 flex items-center justify-center gap-3 group transition-all shadow-[0_0_20px_rgba(6,182,212,0.1)] ${hasUsedHint ? 'border-cyan-400 bg-cyan-950/40 text-cyan-400' : 'border-cyan-500/40 bg-cyan-950/20 hover:bg-cyan-950/30 text-cyan-200'}`}
               >
                  <Zap className={`w-4 h-4 transition-colors ${hasUsedHint ? 'fill-cyan-400' : ''}`} />
                  <span className="text-xs font-black uppercase tracking-widest">{hasUsedHint ? 'HINT ACTIVE' : '💡 MINTA JAWABAN (-1 BINTANG)'}</span>
               </button>
               <AnimatePresence>
                  {hasUsedHint && (
                     <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-gray-900/50 border border-white/5 rounded-xl p-4 text-[10px] text-gray-400 italic leading-tight uppercase font-black tracking-widest text-center mt-2 overflow-hidden">
                        <span className="text-cyan-400">ANSWER:</span> {"CTF{SHADOW_REALM_2023}"}
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>
          </div>

          {/* CENTER: CHAT INTERFACE & SUBMISSION */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            <div className="flex-1 bg-black border border-cyan-500/20 rounded-2xl flex flex-col overflow-hidden relative group shadow-2xl">
               <div className="h-10 bg-gray-900/80 border-b border-white/5 flex items-center px-4 gap-4 backdrop-blur-md justify-between">
                  <div className="flex items-center gap-2">
                     <MessageSquare className="w-3 h-3 text-cyan-500" />
                     <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">ShadowChat encrypted_log_#8812</span>
                  </div>
                  <div className="flex gap-1.5">
                     <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_5px_#22d3ee]" />
                     <div className="text-[8px] font-black text-cyan-500/80 uppercase">LIVE_INTERCEPT</div>
                  </div>
               </div>

               <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                  {/* CHAT MESSAGES */}
                  <div className="flex items-start gap-4">
                     <div className="w-8 h-8 rounded bg-cyan-900/30 border border-cyan-500/30 flex items-center justify-center text-[10px] font-black text-cyan-400 shadow-lg">NX</div>
                     <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-1">
                           <span className="text-xs font-black text-cyan-400 uppercase tracking-tighter">NightCrawler</span>
                           <span className="text-[8px] text-gray-600 font-mono italic">02:14:15</span>
                        </div>
                        <div className="bg-gray-900/80 p-3 rounded-2xl rounded-tl-none border border-white/5 text-xs text-gray-300 leading-relaxed max-w-[85%]">
                           Yo, sytem admin udah update password vault ke server baru. Tapi dia lupa hapus log debug-nya di folder log harian.
                        </div>
                     </div>
                  </div>

                  <div className="flex items-start gap-4 flex-row-reverse">
                     <div className="w-8 h-8 rounded bg-gray-800 border border-white/10 flex items-center justify-center text-[10px] font-black text-gray-500">GV</div>
                     <div className="flex-1 text-right flex flex-col items-end">
                        <div className="flex items-baseline gap-2 mb-1">
                           <span className="text-[8px] text-gray-700 font-mono italic">02:15:33</span>
                           <span className="text-xs font-black text-gray-400 uppercase tracking-tighter">G0st_Viper</span>
                        </div>
                        <div className="bg-cyan-950/20 p-3 rounded-2xl rounded-tr-none border border-cyan-500/10 text-xs text-gray-400 leading-relaxed max-w-[85%] italic">
                           Log debug yang mana? Bukannya kemaren udah di-purge sama script cronjob?
                        </div>
                     </div>
                  </div>

                  <div className="flex items-start gap-4">
                     <div className="w-8 h-8 rounded bg-cyan-900/30 border border-cyan-500/30 flex items-center justify-center text-[10px] font-black text-cyan-400 shadow-lg">NX</div>
                     <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-1">
                           <span className="text-xs font-black text-cyan-400 uppercase tracking-tighter">NightCrawler</span>
                           <span className="text-[8px] text-gray-600 font-mono italic">02:16:02</span>
                        </div>
                        <div className="bg-gray-900/80 p-3 rounded-2xl rounded-tl-none border border-white/5 text-xs text-gray-300 leading-relaxed max-w-[85%] text-indigo-100">
                           Niatnya sih gitu, tapi ternyata parser-nya error. Dia simpan variabel di folder <span className="text-cyan-500 font-mono">/dev/null/backup_secrets/</span>. Nama flag-nya unik, kombinasi dari <span className="text-cyan-400 italic">Nama Project</span> dan <span className="text-cyan-400 italic">Tahun Shutdown</span>.
                        </div>
                     </div>
                  </div>

                  <div className="flex items-start gap-4 flex-row-reverse">
                     <div className="w-8 h-8 rounded bg-gray-800 border border-white/10 flex items-center justify-center text-[10px] font-black text-gray-500">GV</div>
                     <div className="flex-1 text-right flex flex-col items-end">
                        <div className="flex items-baseline gap-2 mb-1">
                           <span className="text-[8px] text-gray-700 font-mono italic">02:16:44</span>
                           <span className="text-xs font-black text-gray-400 uppercase tracking-tighter">G0st_Viper</span>
                        </div>
                        <div className="bg-cyan-950/20 p-3 rounded-2xl rounded-tr-none border border-cyan-500/10 text-xs text-gray-400 leading-relaxed max-w-[85%]">
                           Oh, maksud lu project <span className="text-cyan-300 font-bold">"SHADOW_REALM"</span> yang kena takedown tahun <span className="text-cyan-300 font-bold">2023</span> itu?
                        </div>
                     </div>
                  </div>

                  <div className="flex items-start gap-4">
                     <div className="w-8 h-8 rounded bg-cyan-900/30 border border-cyan-500/30 flex items-center justify-center text-[10px] font-black text-cyan-400 shadow-lg">NX</div>
                     <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-1">
                           <span className="text-xs font-black text-cyan-400 uppercase tracking-tighter">NightCrawler</span>
                           <span className="text-[8px] text-gray-600 font-mono italic">02:17:10</span>
                        </div>
                        <div className="bg-gray-900/80 p-3 rounded-2xl rounded-tl-none border border-white/5 text-xs text-gray-300 leading-relaxed max-w-[85%]">
                           Bingo. Lu gabungin aja jadi satu: <span className="text-cyan-500 font-mono italic">CTF{"{NAMA_TAHUN}"}</span>. Tebak sendiri lah sisanya, masa semuanya harus disuapin.
                        </div>
                     </div>
                  </div>
               </div>

               {/* FLAGS SUBMISSION */}
               <div className="bg-gray-900/80 border-t border-cyan-500/20 p-6 backdrop-blur-md">
                  <div className="text-[9px] font-black text-cyan-500/50 uppercase tracking-[0.3em] mb-4">Input recovered credentials:</div>
                  <form onSubmit={submitFlag} className="flex gap-4">
                     <div className="relative flex-1 group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500/30 group-focus-within:text-cyan-500 transition-colors" />
                        <input
                           type="text"
                           value={inputText}
                           onChange={(e) => setInputText(e.target.value)}
                           placeholder="CTF{...}"
                           className={`w-full bg-black/60 border ${status === 'wrong' ? 'border-red-500 shadow-[0_0_15px_#ef4444]' : 'border-cyan-500/30 focus:border-cyan-500'} rounded-xl py-4 pl-12 pr-4 text-xs font-mono text-white focus:outline-none transition-all tracking-widest`}
                        />
                     </div>
                     <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white font-black px-8 py-4 rounded-xl text-xs tracking-widest uppercase transition-all shadow-lg active:scale-95 flex items-center gap-2">
                        [ CRACK ] <Check className="w-4 h-4" />
                     </button>
                  </form>
                  <div className="mt-4 flex gap-2 overflow-x-auto pb-2 h-8">
                     {attempts.map((att, i) => (
                        <div key={i} className="px-2 py-1 bg-cyan-950/30 border border-cyan-500/20 rounded text-[8px] text-cyan-400/50 italic line-through whitespace-nowrap">{att}</div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-700">
           <div className="flex items-center gap-4 text-[9px] font-black tracking-widest">
              <span className="text-cyan-500/50">{" > "} INTERCEPT: ACTIVE</span>
              <span className="text-gray-800">//</span>
              <span>MODE: ACAK</span>
              <span className="text-gray-800">//</span>
              <span>LEVEL: 1</span>
           </div>
           <div className="text-[8px] font-bold uppercase tracking-tighter italic opacity-50">-- TERMINAL_INTERCEPT_V.8.1 // SHADOW_MESSENGER_PROTO --</div>
        </div>
      </div>

      {/* MODALS */}
      <AnimatePresence>
        {showExitModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowExitModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="relative bg-gray-900 border border-cyan-500/30 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
                <ShieldAlert className="w-12 h-12 text-cyan-600 mx-auto mb-4" />
                <h3 className="text-xl font-black text-white italic tracking-tighter uppercase mb-2">ABORT MISSION?</h3>
                <p className="text-xs text-gray-500 uppercase italic mb-8 leading-relaxed">INTERSEPSI YANG SEDANG BERJALAN AKAN DIPUTUSKAN DAN PROGRESS LOG AKAN DI-RESET.</p>
                <div className="flex gap-4">
                   <button onClick={handleExit} className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-black py-4 rounded-xl text-xs tracking-widest uppercase transition-all">YES, ABORT</button>
                   <button onClick={() => setShowExitModal(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-black py-4 rounded-xl border border-white/5 text-xs tracking-widest uppercase transition-all">CANCEL</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MudahLevel1;
