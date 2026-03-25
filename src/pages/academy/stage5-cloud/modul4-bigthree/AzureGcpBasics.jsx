import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ShieldAlert, Key, UploadCloud, FileCode, Bot, Banknote, AlertTriangle } from 'lucide-react';

const AzureGcpBasics = () => {
  const [isUploaded, setIsUploaded] = useState(false);
  const [isHacked, setIsHacked] = useState(false);

  const handleUpload = () => {
    setIsUploaded(true);
    // Bot strikes in 1.5 seconds later
    setTimeout(() => {
      setIsHacked(true);
    }, 1500);
  };

  const handleReset = () => {
    setIsUploaded(false);
    setIsHacked(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-blue-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/50">
            <Key className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-sm text-blue-400 tracking-[0.3em] uppercase font-black">Stage 5 · Modul 4: Cloud Providers</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              AZURE & GCP BASICS
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
                Incaran <br/>
                <span className="text-blue-500" style={{ textShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }}>HACKER KELAS KAKAP</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Kalau di AWS masalah S3, di Azure dan GCP ada ladang ranjau yang beda lagi.
              </p>
            </section>

            <div className="space-y-6 text-sm leading-relaxed text-gray-400">
               <div className="p-5 bg-gray-900 border border-gray-800 rounded-xl">
                 <h3 className="text-blue-400 font-bold mb-2 flex items-center gap-2">Microsoft Azure</h3>
                 <p>
                   Di ekosistem Azure, jantung keamanannya ada di <span className="text-white font-bold">Entra ID</span> (dulu namanya Azure AD). Ini adalah gerbang utama login seluruh karyawan. Kalau hacker bisa jebol 1 akun Admin Entra ID (misal lewat teknik Phishing pura-pura jadi bos), hacker itu bisa bebas nguasai seluruh server perusahaan.
                 </p>
               </div>
               
               <div className="p-5 bg-gray-900 border border-gray-800 rounded-xl">
                 <h3 className="text-green-500 font-bold mb-2 flex items-center gap-2">Google Cloud Platform (GCP)</h3>
                 <p>
                   GCP itu jagonya ngolah big data pakai BigQuery. Di sini, yang sering kejadian adalah kebocoran kredensial robot yang disebut <span className="text-white font-bold">Service Account Keys</span>. Kunci ini bentuknya file teks berisikan akses komplit ke layanan Cloud.
                 </p>
               </div>

               <div className="p-6 bg-red-900/10 border border-red-500/30 rounded-2xl relative overflow-hidden group mt-8">
                  <div className="flex items-center gap-3 mb-4">
                     <ShieldAlert className="w-5 h-5 text-red-500" />
                     <p className="text-white font-black italic uppercase tracking-widest text-[10px]">Konteks Hacker:</p>
                  </div>
                  <p className="italic text-gray-300 text-xs leading-relaxed font-bold">
                    "Kesalahan paling fatal programmer pemula: Gak sengaja naruh Service Account/API Key rahasia di dalam script kodingan, terus di-upload terbuka ke <span className="text-red-400">GitHub Public</span>."
                  </p>
                  <p className="mt-4 text-gray-400 text-xs">
                    Bot hacker di seluruh dunia n-scan halaman GitHub detik demi detik. Sekali nemu API Key Cloud lo... mereka pakai akun cloud lo buat nambang Crypto (Mining Bitcoin) pake super komputer lo!
                  </p>
               </div>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12">
            <div className={`p-8 border-2 rounded-xl relative overflow-hidden min-h-[500px] flex flex-col shadow-2xl transition-colors duration-500 ${isHacked ? 'border-red-500/50 bg-red-950/30' : 'border-blue-500/30 bg-gray-900/50'}`}>
              
              <div className="mb-6 text-center relative z-10 flex flex-col items-center">
                 <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">SIMULASI: GITHUB KEY LEAK</h2>
                 <p className="text-[9px] text-blue-500 font-bold tracking-[0.2em] mt-1">CREDENTIAL_EXPOSURE_DEMO</p>
              </div>

              <div className="flex-1 flex flex-col items-center justify-between py-2 space-y-4 relative z-10 w-full">
                 
                 {/* IDK Dev Screen Workspace */}
                 <div className="w-full bg-[#0d1117] border border-gray-700 rounded-xl p-4 shadow-xl">
                    <div className="flex items-center gap-2 mb-3 border-b border-gray-800 pb-2">
                       <FileCode className="w-4 h-4 text-gray-500" />
                       <span className="text-xs font-bold text-gray-400">config.py</span>
                    </div>
                    
                    <pre className="text-[10px] sm:text-xs font-mono text-left overflow-x-auto text-gray-300">
                      <code>
                        <span className="text-purple-400">import</span> google.cloud <br/>
                        <span className="text-purple-400">import</span> os <br/><br/>
                        <span className="text-gray-500"># WARNING: Jangan commit file ini ke public!</span> <br/>
                        <span className="text-blue-300">GCP_SERVICE_ACCOUNT_KEY</span> = <span className={`font-bold transition-colors duration-300 ${isHacked ? 'text-red-500 bg-red-900/30' : 'text-green-300'}`}>"AIzaSyB-8xyz9_SUPER_SECRET_KEY_12345"</span> <br/><br/>
                        <span className="text-blue-300">client</span> = google.cloud.init(api_key=<span className="text-blue-300">GCP_SERVICE_ACCOUNT_KEY</span>) <br/>
                        <span className="text-cyan-400">print</span>(<span className="text-green-300">"Bot is connecting to Cloud..."</span>)
                      </code>
                    </pre>

                    <div className="mt-4 pt-4 border-t border-gray-800">
                       {!isUploaded && !isHacked ? (
                         <button 
                           onClick={handleUpload}
                           className="w-full py-3 bg-[#238636] hover:bg-[#2ea043] text-white font-bold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all"
                         >
                           <UploadCloud className="w-4 h-4" /> Git Push (Ke GitHub Public)
                         </button>
                       ) : isUploaded && !isHacked ? (
                         <div className="w-full py-3 bg-gray-800 text-gray-500 font-bold text-xs flex justify-center uppercase tracking-widest rounded-lg animate-pulse border border-gray-700">
                            Uploading to Public Repo...
                         </div>
                       ) : (
                         <button 
                           onClick={handleReset}
                           className="w-full py-3 bg-red-900/50 hover:bg-red-900/80 text-red-500 font-bold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 border border-red-500/50 transition-all"
                         >
                           Reset Simulasi
                         </button>
                       )}
                    </div>
                 </div>

                 {/* Results Banner representing the internet */}
                 <div className="h-32 w-full flex items-center justify-center relative">
                    <AnimatePresence mode="wait">
                       {(!isUploaded && !isHacked) && (
                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-gray-600 text-[10px] uppercase font-bold tracking-widest">
                            {/* Empty state */}
                         </motion.div>
                       )}

                       {isUploaded && !isHacked && (
                         <motion.div 
                           initial={{ opacity: 0, scale: 0.8 }}
                           animate={{ opacity: 1, scale: 1 }}
                           exit={{ opacity: 0 }}
                           className="flex flex-col items-center gap-2 text-cyan-400"
                         >
                           <Bot className="w-8 h-8 animate-bounce" />
                           <p className="text-[10px] font-bold uppercase tracking-widest">Internet Scanning Bots Incoming...</p>
                         </motion.div>
                       )}

                       {isHacked && (
                         <motion.div 
                           initial={{ opacity: 0, scale: 1.5 }}
                           animate={{ opacity: 1, scale: 1 }}
                           className="w-full h-full bg-red-900/60 border-2 border-red-500 p-4 rounded-xl flex flex-col items-center justify-center gap-2 shadow-[0_0_30px_rgba(239,68,68,0.5)] z-20"
                         >
                            <AlertTriangle className="w-8 h-8 text-red-500 animate-pulse" />
                            <p className="text-white text-[10px] text-center font-bold font-sans uppercase tracking-widest">Bot Hacker nemu API Key lo di Github!</p>
                            <div className="flex items-center gap-1 justify-center bg-black/50 px-3 py-1 mt-1 rounded text-red-400 font-bold border border-red-500/30">
                              <Banknote className="w-3 h-3"/>
                              <span className="text-xs">Tagihan Cloud Tembus Rp 1 Miliar/malam!</span>
                            </div>
                         </motion.div>
                       )}
                    </AnimatePresence>
                 </div>

              </div>
              
              {/* Filter */}
              {isHacked && (
                 <div className="absolute inset-0 bg-red-900/10 pointer-events-none rounded-xl" />
              )}
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link 
            to="/academy/stage-5/modul-4/aws-s3"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « SEBELUMNYA
          </Link>
          
          <Link 
            to="/academy/stage-5/modul-4/kesimpulan"
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

export default AzureGcpBasics;
