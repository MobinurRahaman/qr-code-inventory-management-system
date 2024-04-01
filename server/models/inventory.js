const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  name: String,
  date: {
    received_date: Date,
    dispatched_date: Date,
  },
  quantity: {
    received_quantity: Number,
    dispatched_quantity: Number,
  },
});

module.exports = mongoose.model("Inventory", inventorySchema);
