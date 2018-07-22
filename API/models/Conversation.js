const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  participants: {
    type: Array,
    required: true
  },
  convoId: {
    type: String,
    required: true
  }
});

module.exports = Conversation = mongoose.model(
  "conversation",
  ConversationSchema
);
