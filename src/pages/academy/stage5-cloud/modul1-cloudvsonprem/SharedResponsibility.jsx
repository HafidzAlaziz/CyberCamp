import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ShieldAlert, CheckCircle2, XCircle, User, Cloud, Gavel } from 'lucide-react';

const SharedResponsibility = () => {
  const scenarios = [
    { id: 1, text: "Hardisk di server meledak karena korslet.", answer: "provider" },
    { id: 2, text: "Hacker masuk karena password akun admin cuma 12345.", answer: "user" },
    { id: 3, text: "Gedung data center AWS kena gempa.", answer: "provider" }
  ];
  
  const [currentScenario, setCurrentScenario] = useState(0);
  const [feedback, setFeedback] = useState(null); // { isCorrect: boolean, text: string }

  const handleAnswer = (choice) => {
    if (feedback && feedback.isCorrect && currentScenario === scenarios.length - 1) return; // Prevent clicking when done
    if (feedback) return; // Wait for timeout

    const isCorrect = choice === scenarios[currentScenario].answer;
    
    if (isCorrect) {
      setFeedback({ 
        isCorrect: true, 
        text: `Bener banget! Ini tanggung jawab ${choice === 'provider' ? 'Provider Cloud' : 'User'}.` 
      });
      
      setTimeout(() => {
        if (currentScenario < scenarios.length - 1) {
          setCurrentScenario(curr => curr + 1);
          setFeedback(null);
        } else {
          setFeedback({ isCorrect: true, text: "Lulus! Lo udah paham konsep Shared Responsibility." });
        }
      }, 2000);
    } else {
      setFeedback({ 
        isCorrect: false, 
        text: "Tettot! Salah. Coba baca lagi konsepnya." 
      });
      setTimeout(() => {
        setFeedback(null);
      }, 2000);
    }
  };

  const resetGame = () => {
    setCurrentScenario(0);
    setFeedback(null);
  };

  const isDone = feedback && feedback.isCorrect && currentScenario === scenarios.length - 1;

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
            <Gavel className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 5: Cloud Security</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              Shared Responsibility
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
                Model Tanggung Jawab <br/>
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }}>BERBAGI (SHARED)</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Ini adalah konsep <span className="text-white font-bold underline decoration-cyan-500 underline-offset-4">PALING PENTING</span> di Cloud Security. Di cloud, tanggung jawab itu dibagi dua!
              </p>
            </section>

            <div className="space-y-6 text-sm leading-relaxed text-gray-400">
               <div className="p-5 bg-gray-900 border-l-4 border-blue-500">
                 <h3 className="text-lg font-black text-blue-400 mb-2 uppercase">1. Security <span className="underline">OF</span> the Cloud (Tugas Provider)</h3>
                 <p>
                   Cloud Provider (seperti AWS atau GCP) bertanggung jawab mengamankan infrastruktur dasar. Contoh: keamanan gedung fisik data center, satpam jaga pintu, ketersediaan listrik, dan hardware server.
                 </p>
               </div>
               
               <div className="p-5 bg-gray-900 border-l-4 border-cyan-500">
                 <h3 className="text-lg font-black text-cyan-400 mb-2 uppercase">2. Security <span className="underline">IN</span> the Cloud (Tugas Lo / User)</h3>
                 <p>
                   Lo sebagai penyewa bertanggung jawab mengamankan apa yang lo taruh di dalamnya! Contoh: Jaga kerahasiaan password, enkripsi data, mengatur siapa saja yang boleh nge-akses folder rahasia lo.
                 </p>
               </div>

               <div className="p-4 bg-red-900/10 border border-red-500/30 rounded-xl relative overflow-hidden group">
                  <p className="italic text-gray-300 text-xs leading-relaxed font-bold">
                    *Kalau data perusahaan bocor gara-gara password adminnya dibikin "admin123", lo nggak bakal bisa nuntut nyalahin AWS atau Google! Itu murni salah lo!*
                  </p>
               </div>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12">
            <div className="p-8 border-2 border-cyan-500/30 rounded-xl bg-gray-900/50 relative overflow-hidden min-h-[500px] flex flex-col shadow-2xl transition-colors duration-500">
              
              <div className="mb-8 text-center relative z-10">
                 <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">MINI GAME: SIAPA YANG SALAH?</h2>
                 <p className="text-[9px] text-cyan-500 font-bold tracking-[0.2em] mt-1">INCIDENT_BLAME_MATRIX</p>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-8 relative z-10">
                 
                 <AnimatePresence mode="wait">
                    {!isDone ? (
                      <motion.div 
                        key={`scenario-${currentScenario}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8 w-full"
                      >
                         <div className="flex gap-2 justify-center mb-4">
                            {scenarios.map((_, idx) => (
                               <div key={idx} className={`h-1.5 rounded-full w-8 ${idx === currentScenario ? 'bg-cyan-500' : idx < currentScenario ? 'bg-emerald-500' : 'bg-gray-700'}`} />
                            ))}
                         </div>

                         <div className="p-6 bg-black/40 border border-gray-600 rounded-xl min-h-[120px] flex items-center justify-center">
                            <h3 className="text-lg font-bold text-white italic leading-relaxed">
                               "{scenarios[currentScenario].text}"
                            </h3>
                         </div>

                         {feedback && (
                           <motion.div 
                             initial={{ opacity: 0, y: -10 }}
                             animate={{ opacity: 1, y: 0 }}
                             className={`p-3 rounded-lg flex items-center justify-center gap-2 border font-bold text-sm ${feedback.isCorrect ? 'bg-emerald-900/40 text-emerald-400 border-emerald-500/50' : 'bg-red-900/40 text-red-400 border-red-500/50'}`}
                           >
                             {feedback.isCorrect ? <CheckCircle2 className="w-5 h-5"/> : <XCircle className="w-5 h-5"/>}
                             {feedback.text}
                           </motion.div>
                         )}

                         <div className="grid grid-cols-2 gap-4">
                            <button 
                              onClick={() => handleAnswer('provider')}
                              disabled={feedback !== null}
                              className="p-4 flex flex-col items-center gap-2 bg-gray-800/80 hover:bg-cyan-900/40 border border-gray-700 hover:border-cyan-500/50 rounded-xl transition-all disabled:opacity-50"
                            >
                               <Cloud className="w-8 h-8 text-blue-400" />
                               <span className="font-bold text-[10px] uppercase tracking-widest text-gray-300">Salah Provider</span>
                            </button>
                            <button 
                              onClick={() => handleAnswer('user')}
                              disabled={feedback !== null}
                              className="p-4 flex flex-col items-center gap-2 bg-gray-800/80 hover:bg-cyan-900/40 border border-gray-700 hover:border-cyan-500/50 rounded-xl transition-all disabled:opacity-50"
                            >
                               <User className="w-8 h-8 text-fuchsia-400" />
                               <span className="font-bold text-[10px] uppercase tracking-widest text-gray-300">Salah Gue (User)</span>
                            </button>
                         </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="done"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-6 flex flex-col items-center"
                      >
                         <ShieldAlert className="w-24 h-24 text-cyan-400" />
                         <p className="text-emerald-400 font-black text-2xl italic tracking-tighter uppercase">LULUS!</p>
                         <p className="text-gray-400 font-bold text-xs">Lo udah paham konsep Shared Responsibility.</p>
                         <button 
                           onClick={resetGame}
                           className="mt-4 text-[10px] text-gray-500 underline underline-offset-4 hover:text-white transition-all uppercase font-black"
                         >
                            Main Lagi
                         </button>
                      </motion.div>
                    )}
                 </AnimatePresence>

              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link 
            to="/academy/stage-5/modul-1/security-dilemma"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « SEBELUMNYA
          </Link>
          
          <Link 
            to="/academy/stage-5/modul-1/kesimpulan"
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

export default SharedResponsibility;
