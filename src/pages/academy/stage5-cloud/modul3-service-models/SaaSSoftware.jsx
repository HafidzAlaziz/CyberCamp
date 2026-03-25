import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ShieldAlert, Mail, Star, Inbox, Send, Trash2, Archive, Lock, Crown, Zap } from 'lucide-react';

const emails = [
  { from: 'boss@company.com', subject: 'Meeting besok jam 9', time: '08:12', read: true },
  { from: 'noreply@github.com', subject: '[Alert] New login detected', time: '07:45', read: false },
  { from: 'newsletter@medium.com', subject: 'Top 10 React Tips 2025', time: '06:30', read: true },
  { from: 'admin@cybercamp.id', subject: 'Selamat! Kamu lulus Stage 4!', time: 'Kemarin', read: false },
];

const SaaSSoftware = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [selected, setSelected] = useState(null);

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
            <Mail className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 5 · Modul 3: Service Models</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">SaaS: Software</h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Left Column */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <section>
              <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-4 leading-tight">
                Makan di <br />
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6,182,212,0.5)' }}>RESTORAN BERES</span>
              </h1>
              <p className="text-gray-400 leading-relaxed">
                <span className="text-white font-bold">SaaS (Software as a Service)</span> itu kayak makan di restoran mewah. Lo tinggal duduk, pesen, makan. Urusan dapur, chef, piring kotor? Bukan urusan lo sama sekali!
              </p>
            </section>

            <div className="space-y-5 text-sm leading-relaxed text-gray-400">
              <p>
                SaaS adalah model yang paling lo sering pakai sehari-hari tanpa sadar. <span className="text-white font-bold italic">Gmail, Spotify, Netflix, Zoom, Figma, Google Docs</span>... semua itu SaaS! Lo tinggal buka browser, login, langsung bisa dipake. Gak perlu install apa-apa, gak perlu beli server.
              </p>

              <div className="p-5 bg-gray-900 border border-gray-700 rounded-xl">
                <p className="text-white font-bold mb-1">🍕 Analogi Pizza:</p>
                <p>Lo makan di restoran pizza. Lo cuma perlu duduk, pesen, bayar, makan. Gak ada urusan sama dapur, bahan, atau cuci piring. Terima beres!</p>
              </div>

              <div className="p-6 bg-red-900/10 border border-red-500/30 rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldAlert className="w-5 h-5 text-red-500" />
                  <p className="text-white font-black italic uppercase tracking-widest text-[10px]">Konteks Hacker:</p>
                </div>
                <p className="italic text-gray-400 text-xs leading-relaxed">
                  "Di SaaS, keamanan teknis 99% diurus provider. Target hacker bukan servernya, tapi <span className="text-red-400 font-bold">AKUN LO!</span> Mereka bakal neror lewat <span className="text-red-400 font-bold">Phishing</span>—kirim email palsu biar lo kasih password. Sekali dapet, data lo habis digeledah."
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="sticky top-12">
            <div className="p-8 border-2 border-cyan-500/30 rounded-xl bg-gray-900/50 min-h-[520px] flex flex-col shadow-2xl">
              <div className="mb-6 text-center">
                <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">SIMULASI: SAAS DASHBOARD</h2>
                <p className="text-[9px] text-cyan-500 font-bold tracking-[0.2em] mt-1">USER_EXPERIENCE_DEMO</p>
              </div>

              {/* Fake Email UI */}
              <div className={`flex-1 flex flex-col rounded-xl overflow-hidden border transition-all duration-500 ${isPremium ? 'border-yellow-500/50 bg-gradient-to-b from-yellow-950/20 to-gray-900' : 'border-gray-800 bg-gray-950'}`}>
                {/* Topbar */}
                <div className={`flex items-center justify-between px-4 py-3 border-b transition-all duration-500 ${isPremium ? 'border-yellow-500/30 bg-yellow-900/10' : 'border-gray-800'}`}>
                  <div className="flex items-center gap-2">
                    {isPremium ? <Crown className="w-4 h-4 text-yellow-400" /> : <Mail className="w-4 h-4 text-gray-500" />}
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isPremium ? 'text-yellow-400' : 'text-gray-500'}`}>
                      CyberMail {isPremium ? '● PREMIUM' : 'Free'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-[10px]">
                    <span className="hidden sm:inline">No server. No install. Just works.</span>
                  </div>
                </div>

                {/* Sidebar + Content */}
                <div className="flex flex-1 min-h-0">
                  {/* Sidebar */}
                  <div className={`w-16 flex flex-col items-center py-4 gap-4 border-r transition-all duration-300 ${isPremium ? 'border-yellow-500/20' : 'border-gray-800'}`}>
                    {[Inbox, Send, Star, Archive, Trash2].map((Icon, i) => (
                      <button key={i} onClick={() => setSelected(null)} className={`p-2 rounded-lg transition-all ${i === 0 ? (isPremium ? 'text-yellow-400 bg-yellow-900/30' : 'text-cyan-400 bg-cyan-900/20') : 'text-gray-600 hover:text-gray-400'}`}>
                        <Icon className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                  {/* Email List */}
                  <div className="flex-1 flex flex-col overflow-y-auto">
                    {emails.map((email, i) => (
                      <button
                        key={i}
                        onClick={() => setSelected(selected === i ? null : i)}
                        className={`px-3 py-3 text-left border-b border-gray-800/50 transition-all hover:bg-white/5 ${selected === i ? 'bg-cyan-900/20' : ''}`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className={`text-[10px] font-bold truncate ${email.read ? 'text-gray-500' : 'text-white'}`}>{email.from}</span>
                          <span className="text-[9px] text-gray-600 flex-shrink-0 ml-2">{email.time}</span>
                        </div>
                        <p className={`text-[9px] truncate ${email.read ? 'text-gray-600' : 'text-gray-400 font-bold'}`}>{email.subject}</p>
                        {!email.read && <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1" />}
                      </button>
                    ))}
                    {!isPremium && (
                      <div className="flex items-center justify-center p-4 gap-2 text-gray-700 text-[10px] italic border-t border-gray-800">
                        <Lock className="w-3 h-3" /> Upgrade untuk storage unlimited
                      </div>
                    )}
                    {isPremium && (
                      <div className="flex items-center justify-center p-4 gap-2 text-yellow-600 text-[10px] font-bold border-t border-yellow-500/20">
                        <Zap className="w-3 h-3" /> Storage Unlimited Aktif!
                      </div>
                    )}
                  </div>
                </div>

                {/* Premium Toggle */}
                <div className="p-4 border-t border-gray-800">
                  <button
                    onClick={() => setIsPremium(!isPremium)}
                    className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${isPremium ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 hover:bg-yellow-500/30' : 'bg-cyan-600 hover:bg-cyan-500 text-white'}`}
                  >
                    <Crown className="w-4 h-4" />
                    {isPremium ? '✓ Premium Aktif' : 'Aktifkan Fitur Premium'}
                  </button>
                  <p className="text-center text-[9px] text-gray-600 mt-3 italic">
                    "User cuma tau beres. Gak perlu tau di belakangnya pake server berapa biji."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link
            to="/academy/stage-5/modul-3/paas"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « SEBELUMNYA
          </Link>
          <Link
            to="/academy/stage-5/modul-3/kesimpulan"
            className="flex items-center gap-3 bg-cyan-600 hover:bg-cyan-500 text-white hover:text-black px-8 py-4 text-xs font-black transition-all rounded-sm skew-x-[-12deg]"
          >
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest uppercase">
              SELANJUTNYA » <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SaaSSoftware;
