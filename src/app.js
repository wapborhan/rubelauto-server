const express = require("express");
require("dotenv").config();
const app = express();
const applyMiddleware = require("./middlewares");
const path = require("path");
const globalErrorHandler = require("./utils/globalErrorHandler");
app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "hbs");
app.set("view engine", "ejs");

const leadRoutes = require("./routes/lead");
const customerRoutes = require("./routes/customer");
const productRoutes = require("./routes/product");
const stockRoutes = require("./routes/stock");
const paymentRoutes = require("./routes/payment");

applyMiddleware(app);

// Homepage
// app.get("/", (req, res) => {
//   res.render("Home", {
//     message: "Rubel Auto Server Running...",
//   });
// });

app.get("/", function (req, res) {
  res.render("pages/index");
});
// about page
app.get("/about", function (req, res) {
  res.render("pages/about");
});
// All Routes
app.use(leadRoutes);
app.use(customerRoutes);
app.use(paymentRoutes);
app.use(productRoutes);
app.use(stockRoutes);

// handling all (get,post,update,delete.....) unhandled routes
app.all("*", (req, res, next) => {
  const error = new Error(`Can't find ${req.originalUrl} on the server`);
  error.status = 404;
  next(error);
});

app.use(globalErrorHandler);

module.exports = app;
