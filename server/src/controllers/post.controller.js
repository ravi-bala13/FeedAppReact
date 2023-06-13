const express = require("express");
const router = express.Router();
const Post = require("../models/post.model");
const jwt = require("jsonwebtoken");
const PostResponse = require("../Responses/PostResponse");
const Like = require("../models/like.model");
require("dotenv").config();

// Create a new post. The request should have the user_id.
router.post("/posts/", async (req, res) => {
  try {
    const { token } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("userId", decoded.user._id);

    const post = new Post({
      user_id: decoded.user._id,
      content: req.body.content,
    });
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.log("Error in Create a new post:", error);
    res.status(400).json({ message: error.message });
  }
});

// get all posts
router.get("/posts/:loginedUserId", async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const size = +req.query.size || 5;
    const skip = (page - 1) * size;
    const loginedUserId = req.params.loginedUserId; // to know the logined user liked the posts or not

    const allPost = await Post.find()
      .skip(skip)
      .limit(size)
      .sort({ created_at: "desc" })
      .populate({
        path: "user_id",
        select: "user_name",
      });

    const postIds = allPost.map((post) => post._id);

    const likes = await Like.find({
      post_id: { $in: postIds },
      user_id: loginedUserId,
    });
    const map = new Map(); //postId(key) => likedUserId(value)

    likes.forEach((element) => {
      map.set(element.post_id.toString(), element.user_id.toString());
    });

    const postResponses = [];
    allPost.forEach((post) => {
      const postResponse = new PostResponse();
      postResponse._postId = post._id;
      postResponse._username = post.user_id.user_name;
      postResponse._content = post.content;
      postResponse._likes = post.likes;
      postResponse._isUserLiked = map.get(post._id.toString()) == loginedUserId;
      postResponse._commentSec = post.comment_sec;
      postResponses.push(postResponse);
    });

    res.status(201).json(postResponses);
  } catch (error) {
    console.log("Error in get all posts:", error);
    res.status(400).json({ message: error.message });
  }
});

// get all posts for particular user
router.get("/posts/self/:loginedUserId", async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const size = +req.query.size || 5;
    const skip = (page - 1) * size;
    const loginedUserId = req.params.loginedUserId; // to know the logined user liked the posts or not

    const allPost = await Post.find({ user_id: loginedUserId })
      .skip(skip)
      .limit(size)
      .sort({ created_at: "desc" })
      .populate({
        path: "user_id",
        select: "user_name",
      });

    const totalPages = Math.ceil(
      (await User.find({ user_id: loginedUserId }).countDocuments()) / size
    );
    // console.log('totalPages:', user, totalPages)

    const postIds = allPost.map((post) => post._id);

    const likes = await Like.find({
      post_id: { $in: postIds },
      user_id: loginedUserId,
    });
    const map = new Map(); //postId(key) => likedUserId(value)

    likes.forEach((element) => {
      map.set(element.post_id.toString(), element.user_id.toString());
    });

    const postResponses = [];
    allPost.forEach((post) => {
      const postResponse = new PostResponse();
      postResponse._postId = post._id;
      postResponse._username = post.user_id.user_name;
      postResponse._content = post.content;
      postResponse._likes = post.likes;
      postResponse._isUserLiked = map.get(post._id.toString()) == loginedUserId;
      postResponses.push(postResponse);
    });

    res.status(201).json(postResponses);
  } catch (error) {
    console.log("Error in get all posts:", error);
    res.status(400).json({ message: error.message });
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
    console.log("Error in Update a post content by id:", error);
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
    console.log("Error in Delete a post by id:", error);
    res.status(500).json({ message: error.message });
  }
});

// Get the top 5 most liked posts
router.get("/analytics/posts/top-liked", async (req, res) => {
  try {
    const posts = await Post.find().sort({ likes: -1 }).limit(5);
    res.send(posts);
  } catch (error) {
    console.log("Error in Get the top 5 most liked posts:", error);
    res.status(500).send(error);
  }
});

module.exports = router;
