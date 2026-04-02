import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Image,
  ChevronLeft,
  X,
  Zap,
  Terminal,
  ShieldAlert,
  Search,
  Camera,
  FileText
} from 'lucide-react';

const MudahLevel7 = () => {
  const navigate = useNavigate();

  // Timer Logic
  const [elapsed, setElapsed] = useState(0);

  const [hasUsedHint, setHasUsedHint] = useState(() => {
    return localStorage.getItem('ctf_mudah_level7_hint_used') === 'true';
  });

  // Calculate dynamic stars
  const timeLimit = 600; // 10 minutes
  const isTimeFailed = elapsed > timeLimit;
  const hintPenalty = hasUsedHint ? 1 : 0;
  const timePenalty = isTimeFailed ? 1 : 0;
  const stars = Math.max(1, 3 - hintPenalty - timePenalty);

  const [flag, setFlag] = useState('');
  const [status, setStatus] = useState('active');
  const [attempts, setAttempts] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [completionTime, setCompletionTime] = useState(null);
  const [showExitModal, setShowExitModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Challenge Config - ANTI CHEAT via atob
  const [realFlag] = useState(() => atob("Q1RGe00zdDRkNHQ0X1IzdjM0bDNkfQ==")); // CTF{M3t4d4t4_R3v34l3d}
  const [decoyFlag] = useState(() => atob("Q1RGe1RoMXNfMXNfTjB0X1RoM19FeDFmfQ==")); // CTF{Th1s_1s_N0t_Th3_Ex1f}

  const files = [
    {
      id: 1,
      name: 'pemandangan.jpg',
      size: '4.2 MB',
      type: 'image/jpeg',
      meta: {
        make: 'Apple', model: 'iPhone 14 Pro', software: 'iOS 17.0',
        width: '4032', height: '3024',
        comment: 'Liburan di pantai', description: 'Pemandangan indah saat senja.'
      }
    },
    {
      id: 2,
      name: 'dokumen_rahasia_v2.png',
      size: '1.8 MB',
      type: 'image/png',
      meta: {
        make: 'Sony', model: 'ILCE-7M3', software: 'Adobe Photoshop 2023',
        width: '1920', height: '1080',
        comment: `WARNING: DECOY TOKEN DETECTED`, description: decoyFlag
      }
    },
    {
      id: 3,
      name: 'top_secret.jpeg',
      size: '2.4 MB',
      type: 'image/jpeg',
      meta: {
        make: 'Canon', model: 'EOS 5D Mark IV', software: 'Adobe Lightroom',
        width: '6720', height: '4480',
        comment: `Bypass token ${decoyFlag} is not for prod`, description: realFlag
      }
    }
  ];

  const handleSelectFile = (file) => {
    if (selectedFile?.id === file.id && !isAnalyzing) return;
    setSelectedFile(file);
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  useEffect(() => {
    if (status !== 'complete') {
      const timer = setInterval(() => {
        setElapsed(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanFlag = flag.trim();
    if (cleanFlag === realFlag) {
      const timeTakenStr = formatTime(elapsed);
      setCompletionTime(timeTakenStr);
      setStatus('complete');

      const savedStats = localStorage.getItem('ctf_mode_acak_stats');
      const stats = savedStats ? JSON.parse(savedStats) : {};
      const currentBestStars = stats['mudah-7']?.stars || 0;
      if (stars >= currentBestStars) {
        stats['mudah-7'] = { stars: stars, bestTime: timeTakenStr, conditions: [true, !hasUsedHint, !isTimeFailed] };
        localStorage.setItem('ctf_mode_acak_stats', JSON.stringify(stats));
      }
      localStorage.removeItem('ctf_mudah_level7_hint_used');
    } else if (cleanFlag === decoyFlag) {
      setStatus('decoy');
      setAttempts(prev => [...prev, cleanFlag]);
      setTimeout(() => setStatus('active'), 2000);
    } else if (cleanFlag !== "") {
      setStatus('wrong');
      setAttempts(prev => [...prev, cleanFlag]);
      setTimeout(() => setStatus('active'), 2000);
    }
    setFlag('');
  };

  const handleExit = () => {
    localStorage.removeItem('ctf_mudah_level7_hint_used');
    navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 'mudah-7' } });
  };

  if (status === 'complete') {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 font-mono text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_70%)]" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="z-10 bg-gray-900 border-4 border-cyan-500 p-12 rounded-3xl text-center max-w-xl shadow-[0_0_50px_rgba(6,182,212,0.3)]">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-cyan-500/30">
            <Image className="w-12 h-12 text-cyan-400 drop-shadow-[0_0_10px_#06b6d4]" />
          </motion.div>
          <h1 className="text-5xl font-black italic tracking-tighter mb-2 text-white uppercase leading-none">MISSION COMPLETE</h1>
          <p className="text-cyan-500 font-bold tracking-[0.3em] mb-4 text-[10px]">SECTOR: MEDIA // METADATA_EXTRACTED</p>
          <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-2xl py-6 px-10 mb-8 inline-block">
            <div className="text-[10px] font-black text-gray-500 tracking-[0.4em] uppercase mb-4">Misi terselesaikan dalam</div>
            <div className="text-4xl font-black text-white italic tracking-tighter mb-6">{completionTime}</div>
            <div className="flex justify-center gap-4">
              {[1, 2, 3].map(s => (
                <Zap key={s} className={`w-10 h-10 transition-all duration-500 ${s <= stars ? 'text-cyan-400 fill-cyan-400 drop-shadow-[0_0_15px_#06b6d4]' : 'text-gray-800 fill-transparent'}`} />
              ))}
            </div>
          </div>
          <button onClick={() => navigate('/ctf-arena/mode-acak', { state: { returnToLevel: 'mudah-7' } })} className="w-full bg-cyan-500 text-black font-black py-4 rounded-xl hover:bg-cyan-400 transition-all text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(6,182,212,0.2)]">KEMBALI KE MAP TAKTIS</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-4 md:p-8 flex flex-col overflow-hidden relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #082f49 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col relative z-10">

        {/* HEADER AREA */}
        <div className="flex justify-between items-start mb-8 relative">
          <div className="flex gap-4 items-start z-10">
            <button
              onClick={() => setShowExitModal(true)}
              className="mt-1 p-2 bg-gray-900 border border-cyan-500/30 rounded-xl hover:bg-cyan-500/20 text-gray-400 hover:text-cyan-400 transition-all group"
              title="Abort Mission"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_#06b6d4]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400/80">TARGET: SECTOR_MEDIA</span>
              </div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none shadow-cyan-500/20">
                LEVEL 7: <span className="text-cyan-500 drop-shadow-[0_0_10px_#06b6d4]">STEGANOGRAFI MEDIA</span>
              </h1>
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
            <div className="text-[8px] font-black text-gray-700 tracking-[0.5em] uppercase mb-2">RANK_EFFICIENCY</div>
            <div className="flex gap-3">
              {[1, 2, 3].map(s => (
                <Zap key={s} className={`w-6 h-6 transition-all duration-700 ${s <= stars ? 'text-cyan-400 fill-cyan-400 drop-shadow-[0_0_10px_#06b6d4]' : 'text-white/10 fill-transparent opacity-20'}`} />
              ))}
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] font-black text-cyan-500/50 tracking-[0.3em] uppercase mb-1">ELAPSED_TIME</div>
            <div className="text-4xl font-black italic tracking-tighter transition-colors duration-500 text-cyan-600">
              {formatTime(elapsed)}
            </div>
          </div>
        </div>

        {/* LAYOUT */}
        <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">

          {/* LEFT SIDE: BRIEFING */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <div className="bg-gray-950/50 border border-cyan-500/30 rounded-2xl p-6 flex-1 flex flex-col relative overflow-hidden group shadow-[inset_0_0_20px_rgba(6,182,212,0.05)]">
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 shadow-[0_0_15px_#06b6d4]" />
              <div className="flex items-center gap-3 mb-6">
                <Image className="w-5 h-5 text-cyan-400" />
                <h2 className="text-sm font-black text-cyan-200 uppercase tracking-widest">BRIEFING MISI</h2>
              </div>
              <div className="text-xs leading-relaxed text-gray-400 overflow-y-auto pr-2 custom-scrollbar space-y-4 italic">
                <p>{" > "} Target: Sinkronisasi server menangkap beberapa file gambar yang dicegat dari jaringan sindikat.</p>
                <p>{" > "} Intelligence: Kurir target terkenal suka menyembunyikan informasi rahasia di dalam atribut metadata foto meskipun terlihat seperti foto biasa.</p>
                <p>{" > "} Tugas lo: Pilih file di sebelah kanan untuk di-scan menggunakan simulasi <code className="text-cyan-400">exiftool</code>. Baca baik-baik urutan <i>property</i>-nya, hati-hati terhadap *Decoy Token* jebakan.</p>
                <div className="p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-lg mt-4">
                  <p className="text-cyan-400 font-black tracking-tight uppercase mb-1 flex items-center gap-2">
                    <Camera className="w-3 h-3" /> ANALISIS EXIF DATA
                  </p>
                  <p className="text-[9px] text-gray-600 uppercase normal-case">EXIF (Exchangeable Image File Format) menyimpan data setting kamera dan bisa diedit nilainya untuk menyisipkan pesan.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (!hasUsedHint) {
                  setHasUsedHint(true);
                  localStorage.setItem('ctf_mudah_level7_hint_used', 'true');
                }
                setShowHint(!showHint);
              }}
              className={`border rounded-xl p-4 flex items-center justify-center gap-3 group transition-all shadow-[0_0_20px_rgba(6,182,212,0.1)] ${hasUsedHint ? 'border-cyan-400 bg-cyan-950/40 text-cyan-400' : 'border-cyan-500/40 bg-cyan-950/20 hover:bg-cyan-950/30 text-cyan-200'}`}
            >
              <Zap className={`w-4 h-4 transition-colors ${hasUsedHint ? 'fill-cyan-400' : ''}`} />
              <span className="text-xs font-black uppercase tracking-widest">{hasUsedHint ? 'HINT ACTIVE (-1 BINTANG)' : '💡 MINTA KLU (-1 BINTANG)'}</span>
            </button>

            <AnimatePresence>
              {showHint && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-gray-900/50 border border-white/5 rounded-xl p-4 text-[10px] text-gray-500 italic uppercase leading-tight overflow-hidden mt-3">
                  Dari sekian banyak properti kamera (seperti Aperture, ISO, Focal Length), perhatikan bagian tekstual seperti <span className="text-cyan-400 font-mono">User Comment</span>, <span className="text-cyan-400 font-mono">Copyright</span> atau <span className="text-cyan-400 font-mono">Description</span>.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CENTER: WORKSPACE */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            <div className="flex-1 bg-black border border-cyan-500/20 rounded-2xl flex flex-col overflow-hidden relative group shadow-2xl">

              <div className="h-10 bg-gray-900/80 border-b border-white/5 flex items-center px-4 gap-4 backdrop-blur-md">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-cyan-500/50" />
                  <div className="w-3 h-3 rounded-full bg-cyan-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-3 h-3 text-cyan-500" />
                  <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">ExifTool v12.60 - Batch Scanner</span>
                </div>
              </div>

              <div className="flex-1 p-6 font-mono text-[11px] md:text-sm overflow-y-auto custom-scrollbar select-text flex flex-col md:flex-row gap-6">

                {/* LEFT: File List */}
                <div className="w-full md:w-1/3 flex flex-col gap-3 border-r border-white/5 md:pr-4">
                  <div className="text-[10px] font-black tracking-widest uppercase text-cyan-500 mb-2">// DIRECTORY: /intercepts/</div>
                  {files.map(f => (
                    <div
                      key={f.id}
                      onClick={() => handleSelectFile(f)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${selectedFile?.id === f.id ? 'bg-cyan-900/40 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'bg-gray-900/50 border-white/10 hover:border-cyan-500/50 hover:bg-white/5'}`}
                    >
                      <Image className={`w-6 h-6 ${selectedFile?.id === f.id ? 'text-cyan-400' : 'text-gray-500'}`} />
                      <div className="min-w-0">
                        <div className={`text-xs font-bold truncate ${selectedFile?.id === f.id ? 'text-white' : 'text-gray-300'}`}>{f.name}</div>
                        <div className="text-[9px] text-gray-500">{f.size} • {f.type.split('/')[1].toUpperCase()}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* RIGHT: ExifTool Display */}
                <div className="flex-1 relative min-h-[350px] overflow-x-hidden pt-2 md:pt-0">
                  <AnimatePresence mode="wait">
                    {!selectedFile ? (
                      <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center text-gray-600">
                        <FileText className="w-12 h-12 mb-4 opacity-50" />
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">Pilih file untuk dianalisis</div>
                      </motion.div>
                    ) : isAnalyzing ? (
                      <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="relative w-20 h-20 mb-6">
                          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500" />
                          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute inset-0 rounded-full bg-cyan-500/20 blur-md" />
                          <Search className="absolute inset-0 m-auto w-8 h-8 text-cyan-400" />
                        </div>
                        <div className="text-cyan-400 font-black tracking-[0.4em] uppercase text-xs mb-2 text-center">Extracting Metadata...</div>
                        <div className="text-[9px] text-gray-500 font-mono text-center">Running exiftool on {selectedFile.name}</div>

                        <div className="w-full max-w-xs h-1 bg-gray-900 mt-6 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 2, ease: "linear" }} className="h-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col space-y-1 text-gray-300 w-full pb-4">
                        <div className="text-[9px] font-black tracking-widest text-cyan-500 uppercase border-b border-white/10 pb-2 mb-3">// EXIF_DATA_EXTRACTED</div>
                        <div className="grid grid-cols-[130px_1fr] md:grid-cols-[180px_1fr] pl-1">
                          <span className="text-cyan-500/70 truncate pr-2">ExifTool Version</span>
                          <span className="text-green-400 break-words">: 12.60</span>
                        </div>
                        <div className="grid grid-cols-[130px_1fr] md:grid-cols-[180px_1fr] pl-1">
                          <span className="text-cyan-500/70 truncate pr-2">File Name</span>
                          <span className="text-green-400 break-words">: {selectedFile.name}</span>
                        </div>
                        <div className="grid grid-cols-[130px_1fr] md:grid-cols-[180px_1fr] pl-1">
                          <span className="text-cyan-500/70 truncate pr-2">File Size</span>
                          <span className="text-green-400 break-words">: {selectedFile.size}</span>
                        </div>
                        <div className="grid grid-cols-[130px_1fr] md:grid-cols-[180px_1fr] pl-1">
                          <span className="text-cyan-500/70 truncate pr-2">Directory</span>
                          <span className="text-green-400 break-words">: /dev/null/intercepts</span>
                        </div>
                        <div className="grid grid-cols-[130px_1fr] md:grid-cols-[180px_1fr] pl-1">
                          <span className="text-cyan-500/70 truncate pr-2">MIME Type</span>
                          <span className="text-green-400 break-words">: {selectedFile.type}</span>
                        </div>
                        <div className="grid grid-cols-[130px_1fr] md:grid-cols-[180px_1fr] mt-2 border-t border-white/5 pt-2 pl-1">
                          <span className="text-cyan-500/70 truncate pr-2">Make</span>
                          <span className="text-green-400 break-words">: {selectedFile.meta.make}</span>
                        </div>
                        <div className="grid grid-cols-[130px_1fr] md:grid-cols-[180px_1fr] pl-1">
                          <span className="text-cyan-500/70 truncate pr-2">Model</span>
                          <span className="text-green-400 break-words">: {selectedFile.meta.model}</span>
                        </div>
                        <div className="grid grid-cols-[130px_1fr] md:grid-cols-[180px_1fr] pl-1">
                          <span className="text-cyan-500/70 truncate pr-2">Software</span>
                          <span className="text-green-400 break-words">: {selectedFile.meta.software}</span>
                        </div>
                        <div className="grid grid-cols-[130px_1fr] md:grid-cols-[180px_1fr] mt-2 border-t border-white/5 pt-2 pl-1">
                          <span className="text-cyan-500/70 truncate pr-2">Image Width</span>
                          <span className="text-green-400 break-words">: {selectedFile.meta.width}</span>
                        </div>
                        <div className="grid grid-cols-[130px_1fr] md:grid-cols-[180px_1fr] pl-1">
                          <span className="text-cyan-500/70 truncate pr-2">Image Height</span>
                          <span className="text-green-400 break-words">: {selectedFile.meta.height}</span>
                        </div>
                        <div className="grid grid-cols-[130px_1fr] md:grid-cols-[180px_1fr] mt-2 border-t border-cyan-500/30 pt-2 pb-2 bg-cyan-950/20 px-2 rounded">
                          <span className="text-yellow-500 font-bold truncate pr-2">Image Description</span>
                          <span className="text-green-400 font-bold break-words">: <span className={selectedFile.id === 2 || selectedFile.id === 3 ? "text-red-400" : "text-green-400"}>{selectedFile.meta.description}</span></span>
                        </div>
                        <div className="grid grid-cols-[130px_1fr] md:grid-cols-[180px_1fr] pl-1 mt-2 border-t border-white/5 pt-2">
                          <span className="text-cyan-500/70 truncate pr-2">Copyright</span>
                          <span className="text-gray-400 italic break-words">: Shadow Syndicate Inc.</span>
                        </div>
                        <div className="grid grid-cols-[130px_1fr] md:grid-cols-[180px_1fr] pl-1">
                          <span className="text-cyan-500/70 truncate pr-2">User Comment</span>
                          <span className="text-gray-500 italic break-words">: {selectedFile.meta.comment}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="absolute inset-0 bg-cyan-500/5 opacity-10 pointer-events-none" />
            </div>

            {/* SUBMISSION */}
            <div className="bg-gray-900/40 border border-cyan-500/30 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10"><Terminal className="w-12 h-12 text-cyan-400" /></div>
              <form onSubmit={handleSubmit} className="relative z-10 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={flag}
                    onChange={(e) => setFlag(e.target.value)}
                    placeholder="Masukkan flag di sini (CTF_{...})"
                    className={`w-full bg-black/60 border-2 rounded-xl py-4 px-6 text-sm tracking-widest text-white placeholder:text-gray-700 focus:outline-none transition-all ${status === 'wrong' || status === 'decoy' ? 'border-red-500 shadow-[0_0_15px_#ef4444]' : 'border-cyan-500/40 focus:border-cyan-500 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)]'}`}
                  />
                  <AnimatePresence>
                    {status === 'wrong' && <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-3 -right-3 bg-red-600 text-[8px] font-black italic px-3 py-1 rounded-full text-white shadow-lg uppercase">ACCESS DENIED</motion.div>}
                    {status === 'decoy' && <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-3 -right-3 bg-yellow-600 text-[8px] font-black italic px-3 py-1 rounded-full text-black shadow-lg uppercase">DECOY DETECTED</motion.div>}
                  </AnimatePresence>
                </div>
                <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase text-xs tracking-[0.2em] px-10 py-4 rounded-xl transition-all active:scale-95 shadow-[0_10px_30px_rgba(6,182,212,0.3)]">[ SUBMIT FLAG ]</button>
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
            <span className="text-cyan-500/50">{" > "} SYSTEM: OPERATIONAL</span>
            <span className="text-gray-800">//</span>
            <span>MODE: ACAK</span>
            <span className="text-gray-800">//</span>
            <span>LEVEL: 7</span>
          </div>
          <div className="text-[8px] font-bold uppercase tracking-tighter italic opacity-50">-- CORE_GRID_ESTABLISHED // METADATA_READ --</div>
        </div>

      </div>
      <AnimatePresence>
        {showExitModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex justify-center items-center p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.1)]">
              <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500" />
              <ShieldAlert className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
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

export default MudahLevel7;
