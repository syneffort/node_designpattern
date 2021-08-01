const event = require('events');
const fs = require('fs');

const EventEmitter = event.EventEmitter;
const readFile = fs.readFile;
const readFileSync = fs.readFileSync;

class FindRegex extends EventEmitter {
    constructor(regex) {
        super();
        this.regex = regex;
        this.files = [];
    }

    addFile(file) {
        this.files.push(file);
        return this;
    }

    find() {
        for (const file of this.files) {
            readFile(file, 'utf8', (err, content) => {
                if (err) {
                    return this.emit('error', err);
                }

                this.emit('fileread', file);

                const match = content.match(this.regex);
                if (match) {
                    match.forEach(elem => this.emit('found', file, elem));
                }
            });
        }
        return this;
    }

    findAsync() {
        for (const file of this.files) {
            let content;
            try {
                content = readFileSync(file, 'utf8');
            } catch (err) {
                this.emit('error', err);
            }

            this.emit('fileread', file);

            const match = content.match(this.regex);
            if (match) {
                match.forEach(elem => this.emit('found', file, elem));
            }
        }
        return this;
    }
}

module.exports = FindRegex;