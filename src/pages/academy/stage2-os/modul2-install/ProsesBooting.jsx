import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Power, Settings, ArrowUp, ArrowDown, Save, HardDrive, Usb, Info } from 'lucide-react';

const ProsesBooting = () => {
  const [bootOrder, setBootOrder] = useState(['Hard Disk (Windows)', 'USB Drive (Empty)']);
  const [isSaved, setIsSaved] = useState(false);
  const [isBooting, setIsBooting] = useState(false);

  const moveUp = (index) => {
    if (index === 0) return;
    const newOrder = [...bootOrder];
    [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
    setBootOrder(newOrder);
  };

  const moveDown = (index) => {
    if (index === bootOrder.length - 1) return;
    const newOrder = [...bootOrder];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    setBootOrder(newOrder);
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsBooting(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Standardized Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-blue-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/50 text-blue-400">
            <Power className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-sm text-blue-400 tracking-[0.3em] uppercase font-black">Stage 2: Operating Systems</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              MODUL 2: Installation & Booting
            </h2>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-blue-400 mb-6 italic tracking-tight uppercase">Satpam Pertama di Gerbang 👮‍♂️</h3>
            <div className="space-y-4 text-base leading-relaxed text-gray-400 text-[15px]">
              <p>
                Pernah mikir gak apa yang terjadi pas lo pencet tombol <span className="text-white font-bold">Power</span>? 
                Komputer itu nggak langsung manggil OS. Ada "Satpam" yang bangun duluan, namanya <span className="text-blue-400 font-bold">BIOS / UEFI</span>.
              </p>
              <p>
                 Tugas satpam ini simpel: Ngecek hardware lo sehat gak? Terus dia nyari: "Gue harus booting (ngidupin) OS dari mana nih? Harddisk atau Flashdisk?"
              </p>
              <p className="p-4 bg-gray-900/50 border border-gray-800 rounded text-sm italic">
                 <span className="text-blue-400 font-black tracking-widest uppercase block mb-1">Misi Hacker:</span> Kalau lo mau jalanin <span className="text-white">Live USB</span> lo tadi, lo wajib masuk ke "Lantai Utama" BIOS buat ngerubah urutan booting-nya. <span className="text-white">USB Drive</span> harus jadi prioritas nomor 1!
              </p>
            </div>
          </motion.div>

          {/* Practical Simulation: BIOS Menu Mini */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-blue-900/20 border-2 border-blue-500/20 rounded-lg p-0 shadow-2xl relative overflow-hidden flex flex-col min-h-[450px]"
          >
            {/* BIOS Header */}
            <div className="bg-blue-800 text-white px-6 py-2 flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
               <span>InsydeH2O Setup Utility</span>
               <span className="opacity-50 italic">Rev 5.0</span>
            </div>
            
            <div className="flex-1 p-8 space-y-8 flex flex-col justify-center">
               <AnimatePresence mode="wait">
                  {!isBooting ? (
                    <motion.div 
                      key="bios"
                      className="space-y-8"
                      exit={{ opacity: 0, y: -20 }}
                    >
                       <div className="flex items-center gap-3 border-b border-blue-500/20 pb-4">
                          <Settings className="w-5 h-5 text-blue-400" />
                          <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">Boot Priority Order</h4>
                       </div>

                       <div className="space-y-3">
                          {bootOrder.map((device, index) => (
                             <motion.div 
                               layout
                               key={device}
                               className={`p-4 border rounded flex items-center justify-between transition-all ${index === 0 ? 'bg-blue-500/20 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'border-gray-800 bg-black/40'}`}
                             >
                                <div className="flex items-center gap-3">
                                   <span className={`text-[10px] font-black w-4 ${index === 0 ? 'text-blue-400' : 'text-gray-600'}`}>{index + 1}.</span>
                                   {device.includes('USB') ? <Usb className="w-4 h-4 text-emerald-400" /> : <HardDrive className="w-4 h-4 text-blue-400" />}
                                   <span className={`text-[11px] font-bold ${index === 0 ? 'text-white' : 'text-gray-500'}`}>{device}</span>
                                </div>
                                <div className="flex gap-2">
                                   <button onClick={() => moveUp(index)} className="p-1 hover:bg-white/10 rounded"><ArrowUp className="w-3 h-3" /></button>
                                   <button onClick={() => moveDown(index)} className="p-1 hover:bg-white/10 rounded"><ArrowDown className="w-3 h-3" /></button>
                                </div>
                             </motion.div>
                          ))}
                       </div>

                       <button 
                         onClick={handleSave}
                         disabled={isSaved}
                         className={`w-full py-4 border rounded-sm font-black uppercase tracking-[0.3em] text-[10px] transition-all flex items-center justify-center gap-2 ${isSaved ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 animate-pulse' : 'bg-blue-500/10 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white shadow-[0_0_20px_rgba(59,130,246,0.1)]'}`}
                       >
                          <Save className="w-4 h-4" />
                          {isSaved ? 'SAVING_CHANGES...' : 'SAVE & EXIT (F10)'}
                       </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="booting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center space-y-4"
                    >
                       <div className="text-blue-400 font-black animate-pulse text-xs tracking-[0.4em] uppercase">Booting from {bootOrder[0]}...</div>
                       <div className="text-white text-[10px] font-mono opacity-80 uppercase leading-relaxed">
                          {bootOrder[0].includes('USB') ? (
                            <span className="text-emerald-500">
                               [  OK  ] Loading Linux Kernel...<br/>
                               [  OK  ] Mounting Live Filesystem...<br/>
                               [  OK  ] Entering Stealth Mode...<br/>
                               <span className="italic block mt-4 font-black">SUCCESS! YOU ARE NOW ANONYMOUS.</span>
                            </span>
                          ) : (
                            <span>
                               Loading Windows Boot Manager...<br/>
                               Welcome back, User! :)
                            </span>
                          )}
                       </div>
                       {bootOrder[0].includes('USB') && (
                          <div className="pt-8">
                             <div className="w-24 h-24 bg-emerald-500/10 rounded-full border border-emerald-500/50 flex items-center justify-center mx-auto animate-bounce">
                                <Usb className="w-10 h-10 text-emerald-400" />
                             </div>
                          </div>
                       )}
                    </motion.div>
                  )}
               </AnimatePresence>
            </div>
            
            {/* BIOS Footer */}
            <div className="bg-blue-900 p-3 text-[8px] text-white/40 flex justify-between uppercase italic font-bold">
               <span>[+/ -] Change Value</span>
               <span>[Enter] Select Device</span>
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900/30 p-6 rounded-2xl border border-gray-800">
          <Link 
            to="/academy/stage-2/modul-2/intro"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            « SEBELUMNYA
          </Link>
          
          <Link 
            to="/academy/stage-2/modul-2/troubleshooting"
            className="flex items-center gap-3 bg-blue-500/10 border border-blue-500/50 text-blue-400 px-8 py-3 rounded-sm font-black transition-all group overflow-hidden relative shadow-[0_0_30px_rgba(59,130,246,0.1)] hover:bg-blue-500 hover:text-white"
          >
            <div className="absolute inset-0 bg-blue-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
            <span className="relative z-10 flex items-center gap-2 uppercase tracking-[0.2em] text-[10px]">
              LANJUT: TROUBLESHOOTING <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProsesBooting;
