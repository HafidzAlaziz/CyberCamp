import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, Terminal, ArrowLeft, Lock, AlertCircle, Map } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const roadmapData = [
  {
    id: "fundamental-it",
    title: "Fundamental IT Skills",
    topics: [
      { name: "Computer Hardware Components", available: true, path: "/academy/stage-1/modul-1/intro" },
      { name: "Basics of Computer Networking", available: true, path: "/academy/stage-1/modul-2/intro" },
      { name: "OS-Independent Troubleshooting", available: true, path: "/academy/stage-1/modul-3/intro" },
      { name: "MS Office & Google Suite Basics", available: true, path: "/academy/stage-1/modul-4/intro" },
    ]
  },
  {
    id: "operating-systems",
    title: "Operating Systems",
    topics: [
      { name: "Windows & Linux Basics", available: true, path: "/academy/stage-2/modul-1/intro" },
      { name: "Installation & Troubleshooting", available: true, path: "/academy/stage-2/modul-2/intro" },
      { name: "GUI vs CLI (ping, ipconfig)", available: true, path: "/academy/stage-2/modul-3/intro" },
      { name: "Virtualization (VMWare, VirtualBox)", available: true, path: "/academy/stage-2/modul-4/intro" }
    ]
  },
  // ... other modules already false
  {
    id: "networking",
    title: "Networking Knowledge",
    topics: [
      { name: "OSI Model", available: true, path: "/academy/stage-3/modul-1" },
      { name: "Common Ports & Protocols (SSH, HTTP)", available: true, path: "/academy/stage-3/modul-2" },
      { name: "Network Topologies", available: true, path: "/academy/stage-3/modul-3/intro" },
      { name: "IP, DHCP, DNS, Subnetting", available: true, path: "/academy/stage-3/modul-4/intro" },
      { name: "NAS & SAN Basics", available: true, path: "/academy/stage-3/modul-5/intro-storage" }
    ]
  },
  {
    id: "security-skills",
    title: "Security Skills & Knowledge",
    topics: [
      { name: "Authentication (MFA, SSO)", available: true, path: "/academy/stage-4/modul-1/intro" },
      { name: "Cryptography & Hashing", available: true, path: "/academy/stage-4/modul-2/intro" },
      { name: "Common Attacks (SQLi, XSS, Phishing)", available: true, path: "/academy/stage-4/modul-3/intro-phishing" },
      { name: "Incident Response Tools (Wireshark, Nmap)", available: true, path: "/academy/stage-4/modul-4/intro" },
      { name: "Security Frameworks (MITRE, NIST)", available: true, path: "/academy/stage-4/modul-5/intro" }
    ]
  },
  {
    id: "cloud-skills",
    title: "Cloud Skills & Knowledge",
    topics: [
      { name: "Cloud vs On-Premises Security", available: true, path: "/academy/stage-5/modul-1/intro" },
      { name: "Public, Private, Hybrid Cloud", available: true, path: "/academy/stage-5/modul-2/public-cloud" },
      { name: "SaaS, PaaS, IaaS", available: true, path: "/academy/stage-5/modul-3/iaas" },
      { name: "AWS, GCP, Azure Basics", available: true, path: "/academy/stage-5/modul-4/intro" }
    ]
  },
  {
    id: "programming-skills",
    title: "Programming Skills",
    topics: [
      { name: "Python & Go", available: true, path: "/academy/stage-6/modul-1/intro" },
      { name: "JavaScript & C++", available: true, path: "/academy/stage-6/modul-2/intro" },
      { name: "Bash & PowerShell Scripting", available: true, path: "/academy/stage-6/modul-3/intro" }
    ]
  }
];

const LearningDashboard = ({ onBack }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedId, setExpandedId] = useState(location.state?.expandedId || null);
  const [toast, setToast] = useState(null);

  // Sync state if it changes or handles initial mount
  useEffect(() => {
    if (location.state?.expandedId) {
      setExpandedId(location.state.expandedId);
    }
  }, [location.state]);

  const toggleModule = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleTopicClick = (topic) => {
    if (!topic.available) {
      setToast(`COMING SOON: Materi "${topic.name}" belum ditambahkan.`);
      // Clear toast after 3 seconds
      setTimeout(() => setToast(null), 3000);
    } else if (topic.path) {
      navigate(topic.path);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col min-h-screen bg-[#020617] text-gray-300 font-mono p-4 md:p-8 relative overflow-hidden"
    >
      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/5 blur-[120px] rounded-full opacity-60" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-10 left-1/2 z-[100] bg-red-600 text-white px-8 py-4 rounded-2xl border-2 border-red-500 shadow-[0_0_40px_rgba(220,38,38,0.4)] flex items-center gap-4 font-black text-xs md:text-sm tracking-[0.2em] uppercase italic backdrop-blur-3xl"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col relative z-20">
        {/* Header */}
        <div className="w-full mb-16 border-b border-white/5 pb-10">
          <div className="flex flex-wrap justify-between items-center gap-6 mb-12">
            <Link
              to="/"
              className="flex items-center gap-3 text-cyan-500/60 hover:text-cyan-400 transition-all group text-[10px] font-black tracking-[0.4em] uppercase italic"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>{">> "} Back_to_Terminal</span>
            </Link>
            <div className="text-[9px] text-gray-700 uppercase tracking-[0.5em] font-black italic opacity-60">
              Curriculum: v1.02_Alpha
            </div>
          </div>

          <div className="flex items-start gap-8">
            <div className="p-4 bg-gray-950/60 backdrop-blur-3xl border-2 border-cyan-500/20 rounded-3xl shadow-[0_0_30px_rgba(6,182,212,0.1)]">
              <Terminal className="text-cyan-400 w-8 h-8 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
            </div>
            <div>
               <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_#06b6d4]" />
                  <span className="text-[10px] uppercase font-black tracking-[0.4em] text-cyan-500/60 italic">Academy Hub</span>
               </div>
               <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white italic leading-none">
                 Learning <span className="text-cyan-500 drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]">Dashboard</span>
               </h1>
               <p className="mt-6 text-gray-500 text-xs md:text-sm font-black tracking-widest uppercase italic max-w-2xl border-l-2 border-cyan-500/20 pl-6 opacity-80">
                 Akses modul pembelajaran fundamental hingga advanced security. Pilih topik di bawah untuk memulai.
               </p>
            </div>
          </div>
        </div>

        {/* Accordion List */}
        <div className="w-full space-y-6 mb-20">
          {roadmapData.map((module) => (
            <div
              key={module.id}
              className={`border-2 transition-all duration-500 rounded-[2rem] overflow-hidden group/mod ${expandedId === module.id
                  ? 'border-cyan-500/60 bg-gray-950/80 shadow-[0_0_50px_rgba(6,182,212,0.15)]'
                  : 'border-white/5 bg-gray-950/40 hover:border-white/20 hover:bg-gray-950/60'
                }`}
            >
              {/* Module Header */}
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full flex justify-between items-center p-8 md:p-10 text-left focus:outline-none transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${expandedId === module.id ? 'bg-cyan-500 shadow-[0_0_15px_#06b6d4]' : 'bg-gray-800'}`} />
                  <span className={`text-xl md:text-2xl font-black tracking-tighter uppercase italic transition-all duration-500 ${expandedId === module.id ? 'text-white' : 'text-gray-500 group-hover/mod:text-gray-300'}`}>
                    {module.title}
                  </span>
                </div>
                {expandedId === module.id ? (
                  <ChevronUp className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-700 group-hover/mod:text-cyan-500/60 transition-colors" />
                )}
              </button>

              {/* Module Topics (Expanded Content) */}
              <AnimatePresence>
                {expandedId === module.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-white/5"
                  >
                    <div className="p-8 md:p-10 grid gap-4 bg-black/40">
                      {module.topics.map((topic, index) => (
                        <motion.div
                          key={index}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleTopicClick(topic)}
                          className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer group/topic ${topic.available
                              ? 'bg-gray-950/60 border-white/5 hover:border-cyan-500/40 hover:bg-cyan-500/5 hover:shadow-[0_0_20px_rgba(6,182,212,0.05)]'
                              : 'bg-black/20 border-white/5 opacity-40 grayscale hover:opacity-60'
                            }`}
                        >
                          <div className="flex items-center gap-5">
                             <div className={`w-1 h-1 rounded-full ${topic.available ? 'bg-cyan-500 shadow-[0_0_5px_#06b6d4]' : 'bg-gray-800'}`} />
                             <span className={`text-xs md:text-sm font-black tracking-widest uppercase italic transition-all ${topic.available ? 'text-gray-400 group-hover/topic:text-white' : 'text-gray-600'}`}>
                               {topic.name}
                             </span>
                          </div>
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${topic.available
                              ? 'border border-white/10 bg-white/5 group-hover/topic:border-cyan-500/50 group-hover/topic:bg-cyan-500/10'
                              : 'text-gray-800'
                            }`}>
                            {topic.available ? (
                              <CheckCircle2 className="w-4 h-4 text-transparent group-hover/topic:text-cyan-400 drop-shadow-[0_0_8px_#06b6d4]" />
                            ) : (
                              <Lock className="w-4 h-4" />
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* ROADMAP CTA */}
        <div className="w-full mt-10 px-2 lg:mb-20">
          <Link to="/academy/roadmap">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full group overflow-hidden rounded-[2.5rem] border-2 border-cyan-500/30 bg-gray-950/80 cursor-pointer shadow-[0_0_60px_rgba(6,182,212,0.1)] p-1.5"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-500 shadow-[0_0_15px_#06b6d4]" />
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05]" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 py-10 px-10 text-center">
                <div className="p-4 bg-cyan-900/40 border-2 border-cyan-500/40 rounded-3xl group-hover:border-white transition-all">
                  <Map className="w-10 h-10 text-cyan-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <p className="text-[10px] text-cyan-700 tracking-[0.6em] uppercase font-black mb-3 italic">Selesaikan Tahap 1–6? Ini Langkah Berikutnya</p>
                  <p className="text-2xl md:text-3xl font-black text-white italic tracking-tighter uppercase leading-none group-hover:text-cyan-400 transition-colors">
                    🗺️ Buka Peta Eksplorasi Lanjutan
                  </p>
                </div>
                <div className="flex-shrink-0 px-10 py-5 bg-cyan-500 text-black text-[10px] font-black tracking-[0.3em] uppercase italic rounded-2xl group-hover:bg-white transition-all shadow-[0_10px_30px_rgba(6,182,212,0.3)]">
                  Level Up →
                </div>
              </div>
            </motion.div>
          </Link>
        </div>

        <footer className="w-full mt-auto py-12 border-t border-white/5 text-[10px] text-gray-700 text-center uppercase tracking-[0.5em] font-black italic opacity-40">
           -- Free_Access // Access_Level: Student --
        </footer>
      </div>
    </motion.div>
  );
};

export default LearningDashboard;
