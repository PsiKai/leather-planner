const express = require("express")
const router = express.Router()

const auth = require("../../middleware/auth")

const List = require("../../db/models/list")

router.delete("/", auth, async (req, res) => {
    const { list, item } = req.body
    await List.updateOne(
      { "user": req.user.id, "name": list },
      { "$pull": { "items": { "item": item } } },
      (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ msg: "There was a error deleting this item" })
        } else {
          res.status(200).json({ msg: `Deleted: "${item}"` })
        }
      })
  })

module.exports = router