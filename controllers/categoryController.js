const { Category } = require("../model/Category");

const allCategories = async (req, res) => {
  const categoryList = await Category.find();
  if (!categoryList) res.status(500).json({ succes: false });
  res.send(categoryList);
};
const createCategory = async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });

  const result = await category.save();
  if (!result) {
    return res.status(404).send("the category cannot be created!");
  }
  res.send(result);
};

const deleteCategory = async (req, res) => {
  try {
    const result = await Category.findByIdAndDelete(req.params.id);
    if (result) {
      return res
        .status(200)
        .json({ succes: true, message: "category deleted" });
    } else
      res.status(404).json({ succes: false, message: "category not found" });
  } catch (error) {
    return res.status(400).json({ succes: false, error });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.body.id);
    if (!category) res.status(404).json({ message: "Category was not found" });
    category.name = req.body.name;
    category.color = req.body.color;
    category.icon = req.body.icon;
    const result = category.save();
    if (result) {
      return res.json({ succes: true, message: "category was updated" });
    } else {
      return res.status(404).json({ message: "error" });
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};

const detailCategory = async (req, res) => {
  try {
    const result = await Category.findById(req.params.id);
    if (result) {
      return res.json(result);
    } else
      res.status(404).json({ succes: false, message: "category not found" });
  } catch (error) {
    return res.status(400).json({ succes: false, error });
  }
};
module.exports = {
  allCategories,
  createCategory,
  deleteCategory,
  detailCategory,
  updateCategory,
};
