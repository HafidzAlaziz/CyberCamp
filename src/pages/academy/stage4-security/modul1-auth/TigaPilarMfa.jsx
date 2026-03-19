import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, ShieldAlert, Key, Smartphone, Fingerprint, Lock, Info, CheckCircle2, XCircle, ChevronRight, ChevronLeft, LayoutGrid } from 'lucide-react';

const TigaPilarMfa = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', msg: '' }

  const items = [
    { id: 'password', label: 'Password', icon: Key, factor: 'KNOW' },
    { id: 'pin', label: 'PIN Rahasia', icon: Lock, factor: 'KNOW' },
    { id: 'otp', label: 'HP / OTP', icon: Smartphone, factor: 'HAVE' },
    { id: 'sidik', label: 'Sidik Jari', icon: Fingerprint, factor: 'ARE' },
  ];

  const toggleItem = (item) => {
    if (selectedItems.find(i => i.id === item.id)) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
      setFeedback(null);
    } else if (selectedItems.length < 2) {
      setSelectedItems([...selectedItems, item]);
      setFeedback(null);
    }
  };

  const checkMfa = () => {
    if (selectedItems.length < 2) return;

    const factors = new Set(selectedItems.map(i => i.factor));
    if (factors.size === 1) {
      setFeedback({
        type: 'error',
        msg: `Salah Bos! Itu sama-sama faktor ${selectedItems[0].factor}. Gampang dijebol hacker karena sumbernya cuma satu!`
      });
    } else {
      setFeedback({
        type: 'success',
        msg: "Mantap! Ini baru MFA yang solid! Hacker butuh sesuatu yang lo TAU sekaligus sesuatu yang lo PUNYA/ADALAH buat membobolnya."
      });
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
            <ShieldCheck className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 4: Security Skills</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              MODUL 1: Authentication Basics
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
                Tiga Pilar <br/>
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }}>Autentikasi</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Biar satpam klub malam nggak ketipu, dia harus nanya hal-hal yang beda jenisnya. Di Cybersecurity, kita punya 3 faktor:
              </p>
            </section>

            <div className="space-y-4">
              <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl group hover:border-cyan-500/50 transition-all">
                <h3 className="text-cyan-400 font-black mb-1 flex items-center gap-2 uppercase text-xs italic">
                  1. Something you KNOW
                </h3>
                <p className="text-xs text-gray-500 italic">"Sesuatu yang lo tahu". Contoh: Password, PIN, Rahasia masa kecil lo.</p>
              </div>
              <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl group hover:border-blue-500/50 transition-all">
                <h3 className="text-blue-400 font-black mb-1 flex items-center gap-2 uppercase text-xs italic">
                  2. Something you HAVE
                </h3>
                <p className="text-xs text-gray-500 italic">"Sesuatu yang lo punya". Contoh: Smartphone (buat dapet OTP), Token USB, Smartcard.</p>
              </div>
              <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl group hover:border-purple-500/50 transition-all">
                <h3 className="text-purple-400 font-black mb-1 flex items-center gap-2 uppercase text-xs italic">
                  3. Something you ARE
                </h3>
                <p className="text-xs text-gray-500 italic">"Sesuatu yang ada di diri lo". Contoh: Sidik jari, Scan muka (Face ID), Retina mata.</p>
              </div>
            </div>

            <p className="bg-red-500/10 border-l-4 border-red-500 p-4 text-xs italic text-gray-400">
              <Info className="w-4 h-4 text-red-500 mb-2" />
              "Ingat Bos: MFA yang bener itu gabungin faktor yang BERBEDA. Pasang 2 password itu bukan MFA, itu cuma bikin lo dua kali lebih cape ngetik doang!"
            </p>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12 h-fit">
            <div className="p-8 bg-gray-900/50 border-2 border-cyan-500/30 rounded-3xl backdrop-blur-sm relative overflow-hidden min-h-[550px] flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-3 italic">
                  <ShieldCheck className="w-8 h-8 text-cyan-500" /> RAKIT MFA LO SENDIRI
                </h2>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black italic mb-8">Pilih 2 jenis senjata pertahanan:</p>

                <div className="grid grid-cols-2 gap-4 mb-12">
                  {items.map((item) => {
                    const Icon = item.icon;
                    const isSelected = selectedItems.find(i => i.id === item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleItem(item)}
                        className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 font-black group ${isSelected ? 'border-cyan-500 bg-cyan-500/10 scale-105' : 'border-gray-800 bg-black/40 hover:border-gray-600'}`}
                      >
                        <Icon className={`w-10 h-10 ${isSelected ? 'text-cyan-400 shadow-[0_0_15px_#00ffff]' : 'text-gray-600 group-hover:text-gray-400'}`} />
                        <span className={`text-[10px] tracking-widest ${isSelected ? 'text-white' : 'text-gray-600'}`}>{item.label}</span>
                        <span className={`text-[8px] italic px-2 py-0.5 rounded ${item.factor === 'KNOW' ? 'bg-cyan-900/40 text-cyan-500' : item.factor === 'HAVE' ? 'bg-blue-900/40 text-blue-500' : 'bg-purple-900/40 text-purple-500'}`}>
                          {item.factor}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Slots */}
                <div className="flex justify-center gap-4 mb-8">
                  {[0, 1].map(i => {
                    const SlotItem = selectedItems[i];
                    const SlotIcon = SlotItem?.icon;
                    return (
                      <div key={i} className="w-20 h-28 border-2 border-dashed border-gray-800 rounded-2xl flex items-center justify-center bg-black/20">
                        {SlotItem ? (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                            <SlotIcon className="w-8 h-8 text-cyan-400" />
                          </motion.div>
                        ) : (
                          <span className="text-[10px] text-gray-800 font-black italic">Slot {i+1}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <AnimatePresence>
                  {feedback && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={`p-4 rounded-xl flex items-start gap-3 mb-4 border ${feedback.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-red-500/10 border-red-500/50'}`}
                    >
                      {feedback.type === 'success' ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-500 shrink-0" />
                      )}
                      <p className={`text-xs italic leading-tight ${feedback.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                        {feedback.msg}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button 
                  onClick={checkMfa}
                  disabled={selectedItems.length < 2}
                  className={`w-full py-4 font-black transition-all flex items-center justify-center gap-3 uppercase italic text-xs tracking-[0.2em] skew-x-[-12deg] ${selectedItems.length < 2 ? 'bg-gray-800 text-gray-600 border-2 border-gray-700 cursor-not-allowed' : 'bg-cyan-600 hover:bg-white hover:text-cyan-600 border-2 border-cyan-600 text-white shadow-[0_0_20px_#00ffff44]'}`}
                >
                  Uji Kekuatan MFA lo ⚡
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link 
            to="/academy/stage-4/modul-1/intro"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « KEMBALI KE INTRO AUTH
          </Link>
          
          <Link 
            to="/academy/stage-4/modul-1/sso"
            className="flex items-center gap-3 bg-cyan-600 hover:bg-white text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
          >
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest leading-none uppercase">
              LANJUT KE KEAJAIBAN SSO » <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TigaPilarMfa;
