const express = require("express")
const router = express.Router()

const auth = require("../../middleware/auth")

const List = require("../../db/models/list")

router.post("/", auth, (req, res) => {
    const { list, item, oldText } = req.body
  
    List.findOneAndUpdate(
        { "user": req.user.id, "name": list, "items.item": oldText }, 
        { "$set": { "items.$.item": item } },
        (err) => {
            if (err) {
                console.log((err));
                res.status(500).json({msg: "Error updating list item"})
            } else {
                console.log(("Item edited"));
                List.findOne({ "user": req.user.id, "name": list }, (err, foundList) => {
                    if (err) console.log(err);
                    res.status(200).send({ list, items: [...foundList.items] })
                })
            }
        }
    )  
})

module.exports = router
