const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema({
  thread: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: String,
    required: true,
  },
  painId: {
    type: String,
    required: true,
  },
});

const Thread = mongoose.model("Thread", threadSchema);

module.exports = Thread;
