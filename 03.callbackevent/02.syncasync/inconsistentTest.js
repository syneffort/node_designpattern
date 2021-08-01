const inconsistentRead = require('./inconsistentRead.js');

inconsistentRead(`${__dirname}/testfile.txt`, (data) => {
    console.log(data);
});

inconsistentRead(`${__dirname}/testfile.txt`, (data) => {
    console.log(data);
});

setTimeout(() => {
    inconsistentRead(`${__dirname}/testfile.txt`, (data) => {
        console.log(data);
    });
}, 1000);