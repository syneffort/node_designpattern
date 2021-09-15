singletonDemo();


function singletonDemo() {
    const Singleton = require('./singleton/Singleton');

    let singletonObj = Singleton.getInstance();
    console.log(singletonObj.databaseConnection);
    singletonObj.databaseConnection = 'testConn1234';
    console.log(singletonObj.databaseConnection);
    let newObj = Singleton.getInstance();
    console.log(newObj.databaseConnection);

    console.log(newObj._databaseConnection);
}

function factoryDemo() {

}



