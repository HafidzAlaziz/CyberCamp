import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, ShieldAlert, ShieldCheck, ChevronRight, ChevronLeft, Zap, Info, Search, List, Lock, Activity, RefreshCw, Trash2, Cloud, Server, Database, CloudDownload, Globe, Key, Users, Eye, AlertTriangle, Ban, CheckCircle2 } from 'lucide-react';

const NistFramework = () => {
  const [activeTab, setActiveTab] = useState('Identify');

  const pillars = [
    { id: 'Identify', icon: List, color: 'text-blue-400', label: 'Kenali Harta Lo', desc: 'Listing semua aset (PC, Laptop, Server). Lo gak bisa ngelindungin sesuatu yang lo gak tau keberadaannya.' },
    { id: 'Protect', icon: Lock, color: 'text-purple-400', label: 'Pasang Gembok', desc: 'Enkripsi data, pasang MFA, dan didik karyawan biar gak asal klik link phishing.' },
    { id: 'Detect', icon: Activity, color: 'text-amber-400', label: 'Pasang CCTV', desc: 'Monitoring anomali. Kalau ada trafik aneh jam 3 pagi, sistem harus langsung nangkep (Nmap/Wireshark style).' },
    { id: 'Respond', icon: ShieldAlert, color: 'text-red-400', label: 'Kick Si Maling', desc: 'Isolasi sistem yang kena hack biar nggak nyebar ke modul lain. Beresin malingnya!' },
    { id: 'Recover', icon: RefreshCw, color: 'text-emerald-400', label: 'Obatin Luka', desc: 'Restore data dari backup. Pastiin sistem normal lagi dan belajar dari kejadian barusan.' }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-cyan-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/50">
            <ShieldCheck className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <h1 className="text-sm text-purple-400 tracking-[0.3em] uppercase font-black">Stage 4: Security Skills</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              MODUL 5: NIST Framework
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
                NIST: BENTENG <br/>
                <span className="text-purple-500" style={{ textShadow: '0 0 10px rgba(168, 85, 247, 0.5)' }}>PERTAHANAN</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Bahasa kerennya <span className="text-white font-bold underline decoration-purple-500 underline-offset-4">NIST Cybersecurity Framework</span>. 
              </p>
            </section>

            <div className="space-y-6 text-sm leading-relaxed text-gray-400">
               <p>
                 Ini adalah standar paling populer di seluruh dunia (dari pemerintah Amrik). Intinya, NIST ngebagi keamanan jadi **5 PILAR MUTLAK** yang harus lo ikutin biar benteng lo gak gampang jebol.
               </p>
               
               <p>
                 Framework ini ngebantu perusahaan buat ngomong pake bahasa yang sama. Dari Bos sampe Admin IT, semuanya ngerti apa yang harus diidentifikasi dan dipulihkan.
               </p>

               <div className="p-6 bg-purple-900/10 border border-purple-500/30 rounded-2xl relative overflow-hidden group">
                  <div className="flex items-center gap-3 mb-4">
                     <Info className="w-5 h-5 text-purple-400" />
                     <p className="text-white font-black italic uppercase tracking-widest text-[10px]">Tips Hacker:</p>
                  </div>
                  <p className="italic text-gray-400 text-xs leading-relaxed">
                    "Identifikasi (Identify) itu yang paling penting. Gimana mau jaga rumah kalau lo sendiri gak tau di kamar mana lo nyimpen emas (data)?"
                  </p>
               </div>
            </div>

            <div className="bg-purple-500/5 border-l-4 border-purple-500 p-6 space-y-2 rounded-r-xl relative group">
               <Zap className="w-6 h-6 text-purple-500 mb-2" />
               <p className="text-[11px] text-gray-400 italic leading-relaxed">
                 "Ingat siklusnya: Identifikasi, Lindungi, Deteksi, Respon, dan Pulihkan. Tanpa salah satu, benteng lo punya titik buta (Blind Spot)."
               </p>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12">
            <div className="p-8 bg-gray-900 border-2 border-purple-500/30 rounded-3xl relative overflow-hidden min-h-[550px] flex flex-col shadow-2xl">
              
              <div className="mb-8 text-center relative z-10">
                 <h2 className="text-xl font-black text-white italic uppercase tracking-tighter text-glow">5 PILAR NIST</h2>
                 <p className="text-[9px] text-purple-500 font-bold tracking-[0.2em] mt-1">FRAMEWORK_PILLAR_V2</p>
              </div>

              {/* Tabs Container */}
              <div className="flex gap-2 mb-8 justify-center flex-wrap">
                 {pillars.map((p) => (
                   <button 
                     key={p.id}
                     onClick={() => setActiveTab(p.id)}
                     className={`p-3 rounded-xl border transition-all ${activeTab === p.id ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'bg-black/40 border-white/5 text-gray-500 hover:border-purple-500/30'}`}
                   >
                      <p.icon className="w-5 h-5" />
                   </button>
                 ))}
              </div>

              {/* Visual Display */}
              <div className="flex-1 bg-black/60 rounded-2xl border border-white/10 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                 <AnimatePresence mode="wait">
                    <motion.div 
                      key={activeTab}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      className="space-y-6 relative z-10"
                    >
                       <div className={`text-4xl font-black italic uppercase tracking-tighter ${pillars.find(p => p.id === activeTab).color}`}>
                          {activeTab}
                       </div>
                       
                       {/* Contextual Visuals */}
                       <div className="py-8">
                          {activeTab === 'Identify' && (
                            <div className="grid grid-cols-2 gap-8 place-items-center">
                               <Server className="w-12 h-12 text-blue-500" />
                               <Database className="w-12 h-12 text-blue-400" />
                               <Globe className="w-12 h-12 text-cyan-400 opacity-50" />
                               <Shield className="w-12 h-12 text-white/20" />
                            </div>
                          )}
                          {activeTab === 'Protect' && (
                            <div className="grid grid-cols-2 gap-8 place-items-center">
                               <Lock className="w-12 h-12 text-purple-500" />
                               <Key className="w-12 h-12 text-purple-400" />
                               <Users className="w-12 h-12 text-fuchsia-400 opacity-50" />
                               <ShieldCheck className="w-12 h-12 text-white/20" />
                            </div>
                          )}
                          {activeTab === 'Detect' && (
                            <div className="grid grid-cols-2 gap-8 place-items-center">
                               <Activity className="w-12 h-12 text-amber-500 animate-pulse" />
                               <Eye className="w-12 h-12 text-amber-400" />
                               <Search className="w-12 h-12 text-yellow-400 opacity-50" />
                               <AlertTriangle className="w-12 h-12 text-white/20" />
                            </div>
                          )}
                          {activeTab === 'Respond' && (
                            <div className="grid grid-cols-2 gap-8 place-items-center">
                               <ShieldAlert className="w-12 h-12 text-red-500" />
                               <Trash2 className="w-12 h-12 text-red-400" />
                               <Zap className="w-12 h-12 text-orange-400 opacity-50" />
                               <Ban className="w-12 h-12 text-white/20" />
                            </div>
                          )}
                          {activeTab === 'Recover' && (
                            <div className="grid grid-cols-2 gap-8 place-items-center">
                               <CloudDownload className="w-12 h-12 text-emerald-500" />
                               <RefreshCw className="w-12 h-12 text-emerald-400 animate-spin" />
                               <Database className="w-12 h-12 text-teal-400 opacity-50" />
                               <CheckCircle2 className="w-12 h-12 text-white/20" />
                            </div>
                          )}
                       </div>

                       <div className="space-y-4">
                          <p className="text-white font-black italic uppercase tracking-widest text-xs">
                             {pillars.find(p => p.id === activeTab).label}
                          </p>
                          <p className="text-gray-400 text-[10px] leading-relaxed max-w-xs mx-auto">
                             {pillars.find(p => p.id === activeTab).desc}
                          </p>
                       </div>
                    </motion.div>
                 </AnimatePresence>

                 {/* Background decoration */}
                 <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none scale-[2]">
                    {(() => {
                      const Icon = pillars.find(p => p.id === activeTab).icon;
                      return <Icon className="w-full h-full" />;
                    })()}
                  </div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-purple-500 shadow-2xl">
          <Link 
            to="/academy/stage-4/modul-5/intro"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « KEMBALI KE "INTRO FRAMEWORKS"
          </Link>
          
          <Link 
            to="/academy/stage-4/modul-5/mitre-attack"
            className="flex items-center gap-3 bg-purple-600 hover:bg-white text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
          >
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest leading-none uppercase">
              LANJUT KE "MITRE ATT&CK" » <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NistFramework;
