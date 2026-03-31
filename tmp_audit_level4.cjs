const fs = require('fs');
const content = fs.readFileSync('src/pages/arena/mode-acak/kategori/mudah/Level4.jsx', 'utf8');
const classes = content.match(/\b(text|bg|border|fill|stroke|shadow|drop-shadow|ring)-[a-z]+-[0-9]+[a-z\/]*/g) || [];
const unique = [...new Set(classes)];
const nonCyanGray = unique.filter(c => !/cyan|gray|white|black|transparent/.test(c));
console.log(nonCyanGray.length === 0 ? 'NONE - all clean!' : nonCyanGray.join('\n'));
