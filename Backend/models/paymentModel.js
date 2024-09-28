const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
  orderDate: {
    type: Date,
    default: Date.now,
  },
  payStatus: {
    type: String,
  },
});

module.exports = mongoose.model("payment", paymentSchema);
