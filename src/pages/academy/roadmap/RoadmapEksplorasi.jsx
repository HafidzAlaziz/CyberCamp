import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Map, Home, Search, Wrench, ChevronRight, Terminal,
  Network, Shield, Cloud, Code2, Cpu, ExternalLink,
  BookOpen, Zap, ArrowLeft
} from 'lucide-react';

const tabsData = [
  {
    id: 'tahap12',
    label: 'Tahap 1 & 2',
    subtitle: 'IT Fundamentals & OS',
    icon: <Cpu className="w-5 h-5" />,
    color: 'yellow',
    focusText: 'Pahami daleman jaringan dan OS Linux sampe ke tulang sumsumnya.',
    keywords: [
      'Subnetting (VLSM)',
      'BGP & OSPF Routing',
      'Linux Syscalls',
      'Linux File Permissions (chmod/chown)',
      'Cron Jobs',
    ],
    tools: [
      { name: 'Wireshark', desc: 'Ngintip paket data yang lagi lewat (Deep Packet Inspection). Lo bakal kaget ngeliat isi internet lo sendiri.' },
      { name: 'Cisco Packet Tracer', desc: 'Simulasi jaringan router, switch, dan topologi enterprise tanpa harus beli hardware mahal.' },
      { name: 'iSCSI & SMB Protocol', desc: 'Ulik protokol storage jaringan yang sering jadi sasaran Ransomware di server perusahaan.' },
    ],
  },
  {
    id: 'tahap3',
    label: 'Tahap 3',
    subtitle: 'Network Security',
    icon: <Network className="w-5 h-5" />,
    color: 'cyan',
    focusText: 'Bikin tembok pertahanan jaringan yang bener-bener solid dan nggak bisa ditembus.',
    keywords: [
      'Next-Gen Firewall (NGFW)',
      'Nulis rule iptables di Linux',
      'IPsec & WireGuard VPN Tunnels',
      'Zero Trust Architecture',
    ],
    tools: [
      { name: 'pfSense', desc: 'Install OS firewall open-source ini di VirtualBox. Rasain jadi admin jaringan beneran yang ngatur semua lalu lintas data.' },
      { name: 'Snort / Suricata (IDS/IPS)', desc: 'Pasang sistem alarm jaringan yang teriak kalau ada aktivitas mencurigakan masuk ke network lo.' },
    ],
  },
  {
    id: 'tahap4',
    label: 'Tahap 4',
    subtitle: 'Security Skills',
    icon: <Shield className="w-5 h-5" />,
    color: 'fuchsia',
    focusText: 'Seni Nyerang (Red Team) dan Seni Bertahan (Blue Team) — lo harus jago dua-duanya!',
    keywords: [
      'OAuth 2.0 & SAML (Celah Autentikasi)',
      'DOM-based XSS (Advanced)',
      'Analisis TCP/IP Handshake',
      'Active Directory Security & Attacks',
    ],
    tools: [
      { name: 'PortSwigger Web Security Academy', desc: '🔴 WAJIB TAMAT. Lab gratis dalam bahasa inggris paling lengkap di dunia buat belajar semua jenis serangan web dari dasar sampai expert.' },
      { name: 'TryHackMe (Room MITRE)', desc: 'Platform belajar hacking langsung praktek di server virtual yang udah disiapkan. Mulai dari room MITRE dulu.' },
      { name: 'Splunk / Wazuh (SIEM)', desc: 'Belajar cara kerja analis SOC yang tugasnya ngebaca ribuan log buat nemuin anomali serangan.' },
      { name: 'Hashcat', desc: 'Coba crack password hash yang lo bikin sendiri. Biar ngerasain kenapa password pendek itu berbahaya.' },
    ],
  },
  {
    id: 'tahap5',
    label: 'Tahap 5',
    subtitle: 'Cloud Skills',
    icon: <Cloud className="w-5 h-5" />,
    color: 'blue',
    focusText: 'Nguasain dan ngamanin infrastruktur modern yang hidup di awan (Cloud).',
    keywords: [
      'AWS IAM Policies (JSON)',
      'Microsoft Entra ID (Azure AD)',
      'Cloud Misconfigurations (OWASP Top 10 for Cloud)',
      'Serverless Security (Lambda Attack Surface)',
    ],
    tools: [
      { name: 'Terraform & Ansible (IaC)', desc: 'Belajar nulis infrastruktur cloud jadi kode yang bisa di-version control. Skill yang paling dicari DevSecOps saat ini.' },
      { name: 'AWS CLI', desc: 'Ngontrol seluruh infrastruktur AWS lo dari terminal. Jauh lebih cepet dan powerful dari web console.' },
    ],
  },
  {
    id: 'tahap6',
    label: 'Tahap 6',
    subtitle: 'Programming Skills',
    icon: <Code2 className="w-5 h-5" />,
    color: 'green',
    focusText: 'Bikin senjata hacking lo sendiri dan bedah malware sampai ke instruksi mesinnya.',
    keywords: [
      'Goroutines & Channels di Go (Concurrency)',
      'DOM Manipulation & Prototype Pollution (JS)',
      'Memory Management, Pointers & Heap Spray (C++)',
      'Active Directory Pentesting via PowerShell',
    ],
    tools: [
      { name: 'Black Hat Python & Black Hat Go', desc: '📖 Baca dua buku ini. Ini "alkitab"-nya programmer yang mau masuk ke dunia security tools development. Ada versi PDF-nya kalau lo rajin nyari.' },
      { name: 'Ghidra (by NSA)', desc: 'Tool gratis dari NSA buat Reverse Engineering. Bongkar file .exe atau malware sampai keliatan source code assembly-nya.' },
      { name: 'BloodHound', desc: 'Visualisasikan semua relasi dan celah di dalam jaringan Active Directory (AD) perusahaan. Favorit Red Teamer profesional.' },
    ],
  },
];

const colorMap = {
  yellow: { border: 'border-yellow-500/40', textAccent: 'text-yellow-400', bg: 'bg-yellow-500/10', activeBg: 'bg-yellow-900/30', activeText: 'text-yellow-300', activeBorder: 'border-yellow-500', glow: 'shadow-[0_0_20px_rgba(234,179,8,0.2)]', badge: 'bg-yellow-900/80 text-yellow-300 border-yellow-500' },
  cyan: { border: 'border-cyan-500/40', textAccent: 'text-cyan-400', bg: 'bg-cyan-500/10', activeBg: 'bg-cyan-900/30', activeText: 'text-cyan-300', activeBorder: 'border-cyan-500', glow: 'shadow-[0_0_20px_rgba(6,182,212,0.2)]', badge: 'bg-cyan-900/80 text-cyan-300 border-cyan-500' },
  fuchsia: { border: 'border-fuchsia-500/40', textAccent: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10', activeBg: 'bg-fuchsia-900/30', activeText: 'text-fuchsia-300', activeBorder: 'border-fuchsia-500', glow: 'shadow-[0_0_20px_rgba(217,70,239,0.2)]', badge: 'bg-fuchsia-900/80 text-fuchsia-300 border-fuchsia-500' },
  blue: { border: 'border-blue-500/40', textAccent: 'text-blue-400', bg: 'bg-blue-500/10', activeBg: 'bg-blue-900/30', activeText: 'text-blue-300', activeBorder: 'border-blue-500', glow: 'shadow-[0_0_20px_rgba(59,130,246,0.2)]', badge: 'bg-blue-900/80 text-blue-300 border-blue-500' },
  green: { border: 'border-green-500/40', textAccent: 'text-green-400', bg: 'bg-green-500/10', activeBg: 'bg-green-900/30', activeText: 'text-green-300', activeBorder: 'border-green-500', glow: 'shadow-[0_0_20px_rgba(34,197,94,0.2)]', badge: 'bg-green-900/80 text-green-300 border-green-500' },
};

const RoadmapEksplorasi = () => {
  const [activeTab, setActiveTab] = useState('tahap12');
  const activeData = tabsData.find(t => t.id === activeTab);
  const c = colorMap[activeData.color];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-4 md:p-10 relative overflow-hidden">

      {/* BG Glow */}
      <div className={`absolute top-[-10%] left-[30%] w-[500px] h-[500px] blur-[150px] rounded-full pointer-events-none transition-all duration-700 opacity-20 ${c.bg}`} />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-6 mb-12 border-b border-gray-800 pb-8">
          <div className="p-4 bg-cyan-500/10 border border-cyan-500/40 rounded-xl">
            <Map className="w-10 h-10 text-cyan-400" />
          </div>
          <div>
            <p className="text-[10px] text-cyan-500 tracking-[0.4em] uppercase font-black mb-1">CyberCamp · Bonus Konten</p>
            <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">Roadmap Eksplorasi Lanjutan</h1>
            <p className="text-gray-500 text-sm mt-2 max-w-xl leading-relaxed">
              Lo udah tamat semua tahap? Bagus. Tapi perjalanan sesungguhnya baru mulai. Ini peta harta karun buat lo yang mau <span className="text-white font-bold">ngulik lebih dalam</span> secara mandiri.
            </p>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabsData.map(tab => {
            const tc = colorMap[tab.color];
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-xs font-black uppercase tracking-widest transition-all duration-300 ${isActive
                    ? `${tc.activeBg} ${tc.activeBorder} ${tc.activeText} ${tc.glow}`
                    : 'bg-gray-900/50 border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300'
                  }`}
              >
                <span className={isActive ? tc.activeText : 'text-gray-600'}>{tab.icon}</span>
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Tab Title Banner */}
            <div className={`p-6 rounded-xl border ${c.border} ${c.bg} ${c.glow}`}>
              <div className="flex items-center gap-4 flex-wrap">
                <div className={`p-3 ${c.bg} border ${c.activeBorder} rounded-xl`}>
                  <span className={c.textAccent}>{activeData.icon}</span>
                </div>
                <div>
                  <p className={`text-[9px] ${c.textAccent} tracking-[0.4em] uppercase font-black`}>PANDUAN MANDIRI · {activeData.label}</p>
                  <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none">{activeData.subtitle}</h2>
                </div>
                <div className={`ml-auto hidden md:block px-4 py-2 border rounded-lg text-[10px] font-black uppercase tracking-widest ${c.badge}`}>
                  DEEP DIVE ZONE
                </div>
              </div>
              <p className={`mt-4 text-sm leading-relaxed font-bold ${c.textAccent}`}>
                🎯 FOKUS: <span className="text-gray-300 font-normal">{activeData.focusText}</span>
              </p>
            </div>

            {/* 2-Column Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Keyword Card */}
              <div className={`p-6 rounded-xl border ${c.border} bg-gray-900/60 flex flex-col gap-4`}>
                <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
                  <div className={`p-2 rounded-lg ${c.bg} border ${c.activeBorder}`}>
                    <Search className={`w-5 h-5 ${c.textAccent}`} />
                  </div>
                  <div>
                    <h3 className="text-white font-black uppercase tracking-widest text-sm">🔍 Keyword buat Di-Googling</h3>
                    <p className="text-gray-600 text-[10px] font-bold uppercase tracking-wide">Mulai dari sini, selesaikan di manasukapelo</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {activeData.keywords.map((kw, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-start gap-3"
                    >
                      <span className={`${c.textAccent} text-[10px] font-black mt-1 shrink-0`}>▹</span>
                      <span className="text-sm text-gray-300 leading-relaxed font-bold hover:text-white transition-colors cursor-default">{kw}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className={`mt-auto p-3 rounded-lg bg-black/40 border ${c.border} text-[10px] text-gray-600 leading-relaxed italic`}>
                  Pro tip: Setiap keyword ini bisa jadi 10 jam belajar kalau lo beneran mau explore. Jangan buru-buru, Bos!
                </div>
              </div>

              {/* Tools Card */}
              <div className={`p-6 rounded-xl border ${c.border} bg-gray-900/60 flex flex-col gap-4`}>
                <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
                  <div className={`p-2 rounded-lg ${c.bg} border ${c.activeBorder}`}>
                    <Wrench className={`w-5 h-5 ${c.textAccent}`} />
                  </div>
                  <div>
                    <h3 className="text-white font-black uppercase tracking-widest text-sm">🛠️ Tools & Arena Praktik</h3>
                    <p className="text-gray-600 text-[10px] font-bold uppercase tracking-wide">Teori tanpa praktek itu cuma dongeng</p>
                  </div>
                </div>
                <ul className="space-y-4 flex-1">
                  {activeData.tools.map((tool, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`p-4 rounded-xl border ${c.border} bg-black/30 hover:${c.bg} transition-colors`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Terminal className={`w-3 h-3 ${c.textAccent} shrink-0`} />
                        <span className={`text-xs font-black uppercase tracking-widest ${c.textAccent}`}>{tool.name}</span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed pl-5">{tool.desc}</p>
                    </motion.li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Bottom Motivation Banner */}
            <div className="p-6 rounded-xl border border-gray-800 bg-black/40 flex items-center gap-4 flex-wrap">
              <Zap className="w-6 h-6 text-yellow-400 shrink-0" />
              <p className="text-sm text-gray-400 leading-relaxed flex-1">
                <span className="text-white font-black">Inget pesan gue:</span> Semua tool dan resource di atas bisa lo akses <span className="text-cyan-400 font-bold">GRATIS</span>. Internet adalah lab terbesar lo. Yang membedakan hacker amatir dan profesional bukan gear mahal, tapi <span className="text-white font-bold">jam terbang dan rasa ingin tahu</span> yang nggak pernah mati.
              </p>
            </div>

          </motion.div>
        </AnimatePresence>

        {/* Footer CTA */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-gray-800 pt-10">
          <div>
            <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">CyberCamp · Roadmap Eksplorasi Lanjutan</p>
            <p className="text-xl font-black text-white italic tracking-tighter uppercase mt-1">
              Jangan berhenti belajar,<br />
              <span className="text-cyan-400">dunia cyber nggak pernah tidur!</span>
            </p>
          </div>
          <Link
            to="/academy"
            state={{ expandedId: 'programming-skills' }}
            className="flex items-center gap-3 bg-cyan-600 hover:bg-cyan-500 text-black px-10 py-5 text-sm font-black transition-all rounded-sm skew-x-[-12deg] shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
          >
            <span className="skew-x-[12deg] flex items-center gap-3 tracking-widest leading-none uppercase">
              <ArrowLeft className="w-5 h-5" /> KEMBALI KE MARKAS / DASHBOARD
            </span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default RoadmapEksplorasi;
