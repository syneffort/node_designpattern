const fs = require('fs');
const { readFile } = fs;

const cache = new Map();

// 항상 비동기적으로 작동
module.exports = function inconsistentRead(filename, cb) {
    if (cache.has(filename)) {
        // 지연된 콜백 호출 (비동기)
        process.nextTick(() => cb('[cached] ' + cache.get(filename)));
    } else {
        // 비동기 함수
        readFile(filename, 'utf8', (err, data) => {
            cache.set(filename, data);
            cb('[readFile] ' + data);
        });
    }
}