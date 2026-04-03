import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Zap, 
  Target, 
  ShieldAlert, 
  CheckCircle2, 
  Activity,
  X,
  XCircle,
  Network,
  Search,
  FileCode,
  Send,
  AlertTriangle,
  Copy,
  Check
} from 'lucide-react';

/* 
   TRAP_FLAG: <!-- CTF{PACKET_CAPTURE_TRAP_3030} -->
*/

const ForensicsLevel5 = () => {
  /* 
     TRAP_FLAG: <!-- CTF{PACKET_HTML_TRAP_3030} -->
  */

  const navigate = useNavigate();
  const [flag, setFlag] = useState('');
  const [status, setStatus] = useState('idle');
  const [showHint, setShowHint] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [attempts, setAttempts] = useState([]);
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  // Challenge State
  const [selectedPacket, setSelectedPacket] = useState(null);

  useEffect(() => {
    let interval;
    if (!isPaused && status !== 'success') {
      interval = setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused, status]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctFlag = atob('Q1RGe1A0Y2szdF9JbjVwM2N0MTBuX0QwbjN9');
    const decoyFlags = [atob('Q1RGe1A0Y2szdF9GQUswX0RBOEE3NH0=')]; // Decoy
    
    const cleanFlag = flag.trim();

    if (cleanFlag === correctFlag) {
      setStatus('success');
      setIsPaused(true);
      saveProgress(1 + (time <= 360 ? 1 : 0) + (!hintUsed ? 1 : 0));
    } else if (decoyFlags.includes(cleanFlag)) {
      setStatus('decoy');
      setAttempts([...attempts, cleanFlag]);
      setTimeout(() => setStatus('idle'), 3000);
    } else {
      setStatus('wrong');
      setAttempts([...attempts, cleanFlag]);
      setTimeout(() => setStatus('idle'), 3000);

    }
  };

  const saveProgress = (stars) => {
    const saved = localStorage.getItem('ctf_forensics_stats');
    const stats = saved ? JSON.parse(saved) : {};
    stats[5] = { stars: Math.max(stats[5]?.stars || 0, stars), bestTime: Math.min(stats[5]?.bestTime || 999999, time) };
    localStorage.setItem('ctf_forensics_stats', JSON.stringify(stats));
  };

  const packets = [
    { id: 1, protocol: 'TCP', source: '10.0.0.5', dest: '172.217.1.1', info: 'SYN [Seq=0 Win=64240 Len=0 MSS=1460]' },
    { id: 2, protocol: 'TCP', source: '172.217.1.1', dest: '10.0.0.5', info: 'SYN, ACK [Seq=0 Ack=1 Win=64240 Len=0]' },
    { id: 3, protocol: 'HTTP', source: '10.0.0.5', dest: '172.217.1.1', info: 'GET /index.html HTTP/1.1' },
    { id: 4, protocol: 'HTTP', source: '172.217.1.1', dest: '10.0.0.5', info: 'HTTP/1.1 200 OK (text/html)' },
    { id: 5, protocol: 'HTTP', source: '10.0.0.5', dest: '172.217.1.1', info: 'POST /api/v1/log HTTP/1.1', detail: 'Content-Type: application/json\n\n{"app_id": "auth_system", "action": "login_bypass", "payload": "CTF{P4ck3t_In5p3ct10n_D0n3}"}' },
    { id: 6, protocol: 'DNS', source: '10.0.0.5', dest: '8.8.8.8', info: 'Standard query 0x7a31 A secure-vault.io' },
    { id: 7, protocol: 'TLSv1.2', source: '10.0.0.5', dest: '34.200.15.1', info: 'Application Data [Len=1024]' },
    { id: 8, protocol: 'TCP', source: '10.0.0.5', dest: '172.217.1.1', info: 'FIN, ACK [Seq=102 Ack=501 Win=65535]' },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-mono p-4 md:p-8 relative overflow-hidden forensics-page-theme">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-between items-start mb-8 relative">
          <div className="flex gap-4 items-start">
            <button onClick={() => setShowExitModal(true)} className="mt-1 w-10 h-10 flex items-center justify-center bg-gray-900 border border-orange-500/30 rounded-xl transition-all group hover:bg-orange-500/20"><ChevronLeft className="w-5 h-5 text-gray-400" /></button>
            <div>
              <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-[0_0_8px_#f97316]" /><span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-400/80">SECTOR: NETWORK_FORENSICS</span></div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">LEVEL 5: <span className="text-orange-500 drop-shadow-[0_0_10px_#f97316]">TRAFFIC SNIFFER</span></h1>
            </div>
          </div>
          <div className="text-right">
             <div className="text-[10px] font-black text-orange-500/30 tracking-[0.3em] uppercase mb-1">ELAPSED_TIME</div>
             <div className="text-4xl font-black italic tracking-tighter text-orange-500">{formatTime(time)}</div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-gray-950/50 border border-orange-500/30 rounded-2xl p-6 relative overflow-hidden group shadow-2xl">
               <div className="absolute top-0 left-0 w-1 h-full bg-orange-500 shadow-[0_0_15px_#f97316]" />
               <h3 className="text-xl font-black italic tracking-tighter uppercase text-white mb-3">OBJECT: CAPTURE.PCAP</h3>
               <p className="text-[11px] text-gray-400 font-bold leading-relaxed mb-6 italic uppercase tracking-wider">
                  Kami mencegat log transmisi data dari terminal intelijen musuh. Analisis tumpukan paket tersebut untuk menemukan data rahasia yang dikirim melalui protokol tidak aman.
               </p>
               <button onClick={() => { setShowHint(!showHint); if (!showHint) setHintUsed(true); }} className={`w-full py-4 border rounded-xl flex items-center justify-center gap-2.5 transition-all uppercase text-[10px] font-black tracking-widest ${showHint ? 'bg-orange-500/20 border-orange-500 text-orange-400' : 'bg-white/5 border-white/10 text-gray-500 hover:text-orange-400'}`}><Zap className="w-3.5 h-3.5" /><span>{showHint ? 'HINT_AKTIF' : 'MINTA_HINT'}</span></button>
               {showHint && (
                 <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-3 p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-bold text-gray-400 italic tracking-wider leading-relaxed space-y-2">
                    <p className="text-orange-300 uppercase font-black mb-2">💡 Tips Analisis Paket:</p>
                    <p>Fokuslah pada protokol **HTTP**. Berbeda dengan HTTPS, data HTTP dikirim dalam bentuk teks biasa (plain-text). Cari paket dengan metode **POST** karena biasanya mengandung submit data seperti form atau API call.</p>
                 </motion.div>
               )}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            <div className="flex-1 bg-gray-950 border-2 border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col relative group min-h-[450px]">
               <div className="h-12 bg-gray-900 border-b border-white/5 flex items-center px-6 gap-3">
                  <Network className="w-4 h-4 text-orange-500" />
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">WireShark_Web_Analyzer v1.2</span>
               </div>
               
               <div className="flex-1 flex flex-col bg-[#05080F] font-mono text-[10px]">
                  {/* Packet Header */}
                  <div className="grid grid-cols-[40px_60px_100px_100px_1fr] gap-4 p-3 bg-gray-900/50 border-b border-white/5 text-gray-600 font-bold uppercase tracking-widest">
                     <div>NO.</div>
                     <div>PROT</div>
                     <div>SOURCE</div>
                     <div>DESTINATION</div>
                     <div>INFO</div>
                  </div>
                  
                  {/* Packet List */}
                  <div className="flex-1 overflow-y-auto max-h-64 custom-scrollbar">
                     {packets.map((pkt) => (
                        <div 
                           key={pkt.id} 
                           onClick={() => setSelectedPacket(pkt)}
                           className={`grid grid-cols-[40px_60px_100px_100px_1fr] gap-4 p-3 border-b border-white/5 cursor-pointer transition-colors ${
                              selectedPacket?.id === pkt.id ? 'bg-orange-500/20 text-orange-400' : 'hover:bg-white/5 text-gray-400'
                           }`}
                        >
                           <div>{pkt.id}</div>
                           <div className={`font-black ${pkt.protocol === 'HTTP' ? 'text-green-500/60' : pkt.protocol === 'DNS' ? 'text-blue-500/60' : 'text-gray-500'}`}>{pkt.protocol}</div>
                           <div>{pkt.source}</div>
                           <div>{pkt.dest}</div>
                           <div className="truncate">{pkt.info}</div>
                        </div>
                     ))}
                  </div>
                  
                  {/* Packet Detail View */}
                  <div className="h-44 border-t border-white/10 bg-black/60 p-4 overflow-y-auto custom-scrollbar">
                     {selectedPacket ? (
                        <div className="space-y-4">
                           <div className="flex items-center gap-3 text-orange-500/40 pb-2 border-b border-white/5">
                              <Search className="w-3 h-3" />
                              <span className="font-black uppercase tracking-widest">Packet_{selectedPacket.id}_Contents:</span>
                           </div>
                            <div className="text-[11px] leading-relaxed text-gray-300 whitespace-pre-wrap flex flex-col gap-2">
                               {selectedPacket.id === 5 ? (
                                 <>
                                   <span>Content-Type: application/json</span>
                                   <div className="p-2 bg-black/40 rounded border border-white/5">
                                      <span className="text-gray-500">{"{"}"app_id": "auth_system", "action": "login_bypass", "payload": "</span>
                                      <span className="select-all bg-orange-500/10 px-1 border border-orange-500/20 rounded cursor-pointer text-orange-400 font-black">
                                         CTF&#123;P4ck3t_In5p3ct10n_D0n3&#125;
                                      </span>
                                      <span className="text-gray-500">"{"}"}</span>
                                   </div>
                                 </>
                               ) : selectedPacket.detail || 'No human-readable payload in this packet frame.'}
                            </div>
                            {/* Hidden decoy in Detail View */}
                            <div className="absolute top-0 right-0 opacity-0 select-all text-[1px] pointer-events-none">{"CTF{PACKET_STUB_TRAP_082}"}</div>
                           {selectedPacket.id === 5 && (
                             <div className="mt-4 p-3 bg-orange-500/5 border border-orange-500/20 rounded-xl text-orange-400 italic">
                                [ DETECTED: SENSITIVE_STRINGS_IN_JSON_BODY ]
                             </div>
                           )}
                        </div>
                     ) : (
                        <div className="h-full flex items-center justify-center opacity-20">
                           <p className="italic font-bold uppercase tracking-widest text-[9px]">Pilih paket untuk melihat detail payload</p>
                        </div>
                     )}
                  </div>
               </div>
            </div>

            <div className="bg-[#0A0F1D]/80 border border-orange-500/30 rounded-2xl p-6 shadow-2xl">
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 relative">
                   <div className="flex-1 relative">
                      <input type="text" value={flag} onChange={(e) => setFlag(e.target.value)} placeholder="Masukkan flag (CTF{...})" className={`w-full bg-black/40 border-2 rounded-xl py-3.5 px-6 text-xs tracking-widest text-white focus:outline-none transition-all ${status === 'wrong' ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : status === 'decoy' ? 'border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.1)]' : 'border-orange-500/20 focus:border-orange-500/50'}`} />
                      <AnimatePresence>
                         {status === 'decoy' && (
                            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-3 -right-3 bg-yellow-500 text-[8px] font-black italic px-3 py-1 rounded-full text-black shadow-lg uppercase whitespace-nowrap">
                               DECOY DETECTED
                            </motion.div>
                         )}
                         {status === 'wrong' && (
                            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-3 -right-3 bg-red-500 text-[8px] font-black italic px-3 py-1 rounded-full text-white shadow-lg uppercase whitespace-nowrap">
                               WRONG FLAG
                            </motion.div>
                         )}
                      </AnimatePresence>
                   </div>
                   <button type="submit" className="bg-orange-500 hover:bg-orange-400 text-black font-black uppercase text-[10px] tracking-[0.2em] px-8 py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"><span>SUBMIT</span><Send className="w-3.5 h-3.5" /></button>
                </form>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
         {status === 'success' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[500] bg-[#020617]/90 backdrop-blur-md flex flex-col justify-center items-center p-6 text-center">
               <div className="absolute inset-0 pointer-events-none overflow-hidden">
                 {[...Array(20)].map((_, i) => (
                   <motion.div key={`op-${i}`} style={{ left: `${(i * 5 + 2) % 94}%`, position: 'absolute', bottom: '-4px' }} className="w-2 h-2 bg-orange-400 rounded-full shadow-[0_0_10px_#f97316]" initial={{ opacity: 0, y: 0 }} animate={{ opacity: [0, 1, 0], y: '-100vh' }} transition={{ duration: 4 + (i % 6) * 0.7, delay: i * 0.25, repeat: Infinity }} />
                 ))}
               </div>
               <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className="max-w-sm w-full p-8 bg-gray-950 border border-orange-500/30 rounded-[2.5rem] shadow-[0_0_80px_rgba(249,115,22,0.3)] relative">
                  <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="w-8 h-8 text-orange-500" /></div>
                  <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white mb-2 leading-none">PACKET_SNIFFED</h2>
                  <p className="text-orange-500/60 font-black tracking-[0.4em] uppercase text-[8px] mb-8 italic">Traffic_Analysis_Successful</p>
                  <div className="bg-black/40 rounded-2xl p-5 mb-8 text-left space-y-2">
                     <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5"><span className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-none italic">Execution_Time</span><span className="text-xl font-black italic text-orange-400 leading-none">{formatTime(time)}</span></div>
                  </div>
                  <button onClick={() => navigate('/ctf-arena/forensics/mudah', { state: { lastLevel: 5 } })} className="w-full py-4 bg-orange-500 text-black font-black uppercase text-[11px] tracking-[0.2em] rounded-xl shadow-lg">LANJUTKAN MISI</button>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

export default ForensicsLevel5;
