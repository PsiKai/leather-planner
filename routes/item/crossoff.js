const express = require("express")
const router = express.Router()
const ObjectId = require('bson-objectid')

const auth = require("../../middleware/auth")

const List = require("../../db/models/list")

router.post("/", auth, (req, res) => {
    const { body: { item: { list, style, id } }, user } = req
    var newStyle = style ? "" : "strikethrough"
  
    List.findOneAndUpdate(
      { "user": user.id, "name": list, "items._id": ObjectId(id) },
      { "$set": { "items.$.style": newStyle } },
      (err, success) => {
        if (err) {
          console.log(err);
        } else { console.log("Item updated"); }
      })
    res.end()
})

module.exports = router
