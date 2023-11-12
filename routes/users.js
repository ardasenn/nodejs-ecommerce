const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/:id", userController.getUser);
router.get("/", userController.getAll);
router.post("/", userController.register);

module.exports = router;
