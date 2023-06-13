const express = require("express");
const router = express.Router();
const Comment = require("../models/comment.model");

// GET all comments for a specific post
router.get("/comments/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ post_id: postId }).populate(
      "user_id"
    );
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Error fetching comments" });
  }
});

// POST a new comment
router.post("/comments", async (req, res) => {
  try {
    const { postId, userId, content } = req.body;

    // Create a new comment instance
    const comment = new Comment({
      post_id: postId,
      user_id: userId,
      content,
    });

    // Save the comment to the database
    const savedComment = await comment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Error creating comment" });
  }
});

module.exports = router;

// POST a new reply for a comment
router.post("/comments/:commentId/replies", async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const { user_id, content } = req.body;

    // Create a new reply instance
    const reply = new Comment({
      user_id,
      content,
    });

    // Save the reply to the database and associate it with the parent comment
    const savedReply = await reply.save();
    await Comment.findByIdAndUpdate(
      commentId,
      { $push: { replies: savedReply._id } },
      { new: true }
    );

    res.status(201).json(savedReply);
  } catch (error) {
    console.error("Error creating reply:", error);
    res.status(500).json({ message: "Error creating reply" });
  }
});

// GET all replies for a comment
router.get("/comments/:commentId/replies", async (req, res) => {
  try {
    const commentId = req.params.commentId;

    // Find the comment by its ID and populate the 'replies' field
    const comment = await Comment.findById(commentId).populate("replies");

    res.status(200).json(comment.replies);
  } catch (error) {
    console.error("Error retrieving replies:", error);
    res.status(500).json({ message: "Error retrieving replies" });
  }
});

module.exports = router;
