const inconsistentRead = require('./inconsistentRead.js');

function createFileReader(filename) {
    const listeners = [];
    inconsistentRead(filename, value => {
        listeners.forEach(listener => listener(value));
    });

    return {
        onDataReady: listener => listeners.push(listener)
    }
}

const reader1 = createFileReader(`${__dirname}/testfile.txt`);
// 캐싱 되기 전 비동기적으로 파일 읽기 처리시간 동안 리스너 추가 가능
reader1.onDataReady(data => {
    console.log(`First call data : ${data}`);

    // 이미 캐싱 된 후 동기적으로 동작하기 때문에 리스너를 뒤늦게 추가하면 처리가 불가함
    const reader2 = createFileReader(`${__dirname}/testfile.txt`);
    reader2.onDataReady(data => {
        console.log(`Second call data : ${data}`);
    });
});