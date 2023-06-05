const express = require("express");
const Like = require("../models/like.model");
const Post = require("../models/post.model");
const router = express.Router();

// Increment the like count of a post by id.
router.post("/posts/like", async (req, res) => {
  const userId = req.body.userId;
  const postId = req.body.postId;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    post.likes++;
    const updatedPost = await post.save();

    let like = await Like.findOne({
      post_id: postId,
      user_id: userId,
    });
    if (!like) {
      like = new Like({
        post_id: postId,
        user_id: userId,
      });
      like.save();
    }

    res.json(updatedPost);
  } catch (error) {
    console.log("Error in like controller - Increment the like :", error);
    res.status(400).json({ message: error.message });
  }
});

// Decrement the like count of a post by id. The count should not go below 0.
router.post("/posts/unlike", async (req, res) => {
  const userId = req.body.userId;
  const postId = req.body.postId;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.likes > 0) {
      post.likes--;
    }
    const updatedPost = await post.save();

    const like = await Like.findOne({
      post_id: postId,
      user_id: userId,
    });
    if (like) {
      like.deleteOne({
        post_id: postId,
        user_id: userId,
      });
    }

    res.json(updatedPost);
  } catch (error) {
    console.log("Error in like controller - Decrement the like:", error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
