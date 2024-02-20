const express = require("express");
require("dotenv").config();
const app = express();
const applyMiddleware = require("./middlewares");
const path = require("path");
const globalErrorHandler = require("./utils/globalErrorHandler");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const leadRoutes = require("./routes/lead");
const customerRoutes = require("./routes/customer");
const productRoutes = require("./routes/product");
const stockRoutes = require("./routes/stock");
const paymentRoutes = require("./routes/payment");
const userRoutes = require("./routes/user");

const allowedIPs = ["192.168.1.100", "192.168.1.101", "103.138.226.75", "::1"];

applyMiddleware(app);

// Middleware to check if the client's IP is allowed
const IPFilterMiddleware = (req, res, next) => {
  const clientIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress; // Get client's IP address from the request
  if (allowedIPs.includes(clientIP)) {
    next(); // Allow the request to proceed
  } else {
    res.status(403).send("Access Forbidden"); // Return a 403 Forbidden status
  }
};

// Apply IP filtering middleware to all routes
app.use(IPFilterMiddleware);

app.get("/", function (req, res) {
  res.render("pages/index");
});
app.get("/about", function (req, res) {
  res.render("pages/about");
});

// All Routes
app.use(leadRoutes);
app.use(customerRoutes);
app.use(paymentRoutes);
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
