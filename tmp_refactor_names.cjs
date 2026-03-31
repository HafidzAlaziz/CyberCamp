const fs = require('fs');
const path = require('path');

const dirMenengah = path.join(__dirname, 'src', 'pages', 'arena', 'mode-acak', 'kategori', 'menengah');
const dirMudah = path.join(__dirname, 'src', 'pages', 'arena', 'mode-acak', 'kategori', 'mudah');

// --- 1. Fix Menengah/Level2.jsx (originally Level3) ---
let m2Path = path.join(dirMenengah, 'Level2.jsx');
if (fs.existsSync(m2Path)) {
  let content = fs.readFileSync(m2Path, 'utf8');
  content = content.replace(/MenengahLevel3/g, 'MenengahLevel2');
  content = content.replace(/ctf_menengah_level3/g, 'ctf_menengah_level2');
  content = content.replace(/stats\['menengah-3'\]/g, "stats['menengah-2']");
  content = content.replace(/'menengah-3'/g, "'menengah-2'");
  content = content.replace(/LEVEL 3:/g, "LEVEL 2:");
  content = content.replace(/Sektor 03:/g, "Sektor 02:");
  fs.writeFileSync(m2Path, content, 'utf8');
}

// --- 2. Fix Menengah/Level3.jsx (originally Level4) ---
let m3Path = path.join(dirMenengah, 'Level3.jsx');
if (fs.existsSync(m3Path)) {
  let content = fs.readFileSync(m3Path, 'utf8');
  content = content.replace(/MenengahLevel4/g, 'MenengahLevel3');
  content = content.replace(/ctf_menengah_level4/g, 'ctf_menengah_level3');
  content = content.replace(/stats\['menengah-4'\]/g, "stats['menengah-3']");
  content = content.replace(/'menengah-4'/g, "'menengah-3'");
  content = content.replace(/LEVEL 4:/g, "LEVEL 3:");
  content = content.replace(/Sektor 04:/g, "Sektor 03:");
  fs.writeFileSync(m3Path, content, 'utf8');
}

// --- 3. Base replacement for Mudah/Level4.jsx (originally Menengah Level2) ---
let md4Path = path.join(dirMudah, 'Level4.jsx');
if (fs.existsSync(md4Path)) {
  let content = fs.readFileSync(md4Path, 'utf8');
  content = content.replace(/MenengahLevel2/g, 'MudahLevel4');
  content = content.replace(/ctf_menengah_level2/g, 'ctf_mudah_level4');
  content = content.replace(/stats\['menengah-2'\]/g, "stats['mudah-4']");
  content = content.replace(/'menengah-2'/g, "'mudah-4'");
  content = content.replace(/LEVEL 2:/g, "LEVEL 4:");
  content = content.replace(/Sektor 02:/g, "Sektor 04:");
  
  // Update time limit from Menengah 15 min (900s) to Mudah 10 min (600s)
  content = content.replace(/const timeLimit = 900; \/\/ 15 minutes/g, "const timeLimit = 600; // 10 minutes");
  
  fs.writeFileSync(md4Path, content, 'utf8');
}
console.log('Renaming scripts content done.');
