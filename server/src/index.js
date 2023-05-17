const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const userController = require("./controllers/user.controller");
const postController = require("./controllers/post.controller");

app.use("/", userController);
app.use("/", postController);

module.exports = app;
