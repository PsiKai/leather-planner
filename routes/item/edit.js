const express = require("express")
const router = express.Router()
const ObjectId = require("bson-objectid")

const auth = require("../../middleware/auth")

const List = require("../../db/models/list")

router.post("/", auth, (req, res) => {
    const { list, inputText, id } = req.body
  
    List.findOneAndUpdate(
        { "user": req.user.id, "name": list, "items._id": ObjectId(id) }, 
        { "$set": { "items.$.item": inputText } },
        { new: true },
        (err, newList) => {
            if (err) {
                console.log((err));
                res.status(500).json({msg: "Error updating list item"})
            } else {
                console.log(("Item edited"));
                res.status(200).send(newList)
            }
        }
    )  
})

module.exports = router
