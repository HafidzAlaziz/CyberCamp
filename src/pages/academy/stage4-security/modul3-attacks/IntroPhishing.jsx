import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, ShieldAlert, ShieldCheck, ChevronRight, MousePointer2, AlertTriangle, ExternalLink, Info } from 'lucide-react';

const IntroPhishing = () => {
  const [result, setResult] = useState(null); // 'safe' or 'phish'
  const [showHover, setShowHover] = useState(false);

  const handleChoice = (choice) => {
    setResult(choice);
  };

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
            <Mail className="w-8 h-8 text-cyan-400 relative z-10" />
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-cyan-500/20 blur-xl"
            />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 4: Security Skills</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              MODUL 3: Common Attacks
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
                Nyamar jadi <br/>
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }}>PAK RT (PHISHING)</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Phishing itu serangan <span className="text-white font-bold underline decoration-cyan-500 underline-offset-4">SOCIAL ENGINEERING</span> paling kuno tapi paling ampuh. 
              </p>
            </section>

            <div className="space-y-6 text-sm leading-relaxed">
              <p>
                Hacker gak perlu capek-capek nge-hack server Facebook yang dijaga ribuan engineer jagoan. Mereka cukup <span className="text-cyan-400 italic">manipulasi PSIKOLOGI</span> lo. 
              </p>
              
              <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl space-y-4">
                 <p className="font-bold text-white flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" /> Skenario Klasik:
                 </p>
                 <ul className="list-disc list-inside space-y-2 text-gray-400 italic">
                    <li>Kirim email ancaman: "Akun Anda Akan Diblokir!"</li>
                    <li>Bikin web palsu yang mirip banget sama aslinya.</li>
                    <li>Korban panik, ketik password, dan <span className="text-red-500 font-black">DHUAR!</span> Password lo raib dicolong hacker.</li>
                 </ul>
              </div>

              <p>
                Hacker itu nyamar jadi "Pak RT" yang minta kunci rumah lo lewat surat kaleng. Lo percaya gitu aja karena suratnya kelihatan "Resmi".
              </p>
            </div>

            <div className="bg-cyan-500/5 border-l-4 border-cyan-500 p-6 space-y-2 rounded-r-xl">
              <h3 className="text-white font-black flex items-center gap-2 italic uppercase tracking-tighter text-xs">
                <Info className="w-5 h-5 text-cyan-500" /> Hacker Tip: URL Inspection
              </h3>
              <p className="text-[11px] text-gray-400 italic leading-relaxed">
                Selalu <span className="text-white">HOVER</span> (arahin kursor) ke link sebelum klik. Lihat di pojok bawah browser, link aslinya ngarah ke mana. Jangan sampe ketipu tipu daya muslihat!
              </p>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12">
            <div className="p-8 bg-gray-900/50 border-2 border-cyan-500/30 rounded-3xl backdrop-blur-sm relative overflow-hidden min-h-[500px] flex flex-col shadow-2xl">
              
              <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3 italic uppercase tracking-tighter">
                <MousePointer2 className="w-8 h-8 text-cyan-500" /> SPOT THE FAKE
              </h2>

              {/* Email UI Simulation */}
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden mb-8 transform hover:scale-[1.02] transition-transform duration-300">
                 {/* Email Header */}
                 <div className="bg-gray-100 p-4 border-b border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Daripada:</span>
                       <span className="text-[10px] text-blue-500 font-bold font-sans">admin@paypa1.com</span>
                    </div>
                    <h4 className="text-gray-950 font-sans font-bold text-sm">PENTING: Verifikasi Akun Anda Segera!</h4>
                 </div>
                 
                 {/* Email Body */}
                 <div className="p-6 text-gray-800 font-sans space-y-4">
                    <div className="w-20 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold italic mb-4">PayPal</div>
                    <p className="text-xs leading-relaxed">
                       Halo Pengguna, Kami mendeteksi aktivitas mencurigakan. Jika Anda tidak melakukan login baru-baru ini, segera klik tombol di bawah untuk mengamankan saldo Anda.
                    </p>
                    
                    <div 
                      onMouseEnter={() => setShowHover(true)}
                      onMouseLeave={() => setShowHover(false)}
                      className="relative block w-full py-4 bg-blue-600 text-white font-bold text-center rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                    >
                       VERIFIKASI SEKARANG
                       {/* Subtle URL Hover indicator common in browsers */}
                       <AnimatePresence>
                         {showHover && (
                           <motion.div 
                             initial={{ opacity: 0, y: 10 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0 }}
                             className="absolute -bottom-8 left-0 bg-gray-100 text-[10px] text-gray-500 px-2 py-1 rounded shadow-sm border border-gray-300 z-50 whitespace-nowrap"
                           >
                              http://secure-login-update.com/paypal
                           </motion.div>
                         )}
                       </AnimatePresence>
                    </div>

                    <p className="text-[10px] text-gray-400 text-center italic">
                       Email ini dikirim otomatis. Harap tidak membalas.
                    </p>
                 </div>
              </div>

              {/* Interaction Buttons */}
              <div className="grid grid-cols-2 gap-4 mt-auto">
                 <button 
                   onClick={() => handleChoice('safe')}
                   className="py-4 bg-emerald-500/10 border-2 border-emerald-500/50 text-emerald-500 font-black rounded-2xl hover:bg-emerald-500 hover:text-white transition-all uppercase tracking-tighter"
                 >
                    Ini Aman
                 </button>
                 <button 
                   onClick={() => handleChoice('phish')}
                   className="py-4 bg-red-500/10 border-2 border-red-500/50 text-red-500 font-black rounded-2xl hover:bg-red-500 hover:text-white transition-all uppercase tracking-tighter"
                 >
                    Ini Phishing
                 </button>
              </div>

              {/* Result Overlay */}
              <AnimatePresence>
                {result && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`absolute inset-0 z-50 flex items-center justify-center p-8 bg-gray-950/95 backdrop-blur-md rounded-3xl border-2 ${result === 'phish' ? 'border-emerald-500' : 'border-red-500'}`}
                  >
                     <div className="text-center space-y-6">
                        {result === 'phish' ? (
                          <>
                            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500">
                               <ShieldCheck className="w-10 h-10 text-emerald-500" />
                            </div>
                            <h3 className="text-2xl font-black text-emerald-500 uppercase italic leading-none">MANTAP ELANG!</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                               Mata elang lo nylametin rekening lo! Itu pengirimnya pake angka **1** (paypa1), dan link-nya ngarah ke web gak jelas. Hacker nangis bombay!
                            </p>
                          </>
                        ) : (
                          <>
                             <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto border-2 border-red-500">
                               <motion.div
                                 animate={{ x: [-5, 5, -5, 5, 0] }}
                                 transition={{ duration: 0.4 }}
                               >
                                 <ShieldAlert className="w-10 h-10 text-red-500" />
                               </motion.div>
                            </div>
                            <h3 className="text-2xl font-black text-red-500 uppercase italic leading-none">DHUAR! LUDES!</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                               Aduh, saldo lo ludes disikat hacker! Cek lagi tuh alamat email pengirimnya pake angka **1** dan link-nya mengarah ke domain asing. Hati-hati ya!
                            </p>
                          </>
                        )}
                        <button 
                          onClick={() => setResult(null)}
                          className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-black uppercase tracking-widest transition-all"
                        >
                           COBA LAGI
                        </button>
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-end items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link 
            to="/academy/stage-4/modul-3/sql-injection"
            className="flex items-center gap-3 bg-cyan-600 hover:bg-white text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
          >
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest leading-none uppercase">
              LANJUT KE SQLi » <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default IntroPhishing;
