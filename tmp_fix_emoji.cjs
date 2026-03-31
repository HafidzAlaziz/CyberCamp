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
    content = content.replace(/ðŸ’¡/g, '💡');
    content = content.replace(/â€”/g, '—');
    content = content.replace(/âš¡/g, '⚡');
    content = content.replace(/\$\{hintStage/g, '{hintStage');
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Fixed ${file}`);
  }
});
