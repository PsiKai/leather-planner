const express = require("express")
const router = express.Router()
const ObjectId = require("mongoose").Types.ObjectId

const auth = require("../../middleware/auth")

const List = require("../../db/models/list")

router.post("/", auth, async (req, res) => {
  const {
    note: { newNote, list, id },
  } = req.body
  try {
    const newList = await List.findOneAndUpdate(
      { user: req.user.id, name: list, "items._id": new ObjectId(id) },
      { $push: { "items.$.notes": newNote } },
      { new: true },
    )
    res.status(201).send(newList)
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "Error adding note to list item" })
  }
})

router.patch("/", auth, async (req, res) => {
  const {
    note: { newNoteText, list, id, note },
  } = req.body
  try {
    const newList = await List.findOneAndUpdate(
      { user: req.user.id, name: list, "items._id": new ObjectId(id) },
      { $set: { "items.$.notes.$[note]": newNoteText } },
      {
        arrayFilters: [{ note: note }],
        new: true,
      },
    )
    res.status(201).send(newList)
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "Error editing note on list item" })
  }
})

router.delete("/", auth, async (req, res) => {
  const { note, list, id } = req.body

  try {
    const newList = await List.findOneAndUpdate(
      { user: req.user.id, name: list, "items._id": new ObjectId(id) },
      { $pull: { "items.$.notes": note } },
      { new: true },
    )
    res.status(201).send(newList)
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "Error deleting note from list item" })
  }
})

module.exports = router
