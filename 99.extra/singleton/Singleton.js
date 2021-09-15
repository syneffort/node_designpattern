class Singleton {
    static #_instance = new Singleton();
    #_databaseConnection;

    static getInstance() {
        if (!this.#_instance) {
            this.#_instance = new Singleton();
        }

        return this.#_instance;
    }

    get databaseConnection() {
        return this.#_databaseConnection;
    }

    set databaseConnection(value) {
        this.#_databaseConnection = value;
    }
}

module.exports = Singleton;