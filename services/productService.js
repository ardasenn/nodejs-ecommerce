const Product = require("../model/Product");
const { Category } = require("../model/Category");

const getProducts = async (filter) => {
  const productList = await Product.find(filter)
    .populate("category")
    .select("name image isFeatured");
  if (!productList) throw new Error("Some things went wrong");
  return productList;
};

const createProduct = async (productData) => {
  const category = await Category.findById(productData.category);
  if (!category) throw new Error("Invalid Category");

  const result = await Product.create({
    name: productData.name,
    description: productData.description,
    richDescription: productData.richDescription,
    image: productData.image,
    price: productData.price,
    category: productData.category,
    countInStock: productData.countInStock,
    raiting: productData.raiting,
    isFeatured: productData.isFeatured,
    brand: productData.brand,
  });

  if (!result) {
    throw new Error("The product cannot be created!");
  }

  return result;
};
const updateProduct = async (productData) => {
  const category = await Category.findById(productData.category);
  if (!category) throw new Error("Invalid Category");

  const result = await Product.findByIdAndUpdate(productData.id, {
    name: productData.name,
    description: productData.description,
    richDescription: productData.richDescription,
    image: productData.image,
    price: productData.price,
    category: productData.category,
    countInStock: productData.countInStock,
    raiting: productData.raiting,
    isFeatured: productData.isFeatured,
    brand: productData.brand,
  });

  if (!result) {
    throw new Error("The product cannot be updated");
  }

  return result;
};
const getProductById = async (productId) => {
  const product = await Product.findById(productId).populate("category");
  if (!product) throw new Error("Product not found");
  return product;
};
const deleteProduct = async (productId) => {
  const product = await Product.findByIdAndDelete(productId);
  if (!product) throw new Error("Product not found");
  return product;
};
const getCount = async () => {
  const productCount = await Product.countDocuments();
  if (!productCount) throw new Error("Some things went wrong");
  return productCount;
};
const getFeatured = async (count) => {
  const featuredProductList = await Product.find({ isFeatured: true })
    .limit(count)
    .select("name image isFeatured");
  if (!featuredProductList) throw new Error("Some things went wrong");
  return featuredProductList;
};
module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  getProductById,
  deleteProduct,
  getCount,
  getFeatured,
};
