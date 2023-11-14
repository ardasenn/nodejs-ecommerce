const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
router.get("/", orderController.getAll);
router.post("/", orderController.createOrder);
router.get("/:id", orderController.orderDetail);

module.exports = router;
