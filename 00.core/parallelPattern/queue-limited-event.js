const TaskQueue = require('./TaskEventQueue');

function makeSampleTask(name) {
    return (cb) => {
        console.log(`${name} started`);
        setTimeout(() => {
            console.log(`${name} completed`);
            cb();
        }, Math.random() * 2000);
    };
}

const queue = new TaskQueue(2);
queue.on('error', console.error);
queue.on('empty', () => console.log('Queue drained'));

function task1 (cb) {
    console.log('Task1 started');
    queue
        .pushTask(makeSampleTask('task1 -> subtask 1'))
        .pushTask(makeSampleTask('task1 -> subtask 2'));
    setTimeout(() => {
        console.log('Task1 completed');
        cb();
    }, Math.random() * 2000);
}

function task2 (cb) {
    console.log('Task2 started');
    queue
        .pushTask(makeSampleTask('task2 -> subtask 1'))
        .pushTask(makeSampleTask('task2 -> subtask 2'));
    setTimeout(() => {
        console.log('Task2 completed');
        cb();
    }, Math.random() * 2000);
}

queue
    .pushTask(task1)
    .pushTask(task2);