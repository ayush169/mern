const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("../db/conn");
const User = require("../models/userSchema");

router.get("/", (req, res) => {
  res.send("hala madrid router");
});

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "fill the fields properly" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "email already exists" });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: "password do not match" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });

      await user.save();
      res.status(201).json({ message: "user registration successful" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "fill the fields properly" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      const token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 258920000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "invalid email or password" });
      } else {
        res.json({ message: "user signin successfully" });
      }
    } else {
      res.status(400).json({ error: "invalid email or password" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
