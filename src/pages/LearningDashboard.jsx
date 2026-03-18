import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, Terminal, ArrowLeft, Lock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const roadmapData = [
  { 
    id: "fundamental-it", 
    title: "Fundamental IT Skills", 
    topics: [
      { name: "Computer Hardware Components", available: false },
      { name: "Basics of Computer Networking", available: false },
      { name: "OS-Independent Troubleshooting", available: false },
      { name: "MS Office & Google Suite Basics", available: false }
    ] 
  },
  { 
    id: "operating-systems", 
    title: "Operating Systems", 
    topics: [
      { name: "Windows & Linux Basics", available: false },
      { name: "Installation & Troubleshooting", available: false },
      { name: "GUI vs CLI (ping, ipconfig)", available: false },
      { name: "Virtualization (VMWare, VirtualBox)", available: false }
    ] 
  },
  // ... other modules already false
  { 
    id: "networking", 
    title: "Networking Knowledge", 
    topics: [
      { name: "OSI Model", available: false },
      { name: "Common Ports & Protocols (SSH, HTTP)", available: false },
      { name: "Network Topologies", available: false },
      { name: "IP, DHCP, DNS, Subnetting", available: false },
      { name: "NAS & SAN Basics", available: false }
    ] 
  },
  { 
    id: "security-skills", 
    title: "Security Skills & Knowledge", 
    topics: [
      { name: "Authentication (MFA, SSO)", available: false },
      { name: "Cryptography & Hashing", available: false },
      { name: "Common Attacks (SQLi, XSS, Phishing)", available: false },
      { name: "Incident Response Tools (Wireshark, Nmap)", available: false },
      { name: "Security Frameworks (MITRE, NIST)", available: false }
    ] 
  },
  { 
    id: "cloud-skills", 
    title: "Cloud Skills & Knowledge", 
    topics: [
      { name: "Cloud vs On-Premises Security", available: false },
      { name: "Public, Private, Hybrid Cloud", available: false },
      { name: "SaaS, PaaS, IaaS", available: false },
      { name: "AWS, GCP, Azure Basics", available: false }
    ] 
  },
  { 
    id: "programming-skills", 
    title: "Programming Skills", 
    topics: [
      { name: "Python & Go", available: false },
      { name: "JavaScript & C++", available: false },
      { name: "Bash & PowerShell Scripting", available: false }
    ] 
  }
];

const LearningDashboard = ({ onBack }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [toast, setToast] = useState(null);

  const toggleModule = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleTopicClick = (topic) => {
    if (!topic.available) {
      setToast(`COMING SOON: Materi "${topic.name}" belum ditambahkan.`);
      // Clear toast after 3 seconds
      setTimeout(() => setToast(null), 3000);
    } else {
      // Logic for available topic could go here
      console.log(`Accessing: ${topic.name}`);
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
            className={`border transition-all duration-300 rounded ${
              expandedId === module.id 
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
                      className={`flex items-center justify-between p-3 rounded border transition-all cursor-pointer group ${
                        topic.available 
                          ? 'bg-black/40 border-[#30363d] hover:border-cyan-500/30 hover:bg-black/60' 
                          : 'bg-black/20 border-gray-800/50 opacity-60 grayscale hover:opacity-100'
                      }`}
                    >
                      <span className={`text-xs md:text-sm tracking-wide ${topic.available ? 'text-gray-300 group-hover:text-white' : 'text-gray-500'}`}>
                        {topic.name}
                      </span>
                      <div className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
                        topic.available 
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

      <footer className="max-w-4xl mx-auto w-full mt-auto pt-8 border-t border-[#30363d] text-[9px] text-gray-600 text-center uppercase tracking-[0.3em] font-bold">
        Progress: 0.00% COMPLETE | Access_Level: Student
      </footer>
    </motion.div>
  );
};

export default LearningDashboard;
