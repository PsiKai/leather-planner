const express = require("express")
const router = express.Router()
const ObjectId = require("mongoose").Types.ObjectId

const auth = require("../../middleware/auth")

const List = require("../../db/models/list")

router.post("/", auth, async (req, res) => {
    const { list, inputText, id } = req.body

    try {
        const updatedList = await List.findOneAndUpdate(
            { user: req.user.id, name: list, "items._id": new ObjectId(id) },
            { $set: { "items.$.item": inputText } },
            { new: true },
        )
        console.log("Item edited")
        res.status(200).send(updatedList)
    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: "Error updating list item" })
    }
})

module.exports = router
