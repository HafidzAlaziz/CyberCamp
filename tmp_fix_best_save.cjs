const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src', 'pages', 'arena', 'mode-acak', 'kategori');

// Mapping: file path -> key used in stats
const levelFiles = [
  { file: path.join(baseDir, 'mudah', 'Level1.jsx'), key: 'mudah-1' },
  { file: path.join(baseDir, 'mudah', 'Level2.jsx'), key: 'mudah-2' },
  { file: path.join(baseDir, 'mudah', 'Level3.jsx'), key: 'mudah-3' },
  { file: path.join(baseDir, 'mudah', 'Level4.jsx'), key: 'mudah-4' },
  { file: path.join(baseDir, 'menengah', 'Level1.jsx'), key: 'menengah-1' },
  { file: path.join(baseDir, 'menengah', 'Level2.jsx'), key: 'menengah-2' },
  { file: path.join(baseDir, 'menengah', 'Level3.jsx'), key: 'menengah-3' },
  { file: path.join(baseDir, 'sulit', 'Level1.jsx'), key: 'sulit-1' },
  { file: path.join(baseDir, 'sulit', 'Level2.jsx'), key: 'sulit-2' },
  { file: path.join(baseDir, 'sulit', 'Level3.jsx'), key: 'sulit-3' },
];

for (const { file, key } of levelFiles) {
  if (!fs.existsSync(file)) {
    console.log(`MISSING: ${file}`);
    continue;
  }

  let content = fs.readFileSync(file, 'utf8');
  const oldSave = new RegExp(
    `const currentBestStars = stats\\['${key}'\\]\\?\\.stars \\|\\| 0;\\s*if \\(stars >= currentBestStars\\) \\{`,
    'g'
  );

  const newSave = `const currentBestStars = stats['${key}']?.stars || 0;
      const currentBestTimeStr = stats['${key}']?.bestTime || '99:99';
      const currentBestTimeSec = parseInt(currentBestTimeStr.split(':')[0]) * 60 + parseInt(currentBestTimeStr.split(':')[1]);
      const newTimeSec = parseInt(timeTakenStr.split(':')[0]) * 60 + parseInt(timeTakenStr.split(':')[1]);
      const isBetter = stars > currentBestStars || (stars === currentBestStars && newTimeSec < currentBestTimeSec);
      if (isBetter) {`;

  if (oldSave.test(content)) {
    content = content.replace(oldSave, newSave);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed: ${key}`);
  } else {
    // Show the current pattern so we know what to match
    const findLine = content.match(/currentBestStars[\s\S]{0,200}isBetter|currentBestStars[\s\S]{0,200}if \(stars/);
    console.log(`Pattern not matched for: ${key} -- checking snippet: ${findLine ? findLine[0].substring(0,100) : 'not found'}`);
  }
}

console.log('Done.');
