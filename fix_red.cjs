const fs = require('fs');
const path = require('path');

const dir = 'd:/Hfidz/Projek portofolio/Websites/New folder/src/pages/arena/mode-pilihan/web-exploit';

function fixRedTheme(file) {
    let content = fs.readFileSync(path.join(dir, file), 'utf-8');

    // Safe replacements (not used in error states)
    content = content.replace(/text-red-400/g, 'text-cyan-400');
    content = content.replace(/border-red-400/g, 'border-cyan-400');
    content = content.replace(/fill-red-400/g, 'fill-cyan-400');
    content = content.replace(/text-red-100/g, 'text-cyan-100');
    content = content.replace(/rgba\(239,68,68,0\.1\)/g, 'rgba(6,182,212,0.1)'); 
    content = content.replace(/#ef4444/g, '#06b6d4');

    // Replace EXACT bg/border components of the theme
    content = content.replace(/bg-red-500\/5 /g, 'bg-cyan-500/5 ');
    content = content.replace(/bg-red-\d?00\/20/g, 'bg-cyan-500/20');
    content = content.replace(/bg-red-500\/30/g, 'bg-cyan-500/30');
    content = content.replace(/bg-red-600\/5 /g, 'bg-cyan-500/5 ');
    content = content.replace(/"w-2 h-2 bg-red-500 rounded-full/g, '"w-2 h-2 bg-cyan-500 rounded-full');
    content = content.replace(/bg-red-500 shadow-\[0_0_15px_#06b6d4\]/g, 'bg-cyan-500 shadow-[0_0_15px_#06b6d4]');
    content = content.replace(/text-red-500 drop-shadow-\[0_0_10px_#06b6d4\]/g, 'text-cyan-500 drop-shadow-[0_0_10px_#06b6d4]');
    content = content.replace(/Target className="w-4 h-4 text-red-500"/g, 'Target className="w-4 h-4 text-cyan-500"');
    content = content.replace(/bg-red-900\/10/g, 'bg-cyan-900/10');
    content = content.replace(/border-red-900\/30/g, 'border-cyan-900/30');
    content = content.replace(/focus-within:border-red-600\/50/g, 'focus-within:border-cyan-500/50');
    content = content.replace(/text-red-500 uppercase tracking-widest/g, 'text-cyan-500 uppercase tracking-widest');
    content = content.replace(/KeyRound className="w-12 h-12 text-red-600/g, 'KeyRound className="w-12 h-12 text-cyan-500');

    // Reverting specific errs that might be touched (Level 8 specific)
    // Actually we haven't touched the `status === 'wrong'` ternary yet: `status === 'wrong' ? 'border-red-500/50 ...` - it is untouched!
    // Because I only targeted specific classes above.

    // Let's do a few more safe ones explicitly
    content = content.replace(/border-red-500\/30/g, 'border-cyan-500/30');
    content = content.replace(/text-red-500\/30/g, 'text-cyan-500/30');
    content = content.replace(/text-4xl font-black italic tracking-tighter text-red-500/g, 'text-4xl font-black italic tracking-tighter text-cyan-500');

    fs.writeFileSync(path.join(dir, file), content, 'utf-8');
    console.log(`Updated ${file}`);
}

fixRedTheme('Level8.jsx');
fixRedTheme('Level10.jsx');
