const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(
  cors({
    origin: ["https://feed-app-react.vercel.app", "http://localhost:3000"],
    credentials: true, // Enable sending cookies across origins
  })
);

app.options("*", cors()); // Enable preflight requests for all routes

app.use(express.json());

const postController = require("./controllers/post.controller");
const userController = require("./controllers/user.controller");
const loginAndSignUp = require("./controllers/login.controller");
const likeController = require("./controllers/like.controller");
const chatController = require("./controllers/chat.controller");
const { FRONTEND_URL } = require("./utils/constants");

app.use("/", loginAndSignUp);
app.use("/", postController);
app.use("/", userController);
app.use("/", likeController);
app.use("/", chatController);
app.get("/home", (req, res) => res.status(200).send("welcome to home"));

/**
 * Google OAuth
 */

const passport = require("./configs/passport");

// session
const session = require("express-session");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
// app.use("/users", userController) // /register /login

passport.serializeUser(function ({ user, token }, done) {
  done(null, { user, token });
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"], //getting email and profile
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failure",
  }),
  function (req, res) {
    return res.redirect(`${FRONTEND_URL}home`);
  }
);

app.get("/auth/google/failure", function (req, res) {
  return res.send("Something went wrong");
});

app.get("/auth/google/login", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      token: req.user.token,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

app.get("/auth/google/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ error: "Failed to destroy session" });
    }

    // Clear any relevant session data or user information
    return res.redirect(`${FRONTEND_URL}home`);
  });
});

// *****************************

module.exports = app;
