const fs = require('fs');
const { readFile } = fs;

const cache = new Map();

module.exports = function inconsistentRead(filename, cb) {
    if (cache.has(filename)) {
        // 동기적 호출
        cb('[cached] ' + cache.get(filename));
    } else {
        // 비동기 함수
        readFile(filename, 'utf8', (err, data) => {
            cache.set(filename, data);
            cb('[readFile] ' + data);
        });
    }
}