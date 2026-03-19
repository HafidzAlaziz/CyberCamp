import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Lock, Unlock, Shield, ChevronRight, Terminal, Key } from 'lucide-react';

const IntroCrypto = () => {
  const [text, setText] = useState('HALO');
  const [shift, setShift] = useState(3);

  const encrypt = (str, s) => {
    return str.toUpperCase().replace(/[A-Z]/g, (char) => {
      return String.fromCharCode(((char.charCodeAt(0) - 65 + s) % 26) + 65);
    });
  };

  const encryptedText = encrypt(text, shift);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12 transition-all duration-500">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-cyan-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/50 relative overflow-hidden group">
            <Lock className="w-8 h-8 text-cyan-400 relative z-10" />
            <motion.div 
              animate={{ y: [20, -20] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-cyan-500/20 blur-xl"
            />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 4: Security Skills</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              MODUL 2: Cryptography & Hashing
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
                Ilmu Rahasia <br/>
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }}>KRIPTOGRAFI</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Kriptografi itu intinya ilmu buat <span className="text-white font-bold underline decoration-cyan-500 underline-offset-4 font-mono">NYEMBUNYIIN PESAN</span>. 
              </p>
            </section>

            <div className="space-y-6">
              <p className="text-sm leading-relaxed">
                Bayangin lo lagi nongkrong di kafe, terus ngirim chat <span className="text-cyan-400 italic">"Aku sayang kamu"</span> pake WiFi gratisan. Di situ ada hacker yang lagi "sniffing" (nyadap) trafik. 
              </p>
              
              <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Shield className="w-12 h-12" />
                </div>
                <p className="text-xs italic text-gray-500 mb-4 uppercase tracking-widest font-black">Hasil Sadapan Hacker:</p>
                <code className="text-red-500 font-black text-lg block break-all">Xq#91Lp!@*&</code>
              </div>

              <p className="text-sm leading-relaxed">
                Hacker pusing karena pesannya udah di-enkripsi jadi <span className="text-white font-bold italic">Ciphertext</span> (teks acak). Cuma orang yang punya "Kunci"-nya yang bisa baca pesan aslinya.
              </p>
            </div>

            <div className="bg-cyan-500/5 border-l-4 border-cyan-500 p-6 space-y-2 rounded-r-xl">
              <h3 className="text-white font-black flex items-center gap-2 italic uppercase tracking-tighter text-xs">
                <Terminal className="w-5 h-5 text-cyan-500" /> Hacker Context: Encryption
              </h3>
              <p className="text-[11px] text-gray-400 italic leading-relaxed">
                Dunia tanpa enkripsi itu ibarat lo teriak-teriak di tengah pasar. Semua orang tau rahasia lo. Makanya, enkripsi itu jantungnya keamanan internet!
              </p>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12">
            <div className="p-8 bg-gray-900/50 border-2 border-cyan-500/30 rounded-3xl backdrop-blur-sm relative overflow-hidden min-h-[500px] flex flex-col justify-between">
              
              {/* Scanline Effect */}
              <div className="absolute inset-0 bg-scanline opacity-5 pointer-events-none" />

              <div>
                <h2 className="text-2xl font-black text-white mb-2 flex items-center gap-3 italic uppercase tracking-tighter">
                  <Key className="w-8 h-8 text-cyan-500" /> CAESAR CIPHER SIM
                </h2>
                <p className="text-gray-500 text-[10px] mb-10 uppercase tracking-[0.2em] font-black italic">Metode Enkripsi Kuno Kaisar Romawi</p>

                <div className="space-y-8">
                  {/* Input Box */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-cyan-500/60 uppercase tracking-widest">Pesan Asli (Plaintext):</label>
                    <input 
                      type="text" 
                      value={text}
                      onChange={(e) => setText(e.target.value.toUpperCase().slice(0, 15))}
                      className="w-full bg-black/60 border border-gray-800 p-4 rounded-xl text-white font-black tracking-widest focus:border-cyan-500 outline-none transition-all uppercase"
                      placeholder="KETIK PESAN..."
                    />
                  </div>

                  {/* Shift Slider */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                      <span className="text-cyan-500/60">Geser Huruf:</span>
                      <span className="px-3 py-1 bg-cyan-500 text-black rounded-sm">+{shift}</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="25" 
                      value={shift}
                      onChange={(e) => setShift(parseInt(e.target.value))}
                      className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    />
                  </div>

                  {/* Visual Arrow */}
                  <motion.div 
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="flex justify-center"
                  >
                    <div className="w-0.5 h-8 bg-gradient-to-b from-cyan-500 to-transparent" />
                  </motion.div>

                  {/* Output Box */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-red-500/60 uppercase tracking-widest">Pesan Terkunci (Ciphertext):</label>
                    <div className="w-full bg-red-500/5 border border-red-500/30 p-5 rounded-xl text-red-500 font-black tracking-[0.3em] overflow-hidden break-all text-xl shadow-[0_0_30px_rgba(239,68,68,0.1)]">
                      {encryptedText || '---'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="mt-8 pt-6 border-t border-gray-800/50 flex items-center justify-between text-[8px] font-black uppercase tracking-widest tracking-tighter">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
                  <span className="text-emerald-500">Secure Protocol Active</span>
                </div>
                <span className="text-gray-600 italic">V-ROMAN_ENCRYPT_ENGINE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-end items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link 
            to="/academy/stage-4/modul-2/symmetric-asymmetric"
            className="flex items-center gap-3 bg-cyan-600 hover:bg-white text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
          >
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest leading-none uppercase">
              GAS LANJUT: KUNCI SIMETRIS » <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default IntroCrypto;
