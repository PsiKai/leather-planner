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
        // user = {...user.toObject(), lists}
        // console.log({...user, lists: lists.length});
        usersWithLists.push({...user, lists})
        if (usersWithLists.length === users.length) {
          res.json(usersWithLists)
        }
        // console.log(user, lists.length);
      })
      // console.log(usersWithLists);
      // res.json(usersWithLists)
    } catch (err) {
      console.error(err.message)
      res.status(500).json({ msg: err.message })
    }
})

module.exports = router