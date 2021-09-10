const express = require("express")
const router = express.Router()

const auth = require("../../middleware/auth")

const List = require("../../db/models/list")
const { Item } = require("../../db/models/items")

router.post("/", auth, (req, res) => {
    const { inputText, list } = req.body
    const newItem = new Item({ item: inputText, style: "", moved: false })

    List.findOneAndUpdate(
      { "user": req.user.id, "name": list }, 
      { $push: { "items": newItem}},
      { new: true },
      (err, newList) => {
        if (err) {
            console.log(err);
            res.status(500).json({ msg: "Error adding item to list" })
        }
        res.status(201).send(newList)
    })
})

module.exports = router
