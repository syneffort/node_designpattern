const fs = require('fs');
const path = require('path');
const superagent = require('superagent');
const mkdirp = require('mkdirp');
const { urlToFilename, getPageLinks } = require('./utils');

function spider(url, nesting, cb) {
    const filename = urlToFilename(url);
    fs.readFile(filename, 'utf8', (err, fileContent) => {
        if (err) {
            if (err.code !== 'ENOENT') {
                return cb(err);
            }

            return download(url, filename, (err, requestContent) => {
                if (err) {
                    return cb(err);
                }

                spiderLink(url, requestContent, nesting, cb);
            });
        }

        spiderLink(url, fileContent, nesting, cb);
    });
}

function saveFile(filename, contents, cb) {
    mkdirp(path.dirname(filename), err => {
        if (err) {
            return cb(err);
        }
        fs.writeFile(filename, contents, cb);
    });
}

function download(url, filename, cb) {
    console.log(`download "${url}"`);
    superagent.get(url).end((err, res) => {
        if (err) {
            return cb(err);
        }

        saveFile(filename, res.text, err => {
            if (err) {
                return cb(err);
            }

            console.log(`Download and saved: "${url}"`);
            cb(null, res.text);
        });
    });
}

function spiderLink(currentUrl, body, nesting, cb) {
    if (nesting <= 0) {
        return process.nextTick(cb);
    }

    const links = getPageLinks(currentUrl, body);
    if (links.length === 0) {
        return process.nextTick(cb);
    }

    function iterate(index) {
        if (index === links.length) {
            return cb();
        }

        spider(links[index], nesting - 1, (err) => {
            if (err) {
                return cb(err);
            }

            iterate(index + 1);
        })
    }

    iterate(0);
}

module.exports = { spider, saveFile, download, spiderLink };