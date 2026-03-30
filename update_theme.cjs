const fs = require('fs');
const path = require('path');

const dir = 'd:/Hfidz/Projek portofolio/Websites/New folder/src/pages/arena/mode-pilihan/web-exploit';

function updateFile(filename, colorReplacements) {
    const fullPath = path.join(dir, filename);
    let content = fs.readFileSync(fullPath, 'utf-8');
    
    // Extends the target time to max 15 minutes (900 seconds) or 10 minutes (600 seconds)
    content = content.replace(/const TARGET_TIME = \d+;/, `const TARGET_TIME = ${['Level8.jsx', 'Level9.jsx', 'Level10.jsx'].includes(filename) ? 900 : 600};`);

    colorReplacements.forEach(r => {
        content = content.replace(new RegExp(r[0], 'g'), r[1]);
    });

    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`Updated ${filename}`);
}

// Level 4, 5, 6 (Amber -> Cyan)
const amberToCyan = [
    ['amber', 'cyan'],
    ['245,158,11', '6,182,212'],
    ['#f59e0b', '#06b6d4'],
    ['AMBER THEME', 'CYAN THEME']
];
updateFile('Level4.jsx', amberToCyan);
updateFile('Level5.jsx', amberToCyan);
updateFile('Level6.jsx', amberToCyan);

// Level 7 (Orange -> Cyan)
const orangeToCyan = [
    ['orange', 'cyan'],
    ['249,115,22', '6,182,212'],
    ['#f97316', '#06b6d4'],
    ['ORANGE THEME', 'CYAN THEME']
];
updateFile('Level7.jsx', orangeToCyan);

// Level 9 (Rose -> Cyan)
const roseToCyan = [
    ['rose-', 'cyan-'],
    ['rose:','cyan:'],
    ['225,29,72', '6,182,212'],
    ['#e11d48', '#06b6d4'],
    ['ROSE/DARK_RED THEME', 'CYAN THEME']
];
updateFile('Level9.jsx', roseToCyan);

// Level 8 & 10 (Red -> Cyan) - TRICKY: need to preserve error red.
// I'll manually handle the red replacements via another targeted script approach or just multi_replace_file_content.
