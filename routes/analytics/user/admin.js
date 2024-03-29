const express = require("express")
const router = express.Router()

const auth = require("../../../middleware/auth")

const User = require("../../../db/models/user")

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).lean()
    res.json(user.admin)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: "Error authenticating user" })
  }
})

module.exports = router
