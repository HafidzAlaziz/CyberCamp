import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, ShieldAlert, ShieldCheck, ChevronRight, ChevronLeft, Zap, Info, LayoutGrid, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

const IntroFrameworks = () => {
  const [mode, setMode] = useState('idle'); // 'idle', 'panic', 'structured'

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
            <Shield className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 4: Security Skills</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              MODUL 5: Security Frameworks
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
                Buku Panduan <br/>
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }}>BIAR GAK PANIK!</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Apa itu <span className="text-white font-bold underline decoration-cyan-500 underline-offset-4">SECURITY FRAMEWORK</span>? 
              </p>
            </section>

            <div className="space-y-6 text-sm leading-relaxed text-gray-400">
               <p>
                 Di dunia IT, perusahaan nggak cuma butuh antivirus. Mereka butuh <span className="text-white font-bold italic">Cetak Biru (Blueprint)</span> atau SOP (Standard Operating Procedure). 
               </p>
               
               <p>
                 Kalau ada hacker masuk jam 2 pagi, admin IT harus ngapain? Cabut kabel? Telpon polisi? Atau malah nangis? Nah, **Framework** ini yang ngasih instruksi jelas step-by-step biar semuanya terkendali.
               </p>

               <div className="p-6 bg-cyan-900/10 border border-cyan-500/30 rounded-2xl relative overflow-hidden group">
                  <div className="flex items-center gap-3 mb-4">
                     <Info className="w-5 h-5 text-cyan-400" />
                     <p className="text-white font-black italic uppercase tracking-widest text-[10px]">Analogi Satpam:</p>
                  </div>
                  <p className="italic text-gray-400 text-xs leading-relaxed">
                    Anggap aja Framework itu kayak "Buku Panduan Satpam". Kalau ada maling, satpam nggak asal pukul, tapi ada prosedurnya: Kunci gerbang -&gt; Bunyiin alarm -&gt; Telpon polisi. Rapi kan?
                  </p>
               </div>
            </div>

            <div className="bg-cyan-500/5 border-l-4 border-cyan-500 p-6 space-y-2 rounded-r-xl relative group">
               <Zap className="w-6 h-6 text-cyan-500 mb-2" />
               <p className="text-[11px] text-gray-400 italic leading-relaxed">
                 "Tanpa Framework, sistem lo cuma sekumpulan alat mahal yang nggak punya otak. Framework adalah 'otak' di balik strategi pertahanan lo."
               </p>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12">
            <div className={`p-8 border-2 rounded-3xl relative overflow-hidden min-h-[500px] flex flex-col shadow-2xl transition-colors duration-500 ${mode === 'panic' ? 'bg-red-950/20 border-red-500' : 'bg-gray-900 border-cyan-500/30'}`}>
              
              <div className="mb-8 text-center relative z-10">
                 <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">SIMULASI: PANIK VS TERSTRUKTUR</h2>
                 <p className="text-[9px] text-cyan-500 font-bold tracking-[0.2em] mt-1">INCIDENT_RESPONSE_TEST_V1</p>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-8 relative z-10">
                 
                 <AnimatePresence mode="wait">
                    {mode === 'idle' && (
                      <motion.div 
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6"
                      >
                         <ShieldAlert className="w-20 h-20 text-gray-700 mx-auto animate-pulse" />
                         <p className="text-sm font-bold uppercase text-gray-500">Pilih skenario respon saat diserang hacker:</p>
                         <div className="flex gap-4 justify-center">
                            <button 
                              onClick={() => setMode('panic')}
                              className="px-6 py-3 bg-red-600/20 text-red-500 border border-red-500/30 rounded-lg font-black text-xs hover:bg-red-500 hover:text-white transition-all uppercase"
                            >
                               Tanpa Framework
                            </button>
                            <button 
                              onClick={() => setMode('structured')}
                              className="px-6 py-3 bg-cyan-600/20 text-cyan-500 border border-cyan-500/30 rounded-lg font-black text-xs hover:bg-cyan-500 hover:text-white transition-all uppercase"
                            >
                               Pakai Framework
                            </button>
                         </div>
                      </motion.div>
                    )}

                    {mode === 'panic' && (
                      <motion.div 
                        key="panic"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-6"
                      >
                         <motion.div 
                           animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
                           transition={{ duration: 0.2, repeat: Infinity }}
                         >
                            <AlertTriangle className="w-20 h-20 text-red-500 mx-auto" />
                         </motion.div>
                         <div className="space-y-2">
                            <p className="text-red-500 font-black text-2xl italic tracking-tighter animate-bounce">SERVER DOWN!!!</p>
                            <p className="text-red-400 text-[10px] uppercase font-bold px-4">"SIAPA YANG TANGGUNG JAWAB?! DATA ILANG SEMUA!!! TOLONG!!!"</p>
                         </div>
                         <button 
                           onClick={() => setMode('idle')}
                           className="text-[10px] text-gray-500 underline underline-offset-4 hover:text-white transition-all uppercase font-black"
                         >
                            Reset Skenario
                         </button>
                      </motion.div>
                    )}

                    {mode === 'structured' && (
                      <motion.div 
                        key="structured"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full space-y-6"
                      >
                         <div className="p-6 bg-black/40 rounded-2xl border border-cyan-500/20 space-y-4">
                            <h3 className="text-emerald-500 font-black italic uppercase text-xs tracking-widest flex items-center gap-2">
                               <ShieldCheck className="w-4 h-4" /> SOP AKTIF: NIST_CSF_RECOVERY
                            </h3>
                            <div className="space-y-3 text-left">
                               <div className="flex items-center gap-3 text-xs text-emerald-400/80">
                                  <CheckCircle2 className="w-4 h-4" /> [v] Isolasi Jaringan Terinfeksi
                               </div>
                               <div className="flex items-center gap-3 text-xs text-emerald-400/80">
                                  <CheckCircle2 className="w-4 h-4" /> [v] Analisis Log Aktivitas
                               </div>
                               <div className="flex items-center gap-3 text-xs text-emerald-400/80">
                                  <CheckCircle2 className="w-4 h-4" /> [v] Pulihkan dari Backup Teruji
                               </div>
                            </div>
                         </div>
                         <p className="text-emerald-500 font-black tracking-widest text-xs uppercase animate-pulse">TENANG DAN TERKENDALI.</p>
                         <button 
                           onClick={() => setMode('idle')}
                           className="text-[10px] text-gray-500 underline underline-offset-4 hover:text-white transition-all uppercase font-black"
                         >
                            Reset Skenario
                         </button>
                      </motion.div>
                    )}
                 </AnimatePresence>

              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-20" />
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link 
            to="/academy"
            state={{ expandedId: 'security-skills' }}
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « KEMBALI KE HQ
          </Link>
          
          <Link 
            to="/academy/stage-4/modul-5/nist-framework"
            className="flex items-center gap-3 bg-cyan-600 hover:bg-white text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
          >
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest leading-none uppercase">
              LANJUT KE "NIST: BENTENG PERTAHANAN" » <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IntroFrameworks;
