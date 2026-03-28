import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Database,
  Clock,
  Zap,
  ChevronLeft,
  X,
  Play,
  Search,
  ShieldAlert,
  Server,
  Lock,
  Eye,
  Terminal,
  Activity
} from 'lucide-react';

const Level6 = () => {
  const navigate = useNavigate();

  // Timer Persistence Logic (600s / 10 Minutes)
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem('ctf_level6_time');
    return saved ? parseInt(saved) : 600;
  });

  const [stars, setStars] = useState(() => {
    const saved = localStorage.getItem('ctf_level6_stars');
    return saved ? parseInt(saved) : 3;
  });
  const [hasUsedHint, setHasUsedHint] = useState(() => {
    return localStorage.getItem('ctf_level6_hint_used') === 'true';
  });
  const [hasOvertimePenalty, setHasOvertimePenalty] = useState(() => {
    return localStorage.getItem('ctf_level6_overtime') === 'true';
  });

  const [flag, setFlag] = useState('');
  const [status, setStatus] = useState('active'); // 'active', 'wrong', 'decoy', 'complete'
  const [attempts, setAttempts] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [completionTime, setCompletionTime] = useState(null);
  const [showExitModal, setShowExitModal] = useState(false);

  // Challenge Specific States
  const [queryInput, setQueryInput] = useState('');
  const [isDumped, setIsDumped] = useState(false);
  const [queryError, setQueryError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // SECURITY: Obfuscation
  const [realFlag] = useState(() => atob("Q1RGe1NRTF9ENHQ0X0R1bXBpbmdfU3VjYzNzc30=")); // CTF{SQL_D4t4_Dumping_Succ3ss}
  const [decoyString] = useState(["CTF{D4T4B4S3_1S_L0CK3D}", "CTF{N1C3_TRY_H4CK3R}"]);

  // DB Data Simulation
  const dbData = [
    { id: "EMP-001", user: "Admin", dept: "Executive", login: "2024-05-18 09:12:00" },
    { id: "EMP-002", user: "Manager_S01", dept: "Operations", login: "2024-05-18 08:45:22" },
    { id: "EMP-003", user: "Technician_09", dept: "Engineering", login: "2024-05-17 14:30:11" },
    { id: "EMP-004", user: "Intern_Dev", dept: "IT_Support", login: "2024-05-18 10:05:44" },
    { id: "EMP-005", user: "HR_Rep_Sarah", dept: "Human_Resources", login: "2024-05-16 09:00:00" },
    { id: "EMP-006", user: "Sys_Updater", dept: "Automated_Service", login: "2024-05-18 00:01:00" },
    { id: "EMP-007", user: "Sec_Guard_Night", dept: "Security", login: "2024-05-17 22:00:00" },
    { id: "EMP-008", user: "Maintenance_Bot", dept: "Facilities", login: "2024-05-18 06:30:00" },
    { id: "EMP-009", user: "Finance_Director", dept: "Finance", login: "2024-05-15 11:15:33" },
    { id: "EMP-010", user: "Staff_24", dept: realFlag, login: "2024-05-18 11:22:33" }, // <--- FLAG HIDDEN HERE
    { id: "EMP-011", user: "Data_Analyst", dept: "Research", login: "2024-05-18 09:55:10" },
    { id: "EMP-012", user: "CEO_Alpha", dept: "Executive", login: "2024-05-14 08:00:00" },
    { id: "EMP-013", user: "Contractor_X", dept: "Temporary", login: "2024-05-01 13:40:00" },
    { id: "EMP-014", user: "Network_Admin", dept: "Engineering", login: "2024-05-18 07:12:55" },
    { id: "EMP-015", user: "Janitor_Prime", dept: "Facilities", login: "2024-05-18 05:00:00" }
  ];

  useEffect(() => {
    // ANTI-CHEAT Console Warning
    console.log("%c[DB FIREWALL] WARNING: MALICIOUS SQL PAYLOAD INSPECTION DETECTED.", "color: #ec4899; font-weight: bold; font-size: 16px; background: black; padding: 4px; border: 1px solid #ec4899;");
    console.log("%cSearching for 'CTF' in Elements tab? The real flag is dynamically injected and obfuscated.", "color: gray; font-size: 12px;");
    console.log(`%c[CACHED_MEMORY_DUMP]: ${decoyString[0]}`, "color: #ec4899; font-size: 10px;");
    
    if (status !== 'complete') {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          const nextValue = prev - 1;
          localStorage.setItem('ctf_level6_time', nextValue.toString());
          if (nextValue < 0 && !hasOvertimePenalty) {
            setHasOvertimePenalty(true);
            localStorage.setItem('ctf_level6_overtime', 'true');
            setStars(s => {
              const newStars = Math.max(0, s - 1);
              localStorage.setItem('ctf_level6_stars', newStars.toString());
              return newStars;
            });
          }
          return nextValue;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status, hasOvertimePenalty, decoyString]);

  const handleHintClick = () => {
    if (!showHint) {
      setShowHint(true);
      if (!hasUsedHint) {
        setHasUsedHint(true);
        localStorage.setItem('ctf_level6_hint_used', 'true');
        setStars(s => {
          const newStars = Math.max(0, s - 1);
          localStorage.setItem('ctf_level6_stars', newStars.toString());
          return newStars;
        });
      }
    } else {
      setShowHint(false);
    }
  };

  const formatTime = (seconds) => {
    const isNegative = seconds < 0;
    const absSeconds = Math.abs(seconds);
    const mins = Math.floor(absSeconds / 60);
    const secs = absSeconds % 60;
    return `${isNegative ? '-' : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDatabaseSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setIsDumped(false);
    setQueryError('');

    setTimeout(() => {
      setIsSearching(false);
      const q = queryInput.trim();
      
      // SQL Injection Tautology Logic
      if (q.includes("' OR '1'='1") || q.includes("' OR 1=1") || q.includes('" OR "1"="1')) {
         setIsDumped(true);
      } else if (q === '') {
         setQueryError('Please enter a search query.');
      } else {
         setQueryError(`User "${q}" Not Found: Database restricted to Admin view only.`);
      }
    }, 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputFlag = flag.trim();

    if (inputFlag === realFlag) {
      const timeTaken = 600 - timeLeft;
      const timeTakenStr = formatTime(timeTaken);
      setCompletionTime(timeTakenStr);
      setStatus('complete');
      
      const savedStats = localStorage.getItem('ctf_mode_acak_stats');
      const stats = savedStats ? JSON.parse(savedStats) : {};
      const currentBestStars = stats[6]?.stars || 0;
      if (stars >= currentBestStars) {
         stats[6] = { stars: stars, bestTime: timeTakenStr };
         localStorage.setItem('ctf_mode_acak_stats', JSON.stringify(stats));
      }
      localStorage.removeItem('ctf_level6_time');
      localStorage.removeItem('ctf_level6_stars');
      localStorage.removeItem('ctf_level6_hint_used');
      localStorage.removeItem('ctf_level6_overtime');
    } else if (decoyString.includes(inputFlag) || inputFlag === decoyString[0]) {
      setStatus('decoy');
      setAttempts(prev => [...prev, inputFlag]);
      console.warn("DECOY DETECTED: Don't trust everything in the DevTools console.");
      setTimeout(() => setStatus('active'), 2500);
    } else if (inputFlag !== "") {
      setStatus('wrong');
      setAttempts(prev => [...prev, inputFlag]);
      setTimeout(() => setStatus('active'), 2000);
    }
    setFlag('');
  };

  const handleExit = () => {
    localStorage.removeItem('ctf_level6_time');
    localStorage.removeItem('ctf_level6_stars');
    localStorage.removeItem('ctf_level6_hint_used');
    localStorage.removeItem('ctf_level6_overtime');
    navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 6 } });
  };

  if (status === 'complete') {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 font-mono text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.1)_0%,transparent_70%)]" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="z-10 bg-gray-900 border-4 border-pink-500 p-12 rounded-3xl text-center max-w-xl shadow-[0_0_50px_rgba(236,72,153,0.3)]">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-24 h-24 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-pink-500/30">
            <Zap className="w-12 h-12 text-pink-400 fill-pink-400 drop-shadow-[0_0_10px_#ec4899]" />
          </motion.div>
          <h1 className="text-5xl font-black italic tracking-tighter mb-2 text-white uppercase leading-none">MISSION COMPLETE</h1>
          <p className="text-pink-500 font-bold tracking-[0.3em] mb-4 text-[10px]">SECTOR: DATABASE_VAULT // DATA_EXTRACTED</p>
          <div className="bg-pink-500/5 border border-pink-500/10 rounded-2xl py-6 px-10 mb-8 inline-block">
             <div className="text-[10px] font-black text-gray-500 tracking-[0.4em] uppercase mb-4">Misi terselesaikan dalam</div>
             <div className="text-4xl font-black text-white italic tracking-tighter mb-6">{completionTime}</div>
             <div className="flex justify-center gap-4">
                {[1, 2, 3].map(s => (
                  <Zap key={s} className={`w-10 h-10 transition-all duration-500 ${s <= stars ? 'text-pink-400 fill-pink-400 drop-shadow-[0_0_15px_#ec4899]' : 'text-gray-800 fill-transparent'}`} />
                ))}
             </div>
          </div>
          <button onClick={() => navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 6 } })} className="w-full bg-pink-500 text-black font-black py-4 rounded-xl hover:bg-pink-400 transition-all text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(236,72,153,0.2)]">KEMBALI KE MAP TAKTIS</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-4 md:p-8 flex flex-col overflow-hidden relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #ec489910 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col relative z-10">
        
        {/* HEADER AREA */}
        <div className="flex justify-between items-start mb-8 relative">
          <div className="flex gap-4 items-start z-10">
            <button 
              onClick={() => setShowExitModal(true)} 
              className="mt-1 p-2 bg-gray-900 border border-pink-500/30 rounded-xl hover:bg-pink-500/20 text-gray-400 hover:text-pink-400 transition-all group"
              title="Abort Mission"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse shadow-[0_0_8px_#ec4899]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-pink-400/80">TARGET: SECTOR_DATABASE</span>
              </div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none shadow-pink-500/20">
                LEVEL 6: <span className="text-pink-500 drop-shadow-[0_0_10px_#ec4899]">WEB EXPLOITATION</span>
              </h1>
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
             <div className="text-[8px] font-black text-gray-700 tracking-[0.5em] uppercase mb-2">RANK_EFFICIENCY</div>
             <div className="flex gap-3">
                {[1, 2, 3].map(s => (
                  <Zap key={s} className={`w-6 h-6 transition-all duration-700 ${s <= stars ? 'text-pink-400 fill-pink-400 drop-shadow-[0_0_10px_#ec4899]' : 'text-white/10 fill-transparent opacity-20'}`} />
                ))}
             </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] font-black text-red-500/80 tracking-[0.3em] uppercase mb-1">REMAINING_TIME</div>
            <div className={`text-4xl font-black italic tracking-tighter transition-colors duration-500 ${timeLeft < 0 ? 'text-red-500' : timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-pink-600'}`}>
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* LAYOUT */}
        <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
          
          {/* LEFT SIDE: BRIEFING */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <div className="bg-gray-950/50 border border-pink-500/30 rounded-2xl p-6 flex-1 flex flex-col relative overflow-hidden group shadow-[inset_0_0_20px_rgba(236,72,153,0.05)]">
              <div className="absolute top-0 left-0 w-1 h-full bg-pink-500 shadow-[0_0_15px_#ec4899]" />
              <div className="flex items-center gap-3 mb-6">
                <Database className="w-5 h-5 text-pink-400" />
                <h2 className="text-sm font-black text-pink-200 uppercase tracking-widest">BRIEFING MISI</h2>
              </div>
              <div className="text-xs leading-relaxed text-gray-400 overflow-y-auto pr-2 custom-scrollbar space-y-4 italic">
                <p>{" > "} Target: Internal Employee Directory.</p>
                <p>{" > "} Intelligence: Lo berhasil masuk ke portal pencarian karyawan Shadow Syndicate. Sistem ini menggunakan arsitektur legacy yang cacat validasinya.</p>
                <p>{" > "} Tugas lo: Paksa database untuk mengeluarkan seluruh catatan rahasia yang ada di dalamnya. Cari string rahasia 'CTF{"{...}"}' yang tersembunyi. Jangan biarkan satu baris pun terlewat!</p>
                <div className="p-3 bg-pink-950/20 border border-pink-500/20 rounded-lg mt-4">
                   <p className="text-pink-400 font-black tracking-tight uppercase mb-1 flex items-center gap-2">
                     <ShieldAlert className="w-3 h-3" /> SECURITY_FLAW_IDENTIFIED
                   </p>
                   <p className="text-[9px] text-gray-600 uppercase italic">Field pencarian memiliki blind spot terhadap kueri tautologi SQL (selalu bernilai BENAR).</p>
                </div>
              </div>
            </div>

            <button onClick={handleHintClick} className={`bg-pink-900/20 border rounded-xl p-4 flex items-center justify-center gap-3 group transition-all shadow-[0_0_20px_rgba(236,72,153,0.1)] ${showHint ? 'border-pink-400 bg-pink-900/40' : 'border-pink-500/40 hover:bg-pink-900/30'}`}>
              <Zap className={`w-4 h-4 transition-colors ${showHint ? 'text-pink-400 fill-pink-400' : 'text-pink-400'}`} />
              <span className="text-xs font-black text-pink-200 uppercase tracking-widest">{showHint ? 'HINT ACTIVE' : '💡 MINTA HINT BOS'}</span>
            </button>
            
            <AnimatePresence>
              {showHint && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-gray-900/50 border border-white/5 rounded-xl p-4 text-[10px] text-gray-500 italic uppercase leading-tight">
                  Gunakan teknik injeksi seperti <span className="text-pink-400">' OR '1'='1</span> atau <span className="text-pink-400">' OR 1=1</span> (termasuk spasi). Jika tabel kosong tiba-tiba memuntahkan belasan baris, telusuri kolom Department satu per satu!
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CENTER: WORKSPACE (DB EMULATOR) */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6 min-h-0">
             <div className="flex-1 bg-black border border-pink-500/20 rounded-2xl flex flex-col overflow-hidden relative group shadow-2xl">
                
                {/* Search Bar Header */}
                <div className="p-6 bg-gray-900/80 border-b border-white/5 backdrop-blur-md">
                   <div className="flex items-center gap-3 mb-4">
                      <Server className="w-5 h-5 text-pink-500" />
                      <div className="text-sm font-black text-white tracking-widest uppercase">Employee Lookup System</div>
                   </div>
                   
                   <form onSubmit={handleDatabaseSearch} className="flex gap-3">
                      <div className="relative flex-1">
                         <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-500/50" />
                         <input
                           type="text"
                           value={queryInput}
                           onChange={(e) => setQueryInput(e.target.value)}
                           placeholder="Search Employee by Name (e.g. Admin)"
                           className="w-full bg-black/60 border border-pink-500/30 rounded-xl py-3 pl-12 pr-4 text-sm font-mono text-pink-100 placeholder:text-gray-700 focus:outline-none focus:border-pink-500 focus:shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all"
                         />
                      </div>
                      <button 
                        type="submit" 
                        disabled={isSearching}
                        className="bg-pink-500 hover:bg-pink-400 disabled:bg-gray-800 disabled:text-gray-500 text-black font-black px-8 py-3 rounded-xl uppercase tracking-widest text-xs transition-colors flex items-center justify-center min-w-[120px]"
                      >
                         {isSearching ? <Activity className="w-4 h-4 animate-spin" /> : "QUERY"}
                      </button>
                   </form>
                   {queryError && (
                     <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-3 text-[10px] font-bold text-red-400 italic flex items-center gap-2">
                       <ShieldAlert className="w-3 h-3" /> {queryError}
                     </motion.div>
                   )}
                </div>

                {/* DB Table Render */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-0 bg-gray-950">
                   {isDumped ? (
                      <table className="w-full text-left border-collapse font-mono text-[10px] md:text-sm">
                         <thead className="sticky top-0 bg-gray-900 border-b border-pink-500/30 text-pink-500/60 uppercase tracking-widest shadow-md z-10">
                            <tr>
                               <th className="py-3 px-6 font-black whitespace-nowrap">ID</th>
                               <th className="py-3 px-6 font-black whitespace-nowrap">USERNAME</th>
                               <th className="py-3 px-6 font-black whitespace-nowrap">DEPARTMENT</th>
                               <th className="py-3 px-6 font-black whitespace-nowrap text-right">LAST_LOGIN</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-white/5">
                            {dbData.map((row, i) => (
                               <tr key={i} className="hover:bg-pink-500/10 hover:text-white transition-colors cursor-default group">
                                  <td className="py-2.5 px-6 font-bold text-pink-500/40 group-hover:text-pink-400">{row.id}</td>
                                  <td className="py-2.5 px-6">{row.user}</td>
                                  <td className="py-2.5 px-6 truncate max-w-[150px] md:max-w-xs">{row.dept}</td>
                                  <td className="py-2.5 px-6 text-right text-gray-500">{row.login}</td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   ) : (
                      <div className="h-full flex flex-col items-center justify-center text-gray-700 italic text-[10px] uppercase tracking-widest gap-4">
                         {isSearching ? (
                            <>
                                <Database className="w-8 h-8 text-pink-500 animate-pulse" />
                                Memindai Database...
                            </>
                         ) : (
                            <>
                                <Lock className="w-8 h-8 opacity-20" />
                                Tabel Kosong. Lakukan query pencarian yang valid.
                            </>
                         )}
                      </div>
                   )}
                </div>
                
                <div className="h-6 bg-gray-900/50 border-t border-white/5 flex items-center px-4 justify-between">
                   <div className="text-[7px] font-black text-gray-600 tracking-[0.2em]">{isDumped ? 'RESULTS: 15 RECORDS RETURNED' : 'RESULTS: 0'} // SQL_SERVER_V9</div>
                   <div className={`text-[7px] font-black tracking-[0.2em] uppercase ${isDumped ? 'text-red-500/80 animate-pulse' : 'text-pink-500/30'}`}>{isDumped ? 'ABNORMAL_QUERY_DETECTED' : 'DB_CONNECTION_SECURE'}</div>
                </div>
             </div>

             {/* SUBMISSION FORM */}
             <div className="bg-gray-900/40 border border-pink-500/30 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Terminal className="w-12 h-12 text-pink-500" /></div>
                <form onSubmit={handleSubmit} className="relative z-10 flex flex-col md:flex-row gap-4">
                   <div className="flex-1 relative">
                     <input type="text" value={flag} onChange={(e) => setFlag(e.target.value)} placeholder="MASUKKAN FLAG DI SINI (CTF_{...})" className={`w-full bg-black/60 border-2 rounded-xl py-4 px-6 text-sm font-black tracking-widest text-white placeholder:text-gray-700 focus:outline-none transition-all ${status === 'wrong' || status === 'decoy' ? 'border-red-500 shadow-[0_0_15px_#ef4444]' : 'border-pink-500/40 focus:border-pink-500 focus:shadow-[0_0_20px_rgba(236,72,153,0.2)]'}`} />
                     <AnimatePresence>
                       {status === 'wrong' && <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-3 -right-3 bg-red-600 text-[8px] font-black italic px-3 py-1 rounded-full text-white shadow-lg uppercase">ACCESS DENIED</motion.div>}
                       {status === 'decoy' && <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-3 -right-3 bg-pink-600 text-[8px] font-black italic px-3 py-1 rounded-full text-white shadow-lg uppercase animate-bounce">DECOY DETECTED: Itu file pancingan!</motion.div>}
                     </AnimatePresence>
                   </div>
                   <button type="submit" className="bg-pink-500 hover:bg-pink-400 text-black font-black uppercase text-xs tracking-[0.2em] px-10 py-4 rounded-xl transition-all active:scale-95 shadow-[0_10px_30px_rgba(236,72,153,0.3)]">[ SUBMIT FLAG ]</button>
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
              <span className="text-pink-500/50">{" > "} SYSTEM: OPERATIONAL</span>
              <span className="text-gray-800">//</span>
              <span>MODE: ACAK</span>
              <span className="text-gray-800">//</span>
              <span>LEVEL: 6</span>
           </div>
           <div className="text-[8px] font-bold uppercase tracking-tighter italic opacity-50">-- CORE_GRID_ESTABLISHED // DB_ENGINE_ONLINE --</div>
        </div>

      </div>
      <AnimatePresence>
         {showExitModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex justify-center items-center p-4">
               <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-gray-900 border border-pink-500/30 rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden shadow-[0_0_40px_rgba(236,72,153,0.1)]">
                  <div className="absolute top-0 left-0 w-full h-1 bg-pink-500" />
                  <ShieldAlert className="w-12 h-12 text-pink-500 mx-auto mb-4" />
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

export default Level6;
