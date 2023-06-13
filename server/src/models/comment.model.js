const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  content: { type: String, required: true, minlength: 1, maxlength: 300 },
  likes: { type: Number, default: 0, min: 0 },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
      required: false,
    },
  ],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Comment = mongoose.model("comment", commentSchema); //comments
