    import express from "express";
import {
  createNest,
  getNests,
  deleteNest,
  updateNest,
} from "../controllers/nestcontroller.js";
import { verifyToken } from "../middleware/authmiddleware.js";

const router = express.Router();
// ✅ Require user to be authenticated
router.use(verifyToken);
// GET all nests for logged-in user
router.get("/", getNests);
// POST a new nest
router.post("/", createNest);
//Update a nest
router.patch("/:id", updateNest);
// DELETE a nest
router.delete("/:id", deleteNest);

router.get("/me", (req, res) => {
  res.status(200).json({ user: req.user });
});


export default router;
