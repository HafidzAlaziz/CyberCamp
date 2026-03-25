import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ShieldAlert, FolderKey, HardDrive, Eye, EyeOff, AlertTriangle, Bug } from 'lucide-react';

const AwsAndS3 = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [scanResult, setScanResult] = useState(null); // null, 'hacked', 'safe'

  const handleScan = () => {
    if (isPublic) {
      setScanResult('hacked');
    } else {
      setScanResult('safe');
    }
  };

  const handleToggle = () => {
    setIsPublic(!isPublic);
    setScanResult(null); // Reset scan result on change
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-orange-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/50">
            <HardDrive className="w-8 h-8 text-orange-400" />
          </div>
          <div>
            <h1 className="text-sm text-orange-400 tracking-[0.3em] uppercase font-black">Stage 5 · Modul 4: Cloud Providers</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              AWS & PETAKA S3 BUCKET
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
              <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-6 leading-tight">
                Lupa Nutup <br/>
                <span className="text-orange-500" style={{ textShadow: '0 0 10px rgba(249, 115, 22, 0.5)' }}>PINTU GUDANG</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Mitos terbesar: Kalau udah pakai AWS, pasti udah super aman dari hacker. BOHONG!
              </p>
            </section>

            <div className="space-y-6 text-sm leading-relaxed text-gray-400">
               <p>
                 Di AWS (Amazon Web Services), ada 2 nama layanan ikonik yang bakal sering banget lo temuin: 
               </p>
               <ul className="space-y-3">
                  <li className="flex gap-3 bg-gray-900 p-4 rounded-lg border border-gray-800">
                    <ServerIcon className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                    <div><strong className="text-white">Amazon EC2:</strong> Virtual Machine alias Server Kosong (IaaS).</div>
                  </li>
                  <li className="flex gap-3 bg-gray-900 p-4 rounded-lg border border-gray-800">
                    <FolderIcon className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <div><strong className="text-white">Amazon S3:</strong> Hardisk atau Folder Raksasa (Bucket) buat nyimpen gambar, video, dan dokumen.</div>
                  </li>
               </ul>
               
               <div className="p-6 bg-red-900/10 border border-red-500/30 rounded-2xl relative overflow-hidden group">
                  <div className="flex items-center gap-3 mb-4">
                     <AlertTriangle className="w-5 h-5 text-red-500" />
                     <p className="text-white font-black italic uppercase tracking-widest text-[10px]">Kesalahan Paling Tolol:</p>
                  </div>
                  <p className="italic text-gray-300 text-xs leading-relaxed font-bold">
                    "Admin IT nyimpen <span className="text-red-400">Scan KTP Customer</span> ratusan ribu file di folder S3 Bucket. TAPI... dia lupa nge-set permission-nya jadi Private dan membiarkannya mode Public Read."
                  </p>
                  <p className="mt-4 text-gray-400 text-xs">
                    Hacker gak perlu susah-susah mikir cari celah rumit. Mereka cuma pake script otomatis buat n-scan S3 seluruh internet, ketemu nama bucket folder lo yang kebuka, trus BAM! Data jutaan orang disedot seketika!
                  </p>
               </div>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12">
            <div className={`p-8 border-2 rounded-xl relative overflow-hidden min-h-[500px] flex flex-col shadow-2xl transition-colors duration-500 ${scanResult === 'hacked' ? 'border-red-500/50 bg-red-950/30' : scanResult === 'safe' ? 'border-emerald-500/50 bg-emerald-950/20' : 'border-orange-500/30 bg-gray-900/50'}`}>
              
              <div className="mb-8 text-center relative z-10 flex flex-col items-center">
                 <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">SIMULASI: BIKIN S3 BUCKET</h2>
                 <p className="text-[9px] text-orange-500 font-bold tracking-[0.2em] mt-1">AWS_S3_MISCONFIGURATION</p>
              </div>

              <div className="flex-1 flex flex-col items-center justify-between py-4 text-center space-y-8 relative z-10 w-full">
                 
                 {/* Bucket Folder View */}
                 <div className="w-full bg-black/50 border border-gray-700 rounded-xl p-6 relative">
                    <div className="absolute top-2 left-4 text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                       Amazon S3 Management
                    </div>
                    
                    <div className="mt-6 flex items-center justify-center gap-4">
                       <FolderKey className="w-16 h-16 text-orange-400" />
                       <div className="text-left">
                          <p className="text-white font-black text-sm">s3-bucket-data-ktp-customer</p>
                          <p className="text-gray-500 text-[10px] mt-1">Total: 450.000 files (24.5 GB)</p>
                       </div>
                    </div>

                    {/* Toggle Switch */}
                    <div className="mt-8 pt-6 border-t border-gray-800 flex items-center justify-between">
                       <div className="flex flex-col text-left">
                          <span className="text-xs font-bold text-white uppercase tracking-widest">Akses Publik Lintas Internet</span>
                          <span className="text-[9px] text-gray-500 mt-1">Mengizinkan siapapun membaca file</span>
                       </div>
                       
                       <button 
                         onClick={handleToggle}
                         className={`w-16 h-8 rounded-full transition-all duration-300 relative ${isPublic ? 'bg-red-500' : 'bg-emerald-500'}`}
                       >
                         <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 flex items-center justify-center shadow-lg ${isPublic ? 'left-[34px]' : 'left-1'}`}>
                            {isPublic ? <Eye className="w-3 h-3 text-red-500"/> : <EyeOff className="w-3 h-3 text-emerald-500"/>}
                         </div>
                       </button>
                    </div>
                 </div>

                 {/* Hacker Action */}
                 <div className="w-full flex gap-4 items-center">
                    <button 
                      onClick={handleScan}
                      className="flex-1 py-4 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-600 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 group"
                    >
                      <Bug className="w-5 h-5 group-hover:-rotate-12 transition-transform text-fuchsia-500" /> Auto-Scan Hacker Script
                    </button>
                 </div>

                 {/* Results Banner */}
                 <div className="h-16 w-full flex items-center justify-center">
                    <AnimatePresence mode="wait">
                       {scanResult === 'hacked' && (
                          <motion.div 
                            key="hacked"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full bg-red-900/50 border border-red-500/50 p-4 rounded-xl flex items-center justify-center gap-3"
                          >
                             <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse" />
                             <p className="text-white text-xs font-bold">DATA JUTAAN ORANG KESEDOT KELUAR! TANGGUNG JAWAB!</p>
                          </motion.div>
                       )}
                       {scanResult === 'safe' && (
                          <motion.div 
                            key="safe"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full bg-emerald-900/40 border border-emerald-500/50 p-4 rounded-xl flex items-center gap-3 justify-center"
                          >
                             <ShieldAlert className="w-5 h-5 text-emerald-400" />
                             <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Access Denied 403. Data Aman! Selalu pastiin S3 lo Private!</p>
                          </motion.div>
                       )}
                    </AnimatePresence>
                 </div>

              </div>
              
              {/* Background overlay FX */}
              <AnimatePresence>
                 {scanResult === 'hacked' && (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-red-900/5 pointer-events-none" />
                 )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link 
            to="/academy/stage-5/modul-4/intro"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « SEBELUMNYA
          </Link>
          
          <Link 
            to="/academy/stage-5/modul-4/azure-gcp"
            className="flex items-center gap-3 bg-cyan-600 hover:bg-cyan-500 text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
          >
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest leading-none uppercase">
              SELANJUTNYA » <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const ServerIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>);
const FolderIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>);

export default AwsAndS3;
