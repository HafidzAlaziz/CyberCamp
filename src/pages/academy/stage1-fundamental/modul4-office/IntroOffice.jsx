import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, ShieldCheck, ShieldAlert, ChevronRight, Ghost, FileText, AlertTriangle } from 'lucide-react';

const IntroOffice = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [outcome, setOutcome] = useState(null); // 'safe' or 'malware'

  const openMail = () => {
    setIsOpen(true);
    // 50-50 chance
    const isMalware = Math.random() > 0.5;
    setTimeout(() => {
      setOutcome(isMalware ? 'malware' : 'safe');
    }, 800);
  };

  const resetMail = () => {
    setIsOpen(false);
    setOutcome(null);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-purple-900/30 pb-6"
        >
          <div className="p-3 bg-purple-500/10 rounded border border-purple-500/50">
            <FileText className="w-8 h-8 text-purple-400" />
          </div>
          <div>
             <h1 className="text-sm text-purple-400 tracking-[0.3em] uppercase font-black">Fundamental Phase_04</h1>
             <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">OFFICE & DOCUMENT SECURITY</h2>
          </div>
        </motion.div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-purple-400 mb-6 italic tracking-tight">"Ngapain Belajar Word & Excel?" 🤔</h3>
            <div className="space-y-4 text-base leading-relaxed text-gray-400">
              <p>
                Mungkin lo mikir: <span className="text-white italic">"Kan gue mau jadi hacker, bukan admin kantoran!"</span>. 
                Eits, dengerin dulu. Di dunia cyber, dokumen itu ibarat <span className="text-purple-400 font-bold underline decoration-purple-500/30">Trojan Horse (Kuda Troya)</span>.
              </p>
              <p>
                 Hacker jahat sering banget ngirim email palsu pura-pura jadi HRD atau Finance, lampirannya file <span className="text-white font-mono bg-white/5 px-1">Tagihan_Gaji.docx</span>. 
                 Pas lo klik "Enable Content", boom! Virusnya langsung nyusup ke sistem.
              </p>
              <p className="bg-purple-500/5 p-4 border-l-2 border-purple-500 rounded-sm italic text-sm">
                 Gak cuma itu, orang kantoran sering banget nyimpen "brankas" rahasia (kayak password) di dalem file Excel sembarangan. Kita bakal belajar cara ngelindungin diri dari jebakan batman kayak gini.
              </p>
            </div>
          </motion.div>

          {/* Interactive Simulation: Surat Misterius */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-900/40 border border-gray-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden group text-center"
          >
            <h4 className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-10">
               Simulation: [SURAT_MISTERIUS_DETECTOR]
            </h4>

            <div className="relative inline-block mb-8">
               <AnimatePresence mode="wait">
                  {!isOpen ? (
                    <motion.div 
                      key="closed"
                      initial={{ scale: 0.8, rotate: -5 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 1.2, opacity: 0 }}
                      className="cursor-pointer"
                      onClick={openMail}
                    >
                       <Mail className="w-32 h-32 text-purple-500 drop-shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-110 transition-transform" />
                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black px-2 py-0.5 text-[8px] font-black skew-x-[-12deg] pointer-events-none uppercase">
                          Klik_Buka
                       </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="open"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center gap-4"
                    >
                       {outcome === null ? (
                         <div className="w-32 h-32 flex items-center justify-center">
                            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                         </div>
                       ) : outcome === 'malware' ? (
                         <div className="space-y-4">
                            <ShieldAlert className="w-32 h-32 text-red-500 drop-shadow-[0_0_30px_rgba(239,68,68,0.5)]" />
                            <div className="bg-red-500/20 text-red-500 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest border border-red-500">
                               ⚠ ZONK! MALWARE TERDETEKSI!
                            </div>
                         </div>
                       ) : (
                         <div className="space-y-4">
                            <ShieldCheck className="w-32 h-32 text-emerald-500 drop-shadow-[0_0_30px_rgba(16,185,129,0.5)]" />
                            <div className="bg-emerald-500/20 text-emerald-500 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest border border-emerald-500">
                               ✅ AMAN: Cuma Tagihan Listrik
                            </div>
                         </div>
                       )}
                    </motion.div>
                  )}
               </AnimatePresence>
            </div>

            <div className="pt-6 border-t border-gray-800 space-y-4">
               <p className="text-[10px] text-gray-500 italic">
                  {outcome === 'malware' ? "Nah kan! File yang lo buka barusan nyuntikin script ke CMD lo. Untung ini cuma simulasi." : outcome === 'safe' ? "Kali ini lo beruntung. Tapi jangan pernah asal klik file misterius di dunia asli!" : "Berani buka lampiran dari email HRD yang lo nggak kenal?"}
               </p>
               {outcome && (
                 <button 
                   onClick={resetMail}
                   className="text-[10px] text-purple-400 hover:text-white underline uppercase font-bold"
                 >
                   [ Reset Simulasi ]
                 </button>
               )}
            </div>
          </motion.div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-end mt-12 pt-8 border-t border-gray-900">
          <Link 
            to="/academy/stage-1/modul-4/bahaya-macro"
            className="flex items-center gap-3 bg-purple-600 hover:bg-white text-black px-10 py-5 rounded-sm font-black transition-all group overflow-hidden relative skew-x-[-12deg]"
          >
            <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
            <span className="relative z-10 skew-x-[12deg] flex items-center gap-2 uppercase tracking-tighter">
               MASUK: BAHAYA MACRO & EKSTENSI <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IntroOffice;
