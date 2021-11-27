const List = require("../models/list")
const { Item } = require("../models/items")
const User = require('../models/user')
const ObjectId = require("bson-objectid")


module.exports = {

    // Get all users
    getAllUsers: async () => {
        try {
            const users = await User.find({ })
            console.log(users)
        } catch (error) {
            console.log(error.message)
        }
    },

    // Update created at fields to first list date
    createdAt: async (id) => {
        try {
            const lists = await List.find({ user: ObjectId(id) })
            const earliestList = lists.reduce((earliest, list) => {
                let date = new Date(list.name)
                if (date.getTime() < earliest.getTime()) {
                    console.log("Updating earliest", date.getTime());
                    earliest = date
                }
                return earliest
            }, new Date())
            console.log(earliestList)
        } catch (error) {
            console.log(error.message)
        }
    }

}