const mongoose = require("mongoose");

const itemsSchema = {
  item: String,
  style: String,
  moved: Boolean,
  notes: Array
};

const Item = mongoose.model("Item", itemsSchema)

module.exports = {itemsSchema, Item};