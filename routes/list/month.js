const express = require("express")
const router = express.Router()

const auth = require("../../middleware/auth")
const { sortListsByDate } = require("../../utils/sorting")

const List = require("../../db/models/list")

router.get("/:date", auth, async (req, res) => {
    const date = new Date(req.params.date)
    const [month, day, year] = req.params.date.split("-")
    const monthList = new RegExp("^" + month + ".+" + year)
    try {
        let lists = await List.find({ user: req.user.id, name: { $regex: monthList } }).lean()
        lists = lists.sort(sortListsByDate)
        console.log(lists);
        res.json({ lists })
    } catch (error) {
        res.json(error.message)
    }
})

module.exports = router