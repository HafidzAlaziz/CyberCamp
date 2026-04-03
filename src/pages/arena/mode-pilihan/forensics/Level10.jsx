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
  HardDrive,
  File,
  Folder,
  ChevronRight,
  Database,
  Send,
  AlertTriangle,
  Copy,
  Check
} from 'lucide-react';

/* 
   TRAP_FLAG: <!-- CTF{DISK_IMAGE_TRAP_8080} -->
*/

const ForensicsLevel10 = () => {
  /* 
     TRAP_FLAG: <!-- CTF{DISK_HTML_TRAP_8080} -->
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
  const [selectedFile, setSelectedFile] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState(['root']);

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
    const correctFlag = atob('Q1RGe0QzbDN0M2RfQnV0X04wdF9HMG4zX1g5Mn0=');
    const decoyFlags = [atob('Q1RGe0QzbDN0M2RfRkFLRV85OTgyfQ==')]; // Decoy
    
    const cleanFlag = flag.trim();

    if (cleanFlag === correctFlag) {
      setStatus('success');
      setIsPaused(true);
      saveProgress(1 + (time <= 600 ? 1 : 0) + (!hintUsed ? 1 : 0));
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
    stats[10] = { stars: Math.max(stats[10]?.stars || 0, stars), bestTime: Math.min(stats[10]?.bestTime || 999999, time) };
    localStorage.setItem('ctf_forensics_stats', JSON.stringify(stats));
  };

  const toggleFolder = (id) => {
    setExpandedFolders(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const fileSystem = [
    { id: 'root', name: '/', type: 'folder', children: [
      { id: 'users', name: 'Users', type: 'folder', children: [
        { id: 'admin', name: 'Administrator', type: 'folder', children: [
          { id: 'docs', name: 'Documents', type: 'folder', children: [
            { id: 'secret', name: 'Top_Secret.txt', type: 'file', deleted: true, content: 'RAW_SECTOR_DATA: [DELETED_ENTRY_RECOVERED]\nOFFSET: 0x42A0\nDATA: CTF{D3l3t3d_But_N0t_G0n3_X92}' },
            { id: 'work', name: 'Work_Schedule.xlsx', type: 'file', deleted: false, content: 'Standard Office File Header' }
          ]}
        ]}
      ]},
      { id: 'sys', name: 'System32', type: 'folder', children: [
        { id: 'kernel', name: 'ntoskrnl.exe', type: 'file', deleted: false, content: 'Binary Kernel Data' }
      ]}
    ]}
  ];

  const renderTree = (nodes) => {
    return nodes.map((node) => {
      const isExpanded = expandedFolders.includes(node.id);
      return (
        <div key={node.id} className="ml-4">
          <div 
            onClick={() => node.type === 'folder' ? toggleFolder(node.id) : setSelectedFile(node)}
            className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer transition-colors group ${
              selectedFile?.id === node.id ? 'bg-orange-500/20 text-orange-400' : 'hover:bg-white/5 text-gray-500'
            }`}
          >
            {node.type === 'folder' && (
              <ChevronRight className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
            )}
            {node.type === 'folder' ? <Folder className="w-3.5 h-3.5 opacity-50" /> : <File className={`w-3.5 h-3.5 ${node.deleted ? 'text-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]' : 'opacity-30'}`} />}
            <span className={`text-[11px] font-bold tracking-wider ${node.deleted ? 'text-red-500/80 decoration-red-500/30 line-through' : ''}`}>
               {node.name} {node.deleted && <span className="ml-2 text-[8px] font-black uppercase text-red-500/40">[DELETED]</span>}
            </span>
          </div>
          {node.type === 'folder' && isExpanded && node.children && (
            <div className="border-l border-white/5">{renderTree(node.children)}</div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-mono p-4 md:p-8 relative overflow-hidden forensics-page-theme">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-between items-start mb-8 relative">
          <div className="flex gap-4 items-start">
            <button onClick={() => setShowExitModal(true)} className="mt-1 w-10 h-10 flex items-center justify-center bg-gray-900 border border-orange-500/30 rounded-xl transition-all group hover:bg-orange-500/20 active:scale-95"><ChevronLeft className="w-5 h-5 text-gray-400" /></button>
            <div>
              <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-[0_0_8px_#f97316]" /><span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-400/80">SECTOR: DISK_IMAGES</span></div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">LEVEL 10: <span className="text-orange-500 drop-shadow-[0_0_10px_#f97316]">MFT TRACKER</span></h1>
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
               <h3 className="text-xl font-black italic tracking-tighter uppercase text-white mb-3">OBJECT: EVIDENCE_DISK.E01</h3>
               <p className="text-[11px] text-gray-400 font-bold leading-relaxed mb-6 italic uppercase tracking-wider">
                  Misi Terakhir. Target menghapus semua bukti sebelum terminal dihancurkan. Namun, sistem file **NTFS** tidak benar-benar menghapus data, melainkan hanya menandainya sebagai "tidak terpakai" di **MFT (Master File Table)**.
               </p>
               <button onClick={() => { setShowHint(!showHint); if (!showHint) setHintUsed(true); }} className={`w-full py-4 border rounded-xl flex items-center justify-center gap-2.5 transition-all uppercase text-[10px] font-black tracking-widest ${showHint ? 'bg-orange-500/20 border-orange-500 text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.1)]' : 'bg-white/5 border-white/10 text-gray-500 hover:text-orange-400'}`}><Zap className="w-3.5 h-3.5" /><span>{showHint ? 'HINT_AKTIF' : 'MINTA_HINT'}</span></button>
               {showHint && (
                 <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-3 p-4 bg-black/40 rounded-xl border border-white/5 text-[10px] font-bold text-gray-400 italic tracking-wider leading-relaxed space-y-2">
                    <p className="text-orange-300 uppercase font-black">💡 Pemulihan Data:</p>
                    <p>File yang dihapus biasanya masih berada di sektor disk selama belum tertimpa data baru. Cari entri file dengan status **DELETED** di pohon direktori dan periksa isinya melalui viewer sektor.</p>
                 </motion.div>
               )}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            <div className="flex-1 bg-gray-950 border-2 border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col relative group min-h-[500px]">
               <div className="h-12 bg-gray-900 border-b border-white/5 flex items-center px-6 gap-3">
                  <HardDrive className="w-4 h-4 text-orange-500" />
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">EnCase_Pro_Disk_Imaging v9.1</span>
               </div>
               
               <div className="flex-1 flex flex-col md:flex-row bg-[#05080F] font-mono">
                  {/* File Tree View */}
                  <div className="w-full md:w-64 border-r border-white/5 p-6 overflow-y-auto">
                     <div className="flex items-center gap-3 text-orange-500/40 mb-6 pb-2 border-b border-white/5">
                        <Folder className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-black uppercase tracking-widest">File_Tree</span>
                     </div>
                     <div className="select-none">
                        {renderTree(fileSystem)}
                     </div>
                  </div>
                  
                  {/* Sector/Preview View */}
                  <div className="flex-1 p-6 bg-black/40 flex flex-col">
                     <div className="flex items-center gap-3 text-orange-500/40 mb-8 pb-2 border-b border-white/5">
                        <Database className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Sector_Analysis</span>
                     </div>
                     
                     <div className="flex-1 bg-black/60 rounded-xl border border-white/5 p-8 font-mono relative overflow-hidden group/view">
                        {selectedFile ? (
                           <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                              <div className="flex justify-between items-start">
                                 <div>
                                    <h5 className={`text-[12px] font-black uppercase tracking-widest mb-1 ${selectedFile.deleted ? 'text-red-500' : 'text-orange-500'}`}>{selectedFile.name}</h5>
                                    <p className="text-[9px] text-gray-700 font-bold">MODE: {selectedFile.deleted ? 'RECOVERED_DELETED_SECTORS' : 'READ_ONLY_ACCESS'}</p>
                                 </div>
                                 <div className="text-[10px] text-gray-800 text-right">
                                    <span>CLUSTER: 0x42A0</span><br />
                                    <span>SIZE: 512B</span>
                                 </div>
                              </div>
                              <div className="flex-1 p-6 bg-black/60 font-mono text-[11px] overflow-auto select-text relative">
                                 <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                                    <span className="text-orange-500 font-black tracking-widest text-[9px] uppercase italic">// SECTOR_RECOVERY_STREAM</span>
                                    <span className={`text-[8px] font-bold px-2 py-0.5 rounded ${selectedFile.deleted ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                                       {selectedFile.deleted ? 'DELETED_BLOCK' : 'ACTIVE_BLOCK'}
                                    </span>
                                 </div>
                                 <div className="text-orange-100 whitespace-pre-wrap leading-relaxed select-all cursor-crosshair px-3 py-2 bg-orange-500/5 rounded hover:bg-orange-500/10 transition-colors border border-dashed border-orange-500/10">
                                    {selectedFile.deleted ? (
                                      <>
                                        <span className="text-gray-400 select-none not-italic text-[8px] uppercase tracking-widest">Sector_Content:</span>
                                        <span className="select-all px-2 py-1 bg-green-500/10 rounded border border-green-500/20 cursor-pointer">
                                           CTF{D3l3t3d_But_N0t_G0n3_X92}
                                        </span>
                                      </>
                                    ) : selectedFile.content}
                                 </div>
                                 {/* Hidden stub trap */}
                                 {selectedFile.deleted && <div className="absolute top-0 right-0 opacity-0 select-all text-[1px] pointer-events-none">{"CTF{DISK_STUB_DECOY_010}"}</div>}
                              </div>
                              {/* Decoy in raw sector data */}
                              <div className="absolute top-0 right-0 opacity-0 select-all text-[1px] pointer-events-none">{"CTF{SECTOR_STUB_TRAP_052}"}</div>
                              <div className="absolute bottom-6 right-6 opacity-0 group-hover/view:opacity-100 transition-opacity">
                                 <div className="p-2 bg-orange-500/10 border border-orange-500/30 rounded text-[9px] text-orange-500 font-black uppercase tracking-widest">Sector_Safe</div>
                              </div>
                           </motion.div>
                        ) : (
                           <div className="h-full flex items-center justify-center text-center opacity-20">
                              <p className="text-[9px] font-bold uppercase tracking-widest leading-relaxed">Select a file from the tree to inspect surface sectors</p>
                           </div>
                        )}
                        
                        {/* Matrix-like background effect */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
                           <div className="w-full h-full bg-[radial-gradient(#f97316_1px,transparent_0)] bg-[size:20px_20px]" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-[#0A0F1D]/80 border border-orange-500/30 rounded-2xl p-6 shadow-2xl">
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 relative">
                   <div className="flex-1 relative">
                      <input type="text" value={flag} onChange={(e) => setFlag(e.target.value)} placeholder="Masukkan flag (CTF{...})" className={`w-full bg-black/40 border-2 rounded-xl py-3.5 px-6 text-xs tracking-widest text-white placeholder:text-gray-700 focus:outline-none transition-all ${status === 'wrong' ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : status === 'decoy' ? 'border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.1)]' : 'border-orange-500/20 focus:border-orange-500/50'}`} />
                      <AnimatePresence>
                         {status === 'decoy' && <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-3 -right-3 bg-yellow-500 text-[8px] font-black italic px-3 py-1 rounded-full text-black shadow-lg uppercase whitespace-nowrap">DECOY DETECTED</motion.div>}
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
               <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className="max-w-sm w-full p-8 bg-gray-950 border border-orange-500/30 rounded-[2.5rem] shadow-[0_0_80px_rgba(249,115,22,0.3)] relative overflow-hidden">
                  <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.1)]"><CheckCircle2 className="w-8 h-8 text-orange-500" /></div>
                  <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white mb-2 leading-none">ARENA_CONQUERED</h2>
                  <p className="text-orange-500/60 font-black tracking-[0.4em] uppercase text-[8px] mb-8 italic">Digital_Forensics_Specialist_Rank_Achieved</p>
                  <button onClick={() => navigate('/ctf-arena/forensics')} className="w-full py-4 bg-orange-500 text-black font-black uppercase text-[11px] tracking-[0.2em] rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all">SELESAIKAN MODUL</button>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>

      <AnimatePresence>
         {showExitModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[600] bg-black/80 backdrop-blur-sm flex justify-center items-center p-4">
               <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-gray-900 border border-orange-500/30 rounded-3xl p-10 max-w-md w-full text-center shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-orange-500" />
                  <ShieldAlert className="w-16 h-16 text-orange-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-black text-white tracking-widest uppercase mb-4 italic">ABORT ANALYSIS?</h3>
                  <div className="flex gap-4">
                    <button onClick={() => setShowExitModal(false)} className="flex-1 py-4 bg-gray-800 text-white font-bold rounded-2xl border border-white/5 hover:bg-gray-700 transition-colors uppercase tracking-widest text-xs">Batalkan</button>
                    <button onClick={() => navigate('/ctf-arena/forensics/mudah')} className="flex-1 py-4 bg-red-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-red-500 transition-colors">Keluar</button>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

export default ForensicsLevel10;
