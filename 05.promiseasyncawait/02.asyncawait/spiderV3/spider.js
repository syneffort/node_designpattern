const fsPromise = require('fs').promises;
const dirname = require('path').dirname;
const superagent = require('superagent');
const mkdirp = require('mkdirp');
const { urlToFilename, getPageLinks } = require('./utils');
const promisify = require('util').promisify;

const mkdirpPromises = promisify(mkdirp);

async function download(url, filename) {
    console.log(`Downloading ${url}`);
    const { text: content } = await superagent.get(url);
    await mkdirpPromises(dirname(filename));
    await fsPromise.writeFile(filename, content);
    console.log(`Download and saved: ${url}`);
    return content;
}

async function spiderLinks(currentUrl, content, nesting) {
    if (nesting === 0) {
        return;
    }

    const links = getPageLinks(currentUrl, content);
    for (const link of links) {
        await spider(link, nesting - 1);
    }
}

async function spider(url, nesting) {
    const filename = urlToFilename(url);
    let content;
    try {
        content = await fsPromise.readFile(filename, 'utf8');
    } catch(err) {
        if (err.code !== 'ENOENT') {
            throw err;
        }

        content = await download(url, filename);
    }

    return spiderLinks(url, content, nesting);
}

module.exports = spider;