const express = require("express")
const router = express.Router()

const auth = require("../../middleware/auth")

const List = require("../../db/models/list")

router.get("/:listName", auth, (req, res) => {
    const newDay = req.params.listName;
    List.findOne({ user: req.user.id, name: newDay }, (err, foundList) => {
      if (!err) {
        if (!foundList) {
          const list = new List({
            user: req.user.id,
            name: newDay,
            items: []
          });
          list.save();
  
          res.send({ list: newDay, items: [], date: newDay, status: "no list found, created" })
        } else {
          console.log(foundList);
          res.send({ list: newDay, items: foundList.items, status: "found a list" })
        }
      }
    })
  })

module.exports = router