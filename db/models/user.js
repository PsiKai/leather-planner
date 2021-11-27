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
      default: () => Date.now(),
      immutable: true
    },
    updatedAt: Date,
    admin: {
      type: Boolean,
      default: false
    }
  })

  module.exports = mongoose.model("User", UserSchema)