import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  ChevronLeft, 
  ChevronRight,
  Home, 
  Network, 
  Smartphone, 
  Router as RouterIcon,
  Zap,
  ShieldAlert,
  MessageSquare,
  BadgeCheck,
  LayoutGrid
} from 'lucide-react';

const DhcpServer = () => {
  const [step, setStep] = useState(0); // 0 to 4
  const [ipAssigned, setIpAssigned] = useState(false);

  const steps = [
    { title: "IDLE", desc: "Smartphone belum punya alamat IP.", speaker: null, msg: "" },
    { title: "DISCOVER", desc: "HP teriak cari DHCP Server.", speaker: "phone", msg: "Discover: Ada Pak RT Jaringan gaaak??" },
    { title: "OFFER", desc: "Router denger dan nawarin IP.", speaker: "router", msg: "Offer: Ada nih, mau pake IP 192.168.1.10?" },
    { title: "REQUEST", desc: "HP setuju pake IP itu.", speaker: "phone", msg: "Request: Oke mantap, gue ambil ya IP-nya!" },
    { title: "ACK", desc: "Router kasih konfirmasi final.", speaker: "router", msg: "Ack: Deal! Resmi, itu IP lo sekarang." }
  ];

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
      if (step + 1 === 4) setIpAssigned(true);
    } else {
      setStep(0);
      setIpAssigned(false);
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
          <div className="flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/50">
              <RouterIcon className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 3: Networking</h1>
              <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
                MODUL 4: IP, MAC, DHCP & DNS
              </h2>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          
          {/* Kolom Kiri: Materi */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <section>
              <h1 className="text-5xl font-black text-white italic tracking-tighter uppercase mb-8 leading-none">
                Pak RT <br/>
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }}>Jaringan (DHCP)</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-lg">
                Bayangin lo masuk ke komplek perumahan baru. Lo butuh <span className="text-white font-bold italic underline decoration-cyan-500 underline-offset-4">Nomor Rumah</span> biar paket (data) bisa nyampe ke lo.
              </p>
            </section>

            <div className="bg-cyan-500/5 border-l-4 border-cyan-500 p-6 space-y-4 rounded-r-xl">
              <h3 className="text-white font-black flex items-center gap-2 italic uppercase tracking-tighter text-sm">
                <Zap className="w-5 h-5 text-cyan-500" /> Alamat Otomatis
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed italic">
                Capek kan kalo tiap kali ganti WiFi lo harus ngetik alamat IP manual? Makanya ada <span className="text-white">DHCP (Dynamic Host Configuration Protocol)</span>. Dia itu Pak RT yang tugasnya bagi-bagi alamat IP ke semua orang yang baru dateng.
              </p>
            </div>

            <p className="text-gray-400 leading-relaxed text-sm">
              Prosesnya ada 4 tahap yang disebut <span className="text-white font-bold italic">DORA</span>:
              <br/>
              <span className="text-cyan-400 font-black">D</span>iscover, <span className="text-cyan-400 font-black">O</span>ffer, <span className="text-cyan-400 font-black">R</span>equest, <span className="text-cyan-400 font-black">A</span>cknowledge. 
            </p>

            <div className="p-4 bg-red-500/5 border border-red-500/30 rounded-xl space-y-3">
              <h4 className="text-xs font-black text-red-500 uppercase tracking-widest italic flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" /> Resiko Cyber: Rogue DHCP
              </h4>
              <p className="text-[10px] text-gray-500 leading-relaxed italic">
                Hati-hati! Hacker bisa pura-pura jadi Pak RT (Rogue DHCP) dan kasih lo alamat IP palsu biar semua data lo lewat ke laptop dia dulu sebelum ke internet. Istilahnya <span className="text-red-400 font-bold">Man-in-the-Middle</span>.
              </p>
            </div>
          </motion.div>

          {/* Kolom Kanan: Simulasi */}
          <div className="sticky top-12 h-fit">
            <div className="p-8 bg-gray-900/50 border-2 border-cyan-500/30 rounded-3xl backdrop-blur-sm relative overflow-hidden min-h-[550px] flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3 italic">
                   <Network className="w-8 h-8 text-cyan-500" /> DORA SIMULATOR
                </h2>

                <div className="relative h-64 bg-black/40 rounded-2xl border border-gray-800 p-6 flex flex-col justify-between overflow-hidden">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col items-center gap-2">
                      <Smartphone className={`w-10 h-10 ${steps[step].speaker === 'phone' ? 'text-cyan-400 animate-bounce' : 'text-gray-600'}`} />
                      <span className="text-[8px] font-black text-gray-400">DEVICE</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <RouterIcon className={`w-10 h-10 ${steps[step].speaker === 'router' ? 'text-cyan-400 animate-bounce' : 'text-gray-600'}`} />
                      <span className="text-[8px] font-black text-gray-400">DHCP SERVER</span>
                    </div>
                  </div>

                  {/* Message Bubble */}
                  <AnimatePresence mode="wait">
                    {steps[step].msg && (
                      <motion.div 
                        key={step}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`p-3 rounded-lg border text-[10px] font-black italic ${steps[step].speaker === 'phone' ? 'bg-blue-500/20 border-blue-500 text-blue-300 self-start' : 'bg-cyan-500/20 border-cyan-500 text-cyan-300 self-end'}`}
                      >
                        <MessageSquare className="w-3 h-3 mb-1" />
                        {steps[step].msg}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Data Packet Animation */}
                  {step > 0 && (
                    <motion.div 
                      key={`packet-${step}`}
                      initial={{ x: steps[step].speaker === 'phone' ? 0 : 250 }}
                      animate={{ x: steps[step].speaker === 'phone' ? 250 : 0 }}
                      transition={{ duration: 1 }}
                      className="absolute top-1/2 left-10 w-4 h-4 bg-cyan-500 rounded-full shadow-[0_0_10px_cyan]"
                    />
                  )}
                </div>

                <div className="mt-8 space-y-4">
                   <div className="flex justify-between items-center bg-black/60 p-4 rounded-xl border border-gray-800">
                      <div>
                        <p className="text-[10px] text-gray-500 font-black italic">STATUS SEKARANG:</p>
                        <p className="text-xl font-black text-white italic tracking-tighter uppercase">{steps[step].title}</p>
                      </div>
                      <div className={`p-3 rounded-full ${ipAssigned ? 'bg-emerald-500/20 border border-emerald-500' : 'bg-gray-800'}`}>
                        <BadgeCheck className={`w-6 h-6 ${ipAssigned ? 'text-emerald-500' : 'text-gray-700'}`} />
                      </div>
                   </div>
                   <p className="text-[11px] text-gray-400 leading-tight italic">{steps[step].desc}</p>
                </div>
              </div>

              <button 
                onClick={nextStep}
                className="w-full py-4 mt-8 bg-cyan-600 hover:bg-white text-white hover:text-black font-black transition-all flex items-center justify-center gap-3 uppercase italic text-xs tracking-widest skew-x-[-12deg] shadow-lg"
              >
                {step === 4 ? "RESET PROSES" : "LANJUT KE TAHAP BERIKUT_"}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-end items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          <Link 
            to="/academy/stage-3/modul-4/dns"
            className="flex items-center gap-3 bg-cyan-600 hover:bg-white text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
          >
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest leading-none uppercase">
              LANJUT KE DNS (BUKU TELEPON) » <ChevronRight className="w-4 h-4 font-bold" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DhcpServer;
