class Aircraft {
    constructor(maker, model, year) {
        this.maker = maker;
        this.model = model;
        this.year = year;
    }

    move() {
        console.log(`[aircraft] ${this.model}@${this.year} by ${this.maker} flies to the sky`);
    }
}

module.exports = Aircraft;