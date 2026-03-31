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
    
    // Fix the double dollar signs that were accidentally added
    content = content.replace(/\$\$\{hintStage/g, '${hintStage');
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Cleaned up double dollar signs in ${file}`);
  }
});
