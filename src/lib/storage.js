// @ts-check

const fs = require("fs");

class Storage {
    constructor(filepath) {
        this.filepath = filepath;
        /** @type {Store} */
        this.store = fs.existsSync(filepath)
            ? JSON.parse(fs.readFileSync(filepath, { encoding: "utf-8" }))
            : {
                  filaments: [],
                  brands: [],
                  types: ["PLA", "SILK", "PETG", "PETG-CF", "TPU", "PLA-MATTE", "PLA-DOUBLECOLOR"],
                  lastIndex: 0,
              };
    }

    save() {
        fs.writeFileSync(this.filepath, JSON.stringify(this.store, null, 4));
    }

    addFilament(filament) {
        const index = ++this.store.lastIndex;
        this.store.filaments[index] = filament;

        this.save();
    }

    updateFilament(id, filament) {
        this.store.filaments[id] = filament;

        this.save();
    }

    deleteFilament(id) {
        delete this.store.filaments[id];

        this.save();
    }

    addType(type) {
        this.store.types[type] = type;

        this.save();
    }

    deleteType(type) {
        delete this.store.types[type];

        this.save();
    }

    addBrand(brand) {
        this.store.brands[brand] = brand;

        this.save();
    }

    deletebrand(brand) {
        delete this.store.brands[brand];

        this.save();
    }

    get() {
        return this.store;
    }
}

const storage = new Storage("./data.json");

module.exports = storage;
