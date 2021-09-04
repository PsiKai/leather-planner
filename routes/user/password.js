const express = require("express")
const router = express.Router()

const bcrypt = require("bcrypt");

const auth = require("../../middleware/auth")

const User = require("../../db/models/user")

router.patch("/", auth, async (req, res) => {
    const {oldPass, newPass, user} = req.body
    const { _id } = user
    const dbUser = await User.findOne({ _id })
    const isMatch = await bcrypt.compare(oldPass, dbUser.password)
    const salt = await bcrypt.genSalt(10)
    const hashNew = await bcrypt.hash(newPass, salt)
  
    if (isMatch) {
      User.findOneAndUpdate({_id}, { password: hashNew }, (err) => {
        if (err) {
          console.error(`${dbUser.name} failed to update password field with error: ${err}`)
          res.status(500).json({msg: "There was an error updating you password"})
        } else {
          console.log(`${dbUser.name} updated password field`);
          res.status(200).json({ msg: "Password successfully updated" })
        }
      })
    } else {
      res.status(400).json({ msg: "Old password does not match"})
    }    
})

module.exports = router
