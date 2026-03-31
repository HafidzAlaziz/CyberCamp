const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'arena', 'mode-acak', 'kategori', 'mudah', 'Level4.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const replacements = [
  // Orange -> Cyan
  { regex: /rgba\(249,115,22,/g, replace: 'rgba(6,182,212,' },
  { regex: /#f97316/gi, replace: '#06b6d4' },
  { regex: /orange-500/g, replace: 'cyan-500' },
  { regex: /orange-400/g, replace: 'cyan-400' },
  { regex: /orange-600/g, replace: 'cyan-600' },
  { regex: /orange-200/g, replace: 'cyan-200' },
  { regex: /orange-950/g, replace: 'cyan-950' },
  
  // Yellow -> Cyan (just in case some yellow was missed)
  { regex: /rgba\(234,179,8,/g, replace: 'rgba(6,182,212,' },
  { regex: /#eab308/gi, replace: '#06b6d4' },
  { regex: /#facc15/gi, replace: '#22d3ee' },
  { regex: /yellow-500/g, replace: 'cyan-500' },
  { regex: /yellow-400/g, replace: 'cyan-400' },
  { regex: /yellow-600/g, replace: 'cyan-600' },
  { regex: /yellow-300/g, replace: 'cyan-300' },
  { regex: /yellow-200/g, replace: 'cyan-200' },
  { regex: /yellow-900/g, replace: 'cyan-900' },
  { regex: /yellow-950/g, replace: 'cyan-950' },
  
  // Green -> Cyan ? No, green is for the little terminal dots.
];

let changed = false;
for (const rep of replacements) {
  if (rep.regex.test(content)) {
    content = content.replace(rep.regex, rep.replace);
    changed = true;
  }
}

if (changed) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed orange to cyan in Level4');
} else {
  console.log('Nothing changed');
}
