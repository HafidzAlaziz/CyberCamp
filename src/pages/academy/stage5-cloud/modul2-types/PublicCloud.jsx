import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cloud, Server, ChevronRight, ChevronLeft, ShieldAlert, DoorOpen, Users, Banknote, StopCircle, PlusCircle } from 'lucide-react';

const PublicCloud = () => {
  const [servers, setServers] = useState([]);
  const [cost, setCost] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && servers.length > 0) {
      interval = setInterval(() => {
        setCost(prev => prev + (100 * servers.length));
      }, 1000);
    } else if (servers.length === 0) {
      setIsRunning(false); // Auto stop when 0 servers
    }
    return () => clearInterval(interval);
  }, [isRunning, servers]);

  const addServer = () => {
    if (servers.length < 8) {
      setServers([...servers, { id: Date.now() }]);
      setIsRunning(true);
    }
  };

  const stopServers = () => {
    setIsRunning(false);
    setServers([]);
    setCost(0);
  };

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
            <Cloud className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 5: Cloud Security</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              MODUL 2: Public Cloud
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
                Ngekos di <br/>
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }}>APARTEMEN MEWAH</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Apa itu <span className="text-white font-bold underline decoration-cyan-500 underline-offset-4">Public Cloud</span>?
              </p>
            </section>

            <div className="space-y-6 text-sm leading-relaxed text-gray-400">
               <p>
                 Public Cloud (kayak AWS, GCP, Azure) itu ibarat apartemen gede atau kos-kosan raksasa. Konsepnya <span className="text-white font-bold italic">Multi-tenant</span>, artinya data perusahaan lo dan data ribuan perusahaan lain disimpen di hardware fisik penyedia cloud yang sama. Tenang, datanya udah disekat/dipisah pake software biar nggak saling ngintip.
               </p>
               
               <p>
                 <span className="text-cyan-400 font-bold">Keuntungannya:</span> Lo bisa sewa unit kapan aja, murah banget buat nyoba-nyoba, dan sistem bayarnya <span className="text-white font-bold italic">Pay-as-you-go</span> (lo cuma bayar listrik/server yang lo nyalain doang).
               </p>

               <div className="p-6 bg-cyan-900/10 border border-cyan-500/30 rounded-2xl relative overflow-hidden group">
                  <div className="flex items-center gap-3 mb-4">
                     <ShieldAlert className="w-5 h-5 text-cyan-400" />
                     <p className="text-white font-black italic uppercase tracking-widest text-[10px]">Konteks Hacker:</p>
                  </div>
                  <p className="italic text-gray-400 text-xs leading-relaxed">
                    "Hacker paling seneng nyari mangsa di Public Cloud lewat <span className="text-red-400 font-bold">Misconfiguration</span> (salah setting). Banyak banget admin IT amatir yang naruh file rahasia di folder Cloud (misal: S3 Bucket) TAPI lupa digembok. Jadinya kebuka buat umum siapapun tinggal klik dan sedot!"
                  </p>
               </div>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12">
            <div className="p-8 border-2 border-cyan-500/30 rounded-xl bg-gray-900/50 relative overflow-hidden min-h-[500px] flex flex-col shadow-2xl transition-colors duration-500">
              
              <div className="mb-8 text-center relative z-10 flex flex-col items-center">
                 <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">SIMULASI: SEWA APARTEMEN CLOUD</h2>
                 <p className="text-[9px] text-cyan-500 font-bold tracking-[0.2em] mt-1">AWS_GCP_AZURE_SCALABILITY</p>
              </div>

              <div className="flex-1 flex flex-col items-center justify-between py-4 text-center space-y-8 relative z-10">
                 
                 <div className="w-full h-48 bg-black/40 border border-cyan-500/20 rounded-xl p-4 flex flex-col relative overflow-hidden">
                    <div className="absolute top-2 left-4 flex items-center gap-2">
                       <Cloud className="w-4 h-4 text-cyan-500/50" />
                       <span className="text-[8px] text-cyan-500 uppercase tracking-widest font-bold">Gedung AWS</span>
                    </div>

                    <div className="flex-1 mt-6 grid grid-cols-4 gap-3 place-items-start place-content-start">
                       <AnimatePresence>
                         {servers.map((server, i) => (
                           <motion.div 
                             key={server.id}
                             initial={{ opacity: 0, scale: 0 }}
                             animate={{ opacity: 1, scale: 1 }}
                             exit={{ opacity: 0, scale: 0 }}
                             className="bg-cyan-900/40 border border-cyan-500 p-2 rounded-lg flex flex-col items-center gap-1 w-full"
                           >
                              <Server className="w-6 h-6 text-cyan-400 animate-pulse" />
                              <span className="text-[8px] text-cyan-300 font-bold">VM-{i+1}</span>
                           </motion.div>
                         ))}
                         {servers.length === 0 && (
                            <div className="col-span-4 h-full flex items-center justify-center text-gray-600 text-xs italic font-bold">
                               Kosong. Klik Tambah Server.
                            </div>
                         )}
                       </AnimatePresence>
                    </div>
                 </div>

                 {/* Control Panel */}
                 <div className="w-full space-y-4">
                    <div className="bg-emerald-950/30 border border-emerald-500/30 p-4 rounded-xl flex items-center justify-between">
                       <div className="flex items-center gap-2 text-emerald-500">
                          <Banknote className="w-5 h-5" />
                          <span className="font-bold text-xs uppercase tracking-widest">Argo Biaya:</span>
                       </div>
                       <div className="text-emerald-400 font-black text-xl font-mono">
                          Rp {cost.toLocaleString()}
                       </div>
                    </div>

                    <div className="flex gap-4">
                       <button 
                         onClick={addServer}
                         disabled={servers.length >= 8}
                         className="flex-1 py-3 px-4 bg-cyan-600/20 text-cyan-400 border border-cyan-500/50 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-cyan-500 hover:text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                       >
                         <PlusCircle className="w-4 h-4" />
                         Tambah Server <span className="text-[8px] opacity-70 block -mt-1">(Rp 100/dtk)</span>
                       </button>
                       <button 
                         onClick={stopServers}
                         disabled={servers.length === 0}
                         className="py-3 px-6 bg-red-900/40 text-red-500 border border-red-500/50 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                       >
                         <StopCircle className="w-4 h-4" />
                         Matikan
                       </button>
                    </div>
                    
                    {isRunning && (
                       <p className="text-red-400 font-bold text-[10px] animate-pulse">
                         Gampang banget kan bikin server? Tapi ati-ati argonya jalan terus!
                       </p>
                    )}
                 </div>

              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link 
            to="/academy"
            state={{ expandedId: 'cloud-skills' }}
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « KEMBALI KE HQ
          </Link>
          
          <Link 
            to="/academy/stage-5/modul-2/private-cloud"
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

export default PublicCloud;
