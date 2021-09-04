const mongoose = require("mongoose");
const {itemSchema} = require("./items")

const listSchema = mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"
    },
    name: {
      type: String
    },
    items: {
        type: Array,
        default: [itemSchema]
    }
  });

module.exports = mongoose.model("List", listSchema);