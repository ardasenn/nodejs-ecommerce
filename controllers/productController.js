const Product = require("../model/Product");

const getAll = async (req, res) => {
  const productList = await Product.find();
  if (!productList) res.status(500).json({ succes: false });
  res.send(productList);
};

const createProduct = async (req, res) => {};

module.exports = {
  getAll,
  createProduct,
};
