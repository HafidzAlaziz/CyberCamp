import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ShieldAlert, Cpu, FileJson, FileBadge2, Send, AlertTriangle, MonitorX, CheckCircle2, Zap } from 'lucide-react';

const GoSpeedDemon = () => {
  const [activeTab, setActiveTab] = useState('python'); // 'python' or 'go'
  const [deliveryState, setDeliveryState] = useState('idle'); // 'idle', 'sending', 'failed', 'compiled', 'success'

  const handleSend = () => {
    if (activeTab === 'python') {
      setDeliveryState('sending');
      setTimeout(() => setDeliveryState('failed'), 1500);
    } else {
      setDeliveryState('compiled');
      setTimeout(() => setDeliveryState('sending'), 1000);
      setTimeout(() => setDeliveryState('success'), 2500);
    }
  };

  const resetState = () => setDeliveryState('idle');

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-cyan-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/50">
            <Cpu className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 6 · Modul 1: Programming</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              GO: SI GERGAJI MESIN
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
                Kuda Hitam <br/>
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }}>PEMBUAT VIRUS</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Go (Golang) sekarang jadi favorit utama pembuat Malware & Ransomware modern. Kenapa?
              </p>
            </section>

            <div className="space-y-6 text-sm leading-relaxed text-gray-400">
               <ul className="space-y-4">
                  <li className="p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-cyan-500/30 transition-colors">
                     <span className="text-cyan-400 font-black uppercase tracking-widest textxs mb-1 block">1. Tinggal Eksekusi (COMPILED)</span>
                     Kodingan Go di-Compile jadi satu file utuh (kayak <span className="text-white bg-black px-1 py-0.5 rounded">.exe</span>). Lo kirim ke komputer korban, korban klik, langsung jalan! Gak peduli korban punya Python atau aplikasi lain di komputernya.
                  </li>
                  <li className="p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-cyan-500/30 transition-colors">
                     <span className="text-cyan-400 font-black uppercase tracking-widest text-xs mb-1 block">2. Cepat & Ringan (GOROUTINES)</span>
                     Go punya fitur Goroutines, yang bikin dia bisa ngerjain ribuan tugas barengan tanpa bikin komputer lemot. Cocok buat nge-scan ribuan IP dan nge-enkripsi data dengan super kilat.
                  </li>
               </ul>

               <div className="p-6 bg-cyan-900/10 border-l-4 border-cyan-500 space-y-2 rounded-r-xl shadow-lg mt-8">
                  <div className="flex items-center gap-3 mb-2">
                     <ShieldAlert className="w-5 h-5 text-cyan-400" />
                     <p className="text-white font-black italic uppercase tracking-widest text-[10px]">Konteks Hacker:</p>
                  </div>
                  <p className="italic text-gray-300 text-xs leading-relaxed font-bold">
                    "Ini alasan Ransomware jaman now banyak pake Go. Tinggal kirim <span className="text-cyan-300">satu file .exe utuh via email phising</span>, target gak butuh persiapan apa-apa, langsung meledak!"
                  </p>
               </div>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12">
            <div className={`p-8 border-2 rounded-xl relative overflow-hidden flex flex-col shadow-2xl transition-colors duration-500 ${deliveryState === 'failed' ? 'border-red-500/50 bg-red-950/30' : deliveryState === 'success' ? 'border-cyan-500/50 bg-cyan-950/30' : 'border-cyan-500/30 bg-gray-900/50'}`}>
              
              <div className="mb-6 text-center relative z-10 flex flex-col items-center">
                 <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">SIMULASI: MALWARE DELIVERY</h2>
                 <p className="text-[9px] text-cyan-500 font-bold tracking-[0.2em] mt-1">PAYLOAD_EXECUTION_TEST</p>
              </div>

              <div className="flex-1 flex flex-col space-y-4 relative z-10 w-full">
                 
                 {/* Tabs */}
                 <div className="flex rounded-lg overflow-hidden border border-gray-700 w-full">
                    <button 
                      onClick={() => { setActiveTab('python'); resetState(); }}
                      className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'python' ? 'bg-green-600/20 text-green-400 border-b-2 border-green-500' : 'bg-black/50 text-gray-500 hover:bg-gray-800'}`}
                    >
                      Script Python
                    </button>
                    <button 
                      onClick={() => { setActiveTab('go'); resetState(); }}
                      className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'go' ? 'bg-cyan-600/20 text-cyan-400 border-b-2 border-cyan-500' : 'bg-black/50 text-gray-500 hover:bg-gray-800'}`}
                    >
                      Program Go
                    </button>
                 </div>

                 {/* Action Area */}
                 <div className="w-full bg-[#0d1117] border border-gray-700 rounded-xl p-6 min-h-[220px] flex flex-col items-center justify-center text-center shadow-xl relative overflow-hidden">
                    
                    {deliveryState === 'idle' && (
                       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4">
                          {activeTab === 'python' ? (
                             <FileJson className="w-16 h-16 text-green-500" />
                          ) : (
                             <FileBadge2 className="w-16 h-16 text-cyan-500" />
                          )}
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                             Payload: {activeTab === 'python' ? 'virus_stealer.py' : 'virus_stealer.go'}
                          </p>
                          <button 
                            onClick={handleSend}
                            className={`px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all ${activeTab === 'python' ? 'bg-green-600 hover:bg-green-500 text-white' : 'bg-cyan-600 hover:bg-cyan-500 text-white'}`}
                          >
                            <Send className="w-4 h-4" /> Kirim Ke Korban
                          </button>
                       </motion.div>
                    )}

                    {deliveryState === 'compiled' && (
                       <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-3">
                          <Zap className="w-12 h-12 text-yellow-400 animate-pulse" />
                          <p className="text-xs text-yellow-400 font-bold uppercase tracking-widest">Meng-compile ke .exe...</p>
                       </motion.div>
                    )}

                    {deliveryState === 'sending' && (
                       <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-3">
                          <Send className="w-12 h-12 text-gray-500 animate-bounce" />
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Mengirim Payload via Email...</p>
                       </motion.div>
                    )}

                    {deliveryState === 'failed' && (
                       <motion.div initial={{ opacity: 0, scale: 1.2 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-3">
                          <MonitorX className="w-16 h-16 text-red-500" />
                          <p className="text-xs text-red-400 font-bold px-4">
                             GAGAL! Komputer korban ngeklik virus_stealer.py, tapi tidak terjadi apa-apa karena korban tidak punga Python ter-install!
                          </p>
                          <button onClick={resetState} className="mt-2 text-[10px] text-gray-500 underline uppercase">Coba Lagi</button>
                       </motion.div>
                    )}

                    {deliveryState === 'success' && (
                       <motion.div initial={{ opacity: 0, scale: 1.2 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-3">
                          <CheckCircle2 className="w-16 h-16 text-cyan-400" />
                          <p className="text-xs text-cyan-300 font-black uppercase tracking-widest drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] px-4">
                             BERHASIL JALAN! VIRUS.EXE TER-EKSEKUSI. DATA TER-ENKRIPSI!
                          </p>
                          <button onClick={resetState} className="mt-2 text-[10px] text-gray-500 underline uppercase">Ulangi Simulasi</button>
                       </motion.div>
                    )}

                 </div>

              </div>
              
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link 
            to="/academy/stage-6/modul-1/python-swiss"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « SEBELUMNYA
          </Link>
          
          <Link 
            to="/academy/stage-6/modul-1/kesimpulan"
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

export default GoSpeedDemon;
