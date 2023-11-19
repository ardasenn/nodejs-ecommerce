const { Category } = require("../model/Category");
const mongoose = require("mongoose");

const getAll = async () => {
  const categoryList = await Category.find();
  if (!categoryList) throw new Error("Some things went wrong");
  return categoryList;
};
const createCategory = async (data) => {
  if (!data.name) throw new Error("Name is required");
  const isRegisterBefore = await Category.findOne({ name: data.name });
  if (isRegisterBefore) throw new Error("Category is allready used");

  const result = await Category.create({
    name: data.name,
    icon: data.icon,
    color: data.color,
  });
  return result;
};
const updateCategory = async (categoryData) => {
  const result = await Category.findByIdAndUpdate(categoryData.id, {
    name: categoryData.name,
    icon: categoryData.icon,
    color: categoryData.color,
  });

  if (!result) {
    throw new Error("The category cannot be updated");
  }

  return result;
};
const getCategoryById = async (categoryId) => {
  const category = await Category.findById(categoryId);
  if (!category) throw new Error("Category not found");
  return category;
};
const deleteCategory = async (categoryId) => {
  const category = await Category.findByIdAndDelete(categoryId);
  if (!category) throw new Error("Category not found");
  return category;
};

module.exports = {
  getAll,
  createCategory,
  deleteCategory,
  updateCategory,
  getCategoryById,
};
