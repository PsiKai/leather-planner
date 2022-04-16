const express = require("express")
const router = express.Router()
const ObjectId = require("bson-objectid")

const auth = require("../../middleware/auth")

const List = require("../../db/models/list")

router.delete("/", auth, async (req, res) => {
  const { list, id, content } = req.body
  try {
    const newList = await List.findOneAndUpdate(
      { user: req.user.id, name: list },
      { $pull: { items: { _id: ObjectId(id) } } },
      { new: true }
    )
    console.log(newList)
    res.status(200).json({ msg: `Deleted: "${content}"`, newList })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: "There was an error deleting this item" })
  }
})

module.exports = router
