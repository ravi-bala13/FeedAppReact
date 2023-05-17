const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const postController = require("./controllers/post.controller");
const loginAndSignUp = require("./controllers/login.controller");

app.use("/", loginAndSignUp);
app.get("/home", (req, res) => res.status(200).send("welcome to home"));

module.exports = app;
