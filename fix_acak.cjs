const fs = require('fs');
const path = require('path');

const dir = 'd:/Hfidz/Projek portofolio/Websites/New folder/src/pages/arena/mode-acak/levels';

// =====================================================================
// Penjelasan hint per level Mode Acak
// =====================================================================
const hintExplanations = {
  'Level1.jsx': `Coba gunakan payload klasik pada input username: <span className="text-purple-400">\\' OR \\'1\\'=\\'1</span><br class="mb-1"/><span className="text-purple-300 font-black block mt-2">💡 Apa itu SQL Injection?</span><span className="text-gray-400 block mt-1 normal-case not-italic">SQL Injection memungkinkan kamu menyisipkan kode SQL ke dalam input form. Server memasukannya langsung ke query database tanpa filter, sehingga kondisi <span className="text-purple-300 font-mono">OR '1'='1</span> selalu bernilai TRUE dan login bypass berhasil.</span>`,
  'Level2.jsx': `<span className="text-purple-300 font-black block mb-2">💡 Apa itu Base64?</span><span className="text-gray-400 block normal-case not-italic">Base64 BUKAN enkripsi — hanya encoding (format penyandian) yang bisa didecode siapa saja. String yang diakhiri '=' biasanya Base64. Decode string payload yang ada di layar menggunakan <span className="text-purple-300 font-mono">atob()</span> atau situs base64decode.org.</span>`,
  'Level3.jsx': `<span className="text-purple-300 font-black block mb-2">💡 Apa itu Robots.txt?</span><span className="text-gray-400 block normal-case not-italic">File <span className="text-purple-300 font-mono">/robots.txt</span> berisi instruksi untuk mesin pencari tentang halaman mana yang tidak boleh diindeks. Developer sering "menyembunyikan" path sensitif di sana, padahal file ini bisa diakses publik. Coba ketik URL-nya langsung.</span>`,
  'Level4.jsx': `<span className="text-purple-300 font-black block mb-2">💡 Apa itu Path Traversal?</span><span className="text-gray-400 block normal-case not-italic">Server mengambil nama file dari URL parameter, lalu membacanya dari disk. Karakter <span className="text-purple-300 font-mono">../</span> artinya "naik satu direktori". Dengan menumpuknya, kamu bisa keluar dari folder publik dan membaca file sistem. Coba: <span className="text-purple-300 font-mono">../../../../etc/passwd</span></span>`,
  'Level5.jsx': `<span className="text-purple-300 font-black block mb-2">💡 Apa itu Command Injection?</span><span className="text-gray-400 block normal-case not-italic">Server mengoper nilai input langsung ke perintah sistem Linux tanpa validasi. Karakter <span className="text-purple-300 font-mono">;</span> (titik koma) memisahkan dua perintah di Linux, sehingga perintahmu ikut tereksekusi. Coba: <span className="text-purple-300 font-mono">127.0.0.1 ; cat secret.txt</span></span>`,
  'Level6.jsx': `<span className="text-purple-300 font-black block mb-2">💡 Apa itu XSS (Cross-Site Scripting)?</span><span className="text-gray-400 block normal-case not-italic">Server merefleksikan input pengguna kembali ke halaman tanpa sanitasi. Jika input mengandung tag <span className="text-purple-300 font-mono">&lt;script&gt;</span>, browser mengeksekusinya. Coba masukan: <span className="text-purple-300 font-mono">&lt;script&gt;alert(1)&lt;/script&gt;</span></span>`,
  'Level7.jsx': `<span className="text-purple-300 font-black block mb-2">💡 Apa itu IDOR?</span><span className="text-gray-400 block normal-case not-italic">IDOR (Insecure Direct Object Reference) terjadi ketika server menggunakan ID dari URL untuk mengambil data tanpa memeriksa apakah kamu berhak mengaksesnya. Coba ubah ID profil di URL menjadi <span className="text-purple-300 font-mono">1</span> untuk mengakses akun Admin.</span>`,
  'Level8.jsx': `<span className="text-purple-300 font-black block mb-2">💡 Apa itu SSRF?</span><span className="text-gray-400 block normal-case not-italic">SSRF (Server-Side Request Forgery) membuatmu menyuruh server untuk membuat request ke URL atas namamu. Server cloud bisa mengakses endpoint metadata internal yang normal tidak bisa diakses dari luar. Coba URL: <span className="text-purple-300 font-mono">http://169.254.169.254/latest/meta-data/</span></span>`,
  'Level9.jsx': `<span className="text-purple-300 font-black block mb-2">💡 Apa itu XXE?</span><span className="text-gray-400 block normal-case not-italic">XXE (XML External Entity) memungkinkan kamu mendefinisikan entitas yang menunjuk ke file di server menggunakan tag <span className="text-purple-300 font-mono">&lt;!ENTITY&gt;</span>. Parser XML membaca dan mengembalikan isi file tersebut. Gunakan payload DOCTYPE dengan SYSTEM "file:///etc/passwd".</span>`,
  'Level10.jsx': `<span className="text-purple-300 font-black block mb-2">💡 Apa itu JWT Forgery?</span><span className="text-gray-400 block normal-case not-italic">JWT terdiri dari Header.Payload.Signature (Base64). Server ini menerima algoritma <span className="text-purple-300 font-mono">alg: none</span> — artinya signature tidak diverifikasi. Ubah Header ke alg:none, ubah role ke 'root' di Payload, hapus signature-nya, kirim token baru.</span>`,
};

// =====================================================================
// Pola hint lama yang akan dicari dan diganti di setiap file
// =====================================================================
const oldHintPatterns = [
  // Level 1
  /Coba gunakan payload klasik pada input username:[^<]*<span className="text-purple-400">[^<]*<\/span>[^<]*atau periksa source code[^<]*/,
  // Generic: any text inside the hint motion.div
];

function updateFile(filename) {
  const fp = path.join(dir, filename);
  let content = fs.readFileSync(fp, 'utf-8');
  const newHint = hintExplanations[filename];
  if (!newHint) {
    console.log(`  No hint defined for ${filename}, skipping hint update.`);
  }

  // ==========================================
  // 1. FIX TIMER: countdown -> count-up
  // ==========================================

  // Get the level key (e.g. 'level1', 'level2' etc.) from filename
  const levelNum = filename.replace('Level', '').replace('.jsx', '').toLowerCase();
  const levelKey = `ctf_level${levelNum}`;

  // Replace: const [timeLeft, setTimeLeft] = useState(() => { ... return saved ? parseInt(saved) : NNN; });
  // With: const [elapsed, setElapsed] = useState(0);
  content = content.replace(
    /\/\/ Timer Persistence Logic\r?\n\s*const \[timeLeft, setTimeLeft\] = useState\(\(\) => \{[\s\S]*?return saved \? parseInt\(saved\) : \d+;\s*\}\);\r?\n/,
    `// Timer: Count-up\n  const [elapsed, setElapsed] = useState(0);\n`
  );

  // Remove hasOvertimePenalty state (no longer needed with count-up)
  content = content.replace(
    /\s*const \[hasOvertimePenalty, setHasOvertimePenalty\] = useState\(\(\) => \{[\s\S]*?'true';\s*\}\);\r?\n/,
    '\n'
  );

  // Replace the timer useEffect (countdown) with a count-up timer
  // Pattern: useEffect that contains setTimeLeft(prev => { ... nextValue - 1 ... })
  content = content.replace(
    /useEffect\(\(\) => \{[\s\S]*?if \(status !== 'complete'\) \{[\s\S]*?setTimeLeft\(prev => \{[\s\S]*?return nextValue;\s*\}\);\s*\}, 1000\);\s*return \(\) => clearInterval\(timer\);\s*\}\s*\},\s*\[status,[^\]]*\]\);/,
    `useEffect(() => {
    if (status !== 'complete') {
      const timer = setInterval(() => {
        setElapsed(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status]);`
  );

  // Replace formatTime to remove negative handling (not needed for count-up)
  content = content.replace(
    /const formatTime = \(seconds\) => \{[\s\S]*?return `\$\{isNegative \? '-' : ''\}[\s\S]*?\};\r?\n/,
    `const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return \`\${mins.toString().padStart(2, '0')}:\${secs.toString().padStart(2, '0')}\`;
  };\n`
  );

  // Replace completionTime calculation: was "const timeTaken = NNN - timeLeft;"
  // Now: just use elapsed directly
  content = content.replace(
    /const timeTaken = \d+ - timeLeft;\s*\r?\n\s*const timeTakenStr = formatTime\(timeTaken\);/g,
    `const timeTakenStr = formatTime(elapsed);`
  );

  // Replace bestTime storage that used timeTakenStr
  // bestTime: timeTakenStr is still fine

  // Replace {formatTime(timeLeft)} -> {formatTime(elapsed)} in JSX
  content = content.replace(/formatTime\(timeLeft\)/g, 'formatTime(elapsed)');

  // Replace timer color logic that checks timeLeft < 60 or timeLeft < 0
  // Old: ${timeLeft < 0 ? 'text-red-500' : timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-red-600'}
  // New: just cyan since it's always count-up
  content = content.replace(
    /\$\{timeLeft < 0 \? 'text-red-500' : timeLeft < 60 \? 'text-red-500 animate-pulse' : 'text-red-600'\}/,
    `text-cyan-500`
  );

  // Replace REMAINING_TIME label -> ELAPSED_TIME
  content = content.replace(/REMAINING_TIME/g, 'ELAPSED_TIME');

  // Replace text-red-500/80 on the timer label -> text-cyan-500/30
  content = content.replace(
    /className="text-\[10px\] font-black text-red-500\/80 tracking-\[0.3em\] uppercase mb-1"/,
    `className="text-[10px] font-black text-cyan-500/30 tracking-[0.3em] uppercase mb-1"`
  );

  // Remove localStorage references for timeLeft and overtime (no longer needed)
  content = content.replace(/localStorage\.setItem\(`ctf_level\d+_time`[^;]+;\r?\n/g, '');
  content = content.replace(/localStorage\.setItem\(`ctf_level\d+_overtime`[^;]+;\r?\n/g, '');
  content = content.replace(/localStorage\.removeItem\(`ctf_level\d+_time`\);\r?\n/g, '');
  content = content.replace(/localStorage\.removeItem\(`ctf_level\d+_overtime`\);\r?\n/g, '');
  content = content.replace(/localStorage\.getItem\(`ctf_level\d+_time`\)/g, 'null');

  // Also fix setHasOvertimePenalty references
  content = content.replace(/setHasOvertimePenalty\([^)]*\);\r?\n/g, '');
  content = content.replace(/hasOvertimePenalty/g, 'false');

  // ==========================================
  // 2. UPDATE HINT CONTENT
  // ==========================================
  if (newHint) {
    // Find and replace hint content in the AnimatePresence + motion.div
    // The pattern for the hint display varies by file - let's find the text node inside hint motion.div
    // We'll target common patterns
    content = content.replace(
      /(<motion\.div[^>]*className="bg-gray-900\/50 border border-white\/5 rounded-xl p-4 text-\[10px\] text-gray-500 italic uppercase leading-tight">[\r\n\s]*)([^<]+(?:<span[^>]*>[^<]*<\/span>[^<]*)*)(\s*<\/motion\.div>)/,
      `$1<span dangerouslySetInnerHTML={{ __html: \`${newHint.replace(/`/g, '\\`')}\` }} />$3`
    );
  }

  fs.writeFileSync(fp, content, 'utf-8');
  console.log(`✓ Updated ${filename}`);
}

// Process all 10 levels
const files = ['Level1.jsx','Level2.jsx','Level3.jsx','Level4.jsx','Level5.jsx','Level6.jsx','Level7.jsx','Level8.jsx','Level9.jsx','Level10.jsx'];
for (const f of files) {
  try {
    updateFile(f);
  } catch (err) {
    console.error(`✗ Error on ${f}:`, err.message);
  }
}
console.log('\nDone!');
