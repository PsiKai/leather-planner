const express = require("express")
const router = express.Router()

const List = require("../../../db/models/list")
const User = require("../../../db/models/user")

router.get("/", async (req, res) => {
    try {
      let usersWithLists = []
      const users = await User.find({ }).lean()
      users.forEach(async (user) => {
        const lists = await List.where("user").equals(user._id)
        usersWithLists.push({...user, lists})
        if (usersWithLists.length === users.length) {
          // console.log(usersWithLists);
          res.json(usersWithLists)
        }
      })
    } catch (err) {
      console.error(err.message)
      res.status(500).json({ msg: err.message })
    }
})

module.exports = router