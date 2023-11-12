const { Category } = require("../model/Category");
const Product = require("../model/Product");
const productService = require("../services/productService");

const getProducts = async (req, res) => {
  try {
    let filter = {};
    if (req.query.categories) {
      filter = { category: req.query.categories.split(",") };
    }
    res.json(await productService.getProducts(filter));
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const result = await productService.createProduct(req.body);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const detailProduct = async (req, res) => {
  if (!req?.params.id) {
    return res.status(400).json({ message: "id is required" });
  }
  try {
    const product = await productService.getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const updateProduct = async (req, res) => {
  try {
    const result = await productService.updateProduct(req.body);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const deleteProduct = async (req, res) => {
  if (!req?.params.id) {
    return res.status(400).json({ message: "id is required" });
  }
  try {
    const result = await productService.deleteProduct(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const getCountOfProducts = async (req, res) => {
  try {
    const count = await productService.getCount();
    res.json({ count });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const getFeaturedProducts = async (req, res) => {
  try {
    const count = req.params.count ? req.params.count : 1;
    const result = await productService.getFeatured(parseInt(count));
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  createProduct,
  detailProduct,
  updateProduct,
  deleteProduct,
  getCountOfProducts,
  getFeaturedProducts,
};
