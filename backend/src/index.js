const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const employeeRoutes = require("./routes/employeeRoutes"); // Employee routes
const userRoutes = require("./routes/userRoutes"); // User routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)

  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Employee Routes
app.use("/api/employees", employeeRoutes);

// User Routes
app.use("/api/users", userRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Backend is running and connected to MongoDB!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
