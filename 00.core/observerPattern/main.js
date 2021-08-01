const FindRegex = require('./FindRegex');

const instanceA = new FindRegex(/hello \w+/g);
instanceA
    .addFile('fileA.txt')
    .addFile('fileB.txt')
    .find() // 동기처리 되기때문에 아래 on 호출 가능!
    .on('found', (file, match) => console.log(`[A] Matched "${match}" in file ${file}`))
    .on('error', err => console.error(`[A] Error emitted ${err}`));

// ❗️심지어 비동기이기 때문에 instanceA 보다 먼저 처리됨!
const instanceB = new FindRegex(/hello \w+/g);
instanceB
    .addFile('fileA.txt')
    .addFile('fileB.txt')
    .findAsync() // 비동기처리 되기때문에 아래 on 호출 불가능
    .on('found', (file, match) => console.log(`[B] Matched "${match}" in file ${file}`))
    .on('error', err => console.error(`[B] Error emitted ${err}`));

// ✅ EventEmitter는 비동기 이벤트를 다루는데 근거함. 동기적 이벤트에는 EventEmitter가 필요하지 않음을 의미.
const instanceC = new FindRegex(/hello \w+/g);
instanceC
    .addFile('fileA.txt')
    .addFile('fileB.txt')
    .on('found', (file, match) => console.log(`[C] Matched "${match}" in file ${file}`))
    .on('error', err => console.error(`[C] Error emitted ${err}`))
    .findAsync() // 이벤트를 먼저 등록할 경우 호출 가능
    .on('found', (file, match) => console.log(`[C After] Matched "${match}" in file ${file}`));