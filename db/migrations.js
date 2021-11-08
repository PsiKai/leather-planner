const List = require("./models/list")
const { Item } = require("./models/items")
const ObjectId = require("bson-objectid")


// Update Schema of a single document
// const updateSchema = () => {
//     List.findOneAndUpdate(
//         { "_id": ObjectId("6182aeec65dd1a0018fb32dd"), "items.$.notes": { "$exists": false } }, 
//         { "$set": { "items.$[].notes": new Array() } },
//         { new: true },
//         (err, newList) => {
//             if (err) {
//                 console.log(err);
//             }
//             console.log(newList);
//         }
//     )
// }


// Update List Schema of a User
// const updateSchema = () => {
//     List.updateMany(
//         { "user": ObjectId("611083d8baed4458d8dcd273"), "items.$.notes": { "$exists": false } }, 
//         { "$set": { "items.$[].notes": new Array() } },
//         (err) => {
//             if (err) {
//                 console.log(err);
//             }
//         }
//     )
// }

// Update Entire List Schema
const updateSchema = () => {
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


module.exports = updateSchema