const fs = require('fs');
const dirname = require('path').dirname;
const superagent = require('superagent');
const mkdirp = require('mkdirp');
const { urlToFilename, getPageLinks } = require('./utils');
const promisify = require('util').promisify;

const fsPromises = fs.promises;
const mkdirpPromises = promisify(mkdirp);

function download(url, filename) {
    console.log(`Downloading ${url}`);
    let content;
    return superagent.get(url)
        .then((res) => {
            content = res.text;
            return mkdirpPromises(dirname(filename));
        })
        .then(() => fsPromises.writeFile(filename, content))
        .then(() => {
            console.log(`Downloaded and saved: ${url}`);
            return content;
        });
}

function spiderLinks(currentUrl, content, nesting) {
    let promise = Promise.resolve();
    if (nesting === 0) {
        return promise;
    }

    const links = getPageLinks(currentUrl, content);
    for (const link of links) {
        promise = promise.then(() => spider(link, nesting - 1));
    }

    return promise;
}

function spider(url, nesting) {
    const filename = urlToFilename(url);
    return fsPromises.readFile(filename, 'utf8')
        .catch((err) => {
            if (err.code !== 'ENOENT') {
                throw err;
            }

            return download(url, filename);
        })
        .then(content => spiderLinks(url, content, nesting));
}

module.exports = spider;