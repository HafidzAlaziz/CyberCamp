import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code2, ShieldAlert, ShieldCheck, ChevronRight, ChevronLeft, Send, MessageSquare, AlertTriangle, User, Ghost } from 'lucide-react';

const CrossSiteScripting = () => {
  const [comments, setComments] = useState([
    { user: 'Budi_Gamer', text: 'Halo guys, info mabar dong!', isNative: true },
    { user: 'Siti_99', text: 'Keren nih modulnya!', isNative: true }
  ]);
  const [newComment, setNewComment] = useState('');
  const [isHacked, setIsHacked] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // Check for XSS pattern
    const isXss = newComment.toLowerCase().includes('<script>') && newComment.toLowerCase().includes('alert');

    if (isXss) {
      setIsHacked(true);
      setShowExplanation(true);
    } else {
      setComments([...comments, { user: 'Gue', text: newComment, isNative: false }]);
      setNewComment('');
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
            <Code2 className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 4: Security Skills</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
               MODUL 3: Cross-Site Scripting (XSS)
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
                Mantra di <br/>
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }}>MADING (XSS)</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Kalau SQLi nyerang Database, <span className="text-white font-bold underline decoration-cyan-500 underline-offset-4 font-mono">XSS</span> itu nyerang sesama <span className="text-white">PENGUNJUNG WEB</span>. 
              </p>
            </section>

            <div className="space-y-6 text-sm leading-relaxed">
              <p>
                Hacker nulis komentar di forum, tapi isinya bukan teks biasa, melainkan <span className="text-cyan-400 italic font-bold tracking-tight">script code (JavaScript)</span>. 
              </p>
              
              <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl relative overflow-hidden group">
                 <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Ghost className="w-24 h-24" />
                 </div>
                 <p className="text-cyan-400 font-black italic uppercase tracking-widest text-[10px] mb-4">Cara Kerjanya:</p>
                 <ul className="space-y-4 text-xs italic text-gray-400">
                    <li className="flex gap-2">
                       <span className="text-white font-black">1.</span>
                       <span>Hacker nempel "mantra hipnotis" (Script) di mading sekolah (Web).</span>
                    </li>
                    <li className="flex gap-2">
                       <span className="text-white font-black">2.</span>
                       <span>Pas lo (korban) baca mading itu, lo otomatis terhipnotis.</span>
                    </li>
                    <li className="flex gap-2">
                       <span className="text-white font-black">3.</span>
                       <span>Mantra itu nyuruh lo diem-diem ngasih gelang VIP (Cookie) lo ke hacker.</span>
                    </li>
                 </ul>
              </div>

              <p>
                Script jahat ini jalan di browser lo, bukan di server. Makanya ini disebut "Cross-Site".
              </p>
            </div>

            <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-6 space-y-2 rounded-r-xl">
               <div className="flex items-center gap-2 text-emerald-500 mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Integrity is Key</span>
               </div>
               <p className="text-[11px] text-gray-400 italic leading-relaxed">
                 Developer harus selalu "bersihin" inputan (Sanitasi) biar tanda <span className="text-white">&lt;</span> dan <span className="text-white">&gt;</span> gak dibaca sebagai perintah, tapi cuma teks biasa.
               </p>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12">
            <div className="p-8 bg-gray-900 border-2 border-cyan-500/30 rounded-3xl relative overflow-hidden min-h-[550px] flex flex-col shadow-2xl">
              
              <div className="mb-6">
                 <h2 className="text-xl font-black text-white italic flex items-center gap-2 uppercase tracking-tighter">
                   <MessageSquare className="w-6 h-6 text-cyan-500" /> FORUM KOMUNITAS
                 </h2>
                 <p className="text-[9px] text-gray-500 font-bold tracking-[0.2em] mt-1">DISC_SESSION_03: CYBER_TALK</p>
              </div>

              {/* Chat Display Area */}
              <div className="flex-1 bg-black/40 border border-gray-800 rounded-xl p-4 mb-6 overflow-y-auto space-y-4 min-h-[250px] max-h-[300px] scrollbar-thin scrollbar-thumb-gray-800">
                 {comments.map((c, idx) => (
                   <motion.div 
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     key={idx} 
                     className="flex gap-3"
                   >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${c.isNative ? 'bg-gray-800 border-gray-700' : 'bg-cyan-500/20 border-cyan-500/50'}`}>
                         <User className={`w-4 h-4 ${c.isNative ? 'text-gray-500' : 'text-cyan-400'}`} />
                      </div>
                      <div className="space-y-1">
                         <span className="text-[10px] font-black text-gray-600 uppercase">{c.user}</span>
                         <p className="text-xs text-gray-300 bg-gray-800/30 p-2 rounded-lg border border-gray-800/50">
                            {c.text}
                         </p>
                      </div>
                   </motion.div>
                 ))}
              </div>

              {/* Comment Input */}
              <form onSubmit={handleSubmit} className="space-y-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-cyan-500/60 uppercase tracking-widest px-1">Tambah Komentar:</label>
                    <div className="relative">
                       <input 
                         type="text" 
                         value={newComment}
                         onChange={(e) => setNewComment(e.target.value)}
                         className="w-full bg-gray-950 border border-gray-800 p-4 pr-12 rounded-xl text-xs text-white focus:border-cyan-500 outline-none transition-all placeholder:text-gray-800 font-mono"
                         placeholder="Tulis mantra lo di sini..."
                         autoComplete="off"
                       />
                       <button 
                         type="submit"
                         className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-cyan-600 hover:bg-white text-white hover:text-black rounded-lg transition-all"
                       >
                          <Send className="w-4 h-4" />
                       </button>
                    </div>
                 </div>
                 
                 <div className="p-3 bg-cyan-500/5 border border-cyan-500/10 rounded-lg">
                    <p className="text-[10px] text-gray-500 font-black flex items-center gap-2 italic uppercase">
                       <AlertTriangle className="w-3 h-3 text-amber-500" /> Coba ketik ini: 
                    </p>
                    <code className="text-[11px] text-cyan-400 block mt-1 select-all bg-black/40 p-1 rounded font-mono break-all leading-tight">
                       &lt;script&gt;alert("HACKED!")&lt;/script&gt;
                    </code>
                 </div>
              </form>

              {/* Fake Alert Simulation */}
              <AnimatePresence>
                {isHacked && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
                  >
                     <motion.div 
                       initial={{ scale: 0.9, y: 20 }}
                       animate={{ scale: 1, y: 0 }}
                       className="bg-white rounded-lg shadow-2xl w-full max-w-[280px] overflow-hidden"
                     >
                        <div className="p-4 bg-gray-100 flex justify-between items-center border-b border-gray-200">
                           <span className="text-xs font-sans font-bold text-gray-500 uppercase tracking-tighter">localhost:5173 says</span>
                        </div>
                        <div className="p-8 text-center">
                           <h3 className="text-xl font-sans font-bold text-gray-900 mb-6">HACKED!</h3>
                           <button 
                             onClick={() => setIsHacked(false)}
                             className="px-6 py-2 bg-blue-600 text-white rounded font-sans font-bold text-sm hover:bg-blue-700 transition-colors"
                           >
                              OK
                           </button>
                        </div>
                     </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Post-Hack Explanation */}
              <AnimatePresence>
                {showExplanation && !isHacked && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
                  >
                     <div className="flex items-center gap-2 text-red-500 mb-2">
                        <ShieldAlert className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase">BOOM! It's XSS!</span>
                     </div>
                     <p className="text-[11px] text-gray-400 italic leading-relaxed">
                        Bayangin kalau script itu isinya bukan cuma nampilin popup alert, tapi diem-diem **NYOLONG PASSWORD** atau cookie lo terus dikirim ke server hacker. Itulah ngerinya XSS!
                     </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link 
            to="/academy/stage-4/modul-3/sql-injection"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « KEMBALI KE SQLi
          </Link>
          
          <Link 
            to="/academy/stage-4/modul-3/kesimpulan"
            className="flex items-center gap-3 bg-cyan-600 hover:bg-white text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
          >
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest leading-none uppercase">
              SELESAIKAN MODUL » <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CrossSiteScripting;
