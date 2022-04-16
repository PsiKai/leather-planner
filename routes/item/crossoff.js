const express = require("express")
const router = express.Router()
const ObjectId = require("bson-objectid")

const auth = require("../../middleware/auth")

const List = require("../../db/models/list")

router.post("/", auth, async (req, res) => {
  const {
    body: {
      item: { list, style, id },
    },
    user,
  } = req
  var newStyle = style ? "" : "strikethrough"

  try {
    const newList = await List.findOneAndUpdate(
      { user: user.id, name: list, "items._id": ObjectId(id) },
      { $set: { "items.$.style": newStyle } },
      { new: true }
    )
    res.send(newList)
  } catch (error) {
    console.error(error)
    res.json({ msg: "Something went wrong updating list item" })
  }
})

module.exports = router
