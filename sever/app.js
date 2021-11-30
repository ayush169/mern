const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT;
require("./db/conn");
const User = require("./models/userSchema");

app.use(express.json());
app.use(require("./router/auth"));

// Middleware
const middleware = (req, res, next) => {
  console.log("ayush");
  next();
};

app.get("/about", middleware, (req, res) => {
  console.log(`hello to about`);
  res.send("hala madrid about");
});

app.get("/contact", (req, res) => {
  res.send("hala madrid contact");
});

app.get("/signin", (req, res) => {
  res.send("hala madrid signin");
});

app.get("/signup", (req, res) => {
  res.send("hala madrid signup");
});

app.listen(PORT, () => {
  console.log(`connection was successful at ${PORT}`);
});
