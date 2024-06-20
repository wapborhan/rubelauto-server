const express = require("express");
require("dotenv").config();
const app = express();
const applyMiddleware = require("./middlewares");
const path = require("path");
const globalErrorHandler = require("./utils/globalErrorHandler");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const leadRouter = require("./routes/lead");
const customerRoutes = require("./routes/customer");
const installmentRoutes = require("./routes/installment");
const productRoutes = require("./routes/product");
const stockRoutes = require("./routes/stock");
const userRoutes = require("./routes/user");

applyMiddleware(app);

app.get("/", function (req, res) {
  res.render("pages/index");
});
app.get("/about", function (req, res) {
  res.render("pages/about");
});

// All Routes
app.use(leadRouter);
app.use(customerRoutes);
app.use(installmentRoutes);
app.use(productRoutes);
app.use(stockRoutes);
app.use(userRoutes);

// handling all (get,post,update,delete.....) unhandled routes
app.all("*", (req, res, next) => {
  const error = new Error(`Can't find ${req.originalUrl} on the server`);
  error.status = 404;
  next(error);
});

app.use(globalErrorHandler);

module.exports = app;
