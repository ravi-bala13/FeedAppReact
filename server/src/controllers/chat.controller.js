const express = require("express");
const router = express.Router();
const Chat = require("../models/chat.model");

// Create a new message.
router.post("/chats/:commId", async (req, res) => {
  try {
    req.body["comm_id"] = req.params.commId;
    const chat = new Chat(req.body);
    const savedchat = await chat.save();
    res.status(201).json(savedchat);
  } catch (error) {
    console.log("Error in Create a new chat:", error);
    res.status(400).json({ message: error.message });
  }
});

router.get("/chats/:commId", async (req, res) => {
  try {
    const chat = await Chat.find({ comm_id: req.params.commId }).sort({
      created_at: "desc",
    });
    res.status(201).json(chat);
  } catch (error) {
    console.log("Error in getting all chat:", error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
