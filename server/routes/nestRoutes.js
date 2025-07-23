    import express from "express";
import {
  createNest,
  getNests,
  deleteNest,
} from "../controllers/nestcontroller.js";
import { verifyToken } from "../middleware/authmiddleware.js";

const router = express.Router();

// ✅ Require user to be authenticated
router.use(verifyToken);

// GET all nests for logged-in user
router.get("/", getNests);

// POST a new nest
router.post("/", createNest);

// DELETE a nest
router.delete("/:id", deleteNest);

router.get("/me", (req, res) => {
  res.status(200).json({ user: req.user });
});


export default router;
