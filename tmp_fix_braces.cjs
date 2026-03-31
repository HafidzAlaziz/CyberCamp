const fs = require('fs');
const path = require('path');
const baseDir = path.join(__dirname, 'src/pages/arena/mode-acak/kategori');

const allFiles = [
  'mudah/Level1.jsx', 'mudah/Level2.jsx', 'mudah/Level3.jsx', 'mudah/Level4.jsx',
  'menengah/Level1.jsx', 'menengah/Level2.jsx', 'menengah/Level3.jsx',
  'sulit/Level1.jsx', 'sulit/Level2.jsx', 'sulit/Level3.jsx'
];

allFiles.forEach(rel => {
  const fp = path.join(baseDir, rel);
  if (!fs.existsSync(fp)) return;
  let content = fs.readFileSync(fp, 'utf8');
  
  // Remove duplicate }; at end of file (with CRLF or LF)
  const before = content;
  // Pattern: two consecutive "};" lines
  content = content.replace(/\};\s*\r?\n\};\s*\r?\n(\s*export default)/g, '};\n\n$1');
  
  if (content !== before) {
    fs.writeFileSync(fp, content, 'utf8');
    console.log('Fixed duplicate }: ' + rel);
  } else {
    console.log('OK: ' + rel);
  }
});
console.log('All done');
