const express = require("express")
const router = express.Router()

const auth = require("../../middleware/auth")

const List = require("../../db/models/list")
const { Item } = require("../../db/models/items")

router.post("/", auth, (req, res) => {

    const { list, content, style } = req.body
    const date = new Date(list)
  
    const skipWeekend = () => {
      if (date.toLocaleDateString("en-US", { weekday: "long" }) === "Friday") { return 3 }
      return 1
    }

    var options = { day: '2-digit', month: 'short', year: 'numeric' }

    const formatDate = (date) => {
        return date.toLocaleDateString("en-US", options).replace(/ /g, "-").replace(/,/g, "")
    }
  
    const nextDay = formatDate(new Date(date.setDate(date.getDate() + skipWeekend())))

    const movedDay = (date) => {
      if (date.toLocaleDateString("en-US", { weekday: "long" }) === "Monday") {
        return "Item was copied to Monday"
      } else {
        return "Item was copied to tomorrow"
      }
    }
  
    List.findOne({ "user": req.user.id, "name": nextDay }, (err, foundList) => {
      if (err) {
        console.log(err)
        res.status(500).json({ msg: "Error moving item" })
      }

      const movedItem = new Item({ item: content, style, moved: true })
  
      if (!foundList) {
        List.create({ "user": req.user.id, "name": nextDay, "items": movedItem }, (err) => {
          if (err) {
            res.status(500).json({ msg: "Error moving item" })
          } else {
            console.log("List created and Item Moved to the next day")
            res.status(200).json({ msg: movedDay(date)})
          }
        })
  
      } else {
        List.findOneAndUpdate({ "user": req.user.id, "name": nextDay },
          { $push: { "items": movedItem } },
          (err) => {
            if (err) { res.status(500).json({ msg: "Error moving item" }) }
            console.log("Item Moved to the next day")
            res.status(200).json({ msg: movedDay(date)})
          }
        )
      }
  
    })
})

module.exports = router
