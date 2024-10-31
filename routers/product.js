const {
  createProduct,
  allProduct,
  singleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

const router = require("express").Router();

router
  .get("/", allProduct)
  .post("/", createProduct)
  .get("/:id", singleProduct)
  .patch("/:id", updateProduct)
  .delete("/:id", deleteProduct);

module.exports = router;
