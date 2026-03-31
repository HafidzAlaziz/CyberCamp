const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src', 'pages', 'arena', 'mode-acak', 'kategori');
const results = {};

function processDirectory(dir, category) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath, file);
    } else if (file.endsWith('.jsx')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      const hexMatches = content.match(/#[a-fA-F0-9]{6}/g) || [];
      const rgbaMatches = content.match(/rgba\([^)]+\)/g) || [];
      const colorClasses = content.match(/\b(cyan|yellow|red|rose|purple|emerald|green|blue|indigo)-[0-9]{3}\b/g) || [];
      
      const setHex = [...new Set(hexMatches)];
      const setRgba = [...new Set(rgbaMatches)];
      const setClasses = [...new Set(colorClasses)];
      
      console.log(`[${category}/${file}]`);
      console.log(`  Hex: ${setHex.join(', ')}`);
      console.log(`  RGBA: ${setRgba.join(', ')}`);
      console.log(`  Cls: ${setClasses.join(', ')}`);
      console.log('');
    }
  }
}

processDirectory(baseDir, 'kategori');
