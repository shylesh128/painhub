const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  username: { type: String, required: true },
  timeStamp: { type: Date, default: Date.now },
  text: { type: String, required: true },
  pair: { type: Number, required: true },
  to: { type: String, required: true },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
