const Products = require("../models/Products");
var ObjectId = require("mongoose").Types.ObjectId;

exports.allProduct = async (req, res, next) => {
  try {
    const data = await Products.find();

    res.status(200).json({
      success: true,
      status: 200,
      message: `${data.length} Products Found.`,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
      data: {},
    });
  }
};

exports.createProduct = async (req, res, next) => {
  const prodData = req.body;
  try {
    const newProduct = new Products(prodData);
    const data = await newProduct.save();

    res.status(200).json({
      success: true,
      status: 200,
      message: "Product Created",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
      data: {},
    });
  }
};

exports.singleProduct = async (req, res, next) => {
  const id = req.params.id;

  try {
    const filter = { _id: new ObjectId(id) };
    const data = await Products.findOne(filter);

    console.log(filter);

    res.status(200).json({
      success: true,
      status: 200,
      message: "Product Found",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
      data: {},
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  const id = req.params.id;
  const prodData = req.body;
  try {
    const {
      brandImg,
      brandName,
      modelImg,
      modelName,
      cashPrice,
      creditPrice,
      typeCode,
      sku,
    } = prodData;

    const updatedProduct = await Products.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          brandImg: brandImg,
          brandName: brandName,
          modelImg: modelImg,
          modelName: modelName,
          cashPrice: cashPrice,
          creditPrice: creditPrice,
          typeCode: typeCode,
          sku: sku,
        },
      },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).send({ message: "product not found" });
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "Product Uodate updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
      data: {},
    });
  }
};

exports.deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await Products.findByIdAndDelete({ _id: new ObjectId(id) });

    res.status(200).json({
      success: true,
      status: 200,
      message: "Product Created",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
      data: {},
    });
  }
};
