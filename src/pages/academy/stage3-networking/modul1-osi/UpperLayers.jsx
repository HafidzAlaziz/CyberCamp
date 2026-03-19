import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Shield, Lock, Unlock, MessageSquare, Terminal, Settings, Database, Home, ArrowRight, Send, Radio } from 'lucide-react';

const UpperLayers = () => {
  const [activeTab, setActiveTab] = useState(7);
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [encryptedText, setEncryptedText] = useState('');

  // Layer 6 Scrambler Effect
  useEffect(() => {
    if (activeTab === 6) {
      const chars = "!@#$%^&*()_+{}[]|;:,.<>?";
      const interval = setInterval(() => {
        const scrambled = (message || "Halo Target!").split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
        setEncryptedText(scrambled);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [activeTab, message]);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-6xl mx-auto">

        {/* Standardized Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-cyan-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/50">
            <Lock className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-500 tracking-[0.3em] uppercase font-black">Stage 3: Networking</h1>
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
              MODUL 1: OSI MODEL
            </h2>
          </div>
        </motion.div>

        {/* 2-Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Material */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="space-y-6">
               <div className="space-y-2">
                  <h3 className="text-xl font-black text-white uppercase italic flex items-center gap-3">
                     <Settings className="w-6 h-6 text-purple-500" /> Layer 7: Application
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    Bagian yang paling deket sama lo. Isinya aplikasi kayak Chrome atau WA. Ibaratnya lo baru <span className="text-purple-400 font-bold underline">nulis surat</span> buat dikirim.
                  </p>
               </div>

               <div className="space-y-2">
                  <h3 className="text-xl font-black text-white uppercase italic flex items-center gap-3">
                     <Shield className="w-6 h-6 text-cyan-500" /> Layer 6: Presentation
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    Si "Penerjemah". Dia mastiin data bisa dibaca (JPEG, MP4) dan di-enkripsi. Surat lo tadi ditulis pake <span className="text-cyan-400 font-bold italic">sandi rahasia</span> biar aman dari mata-mata!
                  </p>
               </div>

               <div className="space-y-2">
                  <h3 className="text-xl font-black text-white uppercase italic flex items-center gap-3">
                     <Database className="w-6 h-6 text-emerald-500" /> Layer 5: Session
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    Si "Manajer". Dia yang buka jalur obrolan. Ibarat <span className="text-emerald-400 font-bold italic">ngetok pintu</span> rumah tujuan, "Halo, gue mau kirim paket nih kawan".
                  </p>
               </div>
               
               <div className="p-6 bg-purple-900/10 border-l-4 border-purple-500 rounded-sm italic">
                  <span className="text-purple-400 font-black uppercase text-[10px] block mb-2 tracking-widest flex items-center gap-2 font-mono">
                    <Terminal className="w-4 h-4" /> Hacker POV: Data Sniffing
                  </span>
                  Data lo diacak di Layer 6 biar kalau disadap (sniffing), hacker cuma liat <span className="text-white font-bold">teks sampah</span> yang gak bisa dibaca. Makanya HTTPS jauh lebih aman daripada HTTP!
               </div>
            </div>
          </motion.div>

          {/* Right Column: Simulation Case */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-900/50 border border-purple-500/30 rounded-xl p-8 shadow-2xl relative overflow-hidden flex flex-col min-h-[550px]"
          >
            <div className="absolute top-4 left-4 flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
               <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest font-mono">SIMULATION: UPPER_LAYERS</span>
            </div>

            {/* Tabs */}
            <div className="mt-8 flex bg-black/40 p-1 rounded-lg mb-8 border border-white/5">
              {[7, 6, 5].map((layer) => (
                <button
                  key={layer}
                  onClick={() => setActiveTab(layer)}
                  className={`flex-1 py-3 rounded-md text-[10px] font-black transition-all ${activeTab === layer ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  LAYER {layer}
                </button>
              ))}
            </div>

            <div className="flex-1 flex flex-col">
              <AnimatePresence mode="wait">
                {activeTab === 7 && (
                  <motion.div 
                    key="l7"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col h-full"
                  >
                    <div className="bg-black/60 border border-purple-500/20 rounded-lg p-6 h-64 flex flex-col shadow-inner">
                      <div className="flex-1 overflow-y-auto space-y-3">
                         <div className="bg-gray-800/50 p-3 rounded-lg text-[10px] text-gray-400 border border-white/5 max-w-[80%]">
                            Hacker: Eh, lo di mana? Gue mau kirim file PDF "rahasia" nih.
                         </div>
                         {isSent && (
                           <motion.div 
                             initial={{ opacity: 0, scale: 0.9, x: 20 }} 
                             animate={{ opacity: 1, scale: 1, x: 0 }} 
                             className="bg-purple-600 text-white p-3 rounded-lg rounded-tr-none self-end max-w-[80%] ml-auto text-[10px] shadow-lg font-bold"
                           >
                             {message || "Halo Target!"}
                           </motion.div>
                         )}
                      </div>
                      <div className="mt-4 flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Ketik pesan..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="flex-1 bg-gray-950 border border-white/10 rounded px-3 py-2 text-[10px] outline-none focus:border-purple-500 transition-all"
                        />
                        <button 
                          onClick={() => setIsSent(true)} 
                          className="p-3 bg-purple-600 rounded hover:bg-purple-500 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] group"
                        >
                          <Send className="w-4 h-4 text-white group-hover:translate-x-1 group-active:scale-90 transition-all" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-purple-500/5 border border-purple-500/20 rounded-lg text-center">
                       <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest leading-relaxed">
                          Ini Layer 7 (Application)!<br/>
                          <span className="text-gray-500 font-medium normal-case block mt-1">Sama kayak UI WhatsApp atau Chrome yang lo pake sehari-hari.</span>
                       </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 6 && (
                  <motion.div 
                    key="l6"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    className="flex flex-col h-full items-center justify-center p-6 space-y-8"
                  >
                    <div className="relative w-full aspect-video bg-black/60 border border-red-500/20 rounded-xl flex flex-col items-center justify-center p-8 overflow-hidden group">
                       <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(239,68,68,0.05),transparent)] pointer-events-none"></div>
                       <Lock className="w-16 h-16 text-red-500 mb-6 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]" />
                       <div className="text-2xl font-black text-red-500 tracking-[0.2em] mb-4 break-all font-mono">
                         {isSent ? encryptedText : 'ENCRYPT_ERROR: NO_DATA'}
                       </div>
                       <div className="h-px w-full bg-gradient-to-r from-transparent via-red-500/50 to-transparent mb-4"></div>
                       <p className="text-xs text-gray-400 font-bold italic">
                         "Data dibungkus sandi rahasia biar gak disadap!"
                       </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full">
                       <div className="p-3 bg-white/5 border border-white/10 rounded text-center">
                          <span className="text-[8px] text-gray-500 block">ASLI</span>
                          <span className="text-[10px] text-white font-mono">{message || "Halo Target!"}</span>
                       </div>
                       <div className="p-3 bg-red-500/10 border border-red-500/30 rounded text-center">
                          <span className="text-[8px] text-red-500 block uppercase">PRESENTATION</span>
                          <span className="text-[10px] text-red-400 font-mono italic">SCRAMBLED_DATA</span>
                       </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 5 && (
                  <motion.div 
                    key="l5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col h-full items-center justify-center p-6"
                  >
                    <div className="w-full bg-black/40 border border-emerald-500/20 rounded-xl p-10 relative overflow-hidden">
                       <div className="flex items-center justify-between gap-4 relative z-10">
                          <motion.div 
                            animate={{ scale: [1, 1.05, 1] }} 
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="flex flex-col items-center gap-3"
                          >
                             <div className="p-4 bg-emerald-500/10 rounded-full border border-emerald-500/30">
                                <Home className="w-10 h-10 text-emerald-500" />
                             </div>
                             <span className="text-[9px] font-black text-emerald-500/60 uppercase tracking-widest">LOCAL</span>
                          </motion.div>

                          <div className="flex-1 flex flex-col items-center gap-2">
                             <div className="flex gap-2">
                                {[...Array(6)].map((_, i) => (
                                  <motion.div 
                                    key={i} 
                                    animate={{ 
                                      opacity: [0, 1, 0],
                                      scale: [0.5, 1, 0.5]
                                    }} 
                                    transition={{ 
                                      repeat: Infinity, 
                                      delay: i * 0.15,
                                      duration: 0.8
                                    }} 
                                    className="w-1.5 h-1.5 bg-emerald-400 rounded-full" 
                                  />
                                ))}
                             </div>
                             <span className="text-[7px] text-gray-600 font-black uppercase tracking-[0.3em]">Handshake_Process</span>
                          </div>

                          <motion.div 
                            animate={{ scale: [1, 1.05, 1] }} 
                            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                            className="flex flex-col items-center gap-3"
                          >
                             <div className="p-4 bg-emerald-500/10 rounded-full border border-emerald-500/30">
                                <Database className="w-10 h-10 text-emerald-500" />
                             </div>
                             <span className="text-[9px] font-black text-emerald-500/60 uppercase tracking-widest">REMOTE</span>
                          </motion.div>
                       </div>
                    </div>

                    <div className="mt-12 space-y-3 w-full">
                       <div className="flex items-center gap-3 py-2 px-4 bg-emerald-500/10 border-l-2 border-emerald-500 rounded-sm">
                          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                          <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">Syncing... Ngetok pintu server buat janjian.</span>
                       </div>
                       <p className="text-[9px] text-gray-500 leading-relaxed italic px-4">
                          "Halo server? Gue mau kirim file PDF nih, jalurnya aman gak?" - "Siap kawan, jalur 443 kebuka!".
                       </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Bottom Navigation Summary-style */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 p-6 bg-gray-900/20 border border-white/5 rounded-2xl flex justify-between items-center"
        >
          <Link 
            to="/academy/stage-3/modul-1"
            className="flex items-center gap-2 text-gray-600 hover:text-white transition-all font-black uppercase tracking-widest text-[10px] group"
          >
             <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> BACK: OSI INTRO
          </Link>
          <Link 
            to="/academy/stage-3/modul-1/lower-layers"
            className="flex items-center gap-2 text-cyan-500 hover:text-white transition-all font-black uppercase tracking-widest text-[10px] group"
          >
             LANJUT: LOWER LAYERS <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default UpperLayers;
