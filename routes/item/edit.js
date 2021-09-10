const express = require("express")
const router = express.Router()
const ObjectId = require("bson-objectid")

const auth = require("../../middleware/auth")

const List = require("../../db/models/list")

router.post("/", auth, (req, res) => {
    const { list, item, id } = req.body
  
    List.findOneAndUpdate(
        { "user": req.user.id, "name": list, "items._id": ObjectId(id) }, 
        { "$set": { "items.$.item": item } },
        { new: true },
        (err, newList) => {
            if (err) {
                console.log((err));
                res.status(500).json({msg: "Error updating list item"})
            } else {
                console.log(("Item edited"));
                // List.findOne({ "user": req.user.id, "name": list }, (err, foundList) => {
                //     if (err) console.log(err);
                //     res.status(200).send({ list, items: [...foundList.items] })
                // })
                res.status(200).send({ newList })
            }
        }
    )  
})

module.exports = router
