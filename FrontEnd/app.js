const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/users-routes");
const indexroute = require("./routes/index");

const app = express();

// Sets the view engine and views directory
app.set("view engine", "ejs");
app.set("views", "./views");

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));

// Render homepage
app.get("/", (req, res) => {
  res.render("index", { title: "Homepage" });
});

// Render projects page
app.get("/projects", (req, res) => {
  res.render("projects", { title: "Projects" });
});

// Render sign-in page
app.get("/signin", (req, res) => {
  res.render("signin", { title: "Sign In" });
});

// Render register page
app.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

// API routes
app.use("/home", indexroute);
app.use("/api/users", usersRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});


mongoose
  .connect('mongodb+srv://jasonbhlee:zVUALKzoveu1a3Dv@userdata.yssqq.mongodb.net/?retryWrites=true&w=majority&appName=UserData')
  .then(() => {
    app.listen(8080, () => {
      console.log("Server is running on port 8080");
    });
  })
  .catch(err => {
    console.log(err);
  });


 