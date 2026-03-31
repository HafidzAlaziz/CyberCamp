const fs = require('fs');
const path = require('path');

const MUDAH_FILES = ['mudah/Level1.jsx', 'mudah/Level2.jsx', 'mudah/Level3.jsx', 'mudah/Level4.jsx'];
const MENENGAH_FILES = ['menengah/Level1.jsx', 'menengah/Level2.jsx', 'menengah/Level3.jsx'];
const SULIT_FILES = ['sulit/Level1.jsx', 'sulit/Level2.jsx', 'sulit/Level3.jsx'];

const baseDir = path.join(__dirname, 'src/pages/arena/mode-acak/kategori');

function extractFlag(content) {
  // Try to find realFlag = "..."
  const match = content.match(/realFlag\s*=\s*(["'].*?["'])/);
  if (match) return match[1];
  
  // Or atob
  const match2 = content.match(/atob\(['"](.*?)['"]\)/);
  if (match2) return `atob("${match2[1]}")`;

  return '"CTF{ANSWER_HERE}"'; // fallback
}

function processMudah(file) {
  const fullPath = path.join(baseDir, file);
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');

  // Fix stars logic
  content = content.replace(/const \[stars, setStars\] = useState\(\(\) => \{[\s\S]*?\}\);/, 
`const [hasUsedHint, setHasUsedHint] = useState(() => {
    return localStorage.getItem('ctf_${file.replace('.jsx', '').replace('/', '_').toLowerCase()}_hint_used') === 'true';
  });

  // Calculate dynamic stars
  const timeLimit = 600; // 10 minutes
  const isTimeFailed = elapsed > timeLimit;
  const hintPenalty = hasUsedHint ? 1 : 0;
  const timePenalty = isTimeFailed ? 1 : 0;
  const stars = Math.max(1, 3 - hintPenalty - timePenalty);`);

  // Remove setStars calls
  content = content.replace(/setStars\(.*?\);/g, '');
  content = content.replace(/const newStars = Math.max\(1, 3 - stage\);/g, '');
  content = content.replace(/localStorage.setItem\('ctf_mudah_level[1-4]_stars', newStars.toString\(\)\);/g, '');

  content = content.replace(/const \[hintStage.*?\}\);/s, `const [showHintModal, setShowHintModal] = useState(false);`);

  // Replace submitFlag to use calculated stars
  content = content.replace(/if \(stars >= currentBestStars\) \{/g, `if (stars >= currentBestStars) {`);

  // Replace hint UI
  const flagStr = extractFlag(content);
  const hintUI = `<div className="mt-auto space-y-3">
                   <button onClick={() => { setHasUsedHint(true); setShowHintModal(true); localStorage.setItem('ctf_${file.replace('.jsx', '').replace('/', '_').toLowerCase()}_hint_used', 'true'); }} className={\`bg-cyan-900/20 border rounded-xl p-4 flex items-center justify-center gap-3 group transition-all shadow-[0_0_20px_rgba(6,182,212,0.1)] \${hasUsedHint ? 'border-cyan-400 bg-cyan-900/40' : 'border-cyan-500/40 hover:bg-cyan-900/30'}\`}>
              <Zap className={\`w-4 h-4 transition-colors \${hasUsedHint ? 'text-cyan-400 fill-cyan-400' : 'text-cyan-400'}\`} />
              <span className="text-xs font-black text-cyan-200 uppercase tracking-widest">\${hasUsedHint ? 'HINT ACTIVE' : '💡 MINTA JAWABAN (-1 BINTANG)'}</span>
            </button>
            <AnimatePresence>
               {showHintModal && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-gray-900/50 border border-white/5 rounded-xl p-4 text-[10px] text-gray-400 italic leading-tight uppercase font-black tracking-widest text-center mt-2 overflow-hidden">
                     <span className="text-cyan-400">ANSWER:</span> {${flagStr}}
                  </motion.div>
               )}
            </AnimatePresence>
                 </div>`;
  
  // Try to replace existing hint button
  content = content.replace(/<button onClick=\{.*?(setShowHintModal|handleHintClick)[\s\S]*?<\/button>/, hintUI);

  fs.writeFileSync(fullPath, content, 'utf8');
}

function processMenengah(file) {
  const fullPath = path.join(baseDir, file);
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');

  content = content.replace(/const \[stars, setStars\] = useState\(\(\) => \{[\s\S]*?\}\);/, 
`const [hintStage, setHintStage] = useState(() => parseInt(localStorage.getItem('ctf_${file.replace('.jsx', '').replace('/', '_').toLowerCase()}_hint_stage') || '0'));
  
  // Calculate dynamic stars
  const timeLimit = 900; // 15 minutes
  const isTimeFailed = elapsed > timeLimit;
  const timePenalty = isTimeFailed ? 1 : 0;
  const hintPenalty = Math.min(2, hintStage); // max 2 penalties for 2 hint stages
  const stars = Math.max(1, 4 - hintPenalty - timePenalty);`);

  // Remove setStars calls
  content = content.replace(/setStars\(.*?\);/g, '');

  const flagStr = extractFlag(content);
  const hintUI = `<div className="mt-auto space-y-3">
                   <button onClick={() => setShowHintModal(true)} className={\`bg-yellow-900/20 border rounded-xl p-4 flex items-center justify-center gap-3 group transition-all shadow-[0_0_20px_rgba(234,179,8,0.1)] \${hintStage > 0 ? 'border-yellow-400 bg-yellow-900/40' : 'border-yellow-500/40 hover:bg-yellow-900/30'}\`}>
              <Zap className={\`w-4 h-4 transition-colors \${hintStage > 0 ? 'text-yellow-400 fill-yellow-400' : 'text-yellow-400'}\`} />
              <span className="text-xs font-black text-yellow-200 uppercase tracking-widest">\${hintStage > 0 ? \`HINT ACTIVE (\${hintStage}/2)\` : '💡 MINTA HINT BOS'}</span>
            </button>
                 </div>`;
  
  // Inject the hint modal
  const hintModalCode = `{showHintModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowHintModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-gray-900 border border-yellow-500/30 rounded-3xl p-8 max-w-lg w-full shadow-[0_0_50px_rgba(234,179,8,0.2)] overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500" />
               <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-1">INTEL_RECOVERY_HUB</h2>
                    <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Target Analysis Protocol</p>
                  </div>
                  <button onClick={() => setShowHintModal(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
               </div>
               <div className="space-y-4 mb-8">
                  {[
                    { depth: 1, label: "CLUE_ANALYSIS", content: "Perhatikan titik rentan yang disebutkan di Briefing. Manfaatkan tools atau syntax dasar untuk mem-bypass autentikasi sistem ini." },
                    { depth: 2, label: "EXPLICIT_ANSWER", content: "FLAG_REVEAL: Gunakan format flag \`" + ${flagStr} + "\`" }
                  ].map((h, i) => (
                    <div key={i} className={\`p-4 rounded-2xl border transition-all \${hintStage >= h.depth ? 'bg-yellow-500/10 border-yellow-500/40 text-gray-200' : 'bg-black/40 border-white/5 text-gray-600'}\`}>
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-black tracking-widest uppercase">{h.label}</span>
                          {hintStage >= h.depth ? <Check className="w-3 h-3 text-yellow-500" /> : <Lock className="w-3 h-3" />}
                       </div>
                       {hintStage >= h.depth ? (
                         <p className="text-xs leading-relaxed italic" dangerouslySetInnerHTML={{ __html: h.content }} />
                       ) : (
                         <button onClick={() => { setHintStage(h.depth); localStorage.setItem('ctf_${file.replace('.jsx', '').replace('/', '_').toLowerCase()}_hint_stage', h.depth.toString()); }} className="w-full py-2 bg-yellow-600 hover:bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest rounded-lg transition-all">UNLOCK INFRA DEPTH {h.depth}</button>
                       )}
                    </div>
                  ))}
               </div>
               <p className="text-[8px] text-center text-gray-700 uppercase font-bold tracking-[0.2em]">-- RANK_EFFICIENCY will be reduced upon unlock --</p>
            </motion.div>
          </div>
        )}`;

  content = content.replace(/<button onClick=\{.*?(setShowHintModal|handleHintClick)[\s\S]*?<\/button>/, hintUI);
  
  // Replace old modals with new modals if exists
  if (content.includes('showHintModal && (')) {
    content = content.replace(/\{showHintModal && \([\s\S]*?\}\)/, hintModalCode);
  } else {
    // Add right before exact end if not exists
    content = content.replace(/<\/AnimatePresence>\s*<\/div>\s*\)\;/g, `{showHintModal && ...}</AnimatePresence></div>);`); // fallback via regex is annoying
  }

  // Inject generic Check icon if not imported
  if (!content.includes('Check,')) {
    content = content.replace(/import \{([\s\S]*?)ChevronLeft/g, 'import {$1ChevronLeft, Check');
  }

  fs.writeFileSync(fullPath, content, 'utf8');
}

function processSulit(file) {
  const fullPath = path.join(baseDir, file);
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');

  content = content.replace(/const \[stars, setStars\] = useState\(\(\) => \{[\s\S]*?\}\);/, 
`const [hintStage, setHintStage] = useState(() => parseInt(localStorage.getItem('ctf_${file.replace('.jsx', '').replace('/', '_').toLowerCase()}_hint_stage') || '0'));
  
  // Calculate dynamic stars
  const timeLimit = 1200; // 20 minutes
  const isTimeFailed = elapsed > timeLimit;
  const timePenalty = isTimeFailed ? 1 : 0;
  const hintPenalty = Math.min(3, hintStage); // max 3 penalties for 3 hint stages
  const stars = Math.max(1, 5 - hintPenalty - timePenalty);`);

  // Remove setStars calls
  content = content.replace(/setStars\(.*?\);/g, '');

  const flagStr = extractFlag(content);
  const hintUI = `<div className="mt-auto space-y-3">
                   <button onClick={() => setShowHintModal(true)} className={\`bg-red-900/20 border rounded-xl p-4 flex items-center justify-center gap-3 group transition-all shadow-[0_0_20px_rgba(239,68,68,0.1)] \${hintStage > 0 ? 'border-red-400 bg-red-900/40' : 'border-red-500/40 hover:bg-red-900/30'}\`}>
              <Zap className={\`w-4 h-4 transition-colors \${hintStage > 0 ? 'text-red-400 fill-red-400' : 'text-red-400'}\`} />
              <span className="text-xs font-black text-red-200 uppercase tracking-widest">\${hintStage > 0 ? \`HINT ACTIVE (\${hintStage}/3)\` : '💡 MINTA HINT BOS'}</span>
            </button>
                 </div>`;
  
  // Inject the hint modal
  const hintModalCode = `{showHintModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowHintModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-gray-900 border border-red-500/30 rounded-3xl p-8 max-w-lg w-full shadow-[0_0_50px_rgba(239,68,68,0.2)] overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
               <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-1">EXPLOIT_RECOVERY_HUB</h2>
                    <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Target Analysis Protocol</p>
                  </div>
                  <button onClick={() => setShowHintModal(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
               </div>
               <div className="space-y-4 mb-8">
                  {[
                    { depth: 1, label: "ANALYZING_PROTECTION", content: "Analisis proteksi awal: Evaluasi apa yang memblokir instruksimu. Biasanya sistem ini rentan dengan manipulasi memori dasar." },
                    { depth: 2, label: "CALCULATING_OFFSET", content: "Penghitungan offset: Hitung alamat injeksi yang valid atau cari parameter tersembunyi untuk ditembus." },
                    { depth: 3, label: "PWN_INSTRUCTION", content: "Instruksi eksekusi: Bypass telah dipetakan, lakukan submit <span className='text-red-500 font-black tracking-widest select-all'>\`" + ${flagStr} + "\`</span>" }
                  ].map((h, i) => (
                    <div key={i} className={\`p-4 rounded-2xl border transition-all \${hintStage >= h.depth ? 'bg-red-500/10 border-red-500/40 text-gray-200' : 'bg-black/40 border-white/5 text-gray-600'}\`}>
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-black tracking-widest uppercase">{h.label}</span>
                          {hintStage >= h.depth ? <Check className="w-3 h-3 text-red-500" /> : <Lock className="w-3 h-3" />}
                       </div>
                       {hintStage >= h.depth ? (
                         <p className="text-xs leading-relaxed italic" dangerouslySetInnerHTML={{ __html: h.content }} />
                       ) : (
                         <button onClick={() => { setHintStage(h.depth); localStorage.setItem('ctf_${file.replace('.jsx', '').replace('/', '_').toLowerCase()}_hint_stage', h.depth.toString()); }} className="w-full py-2 bg-red-600 hover:bg-red-500 text-black text-[10px] font-black uppercase tracking-widest rounded-lg transition-all">UNLOCK EXPLOIT DEPTH {h.depth}</button>
                       )}
                    </div>
                  ))}
               </div>
               <p className="text-[8px] text-center text-gray-700 uppercase font-bold tracking-[0.2em]">-- RANK_EFFICIENCY will be reduced upon unlock --</p>
            </motion.div>
          </div>
        )}`;

  content = content.replace(/<button onClick=\{.*?(setShowHintModal|handleHintClick)[\s\S]*?<\/button>/, hintUI);
  
  if (content.includes('showHintModal && (')) {
    // try replacing existing hint modal
    content = content.replace(/\{showHintModal && \(\s*<div className="fixed inset-0[\s\S]*?<\/div>\s*\)\s*\}/, hintModalCode);
  }

  if (!content.includes('Check,')) {
    content = content.replace(/import \{([\s\S]*?)ChevronLeft/g, 'import {$1ChevronLeft, Check');
  }

  fs.writeFileSync(fullPath, content, 'utf8');
}

for (const f of MUDAH_FILES) processMudah(f);
for (const f of MENENGAH_FILES) processMenengah(f);
for (const f of SULIT_FILES) processSulit(f);

console.log('Script done');
