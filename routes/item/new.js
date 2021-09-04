const express = require("express")
const router = express.Router()

const auth = require("../../middleware/auth")

const List = require("../../db/models/list")
const { Item } = require("../../db/models/items")

router.post("/", auth, (req, res) => {
    const { item, list } = req.body
    const newItem = new Item({ item, style: "", moved: false })

    List.findOne({ "user": req.user.id, "name": list }, (err, foundList) => {
      if (err) {
          console.log(err);
          res.status(500).json({ msg: "Error adding item to list" })
      }
      foundList.items.push(newItem);
      foundList.save();
      res.status(201).send({ list, items: [...foundList.items] })
    })
})

module.exports = router
