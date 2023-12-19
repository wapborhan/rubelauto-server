const express = require("express");
require("dotenv").config();
const app = express();
const applyMiddleware = require("./middlewares");
const path = require("path");
const globalErrorHandler = require("./utils/globalErrorHandler");
const home = require("./utils/home");
app.set("views", path.join(__dirname));
app.set("view engine", "hbs");

applyMiddleware(app);

// Homepage
app.get("/", (req, res) => {
  res.render("home/Home", {
    message: "Rubel Auto Server Running...",
  });
});

// All Routes
// app.use(addCustomer);

// handling all (get,post,update,delete.....) unhandled routes
app.all("*", (req, res, next) => {
  const error = new Error(`Can't find ${req.originalUrl} on the server`);
  error.status = 404;
  next(error);
});

app.use(globalErrorHandler);

module.exports = app;
