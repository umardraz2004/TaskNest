import Nest from "../models/nest.js";
import Task from "../models/task.js";
import mongoose from "mongoose";

// GET all nests for user
export const getNests = async (req, res) => {
  const userId = req.user.id;

  try {
    const nests = await Nest.find({ userId }).sort({ createdAt: -1 });

    // Now attach tasks for each nest
    const nestsWithTasks = await Promise.all(
      nests.map(async (nest) => {
        const tasks = await Task.find({ nest: nest._id, user: userId }).sort({
          createdAt: -1,
        });
        return {
          ...nest._doc,
          tasks,
        };
      })
    );

    res.status(200).json(nestsWithTasks);
  } catch (err) {
    console.error("Failed to get nests with tasks:", err);
    res.status(500).json({ error: "Failed to fetch nests and tasks" });
  }
};

// POST new nest
export const createNest = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.id;

  if (!name || name.trim() === "") {
    return res.status(400).json({ error: "Nest name is required" });
  }

  try {
    const nest = await Nest.create({ name, userId });
    res.status(201).json(nest);
  } catch (error) {
    res.status(500).json({ error: "Failed to create nest" });
  }
};

// DELETE nest
export const deleteNest = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Nest ID" });
  }

  const nest = await Nest.findOneAndDelete({ _id: id, userId: req.user.id });

  if (!nest) {
    return res.status(404).json({ error: "Nest not found or not yours" });
  }

  res.status(200).json({ message: "Nest deleted", id });
};
