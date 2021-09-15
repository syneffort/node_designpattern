function SUV(maker, model, year) {
    function constructor(maker, model, year) {
        this.maker = maker;
        this.model = model;
        this.year = year;
    }

    constructor.prototype = suvPrototype;

    let instance = new constructor(maker, model, year);
    return instance;
}

const suvPrototype = {
    mud: () => {
        console.log('now mudded!');
    }
}

module.exports = SUV;