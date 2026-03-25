import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ShieldAlert, UploadCloud, CheckCircle2, Code2, Layers, Rocket } from 'lucide-react';

const deploySteps = [
  { label: 'Uploading code...', pct: 15 },
  { label: 'Parsing dependencies...', pct: 30 },
  { label: 'Building Docker image...', pct: 50 },
  { label: 'Auto-scaling containers...', pct: 65 },
  { label: 'Configuring Database...', pct: 80 },
  { label: 'Routing traffic...', pct: 92 },
  { label: '✅  Site Live! 🚀', pct: 100 },
];

const PaaSPlatform = () => {
  const [lang, setLang] = useState('javascript');
  const [isDragging, setIsDragging] = useState(false);
  const [fileDropped, setFileDropped] = useState(false);
  const [deployStep, setDeployStep] = useState(-1);
  const [isDeployed, setIsDeployed] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setFileDropped(true);
  };

  const handleFakeDrop = () => {
    setFileDropped(true);
  };

  const handleDeploy = () => {
    if (deployStep >= 0) return;
    setDeployStep(0);
    deploySteps.forEach((_, i) => {
      setTimeout(() => {
        setDeployStep(i);
        if (i === deploySteps.length - 1) setIsDeployed(true);
      }, i * 600);
    });
  };

  const handleReset = () => {
    setFileDropped(false);
    setDeployStep(-1);
    setIsDeployed(false);
  };

  const progress = deployStep >= 0 ? deploySteps[deployStep].pct : 0;

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
            <Layers className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 5 · Modul 3: Service Models</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">PaaS: Platform</h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Left Column */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <section>
              <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-4 leading-tight">
                Tinggal <br />
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6,182,212,0.5)' }}>UPLOAD &amp; JALAN</span>
              </h1>
              <p className="text-gray-400 leading-relaxed">
                <span className="text-white font-bold">PaaS (Platform as a Service)</span> itu kayak pesan delivery pizza—lo tinggal bilang mau pizza apa, si kurir yang ngurus masak, kemas, antar. Lo fokus aja nikmatin hasilnya!
              </p>
            </section>

            <div className="space-y-5 text-sm leading-relaxed text-gray-400">
              <p>
                Di PaaS, lo gak perlu pusing install OS, konfigurasi server, atau urus jaringan. Lo cuma <span className="text-white font-bold italic">upload kode</span> (JavaScript/Python/Ruby), dan platform Cloud yang urus sisanya secara otomatis.
              </p>
              <p>
                Contohnya: <span className="text-cyan-400 font-bold">Heroku, Vercel, Google App Engine, Netlify</span>. Cocok buat developer yang pengen fokus nge-kode, bukan jadi sysadmin.
              </p>

              <div className="p-5 bg-gray-900 border border-gray-700 rounded-xl">
                <p className="text-white font-bold mb-1">🍕 Analogi Pizza:</p>
                <p>Lo pesen delivery pizza. Lo cukup tulis "mau pizza pepperoni, ukuran L". Dapurnya, bahan-bahannya, kendaraan kurirnya... bukan urusan lo.</p>
              </div>

              <div className="p-6 bg-cyan-900/10 border border-cyan-500/30 rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldAlert className="w-5 h-5 text-cyan-400" />
                  <p className="text-white font-black italic uppercase tracking-widest text-[10px]">Konteks Hacker:</p>
                </div>
                <p className="italic text-gray-400 text-xs leading-relaxed">
                  "Di PaaS, lo gak perlu khawatir sama celah OS—itu tugas provider. TAPI, kalau kode lo sendiri yang cupu dan ada <span className="text-red-400 font-bold">SQL Injection</span> atau XSS, ya tetep bisa dijebol! Fokus lo cuma satu: <span className="text-cyan-300 font-bold">amanin kode lo sendiri.</span>"
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="sticky top-12">
            <div className="p-8 border-2 border-cyan-500/30 rounded-xl bg-gray-900/50 min-h-[520px] flex flex-col shadow-2xl">
              <div className="mb-6 text-center">
                <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">SIMULASI: DEPLOY KE CLOUD</h2>
                <p className="text-[9px] text-cyan-500 font-bold tracking-[0.2em] mt-1">PAAS_DEPLOYMENT_PIPELINE</p>
              </div>

              <div className="flex-1 flex flex-col gap-5">
                {/* Language Selector */}
                <div className="flex gap-2">
                  {['javascript', 'python', 'ruby'].map(l => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`flex-1 py-2 px-3 rounded-lg border text-[10px] font-black uppercase tracking-wider transition-all ${lang === l ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-black/40 border-white/5 text-gray-500 hover:border-cyan-500/30'}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>

                {/* Drag Drop Area */}
                <div
                  onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={!fileDropped ? handleFakeDrop : undefined}
                  className={`flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-all duration-300 min-h-32 ${fileDropped ? 'border-cyan-500/50 bg-cyan-950/20' : isDragging ? 'border-cyan-400 bg-cyan-900/20 scale-[1.02]' : 'border-gray-700 hover:border-gray-600'}`}
                >
                  <AnimatePresence mode="wait">
                    {fileDropped ? (
                      <motion.div key="dropped" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-3">
                        <Code2 className="w-10 h-10 text-cyan-400" />
                        <p className="text-cyan-300 font-bold text-xs uppercase tracking-widest">app.{lang === 'javascript' ? 'js' : lang === 'python' ? 'py' : 'rb'} siap!</p>
                        <p className="text-gray-600 text-[10px]">Klik Deploy untuk lanjut</p>
                      </motion.div>
                    ) : (
                      <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-3">
                        <UploadCloud className="w-10 h-10 text-gray-600" />
                        <p className="text-gray-500 text-xs font-bold uppercase">Drag & Drop kode lo di sini</p>
                        <p className="text-gray-700 text-[10px]">atau klik area ini</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Progress */}
                {deployStep >= 0 && (
                  <div className="space-y-2">
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${isDeployed ? 'text-cyan-400' : 'text-gray-400 animate-pulse'}`}>
                      {deploySteps[deployStep]?.label}
                    </p>
                  </div>
                )}

                {isDeployed && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-cyan-900/20 border border-cyan-500/40 rounded-lg text-center">
                    <p className="text-[10px] text-cyan-300 font-bold uppercase">Gak perlu instal Linux kan? Fokus koding aja, biar Cloud yang urus mesinnya! 🎉</p>
                  </motion.div>
                )}

                {/* Action Button */}
                {!fileDropped ? (
                  <div className="w-full py-4 bg-gray-800 text-gray-600 font-black text-xs uppercase rounded-xl text-center border border-gray-700">
                    Drop File Dulu
                  </div>
                ) : !isDeployed && deployStep === -1 ? (
                  <button onClick={handleDeploy} className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2">
                    <Rocket className="w-4 h-4" /> Deploy Code
                  </button>
                ) : isDeployed ? (
                  <button onClick={handleReset} className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-gray-400 font-black text-xs uppercase tracking-widest rounded-xl transition-all border border-gray-700">
                    Reset Simulasi
                  </button>
                ) : (
                  <div className="w-full py-4 bg-gray-800 text-gray-500 font-black text-xs uppercase tracking-widest rounded-xl text-center animate-pulse">
                    Deploying...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link
            to="/academy/stage-5/modul-3/iaas"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « SEBELUMNYA
          </Link>
          <Link
            to="/academy/stage-5/modul-3/saas"
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

export default PaaSPlatform;
