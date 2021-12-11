const express = require("express")
const router = express.Router()

const List = require("../../../db/models/list")
const User = require("../../../db/models/user")
const UserSnapshot = require("../../../db/models/userSnapshot")

const { getLatestSnapshot } = require("../../../db/migrations/userData")
const { documentSort } = require("../../../utils/sorting")

router.get("/", async (req, res) => {
    try {
      let usersWithLists = []
      let users = await User.find({ }).lean()
      const lastSnapshot = await getLatestSnapshot()
      users.forEach(async (user) => {
        const lists = await List.where("user").equals(user._id)
        usersWithLists.push({...user, lists})
        if (usersWithLists.length === users.length) {
          documentSort(usersWithLists)
          documentSort(lastSnapshot.userData)
          res.json({usersWithLists, lastSnapshot})
        }
      })
    } catch (err) {
      console.error(err.message)
      res.status(500).json({ msg: err.message })
    }
})

router.post("/", async (req, res) => {
  try {
    const existingSnapshot = await UserSnapshot.find({ date: new Date().toLocaleDateString() })
    if (!existingSnapshot.length) {
      const snapShot = new UserSnapshot({ userData: req.body, date: new Date().toLocaleDateString() })
      await snapShot.save()
      res.status(201).json({ msg: "Snapshot created" })
    } else {
      res.status(200).json({ msg: "Snapshot already exists" })
    }
  } catch (error) {
    console.error(error.message)
    res.status(500).json(error.message)
  }
})

module.exports = router
