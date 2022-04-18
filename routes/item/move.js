const express = require("express")
const router = express.Router()

const auth = require("../../middleware/auth")

const List = require("../../db/models/list")
const { Item } = require("../../db/models/items")

const { getFormattedDate, getWeekday, datePlusDays } = require("../../client/src/utils/dates")

router.post("/", auth, async (req, res) => {
  const {
    body: { list },
    user,
  } = req

  const movedItem = new Item({ ...req.body, moved: true })
  const date = new Date(list)
  const skipWeekend = getWeekday(date) === "Friday" ? 3 : 1
  const nextDay = getFormattedDate(new Date(datePlusDays(date, skipWeekend)))
  const msg = getWeekday(date) === "Monday" ? "Item was copied to Monday" : "Item was copied to tomorrow"

  try {
    let newList
    const foundList = await List.findOne({ user: user.id, name: nextDay })
    if (foundList) {
      newList = await List.findOneAndUpdate({ user: user.id, name: nextDay }, { $push: { items: movedItem } }, { new: true })
    } else {
      newList = await List.create({ user: user.id, name: nextDay, items: movedItem }, { new: true })
    }
    res.status(200).json({ msg, newList })
  } catch (error) {
    res.status(500).json({ msg: "Error moving item" })
  }
})

module.exports = router
