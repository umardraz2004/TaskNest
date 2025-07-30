import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import nestRoutes from "./routes/nestRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API is working ✅");
});

app.use("/api/auth", authRoutes); // Now /api/auth/register works

app.use("/api/nests", nestRoutes);

app.use("/api", taskRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
