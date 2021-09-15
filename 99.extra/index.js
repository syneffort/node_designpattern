const Singleton = require('./singleton/Singleton');
const VehicleFactory = require('./factory/VehicleFactory');
const CarBuilder = require('./builder/CarBuilder');
const SUV = require('./prototype/SUV');

// singletonDemo();

// factoryDemo();

// builderDemo();

// prototypeDemo1();

prototypeDemo2();

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

function prototypeDemo1() {
    const firstSUV = {
        maker: 'Kia',
        model: 'sportage',
        year: 2021,
        mud: () => {
            console.log('now mudded!');
        }
    }
    firstSUV.description = 'kia motors';

    const secondSUV = Object.create(firstSUV);
    // secondSUV.maker = 'Ranualt';
    // secondSUV.model = 'QM6';
    // secondSUV.year = 2019;

    console.log(JSON.stringify(firstSUV, null, 2));
    firstSUV.mud();
    console.log(JSON.stringify(secondSUV, null, 2));
    secondSUV.mud();
}

function prototypeDemo2() {
    let suv1 = SUV('Kia', 'sportage', 2021);
    let suv2 = SUV('Ranualt', 'QM6', 2019);

    suv1.mud();
    suv2.mud();
}


