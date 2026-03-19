import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Database, Server, ShieldAlert, CheckCircle2, XCircle, ChevronRight, ChevronLeft, HardDrive, Cpu, LayoutGrid } from 'lucide-react';

const IntroStorage = () => {
  const [choice, setChoice] = useState(null);
  const [feedback, setFeedback] = useState("");

  const handleChoice = (type) => {
    setChoice(type);
    if (type === 'NAS') {
      setFeedback("Tepat! NAS itu Folder yang bisa diakses rame-rame lewat jaringan Jaringan (Network).");
    } else {
      setFeedback("SAN itu lebih 'hardcore' (Block Level), biasanya buat database raksasa. Buat sharing file tim, NAS lebih cocok!");
    }
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
            <Database className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 3: Networking</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              MODUL 5: NAS & SAN Basics
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
                Brankas Data <br/>
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }}>Pusat (Centralized)</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Bayangin lo punya tim hacker. Masa tiap orang nyimpen data hasil 'operasi' di laptop masing-masing? Repot bener kalo mau sharing! 
              </p>
            </section>

            <div className="bg-red-500/5 border-l-4 border-red-500 p-6 space-y-4 rounded-r-xl">
              <h3 className="text-white font-black flex items-center gap-2 italic uppercase tracking-tighter text-sm">
                <ShieldAlert className="w-5 h-5 text-red-500 font-bold" /> Resiko Data Berceceran
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed italic">
                Data yang nyebar itu gampang ilang, susah dibackup, dan bahaya kalo ada laptop yang kena 'ciduk'. Makanya kita butuh <span className="text-white font-bold underline decoration-red-500 underline-offset-4">Centralized Storage</span>.
              </p>
            </div>

            <p className="text-gray-400 leading-relaxed text-sm">
              Ibaratnya, daripada simpen duit di dompet masing-masing (Local Storage), mending semua ditaruh di satu Brankas Pusat yang dijaga ketat sama satpam.
            </p>

            <div className="p-4 bg-gray-900 border border-gray-800 rounded-xl space-y-4">
              <h4 className="text-xs font-black text-cyan-500 uppercase tracking-widest italic flex items-center gap-2">
                <Server className="w-4 h-4" /> Ada dua cara main:
              </h4>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-1.5 shrink-0" />
                  <p className="text-xs text-gray-500"><span className="text-gray-200 font-bold italic underline decoration-cyan-500/50">NAS (Network Attached Storage):</span> Ibarat Folder Google Drive tapi punya lo sendiri di jaringan lokal.</p>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-1.5 shrink-0" />
                  <p className="text-xs text-gray-500"><span className="text-gray-200 font-bold italic underline decoration-cyan-500/50">SAN (Storage Area Network):</span> Ini level pro, ibaratnya lo nambahin Harddisk 'virtual' langsung ke server-server lo.</p>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12">
            <div className="p-8 bg-gray-900/50 border-2 border-cyan-500/30 rounded-3xl backdrop-blur-sm relative overflow-hidden min-h-[500px] flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3 italic">
                  <HardDrive className="w-8 h-8 text-cyan-500 shadow-[0_0_10px_cyan]" /> PILIH BRANKAS LO
                </h2>
                <p className="text-gray-400 text-xs mb-8 italic">Pilih yang paling cocok buat tim lo yang mau sharing file asik-asikan:</p>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => handleChoice('NAS')}
                    className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 font-black group ${choice === 'NAS' ? 'border-cyan-500 bg-cyan-500/10' : 'border-gray-800 bg-black/40 hover:border-gray-600'}`}
                  >
                    <Server className={`w-10 h-10 ${choice === 'NAS' ? 'text-cyan-400' : 'text-gray-600 group-hover:text-gray-400'}`} />
                    <span className={choice === 'NAS' ? 'text-white italic' : 'text-gray-600 tracking-widest'}>NAS</span>
                  </button>
                  <button 
                    onClick={() => handleChoice('SAN')}
                    className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 font-black group ${choice === 'SAN' ? 'border-cyan-500 bg-cyan-500/10' : 'border-gray-800 bg-black/40 hover:border-gray-600'}`}
                  >
                    <Cpu className={`w-10 h-10 ${choice === 'SAN' ? 'text-cyan-400' : 'text-gray-600 group-hover:text-gray-400'}`} />
                    <span className={choice === 'SAN' ? 'text-white italic' : 'text-gray-600 tracking-widest'}>SAN</span>
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {choice && (
                    <motion.div 
                      key={feedback}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`mt-12 p-6 rounded-2xl border flex items-start gap-4 ${choice === 'NAS' ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-red-500/10 border-red-500/50'}`}
                    >
                      {choice === 'NAS' ? <CheckCircle2 className="text-emerald-500 shrink-0" /> : <XCircle className="text-red-500 shrink-0" />}
                      <p className={`text-xs italic leading-relaxed ${choice === 'NAS' ? 'text-emerald-400' : 'text-red-400'}`}>{feedback}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <p className="text-[13px] text-gray-500 leading-relaxed italic border-t border-gray-800 pt-6 mt-6">
                 Centralized Storage itu ibarat satu brankas besar. Lebih gampang dijaga daripada nyebar brankas kecil di tiap meja karyawan!
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-end items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          
          <Link 
            to="/academy/stage-3/modul-5/nas-deep-dive"
            className="flex items-center gap-3 bg-cyan-600 hover:bg-white text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
          >
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest leading-none uppercase">
              LANJUT KE DEEP DIVE NAS » <ChevronRight className="w-4 h-4 font-bold" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IntroStorage;
