const readFile = require('fs').readFile;

function readJSON(filename, callback) {
    readFile(filename, 'utf8', (err, data) => {
        let parsed;
        if (err) {
            return callback(err);
        }

        try {
            parsed = JSON.parse(data);
        } catch (err) {
            return callback(err);
        }

        callback(null, parsed);
    });
}

readJSON(`${__dirname}/file.json`, (err, data) => {
    if (err) {
        console.error('err', err);
    }

    console.log('data', data);
})