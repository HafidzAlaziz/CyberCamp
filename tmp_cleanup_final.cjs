const fs = require('fs');
const path = require('path');
const baseDir = path.join(__dirname, 'src/pages/arena/mode-acak/kategori');

const allFiles = [
  'mudah/Level1.jsx', 'mudah/Level2.jsx', 'mudah/Level3.jsx', 'mudah/Level4.jsx',
  'menengah/Level1.jsx', 'menengah/Level2.jsx', 'menengah/Level3.jsx',
  'sulit/Level1.jsx', 'sulit/Level2.jsx', 'sulit/Level3.jsx'
];

// Regex to match the orphaned setStars body fragments:
// These look like:
//         localStorage.setItem('...stars', newStars.toString());
//         return newStars;
//       });
// Left behind after the setStars(s => { ... }) was partially removed
const orphanedPattern = /\s+localStorage\.setItem\('[^']+_stars',\s*newStars\.toString\(\)\);\s*\n\s+return newStars;\s*\n\s+\}\);\s*\n/g;

allFiles.forEach(rel => {
  const fp = path.join(baseDir, rel);
  if (!fs.existsSync(fp)) return;
  let content = fs.readFileSync(fp, 'utf8');
  const before = content;
  content = content.replace(orphanedPattern, '\n');
  if (content !== before) {
    fs.writeFileSync(fp, content, 'utf8');
    console.log(`Fixed orphaned setStars in ${rel}`);
  } else {
    console.log(`No orphan found in ${rel}`);
  }
});

console.log('Cleanup done!');
