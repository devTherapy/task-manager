const express = require("express");
const router = new express.Router();
const User = require("../models/users");
const bcrypt = require("bcryptjs");

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();

    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/users/:id", async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "age", "pasword", "email"];
  const isValidupdate = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidupdate) {
    return res.status(400).send("invalid operation");
  }
  try {
    const user = findById(req.params.id);
    updates.forEach((update) => {
      user[update] = req.body[update];
    });
    await user.save();

    // const user = await User.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    if (!user) {
      return res.status(400).send();
    }
    res.send(user);
    console.log(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(400).send("user cannot be found");
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
