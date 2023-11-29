const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema({
  username: { type: String, required: true },
  timeStamp: { type: Date, default: Date.now },
  text: { type: String, required: true },
  pair: { type: Number, required: true },
});

const Message = mongoose.model("Connection", connectionSchema);

module.exports = Message;
