const fs = require('fs');
const path = require('path');

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (file.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('TRAP_FLAG: ')) {
        const newContent = content.replace(/TRAP_FLAG: /g, '');
        fs.writeFileSync(fullPath, newContent);
        console.log('Updated:', fullPath);
      }
    }
  }
}

walk('d:/Hfidz/Projek portofolio/Websites/New folder/src/pages/arena');
