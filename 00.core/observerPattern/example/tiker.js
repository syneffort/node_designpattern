const event = require('events');

const EventEmitter = event.EventEmitter;

function tiker (number, callback) {
    const emitter = new EventEmitter();

    let count = 1;
    emitter.emit('tick');

    recursiveTimout(50, () => {
        if (Date.now() % 5 === 0) {
            emitter.emit('error');
        }

        count++;
        emitter.emit('tick');
    });

    recursiveTimout(number, () => {
        callback(null, count);
    });



    return emitter;

    function recursiveTimout (interval, callback) {
        setTimeout(() => {
            callback();
            recursiveTimout(interval, callback);
        }, interval);
    }
}

tiker(1000, (err, count) => { console.log(`${count} count was ticked`) })
    .on('tick', () => console.log('ticked'))
    .on('error', () => console.error('datetime is divided by 5!'));

