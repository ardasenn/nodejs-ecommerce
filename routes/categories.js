const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
router.get("/", categoryController.getAll);
router.post("/", categoryController.createCategory);
router.put("/", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);
router.get("/:id", categoryController.deleteCategory);
module.exports = router;
