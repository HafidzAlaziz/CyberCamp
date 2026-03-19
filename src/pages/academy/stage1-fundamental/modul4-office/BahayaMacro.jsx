import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Search, ShieldCheck, ShieldAlert, FileSearch, FileCode, FileWarning, Eye } from 'lucide-react';

const BahayaMacro = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const analyzeFile = (file) => {
    setSelectedFile(file);
    setAnalyzing(true);
    setResult(null);
    
    setTimeout(() => {
      setAnalyzing(false);
      setResult(file === 'xlsx' ? 'safe' : 'malware');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Standardized Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-orange-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/50">
            <FileSearch className="w-8 h-8 text-orange-500" />
          </div>
          <div>
            <h1 className="text-sm text-orange-500 tracking-[0.3em] uppercase font-black">Stage 1: Fundamentals</h1>
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
            <h3 className="text-2xl font-bold text-orange-500 mb-6 italic tracking-tight uppercase underline decoration-orange-500/30 underline-offset-8">Double Extension Trap 🕸️</h3>
            <div className="space-y-4 text-base leading-relaxed text-gray-400">
              <p>
                <span className="text-white font-black uppercase">Ekstensi:</span> Nama belakang file. Orang awam sering ketipu file <span className="text-orange-400 font-bold italic">Foto_Liburan.jpg.exe</span>. 
                Keliatannya kayak foto biasa, padahal aslinya itu aplikasi virus bergengsi!
              </p>
              <p>
                 <span className="text-white font-black uppercase">Macro:</span> Fitur otomatis di Word/Excel. Emang keren buat ngolah data cepet, tapi sering disalahgunain hacker buat pasang "pintu belakang" di dokumen lo.
              </p>
              <div className="p-4 bg-orange-500/5 border-l-2 border-orange-500 rounded-sm italic text-[10px] text-gray-500">
                 Peringatan "Enable Macros?" itu bukan pajangan, Bos. Kalo lo dapet file dari internet terus muncul peringatan itu, MENDING CLOSE AJA!
              </div>
            </div>
          </motion.div>

          {/* Interactive Simulation: Inspektur File */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-black/50 border border-gray-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden group"
          >
            <h4 className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-8 flex items-center gap-2">
               <ShieldAlert className="w-4 h-4" /> Inspektur File v2.0
            </h4>
            
            <div className="grid gap-4 mb-8">
               {/* File 1: Safe */}
               <div className="flex items-center justify-between p-4 bg-gray-900/60 rounded-xl border border-gray-800 hover:border-orange-500/30 transition-all group">
                  <div className="flex items-center gap-3">
                     <FileCode className="w-6 h-6 text-emerald-500" />
                     <div className="flex flex-col">
                        <span className="text-xs font-bold text-white">Laporan_Gajian.xlsx</span>
                        <span className="text-[8px] text-gray-500 uppercase tracking-widest font-black">Type: Microsoft Excel Document</span>
                     </div>
                  </div>
                  <button 
                    onClick={() => analyzeFile('xlsx')}
                    disabled={analyzing}
                    className="px-4 py-1.5 bg-gray-800 hover:bg-orange-500 hover:text-black text-[9px] font-black uppercase rounded-full transition-all"
                  >
                     {selectedFile === 'xlsx' && analyzing ? 'SCANNING...' : 'ANALISA'}
                  </button>
               </div>

               {/* File 2: Dangerous */}
               <div className="flex items-center justify-between p-4 bg-gray-900/60 rounded-xl border border-gray-800 hover:border-red-500/30 transition-all group">
                  <div className="flex items-center gap-3">
                     <FileWarning className="w-6 h-6 text-red-500" />
                     <div className="flex flex-col">
                        <span className="text-xs font-bold text-white">Laporan_Gajian.pdf.exe</span>
                        <span className="text-[8px] text-gray-500 uppercase tracking-widest font-black">Type: Adobe PDF Document (Fake)</span>
                     </div>
                  </div>
                  <button 
                    onClick={() => analyzeFile('exe')}
                    disabled={analyzing}
                    className="px-4 py-1.5 bg-gray-800 hover:bg-red-500 hover:text-white text-[9px] font-black uppercase rounded-full transition-all"
                  >
                     {selectedFile === 'exe' && analyzing ? 'SCANNING...' : 'ANALISA'}
                  </button>
               </div>
            </div>

            <AnimatePresence mode="wait">
               {result && (
                 <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                   className={`p-5 rounded-2xl border-2 text-center text-xs font-black uppercase tracking-widest flex flex-col items-center gap-3 ${
                     result === 'malware' ? 'border-red-500 bg-red-500/10 text-red-500' : 'border-emerald-500 bg-emerald-500/10 text-emerald-500'
                   }`}
                 >
                    {result === 'malware' ? (
                       <>
                         <ShieldAlert className="w-8 h-8 animate-bounce" />
                         <span>BAHAYA: Ekstensi ganda disembunyikan! Virus terdeteksi!</span>
                       </>
                    ) : (
                       <>
                         <ShieldCheck className="w-8 h-8" />
                         <span>AMAN: File Spreadsheet Standar. Gak ada eksekusi kode.</span>
                       </>
                    )}
                 </motion.div>
               )}
            </AnimatePresence>

            <div className="mt-8 border-t border-gray-900 pt-4 opacity-30 italic text-[9px]">
               $ system_report: {analyzing ? 'Inspecting_payload...' : 'Waiting_for_input'}
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900/30 p-6 rounded-2xl border border-gray-800">
          <Link 
            to="/academy/stage-1/modul-4/intro"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            « KEMBALI KE INTRO
          </Link>
          
          <Link 
            to="/academy/stage-1/modul-4/excel-target"
            className="flex items-center gap-3 bg-orange-600 hover:bg-white text-black px-8 py-4 rounded-sm font-black transition-all group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
            <span className="relative z-10 flex items-center gap-2 uppercase tracking-tighter">
              LANJUT: EXCEL SEBAGAI TARGET <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BahayaMacro;
