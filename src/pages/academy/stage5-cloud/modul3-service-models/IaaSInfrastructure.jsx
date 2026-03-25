import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Server, ChevronRight, ChevronLeft, ShieldAlert, HardDrive, Terminal, CheckCircle2, Cpu } from 'lucide-react';

const installLines = [
  '> Initializing Virtual Machine...',
  '> Allocating CPU cores: 4 vCPU',
  '> Allocating RAM: 8GB',
  '> Partitioning disk...',
  '> Mounting ISO image...',
  '> Installing kernel modules...',
  '> Configuring network interfaces...',
  '> Setting up firewall rules...',
  '> Booting system...',
  '> System ready. Login as root.',
];

const IaaSInfrastructure = () => {
  const [os, setOs] = useState('ubuntu');
  const [storage, setStorage] = useState('10');
  const [buildState, setBuildState] = useState('idle'); // idle, building, done
  const [logLines, setLogLines] = useState([]);

  const handleBuild = () => {
    setBuildState('building');
    setLogLines([]);
    installLines.forEach((line, i) => {
      setTimeout(() => {
        setLogLines(prev => [...prev, line]);
        if (i === installLines.length - 1) setBuildState('done');
      }, i * 350);
    });
  };

  const handleReset = () => {
    setBuildState('idle');
    setLogLines([]);
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
            <Server className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 5 · Modul 3: Service Models</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">IaaS: Infrastructure</h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Left Column */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <section>
              <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-4 leading-tight">
                Nyewa <br />
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6,182,212,0.5)' }}>DAPUR DOANG</span>
              </h1>
              <p className="text-gray-400 leading-relaxed">
                <span className="text-white font-bold">IaaS (Infrastructure as a Service)</span> itu ibarat lo nyewa dapur restoran—kompor, oven, kulkas tersedia. Tapi lo yang harus masaknya sendiri dari nol!
              </p>
            </section>

            <div className="space-y-5 text-sm leading-relaxed text-gray-400">
              <p>
                Di dunia Cloud, IaaS berarti lo nyewa <span className="text-white font-bold italic">Virtual Machine</span> yang masih kosong polos. Lo bebas pilih OS (Linux atau Windows), install database apa, konfigurasi firewall gimana. Lo yang jadi bos penuh!
              </p>
              <p>
                Contohnya: <span className="text-cyan-400 font-bold">Amazon EC2</span>, Google Compute Engine, Azure Virtual Machines. Dipakai startup techy yang timnya punya skill teknis tinggi.
              </p>

              <div className="p-5 bg-gray-900 border border-gray-700 rounded-xl">
                <p className="text-white font-bold mb-1">🍕 Analogi Pizza:</p>
                <p>Kayak lo nyewa dapur + beli bahan mentah. Lo masak pizza dari nol sendiri. Bebas mau bikin pizza apa aja, tapi semua pekerjaan ya lo yang tanggung sendiri.</p>
              </div>

              <div className="p-6 bg-cyan-900/10 border border-cyan-500/30 rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldAlert className="w-5 h-5 text-cyan-400" />
                  <p className="text-white font-black italic uppercase tracking-widest text-[10px]">Konteks Hacker:</p>
                </div>
                <p className="italic text-gray-400 text-xs leading-relaxed">
                  "Karena lo yang pegang kendali OS, kalau lo males update <span className="text-red-400 font-bold">security patch</span>-nya, hacker bisa masuk lewat celah OS yang usang. Tanggung jawab keamanan <span className="text-red-400 font-bold">80% ada di tangan lo!</span> Provider cuma jamin hardware fisiknya doang."
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="sticky top-12">
            <div className="p-8 border-2 border-cyan-500/30 rounded-xl bg-gray-900/50 min-h-[520px] flex flex-col shadow-2xl">
              <div className="mb-6 text-center">
                <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">SIMULASI: RAKIT SERVER IaaS</h2>
                <p className="text-[9px] text-cyan-500 font-bold tracking-[0.2em] mt-1">VIRTUAL_MACHINE_BUILDER</p>
              </div>

              <div className="flex-1 flex flex-col gap-5">
                {/* Config Panel */}
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold flex items-center gap-2">
                      <Cpu className="w-3 h-3" /> Pilih OS
                    </label>
                    <select
                      value={os}
                      onChange={e => setOs(e.target.value)}
                      disabled={buildState !== 'idle'}
                      className="w-full bg-black/60 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm font-bold focus:border-cyan-500 focus:outline-none transition-all disabled:opacity-50"
                    >
                      <option value="ubuntu">Ubuntu 22.04 LTS (Linux)</option>
                      <option value="windows">Windows Server 2022</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold flex items-center gap-2">
                      <HardDrive className="w-3 h-3" /> Pilih Storage
                    </label>
                    <select
                      value={storage}
                      onChange={e => setStorage(e.target.value)}
                      disabled={buildState !== 'idle'}
                      className="w-full bg-black/60 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm font-bold focus:border-cyan-500 focus:outline-none transition-all disabled:opacity-50"
                    >
                      <option value="10">10 GB SSD (Hemat)</option>
                      <option value="100">100 GB SSD (Recommended)</option>
                    </select>
                  </div>
                </div>

                {/* Terminal Output */}
                <div className="flex-1 bg-black rounded-xl border border-gray-800 p-4 overflow-y-auto max-h-48 min-h-32">
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-800">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <span className="text-[9px] text-gray-600 ml-2 uppercase tracking-widest">terminal — {os}@iaas-vm</span>
                  </div>
                  {buildState === 'idle' && (
                    <p className="text-gray-700 text-xs italic">Pilih konfigurasi lalu klik Build VM...</p>
                  )}
                  <AnimatePresence>
                    {logLines.map((line, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`text-xs leading-relaxed ${line.includes('ready') ? 'text-cyan-400 font-bold' : 'text-green-400'}`}
                      >
                        {line}
                      </motion.p>
                    ))}
                  </AnimatePresence>
                  {buildState === 'building' && (
                    <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1" />
                  )}
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  {buildState === 'done' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 p-3 bg-cyan-900/20 border border-cyan-500/40 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      <p className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider">Server kosong siap! Sekarang lo harus instal semuanya sendiri dari nol.</p>
                    </motion.div>
                  )}
                  {buildState === 'idle' ? (
                    <button onClick={handleBuild} className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2">
                      <Terminal className="w-4 h-4" /> Build VM
                    </button>
                  ) : buildState === 'done' ? (
                    <button onClick={handleReset} className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-gray-400 font-black text-xs uppercase tracking-widest rounded-xl transition-all border border-gray-700">
                      Reset Simulasi
                    </button>
                  ) : (
                    <div className="w-full py-4 bg-gray-800 text-gray-500 font-black text-xs uppercase tracking-widest rounded-xl text-center animate-pulse">
                      Installing...
                    </div>
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
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « KEMBALI KE HQ
          </Link>
          <Link
            to="/academy/stage-5/modul-3/paas"
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

export default IaaSInfrastructure;
