const Singleton = require('./singleton/Singleton');
const VehicleFactory = require('./factory/VehicleFactory');

// singletonDemo();

factoryDemo();

function singletonDemo() {
    let singletonObj = Singleton.getInstance();
    console.log(singletonObj.databaseConnection);
    singletonObj.databaseConnection = 'testConn1234';
    console.log(singletonObj.databaseConnection);
    let newObj = Singleton.getInstance();
    console.log(newObj.databaseConnection);

    console.log(newObj._databaseConnection);
}

function factoryDemo() {
    let obj1 = VehicleFactory('AirCraft', 'boeing', 'A380', 2021);
    obj1.move();

    let obj2 = VehicleFactory('Car', 'Renualt', 'SM6', 2019);
    obj2.move();
}



