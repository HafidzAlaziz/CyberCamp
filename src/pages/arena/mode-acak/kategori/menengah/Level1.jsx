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
  Activity,
  Check
} from 'lucide-react';

const MenengahLevel1 = () => {
  const navigate = useNavigate();
  
  // Timer: Count-up
  const [elapsed, setElapsed] = useState(0);

  const [hintStage, setHintStage] = useState(0);
  
  // Calculate dynamic stars
  const timeLimit = 720; // 15 minutes
  const isTimeFailed = elapsed > timeLimit;
  const timePenalty = isTimeFailed ? 1 : 0;
  const hintPenalty = Math.min(2, hintStage); // max 2 penalties for 2 hint stages
  const stars = Math.max(1, 4 - hintPenalty - timePenalty);
  

  const [flag, setFlag] = useState('');
  const [status, setStatus] = useState('active'); // 'active', 'wrong', 'decoy', 'complete'
  const [attempts, setAttempts] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [showHintModal, setShowHintModal] = useState(false);
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
    document.documentElement.style.setProperty('--accent-color', '#eab308');
    return () => document.documentElement.style.setProperty('--accent-color', '#00ffff');
  }, []);

  useEffect(() => {
    if (status !== 'complete') {
      const timer = setInterval(() => {
        setElapsed(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status]);

  const handleHintClick = () => {
    if (!showHint) {
      setShowHint(true);
      if (!hintStage > 0) {
        
        localStorage.setItem('ctf_menengah_level1_hint_used', 'true');
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
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Compare decoded flag
    if (flag === atob(_0x_v_auth)) {
      const timeTakenStr = formatTime(elapsed);
      setCompletionTime(timeTakenStr);
      setStatus('complete');
      const savedStats = localStorage.getItem('ctf_mode_acak_stats');
      const stats = savedStats ? JSON.parse(savedStats) : {};
      const currentBestStars = stats['menengah-1']?.stars || 0;
      const currentBestTimeSec = (() => { 
        const t = stats['menengah-1']?.bestTime; 
        if (!t) return 999999;
        const parts = String(t).split(':').map(Number);
        return parts.length === 2 ? parts[0] * 60 + parts[1] : (Number(parts[0]) || 999999);
      })();
      const isBetter = stars > currentBestStars || (stars === currentBestStars && elapsed < currentBestTimeSec);
      if (isBetter) {
         stats['menengah-1'] = { stars: stars, bestTime: timeTakenStr, conditions: [true, hintStage < 1, hintStage < 2, !isTimeFailed] };
         localStorage.setItem('ctf_mode_acak_stats', JSON.stringify(stats));
      }
      localStorage.removeItem('ctf_menengah_level1_time');
      localStorage.removeItem('ctf_menengah_level1_stars');
      localStorage.removeItem('ctf_menengah_level1_hint_used');
      localStorage.removeItem('ctf_menengah_level1_overtime');
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

  
  const unlockHintStage = (stage) => {
    if (stage <= hintStage) return;
    setHintStage(stage);
    localStorage.setItem('ctf_menengah_level1_hint_stage', stage.toString());
  };

  const handleExit = () => {
    localStorage.removeItem('ctf_menengah_level1_time');
    localStorage.removeItem('ctf_menengah_level1_stars');
    localStorage.removeItem('ctf_menengah_level1_hint_used');
    localStorage.removeItem('ctf_menengah_level1_overtime');
    navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 'menengah-1' } });
  };

  if (status === 'complete') {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 font-mono text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.1)_0%,transparent_70%)]" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="z-10 bg-gray-900 border-4 border-yellow-500 p-12 rounded-3xl text-center max-w-xl shadow-[0_0_50px_rgba(234,179,8,0.3)]">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-24 h-24 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-yellow-500/30">
            <Zap className="w-12 h-12 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_10px_#eab308]" />
          </motion.div>
          <h1 className="text-5xl font-black italic tracking-tighter mb-2 text-white uppercase leading-none">MISSION COMPLETE</h1>
          <p className="text-yellow-500 font-bold tracking-[0.3em] mb-4 text-[10px]">SECTOR: ALPHA_RECON // CLEAN_SWEEP</p>
          <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-2xl py-6 px-10 mb-8 inline-block">
             <div className="text-[10px] font-black text-gray-500 tracking-[0.4em] uppercase mb-4">Misi terselesaikan dalam</div>
             <div className="text-4xl font-black text-white italic tracking-tighter mb-6">{completionTime}</div>
             <div className="flex justify-center gap-4">
               {[1, 2, 3, 4].map(s => (
                 <Zap key={s} className={`w-10 h-10 transition-all duration-500 ${s <= stars ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_15px_#eab308]' : 'text-gray-800 fill-transparent'}`} />
               ))}
             </div>
          </div>
          <button onClick={() => navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 'menengah-1' } })} className="w-full bg-yellow-500 text-black font-black py-4 rounded-xl hover:bg-yellow-400 transition-all text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(234,179,8,0.2)]">KEMBALI KE MAP TAKTIS</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-4 md:p-8 flex flex-col overflow-hidden relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(234, 179, 8, 0.15) 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
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
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse shadow-[0_0_8px_#eab308]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-yellow-400/80">TARGET: SECTOR_ALPHA</span>
              </div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none shadow-yellow-500/20">
                LEVEL 1: <span className="text-yellow-400 drop-shadow-[0_0_10px_#eab308]">INFILTRASI WEB</span>
              </h1>
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
             <div className="text-[8px] font-black text-gray-700 tracking-[0.5em] uppercase mb-2">RANK_EFFICIENCY</div>
             <div className="flex gap-3">
                {[1, 2, 3, 4].map(s => (
                  <Zap key={s} className={`w-6 h-6 transition-all duration-700 ${s <= stars ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_10px_#eab308]' : 'text-white/10 fill-transparent opacity-20'}`} />
                ))}
             </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] font-black text-yellow-500/30 tracking-[0.3em] uppercase mb-1">ELAPSED_TIME</div>
            <div className={`text-4xl font-black italic tracking-tighter transition-colors duration-500 ${isTimeFailed ? 'text-red-500 animate-pulse' : 'text-yellow-500'}`}>
              {formatTime(elapsed)}
            </div>
          </div>
        </div>

        {/* LAYOUT */}
        <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
          
          {/* LEFT SIDE: BRIEFING */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <div className="bg-gray-950/50 border border-yellow-500/30 rounded-2xl p-6 flex-1 flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400 shadow-[0_0_15px_#eab308]" />
              <div className="flex items-center gap-3 mb-6">
                <ShieldAlert className="w-5 h-5 text-yellow-400" />
                <h2 className="text-sm font-black text-yellow-200 uppercase tracking-widest">BRIEFING MISI</h2>
              </div>
              <div className="text-xs leading-relaxed text-gray-400 overflow-y-auto pr-2 custom-scrollbar space-y-4 italic">
                <p>{" > "} Target: Portal Admin Rumah Sakit 'CareNet'</p>
                <p>{" > "} Intelligence: Sistem database menggunakan SQL legacy yang rentan terhadap bypass otentikasi.</p>
                <div className="p-3 bg-yellow-950/20 border border-yellow-500/20 rounded-lg">
                   <p className="text-yellow-400 font-black tracking-tight uppercase mb-1 flex items-center gap-2">
                     <ShieldAlert className="w-3 h-3" /> SECURITY_LEAK_DETECTED
                   </p>
                   <p className="text-[9px] text-gray-600">Terdeteksi fragmen data tercecer di memori log sitem: <span className="text-yellow-400/50 select-all">{decoys[2]}</span></p>
                </div>
                <p>{" > "} Goal: Temukan titik masuk di halaman login admin dan jebol akses tanpa kredensial yang valid.</p>
                <p className="text-yellow-300 font-bold">{" > "} Flag tersembunyi jauh di dalam response log sistem setelah bypass berhasil.</p>
              </div>
            </div>

            <div className="mt-auto space-y-3">
                   <button onClick={() => setShowHintModal(true)} className={`bg-yellow-900/20 border rounded-xl p-4 flex items-center justify-center gap-3 group transition-all shadow-[0_0_20px_rgba(234,179,8,0.1)] ${hintStage > 0 ? 'border-yellow-400 bg-yellow-900/40' : 'border-yellow-500/40 hover:bg-yellow-900/30'}`}>
              <Zap className={`w-4 h-4 transition-colors ${hintStage > 0 ? 'text-yellow-400 fill-yellow-400' : 'text-yellow-400'}`} />
              <span className="text-xs font-black text-yellow-200 uppercase tracking-widest">{hintStage > 0 ? `HINT ACTIVE (${hintStage}/2)` : '💡 MINTA HINT BOS'}</span>
            </button>
                 </div>
            
            <AnimatePresence>
              {showHint && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-gray-900/50 border border-white/5 rounded-xl p-4 text-[10px] text-gray-500 italic uppercase leading-tight">
                  <span dangerouslySetInnerHTML={{ __html: `Coba gunakan payload klasik pada input username: <span className="text-yellow-400">\' OR \'1\'=\'1</span><br class="mb-1"/><span className="text-yellow-300 font-black block mt-2">💡 Apa itu SQL Injection?</span><span className="text-gray-400 block mt-1 normal-case not-italic">SQL Injection memungkinkan kamu menyisipkan kode SQL ke dalam input form. Server memasukannya langsung ke query database tanpa filter, sehingga kondisi <span className="text-yellow-300 font-mono">OR '1'='1</span> selalu bernilai TRUE dan login bypass berhasil.</span>` }} /></motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CENTER: WORKSPACE */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            <div className="flex-1 bg-gray-950 border border-white/10 rounded-2xl flex flex-col overflow-hidden relative group shadow-2xl">
              
              <div className="h-10 bg-gray-900 border-b border-white/5 flex items-center px-4 gap-4">
                 <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                 </div>
                 <div className="flex-1 bg-black/40 rounded-md h-6 px-3 flex items-center gap-2 border border-white/5">
                    <Lock className="w-2.5 h-2.5 text-gray-600" />
                    <span className="text-[10px] text-gray-600 font-bold truncate tracking-tight uppercase">https://carenet-hospital.intranet/admin/portal</span>
                 </div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center p-8 bg-black relative overflow-hidden">
                 <div className="absolute inset-0 bg-yellow-500/5 opacity-20 pointer-events-none" />
                 
                 <AnimatePresence mode="wait">
                   {!isMockLoggedIn ? (
                     <motion.div key="login" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="w-full max-w-sm bg-gray-900/80 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl space-y-6 z-10">
                        <div className="text-center">
                           <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-3 border border-yellow-500/20">
                              <Plus className="w-6 h-6 text-yellow-400" />
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
                              <input type="text" value={mockUsername} onChange={(e) => setMockUsername(e.target.value)} placeholder="Enter Username" className="w-full h-11 bg-black/60 border border-white/10 rounded-xl px-4 text-xs text-white placeholder:text-gray-800 focus:outline-none focus:border-yellow-500/50 transition-all font-mono" />
                           </div>
                           <div className="space-y-1.5">
                              <div className="text-[8px] font-black text-gray-600 uppercase tracking-widest pl-1">Password</div>
                              <div className="relative">
                                <input type={showMockPassword ? "text" : "password"} value={mockPassword} onChange={(e) => setMockPassword(e.target.value)} placeholder="••••••••" className="w-full h-11 bg-black/60 border border-white/10 rounded-xl px-4 text-xs text-white placeholder:text-gray-800 focus:outline-none focus:border-yellow-500/50 transition-all font-mono" />
                                <button type="button" onClick={() => setShowMockPassword(!showMockPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:text-yellow-400 text-gray-600 transition-colors">
                                  {showMockPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                              </div>
                           </div>
                           {mockError && <div className="text-[9px] text-yellow-500 font-black tracking-widest uppercase animate-pulse">{mockError}</div>}
                           <button type="submit" className="w-full h-11 bg-yellow-600/20 border border-yellow-500/30 rounded-xl flex items-center justify-center text-[10px] font-black text-yellow-400 hover:bg-yellow-600/30 uppercase tracking-[0.2em] transition-all">Authenticate System</button>
                        </form>
                     </motion.div>
                   ) : (
                     <motion.div key="admin" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md bg-gray-900 border border-yellow-500/30 p-8 rounded-2xl shadow-[0_0_40px_rgba(234,179,8,0.1)] z-10">
                        <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                           <Cpu className="w-5 h-5 text-yellow-400" />
                           <div className="flex-1">
                              <h3 className="text-xs font-black text-white italic uppercase tracking-widest">ADMIN_PORTAL // DATABASE_ROOT</h3>
                              <div className="text-[8px] text-yellow-500 font-black animate-pulse uppercase">STATUS: BYPASS_SUCCESSFUL</div>
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
                                 <div className="text-yellow-400">[FOUND] SECRET_KEY_REVEALED:</div>
                                 <div className="bg-yellow-500/10 p-3 rounded mt-2 border border-yellow-500/20 text-center select-all">
                                    <span className="text-yellow-400 font-black tracking-widest text-xs select-all">
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
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-500/5 blur-[120px] rounded-full -z-0" />
              </div>
            </div>

            {/* SUBMISSION */}
            <div className="bg-gray-900/40 border border-yellow-500/30 rounded-2xl p-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10"><Terminal className="w-12 h-12 text-yellow-400" /></div>
               <form onSubmit={handleSubmit} className="relative z-10 flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <input type="text" value={flag} onChange={(e) => setFlag(e.target.value)} placeholder="Masukkan flag di sini (CTF_{...})" className={`w-full bg-black/60 border-2 rounded-xl py-4 px-6 text-sm tracking-widest text-white placeholder:text-gray-700 focus:outline-none transition-all ${status === 'wrong' || status === 'decoy' ? 'border-yellow-500 shadow-[0_0_15px_#eab308]' : 'border-yellow-500/40 focus:border-yellow-500 focus:shadow-[0_0_20px_rgba(234,179,8,0.2)]'}`} />
                    <AnimatePresence>
                      {status === 'wrong' && <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-3 -right-3 bg-yellow-600 text-[8px] font-black italic px-3 py-1 rounded-full text-white shadow-lg uppercase">ACCESS DENIED</motion.div>}
                      {status === 'decoy' && <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-3 -right-3 bg-orange-600 text-[8px] font-black italic px-3 py-1 rounded-full text-white shadow-lg uppercase">DECOY DETECTED</motion.div>}
                    </AnimatePresence>
                  </div>
                  <button type="submit" className="bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase text-xs tracking-[0.2em] px-10 py-4 rounded-xl transition-all active:scale-95 shadow-[0_10px_30px_rgba(234,179,8,0.3)]">[ SUBMIT FLAG ]</button>
               </form>
               <div className="mt-6 flex flex-wrap gap-2">
                  {attempts.map((att, idx) => (
                    <span key={idx} className="text-[9px] font-bold text-gray-700 italic border border-gray-800 px-2 py-1 rounded line-through decoration-yellow-500/50">{att}</span>
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
           <div className="text-[8px] font-bold uppercase tracking-tighter italic opacity-50">-- CORE_GRID_ESTABLISHED // TARGET_IN_SIGHT --</div>
        </div>

      </div>
      <AnimatePresence>
         {showExitModal && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowExitModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
               <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="relative bg-gray-900 border border-yellow-500/30 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
                  <ShieldAlert className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                  <h3 className="text-xl font-black text-white italic tracking-tighter uppercase mb-2">ABORT MISSION?</h3>
                  <p className="text-xs text-gray-500 uppercase italic mb-8 leading-relaxed">INTERSEPSI YANG SEDANG BERJALAN AKAN DIPUTUSKAN DAN PROGRESS LOG AKAN DI-RESET.</p>
                  <div className="flex gap-4">
                     <button onClick={handleExit} className="flex-1 bg-yellow-600 hover:bg-yellow-500 text-white font-black py-4 rounded-xl text-xs tracking-widest uppercase transition-all">YES, ABORT</button>
                     <button onClick={() => setShowExitModal(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-black py-4 rounded-xl border border-white/5 text-xs tracking-widest uppercase transition-all">CANCEL</button>
                  </div>
               </motion.div>
            </div>
         )}
      {showHintModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowHintModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-gray-900 border border-yellow-500/30 rounded-3xl p-8 max-w-lg w-full shadow-[0_0_50px_rgba(234,179,8,0.2)] overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500" />
               <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-1">INTEL_RECOVERY_HUB</h2>
                    <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Target Analysis Protocol</p>
                  </div>
                  <button onClick={() => setShowHintModal(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
               </div>
               <div className="space-y-4 mb-8">
                  {[
                    { depth: 1, label: "CLUE_ANALYSIS", content: "Coba gunakan payload SQL Injection klasik: ' OR '1'='1 pada form login." },
                    { depth: 2, label: "EXPLICIT_ANSWER", content: `FLAG_REVEAL: Salin flag yang muncul di log setelah bypass berhasil.` }
                  ].map((h, i) => (
                    <div key={i} className={`p-4 rounded-2xl border transition-all ${hintStage >= h.depth ? 'bg-yellow-500/10 border-yellow-500/40 text-gray-200' : 'bg-black/40 border-white/5 text-gray-600'}`}>
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-black tracking-widest uppercase">{h.label}</span>
                          {hintStage >= h.depth ? <Check className="w-3 h-3 text-yellow-500" /> : <Lock className="w-3 h-3" />}
                       </div>
                       {hintStage >= h.depth ? (
                         <p className="text-xs leading-relaxed italic" dangerouslySetInnerHTML={{ __html: h.content }} />
                       ) : (
                         <button onClick={() => { setHintStage(h.depth); localStorage.setItem('ctf_menengah_level1_hint_stage', h.depth.toString()); }} className="w-full py-2 bg-yellow-500 hover:bg-yellow-400 text-black text-[10px] font-black uppercase tracking-widest rounded-lg transition-all">UNLOCK INFRA DEPTH {h.depth}</button>
                       )}
                    </div>
                  ))}
               </div>
               <p className="text-[8px] text-center text-gray-700 uppercase font-bold tracking-[0.2em]">-- RANK_EFFICIENCY will be reduced upon unlock --</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenengahLevel1;
