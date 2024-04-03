const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const inventoryController = require("../controllers/inventoryController");

// Routes

// Route to handle GET requests for retrieving all inventories
router.get("/", inventoryController.getAllInventories);

// Route to handle POST requests for creating a new inventory
router.post("/", inventoryController.createInventory);

// Route to handle GET requests for retrieving an inventory by its ID
router.get("/:id", inventoryController.getInventoryById);

// Route to handle PUT requests for updating an existing inventory
router.put("/:id", inventoryController.updateInventory);

// Route to handle DELETE requests for deleting an inventory by its ID
router.delete(
  "/:id",
  authController.protect,
  inventoryController.deleteInventory
);

// Exporting the router to make it available for use in other files
module.exports = router;
