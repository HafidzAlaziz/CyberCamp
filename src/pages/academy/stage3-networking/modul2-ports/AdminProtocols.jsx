import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Terminal, FileText, Database, Shield, Zap, Home, Search, Lock, User, HardDrive } from 'lucide-react';

const AdminProtocols = () => {
  const [activeTab, setActiveTab] = useState('ssh');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState(['Welcome to CyberCamp_v1.02_Terminal', 'Waiting for input...']);

  const handleCommand = (e) => {
    e.preventDefault();
    if (!terminalInput) return;

    let response = [`hafidz@server:~$ ${terminalInput}`];
    const cmd = terminalInput.toLowerCase();

    if (cmd === 'ls') {
      response.push('config.php  database_backup.sql  index.html  node_modules/  secret.txt');
    } else if (cmd === 'whoami') {
      response.push('admin_root');
    } else if (cmd === 'help') {
      response.push('Available commands: ls, whoami, help, clear');
    } else if (cmd === 'clear') {
      setTerminalOutput([]);
      setTerminalInput('');
      return;
    } else {
      response.push(`command not found: ${terminalInput}`);
    }

    setTerminalOutput([...terminalOutput, ...response]);
    setTerminalInput('');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Standardized Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12 border-b border-orange-900/30 pb-6 pl-0 md:pl-32"
        >
          <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/50">
            <Shield className="w-8 h-8 text-orange-400" />
          </div>
          <div>
            <h1 className="text-sm text-orange-500 tracking-[0.3em] uppercase font-black">Stage 3: Networking</h1>
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
              MODUL 2: Common Ports & Protocols
            </h2>
          </div>
        </motion.div>

        {/* 2-Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Material */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="space-y-4 text-lg leading-relaxed text-gray-400">
               <p>
                 Selain pintu buat tamu (Web), ada juga <span className="text-white font-bold">"Pintu Belakang"</span> khusus buat Admin/Pengelola server. 
               </p>
               
               <div className="space-y-4">
                  <div className="p-4 bg-orange-500/5 border border-orange-500/20 rounded-lg">
                     <span className="text-[10px] font-black text-orange-500 block mb-1">SSH (PORT 22) - Secure Shell</span>
                     <p className="text-xs text-gray-500">Ibarat lo punya remote kontrol buat gerakin server dari jarak jauh lewat layar hitam (terminal). Sangat sakti!</p>
                  </div>
                  <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
                     <span className="text-[10px] font-black text-cyan-500 block mb-1">FTP (PORT 21) - File Transfer Protocol</span>
                     <p className="text-xs text-gray-500">Pintu khusus buat bongkar muat file. Mindahin database, gambar, atau backup server.</p>
                  </div>
               </div>

               <div className="p-6 bg-orange-950/20 border-l-4 border-orange-500 rounded-sm italic">
                  <span className="text-orange-400 font-black uppercase text-[10px] block mb-2 tracking-widest flex items-center gap-2 font-mono">
                    <Zap className="w-4 h-4" /> Hacker POV: Brute Force
                  </span>
                  Hacker bakal ngiler banget kalau nemu <span className="text-white font-bold">Port 22</span> kebuka. Mereka bakal nyoba nebak ribuan password tiap detik (<span className="text-orange-400 font-bold">Brute Force</span>) biar bisa masuk dan jadi "Raja" di server lo!
               </div>

               <p className="text-sm italic">
                  Wajib amanin port ini pake <span className="text-orange-500 font-bold">SSH Key</span> atau ganti nomor port-nya biar nggak umum! 🛡️
               </p>
            </div>
          </motion.div>

          {/* Right Column: Simulation Case */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-900/50 border border-orange-500/30 rounded-xl p-8 shadow-2xl relative overflow-hidden flex flex-col min-h-[550px]"
          >
            <div className="absolute top-4 left-4 flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
               <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest font-mono">LAB_TOOL: ADMIN_DASHBOARD</span>
            </div>

            {/* Tabs */}
            <div className="mt-8 flex bg-black/40 p-1 rounded-lg mb-8 border border-white/5">
              <button
                onClick={() => setActiveTab('ssh')}
                className={`flex-1 py-3 rounded-md text-[10px] font-black transition-all ${activeTab === 'ssh' ? 'bg-orange-600 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]' : 'text-gray-500 hover:text-gray-300'}`}
              >
                SSH (PORT 22)
              </button>
              <button
                onClick={() => setActiveTab('ftp')}
                className={`flex-1 py-3 rounded-md text-[10px] font-black transition-all ${activeTab === 'ftp' ? 'bg-cyan-600 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'text-gray-500 hover:text-gray-300'}`}
              >
                FTP (PORT 21)
              </button>
            </div>

            <div className="flex-1 flex flex-col">
               <AnimatePresence mode="wait">
                  {activeTab === 'ssh' ? (
                    <motion.div 
                      key="ssh"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      className="flex-1 bg-[#0d1117] border border-white/5 rounded-lg flex flex-col overflow-hidden shadow-inner"
                    >
                       <div className="bg-[#161b22] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                          <Terminal className="w-3 h-3 text-orange-500" />
                          <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">admin@cybercamp-server: ~</span>
                       </div>
                       <div className="flex-1 p-4 font-mono text-[10px] space-y-2 overflow-y-auto max-h-[250px] scrollbar-hide">
                          {terminalOutput.map((line, i) => (
                            <div key={i} className={line.startsWith('hafidz') ? 'text-orange-400' : 'text-gray-400'}>{line}</div>
                          ))}
                       </div>
                       <form onSubmit={handleCommand} className="p-4 bg-black/40 border-t border-white/5 flex gap-2">
                          <span className="text-orange-500 font-bold">$</span>
                          <input 
                            type="text" 
                            autoFocus
                            placeholder="Type command (ls, whoami)..."
                            value={terminalInput}
                            onChange={(e) => setTerminalInput(e.target.value)}
                            className="bg-transparent border-none outline-none text-white text-[10px] flex-1 font-mono"
                          />
                       </form>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="ftp"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex-1 bg-black/40 border border-cyan-500/20 rounded-lg p-6"
                    >
                       <div className="flex items-center gap-4 mb-8">
                          <HardDrive className="w-8 h-8 text-cyan-500/20" />
                          <h4 className="text-xs font-black text-cyan-400 tracking-widest uppercase">Remote_File_System</h4>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          {[
                            { name: 'public_html', type: 'dir' },
                            { name: 'db_backup.sql', type: 'file', color: 'orange' },
                            { name: 'config.php', type: 'file', color: 'blue' },
                            { name: 'uploads', type: 'dir' }
                          ].map((item, i) => (
                             <motion.div 
                               key={i}
                               whileHover={{ scale: 1.05, backgroundColor: 'rgba(34, 211, 238, 0.1)' }}
                               className="p-4 border border-white/5 rounded bg-black/20 flex flex-col items-center gap-2 cursor-pointer group"
                             >
                                {item.type === 'dir' ? <FileText className="w-8 h-8 text-cyan-500/50 group-hover:text-cyan-400 transition-colors" /> : <Database className={`w-8 h-8 text-${item.color}-500/50 group-hover:text-${item.color}-400 transition-colors`} />}
                                <span className="text-[10px] font-medium text-gray-400 group-hover:text-white transition-colors">{item.name}</span>
                             </motion.div>
                          ))}
                       </div>
                       <div className="mt-8 p-3 bg-cyan-500/5 border border-cyan-500/10 rounded italic text-center text-[9px] text-cyan-500/60">
                          Siap sedot file server lewat Port 21! 📂
                       </div>
                    </motion.div>
                  )}
               </AnimatePresence>
            </div>
            
            <div className="mt-8 p-4 bg-orange-950/10 border border-orange-500/20 rounded-lg flex items-center gap-4">
               <div className="p-2 bg-orange-500/20 rounded border border-orange-500/30">
                  <User className="w-4 h-4 text-orange-500" />
               </div>
               <div className="text-[10px]">
                  <span className="text-gray-500 uppercase block mb-0.5 tracking-tighter">Admin_Tip:</span>
                  <p className="text-white font-bold italic">"Cuma orang dalem yang boleh lewat pintu ini. Pastiin kuncinya (password) super susah!"</p>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Navigation Summary-style */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 p-6 bg-gray-900/20 border border-white/5 rounded-2xl flex justify-between items-center"
        >
          <Link 
            to="/academy/stage-3/modul-2/web-protocols"
            className="flex items-center gap-2 text-gray-600 hover:text-white transition-all font-black uppercase tracking-widest text-[10px] group"
          >
             <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> BACK: WEB PROTOCOLS
          </Link>
          <Link 
            to="/academy/stage-3/modul-2/kesimpulan"
            className="flex items-center gap-2 text-orange-500 hover:text-white transition-all font-black uppercase tracking-widest text-[10px] group"
          >
             LANJUT: KESIMPULAN <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminProtocols;
