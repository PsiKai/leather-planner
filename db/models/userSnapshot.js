const mongoose = require("mongoose")

const UserSnapshotSchema = mongoose.Schema({
    userData: {
        type: Array,
        default: [{
            _id: mongoose.Schema.Types.ObjectId,
            name: String,
            logins: Number,
            lastLogin: Date,
            totalLists: Number
        }]
    },
    date: Date
})

module.exports = mongoose.model("UserSnaphot", UserSnapshotSchema)