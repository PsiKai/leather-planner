const express = require("express")
const router = express.Router()

const auth = require("../../middleware/auth")

const List = require("../../db/models/list")
const { Item } = require("../../db/models/items")

router.post("/", auth, (req, res) => {

    const { list, item, style } = req.body
    const date = new Date(list)
  
    const skipWeekend = () => {
      if (date.toLocaleDateString("en-US", { weekday: "long" }) === "Friday") { return 3 }
      return 1
    }

    var options = { day: '2-digit', month: 'short', year: 'numeric' };

    const formatDate = (date) => {
        return date.toLocaleDateString("en-US", options).replace(/ /g, "-").replace(/,/g, "")
    }
  
    const nextDay = formatDate(new Date(date.setDate(date.getDate() + skipWeekend())))
  
    List.findOne({ "user": req.user.id, "name": nextDay }, (err, foundList) => {
      if (err) console.log(err);
  
      const movedItem = new Item({ item, style, moved: true })
  
      if (!foundList) {
        const list = new List({ user: req.user.id, name: nextDay, items: [] });
        list.items.push(movedItem)
        list.save();
        console.log("List created and Item Moved to the next day");
  
      } else {
        foundList.items.push(movedItem)
        foundList.save()
        console.log("Item Moved to the next day");
      }
  
      if (date.toLocaleDateString("en-US", { weekday: "long" }) === "Monday") {
        res.status(200).json({ msg: "Item was copied to Monday" })
      } else {
        res.status(200).json({ msg: "Item was copied to tomorrow" });
      }
  
    })
})

module.exports = router
