const express = require("express")
const router = express.Router()

const auth = require("../../middleware/auth")

const List = require("../../db/models/list")

router.post("/", auth, (req, res) => {
    const crossedItem = req.body.item
    const listName = req.body.list
    const style = req.body.style
    var newStyle = style !== "" ? "strikethrough" : ""
  
    List.findOneAndUpdate(
      { "user": req.user.id, "name": listName, "items.item": crossedItem },
      { "$set": { "items.$.style": newStyle } },
      (err, success) => {
        if (err) {
          console.log(err);
        } else { console.log("item updated"); }
      })
    res.end();
  })

  module.exports = router