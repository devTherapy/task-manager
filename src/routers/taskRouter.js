const express = require("express");
const router = new express.Router();
const Task = require("../models/task");

router.post("/tasks", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then((task) => {
      res.status(201).send(task);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);

    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidupdate = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidupdate) {
    res.status(400).send("cannot update task");
  }
  const _id = req.params.id;
  try {
    const task = await Task.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(500).send("task not found");
    }
    res.send(task);
  } catch (error) {
    res.status(500).send("no server response");
  }
});

router.delete("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findByIdAndDelete(_id);
    if (!task) {
      return res.status(400).send("task not found");
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
