import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ShieldAlert, Code2, Cpu, Scissors, Power, PlayCircle, TerminalSquare } from 'lucide-react';

const IntroPythonGo = () => {
  const [selectedWeapon, setSelectedWeapon] = useState(null);

  const weapons = [
    {
      id: 'python',
      name: 'Python',
      icon: <Scissors className="w-8 h-8" />,
      title: 'Pisau Lipat Serbaguna',
      desc: 'Pisau lipat siap! Nulis kode 5 baris doang udah bisa nyolong data.',
      colors: {
        border: 'border-green-500',
        bg: 'bg-green-900/30',
        text: 'text-green-400',
        shadow: 'shadow-[0_0_20px_rgba(34,197,94,0.4)]'
      }
    },
    {
      id: 'go',
      name: 'Go (Golang)',
      icon: <Cpu className="w-8 h-8" />,
      title: 'Gergaji Mesin',
      desc: 'Brumm! Gergaji mesin siap! Scan 10.000 target dalam 1 detik.',
      colors: {
        border: 'border-cyan-500',
        bg: 'bg-cyan-900/30',
        text: 'text-cyan-400',
        shadow: 'shadow-[0_0_20px_rgba(6,182,212,0.4)]'
      }
    }
  ];

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
            <TerminalSquare className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 6 · Modul 1: Programming</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              INTRO: PYTHON & GO
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
                Kenapa Hacker <br/>
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }}>Butuh Koding?</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Karena <span className="text-white font-bold underline decoration-cyan-500 underline-offset-4">tools bajakan dan script kiddie tools</span> kadang gak mempan nembus sistem modern!
              </p>
            </section>

            <div className="space-y-6 text-sm leading-relaxed text-gray-400">
               <p>
                 Kalo lo cuma ngandelin tool buatan orang lain, lo gak bakal jauh beda sama amatiran. Tapi kalau lo bisa koding? Lo bisa bikin <span className="text-cyan-400 font-bold">senjata lo sendiri</span> yang anti-mainstream dan belum ada penangkalnya!
               </p>
               
               <p className="mb-2">Dua bahasa koding paling trending di dunia Cybersecurity saat ini:</p>
               <ul className="space-y-3">
                 <li className="p-3 bg-green-950/20 border border-green-500/30 rounded-xl">
                   <strong className="text-green-400 flex items-center gap-2 mb-1"><Code2 className="w-4 h-4"/> Python</strong> 
                   Bagaikan pisau lipat. Cocok banget buat bikin script jebolan sekilas. 5 menit ngetik kelar!
                 </li>
                 <li className="p-3 bg-cyan-950/20 border border-cyan-500/30 rounded-xl">
                   <strong className="text-cyan-400 flex items-center gap-2 mb-1"><Power className="w-4 h-4"/> Go (Golang)</strong> 
                   Bagaikan gergaji mesin. Cocok buat bikin senjata pemusnah massal kayak Ransomware yang butuh kecepatan tinggi nembus ribuan jaringan sekaligus!
                 </li>
               </ul>

               <div className="p-6 bg-cyan-900/10 border border-cyan-500/30 rounded-2xl relative overflow-hidden group mt-8">
                  <div className="flex items-center gap-3 mb-4">
                     <ShieldAlert className="w-5 h-5 text-cyan-400" />
                     <p className="text-white font-black italic uppercase tracking-widest text-[10px]">Konteks Hacker:</p>
                  </div>
                  <p className="italic text-gray-400 text-xs leading-relaxed">
                    "Hacker sejati nulis kode Python buat nyoba-nyoba serangan dadakan (PoC / Proof of Concept), trus kalau serangannya udah fix ampuh, kodenya ditulis ulang pake Go biar eksekusinya kilat dan susah dilacak Antivirus!"
                  </p>
               </div>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12">
            <div className="p-8 border-2 border-cyan-500/30 rounded-xl bg-gray-900/50 relative overflow-hidden flex flex-col shadow-2xl transition-colors duration-500 min-h-[400px]">
              
              <div className="mb-8 text-center relative z-10 flex flex-col items-center">
                 <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">SIMULASI: PILIH SENJATAMU</h2>
                 <p className="text-[9px] text-cyan-500 font-bold tracking-[0.2em] mt-1">EQUIPMENT_SELECTION</p>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center space-y-6 relative z-10 w-full">
                 
                 {/* Weapon Selection Buttons */}
                 <div className="grid grid-cols-2 gap-4 w-full h-32">
                   {weapons.map((weapon) => (
                     <button
                       key={weapon.id}
                       onClick={() => setSelectedWeapon(weapon.id)}
                       className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 ${selectedWeapon === weapon.id ? `${weapon.colors.border} ${weapon.colors.bg} ${weapon.colors.shadow} scale-105 z-10` : 'border-gray-700 bg-black/40 text-gray-500 hover:border-gray-500'}`}
                     >
                       <div className={`${selectedWeapon === weapon.id ? weapon.colors.text : ''} mb-3`}>{weapon.icon}</div>
                       <span className={`text-xs font-bold uppercase tracking-widest ${selectedWeapon === weapon.id ? 'text-white' : ''}`}>{weapon.name}</span>
                     </button>
                   ))}
                 </div>

                 {/* Information Display */}
                 <div className="w-full min-h-[10rem] bg-black/50 border border-cyan-500/30 rounded-xl p-6 relative overflow-hidden mt-6 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                       {!selectedWeapon ? (
                         <motion.div 
                           key="empty"
                           initial={{ opacity: 0 }} 
                           animate={{ opacity: 1 }} 
                           exit={{ opacity: 0 }}
                           className="flex flex-col items-center justify-center text-gray-600 gap-3"
                         >
                           <PlayCircle className="w-8 h-8 animate-pulse" />
                           <p className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-center">Klik bahasa untuk melihat stats</p>
                         </motion.div>
                       ) : (
                         <motion.div 
                           key={selectedWeapon}
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -10 }}
                           className="text-center space-y-4"
                         >
                           {weapons.map(w => w.id === selectedWeapon && (
                             <div key={w.id} className="flex flex-col items-center gap-3">
                                <div className={`p-4 rounded-full bg-gray-900 border-2 ${w.colors.border} ${w.colors.text}`}>
                                  {w.icon}
                                </div>
                                <h3 className={`text-lg font-black italic uppercase tracking-widest ${w.colors.text}`}>{w.title}</h3>
                                <p className="text-gray-300 text-sm italic border-t border-gray-800 pt-3 text-center">"{w.desc}"</p>
                             </div>
                           ))}
                         </motion.div>
                       )}
                    </AnimatePresence>
                 </div>

              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link 
            to="/academy"
            state={{ expandedId: 'programming-skills' }}
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « KEMBALI KE HQ
          </Link>
          
          <Link 
            to="/academy/stage-6/modul-1/python-swiss"
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

export default IntroPythonGo;
