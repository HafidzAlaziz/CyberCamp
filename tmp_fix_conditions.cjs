const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src', 'pages', 'arena', 'mode-acak', 'kategori');

const updates = [
  {
    pattern: /stats\['mudah-(\d+)'\] = \{ stars: stars, bestTime: timeTakenStr \};/g,
    replacement: "stats['mudah-$1'] = { stars: stars, bestTime: timeTakenStr, conditions: [true, !hasUsedHint, !isTimeFailed] };"
  },
  {
    pattern: /stats\['menengah-(\d+)'\] = \{ stars: stars, bestTime: timeTakenStr \};/g,
    replacement: "stats['menengah-$1'] = { stars: stars, bestTime: timeTakenStr, conditions: [true, hintStage < 1, hintStage < 2, !isTimeFailed] };"
  },
  {
    pattern: /stats\['sulit-(\d+)'\] = \{ stars: stars, bestTime: timeTakenStr \};/g,
    replacement: "stats['sulit-$1'] = { stars: stars, bestTime: timeTakenStr, conditions: [true, hintStage < 1, hintStage < 2, hintStage < 3, !isTimeFailed] };"
  }
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      
      for (const { pattern, replacement } of updates) {
        if (pattern.test(content)) {
          content = content.replace(pattern, replacement);
          changed = true;
        }
      }
      
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated conditions in ${fullPath}`);
      }
    }
  }
}

processDirectory(baseDir);
console.log('Done.');
