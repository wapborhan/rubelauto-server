const globalErrorHandler = (err, _req, res, _next) => {
  // format error
  // res.status(err.status || 500).json({
  //   message: err.message,
  //   errors: err.errors,
  // });

  res.render("home/Error", {
    errors: err.errors,
    message: err.message,
  });
};

module.exports = globalErrorHandler;
