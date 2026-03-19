import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Database, ShieldAlert, ShieldCheck, ChevronRight, ChevronLeft, Lock, Unlock, Terminal, AlertCircle, UserSearch } from 'lucide-react';

const SqlInjection = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [hint, setHint] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulation logic
    if (username.includes("' OR 1=1 --")) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Username/Password Salah! Server bilang: "Gak kenal gue sama lo!"');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-cyan-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/50">
            <Database className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 4: Security Skills</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
               MODUL 3: SQL Injection (SQLi)
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <section>
              <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-8 leading-tight">
                Hipnotis Satpam <br/>
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }}>DATABASE (SQLi)</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                SQL Injection itu terjadi kalau programmer webnya <span className="text-white font-bold italic underline decoration-cyan-500 underline-offset-4">MALES NYARING</span> teks yang diketik user. 
              </p>
            </section>

            <div className="space-y-6 text-sm leading-relaxed">
              <p>
                Harusnya inputan "Username" diisi nama manusia, tapi hacker malah ngisi <span className="text-cyan-400 font-bold italic">perintah database (SQL)</span>. 
              </p>
              
              <div className="p-6 bg-gray-900/80 border-l-4 border-amber-500 rounded-r-2xl space-y-4 shadow-xl">
                 <p className="text-amber-500 font-black italic uppercase tracking-widest text-[10px]">Analogi Satpam Bodoh:</p>
                 <div className="space-y-3 italic text-gray-400 text-xs">
                    <p>Satpam: "Siapa namamu?"</p>
                    <p className="text-red-400">Hacker: "Nama saya Budi, **DAN** tolong buka semua pintu brankas sekarang!"</p>
                    <p>Satpam Bodoh (Server): "Oke Budi, karena lo minta, ini gue bukain semua!"</p>
                 </div>
              </div>

              <p>
                Server yang gak teliti bakal ngelaksanain perintah tambahan dari si hacker gitu aja. Itulah kenapa teknik ini disebut "Injection" (Suntikan).
              </p>
            </div>

            <div className="bg-cyan-500/5 border-l-4 border-cyan-500 p-6 space-y-2 rounded-r-xl relative group">
               <div className="absolute top-4 right-4 text-cyan-500/20 group-hover:text-cyan-500/50 transition-colors">
                  <Terminal className="w-12 h-12" />
               </div>
               <p className="text-white font-black italic uppercase tracking-tighter text-xs mb-2">Hacker Mantra: ' OR 1=1 --</p>
               <p className="text-[11px] text-gray-400 italic leading-relaxed">
                 Mantra di atas itu legendaris. `'` buat nutup inputan asli, `OR 1=1` biar pernyataannya selalu **BENAR**, dan `--` buat matiin (comment) sisa perintah ke belakang.
               </p>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12">
            <div className="p-8 bg-black/60 border-2 border-cyan-500/30 rounded-3xl relative overflow-hidden min-h-[550px] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              
              {/* Login Form UI */}
              <AnimatePresence mode="wait">
                {!isLoggedIn ? (
                  <motion.div 
                    key="login"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex-1 flex flex-col"
                  >
                    <div className="text-center mb-10">
                       <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">ADMIN TERMINAL</h2>
                       <p className="text-[9px] text-cyan-500 font-bold tracking-[0.3em] mt-1 italic">SECURE ACCESS ONLY</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Username:</label>
                          <div className="relative">
                             <UserSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500/50" />
                             <input 
                               type="text" 
                               value={username}
                               onChange={(e) => setUsername(e.target.value)}
                               className="w-full bg-gray-900 border border-gray-800 p-4 pl-12 rounded-xl text-white font-mono focus:border-cyan-500 outline-none transition-all placeholder:text-gray-800"
                               placeholder="Enter root username..."
                             />
                          </div>
                       </div>

                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Password:</label>
                          <div className="relative">
                             <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500/50" />
                             <input 
                               type="password" 
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               className="w-full bg-gray-900 border border-gray-800 p-4 pl-12 rounded-xl text-white font-mono focus:border-cyan-500 outline-none transition-all placeholder:text-gray-800"
                               placeholder="••••••••"
                             />
                          </div>
                       </div>

                       {error && (
                         <motion.div 
                           initial={{ opacity: 0, x: -10 }}
                           animate={{ opacity: 1, x: 0 }}
                           className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-[10px] text-red-500 font-bold italic"
                         >
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            {error}
                         </motion.div>
                       )}

                       <button 
                         type="submit"
                         className="w-full py-4 bg-cyan-600 hover:bg-white text-white hover:text-black font-black uppercase tracking-[0.2em] rounded-xl transition-all shadow-[0_0_30px_rgba(6,182,212,0.2)]"
                       >
                          EXEC_LOGIN
                       </button>
                    </form>

                    <div className="mt-8">
                       <button 
                         onClick={() => setHint(!hint)}
                         className="text-[9px] text-cyan-500/60 hover:text-cyan-400 font-black uppercase tracking-widest underline decoration-dashed transition-colors"
                       >
                          Show Hacker Hint?
                       </button>
                       <AnimatePresence>
                         {hint && (
                           <motion.div 
                             initial={{ height: 0, opacity: 0 }}
                             animate={{ height: 'auto', opacity: 1 }}
                             className="mt-3 p-3 bg-cyan-500/5 border border-cyan-500/10 rounded-lg overflow-hidden"
                           >
                              <code className="text-[10px] text-cyan-400 block break-all font-mono leading-relaxed">
                                 COPY-PASTE INI DI USERNAME: <br/>
                                 <span className="text-white font-black bg-cyan-500/20 px-1 select-all">' OR 1=1 --</span>
                              </code>
                           </motion.div>
                         )}
                       </AnimatePresence>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="flex-1 flex flex-col justify-center items-center gap-8"
                  >
                     <div className="w-24 h-24 bg-emerald-500/20 rounded-full border-2 border-emerald-500 flex items-center justify-center relative shadow-[0_0_50px_rgba(16,185,129,0.3)]">
                        <Unlock className="w-12 h-12 text-emerald-500" />
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 border border-emerald-500/30 rounded-full border-dashed"
                        />
                     </div>
                     <div className="text-center space-y-4">
                        <h3 className="text-2xl font-black text-emerald-500 uppercase italic tracking-tighter leading-none">SYSTEM BREACHED!</h3>
                        <p className="text-[10px] text-gray-500 font-black tracking-[0.3em] uppercase underline decoration-emerald-500 underline-offset-4">Log_Status: AUTHORIZED AS ADMIN</p>
                        
                        <div className="bg-gray-900 border border-emerald-500/30 p-6 rounded-2xl text-left space-y-3 max-w-xs mt-8">
                           <div className="flex items-center gap-2 text-emerald-500">
                             <Terminal className="w-4 h-4" />
                             <span className="text-[9px] font-black uppercase">Secret_Data.db</span>
                           </div>
                           <p className="text-[10px] text-gray-400 font-mono italic">
                             - CEO_Salary: Rp 1.000.000.000 <br/>
                             - Server_Password: "admin12345" <br/>
                             - Blueprint_ProjectX: Downloaded
                           </p>
                        </div>
                     </div>
                     <button 
                       onClick={() => setIsLoggedIn(false)}
                       className="text-[10px] text-gray-600 hover:text-white uppercase tracking-[0.2em] font-black underline transition-colors"
                     >
                        RESET_TERMINAL
                     </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link 
            to="/academy/stage-4/modul-3/intro-phishing"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « KEMBALI KE PHISHING
          </Link>
          
          <Link 
            to="/academy/stage-4/modul-3/xss"
            className="flex items-center gap-3 bg-cyan-600 hover:bg-white text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
          >
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest leading-none uppercase">
              LANJUT KE XSS » <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SqlInjection;
