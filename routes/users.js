const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/count", userController.userCount);
router.get("/:id", userController.userDetail);
router.get("/", userController.getAll);
router.post("/", userController.register);
router.put("/", userController.userUpdate);
router.patch("/change-password", userController.changePassword);

module.exports = router;
