const fs = require('fs');
const path = require('path');
const baseDir = path.join(__dirname, 'src/pages/arena/mode-acak/kategori');

function fixSulitFile(rel) {
  const fp = path.join(baseDir, rel);
  if (!fs.existsSync(fp)) { console.log(`Not found: ${rel}`); return; }
  let c = fs.readFileSync(fp, 'utf8');

  // 1. Fix duplicate `Check` in import
  // Pattern: "Check,\n  Check" or "Check\n  Check,"
  c = c.replace(/,\s*Check,\s*Check/g, ', Check');
  c = c.replace(/Check,\s*\n(\s*)Check/g, 'Check');
  // More aggressive: remove literal duplicate import line
  const importSection = c.match(/import \{[\s\S]*?\} from 'lucide-react';/)?.[0] || '';
  if (importSection) {
    const fixedImport = importSection
      .split('\n')
      .filter((line, i, arr) => arr.indexOf(line) === i) // deduplicate lines
      .join('\n');
    c = c.replace(importSection, fixedImport);
  }

  // 2. Fix duplicate hintStage declaration
  // The new correct block already exists from our previous script injection:
  // const [hintStage, setHintStage] = useState(() => parseInt(...));
  // Plus the old one duplicated below it.
  // Strategy: keep only the FIRST occurrence, remove all subsequent ones.
  const hintStagePattern = /const \[hintStage, setHintStage\] = useState\(\(\) => parseInt\(localStorage\.getItem\('ctf_sulit_level\d_hint_stage'\) \|\| '0'\)\);/g;
  const hintStageMatches = c.match(hintStagePattern);
  if (hintStageMatches && hintStageMatches.length > 1) {
    let firstFound = false;
    c = c.replace(hintStagePattern, (match) => {
      if (!firstFound) { firstFound = true; return match; }
      return ''; // remove subsequent duplicates
    });
    console.log(`  Fixed duplicate hintStage in ${rel}`);
  }

  // 3. Fix duplicate hasUsedHint declarations if any
  const hasHintPattern = /const \[hasUsedHint, setHasUsedHint\] = useState\(\(\) => \{[\s\S]*?\}\);/g;
  const hasHintMatches = c.match(hasHintPattern);
  if (hasHintMatches && hasHintMatches.length > 1) {
    let firstFound = false;
    c = c.replace(hasHintPattern, (match) => {
      if (!firstFound) { firstFound = true; return match; }
      return '';
    });
    console.log(`  Fixed duplicate hasUsedHint in ${rel}`);
  }

  // 4. Remove stale setStars calls (now stars is computed, not stateful)
  c = c.replace(/setStars\([^)]*\);/g, '');
  c = c.replace(/setStars\(s => \{[\s\S]*?\}\);/g, '');

  // 5. Remove stale unlockHintStage function if it references undefined vars
  c = c.replace(/const unlockHintStage = \(stage\) => \{[\s\S]*?\};/g, '');

  fs.writeFileSync(fp, c, 'utf8');
  console.log(`Fixed ${rel}`);
}

fixSulitFile('sulit/Level1.jsx');
fixSulitFile('sulit/Level2.jsx');
fixSulitFile('sulit/Level3.jsx');

// Also fix menengah for same stale setStars refs
['menengah/Level1.jsx', 'menengah/Level2.jsx', 'menengah/Level3.jsx'].forEach(rel => {
  const fp = path.join(baseDir, rel);
  if (!fs.existsSync(fp)) return;
  let c = fs.readFileSync(fp, 'utf8');
  c = c.replace(/setStars\([^)]*\);/g, '');
  c = c.replace(/setStars\(s => \{[\s\S]*?\}\);/g, '');
  fs.writeFileSync(fp, c, 'utf8');
  console.log(`Cleaned stale setStars from ${rel}`);
});

console.log('All sulit + menengah fixes done!');
