import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ShieldAlert, TerminalSquare, MousePointerClick, FolderPlus, Terminal, Zap, CheckCircle2 } from 'lucide-react';

const IntroScripting = () => {
  const [activeTab, setActiveTab] = useState('gui'); // 'gui' or 'cli'
  const [folderCount, setFolderCount] = useState(0);
  const [cliExecuted, setCliExecuted] = useState(false);

  const handleManualClick = () => {
    if (folderCount < 100) setFolderCount(prev => prev + 1);
  };

  const handleCliExecute = () => {
    setCliExecuted(true);
    setFolderCount(100);
  };

  const resetSim = () => {
    setFolderCount(0);
    setCliExecuted(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-green-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/50">
            <TerminalSquare className="w-8 h-8 text-green-400" />
          </div>
          <div>
            <h1 className="text-sm text-green-400 tracking-[0.3em] uppercase font-black">Stage 6 · Modul 3: Bash & PowerShell Scripting</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              INTRO SCRIPTING
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
                Dewa <br/>
                <span className="text-green-500" style={{ textShadow: '0 0 10px rgba(34, 197, 94, 0.5)' }}>OTOMATISASI</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Apa itu Scripting? Intinya adalah <span className="text-white font-bold underline decoration-green-500 underline-offset-4">Automation (Otomatisasi)</span>.
              </p>
            </section>

            <div className="space-y-6 text-sm leading-relaxed text-gray-400">
               <p>
                 Hacker sejati gak mau buang waktu ngeklik tombol "Login" 1.000 kali buat nebak password (Brute-force). Mereka nulis beberapa baris kode (Script) di Terminal, terus ditinggal tidur. Pas bangun, password udah dapet!
               </p>
               
               <p className="font-bold text-gray-300">Pesen Makan vs Nyuruh Koki:</p>
               <ul className="space-y-4">
                  <li className="p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-blue-500/30 transition-colors">
                     <span className="text-blue-400 font-black uppercase tracking-widest textxs mb-1 flex items-center gap-2">
                        <MousePointerClick className="w-4 h-4" /> GUI (Graphical User Interface)
                     </span>
                     GUI itu kayak lo pesen makan lewat pelayan (klik-klik mouse). Pelayan bakal nyatet satu-satu pesenan lo. Kalo lo nyuruh pelayan melayani 1.000 pesanan, bakal lama banget.
                  </li>
                  <li className="p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-green-500/30 transition-colors">
                     <span className="text-green-400 font-black uppercase tracking-widest text-xs mb-1 flex items-center gap-2">
                        <Terminal className="w-4 h-4" /> CLI (Command Line Interface)
                     </span>
                     CLI/Scripting itu lo nerobos masuk ke dapur belakang, ambil megafon, dan langsung teriak nyuruh koki masak 1000 porsi otomatis pakai mesin! Cepet, kilat, dan langsung ke inti!
                  </li>
               </ul>

               <div className="p-6 bg-green-900/10 border-l-4 border-green-500 space-y-2 rounded-r-xl shadow-lg mt-8">
                  <div className="flex items-center gap-3 mb-2">
                     <ShieldAlert className="w-5 h-5 text-green-400" />
                     <p className="text-white font-black italic uppercase tracking-widest text-[10px]">Konteks Hacker:</p>
                  </div>
                  <p className="italic text-gray-300 text-xs leading-relaxed font-bold">
                    "Lo bakal belajar dua raja terminal hari ini: <span className="text-green-400">Bash</span> (buat nyerang dari Linux) dan <span className="text-blue-400">PowerShell</span> (buat ngobok-ngobok sistem operasi Windows dari dalem)."
                  </p>
               </div>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12">
            <div className="p-8 border-2 border-green-500/30 bg-gray-900/50 rounded-xl relative overflow-hidden flex flex-col shadow-2xl">
              
              <div className="mb-6 text-center relative z-10 flex flex-col items-center">
                 <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">SIMULASI: GUI VS CLI</h2>
                 <p className="text-[9px] text-green-500 font-bold tracking-[0.2em] mt-1">AUTOMATION_SPEED_TEST</p>
              </div>

              <div className="flex-1 flex flex-col space-y-4 relative z-10 w-full min-h-[350px]">
                 
                 {/* Tabs */}
                 <div className="flex rounded-lg overflow-hidden border border-gray-700 w-full">
                    <button 
                      onClick={() => { setActiveTab('gui'); resetSim(); }}
                      className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'gui' ? 'bg-blue-600/20 text-blue-400 border-b-2 border-blue-500' : 'bg-black/50 text-gray-500 hover:bg-gray-800'}`}
                    >
                      Tab GUI (Manual)
                    </button>
                    <button 
                      onClick={() => { setActiveTab('cli'); resetSim(); }}
                      className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'cli' ? 'bg-green-600/20 text-green-400 border-b-2 border-green-500' : 'bg-black/50 text-gray-500 hover:bg-gray-800'}`}
                    >
                      Tab CLI (Script)
                    </button>
                 </div>

                 {/* Action Area */}
                 <div className="w-full bg-[#0d1117] border border-gray-700 rounded-xl p-6 flex flex-col shadow-xl relative overflow-hidden flex-1">
                    
                    {activeTab === 'gui' && (
                       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full">
                          <div className="flex justify-between items-center mb-4">
                             <p className="text-xs text-gray-400 font-bold uppercase">Misi: Bikin 100 Folder</p>
                             <div className="px-3 py-1 bg-gray-800 rounded text-blue-400 font-mono text-sm font-bold">
                               {folderCount}/100
                             </div>
                          </div>
                          
                          <div className="flex-1 border-2 border-dashed border-gray-700 rounded-xl p-4 flex flex-wrap gap-2 content-start overflow-y-auto max-h-[160px]">
                             {Array.from({ length: folderCount }).map((_, i) => (
                               <FolderPlus key={i} className="w-6 h-6 text-blue-500" />
                             ))}
                             {folderCount === 0 && <p className="text-xs w-full text-center text-gray-600 italic mt-8">Kosong</p>}
                          </div>

                          <button 
                            onClick={handleManualClick}
                            disabled={folderCount >= 100}
                            className={`mt-6 w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${folderCount >= 100 ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
                          >
                            <MousePointerClick className="w-4 h-4" /> Klik New Folder ({folderCount})
                          </button>
                          {folderCount > 0 && folderCount < 100 && (
                            <p className="text-center text-[10px] text-gray-500 mt-3 italic">Pasti pegel kan ngeklik 100 kali?</p>
                          )}
                       </motion.div>
                    )}

                    {activeTab === 'cli' && (
                       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full">
                          <div className="flex justify-between items-center mb-4">
                             <p className="text-xs text-gray-400 font-bold uppercase">Misi: Bikin 100 Folder</p>
                             <div className="px-3 py-1 bg-gray-800 rounded text-green-400 font-mono text-sm font-bold">
                               {folderCount}/100
                             </div>
                          </div>
                          
                          <div className="bg-black border border-gray-800 rounded-xl p-4 font-mono text-xs text-green-400 mb-4 h-[80px]">
                             {!cliExecuted ? (
                               <div className="flex items-center gap-2">
                                  <span>root@cybercamp:~$</span>
                                  <span className="typing-effect border-r-2 border-green-500 pr-1 truncate">for i in {'{1..100}'}; do mkdir folder_$i; done</span>
                               </div>
                             ) : (
                               <div className="space-y-1">
                                  <p className="opacity-50">root@cybercamp:~$ for i in {'{1..100}'}; do mkdir folder_$i; done</p>
                                  <p className="text-green-300">Execution time: 0.12s.</p>
                               </div>
                             )}
                          </div>

                          {cliExecuted && (
                             <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center p-2">
                                <Zap className="w-12 h-12 text-yellow-400 animate-pulse mb-3" />
                                <p className="text-xs text-green-300 font-black uppercase tracking-widest text-center shadow-[0_0_10px_rgba(74,222,128,0.2)]">
                                   BOOM! 100 FOLDER TERCIPTA SECARA BERSAMAAN DALAM 0.1 DETIK!
                                </p>
                                <p className="text-[10px] text-gray-400 mt-2 font-bold italic text-center">Itulah kekuatan Scripting!</p>
                             </motion.div>
                          )}

                          {!cliExecuted && (
                            <button 
                              onClick={handleCliExecute}
                              className="mt-auto w-full py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(22,163,74,0.4)]"
                            >
                              <Terminal className="w-4 h-4" /> [ENTER] Eksekusi Script
                            </button>
                          )}
                       </motion.div>
                    )}

                 </div>

              </div>
              
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-green-500 shadow-2xl">
          <Link 
            to="/academy"
            state={{ expandedId: 'programming-skills' }}
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « KEMBALI KE HQ
          </Link>
          
          <Link 
            to="/academy/stage-6/modul-3/bash-linux"
            className="flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
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

export default IntroScripting;
