class Car {
    constructor(maker, model, year, isForSale = true, isInStock = false) {
        this.maker = maker;
        this.model = model;
        this.year = year;
        this.isForSale = isForSale;
        this.isInStock = isInStock;
    }

    toString() {
        return JSON.stringify(this);
    }
}

module.exports = Car;