const express = require("express")
const router = express.Router()
const ObjectId = require("mongoose").Types.ObjectId

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
  console.log("Updating item style:", { list, id, newStyle })

  try {
    const newList = await List.findOneAndUpdate(
      { user: user.id, name: list, "items._id": new ObjectId(id) },
      { $set: { "items.$.style": newStyle } },
      { new: true },
    )
    res.status(200).send(newList)
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: "Something went wrong updating list item" })
  }
})

module.exports = router
