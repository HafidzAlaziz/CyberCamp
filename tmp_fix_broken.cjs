const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src/pages/arena/mode-acak/kategori');

// ---- Fix Menengah Level1 ----
function fixMenengahLevel1() {
  const fp = path.join(baseDir, 'menengah/Level1.jsx');
  let content = fs.readFileSync(fp, 'utf8');

  // Add missing showHintModal state if not present
  if (!content.includes('const [showHintModal')) {
    content = content.replace(
      'const [showHint, setShowHint] = useState(false);',
      'const [showHint, setShowHint] = useState(false);\n  const [showHintModal, setShowHintModal] = useState(false);'
    );
  }

  // Fix the broken rendering at end of file
  const broken = /\{showHintModal\s*&&\s*\.\.\.\}<\/AnimatePresence><\/div>\);/;
  const replacement = `{showHintModal && (
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
                    { depth: 1, label: "CLUE_ANALYSIS", content: "Coba gunakan payload SQL Injection klasik: ' OR '1'='1 pada form login." },
                    { depth: 2, label: "EXPLICIT_ANSWER", content: \`FLAG_REVEAL: Salin flag yang muncul di log setelah bypass berhasil.\` }
                  ].map((h, i) => (
                    <div key={i} className={\`p-4 rounded-2xl border transition-all \${hintStage >= h.depth ? 'bg-yellow-500/10 border-yellow-500/40 text-gray-200' : 'bg-black/40 border-white/5 text-gray-600'}\`}>
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-black tracking-widest uppercase">{h.label}</span>
                          {hintStage >= h.depth ? <Check className="w-3 h-3 text-yellow-500" /> : <Lock className="w-3 h-3" />}
                       </div>
                       {hintStage >= h.depth ? (
                         <p className="text-xs leading-relaxed italic" dangerouslySetInnerHTML={{ __html: h.content }} />
                       ) : (
                         <button onClick={() => { setHintStage(h.depth); localStorage.setItem('ctf_menengah_level1_hint_stage', h.depth.toString()); }} className="w-full py-2 bg-yellow-600 hover:bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest rounded-lg transition-all">UNLOCK INFRA DEPTH {h.depth}</button>
                       )}
                    </div>
                  ))}
               </div>
               <p className="text-[8px] text-center text-gray-700 uppercase font-bold tracking-[0.2em]">-- RANK_EFFICIENCY will be reduced upon unlock --</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};`;

  content = content.replace(broken, replacement);

  // Also add Check to imports if missing
  if (!content.includes('Check,') && !content.includes('Check\n') && !content.includes(', Check')) {
    content = content.replace('ChevronLeft,', 'ChevronLeft, Check,');
  }

  fs.writeFileSync(fp, content, 'utf8');
  console.log('Fixed menengah/Level1.jsx');
}

// ---- Fix Menengah Level2 ----
function fixMenengahLevel2() {
  const fp = path.join(baseDir, 'menengah/Level2.jsx');
  let content = fs.readFileSync(fp, 'utf8');

  // Add missing showHintModal state
  if (!content.includes('const [showHintModal')) {
    content = content.replace(
      'const [showHint, setShowHint] = useState(false);',
      'const [showHint, setShowHint] = useState(false);\n  const [showHintModal, setShowHintModal] = useState(false);'
    );
    if (!content.includes('const [showHintModal')) {
      content = content.replace(
        'const [completionTime',
        'const [showHintModal, setShowHintModal] = useState(false);\n  const [completionTime'
      );
    }
  }

  const broken = /\{showHintModal\s*&&\s*\.\.\.\}<\/AnimatePresence><\/div>\);/;
  const replacement = `{showHintModal && (
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
                    { depth: 1, label: "CLUE_ANALYSIS", content: "Perhatikan file yang bisa kamu enumerasi. Direktori tersembunyi biasanya bisa diakses dengan tools seperti Gobuster atau Dirb." },
                    { depth: 2, label: "EXPLICIT_ANSWER", content: "FLAG_REVEAL: Akses /robots.txt atau /backup/ untuk menemukan flag tersembunyi di direktori." }
                  ].map((h, i) => (
                    <div key={i} className={\`p-4 rounded-2xl border transition-all \${hintStage >= h.depth ? 'bg-yellow-500/10 border-yellow-500/40 text-gray-200' : 'bg-black/40 border-white/5 text-gray-600'}\`}>
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-black tracking-widest uppercase">{h.label}</span>
                          {hintStage >= h.depth ? <Check className="w-3 h-3 text-yellow-500" /> : <Lock className="w-3 h-3" />}
                       </div>
                       {hintStage >= h.depth ? (
                         <p className="text-xs leading-relaxed italic" dangerouslySetInnerHTML={{ __html: h.content }} />
                       ) : (
                         <button onClick={() => { setHintStage(h.depth); localStorage.setItem('ctf_menengah_level2_hint_stage', h.depth.toString()); }} className="w-full py-2 bg-yellow-600 hover:bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest rounded-lg transition-all">UNLOCK INFRA DEPTH {h.depth}</button>
                       )}
                    </div>
                  ))}
               </div>
               <p className="text-[8px] text-center text-gray-700 uppercase font-bold tracking-[0.2em]">-- RANK_EFFICIENCY will be reduced upon unlock --</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};`;

  content = content.replace(broken, replacement);

  if (!content.includes('Check,') && !content.includes(', Check')) {
    content = content.replace('ChevronLeft,', 'ChevronLeft, Check,');
  }

  fs.writeFileSync(fp, content, 'utf8');
  console.log('Fixed menengah/Level2.jsx');
}

// ---- Fix Sulit Level2 & Level3 duplicate showHintModal ----
function fixSulitDuplicates() {
  ['sulit/Level2.jsx', 'sulit/Level3.jsx'].forEach(rel => {
    const fp = path.join(baseDir, rel);
    let content = fs.readFileSync(fp, 'utf8');
    // Count occurrences
    const matches = content.match(/const \[showHintModal, setShowHintModal\] = useState\(false\);/g);
    if (matches && matches.length > 1) {
      // Remove first occurrence (the incorrect injected one)
      let replaced = false;
      content = content.replace(/const \[showHintModal, setShowHintModal\] = useState\(false\);/, (m) => {
        if (!replaced) { replaced = true; return ''; }
        return m;
      });
      fs.writeFileSync(fp, content, 'utf8');
      console.log(`Fixed duplicate showHintModal in ${rel}`);
    } else {
      console.log(`No duplicate in ${rel}`);
    }
  });
}

fixMenengahLevel1();
fixMenengahLevel2();
fixSulitDuplicates();
console.log('All done!');
