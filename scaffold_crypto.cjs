const fs = require('fs');
const path = require('path');

const baseSourceDir = path.join(__dirname, 'src/pages/arena/mode-pilihan/web-exploit');
const targetDir = path.join(__dirname, 'src/pages/arena/mode-pilihan/cryptography');

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

const files = [
    { src: 'IndexWebExploit.jsx', tag: 'IndexCryptography.jsx' },
    { src: 'Web.jsx', tag: 'Crypto.jsx' },
    { src: 'Level1.jsx', tag: 'Level1.jsx' },
    { src: 'Level2.jsx', tag: 'Level2.jsx' },
    { src: 'Level3.jsx', tag: 'Level3.jsx' },
    { src: 'Level4.jsx', tag: 'Level4.jsx' },
    { src: 'Level5.jsx', tag: 'Level5.jsx' },
    { src: 'Level6.jsx', tag: 'Level6.jsx' },
    { src: 'Level7.jsx', tag: 'Level7.jsx' },
    { src: 'Level8.jsx', tag: 'Level8.jsx' },
    { src: 'Level9.jsx', tag: 'Level9.jsx' },
    { src: 'Level10.jsx', tag: 'Level10.jsx' }
];

files.forEach(file => {
    const srcPath = path.join(baseSourceDir, file.src);
    const targetPath = path.join(targetDir, file.tag);
    
    let content = fs.readFileSync(srcPath, 'utf-8');
    
    // Globally replace specific theme and naming
    content = content.replace(/cyan/g, 'yellow');
    content = content.replace(/06b6d4/g, 'eab308'); // Hex for yellow-500
    content = content.replace(/web-exploit/g, 'cryptography');
    content = content.replace(/web_exploit/g, 'cryptography');
    content = content.replace(/WebExploit/g, 'Cryptography');
    content = content.replace(/WEB_EXPLOIT/g, 'CRYPTOGRAPHY');
    content = content.replace(/WebLevel/g, 'CryptoLevel');
    
    if (file.src === 'IndexWebExploit.jsx') {
        content = content.replace(/const IndexCryptography =/g, 'const IndexCryptography ='); // rename component
    }
    if (file.src === 'Web.jsx') {
        content = content.replace(/const Web =/g, 'const CryptoHub ='); // rename component base
        content = content.replace(/export default Web;/g, 'export default CryptoHub;');
    }
    
    fs.writeFileSync(targetPath, content);
});

console.log('Files scaffolded successfully');
