function makeSampleTask(name) {
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

let completed = 0;
tasks.forEach(task => {
    task(() => {
        if (++completed === tasks.length) {
            finish();
        }
    });
});

function finish() {
    console.log(`All tasks executed!`);
}