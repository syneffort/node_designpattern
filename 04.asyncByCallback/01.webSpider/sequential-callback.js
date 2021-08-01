function asyncOperation(cb) {
    process.nextTick(cb);
}

function task1(cb) {
    asyncOperation(() => {
        console.log('task1');
        task2(cb);
    });
}

function task2(cb) {
    asyncOperation(() => {
        console.log('task2');
        task3(cb);
    });
}

function task3(cb) {
    asyncOperation(() => {
        console.log('task3');
        cb();
    });
}

task1(() => {
    console.log('taks finished');
})