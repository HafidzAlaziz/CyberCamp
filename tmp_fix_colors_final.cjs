const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src', 'pages', 'arena', 'mode-acak', 'kategori');

const rules = [
  {
    target: 'mudah',
    replacements: [
      // Yellow -> Cyan
      { regex: /rgba\(250,204,21,/g, replace: 'rgba(6,182,212,' },
      { regex: /#facc15/gi, replace: '#22d3ee' },
      { regex: /yellow-400/g, replace: 'cyan-400' },
      { regex: /rgba\(234,179,8,/g, replace: 'rgba(6,182,212,' },
      { regex: /yellow-500/g, replace: 'cyan-500' },
      // Purple -> Cyan
      { regex: /rgba\(168,85,247,/g, replace: 'rgba(6,182,212,' },
      { regex: /#a855f7/gi, replace: '#22d3ee' },
      { regex: /purple-500/g, replace: 'cyan-500' }
    ]
  },
  {
    target: 'menengah',
    replacements: [
      // Emerald -> Yellow
      { regex: /rgba\(16,185,129,/g, replace: 'rgba(234,179,8,' },
      { regex: /#34d399/gi, replace: '#facc15' },
      { regex: /emerald-400/g, replace: 'yellow-400' },
      { regex: /emerald-500/g, replace: 'yellow-500' },
      // Cyan -> Yellow
      { regex: /rgba\(6,182,212,/g, replace: 'rgba(234,179,8,' },
      { regex: /#06b6d4/gi, replace: '#eab308' },
      { regex: /#22d3ee/gi, replace: '#facc15' },
      { regex: /cyan-400/g, replace: 'yellow-400' },
      { regex: /cyan-500/g, replace: 'yellow-500' }
    ]
  },
  {
    target: 'sulit',
    replacements: [
      // Pink -> Red
      { regex: /rgba\(236,72,153,/g, replace: 'rgba(239,68,68,' },
      { regex: /#ec4899/gi, replace: '#ef4444' },
      { regex: /pink-500/g, replace: 'red-500' },
      { regex: /pink-400/g, replace: 'red-400' },
      // Blue -> Red
      { regex: /rgba\(59,130,246,/g, replace: 'rgba(239,68,68,' },
      { regex: /#3b82f6/gi, replace: '#ef4444' },
      { regex: /#60a5fa/gi, replace: '#f87171' },
      { regex: /blue-500/g, replace: 'red-500' },
      { regex: /blue-400/g, replace: 'red-400' },
      // Cyan -> Red
      { regex: /rgba\(6,182,212,/g, replace: 'rgba(239,68,68,' },
      { regex: /#22d3ee/gi, replace: '#f87171' },
      { regex: /#06b6d4/gi, replace: '#ef4444' },
      { regex: /cyan-400/g, replace: 'red-400' },
      { regex: /cyan-500/g, replace: 'red-500' }
    ]
  }
];

function processDirectory(dir, category) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath, file); // passing down directory name as category
    } else if (file.endsWith('.jsx')) {
      
      const rule = rules.find(r => r.target === category);
      if (rule) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let changed = false;
        
        for (const rep of rule.replacements) {
          if (rep.regex.test(content)) {
             content = content.replace(rep.regex, rep.replace);
             changed = true;
          }
        }
        
        if (changed) {
          fs.writeFileSync(fullPath, content, 'utf8');
          console.log(`Fixed colors in ${category}/${file}`);
        }
      }
    }
  }
}

// category defaults to empty string at root, the first level subdirectories are 'mudah', 'menengah', 'sulit'
processDirectory(baseDir, '');
console.log('Done.');
