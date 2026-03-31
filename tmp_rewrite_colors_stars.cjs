const fs = require('fs');
const path = require('path');

const MUDAH_FILES = [
  'mudah/Level1.jsx',
  'mudah/Level2.jsx',
  'mudah/Level3.jsx',
  'mudah/Level4.jsx'
];
const MENENGAH_FILES = [
  'menengah/Level1.jsx',
  'menengah/Level2.jsx',
  'menengah/Level3.jsx'
];
const SULIT_FILES = [
  'sulit/Level1.jsx',
  'sulit/Level2.jsx',
  'sulit/Level3.jsx'
];

async function processFile(relPath, category) {
  const fullPath = path.join(__dirname, 'src/pages/arena/mode-acak/kategori', relPath);
  if (!fs.existsSync(fullPath)) return console.log(`Not found: ${fullPath}`);
  
  let content = fs.readFileSync(fullPath, 'utf8');

  // 1. Color Replacement
  if (category === 'MUDAH') {
    content = content.replace(/(?<!\#)(pink|yellow|blue|emerald|red|purple)-(100|200|300|400|500|600|700|800|900|950)/g, 'cyan-$2');
    content = content.replace(/#ec4899|#eab308|#3b82f6|#10b981|#ef4444|#a855f7/g, '#06b6d4'); // approximate drop shadows to cyan-500
  } else if (category === 'MENENGAH') {
    content = content.replace(/(?<!\#)(pink|cyan|blue|emerald|red|purple)-(100|200|300|400|500|600|700|800|900|950)/g, 'yellow-$2');
    content = content.replace(/#ec4899|#06b6d4|#3b82f6|#10b981|#ef4444|#a855f7/g, '#eab308');
  } else if (category === 'SULIT') {
    content = content.replace(/(?<!\#)(pink|cyan|blue|emerald|yellow|purple)-(100|200|300|400|500|600|700|800|900|950)/g, 'red-$2');
    content = content.replace(/#ec4899|#06b6d4|#3b82f6|#10b981|#eab308|#a855f7/g, '#ef4444');
  }

  // 2. Stars Array UI Update Mapping
  if (category === 'MUDAH') {
    content = content.replace(/\[1,\s*2,\s*3,\s*4\]\.map/g, '[1, 2, 3].map');
    content = content.replace(/\[1,\s*2,\s*3,\s*4,\s*5\]\.map/g, '[1, 2, 3].map');
  } else if (category === 'MENENGAH') {
    content = content.replace(/\[1,\s*2,\s*3\]\.map/g, '[1, 2, 3, 4].map');
    content = content.replace(/\[1,\s*2,\s*3,\s*4,\s*5\]\.map/g, '[1, 2, 3, 4].map');
  } else if (category === 'SULIT') {
    content = content.replace(/\[1,\s*2,\s*3\]\.map/g, '[1, 2, 3, 4, 5].map');
    content = content.replace(/\[1,\s*2,\s*3,\s*4\]\.map/g, '[1, 2, 3, 4, 5].map');
  }

  // 3. Max Stars and Hint Logic Calculation
  if (category === 'MUDAH') {
    content = content.replace(/Math\.max\(1,\s*\d+\s*-\s*\(hasHint\s*\?\s*1\s*:\s*0\)\)/g, 'Math.max(1, 3 - (hasHint ? 1 : 0))');
    content = content.replace(/Math\.max\(1,\s*\d+\s*-\s*1\)/g, 'Math.max(1, 3 - 1)'); 
    content = content.replace(/Math\.max\(1,\s*\d+\s*-\s*currentHint\)/g, 'Math.max(1, 3 - currentHint)'); 
    content = content.replace(/Math\.max\(1,\s*\d+\s*-\s*stage\)/g, 'Math.max(1, 3 - stage)'); 
  } else if (category === 'MENENGAH') {
    content = content.replace(/Math\.max\(1,\s*\d+\s*-\s*\(hasHint\s*\?\s*1\s*:\s*0\)\)/g, 'Math.max(1, 4 - (hasHint ? 1 : 0))');
    content = content.replace(/Math\.max\(1,\s*\d+\s*-\s*1\)/g, 'Math.max(1, 4 - 1)'); 
    content = content.replace(/Math\.max\(1,\s*\d+\s*-\s*currentHint\)/g, 'Math.max(1, 4 - currentHint)');
    content = content.replace(/Math\.max\(1,\s*\d+\s*-\s*stage\)/g, 'Math.max(1, 4 - stage)');
  } else if (category === 'SULIT') {
    content = content.replace(/Math\.max\(1,\s*\d+\s*-\s*\(hasHint\s*\?\s*1\s*:\s*0\)\)/g, 'Math.max(1, 5 - (hasHint ? 1 : 0))');
    content = content.replace(/Math\.max\(1,\s*\d+\s*-\s*1\)/g, 'Math.max(1, 5 - 1)'); 
    content = content.replace(/Math\.max\(1,\s*\d+\s*-\s*currentHint\)/g, 'Math.max(1, 5 - currentHint)');
    content = content.replace(/Math\.max\(1,\s*\d+\s*-\s*stage\)/g, 'Math.max(1, 5 - stage)');
  }

  // Write changes
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Updated ${relPath} successfully.`);
}

async function main() {
  for (const f of MUDAH_FILES) await processFile(f, 'MUDAH');
  for (const f of MENENGAH_FILES) await processFile(f, 'MENENGAH');
  for (const f of SULIT_FILES) await processFile(f, 'SULIT');
}

main();
