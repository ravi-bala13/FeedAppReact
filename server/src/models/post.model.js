const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  content: { type: String, required: true, minlength: 1, maxlength: 300 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  likes: { type: Number, default: 0, min: 0 },
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
