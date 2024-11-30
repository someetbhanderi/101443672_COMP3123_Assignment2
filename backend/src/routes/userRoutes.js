const express = require("express");
const router = express.Router();

// Mock user data for simplicity
const mockUser = {
  username: "admin",
  password: "password123", // In production, use hashed passwords
};

// Login Route
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === mockUser.username && password === mockUser.password) {
    return res.status(200).json({
      message: "Login successful",
      token: "mock-jwt-token", // Replace with a real JWT in production
    });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
