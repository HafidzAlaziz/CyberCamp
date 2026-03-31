const fs = require('fs');
const content = fs.readFileSync('src/pages/arena/mode-acak/IndexModeAcak.jsx', 'utf8');
const lines = content.split(/\r?\n/);
for (let i = 460; i < 480; i++) {
  const line = lines[i];
  if (line === undefined) continue;
  console.log(`${i+1}: "${line.replace(/ /g, '.')}"`);
  let codes = [];
  for (let j = 0; j < line.length; j++) {
     codes.push(line.charCodeAt(j));
  }
  console.log(`    Codes: ${codes.join(',')}`);
}
