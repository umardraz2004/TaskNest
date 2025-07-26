// routes/taskRoutes.js
import express from "express";
import Task from "../models/task.js";
import { verifyToken } from "../middleware/authmiddleware.js";

const router = express.Router();

// ✅ Create a new task in a nest
router.post("/nests/:nestId/tasks", verifyToken, async (req, res) => {
  const { nestId } = req.params;
  const { title } = req.body;

  try {
    const task = await Task.create({
      title,
      nest: nestId,
      user: req.user.id,
    });

    res.status(201).json(task);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create task", error: err.message });
  }
});

// ✅ Get all tasks for a specific nest
router.get("/nests/:nestId/tasks", verifyToken, async (req, res) => {
  const { nestId } = req.params;

  try {
    const tasks = await Task.find({ nest: nestId, user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(tasks);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch tasks", error: err.message });
  }
});

// ✅ Update a task (e.g. mark as completed)
router.patch("/nests/:nestId/:taskId", verifyToken, async (req, res) => {
  const { taskId } = req.params;
  const { title, completed } = req.body;

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, user: req.user.id },
      { $set: { title, completed } },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found or not yours" });
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update task", error: err.message });
  }
});

// ✅ Delete a task
router.delete("/nests/:nestId/:taskId", verifyToken, async (req, res) => {
  const { taskId } = req.params;

  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: taskId,
      user: req.user.id,
    });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found or not yours" });
    }

    res.status(200).json({ message: "Task deleted", taskId });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete task", error: err.message });
  }
});

export default router;
