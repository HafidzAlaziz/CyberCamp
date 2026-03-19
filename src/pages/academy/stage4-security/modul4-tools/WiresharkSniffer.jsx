import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, ShieldAlert, ShieldCheck, ChevronRight, ChevronLeft, Zap, Info, Play, Pause, Search, Eye, Lock, Unlock } from 'lucide-react';

const WiresharkSniffer = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [packets, setPackets] = useState([]);
  const [selectedPacket, setSelectedPacket] = useState(null);
  const scrollRef = useRef(null);

  const packetTemplates = [
    { protocol: 'HTTPS', source: '192.168.1.5', dest: '172.217.14.206', length: 1440, data: 'x&@#jd192!kL...', isSecure: true },
    { protocol: 'HTTP', source: '192.168.1.5', dest: '34.233.19.12', length: 512, data: 'USER: admin, PASS: Rahasia123', isSecure: false },
    { protocol: 'TCP', source: '192.168.1.1', dest: '192.168.1.5', length: 60, data: 'SYN, ACK', isSecure: true },
    { protocol: 'DNS', source: '192.168.1.5', dest: '8.8.8.8', length: 85, data: 'QUERY: google.com', isSecure: true },
    { protocol: 'HTTP', source: '192.168.1.5', dest: '157.240.24.35', length: 120, data: 'POST /login?user=hafid&pass=anti-gravity', isSecure: false }
  ];

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        const randomTemplate = packetTemplates[Math.floor(Math.random() * packetTemplates.length)];
        setPackets(prev => [...prev.slice(-15), { ...randomTemplate, id: Date.now() + Math.random() }]);
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [packets]);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-cyan-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/50">
            <Activity className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-sm text-blue-400 tracking-[0.3em] uppercase font-black">Stage 4: Security Skills</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              MODUL 4: Wireshark (Si Penyadap)
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
                Nyadap <br/>
                <span className="text-blue-500" style={{ textShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }}>TELEPON (WIRESHARK)</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Tools ini dipake buat <span className="text-white font-bold underline decoration-blue-500 underline-offset-4">PACKET SNIFFING</span>. 
              </p>
            </section>

            <div className="space-y-6 text-sm leading-relaxed text-gray-400">
               <p>
                 Kalau lo numpang WiFi kafe, trus ada hacker pake Wireshark, dia bisa nangkep semua lalu lintas data yang lewat di udara. Mirip banget kayak nyadap telepon!
               </p>
               
               <p>
                 Kalau lo login ke web <span className="text-red-500 font-black">HTTP</span> (tanpa gembok), password lo bakal kelihatan <span className="text-white font-bold">"TELANJANG BULAT"</span> di layar hacker. Gak ada rahasia di antara kalian!
               </p>

               <div className="p-6 bg-blue-900/10 border border-blue-500/30 rounded-2xl relative overflow-hidden group">
                  <div className="flex items-center gap-3 mb-4">
                     <Info className="w-5 h-5 text-blue-400" />
                     <p className="text-white font-black italic uppercase tracking-widest text-[10px]">Pentingnya Enkripsi:</p>
                  </div>
                  <p className="italic text-gray-400 text-xs leading-relaxed">
                    Itulah kenapa di modul sebelumnya kita belajar Kriptografi. Data yang di-enkripsi (**HTTPS**) cuma bakal kelihatan kayak sampah karakter acak pas disadap Wireshark. Hacker pun jadi nangis bombay!
                  </p>
               </div>
            </div>

            <div className="bg-blue-500/5 border-l-4 border-blue-500 p-6 space-y-2 rounded-r-xl relative group">
               <Zap className="w-6 h-6 text-blue-500 mb-2" />
               <p className="text-[11px] text-gray-400 italic leading-relaxed">
                 "Ingat: Jangan pernah log in atau masukin data sensitif pas lagi di WiFi publik, kecuali lo yakin webnya udah pake HTTPS (Gembok Hijau)."
               </p>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12">
            <div className="p-8 bg-gray-900 border-2 border-blue-500/30 rounded-3xl relative overflow-hidden min-h-[550px] flex flex-col shadow-2xl">
              
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-black text-white italic tracking-tighter uppercase flex items-center gap-2">
                   <Activity className="w-5 h-5 text-blue-500" /> LIVE PACKET SNIFFING
                 </h2>
                 <button 
                   onClick={() => setIsRunning(!isRunning)}
                   className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${isRunning ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'}`}
                 >
                    {isRunning ? <><Pause className="w-3 h-3" /> STOP & INSPECT</> : <><Play className="w-3 h-3" /> RESUME CAPTURE</>}
                 </button>
              </div>

              {/* Rolling Packet Table */}
              <div className="flex-1 bg-black/60 rounded-xl overflow-hidden border border-white/5 flex flex-col">
                 <div className="grid grid-cols-4 p-3 bg-blue-500/10 border-b border-white/5 text-[9px] font-black text-blue-400 uppercase tracking-widest">
                    <span>Protocol</span>
                    <span>Source</span>
                    <span>Dest</span>
                    <span>Length</span>
                 </div>
                 <div ref={scrollRef} className="flex-1 overflow-y-auto font-mono text-[10px] scrollbar-thin scrollbar-thumb-blue-900/50">
                    <AnimatePresence>
                       {packets.map((p) => (
                         <motion.div 
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           key={p.id}
                           onClick={() => !isRunning && setSelectedPacket(p)}
                           className={`grid grid-cols-4 p-3 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${selectedPacket?.id === p.id ? 'bg-blue-500/20' : ''}`}
                         >
                            <span className={p.protocol === 'HTTPS' ? 'text-emerald-400' : p.protocol === 'HTTP' ? 'text-red-400' : 'text-gray-400'}>
                               [{p.protocol}]
                            </span>
                            <span className="text-gray-500">{p.source}</span>
                            <span className="text-gray-500">{p.dest}</span>
                            <span className="text-gray-600">{p.length}</span>
                         </motion.div>
                       ))}
                    </AnimatePresence>
                 </div>
              </div>

              {/* Inspector Panel */}
              <div className="mt-6 p-6 bg-black border border-blue-500/20 rounded-2xl min-h-[140px] relative">
                 <div className="absolute top-4 right-4 text-blue-500/10">
                    <Eye className="w-12 h-12" />
                 </div>
                 
                 {!isRunning && selectedPacket ? (
                   <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="space-y-4"
                   >
                      <div className="flex items-center gap-2">
                         <div className={`p-1 rounded ${selectedPacket.isSecure ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                            {selectedPacket.isSecure ? <Lock className="w-3 h-3 text-emerald-500" /> : <Unlock className="w-3 h-3 text-red-500" />}
                         </div>
                         <h4 className="text-[10px] font-black text-white uppercase tracking-widest">
                            Packet Payload Info
                         </h4>
                      </div>
                      <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-800 font-mono text-xs">
                         <span className={selectedPacket.isSecure ? 'text-emerald-400' : 'text-red-500'}>
                            {selectedPacket.data}
                         </span>
                      </div>
                      <p className="text-[9px] italic text-gray-500">
                         {selectedPacket.isSecure ? 
                           "Aman! Data dienkripsi." : 
                           "BAHAYA! Data dikirim tanpa enkripsi, ketahuan deh!"
                         }
                      </p>
                   </motion.div>
                 ) : (
                   <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-2">
                         {isRunning ? 'Capturing Packets Live...' : 'Pilih satu baris untuk inspeksi data'}
                      </p>
                      <Activity className={`w-6 h-6 text-blue-500/30 ${isRunning && 'animate-pulse'}`} />
                   </div>
                 )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link 
            to="/academy/stage-4/modul-4/nmap-scanner"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « KEMBALI KE "NMAP SCANNER"
          </Link>
          
          <Link 
            to="/academy/stage-4/modul-4/kesimpulan"
            className="flex items-center gap-3 bg-cyan-600 hover:bg-white text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
          >
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest leading-none uppercase">
              LANJUT KE "KESIMPULAN TOOLS" » <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WiresharkSniffer;
