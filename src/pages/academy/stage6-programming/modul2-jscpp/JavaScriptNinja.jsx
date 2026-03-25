import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ShieldAlert, Code2, Globe, FileCode2, Send, AlertOctagon } from 'lucide-react';

const JavaScriptNinja = () => {
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([]);
  const [isHacked, setIsHacked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    // Check if the input contains malicious script
    if (commentInput.includes('<script>') || commentInput.includes('curiData()')) {
      setIsHacked(true);
    } else {
      setComments([{ id: Date.now(), text: commentInput }, ...comments]);
      setCommentInput('');
    }
  };

  const handleReset = () => {
    setIsHacked(false);
    setCommentInput('');
    setComments([]);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-yellow-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/50">
            <Globe className="w-8 h-8 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-sm text-yellow-400 tracking-[0.3em] uppercase font-black">Stage 6 · Modul 2: JavaScript & C++</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              JAVASCRIPT: SI NINJA WEB
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
                XSS: Cross-Site <br/>
                <span className="text-yellow-500" style={{ textShadow: '0 0 10px rgba(234, 179, 8, 0.5)' }}>SCRIPTING</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Vulnerability (kerentanan) paling populer di dunia Bug Bounty. 100% pake JS!
              </p>
            </section>

            <div className="space-y-6 text-sm leading-relaxed text-gray-400">
               <p>
                 Bayangin lo lagi nonton YouTube, trus lo mau nulis komen. Lo ngetik bukan teks biasa, melainkan kode jahat JavaScript.
               </p>
               
               <div className="p-4 bg-[#0d1117] border border-gray-700 rounded-xl overflow-x-auto">
                 <pre className="text-xs text-yellow-300 font-mono">
                   <code>{"<script>curiDataLogin()</script>"}</code>
                 </pre>
               </div>

               <p>
                 Kalau YouTube programmer-nya ceroboh dan <span className="text-white font-bold">nggak bikin filter teks</span>, setiap kali orang lain buka halaman komentar itu, browser Chrome mereka bakal otomatis ngejalanin kode jahat lo di background!
               </p>

               <div className="p-6 bg-red-900/10 border-l-4 border-red-500 space-y-2 rounded-r-xl shadow-lg mt-8">
                  <div className="flex items-center gap-3 mb-2">
                     <ShieldAlert className="w-5 h-5 text-red-500" />
                     <p className="text-white font-black italic uppercase tracking-widest text-[10px]">Tujuan Hacker (Cookie Stealing):</p>
                  </div>
                  <p className="italic text-gray-300 text-xs leading-relaxed font-bold">
                    "Hacker biasanya pake JS buat nyolong <span className="text-red-400">Session Cookie</span> (tiket masuk rahasia akun). Kalau tiket ini kekirim ke Hacker, mereka bisa login ke akun orang lain tanpa ngerti passwordnya!"
                  </p>
               </div>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12">
            <div className={`p-8 border-2 rounded-xl relative overflow-hidden flex flex-col shadow-2xl transition-colors duration-500 ${isHacked ? 'border-red-500/50 bg-red-950/30' : 'border-yellow-500/30 bg-gray-900/50'}`}>
              
              <div className="mb-6 text-center relative z-10 flex flex-col items-center">
                 <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">SIMULASI: XSS COMMENT</h2>
                 <p className="text-[9px] text-yellow-500 font-bold tracking-[0.2em] mt-1">CROSS_SITE_SCRIPTING_LAB</p>
              </div>

              <div className="flex-1 flex flex-col space-y-4 relative z-10 w-full min-h-[350px]">
                 
                 {/* IDK Fake Web Interface */}
                 {isHacked ? (
                    <motion.div 
                      key="xss_alert"
                      initial={{ opacity: 0, scale: 0.8 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      className="w-full h-full bg-red-900/40 border border-red-500/50 rounded-xl flex flex-col items-center justify-center p-6 text-center shadow-[0_0_30px_rgba(239,68,68,0.4)] relative overflow-hidden"
                    >
                       <AlertOctagon className="w-16 h-16 text-red-500 mb-4 animate-bounce" />
                       <div className="bg-white/10 p-4 rounded-lg border border-red-500/50 backdrop-blur-md">
                         <p className="text-xs text-white font-black uppercase tracking-widest">
                           [!] ALERT (xss_payload.js)
                         </p>
                         <p className="text-red-200 mt-2 text-sm italic">
                           "Peringatan! Data Cookie lo berhasil dicuri ke server Hacker!"
                         </p>
                       </div>
                       
                       <p className="text-gray-400 text-[10px] mt-6 leading-relaxed max-w-[250px]">
                         Lihat kan? Kalau input user gak difilter, teks biasa bisa berubah jadi agen penyerang langsung di browser korbannya!
                       </p>

                       <button 
                         onClick={handleReset}
                         className="mt-6 px-6 py-2 bg-red-950 text-red-400 hover:bg-red-900 hover:text-white border border-red-500/50 text-xs font-bold uppercase tracking-widest rounded transition-all"
                       >
                         Reset Simulasi
                       </button>

                       {/* Glitch Overlay */}
                       <div className="absolute inset-0 bg-red-500/10 pointer-events-none mix-blend-overlay" />
                    </motion.div>
                 ) : (
                    <motion.div 
                      key="clean_web"
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="w-full bg-white text-gray-800 rounded-xl overflow-hidden flex flex-col"
                    >
                       {/* Mock Browser Bar */}
                       <div className="bg-gray-200 border-b border-gray-300 p-2 flex items-center gap-2">
                         <div className="flex gap-1">
                           <div className="w-3 h-3 rounded-full bg-red-400"></div>
                           <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                           <div className="w-3 h-3 rounded-full bg-green-400"></div>
                         </div>
                         <div className="bg-white px-3 py-1 rounded text-[10px] text-gray-500 font-sans flex-1 ml-2 shadow-inner">
                           https://vid-share.com/video/123
                         </div>
                       </div>

                       {/* Content Area */}
                       <div className="p-4 flex flex-col gap-4 font-sans h-64">
                          <h3 className="font-bold text-sm border-b pb-2">Komentar Terbaru</h3>
                          
                          {/* Input */}
                          <form onSubmit={handleSubmit} className="flex gap-2">
                            <input 
                              type="text" 
                              value={commentInput}
                              onChange={(e) => setCommentInput(e.target.value)}
                              placeholder="Ketik <script>curiData()</script> atau teks biasa..."
                              className="flex-1 border p-2 rounded text-xs bg-gray-50 focus:outline-blue-500 font-mono"
                            />
                            <button 
                              type="submit"
                              className="bg-blue-600 text-white px-4 py-2 rounded text-xs font-bold font-mono uppercase hover:bg-blue-700 flex items-center gap-1"
                            >
                              <Send className="w-3 h-3" /> Post
                            </button>
                          </form>

                          {/* Comments List */}
                          <div className="flex-1 overflow-y-auto space-y-3">
                             {comments.map((c) => (
                               <div key={c.id} className="bg-gray-100 p-3 rounded border text-xs flex gap-3">
                                  <div className="w-8 h-8 bg-blue-200 rounded-full flex-shrink-0 flex items-center justify-center text-blue-800 font-bold">U</div>
                                  <div>
                                    <p className="font-bold text-gray-700 text-[10px]">UserBaru</p>
                                    <p className="mt-1 font-mono text-[11px] text-gray-800">{c.text}</p>
                                  </div>
                               </div>
                             ))}
                             {comments.length === 0 && (
                               <p className="text-xs text-gray-400 italic text-center mt-8">Belum ada komentar.</p>
                             )}
                          </div>
                       </div>
                    </motion.div>
                 )}

              </div>
              
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-yellow-500 shadow-2xl">
          <Link 
            to="/academy/stage-6/modul-2/intro"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « SEBELUMNYA
          </Link>
          
          <Link 
            to="/academy/stage-6/modul-2/cpp-memory"
            className="flex items-center gap-3 bg-yellow-600 hover:bg-yellow-500 text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
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

export default JavaScriptNinja;
