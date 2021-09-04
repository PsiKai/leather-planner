const express = require("express")
const router = express.Router()

const auth = require("../../middleware/auth")

const List = require("../../db/models/list")
const { Item } = require("../../db/models/items")

router.post("/", auth, (req, res) => {
    const { list, item, oldText } = req.body
    console.log(list, item, oldText);
  
    List.findOneAndUpdate({ "user": req.user.id, "name": list, "items.item": oldText }, { "$set": { "items.$.item": item } }, (err, success) => {
      if (err) {
        console.log((err));
      } else {
        console.log(("items edited"));
        List.findOne({ "user": req.user.id, "name": list }, (err, foundList) => {
          if (err) console.log(err);
          res.send({ list, items: [...foundList.items] })
        })
      }
    })
  
  })

module.exports = router