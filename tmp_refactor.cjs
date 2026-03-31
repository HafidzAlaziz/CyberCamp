const fs = require('fs');
const path = require('path');

const baseDir = path.resolve('d:\\', 'Hfidz', 'Projek portofolio', 'Websites', 'New folder', 'src', 'pages', 'arena', 'mode-acak', 'kategori');
console.log('Target directory:', baseDir);

const config = {
  mudah: [
    { oldId: 8, newId: 1 },
    { oldId: 5, newId: 2 },
    { oldId: 2, newId: 3 },
    { oldId: 7, newId: 4 }
  ],
  menengah: [
    { oldId: 1, newId: 1 },
    { oldId: 3, newId: 2 },
    { oldId: 4, newId: 3 }
  ],
  sulit: [
    { oldId: 6, newId: 1 },
    { oldId: 9, newId: 2 },
    { oldId: 10, newId: 3 }
  ]
};

const processFiles = () => {
    Object.keys(config).forEach(category => {
        const catConfig = config[category];
        catConfig.forEach(item => {
            const filePath = path.join(baseDir, category, `Level${item.newId}.jsx`);
            if (fs.existsSync(filePath)) {
                let content = fs.readFileSync(filePath, 'utf8');

                // 1. Rename Component const LevelX -> const [Category]LevelY
                const compName = category.charAt(0).toUpperCase() + category.slice(1) + 'Level' + item.newId;
                content = content.replace(new RegExp(`const Level${item.oldId} =`, 'g'), `const ${compName} =`);
                
                // 2. Rename Export 
                content = content.replace(new RegExp(`export default Level${item.oldId}`, 'g'), `export default ${compName}`);

                // 3. Rename LocalStorage keys
                content = content.replace(new RegExp(`ctf_level${item.oldId}_`, 'g'), `ctf_${category}_level${item.newId}_`);

                // 4. Rename returnToLevel
                content = content.replace(new RegExp(`returnToLevel: ${item.oldId}`, 'g'), `returnToLevel: '${category}-${item.newId}'`);

                // Write modified content
                fs.writeFileSync(filePath, content);
                console.log(`Updated ${filePath}`);
            } else {
                console.log(`File NOT FOUND: ${filePath}`);
            }
        });
    });
};

processFiles();
