class Motor {
    constructor(maker, model, year) {
        this.maker = maker;
        this.model = model;
        this.year = year;
    }

    move() {
        console.log(`[car] ${this.model}@${this.year} by ${this.maker} moves on the road.`);
    }
}

module.exports = Motor;