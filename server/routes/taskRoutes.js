// routes/taskRoutes.js
import express from "express";
import Task from "../models/task.js";
import { verifyToken } from "../middleware/authmiddleware.js";

const router = express.Router();

// POST /api/nests/:nestId/tasks
router.post("/nests/:nestId/tasks", verifyToken, async (req, res) => {
  const { nestId } = req.params;
  const { title } = req.body;

  try {
    const task = await Task.create({
      title,
      nest: nestId,
      user: req.user.id, // comes from JWT
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to create task", error: err.message });
  }
});

export default router;
