const List = require("../models/list")
const { Item } = require("../models/items")
const ObjectId = require("bson-objectid")

const updateSchema = {

    // Update Schema of a single document
    oneDocument: (id) => {
        List.findOneAndUpdate(
            { "_id": ObjectId(id), "items.$.notes": { "$exists": false } }, 
            { "$set": { "items.$[].notes": new Array() } },
            { new: true },
            (err, newList) => {
                if (err) {
                    console.log(err);
                }
                console.log(newList);
            }
        )
    },              
                    
    // Update List Schema of a User
    oneUser: (id) => {
        List.updateMany(
            { "user": ObjectId(id), "items.$.notes": { "$exists": false } }, 
            { "$set": { "items.$[].notes": new Array() } },
            (err) => {
                if (err) {
                    console.log(err);
                }
            }
        )
    },

    // Update Entire List Schema
    allLists: () => {
        List.updateMany(
            { "items.$.notes": { "$exists": false } }, 
            { "$set": { "items.$[].notes": new Array() } },
            { new: true },
            (err, doc) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Success updating:", doc.name);
                }
            }
        )
    }
}

    
    
module.exports = updateSchema