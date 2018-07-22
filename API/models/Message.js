const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  senderId: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

module.exports = Message = mongoose.model("message", MessageSchema);
