const express = require("express");
const bodyParser = require("body-parser");
// const mongoPractice = require('./config/db');
const mongoose = require("mongoose");
const HttpError = require("./utils/HttpError");
const appRoutes = require("./routes");

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api", appRoutes);

// not found routes

app.use((req, res, next) => {
  throw new HttpError("Could not find this route.", 404);
});

// special error handler middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({
    message: error.message || "Something went wrong",
  });
});

mongoose
  .connect(
    "mongodb+srv://avusan:avusan123@cluster0.ziq38.mongodb.net/productivity?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("app was started");
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
