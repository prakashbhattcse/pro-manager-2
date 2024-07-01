const express = require("express");
const router = express.Router();
const authController = require("../controller/user");


router.post("/register",authController.registerUser)
router.post("/login",authController.loginUser)
router.patch("/update/:id",authController.updateUser)
router.patch("/getUser/:id",authController.getUser)

module.exports = router;