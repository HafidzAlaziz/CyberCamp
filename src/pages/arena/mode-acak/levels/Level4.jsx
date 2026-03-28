import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldAlert,
  Clock,
  Zap,
  ChevronLeft,
  X,
  Play,
  Terminal,
  Activity,
  Wifi,
  Network,
  Lock,
  Search,
  Database,
  ChevronDown,
  Eye,
  EyeOff
} from 'lucide-react';

const Level4 = () => {
  const navigate = useNavigate();
  
  // Timer Persistence Logic (600s / 10 Minutes)
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem('ctf_level4_time');
    return saved ? parseInt(saved) : 600;
  });

  const [stars, setStars] = useState(() => {
    const saved = localStorage.getItem('ctf_level4_stars');
    return saved ? parseInt(saved) : 3;
  });
  const [hasUsedHint, setHasUsedHint] = useState(() => {
    return localStorage.getItem('ctf_level4_hint_used') === 'true';
  });
  const [hasOvertimePenalty, setHasOvertimePenalty] = useState(() => {
    return localStorage.getItem('ctf_level4_overtime') === 'true';
  });

  const [flag, setFlag] = useState('');
  const [status, setStatus] = useState('active'); // 'active', 'wrong', 'decoy', 'complete'
  const [attempts, setAttempts] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [completionTime, setCompletionTime] = useState(null);
  const [showExitModal, setShowExitModal] = useState(false);
  
  // Challenge Specific States
  const [selectedPacket, setSelectedPacket] = useState(null);

  // SECURITY: Obfuscation & Decoys
  const [realPayload] = useState(() => atob("Q1RGe1VuM25jcnlwdDNkX1A0eUwwNGRfTDM0a30=")); // CTF{Un3ncrypt3d_P4yL04d_L34k}
  const [decoys] = useState([
    "CTF{TLS_1s_S3cur3_Y0u_C4nt_R34d_Th1s}",
    "CTF{N0th1ng_T0_S33_H3r3_M0v3_4l0ng}"
  ]);

  // Generate Packet Data
  const packets = useMemo(() => {
    const data = [];
    const protocols = ["TLSv1.3", "TCP", "UDP", "ARP", "DNS"];
    const ipBase = "192.168.1.";
    
    // Randomized Target Index (10-25)
    const targetIndex = Math.floor(Math.random() * (25 - 10 + 1)) + 10;

    for (let i = 1; i <= 30; i++) {
        let packet = {
            no: i,
            time: (i * 0.124).toFixed(4),
            source: ipBase + Math.floor(Math.random() * 254),
            destination: ipBase + Math.floor(Math.random() * 254),
            protocol: protocols[Math.floor(Math.random() * protocols.length)],
            length: Math.floor(Math.random() * 1500) + 60,
            info: i % 5 === 0 ? "Application Data" : "Acknowledgement. Seq=1 Ack=1",
            payload: "*#@!&%^... ENCRYPTED DATA... [TLS_SESSION_ENCRYPTED]"
        };

        // Special Packet (HTTP Leak) - Randomized Position
        if (i === targetIndex) {
            packet.source = "192.168.1.105";
            packet.destination = "10.0.0.12";
            packet.protocol = "HTTP";
            packet.info = "POST /api/v1/auth/login";
            packet.length = 842;
            packet.payload = JSON.stringify({
                user: "admin",
                pass: "shadow_r00t",
                debug_token: realPayload
            }, null, 4);
        } else if (i === 7 || i === 22) {
            // Decoy Packets
            packet.protocol = "TCP";
            packet.info = "Retransmission [Urgent]";
            packet.payload = `[CRITICAL_LOG] ERROR: Unauthorized access attempt detected. Incident_Report_ID: ${decoys[i === 7 ? 0 : 1]}`;
        }

        data.push(packet);
    }
    return data;
  }, [realPayload, decoys]);

  useEffect(() => {
    // ANTI-CHEAT Console Warning
    console.log("%c[NETWORK MONITOR] ALERT: UNAUTHORIZED PACKET SNIFFING ATTEMPT LOGGED.", "color: #10b981; font-weight: bold; font-size: 16px; background: black; padding: 4px; border: 1px solid #10b981;");
    console.log("%cAre you trying to look at the raw traffic? The real payload is obfuscated.", "color: gray; font-size: 12px;");
    
    if (status !== 'complete') {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          const nextValue = prev - 1;
          localStorage.setItem('ctf_level4_time', nextValue.toString());
          if (nextValue < 0 && !hasOvertimePenalty) {
            setHasOvertimePenalty(true);
            localStorage.setItem('ctf_level4_overtime', 'true');
            setStars(s => {
              const newStars = Math.max(0, s - 1);
              localStorage.setItem('ctf_level4_stars', newStars.toString());
              return newStars;
            });
          }
          return nextValue;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status, hasOvertimePenalty]);

  const handleHintClick = () => {
    if (!showHint) {
      setShowHint(true);
      if (!hasUsedHint) {
        setHasUsedHint(true);
        localStorage.setItem('ctf_level4_hint_used', 'true');
        setStars(s => {
          const newStars = Math.max(0, s - 1);
          localStorage.setItem('ctf_level4_stars', newStars.toString());
          return newStars;
        });
      }
    } else {
      setShowHint(false);
    }
  };

  const formatTime = (seconds) => {
    const isNegative = seconds < 0;
    const absSeconds = Math.abs(seconds);
    const mins = Math.floor(absSeconds / 60);
    const secs = absSeconds % 60;
    return `${isNegative ? '-' : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputFlag = flag.trim();

    if (inputFlag === realPayload) {
      const timeTaken = 600 - timeLeft;
      const timeTakenStr = formatTime(timeTaken);
      setCompletionTime(timeTakenStr);
      setStatus('complete');
      
      const savedStats = localStorage.getItem('ctf_mode_acak_stats');
      const stats = savedStats ? JSON.parse(savedStats) : {};
      const currentBestStars = stats[4]?.stars || 0;
      if (stars >= currentBestStars) {
         stats[4] = { stars: stars, bestTime: timeTakenStr };
         localStorage.setItem('ctf_mode_acak_stats', JSON.stringify(stats));
      }
      localStorage.removeItem('ctf_level4_time');
      localStorage.removeItem('ctf_level4_stars');
      localStorage.removeItem('ctf_level4_hint_used');
      localStorage.removeItem('ctf_level4_overtime');
    } else if (decoys.includes(inputFlag)) {
      setStatus('decoy');
      setAttempts(prev => [...prev, inputFlag]);
      setTimeout(() => setStatus('active'), 2000);
    } else if (inputFlag !== "") {
      setStatus('wrong');
      setAttempts(prev => [...prev, inputFlag]);
      setTimeout(() => setStatus('active'), 2000);
    }
    setFlag('');
  };

  const handleExit = () => {
    localStorage.removeItem('ctf_level4_time');
    localStorage.removeItem('ctf_level4_stars');
    localStorage.removeItem('ctf_level4_hint_used');
    localStorage.removeItem('ctf_level4_overtime');
    navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 4 } });
  };

  if (status === 'complete') {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 font-mono text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_70%)]" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="z-10 bg-gray-900 border-4 border-emerald-500 p-12 rounded-3xl text-center max-w-xl shadow-[0_0_50px_rgba(16,185,129,0.3)]">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/30">
            <Zap className="w-12 h-12 text-emerald-400 fill-emerald-400 drop-shadow-[0_0_10px_#10b981]" />
          </motion.div>
          <h1 className="text-5xl font-black italic tracking-tighter mb-2 text-white uppercase leading-none">MISSION COMPLETE</h1>
          <p className="text-emerald-500 font-bold tracking-[0.3em] mb-4 text-[10px]">SECTOR: NETWORK_CORE // PACKET_CAPTURED</p>
          <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl py-6 px-10 mb-8 inline-block">
             <div className="text-[10px] font-black text-gray-500 tracking-[0.4em] uppercase mb-4">Misi terselesaikan dalam</div>
             <div className="text-4xl font-black text-white italic tracking-tighter mb-6">{completionTime}</div>
             <div className="flex justify-center gap-4">
               {[1, 2, 3].map(s => (
                 <Zap key={s} className={`w-10 h-10 transition-all duration-500 ${s <= stars ? 'text-emerald-400 fill-emerald-400 drop-shadow-[0_0_15px_#10b981]' : 'text-gray-800 fill-transparent'}`} />
               ))}
             </div>
          </div>
          <button onClick={() => navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 4 } })} className="w-full bg-emerald-500 text-black font-black py-4 rounded-xl hover:bg-emerald-400 transition-all text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(16,185,129,0.2)]">KEMBALI KE MAP TAKTIS</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-4 md:p-8 flex flex-col overflow-hidden relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #10b98110 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col relative z-10">
        
        {/* HEADER AREA */}
        <div className="flex justify-between items-start mb-8 relative">
          <div className="flex gap-4 items-start z-10">
            <button 
              onClick={() => setShowExitModal(true)} 
              className="mt-1 p-2 bg-gray-900 border border-emerald-500/30 rounded-xl hover:bg-emerald-500/20 text-gray-400 hover:text-emerald-400 transition-all group"
              title="Abort Mission"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400/80">TARGET: SECTOR_NETWORK</span>
              </div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none shadow-emerald-500/20">
                LEVEL 4: <span className="text-emerald-500 drop-shadow-[0_0_10px_#10b981]">NETWORK ANALYSIS</span>
              </h1>
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
             <div className="text-[8px] font-black text-gray-700 tracking-[0.5em] uppercase mb-2">RANK_EFFICIENCY</div>
             <div className="flex gap-3">
                {[1, 2, 3].map(s => (
                  <Zap key={s} className={`w-6 h-6 transition-all duration-700 ${s <= stars ? 'text-emerald-400 fill-emerald-400 drop-shadow-[0_0_10px_#10b981]' : 'text-white/10 fill-transparent opacity-20'}`} />
                ))}
             </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] font-black text-red-500/80 tracking-[0.3em] uppercase mb-1">REMAINING_TIME</div>
            <div className={`text-4xl font-black italic tracking-tighter transition-colors duration-500 ${timeLeft < 0 ? 'text-red-500' : timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-emerald-600'}`}>
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* LAYOUT */}
        <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
          
          {/* LEFT SIDE: BRIEFING */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <div className="bg-gray-950/50 border border-emerald-500/30 rounded-2xl p-6 flex-1 flex flex-col relative overflow-hidden group shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981]" />
              <div className="flex items-center gap-3 mb-6">
                <Network className="w-5 h-5 text-emerald-400" />
                <h2 className="text-sm font-black text-emerald-200 uppercase tracking-widest">BRIEFING MISI</h2>
              </div>
              <div className="text-xs leading-relaxed text-gray-400 overflow-y-auto pr-2 custom-scrollbar space-y-4 italic">
                <p>{" > "} Target: Intersepsi Lalu Lintas Jaringan.</p>
                <p>{" > "} Intelligence: Kita berhasil menyadap jaringan Wi-Fi markas Shadow Syndicate. Layar ini menampilkan paket data yang lalu-lalang (Packet Sniffer).</p>
                <p>{" > "} Tugas lo: Cari kelengahan mereka! Pasti ada satu komunikasi yang tidak dienkripsi (HTTP/FTP/Telnet). Temukan paket yang bocor dan ekstrak pesannya!</p>
                <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-lg">
                   <p className="text-emerald-400 font-black tracking-tight uppercase mb-1 flex items-center gap-2">
                     <Activity className="w-3 h-3" /> PACKET_INSPECTOR
                   </p>
                   <p className="text-[9px] text-gray-600 uppercase italic">Abaikan paket TLSv1.3 atau TCP biasa. Cari protokol yang mengirim data secara Plaintext (seperti HTTP POST).</p>
                </div>
              </div>
            </div>

            <button onClick={handleHintClick} className={`bg-emerald-900/20 border rounded-xl p-4 flex items-center justify-center gap-3 group transition-all shadow-[0_0_20px_rgba(16,185,129,0.1)] ${showHint ? 'border-emerald-400 bg-emerald-900/40' : 'border-emerald-500/40 hover:bg-emerald-900/30'}`}>
              <Zap className={`w-4 h-4 transition-colors ${showHint ? 'text-emerald-400 fill-emerald-400' : 'text-emerald-400'}`} />
              <span className="text-xs font-black text-emerald-200 uppercase tracking-widest">{showHint ? 'HINT ACTIVE' : '💡 MINTA HINT BOS'}</span>
            </button>
            
            <AnimatePresence>
              {showHint && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-gray-900/50 border border-white/5 rounded-xl p-4 text-[10px] text-gray-500 italic uppercase leading-tight">
                  Klik baris paket HTTP untuk melihat isi Payload di panel bawah. Cari field 'debug_token' di dalam strukur JSON.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CENTER: WORKSPACE (WIRESHARK CLONE) */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            <div className="flex-1 flex flex-col gap-4 min-h-0">
               {/* TOP PANEL: PACKET LIST */}
               <div className="flex-[3] bg-black border border-emerald-500/20 rounded-2xl flex flex-col overflow-hidden relative group shadow-2xl">
                  <div className="h-10 bg-gray-900/80 border-b border-white/5 flex items-center px-4 gap-4 backdrop-blur-md">
                     <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                     </div>
                     <div className="flex items-center gap-2">
                        <Activity className="w-3 h-3 text-emerald-500" />
                        <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Wireshark_Alpha.v4.0 // LIVE_INTERCEPT</span>
                     </div>
                  </div>

                  <div className="flex-1 overflow-y-auto custom-scrollbar p-0 bg-gray-950 font-mono text-[9px] md:text-[10px]">
                     <div className="sticky top-0 bg-gray-900 border-b border-emerald-500/20 flex px-4 py-2 font-black text-emerald-500/60 tracking-widest uppercase z-20">
                        <div className="w-10">No.</div>
                        <div className="w-20">Time</div>
                        <div className="w-32">Source</div>
                        <div className="w-32">Destination</div>
                        <div className="w-24">Protocol</div>
                        <div className="w-16">Length</div>
                        <div className="flex-1 px-4">Info</div>
                     </div>
                     
                     <div className="divide-y divide-white/5 select-none">
                        {packets.map((pkt) => (
                          <div 
                            key={pkt.no} 
                            onClick={() => setSelectedPacket(pkt)}
                            className={`flex px-4 py-1.5 cursor-pointer transition-all duration-200 group/row text-emerald-500/50
                              ${selectedPacket?.no === pkt.no ? 'bg-emerald-500/20 text-emerald-400' : 'hover:bg-emerald-500/5 hover:text-emerald-500/80'}
                            `}
                          >
                             <div className="w-10">{pkt.no}</div>
                             <div className="w-20">{pkt.time}</div>
                             <div className="w-32">{pkt.source}</div>
                             <div className="w-32">{pkt.destination}</div>
                             <div className="w-24 font-bold">{pkt.protocol}</div>
                             <div className="w-16">{pkt.length}</div>
                             <div className="flex-1 px-4 truncate transition-colors">{pkt.info}</div>
                          </div>
                        ))}
                     </div>
                  </div>
               </div>

               {/* BOTTOM PANEL: PACKET DETAILS */}
               <div className="flex-[2] bg-gray-950 border border-emerald-500/20 rounded-2xl flex flex-col overflow-hidden relative group">
                  <div className="h-8 bg-gray-900/50 border-b border-white/5 flex items-center px-4 gap-4 backdrop-blur-sm">
                     <span className="text-[8px] text-gray-600 font-black tracking-widest uppercase">Packet_Data_Inspection // Payload</span>
                     <ChevronDown className="w-3 h-3 text-gray-600" />
                  </div>
                  <div className="flex-1 p-6 font-mono text-[10px] md:text-xs overflow-y-auto custom-scrollbar relative">
                     {selectedPacket ? (
                        <div className="space-y-4">
                           <div className="text-emerald-500/40 uppercase tracking-widest font-black text-[9px]">Analyzing Frame #{selectedPacket.no}...</div>
                           <pre className="text-emerald-300 leading-relaxed whitespace-pre-wrap">
                              {selectedPacket.payload}
                           </pre>
                        </div>
                     ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-700 italic text-[10px] uppercase tracking-widest gap-3">
                           <Search className="w-6 h-6 opacity-20" />
                           Pilih paket dari daftar di atas untuk melihat detail transmisi...
                        </div>
                     )}
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none" />
                  </div>
                  <div className="h-6 bg-gray-900/30 border-t border-white/5 flex items-center px-4 justify-between">
                     <div className="text-[7px] font-black text-gray-700 tracking-[0.2em]">ENCODING: UTF-8 // PROTOCOL_V: 4.2</div>
                     <div className="text-[7px] font-black text-emerald-500/30 tracking-[0.2em]">RAW_TRAFFIC_INTERCEPT_ACTIVE</div>
                  </div>
               </div>
            </div>

            {/* SUBMISSION */}
            <div className="bg-gray-900/40 border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10"><Terminal className="w-12 h-12 text-emerald-400" /></div>
               <form onSubmit={handleSubmit} className="relative z-10 flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <input type="text" value={flag} onChange={(e) => setFlag(e.target.value)} placeholder="MASUKKAN FLAG DI SINI (CTF_{...})" className={`w-full bg-black/60 border-2 rounded-xl py-4 px-6 text-sm font-black tracking-widest text-white placeholder:text-gray-700 focus:outline-none transition-all ${status === 'wrong' || status === 'decoy' ? 'border-red-500 shadow-[0_0_15px_#ef4444]' : 'border-emerald-500/40 focus:border-emerald-500 focus:shadow-[0_0_20px_rgba(16,185,129,0.2)]'}`} />
                    <AnimatePresence>
                      {status === 'wrong' && <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-3 -right-3 bg-red-600 text-[8px] font-black italic px-3 py-1 rounded-full text-white shadow-lg uppercase">ACCESS DENIED</motion.div>}
                      {status === 'decoy' && <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-3 -right-3 bg-orange-600 text-[8px] font-black italic px-3 py-1 rounded-full text-white shadow-lg uppercase animate-bounce">DECOY DETECTED: Don't trust everything you see in the code.</motion.div>}
                    </AnimatePresence>
                  </div>
                  <button type="submit" className="bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase text-xs tracking-[0.2em] px-10 py-4 rounded-xl transition-all active:scale-95 shadow-[0_10px_30px_rgba(16,185,129,0.3)]">[ SUBMIT FLAG ]</button>
               </form>
               <div className="mt-6 flex flex-wrap gap-2">
                  {attempts.map((att, idx) => (
                    <span key={idx} className="text-[9px] font-bold text-gray-700 italic border border-gray-800 px-2 py-1 rounded line-through decoration-red-500/50">{att}</span>
                  ))}
               </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-700">
           <div className="flex items-center gap-4 text-[9px] font-black tracking-widest">
              <span className="text-emerald-500/50">{" > "} SYSTEM: OPERATIONAL</span>
              <span className="text-gray-800">//</span>
              <span>MODE: ACAK</span>
              <span className="text-gray-800">//</span>
              <span>LEVEL: 4</span>
           </div>
           <div className="text-[8px] font-bold uppercase tracking-tighter italic opacity-50">-- CORE_GRID_ESTABLISHED // PACKET_SNIFFER_INITIALIZED --</div>
        </div>

      </div>
      <AnimatePresence>
         {showExitModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex justify-center items-center p-4">
               <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-gray-900 border border-emerald-500/30 rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.1)]">
                  <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
                  <ShieldAlert className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-xl font-black text-white tracking-widest uppercase mb-2">ABORT MISSION?</h3>
                  <p className="text-sm text-gray-400 mb-8 font-sans">Anda yakin ingin keluar? Waktu akan terus berjalan dan progress misi Anda saat ini akan di-reset.</p>
                  <div className="flex gap-4">
                    <button onClick={() => setShowExitModal(false)} className="flex-1 py-3 bg-gray-800 text-white font-bold rounded-xl border border-white/5 hover:bg-gray-700 transition-colors">BATAL</button>
                    <button onClick={handleExit} className="flex-1 py-3 bg-red-500 text-white font-black uppercase tracking-widest rounded-xl hover:bg-red-400 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.3)]">KELUAR</button>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>

    </div>
  );
};

export default Level4;
