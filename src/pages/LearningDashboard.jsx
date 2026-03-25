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
      className="flex flex-col min-h-screen p-4 md:p-8 relative"
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-10 left-1/2 z-50 bg-[#ff2d55] text-white px-6 py-3 rounded border-2 border-[#ff4d74] shadow-[0_0_20px_rgba(255,45,85,0.4)] flex items-center gap-3 font-bold text-xs md:text-sm tracking-wider uppercase backdrop-blur-md"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="max-w-4xl mx-auto w-full mb-12 border-b border-cyan-500/20 pb-8">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-cyan-400 hover:text-white transition-colors group text-sm font-bold tracking-widest"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>BACK_TO_TERMINAL</span>
          </Link>
          <div className="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-bold">
            CURRICULUM: v1.02_ALPHA
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded">
            <Terminal className="text-cyan-400 w-6 h-6" />
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tighter uppercase text-white">
            LEARNING <span className="text-cyan-400 text-glow-cyan">DASHBOARD</span>
          </h1>
        </div>
        <p className="mt-3 text-gray-400 text-xs md:text-sm font-medium max-w-2xl bg-black/20 p-2 border-l border-gray-800">
          Akses modul pembelajaran fundamental hingga advanced security. Pilih topik di bawah untuk memulai.
        </p>
      </div>

      {/* Accordion List */}
      <div className="max-w-4xl mx-auto w-full space-y-4 mb-16">
        {roadmapData.map((module) => (
          <div
            key={module.id}
            className={`border transition-all duration-300 rounded ${expandedId === module.id
                ? 'border-cyan-500 bg-[#161b22]'
                : 'border-[#30363d] bg-[#0d1117] hover:border-cyan-500/30'
              }`}
          >
            {/* Module Header */}
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full flex justify-between items-center p-5 md:p-6 text-left focus:outline-none group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-1.5 h-1.5 rounded-full ${expandedId === module.id ? 'bg-cyan-500 shadow-[0_0_8px_#00ffff]' : 'bg-gray-700'}`} />
                <span className={`text-base md:text-lg font-bold tracking-tight transition-colors ${expandedId === module.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                  {module.title}
                </span>
              </div>
              {expandedId === module.id ? (
                <ChevronUp className="w-5 h-5 text-cyan-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-cyan-400" />
              )}
            </button>

            {/* Module Topics (Expanded Content) */}
            {expandedId === module.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="px-5 md:px-6 pb-6 pt-2 border-t border-cyan-500/10 overflow-hidden"
              >
                <div className="grid gap-2">
                  {module.topics.map((topic, index) => (
                    <div
                      key={index}
                      onClick={() => handleTopicClick(topic)}
                      className={`flex items-center justify-between p-3 rounded border transition-all cursor-pointer group ${topic.available
                          ? 'bg-black/40 border-[#30363d] hover:border-cyan-500/30 hover:bg-black/60'
                          : 'bg-black/20 border-gray-800/50 opacity-60 grayscale hover:opacity-100'
                        }`}
                    >
                      <span className={`text-xs md:text-sm tracking-wide ${topic.available ? 'text-gray-300 group-hover:text-white' : 'text-gray-500'}`}>
                        {topic.name}
                      </span>
                      <div className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${topic.available
                          ? 'border border-gray-700 group-hover:border-cyan-500/50'
                          : 'text-gray-600'
                        }`}>
                        {topic.available ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-transparent group-hover:text-cyan-400/30" />
                        ) : (
                          <Lock className="w-3.5 h-3.5" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* === ROADMAP EKSPLORASI CTA === */}
      <div className="max-w-4xl mx-auto w-full mt-8 px-2">
        <Link to="/academy/roadmap">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative w-full group overflow-hidden rounded-2xl border border-cyan-500/40 bg-black cursor-pointer"
            style={{ boxShadow: '0 0 30px rgba(6,182,212,0.15), inset 0 0 40px rgba(6,182,212,0.05)' }}
          >
            {/* Animated top glow bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
            {/* Animated corner effects */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500 rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500 rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500 rounded-br-2xl" />
            {/* Background pulse on hover */}
            <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors duration-500" />
            {/* Content */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-4 py-7 px-6 text-center">
              <div className="p-3 bg-cyan-950/80 border border-cyan-500/50 rounded-xl group-hover:border-cyan-400 transition-colors">
                <Map className="w-8 h-8 text-cyan-400 group-hover:animate-pulse" />
              </div>
              <div>
                <p className="text-[9px] text-cyan-600 tracking-[0.5em] uppercase font-black mb-1">Selesaikan Tahap 1–6? Ini Langkah Berikutnya</p>
                <p
                  className="text-xl md:text-2xl font-black text-white italic tracking-tighter uppercase leading-none group-hover:text-cyan-300 transition-colors"
                  style={{ textShadow: '0 0 20px rgba(6,182,212,0.3)' }}
                >
                  🗺️ BUKA PETA EKSPLORASI LANJUTAN
                </p>
              </div>
              <div className="md:ml-auto flex-shrink-0 px-4 py-2 border border-cyan-500/50 text-cyan-400 text-[10px] font-black tracking-widest uppercase rounded group-hover:bg-cyan-500/20 transition-colors">
                LEVEL UP →
              </div>
            </div>
            {/* Animated bottom glow bar */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-60 transition-opacity" />
          </motion.div>
        </Link>
      </div>

      <footer className="max-w-4xl mx-auto w-full mt-auto pt-8 border-t border-[#30363d] text-[9px] text-gray-600 text-center uppercase tracking-[0.3em] font-bold">
        FREE ACCESS | Access_Level: Student
      </footer>
    </motion.div>
  );
};

export default LearningDashboard;
