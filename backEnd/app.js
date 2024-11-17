const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const usersRoutes = require("./routes/users-routes");
const app = express();

app.use(bodyParser.json());

//This is a route to check if the API is running.
app.get('/', (req, res) => {
    res.json({message: "API is running"});
});


app.use("/api/users", usersRoutes);

//This function will handle errors.
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
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


