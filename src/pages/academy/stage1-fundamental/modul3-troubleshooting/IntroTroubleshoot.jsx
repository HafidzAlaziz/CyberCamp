import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Terminal, Activity, RefreshCw, ChevronRight, AlertTriangle, ShieldAlert } from 'lucide-react';

const IntroTroubleshoot = () => {
  const [status, setStatus] = useState('FAILED');
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handlePing = () => {
    setLoading(true);
    setAttempts(prev => prev + 1);
    
    setTimeout(() => {
      setLoading(false);
      setStatus('FAILED');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Standardized Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-10 border-b border-red-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <ShieldAlert className="w-8 h-8 text-red-500" />
          </div>
          <div>
            <h1 className="text-sm text-red-500 tracking-[0.3em] uppercase font-black">Stage 1: Fundamentals</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              MODUL 3: TROUBLESHOOTING
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
            <h3 className="text-2xl font-bold text-red-400 mb-6 italic tracking-tight">Apa sih Troubleshooting itu? 🛠️</h3>
            <div className="space-y-4 text-base leading-relaxed text-gray-400">
              <p>
                Pernah nggak lo lagi asik ngenet, eh tiba-tiba WiFi putus? Atau pas mau buka aplikasi, malah muncul layar error gak jelas?
              </p>
              <p>
                Orang biasa pasti langsung panik, mati-nyalain router berkali-kali, atau pasrah nungguin teknisi. Tapi kalau seorang Hacker atau anak IT? <span className="text-white font-bold italic">Mereka chill aja</span>. Mereka bakal nyari tau: 'Ini yang mati internet dari pusatnya, kabelnya yang putus, atau emang laptop gue yang error?'
              </p>
              <p>
                Skill buat nyari akar masalah ini namanya <span className="text-red-500 font-bold">Troubleshooting</span>. 
              </p>
              <p className="bg-red-500/5 border-l-2 border-red-500 p-4 italic text-sm">
                Di dunia Cybersecurity, skill ini wajib banget hukumnya. Kalau nanti lo lagi ngetes keamanan suatu sistem terus koneksinya gagal, lo harus tau cara ngelacak di mana salahnya. Jangan cuma asal pencet tombol berkali-kali nungguin keajaiban dateng!
              </p>
            </div>
          </motion.div>

          {/* Interactive Simulation: Server Status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-black border border-gray-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden group"
          >
            {/* Terminal Top Bar */}
            <div className="flex items-center gap-2 mb-6 border-b border-gray-900 pb-4">
               <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
               <div className="w-3 h-3 rounded-full bg-gray-700"></div>
               <div className="ml-2 text-[10px] text-gray-600 font-bold tracking-widest uppercase">system_monitor // node_01</div>
            </div>

            <div className="space-y-6 text-center">
               <div className={`py-8 rounded-xl border-2 transition-all duration-500 flex flex-col items-center gap-4 ${status === 'FAILED' ? 'border-red-500/50 bg-red-500/5 shadow-[0_0_30px_rgba(239,68,68,0.1)]' : 'border-emerald-500/50 bg-emerald-500/5'}`}>
                  <div className="relative">
                    <Activity className={`w-12 h-12 ${status === 'FAILED' ? 'text-red-500' : 'text-emerald-500'} ${loading ? 'animate-ping' : ''}`} />
                    {loading && <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black tracking-widest text-white">SCAN</div>}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-500">Service_Status:</div>
                    <div className={`text-2xl font-black tracking-tighter ${status === 'FAILED' ? 'text-red-500' : 'text-emerald-500'}`}>
                      {status === 'FAILED' ? 'CONNECTION_FAILED' : 'CONNECTED'}
                    </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <button 
                    onClick={handlePing}
                    disabled={loading}
                    className="w-full py-4 bg-red-500 hover:bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] transition-all flex items-center justify-center gap-2 group disabled:opacity-30"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                    {loading ? 'RETRIEVING...' : 'PING ULANG'}
                  </button>
                  
                  {attempts > 0 && !loading && (
                    <motion.p 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className={`text-[10px] font-bold italic ${attempts > 3 ? 'text-red-400' : 'text-gray-600'}`}
                    >
                      {attempts > 3 
                        ? "⚠️ Udah dibilangin kan? Mencet berkali-kali nggak bakal nyelesein masalah." 
                        : `Percobaan: ${attempts}x`}
                    </motion.p>
                  )}
               </div>

               <div className="p-3 bg-red-900/10 border border-red-900/20 rounded text-[9px] text-red-400 font-bold tracking-tighter leading-tight italic">
                  PESAN MORAL: Mencet tombol berkali-kali nggak menyelesaikan masalah, lo butuh metodologi buat nyari tau "dimana" letak rusaknya.
               </div>
            </div>

            {/* Matrix Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,rgba(239,68,68,0.05),transparent)] rounded-full -translate-y-1/2 translate-x-1/2"></div>
          </motion.div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-end mt-12 pt-8 border-t border-gray-900">
          <Link 
            to="/academy/stage-1/modul-3/isolasi-masalah"
            className="flex items-center gap-3 bg-red-500 hover:bg-white text-black px-10 py-5 rounded-sm font-black transition-all group overflow-hidden relative skew-x-[-12deg]"
          >
            <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
            <span className="relative z-10 skew-x-[12deg] flex items-center gap-2 uppercase tracking-tighter">
               GAS: ISOLASI MASALAH <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IntroTroubleshoot;
