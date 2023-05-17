const express = require("express");
const router = express.Router();
const Post = require("../models/post.model");

// Create a new post. The request should have the user_id.
router.post("/posts/", async (req, res) => {
  try {
    const post = new Post({
      user_id: req.body.user_id,
      content: req.body.content,
    });
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get all posts
router.get("/posts/", async (req, res) => {
  try {
    const post = await Post.find();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GEt details of a post by id.
router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a post's content by id.
router.put("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    post.content = req.body.content;
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a post by id.
router.delete("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await post.remove();
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Increment the like count of a post by id.
router.post("/posts/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    post.likes++;
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Decrement the like count of a post by id. The count should not go below 0.
router.post("/posts/:id/unlike", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.likes > 0) {
      post.likes--;
    }
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get the total number of posts
router.get("/analytics/posts", async (req, res) => {
  try {
    const count = await Post.countDocuments();
    res.send({ count });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get the top 5 most liked posts
router.get("/analytics/posts/top-liked", async (req, res) => {
  try {
    const posts = await Post.find().sort({ likes: -1 }).limit(5);
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
