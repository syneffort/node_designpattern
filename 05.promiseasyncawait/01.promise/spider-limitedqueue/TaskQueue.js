const events = require('events');

const EventEmitter = events.EventEmitter;

module.exports = class TaskEventQueue extends EventEmitter {
    constructor(concurrency) {
        super();
        this.concurrency = concurrency;
        this.running = 0;
        this.queue = [];
    }

    runTask(task) {
        return new Promise((resolve, reject) => {
            this.queue.push(() => {
                return task().then(resolve, reject);
            });

            process.nextTick(this.next.bind(this));
        })
    }

    next() {
        if (this.running === 0 && this.queue.length === 0) {
            return this.emit('empty');
        }

        while (this.running < this.concurrency && this.queue.length) {
            const task = this.queue.shift();
            task()
                .finally(() => {
                    this.running--;
                    this.next();
                });

            this.running++;
        }
    }
}