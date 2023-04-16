const Collection = require("./Collection");
const fs = require("fs");
let root = process.cwd()+"\\";

class Database {
    #collections
    constructor(name="defaultdb") {
        this.name = name;
        this.#collections = [];
        this.dbFile = root+name.trim().replace(" ", "_")+".json";
    }

    #DbExists(file, override=true) {
        let exists = fs.existsSync(file);
        if(!exists && override) {
            fs.writeFileSync(file, "{}");
        }
        return exists;
    }

    CreateCollection(name="defaultcollection") {
        try {
            this.#DbExists(this.dbFile);
            let db = require(this.dbFile);
            let collection = new Collection(name, this.dbFile);
            this.#collections.push(collection);
            if(!db[name]) db[name] = [];
            fs.writeFileSync(this.dbFile, JSON.stringify(db));
            return collection;
        } catch(err) {
            return null;
        }
    }

    GetCollection(name) {
        try {
            this.#DbExists(this.dbFile);
            let db = require(this.dbFile);
            if(!db[name]) return;
            let collection = new Collection(name, this.dbFile);
            return collection;
        } catch(err) {
            return null;
        }
    }

    DeleteCollection(collection) {
        try {
            this.#DbExists(this.dbFile);
            let db = require(this.dbFile);
            let index = this.#collections.indexOf(collection);
            if(index != -1) {
                this.#collections.splice(index, 1);
                collection.destroyed = true;
                delete db[collection.name || collection];
                fs.writeFileSync(this.dbFile, JSON.stringify(db));
                return db;
            } else return null;
        } catch(err) {
            return null;
        }
    }

    DeleteDatabaseFromProject() {
        try {
            let exists = this.#DbExists(this.dbFile, false);
            if(exists) {
                fs.unlinkSync(this.dbFile);
                return true;
            }
        } catch(err) {
            return null;
        }
    }

    ClearDatabase() {
        try {
            this.#collections.map(collection => this.DeleteCollection(collection));
            this.#collections = [];
            fs.writeFileSync(this.dbFile, "{}");
            return true;
        } catch(err){
            return false;
        }
    }
}

module.exports = Database;