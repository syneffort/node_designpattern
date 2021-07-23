//import { readFile } from 'fs';
const fs = require('fs');
const { readFile } = fs;

const cache = new Map();

function inconsistentRead(filename, cb) {
    if (cache.has(filename)) {
        console.log('cached');
        cb(cache.get(filename));
    } else {
        readFile(filename, 'utf8', (err, data) => {
            cache.set(filename, data);
            console.log('readFile');
            cb(data);
        });
    }
}

for (let i = 0; i < 1000; i++) {
    inconsistentRead(`${__dirname}/testfile.txt`, (data) => {
    });
}