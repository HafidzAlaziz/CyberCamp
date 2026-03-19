import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Database, ShieldCheck, ChevronRight, ChevronLeft, Zap, Info, Cpu, ArrowRight } from 'lucide-react';

const HashingGilingan = () => {
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');

  // Simple deterministic hash simulation (Avalanche effect)
  const simulateHash = (str) => {
    if (!str) return '--- PASTI KOSONG ---';
    let h1 = 0xdeadbeef ^ str.length, h2 = 0x41c6ce57;
    for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (h1 >>> 0).toString(16).padStart(8, '0') + (h2 >>> 0).toString(16).padStart(8, '0');
  };

  useEffect(() => {
    setHash(simulateHash(input).toUpperCase());
  }, [input]);

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
            <Cpu className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 4: Security Skills</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              MODUL 2: Hashing (Mesin Giling)
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
                Sosis & <br/>
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }}>MESIN GILING</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Beda sama enkripsi yang bisa dibalik (decrypt), Hashing itu <span className="text-white font-bold underline decoration-cyan-500">SATU ARAH</span>. 
              </p>
            </section>

            <div className="space-y-6">
              <div className="p-6 bg-gray-900/80 border border-gray-800 rounded-2xl">
                <p className="text-sm leading-relaxed italic text-cyan-400 font-bold mb-4 uppercase tracking-widest">Analogi Gilingan Daging:</p>
                <div className="flex items-center gap-4 text-xs">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-2">🐄</div>
                    <span className="text-gray-500">Sapi (Input)</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-700" />
                  <div className="p-3 bg-cyan-500/20 rounded-lg border border-cyan-500/50 text-xl font-bold">⚙️</div>
                  <ArrowRight className="w-4 h-4 text-gray-700" />
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-2">🌭</div>
                    <span className="text-gray-500">Sosis (Hash)</span>
                  </div>
                </div>
                <p className="mt-6 text-[11px] text-gray-500 leading-relaxed">
                   Lo masukin sapi ke mesin giling, keluarnya sosis. Tapi lo GAK BAKAL BISA balikin sosis itu jadi sapi lagi. Itulah Hash!
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-white font-black italic uppercase tracking-tighter flex items-center gap-2">
                   <ShieldCheck className="w-5 h-5 text-emerald-500" /> Kenapa Perlu?
                </h3>
                <p className="text-sm leading-relaxed">
                  Tokopedia atau Google <span className="text-white font-bold italic underline">NGGAK TAU</span> password asli lo. Mereka cuma nyimpen "Sosis"-nya (Hash). 
                </p>
                <p className="text-sm leading-relaxed">
                  Kalau database mereka bocor, hacker cuma dapet miliaran "sosis" acak yang nggak bisa dibalikin jadi password asli. Aman kan?
                </p>
              </div>
            </div>

            <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-6 space-y-2 rounded-r-xl">
               <div className="flex items-center gap-2 text-emerald-500 mb-2">
                  <Zap className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Avalanche Effect</span>
               </div>
               <p className="text-[11px] text-gray-400 italic leading-relaxed">
                 Coba deh ganti satu huruf aja di simulator sebelah, lihat gimana outputnya berubah DRAGTIS. Ini yang bikin hacker pusing 7 keliling buat nebak inputnya!
               </p>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12">
            <div className="p-8 bg-black/60 border-2 border-cyan-500/30 rounded-3xl relative overflow-hidden min-h-[500px] flex flex-col justify-center shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              
              {/* Animated Background Grid */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#06b6d4 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }} />

              <div className="relative z-10 space-y-10">
                <div className="text-center">
                   <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Gilingan Pass-Gen v2.0</h2>
                   <p className="text-[9px] text-cyan-500 font-bold tracking-[0.3em] mt-1 italic">SHA-256 ONE-WAY HASH SIMULATOR</p>
                </div>

                {/* Input Area */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center px-1">
                     <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest underline decoration-cyan-500/50 underline-offset-4">Password Asli:</label>
                     <p className="text-[8px] text-gray-600 italic">Format: UTF-8 Static</p>
                  </div>
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-800 p-5 rounded-xl text-white font-black focus:border-cyan-500 outline-none transition-all placeholder:text-gray-800 focus:shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                    placeholder="Masukan kata apa saja..."
                  />
                </div>

                {/* Machine Core Visual */}
                <div className="flex justify-center flex-col items-center gap-2">
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                     className="p-4 bg-cyan-500/10 rounded-full border-2 border-dashed border-cyan-500/30"
                   >
                      <Cpu className="w-8 h-8 text-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                   </motion.div>
                </div>

                {/* Output Area */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center px-1">
                     <label className="text-[10px] font-black text-red-500/60 uppercase tracking-widest">Hasil Gilingan (HASH Output):</label>
                  </div>
                  <div className="w-full bg-gray-950 border border-gray-800 p-6 rounded-2xl relative group overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-5">
                       <Database className="w-12 h-12" />
                    </div>
                    <code className="text-amber-500 font-black text-xs md:text-sm block break-all leading-relaxed font-mono tracking-widest">
                       {hash}
                    </code>
                    {input && (
                      <motion.div 
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"
                      />
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/10">
                   <Info className="w-5 h-5 text-cyan-500 shrink-0" />
                   <p className="text-[9px] text-gray-500 italic leading-relaxed">
                     Input satu huruf saja ("A") kemudian hapus dan ketik lagi. Hash-nya akan selalu SAMA. Tapi ganti "A" jadi "a" (kecil), hash-nya langsung BERUBAH TOTAL.
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link 
            to="/academy/stage-4/modul-2/symmetric-asymmetric"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « KEMBALI KE KUNCI
          </Link>
          
          <Link 
            to="/academy/stage-4/modul-2/kesimpulan"
            className="flex items-center gap-3 bg-cyan-600 hover:bg-white text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
          >
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest leading-none uppercase">
              SELESAIKAN MODUL » <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HashingGilingan;
