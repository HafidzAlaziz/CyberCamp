import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  Fingerprint, 
  Search, 
  ShieldAlert, 
  ChevronRight, 
  Terminal,
  Database,
  Lock,
  Unlock,
  AlertTriangle
} from 'lucide-react';

const IntroIpDns = () => {
  const [domain, setDomain] = useState('');
  const [isResolving, setIsResolving] = useState(false);
  const [result, setResult] = useState(null);
  const [isPoisoned, setIsPoisoned] = useState(false);

  const dnsMap = {
    'google.com': '142.250.190.46',
    'cybercamp.id': '10.0.42.1',
    'mybank.com': '172.217.16.206',
    'target.company': '192.168.1.100'
  };

  const maliciousIp = '66.66.66.66';

  const handleResolve = () => {
    if (!domain) return;
    setIsResolving(true);
    setResult(null);
    
    setTimeout(() => {
      const cleanDomain = domain.toLowerCase().trim();
      const ip = dnsMap[cleanDomain] || 'NXDOMAIN (Not Found)';
      
      setResult({
        domain: cleanDomain,
        ip: isPoisoned && dnsMap[cleanDomain] ? maliciousIp : ip,
        status: isPoisoned && dnsMap[cleanDomain] ? 'SUSPICIOUS' : (dnsMap[cleanDomain] ? 'SUCCESS' : 'ERROR')
      });
      setIsResolving(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-4 md:p-8 flex flex-col">
      {/* Standardized Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-12 border-b border-cyan-900/30 pb-6 pl-0 md:pl-32"
      >
        <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/50">
          <Globe className="w-8 h-8 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-sm text-cyan-500 tracking-[0.3em] uppercase font-black">Stage 3: Networking</h1>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            MODUL 4: IP, DHCP, & DNS
          </h2>
        </div>
      </motion.div>

      {/* Main Content: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-grow">
        {/* Kolom Kiri: Materi */}
        <div className="space-y-6">
          <section className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Fingerprint className="w-24 h-24 text-cyan-500" />
            </div>
            <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
              <span className="text-cyan-500">01.</span> APA ITU IP?
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Kalau topologi itu petanya, **IP Address** itu adalah nomor rumah lo. Tanpa nomor ini, paket data nggak bakal tau harus dikirim ke pintu mana.
            </p>
            <div className="bg-cyan-500/5 border-l-4 border-cyan-500 p-4 italic text-sm">
              "Setiap device di internet punya KTP digital unik berupa deretan angka. IPv4 (jadul tapi masih dipake) dan IPv6 (masa depan)."
            </div>
          </section>

          <section className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800 relative group">
            <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
              <span className="text-purple-500">02.</span> DNS: BUKU TELEPON
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Manusia bego kalau disuruh hapal angka kayak `142.250.190.46`. Makanya diciptain **DNS (Domain Name System)**. 
            </p>
            <p className="mt-4 text-sm">
              DNS itu kayak buku telepon. Lo ketik nama (google.com), DNS bakal ngasih tau nomor HP-nya (IP Address).
            </p>
            
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
               <div className="flex items-center gap-3 text-red-500 font-black uppercase text-xs mb-2">
                  <AlertTriangle className="w-4 h-4" /> HACKER INSIGHT: POISONING
               </div>
               <p className="text-xs text-gray-500 leading-relaxed italic">
                 "Apa jadinya kalau gue ganti nomor di buku telepon lo? Pas lo mau ke Google, gue arahin ke server jebakan gue. Ini namanya **DNS Poisoning**. Lo nggak bakal sadar udah nyasar!"
               </p>
            </div>
          </section>
        </div>

        {/* Kolom Kanan: Simulasi */}
        <div className="bg-gray-900/50 border-2 border-cyan-500/30 rounded-3xl p-8 relative flex flex-col items-center justify-center min-h-[450px] overflow-hidden">
           {/* Static/Noise overlay */}
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
           
           <div className="w-full max-w-md relative z-10">
              <div className="text-center mb-8">
                 <h3 className="text-cyan-400 font-black tracking-widest uppercase text-sm mb-2 italic underline decoration-cyan-500/50">DNS_RESOLVER_v1.0</h3>
                 <p className="text-[10px] text-gray-500 uppercase tracking-widest">Querying global root servers...</p>
              </div>

              <div className="bg-black/60 p-6 rounded-2xl border border-gray-800 shadow-2xl relative overflow-hidden">
                {/* Poison Status Overlay */}
                <AnimatePresence>
                  {isPoisoned && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-red-500/10 border border-red-500/40 z-20 pointer-events-none flex items-center justify-center"
                    >
                       <div className="rotate-12 bg-red-500 text-black px-4 py-1 font-black text-[10px] uppercase shadow-lg">POISONED_CACHE</div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-4">
                   <div className="flex gap-2">
                      <div className="flex-grow bg-gray-900 border border-gray-700 rounded-lg flex items-center px-4 focus-within:border-cyan-500 transition-colors">
                         <Terminal className="w-4 h-4 text-gray-600 mr-3" />
                         <input 
                           type="text" 
                           placeholder="Type: google.com or mybank.com"
                           className="bg-transparent border-none outline-none w-full py-3 text-sm text-cyan-400 lowercase italic"
                           value={domain}
                           onChange={(e) => setDomain(e.target.value)}
                           onKeyDown={(e) => e.key === 'Enter' && handleResolve()}
                         />
                      </div>
                      <button 
                        onClick={handleResolve}
                        disabled={isResolving}
                        className="bg-cyan-500 hover:bg-white text-black px-4 rounded-lg transition-all active:scale-95 disabled:opacity-50"
                      >
                         <Search className={`w-5 h-5 ${isResolving ? 'animate-spin' : ''}`} />
                      </button>
                   </div>

                   <div className="h-32 bg-gray-950/80 rounded-xl border border-gray-800 p-4 font-mono text-xs overflow-hidden flex flex-col justify-center gap-2">
                     {isResolving ? (
                       <div className="flex flex-col gap-1">
                          <p className="text-cyan-500/60 animate-pulse">Requesting A-Record for {domain}...</p>
                          <p className="text-gray-700">Checking local cache...</p>
                          <p className="text-gray-700">Querying authoritative server...</p>
                       </div>
                     ) : result ? (
                       <motion.div 
                         initial={{ opacity: 0, x: -10 }}
                         animate={{ opacity: 1, x: 0 }}
                         className="space-y-2"
                       >
                          <div className="flex justify-between items-center bg-gray-900 p-2 rounded border border-gray-800">
                             <span className="text-gray-500">DOMAIN:</span>
                             <span className="text-white font-black">{result.domain}</span>
                          </div>
                          <div className={`flex justify-between items-center p-2 rounded border ${result.status === 'SUSPICIOUS' ? 'bg-red-500/20 border-red-500/40 text-red-500' : 'bg-green-500/10 border-green-500/20 text-green-500'}`}>
                             <span className="opacity-60">RESOLVED_IP:</span>
                             <span className="font-black text-sm tracking-widest">{result.ip}</span>
                          </div>
                       </motion.div>
                     ) : (
                       <p className="text-gray-800 italic text-center uppercase tracking-tighter">Waiting for lookup query...</p>
                     )}
                   </div>
                </div>
              </div>

              {/* Interaction Buttons */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                 <button 
                   onClick={() => setIsPoisoned(!isPoisoned)}
                   className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${isPoisoned ? 'bg-red-500 border-red-200 text-black shadow-lg shadow-red-500/20' : 'bg-gray-800 border-red-500/40 text-red-400 hover:bg-red-500/10'}`}
                 >
                    {isPoisoned ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                    <span className="text-[9px] font-black uppercase tracking-widest">{isPoisoned ? 'Purge DNS Poison' : 'Apply DNS Poisoning'}</span>
                 </button>
                 
                 <div className="bg-gray-900/40 p-3 rounded-xl border border-gray-800 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-1">
                       <Activity className="w-3 h-3 text-cyan-500" />
                       <span className="text-[8px] text-gray-500 font-black uppercase">Cache_Status</span>
                    </div>
                    <span className={`text-[10px] font-bold ${isPoisoned ? 'text-red-500 animate-pulse' : 'text-green-500 italic'}`}>
                       {isPoisoned ? 'WARNING: INTEGRITY_FAILED' : 'SECURE_AND_TRUSTED'}
                    </span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="mt-12 flex justify-between items-center bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-y-0 left-0 w-1 bg-cyan-500"></div>
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black group-hover:text-cyan-500/50 transition-colors">Sekarang di:</span>
          <span className="text-white font-black italic tracking-tighter uppercase">01. INTRO_IP_&_DNS</span>
        </div>
        
        <div className="flex gap-4">
          <Link 
            to="/academy"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-400 text-xs font-black rounded-lg transition-all uppercase tracking-widest border border-gray-700"
          >
            « Kembali
          </Link>
          <Link 
            to="/academy/stage-3/modul-4/dhcp-pool"
            className="px-8 py-3 bg-cyan-500 hover:bg-white hover:text-black text-black text-xs font-black rounded-lg transition-all uppercase tracking-widest flex items-center gap-3 group/btn"
          >
            Lanjut: DHCP Pool <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <style>{`
         @keyframes pulse {
           0%, 100% { opacity: 1; }
           50% { opacity: 0.5; }
         }
         .animate-pulse {
           animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
         }
      `}</style>
    </div>
  );
};

// Simple Activity icon replacement as lucide-react might not have it or spelled differently
const Activity = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);

export default IntroIpDns;
