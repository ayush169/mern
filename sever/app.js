const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connection successfull with database");
  })
  .catch((err) => console.log("no connection"));

// Middleware
const middleware = (req, res, next) => {
  console.log("ayush");
  next();
};

app.get("/", (req, res) => {
  res.send("hala madrid");
});

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

app.listen(3000, () => {
  console.log(`connection was successful at 3000`);
});
