const path = require('path');
const URL = require('url').URL;
const slug = require('slug');
const cheerio = require('cheerio');

function urlToFilename(url) {
    const parsedUrl = new URL(url);
    const urlPath = parsedUrl.pathname.split('/')
        .filter((component) => {
            return component !== '';
        })
        .map((component) => {
            return slug(component, { remove: null });
        })
        .join('/');

    let filename = path.join(parsedUrl.hostname, urlPath);
    if (!path.extname(filename).match(/htm/)) {
        filename += '.html';
    }

    return filename;
}

function getLinkUrl(currentUrl, element) {
    const parsedLink = new URL(element.attribs.href || '', currentUrl);
    const currentParsedUrl = new URL(currentUrl);
    if (parsedLink.hostname !== currentParsedUrl.hostname || !parsedLink.pathname) {
        return null;
    }

    return parsedLink.toString();
}

function getPageLinks(currentUrl, body) {
    return Array.from(cheerio.load(body)('a'))
        .map((element) => {
            return getLinkUrl(currentUrl, element);
        })
        .filter(Boolean);
}

module.exports = { urlToFilename, getLinkUrl, getPageLinks };