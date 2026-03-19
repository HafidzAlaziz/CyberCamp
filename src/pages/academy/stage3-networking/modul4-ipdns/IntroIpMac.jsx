import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  ChevronLeft, 
  ChevronRight,
  Home, 
  Globe, 
  Network, 
  Smartphone, 
  Wifi, 
  CreditCard,
  ShieldAlert,
  Fingerprint,
  LayoutGrid
} from 'lucide-react';

const IntroIpMac = () => {
  const [connection, setConnection] = useState('none'); // 'none', 'rumah', 'cafe'
  const [spoofing, setSpoofing] = useState(false);

  const deviceData = {
    rumah: { ip: "192.168.1.5", mac: spoofing ? "DE:AD:BE:EF:00" : "AA:BB:CC:11" },
    cafe: { ip: "10.0.0.42", mac: spoofing ? "DE:AD:BE:EF:00" : "AA:BB:CC:11" },
    none: { ip: "---.---.---.---", mac: spoofing ? "DE:AD:BE:EF:00" : "AA:BB:CC:11" }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Standardized Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-cyan-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/50">
              <Globe className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 3: Networking</h1>
              <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
                MODUL 4: IP, MAC, DHCP & DNS
              </h2>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Kolom Kiri: Materi */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <section>
              <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-8">
                Identitas Jaringan: <br/>
                <span className="text-cyan-500">IP & MAC Address</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Di dunia internet, lo gak bisa anonim sejati tanpa paham dua hal ini: <span className="text-white font-bold italic underline border-b border-cyan-500 text-glow-cyan">IP Address</span> dan <span className="text-white font-bold italic underline border-b border-purple-500 text-glow-purple">MAC Address</span>. 
                Pikirin ini kayak identitas lo di dunia nyata.
              </p>
            </section>

            <div className="bg-gray-900/50 border-l-4 border-cyan-500 p-6 rounded-r-xl space-y-4">
              <h4 className="font-black text-cyan-400 flex items-center gap-2 uppercase tracking-widest text-xs">
                <CreditCard className="w-4 h-4" /> Analogi KTP vs Kontrakan
              </h4>
              <ul className="space-y-4 text-sm">
                <li className="flex gap-4">
                  <span className="text-cyan-500 font-black">1.</span>
                  <span><strong>MAC Address (KTP Fisik):</strong> Alamat permanen yang nempel di hardware lo. Gak bakal berubah mau lo pindah ke ujung dunia sekalipun.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-cyan-500 font-black">2.</span>
                  <span><strong>IP Address (Alamat Kontrakan):</strong> Alamat logis buat ngirim data. Ini fleksibel, tergantung lo nyambung di WiFi mana.</span>
                </li>
              </ul>
            </div>

            <section className="space-y-4">
              <h4 className="text-lg font-black text-white flex items-center gap-2 italic uppercase tracking-tighter">
                <ShieldAlert className="text-red-500 w-5 h-5 font-bold" /> KONTEKS HACKER
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed italic">
                "Kalau lo cuma ganti IP (misal pake VPN atau restart modem), lo masih bisa dilacak lewat <span className="text-white font-bold">MAC Address</span>. 
                Hacker Pro biasanya pake teknik <span className="text-red-400 font-bold underline">MAC Spoofing</span> buat ganti identitas hardware mereka biar bener-bener 'ngilang' dari radar satpam admin!"
              </p>
            </section>
          </motion.div>

          {/* Kolom Kanan: Simulasi */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900/50 border border-cyan-500/30 rounded-2xl p-8 relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Network className="w-32 h-32 text-cyan-500" />
            </div>

            <h3 className="text-white font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-2 text-sm border-b border-gray-800 pb-4">
              <Smartphone className="w-4 h-4 text-cyan-400" /> Identity_Monitor.exe
            </h3>

            <div className="flex flex-col items-center gap-8 py-10 relative">
              {/* Device Visual */}
              <motion.div 
                animate={connection !== 'none' ? { y: [0, -5, 0] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
                className={`p-10 rounded-3xl border-2 transition-all duration-500 ${
                  connection === 'rumah' ? 'border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_40px_rgba(16,185,129,0.1)]' : 
                  connection === 'cafe' ? 'border-orange-500/50 bg-orange-500/10 shadow-[0_0_40px_rgba(249,115,22,0.1)]' : 
                  'border-gray-800 bg-black/40'
                }`}
              >
                <Smartphone className={`w-20 h-20 ${
                  connection !== 'none' ? 'text-white' : 'text-gray-800'
                } transition-colors`} />
              </motion.div>

              {/* Identity Display */}
              <div className="w-full space-y-4 max-w-xs">
                <div className="bg-black/60 p-4 rounded-lg border border-gray-800">
                  <div className="flex justify-between text-[10px] uppercase font-black tracking-widest mb-1">
                    <span className="text-gray-500">IP_Address</span>
                    <span className={connection !== 'none' ? 'text-cyan-400' : 'text-gray-700'}>LAYER_3</span>
                  </div>
                  <div className="text-xl font-bold text-white tracking-widest">{deviceData[connection].ip}</div>
                </div>

                <div className={`bg-black/60 p-4 rounded-lg border transition-all duration-500 ${
                  spoofing ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'border-gray-800'
                }`}>
                  <div className="flex justify-between text-[10px] uppercase font-black tracking-widest mb-1">
                    <span className={spoofing ? 'text-red-400' : 'text-gray-500'}>MAC_Address {spoofing && '(SPOOFED)'}</span>
                    <span className={connection !== 'none' ? 'text-purple-400' : 'text-gray-700'}>LAYER_2</span>
                  </div>
                  <div className={`text-xl font-bold tracking-widest ${spoofing ? 'text-red-400' : 'text-white'}`}>
                    {deviceData[connection].mac}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-4 w-full">
                <button 
                  onClick={() => setConnection('rumah')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                    connection === 'rumah' ? 'bg-emerald-500/20 border-emerald-500 text-white' : 'bg-gray-800/30 border-gray-700 text-gray-500 hover:border-gray-500'
                  }`}
                >
                  <Wifi className="w-6 h-6" />
                  <span className="text-[10px] font-black uppercase">Connect WiFi Rumah</span>
                </button>
                <button 
                  onClick={() => setConnection('cafe')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                    connection === 'cafe' ? 'bg-orange-500/20 border-orange-500 text-white' : 'bg-gray-800/30 border-gray-700 text-gray-500 hover:border-gray-500'
                  }`}
                >
                  <Wifi className="w-6 h-6" />
                  <span className="text-[10px] font-black uppercase">Connect WiFi Cafe</span>
                </button>
              </div>

              {/* Hacker Action */}
              <button 
                onClick={() => setSpoofing(!spoofing)}
                className={`w-full py-4 px-6 rounded-lg border-2 font-black text-xs transition-all flex items-center justify-center gap-3 ${
                  spoofing 
                  ? 'bg-red-500/20 border-red-500 text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]' 
                  : 'bg-transparent border-gray-700 text-gray-500 hover:border-cyan-500 hover:text-cyan-500'
                }`}
              >
                <ShieldAlert className="w-4 h-4" />
                {spoofing ? 'RESTORE ORIGINAL MAC' : 'ACTIVATE MAC SPOOFING (MASK IDENTITY)'}
              </button>

              <AnimatePresence>
                {connection !== 'none' && !spoofing && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-[10px] text-gray-500 font-bold uppercase tracking-widest bg-black/60 px-4 py-2 rounded-full border border-gray-800 animate-pulse"
                  >
                    Note: IP lo berubah, tapi MAC (KTP) tetep ketahuan!
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
        {/* Footer Navigation */}
        <div className="flex justify-end items-center mt-12 bg-gray-900 px-8 py-6 rounded-sm border-l-8 border-cyan-500 shadow-2xl">
          
          <Link 
            to="/academy/stage-3/modul-4/dhcp"
            className="flex items-center gap-3 bg-cyan-600 hover:bg-white text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
          >
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest leading-none uppercase">
              LANJUT KE DHCP (PAK RT) » <ChevronRight className="w-4 h-4 font-bold" />
            </span>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .text-glow-cyan {
          text-shadow: 0 0 10px rgba(6, 182, 212, 0.5), 0 0 20px rgba(6, 182, 212, 0.3);
        }
        .text-glow-purple {
          text-shadow: 0 0 10px rgba(168, 85, 247, 0.5), 0 0 20px rgba(168, 85, 247, 0.3);
        }
      `}</style>
    </div>
  );
};

export default IntroIpMac;
