const fs = require("fs");
const Utils = require("./Utils");

class Collection {
    constructor(name, db) {
        this.name = name;
        this.dbFile = db;
        this.destroyed = false;
    }

    CreateData(data={}) {
        if(this.destroyed) return;
        if(typeof data != "object") throw new TypeError("[Magmadb.CollectionError] CreateData(data) -> data must be a json object '{}'");
        try {
            let db = require(this.dbFile);
            if(!db[this.name].includes(data)) {
                data.__magmaID = Utils.GenerateID(32);
                db[this.name].push(data);
                fs.writeFileSync(this.dbFile, JSON.stringify(db));
            }
            return db[this.name];
        } catch(err) {
            return null;
        }
    }

    UpdateData(data, newData={}) {
        if(this.destroyed) return;
        if(typeof data != "object") throw new TypeError("[Magmadb.CollectionError] CreateData(data) -> data must be a json object '{}'");
        try {
            let db = require(this.dbFile);
            let index = db[this.name].indexOf(data);
            if(index != -1) {
                for(var [k,v] of Object.entries(newData)) {
                    db[this.name][index][k] = v;
                }   
                fs.writeFileSync(this.dbFile, JSON.stringify(db));
                return db[this.name][index];
            }
            return null;
        } catch(err) {
            return null;
        }
    }

    DeleteData(data) {
        if(this.destroyed) return;
        try {
            let db = require(this.dbFile);
            let index = db[this.name].indexOf(data);
            if(index != -1) {
                db[this.name].splice(index, 1);
                fs.writeFileSync(this.dbFile, JSON.stringify(db));
            }
            return db[this.name];
        } catch(err) {
            return null;
        }
    }

    GetData(params) {
        if(this.destroyed) return;
        try {
            let data = this.Find(params);
            return data?.[0];
        } catch(err) {
            return null;
        }
    }

    GetAllData() {
        if(this.destroyed) return;
        try {
            let db = require(this.dbFile);
            return db?.[this.name];
        } catch(err) {
            return null;
        }
    }

    Find(params={}) {
        if(this.destroyed) return;
        try {
            if(typeof params != "object") return null;
            let results = [];
            let db = require(this.dbFile);
            let col = db[this.name];
            for(var doc of col) {
                let push = true;
                for(var k of Object.keys(params)) {
                    if(doc[k] != params[k]) {
                        push = false;
                        break;
                    }
                }
                if(!results.includes(doc) && push) results.push(doc);
            }
            return results;
        } catch(err) {
            return null;
        }
    }
}

module.exports = Collection;