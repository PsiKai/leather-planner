const express = require("express")
const router = express.Router()
const ObjectId = require("bson-objectid")

const auth = require("../../middleware/auth")

const List = require("../../db/models/list")

router.delete("/", auth, async (req, res) => {
    const { list, id, content } = req.body
    await List.updateOne(
      { "user": req.user.id, "name": list },
      { "$pull": { "items": { "_id": ObjectId(id) } } },
      (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ msg: "There was an error deleting this item" })
        } else {
          res.status(200).json({ msg: `Deleted: "${content}"` })
        }
      }
    )
})

module.exports = router
