class Train {
    constructor(maker, model, year) {
        this.maker = maker;
        this.model = model;
        this.year = year;
    }

    move() {
        console.log(`[train] ${this.model}@${this.year} by ${this.maker} moves on the rail`);
    }
}

module.exports = Train;