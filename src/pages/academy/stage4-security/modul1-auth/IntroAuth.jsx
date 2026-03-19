import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, ShieldAlert, Lock, Unlock, Smartphone, Terminal, Key, ChevronRight, ChevronLeft, LayoutGrid } from 'lucide-react';

const IntroAuth = () => {
  const [tab, setTab] = useState('password'); // 'password' or 'mfa'
  const [hacking, setHacking] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle', 'success', 'mfa_required'

  const runHack = () => {
    setHacking(true);
    setStatus('idle');
    setTimeout(() => {
      setHacking(false);
      if (tab === 'password') {
        setStatus('success');
      } else {
        setStatus('mfa_required');
      }
    }, 2000);
  };

  const reset = () => {
    setHacking(false);
    setStatus('idle');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Standardized Header Section */}
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
          
          {/* Column Kiri: Materi */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <section>
              <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-8 leading-tight">
                Kenapa Password <br/>
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }}>Sudah "Mati"?</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Bro, dengerin gue. Jaman sekarang hacker udah nggak kerja capek-capek nebak password lo satu-satu pake jari. 
              </p>
            </section>

            <div className="bg-red-500/5 border-l-4 border-red-500 p-6 space-y-4 rounded-r-xl">
              <h3 className="text-white font-black flex items-center gap-2 italic uppercase tracking-tighter text-sm">
                <ShieldAlert className="w-5 h-5 text-red-500 font-bold" /> Credential Stuffing
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Hacker itu belanja jutaan database password yang bocor di <span className="text-white">Dark Web</span>. Mereka pake script otomatis buat nyobain semua password itu ke akun lo. Istilahnya <span className="text-white font-bold italic">Credential Stuffing</span>. 
              </p>
            </div>

            <p className="text-gray-400 leading-relaxed text-sm">
              Ibaratnya, satpam club malam (Authentication) cuma nanya "Apa kata sandinya?". Kalau hacker udah tau sandinya dari orang dalem, dia tinggal melenggang masuk. 
            </p>

            <p className="italic text-cyan-400 font-bold bg-gray-900 p-4 border-l-2 border-cyan-500">
              "Kalau lo cuma modal password, akun lo itu ibarat rumah yang kuncinya udah dipublikasi di internet. Tinggal nunggu waktu buat dijebol!"
            </p>

            <section className="space-y-4">
              <h3 className="text-white font-black text-xl italic uppercase tracking-tighter">Solusinya? MFA!</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                <span className="text-white underline decoration-cyan-500">Multi-Factor Authentication</span> (MFA) itu satpam yang galak. Dia nggak cuma nanya sandi, tapi juga minta nunjukkin KTP sampe scan sidik jari. 
              </p>
            </section>
          </motion.div>

          {/* Column Kanan: Simulasi */}
          <div className="sticky top-12 h-fit">
            <div className="p-8 bg-gray-900/50 border-2 border-cyan-500/30 rounded-3xl backdrop-blur-sm relative overflow-hidden min-h-[500px] flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3 italic">
                  <Terminal className="w-8 h-8 text-cyan-500" /> HACKER vs AKUN LO
                </h2>

                {/* Tabs */}
                <div className="flex bg-black/40 p-1 rounded-xl mb-8">
                  <button 
                    onClick={() => { setTab('password'); reset(); }}
                    className={`flex-1 py-3 px-4 rounded-lg font-black text-xs uppercase tracking-widest transition-all ${tab === 'password' ? 'bg-cyan-500 text-black' : 'text-gray-500 hover:text-white'}`}
                  >
                    Cuma Password
                  </button>
                  <button 
                    onClick={() => { setTab('mfa'); reset(); }}
                    className={`flex-1 py-3 px-4 rounded-lg font-black text-xs uppercase tracking-widest transition-all ${tab === 'mfa' ? 'bg-cyan-500 text-black' : 'text-gray-500 hover:text-white'}`}
                  >
                    Pake MFA
                  </button>
                </div>

                <div className="space-y-8 relative">
                  {/* Visual Screen */}
                  <div className={`p-8 rounded-2xl border-2 transition-all duration-300 min-h-[200px] flex flex-col items-center justify-center text-center ${status === 'success' ? 'bg-red-500/20 border-red-500 animate-pulse' : 'bg-black/60 border-gray-800'}`}>
                    <AnimatePresence mode="wait">
                      {status === 'idle' && !hacking && (
                        <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                          <Lock className="w-16 h-16 text-gray-700 mx-auto" />
                          <p className="text-gray-500 text-xs font-black uppercase tracking-widest italic">Awaiting Exploit...</p>
                        </motion.div>
                      )}

                      {hacking && (
                        <motion.div key="hacking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                          <div className="flex gap-2 justify-center">
                            {[1, 2, 3].map(i => (
                              <motion.div key={i} animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }} className="w-3 h-3 bg-red-500 rounded-full" />
                            ))}
                          </div>
                          <p className="text-red-500 text-sm font-black uppercase tracking-tighter">Running Script: brute_force.py</p>
                          <div className="text-[8px] text-gray-600 font-mono text-left bg-black/40 p-2 overflow-hidden h-12 w-48">
                            {"> sudo stuff_credentials\n> testing: admin123\n> testing: qwerty2024\n> testing: 23490234"}
                          </div>
                        </motion.div>
                      )}

                      {status === 'success' && (
                        <motion.div key="success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-4">
                          <Unlock className="w-16 h-16 text-red-500 mx-auto" />
                          <p className="text-red-500 text-xl font-black uppercase tracking-tighter italic">PASSWORD COCOK!</p>
                          <p className="text-white text-xs font-bold bg-red-600 px-4 py-2 rounded">AKUN DIAMBIL ALIH!</p>
                        </motion.div>
                      )}

                      {status === 'mfa_required' && (
                        <motion.div key="mfa" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4 w-full">
                          <div className="bg-blue-600 p-6 rounded-xl border-2 border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                            <Smartphone className="w-12 h-12 text-white mx-auto mb-4 animate-bounce" />
                            <p className="text-white text-sm font-black uppercase tracking-tighter mb-2 italic">MFA CHALLENGE!</p>
                            <div className="bg-black/50 p-3 rounded-lg border border-blue-400/30">
                              <p className="text-[10px] text-blue-300 font-bold mb-1">Masukkan Kode OTP dari HP Korban:</p>
                              <div className="flex gap-2 justify-center">
                                {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="w-6 h-8 bg-blue-900/50 border border-blue-500 p-1" />)}
                              </div>
                            </div>
                            <p className="text-[10px] text-white mt-4 font-bold italic">"Hacker mental, HP-nya kan ada di kantong lo!"</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button 
                  onClick={runHack}
                  disabled={hacking}
                  className={`w-full py-5 font-black transition-all flex items-center justify-center gap-3 uppercase italic text-sm tracking-[0.2em] skew-x-[-8deg] shadow-lg ${hacking ? 'bg-gray-800 text-gray-600 cursor-not-allowed border-2 border-gray-700' : 'bg-red-600 hover:bg-white hover:text-red-600 border-2 border-red-600 text-white'}`}
                >
                  {hacking ? 'PROCESS_HACKING...' : 'Jalankan Script Brute Force 💀'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-end items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          
          <Link 
            to="/academy/stage-4/modul-1/tiga-pilar"
            className="flex items-center gap-3 bg-cyan-600 hover:bg-white text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
          >
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest leading-none uppercase">
              LANJUT KE TIGA PILAR MFA » <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IntroAuth;
