const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'arena', 'mode-acak', 'kategori', 'mudah', 'Level4.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// State Replacement
content = content.replace(
  /const \[hintStage\, setHintStage\] = useState\(0\);/g,
  `const [hasUsedHint, setHasUsedHint] = useState(() => localStorage.getItem('ctf_mudah_level4_hint_used') === 'true');`
);

// Penalty & Stars Replacement
content = content.replace(
  /const hintPenalty = Math\.min\(2\, hintStage\); \/\/ max 2 penalties for 2 hint stages/g,
  `const hintPenalty = hasUsedHint ? 1 : 0;`
);

content = content.replace(
  /const stars = Math\.max\(1\, 4 \- hintPenalty \- timePenalty\);/g,
  `const stars = Math.max(1, 3 - hintPenalty - timePenalty);`
);

// LocalStorage Stars Submit Replacement
content = content.replace(
  /conditions: \[true, hintStage < 1, hintStage < 2, !isTimeFailed\]/g,
  `conditions: [true, !hasUsedHint, !isTimeFailed]`
);

// Delete unlockHintStage function
content = content.replace(/const unlockHintStage = \([\s\S]*?};/g, '');

// Modal Hint Replacement (The end of file modal)
// We replace the entire AnimatePresence block that checks showHintModal.
// First let's remove the old Menengah Hint Modal by finding it. It usually starts with `{showHintModal && (`
// Wait, actually I can just do a very precise replace for the button.

content = content.replace(
  /onClick=\{\(\) => setShowHintModal\(true\)\} className=\{`(.*?) \$\{hintStage > 0 \? '(.*?)' : '(.*?)'\}`\}/g,
  `onClick={() => setShowHintModal(true)} className={\`$1 \${hasUsedHint ? '$2' : '$3'}\`}`
);

content = content.replace(
  /className=\{`w-4 h-4 transition-colors \$\{hintStage > 0 \? '(.*?)' : '(.*?)'\}`\}/g,
  `className={\`w-4 h-4 transition-colors \${hasUsedHint ? '$1' : '$2'}\`}`
);

content = content.replace(
  /\{hintStage > 0 \? `HINT ACTIVE \(\$\{hintStage\}\/2\)` : '💡 MINTA HINT BOS'\}/g,
  `{hasUsedHint ? "HINT ACTIVE (1/1)" : "💡 MINTA HINT BOS"}`
);

// Replace 4 stars mapping in UI (top right)
content = content.replace(/\{\[1, 2, 3, 4\].map\(s =>/gi, '{[1, 2, 3].map(s =>');

// The bottom Hint Modal
content = content.replace(/\<div className="space-y-4"\>[\s\S]*?\<\/AnimatePresence\>/, function(match) {
  return `<AnimatePresence>
        {showHintModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-gray-900 border border-cyan-500/30 p-8 rounded-2xl max-w-md w-full shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10"><Zap className="w-20 h-20 text-cyan-500" /></div>
                <h3 className="text-xl font-black text-cyan-400 italic tracking-tighter mb-2 uppercase">System_Hint // Override</h3>
                <div className="p-4 bg-cyan-950/30 border border-cyan-500/20 rounded-xl mb-6">
                   <p className="text-cyan-200 text-sm leading-relaxed text-left">
                     {hasUsedHint ? "HINT ACTIVE: Perhatikan kolom ASCII. Cari string yang menyerupai format CTF{...} di antara karakter acak." : "Meminta petunjuk akan mengurangi skor efisiensi (-1 Bintang). Lanjutkan?"}
                   </p>
                </div>
                {!hasUsedHint ? (
                   <div className="flex gap-4">
                      <button onClick={() => { setHasUsedHint(true); localStorage.setItem('ctf_mudah_level4_hint_used', 'true'); setShowHintModal(false); }} className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black font-black py-4 rounded-xl text-xs tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)]">AKSES HINT (-1 ⚡)</button>
                      <button onClick={() => setShowHintModal(false)} className="flex-1 bg-transparent hover:bg-white/5 text-gray-400 hover:text-white font-black py-4 rounded-xl border border-white/10 text-xs tracking-widest uppercase transition-all">BATAL</button>
                   </div>
                ) : (
                   <button onClick={() => setShowHintModal(false)} className="w-full bg-gray-800 hover:bg-gray-700 text-white font-black py-4 rounded-xl text-xs tracking-widest uppercase transition-all">TUTUP</button>
                )}
             </motion.div>
          </div>
        )}
      </AnimatePresence>`;
});


fs.writeFileSync(filePath, content, 'utf8');
console.log('Modified Level4 internal logic.');
