const express = require("express")
const router = express.Router()

const auth = require("../../middleware/auth")

const User = require("../../db/models/user")

router.patch("/", auth, async (req, res) => {
  const { user, name, value } = req.body
  const { _id } = user
  const set = {}
  set[name] = value
  try {
    const updatedUser = await User.findOneAndUpdate({ _id }, { $set: set }, { new: true })
    res.status(200).json({ msg: `Successfully updated ${name}`, user: updatedUser })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: `Error updating ${name}` })
  }
})

module.exports = router
