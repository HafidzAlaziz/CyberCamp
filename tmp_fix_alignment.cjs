const fs = require('fs');
const fp = 'src/pages/arena/mode-acak/IndexModeAcak.jsx';
let c = fs.readFileSync(fp, 'utf8');

// Align stars/hex/status
// 1. Remove redundant pr-24 from line 338
c = c.replace(/relative h-24 flex items-center pr-24/, 'relative h-24 flex items-center');

// 2. Fix SVG width and lines
c = c.replace(/style=\{\{ width: `\${currentLevelsArray\.length \* 188 - 108}px` \}\} \}/, ''); // Remove explicit width, let flex handle or inset
c = c.replace(/const startX = 40 \+ i \* 188 \+ 31;/, 'const nodeStep = 188; const startX = 40 + i * nodeStep + 31;');
c = c.replace(/const endX = 40 \+ \(i \+ 1\) \* 188 - 31;/, 'const endX = 40 + (i + 1) * nodeStep - 31;');

// 3. Status text misalignment fix (removing pb-2 px-1)
c = c.replace(/<div key=\{`status-\${node\.id}`\} className="w-20 flex flex-col items-center text-center pb-2 px-1">/, '<div key={`status-${node.id}`} className="w-20 flex flex-col items-center text-center">');

fs.writeFileSync(fp, c, 'utf8');
console.log('Fixed IndexModeAcak.jsx');
