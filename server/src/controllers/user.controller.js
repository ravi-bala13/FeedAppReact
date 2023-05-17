const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

// Create a new user
router.post("/users", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      bio: req.body.bio,
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get all users
router.get("/users", async (req, res) => {
  try {
    const user = await User.find();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a user details by id
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a user's name or bio by id
router.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.bio) {
      user.bio = req.body.bio;
    }
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a user by id
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.remove();
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get the total number of users
router.get("/analytics/users", async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get the top 5 most active users, based on the number of posts
router.get("/analytics/users/top-active", async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: "posts",
          localField: "id",
          foreignField: "user_id",
          as: "posts",
        },
      },
      {
        $project: {
          id: 1,
          name: 1,
          email: 1,
          bio: 1,
          post_count: { $size: "$posts" },
        },
      },
      {
        $sort: { post_count: -1 },
      },
      {
        $limit: 5,
      },
    ]);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
