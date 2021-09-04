const express = require("express")
const router = express.Router()

const auth = require("../../middleware/auth")

const List = require("../../db/models/list")
const { Item } = require("../../db/models/items")

router.post("/", auth, (req, res) => {
    const itemName = req.body.item;
    const listName = req.body.list
    const item = new Item({
      item: itemName,
      style: "",
      moved: false
    })
    List.findOne({ "user": req.user.id, "name": listName }, (err, foundList) => {
      if (err) console.log(err);
      foundList.items.push(item);
      foundList.save();
      res.send({ list: listName, items: [...foundList.items] })
    })
  })

module.exports = router