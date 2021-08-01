const fs = require('fs');
const path = require('path');
const superagent = require('superagent');
const mkdirp = require('mkdirp');
const urlToFilename = require('./utils').urlToFilename;

function spider(url, cb) {
    const filename = urlToFilename(url);
    fs.access(filename, err => {
        if (!err || err.code !== 'ENOENT') {
            return cb(null, filename, false);
        }

        download(url, filename, err => {
            if (err) {
                return cb(err);
            }
            cb(null, filename, true);
        })
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

module.exports = { spider, saveFile, download };