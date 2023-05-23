const express = require("express");
const User = require("../models/user.model");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

// Define a secret key for JWT token generation
const secretKey = "mysecretkey";

// Define routes for signup and login
router.post(
  "/signup",
  // Validate the request body using express-validator
  // body('name').notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if user already exists with the given email
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists with this email" });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const username = req.body.email.split("@")[0];
    const userrole = "USER";
    if (username.startsWith("admin")) {
      userrole = "ADMIN";
    }
    // Create a new user instance and save it to the database
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      user_name: username,
      role: userrole,
    });
    await user.save();

    // Generate a JWT token for the user and send it in the response
    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(201).json({
      message: "User created successfully",
      token,
      userId: user._id,
      username: username,
      userrole: user.role,
    });
  }
);

router.post(
  "/login",
  // Validate the request body using express-validator
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Find the user with the given email in the database
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "There is no account for this email" });
    }
    // Check if the password is correct using bcrypt
    const passwordMatches = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const username = req.body.email.split("@")[0];
    // Generate a JWT token for the user and send it in the response
    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json({
      message: "Login successful",
      token,
      userId: user._id,
      username: user.user_name,
      userrole: user.role,
    });
  }
);

module.exports = router;
