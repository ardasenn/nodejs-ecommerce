const { Category } = require("../model/Category");
const categoryService = require("../services/categoryService");

const getAll = async (req, res) => {
  try {
    const result = await categoryService.getAll();
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const createCategory = async (req, res) => {
  try {
    const result = await categoryService.createCategory(req.body);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  if (!req?.params.id) {
    return res.status(400).json({ message: "id is required" });
  }
  try {
    const result = await categoryService.deleteCategory(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const result = await categoryService.updateCategory(req.body);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const detailCategory = async (req, res) => {
  if (!req?.params.id) {
    return res.status(400).json({ message: "id is required" });
  }
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    res.json(category);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = {
  getAll,
  createCategory,
  deleteCategory,
  detailCategory,
  updateCategory,
};
