const express = require("express")
const router = express.Router()

const User = require("../../db/models/user")

router.get("/", auth, async (req, res) => {
    try {
      const users = await User.find({ })
      res.json(users)
    } catch (err) {
      console.error(err.message)
      res.status(500).json({ msg: err.message })
    }
})

module.exports = router