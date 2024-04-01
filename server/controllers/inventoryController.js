const Inventory = require("../models/inventory");
const catchAsync = require("../utils/catchAsync");
const filterObj = require("../utils/filterObj");

// Implement node-chache
const NodeCache = require("node-cache");
const nodeCache = new NodeCache({
  stdTTL: 60,
});

// Create a new inventory item
exports.createInventory = catchAsync(async (req, res) => {
  try {
    const { name, date, quantity } = req.body;

    // Filtering body to include only allowed properties
    const filteredBody = filterObj(req.body, "name", "date", "quantity");

    const inventory = new Inventory({
      name: filteredBody.name,
      date: {
        received_date: filteredBody.date,
        dispatched_date: "",
      },
      quantity: {
        received_quantity: filteredBody.quantity,
        dispatched_quantity: 0,
      },
    });

    const newInventory = await inventory.save();

    // Delete cache after inventory created
    nodeCache.del("inventories");

    res.status(201).json(newInventory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Retrieve all inventory items
exports.getAllInventories = catchAsync(async (req, res) => {
  try {
    let inventories;

    // Check if inventories are already cached in nodeCache
    if (nodeCache.has("inventories")) {
      // If cached, retrieve inventories from cache
      inventories = JSON.parse(nodeCache.get("inventories"));
    } else {
      // If not cached, retrieve inventories from the database
      inventories = await Inventory.find();

      // Cache the retrieved inventories for future use
      nodeCache.set("inventories", JSON.stringify(inventories));
    }

    // Send the retrieved inventories as a JSON response
    res.json(inventories);
  } catch (error) {
    // If an error occurs, send a 500 Internal Server Error response with the error message
    res.status(500).json({ message: error.message });
  }
});

// Retrieve a specific inventory item by its ID
exports.getInventoryById = catchAsync(async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id);
    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a specific inventory item by its ID
exports.updateInventory = catchAsync(async (req, res) => {
  try {
    const { name, date, dispatched_date, quantity, dispatched_quantity } =
      req.body;

    const inventory = await Inventory.findById(req.params.id);

    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }

    // Create a filtered body object with allowed properties
    const filteredBody = filterObj(
      req.body,
      "name",
      "date",
      "dispatched_date",
      "quantity",
      "dispatched_quantity"
    );

    // Update name if provided
    if (filteredBody.name) {
      inventory.name = filteredBody.name;
    }

    // Update date if provided
    if (filteredBody.date) {
      inventory.date.received_date = filteredBody.date;
    }

    // Update dispatched_date if provided
    if (filteredBody.dispatched_date) {
      inventory.date.dispatched_date = filteredBody.dispatched_date;
    }

    // Update quantity if provided
    if (filteredBody.quantity) {
      inventory.quantity.received_quantity = filteredBody.quantity;
    }

    // Update dispatched_quantity if provided
    if (filteredBody.dispatched_quantity) {
      inventory.quantity.dispatched_quantity = filteredBody.dispatched_quantity;
    }

    const updatedInventory = await inventory.save();
    // Delete cache after inventory update
    nodeCache.del("inventories");

    return res.json(updatedInventory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a specific inventory item by its ID
exports.deleteInventory = catchAsync(async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndDelete(req.params.id);
    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }

    // Delete cache after inventory delete
    nodeCache.del("inventories");

    res.status(200).json({ message: "Inventory deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
