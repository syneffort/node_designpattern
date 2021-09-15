const Car = require('./Car');

class CarBuilder {
    constructor(maker, model, year) {
        this.maker = maker;
        this.model = model;
        this.year = year;
    }

    notForSale() {
        this.isForSale = false;

        return this;
    }

    addInStock() {
        this.isInStock = true;

        return this;
    }

    build() {
        return new Car(this.maker, this.model, this.year, this.isForSale, this.isInStock);
    }
}

module.exports = CarBuilder;