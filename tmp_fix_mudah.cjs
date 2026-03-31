const fs = require('fs');
const path = require('path');
const baseDir = path.join(__dirname, 'src/pages/arena/mode-acak/kategori');

function deduplicate(content, pattern) {
  // Remove the second occurrence of a pattern match
  let found = false;
  return content.replace(pattern, (match) => {
    if (found) return match;
    found = true;
    return ''; // remove the first (extra) occurrence
  });
}

// Fix mudah/Level3.jsx - duplicate hasUsedHint + placeholder hint
function fixMudahLevel3() {
  const fp = path.join(baseDir, 'mudah/Level3.jsx');
  let c = fs.readFileSync(fp, 'utf8');

  // Remove the SECOND hasUsedHint declaration (lines 32-34 which are outdated)
  // The correct one is lines 22-24. Remove the duplicate at lines 32-34
  const dupPattern = /(\s*const \[hasUsedHint, setHasUsedHint\] = useState\(\(\) => \{\s*return localStorage\.getItem\('ctf_mudah_level3_hint_used'\) === 'true';\s*\}\);){2}/s;
  const singleMatch = c.match(/const \[hasUsedHint, setHasUsedHint\] = useState\(\(\) => \{\s*return localStorage\.getItem\('ctf_mudah_level3_hint_used'\) === 'true';\s*\}\);/g);
  if (singleMatch && singleMatch.length > 1) {
    // Remove the last duplicate occurrence by targeting its position
    const target = `\n  const [hasUsedHint, setHasUsedHint] = useState(() => {\n    return localStorage.getItem('ctf_mudah_level3_hint_used') === 'true';\n  });\n\n  const [flag`;
    const replacement = `\n\n  const [flag`;
    c = c.replace(target, replacement);
    console.log('  Removed duplicate hasUsedHint in mudah/Level3.jsx');
  }

  // Fix the placeholder hint - replace "CTF{ANSWER_HERE}" with real flag
  c = c.replace(
    `<span className="text-cyan-400">ANSWER:</span> {"CTF{ANSWER_HERE}"}`,
    `<span className="text-cyan-400">ANSWER:</span> {CORRECT_FLAG}`
  );

  // Also remove the stray setStars call that references undefined setStars
  c = c.replace(/setStars\(s => \{\s*const newStars = Math\.max\(1, 3 - 1\);\s*\s*return newStars;\s*\}\);/g, '');

  fs.writeFileSync(fp, c, 'utf8');
  console.log('Fixed mudah/Level3.jsx');
}

// Fix mudah/Level2.jsx - check for same issues
function fixMudahLevel2() {
  const fp = path.join(baseDir, 'mudah/Level2.jsx');
  if (!fs.existsSync(fp)) return;
  let c = fs.readFileSync(fp, 'utf8');
  
  // Remove stale setStars references
  c = c.replace(/setStars\(s => \{[\s\S]*?return newStars;\s*\}\);/g, '');
  
  // Fix placeholder hint answer
  c = c.replace(
    `<span className="text-cyan-400">ANSWER:</span> {"CTF{ANSWER_HERE}"}`,
    (match) => {
      // find the real flag in file
      const flagMatch = c.match(/const (?:realFlag|CORRECT_FLAG|TRUE_FLAG)\s*=\s*["'](CTF\{[^"']+\})["']/);
      const flag = flagMatch ? flagMatch[1] : 'CTF{FLAG_HERE}';
      return `<span className="text-cyan-400">ANSWER:</span> {"${flag}"}`;
    }
  );

  fs.writeFileSync(fp, c, 'utf8');
  console.log('Fixed mudah/Level2.jsx');
}

// Fix mudah/Level1.jsx - check for same issues
function fixMudahLevel1() {
  const fp = path.join(baseDir, 'mudah/Level1.jsx');
  if (!fs.existsSync(fp)) return;
  let c = fs.readFileSync(fp, 'utf8');
  
  c = c.replace(/setStars\(s => \{[\s\S]*?return newStars;\s*\}\);/g, '');
  
  const flagMatch = c.match(/const (?:realFlag|CORRECT_FLAG|TRUE_FLAG)\s*=\s*["'](CTF\{[^"']+\})["']/);
  const flag = flagMatch ? flagMatch[1] : 'CTF{FLAG_HERE}';
  c = c.replace(
    `<span className="text-cyan-400">ANSWER:</span> {"CTF{ANSWER_HERE}"}`,
    `<span className="text-cyan-400">ANSWER:</span> {"${flag}"}`
  );

  fs.writeFileSync(fp, c, 'utf8');
  console.log('Fixed mudah/Level1.jsx');
}

// Fix mudah/Level4.jsx - check for same issues  
function fixMudahLevel4() {
  const fp = path.join(baseDir, 'mudah/Level4.jsx');
  if (!fs.existsSync(fp)) return;
  let c = fs.readFileSync(fp, 'utf8');
  
  c = c.replace(/setStars\(s => \{[\s\S]*?return newStars;\s*\}\);/g, '');
  
  const flagMatch = c.match(/const (?:TRUE_FLAG|CORRECT_FLAG|realFlag)\s*=\s*["'](CTF\{[^"']+\})["']/);
  const flag = flagMatch ? flagMatch[1] : 'CTF{FLAG_HERE}';
  c = c.replace(
    `<span className="text-cyan-400">ANSWER:</span> {"CTF{ANSWER_HERE}"}`,
    `<span className="text-cyan-400">ANSWER:</span> {"${flag}"}`
  );

  // Remove unlockHintStage references to undefined hintStage
  c = c.replace(/const unlockHintStage = \(stage\) => \{[\s\S]*?\};/, '');

  fs.writeFileSync(fp, c, 'utf8');
  console.log('Fixed mudah/Level4.jsx');
}

fixMudahLevel1();
fixMudahLevel2();
fixMudahLevel3();
fixMudahLevel4();
console.log('All mudah fixes done!');
