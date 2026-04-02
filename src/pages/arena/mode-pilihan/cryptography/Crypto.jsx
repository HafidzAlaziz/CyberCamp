import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, 
  Globe, 
  Terminal, 
  Lock, 
  Zap, 
  Target, 
  CheckCircle2, 
  Shield, 
  Cpu, 
  Activity 
} from 'lucide-react';

const CryptographyHub = () => {
  const navigate = useNavigate();

  // Load persistent stats for WEB categoria
  const [levelStats] = useState(() => {
    const saved = localStorage.getItem('ctf_cryptography_stats');
    return saved ? JSON.parse(saved) : { 1: { stars: 0, bestTime: null } };
  });

  const missions = [
    {
      id: 1,
      title: "Operation: Imperial Shift",
      desc: "Pecahkan pergeseran pesan peninggalan bangsa Romawi kuno.",
      timeLimit: 120, // 2 minutes
      type: "CAESAR-CIPHER",
      active: true,
      stars: levelStats[1]?.stars || 0,
      bestTime: levelStats[1]?.bestTime || null,
      path: "/ctf-arena/cryptography/level/1"
    },
    {
      id: 2,
      title: "Operation: Numeric Base",
      desc: "Terjemahkan susunan karakter standar format teks 64 bit yang menutup jejak.",
      timeLimit: 180, // 3 minutes
      type: "BASE-64",
      active: levelStats[1]?.stars > 0,
      stars: levelStats[2]?.stars || 0,
      bestTime: levelStats[2]?.bestTime || null,
      path: "/ctf-arena/cryptography/level/2"
    },
    {
      id: 3,
      title: "Operation: Dot and Dash",
      desc: "Tafsirkan sandi telegram kuno yang dicegat dari aliran komunikasi musuh.",
      timeLimit: 180, // 3 minutes
      type: "MORSE-CODE",
      active: levelStats[2]?.stars > 0,
      stars: levelStats[3]?.stars || 0,
      bestTime: levelStats[3]?.bestTime || null,
      path: "/ctf-arena/cryptography/level/3"
    },
    {
      id: 4,
      title: "Operation: Machine Code",
      desc: "Konversikan sekuens bilangan nol dan satu menjadi teks ASCII biasa.",
      timeLimit: 240, // 4 minutes
      type: "BINARY",
      active: levelStats[3]?.stars > 0,
      stars: levelStats[4]?.stars || 0,
      bestTime: levelStats[4]?.bestTime || null,
      path: "/ctf-arena/cryptography/level/4"
    },
    {
      id: 5,
      title: "Operation: Base Hexa",
      desc: "Bongkar data dump berformat heksadesimal yang dicuri dari jaringan.",
      timeLimit: 240, // 4 minutes
      type: "HEXADECIMAL",
      active: levelStats[4]?.stars > 0,
      stars: levelStats[5]?.stars || 0,
      bestTime: levelStats[5]?.bestTime || null,
      path: "/ctf-arena/cryptography/level/5"
    },
    {
      id: 6,
      title: "Operation: Wheel of Thirteen",
      desc: "Putar kembali alfabet ke arah berlawanan dari pergeseran rotasi tiga belas standar.",
      timeLimit: 300, // 5 minutes
      type: "ROT-13",
      active: levelStats[5]?.stars > 0,
      stars: levelStats[6]?.stars || 0,
      bestTime: levelStats[6]?.bestTime || null,
      path: "/ctf-arena/cryptography/level/6"
    },
    {
      id: 7,
      title: "Operation: Mirror Image",
      desc: "Pecahkan susunan kriptografi pantulan di mana alfabet dicerminkan terbalik secara simetris.",
      timeLimit: 300, // 5 minutes
      type: "ATBASH",
      active: levelStats[6]?.stars > 0,
      stars: levelStats[7]?.stars || 0,
      bestTime: levelStats[7]?.bestTime || null,
      path: "/ctf-arena/cryptography/level/7"
    },
    {
      id: 8,
      title: "Operation: Nested Encrypt",
      desc: "Dekode format pembungkusan berlapis ganda dari satu sistem ke sistem lain secara beruntun.",
      timeLimit: 360, // 6 minutes
      type: "NESTED-DECODE",
      active: levelStats[7]?.stars > 0,
      stars: levelStats[8]?.stars || 0,
      bestTime: levelStats[8]?.bestTime || null,
      path: "/ctf-arena/cryptography/level/8"
    },
    {
      id: 9,
      title: "Operation: Vigenere Key",
      desc: "Gunakan kata pas kunci rahasia diplomatik untuk menerjemahkan sandi substitusi matriks.",
      timeLimit: 420, // 7 minutes
      type: "VIGENERE",
      active: levelStats[8]?.stars > 0,
      stars: levelStats[9]?.stars || 0,
      bestTime: levelStats[9]?.bestTime || null,
      path: "/ctf-arena/cryptography/level/9"
    },
    {
      id: 10,
      title: "Operation: Reversed Helix",
      desc: "Bongkar data heksadesimal mentah yang urutannya dibalik oleh lapisan enkriptor khusus.",
      timeLimit: 600, // 10 minutes
      type: "BOSS-CIPHER",
      active: levelStats[9]?.stars > 0,
      stars: levelStats[10]?.stars || 0,
      bestTime: levelStats[10]?.bestTime || null,
      path: "/ctf-arena/cryptography/level/10"
    }
  ];

  const formatTime = (seconds) => {
    if (!seconds) return "--:--";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTierColors = (id) => {
    return {
      bgMain: 'bg-yellow-500/5', borderMain: 'border-yellow-500/50', shadowMain: 'shadow-[0_0_15px_rgba(6,182,212,0.3)]',
      bgActive: 'bg-yellow-500', borderActive: 'border-yellow-400', textActive: 'text-yellow-400', textDim: 'text-yellow-500/60',
      shadowSmall: 'shadow-[0_0_10px_rgba(6,182,212,0.4)]', bgHover: 'hover:bg-yellow-400',
      textSolid: 'text-yellow-500', borderSolid: 'border-yellow-500', bgHeader: 'bg-yellow-500/10', borderHeader: 'border-yellow-500/20',
      gradient: 'from-yellow-500/50', textBlack: 'text-black', rgb: '6, 182, 212'
    };
  };

  const [selectedMission, setSelectedMission] = useState(missions[0]);
  const location = useLocation();

  // Handle auto-select last visited level from state
  React.useEffect(() => {
    if (location.state?.lastLevel) {
      const lastMission = missions.find(m => m.id === location.state.lastLevel);
      if (lastMission) {
        setSelectedMission(lastMission);
      }
    }
  }, [location.state]);

  const selT = getTierColors(selectedMission.id);

  return (
    <div className="relative min-h-screen bg-[#020617] text-white font-mono overflow-hidden flex flex-col crypto-page-theme">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-yellow-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-yellow-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex flex-col min-h-screen w-full">
        {/* Header */}
        <header className="flex justify-between items-end mb-10 pb-6 border-b border-white/5">
          <div className="flex items-center gap-5">
            <button 
              onClick={() => navigate('/ctf-arena/cryptography')}
              className="p-2.5 bg-white/5 hover:bg-yellow-500/10 rounded-xl transition-all border border-white/10 hover:border-yellow-500/30 group"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-yellow-400" />
            </button>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" />
                <span className="text-[9px] uppercase font-black tracking-[0.3em] text-yellow-500/60">NODE: CRYPTOGRAPHY</span>
              </div>
              <h1 className="text-2xl font-black italic tracking-tighter uppercase text-white leading-none">
                MISSION_<span className="text-yellow-400">HUB</span>
              </h1>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
             <div className="flex flex-col items-end">
                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest leading-none mb-1">Status</span>
                <span className="text-[10px] font-black text-yellow-500 uppercase tracking-tighter italic leading-none">INFILTRATION_ACTIVE</span>
             </div>
             <div className="p-2.5 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                <Globe className="w-4 h-4 text-yellow-400" />
             </div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-8 flex-1">
          {/* Left Side: Mission List */}
          <div className="col-span-12 lg:col-span-8 flex flex-col">
            <div className="flex items-center gap-4 mb-8">
               <div className="h-px flex-1 bg-gradient-to-r from-yellow-500/50 to-transparent" />
               <h2 className="text-[11px] font-black text-white/40 tracking-[0.4em] uppercase whitespace-nowrap italic">Daftar_Misi_Tersedia</h2>
            </div>

            <div className="grid gap-3">
              {missions.map((mission) => {
                const t = getTierColors(mission.id);
                const isSelected = selectedMission.id === mission.id;
                return (
                <motion.div
                  key={mission.id}
                  whileHover={mission.active ? { x: 5 } : {}}
                  onClick={() => mission.active && setSelectedMission(mission)}
                  className={`relative p-5 rounded-xl border-2 transition-all cursor-pointer group overflow-hidden ${
                    isSelected 
                      ? `${t.bgMain} ${t.borderMain} shadow-lg` 
                      : mission.active 
                        ? 'bg-black/40 border-white/5 hover:border-white/10 shadow-inner' 
                        : 'bg-black/60 border-white/5 opacity-40 grayscale cursor-not-allowed shadow-none'
                  }`}
                  style={{
                    filter: mission.active ? 'none' : 'grayscale(1)',
                    borderColor: mission.active ? (isSelected ? `rgba(${t.rgb}, 0.6)` : `rgba(${t.rgb}, 0.25)`) : undefined
                  }}
                >
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-5">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center border font-black text-base italic ${
                        isSelected ? `${t.bgActive} ${t.textBlack} ${t.borderActive} ${t.shadowMain}` : 'bg-white/5 text-white/20 border-white/10'
                      }`}>
                        {mission.id.toString().padStart(2, '0')}
                      </div>
                      <div>
                        <h3 className={`text-base font-black italic tracking-tighter uppercase transition-colors ${
                          isSelected ? t.textActive : 'text-white'
                        }`}>
                          {mission.title}
                        </h3>
                        <div className="flex items-center gap-2.5 mt-0.5">
                          <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">{mission.type}</span>
                          <div className="w-1 h-1 bg-white/10 rounded-full" />
                          <span className={`text-[9px] font-black uppercase tracking-widest ${t.textDim} italic`}>
                             TARGET: {formatTime(mission.timeLimit)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-5">
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3].map((s) => (
                          <div key={s} className={`w-2 h-6 rounded-sm transition-all ${
                            mission.stars >= s ? `${t.bgActive} ${t.shadowSmall}` : 'bg-white/5'
                          }`} />
                        ))}
                      </div>
                      {!mission.active ? (
                        <Lock className="w-4 h-4 text-white/10" />
                      ) : (
                        <ChevronLeft className="w-5 h-5 rotate-180 text-white/10 group-hover:text-white transition-colors" />
                      )}
                    </div>
                  </div>
                </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Mission Briefing */}
          <div className="col-span-12 lg:col-span-4 flex flex-col">
            <div className="flex items-center gap-4 mb-8">
               <h2 className="text-[11px] font-black text-white/40 tracking-[0.4em] uppercase whitespace-nowrap italic">Mission_Briefing</h2>
               <div className={`h-px flex-1 bg-gradient-to-l ${selT.gradient} to-transparent`} />
            </div>

            <div className={`bg-[#0A0F1D]/80 border ${selT.borderHeader} rounded-2xl p-6 sticky top-8 flex-1 flex flex-col overflow-hidden shadow-2xl`}>
               <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                     <div className={`p-3 ${selT.bgHeader} border ${selT.borderHeader} rounded-xl`}>
                        <Target className={`w-5 h-5 ${selT.textSolid}`} />
                     </div>
                     <div className="text-right">
                        <span className="text-[8px] font-black text-white/20 uppercase tracking-widest block mb-1 italic">Mission_ID</span>
                        <span className={`text-lg font-black ${selT.textSolid} italic uppercase leading-none`}>#{selectedMission.id.toString().padStart(3, '0')}</span>
                     </div>
                  </div>

                  <h3 className="text-xl font-black italic tracking-tighter uppercase text-white mb-3">
                     {selectedMission.title}
                  </h3>
                  <p className="text-[11px] text-gray-400 font-bold leading-relaxed mb-8 italic uppercase tracking-wider">
                     {selectedMission.desc}
                  </p>

                  <div className="space-y-2 mb-6 border-y border-white/5 py-6">
                     <div className="flex items-center justify-between p-3.5 bg-white/5 rounded-xl border border-white/5">
                        <span className="text-[9px] font-black text-white/30 uppercase tracking-widest leading-none italic">Waktu Terbaik</span>
                        <span className={`text-[11px] font-black ${selT.textActive} uppercase italic leading-none`}>{formatTime(selectedMission.bestTime)}</span>
                     </div>
                     <div className="flex items-center justify-between p-3.5 bg-white/5 rounded-xl border border-white/5">
                        <span className="text-[9px] font-black text-white/30 uppercase tracking-widest leading-none italic">Target Ops</span>
                        <span className="text-[11px] font-black text-white/80 uppercase italic leading-none">{formatTime(selectedMission.timeLimit)}</span>
                     </div>
                  </div>

                  <div className="mb-8">
                     <h4 className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] mb-4 italic">Objektif_Misi:</h4>
                     <div className="space-y-2">
                        <div className="flex items-center gap-3 text-[10px] font-bold text-gray-500 italic uppercase">
                           <div className={`w-3 h-3 border rounded-sm flex items-center justify-center ${selectedMission.stars >= 1 ? `${selT.borderSolid} ${selT.textSolid}` : 'border-white/10'}`}>
                              {selectedMission.stars >= 1 && <CheckCircle2 className="w-2 h-2" />}
                           </div>
                           <span>Selesaikan Infiltrasi Sektor</span>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] font-bold text-gray-500 italic uppercase">
                           <div className={`w-3 h-3 border rounded-sm flex items-center justify-center ${selectedMission.stars >= 2 ? `${selT.borderSolid} ${selT.textSolid}` : 'border-white/10'}`}>
                              {selectedMission.stars >= 2 && <CheckCircle2 className="w-2 h-2" />}
                           </div>
                           <span>Waktu Operasional &lt; {formatTime(selectedMission.timeLimit)}</span>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 italic uppercase">
                           <div className={`w-3 h-3 border rounded-sm flex items-center justify-center ${selectedMission.stars >= 3 ? `${selT.borderSolid} ${selT.textSolid}` : 'border-white/10'}`}>
                              {selectedMission.stars >= 3 && <CheckCircle2 className="w-2 h-2" />}
                           </div>
                           <span>Tanpa Bantuan Hint Digital</span>
                        </div>
                     </div>
                  </div>

                  <button 
                     onClick={() => navigate(selectedMission.path)}
                     className={`w-full py-4 ${selT.bgActive} ${selT.bgHover} ${selT.textBlack} font-black uppercase text-[11px] tracking-[0.2em] rounded-xl transition-all ${selT.shadowMain} active:scale-[0.98] flex items-center justify-center gap-3 group/btn`}
                  >
                     <span>Mulai Misi</span>
                     <Zap className="w-4 h-4 group-hover/btn:animate-pulse" />
                  </button>
               </div>

               {/* Tactical Grid Overlay */}
               <div className={`absolute inset-0 pointer-events-none border ${selT.borderMain} rounded-3xl m-1 opacity-50`} />
               <div className="absolute top-4 left-4 flex gap-1">
                  <div className={`w-1 h-1 ${selT.bgActive} opacity-30 rounded-full`} />
                  <div className={`w-1 h-1 ${selT.bgActive} opacity-30 rounded-full`} />
                  <div className={`w-1 h-1 ${selT.bgActive} opacity-30 rounded-full`} />
               </div>
            </div>
          </div>
        </div>

        {/* Footer Status */}
        <footer className="mt-12 flex justify-between items-center text-[10px] text-gray-800 font-black border-t border-white/5 pt-8">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Activity className="w-3 h-3 text-yellow-500" />
              <span className="tracking-[0.2em] uppercase italic">Node_Status: OPERATIONAL</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="w-3 h-3 text-yellow-500" />
              <span className="tracking-[0.2em] uppercase italic">Grid: X-772_CRYPTO</span>
            </div>
          </div>
          <div className="tracking-[0.2em] uppercase italic flex items-center gap-4">
             <span className="text-white/20 italic">CyberCamp_V1.4</span>
             <div className="flex items-center gap-1.5 p-1 px-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-ping" />
                <span className="text-yellow-500">SECURE_LINK_STABLE</span>
             </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CryptographyHub;
