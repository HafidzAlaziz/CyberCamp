const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/pages/arena/mode-acak/kategori/menengah/Level1.jsx',
  'src/pages/arena/mode-acak/kategori/menengah/Level2.jsx',
  'src/pages/arena/mode-acak/kategori/menengah/Level3.jsx',
  'src/pages/arena/mode-acak/kategori/menengah/Level4.jsx'
];

filesToFix.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Fix className interpolation
    content = content.replace(/className=\{`(.*?)\{hintStage(.*?)\}/g, 'className={`$1${hintStage$2}');
    content = content.replace(/className=\{`(.*?)\{hintStage(.*?)\}/g, 'className={`$1${hintStage$2}'); // Twice for multiple occurrences if any
    
    // Fix ACTIVE ({hintStage}/2)
    content = content.replace(/HINT ACTIVE \(\{hintStage\}\/2\)/g, 'HINT ACTIVE (${hintStage}/2)');
    
    // Fix array map classNames interpolation
    // e.g., className={`p-4 rounded-2xl border transition-all {hintStage >=
    content = content.replace(/className=\{`(.*?) \{hintStage/g, 'className={`$1 ${hintStage');
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Fixed interpolation in ${file}`);
  }
});
