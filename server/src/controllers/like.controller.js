const express = require("express");
const Like = require("../models/like.model");
const Post = require("../models/post.model");
const router = express.Router();

// Increment the like count of a post by id.
router.post("/posts/:postId/like/:userId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    post.likes++;
    const updatedPost = await post.save();

    let like = await Like.findOne({
      post_id: req.params.postId,
      user_id: req.params.userId,
    });
    if (!like) {
      like = new Like({
        post_id: req.params.postId,
        user_id: req.params.userId,
      });
      like.save();
    }

    res.json(updatedPost);
  } catch (error) {
    console.log("error:", error);
    res.status(400).json({ message: error.message });
  }
});

// Decrement the like count of a post by id. The count should not go below 0.
router.post("/posts/:postId/unlike/:userId", async (req, res) => {
  console.log("req.params.postId:", req.params.postId);
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.likes > 0) {
      post.likes--;
    }
    const updatedPost = await post.save();

    const like = await Like.findOne({
      post_id: req.params.postId,
      user_id: req.params.userId,
    });
    console.log("like:", like);
    if (like) {
      like.deleteOne({
        post_id: req.params.postId,
        user_id: req.params.userId,
      });
    }

    res.json(updatedPost);
  } catch (error) {
    console.log("error:", error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
