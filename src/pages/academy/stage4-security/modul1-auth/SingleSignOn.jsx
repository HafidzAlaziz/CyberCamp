import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, LayoutGrid, Key, Mail, Building, Wallet, Lock, Unlock, Database, ChevronRight, ChevronLeft, ShieldAlert } from 'lucide-react';

const SingleSignOn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [unlockedApps, setUnlockedApps] = useState([]);

  const handleSsoLogin = () => {
    setIsLoggedIn(true);
    setUnlocking(true);
    
    const apps = ['email', 'hrd', 'keuangan'];
    apps.forEach((app, index) => {
      setTimeout(() => {
        setUnlockedApps(prev => [...prev, app]);
        if (index === apps.length - 1) setUnlocking(false);
      }, (index + 1) * 1000);
    });
  };

  const reset = () => {
    setIsLoggedIn(false);
    setUnlocking(false);
    setUnlockedApps([]);
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
            <ShieldCheck className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 4: Security Skills</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              MODUL 1: Authentication Basics
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
                Keajaiban <br/>
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }}>Single Sign-On</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Lo pasti pernah liat tombol <span className="text-white font-bold underline decoration-cyan-500 italic">"Login with Google"</span> kan? Itu yang namanya <span className="text-white">SSO</span>. 
              </p>
            </section>

            <p className="text-gray-400 leading-relaxed text-sm">
              Bayangin lo mau masuk ke 10 club malam yang beda. Daripada ngetik password di 10 club itu, lo cukup login sekali di pusat perijinan. Terus lo dapet <span className="text-cyan-400 font-bold italic">Gelang VIP Sakti</span>.
            </p>

            <div className="bg-gray-900 border-l-4 border-cyan-500 p-6 space-y-4 rounded-r-xl">
              <h3 className="text-white font-black flex items-center gap-2 italic uppercase tracking-tighter text-sm" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.3)' }}>
                <Database className="w-5 h-5" /> Token: Gelang VIP Lo
              </h3>
              <p className="text-[11px] text-gray-500 italic leading-relaxed">
                Di dunia IT, gelang sakti ini disebut <span className="text-white font-bold uppercase tracking-widest">Token</span>. Sekali lo dapet Token dari server pusat, aplikasi lain langsung percaya sama lo tanpa nanya password lagi. Gampang kan?
              </p>
            </div>

            <div className="bg-red-500/5 border border-red-500/30 p-4 rounded-xl">
              <p className="text-xs text-red-500 font-black flex items-center gap-2 mb-2 uppercase italic">
                <ShieldAlert className="w-4 h-4" /> Resiko Hacker: Token Hijacking
              </p>
              <p className="text-[10px] text-gray-500 italic leading-relaxed">
                Bahayanya, kalau hacker berhasil nyolong Token lo ini (Token Hijacking), mereka bisa ngakses <span className="text-gray-300 underline decoration-red-500 font-bold">SEMUA</span> aplikasi lo tanpa peduli seberapa rumit password lo!
              </p>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12 h-fit">
            <div className="p-8 bg-gray-900/50 border-2 border-cyan-500/30 rounded-3xl backdrop-blur-sm relative overflow-hidden min-h-[550px] flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-black text-white mb-12 flex items-center gap-3 italic">
                  <LayoutGrid className="w-8 h-8 text-cyan-500" /> SSO GATEWAY SIMULATOR
                </h2>

                <div className="relative space-y-16">
                  {/* Server Pusat */}
                  <div className="flex flex-col items-center">
                    <div className={`p-5 rounded-2xl border-4 transition-all duration-500 ${isLoggedIn ? 'border-cyan-500 bg-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.6)]' : 'border-gray-800 bg-gray-900'}`}>
                      <Database className={`w-12 h-12 ${isLoggedIn ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mt-2">Server Pusat (IDP)</p>
                  </div>

                  {/* Token Rail */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 h-full w-0.5 bg-gray-800 -z-10" />

                  {/* Apps Grid */}
                  <div className="grid grid-cols-3 gap-6">
                    {[
                      { id: 'email', label: 'EMAIL', icon: Mail },
                      { id: 'hrd', label: 'HRD', icon: Building },
                      { id: 'keuangan', label: 'DOMPET', icon: Wallet },
                    ].map((app) => {
                      const isUnlocked = unlockedApps.includes(app.id);
                      const AppIcon = app.icon;
                      return (
                        <div key={app.id} className="flex flex-col items-center gap-2">
                          <motion.div 
                            animate={isUnlocked ? { scale: [1, 1.1, 1] } : {}}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 relative ${isUnlocked ? 'border-emerald-500 bg-emerald-500/10' : 'border-gray-800 bg-black/40'}`}
                          >
                            <AppIcon className={`w-8 h-8 ${isUnlocked ? 'text-emerald-400' : 'text-gray-700'}`} style={isUnlocked ? { textShadow: '0 0 10px rgba(16, 185, 129, 0.5)' } : {}} />
                            <div className="absolute -top-2 -right-2">
                              {isUnlocked ? <Unlock className="w-4 h-4 text-emerald-500" /> : <Lock className="w-4 h-4 text-gray-800" />}
                            </div>
                            
                            {/* Token Travel Animation */}
                            {unlocking && unlockedApps.length === 0 && (
                              <motion.div 
                                initial={{ top: -80, opacity: 0 }}
                                animate={{ top: 0, opacity: 1 }}
                                className="absolute top-0 left-1/2 -translate-x-1/2"
                              >
                                <div className="w-6 h-1 bg-cyan-400 rounded-full shadow-[0_0_15px_cyan] rotate-90" />
                              </motion.div>
                            )}
                          </motion.div>
                          <p className="text-[8px] font-black uppercase tracking-widest text-gray-600">{app.label}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-12 space-y-4">
                <AnimatePresence>
                  {isLoggedIn && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-cyan-500 text-black p-3 rounded-lg flex items-center justify-between font-black italic text-xs uppercase"
                    >
                      <span>TOKE_ACQUIRED: VIP_ACCESS_GRANTED</span>
                      <ShieldCheck className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isLoggedIn ? (
                  <button 
                    onClick={handleSsoLogin}
                    className="w-full py-5 bg-cyan-600 hover:bg-white text-white hover:text-black border-2 border-cyan-600 font-black transition-all flex items-center justify-center gap-3 uppercase italic text-sm tracking-[0.2em] skew-x-[-12deg] shadow-[0_0_30px_rgba(6,182,212,0.4)]"
                  >
                    LOGIN SSO SEKARANG 🔓
                  </button>
                ) : (
                  <button 
                    onClick={reset}
                    className="w-full py-4 bg-gray-800 hover:bg-red-600 border-2 border-gray-700 text-gray-500 hover:text-white font-black transition-all uppercase italic text-xs tracking-widest skew-x-[-12deg]"
                  >
                    Hapus Token & Logout 🧹
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link 
            to="/academy/stage-4/modul-1/tiga-pilar"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « KEMBALI KE TIGA PILAR MFA
          </Link>
          
          <Link 
            to="/academy/stage-4/modul-1/kesimpulan"
            className="flex items-center gap-3 bg-cyan-600 hover:bg-white text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
          >
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest leading-none uppercase">
              LANJUT KE KESIMPULAN » <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleSignOn;
