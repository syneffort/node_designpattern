function makeSampleTask (name) {
    return (cb) => {
        console.log(`${name} started`);
        setTimeout(() => {
            console.log(`${name} completed`);
            cb();
        }, Math.random() * 2000);
    }
}

const tasks = [
    makeSampleTask('Task1'),
    makeSampleTask('Task2'),
    makeSampleTask('Task3'),
    makeSampleTask('Task4'),
    makeSampleTask('Task5'),
    makeSampleTask('Task6'),
];

const concurrency = 2;
let running = 0;
let completed = 0;
let index = 0;

function next() {
    while (running < concurrency && index < tasks.length) {
        const task = tasks[index++];
        task(() => {
            if (++completed === tasks.length) {
                return finish();
            }

            running--;
            next();
        });
        running++;
    }
}

function finish() {
    console.log('All tasks executed');
}

next();