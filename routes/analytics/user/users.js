const express = require("express")
const router = express.Router()

const List = require("../../../db/models/list")
const User = require("../../../db/models/user")
const UserSnapshot = require("../../../db/models/userSnapshot")

const { getLatestSnapshot, encryptPassword } = require("../../../db/migrations/userData")
const auth = require("../../../middleware/auth")

router.get("/total", async (req, res) => {
  try {
    const total = await User.countDocuments()
    res.json({ total })
  } catch (error) {
    console.error(error)
  }
})

router.patch("/user", auth, async (req, res) => {
  const { _id, updates } = req.body
  if (updates.password) updates.password = await encryptPassword(updates.password)
  if (req.user.admin) {
    try {
      const user = await User.findOneAndUpdate({ _id }, updates, { new: true }).lean()
      res.json({ user })
    } catch (error) {
      console.error(error)
      res.status(400).json({ msg: error.message })
    }
  } else {
    res.status(401)
  }
})

router.delete("/user/:_id", auth, async (req, res) => {
  if (req.user.admin) {
    const lists = await List.find({ user: req.params._id })
    const user = await User.findById(req.params._id)
    // console.log(user, lists)
  }
  res.end()
})

router.get("/:skip/:limit", async (req, res) => {
  try {
    let usersWithLists = await User.aggregate([
      { $sort: { lastLogin: -1 } },
      { $skip: +req.params.skip },
      { $limit: +req.params.limit },
      {
        $lookup: {
          from: "lists",
          localField: "_id",
          foreignField: "user",
          as: "lists",
          pipeline: [{ $project: { _id: 0, name: 1, length: { $size: "$items" } } }],
        },
      },
    ])
    const lastSnapshot = await getLatestSnapshot()
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
