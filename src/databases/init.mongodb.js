const mongoose = require("mongoose");
const { countConnect } = require('../helpers/check.connect')
const { db: { host, name, port } } = require('../configs/config.mongodb')
var connectString = `mongodb://${host}:${port}/${name}`;

class Database {
    constructor() {
        this.connect();
    }
    async connect() {
        if (1 === 1) {
            mongoose.set("debug", true);
            mongoose.set("debug", { color: true });
        }
        try {
            await mongoose.connect(connectString);
            console.log(`Connected to MongoDB Success`, countConnect());
        } catch (err) {
            console.log(`Error: ${err}`);
        }
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}
const instanceMongoDB = Database.getInstance();
module.exports = instanceMongoDB;