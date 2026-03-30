const fs = require('fs');
const path = require('path');

const dir = 'd:/Hfidz/Projek portofolio/Websites/New folder/src/pages/arena/mode-pilihan/web-exploit';

// =====================================================================
// Level 1-9: 3 bintang (hintUsed boolean + TARGET_TIME)
//   projectedStars = 1 + (time <= TARGET_TIME ? 1 : 0) + (!hintUsed ? 1 : 0)
// Level 10: max 4 bintang (hintsUsed count 0-3 + TARGET_TIME)
//   projectedStars = (time <= TARGET_TIME ? 1 : 0) + (3 - hintsUsed)
// =====================================================================

const STAR_RENDER_3 = `{[1, 2, 3].map(s => (
                   <div key={s} className={\`w-2 h-6 rounded-sm border transition-all duration-500 \${
                     s <= projectedStars
                       ? 'bg-cyan-400 border-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                       : 'bg-white/5 border-white/10'
                   }\`} />
                 ))}`;

const STAR_RENDER_4 = `{[1, 2, 3, 4].map(s => (
                   <div key={s} className={\`w-2 h-6 rounded-sm border transition-all duration-500 \${
                     s <= projectedStars
                       ? 'bg-cyan-400 border-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                       : 'bg-white/5 border-white/10'
                   }\`} />
                 ))}`;

// Regex pattern for the static star bars in levels 1-9
// Matches: {[1, 2, 3].map(s => (\n                   <div key={s} className="w-2 h-6 ... />\n                 ))}
const STATIC_3_STAR_RE = /\{?\[1,\s*2,\s*3\]\.map\(s\s*=>\s*\(\s*<div\s+key=\{s\}\s+className="w-2 h-6[^"]*"[^/]*\/>\s*\)\)\}?/gs;

function injectProjectedStars_3(content, filename) {
  // Check if already patched
  if (content.includes('projectedStars')) {
    console.log(`  ${filename}: Already has projectedStars, skipping injection`);
    return content;
  }

  // Inject projectedStars calculation before the return statement
  // Level 1 has no TARGET_TIME, so we hardcode 120
  let computation;
  if (filename === 'Level1.jsx') {
    computation = `  const TARGET_TIME = 120; // 2 minutes\n  const projectedStars = 1 + (time <= TARGET_TIME ? 1 : 0) + (!hintUsed ? 1 : 0);\n`;
  } else {
    computation = `  const projectedStars = 1 + (time <= TARGET_TIME ? 1 : 0) + (!hintUsed ? 1 : 0);\n`;
  }

  // Insert after formatTime function
  content = content.replace(
    /(\s*return `\$\{mins\.toString\(\)\.padStart\(2, '0'\)\}:\$\{secs\.toString\(\)\.padStart\(2, '0'\)\}`;\s*\};)/,
    `$1\n${computation}`
  );

  return content;
}

function injectProjectedStars_10(content, filename) {
  if (content.includes('projectedStars')) {
    console.log(`  ${filename}: Already has projectedStars, skipping injection`);
    return content;
  }

  const computation = `  const projectedStars = (time <= TARGET_TIME ? 1 : 0) + Math.max(0, 3 - hintsUsed);\n`;

  content = content.replace(
    /(\s*return `\$\{mins\.toString\(\)\.padStart\(2, '0'\)\}:\$\{secs\.toString\(\)\.padStart\(2, '0'\)\}`;\s*\};)/,
    `$1\n${computation}`
  );

  return content;
}

function replaceStarRender(content, starRender) {
  // Match the existing static map render pattern (handles both bg-cyan-500/20 and bg-orange-500/20 etc.)
  const patterns = [
    // Pattern: {[1, 2, 3].map(s => (\n  <div key={s} className="w-2 h-6 bg-.../" />\n))}
    /\{?\[1,\s*2,\s*3\]\.map\(\s*s\s*=>\s*\(\s*\n?\s*<div\s+key=\{s\}\s+className="w-2 h-6[^"]*"[^>]*\/>\s*\n?\s*\)\)\}?/g,
  ];

  for (const pat of patterns) {
    if (pat.test(content)) {
      content = content.replace(pat, starRender);
      return content;
    }
  }
  console.log(`  WARNING: Could not find star map pattern!`);
  return content;
}

function replaceStarRender4(content) {
  // Level 10 might have 4 bars already or 3 bars  
  // Replace [1, 2, 3] or [1, 2, 3, 4] render
  const pat = /\{?\[1,\s*2,\s*3(?:,\s*4)?\]\.map\(\s*s\s*=>\s*\(\s*\n?\s*<div\s+key=\{s\}\s+className="w-2 h-6[^"]*"[^>]*\/>\s*\n?\s*\)\)\}?/g;
  return content.replace(pat, STAR_RENDER_4);
}

// === Process Levels 1-9 ===
const levels1to9 = ['Level1.jsx','Level2.jsx','Level3.jsx','Level4.jsx','Level5.jsx','Level6.jsx','Level7.jsx','Level8.jsx','Level9.jsx'];

for (const filename of levels1to9) {
  const fp = path.join(dir, filename);
  let content = fs.readFileSync(fp, 'utf-8');
  
  content = injectProjectedStars_3(content, filename);
  content = replaceStarRender(content, STAR_RENDER_3);
  
  fs.writeFileSync(fp, content, 'utf-8');
  console.log(`✓ Updated ${filename}`);
}

// === Process Level 10 (4 stars) ===
{
  const fp = path.join(dir, 'Level10.jsx');
  let content = fs.readFileSync(fp, 'utf-8');
  
  content = injectProjectedStars_10(content, 'Level10.jsx');
  content = replaceStarRender4(content);
  
  fs.writeFileSync(fp, content, 'utf-8');
  console.log(`✓ Updated Level10.jsx (4-star system)`);
}

console.log('\nDone! Star system is now live and reactive.');
