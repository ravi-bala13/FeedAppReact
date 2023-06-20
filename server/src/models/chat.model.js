const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  chat_id: { type: String, require: true }, // Bala_hema, anbu_bala
  author: { type: String },
  recipient: { type: String },
  time: { type: String },
  message: { type: String, required: true, minlength: 1, maxlength: 300 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Chat = mongoose.model("chat", ChatSchema); //chats

module.exports = Chat;
