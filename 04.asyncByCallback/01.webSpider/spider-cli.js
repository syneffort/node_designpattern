// const spider = require('./spider-refactor').spider;
//
// spider(process.argv[2], (err, filename, downloaded) => {
//     if (err) {
//         console.error(err);
//     } else if (downloaded) {
//         console.log(`Completed the download of "${filename}"`);
//     } else {
//         console.log(`"${filename}" was already downloaded`);
//     }
// });

const spider = require('./spider_para').spider;

const url = process.argv[2];
const nesting = parseInt(process.argv[3], 10) || 1;

spider(url, nesting, err => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('Download complete');
})