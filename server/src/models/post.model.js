const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  content: { type: String, required: true, minlength: 1, maxlength: 300 },
  comment_sec: { type: Boolean, default: false },
  likes: { type: Number, default: 0, min: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
