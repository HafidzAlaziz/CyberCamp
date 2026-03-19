import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, ShieldAlert, ShieldCheck, ChevronRight, ChevronLeft, Zap, Info, Grid, MousePointer2, UserX, Key, HardDriveDownload, Mail, Terminal, Lock } from 'lucide-react';

const MitreAttack = () => {
  const [selectedTech, setSelectedTech] = useState(null);

  const tactics = [
    {
      name: 'Initial Access',
      description: 'Gimana cara hacker masuk?',
      techniques: [
        { id: 'Phishing', icon: Mail, label: 'Phishing', info: 'Hacker masuk lewat email palsu yang ngaku-ngaku dari bank atau admin IT.' },
        { id: 'Vuln', icon: ShieldAlert, label: 'Exploit Public App', info: 'Hacker nyari celah di web lo (kayak SQLi atau XSS) buat masuk tanpa ijin.' }
      ]
    },
    {
      name: 'Credential Access',
      description: 'Hacker nyari password lo.',
      techniques: [
        { id: 'Brute', icon: Key, label: 'Brute Force', info: 'Hacker nebak ribuan password admin pake bot sampe ketemu yang bener.' },
        { id: 'Sniffing', icon: Zap, label: 'Network Sniffing', info: 'Hacker nyadap trafik WiFi kafe (pakai Wireshark) buat nyolong password HTTP.' }
      ]
    },
    {
      name: 'Exfiltration',
      description: 'Data curian dikirim keluar.',
      techniques: [
        { id: 'Exfil', icon: HardDriveDownload, label: 'Data Transfer', info: 'Hacker ngirim semua database user lo ke server rahasia mereka di luar negeri.' },
        { id: 'Archive', icon: Lock, label: 'Data Compressed', info: 'Data di-zip dulu biar ukurannya kecil trus disandikan biar gak ketahuan firewall.' }
      ]
    }
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
          <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/50">
            <UserX className="w-8 h-8 text-red-400" />
          </div>
          <div>
            <h1 className="text-sm text-red-400 tracking-[0.3em] uppercase font-black">Stage 4: Security Skills</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              MODUL 5: MITRE ATT&CK
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
                MEMBEDAH <br/>
                <span className="text-red-500" style={{ textShadow: '0 0 10px rgba(239, 68, 68, 0.5)' }}>OTAK MALING (MITRE)</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Kalau NIST fokus ke <span className="text-white">Pertahanan</span>, maka <span className="text-white font-bold underline decoration-red-500 underline-offset-4 uppercase">MITRE ATT&CK</span> fokus ke <span className="text-red-500 font-black italic underline">SI HACKER</span>. 
              </p>
            </section>

            <div className="space-y-6 text-sm leading-relaxed text-gray-400">
               <p>
                 MITRE itu kayak **Database Raksasa** yang nyatet semua jurus atau kelakuan maling digital di seluruh dunia. Mereka ngebagi langkah hacker jadi dua istilah: <span className="text-white">Taktik</span> (Tujuannya apa?) dan <span className="text-white">Teknik</span> (Caranya gimana?).
               </p>
               
               <p>
                 Misalnya, Taktik hacker adalah "Masuk ke Sistem". Tekniknya bisa lewat Phishing atau nge-crack password (Brute Force). Dengan pake MITRE, tim sekuriti bisa nebak langkah hacker selanjutnya!
               </p>

               <div className="p-6 bg-red-900/10 border border-red-500/30 rounded-2xl relative overflow-hidden group">
                  <div className="flex items-center gap-3 mb-4">
                     <Info className="w-5 h-5 text-red-400" />
                     <p className="text-white font-black italic uppercase tracking-widest text-[10px]">Analogi Ensiklopedia:</p>
                  </div>
                  <p className="italic text-gray-400 text-xs leading-relaxed">
                    MITRE itu kayak "Buku Catatan Kriminal". Kalau ada maling masuk lewat jendela pake linggis, polisi cek buku MITRE: "Oh, biasanya maling tipe ini abis ini bakal bongkar brankas!". 
                  </p>
               </div>
            </div>

            <div className="bg-red-500/5 border-l-4 border-red-500 p-6 space-y-2 rounded-r-xl relative group">
               <Zap className="w-6 h-6 text-red-500 mb-2" />
               <p className="text-[11px] text-gray-400 italic leading-relaxed">
                 "Pahami musuhmu lebih baik dari mereka memahami diri mereka sendiri. Itulah fungsi MITRE ATT&CK."
               </p>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12">
            <div className="p-8 bg-gray-900 border-2 border-red-500/30 rounded-3xl relative overflow-hidden min-h-[550px] flex flex-col shadow-2xl">
              
              <div className="mb-8 text-center relative z-10">
                 <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">MINI MATRIKS MITRE</h2>
                 <p className="text-[9px] text-red-500 font-bold tracking-[0.2em] mt-1 italic uppercase">Threat_Intel_Database_V4</p>
              </div>

              {/* MITRE Matrix Grid */}
              <div className="grid grid-cols-3 gap-2 flex-1">
                 {tactics.map((t) => (
                   <div key={t.name} className="flex flex-col gap-2">
                      <div className="bg-red-600/20 border border-red-500/30 p-2 rounded-lg text-center">
                         <h4 className="text-[10px] font-black text-white uppercase tracking-tighter leading-tight">{t.name}</h4>
                         <p className="text-[8px] text-red-400/60 mt-1 italic leading-tight">{t.description}</p>
                      </div>
                      {t.techniques.map((tech) => {
                        const Icon = tech.icon;
                        return (
                          <button 
                            key={tech.id}
                            onClick={() => setSelectedTech(tech)}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all h-24 text-center ${selectedTech?.id === tech.id ? 'bg-white border-white text-black' : 'bg-black/40 border-white/5 text-gray-400 hover:border-red-500/50'}`}
                          >
                             <Icon className={`w-5 h-5 mb-2 ${selectedTech?.id === tech.id ? 'text-red-500' : 'text-gray-600'}`} />
                             <span className="text-[10px] font-bold uppercase tracking-widest">{tech.label}</span>
                          </button>
                        );
                      })}
                   </div>
                 ))}
              </div>

              {/* Intelligence Display */}
              <div className="mt-6 p-6 bg-black border border-red-500/20 rounded-2xl min-h-[140px] relative">
                 <div className="absolute top-4 right-4 animate-pulse">
                    <MousePointer2 className="w-8 h-8 text-red-500/10" />
                 </div>
                 
                 <AnimatePresence mode="wait">
                    {selectedTech ? (
                      <motion.div 
                        key={selectedTech.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                         <h4 className="text-[10px] font-black text-red-500 uppercase tracking-widest flex items-center gap-2">
                            <Terminal className="w-3 h-3" /> INTEL_REPORT: {selectedTech.label}
                         </h4>
                         <p className="text-gray-300 text-xs leading-relaxed italic">
                            "{selectedTech.info}"
                         </p>
                         <div className="h-1 bg-red-500/20 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 1.5 }}
                              className="h-full bg-red-500"
                            />
                         </div>
                      </motion.div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                         <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-2 leading-relaxed">
                            Pilih teknik di atas buat <br/> liat kelakuan hacker
                         </p>
                         <Grid className="w-6 h-6 text-red-500/30" />
                      </div>
                    )}
                 </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-red-500 shadow-2xl">
          <Link 
            to="/academy/stage-4/modul-5/nist-framework"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « KEMBALI KE "NIST FRAMEWORK"
          </Link>
          
          <Link 
            to="/academy/stage-4/modul-5/kesimpulan"
            className="flex items-center gap-3 bg-red-600 hover:bg-white text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
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

export default MitreAttack;
