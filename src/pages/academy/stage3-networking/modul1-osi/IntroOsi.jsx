import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Layers, Shield, Zap, Info, Home, MessageSquare, Send, ArrowRight } from 'lucide-react';

const IntroOsi = () => {
  const [isSending, setIsSending] = useState(false);
  const [activeLayer, setActiveLayer] = useState(null);

  const layers = [
    { id: 7, name: "Application" },
    { id: 6, name: "Presentation" },
    { id: 5, name: "Session" },
    { id: 4, name: "Transport" },
    { id: 3, name: "Network" },
    { id: 2, name: "Data Link" },
    { id: 1, name: "Physical" }
  ];

  const triggerAnimation = () => {
    setIsSending(true);
    let current = 7;
    const interval = setInterval(() => {
      setActiveLayer(current);
      current--;
      if (current < 0) {
        clearInterval(interval);
        setTimeout(() => {
          setIsSending(false);
          setActiveLayer(null);
        }, 1000);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-6xl mx-auto">

        {/* Standardized Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-cyan-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/50">
            <Layers className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-500 tracking-[0.3em] uppercase font-black text-glow-cyan">Stage 3: Networking</h1>
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
            className="space-y-6"
          >
            <div className="space-y-4 text-lg leading-relaxed text-gray-400">
               <h3 className="text-2xl font-black text-cyan-500 italic uppercase">Apa itu OSI Model? 🤔</h3>
               <p>
                 Intinya, ini adalah 7 "Tata Krama" atau aturan gimana data jalan dari HP lo ke server Instagram. Data lo nggak tiba-tiba nyampai gitu aja, Bos!
               </p>
               
               <div className="p-6 bg-cyan-950/20 border-l-4 border-cyan-500 rounded-sm italic">
                  <span className="text-cyan-400 font-black uppercase text-[10px] block mb-2 tracking-widest flex items-center gap-2 font-mono">
                    <Shield className="w-4 h-4" /> Kenapa Hacker Harus Tau?
                  </span>
                  Karena serangan hacker itu beda-beda targetnya. Ada yang nyerang aplikasinya langsung (Layer 7), ada yang nyadap kabel/listriknya (Layer 1). Lo harus tau layer mana yang mau lo bongkar!
               </div>

               <p className="text-sm italic">
                 Analogi: Mirip proses kirim surat lewat ekspedisi. Harus dibungkus, dikasih alamat, baru dibawa kurir.
               </p>
            </div>
          </motion.div>

          {/* Right Column: Simulation Case */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-900/50 border border-cyan-500/30 rounded-xl p-8 shadow-2xl relative overflow-hidden flex flex-col items-center min-h-[500px]"
          >
            <div className="absolute top-4 left-4 flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
               <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest font-mono">SIMULATION: DATA_PIPELINE</span>
            </div>

            {/* Layer Stack */}
            <div className="mt-8 flex flex-col gap-2 w-full max-w-xs">
               {layers.map((layer) => (
                 <motion.div
                   key={layer.id}
                   animate={{ 
                     backgroundColor: activeLayer === layer.id ? 'rgba(34, 211, 238, 0.4)' : 'rgba(17, 24, 39, 0.4)',
                     borderColor: activeLayer === layer.id ? 'rgba(34, 211, 238, 0.8)' : 'rgba(34, 211, 238, 0.1)',
                     x: activeLayer === layer.id ? 10 : 0
                   }}
                   className="p-3 border rounded flex items-center justify-between group transition-all"
                 >
                    <div className="flex items-center gap-3">
                       <span className={`text-[10px] font-black ${activeLayer === layer.id ? 'text-white' : 'text-gray-700'}`}>0{layer.id}</span>
                       <span className={`text-xs font-bold uppercase tracking-widest ${activeLayer === layer.id ? 'text-cyan-400' : 'text-gray-500'}`}>{layer.name}</span>
                    </div>
                    {activeLayer === layer.id && (
                      <Zap className="w-3 h-3 text-cyan-400 animate-pulse" />
                    )}
                 </motion.div>
               ))}
            </div>

            {/* Interaction Button */}
            <div className="mt-auto w-full pt-10">
               <button 
                 disabled={isSending}
                 onClick={triggerAnimation}
                 className={`w-full py-4 rounded-sm font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-300 flex items-center justify-center gap-3 border ${isSending ? 'bg-gray-800 text-gray-600 border-gray-700' : 'bg-cyan-600 text-white border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:bg-cyan-500 hover:text-black'}`}
               >
                  {isSending ? <Send className="w-4 h-4 animate-bounce" /> : <MessageSquare className="w-4 h-4" />}
                  <span>{isSending ? 'SENDING DATA...' : 'KIRIM PESAN WA'}</span>
               </button>
               {isSending && (
                 <p className="text-[9px] text-center text-cyan-600 font-bold uppercase tracking-widest mt-4 animate-pulse">
                   Data sedang dibungkus... Meluncur kebawah!
                 </p>
               )}
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
          <div className="text-gray-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <Layers className="w-4 h-4" /> OSI_PHASE: 01/04
          </div>
          <Link 
            to="/academy/stage-3/modul-1/upper-layers"
            className="flex items-center gap-2 text-cyan-500 hover:text-white transition-all font-black uppercase tracking-widest text-[10px] group"
          >
             LANJUT: UPPER LAYERS <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default IntroOsi;
