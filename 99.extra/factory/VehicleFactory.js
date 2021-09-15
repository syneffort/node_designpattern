const Motor = require('./Motor');
const Aircraft = require('./Aircraft');
const Train = require('./Train');

const VehicleFactory = (type, maker, model, year) => {
    let vehicle;

    type = type.toLowerCase();
    switch (type) {
        case "car":
            vehicle = new Motor(maker, model, year);
            break;
        case "aircraft":
            vehicle = new Aircraft(maker, model, year);
            break;
        case "train":
            vehicle = new Train(maker, model, year);
            break;
        default:
            break;
    }

    return vehicle;
}

module.exports = VehicleFactory;