const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userController = require("../controller/userController");

router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.post("/logout", auth, userController.logoutUser);
router.get("/me", auth, userController.getUserDetails);

module.exports = router;
