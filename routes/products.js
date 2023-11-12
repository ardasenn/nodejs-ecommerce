const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
router.get("/count", productController.getCountOfProducts);
router.get("/featured/:count", productController.getFeaturedProducts);
router.get("/", productController.getProducts);
router.post("/", productController.createProduct);
router.put("/", productController.updateProduct);
router.get("/:id", productController.detailProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
