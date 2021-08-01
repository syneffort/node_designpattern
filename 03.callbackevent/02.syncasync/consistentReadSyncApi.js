const fs = require('fs');
const { readFileSync } = fs;

const cache = new Map();

// 항상 동기적으로 작동
module.exports = function inconsistentRead(filename, cb) {
    if (cache.has(filename)) {
        // 동기적 호출
        cb('[cached] ' + cache.get(filename));
    } else {
        // 동기 처리
        const data = readFileSync(filename, 'utf8');
        cache.set(filename, data);
        cb('[readFile] ' + data);
    }
}