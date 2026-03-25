import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ShieldAlert, Cloud, Server, Database, Globe, Briefcase, PlayCircle } from 'lucide-react';

const IntroBigThree = () => {
  const [selectedCloud, setSelectedCloud] = useState(null);

  const clouds = [
    {
      id: 'aws',
      name: 'AWS',
      icon: <Server className="w-8 h-8" />,
      title: 'Amazon Web Services',
      pros: 'Kelebihan: Paling matang (senior), layanan terbanyak, rajanya market share ibarat hypermarket raksasa.',
      cons: 'Bahaya: Saking banyaknya fitur, gampang banget salah setting misal lupa nutup gembok folder.',
      colors: {
        border: 'border-orange-500',
        bg: 'bg-orange-900/30',
        text: 'text-orange-400',
        shadow: 'shadow-[0_0_20px_rgba(249,115,22,0.4)]'
      }
    },
    {
      id: 'azure',
      name: 'Azure',
      icon: <Briefcase className="w-8 h-8" />,
      title: 'Microsoft Azure',
      pros: 'Kelebihan: Favorit edisi kantoran (Enterprise) yang udah jaya pakai Windows & Office 365.',
      cons: 'Bahaya: Azure AD (Entra ID) jadi target utama hacker buat nyuri identitas/bocorin data via phishing.',
      colors: {
        border: 'border-blue-500',
        bg: 'bg-blue-900/30',
        text: 'text-blue-400',
        shadow: 'shadow-[0_0_20px_rgba(59,130,246,0.4)]'
      }
    },
    {
      id: 'gcp',
      name: 'GCP',
      icon: <Database className="w-8 h-8" />,
      title: 'Google Cloud Platform',
      pros: 'Kelebihan: Rajanya AI, Lab Ilmuwan Data, dan Machine Learning kaya BigQuery.',
      cons: 'Bahaya: Misconfigurasi akses API, sering ada kunci akses robot (Service Account) bocor ke publik.',
      colors: {
        border: 'border-green-500',
        bg: 'bg-green-900/30',
        text: 'text-green-500',
        shadow: 'shadow-[0_0_20px_rgba(34,197,94,0.4)]'
      }
    }
  ];

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
            <Globe className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm text-cyan-400 tracking-[0.3em] uppercase font-black">Stage 5 · Modul 4: Cloud Providers</h1>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              INTRO: THE BIG THREE
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <section>
              <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-6 leading-tight">
                Kenalan Sama <br/>
                <span className="text-cyan-500" style={{ textShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }}>RAKSASA INTERNET</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-base">
                Kenapa cuma ngomongin 3 <span className="text-white font-bold underline decoration-cyan-500 underline-offset-4">Provider Cloud</span> ini?
              </p>
            </section>

            <div className="space-y-6 text-sm leading-relaxed text-gray-400">
               <p>
                 Karena ketiganya (AWS, Azure, GCP) yang menguasai hampir seluruh internet di dunia! Startup, perbankan raksasa, sampe game online multinasional nyewa server di salah satu (atau kombinasi) dari mereka bertiga.
               </p>
               
               <ul className="space-y-2">
                 <li><span className="text-orange-400 font-bold">AWS (Amazon):</span> Rajanya market share, kayak Hypermarket palugada semua ada.</li>
                 <li><span className="text-blue-400 font-bold">Azure (Microsoft):</span> Edisi Kantoran. Raja integrasi sistem Enterprise.</li>
                 <li><span className="text-green-500 font-bold">GCP (Google):</span> Surganya anak Data Analytics & AI (Lab Ilmuwan Data).</li>
               </ul>

               <div className="p-6 bg-cyan-900/10 border border-cyan-500/30 rounded-2xl relative overflow-hidden group mt-8">
                  <div className="flex items-center gap-3 mb-4">
                     <ShieldAlert className="w-5 h-5 text-cyan-400" />
                     <p className="text-white font-black italic uppercase tracking-widest text-[10px]">Konteks Hacker:</p>
                  </div>
                  <p className="italic text-gray-400 text-xs leading-relaxed">
                    "Belajar sekuriti di Cloud itu berarti lo harus hafal <span className="text-cyan-300 font-bold">'bahasa'</span> masing-masing provider ini. Cara ngamanin AWS beda jauh sama cara nahan serangan hacker di Azure atau GCP. Beda rumah = beda kunci!"
                  </p>
               </div>
            </div>
          </motion.div>

          {/* Right Column: Interaction */}
          <div className="sticky top-12">
            <div className="p-8 border-2 border-cyan-500/30 rounded-xl bg-gray-900/50 relative overflow-hidden flex flex-col shadow-2xl transition-colors duration-500">
              
              <div className="mb-8 text-center relative z-10 flex flex-col items-center">
                 <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">SIMULASI: PILIH SENJATAMU</h2>
                 <p className="text-[9px] text-cyan-500 font-bold tracking-[0.2em] mt-1">THREAT_INTEL_GATHERING</p>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center space-y-6 relative z-10 w-full">
                 
                 {/* Cloud Selection Buttons */}
                 <div className="grid grid-cols-3 gap-4 w-full h-24">
                   {clouds.map((cloud) => (
                     <button
                       key={cloud.id}
                       onClick={() => setSelectedCloud(cloud.id)}
                       className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 ${selectedCloud === cloud.id ? `${cloud.colors.border} ${cloud.colors.bg} ${cloud.colors.shadow} scale-110 z-10` : 'border-gray-700 bg-black/40 text-gray-500 hover:border-gray-500'}`}
                     >
                       <div className={selectedCloud === cloud.id ? cloud.colors.text : ''}>{cloud.icon}</div>
                       <span className={`mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest ${selectedCloud === cloud.id ? 'text-white' : ''}`}>{cloud.name}</span>
                     </button>
                   ))}
                 </div>

                 {/* Information Display */}
                 <div className="w-full min-h-[16rem] bg-black/50 border border-cyan-500/30 rounded-xl p-6 relative overflow-hidden mt-4">
                    <AnimatePresence mode="wait">
                       {!selectedCloud ? (
                         <motion.div 
                           key="empty"
                           initial={{ opacity: 0 }} 
                           animate={{ opacity: 1 }} 
                           exit={{ opacity: 0 }}
                           className="h-full min-h-[12rem] flex flex-col items-center justify-center text-gray-600 gap-3"
                         >
                           <PlayCircle className="w-8 h-8 animate-pulse" />
                           <p className="text-xs uppercase font-bold tracking-widest text-center">Klik provider untuk info intelijen</p>
                         </motion.div>
                       ) : (
                         <motion.div 
                           key={selectedCloud}
                           initial={{ opacity: 0, scale: 0.95 }}
                           animate={{ opacity: 1, scale: 1 }}
                           exit={{ opacity: 0, scale: 0.95 }}
                           className="h-full flex flex-col justify-center"
                         >
                           {clouds.map(c => c.id === selectedCloud && (
                             <div key={c.id} className="space-y-5">
                                <h3 className={`text-xl font-black italic uppercase tracking-widest text-center ${c.colors.text}`}>{c.title}</h3>
                                <div className="space-y-4">
                                   <div className="flex items-start gap-3 text-sm text-gray-300 bg-emerald-950/20 p-4 rounded-lg border-l-4 border-emerald-500 shadow-inner">
                                      {c.pros}
                                   </div>
                                   <div className="flex items-start gap-3 text-sm text-red-300 bg-red-950/30 p-4 rounded-lg border-l-4 border-red-500 shadow-inner">
                                      {c.cons}
                                   </div>
                                </div>
                             </div>
                           ))}
                         </motion.div>
                       )}
                    </AnimatePresence>
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
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group font-black"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" />
            « KEMBALI KE HQ
          </Link>
          
          <Link 
            to="/academy/stage-5/modul-4/aws-s3"
            className="flex items-center gap-3 bg-cyan-600 hover:bg-cyan-500 text-white hover:text-black px-8 py-4 text-xs font-black transition-all group rounded-sm skew-x-[-12deg]"
          >
            <span className="skew-x-[12deg] flex items-center gap-2 tracking-widest leading-none uppercase">
              SELANJUTNYA » <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IntroBigThree;
