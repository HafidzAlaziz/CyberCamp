const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src', 'pages', 'arena', 'mode-acak', 'kategori');

const levels = [
  { path: 'mudah/Level1.jsx', key: 'mudah-1' },
  { path: 'mudah/Level2.jsx', key: 'mudah-2' },
  { path: 'mudah/Level3.jsx', key: 'mudah-3' },
  { path: 'mudah/Level4.jsx', key: 'mudah-4' },
  { path: 'menengah/Level1.jsx', key: 'menengah-1' },
  { path: 'menengah/Level2.jsx', key: 'menengah-2' },
  { path: 'menengah/Level3.jsx', key: 'menengah-3' },
  { path: 'sulit/Level1.jsx', key: 'sulit-1' },
  { path: 'sulit/Level2.jsx', key: 'sulit-2' },
  { path: 'sulit/Level3.jsx', key: 'sulit-3' },
];

for (const level of levels) {
  const filePath = path.join(baseDir, level.path);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');

  // Regex to find and replace the problematic block
  const oldBlockRegex = /const currentBestTimeSec = \(\(\) => \{ const t = stats\['[^']+'\]\?\.bestTime \|\| '99:99'; const \[m,s\] = t\.split\(':'\)\.map\(Number\); return m\*60\+s; \}\)\(\);\s+const newTimeSec = \(\(\) => \{ const \[m,s\] = timeTakenStr\.split\(':'\)\.map\(Number\); return m\*60\+s; \}\)\(\);\s+const isBetter = stars > currentBestStars \|\| \(stars === currentBestStars && newTimeSec < currentBestTimeSec\);/g;

  // New robust block
  const newBlock = `const currentBestTimeSec = (() => { 
        const t = stats['${level.key}']?.bestTime;
        if (!t) return 999999;
        const parts = String(t).split(':').map(Number);
        return parts.length === 2 ? parts[0] * 60 + parts[1] : (Number(parts[0]) || 999999);
      })();
      const isBetter = stars > currentBestStars || (stars === currentBestStars && elapsed < currentBestTimeSec);`;

  if (content.match(oldBlockRegex)) {
    content = content.replace(oldBlockRegex, newBlock);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed robust logic for: ${level.key}`);
  } else {
    // If double spaces or slightly different format
    console.log(`Pattern mismatch for ${level.key}, scanning for fallback...`);
  }
}
