const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
router.get("/total-sales", orderController.getTotalSales);
router.get("/userorders/:userid", orderController.getUserOrders);
router.get("/count", orderController.getCountOfOrders);
router.get("/", orderController.getAll);
router.post("/", orderController.createOrder);
router.put("/", orderController.updateOrder);
router.get("/:id", orderController.orderDetail);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
