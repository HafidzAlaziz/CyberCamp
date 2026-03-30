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

const Level8 = () => {
  const navigate = useNavigate();

  // Timer: Count-up
  const [elapsed, setElapsed] = useState(0);
  const [hintStage, setHintStage] = useState(() => {
    return parseInt(localStorage.getItem('ctf_level8_hint_stage') || '0');
  });

  const [stars, setStars] = useState(() => {
    const saved = localStorage.getItem('ctf_level8_stars');
    if (saved) return parseInt(saved);
    const currentHint = parseInt(localStorage.getItem('ctf_level8_hint_stage') || '0');
    return Math.max(1, 4 - currentHint);
  });

  const [inputText, setInputText] = useState('');
  const [status, setStatus] = useState('active'); // 'active', 'wrong', 'complete'
  const [attempts, setAttempts] = useState([]);
  const [showHintModal, setShowHintModal] = useState(false);
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
      
      const stats = JSON.parse(localStorage.getItem('ctf_mode_acak_stats')) || {};
      const currentBestStars = stats[8]?.stars || 0;
      if (stars >= currentBestStars) {
         stats[8] = { stars: stars, bestTime: timeTakenStr };
         localStorage.setItem('ctf_mode_acak_stats', JSON.stringify(stats));
      }
      localStorage.removeItem('ctf_level8_time');
      localStorage.removeItem('ctf_level8_stars');
      localStorage.removeItem('ctf_level8_hint_stage');
      localStorage.removeItem('ctf_level8_overtime');
    } else {
      setStatus('wrong');
      setAttempts(prev => [...prev, inputText]);
      setTimeout(() => setStatus('active'), 2000);
    }
    setInputText('');
  };

  const handleExit = () => {
    localStorage.removeItem('ctf_level8_time');
    localStorage.removeItem('ctf_level8_stars');
    localStorage.removeItem('ctf_level8_hint_stage');
    localStorage.removeItem('ctf_level8_overtime');
    navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 8 } });
  };

  const unlockHintStage = (stage) => {
    if (stage <= hintStage) return;
    const newStars = Math.max(1, 4 - stage);
    setStars(newStars);
    localStorage.setItem('ctf_level8_stars', newStars.toString());
    
    setHintStage(stage);
    localStorage.setItem('ctf_level8_hint_stage', stage.toString());
  };

  if (status === 'complete') {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 font-mono text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.1)_0%,transparent_70%)]" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="z-10 bg-gray-900 border-4 border-rose-500 p-12 rounded-3xl text-center max-w-xl shadow-[0_0_50px_rgba(244,63,94,0.3)]">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-24 h-24 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-rose-500/30">
            <Skull className="w-12 h-12 text-rose-400 drop-shadow-[0_0_10px_#f43f5e]" />
          </motion.div>
          <h1 className="text-5xl font-black italic tracking-tighter mb-2 text-white uppercase leading-none">MISSION COMPLETE</h1>
          <p className="text-rose-500 font-bold tracking-[0.3em] mb-4 text-[10px]">SECTOR: SHADOW_REALM // ACCESS_CRACKED</p>
          <div className="bg-rose-500/5 border border-rose-500/10 rounded-2xl py-6 px-10 mb-8 inline-block">
             <div className="text-[10px] font-black text-gray-500 tracking-[0.4em] uppercase mb-4">Misi terselesaikan dalam</div>
             <div className="text-4xl font-black text-white italic tracking-tighter mb-6">{completionTime}</div>
             <div className="flex justify-center gap-4">
               {[1, 2, 3, 4].map(s => (
                 <Zap key={s} className={`w-10 h-10 transition-all duration-500 ${s <= stars ? 'text-rose-400 fill-rose-400 drop-shadow-[0_0_15px_#f43f5e]' : 'text-gray-800 fill-transparent'}`} />
               ))}
             </div>
          </div>
          <button onClick={() => navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 8 } })} className="w-full bg-rose-500 text-black font-black py-4 rounded-xl hover:bg-rose-400 transition-all text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(244,63,94,0.2)]">KEMBALI KE MAP TAKTIS</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-4 md:p-8 flex flex-col overflow-hidden relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #4c0519 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col relative z-10">
        
        {/* HEADER AREA */}
        <div className="flex justify-between items-start mb-8 relative">
          <div className="flex gap-4 items-start z-10">
            <button 
              onClick={() => setShowExitModal(true)} 
              className="mt-1 p-2 bg-gray-900 border border-rose-500/30 rounded-xl hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 transition-all group"
              title="Abort Mission"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse shadow-[0_0_8px_#f43f5e]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-400/80">TARGET: SECTOR_SOCIAL</span>
              </div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">
                LEVEL 8: <span className="text-rose-600 drop-shadow-[0_0_10px_#f43f5e]">SOCIAL ENGINEERING</span>
              </h1>
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
             <div className="text-[8px] font-black text-gray-700 tracking-[0.5em] uppercase mb-2">RANK_EFFICIENCY</div>
             <div className="flex gap-3">
                {[1, 2, 3, 4].map(s => (
                  <Zap key={s} className={`w-6 h-6 transition-all duration-700 ${s <= stars ? 'text-rose-400 fill-rose-400 drop-shadow-[0_0_10px_#f43f5e]' : 'text-white/10 fill-transparent opacity-20'}`} />
                ))}
             </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] font-black text-cyan-500/30 tracking-[0.3em] uppercase mb-1">ELAPSED_TIME</div>
            <div className={`text-4xl font-black italic tracking-tighter transition-colors duration-500 text-rose-600`}>
              {formatTime(elapsed)}
            </div>
          </div>
        </div>

        {/* LAYOUT GRID */}
        <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
          
          {/* LEFT SIDE: BRIEFING & ANALYTICS */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <div className="bg-gray-950/50 border border-rose-500/30 rounded-2xl p-6 flex-1 flex flex-col relative overflow-hidden group shadow-[inset_0_0_20px_rgba(244,63,94,0.05)]">
              <div className="absolute top-0 left-0 w-1 h-full bg-rose-500 shadow-[0_0_15px_#f43f5e]" />
              <div className="flex items-center gap-3 mb-6">
                <Search className="w-5 h-5 text-rose-400" />
                <h2 className="text-sm font-black text-rose-200 uppercase tracking-widest">BRIEFING MISI</h2>
              </div>
              <div className="text-xs leading-relaxed text-gray-400 overflow-y-auto pr-2 custom-scrollbar space-y-4 italic mb-8">
                <p>{" > "} Intelijen telah mencegat pengiriman data terfragmentasi dari server messenger pribadi "The Shadow Syndicate".</p>
                <div className="p-3 bg-rose-950/20 border border-rose-500/20 rounded-lg">
                   <p className="text-rose-400 font-black tracking-tight uppercase mb-1 flex items-center gap-2">
                     <MessageSquare className="w-3 h-3" /> CHAT_CONTEXT
                   </p>
                   <p className="text-[9px] text-gray-600 uppercase italic">Pelajari riwayat percakapan antara anggota sindikat di panel pusat. Cari kunci akses (Flag) yang mungkin tidak sengaja mereka sebutkan selama diskusi teknis.</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                   <div className="flex items-center gap-3">
                      <History className="w-4 h-4 text-rose-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Chat Logs Extracted</span>
                   </div>
                   <span className="text-[10px] font-bold text-rose-500">22.4 MB</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                   <div className="flex items-center gap-3">
                      <Skull className="w-4 h-4 text-rose-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Anonymity Shield</span>
                   </div>
                   <span className="text-[10px] font-bold text-green-500 italic">ACTIVE</span>
                </div>
              </div>
            </div>

            <button onClick={() => setShowHintModal(true)} className={`bg-rose-900/20 border rounded-xl p-4 flex items-center justify-center gap-3 group transition-all shadow-[0_0_20px_rgba(244,63,94,0.1)] ${hintStage > 0 ? 'border-rose-400 bg-rose-900/40' : 'border-rose-500/40 hover:bg-rose-900/30'}`}>
              <Zap className={`w-4 h-4 transition-colors ${hintStage > 0 ? 'text-rose-400 fill-rose-400' : 'text-rose-400'}`} />
              <span className="text-xs font-black text-rose-200 uppercase tracking-widest uppercase">💡 MINTA HINT BOS ({hintStage}/3)</span>
            </button>
          </div>

          {/* CENTER: CHAT INTERFACE & SUBMISSION */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            <div className="flex-1 bg-black border border-rose-500/20 rounded-2xl flex flex-col overflow-hidden relative group shadow-2xl">
               <div className="h-10 bg-gray-900/80 border-b border-white/5 flex items-center px-4 gap-4 backdrop-blur-md justify-between">
                  <div className="flex items-center gap-2">
                     <MessageSquare className="w-3 h-3 text-rose-500" />
                     <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">ShadowChat encrypted_log_#8812</span>
                  </div>
                  <div className="flex gap-1.5">
                     <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_5px_#f43f5e]" />
                     <div className="text-[8px] font-black text-rose-500/80 uppercase">LIVE_INTERCEPT</div>
                  </div>
               </div>

               <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                  {/* CHAT MESSAGES */}
                  <div className="flex items-start gap-4">
                     <div className="w-8 h-8 rounded bg-rose-900/30 border border-rose-500/30 flex items-center justify-center text-[10px] font-black text-rose-400 shadow-lg">NX</div>
                     <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-1">
                           <span className="text-xs font-black text-rose-400 uppercase tracking-tighter">NightCrawler</span>
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
                        <div className="bg-rose-950/20 p-3 rounded-2xl rounded-tr-none border border-rose-500/10 text-xs text-gray-400 leading-relaxed max-w-[85%] italic">
                           Log debug yang mana? Bukannya kemaren udah di-purge sama script cronjob?
                        </div>
                     </div>
                  </div>

                  <div className="flex items-start gap-4">
                     <div className="w-8 h-8 rounded bg-rose-900/30 border border-rose-500/30 flex items-center justify-center text-[10px] font-black text-rose-400 shadow-lg">NX</div>
                     <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-1">
                           <span className="text-xs font-black text-rose-400 uppercase tracking-tighter">NightCrawler</span>
                           <span className="text-[8px] text-gray-600 font-mono italic">02:16:02</span>
                        </div>
                        <div className="bg-gray-900/80 p-3 rounded-2xl rounded-tl-none border border-white/5 text-xs text-gray-300 leading-relaxed max-w-[85%]">
                           Niatnya sih gitu, tapi ternyata parser-nya error. Dia simpan variabel di folder <span className="text-rose-500 font-mono">/dev/null/backup_secrets/</span>. Nama flag-nya unik, kombinasi dari <span className="text-rose-400 italic">Nama Project</span> dan <span className="text-rose-400 italic">Tahun Shutdown</span>.
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
                        <div className="bg-rose-950/20 p-3 rounded-2xl rounded-tr-none border border-rose-500/10 text-xs text-gray-400 leading-relaxed max-w-[85%]">
                           Oh, maksud lu project <span className="text-rose-300 font-bold">"SHADOW_REALM"</span> yang kena takedown tahun <span className="text-rose-300 font-bold">2023</span> itu?
                        </div>
                     </div>
                  </div>

                  <div className="flex items-start gap-4">
                     <div className="w-8 h-8 rounded bg-rose-900/30 border border-rose-500/30 flex items-center justify-center text-[10px] font-black text-rose-400 shadow-lg">NX</div>
                     <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-1">
                           <span className="text-xs font-black text-rose-400 uppercase tracking-tighter">NightCrawler</span>
                           <span className="text-[8px] text-gray-600 font-mono italic">02:17:10</span>
                        </div>
                        <div className="bg-gray-900/80 p-3 rounded-2xl rounded-tl-none border border-white/5 text-xs text-gray-300 leading-relaxed max-w-[85%]">
                           Bingo. Lu gabungin aja jadi satu: <span className="text-rose-500 font-mono italic">CTF{"{NAMA_TAHUN}"}</span>. Tebak sendiri lah sisanya, masa semuanya harus disuapin.
                        </div>
                     </div>
                  </div>
               </div>

               {/* FLAGS SUBMISSION */}
               <div className="bg-gray-900/80 border-t border-rose-500/20 p-6 backdrop-blur-md">
                  <div className="text-[9px] font-black text-rose-500/50 uppercase tracking-[0.3em] mb-4">Input recovered credentials:</div>
                  <form onSubmit={submitFlag} className="flex gap-4">
                     <div className="relative flex-1 group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-500/30 group-focus-within:text-rose-500 transition-colors" />
                        <input
                           type="text"
                           value={inputText}
                           onChange={(e) => setInputText(e.target.value)}
                           placeholder="CTF{...}"
                           className={`w-full bg-black/60 border ${status === 'wrong' ? 'border-red-500 shadow-[0_0_15px_#ef4444]' : 'border-rose-500/30 focus:border-rose-500'} rounded-xl py-4 pl-12 pr-4 text-xs font-mono text-white focus:outline-none transition-all tracking-widest`}
                        />
                     </div>
                     <button type="submit" className="bg-rose-600 hover:bg-rose-500 text-white font-black px-8 py-4 rounded-xl text-xs tracking-widest uppercase transition-all shadow-lg active:scale-95 flex items-center gap-2">
                        [ CRACK ] <Check className="w-4 h-4" />
                     </button>
                  </form>
                  <div className="mt-4 flex gap-2 overflow-x-auto pb-2 h-8">
                     {attempts.map((att, i) => (
                        <div key={i} className="px-2 py-1 bg-red-950/30 border border-red-500/20 rounded text-[8px] text-red-400/50 italic line-through whitespace-nowrap">{att}</div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-700">
           <div className="flex items-center gap-4 text-[9px] font-black tracking-widest">
              <span className="text-rose-500/50">{" > "} INTERCEPT: ACTIVE</span>
              <span className="text-gray-800">//</span>
              <span>MODE: ACAK</span>
              <span className="text-gray-800">//</span>
              <span>LEVEL: 8</span>
           </div>
           <div className="text-[8px] font-bold uppercase tracking-tighter italic opacity-50">-- TERMINAL_INTERCEPT_V.8.1 // SHADOW_MESSENGER_PROTO --</div>
        </div>
      </div>

      {/* MODALS */}
      <AnimatePresence>
        {showHintModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowHintModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-gray-900 border border-rose-500/30 rounded-3xl p-8 max-w-lg w-full shadow-[0_0_50px_rgba(244,63,94,0.2)] overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-rose-500 shadow-[0_0_15px_#f43f5e]" />
               <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-1">INTEL_RECOVERY_HUB</h2>
                    <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Sector 8: Social Engineering Analysis</p>
                  </div>
                  <button onClick={() => setShowHintModal(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
               </div>

               <div className="space-y-4 mb-8">
                  {[
                    { depth: 1, label: "ANALYZING_CONTEXT", content: `<span class="text-purple-300 font-black block mb-2">💡 Apa itu Social Engineering?</span><span class="text-gray-400 block normal-case not-italic">Teknik manipulasi psikologis untuk mendapatkan informasi rahasia. Perhatikan log chat — seringkali admin atau user tidak sengaja membocorkan Flag saat berdiskusi di kanal yang mereka anggap aman. Cari string berpola <span class="text-purple-300 font-mono">CTF{...}</span> di percakapan.</span>` },
                    { depth: 2, label: "DEEP_SCAN_SOCIAL", content: "Chat log ini berisi jejak password yang tak sengaja terekspos. Perhatikan dengan teliti pesan dari 'NightCrawler' di bagian akhir percakapan." },
                    { depth: 3, label: "EXTRACT_FLAG_DATA", content: "Flag yang kamu cari adalah: <span class='text-rose-500 font-mono'>CTF{SHADOW_REALM_2023}</span>" }
                  ].map((h, i) => (
                    <div key={i} className={`p-4 rounded-2xl border transition-all ${hintStage >= h.depth ? 'bg-rose-500/10 border-rose-500/40 text-gray-200' : 'bg-black/40 border-white/5 text-gray-600'}`}>
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-black tracking-widest uppercase">{h.label}</span>
                          {hintStage >= h.depth ? <Check className="w-3 h-3 text-rose-500" /> : <Lock className="w-3 h-3" />}
                       </div>
                       {hintStage >= h.depth ? (
                         <p className="text-xs leading-relaxed italic" dangerouslySetInnerHTML={{ __html: h.content }} />
                       ) : (
                         <button onClick={() => unlockHintStage(h.depth)} className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all">UNLOCK INTEL DEPTH {h.depth}</button>
                       )}
                    </div>
                  ))}
               </div>
               
               <p className="text-[8px] text-center text-gray-700 uppercase font-bold tracking-[0.2em]">-- WARNING: Intel recovery will reduce efficiency rank --</p>
            </motion.div>
          </div>
        )}

        {showExitModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowExitModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="relative bg-gray-900 border border-rose-500/30 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
                <ShieldAlert className="w-12 h-12 text-rose-600 mx-auto mb-4" />
                <h3 className="text-xl font-black text-white italic tracking-tighter uppercase mb-2">ABORT MISSION?</h3>
                <p className="text-xs text-gray-500 uppercase italic mb-8 leading-relaxed">INTERSEPSI YANG SEDANG BERJALAN AKAN DIPUTUSKAN DAN PROGRESS LOG AKAN DI-RESET.</p>
                <div className="flex gap-4">
                   <button onClick={handleExit} className="flex-1 bg-red-600 hover:bg-red-500 text-white font-black py-4 rounded-xl text-xs tracking-widest uppercase transition-all">YES, ABORT</button>
                   <button onClick={() => setShowExitModal(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-black py-4 rounded-xl border border-white/5 text-xs tracking-widest uppercase transition-all">CANCEL</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Level8;
