const express = require("express")
const router = express.Router()

const auth = require("../../middleware/auth")

const List = require("../../db/models/list")

router.get("/:listName", auth, async (req, res) => {
  const newDay = req.params.listName
  try {
    const foundList = await List.findOne({ user: req.user.id, name: newDay })
    if (foundList) {
      return res.status(200).send({ list: newDay, items: foundList.items })
    } else {
      const list = new List({ user: req.user.id, name: newDay, items: [] })
      await list.save()

      return res.status(201).send({ list: newDay, items: [], date: newDay })
    }
  } catch (error) {
    return res.status(500).send("Server Error")
  }
})

module.exports = router
