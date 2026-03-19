import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Folder, FileSpreadsheet, Search, Database, Unlock, AlertCircle, Sparkles, RefreshCw } from 'lucide-react';

const ExcelTarget = () => {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  const startScan = () => {
    setScanning(true);
    setScanned(false);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Standardized Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-10 border-b border-emerald-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/50">
            <Database className="w-8 h-8 text-emerald-500" />
          </div>
          <div>
            <h1 className="text-sm text-emerald-500 tracking-[0.3em] uppercase font-black">Stage 1: Fundamentals</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              MODUL 4: OFFICE SECURITY
            </h2>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-emerald-400 mb-6 italic tracking-tight uppercase underline decoration-emerald-500/30 underline-offset-8">Tambang Emas Hacker? 💰</h3>
            <div className="space-y-4 text-base leading-relaxed text-gray-400">
              <p>
                Kenapa Excel itu disebut "tambang emas"? Karena banyak orang (bahkan admin perusahaan gede) masih suka nyimpen <span className="text-white font-bold italic underline decoration-emerald-500">daftar username dan password</span> sembarangan di dalemnya!
              </p>
              <p>
                 Data nomor KTP, gaji karyawan, sampe rahasia dapur perusahaan sering ditaruh di file Excel biasa yang <span className="text-emerald-500 font-black italic">NGGAK DIKUNCI</span>. 
              </p>
              <p className="bg-emerald-500/5 p-4 border-l-2 border-emerald-500 rounded-sm italic text-xs leading-relaxed">
                 Kalo hacker berhasil masuk ke komputer target, yang pertama mereka cari pasti file berakhiran <span className="text-emerald-400">.xlsx</span> atau <span className="text-emerald-400">.csv</span>. Sekali dapet, semua rahasia lo langsung kebongkar.
              </p>
            </div>
          </motion.div>

          {/* Interactive Simulation: Data Discovery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-black/40 border border-gray-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden text-center"
          >
            <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-10 flex items-center justify-center gap-2">
               <Search className="w-4 h-4" /> Data Discovery Tool v1.0
            </h4>

            {/* Folders Grid */}
            <div className="grid grid-cols-3 gap-4 mb-10">
               <div className="flex flex-col items-center gap-2 opacity-40">
                  <Folder className="w-12 h-12 text-gray-600" />
                  <span className="text-[8px] uppercase font-bold">Foto_Liburan</span>
               </div>
               <div className="flex flex-col items-center gap-2 opacity-40">
                  <Folder className="w-12 h-12 text-gray-600" />
                  <span className="text-[8px] uppercase font-bold">Game_Lama</span>
               </div>
               <motion.div 
                 animate={scanning ? { scale: [1, 1.1, 1], transition: { repeat: Infinity } } : scanned ? { borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)'} : {}}
                 className={`flex flex-col items-center gap-2 p-3 border rounded-xl transition-all ${scanned ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] animate-pulse' : 'border-emerald-500/20 opacity-40'}`}
               >
                  <FileSpreadsheet className={`w-12 h-12 ${scanned ? 'text-emerald-500' : 'text-gray-600'}`} />
                  <span className={`text-[8px] uppercase font-bold text-center ${scanned ? 'text-emerald-400' : ''}`}>Data_Karyawan_Confidential.xlsx</span>
               </motion.div>
            </div>

            <div className="space-y-6">
               <button 
                 onClick={startScan}
                 disabled={scanning}
                 className="w-full py-4 bg-emerald-500 hover:bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] transition-all flex items-center justify-center gap-2 rounded-sm disabled:opacity-30"
               >
                 {scanning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                 {scanning ? 'SCANNING_STORAGE...' : 'MULAI DISCOVERY SCAN'}
               </button>

               <AnimatePresence>
                  {scanned && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-left space-y-2 relative overflow-hidden"
                    >
                       <Unlock className="absolute -top-2 -right-2 w-12 h-12 text-emerald-500/10" />
                       <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                          <Sparkles className="w-3 h-3" /> JACKPOT!
                       </div>
                       <p className="text-[9px] text-gray-300 italic leading-relaxed">
                          Ditemukan 500 baris data sensitif (Username, Password, Salary) yang tidak dienrkipsi dalam file Excel. 
                          <span className="text-emerald-400 font-bold"> Target diekstraksi ke server hacker.</span>
                       </p>
                    </motion.div>
                  )}
               </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900/30 p-6 rounded-2xl border border-gray-800">
          <Link 
            to="/academy/stage-1/modul-4/bahaya-macro"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            « KEMBALI KE MACRO
          </Link>
          
          <Link 
            to="/academy/stage-1/modul-4/kesimpulan"
            className="flex items-center gap-3 bg-emerald-600 hover:bg-white text-black px-8 py-4 rounded-sm font-black transition-all group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
            <span className="relative z-10 flex items-center gap-2 uppercase tracking-tighter">
              FINISH: STAGE 1 COMPLETED <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};


export default ExcelTarget;
