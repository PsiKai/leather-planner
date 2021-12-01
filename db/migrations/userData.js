const List = require("../models/list")
const { Item } = require("../models/items")
const User = require('../models/user')
const ObjectId = require("bson-objectid")
const UserSnapshot = require("../models/userSnapshot")


module.exports = {

    // Get all users
    getAllUsers: async () => {
        try {
            const users = await User.find({ }).lean()
            console.log(users)
        } catch (error) {
            console.log(error.message)
        }
    },

    // Update created at fields to first list date
    createdAt: async () => {
        try {
            const users = await User.find({ })
            users.forEach(async (user) => {
                const lists = await List.find({ user: user._id })
                const earliestList = lists.reduce((earliest, list) => {
                    let date = new Date(list.name)
                    if (date > earliest && date < new Date()) {earliest = date}
                    return earliest
                }, new Date("Jun-01-2020"))
                user.lastLogin = earliestList
                // console.log(user, earliestList)
                user.save()
            })

        } catch (error) {
            console.log(error.message)
        }
    },

    // Make one user an admin
    makeAdmin: async () => {
        try {
            const user = await User.findOne({ _id: ObjectId("") })
            user.admin = true
            user.save()
            console.log(user);
        } catch (error) {
            console.log(error.message)
        }
    },

    // Increase login count
    addLogins: async () => {
        try {
            const users = await User.find({ })
            users.forEach(user => {
                user.logins += Math.floor(Math.random() * 4) + 1
                user.save()
            })
        } catch (error) {
            console.log(error.message)
        }
    },

    addSingleLogin: async () => {
        try {
            const user = await User.findOne({ _id: ObjectId("")})
            user.logins = 43
            user.save()
        } catch (error) {
            console.log(error.message)
        }
    },

    getLatestSnapshot: async () => {
        try {
            const snapshots = await UserSnapshot.findOne().sort({$natural: -1}).limit(1).lean()
            // console.log(snapshots);
            return snapshots
            // snapshots.forEach(snap => {
            //     snap.userData.forEach(s => {console.log(s);})
            // })
        } catch (error) {
            console.log(error.message)
        }
    },

    deleteSnaphots: async () => {
        try {
            await UserSnapshot.deleteMany({ })
        } catch (error) {
            
        }
    }

}