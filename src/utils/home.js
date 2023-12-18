const home = (req, res) => {
  res.render("home/Home", {
    array: ["One", "Two", "Three", "Four"],
    message: "Server Running...",
  });
};

module.exports = home;
