const Singleton = require('./singleton/Singleton');
const VehicleFactory = require('./factory/VehicleFactory');
const CarBuilder = require('./builder/CarBuilder');

// singletonDemo();

// factoryDemo();

builderDemo();

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

function builderDemo() {
    const bmw = new CarBuilder('bmw', '320d', 2020).addInStock().build();
    const audi = new CarBuilder('audi', 'a8', 2021).notForSale().build();
    const benz = new CarBuilder('mercedes-benz', 'c-class', 2017).build();

    console.log(bmw.toString());
    console.log(audi.toString());
    console.log(benz.toString());
}



