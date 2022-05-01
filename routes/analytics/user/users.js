const express = require("express")
const router = express.Router()

const List = require("../../../db/models/list")
const User = require("../../../db/models/user")
const UserSnapshot = require("../../../db/models/userSnapshot")

const { getLatestSnapshot } = require("../../../db/migrations/userData")

router.get("/total", async (req, res) => {
  try {
    const total = await User.countDocuments()
    res.json({ total })
  } catch (error) {
    console.error(error)
  }
})

router.patch("/user", async (req, res) => {
  const { _id, updates } = req.body
  try {
    const user = await User.findOneAndUpdate({ _id }, updates, { new: true }).lean()
    res.json({ user })
  } catch (error) {
    console.error(error)
    res.status(400).json({ msg: error.message })
  }
})

router.get("/:skip/:limit", async (req, res) => {
  try {
    let users = await User.find({})
      .sort({ lastLogin: -1 })
      .limit(+req.params.limit)
      .skip(+req.params.skip)
      .lean()
    const lastSnapshot = await getLatestSnapshot()
    const addListsToUsers = users.map(async user => {
      const lists = await List.aggregate([
        { $match: { user: user._id } },
        { $project: { _id: 0, name: 1, length: { $size: "$items" } } },
      ])
      return { ...user, lists }
    })
    const usersWithLists = await Promise.all(addListsToUsers)
    res.json({ usersWithLists, lastSnapshot })
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
