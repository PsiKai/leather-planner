const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      // default: () => Date.now(),
      // immutable: true
    },
    updatedAt: Date
  })

  UserSchema.pre('save', function (next) {
    this.createdAt = Date.now()
    next()
  })

  module.exports = mongoose.model("User", UserSchema)