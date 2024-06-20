const globalErrorHandler = (err, _req, res, _next) => {
  res.render("../views/pages/error", {
    errors: err.errors,
    message: err.message,
  });
};

module.exports = globalErrorHandler;
