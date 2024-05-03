const mongoose = require("mongoose");

const painSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: String,
    required: true,
  },
});

const Pain = mongoose.model("pain", painSchema);

module.exports = Pain;
