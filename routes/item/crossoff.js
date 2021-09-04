const express = require("express")
const router = express.Router()

const auth = require("../../middleware/auth")

const List = require("../../db/models/list")

router.post("/", auth, (req, res) => {
    const { body: { item, list, style }, user } = req
    var newStyle = style !== "" ? "strikethrough" : ""
  
    List.findOneAndUpdate(
      { "user": user.id, "name": list, "items.item": item },
      { "$set": { "items.$.style": newStyle } },
      (err, success) => {
        if (err) {
          console.log(err);
        } else { console.log("item updated"); }
      })
    res.end();
})

module.exports = router
