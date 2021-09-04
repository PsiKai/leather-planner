const express = require("express")
const router = express.Router()

const auth = require("../../middleware/auth")

const User = require("../../db/models/user")

router.patch("/", auth, (req, res) => {
    const { user, name, value } = req.body
    const { _id } = user
    const set = {}
    set[name] = value
    User.findOneAndUpdate({ _id }, { "$set": set }, (err, success) => {
      if (err) {
        console.log(err)
        res.status(500).json({ msg: `Error updating username` })
      } else {
        console.log(success)
        res.status(200).json({ msg: `Successfully updated username`, info: user })
      }
    })
  })

module.exports = router