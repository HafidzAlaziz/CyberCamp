const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src', 'pages', 'arena', 'mode-acak', 'kategori', 'mudah', 'Level4.jsx');
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/group-hover\/row:text-orange-300/g, 'group-hover/row:text-cyan-300');
fs.writeFileSync(file, content, 'utf8');
console.log('fixed orange hover -> cyan hover');
