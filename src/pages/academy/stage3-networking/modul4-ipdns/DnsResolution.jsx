import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  ChevronLeft, 
  ChevronRight,
  Home, 
  Globe, 
  Search, 
  ShieldAlert, 
  Skull, 
  Server,
  LayoutGrid
} from 'lucide-react';

const DnsResolution = () => {
  const [activeTab, setActiveTab] = useState('normal'); // 'normal' or 'hacked'
  const [resolving, setResolving] = useState(false);
  const [resolved, setResolved] = useState(false);

  const startResolution = () => {
    setResolving(true);
    setResolved(false);
    setTimeout(() => {
      setResolving(false);
      setResolved(true);
    }, 1500);
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
          <div className="flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/50">
              <Globe className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 3: Networking</h1>
              <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
                MODUL 4: IP, MAC, DHCP & DNS
              </h2>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          
          {/* Kolom Kiri: Materi */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <section>
              <h1 className="text-5xl font-black text-white italic tracking-tighter uppercase mb-8 leading-none">
                Buku Telepon <br/>
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }}>Internet (DNS)</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-lg">
                Komputer itu nggak kenal kata-kata kayak <span className="text-white italic">google.com</span>. Dia cuma kenal angka (IP Address).
              </p>
            </section>

            <div className="bg-cyan-500/5 border-l-4 border-cyan-500 p-6 space-y-4 rounded-r-xl">
              <h3 className="text-white font-black flex items-center gap-2 italic uppercase tracking-tighter text-sm">
                <Search className="w-5 h-5 text-cyan-500" /> Resolving (Terjemahan)
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed italic">
                <span className="text-white font-bold">DNS (Domain Name System)</span> itu yang nerjemahin nama domain yang gampang diinget manusia jadi alamat IP yang dimengerti mesin. Ibarat lo cari nama "Asep" di kontak HP buat tau nomor teleponnya.
              </p>
            </div>

            <div className="bg-red-500/5 border border-red-500/30 p-6 rounded-xl space-y-4">
              <h4 className="text-sm font-black text-red-500 uppercase tracking-[0.2em] italic flex items-center gap-2">
                <ShieldAlert className="w-5 h-5" /> JEBAKAN: DNS SPOOFING
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed italic">
                Hacker bisa ngasih "Buku Telepon Palsu". Lo cari <span className="text-white underline decoration-red-500">klikbca.com</span>, tapi DNS palsu itu malah ngasih alamat IP server milik hacker. Jadi lo login di web palsu tanpa sadar!
              </p>
            </div>
          </motion.div>

          {/* Kolom Kanan: Simulasi */}
          <div className="sticky top-12 h-fit">
            <div className="p-8 bg-gray-900/50 border-2 border-cyan-500/30 rounded-3xl backdrop-blur-sm relative overflow-hidden min-h-[550px] flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3 italic">
                   <Server className="w-8 h-8 text-cyan-500" /> DNS POISON SIMULATOR
                </h2>

                <div className="flex bg-black/40 p-1 rounded-xl mb-8 border border-gray-800">
                  <button 
                    onClick={() => { setActiveTab('normal'); setResolved(false); }}
                    className={`flex-1 py-3 px-4 rounded-lg font-black text-[10px] tracking-widest uppercase transition-all ${activeTab === 'normal' ? 'bg-cyan-600 text-white' : 'text-gray-500 hover:text-white'}`}
                  >
                    RESOLVER NORMAL
                  </button>
                  <button 
                    onClick={() => { setActiveTab('hacked'); setResolved(false); }}
                    className={`flex-1 py-3 px-4 rounded-lg font-black text-[10px] tracking-widest uppercase transition-all ${activeTab === 'hacked' ? 'bg-red-600 text-white' : 'text-gray-500 hover:text-white'}`}
                  >
                    POISONED (HACKED)
                  </button>
                </div>

                <div className="p-8 bg-black/60 rounded-2xl border-2 border-gray-800 flex flex-col items-center gap-6 relative min-h-[200px] justify-center text-center">
                   <div className="flex items-center gap-4 text-white font-black italic text-xl tracking-tighter">
                      <span className="text-gray-500 uppercase tracking-widest text-[10px]">URL:</span>
                      www.bank-hacker.com
                   </div>

                   <AnimatePresence mode="wait">
                      {resolving ? (
                        <motion.div 
                          key="resolving"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex flex-col items-center gap-3"
                        >
                           <motion.div 
                             animate={{ rotate: 360 }}
                             transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                             className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full"
                           />
                           <p className="text-[10px] text-cyan-500 font-bold animate-pulse">QUERYING DNS ROOT SERVERS...</p>
                        </motion.div>
                      ) : resolved ? (
                        <motion.div 
                          key="resolved"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className={`p-6 rounded-xl border-2 w-full ${activeTab === 'normal' ? 'border-emerald-500 bg-emerald-500/5' : 'border-red-500 bg-red-500/5'}`}
                        >
                           <p className="text-[10px] text-gray-500 uppercase font-black mb-2">RESOLVED IP ADDRESS:</p>
                           <p className={`text-3xl font-black italic tracking-tighter ${activeTab === 'normal' ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold animate-pulse'}`}>
                              {activeTab === 'normal' ? "104.26.12.31" : "66.666.6.6 (MALICIOUS!)"}
                           </p>
                           <div className="mt-4 flex items-center justify-center gap-2">
                              {activeTab === 'normal' ? (
                                <>
                                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                  <span className="text-[9px] text-emerald-500 font-black uppercase">Situs ASLI: Aman Bos!</span>
                                </>
                              ) : (
                                <>
                                  <Skull className="w-4 h-4 text-red-500" />
                                  <span className="text-[9px] text-red-500 font-black uppercase tracking-tighter">Situs PALSU: TOKEN LO BAKAL DICOLONG!</span>
                                </>
                              )}
                           </div>
                        </motion.div>
                      ) : (
                        <p className="text-[10px] text-gray-700 italic font-black uppercase tracking-widest">Awaiting DNS Query_</p>
                      )}
                   </AnimatePresence>
                </div>
              </div>

              <button 
                onClick={startResolution}
                disabled={resolving}
                className={`w-full py-5 mt-8 font-black transition-all flex items-center justify-center gap-3 uppercase italic text-xs tracking-widest skew-x-[-12deg] shadow-lg ${activeTab === 'normal' ? 'bg-cyan-600 hover:bg-white text-white hover:text-black' : 'bg-red-600 hover:bg-white text-white hover:text-black'}`}
              >
                {resolving ? "MENCARI ALAMAT..." : "Klik Untuk Resolve DomaiN 🌐"}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-end items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl text-left">
          <Link 
            to="/academy/stage-3/modul-4/kesimpulan"
            className="flex items-center gap-3 bg-cyan-600 hover:bg-white text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
          >
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest leading-none uppercase">
              LANJUT KE KESIMPULAN » <ChevronRight className="w-4 h-4 font-bold" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DnsResolution;
