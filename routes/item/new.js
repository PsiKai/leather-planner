const express = require("express")
const router = express.Router()

const auth = require("../../middleware/auth")

const List = require("../../db/models/list")
const { Item } = require("../../db/models/items")

router.post("/", auth, async (req, res) => {
  const { inputText, list } = req.body
  const newItem = new Item({ item: inputText, style: "", moved: false })

  try {
    const updatedList = await List.findOneAndUpdate(
      { user: req.user.id, name: list },
      { $push: { items: newItem } },
      { new: true },
    )
    res.status(201).send(updatedList)
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: "Error adding item to list" })
  }
})

module.exports = router
