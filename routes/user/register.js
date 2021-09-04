const express = require("express")
const router = express.Router()

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../../db/models/user")

router.post("/", async (req, res) => {
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "Email is already registered" })
      }

      user = new User({ name, email, password });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = { user: { id: user.id } }

      jwt.sign(
        payload, process.env.SECRET, { expiresIn: 36000 }, (err, token) => {
          if (err) throw errors;
          res.status(201).json({ token })
        }
      )
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "There was an error registering user" })
    }
})

module.exports = router
