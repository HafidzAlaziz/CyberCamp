import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Award, Cloud, Server, Monitor } from 'lucide-react';

const KesimpulanTrinitas = () => {
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
            <Award className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 5 · Modul 3: Service Models</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">KESIMPULAN: TRINITAS CLOUD</h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center min-h-[60vh]">

          {/* Left Column: Recap */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <section>
              <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-4 leading-tight">
                Rekap: <br />
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6,182,212,0.5)' }}>IaaS vs PaaS vs SaaS</span>
              </h1>
              <p className="text-gray-400 leading-relaxed">
                Intinya sederhana: makin ke kanan, makin santai lo—tapi juga makin dikit kendali lo.
              </p>
            </section>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-4 p-4 bg-gray-900 border border-gray-800 rounded-xl">
                <Server className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-bold">IaaS → Nyewa dapur</p>
                  <p className="text-gray-500 text-xs mt-1">Bebas ngatur sebebas-bebasnya, tapi semua tanggung jawab ada di lo. Cocok buat developer teknikal.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-900 border border-gray-800 rounded-xl">
                <Cloud className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-bold">PaaS → Delivery pizza</p>
                  <p className="text-gray-500 text-xs mt-1">Gak perlu urus infrastruktur. Fokus aja nge-kode. Amanin kode dari bug dan celah keamanan.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-900 border border-gray-800 rounded-xl">
                <Monitor className="w-6 h-6 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-bold">SaaS → Makan di restoran</p>
                  <p className="text-gray-500 text-xs mt-1">Terima beres 100%. Tanggung jawab lo cuma jaga akun dan password dari phishing. Jangan asal klik link!</p>
                </div>
              </div>

              <div className="p-6 bg-cyan-900/10 border-l-4 border-cyan-500 rounded-r-xl">
                <p className="text-gray-300 text-xs leading-relaxed italic font-bold">
                  "Sebagai ahli Cybersecurity, lo harus tau dengan tepat di mana garis batas tanggung jawab lo (<span className="text-cyan-400">Shared Responsibility Model</span>) di tiap model ini. Salah posisi = salah jaga = dibobol."
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center p-8"
          >
            <div className="relative w-full max-w-sm aspect-square flex flex-col items-center justify-center border-4 border-cyan-500/30 rounded-full bg-gray-900/80 shadow-[0_0_60px_rgba(6,182,212,0.2)] hover:shadow-[0_0_100px_rgba(6,182,212,0.35)] hover:border-cyan-400 transition-all duration-700 overflow-hidden">

              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/20 via-transparent to-purple-900/10 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 blur-3xl rounded-full" />

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 flex flex-col items-center gap-4 text-center px-6"
              >
                {/* Pizza-Cloud Stack Icon */}
                <div className="flex gap-1 mb-2">
                  <div className="w-10 h-10 bg-blue-900/60 border border-blue-500/50 rounded-lg flex items-center justify-center text-blue-400 text-xs font-black">IaaS</div>
                  <div className="w-10 h-10 bg-cyan-900/60 border border-cyan-500/50 rounded-lg flex items-center justify-center text-cyan-400 text-xs font-black">PaaS</div>
                  <div className="w-10 h-10 bg-purple-900/60 border border-purple-500/50 rounded-lg flex items-center justify-center text-purple-400 text-xs font-black">SaaS</div>
                </div>

                <div className="space-y-1">
                  <p className="text-cyan-400 font-bold text-[10px] tracking-[0.3em] uppercase">Status Keahlian</p>
                  <p
                    className="text-white font-black text-xl italic tracking-tighter uppercase"
                    style={{ textShadow: '0 0 15px rgba(6,182,212,0.9)' }}
                  >
                    CLOUD SERVICE EXPERT
                  </p>
                  <div className="inline-block px-4 py-1 bg-cyan-500/20 text-cyan-300 text-[10px] font-black tracking-widest border border-cyan-500/40 rounded-full">
                    CLEARED ✓
                  </div>
                </div>
              </motion.div>

              {/* Orbit ring decoration */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-4 rounded-full border border-dashed border-cyan-500/10 pointer-events-none"
              />
            </div>
          </motion.div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link
            to="/academy/stage-5/modul-3/saas"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « SEBELUMNYA
          </Link>
          <Link
            to="/academy"
            state={{ expandedId: 'cloud-skills' }}
            className="flex items-center gap-3 bg-cyan-600 hover:bg-cyan-500 text-white hover:text-black px-8 py-4 text-xs font-black transition-all rounded-sm skew-x-[-12deg]"
          >
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest uppercase">
              KEMBALI KE HQ » <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default KesimpulanTrinitas;
