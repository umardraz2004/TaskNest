import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";
import { verifyToken } from "../middleware/authmiddleware.js";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";

dotenv.config();
const router = express.Router();

// Helper to sign short-lived verification token containing user payload (hashed password only)
const makeVerifyToken = ({ fullName, email, passwordHash }) => {
  const payload = {
    purpose: "email-verify",
    email: email.toLowerCase(),
    fullName,
    passwordHash, // bcrypt hash only
  };
  return jwt.sign(
    payload,
    process.env.JWT_VERIFY_SECRET || process.env.JWT_SECRET,
    {
      expiresIn: "30m", // short-lived
    }
  );
};

// REGISTER (no DB write; email verification first)
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // If a real user already exists with this email, block early
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password now (hash goes inside the verification token)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const verifyToken = makeVerifyToken({ fullName, email, passwordHash });

    await sendVerificationEmail(email, verifyToken); // link includes token
    return res.status(200).json({
      message:
        "Check your email to verify your account. The link expires in 30 minutes.",
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// VERIFY EMAIL (creates user at this step)
router.post("/verify-email", async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_VERIFY_SECRET || process.env.JWT_SECRET
    );
    if (decoded.purpose !== "email-verify") {
      return res.status(400).json({ message: "Invalid verification token" });
    }

    const email = decoded.email.toLowerCase();

    // Atomic upsert: if user exists -> set verified; if not -> insert with fullName/password
    await User.updateOne(
      { email },
      {
        $set: { verified: true }, // applies to both existing and new doc
        $setOnInsert: {
          fullName: decoded.fullName,
          email,
          password: decoded.passwordHash, // already bcrypt-hashed
        },
      },
      { upsert: true }
    );
    return res
      .status(200)
      .json({ message: "Email verified successfully. You can log in now." });
  } catch (err) {
    console.error("Verify error:", err);
    return res.status(400).json({ message: "Verification failed or expired" });
  }
});

// RESEND VERIFICATION (stateless)
router.post("/resend-verification", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // If they already completed verification, no need to resend
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing && existing.verified) {
      return res
        .status(200)
        .json({ message: "Email already verified. Please log in." });
    }

    // We need the password again to rebuild the token safely (no DB stored state).
    // If your UI does not have the password anymore, switch to Option B or add a pending cache.
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const verifyToken = makeVerifyToken({ fullName, email, passwordHash });
    await sendVerificationEmail(email, verifyToken);

    return res.status(200).json({ message: "Verification email resent." });
  } catch (err) {
    console.error("Resend error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// LOGIN (unchanged, but note: only verified users exist)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // If your schema still has `verified`, keep the check to be safe
    if (!user.verified) {
      return res
        .status(403)
        .json({ message: "Please verify your email before logging in" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, fullName: user.fullName },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, fullName: user.fullName, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Example protected route
router.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: `Welcome back, ${req.user.fullName}` });
});

export default router;
