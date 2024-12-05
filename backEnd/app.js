const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const usersRoutes = require('./routes/users-routes');
const app = express();

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// Route to check if the API is running
app.get('/', (req, res) => {
    res.json({ message: "API is running" });
});

// Register user-related routes
app.use("/api/users", usersRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500); // Default to 500 if no specific error code
  res.json({ message: error.message || "An unknown error occurred!" });
});

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://kaimou:DKxtnxky9wqGpjaF@cluster0.oo1ir.mongodb.net/user?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(8080, () => {
      console.log("Server is running on port 8080");
    });
  })
  .catch((err) => {
    console.log("Database connection failed:", err);
  });
