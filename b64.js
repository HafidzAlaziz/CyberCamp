const fs = require('fs');
const flags = ['CTF{XX3_3NT1TY_1NJ3CT10N}', 'CTF{JWT_N0N3_4LG_F0RG3RY}'];
const out = flags.map(f => Buffer.from(f).toString('base64')).join('\n');
fs.writeFileSync('b64.txt', out);
console.log("DONE");
