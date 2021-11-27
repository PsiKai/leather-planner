const List = require("../models/list")
const { Item } = require("../models/items")
const User = require('../models/user')
const ObjectId = require("bson-objectid")
const user = require("../models/user")


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
            const users = await User.find({ })
            users.forEach(async (user) => {
                const lists = await List.find({ user: user._id })
                const earliestList = lists.reduce((earliest, list) => {
                    let date = new Date(list.name)
                    if (date < earliest) {earliest = date}
                    return earliest
                }, new Date())
                user.createdAt = earliestList
                console.log(user, earliestList)
                user.save()
            })

        } catch (error) {
            console.log(error.message)
        }
    }

}