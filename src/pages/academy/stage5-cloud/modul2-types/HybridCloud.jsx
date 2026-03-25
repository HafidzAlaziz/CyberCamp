import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Network, Server, Cloud, ChevronRight, ChevronLeft, ShieldAlert, ShoppingCart, Zap, AlertTriangle, Users } from 'lucide-react';

const HybridCloud = () => {
  const [activeTab, setActiveTab] = useState('private'); // 'private', 'hybrid'
  const [traffic, setTraffic] = useState(0); // 0 to 100
  const [status, setStatus] = useState('normal'); // 'normal', 'warning', 'down', 'bursting'

  useEffect(() => {
    let interval;
    if (traffic > 0 && traffic < 100 && status !== 'down') {
      interval = setInterval(() => {
        setTraffic(prev => Math.min(prev + 5, 100));
      }, 300);
    } else if (traffic >= 100) {
      if (activeTab === 'private') {
        setStatus('down');
      } else {
        setStatus('bursting');
      }
    } else if (traffic > 70 && activeTab === 'private') {
      setStatus('warning');
    }
    return () => clearInterval(interval);
  }, [traffic, activeTab, status]);

  const startFlashSale = () => {
    setTraffic(10);
    setStatus('normal');
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setTraffic(0);
    setStatus('normal');
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
            <Network className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 5: Cloud Security</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              MODUL 2: Hybrid Cloud
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
                Kenapa Gak Punya <br/>
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }}>DUA-DUANYA?</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Kenalin, <span className="text-white font-bold underline decoration-cyan-500 underline-offset-4">Hybrid Cloud</span>! 
              </p>
            </section>

            <div className="space-y-6 text-sm leading-relaxed text-gray-400">
               <div className="p-5 bg-gray-900 border border-gray-700 rounded-xl">
                 <p className="mb-2 text-white">
                   Data customer (KTP, Saldo Bank) yang super rahasia disimpen di benteng <span className="text-cyan-400 font-bold">Private Cloud</span> biar aman dari intipan publik.
                 </p>
                 <p className="mb-2 text-white mt-4 border-t border-gray-800 pt-4">
                   TAPI, web buat katalog gambar dan Promo ditaruh di <span className="text-blue-400 font-bold">Public Cloud</span> (kayak AWS) supaya kalau ada *Flash Sale* lalu jutaan orang nge-akses barengan, servernya tetep kuat.
                 </p>
               </div>
               
               <p>
                 Dua dunia ini disambungin pake Lorong Rahasia (VPN / Direct Connect). Kalau traffic di Private hampir meledak, lo bisa langsung minjem server Public Cloud, teknik ini namanya <span className="text-white font-bold italic underline decoration-blue-500">Cloud Bursting</span>.
               </p>

               <div className="p-6 bg-red-900/10 border border-red-500/30 rounded-2xl relative overflow-hidden group">
                  <div className="flex items-center gap-3 mb-4">
                     <ShieldAlert className="w-5 h-5 text-red-500" />
                     <p className="text-white font-black italic uppercase tracking-widest text-[10px]">Konteks Hacker:</p>
                  </div>
                  <p className="italic text-gray-400 text-xs leading-relaxed">
                    "Hacker ngincer apa di model Hybrid? Mereka ngincer **'Jembatan'** alias jalur koneksi antara Public dan Private-nya! Kalau jembatan itu bocor, mereka lompat kerampok brankas Private lewat apartemen Public."
                  </p>
               </div>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12">
            <div className="p-8 border-2 border-cyan-500/30 rounded-xl bg-gray-900/50 relative overflow-hidden min-h-[500px] flex flex-col shadow-2xl transition-colors duration-500">
              
              <div className="mb-6 text-center relative z-10 flex flex-col items-center">
                 <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">SIMULASI: FLASH SALE 11.11</h2>
                 <p className="text-[9px] text-cyan-500 font-bold tracking-[0.2em] mt-1">CLOUD_BURSTING_DEMO</p>
              </div>

              {/* Tabs Container */}
              <div className="flex gap-2 mb-6 justify-center relative z-10 w-full max-w-sm mx-auto">
                 <button 
                   onClick={() => switchTab('private')}
                   className={`flex-1 py-3 px-4 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'private' ? 'bg-gray-800 border-gray-400 text-white' : 'bg-black/40 border-white/5 text-gray-500 hover:border-gray-500'}`}
                 >
                    Hanya Private
                 </button>
                 <button 
                   onClick={() => switchTab('hybrid')}
                   className={`flex-1 py-3 px-4 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'hybrid' ? 'bg-cyan-600 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'bg-black/40 border-white/5 text-gray-500 hover:border-cyan-500/30'}`}
                 >
                    Aktifkan Hybrid
                 </button>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center py-4 text-center space-y-6 relative z-10 w-full">
                 
                 <div className={`w-full p-6 border-2 rounded-xl relative overflow-hidden transition-all duration-500 ${status === 'down' ? 'bg-red-950/40 border-red-500/50' : status === 'warning' ? 'bg-amber-950/40 border-amber-500/50' : 'bg-gray-900 border-gray-700'}`}>
                    
                    <div className="flex justify-between items-center mb-6 px-4">
                       <div className="flex flex-col items-center">
                          <Users className="w-6 h-6 text-gray-400 mb-1" />
                          <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Traffic User</span>
                          <span className="text-lg font-black font-mono mt-1 text-white">{traffic}%</span>
                       </div>

                       {/* Web Shop Icon */}
                       <div className="px-6 relative">
                         <ShoppingCart className={`w-12 h-12 transition-all ${status === 'down' ? 'text-red-500 opacity-30' : 'text-blue-400'} ${traffic > 0 && traffic < 100 ? 'animate-bounce' : ''}`} />
                         {status === 'down' && <AlertTriangle className="w-16 h-16 text-red-500 absolute -top-2 left-4 animate-pulse" />}
                       </div>

                       <div className="flex flex-col items-center relative">
                          <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-1">Server Farm</span>
                          <div className="flex -space-x-2">
                            <Server className={`w-6 h-6 border bg-gray-900 rounded-sm relative z-20 ${status === 'down' ? 'text-red-500 border-red-500' : 'text-gray-400 border-gray-600'} ${status === 'warning' ? 'text-amber-500 animate-pulse' : ''}`} />
                            <Server className={`w-6 h-6 border bg-gray-900 rounded-sm relative z-10 ${status === 'down' ? 'text-red-500 border-red-500' : 'text-gray-400 border-gray-600'} ${status === 'warning' ? 'text-amber-500 animate-pulse' : ''}`} />
                          </div>
                       </div>
                    </div>

                    {/* Progress Bar (Traffic) */}
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                       <div 
                         className={`h-full transition-all duration-300 ${status === 'down' ? 'bg-red-500' : status === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}`}
                         style={{ width: `${traffic}%` }} 
                       />
                    </div>
                 </div>

                 {/* Burst Server visualization (Public Cloud assistance) */}
                 <div className="h-20 w-full flex items-center justify-center">
                    <AnimatePresence>
                      {status === 'bursting' && activeTab === 'hybrid' && (
                         <motion.div 
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           className="flex flex-col items-center p-3 border border-cyan-500/50 bg-cyan-900/20 rounded-xl"
                         >
                            <div className="flex items-center gap-2 mb-2">
                               <Cloud className="w-5 h-5 text-cyan-400" />
                               <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-widest">AWS Auto Scaling Aktif</span>
                            </div>
                            <div className="flex gap-2 text-cyan-400">
                               <Server className="w-5 h-5 animate-pulse" />
                               <Server className="w-5 h-5 animate-pulse delay-75" />
                               <Server className="w-5 h-5 animate-pulse delay-150" />
                               <Server className="w-5 h-5 animate-pulse delay-300" />
                            </div>
                         </motion.div>
                      )}
                    </AnimatePresence>
                 </div>

                 <div className="flex flex-col items-center justify-center w-full gap-4">
                    <button 
                      onClick={startFlashSale}
                      disabled={traffic > 0 && traffic < 100}
                      className="w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 from-gray-800 to-gray-700 text-white border border-gray-600 hover:border-cyan-400 disabled:opacity-50"
                    >
                      Buka Flash Sale 11.11!
                    </button>
                    
                    <div className="h-10 flex items-center">
                       <AnimatePresence mode="wait">
                         {status === 'down' && (
                           <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-red-500 font-bold uppercase tracking-widest animate-bounce">
                             SERVER MELEDAK! CUSTOMER NGAMUK! 💥
                           </motion.p>
                         )}
                         {status === 'bursting' && (
                           <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
                             TRAFFIC LUBER? LEMPAR KE PUBLIC CLOUD SEMENTARA! 🚀
                           </motion.p>
                         )}
                       </AnimatePresence>
                    </div>
                 </div>

              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link 
            to="/academy/stage-5/modul-2/private-cloud"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « SEBELUMNYA
          </Link>
          
          <Link 
            to="/academy/stage-5/modul-2/kesimpulan"
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

export default HybridCloud;
