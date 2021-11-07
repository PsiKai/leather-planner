const express = require("express")
const router = express.Router()
const ObjectId = require('bson-objectid')

const auth = require("../../middleware/auth")

const List = require("../../db/models/list")
const { Item } = require("../../db/models/items")

router.post("/", auth, (req, res) => {
    const { note: { newNote, list, id } } = req.body
    console.log( newNote, list, id);
    List.findOneAndUpdate(
        {"user": req.user.id, "name": list, "items._id": ObjectId(id)},
        { "$push": { "items.$.notes": newNote } },
        { new: true },
        (err, newList) => {
            if (err) {
                console.log(err);
                res.status(500).json({ msg: "Error adding note to list item" })
            }
            res.status(201).send(newList)
        }
    )
})

router.patch("/", auth, (req, res) => {
    const { note: { newNoteText, list, id, note } } = req.body
    List.findOneAndUpdate(
        {"user": req.user.id, "name": list, "items._id": ObjectId(id) },
        { "$set": { "items.$.notes.$[note]": newNoteText } },
        { 
            arrayFilters: [{"note": note}],
            new: true 
        },
        (err, newList) => {
            if (err) {
                console.log(err);
                res.status(500).json({ msg: "Error adding note to list item" })
            }
            console.log(newList);
            res.status(201).send(newList)
        }
    )
})

router.delete("/", auth, (req, res) => {
    const { note: { note, list, id } } = req.body
    List.findOneAndUpdate(
        {"user": req.user.id, "name": list, "items._id": ObjectId(id)},
        { "$pull": {"items.$.notes.$[note]": note } },
        { 
            arrayFilters: [{"note": note}],
            new: true 
        },
        (err, newList) => {
            if (err) {
                console.log(err);
                res.status(500).json({ msg: "Error adding note to list item" })
            }
            console.log(newList);
            res.status(201).send(newList)
        }
    )
})

module.exports = router