// const consistentRead = require('./consistentReadSyncApi'); // 동기
const consistentRead = require('./consistentReadDefferedExcute'); // 비동기

consistentRead(`${__dirname}/testfile.txt`, (data) => {
    console.log(data);
});

consistentRead(`${__dirname}/testfile.txt`, (data) => {
    console.log(data);
});

consistentRead(`${__dirname}/testfile.txt`, (data) => {
    console.log(data);
});

consistentRead(`${__dirname}/testfile.txt`, (data) => {
    console.log(data);
});