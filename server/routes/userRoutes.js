const router = require("express").Router();

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.get("/get-me", authController.protect, userController.getMe);
router.patch("/update-me", authController.protect, userController.updateMe);

module.exports = router;
