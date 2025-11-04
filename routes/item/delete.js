const express = require("express")
const router = express.Router()
const ObjectId = require("mongoose").Types.ObjectId

const auth = require("../../middleware/auth")

const List = require("../../db/models/list")

router.delete("/", auth, async (req, res) => {
  const { list, id, item } = req.body
  try {
    const newList = await List.findOneAndUpdate(
      { user: req.user.id, name: list },
      { $pull: { items: { _id: new ObjectId(id) } } },
      { new: true },
    )
    res.status(200).json({ msg: `Deleted: "${item}"`, newList })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: "There was an error deleting this item" })
  }
})

module.exports = router
