const express = require("express")
const router = express.Router()

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require("../../db/models/user")

router.post("/", async (req, res) => {
    const { email, password } = req.body
    try {
      let user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ msg: "Email or password is incorrect" })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ msg: "Email or password is incorrect" })
      }

      const payload = { user: { id: user.id } }

      jwt.sign(payload, process.env.SECRET, { expiresIn: 360000 }, (err, token) => {
          if (err) throw errors
          res.json({ token })
        }
      )
    } catch {
      console.error(err.message)
      res.status(500).json({ msg: "There was an error loggin in" })
    }
})

module.exports = router
